// Fails if any <Term id="..."> in a course page or component is missing from shared/glossary.js.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { glossary } from '../shared/glossary.js';

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk('courses').filter((f) => f.endsWith('.svelte') && !f.includes('/dist/'));
const missing = [];
for (const f of files) {
  for (const [, id] of readFileSync(f, 'utf8').matchAll(/<Term\s+id="([^"]+)"/g)) if (!glossary[id]) missing.push(`${f}: ${id}`);
}
for (const [id, e] of Object.entries(glossary)) {
  if (!e.term || !e.def) missing.push(`glossary entry "${id}" lacks term or def`);
}
if (missing.length) { console.error(missing.join('\n')); process.exit(1); }
console.log(`terms ok: ${Object.keys(glossary).length} glossary entries`);
