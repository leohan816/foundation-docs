# INTERACTION_KNOWLEDGE_SPEC.md — 조합(상호작용) 지식 설계 (Claude Code 규율)

> **버전 v0.1 · 2026-06-24** (Leo + GPT 정명 + Opus)
> **목적:** 조성 *휴리스틱*을 진짜 *interaction knowledge edge*로 *선별 승격*하는 규율. 거대 그래프를 한 번에 만들지 않는다.
> **정명(正名):** 지금 judge의 "버퍼 몇 개/향료 있음"은 **조성 휴리스틱**(결정론·얕음)이지 *조합 생화학 지식이 아니다.*

---

## 0. 절대 원칙 (어기면 가짜 과학)
1. **근거 없는 수치화 절대 금지.** "레티놀+나이아신아마이드 → 자극 −30%" 같은 *숫자*는 *근거 없으면 절대 안 쓴다.* 대신 *정성 표현*("자극 가능성을 낮추도록 설계된 조성으로 볼 수 있으나 개인차 있음").
2. **발명 ❌ → 추출.** edge는 *지어내지 않고*, 성분 `병용주의`(이미 근거 있는 문서화 상호작용·62/197)에서 *추출.*
3. **조건부.** 무조건 A+B가 아니라 — *persona + exposure + product context*가 같이 들어가야 edge.
4. **근거 수준 필수.** 모든 edge에 `confidence` + `evidence_level`(literature/regulatory/consensus/heuristic).
5. **얕은 건 얕다고.** 승격 못 하는 건 *composition heuristic*으로 남긴다(거짓 승격 ❌).

---

## 1. 지식 4층 + 현재 코드의 3종 분리
| 층 | 이름 | 의미 | 현재 위치 | 상태 |
|---|---|---|---|---|
| 1 | **Atom 지식** | 개별 성분 정체성·계열·alias·provenance·임신 | `load_registry()` | ✅ |
| 2 | **Product-context** | 제품 내 위치·노출·향료·버퍼 *조성 맥락* | `exposure_strength()`·buffer count·irritant flag | ✅ (★휴리스틱) |
| 3 | **Persona-fit** | 사람 조건에 따라 판단 갈림 | `judge_product()` persona 분기 | ✅ |
| 4 | **Interaction edge** | A+B의 *근거 기반* 자극/효능/안정성 관계 | **없음 — `병용주의` 데이터는 *미사용*** | ⬜ 얇음 |

**★현재 코드 3종 분리 (Claude Code 분석 결과):**
- **atom knowledge** = `load_registry`(chemical_family·pregnancy·by_conc). *깨끗.*
- **composition heuristic** = buffer count(`skin_role`)·irritant 감지·`exposure_strength`. *결정론·정직하나 얕음 — edge 아님.*
- **interaction edge** = **judge가 소비하는 진짜 edge = 0.** `병용주의`(62성분) 데이터는 *존재하나 judge가 안 읽음.* ← 승격 대상.

---

## 2. Interaction Edge 구조 (성분-성분만으론 부족)
```yaml
edge_id: retinoid_x_exfoliating_acid_caution
source: { type: ingredient_group, value: retinoid }       # 개별 atom 또는 group
target: { type: ingredient_group, value: exfoliating_acid }  # aha/bha
condition:                                                 # ★무조건 아님
  persona: [sensitive_skin, barrier_damaged, beginner]
  exposure: { retinoid: medium_or_high }
  product_context: same_product_or_same_routine
effect: { type: irritation_amplifier, judgment_delta: more_cautious }
confidence: moderate
evidence_level: consensus_or_regulatory                    # literature|regulatory|consensus|heuristic
source_ref: "성분 병용주의(레티놀·HPR·트레티노인) — 장벽 손상·과자극"
provenance_origin: human_curated                           # 병용주의=Paula's/연구 출처
output_rule:
  ko: "레티노이드와 산성 각질제거 성분이 함께 있어, 민감성 피부는 자극 가능성을 더 보수적으로 봅니다."
```
**금지:** `effect: { value: "-30%" }` 같은 *근거 없는 수치.*

## 3. Edge 타입 (5종 — 보수적 시작)
| 타입 | 의미 | 예 |
|---|---|---|
| `irritation_amplifier` | 자극 가능성 증가 | retinoid + AHA/BHA |
| `irritation_buffer` | 자극 완충 *가능성*(정량 ❌·confidence 낮음) | retinoid + barrier-support |
| `redundancy` | 기능 중복 | 여러 레티노이드 총노출↑ |
| `compatibility_caution` | 병용 주의 | retinoid + BPO(산화분해)·vitC(pH) |
| `claim_support` | 마케팅 claim 부분 지지 | brightening + niacinamide 상위권 |

