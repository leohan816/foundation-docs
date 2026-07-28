# 75 — Advisor Build Type-Oracle Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `CUMULATIVE_BUILD_CORRECTION`
BASE: product `07561dcc618a846559733dcc108577acdad9f02d`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

The one authorized generate-first build compiled successfully, then stopped in
TypeScript at `o1_checkout_start_idempotency.vitest.ts:392`: an inline object
literal adds `snapshotContentSha256` to the narrower
`deriveO1OrderNo` line type. The file is byte-identical to base `8d4a327`; this
is a pre-existing test-expression defect, not a storefront or runtime defect.

## Exact one-path ceiling

`app/scripts/o1_checkout_start_idempotency.vitest.ts`

Preserve the assertion's meaning: snapshot provenance exists on the test line
but must not affect the owner/SKU/product/quantity/unit-price order-number
derivation. Replace only the excess-property inline literal with a named local
object holding the same fields plus the same snapshot value, then pass that
variable to `deriveO1OrderNo`. Do not cast, delete the metadata, weaken the
assertion, or edit the runtime function.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_checkout_start_idempotency.vitest.ts
```

One focused GREEN only; the preserved build failure is the RED. On PASS:
`git diff --check`, exact one-path containment, commit without co-author,
non-force push, compact return, STOP. Do not rerun build, typecheck, another
test, runtime, browser, DB, provider, or economic action; Advisor owns the one
corrected cumulative build.
