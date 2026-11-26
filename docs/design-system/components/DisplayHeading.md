# DisplayHeading

The black-weight heading that anchors each home section: About me, Expertise, Featured Projects, Let's create.

- `display-section`: `weight-black`, uppercase, `leading-display`, `tracking-tight`, `clamp(3rem,12vw,160px)`, centred.
- On dark grounds add `.hero-heading`: a 180deg gradient from `ink-dim` to `ink-soft`. On the Expertise band it stays solid `band-light-ink`.
- Enters with FadeIn (y 30px, `duration-enter`, `ease-enter`, once).
- Consumer supplies: one to three words. Longer headings use `case-section`.
