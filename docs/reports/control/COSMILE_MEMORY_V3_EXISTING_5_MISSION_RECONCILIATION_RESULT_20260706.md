# COSMILE MEMORY V3 — 기존 Cosmile 5 미션 Reconciliation 결과 (read-only)

> 작성: foundation-control(Control) · 2026-07-06 · **status: RESULT — 판정 정본**
> 계획/기준 문서: `COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706.md` (§3 분류 기준·§5 inspection plan 그대로 적용)
> 어휘 정본: `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`
> depends_on: [COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706.md · COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md · COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706.md · COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md · COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706.md] · owns: [기존 5 미션 상태 판정(정본)] · referenced_by: [COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706.md]

---

## 0. 판정 요약

| # | 미션 (실명) | 판정 | patch 필요 |
|---|---|---|---|
| M1 | COSMILE-CONNECT-UI-SWITCH | **DONE_WITH_LIMITS** | 불요 (한계 상속 명시만) |
| M2 | COSMILE-EVENT-TRACKING-AUDIT | **DONE_WITH_LIMITS** | 불요 (P1/P2 gap = V3-03 입력) |
| M3 | COSMILE-EVENT-TRACKING-SPEC | **NEEDS_V3_PATCH** | **필요** — cev-1.0 → V3-03 정렬 patch (2-pass 재판정 대상) |
| M4 | COSMILE-ANALYTICS-PIPELINE | **DONE_WITH_LIMITS** (2-pass 재판정 대상) | 조건부 — V3-09 계약 확정 후 재판정 |
| M5 | **COSMILE AI Commerce Decision Loop v0.1** (구 표기 `COSMILE-FOUNDATION-COMMERCE-LOOP` — superseded·실존 코드명 아님) | **DONE_WITH_LIMITS** | 불요 (mock/shadow 한계 상속 명시만) |

집계: **DONE 0 · DONE_WITH_LIMITS 4 · OBSOLETE 0 · NEEDS_V3_PATCH 1.**
STOP 트리거(V3-01 §6.6) 발견 = **0** — raw PII/trace leak 0 · real DB write 신규 경로 0 · live/promotion open 0 · Option A secret 활성 0.

---

## 1. M1 · COSMILE-CONNECT-UI-SWITCH — DONE_WITH_LIMITS

**Evidence 앵커 (실재 확인):**
- Cosmile repo commit **`35febe2`** — `feat(slice): COSMILE-CONNECT-UI-SWITCH — 상담 provider flag(legacy ↔ foundation_contract)` · **HEAD(`6c6aa7f`) ancestor = true**.
- 설계서: foundation-control `설계자료/20260702_COSMILE_CONNECT_UI_SWITCH_설계서.md`.
- 마감기록(UI_SWITCH_CONTROL_PASS): foundation-control `docs/COSMILE_CONNECT_UI_SWITCH_CLOSED_20260702.md` + `..._REVIEW_20260702.md` + `..._REVIEW2_20260702.md` (foundation-control git에서는 untracked).
- mirror: foundation-docs `설계문서/cosmile/COSMILE_CONNECT_UI_SWITCH_CLOSED_20260702.md` @`3c9dee2` · `설계문서/shared/20260702_COSMILE_CONNECT_UI_SWITCH_설계서.md` @`3c9dee2`.

**판정 근거 (boolean/count/status):**
- 원래 acceptance = **CONTROL_PASS 문서화 존재** (provider flag fail-safe·endpoint switch·FRC mapping·safety rendering hard-stop·rollback 전부 PASS 기록).
- Option B 정합 = **OK** — Cosmile `app/src`에서 `subj_v1_`/`subj_v2_`/`FOUNDATION_SUBJECT_REF_SECRET` 참조 grep = **0** (Option A 의존 0 · Foundation-side mint 잔재 0. identity = guest 쿠키 + 서버 세션 derive userId — service-local, Option B와 호환).
- Foundation validate/gate-only 정합 = **OK** — FRC 소비만·safety(block/safety_first/products_allowed=false) → 상품/CTA/추천 렌더 0 hard-stop PASS 기록.
- safety-first 정합 = **OK** (safety rendering hard-stop이 commerce 렌더보다 우선).
- postgres 정합 = **N/A** (이 slice는 DB 스키마 무접촉).

**상속해야 할 한계 (DONE_WITH_LIMITS 사유):**
1. read-only/mock/shadow provider-switch — production exposure·write 미포함(별도 승인 train).
2. cart-unification WIP가 Cosmile working tree에 잔존 — **"cart write 0"은 commit(HEAD) 기준으로만 참**, `:3000` runtime 기준 아님. production/CI = HEAD-clean build 필수(마감기록 §8·§9 그대로 상속).
3. foundation path 신규 event tracking = 0 (의도적 제외) — V3-03 `foundation_decision_received`/RecommendationEvent 배선 대상 구간.
4. subject_ref/furef **미사용** 미션이므로 service-local mint 전제의 명시 문서화는 V3 구현 시 상속 항목.

