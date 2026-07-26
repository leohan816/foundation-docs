# M2 E4 DUPLICATE CHECKOUT — DIAGNOSIS POINTER

- Status: PASS_DIAGNOSIS (read-only; all rows preserved)
- Result: `advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/50_WORKER_M2_E4_DUPLICATE_CHECKOUT_DIAGNOSIS_RESULT.md`
- Handoff: `.../49_WORKER_M2_E4_DUPLICATE_CHECKOUT_DIAGNOSIS_HANDOFF.md` (docs `ffd3233f`, blob `bf84f815`, sha256 `4e5ffdba` — verified)
- Product `e257ae08e7111603c930d54197ba01001a70a354`, clean/upstream-equal, no product path touched.
- Evidence: 2 × `POST /api/o1/checkout/start` → both `409`; 2 equivalent `pending` orders 2 s apart (same owner/line/quantity/total/currency, distinct order numbers); 1 `reserved` hold each with identical SKU/quantity signature.
- First failing boundary: payment-intent lane, after order creation and reservation already persisted (intents `0`).
- Provider/economic effects exactly `0` (intents, provider refs, transactions, captures, refunds all `0`); non-money residue is 2 TTL-bounded inventory holds.
- E2 preserved rows intact: 3 ownerless active carts / 3 items; the post-fix cart is owner-attributed.

RETURN_TO: foundation-advisor
