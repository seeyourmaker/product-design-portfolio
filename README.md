# Product Design Portfolio

A React portfolio foundation for presenting product design and UI/UX work. The existing implementation includes an interactive avatar hero, motion-led sections, and project previews. Approved portfolio content and media are being prepared; see [PROJECT_STATUS.md](PROJECT_STATUS.md).

## Stack

- React 18 and TypeScript
- Vite 6
- Tailwind CSS 3
- GSAP and Framer Motion
- Lucide React icons

Lenis is not currently installed or used in this implementation.

## Local development

Requirements: Node.js and npm.

```sh
npm ci
npm run dev
```

Vite serves the app at `http://127.0.0.1:5173` by default.

## Build

```sh
npm run build
```

The build runs TypeScript checking and creates production files in `dist/`.

## Project structure

```text
src/
  main.tsx       App sections, interactions, project previews, routing placeholder
  style.css      Tailwind directives, visual system, responsive and motion styles
  assets.json    Media manifest (use approved assets only)
public/          Locally served images
```

## Planned information architecture

- `/` — Existing hero and animations, followed by four featured projects: Catalog Curator Revamp, Intent Identification, Jira Worklog Assistant, and Adaptive Icon Finder.
- `/projects` — All projects, including the featured four.
- `/projects/:slug` — Scrolling short case study, up to eight sections, with optional video presentations.
- `/projects/:slug/full` — Detailed case study for interviewers.

These routes and named projects describe planned work; they are not all implemented in the current app.

## Handoff

1. Install dependencies with `npm ci`.
2. Run `npm run dev` for local development and `npm run build` before handing off changes.
3. Use only owner-approved project copy and media. The repository excludes the unverified external media manifest references and the local Jira placeholder image; replace them with cleared assets before restoring those sections.
4. Never commit `.env` files, local credentials, `.openai/hosting.json`, generated `dist/`, or `node_modules/`.
5. Keep motion, avatar, keyboard, responsive, and reduced-motion behavior intact while implementing the planned routes and case studies.
