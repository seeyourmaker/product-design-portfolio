# JiraBro full case study — evidence and validation

Implemented 24 October 2026. Authoritative creative brief: the supplied `jirabro_full_case_study_sol_medium.md`, sections 1–9. Section 10 was excluded as requested.

## Scope and routing

- Full continuous page at `/projects/jira-worklog-assistant`, also available at `/projects/jira-worklog-assistant/full` (trailing slashes accepted).
- The existing homepage Case study link already targets the first route; no homepage card changes were needed. Quick Look behavior and other pages were preserved.
- The narrative includes the new AI instruction design subsection; captions and diagrams supplement it. Focus: a designer who builds and checks AI behavior against working source.
- No sandbox implementation, API, parser, credentials, dependencies, commits, or deployment added.
- Existing React/TypeScript/Vite, GSAP and Framer Motion retained. Lenis is absent from the project. New CSS is namespaced to the case study.

## Source inspection

Local source: `/Users/shaldank/Documents/Codex/Teams Agent`. Git remotes identify the brief's `https://github.com/seeyourmaker/jira-bro.git` as `personal`; the primary origin has a different repository name. The local checkout was used without pulling or modifying it; the named GitHub page could not be retrieved by the web tool.

Read the eight named docs: README, final report, product inventory, canonical layout, local assistant, API contracts, Teams platform, and Teams local test. Relevant source inspected:

- `src/assistant/processLine.ts`: structured command path, draft/confirmation states, actual Jira writes and errors.
- `src/assistant/chat/handleChatMessage.ts`, `src/assistant/intent/validateIntent.ts`: conversational interpretation, issue resolution, clarification, validation, execution.
- `src/assistant/bulk/bulkService.ts`: validation and submission use the Jira client.
- `src/jira/client.ts`: Jira Server/Data Center REST boundary.
- `src/calendar/calendarData.ts`, `src/persistence/store.ts`: fixture calendar, local persistence and recurring structures.
- `src/bot/worklogAssistantBot.ts`, `teamsChatAdapter.ts`, `teamsChatAdapter.test.ts`: the shared chat handler, inbound text/card submissions, secret redaction, confirmation/cancel actions and Adaptive Card output.
- `teams-app/manifest.template.json`: bot scopes and command declarations.
- `scripts/local-assistant-web.ts`, `public/assistant.html`, `public/assistant_v2.html`, `public/assistant-v2/bootstrap.js`: web entry points and actual interfaces.

The Teams permission history, innovation forum, REA-assisted development method and publication status are creator-confirmed facts from the brief. The local REA skill was inspected; no exact REA repository was supplied or linked, and no reverse-engineering execution was needed for source inspection. Tests establish adapter behavior, not an organizational Teams deployment. No adoption, time-saved, ROI or total product test-count claims appear on the page.

## Imagery

- `public/jirabro/web-v2.png`: actual V2 interface served from the product's public directory, captured at 1440×900. All API calls blocked; no backend or environment file loaded. Only an unsent illustrative request was typed. Hardcoded example issue references were changed to `DEMO-123` for the capture; layout and UI remain authentic.
- `public/jirabro/legacy.png`: actual legacy web assistant, cropped to its central 640×440 region. Unsent sample command uses the same illustrative issue.
- Both screenshots open at full size from keyboard-accessible image links.
- No original Teams screenshot was available. The static Teams mockup is explicitly labeled “integration preview · mockup”, reflects text replies and the source adapter's “Choose an action”/Confirm/Cancel card, and makes no publication claim. It has no functioning controls.
- No private Jira data, employee names, credentials, or user session data were captured.

## Skills and diagram decisions

Read the portfolio's `AGENTS.md`; no additional installed project frontend/testing skills were found. Installed `cathrynlavery/diagram-design` using the system skill-installer, then read its SKILL.md, timeline/architecture types, semantic-pattern routing, style guide, onboarding, output and taste-gate guidance. The installed skill is available on the next turn as well.

The user's explicit direction to match the existing portfolio supplied the brand decision. Local token mapping:

| Role | Value |
| --- | --- |
| Paper / secondary surface | `#0c0c0c` / `#151818` |
| Ink | `#d7e2ea` |
| Muted / soft / connectors | `#aab8bf` |
| Accent | `#83e0cf` |
| Rule / structural border | `#36423e` / `#67777e` |
| Typography | Existing Kanit, verified through computed style |

The current case study has three diagrams, authored as React SVG/HTML:

1. Timeline: six milestones, ordinal sequence only, explicitly no time scale or invented dates. Alternating labels and two focal milestones. The 960×280 fit canvas omits implementation detail.
2. Model routing: conditional strict-command bypass, eligible local Ollama cascade, configured cloud fallback, and structured intent.
3. Instructions to safe action: phase-aware semantic instructions and compact context, selected model, parse/schema checks, deterministic validation, conversational write review, Jira result, and clarify/cancel outcomes.

The timeline becomes semantic ordered text below 1100px. The two new architecture diagrams become semantic ordered text below 1400px, in two columns on tablet and one column on mobile. This prevents microscopic SVG labels and horizontal page overflow. Accessible SVG titles/descriptions and figure captions describe the complete paths. The diagrams are static; no gratuitous motion was added.

## Validation

- `npm run build`: PASS (TypeScript no-emit + Vite production bundle). Existing Framer Motion `use client` directive warnings remain non-fatal. No lint/test scripts are configured in this portfolio.
- Product checkout: `node --import tsx --test src/bot/teamsChatAdapter.test.ts`: PASS, 10 tests in 3 suites. No full product test-count claim made; no live Jira or Teams service call tested.
- Isolated headless Chrome checks against the local Vite app at 1440, 1024, 768, 390 and 320px: no horizontal overflow, one H1, the timeline and two architecture diagrams, all screenshot images decoded successfully, correct responsive diagram representation, zero page errors.
- Keyboard: first Tab reaches skip link; Enter focuses the story article; screenshot links and native anchors are keyboard reachable. Teams mockup actions and the future sandbox are noninteractive text, with no dead button/tab stops.
- Route checks: homepage Case study link opens JiraBro; `/full` opens directly; Back to projects returns to the four existing cards; browser Back returns correctly; the existing Intent Quick Look route still renders its original title.
- Reduced motion emulation: reflection remains fully visible with opacity 1 and no transform. New reveal animations are guarded by GSAP matchMedia; observers and active tweens are cleaned up on unmount/media changes.
- The two new architecture SVGs were saved as standalone editable HTML in `docs/jirabro-ai-diagrams/` and passed `diagram-design/scripts/self_check.py`.
- Desktop and phone full-page screenshots inspected visually. Physical mobile devices and assistive-technology sessions were not tested. Production hosting still needs its existing SPA fallback for direct route requests; no hosting configuration changed.

## Files changed by this task

- `src/JiraBroCaseStudy.tsx` (new)
- `src/JiraBroCaseStudy.css` (new)
- `src/main.tsx` (JiraBro import, route state and rendering only)
- `public/jirabro/web-v2.png` (new)
- `public/jirabro/legacy.png` (new)
- `PROJECT_STATUS.md` (status update)
- `docs/jirabro-case-study-evidence.md` (new)

Other changes visible in Git status predated this task and were preserved.
