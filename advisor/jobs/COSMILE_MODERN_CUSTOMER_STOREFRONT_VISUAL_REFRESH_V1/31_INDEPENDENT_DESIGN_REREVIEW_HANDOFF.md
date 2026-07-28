# 31 — Independent Design Re-review Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
CLASSIFICATION: `NORMAL_COMPLEX_BOUNDED_DESIGN`
ACTOR: existing independent Reviewer

## Binding

- Required actual model/effort: `claude-opus-5` / `max`
- Required skill: `/fable-sentinel`
- Docs candidate: `61b450cb0f678f6827a257a0c99c05f14f58a4d9`
- Product: read-only `8d4a3272c6baced193be4f9ed88710c39c90d739`, expected clean

## Exact review delta

Review only:

- original findings `21`/`22`;
- Advisor dispositions `25` and `29`;
- corrected `11`–`15` and `27`/`28`;
- Git delta `da1f4d046606ff688ee06c7490bcbd9c6756e5b0..61b450cb0f678f6827a257a0c99c05f14f58a4d9`.

Do not reread product source, public runtime, old mission context, or unrelated docs. Do not render, test, implement, commit, push, dispatch, or mutate.

## Questions

1. Are F1–F4 closed without contradiction?
2. Are F5/F6 closed without a new route, component, or behavior?
3. Does the corrected contract remain truthful for seven current items and an eighth only when actually admitted?
4. Is the design now sufficiently deterministic for a Worker to implement without inventing card geometry, contrast, status placement, focus, or wishlist behavior?
5. Did the correction preserve every mission exclusion and product/runtime effect `0`?

## Return

Write only:

- `32_INDEPENDENT_DESIGN_REREVIEW.md` (≤40 lines)
- `33_INDEPENDENT_DESIGN_REREVIEW_POINTER.md`

Return `PASS`, `NEEDS_PATCH`, or `HOLD`; findings blocking/non-blocking; actual live model/effort/skill; exact reviewed pins; `RETURN_TO: foundation-advisor`; `STOP`.

