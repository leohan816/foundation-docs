# 246 — Independent review: order-detail line presentation

TIER `NORMAL_BOUNDED_UI` · VERDICT: **`PASS`** · 차단 결함 0 · `RETURN_TO: foundation-advisor`

**Binding.** 확인된 현행 `claude-opus-5` · effort max · `/fable-sentinel`(+ delta-review reference) · CWD 정확 · Advisor/Worker와 별개 idle Reviewer. Docs `66e946d` · 244 sha256 `afb84df4…` 일치. Product `52343f5c..b652a8b2` = 1 commit · **정확 6경로** · +205/−42 · clean/upstream-equal. 테스트/빌드/typecheck/DB/runtime/browser/provider/경제행위 0 · 미커밋 산출물(244 지시 준수).

## 검증 항목

1. **PASS — 새 질의·조인·스키마·진실원 0.** `createdAt`은 `orderNo`/`status`를 이미 읽던 **동일 SELECT**에 컬럼 1개 추가, `optionNameSnapshot`은 이미 5컬럼을 읽던 **동일 OrderItem SELECT**에 컬럼 1개 추가(`repository.ts` 두 hunk). 새 쿼리·조인·테이블·prisma 호출 0, 스키마 무변경(델타 6경로에 prisma/ 없음).
2. **PASS — 시각은 증명되면 KST, 아니면 확인 없음.** 서비스는 `data.createdAt instanceof Date && Number.isFinite(getTime())`일 때만 `toISOString()`, 그 외 전부 `null`(현재 시각 대체 없음). UI `formatOperatorOrderTime`은 비문자열·공백·비유한 순간을 `확인 없음`으로 닫고, 유효값만 `UTC+9` 오프셋 벽시계 + 문구 `KST (UTC+9)`로 표기(DST 없는 고정 오프셋이라 ICU 비의존). 테스트가 `null`·Invalid Date·문자열·숫자 4종을 주입해 "여전히 ok · createdAt null"을 단언.
3. **PASS — 옵션은 바이트 보존·null만 부재·비정상은 fail-closed.** 투영은 `option: l.optionNameSnapshot`로 원값 그대로(정규화·trim·치환 0), `null`은 null로 통과. 서비스 가드 `optionOk = null || (string && trim().length>0)`이라 공백/빈 문자열은 `repository_error`로 전체 fail-closed(신규 케이스 `blank option`·`empty option`). 부재 문구 `선택 옵션 정보 없음`은 **UI에서만** 발화. 혼합 스크립트·구분자·공백을 포함한 `EXACT_OPTION` 고정 oracle이 어떤 가공도 실패시킨다.
4. **PASS — 카드가 5필드 보존·옵션은 SKU와 수량 사이.** 표 → `<ul>/<li>` 카드로 전환하되 `l.title`·`l.sku`(null=`—`)·`l.option`·`l.quantity`·`l.unitPrice`·`l.totalPrice` 전부 유지, 라벨 순서 SKU → 옵션 → 수량 → 단가 → 합계이며 위치 단언(`indexOf(">SKU<") < ">옵션<" < ">수량<"`)과 라벨 1회 선언 카운트로 고정. 제목은 라벨보다 앞선다는 위치 단언으로 강화.
5. **PASS — 이미지 원본 없음을 그대로 표기.** 자리표시 박스가 문자열 `저장된 상품 이미지 없음`만 렌더하며 `<img>`·`next/image`·URL·외부 소스 도입 0(델타 전체에 이미지 소스 없음).
6. **PASS — 신원·권한·변경·경제 의미 확장 0.** 공개 뷰 키 집합은 `createdAt` 1개만, 라인 키 집합은 `option` 1개만 증가함을 전수 단언(`Object.keys(...).sort()` 2건). 구매자/연락처/주소/provider/payment 식별자 도입 0, 신규 grant·mutation·가격 재계산 0, `dbStatus`는 원시 토큰 그대로 표시(현지화 없음 — 기존 동작 유지).
7. **PASS(단 R2) — 하네스 정정은 계약 보존.** UI 테스트가 canonical `authorizeConsoleOperator`를 mock한 것은 요청 스코프 없는 순수 단위에서 **원 계약을 그대로 증명하기 위한** 조치이며, denied 케이스가 실제로 그 mock을 `{ok:false}`로 당겨 거부를 유발하고 flag-disabled·denied·failed-view 3종의 downstream 요청/nonce 호출 0을 계속 단언한다 — 제품 권한 로직 무변경·우회 0. 각 하위 케이스가 `clearAllMocks` 후 lever를 복원하는 점도 확인.

## Residuals

- **R1** 표→카드 전환으로 `>상품<` 헤더 단언이 은퇴하고 위치 단언으로 대체됐다(약화 아님 — 더 강한 순서 계약이나, 라벨 문자열 자체의 고정은 SKU/옵션/수량/단가/합계 5종에만 남는다).
- **R2** 라이프사이클 테스트에서 `not.toContain("sku_private")` 1건이 제거됐다. 이는 `sku`를 정당하게 노출하는 현행 계약과 모순된 **stale 단언**이고 키 집합·전용 leak sweep이 보상한다. 다만 이 단언은 `48939e8`(리뷰 139) 이후 줄곧 모순 상태였고 139-F1이 지적한 `-t` 필터 미실행 구간에 있었다 — **139-F1의 지연 효과가 이제 표면화된 사례**로 기록한다.
- **R3** typecheck/build/runtime/브라우저 미실행(권한 밖) — 표시·접근성은 소스 계약 수준 증명이며, RED/GREEN 수치는 인용하지 않았다(244가 증거 문서만 지정).
- **R4** `formatOperatorOrderTime`이 UI 모듈에서 export돼 테스트가 직접 호출한다 — 순수 함수라 위험 낮음.

**Rationale.** 7개 검증 항목 전부 직접 diff 증거로 충족, 회귀·권한 확장·경제 효과 0, 잔여는 저심각 관찰 또는 선언된 미실행 범위 → **PASS**.
