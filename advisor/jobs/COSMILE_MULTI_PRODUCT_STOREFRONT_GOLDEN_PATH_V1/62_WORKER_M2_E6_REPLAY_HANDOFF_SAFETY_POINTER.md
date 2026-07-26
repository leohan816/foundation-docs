# M2 E6 REPLAY HANDOFF SAFETY CORRECTION — POINTER

- Status: PASS
- Result: `advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/61_WORKER_M2_E6_REPLAY_HANDOFF_SAFETY_RESULT.md`
- Correction doc: `.../60_ADVISOR_M2_E6_REPLAY_HANDOFF_SAFETY_CORRECTION.md` (docs `14998f71`, blob `e1023313`, sha256 `590cee9a` — verified)
- Product `da0f5dadeeb17779928a6372c9f7ba3cad85015a` → `4dd56c12c72a4e6921295ab26910fbc8abff2526`, branch `implementation/cosmile-multi-product-storefront-golden-path-v1-20260726`, non-force pushed, clean/upstream-equal.
- Ceiling honored: 3 paths (`o1CommerceRuntime.ts`, `api/o1/checkout/start/route.ts`, `o1_checkout_start_idempotency.vitest.ts`). E7 not started.
- Both findings confirmed by RED: replay returned a second `ready`; and sku `adv|x`+product `y` collided with sku `adv`+product `x|y` on one derived number, with the mismatched order actually adopted.
- Fix: `pending_replay` outcome (no client key, no evidence layer) + explicit route `409 {error:"checkout_already_pending"}`; canonical JSON for both the signature and the replay comparison. Opaque `O1-` shape and signature inputs unchanged; payment/inventory economics unchanged.
- Evidence: RED 5 failed / 4 passed, exit 1 → identical command GREEN 9/9, exit 0. Sequential and concurrent replay each yield exactly one `ready`; effects stay order 1, active reservation 1, intent 1, key 1, provider 0.
- Declared: route mapping proven by source-contract oracle, not an executed HTTP response; `O1CheckoutStartOutcome` gained a variant and other consumers were not surveyed (only the one route consumes it inside the ceiling).
- No DB/browser/provider/runtime/checkout/refund/legacy-row action.

RETURN_TO: foundation-advisor
