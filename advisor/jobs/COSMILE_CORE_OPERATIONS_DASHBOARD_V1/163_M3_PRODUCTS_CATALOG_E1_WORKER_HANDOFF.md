# Worker handoff — M3 Products/Catalog E1

OUTCOME REQUIRED: close the preserved single GREEN failure without changing M3 behavior.

BASE STATE: product `a177003e6b272c5295b1b4f9bed7bb4fbc56e960` plus the exact uncommitted nine-path M3 delta recorded in `161/162`; do not reset or reread broadly.

ROOT CAUSE: the focused test checks forbidden visible economic-claim tokens in `page.tsx` source. Its ordered first token is `매출`; the page contains that token only in the negating implementation comment at line 10. Legitimate `판매 가능` copy does not contain any forbidden token. The failure is therefore a source-comment/oracle collision, not a runtime contract defect.

EXACT CORRECTION:
- In `app/src/app/dashboard/products/page.tsx` only, rewrite the line-10 implementation comment to retain the meaning “counts derive only from persisted O1 order records and are not economic totals” without using any forbidden claim token.
- Do not change JSX, runtime behavior, the test oracle, or any other path.

VERIFY ONCE:
`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_products.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/operator_authority_contract.vitest.ts --config vitest.config.ts`

Then run only `git diff --check`, inspect exact nine-path containment, confirm no mock/DB/provider/economic/runtime effects, commit once, non-force push once, write compact result/pointer, and STOP. Any failure is HOLD; no second run or further correction.
