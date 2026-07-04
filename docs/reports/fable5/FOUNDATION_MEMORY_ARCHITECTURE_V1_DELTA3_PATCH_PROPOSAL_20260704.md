# Memory Architecture V1 — Fable5 delta-3 수정 제안서 (PATCH PROPOSAL)

> 작성: **Fable5** · 2026-07-04 · 상태: **PROPOSAL** (Control이 그대로 문서 반영 가능한 수정 제안 — 재리뷰 아님)
> 기준: delta-2 재검증(`FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_DELTA2_REVIEW_20260704.md`, commit `2b774a3`)의 PARTIAL 5·NOT_CLOSED 1·신규 2
> 근거 코드(read-only): `foundation_http_service/core.py` — `_CONDITION_KW`(:167-176) · `_refine_intent` 실산출 11값(:597-631) · `_RISK_ORDER`(:56) · `_enrich_products` catalog 소비(:294-317) · session_out 기록(:1224-1246)
> ★본 제안서는 발행 전 독립 검수(1 DEFECT·1 WARN 적발 — intent enum 정정·동반 자구 3건 보강)를 거친 수정본이다.

## A. 목적

delta-2 잔여 8건에 대한 **자구-수준 수정 제안**. 각 항목에 수정 대상 문서/섹션·삭제할 문장·추가할 문장/표를 그대로 반영 가능한 형태로 제시한다.
**구조 변경 0 · code change 0 · migration 0 · source repo push 0 · raw 고객 데이터 열람 0 · secret/PII 출력 0.**

## B. delta-3 수정 제안 요약표

| issue_id | severity | 대상 문서 | 대상 섹션 | 현재 문제 | 제안 방향 | 난이도 | APPROVED 영향 |
|---|---|---|---|---|---|---|---|
| D3-01 | HIGH | M3 | §4 stated_concerns 행 + enum 정본 | enum 출처가 FactTypeRegistry(fact *type* 목록)로 오지정 → 자기 echo 값(`dryness`) reject | **ConditionCategory vocabulary(8키) 신설·출처를 `_CONDITION_KW`로 고정** | 하 | **필수** |
| D3-02 | MED | M3(+M2 §3.7 note) | §4 catalog_candidates 행 | "refs만" vs 실코드 소비 형상(grounding·match_reason·name/brand) 불일치 | **선택지 B 채택**: item 필드 표 명시·match_reason(자유문장) 금지→reason_code/grounding enum | 하 | **필수** |
| D3-03 | MED | M3 | §5.1·§7 version gate·§10 예시·§3 | 예시가 자기 형식 위반·bare UUID 판별 불가·호환 모드 1줄·version 착지 미규정 | 형식을 prefix/HMAC로 좁힘·예시 수정·호환 모드 3원칙 문장·착지 명시 | 하 | **필수** |
| D3-04 | LOW | 앵커 | §J-1 fact_state 행 | candidate fact_state M2=2값 vs 앵커=3값 | **candidate=2값이 옳음** — 앵커를 (hypothesis\|active)로 정정·superseded=LTM 전용 명시 | 하 | 필요 |
| D3-05 | MED | M3 | §4 enum 정본 표·전역 상한·§3 | enum 4종 값 출처 미고정·per-field 합계>전역 512 | **enum 값 정본 표 신설**(코드 출처 명기)·전역 count 512→2,048 | 하 | **필수** |
| D3-06 | MED | 앵커·M2 | 앵커 §J-2 표/키규칙 · M2 §5 | 앵커 subject_ref nullable=N 잔존·guest_ref 부재·subject_key 미반영 | 앵커 3곳+M2 §5 1곳 자구 수정 | 하 | **필수** |
| D3-07 | LOW | M2·M3·checklist | 헤더·verdict | 헤더 v1.1 vs "v1.2" 인용 drift | **v1.2 승격**(헤더+changelog)·checklist 표기 일치 | 하 | 필요 |
| D3-08 | LOW | 앵커 | §R supersede 선언 | 위치 열거 부정확(§S 허위·§D/§Q 미열거) | 열거를 (§D·§Q·§R·§U-M5·§V·W26)로 정정 | 하 | 필요 |

## C. 항목별 상세 수정안

