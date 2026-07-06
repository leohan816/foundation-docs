# COSMILE MEMORY V3 — 09 Analytics Report Minimum (설계서)

> 작성: foundation-control · 2026-07-06 · design-only · no code · Hard Stop 무접촉

이 문서는 COSMILE MEMORY V3 "Learning Commerce Memory Loop"의 **최소 분석 리포트(Analytics Report Minimum)** 설계다.
목적은 V3 target loop —
`상담 결과 → 추천 이유 → 추천 상품 → 상품/SKU/성분 → product_view/add_to_cart/checkout/order → 매출/마진 → 만족/이상반응/재구매 → MemoryFactCandidate → evidence/confidence 장기기억 승격 → 다음 추천 개선` —
이 **실제로 학습 가능한 구조로 관측되는지**를, 프로덕션이 아닌 **schema/validate 수준**에서 재현 가능한 리포트로 뽑아내는 것이다.

핵심 선언 3줄:

1. **첫 산출물은 대시보드가 아니라 CLI/Markdown 리포트다.** Slack / 대시보드 / AI-Analyst는 **나중 · 별도 release train**. 대시보드로 시작하지 않는다.
2. **읽기 전용 · service-local.** 이 리포트는 Cosmile service-local(postgres schema `cosmile`) 이벤트/커머스 테이블만 집계한다. Foundation을 durable memory DB로 읽지 않는다.
3. **안전 우선.** adverse_reaction(이상반응) 지표는 매출·마진·CTR과 **동렬 KPI가 아니라 상위 게이트 지표**로 다룬다. "이상반응이 적어 보이게" 최적화하지 않는다.

형제 문서 상호참조 (V3 시리즈 인덱스 기준; 번호 확정은 시리즈 인덱스 문서 소유):

- `COSMILE_MEMORY_V3_01_OVERVIEW_...` — V3 target loop 전체 그림·범위
- `COSMILE_MEMORY_V3_03_EVENT_TELEMETRY_CONTRACT_...` — 이벤트/telemetry 스키마 계약 (본 리포트의 **입력 소스**)
- `COSMILE_MEMORY_V3_05_MEMORY_FACT_CANDIDATE_PROMOTION_...` — Candidate → LongTermMemoryFact 승격 기준
- `COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_PRIORITY_...` — 안전/이상반응 우선순위 규칙
- `COSMILE_MEMORY_V3_08_SUBJECT_REF_IDENTITY_...` — subject_ref / furef 식별자 규칙 (집계 grain)

> 형제 파일명의 정확한 접미사·번호가 시리즈 인덱스와 어긋나면 인덱스를 정본으로 본다. ★Leo 결정 필요: V3 시리즈 파일명 번호 고정.

---

## 1. 범위 / 비범위

### 1.1 In-scope (이 설계서가 정의)

- V3 loop 관측을 위한 **최소 지표 집합(Metric Registry)** 정의.
- 각 지표별 **최소 쿼리 입력**(어떤 이벤트/테이블을, 어떤 grain·window·filter로).
- **CLI/Markdown 리포트** 산출 형식(레이아웃, 섹션 순서, 안전 지표 배치).
- 귀속(attribution) 모델·window의 후보와 결정 필요 지점.
- 프라이버시/데이터 최소화(집계 전용, PII 무접촉, small-cell 억제).

### 1.2 Out-of-scope (이 설계서가 하지 않음 · Hard Stop)

- 프로덕션 DB 접근 · real secret/Vault · main merge · live 활성화 · external release · prod DB migration.
- 실시간 스트리밍 파이프라인, 대시보드 서버, Slack 봇, AI-Analyst 자동 코멘트 — **모두 later/separate**.
- Foundation의 durable customer memory DB화 · Foundation의 서비스 DB 직접 read.
- 실제 매출/마진 확정 회계 처리(정산·환불·세금 반영). 본 리포트의 revenue/margin은 **관측용 근사치**이며 회계 정본이 아니다.
- 코드/구현. 본 문서는 **design + contract + reviewable plan**만 제공한다.

> 현재 상태: Cosmile postgres는 **schema/validate 수준**이다. "real DB integration complete" 아님. 본 리포트의 쿼리는 schema/validate 수준 테이블 및 synthetic/readiness fixture에 대해 정의된다.

---

## 2. 데이터 소스 모델 (service-local, schema `cosmile`)

