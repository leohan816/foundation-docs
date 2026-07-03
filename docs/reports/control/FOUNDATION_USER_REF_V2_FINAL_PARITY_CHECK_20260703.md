# FOUNDATION_USER_REF v2 — 최종 교차검증 (Parity Control Check)

> 작성: foundation-control (control tower) · 2026-07-03 · **read-only audit**(코드 수정 0 · git add/commit/push[소스] 0 · secret 값 출력 0)
> 방법: 8차원 병렬 적대 검증(각 차원이 SIASIU·Cosmile·FOUNDATION 실제 코드를 file:line로 대조) · 보고 신뢰 0·코드가 근거.

## 판정 (A)
- **VERDICT = `PASS_WITH_WATCH`** — SIASIU ↔ Cosmile **서비스 furef v2 parity 달성·runtime 안전**.
- ★**단, Memory live 전 Foundation-side 필수 패치 존재**(E차원 = PATCH_REQUIRED·Foundation memory 계층, 서비스 furef 아님, 현재 **not live**). 이 패치가 끝나기 전 **Foundation Memory live 전환 금지**.
- 근거 요약: 8차원 중 **7 PASS_WITH_WATCH + 1 PATCH_REQUIRED(E)**. FAIL 조건(raw PII Foundation 전송·prod secretless fallback·mock/brain/judge 재등장·memory key 충돌 고위험) = **0**.

## 대상 상태 (실측)
| 대상 | 확인 |
|---|---|
| Foundation 정책 | `FOUNDATION_COMMON_IDENTITY_REF_POLICY_20260703.md` · **APPROVED_CANDIDATE** · foundation-docs `1a5179c` |
| SIASIU | HEAD **`3cd068d`**(app/ clean) · alignment `50889cf` |
| Cosmile | HEAD **`3ba91e0`**(app/src clean) · alignment `5aa2413` |

## 8차원 판정
| 차원 | 판정 | 핵심 근거(file:line) |
|---|---|---|
| **A. ref 형식** | PASS_WITH_WATCH | `furef_v2_<32hex>` 양쪽(SIASIU provider_flag.py:53-54·Cosmile foundationUserRef.ts:30,34-35)·v1/16-hex runtime 발급 0(잔존 sha256[:16]은 content/file hash·ref 아님) |
| **B. HMAC/secret** | PASS_WITH_WATCH | prod HMAC+secret 필수·secret 부재 fail-closed·plain SHA256 dev flag only·**secret 값 출력 0** |
| **C. message material** | PASS_WITH_WATCH | `"<svc>:<type>:<id>"`·subject_type∈{user,guest}·namespace 상수·현재 구속조건상 유일 분해(충돌 0) |
| **D. Foundation payload** | PASS_WITH_WATCH | SSC service_context에 **opaque furef만**·raw user_id/PII 미전송·FOUNDATION core grep foundation_user_ref = **0건** |
| **E. Memory/subject_ref** | ★**PATCH_REQUIRED** | subject_ref `[:16]`=64-bit(v2 128-bit 위반)·`_SALT` 하드코딩 DEV 기본값·fail-closed 부재 — **Memory live 전 패치 필수**(현재 not live) |
| **F. trace/de-anon** | PASS_WITH_WATCH | foundation_decision_received event에 furef/raw id 0·Foundation은 trace_id↔raw id 미결합(core.py:1608-1615·server.py:36-38·FRC echo 0) |
| **G. fail-closed 런타임** | PASS_WITH_WATCH | SIASIU prod secret 부재→502 foundation_unavailable(suppression_reasons=foundation_user_ref_unconfigured)·Cosmile→503 foundation_user_ref_unavailable·**brain/mock/judge fallback 0**·Foundation-down 502 보존 |
| **H. CUTOVER 불변식** | PASS_WITH_WATCH | brain.chat runtime 0·mock/fake 0·judge runtime 0(debug-only)·suppression(block→products 0) 다중 강제·trace_id 전파 유지 |

## v2 표준 일치 (E·F·G·H 항목)
- **(E) v2 ref 형식**: PASS — 양 서비스 `furef_v2_<32 hex(128-bit)>`.
- **(F) HMAC/secret/fail-closed**: PASS — prod HMAC-SHA256+`FOUNDATION_USER_REF_SECRET` 필수·secret 부재 fail-closed·dev SHA256 명시 flag only(SIASIU `SIASIU_DEV_REF_FALLBACK`·Cosmile `FOUNDATION_USER_REF_DEV_SHA256`).
- **(G) subject_type/namespace**: PASS — `siasiu|cosmile` × `user|guest` 양쪽 필수 포함.
- **(H) raw PII 미전송**: PASS — Foundation payload = opaque furef만·raw id는 HMAC 입력으로만·core 미소비/미저장·resolve_subject가 PII 패턴 reject(subject_identity.py:35).

