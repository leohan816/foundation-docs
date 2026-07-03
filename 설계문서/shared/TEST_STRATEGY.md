# TEST_STRATEGY.md — SIASIU judge 테스트 전략 (구현 전 *반드시* 통과)

> **버전 v0.1 · 2026-06-24** (Leo + GPT 분석 + Opus 종합)
> **목적:** Claude Code가 judge 관련 코드를 *구현/수정하기 전에* 이 문서의 게이트 테스트를 통과해야 한다.
> **철학 전환:** "엔진이 *맞게* 작동한다" 증명 → **"엔진이 *모를 때 모른다고·위험할 때 보수적으로·claim보다 근거·사람 조건 무시 안 함*"** 증명.
> AI/건강/화장품 판단에서 *완벽히 맞추는 것*보다 *정직하게 망가지거나 보수적으로 판단하는 것*이 더 중요하다.

---

## 0. 절대 불변식 (테스트가 강제 — 어기면 FAIL)
1. **모르면 모른다.** 미매핑 성분을 *조용히 무시 안 함.* 판단에 영향 가능하면 *confidence를 낮춘다.*
2. **위험할 땐 보수.** 안전 비대칭 — 임신/수유 + 레티노이드 = 농도 무관 보수. 낮은 함량이어도 *안전 리스크를 완전히 제거하지 않음.*
3. **claim보다 근거.** 제품설명/마케팅은 *판단 근거가 아니라 검증 대상.* 성분·공개근거가 우선.
4. **사람 조건 무시 ❌.** 같은 제품이라도 페르소나에 따라 판단이 *갈려야* 한다.
5. **추정은 추정이라 말한다.** INCI순위 노출 = *추정.* 공개 농도 있으면 그게 우선. 복합원료/encapsulated/≤1% 구간은 *단정 안 함.*
6. **퍼지 자동병합 ❌.** 모르는 성분을 비슷한 성분에 *억지 매핑 안 함*(§1.5.6).
7. **금지 표현 ❌.** 판단값이 맞아도 *말투가 위험하면 FAIL.* 진단·치료 단정·효과 보장·임신 안전 단정·병원 대체.

---

## 1. 테스트 범주 (8) — 현재 상태

| # | 범주 | 무엇 | 현재 | 게이트 |
|---|---|---|---|---|
| T0 | **골든 경로** | 정상 입력 → 기대 판단 | ✅ 통과(13/13·7/7·7/7) | 필수 |
| T1 | **경계값** | high/medium/low/trace·버퍼 0/1/2/3·향료 유무 *애매대* | 🟡 부분(`test_adversarial` ADV-4·6 경계) | 필수 |
| T2 | **복합 페르소나 matrix** | 같은 제품 × 10 페르소나 → *갈리는가* | ✅ `test_persona_conflict_matrix` 50/50(2축) | ★1순위 후보 |
| T3 | **미매핑 성분** | 모르면 모른다·confidence 낮춤·억지매핑 ❌ | ✅ 구현(ADV-3·`confidence=low`·D-FIX4) | ★필수 |
| T4 | **제품설명 claim 충돌(§4.2)** | 설명↔성분 충돌 시 성분 우선 | ✅ `test_claim_conflict` 6/6(가짜 제품·`claim_check.py`) | ★1순위 |
| T5 | **INCI 노출 추정 한계** | 공개농도 우선·추정 명시·복합원료 단정❌ | 🟡 부분(ADV-4·D-FIX2·exposure confidence) | 필수 |
| T6 | **근거 정직성** | judgment뿐 아니라 *이유*가 맞는가(must_include/not) | ✅ `test_reason_integrity` 12/12 HARD PASS | ★필수 |
| T7 | **출력 안전 표현** | 금지어/위험 표현 없는가 | ✅ 1차 `test_safety_language` 10/10(`safety_words` 재사용) | ★필수 |

---

## 2. 각 범주 SPEC (구현 전 표로 제안 → Leo 승인 → 구현)