---

## 2. M2 · COSMILE-EVENT-TRACKING-AUDIT — DONE_WITH_LIMITS

**Evidence 앵커 (실재 확인):**
- foundation-control `docs/COSMILE_EVENT_TRACKING_AUDIT_PLAN_20260702.md` · `docs/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md` (판정 **AUDIT_READY_FOR_SCHEMA** · code-cited file:line) — foundation-control git untracked.
- mirror: foundation-docs `설계문서/cosmile/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md` @`1320018` · `docs/reports/audits/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md` @`3c9dee2`.

**판정 근거:**
- 미션 목표(read-only 감사) 달성 문서화 존재: 2계층 이벤트 맵·이벤트별 구현 현황·identity/PII/sink 경계 전수. **P0(active PII leak/미검증 write) = 0** 기록.
- Option B 정합 = **OK** — userId 서버 derive(client 미신뢰)·guest 쿠키(`cosmile_gid`)·mergeGuest(gid 소진) 확인. Option A 참조 0.
- Foundation 경계 = **LIMIT** — Cosmile→Foundation outbox는 **큐 적재 상태(status=pending — Cosmile 서비스 로컬 큐 상태값·V3 candidate status enum과 무관)·실발신 0** 유지. Foundation→Cosmile(FRC/trace_id) 이벤트화 **부재**(P1 gap으로 기록 — 위반이 아니라 공백).
- safety/PII = **LIMIT** — SENSITIVE_KEYS scrub은 **키-이름 기반**(값-스캔 미적용·P1)·sessionStorage raw 대화(client at-rest·P2). active leak = 0.
- postgres 정합 = **LIMIT** — commerceEvent prisma write는 **pre-existing 서비스 소유 write**(감사가 추가한 write 0). V3 postgres substrate 관점에서는 schema/validate level 표기 규율 상속.

**상속해야 할 한계:** P1(FRC/trace_id 이벤트화 부재·PII 값-스캔·UTM·session_id 일반화)·P2 gap 목록은 그대로 **V3-03 RecommendationEvent 계약의 입력**이다. 감사 자체의 재작업 불요.

---

## 3. M3 · COSMILE-EVENT-TRACKING-SPEC — NEEDS_V3_PATCH

**Evidence 앵커 (실재 확인):**
- foundation-control `docs/COSMILE_EVENT_TRACKING_SPEC_20260702.md` (canonical event schema `cev-1.0` · **상태 DRAFT·미승인** · 구현 0) + `..._SPEC_PHASE1_REVIEW_20260702.md` · `..._SPEC_PHASE2_PLAN_20260702.md` · `..._SPEC_PHASE2_REVIEW_20260702.md` · `..._SPEC_PHASE3_PLAN_20260702.md` — foundation-control git untracked.
- mirror: foundation-docs `설계문서/cosmile/COSMILE_EVENT_TRACKING_SPEC_20260702.md` @`3c9dee2`.

**판정 근거 (V3-01 §3.4 트리거 충족 — "V3 루프 필드를 담을 수 없다"):**
- cev-1.0 스키마에서 V3 루프 필수 어휘 grep = **0 hit**: `recommendation_id`(사전 §1.1 `rec_v3_`+ULID) · `attribution_mode`(§2.9) · `semantic_label`(§2.12) · `adverse_*`(§2.4/2.5) · `repurchase` · `satisfaction` · `MemoryFactCandidate` 매핑 · `evidence/confidence` hook — 전부 부재.
- 얕은 상호작용(impression/click/add_to_cart)의 **저장 소유 = V3-03 RecommendationEvent 단일**(사전 §1.3 R-K7) — cev-1.0의 `recommendation_view/click`·`foundation_trace_id` 링크 설계는 V3-03 소유권과 **정렬 필요**.
- 비충돌 확인: Option B 정합 OK(identity 절 = 서버 derive·anonymous_id — 호환) · raw_text 금지/PII 값-스캔 방향 OK(V3 §8과 동방향) · cross-schema 참조 없음 · 기존 enum 파괴 없음(추가 뷰 방식).

**필요 patch:** cev-1.0 → **`COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706.md` 정렬 patch** (recommendation_id/attribution_mode/semantic 축 수용 + R-K7 소유권 정리). SPEC이 DRAFT·미승인·구현 0 상태이므로 patch 비용 낮음.
**2-pass 재판정 대상** — V3-03 계약(사전 반영판) 확정 후 정렬 patch 발행·재판정(Fable review §11 허용 경로).

