# 261 — Pointer: preview asset cache policy review

| Field | Value |
|---|---|
| Artifact / verdict | `260_INDEPENDENT_ORDER_DETAIL_PUBLIC_ASSET_CACHE_REVIEW.md` · TIER `NORMAL_BOUNDED_PREVIEW_CONFIG` · **`PASS`** · 차단 결함 0 |
| Handoff / pins | 258 @ docs `1585761` sha256 `e8ccb3db…` · product `b652a8b2..8d4a3272` = 1 commit · **정확 2경로** · clean/upstream-equal |
| Gate | `nodeEnv !== "development" → []` 엄격 일치 단일 게이트 · production/test/undefined/빈문자/공백/`Development`/`DEVELOPMENT`/`dev`/`preview`/`staging` 10종 전부 무규칙(운영 상속 경로 0) |
| Scope / value | `/_next/static/chunks/:path*` 단일 규칙·헤더 1개 · `no-store, max-age=0, must-revalidate` + `not.toMatch(/max-age=[1-9]/)`로 양의 수명 원천 금지 |
| Single source | `headers: async () => previewAssetCacheHeaders(process.env.NODE_ENV)` 위임만 · 헤더 값·source 문자열 파일 내 각 1회(재선언 0) · 헬퍼는 순수 |
| Preserved | `allowedDevOrigins` 3종 바이트 보존(배열+원문 라인 2중 단언) · rewrites/redirects/middleware/env/images/experimental 부재 · 제품·인증·질의·스키마·DB·provider·경제 변경 0 |
| Evidence | RED `4/2` → GREEN `6/6`은 256 보고 인용(재실행 0) · RED 4건은 헬퍼·훅 부재, 통과 2건은 구현 무관 사전 성립분으로 구성이 계약 공백과 정합 |
| Residuals | **R1 설정 계약 수준 증명 — 실제 응답 헤더·프록시/CDN/터널 재작성은 미증명(다음 프리뷰 게이트에서 실측 필요)** · R2 `no-store`는 브라우저 한정(기존 프록시/SW 캐시 즉시 해소 아님) · R3 `chunks/*` 외 가변 dev 자산은 범위 밖 · R4 typecheck/build 미실행 |
| Binding | 확인된 `claude-opus-5`/max · `/fable-sentinel` · exact CWD · 독립 Reviewer |
| Output state | **미커밋**(258 "Do not commit or push" 준수) — 두 파일은 foundation-docs 워크트리에 untracked |
| `RETURN_TO` | `foundation-advisor` — 커밋/푸시 라우팅과 R1 실측 게이트는 Advisor 소관 |