### T4 `test_claim_conflict.py` (★1순위 — 실제 판매자료엔 항상 claim)
| 제품설명 | 성분표 | 기대 판단 | 기대 근거 must_include |
|---|---|---|---|
| "고농도 레티놀" | 레티놀 INCI 최하위 | claim 보수화 | 농도 비공개·후순위·추정 |
| "민감성도 안심" | 향료+레티놀+산 | claim 충돌 경고 | 향료·조합·민감성 주의 |
| "임산부 사용 가능" | retinol 포함 | **거절**(안전 우선) | 임신·레티노이드·회피 |
| "피부과급 효과" | 일반 화장품 성분 | 과장 claim 표시 | 근거 부족·과장 |
| "무자극" | fragrance/allergen 다수 | claim 충돌 | 향료·알레르겐 |
| "바쿠치올=레티놀 대체" | bakuchiol-ferulate | retinoid 아님·기능 edge | bakuchiol_derivative·retinol-like |
**불변식:** 충돌 시 *성분/공개근거 우선* · 마케팅은 *검증 대상.*

### T2 `test_persona_conflict_matrix.py` (★siasiu 핵심 — 사람에 맞춤)
제품(고노출 레티놀 / trace 레티놀 / 바쿠치올 / 향료+레티놀) × 10 페르소나 교차표. 같은 제품이 *갈려야* PASS.
예: 고노출 레티놀 → 일반=조건부·민감성=주의/거절·임산부=거절·장벽손상=거절·숙련자=조건부.

### T3 `test_unmapped_ingredients.py` (★모르면 모른다)
| 케이스 | 기대 |
|---|---|
| 미매핑 0 | 정상 판단 |
| 미매핑 ≤5 | 판단 가능·미매핑 표시 |
| 미매핑 ≥30% | **confidence 낮춤** |
| INCI 상위권 미매핑 | 노출/효능 *보수화* |
| 미매핑 후순위 부형제 추정 | 판단 영향 제한 |
**불변식:** 억지 alias 매핑 ❌ · 미매핑 *조용히 무시 ❌.*

### T6 `test_reason_integrity.py` (★judgment만 맞으면 부족)
```yaml
expected:
  judgment: caution
  must_include: [retinol, fragrance, sensitive, patch_test]
  must_not_include: [safe_for_pregnancy, guaranteed, treats_wrinkles]
```

### T7 `test_safety_language.py` (★말투가 위험하면 FAIL)
금지: 의학 진단("피부염입니다")·치료 단정("여드름 치료")·효과 보장("반드시 좋아짐")·임신 안전 단정·농도 단정("고농도입니다")·병원 대체("병원 갈 필요 없음").

### T1 `test_boundary_values.py` · T5 `test_inci_exposure_limits.py`
경계(노출 high/medium/low/trace·버퍼 0~3)·INCI 한계(공개농도 우선·복합원료/encapsulated/≤1% 단정 ❌).

---

## 3. 게이트 규칙 (Claude Code)
- judge 코드 *구현/수정 전*: 관련 게이트(T0 + 해당 범주)가 *존재하고 통과*해야 한다.
- 새 테스트는 **먼저 표로 제안 → Leo 승인 → 구현**(GPT/Leo 규율 — 바로 구현 ❌).
- 기대값(judgment + reason + must_not_include)을 *미리* 적고 기계적으로 대조.
- "더 많은 PASS"가 목표가 아니라 *실전에서 깨지는 지점*을 찾는 것.

## 4. 우선순위 (Leo)
1. **T4 claim 충돌** (실제 자료엔 항상 claim·§4.2 준비됨)
2. **T2 복합 페르소나** (사람 맞춤 = siasiu 핵심)
3. **T3 미매핑** (333건 = 최대 불확실성)
4. **T6 근거 정직성** · 5. **T7 안전 표현** · 6. **T5 INCI 한계** · T1 경계값

## 5. PASS 등급 (단순 pass/fail ❌ — Leo+GPT)
판단값만 맞으면 부족. 3중(judgment + reason + must_not_say)을 등급으로:
| 등급 | 의미 |
|---|---|
| **HARD PASS** | 판단값·이유·금지표현 *모두* 통과 |
| **SOFT FAIL** | 판단값은 맞으나 이유/불확실성 부족 |
| **HARD FAIL** | 판단값이 틀리거나 **금지표현 사용** |
★건강/화장품 영역 — *금지표현 위반은 무조건 HARD FAIL.*

