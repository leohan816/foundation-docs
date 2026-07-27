# 139 — Independent review: order line projection + snapshot provenance

PASS: `IMPLEMENTATION_REVIEW` · TIER: `HARD_IMPORTANT_SAFETY`(Advisor 재분류 — checkout OrderItem 생성 경계 변경) · VERDICT: **`PASS_WITH_RISK`** · `RETURN_TO: foundation-advisor`

**Binding(실측·정직 보고).** 실제 실행 모델 `claude-fable-5` · effort max · `/fable-sentinel`(세션 기적재 references) · CWD `/home/leo/Project/.worktrees/Cosmile/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1` · Worker(Opus 5/xhigh)와 독립(비접촉). ★핸드오프 137 §"Live binding"은 `claude-opus-5`로 기재됐으나 본 세션은 Fable 5로 실행됨(`/model claude-opus-5`는 *새 세션* 기본값만 변경) — 101A와 동일 클래스의 표기-실제 불일치로 기록. Docs `8a9b28c` HEAD 일치, 137 sha256 `d6a097a1…`. Product `76497d6..48939e8` = 1 commit·정확 8경로·+270/−7·clean/upstream-equal·schema/lock 무변경(직접 확인). 테스트/빌드/DB/runtime/mutation 0.

## Findings

**F1 [medium · evidence-coverage · 비-차단]** 최종 수용 GREEN(129 지정 `-t 'operatorOrderView|operator order-line table|checkout-start idempotent order boundary'`, 135 보고 `18 passed / 85 skipped`)은 신규 핵심 oracle 4건을 **실행하지 않았다**. `o1_order_lifecycle.vitest.ts`의 837(정확 라인 집합·다중행 순서·null SKU), 864(SKU 단독 식별자·leakage sweep), 882(8종 malformed → `repository_error` fail-closed), 911(authorization-first)은 `describe("WU-0 inventory disposition projection")`(805–926) 안에 있어 전체 이름이 세 패턴 중 어느 것과도 일치하지 않는다(`operatorOrderView` describe는 779–803에서 종료). UI 파일의 129-정정 문자열 oracle(241행대, `WU-1 …` describe)도 동일 사유로 미실행. → 135의 "It proves: the fail-closed bounded line projection … authorization ahead of repository access" 주장은 실행 증거로 뒷받침되지 않는다. 완화: 이 4건은 129가 보고한 **무필터 RED(12 failed/91 passed)** 에서 실패-선행이 성립했고(계약 부재 재현), 구현 후 통과만 미증명. 코드 결함 아님 — 증거 공백. 폐쇄 방법: 동일 3파일을 `-t` 없이 1회 실행하거나 해당 it들을 매칭 describe로 이동(리뷰어는 미실행·미패치).

**차단 결함 0.** 계약 자체는 소스 직독으로 건전:
1. **운영자 사영** — `service.ts:262-264` 권한 게이트가 repo 접근에 선행; repository는 `OrderItem`의 5개 컬럼만 `ORDER BY "id" ASC`로 읽고 buyer/payment/provider/reservation join 0; 서비스는 **복구하지 않고 검증만** — 공백 title, 공백 SKU, 비정수/비양수 qty, 음수/비정수 price, `totalPrice !== unitPrice*quantity` 각각 기존 `repository_error`로 fail-closed(부분/날조 성공 경로 없음). 공개 shape는 title/nullable SKU/qty/unit/total 5키뿐 — 신규 식별자는 SKU 하나.
2. **UI** — `O1OperatorPanel.tsx` 순수 +31행(삭제 0) → 기존 action/refund/support/step-up surface byte-불변; 검증된 값만 렌더(계산·기본값 0), null SKU=`—`, `₩`+`toLocaleString("ko-KR")` 정수, 구매자/연락처/주소 필드 0.
3. **Provenance** — 검증 완료 `O1CatalogItem.snapshotContentSha256`가 priced line→`O1CheckoutOrderCreateInput`→유일 실 `prisma.order.create`의 `foundationSnapshot.connect({snapshotContentSha256})`로만 전달. 대상 컬럼은 `@unique`(schema:1290)이고 `OrderItem.foundationSnapshot` 관계 실재(schema:567) — connect 실패 시 create 전체가 throw→해당 orderNo 주문 부재→`repository_error`(원자적·부분 라인 0). fallback/backfill/connectOrCreate/upsert 0·스키마 변경 0·과거 행 null 유지. `deriveO1OrderNo`(owner/sku/product/qty/unit)와 `isExactO1CheckoutReplay`(동일 튜플) 모두 sha 미포함 — 주문번호·정확재생·예약·intent·provider·경제 의미 불변. O1 create-input 구성 지점은 런타임 1곳뿐(stale caller 0).
4. **테스트** — 기존 단언 약화 0: 변경은 (a) 신규 `lines` 키를 반영한 전체-객체 equality 보강, (b) 129가 지시한 stale 문자열 oracle 1건을 실제 소스(`O1OperatorPanel.tsx:175` `grantAwareOperatorActionSurface(mode, legacyActionsEnabled, {…}`)에 맞춤(인자 추가 허용으로 소폭 완화되나 호출 형태·선행 2인자는 계속 고정)뿐.

## Residuals

- **R1** F1의 미실행 4 oracle — 무필터 1회 실행으로 폐쇄(Advisor 라우팅).
- **R2** `lines`와 기존 `lineCount`는 별개 쿼리(비트랜잭션)이며 상호 일치 단언 없음 — 현 흐름상 OrderItem 사후 변경 없어 실위험 낮음.
- **R3** 스냅샷 connect 실패가 orderNo-경합용 catch-all에 흡수돼 `repository_error`로 붕괴 — 안전 방향이나 E3/E4에서 확인된 대로 진단 비용 증가(카테고리 분리 후보).
- **R4** 컴포넌트 지역 타입은 `lines?:`+`?? []`로 선택적(서버 계약은 필수) — 외부 주입 시 빈 표가 조용히 렌더될 수 있는 표면.
- **R5** typecheck/build/DB/runtime 미실행(선언) — 신규 SQL·connect·렌더는 후속 승인 runtime gate 소관. M3F request-scope 하네스 3건은 미수리·미정규화 유지(핸드오프 지시 준수).

**Rationale.** 질문 1–3은 직접 소스 증거로 충족, 4는 계약상 충족하나 **수용 GREEN이 핵심 fail-closed/leakage/authorization oracle을 실행하지 않았고 결과 보고가 그 이상을 주장** — 패치 없이 재실행만으로 닫히는 잔여 위험이므로 V2 정의상 `PASS_WITH_RISK`(자동 진행 불가·Leo/GPT 위험 수용 또는 R1 폐쇄 후 재확인). commit/push 미수행(137 금지 준수).
