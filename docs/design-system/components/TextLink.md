# TextLink

Two link treatments for moving between a project's views: the bordered pill link and the underlined text action.

- `.pill-link`: 1px `line-strong` border, `radius-pill`, min height 48px, 14px uppercase `tracking-wider`, `space-4` icon gap. Replaces `.case-study-link` and its compact 10px variant.
- `.text-action`: no box, 1px `accent` underline, `body-sm` size; on hover the arrow gap grows `space-20` → `space-32` and the text turns `accent`.
- Consumer supplies: label, href; the accent comes from the page's accent scope.
