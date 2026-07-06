# COSMILE MEMORY V3 — V3-10 구현 전 Ops/Fable 리뷰 계획 (Pre-Implementation Review Plan)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md, COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md, COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md, COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md, COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md, COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md, COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md, COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706.md] · owns: [pre-implementation review checklist(A~I + V1 잔여 gate) · 단계별 gate 규칙 · STOP/Exit criteria] · referenced_by: [COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md]

이 문서는 **구현을 시작하기 전에** Ops/Fable 리뷰어가 실행하는 **체크리스트**다.
V3 설계(V3-00 ~ V3-09 + 데이터 사전)가 실제 코드/DB/테스트로 내려가기 전, 각 항목을 **PASS/FAIL/BLOCKED**로 판정한다.
FAIL 또는 BLOCKED 항목이 하나라도 남으면 **구현 프롬프트를 발행하지 않는다**(Design-First Operating Rule §2.6).

**리뷰 시점 (P12):** 본 checklist는 구현 성격 단계가 끝난 뒤 한 번 도는 사후 검수가 아니라, **각 단계의 gate로 반복 사용**된다 — ① 설계 패치 후 pre-implementation gate → ② 구현 batch(**V3-11**) 착수 전 재확인 → ③ 구현 후 post-implementation review(**V3-12**)의 기준선. 단계별 판정은 각각 기록하며, 이전 단계의 PASS를 다음 단계에 이월 재사용하지 않는다.

