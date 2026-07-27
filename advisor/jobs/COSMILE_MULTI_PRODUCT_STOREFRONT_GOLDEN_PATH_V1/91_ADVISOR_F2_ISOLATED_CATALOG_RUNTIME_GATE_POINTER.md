# Pointer — F2 isolated catalog runtime gate

- Handoff: `91_ADVISOR_F2_ISOLATED_CATALOG_RUNTIME_GATE_HANDOFF.md`
- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product: `91ded4491785ff4d18f081d05fce9ca63cc6f1e9`
- Foundation: `966db20822b7accb36c33dedb01ffba51a9bef68`
- Review gate: `89_F2_HARD_SAFETY_REVIEW.md` — PASS, blocking 0
- Actor: existing Cosmile Worker, Opus 5/xhigh, `/fable-builder`
- Effect ceiling: exact seven-product candidate bundle plus reviewed
  non-production candidate catalog DB setup and one idempotent replay
- Forbidden: tracked write, schema/migration, protected commerce/customer row
  change, provider/browser/economic action
- Return: `92`/`93`, then STOP at Advisor gate