## 6. 실패 분류 F1~F6 + 수정 루프 (★바로 코드 고치지 마)
실패가 나오면 *먼저 분류* → 원인별 위치 → 우선순위로 수정.
| 유형 | 의미 | 현재 구조 수정 위치 |
|---|---|---|
| **F1 데이터** | 성분/alias/metadata 부족 | 레지스트리 `.md`(볼트) |
| **F2 매핑** | atom 매핑 틀림/미매핑 | alias/group |
| **F3 judge rule** | 판단값 틀림·로직 누락 | `judge_real.py` (현재 reason·safety 다 여기·층 미분리) |
| **F4 이유** | 판단 맞으나 근거 틀림 | `judge_real.py`(reason) |
| **F5 안전 표현** | 금지표현·과장·단정 | `judge_real.py`(현재)·*LLM 상담층 배선 후 더 중요* |
| **F6 테스트** | expected가 약하거나 틀림 | 테스트 |
**수정 우선순위:** **F5 안전 → F3 judge → F2 매핑 → F1 데이터 → F4 이유 → F6 테스트.**
**루프:** 실행 → 실패 수집 → F1~F6 분류 → *안전 먼저* 수정 → regression(기존 PASS 안 깨지나) → 커밋. *깨지면 즉시 멈추고 원인 표 보고.*

## 7. ★ D — judge_real 적대 테스트 실증 (2026-06-24)
`test_adversarial.py`로 경계값·미매핑·복합페르소나를 두들겨 **4 약점 발견·전부 수정**(다 F3·보수 방향):
| 테스트 | F | 수정 | 커밋 |
|---|---|---|---|
| ADV-1 수유×레티노이드 | F3⚠안전 | nursing→caution(임산부 동일단정❌·보수) | 8b447c2 |
| ADV-4 짧은목록 노출 | F3 | exposure confidence·`total<8`=low신뢰·보수 | 9aa8e14 |
| ADV-2 avoid 미독 | F3+F6 | `avoid` fact 적용·테스트 조임 | a2f55dd |
| ADV-3 미매핑 confidence | F3+F6 | 미매핑≥30%→`confidence=low`+근거 | e2c914f |
★**핵심 교훈(F6):** ADV-2·ADV-3은 *loose expected에 가려져 "PASS"였음* → **테스트 기준이 약하면 깨진 걸 못 잡는다.** golden test만으론 부족 — *expected를 조여야* 진짜 갭이 드러난다.
★**페르소나:** GPT가 별도 10개 제안했으나 *fact 키 비호환*(GPT `pregnant:True` vs 우리 `life_stage:pregnant`) → **우리 `personas_standard.yaml` 유지**(judge 호환). GPT 단일축(여드름·색소·고효능)은 `concern` 값으로 흡수.

## 8. ★ T2 — 페르소나 충돌 matrix 실증 (2026-06-24)
`test_persona_conflict_matrix.py` — 표준 10 페르소나 × 5 제품(고노출·trace·향료·버퍼·바쿠치올). **2축 검증:**
- **세로축** 같은 제품 → 사람에 따라 갈림 (안전 비대칭·노출·민감/장벽).
- **가로축** 같은 사람 → 조성(향료 vs 버퍼) 갈림.
처음 **31/50**(19 FAIL·전부 F3) → judge_real을 *gap 단위로 4회 수정* → **50/50**(새로 깨진 셀 0·regression 내내 유지).
| GAP | 약점 | 수정(judge_real) | 커밋 |
|---|---|---|---|
| A | 바쿠치올 verdict 미설정(전원 추천) | 사람별 verdict(임신/수유→caution·장벽→caution·민감→conditional) | 7d4fa85 |
| B | 장벽+고노출이 거절 아닌 주의 | 장벽+high→refuse(회복 우선) | 1040089 |
| 3 | 향료/버퍼 미소비(PC=PD) | ing:fragrance 추가(F1)+skin_role 소비(향료↑/버퍼↓) | 424b6a5 |
| 4 | 저노출 persona 뉘앙스·버퍼 과완화 | 저노출+민감/장벽 보수·버퍼완화=숙련비민감만 | 59b81a6 |
★**교훈:** ①목표=*judge_real↔e2e 철학 정렬*(억지 통과 ❌). ②**기대값 *안 풀고* 판단을 고침**(테스트 약화 ❌·ADV 교훈 유지). ③judge_real이 *이미 있는 skin_role/persona 정보를 더 정직하게 소비*(새 edge ❌). ④수치·"안전/무자극" 단정 ❌(버퍼=완화지 보장 아님). ⑤2축(사람×조성)이 *둘 다 갈려야* siasiu 핵심.

