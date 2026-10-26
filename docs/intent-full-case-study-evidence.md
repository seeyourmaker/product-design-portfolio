# Intent Identification — full case study

## Scope

The traditional ten-section editorial case study is implemented at `/projects/intent-identification`, with `/projects/intent-identification/full` and trailing-slash variants. It follows the complete owner-supplied `intent_identification_full_case_study.md` and the additional request for two functional interaction reconstructions in Section 06. The homepage’s existing Case study URL now resolves. The projects listing’s Intent card opens the full case study. Links on the new page lead to the unchanged eight-slide Quick Look and `/projects`.

The new page uses Kanit, the existing dark/purple palette, portfolio breakpoints, the shared image viewer, and scoped GSAP reveals with cleanup and reduced-motion support. Its interaction styles and layout are isolated in `IntentCaseStudy.css`. No dependency, deployment, publication, or commit was added. Pre-existing working-tree changes were preserved.

## Source inspection

- Read the complete full case-study brief, `AGENTS.md`, existing architecture, route handling, project data, Intent Quick Look, its prior evidence reports, shared image viewer, and existing editorial pages/styles.
- Extracted the complete single-page `UX notes.pdf` and visually reviewed all four consecutive portions. Its source page is an unusually long canvas (1766 × 17946 PDF points). The PDF contains the decision framework, classification, prompt analysis, and conversation explorations. Its mobile draft has incidental guest-parking carryover content, which was not copied into the reconstruction.
- Inspected FigJam through Figma MCP: file `kcE5199EPQctxXdTpHaLYv`, original research section `1:2`, framework section `136:747`, and primary tree `136:770` with actual connector endpoints. Read the classification table, material-impact rules, clarification policy, examples, and architecture context. Hidden duplicate sections were excluded as evidence.
- Read-only file inventory confirmed two pages: Final Diagrams (`0:1`) and Prompt Decision Framework (`136:746`). The visible first page contains research/intent maps; the visible second page contains the framework section. No visible final conversational UI frames were located in the supplied sections. No Figma content was edited.
- Downloaded the original Material Impact Rules artifact (`136:999`) through Figma MCP. Included it at readable width with a direct source link and shared full-image viewer.
- Used the owner-supplied meeting-room Before screenshot unchanged. The page shows a fixed-height excerpt and opens the full original image.
- Extracted two authentic PDF conversation crops: the approval clarification and unsupported proprietary database synchronization. Both are labeled research explorations and are secondary to the interactive exhibits.

## Interactive reconstructions

Demo 01 uses the mobile-phone approval example. Native labeled radio controls choose default, existing, or AI-recommended workflow. Each selection updates the conversation, decision status, draft workflow, contextual reason, and Demo 02’s Workflow panel. Reset restores unresolved status. No API or live model is called.

The existing-workflow example preserves `Approval 2314 — Mobile` from the research mockup. The manager-approval default and recommendation are explicitly illustrative. The default is offered at the owner’s request for comparison; the exhibit says it assumes a documented default is available. It is not evidence that all product configurations expose these three choices, or that the revised portfolio styling shipped.

Demo 02 uses tabs for Service Profile, Questionnaire, Workflow, and Fulfillment. Only the selected panel is exposed; all tabs resolve to corresponding panels. Arrow keys, Home/End, native focus behavior, and focusable panels support keyboard use. The questionnaire uses source-based labels with explicitly illustrative field types; the broader PDF’s incidental copied properties are not treated as approved product configuration. Progressive disclosure and subtle CSS transitions respect reduced motion.

## Diagram fidelity and maintenance

The installed diagram-design skill informed the decision flow, iteration strip, and conceptual architecture. The owner explicitly requested adaptation to the existing portfolio style; colors are derived from that local design system, with Kanit verified in the browser. No default skill skin or new font dependency was introduced.

`python3 scripts/generate-intent-diagrams.py` generates both the app’s trusted static SVG data (`src/data/intentDiagrams.json`) and self-contained HTML sources in `docs/intent-full-diagrams/`. These are code-authored diagrams, not fabricated product UI. Each SVG has unique title/description IDs, an accessible name, orthogonal connectors, and a labeled local scrolling region. The page’s decision flow also includes a text equivalent and source explanation. Readable SVG width is preserved on phones instead of scaling labels into illegibility.

