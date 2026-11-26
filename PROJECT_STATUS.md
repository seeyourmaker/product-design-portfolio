# Project Status

## 26 November 2026 design system

- Added the portfolio design system in `docs/design-system/`: `tokens.json` (single source), a brand book (`README.md`), component guidance and `applying.md` with the migration maps. It was derived from the existing CSS and refined: consolidated colour, radius, type, tracking, spacing and breakpoint scales; one accent per project, shared by its homepage thumbnail and case study; one shared case-study shell; a paper theme for Local Gigs with a text-safe orange (`#b8431a`, 4.7:1) and `#f06a39` kept for fills.
- `scripts/build-tokens.py` generates `src/tokens.css`, which `src/main.tsx` imports before `style.css`. No stylesheet reads the tokens yet, so there is no visual change; `npm run build` passes.
- Removed the five unused motionsites.ai GIF entries from `src/assets.json`.
- Favicon: square 32px and 192px PNGs and a 180px Apple touch icon are generated from `public/my_avatar.png` and linked from `index.html` and `with-intro.html`; the 1.8 MB original is no longer loaded as the icon.
- Planned: move the in-scope stylesheets onto the tokens and the shared case-study shell (see `docs/design-system/applying.md`). Expected visual shifts: unified case-study titles (Chat and Local Gigs titles get smaller and lose uppercase or oversized treatment), 1–8px radius and size changes, Intent and Chat thumbnail accents matching their case studies, Kanit trimmed to five weights. Product recreations keep their literal values.
- Planned after that: refine the Local Gigs case study on the paper theme.

## 12 November 2026 final content decisions

- Contact me, the header Contact item, and the footer contact action open https://www.linkedin.com/in/saurabhhaldankar/. The email contact form is not part of the site. Navigation labels stay About, Expertise, Projects, and Contact.
- Redesigning Chat Experience keeps `/projects/redesigning-chat-experience` and `/projects/redesigning-chat-experience/quick-look`, built from the existing redesign narrative and captures. Visits to `/projects/catalog-curator-revamp` resolve to those routes.
- Intent Identification keeps its existing role copy, final-UI placeholders, and the qualified ~60,000 to ~20,000 initial-prompt development-testing claim. No timeframe, extra ownership statement, or new evidence section was added.
- ADAPT Icon Finder again shows the Cursor and Figma Agent screenshot placeholders. JiraBro keeps the implemented, locally tested Teams status with publication in progress, and the interactive sandbox note.
- Testimonial cards are unchanged. Sentence-punctuation em dashes and en dashes are removed from visible copy. Hyphens and range marks such as 2–3 and 80k–100k remain.

## 12 November 2026 Redesigning Chat Experience case study

- The Task section now pairs its copy with a two-step diagram made from cropped excerpts of the earlier guest parking service response. The callouts identify the expanded tables near the start and the cost, fulfillment issue, and action near the end. Each excerpt opens its original full screenshot. Desktop and 400px layouts were visually checked; `npm run build` passes.
- The case-study text layout now uses one consistent left edge for section labels, headings, paragraphs, screenshots, and captions. This overrides the portfolio's global centered `h2` rule and replaces the split heading/paragraph layout with a narrower reading column, informed by the restrained alignment on harrilin.co. The revised desktop and 400px layouts were visually checked; `npm run build` passes.
- Added the final service-preview frame after the published Guest Parking Service card, showing the Service Configuration view opened from Preview. The page accents now use the same `#87b5ea` blue as this project's homepage thumbnail.
- `/projects/redesigning-chat-experience` now presents the shipped redesign as a visual case study: earlier product captures, final Figma frames, and a direct comparison of the guest parking service draft. It identifies the owner's role as product designer and redesign lead on a three-designer team. It makes no unverified performance or research claims.
- `/projects/redesigning-chat-experience/quick-look` now plays an approximately 30-second silent, looping GSAP film that moves from the earlier guest parking service response through approval, grouped review, publication, and service preview. It includes pause/play, keyboard replay, a reduced-motion still, and a debug scrub slider. The style brief and rundown are in `docs/redesign-chat-quick-look-film.md`. The earlier bridge-page status recorded below has been superseded.
- Local image assets and their provenance are recorded in `docs/redesign-chat-case-study-evidence.md`.
- `npm run build` passes. Desktop and 400px browser layouts were inspected, the full-size image viewer opened, and the Quick Look route linked back to the case study.

## 10 November 2026 Local Gigs thumbnail update

- The shared homepage featured card now has three code-built Local Gigs thumbnails: a homegrown gig poster, an artist-first direct-booking and commission-reduction concept, and a mobile event-discovery view. The ticket graphic labels fewer platform cuts as an aim and the absence of a booking fee as specific to the current demo. The existing archive cover and case-study visuals remain in place.
- The featured card was aligned with Figma node `215:446`: “SUPPORT THE SCENE. FEEL THE MUSIC.” headline, +1px tracking on the three large text blocks, the measured asterisk and poster-ring placements, and the supplied 17 × 17 case-study arrow SVG.
- Desktop and narrow-screen layouts were visually inspected in the local browser. `npm run build` passes.

## 6 November 2026 Local Gigs update

