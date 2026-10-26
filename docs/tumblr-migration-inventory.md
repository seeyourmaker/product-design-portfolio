# Tumblr portfolio migration inventory

Source reviewed: https://seeyourmaker.tumblr.com/ (all three archive pages, its linked project presentations, and the full Onverity article).

## Scope

The Tumblr RSS feed has 15 posts. Two music-sharing posts were explicitly excluded:

- A UX Case Study for Seamless Music Sharing — post `732609244897132544`
- UI Solution for Seamless Music Sharing — post `732590687848185856`

The other 13 posts were migrated. The Tumblr navigation also links to two separate Gamma presentations, Smart Watch with LED Strap and City Buddy; both were migrated, for **15 individual pages**. The farmer logistics and accessible mobile-cover posts point to detailed external presentations, which informed their pages.

| Project | Source | Saved media |
| --- | --- | ---: |
| Logistics Solutions for Farmers | Tumblr post `750441279015501824` + linked Gamma site | 53 |
| Onverity Design System | Tumblr post `739065128727838720` + full article | 13 |
| Accessible Mobile Cover | Tumblr post `732609706028302336` + linked Gamma presentation | 21 |
| Smart Watch with LED Strap | Tumblr navigation → Gamma presentation | 29 |
| City Buddy | Tumblr navigation → Gamma presentation | 9 |
| Facebook Dark Theme | Tumblr post `179378651953` | 2 |
| Dominar App | Tumblr post `179378566937` | 6 |
| Get Going | Tumblr post `174537325477` | 4 |
| Bookie | Tumblr post `174537198857` | 4 |
| Skye Smartwatch UI | Tumblr post `174537102927` | 2 |
| YOU | Tumblr post `174536387637` | 6 |
| Logofolio | Tumblr post `174380983312` | 11 |
| UDENT | Tumblr post `173729226922` | 3 |
| Avaviya Reading | Tumblr post `173729150632` | 4 |
| Al Forno | Tumblr post `173729144102` | 8 |

Total: **175 locally saved media files**. The complete archive for each project is available from its page. `public/archive/manifest.json` and the per-Gamma manifests record original URLs, saved paths, and byte counts. Tumblr image files use the highest `_1280` variant available; Tumblr GIFV responses containing GIF bytes are saved as `.gif` so browsers can display them. The Onverity and Facebook videos remain MP4. The farmer logistics presentation's final-product Giphy animation is saved as a GIF.

## Editorial treatment

The ADAPT Icon Finder page is the visual reference. Its color palette, typography, hero composition, chapter headings, captured-media frames, navigation, image viewer, reveal motion, and mobile breakpoints are reused. Story length follows actual source content: the detailed studies have three chapters; image-only posts have one or two short visual chapters. All pages provide their original source link and a complete original-media gallery.

The older Tumblr image-only posts do not contain a written brief, research, usage data, or outcomes. Their pages describe only what appears in the published images. The mobile cover and LED strap are explicitly identified as concepts. The farmer logistics and City Buddy stories summarize research documented in their linked presentations without adding new findings or metrics.

## Validation

- `npm run build` passed.
- Every media path in `src/data/archiveMedia.json` exists locally (175 files).
- Browser checks opened all 15 routes and confirmed a page heading, loaded hero media, and no horizontal overflow at the default viewport.
- Visual checks at desktop, 390px, and 320px verified the listing and sample project heroes. The shared image viewer was opened and closed on a migrated page.
- No commit or deployment was made.

## Existing flagship status

The four featured cards and their homepage behavior were preserved. On the new listing, ADAPT and JiraBro link to their existing case studies, Intent links to its existing Quick Look, and Catalog Curator links to its existing featured preview. The full Intent and Catalog case studies were already listed as incomplete in `PROJECT_STATUS.md`; this migration does not claim they exist.