리포트는 아래 이벤트/테이블만 입력으로 삼는다. 모두 **Cosmile 소유**. 교차 스키마 직접 참조(예: `siasiu.*` 직접 join) 금지 — 상담 맥락은 이벤트에 이미 최소화되어 실려 온다고 가정한다(`COSMILE_MEMORY_V3_03_...` 계약).

### 2.1 이벤트/테이블 인벤토리 (논리 스키마 · 예시 컬럼)

| 논리명 | 성격 | 핵심 컬럼(예시) | 비고 |
|---|---|---|---|
| `rec_impression` | 추천 노출 이벤트 | `recommendation_id`, `trace_id`, `subject_ref`, `furef`, `product_id`, `sku`, `reason_codes[]`, `decision_type`, `evidence_mode`, `safety_gate_result`, `shown_at` | recommendation_shown. reason_codes·decision_type은 Foundation decision output 소비 결과 |
| `rec_click` | 추천 클릭 이벤트 | `recommendation_id`, `trace_id`, `clicked_at` | recommendation_clicked |
| `product_view` | 상품 상세 조회 | `session_ref`, `furef`, `product_id`, `sku`, `viewed_at`, `src_recommendation_id?` | 추천 경유 여부 optional |
| `add_to_cart` | 장바구니 담기 | `furef`, `sku`, `qty`, `added_at`, `src_recommendation_id?` | |
| `checkout_started` | 결제 시작 | `checkout_id`, `furef`, `at` | order 미확정 |
| `order` | 주문 헤더 | `order_id`, `furef`, `status`, `paid_at`, `currency` | status ∈ enum(§3.2) |
| `order_line` | 주문 라인 | `order_id`, `sku`, `qty`, `unit_price`, `unit_cost`, `src_recommendation_id?`, `line_revenue`, `line_margin` | margin = revenue − cost(관측 근사) |
| `feedback` | 만족/이상반응 피드백 | `feedback_id`, `furef`, `sku?`, `feedback_type`, `satisfaction_score?`, `adverse_flag`, `adverse_severity?`, `created_at` | feedback_type enum(§3.3) |
| `repurchase_derived` | 재구매 파생 뷰 | `furef`, `sku`, `first_paid_at`, `repurchase_at`, `interval_days` | order에서 파생, 물리 테이블 아닐 수 있음 |

> 위 컬럼은 **설계 예시**다. 실제 컬럼 확정은 `COSMILE_MEMORY_V3_03_...` 이벤트 계약이 정본. 본 문서는 그 계약을 "이렇게 집계 가능해야 한다"는 관점에서 요구할 뿐이다.

### 2.2 조인 키 규칙

- 추천 → 커머스 귀속의 **1차 키는 `src_recommendation_id`**(명시 귀속). 이벤트에 실려 있으면 그것을 신뢰한다.
- `src_recommendation_id`가 없을 때만 **fallback 귀속**: 동일 `furef` + 동일 `sku` + attribution window 내 last-touch. (§4 참조)
- 집계 grain 식별자: `furef`(cross-producer consistent local user), `subject_ref`(subject 단위). 두 식별자 정의는 `COSMILE_MEMORY_V3_08_...` 상속.

---

## 3. 열거형 (Enums)

### 3.1 outcome (추천 결과 단계)

`shown` → `clicked` → `viewed` → `added_to_cart` → `checkout_started` → `order_paid` → (`satisfied` | `adverse` | `repurchased`)

리포트의 top-reason 분해는 이 outcome 축을 기준으로 한다.

### 3.2 order.status

| 값 | 의미 | revenue/margin 집계 포함 |
|---|---|---|
| `created` | 생성됨(미결제) | 제외 |
| `paid` | 결제완료 | **포함** |
| `cancelled` | 취소 | 제외 |
| `refunded` | 환불 | 제외(또는 음수 조정 — ★Leo 결정 필요) |
| `failed` | 실패 | 제외 |

### 3.3 feedback_type

`satisfaction` · `dissatisfaction` · `adverse_reaction` · `neutral` · `unknown`

- `adverse_reaction`은 `adverse_flag=true`를 동반한다.
- `adverse_severity` ∈ `mild` · `moderate` · `severe` · `unknown` (있을 때).

### 3.4 reason_code 집계 카테고리 (예시)

`ingredient_match` · `skin_type_match` · `concern_match` · `avoid_ingredient_respected` · `repurchase_pattern` · `price_fit` · `safety_hold` · `insufficient_evidence` — 실제 코드 집합은 Foundation decision contract 소유. 리포트는 **코드를 해석하지 않고 그대로 group-by**만 한다(휴리스틱 재분류 금지).

---

## 4. 귀속(Attribution) 모델

