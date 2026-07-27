# 180 — Independent recheck: Orders-list correction

TIER `NORMAL_BOUNDED_UI` · VERDICT: **`PASS`** · 171의 A/B/C 전부 **CLOSED** · REGRESSION 0 · `RETURN_TO: foundation-advisor`

**Binding.** 현행 확인된 `claude-opus-5` · max · `/fable-sentinel` · CWD 정확 · Worker 독립. Docs `3291de6` HEAD 일치 · 178 sha256 `735881d2…`. Product `990efb8..b39e914` = 1 commit · 정확 4경로 · +55/−16 · clean/upstream-equal. 테스트/runtime/DB/browser/provider/mutation 0 · RED 2건·GREEN `20 passed / 11 skipped / exit 0`은 176 보고 증거(재현 아님).

## 확인 항목 1–4

1. **CLOSED(A)** — `page.tsx`가 제목 셀 하단에 `<span class="…font-mono text-[11px]…">{row.orderNo}</span>`로 주문번호를 복원. 노출 값은 `Order.orderNo`(O1-…)이며 내부 cuid `orderId`는 종전대로 `key`와 `encodeURIComponent(row.orderId)` href에만 사용 — 신규 내부 식별자 노출 0. 이로써 `PAGE_DESCRIPTION`("주문번호와 주문 상태…")과 렌더 결과의 모순도 해소.
2. **CLOSED(B)** — 절대 fail-closed였던 `if (!economic) return null`이 `?? null`로 바뀌어 **해당 행의 경제 필드만** 강등(`orderTotal/currency/createdAt/paymentCategory/refundCategory` → `null`), 주문은 계속 노출. 나머지 가드는 전부 무접촉: 비레코드 행·공백 orderId/orderNo/dbStatus·중복 orderNo(주문측·결제측 모두)·공백 title·비양수 count/quantity·`totalQuantity < lineCount`·미지 배송 토큰은 여전히 전체 `null`. 테이블에서 제거된 fail-closed 케이스는 `"absent payment match"` 1건뿐이고, 같은 배치의 매치된 행은 증명된 값을 유지함을 신규 테스트가 단언(`mixed[0].orderTotal=30000` vs `mixed[1]=null`). UI는 `money(null,null)`·`label(map,null)`·`orderTime(null)` 모두 닫힌 라벨 `확인 없음` — 0 날조 0.
3. **CLOSED(C)** — `orderTime`이 `… UTC` 접미를 명시해 ko-KR 금액 옆 시각의 KST 오독 여지 제거.
4. **PASS** — SQL/권한 블록/읽기 호출 모두 이번 델타 밖(`o1CommerceRuntime.ts` 미포함, grant 3종·2회 읽기 구조 무변경) → 신규 read/query/capability/action/schema/provider/경제 효과 0. nullable 확산으로 인한 소비자 파손 없음: `OrderListRow`/`orderListRead` 참조는 `page.tsx`·자기 모듈·`o1_core_dashboard_reads.vitest.ts` 셋뿐이며, 페이지의 모든 소비 지점이 null 허용 시그니처(`label`/`money`/`orderTime`)로 함께 갱신됐고 `statusDistribution`은 non-null `orderStatus`만 사용.

## Residuals (비차단)

- **R1** 정렬 키는 주문 읽기의 `Order.createdAt DESC`인데 표시 시각은 검토된 경제 행의 `createdAt` — 매치 없는 행은 시각이 `확인 없음`이면서도 시간순 위치는 유지된다(두 값의 출처 컬럼은 동일 계열이나 표시-정렬 출처가 형식상 분리).
- **R2** 경제 미매치 원인(목록 `LIKE 'O1-%'` vs 결제 읽기 `EXISTS(PaymentIntent)`의 모집단 차이)은 그대로이며, 이제 페이지 폐쇄 대신 행별 `확인 없음`으로 **가시화**된다 — 운영자가 이를 "결제 없음"이 아니라 "미확인"으로 읽도록 라벨이 분리돼 있음은 확인(`PAYMENT_LABEL.none="없음"` ≠ `UNAVAILABLE_LABEL="확인 없음"`).
- **R3** typecheck/build/runtime 미실행(권한 밖) — nullable 전파의 컴파일 검증은 후속 게이트 소관.

**Rationale.** 4개 확인 항목 전부 직접 diff 증거로 충족, 171의 세 지적이 1:1로 닫혔고 fail-closed 축소는 "증명 불가"와 "신뢰 불가"를 분리한 정확한 범위 조정(다른 가드 무손상) → **PASS**.
