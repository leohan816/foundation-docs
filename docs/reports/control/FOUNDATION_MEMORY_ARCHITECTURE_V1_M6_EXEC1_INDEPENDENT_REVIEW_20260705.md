# Memory V1 — EXEC-1 직전 단일 독립 검수 결과 (Control-invoked)

> 기록: foundation-control(Control) · 2026-07-05 · **검수자 = Control이 invoke한 독립 검수 에이전트(fresh context·read-only·adversarial).**
> ★**정직 라벨:** 본 검수는 **Claude 독립 검수 subagent**이며, Leo가 별도 운영하는 **외부 Fable5/Codex(서버 Codex 포함)와는 별개**다. 동일 검수 prompt(EXEC-1 pre-review §7)로 외부에서 corroborate 가능. Control은 두 개를 혼동 라벨하지 않는다.
> ★검수 범위(지정 5항): package 안전성 · memory contract 정합성 · shadow code 직접 판독 · self-test 결과 · execution gate 분리. ★**실 migration/prod/live/hard reject/prod secret/backfill/main merge 승인 검수 아님.**
> 무결성(검수): 코드 수정 0 · migration 0 · DB 접근 0 · raw/PII/secret 열람 0 · push 0(검수자는 판독만).

---

## VERDICT: **PATCH_REQUIRED**
안전 자세(inert hook·fail-safe wiring·live/write/hard-reject 0·execution-gate 분리)는 견고하고 **정직하게 문서화**됨. 그러나 문서의 "shadow code ↔ 계약 **field-level 정합**" 주장이 **완전히 참은 아님**: Cosmile `LongTermMemoryFact`가 M2 §3.5 필수 3필드 누락(SIASIU는 있음)·ingress gate가 **bare scalar-string raw/PII를 scrub 못 함**. 전부 **additive·국소·live/write/hard-reject 경로 무접촉** — EXEC-1 migration DDL 확정 전·hard-reject 배선 전 shadow에서 패치 필요.

## PER-CRITERION
| # | 기준 | 판정 | 근거(검수자 인용) |
|---|---|---|---|
| 1 | Ingress gate | **WATCH** | hook inert(`ingress_gate.py:324-325`·None)·`hard_reject:False`(:328)·`scan()` deepcopy로 ssc 미변경(:284,:326)·`core.py:1590-1594` try/except **validate_ssc 이전**(:1595)·enum 정합(ConditionCategory 8·intent 11·RETENTION_POLICY={session,short_ttl,standard_ttl,revocable}·:31)·Korean catalog 예외(:236-242). **단 raw/PII 탐지 gap(BUG-1)** |
| 2 | SIASIU | **PASS** | candidate CHECK candidate\|approved\|rejected DEFAULT candidate(`schema_shadow.py:37`)·SAFETY∩SINGLE active≤1(:85-90)·subject_key COALESCE(:71-73,:89,:107)·must_not_reappear(recall :129)·B11 keyed HMAC subj_v2_[:32](`candidate_adapter.py:46-50,:93`)·answer.py 미import |
| 3 | SIASIU P3 | **PASS** | `open()`/logins.txt 접근 0(docstring만)·keyed HMAC(:25)·applied_to_real_logins/live_auth_changed False(:55-56) |
| 4 | Cosmile schema | **PASS(enumerated)·단 field-gap(BUG-2/3)** | candidate default candidate(:783)·standalone CommerceMemory 부재(:845-847)·overlay 5모델 개별 컬럼(CommerceEvent:40-48·Wishlist:350-357·Cart:377-384·Order:425-432·AlertSubscription:646-653)·CartItem overlay 부재(:390-403)·de-anon same-row/keyed 정확(deanon.mjs:30-63) |
| 5 | Execution gate 분리 | **PASS** | 3 docs 전부 실 migration·real pre-scan·repair apply·prod secret·backfill·live·hard reject·main merge = 각 별도 gate·별도 Leo 승인·batch 미수행. STOP-grep execution invariant=0 |
| 6 | Evidence 분리 | **PASS(watch)** | GitHub-verified vs pushed-shadow vs deferred 구분·runner **83/89** 정직(89/89 과장 아님). watch: manifest drift(아래) |
| 7 | Bugs | **FAIL(실 버그 존재)** | 아래 3건 |

