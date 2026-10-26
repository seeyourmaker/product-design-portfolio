# JiraBro Quick Look — content and implementation plan

Status: implemented and verified on 24 October 2026. See `jirabro-quick-look-evidence.md` for checks and limitations.

## Source and editorial direction

The current page at `/projects/jira-worklog-assistant` is a continuous, six-part case study. Its strongest short-form story is: a repetitive Jira worklog task → an idea for a Teams chatbot → a permissions detour → a working web assistant → a reviewed AI action → a locally tested return to Teams. The page already provides two actual local product captures (`legacy.png` and `web-v2.png`) and a clearly labeled Teams mockup. The Quick Look should let a recruiter grasp the product and the designer's contribution in about two minutes, then offer the full case study for details.

Use the existing eight-slide Intent Quick Look interaction as the navigation model, with JiraBro's dark charcoal, pale blue and mint palette. Keep each slide to one point, one dominant visual, and short copy. Avoid repeating the full case study's prose or its dense diagrams at slide size.

## Ready-to-use slide content

The text below is proposed public copy. The `DEMO-123` request is illustrative. Visual labels are part of the content so viewers can distinguish actual UI, simplified diagrams, and mockups.

| Slide | Navigation name | Eyebrow | Heading | Intro copy | Dominant visual and supporting label |
| --- | --- | --- | --- | --- | --- |
| 01 | The idea | `01 / JiraBro · AI × product design × engineering` | **I wanted a Jira chatbot. So I built one.** | `JiraBro turns a natural-language work update into a Jira worklog the person can review before submitting. I designed and built the assistant from a small local proof of concept into a working web product.` | Large crop of actual V2 interface. Label: `Actual web product · illustrative input`. Metadata: `Role: Product concept, UX and interaction design, AI-assisted development, prototyping and validation`. |
| 02 | The friction | `02 / The job to be done` | **A small task had too many steps.** | `Logging time meant finding an issue, entering a duration, writing a comment, and doing it again for the next task. I asked whether a person could simply describe the work instead.` | A compact four-step manual path ending in the example request: `Log two hours on DEMO-123 for testing.` Label the path `Illustrative task flow`; do not imply measured time savings. |
| 03 | The detour | `03 / Constraint → experiment` | **Teams was the destination. A browser was the starting point.** | `The first idea lived inside Microsoft Teams, but organizational permissions blocked an early test. I moved the core interaction into a local browser and terminal proof of concept so I could learn from a working flow.` | A simple three-stage sequence: `Teams idea → local proof of concept → web assistant`. Caption: `Sequence only; no timeline or dates implied.` |
| 04 | The evolution | `04 / Designing by building` | **From remembering commands to describing work.** | `The early assistant worked, but it expected command-style input. I iterated in code toward a clearer web experience with suggestions, quick actions, session context, and a natural-language composer.` | Side-by-side actual `legacy.png` and `web-v2.png`, with accessible open-full-size links. Labels: `Before · actual legacy UI` and `After · actual V2 UI`; note `Illustrative input; no live Jira session in these captures.` |
| 05 | The guardrail | `05 / AI with accountability` | **The assistant proposes. The person approves.** | `JiraBro interprets a request, validates the issue and duration, and presents a draft before any conversational write. Missing details trigger a clarification; a failed Jira API call must return an error, never an invented success.` | Simplified six-stage flow: `Request → Interpret → Validate → Review and confirm → Jira API → Result`. Highlight `Review and confirm`. Add two small branches: `Missing detail → clarify` and `Cancel → discard draft`. Caption: `Conceptual flow based on the implemented assistant; example request is illustrative.` |
| 06 | The product | `06 / Beyond one worklog` | **A useful assistant grew around the core job.** | `As I tested the interaction, the web product gained quick logging, timers, bulk logging, and supporting productivity views. Building the behavior and interface together helped me see which next step needed to be clearer.` | Curated callouts on the actual V2 screenshot for `Quick Log`, `Suggestions`, `Session context`, and `Quick actions`, plus a compact text strip for `Timers · Bulk logging · Supporting views`. Do not create fake screenshots of features not visible in the capture. |
| 07 | Back to Teams | `07 / Full circle` | **The original idea found a way back.** | `After I demonstrated JiraBro at an innovation forum, I adapted the web assistant's processing logic for a Teams bot. The integration is implemented and locally tested; organizational publication is in progress.` | Web screenshot alongside the existing source-based Teams mockup. Permanent visible label: `Teams integration preview · mockup`. Caption: `Chat replies and Adaptive Card actions; not a published Teams screenshot.` |
| 08 | What I learned | `08 / Reflection` | **Build the smallest useful version. Let it teach you what to design next.** | `A permission constraint created a testable path. Each working iteration exposed a clearer interaction problem, and the confirmation step kept the person in control when AI could act on work records.` | Three closing principles: `Build to learn · Validate before acting · Reuse what works`. Primary CTA: `Read the full case study` → `/projects/jira-worklog-assistant`; secondary CTA: `Back to projects` → `/#projects`. |

