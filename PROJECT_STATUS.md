# Project Status

## Implemented

- React/TypeScript/Vite single-page application with a responsive portfolio layout.
- Hero with a locally stored avatar, GSAP pointer response, dynamic floor shadow, and entrance animations.
- Mobile hero avatar motion uses device orientation with an iOS permission button, touch fallback, calibration, and reduced-motion support; physical iPhone and Android checks are still pending.
- Scroll-linked image marquee, animated About text, service list, and sticky-stacking project preview cards.
- Project preview dialog with close and backdrop interactions.
- Responsive CSS and reduced-motion styling.

## Incomplete and known issues

- Current project names, service copy, and external sample imagery are prototype content, not the approved portfolio case studies.
- The project manifest refers to third-party media with unverified usage rights. That manifest is sanitized for the repository; the original local file is left unchanged. Approved media must be supplied before restoring those references.
- The local Jira placeholder is excluded from the repository pending asset clearance.
- Lenis, React Router, `/projects`, short case-study routes, and full case-study routes are not currently implemented.
- Contact details and live project links are placeholders. The current modal shows image previews rather than live projects.
- No test script or automated interaction test suite is configured.

## Planned architecture and priorities

1. Replace prototype content and media with owner-approved material, including the four featured projects: Catalog Curator Revamp, Intent Identification, Jira Worklog Assistant, and Adaptive Icon Finder.
2. Build `/projects` to list every project, including the featured four.
3. Add `/projects/:slug` short case studies with scrolling content capped at eight sections and optional video presentations.
4. Add `/projects/:slug/full` detailed case studies for interviewers.
5. Confirm cleared media and links, then validate route behavior, responsive layout, keyboard interaction, reduced motion, and production builds.

The current design and motion implementation remains the source to extend; planned routes and content are not represented as completed features.
