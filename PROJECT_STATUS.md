# Project Status

## Implemented

- Catalog Curator Revamp homepage card now uses Figma frame `75:1256` from `eXrlwvwMuV81QRtwNzEqa3`: “You cant always chat,” the prompt-engineer message, token-value publication response, and “Clicks say more than words” panel. Uses the frame's six local SVG assets and a `#87B5EA` blue accent between the neighboring purple and teal cards. The frame's right-side temporary-thumbnail label is retained. Checked at 1440, 1102, 768, 390, and 320px with no page overflow or browser errors; all imported assets load. Existing project navigation remains in place.

- Intent Identification full editorial case study at `/projects/intent-identification` (also `/projects/intent-identification/full`, trailing slashes supported): ten sections from the supplied full brief, two interactive conceptual reconstructions in Section 06, three diagram-design SVG diagrams, original Before screenshot, FigJam research export, and PDF conversation excerpts. Workflow choices update the conversation and both configuration previews; keyboard-operable tabs progressively disclose Service Profile, Questionnaire, Workflow, and Fulfillment. Reuses the shared image viewer and scoped GSAP reveals. Customer release, development-only token results, and unverified Jev release details are distinguished. The existing homepage Case study URL now resolves; `/projects` links to the full page. Quick Look remains unchanged, including its existing disabled future-case-study CTA. Final conversation UI frames are still missing and have labeled placement areas. Source evidence and checks: `docs/intent-full-case-study-evidence.md`.

- `/projects` now lists the four existing flagship projects and 15 migrated projects from the previous Tumblr portfolio. Each migrated project has its own `/projects/:slug` page using the ADAPT Icon Finder page's dark canvas, typography, warm accent, split hero, image treatment, chapter headings, scroll reveal behavior, and responsive breakpoints. The homepage markup and existing flagship implementations remain unchanged. The two Seamless Music Sharing posts are excluded. Original published media is stored under `public/archive/`, with source manifests and a migration inventory in `docs/tumblr-migration-inventory.md`.

- ADAPT homepage previews now use three custom tiles: the core idea, the supplied original website capture, and the actual plugin screenshot with feature annotations. They retain the existing desktop grid and mobile/tablet vertical stack.

- Full-size project screenshots in ADAPT Icon Finder, the JiraBro case study, and JiraBro Quick Look now open in a shared in-page viewer. Close, Escape, backdrop, and browser Back return to the originating page; focus and scroll position are restored. Browser Forward can reopen the viewer, and an actual-size toggle allows inspection of large captures. Desktop/mobile Chrome interaction checks are recorded in `docs/image-viewer-evidence.md`.

- ADAPT ICON FINDER compact project showcase at `/projects/adapt-icon-finder` (previous `/projects/adaptive-icon-finder` retained as an alias). Homepage cover naming is corrected and its View project link opens the page. Uses the three supplied screenshots unchanged, a diagram-design build sequence, owner-confirmed AI-assisted build story, a Find/Use/TEAM walkthrough, and internal release context. The refined page includes a larger authentic plugin screenshot, five-stage build sequence, and testimonial cards for Mark Richards, Jade Foronda, and director Sumit Seth. No separate TEAM or feedback screenshots. Missing Cursor and Figma Agent assets have labeled expandable slots. Refinement checks passed at 1440, 1024, 390, and 320px, including the image viewer. Build and Chrome responsive checks at 1440, 1024, 768, 390, and 320px passed. Internal screenshots remain Git-ignored. Details: `docs/adapt/showcase-evidence.md`.

- JiraBro eight-slide Quick Look at `/projects/jira-worklog-assistant/quick-look` (including trailing slash), connected to the existing homepage Quick Look button. Uses the approved narrative, actual legacy/V2 product screenshots, two editable diagram-design SVG/HTML diagrams plus a two-layer AI instruction and safeguards flow, with readable mobile equivalents and confirmation for conversational writes, and the labeled Teams mockup with publication in progress. Includes progress selection, previous/next and keyboard navigation, focus handling, GSAP slide entrances, and reduced-motion support. Production build and Chrome checks for all eight slides at 1440, 1024, 768, 390, and 320px passed; full case study routes, browser history, and all eight Intent Quick Look slides were also checked. Details: `docs/jirabro-quick-look-evidence.md`.

