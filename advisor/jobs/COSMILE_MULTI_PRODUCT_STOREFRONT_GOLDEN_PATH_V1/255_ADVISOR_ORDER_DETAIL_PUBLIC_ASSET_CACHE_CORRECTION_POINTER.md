# 255 — Public asset cache correction pointer

- Handoff: `254_ADVISOR_ORDER_DETAIL_PUBLIC_ASSET_CACHE_CORRECTION_HANDOFF.md`
- Cause: `PUBLIC_ASSET_BROWSER_CACHE_POLICY_DRIFT`
- Base: `b652a8b2`
- Ceiling: `next.config.ts` + one focused test
- Production rule count: zero
- Next: same Opus 5/xhigh Worker; RED/GREEN, commit/push, uncommitted
  `256`/`257`, STOP