## ★ E차원 상세 — Memory live 전 필수 Foundation 패치 (PATCH_REQUIRED, 현재 not live)
1. **subject_ref 절단 64-bit**: `subject_ref = "subj_"+sha256(_SALT|service|local_user_ref)[:16]`(subject_identity.py:39) = **64-bit**. v2 표준 §F-4(8)은 subject_ref 128-bit 상향 요구. 실제 memory key이므로 birthday ~2^32에서 cross-user 오염 위험(§M-2 = STOP 조건).
2. **`_SALT` 하드코딩 DEV 기본값·fail-closed 부재**: `_SALT=env("FOUNDATION_SHADOW_MEMORY_SALT","...DEV_ONLY")`(subject_identity.py:14) — secret 부재 시 조용히 약한 salt로 degrade. v2 §K-4(fail-closed) 위반.
3. **furef→local_user_ref bridge 미구현**(WATCH): Foundation consult core에 `local_user_ref := foundation_user_ref` 조항·regression 부재.
- ★**단 현재 not live**: `shared_memory_v0_shadow` flag OFF · `write_live=False`·`applied_to_real_user=False`·`memory_db_created=False`(store.py:41-43,87-88·contract.py). → **런타임 collision/유출 위험 0**. 위 3항은 **Memory live 전환 release train의 hard gate**.

## 기존 Foundation-only lifecycle 영향 (K)
- **영향 없음(보존)**: SIASIU brain.chat runtime 0(server.py:120-131·이중 dev flag에서만)·Cosmile mock/fake 0(route.ts:62,80-89·항상 source=foundation_http)·/v1/consult/judge runtime 0(canonical=consult_contract·judge는 non-prod debug route에만)·safety suppression(block→products/recommendation 0) 다중 강제·Foundation-down 502 foundation_unavailable 보존·trace_id 전파 유지. **v2 furef 도입이 CUTOVER 불변식을 하나도 깨지 않음.**

## 남은 WATCH (P)
**A) Memory-live blocking(= 위 E, 하드 gate):** subject_ref 128-bit 상향 · `_SALT` fail-closed(하드코딩 제거) · furef→local_user_ref bridge+regression.
**B) runtime-safe 운영 WATCH(코드 정정 요구 아님·관찰):**
- SIASIU frontend가 `s.email`/`"u_"+s.name`을 user_id(HMAC preimage)로 사용(store.js:71) → **Foundation엔 opaque furef만·raw PII 유출 0**, 그러나 stable_id≠email/name 원칙 미강제·ref 불안정(guest/login·casing). 내부 stable subject id 매핑 권고.
- **SIASIU rawText masking 부재**(Cosmile은 mask): 원문 발화 내 email/phone이 Foundation rawText로 갈 수 있음(furef와 무관한 PII 채널). §C precondition·Foundation `raw_text_stored=False`/content_hash로 완화되나 masking 권고.
- Cosmile prod 판정 `NODE_ENV==="production"` 정확일치 → env 미설정 시 non-prod 익명 진행(SIASIU는 미설정→prod fail-safe·비대칭). Next.js가 start시 NODE_ENV=production 자동설정으로 실무 완화·defense-in-depth WATCH.
- Cosmile 자체 CommerceEvent 스토어가 `foundation_trace_id`를 raw customer_id/anonymous_id와 같은 레코드에 저장(Cosmile 경계 내부·Foundation 미전송) → 경계 밖 유출 금지 불변식 유지 필요.
- FoundationSignalOutbox raw canonicalUserId/anonymousId 컬럼(실발신 disabled·payloadJson은 raw 제외) → 향후 실발신 train에서 furef 변환·raw 컬럼 미직렬화 필수.
- SIASIU secretless fail-closed의 top-level error가 Foundation-down과 동일(구분은 suppression_reasons에만) → observability WATCH.
- legacy `/api/slice/consult`(judge) debug route(non-prod·slice-gated) 잔존 · `mock_fallback` dead enum 잔존 → retirement candidate.

## 다음 권장 단계 (Q)
1. **push 가능**: 본 보고서 foundation-docs mirror/push(관측 repo·PASS 아니어도 push·민감정보 0).
2. **secret 배포 필요**: production 전환 시 `FOUNDATION_USER_REF_SECRET`(양 서비스)를 secret store에 배포해야 fail-closed가 실제 HMAC 발급으로 전환(★값 출력 0·문서 미기재). 미배포 시 prod는 안전하게 상담 중단(fail-closed).
3. **Memory live 전 별도 release train(hard gate)**: E차원 3항(subject_ref 128-bit·`_SALT` fail-closed·furef bridge+regression) 설계·구현·검증.
4. **Fable5 호출 권장**: 본 parity + Memory-live gate를 Fable5 targeted re-audit로 교차 확인(특히 E차원 Foundation memory 패치 후).
5. 운영 WATCH(B군)는 각 repo-local 정합 train(rawText mask·Cosmile NODE_ENV fail-safe·judge/enum retirement·outbox furef 변환).

## 무결성 (O)
- **코드 변경: 0** — read-only audit(3 repo 파일 열람만)·SIASIU/Cosmile/Foundation contract 코드 0·migration 0·소스 push 0.
- secret 값 출력 0 · foundation-docs만 mirror/push(관측 repo).
