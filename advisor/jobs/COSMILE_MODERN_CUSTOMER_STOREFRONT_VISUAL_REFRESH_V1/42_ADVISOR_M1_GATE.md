# 42 — Advisor M1 Gate

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M1_SHARED_CUSTOMER_SHELL`
VERDICT: `PASS`

## Evidence

- Product candidate: `43a9b1a9ded1a072d074cdc03ed36c5521b28b3b`
- Base: `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Changed paths: five, all inside handoff `41`'s seven-path ceiling.
- Focused gate: `o1_storefront_navigation`, `o1_storefront_a11y_floor`,
  `o1_storefront_visual_shell` — `3 files / 24 tests`, exit `0`.
- `git diff --check`: clean. Product branch: clean and upstream-equal.
- Runtime/browser/DB/provider/economic effects: `0`.

## Containment

- O1 customer routes now use the full-viewport shell; the operator short-circuit
  and legacy flag-off device shell remain separate.
- No route, product truth, auth, cart, order, payment, inventory, refund, schema,
  migration, dependency version, or public runtime behavior was added.
- `CategoryNav.tsx` and `MallTabs.tsx` required no delta because their accepted
  contracts already held.

## Deviations retained for final audit

1. The first mission-local `npm ci` omitted `--ignore-scripts`; Advisor contained
   it by removing only mission-local ignored `node_modules`, reinstalling with the
   frozen command, and proving generated `.prisma/client` absent. A `pkill -f`
   self-match ended only the already-finished install shell (`144`).
2. Two bounded navigation-suite diagnostics exposed stale source-shape oracles.
   The corrected gate still proves branch isolation, dynamic catalog ownership,
   and route safety; it does not restore prohibited legacy copy.
3. The pushed commit contains an inaccurate `Co-Authored-By: Claude Opus 4.8`
   trailer although the live Worker was Opus 5/xhigh. History is not rewritten;
   the trailer receives zero runtime-attribution weight. Subsequent commits must
   use no co-author trailer.

NEXT: `M2_HOME_SHOP_CARD`.