- Local Gigs is the fifth and last Recent Work item on `/projects` and appears last in the shared homepage featured-project stack. Its code-built cover uses the project's own fictional Afterglow visual language. The new `/projects/local-gigs` case study covers the independent-music ticketing ambition, event discovery, responsive design, and the open-source YouPI-PG UPI integration. The project has no Quick Look route or link yet.
- The case study distinguishes the implemented local ₹1 UPI test flow from the private published demo and from a public ticketing service. It does not claim real event inventory or admission tickets. The displayed desktop/mobile scenes are representative recreations of the interface.
- `npm run build` passes. The case-study route was visually inspected in the local browser, and the Projects page was checked for final Recent Work placement and link destination. A narrow-viewport browser inspection remains pending; responsive CSS is included.
- Older counts of four featured projects below are historical.

## 27 October 2026 content-audit update

- The owner-supplied LinkedIn profile is connected to the About contact action and footer. The `Redesigning Chat Experience` project has direct Quick Look and case-study routes; both are clearly labeled concept pages until the owner supplies the full project narrative and outcomes.
- Intent Identification now links from Quick Look to its full case study, shows the supplied Aug–Sep 2026 / four-week timeframe, has a visible mobile decision summary, and omits empty final-production UI slots while the final UI is being prepared. The approximately 67% initial-prompt token observation remains scoped to engineering development testing.
- The Projects listing uses reader-facing section labels, links each featured project to its available pages, omits UDENT and Facebook Dark Theme, and updates specified archive covers and backgrounds. The Smart Watch with LED Strap listing uses the owner's selected generated concept cover; original presentation media remains on the project page.
- The ADAPT evidence slots and JiraBro sandbox teaser are removed. The ADAPT Figma mark no longer restarts a hover animation; the hero rings use alpha fill and a stable transform layer to reduce flicker. Production build passes. Follow-up inputs and visual checks are tracked in `docs/content-audit-unfixed-2026-10-27.md`.
- The Projects listing card-cover link no longer expands to the full card height; this restores the title, description, and actions beneath each featured thumbnail. Verified in the local browser and production build.
- This update supersedes older statements below about the Catalog route, disabled Intent CTA, empty final-UI frames, contact placeholder, ADAPT evidence slots, and Jira sandbox teaser. The historical notes remain for implementation context.

## Implemented

- Catalog Curator Revamp homepage card follows Figma frame `75:1256` from `eXrlwvwMuV81QRtwNzEqa3`: “You cant always chat,” the prompt-engineer message, token-value publication response, and the two-column “Clicks say more than words” composition. Thumbnail controls are static, using local Figma SVG icons, the frame's `#87B5EA` blue accent, and the portfolio's Kanit font. Production build and desktop visual check pass; responsive CSS stacks the composition on narrow screens. The Case Study button currently opens a static concept preview; its final URL will be connected when supplied.

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
- Lenis and React Router are not installed. Redesigning Chat Experience has Quick Look and case-study routes. Intent Identification now has a full case study; its existing homepage case-study link and the projects listing open it.
- Live project links in the preview dialog remain placeholders. The current modal shows image previews rather than live projects.
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
### Intent Identification final UI demonstration
- Added a self-contained, illustrative Catalog Curator walkthrough after the full case study reflection and before its footer. The timed sequence shows the supplied request, two focused clarifications, selected answers, and an editable draft preview. It pauses outside the viewport, supports replay, and settles on the complete view when reduced motion is preferred. This is a portfolio reconstruction, not a released product recording.


- The final UI demonstration now uses the portfolio dark palette and Kanit throughout. Its composer clears after the request is sent, including the character count.
- The final UI demonstration keeps animated content clipped to the chat area, centers the welcome group, and insets and left-aligns the composer.
- Increased the final UI demonstration frame height so the request and complete response fit inside the clipped chat area at desktop and phone widths.
- The final UI demonstration now has a manual Pause/Resume control beside Replay; the selected pause state persists when the demo leaves and re-enters the viewport.
- The final UI demonstration chat area now explicitly centers its content alignment across viewport sizes.
- Centered the welcome heading directly within its own container, matching the already centered description and Guide Me action without changing later assistant messages.

### Repository review and performance pass — 12 November 2026

- Reviewed routes, assets, dependency state, and commit readiness. Simplified route state, corrected hero heading semantics, removed stale preview text and a production Figma capture script, and split redesign, Intent, and Jira pages into route-loaded chunks.
- Initial production JavaScript fell from 191.78 kB to 156.15 kB gzip; initial CSS fell from 44.60 kB to 20.88 kB gzip. The homepage avatar now uses a roughly 192 kB transparent WebP in place of a 1.2 MB PNG. The Intent video preloads metadata.
- Build, whitespace check, offline production dependency audit, and Chrome route smoke checks passed. Clean-checkout media gaps and other remaining findings are recorded in `docs/portfolio-review-2026-11-12.md`.
- Follow-up pass: ADAPT Icon Finder, the `/projects` listing, and archive project pages are now route-loaded chunks. Their route helpers live in `src/data/adaptRoutes.ts` and `src/data/archiveRoutes.ts`, so the homepage no longer bundles those pages. Initial JavaScript fell from 156.49 kB to 149.17 kB gzip (481.11 kB to 449.69 kB raw); initial CSS fell from 20.88 kB to 16.07 kB gzip (104.15 kB to 77.83 kB raw). Build and type check passed. Browser checks were not run because Lighthouse and headless Chrome could not load local pages on this machine.
- Checked and left unchanged: homepage media is already small (tool icons 2–17 kB, avatar WebP 149 kB), and every requested Kanit weight from 300 to 900 is used. Framer Motion, GSAP, and React make up most of the remaining initial JavaScript, and the homepage uses all three.

### Contact page — 12 November 2026

- A `/contact` email form was added, then removed the same day. Contact actions open the LinkedIn profile instead. See the final content decisions above.
