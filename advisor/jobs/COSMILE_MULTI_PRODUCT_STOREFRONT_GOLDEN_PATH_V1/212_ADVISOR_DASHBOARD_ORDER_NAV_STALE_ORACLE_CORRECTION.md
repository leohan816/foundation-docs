# ADVISOR CORRECTION — STALE M4 ORACLE, THEN IMPLEMENT FREEZE 206

Status: **PROCEED**

The RED in Worker result `210/211` is valid after one exact oracle correction. The failing M4 assertion predates and contradicts:

- accepted M3A Orders enrichment already present in base `b39e914`, where shipment state and durable total/currency are truthful existing read fields; and
- freeze `206`, which explicitly adds captured-sales display from the existing reviewed payment/refund read.

This is not permission to weaken authority, mutation, privacy or fabricated-data checks.

## Preserved tests-first state

Exactly three uncommitted test paths exist; source delta remains zero:

- Orders test SHA-256 `19aa38536d08016866eb8abd43c0cc895f88a98f8dc90815e74e6ff62599f981`
- Reads test SHA-256 `a765c6e5c41c67fd1bfb291d085476467b14695bca84c6860c5d38b60a898593`
- Payments test SHA-256 `36f7036f17eda35ec5d4b9cda476abc247846f72d2227bf914df89d9aa59bcfe`

The original RED remains preserved: `4 failed / 30 passed`, exit `1`.

## Exact correction

In `app/scripts/o1_core_dashboard_reads.vitest.ts` only:

1. Rename the stale assertion so it claims only what it can still prove: no customer authority, direct data access, command/mutation surface, provider execution or identifying display.
2. Remove only these overbroad read-display tokens from its shared forbidden array:
   - `shipment`
   - `amount`
   - `currency`
   - `KRW`
   - `price`
3. Retain every customer/session, direct Prisma/query, form/input/button/onClick/fetch/POST, nonce/step-up, refund execution, restock/recovery, email and phone prohibition.
4. Add a short contract comment: accepted M3A and freeze 206 permit only existing reviewed shipment/economic read facts; the focused Orders/Payments tests separately pin their source, fields, fail-closed behavior and no-write boundary.

Then implement only the three frozen source paths from `208`. Run the identical focused command exactly once for GREEN. No additional RED/diagnostic run.

On GREEN: exact six-path containment, `git diff --check`, commit/non-force-push product once, write `214/215`, commit/non-force-push docs, STOP.

All other bounds in `208` remain unchanged.
