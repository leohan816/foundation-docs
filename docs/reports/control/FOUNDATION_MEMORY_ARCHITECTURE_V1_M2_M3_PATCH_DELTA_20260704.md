# Memory Architecture V1 — M2/M3 Fable5 PATCH DELTA (D-1~D-14 반영)

> 작성: foundation-control · 2026-07-04 · ★read-only 문서 patch · 코드 0 · migration 0 · source push 0 · raw/secret 미열람 · 구현 지시 없음.
> 기준: `FOUNDATION_MEMORY_ARCHITECTURE_V1_FINAL_REVIEW_20260704.md`(Fable5·PATCH_REQUIRED·D-1~D-14) → M2/M3/checklist v1.1 개정.

## 1. Fable5 D-1~D-14 반영 여부
| D | 심각도 | 지적 요지 | 반영 | 반영 문서/섹션 |
|---|---|---|---|---|
| **D-1** | HIGH | ingress gate가 default-allow blacklist라 요구 수행 불가 → 신규 default-deny 스펙 | ✅ 반영 | **M3 §7 전면 재작성**(unknown-key reject·whitelist 강제·type/enum·nested recursive·식별자(customer/user/anonymous/session_id/order/payment/shipping) 차단·한국어 raw text/name/address·size/depth/count 상한·fail-closed·echo clean) · M3 헤더 · checklist B4 재정의 |
| **D-2** | HIGH | fact_state 상태머신 충돌(hypothesis 소실·3-state 병합) | ✅ 반영 | **M2 §3.5**: fact_state=(active\|hypothesis\|superseded) + **직교 3-state flag(deleted/blocked/expired)** · superseded∧deleted 동시 표현 · hypothesis 보존 |
| **D-3** | HIGH | SINGLE UNIQUE(subject_ref,type) vs 이력보존 충돌 | ✅ 반영 | **M2 §5·§3.5**: SINGLE DB UNIQUE **금지** → procedural supersede 또는 **partial index WHERE fact_state='active'**(active≤1·이력 무제한) |
| **D-4** | MED | EpisodeSummary summary_text 소실·subject_ref 필수(게스트 충돌) | ✅ 반영 | **M2 §3.3**: `summary_text` **service-local 저장 복원**(Foundation 전달 금지·저장 가능 분리)·`subject_ref` **nullable**(게스트) |
| **D-5** | MED | field drift 4건(SubjectRefMap 컬럼·MemoryFactCandidate enum·goal 카디널리티·sensitivity/privacy enum) | ✅ 반영 | **M2 §3.9**(consent/retention/blocked/expires 컬럼 복원)·**§3.4**(status enum·raw_text_stored=false·gate_decision enum·subject_ref nullable)·**§4**(goal=SINGLE·sensitivity_level enum 통일)·**M3 §4/§10**(privacy_level enum·예시 "internal"→"normal") |
| **D-6** | HIGH | opt-B raw at-rest 보안 내용 공백 | ✅ 반영 | **M2 §11 신설**(at-rest encryption·key ownership/rotation/KMS·접근모델·감사로그·보존기간·파기·dev 평문 위험·B5 exit criteria) |
| **D-7** | MED | 저장 시점 consent write-gate 부재 | ✅ 반영 | **M2 §6**(ConversationMessage raw 저장=사전 grant 필요·grant 없으면 session-only·backfill 기본값·B14) |
| **D-8** | HIGH·안전 | pregnancy_nursing supersede가 잘못된 baseline("현행 동일") 위 → 모순 안전 fact 2건 | ✅ 반영 | **M2 §5·§3.5·§4**: "현행 동일" **삭제**·**SAFETY∩SINGLE = SINGLE supersede 우선**(safety 분기보다)·brain.py 분기 순서 변경 M4 포함·active≤1 불변 |
| **D-9** | MED | fact lifecycle 3건(soft-delete key·임신 max-age·안전 삭제 후 보호) | ✅ 부분반영 | **M2 §5**(다중값 partial UNIQUE=soft-delete key 미점유·pregnancy max-age~300일 reconfirm 초안)·§3.5. 안전 삭제 후 고지/re-ask는 방향(privacy 우선) 유지·M4 상세 |
| **D-10** | MED | 동반패치 semantics 3설 병존·P3 미결속 | ✅ 반영 | **M2 §9**: 동반패치 **1문장 확정**(M4 동반·M4 선행조건·P-patch 없이 merge 금지)·**P3 → B13 gate 결속** |
| **D-11** | HIGH | V0 계약 미퇴역(Foundation-owns-memory 모순) | ✅ 반영 | **M2 §12 신설**(V0 SUPERSEDED 선언·모순 명시·enum만 참고·B10) |
| **D-12** | HIGH | Memory Candidate Adapter v0 미처리(V0 정합·unsalted sha256+하드코딩 salt·W25 위반) | ✅ 반영 | **M2 §13 신설**(adapter v0 **재작성** 결정·keyed HMAC·subj_v2_·per-service salt·신규 MemoryFactCandidate 관계·B11) |
| **D-13** | MED | M4 migration train 요건 부재 | ✅ 반영 | **M2 §14 신설**(backup·dry-run·rollback rehearsal·plan·Leo 승인·B12) |
| **D-14** | LOW | 기타(trace blob echo·INVARIANTS 자기충족·subject_ref 전송 "권장"·산출물명 drift·prompt-injection) | ✅ 부분반영 | M3 §7(enum 검증으로 prompt-injection 표면 축소·CTX-6)·§5(session_id 차단). trace blob 전체 persist 금지·INVARIANTS 행동측정은 **M4/M5 테스트 항목**으로 이월(delta 잔여) |

