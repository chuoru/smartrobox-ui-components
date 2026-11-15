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

// An alias declared on :root resolves there once, so it never follows a .dark override of the token it points at.
const [rootCss, darkCss = ''] = readFileSync(join(src, 'style.css'), 'utf8').split('.dark {');
const darkTokens = new Set([...darkCss.matchAll(/(--sr-[a-z0-9-]+)\s*:/g)].map(([, name]) => name));
const staleAliases = [...rootCss.matchAll(/(--sr-[a-z0-9-]+)\s*:\s*var\((--sr-[a-z0-9-]+)\)/g)].filter(
  ([, alias, target]) => darkTokens.has(target) && !darkTokens.has(alias),
);
for (const [, alias, target] of staleAliases) {
  console.error(
    `${alias} aliases ${target}, which .dark overrides; give ${alias} a .dark value or use ${target} directly`,
  );
}
process.exit(missing.length || staleAliases.length ? 1 : 0);
