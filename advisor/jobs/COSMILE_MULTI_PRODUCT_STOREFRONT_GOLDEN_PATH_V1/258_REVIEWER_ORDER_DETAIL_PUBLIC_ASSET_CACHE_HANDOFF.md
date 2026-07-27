# 258 — Independent public asset cache delta review

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Tier: `NORMAL_BOUNDED_PREVIEW_CONFIG`
- Base: `b652a8b2ea6a8221a764d42190c318ac2a005d0e`
- Candidate: `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Binding: existing independent Reviewer, actual Opus 5/max,
  `/fable-sentinel`
- Evidence: `254` diagnosis/handoff and `256` Worker result

Review only:

1. `app/next.config.ts`
2. `app/scripts/o1_nonprod_preview_asset_cache.vitest.ts`

Verify:

- the rule exists only for exact `development`;
- production/test/missing/unknown environments return no rule;
- scope is only `/_next/static/chunks/:path*`;
- `no-store, max-age=0, must-revalidate` cannot admit a positive lifetime;
- `nextConfig.headers` uses the single pure helper;
- allowed dev origins remain unchanged;
- no redirect/rewrite/proxy/auth/product/query/schema/DB/provider/economic
  behavior;
- focused RED `4/2` and GREEN `6/6` meaning is sufficient without rerun.

Do not run tests, build, typecheck, runtime, browser, DB, provider, or inspect
unrelated files/history. Write only uncommitted, at most 40 lines:

- `260_INDEPENDENT_ORDER_DETAIL_PUBLIC_ASSET_CACHE_REVIEW.md`
- `261_INDEPENDENT_ORDER_DETAIL_PUBLIC_ASSET_CACHE_REVIEW_POINTER.md`

State actual model/effort/skill, verdict, blocking findings, and residual
runtime-header limitation. Do not commit or push. STOP.
