# Saurabh Portfolio design system

Source of truth for the portfolio's visual language. Files:

- `tokens.json` — every design token (colour per theme, type styles, spacing, radius, shadow, weight, tracking, leading, duration, easing, layout, breakpoint). Edit tokens here only, then run `python3 scripts/build-tokens.py` to regenerate `src/tokens.css`.
- `components/*.md` — usage guidance per component.
- `applying.md` — how the existing CSS moves onto the tokens, with old-value → token maps.

`src/tokens.css` is imported before `src/style.css`. It exposes each token as a custom property (`var(--ink)`, `var(--space-24)`, `var(--radius-pill)`), the `.accent-*` classes that set `--accent` per project, and the paper theme on `.lg-case`.

The rest of this file is the brand book.

A dark, single-family, motion-led system for Saurabh's product design portfolio. Kanit carries everything from 184px black display type to 10px tracked labels. A near-black ground, cool blue-grey ink and one magenta-to-amber gradient CTA make the home page. Every case study uses the same shell and changes only its accent; Local Gigs runs the same shell in the Paper theme. Extend the existing CSS in `src/style.css` and the page stylesheets through these tokens; do not add a second styling system.

## Principles

- **Type is the image.** Headlines are huge, heavy and tight. Let one heading fill the width instead of adding decoration.
- **One loud thing per screen.** The gradient CTA, the avatar or the project accent. Everything else is `ink` on `bg-page`.
- **One shell, many accents.** A case study is recognisable by its accent alone; layout, type and spacing never change between projects.
- **Motion explains, then gets out of the way.** Entrances fade up once; scroll-linked effects follow the reader. Every effect has a reduced-motion fallback.
- **Evidence over claims.** Show real captures and state only what is verified. Never invent metrics, links or project details.

## Content fundamentals

- **Voice:** first person, warm, plain. "Hi, I'm Saurabh", "Have something in mind?", "Let's create." Address the reader as you only in calls to action.
- **Casing:** home display headings, nav, buttons, categories, eyebrows and tags are uppercase through CSS; source text stays sentence case. Case-study titles and section headings are sentence case on screen.
- **Punctuation:** no em or en dashes as sentence punctuation in visible copy. Hyphens and range marks stay (2–3, 80k–100k). Join category terms with a middle dot: `AI · Productivity`. Section indexes read `01 / The friction`.
- **Labels:** buttons name the action: "Explore my work", "View case study", "Contact me". Navigation is exactly About, Expertise, Projects, Contact.
- **Numbers:** zero-padded indexes only where order is real (the five services, the project stack, case-study sections).
- **No emoji.** The one playful device is the struck-through rename: `<s>Vibe Coding</s> Agentic engineering`.

## Color

- **Themes:** `dark` is the site. `paper` is the same tokens with light values, used only by Local Gigs (`.lg-case`). Style through tokens so a component works in both.
- Text: `ink` for primary, `ink-soft` for subtitles and prose, `ink-muted` for captions, meta and tags. `ink-dim` is for the display gradient and control borders only.
- Surfaces step up from `bg-page`: `surface-1` (dialogs, figure frames, panels), `surface-2` (cards), `surface-3` (raised, placeholders), `surface-4` (thumbnail gradient end only).
- Borders: `line` for every 1px hairline, `line-strong` for 2px card and button borders. `wash-hover` is the hover fill for outline controls.
- Home display headings use `.hero-heading`: `linear-gradient(180deg, ink-dim, ink-soft)`. The Expertise band uses `band-light-bg`, `band-light-ink` and `band-light-rule`.
- The primary CTA is the only place the brand gradient (`cta-grad-1` to `cta-grad-4`) appears.
- **Accent:** components read `accent`, which defaults to `focus` (the home purple). A page or card re-points it with one class:

| Project | Root | Class | Accent |
| --- | --- | --- | --- |
| Intent Identification | `.ic-case` | `accent-intent` | `accent-intent` |
| Redesigning Chat Experience | `.chat-study` | `accent-chat` | `accent-chat` |
| Jira Worklog Assistant | `.jb-case` | `accent-jira` | `accent-jira` |
| ADAPT Icon Finder, archive | `.adapt-page` | `accent-adapt` | `accent-adapt` |
| Local Gigs (paper) | `.lg-case` | `accent-gigs` | `accent-gigs`; fills `accent-gigs-fill`, `lime-gigs` |

  The same class goes on the homepage card and thumbnail, so a project has one colour everywhere. The focus ring follows `accent`.
- Every accent passes 4.5:1 on its ground. `accent-gigs-fill` (2.65:1 on paper) is for shapes and fills only, never text.

## Typography

