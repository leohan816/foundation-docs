# ADVISOR GREEN DISPOSITION — TWO TEST-ORACLE CORRECTIONS

## Decision

`PROCEED_ONE_FINAL_CORRECTED_GREEN`

The one GREEN failed on three test-only defects; no product-contract failure was exposed:

1. `o1_checkout_start_idempotency.vitest.ts` calls an undefined local helper twice. Define exactly:
   `const readFileSyncSource = (relative: string) => readFileSync(resolve(process.cwd(), relative), "utf8");`
   using its existing imports.
2. `o1_order_lifecycle.vitest.ts` has one stale whole-object equality that predates the newly authorized `lines` key. Add the exact seeded line:
   `{ title: "K-Beauty Item 1", sku: "sku_a", quantity: 1, unitPrice: 1000, totalPrice: 1000 }`.

No other test/source change. Preserve all current eight-path deltas. Same Opus 5/xhigh Worker, same session/CWD/context, no reads or diagnosis.

Run the identical corrected focused gate from disposition `129` exactly once. First failure: HOLD, no retry. PASS: exact eight-path containment, diff-check, product commit/non-force push, compact `135/136` result, STOP.

No DB/runtime/browser/provider/refund/economic action. The post-reversal 8-product storefront requirement remains recorded separately and does not enter this correction.
