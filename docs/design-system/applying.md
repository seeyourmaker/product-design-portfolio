# Applying to the codebase

How the portfolio's CSS adopts these tokens. Scope: `src/style.css`, `src/HomeMarquees.css`, `src/ContactPage.css`, `src/ImageViewer.css` and the case-study page shells (`IntentCaseStudy.css`, `JiraBroCaseStudy.css`, `ChatExperiencePages.css`, `AdaptIconFinder.css`, `ArchiveProjects.css`, `LocalGigsCaseStudy.css`, the slide frames in `IntentQuickLook.css` and `JiraBroQuickLook.css`). Product recreations keep their own literal values: mock UIs in `IntentQuickLook.css`, `IntentFinalDemo.css`, `ChatExperienceFilm.css`, the thumbnail internals (`CatalogThumbnails.css`, `GigsThumbnails.css`, the thumbnail TSX files) and the diagrams.

## Steps

1. Add `src/tokens.css`, the `:root` custom properties from `tokens.json`, plus `.lg-case { … }` carrying the paper values and the five `.accent-*` classes. Import it first in `src/main.tsx`.
2. Replace literals in scope using the maps below. Do one stylesheet per commit and run `npm run build` after each.
3. Build the shared shell (`cs-skip`, `cs-nav`, `cs-shell`, `cs-hero`, `cs-eyebrow`, `cs-title`, `cs-lead`, `cs-tag`, `cs-section`, `cs-split`, `cs-index`, `cs-figure`) in one stylesheet and move each case study onto it, deleting the per-page duplicates.
4. Put the accent class on each project card and thumbnail; Intent's thumbnail ring changes from #72c9f3 and Chat's from #cf75ff.
5. Trim the Kanit request in `index.html` and the loader's preload list to 300, 400, 500, 700, 900.
6. Check keyboard focus, reduced motion, 400px width and the avatar and marquee cleanup on each page. Update `PROJECT_STATUS.md`.

## Value maps

| Old values | Token |
| --- | --- |
| #0c0c0c, #0c0d10 | `bg-page` |
| #141414, #151318, #151818, #17191e, #161919, #14171b | `surface-1` |
| #181818, #191919, #1c1d22, #1a1b23 | `surface-2` |
| #201b26, #202020, #22242a, #20242a | `surface-3` |
| #e9eaed, #dcdce6, #d7d8df | `ink` |
| #b8c6cc, #b7bac8, #bdc1cb, #b3b6c1 | `ink-soft` |
| #aab0bd, #a9adb7, #a5a2ae, #9aafb0, #8c8fa1 | `ink-muted` |
| #36423e, #39343f, #34373e, #39403e, #3a514b, #d7e2ea48, #d7e2ea24 | `line` |
| #cf9aef, #72c9f3 (Intent) · #87b5ea (Chat) · #83e0cf · #ffbf69 | `accent-*` |
| #f06a39, #ef6d42, #ee6f45 as fills | `accent-gigs-fill`; as text: `accent-gigs` |

| Old | New |
| --- | --- |
| radius 2–5px | `radius-xs` |
| 6–10px | `radius-sm` |
| 12–14px | `radius-md` |
| 16–18px | `radius-lg` |
| 20–24px | `radius-xl` |
| 30–35px | `radius-2xl` |
| 40–50px | `radius-3xl` |
| 60px | `radius-4xl` |
| letter-spacing -.055 to -.065em | `tracking-tighter` |
| -.035 to -.046em | `tracking-tight` |
| .025 to .06em | `tracking-wide` |
| .08 to .1em | `tracking-wider` |
| .12 to .14em | `tracking-widest` |
| .15 to .18em | `tracking-cta` |
| font-size 9 / 11 / 13 / 15 / 17 / 19 / 21–23px | 10 / 12 / 14 / 16 / 18 / 20 / 24px |
| padding/gap 5–7, 9–10 / 14 / 18 / 22 / 28–30 / 70 / 100–110 / 170px | 8 / 16 / 20 / 24 / 32 / 64 / 96 / 160px |
| media 900–1100 / 700–800 / 520–600 / 360px | `bp-tablet` / `bp-mobile` / `bp-phone` / `bp-narrow` |
| transitions .18–.25s / .3–.5s / .55–.75s | `duration-fast` / `duration-base` / `duration-enter` |