### D3-01: stated_concerns enum source
- **수정 대상:** M3 §4 `stated_concerns` 행 + §4 하단 "enum 정본" 불릿.
- **기존 문제:** enum 출처 = FactTypeRegistry — 그러나 registry는 fact *type*(preference/concern/…) 목록. 실제 echo 값 = `core.py:167-176 _CONDITION_KW` 키 8종. 문면 구현 시 `'dryness' ∉ FactTypeRegistry` → rule 2에서 자기 echo reject.
- **원칙:** 정상 echo pass·enum은 코드 산출 집합과 1:1·drift 방지 위해 코드 출처 명기.
- **삭제할 문구:** stated_concerns 행의 `concern/condition 카테고리 enum(FactTypeRegistry·원문❌)`.
- **추가할 문구(행 교체):**
  `| stated_concerns | []string | ★ConditionCategory vocabulary(하단 enum 정본·원문❌) | ≤64 | ★append-only → cap 64·oldest-drop(FIFO) |`
- **enum 정본 불릿에 추가:**
  `· ConditionCategory = dryness | barrier | sensitivity | wrinkle | pigmentation | pore | acne | oiliness (정본 출처 = core.py _CONDITION_KW 키 — FactTypeRegistry 아님·registry는 fact type 목록. vocabulary 확장 시 _CONDITION_KW와 동기 갱신)`
- **정합성 체크:** 앵커 §P:555 "detected_conditions 누적"과 일치 ✓ · core.py:1226-1229 echo 값 전부 멤버 ✓ · FactTypeRegistry는 `type` 필드(ltm_fact_refs.type) 검증에만 사용.
- **Fable5 판단:** 이 1행 교체로 REG-1 value-축 잔재 해소.

### D3-02: catalog_candidates item 형상
- **수정 대상:** M3 §4 `product_context.catalog_candidates` 행(+직하 item 표 신설) · M2 §3.7 note 1줄.
- **기존 문제:** "refs만·원문❌" vs 실코드(`core.py:294-317`)가 item의 `product_id/slug/name/brand/category/concerns/grounding{category,concerns,match_level}/match_reason`을 소비 — 엄격 집행=catalog 재사망·완화=자유문장(match_reason) ingress.
- **Fable5 판단(선택지): B 채택 — match_reason(자유문장) 금지.** 근거: ① V1 gate 원칙(free-text ingress 거부·rule 5)과 정합·결정론 reject ② 현행 계약 경로(dual-adapter slice)는 `{product_id}` refs만 전송 — B는 정상 트래픽 무파괴 ③ 코드의 match_reason 소비는 `.get()` optional — 부재 시 무해(코드 수정 불요). A(허용+sanitize)는 자유문장 판별을 휴리스틱에 되돌려 D-1 원칙 후퇴.
- **행 교체:**
  `| product_context.catalog_candidates | []object | ★하단 item 표(자유문장 금지) | ≤128 | ★catalog 경로 유지(REG-1) |`
- **직하 item 표 신설:**
  ```
  catalog_candidates item 허용 필드 (이외 key = reject):
  | item 필드 | type | 제약 |
  |---|---|---|
  | product_id | string | 필수·canonical ref |
  | slug | string | opt·opaque ref |
  | name / brand / category | string | opt·카탈로그 공개 표시 데이터(고객 데이터 아님)·각 ≤128자·PII 정규식 스캔 통과 필수 |
  | concerns | []string | opt·ConditionCategory enum |
  | grounding | object | opt·{category: ConditionCategory, concerns: [ConditionCategory], match_level: string ≤16자·자유문장 금지(값 정본은 M5 배선 시 readiness adapter 산출값으로 고정)} |
  | ~~match_reason~~ | — | ★금지(자유문장) — 필요 시 reason_code enum으로 대체(후속) |
  ```
- **M2 §3.7 note 추가 1줄:** `★catalog_candidates item 형상 = M3 §4 item 표 정본(match_reason 자유문장 금지·reason_code 대체 후속).`
- **정합성 체크:** slice 경로(refs만) pass ✓ · legacy readiness 경로가 match_reason을 계약 경로로 보내는 일 없음(계약 경로 신규) ✓ · 코드 match_reason 소비부는 optional이라 무파괴 — M5 이후 소비 제거는 별도 cleanup 후보로 기록.

