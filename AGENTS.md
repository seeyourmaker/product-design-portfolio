# Project Guidance

## Project structure and conventions
- This is a React 18 + TypeScript + Vite application. The current application is primarily in `src/main.tsx`; styles are in `src/style.css`, and asset references are collected in `src/assets.json`.
- Use function components, typed props, React hooks, and the existing Vite/Tailwind setup. Keep changes small and consistent with the current code style.
- Keep content and media references data-driven where the implementation already does so. Do not add dependencies or abstraction layers without a concrete need.

## Preserve the existing experience
- Treat the current hero, pointer-responsive avatar and shadow, entrance animations, scroll-linked marquee, sticky project cards, dialogs, responsive layouts, and reduced-motion behavior as existing product behavior.
- Preserve the GSAP animation lifecycle and cleanup when editing the avatar or other animated elements. Keep Framer Motion behavior intact where it is already used.
- Lenis is not currently a dependency or implementation in this project. If it is added later, integrate it without replacing or duplicating existing scroll behavior, and document the change.
- Preserve keyboard access, native dialog behavior, focus visibility, and reduced-motion fallbacks when changing interactions.
- Do not replace approved project direction with reference-template names, copy, imagery, or branding. The planned featured project names are specified in `PROJECT_STATUS.md`.

## Reuse and visual conventions
- Extend the existing components and CSS patterns in `src/main.tsx` and `src/style.css` before introducing new component files or styling systems.
- Keep responsive behavior in the existing CSS breakpoints and preserve the current visual treatment unless a design change is explicitly requested.
- Use owner-approved assets only. Do not add remote or local third-party media until usage rights are confirmed. Keep credentials, private hosting configuration, and company-internal assets out of Git.

## Instructions for Codex, Cursor, and contributors
- Inspect the relevant implementation before editing; treat the repository contents as the implementation source of truth.
- Keep changes focused and leave unrelated application code untouched.
- Do not invent case-study details, metrics, links, or project content.
- Update `PROJECT_STATUS.md` when implementation status changes. Distinguish implemented behavior from planned work and known limitations.
- Validate code changes with `npm run build` when appropriate. For interaction changes, also check keyboard access, reduced motion, responsive behavior, and animation cleanup. Report checks actually performed; do not claim unverified browser/device coverage.
