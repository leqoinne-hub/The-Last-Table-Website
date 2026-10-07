// Sanity checks on dist/: every local link and asset exists, ids are unique per page,
// titles and descriptions are unique, and structured data parses. Exits 1 on any problem.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const problems = [];
const seen = { title: new Map(), description: new Map() };

for (const name of readdirSync(DIST).filter((f) => f.endsWith('.html'))) {
  const page = readFileSync(join(DIST, name), 'utf8');
  const fail = (msg) => problems.push(`${name}: ${msg}`);

  for (const [, attr, value] of page.matchAll(/\s(href|src|action)="([^"]*)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(value) || value === '') continue;
    const path = value.split(/[?#]/)[0];
    if (path && !existsSync(join(DIST, path))) fail(`${attr}="${value}" does not exist`);
  }

  const ids = [...page.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(`duplicate ids: ${[...new Set(dupes)].join(', ')}`);

  for (const [, id] of page.matchAll(/\saria-(?:controls|labelledby|describedby)="([^"]+)"/g)) {
    if (!ids.includes(id)) fail(`aria reference to missing id "${id}"`);
  }

  for (const [, json] of page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch (e) { fail(`invalid JSON-LD: ${e.message}`); }
  }

  if (!/<html lang="en"/.test(page)) fail('missing <html lang>');
  if (!/<main id="main"/.test(page)) fail('missing <main id="main">');
  if ((page.match(/<h1[\s>]/g) || []).length !== 1) fail('should have exactly one <h1>');
  for (const tag of ['title', 'description']) {
    const value = tag === 'title' ? page.match(/<title>([^<]*)<\/title>/)?.[1] : page.match(/<meta name="description" content="([^"]*)"/)?.[1];
    if (!value) { fail(`missing ${tag}`); continue; }
    if (seen[tag].has(value)) fail(`${tag} duplicates ${seen[tag].get(value)}`);
    seen[tag].set(value, name);
  }
  for (const [img] of page.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(img)) fail(`<img> without alt: ${img.slice(0, 80)}`);
  }
}

if (problems.length) {
  console.error(`check: ${problems.length} problem(s)\n${problems.map((p) => `  · ${p}`).join('\n')}`);
  process.exit(1);
}
console.log('check: all pages pass (links, ids, aria references, headings, titles, JSON-LD, alt text)');
