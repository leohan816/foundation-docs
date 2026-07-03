# COSMILE Foundation User Ref v2 Alignment

> **STATUS: PASS_WITH_WATCH** (2026-07-03 · local commit only · Cosmile push 0)

Cosmile의 `foundation_user_ref`를 **Foundation User Ref v2 표준**으로 수렴. `furef_v2_<32hex>` · HMAC-SHA256(secret, `"cosmile:<subject_type>:<stable_id>"`) · production secret 없으면 fail-closed.

- **Cosmile HEAD(local)**: `3ba91e0` (origin/main = `f71c726`, **미푸시** · v1 `ff8ffa0` 위 stack)

## A. verdict: **PASS_WITH_WATCH**
구현·테스트 전부 PASS(eval 20/0). WATCH = production `FOUNDATION_USER_REF_SECRET` 미배포(현재 미설정 → prod는 설계상 fail-closed).

## B. 변경 파일 (local commit `3ba91e0`, 3)
- `app/src/lib/foundation/foundationUserRef.ts` — v2 helper(result object)
- `app/src/app/api/slice/consult-foundation/route.ts` — failClosed 처리(503) + ref 전달
- `app/scripts/foundation-user-ref-eval.mjs` — v2 eval(20/0)
(v1의 `foundationClient.ts`/`cosmileSemanticAdapter.ts` additive field는 v2에서 불변.)

## C. local commit hash: `3ba91e0` (push 0)

## D. v2 생성 방식
`foundationUserRef(owner) → { ref, subjectType, mode, failClosed, reason }`:
- `subject_type` = userId 있으면 `user`, guestId 있으면 `guest` (★namespace `cosmile` 포함).
- `message = "cosmile:<subject_type>:<stable_internal_subject_id>"` (stable_id = userId ?? guestId, raw는 ref 생성에만).
- **secret 있으면 HMAC-SHA256(secret, message)[:32] → `furef_v2_<32hex>`** (mode=hmac, 모든 env).
- secret 값은 로그/출력/문서화 **0**.

## E. production secret missing 처리 (fail-closed)
- **production + secret 없음 → `failClosed:true` (reason=`secret_missing_production`)** · **secretless SHA256 금지**.
- **production + 식별자 없음 → `failClosed:true` (reason=`no_subject_production`)** · anonymous 조용히 진행 금지.
- route: `failClosed`이면 **HTTP 503 `foundation_user_ref_unavailable`**(source=config_error, reason=payload/log만) → 셸 catch → 친절 메시지(fake success·mock 0).
- **dev/test SHA256 fallback**: `FOUNDATION_USER_REF_DEV_SHA256=true` **명시 flag로만**(mode=dev_sha256). flag 없으면 dev도 secretless SHA256 자동 금지 → ref 없이 진행(dev anonymous, non-prod 허용).

## F. user/guest subject_type 처리
- 로그인 = `user`, 게스트 = `guest`. 같은 raw id라도 subject_type이 다르면 ref **다름**(eval 확인). 둘 다 hashed ref로만 Foundation 전달(raw id 미노출).

## G. raw PII 미전송 확인
- eval: SSC에 raw userId/guestId 없음, `email/phone/name/address/payment/user_id/customer_id/login_id` 키 없음, `raw_text` **maskPii 유지**, secret 값 payload/ref 미노출.
- grep: `createBaseSsc`/route가 service_context에 raw id 삽입 0 (ref 객체의 `.ref`만).
- `getShopper` raw id → ref 생성 + Cosmile event identity(Foundation 미전송)에만.

## H. Foundation ON / OFF 결과
- **ON**(dev flag=true → v2 ref 생성 경로 live): HTTP 200 · source=foundation_http · trace=`fdsh_3e26c3d8f6aa42d1`.
- **OFF**: HTTP 502 · error=foundation_unavailable · source=foundation_error · products=[] · mock_fallback 0 · crash 0.

## I. trace_id / event 영향
불변. 성공=API `frc.trace_id` + event `foundation_trace_id` 기록. 실패=502/503·event 미발행. ref는 event 미추가(event PII 정책 유지).

## J. /v1/consult/judge 미연결 확인
✅ 변경 파일에 judge/httpFoundationJudge 연결 0(consult_contract만). judge는 dev/debug-only 그대로.

## K. 테스트 결과
| test | 결과 |
|---|---|
| npx tsc --noEmit | ✅ 0 |
| npm run build | ✅ 0 |
| **v2 payload-inspection eval** | ✅ **20/0** (prefix furef_v2_·32hex·subject_type·HMAC·prod fail-closed·dev flag·raw PII 0·secret 미노출) |
| phase3-view-click-eval | ✅ 15/0 |
| event-schema-eval | ✅ 37/0 |
| Foundation ON smoke | ✅ foundation_http·trace |
| Foundation OFF smoke | ✅ 502 foundation_error·mock 0·crash 0 |
| raw PII grep/assert | ✅ ref만 |

## M. Cosmile 코드 push 여부: **0** (Leo 승인 전 local commit `3ba91e0`까지만)

## N. 남은 WATCH
1. **production `FOUNDATION_USER_REF_SECRET` 배포**: 현재 미설정. production은 설계상 fail-closed(503) — 실 운영 전 secret provisioning 필요(코드는 secret 있으면 즉시 HMAC v2). secret 관리/배포는 Leo/인프라.
2. `FOUNDATION_USER_REF_DEV_SHA256`는 dev/test 전용 명시 flag — production에 절대 설정 금지(코드도 production은 secret만 인정).
3. judge path maskPii — 범위 밖(dev/debug-only), 기존 WATCH.
4. event `session_id` null(Phase 4).
5. Foundation OFF 친절메시지 real 브라우저 렌더 미확인(툴 부재) — code/bundle PASS.
