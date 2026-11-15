import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('../src/', import.meta.url).pathname;
const files = readdirSync(src, { recursive: true })
  .filter((f) => /\.(vue|ts|css)$/.test(f))
  .map((f) => join(src, f));

const defined = new Set();
const used = new Map();
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const [, name] of text.matchAll(/(--sr-[a-z0-9-]+)\s*:/g)) defined.add(name);
  for (const [, name] of text.matchAll(/var\((--sr-[a-z0-9-]+)/g)) {
    if (!used.has(name)) used.set(name, file.slice(src.length));
  }
}

const missing = [...used].filter(([name]) => !name.endsWith('-') && !defined.has(name));
for (const [name, file] of missing) console.error(`undefined token ${name} (first used in ${file})`);
process.exit(missing.length ? 1 : 0);
