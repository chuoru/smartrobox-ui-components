#!/usr/bin/env node
// Usage: node nontext.mjs   (run through nontext.sh)
// Measures WCAG 1.4.11 non-text contrast (3:1) of form-control outlines, tracks and focus indicators, which axe does not check.
// The page background is the library's --sr-color-bg (white, dark #172b4d), not the playground's own page color.
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const puppeteer = createRequire(join(process.env.NODE_PATH ?? '', 'noop.js'))('puppeteer-core');
const runId = process.env.VERIFY_RUN_ID ?? 'default';
const outDir = process.env.VERIFY_EVIDENCE_DIR ?? join(repoDir, '.verify-evidence', runId);
const state = Object.fromEntries(
  readFileSync(`/tmp/verify-smartrobox-ui/${runId}/state`, 'utf8')
    .trim()
    .split(' ')
    .map((kv) => kv.split(/=(.*)/s).slice(0, 2)),
);

// measure: border | background | focus (outline if drawn, else border) | thumb (first child's background vs the element's)
// action: focus (keyboard focus on `target`, default the element) | click
const CHECKS = [
  ['input', 'main input[aria-label="Text"]', 'border'],
  ['input', 'main input[aria-label="Text"]', 'focus', 'focus'],
  ['textarea', 'main textarea', 'border'],
  ['textarea', 'main textarea', 'focus', 'focus'],
  ['select', 'main select[aria-label="Fruit"]:not([disabled])', 'border'],
  ['select', 'main select[aria-label="Fruit"]:not([disabled])', 'focus', 'focus'],
  ['select-grouped', 'main select[aria-label="Fruit"]:not([disabled])', 'border'],
  ['select-cascade', 'main .root-menu:not(.disabled)', 'border'],
  ['select-cascade', 'main .root-menu:not(.disabled)', 'focus', 'focus'],
  ['combobox', 'main .anchor', 'border'],
  ['combobox', 'main .anchor', 'focus', 'focus', 'main [role=combobox]'],
  ['date-picker', 'main .date-picker-field', 'border'],
  ['date-range-picker', 'main .date-range-picker-field', 'border'],
  ['date-picker', 'main .date-picker-field [contenteditable]', 'focus', 'focus'],
  ['date-range-picker', 'main .date-range-picker-field [contenteditable]', 'focus', 'focus'],
  ['toggle', 'main button[aria-pressed]', 'border'],
  ['checkbox', 'main button[role=checkbox]', 'border'],
  ['checkbox', 'main button[role=checkbox]', 'focus', 'focus'],
  ['radio-group', 'main button[role=radio][data-state=unchecked]', 'border'],
  ['radio-group', 'main button[role=radio][data-state=unchecked]', 'focus', 'focus'],
  ['switch', 'main button[role=switch]', 'background'],
  ['switch', 'main button[role=switch]', 'thumb'],
  ['switch', 'main button[role=switch]', 'focus', 'focus'],
  ['toggle', 'main button[aria-pressed]', 'background', 'click'],
  ['slider', 'main [role=slider]', 'border'],
  ['slider', 'main [role=slider]', 'focus', 'focus'],
];

mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.VERIFY_CHROME ?? '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

const results = [];
for (const theme of ['light', 'dark']) {
  for (const [sample, selector, measure, action, target] of CHECKS) {
    await page.goto(new URL(`/samples/${sample}`, state.url).href, { waitUntil: 'networkidle0' });
    await page.evaluate((dark) => {
      document.body.classList.toggle('dark', dark);
      document.body.style.background = 'var(--sr-color-bg)';
    }, theme === 'dark');
    await new Promise((r) => setTimeout(r, 400));
    if (action === 'click') await page.locator(selector).click();
    if (action === 'focus') {
      await page.keyboard.press('Tab');
      await page.$eval(target ?? selector, (el) => el.focus());
    }
    await new Promise((r) => setTimeout(r, 300));
    const r = await page.$eval(
      selector,
      (el, measure) => {
        const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        const rgba = (c) => {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = '#000';
          ctx.fillStyle = c;
          ctx.fillRect(0, 0, 1, 1);
          return [...ctx.getImageData(0, 0, 1, 1).data];
        };
        const behind = (node) => {
          for (let e = node; e; e = e.parentElement) {
            const c = rgba(getComputedStyle(e).backgroundColor);
            if (c[3] > 128) return c.slice(0, 3);
          }
          return [255, 255, 255];
        };
        const lum = (c) =>
          c
            .map((v) => (v / 255 <= 0.03928 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4))
            .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
        const ratio = (a, b) => {
          const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
          return (x + 0.05) / (y + 0.05);
        };
        const cs = getComputedStyle(el);
        let fg;
        let bg = behind(el.parentElement);
        if (measure === 'border') fg = rgba(cs.borderTopColor).slice(0, 3);
        if (measure === 'background') fg = rgba(cs.backgroundColor).slice(0, 3);
        if (measure === 'thumb') {
          fg = rgba(getComputedStyle(el.firstElementChild).backgroundColor).slice(0, 3);
          bg = behind(el);
        }
        if (measure === 'focus') {
          const drawn = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
          fg = rgba(drawn ? cs.outlineColor : cs.borderTopColor).slice(0, 3);
        }
        return { ratio: +ratio(fg, bg).toFixed(2), fg: `rgb(${fg})`, bg: `rgb(${bg})` };
      },
      measure,
    );
    results.push({ theme, sample, measure, action: action ?? 'rest', ...r, ok: r.ratio >= 3 });
  }
}
await browser.close();

writeFileSync(join(outDir, 'nontext.json'), JSON.stringify(results, null, 2));
for (const r of results) {
  const what = `${r.sample} ${r.measure}${r.action === 'rest' || r.action === 'focus' ? '' : ` (${r.action})`}`;
  console.log(`${r.ok ? 'PASS' : 'FAIL'} ${String(r.ratio).padStart(5)}  ${r.theme.padEnd(5)} ${what.padEnd(32)} ${r.fg} on ${r.bg}`);
}
const failed = results.filter((r) => !r.ok).length;
const summary = `nontext: ${failed} of ${results.length} checks below 3:1; details in ${join(outDir, 'nontext.json')}`;
console.log(summary);
appendFileSync(join(outDir, 'log.jsonl'), JSON.stringify({ t: new Date().toISOString(), step: 'nontext', ok: !failed, summary }) + '\n');
process.exit(failed ? 1 : 0);