- **Decision flow:** faithful source adaptation, custom 960 × 1224 canvas, retaining all meaningful gates. Pass-through Continue nodes are collapsed; Ready/Generate and Clarification/Ask are merged. The larger faithful drawing retains 11 meaningful nodes and 13 routes rather than deleting source decisions to fit a simplified budget. The source omits No branches at initial understanding and resolvability; none are invented. Unsupported wording follows the classification table, PDF notes, and owner brief, resolving the contradictory “ask questions instead” tree endpoint. The drawing is labeled as a policy artifact, not exhaustive executable logic.
- **Iteration:** undated step sequence, 960 × 340, explicitly not an elapsed-time timeline. Prompt Dissector is an exploration, AI instructions the refined approach, Jev a development integration with engineering.
- **Architecture:** 960 × 620 conceptual interaction model. Generate and clarified paths can reach a Catalog Curator draft; unsupported generation stops. Jev’s placement and actual topology remain unverified. No APIs, schemas, syntax, or confidence thresholds are invented.

## Claim boundaries

- Customer release is owner-confirmed for the overall Intent Identification experience. No assertion that every Jev detail shipped.
- Jev discovery, introduction to the team, and collaboration with engineering use the owner’s supplied narrative.
- `null`, `choice`, and `confidence` are labeled conceptual UX examples, not verified Jev schema or configuration.
- ~60,000 → ~20,000 tokens is approximately 67%, clearly scoped to initial-prompt handling in engineering development testing. It is attributed to combined interaction/AI-behavior work, not Jev alone.
- Historical ~80k–100k full-service usage is separately footnoted, with no optimized end-to-end comparator.
- Response accuracy, unnecessary clarification, and service-configuration quality are qualitative team observations; no numerical user results, sample sizes, adoption, or time-saved claims are supplied.

## Remaining assets and release limits

Final frames for generate, clarify, and unsupported outcomes are unavailable in the supplied visible FigJam content. Two clearly identified placement areas remain: the hero’s final UI slot and Section 06’s three-outcome final artifact area. Owner-provided exports or frame-specific links are required to fill them. PDF explorations are not relabeled as final shipped screenshots.

`public/intent/full/` is Git-ignored in accordance with project guidance for internal company assets. Images remain available to the local build and preview; they will need explicit asset handling for any later approved publication or checkout transfer. No publishing is performed here.

The Quick Look is byte-for-byte unchanged. Its pre-existing disabled full-case-study CTA and pending assets remain as requested; entry to this new page is through the homepage Case study link and projects listing.

## Verification

- `npm run build`: TypeScript and production Vite build pass. Non-blocking Framer Motion `use client` notices and a 565 kB JavaScript chunk-size warning remain.
- Diagram skill self-check passes for all three self-contained HTML artifacts.
- Chromium responsive checks at 1440×1000, 1024×900, 768×1024, 390×844, and 320×740: ten sections present, no page-level horizontal overflow, available images load, and no runtime errors.
- Captured and visually reviewed desktop/mobile editorial sections, all four configuration panels, selected/unselected clarification states, and all three diagrams. Reviewed source image crops before inclusion.
- Verified all three approval choices, updates across both demos, reset to unresolved, native radio keyboard selection, tab arrows/Home/End, panel focus, disclosures, internal anchor targets, unique IDs, shared image-viewer Escape/focus return, diagram keyboard panning, and reduced-motion behavior.
- Verified navigation from the existing homepage Case study link and projects listing, Back/Forward, new-page Quick Look link, direct entry and `/full/` alias.
- Final targeted checks cover persistent tab/panel references, exactly one accessible panel, keyboard operation, carried workflow state, reduced motion, image intrinsic dimensions, and touch-emulated mobile interaction.
- `git diff --check` passes. Hash comparisons confirm `IntentQuickLook.tsx`, `IntentQuickLook.css`, `IntentThumbnails.tsx`, shared `style.css`, and `data/projects.ts` unchanged. A pre-task comparison shows only the new import/route in `main.tsx` and one Intent destination change in `ArchiveProjects.tsx`.
- Browser checks use the existing local preview server. No Safari, Firefox, physical-device, or screen-reader testing was performed. Temporary QA scripts/screenshots are outside the repository; no test dependency was added.
