# Portfolio content audit — 27 October 2026

Scope: current local React/Vite site, its project data and page copy, compared with the supplied `Content Audit.md`. This is an audit only; no site content was changed. The note's requests are treated as review input, not as instructions to implement during this audit.

## What I need from the owner

| Priority | Please provide or decide | Why |
| --- | --- | --- |
| 1 | The exact LinkedIn profile URL to use for **Contact me**, plus any preferred public email or other contact route. | The homepage currently ends with “Contact details coming soon,” and its About CTA only scrolls to that empty footer.
https://www.linkedin.com/in/saurabhhaldankar/|
| 1 | Approved homepage testimonials: each original quote, author name, role, and any playful alternate quote you want revealed. Confirm permission to publish the attribution. | All three marquee cards currently show “Approved quote to be supplied” and “Awaiting approved testimonial.” If none are ready, they should be hidden. |
dont hide yet
| 1 | The Catalog Curator Revamp case-study URL when it exists, or a decision to relabel/hide the **Case study** action until then. | The homepage button currently opens a static concept-preview dialog. A direct visit to `/projects/catalog-curator-revamp` falls back to the homepage because no case-study route exists. The Projects listing sends visitors back to the homepage preview.
create a quick look page and case study page for it, content will be given later. Rename the project from catalog-curator-revamp to redesigning-chat-experience
| 1 | One shareable final Intent Identification conversation flow, preferably showing request → clarification → limitation, with export/frame links and confirmation that it may appear publicly. If no released UI can be shared, say so. | The full case study has two visible final-frame placement areas; the Quick Look still says “Final UI pending.” The conceptual demos can remain, explicitly labeled as reconstructions. |
I'm still working on final UI
| 1 | Intent Identification timeframe (Aug-Sept/2026 or 4 weeks) and a concise ownership boundary: which research synthesis, interaction rules, conversation design, AI-instruction work, and Jev collaboration you personally owned. | The first screen states role and collaborators but no timeframe or precise responsibility statement. |
| 1 | Method behind the ~60,000 → ~20,000 initial-prompt token observation: comparable run count, prompt set, model/settings, aggregation, and what can be disclosed. | The page correctly labels this as engineering development testing and ~67%, but the method is not independently documented in the portfolio. |
| 2 | Cursor implementation and Figma Agent verification screenshots, if shareable. | The ADAPT Icon Finder case study shows two labeled evidence placeholders inside an expandable section. These can be removed if the captures cannot be shared. |
| 2 | The destination for a **Blogs** navigation item: existing blog URL, planned index route, or a decision to wait until posts exist. | The supplied note asks to replace the Expertise nav item with Blogs, but no blog destination is present in the site data. |
| 2 | Current JiraBro Teams publication status and whether the “interactive sandbox — coming next” item is still planned. | The case study says the Teams integration is implemented and locally tested while organizational publication is in progress; that status may need updating. |
| 2 | Clarify whether “remove dashes” in the note means em/en dashes used as punctuation, hyphens in compound terms, or both. | A blanket replacement would damage labels, dates, and compound words. |

## Confirmed mistakes and unfinished public copy

1. **Homepage contact and testimonial placeholders are visible.** The footer says “Contact details coming soon.” The three testimonial cards expose approved-quote placeholders. Sources: `src/main.tsx`, `src/HomeMarquees.tsx`, `src/data/homeTestimonials.ts`.
2. **Catalog Curator CTA overpromises the destination.** The visible **Case study** action opens a concept-preview dialog; the full route is absent. The route fallback also makes direct visits confusing. Sources: `src/main.tsx`, `src/data/projects.ts`, `src/ArchiveProjects.tsx`.
3. **Intent Identification has contradictory completion signals.** Its full case study exists at `/projects/intent-identification`, yet Quick Look disables “View full case study” and says “coming later.” The full page and Quick Look both display pending final-UI copy. Sources: `src/IntentQuickLook.tsx`, `src/IntentCaseStudy.tsx`.
4. **ADAPT and JiraBro include future-work furniture.** ADAPT exposes two screenshot slots; JiraBro ends with “Interactive sandbox — coming next.” These should receive real evidence or be omitted before publication. Sources: `src/AdaptIconFinder.tsx`, `src/JiraBroCaseStudy.tsx`.
5. **The Projects page uses migration-facing copy.** “Four flagship projects from the current portfolio,” “02 / MIGRATED ARCHIVE,” and “Stories and original assets carried over from the previous portfolio” describe the site's construction rather than the work. The supplied note provides replacement/removal direction. Source: `src/ArchiveProjects.tsx`.
6. **A homepage title has a spelling error:** “You cant always chat” needs “can't” unless preserving that exact Figma wording is intentional. Its description, “Changing the way we chat with AI assistants,” is broad and could state the interaction contribution more directly. Source: `src/data/projects.ts`.
7. **The Intent case-study opening could establish the contribution sooner.** The page explains ownership in later sections, but the first screen lacks a date and a plain problem → decision → observed result summary. The decision diagram also needs a visible stacked summary for phone readers; its current text alternative is inside a closed details element. Source: `src/IntentCaseStudy.tsx`.

## Already specified in the supplied note — no new content needed

- Home navigation and contact-button wording, once the Blogs and LinkedIn destinations are supplied.
- Remove the Projects-page migration copy and the UDENT/Facebook Dark Theme project cards; keep the four featured projects themselves (the note's “Four flagship projects … remove” appears to refer to that sentence).
- Add Quick Look/Case Study actions to Recent Work cards except ADAPT, with the Catalog destination pending.
- Apply the listed archive thumbnail image, fit, alignment, background, and generative-fill changes. The smart-watch replacement thumbnail needs design work, not further narrative copy.
- Investigate circular-text blinking and the ADAPT Figma-icon animation. These are motion defects, not content gaps.
- Replace or remove the Intent final-frame slots according to the sharing decision; connect the existing full-case-study CTA; improve the phone decision summary.

## Accuracy boundaries to preserve

- The Intent Identification experience is stated as released to customers. Do not infer that every Jev detail or the portfolio's conceptual styling shipped.
- The ~67% figure is an initial-prompt development observation, not production performance, a full service-creation result, or a Jev-only effect.
- JiraBro's Teams preview is a labeled mockup; publication status needs current owner confirmation.
- Archive projects are reconstructed from prior published material. Their original-source links and usage rights were not revalidated in this content audit.
