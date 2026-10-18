"""Dump a course's pages in learner order as plain-ish text, for review."""
import re, sys, pathlib

def meta(d):
    m = d / '_meta.js'
    if not m.exists():
        return None, []
    t = m.read_text()
    title = re.search(r"title:\s*['\"](.+?)['\"]", t)
    pages = re.search(r"pages:\s*\[(.*?)\]", t, re.S)
    return (title.group(1) if title else None,
            re.findall(r"['\"](.+?)['\"]", pages.group(1)) if pages else [])

def ordered(d):
    _, order = meta(d)
    files = {f.stem: f for f in d.glob('*.svelte')}
    return [files[n] for n in order if n in files] + sorted(f for n, f in files.items() if n not in order)

def clean(src):
    src = re.sub(r'<style.*?</style>', '', src, flags=re.S)
    src = re.sub(r'^\s*import .*?;\s*$', '', src, flags=re.M)
    src = re.sub(r'\n\s*\n+', '\n', src)
    return src.strip()

course = pathlib.Path(sys.argv[1])
out = []
for sec in sorted(p for p in (course / 'pages').iterdir() if p.is_dir()):
    out.append(f'\n######## SECTION {sec.name}: {meta(sec)[0]}')
    for f in ordered(sec):
        out.append(f'\n==== PAGE {sec.name}/{f.name}\n{clean(f.read_text())}')
    for les in sorted(p for p in sec.iterdir() if p.is_dir()):
        out.append(f'\n#### LESSON {les.name}: {meta(les)[0]}')
        for f in ordered(les):
            out.append(f'\n==== PAGE {sec.name}/{les.name}/{f.name}\n{clean(f.read_text())}')
print('\n'.join(out))
