# Foundation Memory Architecture V1 (M1/M2/M3) — Fable5 최종 독립 검증

> 검증자: **Fable5** (독립 아키텍처 검증 · Control self-review 금지 원칙에 따른 외부 검증)
> 작성: 2026-07-04 · **판정: PATCH_REQUIRED** (설계-레벨 수정 후 재검증 — FAIL 아님·방향 승인)
> 방법: 8개 필수 문서 전량 정독 + 5축 적대 검증(일관성/프라이버시/착지설계/fact·ref/준비도) + **read-only 코드 대조**(foundation_http_service/{contracts,core}.py · FOUNDATION/foundation/shared_memory/gate.py · SIASIU brain.py upsert 로직 · contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md)
> 무결성: 코드 수정 0 · migration 0 · source repo push 0 · raw 고객 데이터 미열람 · secret/PII 출력 0 · 구현 지시 없음(설계 판정만)

---

## A. Verdict: **PATCH_REQUIRED**

- **방향·경계·핵심 결정은 승인 가능 수준으로 견고하다** — opt-B·service-local·Foundation no-broker·cross-service v1-밖은 8개 문서 전체에서 결정-레벨 역전 없이 유지되고, 원칙의 정직성(라벨≠강제 시인·자기정정)은 모범적이다.
- 그러나 **APPROVED(FINAL_PASS)는 불가**: ① 안전 핵심 규칙 1건이 잘못된 baseline 위에 서 있고(FACT-1), ② field-level 정본(M2)이 앵커와 스키마-레벨로 다수 충돌하며(CONS-1~6·FACT-2~4), ③ 유일한 경계 강제 장치(ingress gate)가 설계 자신의 요구를 수행할 수 없음이 코드로 실증되고(CTX-1~5·PRIV-2), ④ opt-B raw 저장의 보안·동의 내용이 공백이다(PRIV-5/6).
- 결함은 전부 **계약·문서 레벨에서 수정 가능**(아키텍처 재설계 불요) → PATCH_REQUIRED.

## B. 읽은 문서 (전량 정독)

1. `설계문서/foundation/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` (v0.3, 737줄, 앵커)
2. `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M1_REVIEW_CONSOLIDATION_20260704.md`
3. `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md` (M2)
4. `설계문서/foundation/MEMORY_CONTEXT_CONTRACT_V1_20260704.md` (M3)
5. `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_REVIEW_CHECKLIST_20260704.md`
6. `설계문서/foundation/FOUNDATION_MEMORY_ARCHITECTURE_V1_FOUNDATION_SIDE_REVIEW_20260704.md`
7. `설계문서/siasiu/SIASIU_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md`
8. `설계문서/cosmile/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md`
+ 코드 대조(read-only): `foundation_http_service/contracts.py·core.py` · `FOUNDATION/foundation/shared_memory/gate.py` · SIASIU `brain.py`(upsert_fact) · `foundation-control/contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md`

## C. 핵심 승인 판단 (검증 질문 10 답변)

