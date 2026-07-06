# COSMILE MEMORY V3 — Fable Delta Review Package (P1~P12 델타 재검수 요청)

> 작성: foundation-control(Control) · 2026-07-06 · **전체 재리뷰가 아니라 P1~P12 델타만.**
> 원 판정: `docs/reports/fable5/COSMILE_MEMORY_V3_FABLE_DESIGN_REVIEW_20260706.md`(`bd01ba1`·DESIGN_NEEDS_PATCH).
> ★**검수 독립성**: P1~P12 패치는 원 리뷰를 작성한 세션이 Control 역할로 수행했음 — 자기검수 방지를 위해 **별도 독립 채널**(다른 Fable 세션/ChatGPT/Codex)로 이 델타 검수를 실행할 것을 권고.

---

## 검수 대상 (전부 foundation-docs·로컬 절대경로 기준)

| 구분 | 파일 |
|---|---|
| **신규 정본** | `docs/reports/control/COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` (유일 어휘 정본) |
| 패치된 11문서 | `COSMILE_MEMORY_V3_00_INDEX…` · `00_PROBLEM…` · `01_RECONCILIATION_PLAN` · `02_LEARNING_CONTRACT` · `03_RECOMMENDATION_EVENT` · `04_ORDER_REVENUE_FEEDBACK` · `05_PRODUCT_INGREDIENT` · `06_PROMOTION_RULES` · `07_SAFETY_GUARDRAIL` · `08_DB_INVARIANT` · `09_ANALYTICS` · `10_PRE_IMPL_REVIEW` (전부 `_20260706.md`) |
| P11 정본 계약 | `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md` · `설계문서/foundation/FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_20260704.md` (+foundation-control 원본 `docs/FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_20260704.md` 동기화) · `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_TO_V3_ENTRY_PACKAGE_20260706.md`(정정) |
| 신규 결과 | `docs/reports/control/COSMILE_MEMORY_V3_EXISTING_5_MISSION_RECONCILIATION_RESULT_20260706.md` |
| 완료 보고 | `docs/reports/control/COSMILE_MEMORY_V3_DESIGN_PATCH_P1_P12_20260706.md` (P1~P12 표·해소 근거·잔여 제한) |

## 델타 검수 질문 (13)

1. **P1** — safety-fact demotion conflict가 해소됐는가? (V3-08 INV-DB-2 예외 + 필수 문구 + V3-06 SO-5 정합·자동 강등 경로 0)
2. **P2** — AdverseSignalActionMatrix(V3-07 §4.5 정본)가 V3-04/V3-06과 일관되는가? (severity×certainty·low 무시 금지·target 축 한정·fail-closed)
3. **P3** — V1 fact discipline이 상속됐는가? (SAFETY∩SINGLE active≤1·must_not_reappear·tombstone·promotion 조회 선행·우회 불가)
4. **P4** — join key contract가 end-to-end로 연결되는가? (rec_v3_+ULID26 단일·NULLABLE+attribution_mode·anonymous_ref downstream·R-K4/5/6 시나리오)
5. **P5** — canonical data dictionary가 enum drift를 없앴는가? (11문서 직접 선언 제거·M2 reused/V3 ext 구분·superseded 매핑)
6. **P6** — cross-reference drift가 해소됐는가? (죽은 참조 0·메타 블록·memory_context 계약 소유=V3-02)
7. **P7** — COSMILE-4가 실제로 추적 가능한 gate가 됐는가? (V3-08 복원 계획+원 3종·V3-10 gate 3행 L1/L2/COSMILE-4)
8. **P8** — margin/cost 정책이 모순 없는가? (Option A margin_band·세 문서 일치·금액 margin superseded)
9. **P9** — semantic extraction owner가 명확한가? (V3-04 저장/추출·V3-07 safety gate·AI 제안/deterministic 결정)
10. **P10** — consent/erasure/guest merge lifecycle이 일관되는가? (withdrawn=보존+reuse_blocked·erasure=tombstone·un-learning·merge 재평가)
11. **P11** — Option A source contract contamination이 제거됐는가? (정본 2건 pointer 실재·원문 보존·ENTRY_PACKAGE 정정·V3 provenance)
12. **P12** — implementation order contradiction이 해소됐는가? (V3-10=단계 gate·V3-11/V3-12 분리·옛 번호 0)
13. **V3-11 implementation batch로 넘어가도 되는가?**

## 기대 판정
DESIGN_APPROVED · DESIGN_APPROVED_WITH_LIMITS · DESIGN_NEEDS_PATCH · HOLD · BLOCKER

## Control 자체 검증 결과 (참고 — 검수자는 재현할 것)
- 완료 기준 13종 자동 grep: **13/13 PASS**(1건 오탐 — reconciliation 결과 문서의 "참조 grep=0" 부정 맥락 문장).
- 잔여 제한: ★Leo 파라미터(사전 §3/§4·M6-G 정의·stitching UX 등)·pre-prod gate 이월(COSMILE-4 실 복원·line cost·rotation)·RESERVED 필드 봉인 — `…DESIGN_PATCH_P1_P12…` §14.

## 무결성
design-only · Hard Stop 무접촉 · V3-11 구현 미착수 · 이 package는 델타 검수 요청이며 구현/live 승인 아님.
