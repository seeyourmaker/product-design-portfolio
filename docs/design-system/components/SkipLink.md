# SkipLink

The first focusable element on every case study; hidden above the viewport until it receives focus.

- `.cs-skip`: fixed, left `space-24`, top -100px → `space-16` on focus; `accent` fill, `on-accent` text, 14px, padding `space-12` × `space-20`.
- Replaces `.jb-skip`, `.ic-skip`, `.adapt-skip`, `.chat-study-skip` and `.lg-skip`, which used different offsets and, in two cases, opacity tricks.
- Consumer supplies: the id of the main story section.