| Q | 판정 | 요지 |
|---|---|---|
| 1. M1/M2/M3 상호 일관성 | **부분 FAIL** | 결정-레벨은 일관·충돌 0. **field-레벨은 앵커↔M2 drift 다수**(D-2~D-5) — 체크리스트의 "충돌 0"은 결정-레벨에서만 참(검증 깊이 과대 표현, CONS-7) |
| 2. opt-B·service-local·no-broker·cross-service-v1-밖 유지 | **PASS** | 8개 문서 전체에서 역전/약화 0. §B banner 우선 규칙·M2 §2/§7·M3 §2 전부 정합 |
| 3. Foundation 고객 LTM 미저장 원칙 강도 | **PASS(원칙) / RISK(강제)** | 선언·정직성·설계-현실 정합 강함(라벨≠강제 시인 포함). 단 유일한 강제 장치가 D-1이라 강제력은 미완. §V 일부가 하드코딩 상수를 assert하는 자기충족 검증(PRIV-3) |
| 4. freeform 착지+ingress gate vs typed schema | **불충분 — 절충 필요** | full typed schema 불요. 단 **현행 설계로는 불가**: D-1 참조. 필요한 것 = §4 whitelist의 ingress 구조적 강제(unknown-key reject)+필드 타입/enum 검증+크기 상한 (재료는 이미 M3에 있음) |
| 5. Cosmile opt-B raw 저장 안전성 | **조건부 — 현재 내용 공백** | 방향(서비스 자체 저장·Foundation 미전송)은 무충돌·투명 승인. 단 at-rest 보안이 "필수" 선언뿐 키관리/접근모델/감사/보존/파기 전무(D-6)·저장 시점 opt-in write-gate 부재(D-7) |
| 6. upsert·SINGLE supersede·pregnancy_nursing | **FAIL** | **D-8(FACT-1): pregnancy_nursing supersede가 현행 brain.py에서 도달 불가능한 경로인데 계약이 "현행 유지·동일" 주장** → 모순된 안전 fact 2건 동시 active 가능. UNIQUE-vs-이력보존 충돌(D-3)·soft-delete 재진술 미정의(D-9) |
| 7. SubjectRefMap service-local | **PASS + WATCH 2** | v1 privacy 성립(2차 HMAC·교차 식별 불가·가명 PII 편입). WATCH: `allow_link` 단일 BOOL의 미래 재해석 위험(consent silent repurposing)·동일 고객 양서비스 발산 시나리오 미기술(REF-2/3) |
| 8. P1/P2/P3 동반패치 명확성 | **부분 PASS** | 정의·소관·검증 assert 명확. 단 "동반"의 train 소속이 문서 간 불일치(별도 train vs M4 동반 vs 착수 전)·**P3는 어떤 게이트에도 미결속**(D-10) |
| 9. B1~B9 적절성 | **필요하나 불충분** | B1/B2/B3/B4/B8/B9 타당(코드 실증). B6 순환(M4 산출물=M4 선행조건)·B5 지위 모순(anchor WATCH vs checklist blocker). **누락 blocker 2건 FAIL-등급**(D-11/D-12) + migration train 요건 부재(D-13) |
| 10. V3 기반 충분성 | **PASS + seam 보강 3** | **갈아엎을 구조 선택 무발견**(supersede 이력 보존·provenance/confidence/fact_state seam 존재). additive 보강 필요: consent purpose 축·un-learning 정의·attribution join key 고정(F-3) |

## D. 수정 필요한 설계 결함 (심각도순)

**D-1 [HIGH·M3 §7/W26/B4] ingress gate가 설계 요구를 수행 불가 — "default-deny" 라벨과 실제 메커니즘 모순.**
재사용 대상 `shared_memory/gate.has_raw_or_pii`는 default-allow blacklist다: (a) M3 §5가 reject를 요구하는 `customer_id/user_id/anonymous_id`가 `_RAW_KEYS/_PII_KEYS`에 없음(gate.py:15-17), (b) 키 검사는 top-level만(gate.py:41-46 — 중첩 dict 안 raw 원문 통과), (c) 값 스캔은 email/전화/RRN 정규식뿐(한국어 raw 상담원문·이름·주소 통과), (d) M3 §4 whitelist는 어떤 강제 지점에도 미배선, (e) 크기/깊이/개수 상한 전무(context 폭탄·재귀 crash 벡터). **수정 방향: M3 §7을 "재사용"이 아니라 "신규 gate 스펙"으로 재작성 — unknown-key reject(진짜 default-deny)+필드별 타입/enum 검증+중첩 스캔+상한+초과 시 fail-closed.**

