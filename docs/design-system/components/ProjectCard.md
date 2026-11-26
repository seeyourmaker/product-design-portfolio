# ProjectCard

A featured project as a sticky, stacking card (`ProjectCard` in `src/main.tsx`, data in `src/data/projects.ts`).

- Card: `bg-page`, 2px `line-strong`, `radius-4xl` (`radius-3xl` tablet and mobile, `radius-2xl` phone), `space-32` padding (`space-24`, `space-16`), max `nav-max`.
- Header: `display-number`, `category` over `project-title`, OutlineButton pushed right; wraps under 768px.
- Media: 40/60 grid, left column split 40/60; images `radius-3xl` (`radius-xl` on phones) on `surface-3`.
- Thumbnail placeholder: 145deg `surface-2` → `surface-4`, two rings and the label. The card carries its project's accent class (`accent-intent`, `accent-chat`, `accent-jira`, `accent-adapt`, `accent-gigs` with `accent-gigs-fill` rings), so the thumbnail matches its case study.
- Motion: sticky at `sticky-top`, scales by 0.03 per card still to come; no transform under reduced motion.
- Consumer supplies: a `FeaturedProject`. Only the approved featured projects appear.