- React/TypeScript/Vite single-page application with a responsive portfolio layout.
- Hero with a locally stored avatar, GSAP pointer response, dynamic floor shadow, and entrance animations.
- Mobile hero avatar motion uses device orientation with an iOS permission button, touch fallback, calibration, and reduced-motion support; physical iPhone and Android checks are still pending.
- Homepage now has two independent GSAP marquees: the supplied 20 tool PNGs move right on a 37.5-second loop with intentional-hover bounce, and testimonial card slots move left on a 50-second loop with hover, keyboard, and touch text-reveal interactions. Only the quote content slides; the card surface and attribution remain stationary. Each row pauses independently, resumes from its current position, and becomes static under reduced motion. The separate animated About text, service list, and sticky project cards remain in place.
- Four featured projects are stored in `src/data/projects.ts` and rendered through the existing animated project-card component, with category, description, temporary thumbnails, preview dialog, and future case-study links.
- The Intent Identification Quick Look remains eight slides at `/projects/intent-identification/quick-look`. The original opening headline and intro are restored, with a keyboard-accessible product overview dialog; the next slide compares an animated fictional configuration response with an explicit pending After mockup, explains why intent precedes generation, and preserves the original decision framework. Understanding moves to Slide 05; the original Response component and expandable conversation patterns share Slide 06. All three original GSAP components remain unchanged. Slides 07–08 preserve Prompt Dissector/Jev development integration and the qualified initial-prompt token observation. Revision evidence is recorded in `docs/intent-quick-look-revision.md`.
- Homepage project thumbnails retain the 40/60 desktop grid and stack vertically at widths up to 1023px. Mobile/tablet cards use natural document flow to keep every thumbnail accessible. The supplied looping chatbot animation is framed by balanced Request/Choice explanations, which move below the video on narrow phones. Quick Look Slide 06 retains the original response panels and deliverables.
- JiraBro full case study at `/projects/jira-worklog-assistant` and `/projects/jira-worklog-assistant/full`, reached by the existing homepage Case study link. Continuous editorial narrative, three brand-matched diagrams (product timeline, conditional model routing, and instructions to safe action), real locally captured legacy/V2 UI, a labeled Teams integration mockup, responsive diagram text, keyboard skip navigation, and reduced-motion-aware GSAP reveals. Teams is described as implemented and locally tested with publication in progress. The interactive sandbox remains a small future placeholder. The “Designing the AI’s Instructions” subsection is verified against the JiraBro source; evidence and validation are in `docs/jirabro-case-study-evidence.md` and `docs/jirabro-ai-architecture-revision.md`.
- Project preview dialog with close and backdrop interactions.
- Responsive CSS and reduced-motion styling.

## Incomplete and known issues

- The owner will provide a different approved set of homepage testimonials. The new row intentionally shows three labeled copy slots until original quotes, attribution, and optional humorous alternatives are supplied in `src/data/homeTestimonials.ts`; no endorsement text has been invented.

- Service copy and external sample imagery remain prototype content, not approved portfolio case-study content.
- The project manifest refers to third-party media with unverified usage rights. That manifest is sanitized for the repository; the original local file is left unchanged. Approved media must be supplied before restoring those references.
- The local Jira placeholder is excluded from the repository pending asset clearance.
- Lenis and React Router are not installed. Catalog Curator's full case study is still planned. Intent Identification now has a full case study; its existing homepage case-study link and the projects listing open it.
- Contact details and live project links are placeholders. The current modal shows image previews rather than live projects.
- No test script or automated interaction test suite is configured. Quick Look browser validation is recorded in `docs/intent-quick-look-evidence.md`.
- Quick Look public release still needs the approved Slide 02 After mockup and final conversation designs and owner verification of token methodology, Jev chronology, workflow-selection status, and retained deliverable claims (especially hallucination/cognitive-load reductions).

## Planned architecture and priorities

1. Replace remaining prototype section content and media with owner-approved material.
2. Complete the full case study for Catalog Curator and supply final conversation frames for Intent Identification.
3. Expand selected short case studies when additional approved evidence becomes available.
4. Add the remaining `/projects/:slug/full` detailed case studies for interviewers; JiraBro and Intent Identification are implemented.
5. Confirm cleared media and links, then validate route behavior, responsive layout, keyboard interaction, reduced motion, and production builds.

The current design and motion implementation remains the source to extend; planned routes and content are not represented as completed features.

### Featured listing thumbnails
- `/projects` cards 1 and 4 reuse their opening homepage featured designs; card 3 uses the opening JiraBro Quick Look headline and actual product capture because its homepage tile remains a placeholder.
- Listing-only hover and keyboard-focus reveals respect reduced motion; homepage rendering is unchanged.

- Jira now has a shared “Less logging. More doing.” cover on the homepage and listing, plus review-draft and actual-product tiles on the homepage. User explicitly authorized replacing the homepage Jira placeholders. Motion is limited to the illustrative prompt and respects reduced motion.

### Illustrative thumbnail revision
- Replaced Jira thumbnail UI panels and screenshot with a clock illustration, approval stroke, and open typographic worklog composition. Shared first tile also updates `/projects`.
- Replaced ADAPT homepage screenshots with Figma/icon-library and canvas-selection illustrations, inspired by the existing plugin features. Original case-study assets remain intact.
- Hover gestures are brief and gated by reduced-motion preference.

### Ticket and approval thumbnail refinement
- Jira's approval illustration now shows an AI suggestion beside an illustrative Approve button and cursor. The worklog illustration uses a tilted issue with time entry in the same visual language as ADAPT.
- The ADAPT listing cover now reuses the approved “One familiar library” Figma icon constellation component from the homepage.

### Intent listing cover
- The `/projects` Intent Identification cover now adapts the Quick Look request → understand → decide → draft illustration into a wide card. The decision stage remains visually emphasized, with a two-row layout at phone widths. The Quick Look page itself is unchanged.

### Homepage navigation
- The top “Projects” link now opens `/projects`; the separate “Explore my work” hero action still scrolls to featured work.