**D-2 [HIGH·M2 §3.5 vs 앵커 §J-2] fact_state 상태머신 충돌.** 앵커=(active|hypothesis|superseded)+별도 3-state BOOL, M2=(active|superseded|deleted|blocked|expired)로 hypothesis 소실·3-state 병합. M2가 "현행 유지" 선언한 2번 규칙(hypothesis 0.40→active 0.60)이 M2 자신의 enum으로 표현 불가. superseded∧deleted 동시 상태 표현 불가. **수정: 앵커 모델(직교 상태)로 M2 통일.**

**D-3 [HIGH·M2 §5/§3.5 vs 앵커 §J-2] SINGLE `UNIQUE(subject_ref,type)` DB 제약 vs "supersede는 옛 row 보존" 충돌.** 앵커는 "procedural·DB UNIQUE 제약 아님" 명시 — M2가 UNIQUE로 격상하면 superseded 옛 row와 새 active row가 동일 키로 공존 불가(이력 보존 또는 supersede 중 하나 파괴). **수정: partial index(`WHERE fact_state='active'`) 명시 또는 procedural로 환원.**

**D-4 [MED·M2 §3.3 vs 앵커 §I-3] EpisodeSummary 목적 변형.** "Foundation 전달 금지"가 "저장 금지"로 재해석되어 `summary_text`(고객 재열람용) 컬럼이 엔티티에서 소실 + 앵커에 없는 `subject_ref` 필수 추가(게스트 세션 null과 충돌). **수정: summary_text(service-local) 복원·subject_ref nullable.**

**D-5 [MED] field-level drift 잔여 4건.** (a) M2 §3.9 SubjectRefMap에서 앵커 M-2의 consent_scope/retention_policy/blocked/expires_at 컬럼 탈락(정책 문장만 잔존, CONS-5) (b) M2 §3.4 MemoryFactCandidate: status(candidate|approved|rejected)·fact_state·raw_text_stored=False 소실·`gate_decision` 무enum 대체·subject_ref 필수 승격(CONS-6) (c) `goal` 카디널리티 3자 모순(M2 registry=다중값 vs 앵커·brain.py=SINGLE, FACT-4) (d) M3 §4 whitelist ↔ 앵커 §P ↔ 실코드 소비 필드 3자 불일치 — M3대로 조립하면 현행 `safety_facts` carry(core.py:1222-1246) 깨짐(CTX-5) + M3 §10 예시 `privacy_level:"internal"` enum 위반(CONS-4) + sensitivity_level enum V0(low 포함)↔앵커(3값)↔M2(미정의) 불일치(CONS-8).

