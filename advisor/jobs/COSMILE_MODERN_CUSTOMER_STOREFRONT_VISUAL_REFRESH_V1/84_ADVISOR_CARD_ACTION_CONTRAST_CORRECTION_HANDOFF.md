# 84 — Advisor Card Action Contrast Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `CARD_ACTION_CONTRAST_CORRECTION`
BASE: product `cb1e2c6e944d4cbc8e51491316e3b3a52fe32c9a`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
VERDICT: `PROCEED_WITH_LIMITS`

Independent review `82` / `83` is PASS with blocking 0 but confirms one
accepted-contract gap: normal-size card Cart actions remain Tailwind
orange/white, while contract `12` §3 and closed design finding F3 require
persimmon `#F15A35` with ink `#18211D`. Close only the card-action color and
disabled-color presentation before public browser acceptance.

## Exact two-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/src/app/globals.css`

Tests first: add one focused assertion that, within `.o1-shell
.o1-card-actions` only, buttons use `background: var(--persimmon)` and `color:
var(--ink)`, while disabled buttons retain a quiet neutral background and
legible non-white text. Require meaningful RED.

Implementation: add only those two scoped declarations in `globals.css`.
Do not edit `AddToCartButton`, another component, markup, behavior, Tailwind,
another route, or an unscoped/legacy selector.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts
```

Run the identical command once for GREEN, then `git diff --check`, exact
two-path containment, commit without co-author, non-force push, compact return,
and STOP. No build/typecheck/runtime/browser/DB/provider/economic action; no
backend, schema, auth, dashboard, catalog-data, or commerce-semantic change.
