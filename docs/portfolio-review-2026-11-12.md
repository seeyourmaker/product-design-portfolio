# Portfolio review and performance pass — 12 November 2026

## Scope and verification

Reviewed the React/Vite routes, case-study components, local media, build output, asset references, repository state, and dependency audit. Verified the homepage and redesign, Intent, and Jira routes in Chrome. `npm run build`, `git diff --check`, and `npm audit --offline --omit=dev --audit-level=high` pass. The dependency audit uses locally cached advisories; it is not a live registry audit. There is no automated interaction test suite or production field performance data.

## Changes made

- Simplified route state in `src/main.tsx`: the active path now determines each route, instead of keeping parallel booleans in sync. Removed stale Catalog preview copy and corrected the hero heading level.
- Kept the introductory cover on `/with-intro.html`; the homepage opens directly without a timed overlay.
- Removed the Figma capture script from production HTML.
- Loaded the redesign, Intent, and Jira case-study/Quick Look modules only on their routes, with a loading status while the module arrives.
- Changed the Intent walkthrough video from automatic full preload to metadata preload.
- Converted the transparent homepage avatar to WebP, retaining the same dimensions. The asset is about 192 kB versus 1.2 MB for the PNG.
- Removed two trailing-whitespace errors in `IntentCaseStudy.tsx`.

## Build size comparison

The baseline and final numbers use the same `npm run build` command. These are compressed build sizes, not measured Core Web Vitals.

| Entry resource | Before | After | Change |
| --- | ---: | ---: | ---: |
| Main JavaScript, minified | 623.31 kB | 479.65 kB | -143.66 kB |
| Main JavaScript, gzip | 191.78 kB | 156.15 kB | -35.63 kB |
| Main CSS, minified | 227.55 kB | 104.15 kB | -123.40 kB |
| Main CSS, gzip | 44.60 kB | 20.88 kB | -23.72 kB |

The case-study assets now load with their routes. The main JavaScript no longer triggers Vite's 500 kB chunk warning. The roughly 26 MB Intent walkthrough video remains a large route asset; metadata preload limits its initial transfer, but playback should be checked on a slower connection.

## Remaining review findings

1. **Clean-checkout media gap.** `public/adapt/` and `public/intent/full/` are ignored but referenced by the case studies. Those locally supplied captures will be missing in a fresh clone or deployment. Keep them excluded until the owner approves a publication path or supplies replacements. `public/jira-worklog-placeholder.jpg` is also ignored, but its reference is in unused `assets.projects` manifest data.
2. **Remote decorative images.** The homepage About section loads four images from a Figma-hosted URL via `src/assets.json`. Availability and rights are outside this repository; replacing these with approved local assets would remove that dependency.
3. **No field speed data.** LCP, INP, CLS, and a Lighthouse score were not measured. The build-size reduction is evidence of a smaller initial download, not proof of a specific visitor speed improvement.
4. **Local source material.** `docs/for redesign project/` and `docs/portfolio-copy-review.docx` are working references, not runtime assets. Review them separately before adding them to a public commit.

## Commit preparation

Stage the reviewed site sources, copied public assets, evidence markdown, and this report. Leave the two local working-reference paths above out of the site commit. The ignored internal captures remain local and are not forced into Git. Verify the staged diff and the deployment media decision before committing.