## 9. ★ T6/T7/C/B 1차 완성 (2026-06-24) — 판단 품질 기준선
하루에 *판단 엔진 품질 테스트 라인*을 한 단계 완성. 전체 **9 suite·119 체크 GREEN.**
| 단계 | 무엇 | 결과 | 산출 |
|---|---|---|---|
| **T6** | 근거 정직성(judgment+이유+금지표현·HARD/SOFT) | 12/12 HARD PASS | `test_reason_integrity.py` |
| **T7** | 안전표현 1차(judge 출력 금지표현) | 10/10 | `test_safety_language.py` + `safety_words.py`(재사용) |
| **C** | claim 충돌(가짜 6종·claim=검증 대상) | 6/6 | `claim_check.py`(별도·judge 비오염) |
| **B** | interaction edge 최소(EDGE_AUDIT 추출) | 7/7 | `interaction_edges.py`(stable 4+candidate 1·judge 비오염) |
★**발견/교훈:** ①C에서 *note가 "무자극"을 부정하며 echo* → 금지표현 적발(F4)·*부정해도 그 단어 안 씀.* ②**판단=judge_real / 설명=DeepSeek**(설명자·판단자❌) — T7 `safety_words.violations()`를 *나중 LLM output에 같은 함수 재적용.* ③interaction edge는 *발명❌·병용주의 추출·수치❌*·retinoid×buffer=*candidate/low만.* ④claim_check·interaction_edges는 *judge_real 비오염 별도 모듈.*

## ★ 남은 한계 (정직)
- **DeepSeek/LLM 상담층 *출력* 검증은 별도** — 지금 T7은 judge_real *템플릿* 출력 기준. ★LLM 배선 후 **T7 → LLM Presentation Integrity Test**로 확장: judgment/reason/uncertainty/safety preservation + no-new-claims + no-forbidden(`safety_words.violations()` 재적용). **판단 고정형 LLM 표현층**(Judge-Locked) — LLM은 표현만·판단 변조=HARD FAIL. 정본: `설계문서/SIASIU_LLM표현층_설계서.md`.
- **실제 제품 claim 데이터는 추후** — C는 *가짜* 제품. 실제 상세페이지 claim 대량 처리는 INTAKE→변환 후.
- **interaction edge는 *최소 stable 후보만* 연결** — 62 병용주의 전체·judge 깊은 연결·전체 edge memory 승격 시스템은 아직.
- **고객 장기메모리·자가성장 검색 루프**는 별도.
- **✅ RV-7 RESOLVED (2026-06-24):** judge_real이 *빈 제품(no_active_detected·conf none)* ≠ *전부 미매핑(insufficient_mapping·conf low·추천 보류)* 구분. `mapping_meta`(total/mapped/unmapped) 전달 → 미매핑 비율 높으면 confidence low + reason 표시. 실제 제품 73% 미매핑 → confidence low(과신 해소). ADV-3·RV-7·smoke 세 각도 다 통과·전체 12 suite GREEN. *읽은 성분으로 위험 잡되 못읽은 성분으로 추천 과신 ❌.*

## 변경이력
- v0.4 (2026-06-24) — §9 T6/T7/C/B 1차 완성(12/12·10/10·6/6·7/7·전체 9 suite 119체크 GREEN)·남은 한계 명시(LLM 출력검증·실제claim·edge 최소·edge memory). T4/T6/T7 상태 ✅. claim_check·interaction_edges·safety_words 추가(judge 비오염).
- v0.3 (2026-06-24) — §8 T2 페르소나 matrix 실증(31→50/50·4 gap 정렬·judge_real↔e2e 철학 정렬·기대값 안 풀고 판단 수정). T2 상태 ✅. ing:fragrance 추가.
- v0.2 (2026-06-24) — D 적대테스트 실증 반영: §5 PASS 등급(HARD/SOFT/HARD FAIL)·§6 실패분류 F1~F6+우선순위(F5→F3→F2→F1→F4→F6)·§7 D 4수정. T1/T2/T3/T5 상태 갱신(adversarial 부분커버·T3 confidence 구현). 페르소나=우리 것 유지(GPT 비호환). F6 교훈(loose expected 가림).
- v0.1 (2026-06-24) — 최초. 8 범주·7 불변식·게이트·우선순위. Leo+GPT 분석 종합. 표준 10 페르소나(`app/tests/fixtures/personas_standard.yaml`) 연동.