★Leo 결정 필요 항목이 밀집한 구역이므로 후보를 명시한다.

| 항목 | 후보 | 기본 제안(v1) |
|---|---|---|
| 귀속 방식 | 명시 `src_recommendation_id` 우선 → 없으면 last-touch fallback | **명시 우선 + last-touch fallback** |
| attribution window | 24h / 72h / 7d / 14d | **7d** (★Leo 결정 필요) |
| 재구매 판정 window | 30d / 60d / 90d | **60d** (★Leo 결정 필요) |
| refund 처리 | 제외 vs 음수 조정 | **v1은 제외, 별도 refund 라인 병기** (★Leo 결정 필요) |
| 다중 추천 중복 귀속 | first-touch vs last-touch vs 균등분배 | **last-touch 단일 귀속** |

리포트는 사용한 attribution 설정을 **헤더에 그대로 print**한다(재현성). 설정을 바꾸면 리포트 수치가 바뀐다는 사실을 숨기지 않는다.

---

## 5. Metric Registry (최소 지표)

각 지표: 정의 · 공식 · 최소 쿼리 입력(테이블/이벤트) · grain · window · 안전등급.
안전등급 `S` = 안전 우선 지표(억제·최적화 대상 아님), `C` = 커머스 지표, `L` = 학습 신호 지표.

| # | metric_id | 정의 | 공식 | 최소 쿼리 입력 | grain | 안전등급 |
|---|---|---|---|---|---|---|
| M1 | `recommendation_shown` | 추천 노출 수 | `count(rec_impression)` | `rec_impression` | recommendation | C |
| M2 | `recommendation_clicked` | 추천 클릭 수 | `count(distinct recommendation_id in rec_click)` | `rec_click` | recommendation | C |
| M3 | `recommendation_ctr` | 클릭률 | `M2 / M1` | `rec_impression`, `rec_click` | 전체/세그먼트 | C |
| M4 | `rec_to_add_to_cart` | 추천→장바구니 전환 | `count(attributed add_to_cart) / M1` | `rec_impression`, `add_to_cart`(귀속) | recommendation | C |
| M5 | `rec_to_order_paid` | 추천→결제완료 전환 | `count(attributed order.status=paid) / M1` | `rec_impression`, `order`, `order_line`(귀속) | recommendation | C |
| M6 | `recommendation_revenue` | 추천 귀속 매출 | `sum(order_line.line_revenue where status=paid & attributed)` | `order`, `order_line` | 전체/reason_code | C |
| M7 | `recommendation_gross_margin` | 추천 귀속 총마진 | `sum(order_line.line_margin where status=paid & attributed)` = Σ(revenue−cost) | `order_line` | 전체/reason_code | C |
| M8 | `satisfaction_feedback_count` | 만족 피드백 수 | `count(feedback where feedback_type=satisfaction)` | `feedback` | 전체/sku | L |
| M9 | `adverse_reaction_feedback_count` | **이상반응 피드백 수** | `count(feedback where feedback_type=adverse_reaction)` (+ severity 분해) | `feedback` | 전체/sku/severity | **S** |
| M10 | `repurchase_count` | 재구매 수 | `count(repurchase_derived where interval_days ≤ window)` | `order`→`repurchase_derived` | furef/sku | L |
| M11 | `top_reason_codes_by_outcome` | outcome별 상위 reason_code | `group by reason_code, outcome; count` | `rec_impression.reason_codes[]` × outcome join | reason_code×outcome | L |
| M12 | `ingredient_response_signals` | 성분별 반응 신호 | 성분 축에서 만족/이상반응/재구매 분포 | `rec_impression`(product→ingredient map) × `feedback` × `repurchase_derived` | ingredient | **S/L** |

### 5.1 지표별 최소 쿼리 입력 상세

