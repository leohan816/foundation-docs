# Memory Architecture V1 — M2/M3 계약 검수 체크리스트

> ★★SUPERSEDED (Memory V1 Option B · 2026-07-06): **M2의 Option A / FOUNDATION_SUBJECT_REF_SECRET 기반 subject_ref mint 공식은 Memory V1 Option B에 의해 superseded되었다. 현행 정본은 service-local subject_ref mint + Foundation validate/gate/reasoning only이다.** 아래 원문은 이력 보존(clean-not-compress). 정본 계약=`..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md`·closure=`..._M6_FINAL_CLOSURE_20260706.md`. ★V3는 폐기된 Option A 계약을 상속하지 않는다.

> 작성: foundation-control · 2026-07-04 · ★read-only 검수 · 코드 0 · migration 0 · source push 0 · raw/secret 미열람.
> 대상: `COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md`(M2) · `MEMORY_CONTEXT_CONTRACT_V1_20260704.md`(M3).
> 기준: `FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1`(v0.3·DESIGN_READY) · `M1_REVIEW_CONSOLIDATION`.

## 1. M2/M3 ↔ M1 결정 충돌 여부
| M1 결정 | M2/M3 반영 | 충돌 |
|---|---|---|
| 동일 계약 = 9엔티티 전부 | M2 §3 9엔티티 field-level 계약(양 서비스 매핑) | 없음 |
| opt-B(서비스별 자기 원문) | M2 §3.2 ConversationMessage(SIASIU→SIASIU·Cosmile→Cosmile)·external_consult_ref 보조 | 없음 |
| Foundation 고객 LTM 미저장 | M3 §2 Foundation 저장 0·memory_read_provider 미사용 | 없음 |
| memory_context ephemeral | M3 §6 lifecycle(폐기)·§2 request-scoped | 없음 |
| cross-service v1 범위 밖 | M2 §2/§6/§7·M3 §2(broker 아님) | 없음 |
| service-local(subject/guest/erasure) | M2 §6/§7/§3.9 | 없음 |
| Control self-review 제한 | 두 문서 상단 DESIGN_READY 상한·Fable5 FINAL_PASS | 없음 |
- ★**M2/M3는 M1 결정과 충돌 0.**

## 2. 항목별 반영 여부
- **opt-B 반영:** ✅ M2 §3.2(각 서비스 자기 ConversationMessage 원문 저장)·external_consult_ref=보조 참조(정본 대체 아님).
- **service-local 반영:** ✅ M2 §3.9/§6/§7(SubjectRefMap·guest 병합·erasure 전부 service-local·SIASIU↔Cosmile 미연결).
- **Foundation no-broker 반영:** ✅ M3 §2(Foundation 다른 서비스 memory 미조회·memory_read_provider 미사용)·M2 §1.
- **cross-service v1 밖 반영:** ✅ M2 §2/§6(consent cross_service·broker·cross-store erasure = v1 미사용·future)·M3 §2.
- **P1/P2/P3 반영:** ✅ M2 §9(Cosmile P1/P2 동반패치·SIASIU P3·trace_id↔raw identity same row 금지·payload_refs only)·M3 §9 테스트.
- **taxonomy/upsert:** ✅ M2 §4(FactTypeRegistry default-deny)·§5(다중값/SINGLE upsert·pregnancy_nursing SINGLE∩SAFETY immutable 아님).
- **consent/retention/delete:** ✅ M2 §6(enum·3-state·must_not_reappear·is_safety override·ConsentRecord ledger·service-local erasure).
- **ingress gate:** ✅ M3 §7 v1.2 **신규 default-deny gate**(has_raw_or_pii SUPERSEDED·unknown-key reject·nested·상한·CUTOVER echo 호환·B15)·fail-closed·M5 전 필수·W26.
- **memory_reuse_decision:** ✅ M3 §8(shadow/OFF·service-side filter 우선·FRC 필드 후속).
- **예시 payload:** ✅ M3 §10 fake/synthetic only·raw/PII/secret 0.

