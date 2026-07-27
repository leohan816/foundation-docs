# 218 — Independent review: dashboard order identity, navigation, captured-sales summary

TIER `NORMAL_BOUNDED_UI` · VERDICT: **`PASS`** · `RETURN_TO: foundation-advisor`

**Binding (live runtime, not session name).** 확인된 현행 바인딩 `claude-opus-5` · effort max · `/fable-sentinel`(+ contract/provenance/classification/delta references) · CWD `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1` · Advisor/Worker와 별개 세션·읽기 전용. 선행 확인: Agent Office `TEAM_OPERATING_MODEL.md`·`roles/reviewer.md`·`RESULT_REPORTING_PROTOCOL.md`. Docs `f09a051` HEAD 일치 · 216 sha256 `3634e8ae…`. Product `b39e914..52343f5` = 1 commit · **정확 6경로** · +339/−32 · clean/upstream-equal. 테스트/빌드/typecheck/DB/runtime/browser/provider/mutation 0 — RED `4 failed / 30 passed` → GREEN `54/54 exit 0`은 214 보고 증거(재현 아님).

## 판정 항목

1. **PASS — 주문번호 = 1차 식별자·인코딩 상세 링크.** Orders 표 첫 열의 `<Link href={/dashboard/requests/${encodeURIComponent(row.orderId)}}>`가 이제 `{row.orderNo}`를 감싸고(mono·semibold·underline), 상품명 + `외 N건`은 링크 **뒤** 블록 span으로 강등(`orders/page.tsx` 해당 hunk). 내부 cuid `orderId`는 `key`와 인코딩 href에만 존재 — 표시 0. Recent Orders도 동일: 보이는 값은 `row.orderNo ?? "—"`이고 `orderId`가 없으면 링크 없이 span으로 fail-soft(`dashboard/page.tsx` `detailHref === null` 분기), 타입 주석이 "orderId 는 화면에 보이지 않는다"를 명시. 테스트가 링크 내부/외부 위치를 각각 고정(`link … .not.toContain("{row.title}")`, `not.toMatch(/>\s*\{?\s*row\.orderId/)`).
2. **PASS — KST 창 요약이 확정·유한·KRW만, 미래/무효 시각 제외, 상한에서 미발행.** `capturedSalesSummary.ts`는 `PaymentRefundRow[]` 위 **순수 투영**(prisma/queryRaw/fetch/provider/customer 토큰 0 — 정적 테스트로 봉쇄). 게이트 순서: `rows.length >= limit → {unavailable, bounded_read_limit_reached}`(잘린 합계 미발행) → `paymentCategory !== "captured"` skip → `currency !== "KRW"` skip → `typeof amount === "number" && Number.isFinite` 아니면 skip → `Number.isFinite(dayIndex)` 아니면 skip(Invalid Date=NaN 포섭) → `dayIndex > todayIndex`(미래) skip. 창은 KST(UTC+9) 달력 일 인덱스로 today / ≥today−6 / ≥today−29(포함식 7·30일)이며 자정 순간은 새 날에 귀속. 신규 파생값 0(settle/net/profit/margin/rate/partial/refundAmount/tax/fee 금지 단언). 호출부는 동일 읽기의 `PAYMENT_READ_DEFAULT_LIMIT`를 그대로 넘겨 상한 판정이 실제 읽기 한도와 일치.
3. **PASS — 링크는 기존 진실한 목적지만, 추가 읽기·행위 0.** 확정 결제 → `/dashboard/orders`, 환불 완료 → `/dashboard/payments`(둘 다 실재 라우트 확인), 주문 타일 값·Recent Orders 헤더 → `/dashboard/orders`, 최근 주문번호 → 기존 인코딩 상세 라우트. `paymentsState`는 여전히 `readPaymentRefunds` **1회**이고 captured/refunded 카운트와 매출 요약 전부 그 한 결과에서 파생(테스트가 `readPaymentRefunds(`·`o1OperatorOrderList(50)` 각 1회 고정). 신규 grant·query·route·schema·provider·경제 효과 0이며 `/dashboard/payments`가 처리 대기열 행이 되지 않음도 단언.
4. **PASS — M4 oracle 정정은 정확히 5토큰.** 삭제분은 `shipment`·`amount`·`currency`·`KRW`·`price`뿐(전부 M3A/206이 허용한 **검토된 읽기 표시** 값). 잔존 금지 목록은 고객세션/레거시 권한(getShopper·o1OperatorForCustomer·AuthIdentity·CustomerAccount·shopper·requireConsoleUser), 직접 데이터 접근(@/lib/prisma·prisma.·PrismaClient·$queryRaw), 제어·변경·step-up(form·input·button·onClick·fetch(·POST·nonce·stepUp), 실행 의미(refund(·restock·recover(), 식별 표시(email·phone) — 권한·직접접근·명령/provider·변경·신원·프라이버시 금지 전부 유지. 케이스명도 축소된 범위를 정직하게 재기술.
5. **PASS — 봉쇄.** 변경 경로 정확 6개(신규는 pure helper 1개), schema/lock/route 파일 추가 0.
6. **PASS — 동결 계약 충실도.** 206의 identity inversion(번호=1차·제목=2차)과 인접 내비게이션(목록 열기 / 상세로) 요구를 표시 계층에서 그대로 만족하며, 어떤 화면도 새 사실을 만들지 않고 이미 검토된 값만 표시·연결한다.

## Residuals (비차단)

- **R1** "확정 결제 N" 옆 링크는 필터되지 않은 `/dashboard/orders`로 간다 — 문구가 "주문 열기 →"라 허위 주장은 아니나, 목적지가 그 N건만 보여주지는 않는다(라벨 유지 권고).
- **R2** 요약 창은 `new Date()`(호출부) 기준이므로 렌더 시각에 따라 경계가 바뀔 수 있다 — helper 자체는 `now` 주입형 순수 함수라 테스트는 결정론적.
- **R3** `rows.length >= limit`는 보수적 상한 판정이라, 정확히 한도만큼 존재하는 정상 데이터에서도 합계를 내지 않는다(안전 방향 손실).
- **R4** typecheck/build/runtime/브라우저 미실행(권한 밖) — 표시·접근성은 소스 계약 수준 증명.
- **R5** 프로세스: `roles/reviewer.md`는 "no commit or push"를 명시하고 216은 docs 커밋/푸시를 지시한다. 산출물(218/219)만 docs에 커밋하고 제품·후보에는 손대지 않는 것으로 해석했으며, 다른 의도라면 Advisor가 정정하기 바란다.

**Rationale.** 6개 판정 항목 전부 직접 diff·소스 증거로 충족, 회귀·권한 확장·경제 효과 0, 잔여는 전부 저심각 관찰 또는 선언된 미실행 범위 → **PASS**.