---

## 4. M4 · COSMILE-ANALYTICS-PIPELINE — DONE_WITH_LIMITS (2-pass 재판정 대상)

**Evidence 앵커 (실재 확인):**
- Cosmile repo `app/docs/COSMILE_ANALYTICS_PIPELINE_MVP.md` (정본 문서·"COSMILE-ANALYTICS-PIPELINE MVP" train 명시) · `app/scripts/analytics-report.mjs`.
- Cosmile commits: **`77f0941`** (최초 MVP — `feat(analytics): add Cosmile event report and Slack alert MVP`) · **`567b667`** (정본 문서 최종).
- mirror: foundation-docs `설계문서/cosmile/COSMILE_ANALYTICS_PIPELINE_MVP.md` @`a719c51`.

**판정 근거:**
- 미션 목표(CommerceEvent read-only 집계 리포트/alert) 달성 문서화 존재 — **write/migration 0 · 앱/route/checkout/cart 불변 · secret 하드코딩 0** 명시.
- 단일 신호 승격 금지 축 = **OK(해당 없음)** — memory 승격 로직 자체 부재(집계 리포트만). Foundation을 durable memory DB로 취급하는 경로 = 0.
- safety-first 축 = **LIMIT** — safety/adverse 지표 부재(위반 아님·공백). warning은 전환(funnel)·mock_fallback 중심. revenue가 safety를 강등하는 경로 = 0 (fact/promotion 자체가 없음).
- postgres 정합 = **LIMIT** — 현행 대상 DB = **dev SQLite**(`DATABASE_URL`). "프로덕션 DB(Postgres) 전환 시" 항목은 backlog로만 존재 → **schema/validate level 표기 규율 상속**, real DB integration complete 아님.
- Option B 정합 = **OK(해당 없음)** — subject_ref/furef 미사용.

**2-pass 재판정 대상 사유 (계약 의존):** V3-09 최소 지표 계약(attribution window **14d/90d**(사전 §4 — V3-09 초안 7d/60d는 superseded) · `margin_band`(§2.14·Option A) · rec_outcome 조인 · R-K7 "V3-09는 읽기만") 확정 후, MVP **확장 필요 범위**를 재판정한다. 확장 설계 소유 = V3-09 구현 train (MVP 산출물 삭제/갈아엎기 금지 — 존중·확장).

---

## 5. M5 · COSMILE AI Commerce Decision Loop v0.1 — DONE_WITH_LIMITS

> **실명 정정:** V3-01 계획서의 `COSMILE-FOUNDATION-COMMERCE-LOOP`는 실존하지 않는 코드명(superseded). 실제 미션 = **COSMILE AI Commerce Decision Loop v0.1** (CLAUDE.md §5·baseline §3 "Cosmile AI Commerce Decision Loop v0.1 PASS (112/112)").

**Evidence 앵커 (실재 확인):**
- foundation-control `docs/COSMILE_AI_COMMERCE_DECISION_LOOP_V0_1_DESIGN_20260629.md` · `..._TEST_PLAN_20260629.md` · `..._RISK_REGISTER_20260629.md` · `..._ROLLBACK_PLAN_20260629.md` — 전부 commit **`01fa896`** (2026-06-29).
- 구현체: foundation-control `cosmile_loop/`(11모듈·non-shadowing) · `scripts/cosmile_ai_commerce_loop_eval.py` — commit **`01fa896`**.
- mirror: foundation-docs `설계문서/cosmile/COSMILE_AI_COMMERCE_DECISION_LOOP_V0_1_DESIGN_20260629.md` @`3c9dee2`.

**판정 근거 (오늘 재실행 evidence — 자체 주장 아님):**
- 2026-07-06 `python3 scripts/cosmile_ai_commerce_loop_eval.py` 실행(read-only eval·write 0): **total 112 / pass 112 / fail 0 · all_pass=true** · decision_type 6종 전부 커버.
- 안전 불변식 전부 **0**: unsupported_or_unsafe_recommendation 0 · high_risk_false_allow 0 · preference_overrides_safety 0 · internal_disclosure 0 · memory_leak_or_misclass 0 · fallback_broken 0 · **no_live_write_violations 0** · **trace_raw_pii_leaks 0**(trace_clean=true) · fallback_works=true.
- Foundation validate/gate-only 정합 = **OK** — readiness adapter(`1ce099e`·164/164) read-only 재사용·decision output 필수 필드(decision_type/evidence_mode/safety_gate_result/memory_reuse_decision/reason_codes/trace_id/applied_to_real_user=false/write_performed=false) 계약 유지·보수적 safety 결합(block>caution>pass) 코드 불변식.
- Option B 정합 = **OK(해당 없음)** — `cosmile_loop/*.py`에서 subject_ref/`subj_v1_`/`subj_v2_`/Option A secret 참조 grep = **0**.
- safety-first 정합 = **OK** — safety가 preference/memory/구매압박에 override되는 케이스 0(전용 카테고리 24건 포함 PASS).