- **M1 recommendation_shown** — 입력: `rec_impression`. 필터: 리포트 기간 `shown_at ∈ [from,to)`. 중복 노출 정책(동일 rec 재노출 카운트 여부)은 ★Leo 결정 필요(기본: 노출 이벤트 그대로 카운트).
- **M2 recommendation_clicked** — 입력: `rec_click` join `rec_impression`(orphan click 제외). distinct `recommendation_id`.
- **M3 CTR** — M2/M1. 분모 0 방어(표시 `n/a`). 세그먼트: reason_code, decision_type, safety_gate_result별 분해 옵션.
- **M4 rec→add_to_cart** — 입력: `add_to_cart` 중 귀속된 것(§4). 분모 M1. add_to_cart는 노출보다 뒤(added_at ≥ shown_at).
- **M5 rec→order_paid** — 입력: `order`(status=paid) join `order_line`(귀속). 분모 M1. paid_at ≥ shown_at & window 내.
- **M6 revenue** — 입력: `order_line.line_revenue` where status=paid & 귀속 & window. currency 혼합 시 통화별 분리(환산 금지 — ★Leo 결정 필요: 기준통화·환율 소스).
- **M7 gross_margin** — 입력: `order_line.line_margin`. `unit_cost` 없으면 해당 라인은 margin 집계 제외 + `margin_coverage%`(cost 있는 라인 비율) 병기. cost 없는 걸 0으로 넣어 마진을 부풀리지 않는다.
- **M8 satisfaction_count** — 입력: `feedback` type=satisfaction. sku/기간 group.
- **M9 adverse_reaction_count** — 입력: `feedback` type=adverse_reaction. severity 분해 필수. **이 지표는 0이 아니면 리포트 최상단 SAFETY 섹션에 강조**. 낮게 보이게 하는 필터·반올림·집계 은닉 금지.
- **M10 repurchase_count** — 입력: `order`(paid)에서 동일 furef+sku 2회 이상, interval_days ≤ 재구매 window. `repurchase_derived` 파생 규칙 고정 필요.
- **M11 top_reason_codes_by_outcome** — 입력: `rec_impression.reason_codes[]`(배열 unnest) × 각 outcome 도달 집합. outcome축(§3.1)마다 상위 N reason_code. reason_code는 원본 그대로(재분류 금지).
- **M12 ingredient_response_signals** — 입력: product→ingredient 매핑(Cosmile 카탈로그) × feedback(satisfaction/adverse) × repurchase. 성분당 (긍정신호, adverse신호, 재구매) 카운트. **adverse가 붙은 성분은 안전 신호로 우선 표기**, "잘 팔리는 성분"으로만 요약하지 않는다.

> M12는 학습 loop의 핵심 신호(다음 추천 개선의 근거)지만, 성분-이상반응 상관을 **의학적 인과로 단정하지 않는다**. 리포트는 "신호(signal) count"만 제시하고 medical assertion을 만들지 않는다. Candidate→LongTermMemoryFact 승격은 단일 신호로 확정하지 않으며 그 기준은 `COSMILE_MEMORY_V3_05_...` 소유.

---

## 6. 리포트 출력 형식 (CLI / Markdown FIRST)

첫 구현 대상은 **단일 CLI 명령이 Markdown 리포트 1장을 stdout/파일로 출력**하는 형태. 대시보드·Slack·AI-Analyst는 이후 별도 train.

### 6.1 섹션 순서 (안전 우선 레이아웃)

```
# Cosmile Memory V3 — Analytics Report (period: <from>~<to>)
> mode: schema/validate · read-only · attribution=<explicit+last-touch, window=7d> · generated_at=<ts>

## 0. SAFETY FIRST          ← adverse_reaction(M9) · ingredient adverse 신호(M12) 최상단
## 1. Funnel                ← M1 shown → M2 clicked(CTR M3) → M4 cart → M5 order_paid
## 2. Commerce Outcome      ← M6 revenue · M7 gross_margin(+margin_coverage%)
## 3. Learning Signals      ← M8 satisfaction · M10 repurchase · M12 ingredient(비-adverse 부분)
## 4. Reason Code Breakdown ← M11 outcome별 top reason_codes
## 5. Data Coverage / Caveats ← 귀속 커버리지, cost 커버리지, small-cell 억제, null 비율
```

- SAFETY FIRST를 **0번(맨 위)** 에 고정: 이상반응이 매출 지표 아래로 밀려 시야에서 사라지지 않게 한다.
- 5번 Data Coverage에 **정직 델타**를 명시: 귀속 실패 건수, cost 없는 라인 비율, 억제된 small-cell 수, synthetic vs real fixture 여부.

### 6.2 표현 규칙

- 모든 비율은 분자/분모 동반 표기(`CTR 4.2% (84/2000)`). 비율만 단독 표기 금지.
- 데이터 부족 셀은 `n/a` + 사유. 0과 결측을 구분.
- 리포트 헤더에 attribution 설정·기간·mode를 항상 print(재현성).
- 이 리포트가 **학습/관측용이며 회계 정본·의학 판단이 아님**을 푸터에 고정 문구로 명시.

---

## 7. 프라이버시 / 데이터 최소화

