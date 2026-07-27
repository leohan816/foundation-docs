# 254 — Advisor handoff: public order-detail asset cache correction

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `b652a8b2ea6a8221a764d42190c318ac2a005d0e`
- Classification: `NORMAL_BOUNDED_PREVIEW_CONFIG`
- Worker: existing Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

## Read-only diagnosis

- `/dashboard/orders` links only to
  `/dashboard/requests/[orderId]`.
- That page imports the single current `O1OperatorPanel`.
- Active runtime CWD/HEAD is the exact mission candidate.
- Current server bundle contains the new order time/card/option UI and no old
  flat-table implementation.
- Public and local client chunk SHA are identical
  (`061ed1fa6b2609ab049a2a8cb6fd8424cc5e1ffcbb578b47ef8d6643f71def5e`).
  It contains `op-created-at`, `저장된 상품 이미지 없음`, and
  `선택 옵션 정보 없음`; the old table header is absent.
- Local chunk response: `Cache-Control: no-cache, must-revalidate`.
- Public chunk response: `Cache-Control: max-age=14400, must-revalidate`.

Cause: `PUBLIC_ASSET_BROWSER_CACHE_POLICY_DRIFT`, not a second detail surface
or stale candidate runtime. A same-URL old dev client chunk can remain usable
for four hours.

## Exact two-path ceiling

1. `app/next.config.ts`
2. `app/scripts/o1_nonprod_preview_asset_cache.vitest.ts` (new)

Tests first. Add a pure exported helper used by `nextConfig.headers` so:

- only `NODE_ENV === "development"` returns one rule;
- exact source is `/_next/static/chunks/:path*`;
- exact header is
  `Cache-Control: no-store, max-age=0, must-revalidate`;
- production, test, missing, and unknown environments return `[]`;
- existing `allowedDevOrigins` stays byte-for-byte equivalent.

Run only:

`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_nonprod_preview_asset_cache.vitest.ts`

Preserve meaningful RED, implement only `next.config.ts`, run identical GREEN
once, audit exactly two paths, commit and non-force push. Write uncommitted:

- `256_WORKER_ORDER_DETAIL_PUBLIC_ASSET_CACHE_RESULT.md`
- `257_WORKER_ORDER_DETAIL_PUBLIC_ASSET_CACHE_POINTER.md`

No order/detail UI edit, source/query/schema/DB, status localization, auth,
provider, refund, shipment, economic action, build, typecheck, runtime
restart, browser action, Cloudflare/provider config, or `.next` mutation.
STOP after product push/result.
