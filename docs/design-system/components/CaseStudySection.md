# CaseStudySection

A numbered story section: index and heading, then prose, in a two-column split that stacks on mobile.

- `.cs-section`: `space-96` vertical padding, 1px `line` bottom border, `scroll-margin-top: 40px`.
- `.cs-split`: two equal columns, `space-80` gap; one column under 768px with `space-32` gap.
- Index: `eyebrow` in `accent`, written `NN / Title` (`01 / The friction`), only where the order is real.
- Heading: `case-section`, left aligned (overrides the global centred h2). Prose: `prose` in `ink-soft`, paragraphs `space-20` apart.
- A full-width variant drops the split for figures and diagrams.
