#!/usr/bin/env node
// Usage: node axe.mjs [path[@selector]...]   (default: home page, every /samples/<name> in the router, and each opened overlay in axe-overlays.txt)
// A path with @selector clicks that element after loading, to scan an opened overlay.
// Prefix the selector with hover: to hover it, or context: to right-click it.
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const puppeteer = createRequire(join(process.env.NODE_PATH ?? '', 'noop.js'))('puppeteer-core');
const axeSource = readFileSync(createRequire(join(repoDir, 'package.json')).resolve('axe-core/axe.min.js'), 'utf8');

const runId = process.env.VERIFY_RUN_ID ?? 'default';
const outDir = process.env.VERIFY_EVIDENCE_DIR ?? join(repoDir, '.verify-evidence', runId);
const state = Object.fromEntries(
  readFileSync(`/tmp/verify-smartrobox-ui/${runId}/state`, 'utf8')
    .trim()
    .split(' ')
    .map((kv) => kv.split(/=(.*)/s).slice(0, 2)),
);

const router = readFileSync(join(repoDir, 'playground/src/router/index.ts'), 'utf8');
const samples = [...router.match(/SAMPLES = \[([\s\S]*?)\]/)[1].matchAll(/'([a-z-]+)'/g)].map(([, s]) => `/samples/${s}`);
const overlays = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'axe-overlays.txt'), 'utf8').split('\n').filter(Boolean);
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', ...samples, ...overlays];

mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.VERIFY_CHROME ?? '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

const findings = [];
for (const theme of ['light', 'dark']) {
  for (const path of paths) {
    const [url, opener] = path.split(/@(.*)/s);
    await page.goto(new URL(url, state.url).href, { waitUntil: 'networkidle0' });
    await page.evaluate((dark) => document.body.classList.toggle('dark', dark), theme === 'dark');
    await new Promise((r) => setTimeout(r, theme === 'dark' ? 500 : 0));
    if (opener) {
      const [, mode = 'click', selector] = opener.match(/^(?:(hover|context):)?(.*)$/s);
      if (mode === 'hover') await page.locator(selector).hover();
      else await page.locator(selector).click(mode === 'context' ? { button: 'right' } : {});
      await new Promise((r) => setTimeout(r, 600));
    }
    await page.addScriptTag({ content: axeSource });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] });
      return result.violations.flatMap((v) =>
        v.nodes.map((n) => ({
          rule: v.id,
          impact: v.impact,
          target: n.target.join(' '),
          html: n.html.slice(0, 160),
          why: (n.failureSummary ?? '').split('\n').slice(1, 2).join('').trim(),
        })),
      );
    });
    for (const v of violations) findings.push({ path, theme, ...v });
  }
}
await browser.close();

writeFileSync(join(outDir, 'axe.json'), JSON.stringify(findings, null, 2));
const pagesWith = new Set(findings.map((f) => `${f.theme} ${f.path}`));
for (const f of findings) console.log(`${f.theme.padEnd(5)} ${f.path.padEnd(32)} ${f.rule.padEnd(28)} ${f.target}  ${f.why}`);
const summary = `axe: ${findings.length} violation(s) on ${pagesWith.size} of ${paths.length * 2} page/theme combinations; details in ${join(outDir, 'axe.json')}`;
console.log(summary);
appendFileSync(join(outDir, 'log.jsonl'), JSON.stringify({ t: new Date().toISOString(), step: 'axe', ok: findings.length === 0, summary }) + '\n');
process.exit(findings.length ? 1 : 0);
