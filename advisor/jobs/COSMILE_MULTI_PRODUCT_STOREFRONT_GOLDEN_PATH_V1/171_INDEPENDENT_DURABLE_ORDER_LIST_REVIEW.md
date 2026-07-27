# 171 — Independent review: durable Orders-list enrichment

TIER `NORMAL_BOUNDED_UI` · VERDICT: **`PASS_WITH_RISK`** · `RETURN_TO: foundation-advisor`

**Binding.** `/status` + same-process discriminator(`REVIEWER_OPUS5_MAX_READY`)로 확인된 현행 바인딩 `claude-opus-5` · effort max(launch argv는 과거 기본값 유지 — 169 §Live binding 기재대로 인용) · `/fable-sentinel` · CWD 정확 · Worker 컨텍스트/쓰기 권한 없음. Docs `2e2d7f7` HEAD 일치 · 169 sha256 `12a30cf1…`. Product `d7d0b78..990efb8` = 1 commit · 정확 5경로 · +437/−98 · clean/upstream-equal. 테스트/runtime/DB/browser/provider/mutation 0 · GREEN `19 passed / 11 skipped / exit 0`은 167 보고 증거(재현 아님).

## Findings

**A [medium · 시정 필요 · Q5]** 이전 목록의 1차 운영 참조인 **주문번호가 새 표에서 사라졌다.** 구 surface는 `O1ConsoleFulfillment.tsx:56`(헤더 `주문번호`)·`:76`(`{row.orderNo ?? "—"}`)로 표시했고, 신규 표 헤더는 `상품/수량/금액/주문 시각/주문 상태/결제/환불/배송` 8열뿐(`page.tsx` 신규 `<thead>`) — `page.tsx` 전체에 `orderNo` 참조 0건이며 `OrderListRow.orderNo`(`orderListRead.ts:22`)는 조인 키로만 쓰인다. 더해 페이지 설명문 `PAGE_DESCRIPTION`("현재 확인 가능한 **주문번호**와 주문 상태를 한 곳에서 확인합니다.")은 그대로 남아 **문구가 렌더 결과와 모순**되고, 그 문구를 고정하는 단언(`o1_core_dashboard_orders.vitest.ts:80`)이 통과 중이라 모순이 테스트로 고정돼 있다. 구 단언 `{row.orderNo ?? "—"}`은 이제 미사용 공용 컴포넌트로 재스코프됐다. 상세 도달성은 오히려 개선(`제목 → /dashboard/requests/${encodeURIComponent(row.orderId)}`)이라 Q5는 "참조 회귀 · 도달성 보존+개선"으로 갈린다. **최소 시정:** 이미 투영된 `row.orderNo`를 한 열(또는 제목 아래)에 렌더 — 신규 읽기·필드·권한 0. 참조 제거가 의도라면 대신 `PAGE_DESCRIPTION`과 :80 단언을 정정할 것(둘 중 하나는 반드시).

**B [medium · risk · Q2 범위]** 두 읽기의 **모집단이 다르다**: 목록은 `WHERE o."orderNo" LIKE 'O1-%'` ORDER BY createdAt DESC LIMIT 50(`o1CommerceRuntime.ts` 신규 SQL), 경제 읽기는 `WHERE o."orderNo" IS NOT NULL … AND EXISTS(PaymentIntent)` ORDER BY createdAt DESC,id DESC LIMIT 50(`paymentRefundReadRepository.ts`). 따라서 **아직 intent가 없는 정상 O1 주문**(주문 생성~intent 생성 사이, 또는 intent 실패로 pending 잔존)이나 비-O1 주문이 창을 잠식해 밀려난 O1 주문은 매치 부재 → `orderListRead.ts:90`에서 전체 `null` → 페이지 전체가 "주문 사실을 현재 조회할 수 없습니다."로 닫힌다. 계약(162/163)이 명령한 whole-page fail-closed 자체는 정확히 구현됐으나, **손상 데이터가 아닌 통상 상태가 전체 화면을 비우는 폭발 반경**은 계약 결정 사항이다. **최소 시정(택1·Advisor 결정):** 경제 읽기를 목록의 orderNo 집합으로 구동하거나 두 필터/limit를 정렬하거나, per-row `확인 없음` 표기를 계약에 명시.

**C [low]** `orderTime = value.toISOString().slice(0,16)`는 **UTC를 시간대 표기 없이** ko-KR 금액 옆에 출력 — 재계산·날조는 아니나 KST로 오독될 여지(9시간). 표기 추가 또는 계약상 UTC 명시 권고.

## Questions 1–6

1. **PASS** 투영 필드는 orderId(링크·key, 기존 패턴)·orderNo·title·counts·검토된 총액/통화/시각/결제·환불 범주·배송 상태뿐 — 신규 SQL은 buyer/contact/address/session/provider/payment body/secret 미선택, 테스트가 금지 토큰 sweep(`:128`) 수행.
2. **PASS** 비레코드·공백 orderId/orderNo/dbStatus·양측 중복 orderNo·공백 title·비양수 count/quantity·`totalQuantity < lineCount`·미지 배송 토큰·매치 부재 전부 `return null` → 전체 페이지 UNAVAILABLE(부분 페이지·날조 0). 단 B의 폭발 반경 참조.
3. **PASS** flag → root → `orders.read`+`fulfillment.read`+`reconciliation.read`(전부 동일 principal 대조) **이후** 두 읽기 수행, 실패는 DENIED/UNAVAILABLE. 읽기 전용·mutation 0(신규 grant 요구는 default-deny 강화 방향).
4. **PASS(+C)** 총액·통화·시각·결제/환불 범주는 검토된 행에서 그대로 전달(재계산 0), 미지 토큰은 `확인 없음`·배송 부재는 `배송 기록 없음` — 0으로 지어내지 않음.
5. **REGRESSED(참조) / 보존·개선(도달성)** — Finding A.
6. **PASS** 신규 케이스는 적대적(권한·2회 읽기 상한·malformed/중복/불일치 일괄 fail-closed·식별자 누설 sweep·SQL 확장 한정)·스코프 조정은 공용 컴포넌트↔페이지 소유권 이동에 따른 재배치이며 한국어 truth-state(CONFIRMED_ZERO/UNAVAILABLE/DENIED/DISABLED·빈 상태 문구) 단언 약화 0.

**Rationale.** 안전·경제·PII 경계 위반 0, fail-closed 계약 구현 정확 → BLOCKED 아님. 그러나 Q5에 대한 실제 회귀 1건(문구-렌더 모순 포함)과 통상 상태로 전체 페이지가 닫히는 위험이 남아 clean PASS 아님 → **PASS_WITH_RISK**(A는 시정 라우팅, B는 계약 결정, C는 권고).
