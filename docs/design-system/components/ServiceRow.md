# ServiceRow

One numbered row of the Expertise list on the light band (`.services` → `.service`).

- Band: `band-light-bg`, `band-light-ink`, `radius-4xl` top corners (`radius-3xl` under 768px), padding `space-128` `gutter` `space-160`.
- Row: zero-padded `display-number` (min width 170px; 120px tablet, 80px phone), `space-64` gap (`space-32` phone), `heading` title uppercase, description in `lead` at 0.6 opacity, max 672px; rows divided by 1px `band-light-rule`.
- Rows fade in with a 0.1s stagger.
- Consumer supplies: title (may contain `<s>` for the struck-through rename) and description. Numbers stay sequential.
