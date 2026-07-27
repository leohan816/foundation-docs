# 262 — Worker handoff: public asset cache runtime gate

- Product candidate:
  `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Review: `260` PASS, blocking `0`, actual Opus 5/max
- Runtime root:
  `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/runtime`
- Current owned leader/PGID: `3216106`, port `127.0.0.1:3000`
- Start boundary: existing owner-only `start-candidate.sh`, exactly once

## Exact gate

1. Verify product HEAD/clean/upstream, PID/PGID/CWD/modes, Toss TEST,
   one-shot OFF, and local substitute absent using names/booleans only.
2. Terminate only owned process group `3216106`; require its complete absence
   and port closed.
3. Execute the existing wrapper exactly once; no second start.
4. Require TCP readiness and exact candidate/CWD/environment boundaries.
5. Identify the single current public client chunk containing all three
   markers: `op-created-at`, `저장된 상품 이미지 없음`,
   `선택 옵션 정보 없음`.
6. Verify local and public bytes have identical SHA and no old flat-table
   header.
7. Verify both local and public response headers for that exact chunk are
   exactly category-equivalent to:
   `Cache-Control: no-store, max-age=0, must-revalidate`.
8. Verify public `/dashboard` is 2xx categorically; leave runtime running.

Use bodyless/header checks where possible; chunk bodies may be hashed/searched
in-process and must not be persisted. No auth, browser profile, DB, provider,
refund, shipment, checkout, economic action, product/docs edit, build,
typecheck, or `.next` cleanup.

First failure is HOLD. If the public header is still rewritten to a positive
max-age, return `PUBLIC_HEADER_OVERRIDE_PERSISTS`; do not change Cloudflare,
proxy, tunnel, or product again.

Write only uncommitted:

- `264_WORKER_PUBLIC_ASSET_CACHE_RUNTIME_GATE_RESULT.md`
- `265_WORKER_PUBLIC_ASSET_CACHE_RUNTIME_GATE_POINTER.md`

STOP.
