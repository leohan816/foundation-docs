# SIASIU Memory Candidate Adapter v0 (Shadow) — 2026-06-29

> 플랫폼 로컬 데이터에서 **Foundation Shared Memory candidate를 제안**하는 SIASIU repo-local adapter.
> 정합: `foundation-control/contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md` (§1 schema·§5 SIASIU consultation-first).
> ★dev/shadow only·feature flag 기본 OFF·**raw 상담원문/PII Foundation 미전송**(hash/refs만)·실 write/live/migration 0·answer.py 무변경.

## 역할 경계
- SIASIU = 원본 고객정보·상담/행동 데이터 **로컬 보관**(경계 못 넘음).
- Foundation에는 **요약된 memory candidate만 제안**(원문/PII 미전송). 판정·저장은 Foundation memory gate(이 작업 범위 아님).

## 구현 (SIASIU repo-local · additive)
- `app/ssbrain/foundation_memory_candidate_adapter.py` — `make_candidate`·`guard`(raw/PII default-deny)·`shadow_write`/`shadow_read`(in-memory·휘발성).
- `app/ssbrain/foundation_feature_flags.py` — flag `siasiu_memory_candidate_shadow_enabled` 추가(**기본 OFF**).
- `app/tests/test_siasiu_memory_candidate_adapter.py` — 25 assertions(작업 12 테스트 + schema + shadow).

## Candidate schema (§1 정합)
subject_ref(synthetic salted hash)·source_service=**siasiu**(고정)·local_user_ref·memory_candidate_id·memory_kind·sensitivity_level·consent_scope·retention_policy·**raw_text_stored=false**·raw_text_hash·content_hash·evidence_refs(refs/hash만)·created_from·**write_intent=candidate_only**·gate_decision(Foundation이 채움)·read_scope·**applied_to_real_user=false**·**write_live=false**.

## 종류 / 입력원
- memory_kind(6): preference·concern·reaction·decision_history·outcome_feedback·safety_note. (concern/reaction/safety_note = sensitive)
- created_from(4): consultation·commerce_event·profile_update·feedback. (SIASIU = consultation-first)

## raw/PII 차단 (결정론 guard·default-deny)
- raw 원문 필드 키(raw_text/query/body/transcript/order_raw/payment_raw/…) 존재 → **block**.
- PII 필드 키(email/phone/address/rrn/customer_name/…) 존재 → **block**.
- PII 값 패턴(email·휴대폰·유선·주민번호류·카드번호류 정규식) → **block**.
- `raw_text_stored != false` → **block**. (★휴리스틱 아님 — 명시 키/패턴 default-deny.)

## 검증
- 25/25 PASS · flag OFF 시 비동작 · flag ON(dev/shadow·test-only)만 생성 · raw/PII 전부 block.
- shadow write/read = **in-memory 시뮬레이션**(written=false·memory.db 없음·DB/network 0) · cross_service read는 consent 없으면 미노출.
- answer.py 지문 d7f579443f8a110a 불변 · 상담 원문 Foundation 미전송 · 실 고객 DB write 0.

## control tower 재검증 항목
- Foundation memory gate(`gate_decision`)와의 end-to-end(propose→gate→shadow write) 통합은 **foundation-control 관할**(cross-project).
- subject_ref **실 salted-hash 정책**(현재 dev salt)·consent record 연동은 Foundation/control tower 정의.
- Cosmile 측 동형 adapter(commerce-first)와의 cross-service read consent 규칙 검증.

## 경로 메모
작업 템플릿의 `docs/`·`reports/`는 SIASIU 컨벤션상 **`설계문서/`·`검증결과/`**로 매핑(CLAUDE.md §1·[[design-docs-folder-is-설계문서]]).
