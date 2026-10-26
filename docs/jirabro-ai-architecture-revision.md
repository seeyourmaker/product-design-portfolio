# JiraBro AI architecture revision — 24 October 2026

The supplied `jirabro_ai_architecture_addendum.md` was treated as a creative brief. Technical claims were checked against the local JiraBro source at `/Users/shaldank/Documents/Codex/Teams Agent`; no source files in that repository were changed.

## Source findings

- `src/assistant/ai/semanticPrompt.ts` defines the shared, phase-aware semantic contract: allowed intents, slot rules, no invented issue keys, and weekday interpretation for range worklogs.
- `src/assistant/ai/intentPrompt.ts` builds a compact user prompt and parses model JSON against the intent schema. Malformed or invalid output becomes clarification.
- `src/assistant/chat/buildContext.ts` provides the conversation phase, active issue, and a prior user message capped at 200 characters.
- `src/assistant/ai/autoIntentProvider.ts` selects the configured mode. In auto mode, an available preferred local Ollama path can be tried first; poor extraction can escalate through the local cascade and configured cloud fallback. Gemini, OpenAI, and Anthropic are supported cloud providers when configured. A strict command can bypass model extraction in `src/assistant/chat/handleChatMessage.ts`.
- `src/assistant/intent/validateIntent.ts`, `executeIntent.ts`, and `src/assistant/processLine.ts` distinguish read-only actions, clarification, draft/review/confirmation, cancellation, Jira writes, and the actual API result. Human confirmation is a requirement for conversational writes, not every request.

## Portfolio changes

- Full case study section 04 now includes **Designing the AI’s Instructions** as a product design and engineering contribution. It explains the semantic contract, limited context, conditional provider routing, schema checks, deterministic validation, and write approval.
- Two source-based conceptual architecture diagrams were created in `src/JiraBroAiDiagrams.tsx` with styles in `src/JiraBroAiDiagrams.css`: conditional model routing, and instructions to safe action. Editable standalone HTML/SVG companions live in `docs/jirabro-ai-diagrams/`.
- Quick Look Slide 05 retains its approved title and eight-slide position. Its new responsive, editable two-layer HTML flow separates **Understand** from **Act safely** and states that strict commands bypass the model and read-only actions need no approval.
- At under 1400px, the case-study architecture SVGs give way to semantic ordered text so every label remains legible; the 1440px layout shows the full SVG without clipping. This breakpoint responds to the 1280px safe-action canvas inside the case-study container.

## Verification

- `npm run build`: passed TypeScript and Vite on 24 October 2026. Existing non-fatal Framer Motion `use client` directive warnings remain.
- Headless Chrome at 1440, 1024, 768, 390, and 320px: both case-study architecture diagrams present, no document overflow or page errors, and all eight Quick Look slides accessible through their progress controls. Slide 05 has two visible layers at every width; the mobile version scrolls within the existing slide viewport.
- All four case-study product images loaded. The Intent Identification Quick Look still loaded its original headline.
- Both new standalone diagrams passed the installed diagram-design `scripts/self_check.py`. Desktop diagrams and the 390px Slide 05 capture were visually inspected; the safe-action diagram width was adjusted after inspection and checked again.

No metrics, adoption figures, production Teams deployment, local LLM integration, commit, or deployment were added.