## 4. 승격 기준 (composition heuristic → interaction edge)
"버퍼 몇 개"를 진짜 edge로 *승격*하려면 **4개 다** 충족:
1. **근거 존재** — 특정 A+B의 문헌/규정/전문가 합의(병용주의에 있나?).
2. **조건 범위** — persona + exposure로 *언제* 적용되는지 명시.
3. **근거 수준** — confidence + evidence_level.
4. **정성 출력** — 수치 ❌, output_rule 문장.
→ 4개 못 채우면 *composition heuristic으로 남긴다*(거짓 승격 ❌).
→ 일반 "buffer count"는 *대부분 heuristic으로 유지* — 특정 근거 있는 쌍만 `irritation_buffer` edge로.

## 5. 첫 retinoid edge (병용주의에서 *추출* — 발명 ❌)
| edge | 타입 | evidence | confidence |
|---|---|---|---|
| retinoid × AHA/BHA | irritation_amplifier | 병용주의·장벽손상 | moderate |
| retinoid × BPO | compatibility_caution | 병용주의·산화분해 | high(문서화) |
| retinoid × vitamin C | compatibility_caution | 병용주의·pH 차이 | moderate |
| retinoid × 다른 레티노이드/처방 | redundancy | 병용주의·총노출·EU RE 합산 | high |
| retinoid × barrier-support(진정) | irritation_buffer | *제한적* | **low**(정량 ❌) |
→ 앞 4개 = 문서화 탄탄. 마지막(buffer) = *근거 얇음 → 낮은 confidence·정성 표현만.*

## 6. 규율 (Claude Code)
- **바로 거대 그래프 ❌.** 위 5 edge부터·*추출*로.
- **먼저 설계 표 → Leo 승인 → 구현**(병용주의 → edge 추출도 *표로 먼저*).
- **근거 없는 edge·수치 만들지 마.** 승격 못 하면 heuristic으로.
- edge는 *atom과 분리*(§1.5.2 group과 같은 결: 관계는 관계, 정체성은 정체성).

## 7. ★★ 조합 지식의 획득 = 검색 루프 (Leo 2026-06-24 — 약점이 아니라 성장 엔진)
조합 edge는 *처음부터 다 외우는 게 아니라* — 필요할 때 **검색 → 분석 → 판단 → 기억화 → 재사용**으로 *동적 획득.*
(인간 전문가도 모든 조합·개인차를 외우지 않는다 — 큰 원칙 + 위험 조합 기억 + 모르면 찾고 + 제품·사람 맥락으로 판단.)
→ **Foundation = 전문가가 머릿속으로 하던 *검색·판단·경험 축적*을 시스템화.** = `[[자가성장지식설계서]]`의 루프를 *interaction-edge에 적용.*

**★edge도 자가성장 staging 통과 (claim-source-agnostic — 바로 기억 ❌):**
`memory_status`: `raw_search → candidate_edge → reviewed_edge → stable_edge` (+ `rejected_edge`).
| 상태 | 의미 | 사용 |
|---|---|---|
| raw_search | 검색 원문 | 직접 근거로 쓰되 *기억 아님* |
| candidate_edge | 후보 | 낮은 신뢰·참고만 |
| reviewed_edge | Opus 검수 통과 | 판단 사용 가능 |
| stable_edge | 반복 검증 | 기본 judge 반영 |
| rejected_edge | 환각/근거부족 | 다시 나오면 경고 |
★자가성장 *구조적 격리*(staged는 judge가 물리적으로 못 봄)·*Opus 검증* 그대로 적용.

**Search Trigger (언제 edge를 검색하나):** 조합 edge 없음 · 미매핑 상위권 · claim↔성분 충돌 · 임신/수유/민감 안전조건 · 강한 효능 claim · 기존 기억 confidence 낮음. *안 함:* stable_edge 있음 · 단순 스펙 질문 · 검수된 locale로 충분.

**Evidence Ranking (자가성장 화이트리스트와 동일):** 규제/안전성(L1) > systematic review(L2) > 임상(L3) > in vitro(L4) > 원료사(L5) > **브랜드 상세페이지(L6·claim 검증대상)** > 블로그(L7). *브랜드 상세페이지는 근거 최상위가 되면 안 됨.*

**8 불변식 (GPT — 우리 자가성장과 정합):** ①검색 결과 바로 사실 확정 ❌ ②브랜드 claim=검증 대상 ③근거 없으면 수치화 ❌ ④사람 조건 있으면 안전 우선 ⑤모르면 모른다 ⑥자동 stable 승격 ❌ ⑦raw/candidate/reviewed/stable 단계화 ⑧기존 stable과 충돌 시 새 자료로 바로 덮지 않음.

→ **결론: 조합 지식이 얇은 것 = 약점이 아니라 *검색 루프가 채울 성장 포인트.*** (단 §0 원칙·격리·Opus 검증 다 적용.)

## 변경이력
- v0.2 (2026-06-24) — §7 조합 지식 획득=검색 루프(자가성장 적용·memory_status staging·search trigger·evidence ranking·8 불변식). "얇음=약점 아니라 성장 엔진"(Leo).
- v0.1 (2026-06-24) — 최초. 4층·3종 분리·edge 구조(조건+근거수준+정성출력)·5 타입·승격 4기준·첫 retinoid edge(병용주의 추출)·수치 금지. Leo+GPT 정명 종합.