이 문서 자체는 코드·DB·secret·live에 접촉하지 않는다. 리뷰 대상은 **설계서 텍스트와 contract 정의**이며,
실행 검증(테스트/DB)은 "리뷰 시점에는 설계상 존재해야 할 것"을 확인하는 것이지 실제 prod 실행이 아니다.
enum/key/threshold 검증 기준 = `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(이하 "사전") — 사전과 다른 표기 발견 시 사전이 이긴다.

관련 형제 문서(실제 파일명으로 상호참조):
- `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md` — V3 개요/타겟 러닝 커머스 메모리 루프·단계 gate 순서 (+ `COSMILE_MEMORY_V3_00_PROBLEM_DEFINITION_20260706.md`)
- `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` — enum/key/threshold 유일 정본(사전)
- `COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` — subject_ref/guest_ref identity(Option B) · ltm_fact/candidate 계약 · **Foundation memory_context 최소화 계약(소유·request-scoped, no raw/PII)**
- `COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` — RecommendationEvent(노출~장바구니) 계약
- `COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md` — recommendation_id → order/feedback linkability 계약
- `COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706.md` — MemoryFactCandidate → ltm_fact 승격 모델
- `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md` — safety/adverse-reaction 우선 규칙
- `COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md` — DB invariant / schema-validate 수준 정의 · provider-independent vs DB-touch 테스트 분리(§7) · COSMILE-4 복원 계획(§2-B)
- `COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706.md` — 최소 분석 리포트(관측) 계약

(구 임시 접미사 목록(9중 7 불일치)은 superseded — 위가 실제 파일명. "dev/shadow/readiness vs live/prod 구분"은 별도 문서가 아니라 각 설계서의 무결성 절 + V3-00 INDEX가 소유. 구 ★Leo "형제 문서 번호/파일명 최종 확정"은 해소.)

---

## 0. 리뷰 사용법 (Ops/Fable)

- 각 항목은 **하나의 검증 가능한 질문**이다. "그럴 것 같다"가 아니라 **설계서의 어느 줄/필드/enum이 근거인지** 인용해 판정한다.
- 판정값: `PASS`(근거 명시 + 기준 충족) / `FAIL`(기준 미충족) / `BLOCKED`(정보 부족·Leo 결정 대기) / `N/A`(해당 없음, 사유 명시).
- **정보 손실 금지(clean-not-compress).** 항목을 요약으로 뭉개지 말고, 근거 인용을 남긴다.
- 판정이 애매하면 **STOP 후 Leo 확인**. 초록색을 좇아 기준을 완화하지 않는다.
- 리뷰 산출물 = 항목별 판정 표 + 근거 인용. **raw secret·PII·customer/order id·trace_id·prod DB row는 인용에 넣지 않는다**(boolean/count/status/필드명만).

전체 게이트 규칙:
- **A~I 카테고리 + V1 잔여 해소 gate(아래 J0: L1/L2/COSMILE-4) 전 항목 PASS** 여야 구현 프롬프트 발행 가능.
- 카테고리 중 하나라도 FAIL → 해당 설계서 **PATCH_REQUIRED** 로 반려.
- STOP 조건(아래 J) 중 하나라도 감지 → 즉시 전체 BLOCKED.

---

## A. V1 Option B 상속 (canonical inheritance)

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| A1 | V3가 Memory V1 **Option B**를 canonical로 상속한다고 명시하는가? | 설계서에 "V1 Option B 상속" 문장 + Option A/`FOUNDATION_SUBJECT_REF_SECRET` mint **미상속(superseded)** 명시 | Option A 잔재·양쪽 병기·불명확 |
| A2 | subject_ref mint가 **service-local**인가? | `subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET,'<svc>:subject:'+ref)[:32]` 형식이 service 측 소유로 기술 | Foundation이 mint하거나 secret을 소유 |
| A3 | furef mint가 cross-producer consistent 하게 정의되는가? | `furef_v2_ + HMAC(<SVC>_FUREF_SECRET,'<svc>:local_user:'+ref)[:32]` 명시 | 프로듀서별 불일치·정의 누락 |
| A4 | secret은 **service-local**이고 Foundation은 secret을 보지 않는가? | SubjectRefMap/secret 저장 = service-local, Foundation = contract/format/gate/validation only | Foundation이 secret read/mint |
| A5 | Option A 관련 필드/플로우가 신규 설계에 **재유입되지 않았는가**? | Option A mint 경로 0건 | Option A 경로 언급/부활 |

판정: A1~A5 **전부 PASS** 필요. 하나라도 FAIL → V1 상속 위반, 즉시 반려.

---

## B. Foundation 경계 비침범 (boundary non-violation)

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| B1 | Foundation이 **durable customer memory DB가 아님**을 명시하는가? | "Foundation is NOT a durable customer memory DB" 명문 | Foundation에 durable memory 저장 |
| B2 | Foundation이 SIASIU/Cosmile **service DB를 직접 읽지 않는가**? | Foundation은 service postgres 직접 read 0 | Foundation → service DB 직접 쿼리 |
| B3 | Foundation에 넘어가는 것은 **최소화된 request-scoped memory_context** 뿐인가? | `raw_text_stored=False`, `request_scoped=True`, no raw text/PII | raw text/PII/durable 전달 (`see COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md` — memory_context 최소화 계약 소유) |
| B4 | Foundation 역할이 **validate/gate/reasoning ONLY**로 한정되는가? | decision/safety/evidence/verify는 Foundation, 저장/소유는 service | Foundation이 memory 소유/write |
| B5 | service voice·price/stock/cart/order/customer memory가 **Foundation core에 섞이지 않았는가**? | core에 커머스/서비스 데이터 없음 (Architecture Constitution) | core에 vertical 데이터 유입 |

판정: B1~B5 전부 PASS. FAIL 시 Architecture Constitution 위반으로 STOP.

---

## C. service-local memory owner 보존

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| C1 | SIASIU와 Cosmile이 **각자** customer memory + commerce data를 소유하는가? | per-service postgres schema `siasiu` / `cosmile` 분리 명시 | 공유 소유·중앙 memory DB |
| C2 | **cross-schema 직접 참조 0**인가? | schema 간 직접 FK/JOIN/쿼리 없음 | siasiu↔cosmile 직접 참조 |
| C3 | Cosmile 소유 데이터가 SIASIU를 통해 우회 write되지 않는가? | 소유 경계별 write 주체 단일 | 우회 write 경로 |
| C4 | memory 소유권 이전/공유는 **contract 경유**로만 정의되는가? | 공유가 필요하면 contract/adapter 계약으로 (control tower 정의) | 코드 레벨 직접 결합 |

판정: C1~C4 전부 PASS.

---

## D. raw / PII / safety 필드 처리

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| D1 | memory_context/trace에 **raw query/body/customer PII가 저장되지 않는가**? | `raw_text_stored=False`, PII 필드 부재 | raw text/PII 필드 존재 |
| D2 | safety/adverse-reaction 신호가 **commerce/revenue보다 우선**하는가? | 우선순위 규칙에 safety-first 명문 (`see COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706.md`) | revenue 최적화가 safety 위 |
| D3 | "계속 써도 돼?" 류 표현이 **safety-first**로 처리되는가? | 해당 표현 → adverse/safety 경로 우선 분기 | commerce 추천으로 직행 |
| D4 | **의학적 단정(medical assertion)이 없는가**? | 진단/치료 단정 금지 명시 | medical 단정 표현 |
| D5 | safety caveat가 service semantic/output adapter로 **낮춰지지 않는가**(MAX·fail-closed)? | safety는 adapter가 완화 불가, fail-closed | adapter가 safety 완화 |
| D6 | adverse 신호가 **장기기억 승격과 무관하게 즉시** 반영 경로를 갖는가? | 단일 안전신호도 severity×certainty에 따라 즉시 deterministic 효과(사전 §5.3 AdverseSignalActionMatrix — 승격 대기 아님·safety fact는 evidence 문턱 미적용 — 사전 §5.2) | 안전신호가 승격 큐에 묶임·matrix 밖 임의 처리 |

판정: D1~D6 전부 PASS. D1/D2/D5 FAIL은 STOP 조건.

---

## E. recommendation_id → order/feedback linkability

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| E1 | 타겟 루프 각 단계가 **공통 상관키**로 연결되는가? | consultation→recommendation→product/SKU→view/cart/checkout/order→satisfaction/adverse/repurchase 를 잇는 `recommendation_id`(`rec_v3_`+ULID — 사전 §1.1) 및 상관키 정의 (`see COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md`·`COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706.md`) | 단계 간 연결키 부재·키 형식 사전 불일치 |
| E2 | `recommendation_id`가 **order/feedback**까지 도달 가능한가? | order·feedback 레코드에 recommendation_id 참조 필드 존재 | 추천→주문 추적 불가 |
| E3 | 상관키가 **PII/subject 원문을 노출하지 않는가**? | recommendation_id는 opaque, subject_ref/furef와 분리 | id에 PII/원문 결합 |
| E4 | MemoryFactCandidate가 **어느 recommendation에서 파생됐는지** 역추적되는가? | candidate → source recommendation_id 링크 | 출처 미상 candidate |
| E5 | 링크 부재(추천 없는 주문/귀속 실패) 케이스가 **명시적 enum**으로 표현되는가? | `rec_outcome_event.recommendation_id` NULLABLE(사전 §1.3 R-K1) + `attribution_mode`(사전 §2.9: `direct`/`session`/`organic`/`unattributed`/`unknown`)로 구분 (구 `link_status: linked/no_order/no_feedback/expired` 예시 enum은 superseded — 사전 §2.9) | null 방치·암묵 처리·사전 밖 enum 발명 |

판정: E1~E5 전부 PASS. E1이 러닝 루프의 척추 — FAIL 시 V3 핵심 미충족.

---

## F. DB invariant 충분성 (schema/validate 수준)

> Cosmile postgres는 **현재 "schema/validate 수준"** — "real DB integration complete"라고 절대 쓰지 않는다.

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| F1 | 설계서가 상태를 **"schema/validate level"**로 정직하게 표기하는가? | "real DB integration complete" 표현 0건 | 완료 과장 표현 |
| F2 | MemoryFactCandidate/ltm_fact에 **필수 invariant**가 정의됐는가? | NOT NULL/enum 도메인/FK/unique 명시 (`see COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md`) — enum 값은 사전 기준 | invariant 누락·사전과 다른 enum |
| F3 | 승격 단계에 **evidence/confidence 필드**와 임계값이 있는가? | confidence 범위·evidence count·다중신호 요건 = 사전 §3(`N_min=2`·`C_min=0.60`·`distinct_signal_source_count≥2`) 참조로 명시 | 단일 신호 승격 허용·사전과 다른 수치 |
| F4 | **단일 신호로 장기기억 확정 금지**가 스키마/규칙으로 강제되는가? | 승격 규칙 = 사전 §3 문턱(확정 = ★Leo·사전 §4 파라미터 표). 단 **safety fact는 문턱 미적용 별도 lifecycle**(사전 §5.2 — D6과 정합) | 1건으로 promote(non-safety)·safety fact에 문턱 강등 적용 |
| F5 | 삭제/만료/차단/동의 상태가 **enum**으로 표현되는가? | `memory_reuse_decision: allowed/blocked/expired/deleted/consent_required/not_available` + candidate `status`(candidate/approved/rejected)·`lifecycle_state` = 사전 §2.2·fact 직교 3-state = 사전 §2.3 | 상태 누락·boolean 뭉개기·사전 밖 status 어휘 |
| F6 | schema 마이그레이션이 **prod DB backfill/live migration을 포함하지 않는가**? | validate/dev 수준만, prod migration은 out-of-scope | prod migration 포함 |

판정: F1~F6 전부 PASS. F1 FAIL은 정직성 위반(§1 절대 원칙 1).

---

## G. 테스트 의미 (per `docs/testing/TEST_MEANING_POLICY.md`)

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| G1 | 각 테스트가 **보호 대상 계약/경계/위험을 증명**하는가? | 테스트 ↔ invariant/safety/boundary 매핑 존재 (`see COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706.md` §7) | 커버리지 숫자만·의미 없음 |
| G2 | assertion 약화·skip·snapshot 갱신으로 **초록색을 좇지 않는가**? | 기대값 변경 시 계약 변경 근거 동반 | 근거 없는 expectation 완화 |
| G3 | safety invariant 테스트가 **0-violation 카운터**로 표현되는가? | false_allow/leak/overreach = 0 검증 케이스 존재 | 안전 위반 미측정 |
| G4 | 실패 테스트를 **고치기 전 해석**하는 절차가 있는가? | "코드 vs 기대값" 판단 규칙 명시 | 무조건 초록 만들기 |
| G5 | 기존 regression(SIASIU 39/39·119/119, Cosmile readiness 164/164, loop 112/112) **유지**가 회귀 계획에 포함되는가? | cross-project regression 재사용 명시 | 기존 테스트 삭제/축소 |

판정: G1~G5 전부 PASS. G2/G5 FAIL은 STOP 조건.

---

## H. provider-independent vs DB-touch 테스트 구분

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| H1 | **provider-independent**(순수 로직/계약/mint/승격 규칙) 테스트가 DB 없이 도는 것으로 분리됐는가? | DB/secret/network 미접촉 테스트 세트 명시 | 로직 테스트가 DB 의존 |
| H2 | **DB-touch** 테스트가 **schema/validate 수준**(dev/mock)으로 한정되는가? | prod DB 접촉 0, dev/mock schema만 | prod DB 접촉 |
| H3 | 두 계층이 **명확히 라벨링**되는가? | 테스트 이름/디렉토리/마커로 구분 | 혼재·구분 불가 |
| H4 | subject_ref/furef mint 테스트가 **실 secret 없이** deterministic fixture로 도는가? | 합성/anonymized secret fixture (실 secret 0) | 실 secret 사용 |
| H5 | DB-touch 테스트가 **CI에서 실 prod 자격증명을 요구하지 않는가**? | 로컬/ephemeral schema만 | prod 자격증명 필요 |

판정: H1~H5 전부 PASS. H4 FAIL은 secret 유출 위험 → STOP.

---

## I. live/prod vs dev/shadow/readiness 구분

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| I1 | 설계서가 전체를 **dev/shadow/readiness**로 명시하는가? | live/prod activation 아님을 명문 (각 설계서 무결성 절 + `COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md`) | live 완료 뉘앙스 |
| I2 | Hard Stop 목록이 **out-of-scope**로 고정됐는가? | prod DB access·real secret/Vault·main merge·live activation·external release·prod DB migration = out-of-scope | Hard Stop 항목이 in-scope |
| I3 | feature flag / write / live / promotion **default OFF**인가? | `applied_to_real_user=false`, `write_performed=false`, promotion 0 | 기본값 ON |
| I4 | 목표가 **"automatable memory/learning 구조 구축"**이고 **auto-execution이 아님**을 명시하는가? | 자동 실행 아님·자동화 가능 구조 설계 명문 | 자동 실행 활성 |
| I5 | 보고 언어가 §9 금지 표현(production live completed 등)을 **쓰지 않는가**? | 허용 표현(read-only/shadow PASS·flag OFF)만 | 금지 표현 사용 |

판정: I1~I5 전부 PASS. I2/I3 FAIL은 STOP 조건.

---

## J0. V1 잔여 해소 gate (P7 — L1 / L2 / COSMILE-4)

| # | 검증 질문 | PASS 기준 | FAIL 신호 |
|---|-----------|-----------|-----------|
| L1 | **L1**: Option A supersede가 실제 source contract 2건에 적용됐는가? | `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1`·`FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE` **원문**에 Option B supersede pointer가 실제로 존재함을 원문에서 확인(보고서 패치만으로 PASS 불가) | 정본 계약 원문에 Option A 공식이 pointer 없이 현행처럼 잔존 |
| L2 | **L2**: M6-G 정의가 추적되는가? | M6-G가 확정 정의됐거나 **명시 이월**(이월 위치 명기·activation은 Hard Stop) 중 하나로 문서화 | M6-G 미언급·암묵 누락 |
| C4 | **COSMILE-4**: baseline invariant 3종 복원 계획이 존재하는가? | V3-08 §2-B에 3종(SubjectRefMap partial unique · active LTM fact partial unique/SAFETY∩SINGLE · MFC status CHECK 등 orphan/lifecycle 제약)이 이름으로 열거 + `migrate deploy` pre-gate(V3-08 G13) 연결 | COSMILE-4 미인용 · INV-DB-1/2/3(신규 카운터)으로 대체됐다고 주장 |

판정: L1·L2·C4 전부 PASS(L2는 명시 이월 문서화 시 PASS 허용·근거 인용).

---

## J. STOP 조건 (하나라도 감지 시 전체 BLOCKED)

- Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint 재유입 (A5 FAIL)
- Foundation이 durable memory 저장 또는 service DB 직접 read (B1/B2 FAIL)
- raw query/body/customer PII가 memory_context/trace에 존재 (D1 FAIL)
- safety를 adapter가 완화 / revenue가 safety 우선 (D2/D5 FAIL)
- 단일 신호로 long-term memory 확정 (F4 FAIL)
- expectation 완화·regression 삭제·설명 없는 test count 감소 (G2/G5 FAIL)
- 실 secret/Vault/prod DB/main merge/live activation 접촉 (H4/H5·I2 FAIL)
- write/live/promotion > 0, checkout/order/customer DB write > 0

STOP 시: 즉시 리뷰 중단 → 해당 설계서 `PATCH_REQUIRED` 표기 → Leo 보고. 구현 프롬프트 발행 금지.

---

## K. 리뷰 완료 게이트 (Exit Criteria)

구현 프롬프트 발행은 **아래 전부 충족** 시에만:

1. A~I 카테고리 + J0(L1/L2/COSMILE-4) **모든 항목 PASS** (N/A는 사유 명시).
2. J STOP 조건 **0건**.
3. ★Leo 결정 필요 항목(아래 L) **전부 해소/승인**.
4. 형제 문서 상호참조 링크가 실제 파일명으로 확정(본 패치 batch에서 반영됨 — 리뷰 시 재확인).
5. 리뷰 산출물이 `reports/`에 기록 (raw/PII/secret 없이 boolean/count/status/필드명만).

미충족 시: 설계서 반려(PATCH_REQUIRED) 또는 BLOCKED, 별도 release train 재시도.

---

## L. ★Leo 결정 필요 (Open Questions)

- (해소) 형제 문서 번호·파일명 최종 확정 — 실제 파일명으로 교정 완료(상단 상호참조).
- ★Leo 결정 필요: F4 승격 임계값 최종 확정 — 정본 초안 = 사전 §3(`N_min=2`·`C_min=0.60`), 확정 위치 = 사전 §4 파라미터 표.
- (superseded — 사전 §2.9) E5 `link_status` enum — `attribution_mode` 정본으로 대체(별도 enum 신설 없음).
- ★Leo 결정 필요: adverse 즉시 safety 반영(D6 — 사전 §5.3 matrix)과 승격 큐의 분리 경계 확정.
- ★Leo 결정 필요: dev/mock DB-touch 테스트를 cross-project regression runner에 포함할지, 별도 프로세스로 격리할지(namespace 충돌 회피).
- ★Leo 결정 필요: 리뷰 주체 배정 — Ops vs Fable 항목 분담(예: A~C·H·I=control/Ops, D·G=safety/testing, E·F=commerce/DB).

---

## 무결성

- **design-only**: 코드·DB·secret·live 무접촉. 본 문서는 구현 전 리뷰 체크리스트일 뿐 실행/활성화가 아니다.
- **V1 Option B 상속**(Option A / `FOUNDATION_SUBJECT_REF_SECRET` mint **미상속·superseded**).
- **Foundation = validate/gate/reasoning ONLY** — durable customer memory DB 아님, service DB 직접 read 아님. request-scoped·최소화 memory_context(raw_text_stored=False)만 전달.
- **service-local ownership**: SIASIU·Cosmile 각자 customer memory + commerce data 소유, per-service schema(siasiu/cosmile), cross-schema 직접 참조 0.
- **safety-first**: adverse-reaction/safety가 commerce/revenue보다 우선, 의학적 단정 없음, "계속 써도 돼?" 류 safety-first, safety는 adapter가 완화 불가(MAX·fail-closed).
- **Cosmile DB = "schema/validate 수준"** — "real DB integration complete" 아님.
- **no prod / no live / no main merge / no real secret / no Vault / no prod DB migration** — Hard Stop 전부 out-of-scope, write/live/promotion 0, applied_to_real_user=false.
