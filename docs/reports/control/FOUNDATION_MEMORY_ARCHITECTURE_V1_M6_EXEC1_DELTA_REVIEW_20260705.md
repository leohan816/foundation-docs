# Memory V1 — EXEC-1 BUG-1/2/3 Closure Delta Review (Control-invoked)

> 기록: foundation-control(Control) · 2026-07-05 · **검수자 = Control이 invoke한 독립 검수 에이전트(fresh context·read-only·adversarial·1회).**
> ★정직 라벨: **Claude 독립 검수 subagent**(외부 Fable5/Codex와 별개). ★범위 = **BUG-1/2/3 closure 확인 한정**(경량 delta). ★**EXEC-1 실 migration 승인 검수 아님.**
> 무결성(검수): 코드 수정 0 · migration 0 · DB 접근 0 · 실 데이터 pre-scan 0 · repair 적용 0 · push 0(판독만) · 테스트 미실행(소스 판독만).

---

## DELTA VERDICT: **BUG_CLOSURE_CONFIRMED_WITH_WATCH**
BUG-1/2/3 세 건 모두 **코드에서 실제 CLOSED**(주장뿐 아니라). 브랜치/HEAD 확인: fc `shadow/m5-ingress-gate @ 2ccf4f0` · SIASIU `shadow/m4-siasiu-memory @ 6047b71` · Cosmile `shadow/m4-cosmile-memory @ 73b7ce4` — 전부 일치. 잔여 1건(compat-mode enum-field scrub gap)은 BUG-1 strict-mode 범위 밖·별도 follow-up.

## BUG closure (검수자 근거)
| bug | 판정 | 근거 |
|---|---|---|
| **BUG-1** | **CONFIRMED** | `_scrub_value`(ingress_gate.py:117-127): bare scalar string→PII/RAW_TEXT+`container[key]=None`; dict/list→`_scrub`. **양 site 배선**: compat unknown-key(:171)·generic else(:224). strict-mode 반례 trace: whitelisted 키를 scalar로 보내면 elif(isinstance 가드) skip→final else `_scrub_value`가 포착 → bare scalar raw/PII **ok:true 미통과**. regression(test:85-97). hook **inert**(:337-338·None)·**hard_reject False**(:341) |
| **BUG-2** | **CONFIRMED** | Cosmile `LongTermMemoryFact` +consentScope/retentionPolicy/sensitivityLevel(additive nullable·schema.prisma:810-812). de-anon `hasSameRowRawIdentity` 무변경(:59-63) |
| **BUG-3** | **CONFIRMED** | SIASIU `memory_fact_candidate` +consent_scope/sensitivity_level(schema_shadow.py:41-42·DEFAULT) · Cosmile `MemoryFactCandidate` +consentScope/sensitivityLevel(:789-790)·status @default("candidate") 유지(:783) |

## REGRESSION CHECK — PASS (검수자)
- **SIASIU:** candidate CHECK candidate\|approved\|rejected DEFAULT candidate 유지(schema_shadow.py:38) · SAFETY∩SINGLE supersede-first active≤1(:88-93) · subject_key COALESCE(:76 + 전 SQL) · answer.py 미import(hashlib/hmac/os만·주석 언급뿐). **PASS**
- **Cosmile:** default candidate 유지 · overlay 5모델(CommerceEvent/Cart/Order/Wishlist/AlertSubscription) 유지 · CartItem overlay 부재(:390-403) · standalone `model CommerceMemory` 부재(grep NONE). **PASS**
- **hook inert / SHADOW_MODE 무변경: PASS**

## TEST COUNTS — 소스 기준 정합(미실행)
gate **52** · SIASIU schema **27**(ok 호출) · adapter **26** · P3 **11** · Cosmile de-anon **14**(.test.mjs)·vitest **5**(.vitest.ts it) — 전부 주장치와 일치. ★검수자 미실행(소스 판독만).

## ★RESIDUAL / WATCH (BUG-1/2/3 실패 아님·별도 follow-up)
- **compat-mode enum-field scrub gap:** `ingress_gate.py` compat 모드에서 `service_id`(:176-178)·`last_refined_intent`(:187-189)는 enum-only 분기(isinstance 가드·_scrub_value fallback 없음). **compat 모드**에서 enum도 scrub도 skip → 이 두 enum 필드에 scalar PII/raw를 넣으면 `ok:true` 통과 가능 — "compat도 PII/raw 무조건 scrub" 계약 의도와 상충. ★**pre-existing·compat-only·BUG-1 strict-mode 범위 밖**(strict 모드는 ENUM으로 차단). **별도 follow-up 권고·본 delta의 blocker 아님·hard-reject 배선(M6-G) 전 처리 대상.**

## ONE-LINE 결론 (검수자)
세 버그 모두 매칭 regression과 함께 실제 수정됨 · BUG-1 strict-mode closure 완전 · compat-mode enum-field scrub gap(pre-existing) 1건만 별도 follow-up으로 flag.

## Control 정리 (검수자 verdict 수용·자체 판정 아님)
- ★Control은 검수자 verdict를 그대로 기록. BUG-1/2/3 = **BUG_CLOSURE_CONFIRMED**.
- **잔여 WATCH(compat enum-field scrub):** BUG-1과 동류(scrub gap)·compat-only·**hard-reject 배선(M6-G) 전 필수**·EXEC-1 migration blocker 아님. → **소규모 follow-up 패치 권고**(Leo 판단·additive·shadow).
- **기존 watch:** runner 83/89 선재(EXEC-1 전 확인) · Cosmile candidate CHECK DB강제(P-b·EXEC-1 raw SQL).
- ★**EXEC-1 실 migration/prod/live/hard reject 승인 아님.**

## 무결성
검수 = read-only(코드/DB/migration/push 0·테스트 미실행) · 본 기록 = 검수자 verdict 충실 기록 · 실 migration 0 · prod 0 · live 0 · hard reject 0 · main merge 0 · 본 문서만 foundation-docs commit/push.
