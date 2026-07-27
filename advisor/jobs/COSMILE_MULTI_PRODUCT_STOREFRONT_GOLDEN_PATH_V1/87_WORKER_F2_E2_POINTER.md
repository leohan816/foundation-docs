# F2 E2 EXACT-SET AND CATEGORY CONTAINMENT — POINTER

- Status: PASS
- Result: `advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/86_WORKER_F2_E2_RESULT.md`
- Handoff: `.../85_ADVISOR_F2_E2_EXACT_SET_CATEGORY_HANDOFF.md` (docs `5ece04e9`, sha256 `3b528640` — verified)
- Product `7088e4e21a791c5d6c741a78ab9c891b59d85d70` → `91ded4491785ff4d18f081d05fce9ca63cc6f1e9`, branch `implementation/cosmile-multi-product-storefront-golden-path-v1-20260726`, non-force pushed, clean/upstream-equal.
- Ceiling honored: exactly 3 paths; 168 insertions, 3 deletions; `git diff --check` clean; schema/package/lock unchanged; zero overlay price/stock lines in the diff.
- Evidence: RED 6 failed / 23 passed, exit 1 (one failure per finding) → identical frozen command GREEN 29/29, exit 0 on the first re-run, with no intermediate oracle correction.
- All four findings corrected: seed admits only the exact frozen overlay (order not authority, tampered values refused), bind requires a product's own frozen SKU id, activate requires exactly the seven frozen SKU ids before Prisma, and the activation catch maps only its two owned rollback tokens with everything else collapsing to `activation_failed`.
- Driver-detail containment proven behaviourally: with runtime and payload both admitted the call reaches the mocked-`{}` Prisma boundary and still returns a closed category carrying no `prisma`, `$transaction`, `$executeRaw`, `not a function` or `undefined` text.
- Preserved: in-transaction seven-binding/snapshot/product precheck, both rollback throws, approved lane, checkout, pages, exact seven and excluded eighth.
- Not proven: the candidate SQL beyond the new guards is still unexecuted; success paths against a real database remain for the isolated runtime gate.
- No DB/runtime/browser/provider/build/typecheck action; preserved orders, reservations, intents and transactions never queried.

RETURN_TO: foundation-advisor