### D3-03: session_ref 형식 / 호환 모드 / version 착지
- **수정 대상:** M3 §5.1 · §7 version gate 불릿 · §10 예시 2곳 · §3.
- **기존 문제:** §10 예시 `sess_synthetic_0001`이 §5.1 허용 형식 위반(정본 예시가 자기 gate에 reject) · bare "opaque UUID" 허용 vs "raw DB session_id(UUID PK)" 금지가 값-판별 불가 · 호환 모드 동작 1줄(version 생략 우회 여지) · version 필드 착지 미규정.
- **§5.1 허용 형식 교체(bare UUID 제거):**
  `- 허용: **sess_ref_*** prefix 또는 **keyed-HMAC ref**(서비스 secret 파생·예: hmac_* / sref_v1_*) · ≤128자 · 값에 고객 식별자/원문/DB PK 미포함.`
  `- 금지: raw DB session_id(내부 PK 직노출·★bare UUID 포함 — prefix 없는 UUID는 DB PK와 값-판별 불가하므로 허용 형식에서 제외) · customer-linked session_id.`
  `- ★서비스 의무 명문: 서비스는 자기 DB session PK를 그대로 보내지 않고 prefix/HMAC ref로 변환해 보낸다(gate는 prefix/형식만 검증 가능 — PK 여부는 서비스-side 의무).`
- **§10 예시 수정(2곳):** `"session_ref": "sess_synthetic_0001"` → `"sess_ref_synthetic_0001"` · `"sess_synthetic_9002"` → `"sess_ref_synthetic_9002"`.
- **§7 version gate 불릿 교체:**
  `- ★version gate: request_memory_context_version 없는/구버전 legacy payload = 호환 모드. ★호환 모드에서도 §5 blacklist·PII 정규식·식별자 차단(rule 4)·raw 휴리스틱(rule 5)·크기/깊이/개수 상한(rule 6)은 무조건 적용된다 — 면제는 §4 whitelist 강제(rule 1)와 field enum 검증(rule 2)뿐. ★version 필드 생략 = whitelist 강제 유예일 뿐 gate 우회가 아니다(악성 payload는 여전히 reject).`
- **§3 착지 목록에 추가:** `- request_memory_context_version — SSC.session_context.request_memory_context_version에 착지(호환 모드 판별 키).`
- **정합성 체크:** §5(blacklist)·§7-4(session_id 키 차단)와 무모순 ✓ · 예시 gate-pass ✓.

### D3-04: candidate fact_state 통일
- **수정 대상:** 앵커 §J-1 fact_state 행(:321 부근). (M2 §3.4는 유지.)
- **Fable5 판단:** **candidate = 2값(hypothesis|active)이 옳다.** `superseded`는 *확정 fact가 새 값으로 대체될 때*의 LTM lifecycle 개념 — gate 통과 전 후보 단계에는 대체 대상이 없다. 후보 폐기는 `status=rejected`가 담당(3축 분리 유지: status=승인 lifecycle · fact_state=신뢰도 축 · gate_decision=판정).
- **앵커 §J-1 행 교체:** `| fact_state | TEXT | | N | (hypothesis|active) | ★2값 — superseded는 LTM(§J-2) 전용(승격 후 lifecycle)·candidate 폐기는 status=rejected |`
- **정합성 체크:** M2 §3.4 (hypothesis|active)와 일치 ✓ · LTM 3값(§J-2/M2 §3.5)과 역할 분리 명확 ✓.

### D3-05: enum 값 출처 4종 고정 + 상한 조정 
- **수정 대상:** M3 §4 하단(enum 정본 표 신설) · §4 전역 상한 줄.
- **enum 정본 표 신설(§4 하단·§7 rule 2의 정본):**
  ```
  ★enum 값 정본 (gate rule 2 검증 기준·괄호=코드/문서 출처):
  | enum | 값 | 정본 출처 |
  |---|---|---|
  | ConditionCategory | dryness|barrier|sensitivity|wrinkle|pigmentation|pore|acne|oiliness | core.py _CONDITION_KW(:167) |
  | risk_level | none|low|medium|high | 앵커 §I-3(코드 judge risk = low|medium|high 부분집합·none=요약 무위험) |
  | last_refined_intent | greeting|comparison_question|skin_concern_explanation|education_request|routine_guidance|product_recommendation_request|vague_product_request|clarify_concern_axis|safety_question|adverse_or_sensitivity_signal|cannot_determine (11값) | ★core.py `_refine_intent` **실산출 집합**(:597-631)이 정본·본 표는 사본. (주의: `_INTENT_SIGNAL_OK`(:27)·`small_talk` 등 입력측 어휘는 last_refined_intent로 echo되지 않음 — enum에 미포함) |
  | intent_types (episode_summary_refs) | ★별도 SummaryIntentTag vocabulary(서비스 요약 태그): product_fit|safety|education|routine|comparison|greeting|other (초안·M4 확정) | 서비스-소유 요약 태그 — last_refined_intent와 **별개 enum**(§10 예시 'product_fit' 멤버) |
  | signal_kind | view|add_to_cart|checkout|purchase|wishlist|alert|coupon|ai_verdict | 앵커 §L |
  | consent_scope / sensitivity_level / privacy_level / retention_policy / fact_state | (기존 정본 유지) | M2 §6·§4 / 앵커 §M |
  ```