- 리포트는 **집계 수치만** 산출한다. raw text · 상담 원문 · PII · 개별 order_id/customer id · raw furef/subject_ref 값을 리포트에 싣지 않는다.
- furef/subject_ref는 **grain(집계 단위)로만** 사용하고 출력하지 않는다.
- **small-cell 억제**: 셀 카운트 < 임계값(기본 `k=5`, ★Leo 결정 필요)이면 `<k`로 마스킹. 특히 이상반응·성분 단위 소집단 재식별 방지.
- Foundation으로 전달되는 것은 request-scoped minimized `memory_context`뿐이며(raw_text_stored=False), **본 리포트는 Foundation을 읽지 않는다**(service-local read only).
- 리포트 산출물 저장 위치·보존기간은 control 산출물 정책을 따른다(prod 저장 금지, secret 금지).

---

## 8. 안전/역할 경계 가드레일

- **Safety > commerce.** M9/M12의 adverse 신호는 CTR·revenue·margin 최적화 대상이 아니다. "이상반응을 줄여 보이게" 하는 어떤 집계 변형도 금지(clean-not-compress 상속).
- adverse_reaction·"계속 써도 돼?" 류 신호는 안전 우선으로 분류되며, 리포트는 이를 **강조**한다(숨김/평탄화 금지).
- Foundation = validate/gate/reasoning **only**. 리포트 생성은 service-local 분석이며 Foundation을 durable memory DB로 만들지 않는다.
- 휴리스틱 금지: reason_code·outcome 재분류를 키워드/정규식 추측으로 하지 않는다. 이벤트에 실린 구조화된 값만 group-by.
- 중단 조건(하나라도 발생 시 STOP): 리포트가 raw PII/customer id/원문을 노출 · prod DB 접근 시도 · adverse 지표 은닉 · small-cell 억제 우회 · Foundation 서비스 DB 직접 read.

---

## 9. 산출 단계(Reviewable Plan, 구현 아님)

설계 순서만 명시(코드 없음): **설계(본 문서) → 승인 → 이벤트 계약 확정(`V3_03`) → synthetic/readiness fixture로 CLI 리포트 초안 → control regression(수치 재현·안전 지표 배치 검증) → report**. 이후 별도 train에서만 Slack/대시보드/AI-Analyst 검토.

검증 목표(예시, 구현 시 채움):
- 동일 fixture·동일 attribution 설정에서 리포트 수치 **결정적 재현**.
- adverse 지표가 항상 §6.1 SAFETY FIRST(0번)에 위치.
- margin_coverage < 100%일 때 cost 결측을 0으로 채우지 않음(마진 부풀림 0).
- small-cell 억제가 이상반응/성분 셀에 적용됨.

---

## 10. Open Questions / ★Leo 결정 필요 (요약)

- attribution window(제안 7d) · 재구매 window(제안 60d) · refund 처리(제외 vs 음수) · 다중추천 귀속(제안 last-touch).
- currency 혼합 시 기준통화/환율 소스(또는 통화별 분리 유지).
- 중복 노출 카운트 정책(동일 rec 재노출).
- small-cell 임계값 `k`(제안 5).
- V3 시리즈 형제 문서 파일명 번호 고정.
- 리포트 산출물 저장/보존 정책(control 산출물 위치·기간).

---

## 무결성

- 본 문서는 **design-only**다. 코드·구현·테스트를 포함하지 않으며, 무엇도 구현/통과되었다고 주장하지 않는다.
- Memory V1 **Option B**를 canonical로 상속한다. **Option A / FOUNDATION_SUBJECT_REF_SECRET mint는 상속하지 않는다(superseded).** subject_ref/furef mint는 service-local.
- **Foundation = validate/gate/reasoning only.** Foundation은 durable customer memory DB가 아니며 SIASIU/Cosmile 서비스 DB를 직접 읽지 않는다. 본 리포트는 service-local(schema `cosmile`) read-only 집계다.
- **Service-local ownership.** SIASIU와 Cosmile은 각자의 customer memory·commerce 데이터를 소유하며 교차 스키마 직접 참조를 하지 않는다.
- Cosmile postgres는 **schema/validate 수준**이다. "real DB integration complete" 아님.
- **Safety-first.** adverse_reaction·성분 안전 신호는 매출/마진/CTR 위에 있으며 억제·최적화 대상이 아니다. medical assertion 없음.
- **no prod / no live / no main merge / no real secret·Vault / no prod DB migration.** Hard Stop 무접촉. write/live/promotion = 0, real user exposure = 0. 별도 release train 필요.