**D-6 [HIGH·W24/B5] opt-B raw 상담원문 at-rest 보안 내용 공백.** "필수" 선언뿐 (i) 키 관리(소유·rotation·KMS/env) (ii) 접근 주체/권한 모델 (iii) 접근 감사로그 (iv) raw 원문 구체 보존기간(결정 #2 "장기보관"과 standard_ttl 365일 제안의 관계 미확정) (v) 파기 절차 — 전부 미정의. B5가 exit criteria 없는 blocker. **수정: at-rest 보안 최소 스펙 문서를 B5의 완료 조건으로 명시.**

**D-7 [MED·PRIV-6] 저장 시점 consent write-gate 부재.** 철회→파기는 설계됐으나 "raw 상담원문 저장 자체가 사전 granted ConsentRecord를 요구한다"는 규칙이 어느 문서에도 없음 — grant 없는 기본 저장이 허용되는 구조. SIASIU 기존 row backfill 기본값도 미규정. **수정: ConversationMessage write-gate 규칙 + backfill 정책 명시.**

**D-8 [HIGH·안전·FACT-1] pregnancy_nursing SINGLE supersede가 잘못된 baseline 위에 정의됨.** M2 §5는 "현 brain.py upsert_fact 로직과 동일·현행 유지"라 주장하나, 실제 brain.py는 **safety 분기가 SINGLE 분기보다 먼저 return** → pregnancy_nursing(SAFETY_TYPES)은 supersede 경로 도달 불가. 새 norm_value(임신중→임신아님)는 supersede 없이 **두 번째 active row로 INSERT → 모순된 안전 fact 2건 동시 active**. **수정: M2에 "SAFETY∩SINGLE은 safety 분기보다 SINGLE supersede를 우선 적용"을 신규 규칙으로 명시(현행 동일 주장 삭제)하고 brain.py 분기 순서 변경을 M4 SIASIU 작업에 포함.**

**D-9 [MED·FACT-5/6/7] fact lifecycle 잔여 3건.** (a) 다중값 UNIQUE와 soft-delete row의 키 점유 — 삭제 후 자발 재진술 시 INSERT 충돌 vs must_not_reappear 관계 미정의 (b) pregnancy_nursing 시간유한성 — stale 임신 fact 무기한 active(과잉 차단)·max-age/재확인 주기 부재(W14 일반론에 임신 특수성 미명시) (c) 안전 fact 삭제 후 보호 상실 — 고지·후속 re-ask·삭제 audit와 안전 판단의 연결 등 완화 장치 부재(방향 자체는 privacy 우선으로 결정됨·방어 가능).

**D-10 [MED·READY-2/3] 동반패치 실행 의미 불일치 + P3 미결속.** P1/P2가 "별도 train"(앵커 §T) vs "M4 동반"(M2 §9) vs "M4 착수 전 blocker"(B2) 3설 병존·원자성/rollback 상호작용 미정의. P3(logins.txt raw email sink)는 B1~B9 어디에도 없고 기한/게이트 부재 — M4 이후에도 무기한 잔존 가능 구조. **수정: 동반패치 semantics 1문장 확정 + P3를 명시 게이트에 결속.**

**D-11 [HIGH·READY-6] 구계약 V0 미퇴역.** `CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0`(Foundation이 memory 저장/gate/identity/consent 소유)는 V1 결정 #5/#10과 **정면 모순**인데 어떤 문서도 supersede/deprecate하지 않음(U-M2는 "enum 일치" 검증만 요구 — 모순 계약과의 enum 일치는 무의미). **수정: V0 SUPERSEDED 선언 + 신규 blocker.**

**D-12 [HIGH·READY-7] 기존 Memory Candidate Adapter v0 미처리.** SIASIU `foundation_memory_candidate_adapter.py`(d0f8dc3)가 (a) 모순된 V0 계약에 정합하고 (b) unsalted sha256+하드코딩 DEV salt로 **W25 규칙을 현재 위반 중**인데, 3개 설계문서 어디에도 이 adapter와 신설 MemoryFactCandidate의 관계(승계/폐기/재작성)가 없음(grep 0). **수정: 관계 정의 + 신규 blocker.**

**D-13 [MED·READY-8] M4 migration train 요건 부재.** M4는 실고객 데이터가 든 SIASIU memory.db 최초 스키마 migration인데 백업·dry-run·rollback rehearsal·migration plan·Leo 승인 release train 요건이 B-list에 없음.

**D-14 [LOW] 기타.** FRC trace에 session_context_in/out 전체 echo — 서비스측 "trace blob 전체" persist 금지 규정 부재(trace_id만 규정, PRIV-4) · §V INVARIANTS assert의 자기충족성(행동 측정으로 보강 필요, PRIV-3) · subject_ref Foundation 전송이 "권장" 수준(REF-4) · M2 산출물 명·위치 drift(계획 contracts/V0.md → 실제 설계문서/V1.md, 무설명, CONS-8) · memory 유래 자유문자열(stated_concerns)이 composer LLM 입력에 무검증 직행하는 prompt-injection 표면(CTX-6 — D-1 gate의 enum 검증으로 함께 해소).

**긍정 확인(반증 실패 — 설계 그대로 유지할 것):** memory 유래 입력으로 safety를 낮추는 벡터는 **구조적으로 차단** 확인(safety_facts = prior∪current union·pregnancy bool OR = raise-only, core.py:1236-1239, CTX-7) · service-local subject_ref의 교차 식별 불가(2차 HMAC) 성립(REF-1) · foundation-docs mirror PII 규칙과 memory 문서 충돌 없음(READY-11) · P1/P2/P3 정의·검증 assert 명확(READY-1).

## E. M4/M5 구현 착수 가능 여부

**아직 불가.** M2/M3 계약이 field-level 정본으로 기능하려면 D-1~D-9(계약 본문)의 수정이 선행되어야 하고, blocker 목록은 F의 개정을 요한다. 수정 범위는 문서-레벨(아키텍처 재설계 불요)이므로 **M2/M3 개정 → Fable5 delta 재검증(전량 재감사 불요) → M4 착수**의 경로가 현실적이다.

## F. 반드시 선결할 blocker (B-list 개정안)

- **유지:** B1(1ce099e 소재) · B2(P1/P2) · B3(subject_ref v2+secret) · B4(ingress gate — 단 D-1 반영해 "재사용"→"신규 스펙"으로 재정의) · B8(TTL 확정) · B9(taxonomy 정합).
- **수정:** B5 — anchor W24와 지위 통일 + at-rest 최소 스펙 문서를 exit criteria로(D-6). B6 — "M4 산출물"과 "M4 선행 설계 확정"을 분리해 순환 해소(D-8의 brain.py 분기 순서 결정 포함). B7 — M2 개정판으로 재확정.
- **신설:** **B10** V0 계약 SUPERSEDED 선언(D-11) · **B11** Memory Candidate Adapter v0 관계 정의+keyed hash 정합(D-12) · **B12** M4 migration release train 요건(백업/dry-run/rollback rehearsal/승인)(D-13) · **B13** P3 게이트 결속 + 동반패치 semantics 확정(D-10) · **B14** consent write-gate + backfill 정책(D-7).

## G. V3-ready 관점 평가

**기반으로 충분 — 구조 재작성 요인 무발견.** supersede 옛 row 보존(시계열 학습 재료)·provenance seam(source_ref/provenance_ref/derived_from_message_ids)·confidence/as_of/fact_state/reconfirmed_at(신뢰도·시간 확장점)·learning_memory_state 12-state·outcome_feedback/decision_history 타입이 이미 계약에 있다. V3 전 additive 보강 3건: ① ConsentRecord에 **purpose 축**(개인화 재사용 vs 학습 투입 동의 구분 — 현 consent_scope는 공유 범위만 인코딩) ② erasure 파생물 정의에 **학습 산출물(un-learning)** 포함(현재 content_hash/summary/evidence_refs 한정 — must_not_reappear가 추천 모델을 커버 못 함) ③ **attribution join key 고정**(P1의 "hashing 또는 미저장" 중 미저장 선택 시 V3 피드백 루프 join key 소실 — keyed-hash 저장을 V3 전제로 고정 + FRC memory_reuse_decision(W15) 선행).

## H. 코드 변경 여부

**0.** 코드 수정 0 · DB migration 0 · source repo push 0 · raw 고객 데이터 열람 0 · secret/PII 출력 0 · 구현 지시 없음(설계 판정과 수정 방향만 — 구체 구현은 Control의 contract/plan 발행 경로를 따를 것).

## I. foundation-docs commit hash

본 문서의 mirror commit hash는 커밋 후 세션 보고에 기재(문서 자체는 자기 hash를 담을 수 없음). 본 문서 = Fable5 검증 산출물 정본.

---
> **한 줄 결론:** 경계와 결정은 옳다 — 그러나 계약이 그 결정을 아직 정확히 받아쓰지 못했다. M2/M3를 앵커에 맞춰 정정하고 gate를 실제 default-deny로 다시 명세한 뒤, delta 재검증을 거쳐 M4로 가라.