- **전역 상한 줄 교체:** `전역 상한(초과 시 fail-closed): context total ≤ 32 KB(1차 제한) · nesting depth ≤ 5 · 총 item count ≤ 2,048(폭주 백스톱·★불변식: 전역 count ≥ Σ per-field max — per-field 합계(≈1,376)가 전역에 걸리지 않게 유지).`
- **동반 수정 2건(발행 전 검수 반영):**
  - **M3 §4 말미 불릿 자구 교체:** `★모두 opaque refs·enum·atom·bool·hash(keyed) — 원문/평문 식별자 없음` → `★모두 opaque refs·enum·atom·bool·hash(keyed) — 원문/평문 **고객** 식별자·고객 원문 없음. (예외: catalog_candidates item의 name/brand/category = 카탈로그 공개 표시 데이터 — D3-02 item 표 제약(≤128자·PII 스캔) 하에 허용)`
  - **M3 §4 session_ref 행 자구 교체:** `★opaque(§8): sess_ref_*/UUID/HMAC ref (≤128 char)` → `★opaque(§5.1): sess_ref_* 또는 keyed-HMAC ref (≤128 char·bare UUID 불허 — §5.1)`
- **정합성 체크:** last_refined_intent 11값 = `_refine_intent` 산출 전량·초과 0(검수 확인 — echo 불가 값 9종 제외) ✓ · §10 예시 `intent_types:["product_fit"]`가 SummaryIntentTag 멤버로 pass ✓ · Σ per-field max=1,376 ≤ 2,048 ✓ · 32KB가 실질 제한이므로 2,048 상향은 폭탄 방어 약화 아님 ✓.

### D3-06: 앵커 §J-2 + M2 §5 subject_key
- **수정 대상:** 앵커 §J-2 표(:336 부근)·§J-2 upsert 키 규칙 문단(:353-355) · M2 §5 다중값 줄.
- **앵커 §J-2 표 수정 2건:**
  - `| subject_ref | TEXT | idx | N | …` → `| subject_ref | TEXT | idx | **Y(게스트=null)** | → SubjectRefMap | ★신규 keying·가명 PII·★subject_ref XOR guest_ref 중 하나 필수(NEW-1) |`
  - 직하에 row 신설: `| guest_ref | TEXT | idx | Y | — | ★subject_ref NULL 시 세션/디바이스 참조(병합 대상 B-e) |`
- **앵커 §J-2 키 규칙 문단에 추가:** `★guest 포함 keying: subject_key = COALESCE(subject_ref, guest_ref)(비NULL 보장 — SQL NULL별 UNIQUE 무효 방지). 다중값 dedup 키 = (subject_key, type, norm_value)·SINGLE identity = (subject_key, type). guest fact는 §N-5 병합 시 subject_ref로 재키잉(merge 시 동일 (type,norm_value) 충돌 = 기존 subject fact 우선·guest 쪽 supersede).`
- **M2 §5 다중값 줄 자구 교체:** `partial UNIQUE (subject_ref, type, norm_value) WHERE …` → `partial UNIQUE **(subject_key, type, norm_value)** WHERE deleted=false AND blocked=false (★subject_key=COALESCE(subject_ref,guest_ref)·§3.5와 동일)`.
- **정합성 체크:** M2 §3.5(XOR·COALESCE)와 앵커·M2 §5 3자 일치 ✓ · guest 다중값 fact NULL 문제 해소 ✓ · 병합 충돌 규칙(기존 subject 우선)은 B-e idempotency와 정합.

### D3-07: version label 정리
- **Fable5 판단:** **v1.2 승격 권장** — delta-2가 이미 §7을 "v1.2"로 자칭했고 앵커/checklist가 이를 인용하므로, 헤더를 끌어올리는 쪽이 인용 정정보다 drift가 적다.
- **수정:** ① M2·M3 헤더 `· v1.1` → `· v1.2` + changelog 1줄 추가: `★v1.2 = delta-2(94bd93b)+delta-3 반영: whitelist 재정합(B15)·enum 정본 고정·predicate 정정·guest_ref keying·at-rest §11·V0 SUPERSEDED §12.` ② checklist §5 verdict 2줄의 `M2 v1.1`/`M3 v1.1` → `M2 v1.2`/`M3 v1.2`. ③ DELTA2_PATCH 보고서는 **이력 문서 — 원문 유지**(정정은 본 제안서와 checklist가 담당).
- **정합성 체크:** 앵커 3곳·checklist :27의 "M3 §7 v1.2" 인용과 일치하게 됨 ✓.