## 2. 미반영/이월 사유 (정직)
- **D-9(c) 안전 fact 삭제 후 보호 상실 완화장치**: 방향(고객 privacy 우선 삭제권)은 Fable5도 "방어 가능"으로 인정 → v1 계약은 삭제권 우선 유지, 고지/re-ask UX는 **M4 서비스 구현 상세**로 이월(계약-레벨 미정의).
- **D-14 trace blob 전체 persist 금지·INVARIANTS 행동측정**: 계약 원칙(trace_id keyed-hash/미저장·write 0)은 반영, **"trace blob 전체" 서비스 persist 금지 명문 + INVARIANTS 행동측정**은 **M5 테스트 기준**으로 이월(문서-레벨 원칙은 M3 §6-7에 존재).
- 위 2건은 **설계 blocker 아님**(방향 확정·구현/테스트 상세 이월).

## 3. B-list 개정 결과
- **유지:** B1·B2·B3·**B4(재정의: "재사용"→"신규 default-deny 스펙")**·B8·B9.
- **수정:** **B5**(§11 at-rest 최소 스펙 exit criteria·W24 지위 통일)·**B6**(M4 산출물 ↔ M4 선행 설계 분리·순환 해소)·**B7**(M2 v1.1 재확정·해소).
- **신설:** **B10** V0 SUPERSEDED(D-11)·**B11** adapter v0 재작성+keyed hash(D-12)·**B12** M4 migration train(D-13)·**B13** P3 gate 결속+동반 semantics(D-10)·**B14** consent write-gate+backfill(D-7).
- 총 **B1~B14**. (checklist §3 정본.)

## 4. M4/M5 착수 가능 여부
- **아직 불가** — Fable5 §E대로 **M2/M3 개정(완료) → Fable5 delta 재검증 → M4 착수** 경로.
- 개정은 **문서-레벨 완료**(아키텍처 재설계 불요). M4/M5 실착수는 **B1~B14 해소** + Fable5 delta APPROVED 후.

## 5. Fable5 delta 재검증 요청
- ★**요청 = YES**(전량 재감사 불요·D-1~D-14 반영분 **delta만** 재검증).
- 재검증 초점: (1) M3 §7 신규 ingress gate 스펙이 D-1(default-deny·nested·상한·식별자)을 실제로 충족하는지 · (2) M2 §5 SAFETY∩SINGLE supersede 우선 + active≤1이 D-8 안전결함을 닫는지 · (3) §11 at-rest 최소 스펙이 D-6 exit criteria로 충분한지 · (4) §12 V0 SUPERSEDED·§13 adapter 재작성이 D-11/D-12 모순을 제거하는지 · (5) B10~B14가 누락 blocker를 메우는지.
- **최종 FINAL_PASS = Fable5**(Control self-review 금지·Control 상한 = DESIGN_READY).

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 구현 지시 없음(계약·수정 방향만).
