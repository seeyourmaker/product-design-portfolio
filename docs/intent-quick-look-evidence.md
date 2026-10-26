# Intent Identification Quick Look: evidence and implementation

## Scope and sources

Implemented from the complete owner brief `intent_identification_quick_look_codex.md`, the original FigJam board `kcE5199EPQctxXdTpHaLYv`, and the single large-format `UX notes.pdf` supplied locally. The owner brief supplies the contribution history, Prompt Dissector/Jev evolution, and reported token observation. These are owner-reported claims, not findings inferred from the workshop.

The FigJam board was inspected through Figma MCP (`get_figjam`, read-only `use_figma`, and `get_screenshot`). Skills loaded: `figma-use`, `figma-use-figjam`, `figma-design-to-code`; PDF inspection used the PDF skill. No `get_design_context` call was needed: this is an original web interpretation of workshop logic, not a pixel-for-pixel implementation of a Figma screen.

The referenced page `136:746` (Prompt Decision Framework) initially had hidden section contents at `136:747`. The owner made that section visible during the review. Its visible contents were then re-read, including actual connector endpoints, tables, and screenshots. Initial tool output exposed hidden content despite the setting; that output was not used as implementation evidence. Still-hidden nodes and descendants were excluded from subsequent traversal. No board content, visibility, or layout was changed by the agent.

The PDF was read completely as extracted text and reviewed visually in four consecutive rendered portions. The PDF is not copied into the public website. No workshop screenshot is used as a slide image; new visuals are editable HTML/CSS, with existing SVG/icon primitives.

## FigJam evidence actually inspected

| Page / section | Node | Evidence used |
| --- | --- | --- |
| Final Diagrams / Mind Map | `1:5` | Intent families, capability/permission dependencies; slides 01–02 context. |
| Empathy Maps | `1:82` (personas `1:84`, `1:101`, `1:118`, `1:135`) | Configuration uncertainty, visible assumptions, explanations of limits; supports the story, not a new research sample or quantified result. |
| User Journey Map | `8:339` | Guest parking draft, understand/recommend/validate/explain/enable sequence; inspected text and screenshot. Connected persona `8:342` to mobile-device prompt `73:749` via `73:821`. Slides 02, 03, 05, 06. |
| Intent Architecture | `11:499` | Create/configure/change/review/finalize relationships; screenshot and text. Custom workflow selection is labeled future. |
| Intent Resolution Stack | `10:3326` | Persona → intent → entities → context → constraints → action. Screenshot and text; slides 01, 04, 07. |
| North Star | `136:751` | Safe generation question, exactly three outcomes, complexity ≠ ambiguity. |
| Primary Decision Tree | `136:770` | Read nodes and connectors `136:837`–`136:905`; inspected screenshot. Support gate precedes resolution/default/material-ambiguity checks. Slide 04 optional detail. |
| Requirement Classification | `136:927`, table `136:930` | Clear, safe default, ambiguous, unsupported, unknown; five classifications feed three outcomes. Slide 04. |
| Material Impact Rules | `136:999` | Only consequential unresolved choices warrant clarification; safe defaults avoid unnecessary questions. Slides 03–05, 07. |
| Clarification Policy | `136:1007` | Budget of one question, highest-impact ambiguity, then generation. Slides 04–07. |
| Token Efficiency Principle | `136:1012` / `139:1542` | Missing information alone does not justify a question; no numerical result inferred. |
| Example Prompts | `136:1016`, visible table `140:954` | Clear but complex Guest WiFi, ambiguous device approval, unsupported database sync, safe defaults, priority ranking. Text/table and screenshot. Slides 03, 05, 06. Hidden duplicate example sections were excluded. |
| Architecture Context | `136:1047` | Existing intent understanding → decision guardrail → outcomes. Read actual connector endpoints. Conceptual context for slides 01, 07; not claimed as runtime topology. |
| Relationship to Catalog Curator | `136:1102` | User language → requirements → decision → Curator → draft configuration. |
| Implementation Bridge | `136:1144` | Actionable question design and conceptual policy sequence; explicitly labeled not production code. Slide 07. |

## Source discrepancies and editorial decisions