### D3-08: has_raw_or_pii 위치 열거 정정
- **수정 대상:** 앵커 §R 포괄 SUPERSEDE 선언 1문장(:607 부근).
- **자구 교체:** `본 §R·§M5·§V·§S·W26 등 5곳` → `**본 앵커 §A(:50)·§D(:135)·§Q(:584)·§R·§U-M5·§V·W26 7곳의 "has_raw_or_pii" 재사용/검사/미배선 서술 전부**` (★§S 제거 — §S에는 해당 서술 없음 · §A 추가 — Executive Summary의 미배선 서술 포함 · 각 원문은 유지하되 본 선언이 supersede함을 명시).
- **정합성 체크:** 전수 grep 기준 실잔존 위치(§A 포함)와 열거 일치 ✓ · 포괄 선언 방식 유지(개별 원문 수정 불요) ✓.

## D. Control 패치 실행용 prompt 초안

```
[MEMORY V1 DELTA-3 PATCH — Fable5 제안서 그대로 반영]
기준: docs/reports/fable5/FOUNDATION_MEMORY_ARCHITECTURE_V1_DELTA3_PATCH_PROPOSAL_20260704.md (§C의 자구를 그대로 사용)
수정 파일(4): 설계문서/foundation/MEMORY_CONTEXT_CONTRACT_V1_20260704.md(D3-01·02·03·05·07) ·
설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md(D3-02 note·06 §5·07 헤더) ·
설계문서/foundation/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md(D3-04 §J-1·06 §J-2·08 §R) ·
docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_REVIEW_CHECKLIST_20260704.md(D3-07 verdict)
+ 신규 보고 docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_DELTA3_PATCH_20260704.md
  (D3-01~08 반영표·수정 위치 정확 인용·Fable5 delta-3 재검증 요청 명시)
지시: issue별 §C의 "삭제할 문구"를 제거하고 "추가할 문구/표"를 해당 위치에 삽입. 전량 재작성 금지 —
해당 행/문장/표만 수술식 수정. 제안 자구 외 임의 변경 금지(불가피하면 DELTA3_PATCH 보고서에 사유 명기).
금지: 코드 수정·DB migration·source repo push·raw 고객 데이터/secret 열람·git add -A.
commit/push: foundation-docs만 · explicit add(수정 4+신규 1 파일만) ·
message: "docs(memory): patch v1 contracts delta3 enum/whitelist alignment"
완료 보고: 수정 파일 경로·commit hash·issue별 반영 여부 표·미반영/변경 사유(있다면)·무결성(코드 0/push 0/raw 0).
```

## E. delta-3 이후 Fable5 재검증 범위

- **경량 delta-3 재검증만**: D3-01~08의 반영 자구 확인 + ①정상 echo 값(`dryness`)·catalog refs·예시 payload가 gate 규칙상 pass ②악성(match_reason 자유문장·bare UUID session_ref·version 생략 payload의 blacklist 적용) reject — 문서 규칙 시뮬레이션이면 충분. **전체 구조 재검증 반복 금지**(REG-1 구조 축·D-2/3/8·enum 2종 등 CLOSED 항목 재열람 불요).
- **APPROVED 조건**: D3-01·02·03·05·06 5건이 제안 자구(또는 동등 의미)로 반영되고 신규 모순 미도입 시 — **APPROVED(FINAL_PASS) 선언 가능**. D3-04·07·08은 WATCH 등급(미반영 시 APPROVED_WITH_WATCH).

## F. M4/M5 착수 여부

- delta-3 전: **불가**(현행 문면 구현 시 정상 트래픽 reject 가능성 잔존).
- delta-3 반영 + Fable5 경량 재검증 **APPROVED 후**: M2/M3 = FINAL_PASS → **M4 착수 가능(단 B1~B15 해소 병행)** — B15는 delta-3의 D3-01/02/03/05로 문서-레벨 충족되고, 잔여 B는 구현-stage blocker(B1 소재·B2 P-patch·B3 secret·B4 gate 구현·B5 at-rest·B6 SIASIU·B8 TTL·B9 taxonomy·B10~B14)로 M4 train 내에서 해소.
- M4 설계 준비(B12 plan·B5 세부·B10 헤더·B11 설계)는 지금 병행 가능.

---
무결성: 코드 수정 0 · migration 0 · source repo push 0 · raw 고객 데이터/secret 열람 0 · 본 문서 = 수정 "제안"(문서 자구)이며 구현 지시 아님.
