"""Generate src/tokens.css from docs/design-system/tokens.json (the single source of design tokens).

Run: python3 scripts/build-tokens.py
"""
import json, re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
tokens = json.loads((root / 'docs/design-system/tokens.json').read_text())
themes = [t['id'] for t in tokens['color']['themes']]
first = themes[0]

def css_value(v):
    m = re.fullmatch(r'\{([A-Za-z0-9_.-]+)\}', v)
    return f'var(--{m.group(1)})' if m else v

def theme_value(v, theme):
    if isinstance(v, str):
        return v if theme == first else None
    return v.get(theme)

out = ['/* Saurabh Portfolio design tokens. Generated from docs/design-system/tokens.json by scripts/build-tokens.py; do not edit by hand. */', ':root{']
for t in tokens['color']['tokens']:
    out.append(f"  --{t['name']}:{css_value(theme_value(t['value'], first))};")
for key, stack in tokens['type']['families'].items():
    out.append(f'  --font-{key}:{stack};')
for fam, spec in tokens.items():
    if isinstance(spec, dict) and 'tokens' in spec and fam != 'color':
        for t in spec['tokens']:
            v = t['value'] if isinstance(t['value'], str) else t['value'].get(first)
            out.append(f"  --{t['name']}:{v};")
out.append('}')

accents = [t['name'] for t in tokens['color']['tokens'] if re.fullmatch(r'accent-[a-z]+', t['name'])]
for a in accents:
    out.append(f'.{a}{{--accent:var(--{a})}}')

# Paper theme: Local Gigs case study (and any element marked data-theme="paper").
for theme in themes[1:]:
    selector = '.lg-case,[data-theme="paper"]' if theme == 'paper' else f'[data-theme="{theme}"]'
    out.append(selector + '{')
    for t in tokens['color']['tokens']:
        v = None if isinstance(t['value'], str) else t['value'].get(theme)
        if v:
            out.append(f"  --{t['name']}:{css_value(v)};")
    if theme == 'paper':
        out.append('  --accent:var(--accent-gigs);')
    out.append('}')

(root / 'src/tokens.css').write_text('\n'.join(out) + '\n')
print('wrote src/tokens.css')
