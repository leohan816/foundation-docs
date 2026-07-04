# Memory Architecture V1 — M2/M3 DELTA-3 PATCH (Fable5 제안서 반영)

> 작성: foundation-control · 2026-07-04 · ★read-only 문서 자구 patch(수술식) · 코드 0 · migration 0 · source push 0 · raw/secret 미열람 · 구현 지시 없음 · 전량 재작성 없음.
> 기준: `FOUNDATION_MEMORY_ARCHITECTURE_V1_DELTA3_PATCH_PROPOSAL_20260704.md`(Fable5·§C 자구 그대로 반영).

## 1. 수정 파일 목록
- `설계문서/foundation/MEMORY_CONTEXT_CONTRACT_V1_20260704.md`(M3·D3-01·02·03·05·07)
- `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md`(M2·D3-02 note·06 §5·07 헤더)
- `설계문서/foundation/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md`(anchor·D3-04 §J-1·06 §J-2·08 §R)
- `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_REVIEW_CHECKLIST_20260704.md`(D3-07 verdict/version)
- (신규) 본 문서 = delta-3 patch report.

## 2. D3-01~D3-08 반영 여부
| issue | 대상 | 반영 | 반영 위치(자구) |
|---|---|---|---|
| **D3-01** ConditionCategory 8값·FactTypeRegistry 오지정 제거 | M3 §4 | ✅ | stated_concerns 행 교체(`★ConditionCategory vocabulary`)·enum 정본 불릿에 `ConditionCategory = dryness|barrier|sensitivity|wrinkle|pigmentation|pore|acne|oiliness`(출처 _CONDITION_KW) 추가 |
| **D3-02** catalog_candidates item 표·match_reason 금지 | M3 §4·M2 §3.7 | ✅ | catalog 행 교체(`★하단 item 표(자유문장 금지)`)·**item 허용 필드 표 신설**(product_id/slug/name/brand/category/concerns/grounding·~~match_reason~~ 금지)·M2 §3.7 note 1줄 |
| **D3-03** session_ref prefix/HMAC·bare UUID 제거·예시 2곳·호환 3원칙·version 착지 | M3 §5.1·§7·§10·§3 | ✅ | §5.1 허용 형식(sess_ref_*/keyed-HMAC·bare UUID 불허·서비스 의무)·§7 version gate(호환 모드에서도 blacklist/PII/식별자/휴리스틱/상한 무조건 적용·우회 아님)·§10 예시 `sess_ref_synthetic_*`(2곳)·§3 착지 `request_memory_context_version` |
| **D3-04** candidate fact_state 2값 | anchor §J-1 | ✅ | §J-1 fact_state 행 `(hypothesis\|active)`·superseded=LTM 전용·candidate 폐기=status=rejected |
| **D3-05** enum 정본 표·last_refined_intent 11값·SummaryIntentTag·상한 2,048 | M3 §4 | ✅ | **enum 값 정본 표 신설**(ConditionCategory/risk_level/last_refined_intent 11값/intent_types SummaryIntentTag/signal_kind)·전역 상한 `512→2,048`(불변식 Σ per-field≤전역)·말미 불릿(고객 식별자·catalog name/brand 예외)·session_ref 행 자구 |
| **D3-06** subject_key=COALESCE·guest_ref row·nullable 정합 | anchor §J-2·M2 §5 | ✅ | §J-2 subject_ref `Y(게스트=null)`+XOR·**guest_ref row 신설**·키 규칙 문단(subject_key COALESCE·병합 충돌=기존 subject 우선)·M2 §5 다중값 `(subject_key,type,norm_value)` |
| **D3-07** v1.2 승격·checklist 일치 | M2·M3·checklist | ✅ | M2·M3 헤더 `v1.1→v1.2`+changelog 1줄·checklist §5 `M2 v1.2`/`M3 v1.2`·verdict 헤더 v1.2. (DELTA2_PATCH 보고서 = 이력 문서·원문 유지) |
| **D3-08** has_raw_or_pii supersede 위치 열거 정정 | anchor §R | ✅ | `§R·§M5·§V·§S·W26 5곳` → `§A(:50)·§D(:135)·§Q(:584)·§R·§U-M5·§V·W26 7곳`(§S 제거·§A 추가) |

## 3. 미반영/변경 항목과 사유
- **미반영: 0** — D3-01~08 전부 제안 자구대로 반영.
- **불가피한 형식 변경(내용 무변경):** 제안서의 표 행 자구에서 enum 구분자 `|`를 markdown 표 렌더링을 위해 `\|`로 이스케이프(예: `(hypothesis|active)`→`(hypothesis\|active)`). 의미·값 동일·자구 외 임의 변경 아님.
- **DELTA2_PATCH 보고서 원문 유지**(D3-07 지시대로 이력 문서·정정은 제안서/checklist가 담당).

## 4. 검증 (문면 규칙 시뮬레이션)
- **정상 echo 값 dryness reject 안 됨:** ✅ `stated_concerns` enum = ConditionCategory(dryness 멤버·출처 _CONDITION_KW) → gate rule 2 통과(FactTypeRegistry 오지정 제거).
- **catalog refs 경로 pass:** ✅ catalog_candidates item 표에 product_id/slug/name/brand/category/concerns/grounding 허용 → 계약 경로(refs) pass·catalog 미사망.
- **match_reason 자유문장 reject:** ✅ item 표 `~~match_reason~~ 금지(자유문장)` → 이외 key reject.
- **bare UUID session_ref reject:** ✅ §5.1 허용 = sess_ref_*/keyed-HMAC만·bare UUID 불허(DB PK 값-판별 불가).
- **version 생략 payload도 scan 우회 못 함:** ✅ §7 version gate = 호환 모드에서도 blacklist·PII·식별자(rule 4)·raw 휴리스틱(rule 5)·상한(rule 6) 무조건 적용·면제는 whitelist 강제(rule 1)+enum 검증(rule 2)뿐.
- **guest fact UNIQUE NULL 해소:** ✅ `subject_key=COALESCE(subject_ref,guest_ref)`(M2 §3.5·§5·앵커 §J-2 3자 일치).
- **version label v1.2 일치:** ✅ M2·M3 헤더·checklist·앵커 인용(§R "M3 §7 v1.2") 일치.

## 5. M4/M5 착수 가능 여부
- **Fable5 경량 delta-3 재검증 APPROVED 후 가능.** 제안서 §F: delta-3 반영 + 경량 재검증 APPROVED → M2/M3 FINAL_PASS → M4 착수(B1~B15 해소 병행·B15는 D3-01/02/03/05로 문서-레벨 충족·잔여 B는 구현-stage).
- M4 설계 준비(B12 plan·B5 세부·B10 헤더·B11 설계)는 지금 병행 가능.

## 6. Fable5 delta-3 경량 재검증 요청 가능 상태
- ★**요청 가능 = YES.** 범위 = 제안서 §E "경량 delta-3 재검증만"(D3-01~08 자구 확인 + 정상 echo/catalog/예시 pass·악성(match_reason/bare UUID/version 생략) reject 시뮬레이션). 전체 구조 재검증 반복 불요.
- APPROVED 조건(제안서 §E): D3-01·02·03·05·06 5건 반영(✅ 완료)+신규 모순 미도입 → **APPROVED(FINAL_PASS) 선언 가능** 상태. D3-04·07·08(WATCH 등급)도 반영 완료.

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 구현 지시 없음 · 전량 재작성 없음(수술식 자구 patch) · explicit add(수정 4 + 신규 1).