- One family, **Kanit**, from Google Fonts; stack `Kanit, sans-serif`. Five weights: `weight-light` 300, `weight-regular` 400, `weight-medium` 500, `weight-bold` 700, `weight-black` 900. 600 and 800 are retired; load only these five.
- Home: `display-hero`, `display-section`, `display-number`, `thumbnail-label` (all `weight-black`); `nav`, `hero-subtitle`, `hero-intro`, `project-title`, `heading`.
- Case studies: `case-title` for every h1, `case-section` for every h2, `case-nav`, `lead`, `prose`, `eyebrow`, `caption`, `micro`.
- Display sizes are fluid in code (`clamp()` or container units). The px on each style is its desktop ceiling; the usage note gives the clamp.
- Tracking comes only from the `tracking-*` scale; line heights only from `leading-*`. Negative tracking at 40px and up, positive tracking on uppercase small text.
- Fixed text sizes come from one scale: 10, 12, 14, 16, 18, 20, 24, 32, 40px. Product recreations inside case studies (mock UIs, films, thumbnails) are exempt.
- Measure: leads and prose max `prose-max`; About copy max 560px. Case-study text keeps one left edge.

## Layout and spacing

- Spacing comes from the `space-*` scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160px.
- Gutters: `gutter` (40px) on every page on desktop, `gutter-mobile` (24px) under 768px. Case studies sit in `content-max` (1344px); nav rows and project cards in `nav-max` (1440px).
- Sections breathe: `space-96` vertical padding in case studies, `space-128` on home bands. The Expertise band and Projects section overlap with `radius-4xl` top corners.
- Featured projects are sticky cards in 100vh tracks, stuck at `sticky-top` (128px; 96px under 1024px), scaling down 0.03 per card still to come.
- Breakpoints: `bp-laptop` 1199, `bp-tablet` 1023, `bp-mobile` 767, `bp-phone` 639, `bp-narrow` 420 (all max-width), plus `prefers-reduced-motion`. Add no others.

## Shape, borders and depth

- Everything clickable is a pill (`radius-pill`). Containers get large soft corners by size: `radius-4xl` sections and desktop cards, `radius-3xl` media, `radius-2xl` dialog, `radius-xl` hero visuals, `radius-lg` tiles, `radius-md` figure frames, `radius-sm` screenshots, `radius-xs` tiny chips.
- Separate with borders, not shadows. Shadows are named and rare: `shadow-cta`, `shadow-evidence` (one tilted screenshot per case study), `shadow-hard` and `shadow-hard-soft` (paper theme only), `shadow-glow` (contact hero).

## Motion

- Framer Motion for entrances, scroll-linked values and route dissolves; GSAP for the avatar, marquees and Quick Look films. Lenis is not used. Keep every cleanup (kill tweens, disconnect observers, clear transforms).
- **FadeIn:** opacity 0 → 1, y 30px, `duration-enter`, `ease-enter`, once, staggered 0.05–0.15s.
- **Hover and route change:** `duration-fast`; CTA lifts 3px, nav links drop to 0.7 opacity, outline controls fill `wash-hover`, text actions widen their arrow gap and turn `accent`.
- **UI tweens** in films and toggles: `duration-base`. Clip-path reveals: `ease-reveal`.
- **Hero:** heading lifts up to 128px on scroll through a spring (stiffness 90, damping 24). The avatar follows a fine pointer with `gsap.quickTo` (1.55s x, 1.8s y, power2.out, clamped ±80px / -70px); its floor shadow scales with it; touch devices use device motion behind "Enable Motion".
- **About text:** each character fades from 0.2 to 1 opacity as it scrolls through.
- **Reduced motion:** durations drop to 0.01ms, `scroll-behavior: auto`, marquee and card transforms are removed, films show a still.

## Accessibility

- Focus is always visible: 2px outline in `accent`, offset 4–6px.
- Every case study starts with SkipLink, then CaseStudyNav.
- Dialogs are native `<dialog>` with `showModal()`; Escape, backdrop click and the close button all close it.
- Decorative images get `alt=""`; animated text keeps its sentence in `aria-label`; loading states use `role="status"`.

## Iconography

- **Lucide React** line icons only, 16px by default (14–18px allowed), `aria-hidden="true"` beside a text label. Core set: `ArrowUpRight` (open or outbound), `ArrowLeft` (back), `ArrowRight` (next), `X` (close), `Check`, `Play`, `Pause`.
- Unicode arrows are allowed in plain text links ("Back to top ↑").
- There is no logo. The name is set in Kanit; the portrait in `assets/Identity` is the visual signature and favicon.

## Imagery and diagrams

- Real product captures, Figma frames and the owner's own illustrations only. No remote or third-party media until rights are confirmed.
- Every screenshot, video or diagram sits in a Figure. Marquee tiles are 420×270 (320×210 on phones) with `radius-lg`.
- Diagrams (architecture, flows, timelines, decision trees) use the diagram-design skill as editable HTML/SVG, restyled with these tokens. Never invent architecture or workflows.