## BUGS FOUND (검수자 원문)
- **BUG-1 (ingress gate raw/PII 탐지 bypass)·`ingress_gate.py:87-114`(`_scrub`)·경유 :158/:211.** `_scrub`는 dict/list **내부** 문자열만 검사 — **bare scalar string**을 node로 받으면 no-op(else 분기 없음). whitelisted key가 generic `else`(:211·trace_refs/safety_flags/user_constraints/recommendation_deferred)로 라우팅되고 **bare string**이면 strict 모드에서도 미탐. 예: `trace_refs:"한국어 상담 원문 평문"` → `scan()` ok:True. compat 모드 unknown key scalar(:158)·잘못된 scalar 타입도 동일. **미테스트**. ★현재 무해(inert/shadow)·단 default-deny 불완전 → **hard-reject 배선(M6-G) 전 필수 수정.**
- **BUG-2 (Cosmile field-level 비정합)·`schema.prisma:794-813`(`LongTermMemoryFact`).** `consentScope`·`retentionPolicy`·`sensitivityLevel` 누락 — M2 §3.5 **필수**. SIASIU `ltm_fact`는 R-3에서 추가(`schema_shadow.py:47-49`)했으나 Cosmile 미패치. **EXEC-1 migration이 §3.5 비정합 테이블을 고착** → "field-level 정합" 주장 반증.
- **BUG-3 (양 candidate 테이블 field gap)·`schema_shadow.py:35-40` + `schema.prisma:777-792`(`MemoryFactCandidate`).** `consent_scope`+`sensitivity_level` 누락 — M2 §3.4 필수. BUG-2보다 낮은 severity(candidate=transient·additive-fixable)·단 양 서비스 candidate 미완비.

## WATCH ITEMS (검수자·EXEC-1 전/중 닫기)
1. **BUG-2/BUG-3 필드 추가**(additive·nullable) — EXEC-1 migration DDL 확정 전.
2. **runner 83/89** — 선재 6건이 memory batch 무관·CLAUDE.md 89/89 대비 실선재 확인(검수자 미실행).
3. **Cosmile candidate CHECK 미-DB강제** — prisma는 `@default` 만·`CHECK`는 EXEC-1 raw SQL(P-b·코드 미해소).
4. **BUG-1 gate scalar-scrub** — hard-reject 배선(M6-G) 전 필수(EXEC-1 migration blocker 아님).
5. **Manifest drift** — 검수자는 impl report §7(`a609d26/a113a8b/5413be3`) 사용(pre-review pkg P-a 해시는 pre-M6-C/D/E).
6. **Minor:** `_scrub` `text_ok=True` 분기 미도달(dead capability·미수정 언급만).

## ONE-LINE 결론 (검수자)
안전 자세·inert/fail-safe·execution-gate 분리는 진짜 무결·비과장 — 그러나 "field-level 정합" 주장이 Cosmile `LongTermMemoryFact` 3필드 누락·gate의 bare scalar raw/PII 미scrub로 반증되어 **PATCH_REQUIRED**. 모든 수정은 additive·live/write/hard-reject 경로 무접촉.

## Control 정리 (오케스트레이션·검수자 verdict 수용)
- ★**Control은 검수자 verdict를 자체 판정으로 대체하지 않는다.** 위는 독립 검수자 원문.
- **다음 권고(Leo 판단):** BUG-1/2/3 = **shadow 패치**(additive·no execution·no live·no DB)로 닫고, watch-2(runner 선재)·P-b(CHECK)는 EXEC-1 gate에서 확정. ★패치도 shadow/local·main merge 0·실 migration 0.
- ★**실 migration/prod/live/hard reject 승인 아님**(본 검수·본 정리 모두).

## 무결성
검수 = read-only·코드/DB/migration/push 0 · 본 기록 = 검수자 verdict 충실 기록(Control 자체 판정 아님) · 실 migration 0 · prod 0 · live 0 · hard reject 0 · main merge 0 · 본 문서만 foundation-docs commit/push.