### Content boundaries

- Describe the web assistant as working; distinguish local testing from a live Jira session in the displayed captures.
- Say the Teams integration is implemented and locally tested, with organizational publication in progress. Show the Teams visual only as a labeled mockup.
- Make no claims about adoption, hours saved, completion rates, ROI, or production deployment. Add verified outcomes later if supplied.
- Keep `DEMO-123`, durations, and conversation text visibly illustrative. Do not expose real Jira issues, colleagues, credentials, or internal company imagery.
- Use `JiraBro` consistently as the product name; `Jira Worklog Assistant` may remain the homepage project's descriptive title.

## Implementation plan

1. **Route and entry point.** Add `/projects/jira-worklog-assistant/quick-look` to the current pathname-based routing in `src/main.tsx`, including direct load, browser Back/Forward, and trailing-slash handling. Route the JiraBro homepage `Quick Look` button to this page. Keep its `Case study` link targeting `/projects/jira-worklog-assistant`; retain `/full` as the existing alias. There is no need to introduce React Router for this one page.
2. **Page component.** Build `src/JiraBroQuickLook.tsx` with a typed slide-content array and a small `SlideVisual` switch. Reuse the Intent deck's proven header, slide progress, previous/next controls, ArrowLeft/ArrowRight behavior, heading focus, scroll reset, and document-title lifecycle. Keep JiraBro-specific visuals and copy separate from Intent's content. If extracting shared deck navigation would make the two components simpler without changing Intent behavior, do that as a focused refactor; otherwise reproduce the pattern locally.
3. **Visuals and styling.** Add `src/JiraBroQuickLook.css` with a `jbql-` namespace. Map the full case study's charcoal `#0c0c0c`, ink `#d7e2ea`, muted `#aab8bf`, and mint `#83e0cf` into deck surfaces and controls. Use actual `public/jirabro/legacy.png` and `web-v2.png`. Reuse the existing Teams preview's content, with a persistent mockup label. Construct the friction, sequence, and confirmation visuals with accessible HTML/CSS or small SVGs; supply equivalent text for every path and branch.
4. **Responsive behavior.** Fit the main point and visual within a typical desktop viewport; let the central slide viewport scroll when content is taller. Stack comparison panels on mobile, keep image links and controls at least 44 px high, and preserve readable text at 320 px. Avoid shrinking diagrams into unreadable thumbnails or causing horizontal page scroll.
5. **Motion and accessibility.** Keep transitions brief and purposeful. Respect `prefers-reduced-motion`; never require motion to understand a slide. Exclude links, buttons, and local scroll regions from global arrow-key slide navigation. Use a single H1 for the active slide, meaningful section labels, visible focus styles, accessible image descriptions, and focus restoration when navigating at the deck ends. Make all CTA and screenshot links work by keyboard.
6. **Verification.** Run `npm run build`. Check direct route loading, homepage Quick Look, full-case-study CTA, Back/Forward, keyboard navigation, focus, reduced motion, image loading, and layouts at desktop, tablet, 390 px, and 320 px. Ensure Intent Quick Look still behaves as before. Update `PROJECT_STATUS.md` only once implementation exists, and record any unverified device or browser coverage honestly.

## Completion criteria

- All eight slides render in order with the finalized copy and clear visual provenance.
- A visitor can understand the problem, what was built, the approval guardrail, the Teams status, and the designer's role without opening the full case study.
- The homepage Quick Look opens the new route; the closing CTA opens the existing case study; direct URL and browser history work.
- No invented impact metric, deployment claim, or unlabeled mockup appears.
- Keyboard, reduced-motion, and narrow-screen checks pass; production build passes.

## Optional future additions

- Optional: a verified outcome or user-feedback quote. Without one, Slide 08 remains a reflection rather than an impact claim.
- Optional: any preferred product name or final headline wording. The plan defaults to `JiraBro` and the current case study's hook.
