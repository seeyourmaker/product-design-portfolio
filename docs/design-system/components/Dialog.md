# Dialog

The native `<dialog>` for project previews, always opened with `showModal()`.

- Panel: `surface-1`, 1px `ink-dim`, `radius-2xl`, `space-40` padding, max 900px / 90% wide, max 90vh scrolling.
- Backdrop: `backdrop` plus an 8px blur. Title uppercase `weight-black` 32px; Lucide `X` close floats right; images `radius-xl`.
- Closes on Escape, backdrop click and the close button; focus returns to the trigger.
- Consumer supplies: title, body, close handler.