1. **Unsupported wording:** both the PDF and the tree node `136:789` say “Do not fabricate, ask questions instead.” The classification table and sticky `136:995` say an unsupported capability is **not** a clarification prompt. The owner brief explicitly resolves this: explain the limitation, preserve supported scope, and offer a useful next step. No invented capability or branch is added.
2. **Clarification versus later selection:** the V4 policy has a one-question budget. The PDF mobile-phone conversation includes workflow and questionnaire selections after the initial question. Slides 05–06 present the intended one-question response pattern, and slide 06 remains a placeholder for final designs; the prototype's extra steps are not represented as approved final UI.
3. **Workflow-selection status:** the visible Intent Architecture and User Journey describe custom workflow selection/discovery as future, while the PDF explores it. The clarification example is labeled a designed pattern, not a shipped capability. No production availability claim is made.
4. **Example differences:** the visible FigJam clear/complex example uses Guest WiFi; the PDF and brief use a laptop request. Slide 03 uses the requested laptop example with the explicit supported/resolvable configuration condition. The underlying complexity-versus-ambiguity logic agrees.
5. **Incomplete branches:** the original primary tree lacks explicit “No” branches at the initial understanding and resolvability gates. The detail view is labeled a simplified policy explanation, not an executable or exhaustive decision algorithm. It does not invent those missing branches.
6. **Mockup artifacts:** the PDF mobile-phone draft contains guest-parking carryover fields/text. Those incidental mockup values are not reproduced.
7. **Preserved component claims:** `IntentResponseExperience` is reused unchanged. Its deliverables assert reduced token use, reduced hallucinations, and reduced cognitive load. The sources do not provide measurements for the last two. Owner editorial review is required before public release. Its “I've prepared” language also describes the existing partial-draft response and is retained as requested.

## Slide implementation

| Slide | Implementation |
| --- | --- |
| 01 | Editorial cover; editable request → understand → decide → draft visual; role/focus/product. Explicitly designed behavior, not literal model thoughts. |
| 02 | Existing `IntentUnderstanding` with scoped readable sizing; no redundant second diagram. |
| 03 | Editable clear/complex versus short/ambiguous contrast; wrong-assumption branch and consequential-choice test. |
| 04 | Existing `IntentInterpretation`, three-outcome legend, expandable policy sequence and five classifications. |
| 05 | Existing `IntentResponseExperience` including request, actions, response, deliverables; separate PDF-sourced clarification example. |
| 06 | Three visibly labeled Figma placeholders: guest parking, mobile phone approval, proprietary database sync. No invented final chatbot UI. |
| 07 | Prototype → adopted AI instructions → evaluated/proposed Jev integrated in development; tuned questions and decision outputs. An evolution narrative, not a technical architecture. |
| 08 | ~60k → ~20k / ~67% fewer tokens, explicitly initial-prompt handling in reported development tests. Separate historical full-flow ~80k–100k baseline with no optimized comparator. Disabled future full-case-study CTA. |

## Implementation boundaries

The route and its portfolio entry/back behavior are unchanged. Slide navigation uses local React state, so advancing slides does not fill browser history. Previous/Next, eight direct progress buttons, live slide count, and left/right keys are provided. Arrow shortcuts ignore focused controls, editable fields, the locally pannable map, modifiers, and already-handled events. Only the active slide is mounted; existing GSAP effects keep their cleanup. The Quick Look wrapper invokes the existing pointer-entry animation once per mount, retaining subsequent hover/focus replay and reduced-motion behavior. Content can scroll within the current slide on smaller screens, without scroll-driven slide changes. CSS entry transition is 300ms and disabled for reduced motion.

All new presentation styles are isolated in `src/IntentQuickLook.css`. `src/IntentThumbnails.tsx`, `src/main.tsx`, `src/style.css`, homepage assets/thumbnails, project metadata, and routing code were not edited. No dependencies were added. No commit was made.

## Owner verification before public release

- Confirm initial-prompt token-count methodology and test conditions; no sample size or formal benchmark is documented.
- Confirm the exact chronology of instruction changes and Jev integration; only development integration is established.
- Review the retained deliverable claims and workflow-selection status noted above.
- Replace all three Slide 06 placeholders with approved conversation designs.

## Validation results

- `npm run build`: passed TypeScript checking and Vite production build. Existing Framer Motion `use client` bundler warnings remain non-blocking.
- `git diff --check`: passed. Byte comparisons confirm the migrated components, homepage/routing source, and shared stylesheet are unchanged from the pre-task snapshot.
- Chromium browser validation: all eight slides at 1440×900, 1280×800, 390×844, and 320×740 (32 combinations). No page-level horizontal overflow or browser runtime errors. Desktop and mobile screenshot review covered all eight slides, including scrolled mobile content.
- All slides fit within the presentation viewport at 1440×900. At 1280×800, Slide 05 requires a short local vertical scroll to retain its complete migrated content. Mobile slides scroll within the active slide. Scrolling never advances slides.
- Verified Previous/Next and direct slide selection, boundary states, left/right shortcuts, modifier and focused-control protection, keyboard disclosure, migrated focus animation, and live current-step updates.
- Verified browser Back/Forward, the existing portfolio Quick Look entry, Back to portfolio, direct-entry return, and unchanged history length while moving between slides.
- Verified reduced-motion CSS and GSAP fallback, slide scroll reset, and disabled future full-case-study CTA.
- Mobile relationship map retains readable node labels with accessible local horizontal scrolling, a focusable region, and a visible pan hint. Verified in a touch-emulated mobile context: arrow keys pan the map without advancing slides, all nodes are reachable, and expanded classification details remain accessible. Other mobile content reflows vertically.
- No repository test script or pre-existing automated test suite is configured. Validation scripts and screenshots were kept outside the repository; no test dependency was added. Physical-device and Safari/Firefox testing were not performed.
