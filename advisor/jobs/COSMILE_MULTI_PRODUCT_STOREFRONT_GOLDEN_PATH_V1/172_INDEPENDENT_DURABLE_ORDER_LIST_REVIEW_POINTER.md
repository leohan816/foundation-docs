# 172 — Pointer: durable Orders-list enrichment review

| Field | Value |
|---|---|
| Artifact / verdict | `171_INDEPENDENT_DURABLE_ORDER_LIST_REVIEW.md` · TIER `NORMAL_BOUNDED_UI` · **`PASS_WITH_RISK`** |
| Handoff / pins | 169 @ docs `2e2d7f7` sha256 `12a30cf1…` · product `d7d0b78..990efb8` = 1 commit · 정확 5경로 · +437/−98 · clean/upstream-equal |
| A (medium·시정) | 주문번호가 새 표에서 미렌더(`page.tsx` `orderNo` 참조 0) — 구 surface는 `O1ConsoleFulfillment.tsx:56/76`에서 표시했고 `PAGE_DESCRIPTION`은 여전히 "주문번호…"를 약속(모순을 `o1_core_dashboard_orders.vitest.ts:80`이 고정). 최소 시정: 이미 투영된 `row.orderNo` 1열 렌더, 또는 문구+단언 정정 |
| B (medium·risk) | 목록 `LIKE 'O1-%'` vs 경제 읽기 `EXISTS(PaymentIntent)`로 모집단 불일치 → intent 미생성 정상 주문/창 이탈 주문이 매치 부재(`orderListRead.ts:90`) → 페이지 **전체** UNAVAILABLE. 계약대로의 fail-closed지만 폭발 반경은 Advisor 계약 결정 사항 |
| C (low) | `orderTime`이 UTC를 시간대 표기 없이 출력(KST 오독 여지) |
| Q1–Q6 | 1 PASS(PII/provider 식별자 0) · 2 PASS(전량 fail-closed) · 3 PASS(동일 principal 3-grant 후 읽기·action 0) · 4 PASS+C(재계산·날조 0) · 5 **참조 회귀**/도달성 보존·개선 · 6 PASS(적대적·truth-state 단언 약화 0) |
| Binding | `/status`+동일 프로세스 판별자로 확인된 `claude-opus-5`/max(argv는 과거 기본값 유지·169 기재 인용) · `/fable-sentinel` · exact CWD · Worker 독립 |
| Boundaries | read-only · 테스트/runtime/DB/browser/provider/mutation/광역 재독 0 · docs-only 커밋(171/172) |
| `RETURN_TO` | `foundation-advisor` — A 시정 라우팅, B 계약 결정(또는 Leo 위험 수용), C 권고 |