**상속해야 할 한계:**
1. **mock/read-only/shadow 전용** — flag 기본 OFF·applied_to_real_user=false·write_performed=false. production live·real traffic = 별도 승인 train(원 설계 §1.2 그대로).
2. Memory V1(Option B)·V3 계약 **이전**(2026-06-29) 산물 — minimized `memory_context`(V3-02 19필드) 계약 개념 부재. memory reuse는 read-only 가부 판정만. V3 구현 시 V3-02 계약을 명시 상속해야 함(충돌 아님·전제 미문서화).
3. V3 루프의 **outcome/feedback 구간**(order→revenue→satisfaction/adverse/repurchase→candidate 승격) 미담당 — v0.1 범위 밖(V3-03/04/06 신규 구간).

---

## 6. 결과 표 (V3-01 §7 skeleton 채움 — 정본)

| # | 미션 | 상태 | Option B | postgres(schema/validate) | subject_ref/furef service-local | Foundation validate/gate-only | safety-first | 근거 요지 | 후속 설계서 |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|---|---|
| M1 | COSMILE-CONNECT-UI-SWITCH | DONE_WITH_LIMITS | OK | N/A | OK(미사용·grep 0) | OK | OK | §1 (Cosmile `35febe2`·CONTROL_PASS 기록·WIP 한계) | 불요 |
| M2 | COSMILE-EVENT-TRACKING-AUDIT | DONE_WITH_LIMITS | OK | LIMIT | OK | LIMIT(FRC 이벤트화 공백) | LIMIT(값-스캔 gap) | §2 (AUDIT_READY_FOR_SCHEMA·P0=0) | 불요(gap=V3-03 입력) |
| M3 | COSMILE-EVENT-TRACKING-SPEC | **NEEDS_V3_PATCH** | OK | N/A | OK | LIMIT | OK | §3 (V3 루프 필드 grep 0·R-K7 소유권) | **V3-03 정렬 patch(2-pass)** |
| M4 | COSMILE-ANALYTICS-PIPELINE | DONE_WITH_LIMITS(2-pass) | N/A | LIMIT(dev SQLite) | N/A | OK | LIMIT(지표 공백) | §4 (Cosmile `77f0941`/`567b667`·read-only 집계) | V3-09 train에서 확장 재판정 |
| M5 | COSMILE AI Commerce Decision Loop v0.1 | DONE_WITH_LIMITS | OK(미사용·grep 0) | N/A | N/A | OK | OK | §5 (`01fa896`·112/112 재실행 all_pass·불변식 0) | 불요(V3-02 계약 상속 명시) |

범례 = V3-01 §7 (`OK`/`LIMIT`/`PATCH`/`N/A`).

---

## 7. 정직 델타 / 비고

- M5 112/112는 baseline(2026-06-29) 대비 **변동 없음**(오늘 재실행으로 재확인 — 증가/감소 0).
- M1/M2/M3 원본 문서는 foundation-control git에서 **untracked** 상태(파일 실재·mirror는 foundation-docs에 commit됨) — 앵커의 commit hash는 mirror/제품 repo 기준으로 병기했다.
- OBSOLETE 판정 0 — 삭제·"갈아엎기" 대상 없음. M3도 산출물 삭제가 아니라 **정렬 patch**다(V3-01 §6.2 삭제 금지 규율 준수).

## 무결성

- **read-only reconciliation** — Foundation/SIASIU/Cosmile 제품 repo 코드 수정 **0** · foundation-control harness 코드 수정 **0** · 조사 = 파일 read/grep + 문서화된 eval 1회 재실행(read-only·mock/shadow·write 0)뿐.
- **Hard Stop 무접촉** — prod DB access 0 · real secret/Vault 0 · main merge 0 · live activation 0 · external release 0 · prod DB migration 0. write/live/promotion = **0**.
- evidence 표기 = boolean/count/status/파일경로/commit hash만 — raw secret·PII·customer/order id·trace_id 원값·env dump = **0**.
- 판정 기준 = V3-01 §3(4-상태)·어휘 = 사전 정본. 계약 의존 판정(M3·M4)은 **2-pass 재판정 대상**으로 명시.
