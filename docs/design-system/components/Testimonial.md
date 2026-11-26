# Testimonial

A 420×270 quote card in the homepage marquee (`.home-testimonial` in `src/HomeMarquees.tsx`).

- `surface-2`, 1px `line`, `radius-lg`, `space-32` padding, `space-16` gap. Eyebrow 12px `tracking-widest` `ink-soft`; quote `body-sm`; "Unfiltered" label in `accent`.
- Focusable as a button with the accent ring; the alternate panel slides up on interaction; keeps `touch-action: pan-y`.
- Consumer supplies: the entry from `homeTestimonials.ts`. Never edit testimonial copy.
