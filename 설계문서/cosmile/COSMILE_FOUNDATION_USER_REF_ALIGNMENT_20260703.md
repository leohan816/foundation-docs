# COSMILE Foundation User Ref Alignment

> **STATUS: PASS_WITH_WATCH** (2026-07-03 · local commit only·Cosmile push 0)

Cosmile의 Foundation `/v1/consult_contract` 호출 payload에 **opaque deterministic `foundation_user_ref`** 를 추가해 SIASIU와 identity/ref 정책 정렬. anonymous consult → opaque ref. 실제 고객정보(email/phone/name/address/login/order/payment/raw id)는 Foundation에 미전송.

- **Cosmile HEAD(local)**: `ff8ffa0` (origin/main = `a5547e1`, **미푸시**)
- SIASIU parity 기준: `SIASIU_COSMILE_FOUNDATION_PARITY_REPORT_20260703.md` (`44761f5`)

## A. verdict: **PASS_WITH_WATCH**
구현·테스트 PASS. HMAC secret 미설정 → SHA256 deterministic 최소구현(HMAC 전환은 WATCH).

## B. 변경 파일 (local commit `ff8ffa0`, 5)
- **신규** `app/src/lib/foundation/foundationUserRef.ts` — ref 생성 헬퍼(순수·결정론)
- `app/src/adapters/foundationClient.ts` — `Ssc.service_context.foundation_user_ref?` additive field
- `app/src/adapters/cosmileSemanticAdapter.ts` — `SscInput.foundationUserRef` + service_context에 배치(있을 때만)
- `app/src/app/api/slice/consult-foundation/route.ts` — `foundationUserRef(await getShopper())` 생성 후 createBaseSsc에 전달
- **신규** `app/scripts/foundation-user-ref-eval.mjs` — payload-inspection eval(12/0)

## C. local commit hash: `ff8ffa0` (push 0)

## D. foundation_user_ref 생성 방식
`foundationUserRef(owner)`:
- `stableId = owner.userId ?? owner.guestId` (raw id는 **ref 생성에만** 사용). 없으면 `null`(anonymous 유지).
- `material = "cosmile:" + stableId` (★cosmile namespace).
- `FOUNDATION_USER_REF_SECRET` 있으면 **HMAC-SHA256(material)**, 없으면 **SHA256(material)** (deterministic). secret 값은 로그/출력/문서화 **0**.
- 반환 `furef_<hex32>`. 로그인/guest 모두 hashed ref로만 전달(raw id 미노출).

## E. Foundation payload 위치
`SSC.service_context.foundation_user_ref` (additive · **Foundation contract 불변**). ref 없으면 키 미포함.

## F. raw PII 미전송 확인
- payload-inspection eval: SSC에 raw `userId/guestId` 없음, `email/phone/name/address/payment/user_id/customer_id/login_id` 키 없음, `raw_text` **maskPii 유지**([email]/[phone]).
- grep: `createBaseSsc`/route가 service_context에 raw id 삽입 0 (ref만).
- `getShopper()`의 raw id는 (a) ref 생성, (b) Cosmile `foundation_decision_received` event identity(Cosmile-side·Foundation 미전송·enum/trace only·PII reject)에만 사용.
- DB event에 `furef_`/raw id/`@` 없음 확인(source/trace만).

## G. Foundation ON 결과
HTTP 200 · source=`foundation_http` · trace=`fdsh_a5b0c6832ebb46d9` · surface.mode=consult. DB `foundation_decision_received` foundation_http·trace_id 일치.

## H. Foundation OFF 결과
HTTP **502** · error=`foundation_unavailable` · source=`foundation_error` · products=[] · mock_fallback 문자열 0 · `/`·`/consult` 200(crash 0).

## I. trace_id / event 영향
불변. 성공 시 API `frc.trace_id` + event `foundation_trace_id` 기록(일치 확인). 실패 시 502·event 미발행(source=foundation_error). ref는 event에 미추가(event PII 정책 유지).

## J. /v1/consult/judge 미연결 확인
이번 패치 변경 파일(route·adapter·helper·eval)에 `consult/judge`/`httpFoundationJudge` 연결 **0**. consult_contract 경로만 수정. judge는 dev/debug-only 그대로.

## K. 테스트 결과
| test | 결과 |
|---|---|
| npx tsc --noEmit | ✅ 0 |
| npm run build | ✅ 0 |
| payload-inspection eval | ✅ 12/0 |
| phase3-view-click-eval | ✅ 15/0 |
| event-schema-eval | ✅ 37/0 |
| Foundation ON smoke | ✅ foundation_http·trace |
| Foundation OFF smoke | ✅ 502 foundation_error·mock 0·crash 0 |
| raw PII grep/assert | ✅ ref만·raw id 0 |

## N. Cosmile 코드 push: **0** (Leo 승인 전 local commit `ff8ffa0`까지만)

## O. 남은 WATCH
1. **HMAC 전환**: 현재 `FOUNDATION_USER_REF_SECRET` 미설정 → SHA256 deterministic 최소구현. secret 배포 후 HMAC-SHA256으로 전환(코드는 이미 secret 있으면 HMAC 사용). deterministic SHA256은 rainbow/enumeration 이론상 노출 여지(입력이 내부 id라 낮음) — HMAC이 권장.
2. judge path maskPii는 이번 범위 밖(dev/debug-only) — 기존 WATCH 유지.
3. event `session_id` null(Phase 4) — 기존.
4. Foundation OFF 친절메시지 real 브라우저 렌더 미확인(툴 부재) — code/bundle PASS.
