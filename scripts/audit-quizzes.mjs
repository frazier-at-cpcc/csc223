// Audits every graded chapter quiz against the series quiz rules. Prints one line per course.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
let bad = 0;
for (const c of readdirSync('courses').filter((n) => n.startsWith('ie-ch')).sort()) {
  const quiz = walk(join('courses', c, 'pages')).find((f) => f.endsWith('.svelte') && /quiz:\s*\{[^}]*graded:\s*true/.test(readFileSync(f, 'utf8')));
  const src = readFileSync(quiz, 'utf8');
  const never = /feedbackMode:\s*'never'/.test(src);
  const items = [...src.matchAll(/<(MultipleChoice|NumericQuestion|Matching|Sorting|FillInTheBlank)\b([\s\S]*?)\/>/g)];
  const pos = {}; let longest = 0, mc = 0;
  for (const [, type, body] of items) {
    if (type !== 'MultipleChoice') continue;
    mc++;
    const opts = eval('[' + body.match(/options=\{\[([\s\S]*?)\]\}/)[1] + ']');
    const k = Number(body.match(/correct=\{(\d+)\}/)[1]);
    pos['ABCDE'[k]] = (pos['ABCDE'[k]] || 0) + 1;
    const lens = opts.map((o) => o.length);
    if (lens[k] === Math.max(...lens) && lens.filter((l) => l === lens[k]).length === 1) longest++;
  }
  const n = items.length, maxShare = Math.max(...Object.values(pos)) / mc;
  const issues = [];
  if (!never) issues.push('feedbackMode not never');
  if (n < 10 || n > 14) issues.push(`${n} items`);
  if (maxShare > 0.4) issues.push(`key share ${(maxShare * 100).toFixed(0)}%`);
  if (Object.values(pos).some((v) => v < 2)) issues.push('a position keyed < 2 times');
  if (longest > 2) issues.push(`key longest in ${longest}`);
  if (issues.length) bad++;
  console.log(`${c.padEnd(22)} items ${n} (MC ${mc}) keys ${JSON.stringify(pos)} longest ${longest} ${issues.length ? 'ISSUES: ' + issues.join('; ') : 'ok'}`);
}
process.exit(bad ? 1 : 0);