## 3. M4/M5 구현 전 blocker (★Fable5 F/N + delta-2 — B1~B15)
| # | blocker | 상태 | 소관 | 근거 |
|---|---|---|---|---|
| B1 | `1ce099e` readiness adapter 소재 확인(★baseline 164/164 discrepancy) | 유지 | Cosmile+control | M2 §10 |
| B2 | Cosmile P1/P2 de-anon **M4 동반패치**(원자적·§9) | 유지 | Cosmile | M2 §9 |
| B3 | subject_ref v2 gate 배선(W16)+prod secret 배포 | 유지 | Foundation | M2 §3.9·M3 §7 |
| B4 | Foundation ingress **신규 default-deny gate**(D-1·"재사용"→"신규 스펙") | 유지(재정의) | Foundation | M3 §7 |
| B5 | opt-B raw at-rest 보안 = **§11 최소 스펙 exit criteria**(W24 지위 통일) | 수정 | Cosmile+SIASIU | M2 §11 |
| B6 | SIASIU: **M4 산출물**(consent/delete·reset) ↔ **M4 선행 설계**(brain.py 분기 순서·§5) **분리**(순환 해소) | 수정 | SIASIU | M2 §3.5/§5/§6 |
| B7 | **M2 개정판(본 v1.1→v1.2)** 으로 재확정 | 수정(해소) | control | M2 |
| B8 | retention TTL 실기간·expires_at·auto-sweep 확정(임신 max-age 포함) | 유지 | control+서비스 | M2 §5/§6 |
| B9 | taxonomy 3자 정합 → FactTypeRegistry canonical(goal=SINGLE·sensitivity enum) | 유지 | 서비스 | M2 §4 |
| **B10** | **V0 계약 SUPERSEDED 선언**(Foundation-owns-memory/broker/identity 모순) | 신설 | control | M2 §12·D-11 |
| **B11** | **Memory Candidate Adapter v0 재작성** + keyed hash 정합(unsalted sha256/하드코딩 salt·W25) | 신설 | SIASIU | M2 §13·D-12 |
| **B12** | **M4 migration release train 요건**(backup·dry-run·rollback rehearsal·plan·Leo 승인) | 신설 | control+SIASIU | M2 §14·D-13 |
| **B13** | **P3 gate 결속** + 동반패치 semantics 확정(logins.txt 무기한 잔존 금지) | 신설 | SIASIU | M2 §9·D-10 |
| **B14** | **consent write-gate** + backfill 정책(raw 저장 사전 grant 필요) | 신설 | 서비스 | M2 §6·D-7 |
| **B15** | **M3 §4 whitelist 재정합 + CUTOVER echo round-trip compatibility gate**(앵커 §P+실코드 echo 필드: stated_concerns·safety_facts·recommendation_deferred·last_refined_intent·user_constraints·catalog_candidates·상한·version gate·echo round-trip pass) | 신설(delta-2 핵심) | control+Foundation | M3 §4/§7/§9·D-1/D-5(d)/REG-1 |
- ★전부 additive·flag OFF·shadow·rollback 가능(구조적 blocker 아님·아키텍처 재설계 불요).

## 4. Fable5 검증 질문
1. **FINAL_PASS:** M2/M3 계약(+아키텍처 v0.3)의 **DESIGN_READY → APPROVED** 판정(Control self-review 금지).
2. **착지점(M3 §3):** memory_context를 별도 typed 필드가 아니라 freeform SSC.session_context에 착지시키고 **ingress gate로 강제**하는 설계가 충분한가, 아니면 typed schema 전환이 필요한가?
3. **opt-B raw storage(M2 §3.2):** 서버 raw 상담원문 저장 + at-rest 암호화(W24)가 Cosmile "Foundation-only·서버 raw 미저장" 원칙과 상충하지 않는가(서비스 자체 저장은 별개)?
4. **upsert(M2 §5):** SINGLE 타입에 norm_value UNIQUE 금지 + procedural supersede가 pregnancy_nursing(SINGLE∩SAFETY)에서 안전하게 동작하는가?
5. **is_safety override(M2 §6):** 안전 fact auto-expire 제외가 same-service 보호 게이팅에만 적용되고 (v1 밖인) cross_service를 우회하지 않음이 계약으로 강제되는가?
6. **subject_ref(M2 §3.9):** service-local SubjectRefMap이 미래 cross-service 재도입 시 hard precondition(consent+broker+v2 gate)을 명확히 남기는가?
7. **payload_refs/keyed hash(M2 §9·M3 §4):** content_hash/query_hash keyed(HMAC)/per-service salt가 de-anon correlator 방지에 충분한가?

## 5. verdict  ★Fable5 PATCH_REQUIRED(D-1~D-14)+delta-2+delta-3 반영 후 (v1.2)
- **M2 v1.2 = DESIGN(Fable5 D-1~D-14·delta-2·delta-3 반영·앵커 정합·direction 승인).** Control 상한 = DESIGN_READY.
- **M3 v1.2 = DESIGN(ingress gate 신규 default-deny 스펙·whitelist 재정합·enum 정본·D-1/delta-3).** Control 상한 = DESIGN_READY.
- **B-list = B1~B15**(B10~B15 신설·B5/B6/B7 수정). **M4/M5 착수 = B1~B15 해소 후**(아키텍처 재설계 불요·문서-레벨 수정 완료·delta-2 반영).
- ★**Fable5 delta-3 재검증 완료(FINAL_PASS — DELTA3_FINAL_REVIEW 참조).**
- 상세 반영 매핑: `FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_PATCH_DELTA_20260704.md` + `..._DELTA2_PATCH_20260704.md`.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 예시 fake/synthetic only.
