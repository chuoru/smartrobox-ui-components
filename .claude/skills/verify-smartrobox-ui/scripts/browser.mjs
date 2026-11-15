#!/usr/bin/env node
// Usage: node browser.mjs [--url <path>] [--expect-text <text>] [--width N --height N] <step>...
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(join(process.env.NODE_PATH ?? '', 'noop.js'));
const puppeteer = require('puppeteer-core');

const runId = process.env.VERIFY_RUN_ID ?? 'default';
const repoDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const outDir = process.env.VERIFY_EVIDENCE_DIR ?? join(repoDir, '.verify-evidence', runId);
const state = Object.fromEntries(
  readFileSync(`/tmp/verify-smartrobox-ui/${runId}/state`, 'utf8')
    .trim()
    .split(' ')
    .map((kv) => kv.split(/=(.*)/s).slice(0, 2)),
);

const args = process.argv.slice(2);
const opts = { url: '/', width: 1280, height: 900 };
const steps = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--url') opts.url = args[++i];
  else if (a === '--expect-text') steps.push(`expect-text:${args[++i]}`);
  else if (a === '--width') opts.width = Number(args[++i]);
  else if (a === '--height') opts.height = Number(args[++i]);
  else steps.push(a);
}

mkdirSync(outDir, { recursive: true });
const log = (entry) => {
  const line = JSON.stringify({ t: new Date().toISOString(), ...entry });
  console.log(line);
  appendFileSync(join(outDir, 'log.jsonl'), line + '\n');
};

const browser = await puppeteer.launch({
  executablePath: process.env.VERIFY_CHROME ?? '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
page.setDefaultTimeout(5000);
await page.setViewport({ width: opts.width, height: opts.height });
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(`pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && pageErrors.push(`console.error: ${m.text()}`));

const split = (s, sep, fromEnd = false) => {
  const i = fromEnd ? s.lastIndexOf(sep) : s.indexOf(sep);
  return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + sep.length)];
};

const actions = {
  goto: async (path) => {
    await page.goto(new URL(path, state.url).href, { waitUntil: 'networkidle0' });
  },
  click: async (sel) => {
    const el = await page.waitForSelector(sel, { visible: true });
    await el.scrollIntoView();
    let box = await el.boundingBox();
    for (let i = 0; i < 60; i++) {
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const next = await el.boundingBox();
      if (next && ['x', 'y', 'width', 'height'].every((k) => next[k] === box[k])) break;
      box = next;
    }
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  },
  fill: async (arg) => {
    const [sel, value] = split(arg, '=', true);
    await page.locator(sel).fill(value);
  },
  press: async (key) => {
    await page.keyboard.press(key);
  },
  wait: async (sel) => {
    await page.waitForSelector(sel, { visible: true, timeout: 5000 });
  },
  gone: async (sel) => {
    await page.waitForSelector(sel, { hidden: true, timeout: 5000 });
  },
  sleep: async (ms) => new Promise((r) => setTimeout(r, Number(ms))),
  dark: async () => {
    await page.evaluate(() => document.body.classList.add('dark'));
    await actions.sleep(500);
  },
  light: async () => {
    await page.evaluate(() => document.body.classList.remove('dark'));
    await actions.sleep(500);
  },
  shot: async (name) => {
    const path = join(outDir, `${name}.png`);
    await page.screenshot({ path });
    return { path };
  },
  aria: async (name) => {
    const path = join(outDir, `${name}.aria.json`);
    writeFileSync(path, JSON.stringify(await page.accessibility.snapshot({ interestingOnly: true }), null, 2));
    return { path };
  },
  text: async (sel) => ({ text: await page.$eval(sel, (el) => el.innerText) }),
  count: async (sel) => ({ count: (await page.$$(sel)).length }),
  style: async (arg) => {
    const [sel, props] = split(arg, '|');
    return {
      style: await page.$eval(
        sel,
        (el, ps) => Object.fromEntries(ps.map((p) => [p, getComputedStyle(el).getPropertyValue(p)])),
        props.split(','),
      ),
    };
  },
  'expect-text': async (text) => {
    const body = await page.evaluate(() => document.body.innerText);
    if (!body.includes(text)) throw new Error(`page text does not contain "${text}"`);
  },
  'expect-value': async (arg) => {
    const [sel, want] = split(arg, '=', true);
    const got = await page.$eval(sel, (el) => el.value);
    if (got !== want) throw new Error(`${sel} value is "${got}", want "${want}"`);
    return { value: got };
  },
  'expect-style': async (arg) => {
    const [sel, rest] = split(arg, '|');
    const [prop, want] = split(rest, '=');
    const got = await page.$eval(sel, (el, p) => getComputedStyle(el).getPropertyValue(p), prop);
    if (got.trim() !== want.trim()) throw new Error(`${sel} ${prop} is "${got}", want "${want}"`);
    return { [prop]: got };
  },
};

let ok = true;
try {
  await actions.goto(opts.url);
  log({ step: `goto:${opts.url}`, ok: true });
  for (const step of steps) {
    const [name, arg] = split(step, ':');
    const fn = actions[name];
    if (!fn) throw new Error(`unknown step "${name}"`);
    const result = await fn(arg);
    log({ step, ok: true, ...result });
  }
} catch (e) {
  ok = false;
  log({ ok: false, error: e.message, url: page.url() });
  await page.screenshot({ path: join(outDir, `failure-${Date.now()}.png`) }).catch(() => {});
}
for (const err of pageErrors) log({ ok: false, error: err });
await browser.close();
process.exit(ok && pageErrors.length === 0 ? 0 : 1);
