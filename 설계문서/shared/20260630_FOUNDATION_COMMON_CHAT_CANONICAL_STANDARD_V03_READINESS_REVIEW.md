# Foundation Common Chat Canonical Standard v0.1 — v0.3 Readiness Review — 2026-06-30

> ★검수 전용. **코드/contract/canonical 문서/product repo 수정 0.** 원본 canonical md/json 미수정. 보강안은 §Required Document Fixes에 제안만(Leo 승인 전 미반영).
> 대상: `0bf34b7` — `설계자료/…CANONICAL_STANDARD_SIASIU_BASELINE.{md,json}`.

## 전체 평가: **PARTIAL**
## v0.3 readiness decision: **GO-WITH-DOC-FIXES**
> 강한 토대(원칙·정확한 SIASIU baseline·pipeline·adapter 분리·16 test cases)이나, **4개 영역에 실질 gap**(memory 정책 부재 · LLM composer policy 부재 · anti-pattern 미완 · test case 3-way permission 기대값 부재). gap은 **문서 추가**로 해소 가능(근본 재설계 아님) → **작은 doc-fix 후 진행 GO.**

## 검수 기준별 판정
| # | 기준 | 판정 | 근거 |
|---|---|---|---|
| 1 | v0.3 구현 기준서 수준 | PARTIAL | pipeline·next trains 있음. 단 test case가 permission 기대값 미포함 |
| 2 | "Foundation ≠ SIASIU 복사본" 명확 | PARTIAL | §1에 "일반화" 개념은 있으나 **명명 framing**(source baseline / canonical generalized / vertical application / 상위 common brain) 미명시(grep 0) |
| 3 | pipeline 구체성 | PARTIAL | 14단계 있음. **"safe draft generation"** 별도 단계 누락(grep 0) |
| 4 | permission 3분리 | PARTIAL | 3 field 나열만(§10). 분리 논리(지식검색≠후보검색≠실추천) + contamination 방지 논리 얕음 |
| 5 | Foundation vs adapter responsibility | **PASS** | §8 + 불변식(adapter는 safety/permission 변경 불가) 명확 |
| 6 | LLM composer policy | **FAIL** | judge-locked / 표현층(not 판단자) / write-protected fields / output validation **전부 부재**(grep 0) |
| 7 | memory policy | **FAIL** | memory_write=0 / memory_write_candidate / advisory·CS·safety memory 분리 **전부 부재**(grep 0) |
| 8 | Cosmile adapter alignment | PARTIAL | 방향(§8·§13)은 있으나 **6-step 시퀀스 + "candidate-first=구조 부채" + "v0.2=Foundation 방어"** 명시 부재(grep 0) |
| 9 | human-like testable | PARTIAL | §7·§11이 expected behavior로 연결되나 **3-way permission 컬럼** 부재 |
| 10 | baseline test cases | PARTIAL | 16 케이스 전부 존재(✅) but 기대값에 retrieval_allowed/product_candidate_allowed/product_recommendation_allowed + adapter별 행동 미완 |
| 11 | anti-patterns | PARTIAL | 8종 존재. **6종 누락**(LLM judge override·premature memory write·raw/PII durable·catalog-out·evidence 없는 효능 과장·test-pass만 보고 UX 미확인) |
| 12 | JSON 기계가독성 | **PASS** | 구조화됨·md↔json 일관(원칙 10=10·anti 8·test 16). 단 동일 gap 공유 |

## 6. v0.3 구현 기준서로 충분한가?
**부분적으로.** pipeline·원칙·SIASIU baseline·test cases는 다음 train(특히 A 진단)을 바로 시작하기에 충분. 그러나 **Contract v0.3(B)·Natural Composer(C)** 를 안전하게 진행하려면 **permission 분리 상세·LLM composer 안전 정책·memory 정책**이 문서에 먼저 있어야 한다(현재 부재).

## 7. 가장 잘 된 부분 5
1. **SIASIU baseline 정확성** — "self-primary + Foundation shadow" 정정이 명확(복사 아님·일반화 의도).
2. **확정 원칙 10개**(§2) — intent-first·non-sales·safety>sales가 testable한 방향으로 정리.
3. **canonical pipeline 골격**(§5) — 14단계로 구현 흐름 제시.
4. **adapter 분리 + 불변식**(§8) — adapter가 common safety를 우회 불가 명시.
5. **16 baseline test cases**(§11) — 요구 케이스 전부 포함, intent/safety/추천허용 기대값 연결.

## 8. 부족하거나 애매한 부분 5
1. **memory 정책 전무**(criterion 7) — v0.3 memory 경계가 문서에 없음.
2. **LLM composer 안전 정책 전무**(criterion 6) — judge-locked/write-protected/표현층 미정의 → C train 위험.
3. **anti-pattern 미완**(criterion 11) — 구현 위험 6종(특히 LLM override·premature memory) 누락.
4. **permission 3분리 얕음**(criterion 4·9·10) — field만 나열, per-case 기대값·분리 논리 부재.
5. **Cosmile 6-step alignment + 구조 부채 명명 부재**(criterion 8) — D train 지시서로 부족.

## 9. 반드시 보강해야 할 항목 (구현 전 필수)
- **Memory Policy** 섹션(필수) · **LLM Natural Answer Composer 안전 정책**(필수) · **Anti-patterns 6종 추가**(필수) · **baseline test case에 3-way permission + adapter별 기대값 컬럼 추가**(필수) · Cosmile 6-step alignment + 구조부채 명명(권장) · "safe draft generation" pipeline 단계(권장) · source/canonical/vertical 명명 framing(권장).

## 10. md/json 불일치 여부
**불일치 없음.** 원칙 10=10 · anti_patterns 8=8 · baseline_test_cases 16=16 · pipeline 14=14 일관. 단 **양쪽이 같은 gap 공유**(memory·LLM policy·anti 6종·permission 값).

## 11. permission 분리 명확성
**PARTIAL.** `retrieval_allowed`·`product_candidate_allowed`·`product_recommendation_allowed`가 future field로 **나열**은 되나(§10), ① 지식검색↔상품후보검색↔실추천의 **분리 논리**, ② candidate-first/product-first **contamination 방지와의 연결**, ③ **각 test case별 기대값**이 없다. → B(Contract v0.3) 전에 보강 필요.

## 12. adapter boundary 명확성
**PASS(개념)/PARTIAL(상세).** "Foundation 먼저·adapter 나중·adapter는 common safety 우회 불가" 불변식은 명확(§8). 단 Cosmile **6-step 호출 시퀀스**와 "현재 v0.2=Foundation 측 방어 / Cosmile candidate-first=정렬해야 할 구조 부채" 인식이 문서에 없음 → D train 지시서로는 보강 필요.

## 13. LLM composer policy 명확성
**FAIL.** v0.3 shadow/dev-only·"LLM=표현층(판단자 아님)"·judge-locked·write-protected fields·output validation **모두 부재**. C(Natural Composer) 진행 전 **필수 보강**(미보강 시 hallucination이 judge/safety를 침범할 위험).

## 14. memory policy 명확성
**FAIL.** 문서에 memory 경계 전무. v0.3 **memory_write=0 유지 · memory_write_candidate만 설계 · 실제 저장은 별도 gate 이후 · advisory/CS/safety memory 분리** 가 필요(현재 미언급).

## 15. human-like test readiness 평가
**PARTIAL.** §7 10기준이 §11 test로 연결은 되나, ① 각 기준→expected behavior 매핑이 **감상적 문장 수준을 일부 벗어나지 못함**(불안 인정·대화체는 측정지표 부재), ② test case에 retrieval/candidate/recommendation **3-way permission 기대값**과 adapter별 기대 행동이 빠져 **probe(A)가 바로 기계 채점**하기엔 부족. → A train에서 채점 가능한 형태로 보강 권장.

## 16. 다음 train 추천 (무엇을 먼저)
**doc-fix(작은 보강) → A. Human-like Baseline Probe 먼저.**
- 이유: 보강 후, **A는 read-only 진단**으로 현 v0.2를 16 baseline 케이스에 채점 → **실제 gap을 수치화**한다. 이 데이터가 **B(Contract: 어떤 permission/field가 실제 필요한지)·C(Composer: 어디가 판정문이라 자연어가 필요한지)·D(Cosmile 정렬 우선순위)** 의 근거가 된다. 측정-우선(intent-first 원칙을 우리 프로세스에도 적용).
- 순서: **doc-fix → A(probe) → B(Contract v0.3) → C(Composer)/D(Cosmile alignment) 병행 → E(SIASIU migration, 최후).**

## Required Document Fixes (제안만 — Leo 승인 전 canonical 미반영)
> 아래는 **검수 리포트의 제안**이며, 원본 canonical md/json은 **수정하지 않았다.**
1. **Memory Policy 섹션 신설**: v0.3 memory_write=0 · memory_write_candidate만 설계 · 실 저장은 별도 gate 후 · advisory/CS/safety memory 분리.
2. **LLM Natural Answer Composer 안전 정책 신설**: shadow/dev-only(non-primary) · LLM=표현층(판단자 아님) · judge-locked · write-protected fields[intent_type·risk_level·safety_gate_result·retrieval_allowed·product_candidate_allowed·product_recommendation_allowed·recommended_products·evidence_level·limitations·safety_override_reason] · output validation 필수.
3. **Anti-patterns 6종 추가**: LLM composer가 judge 결과 변경 · premature memory write · raw/PII durable write · catalog 밖 제품 생성 · evidence 없는 효능 과장 · 테스트 PASS만 보고 실제 UX 미확인.
4. **3-way permission 분리 상세 + test case 기대값**: 지식검색↔후보검색↔실추천 분리 논리, 각 16 케이스에 retrieval_allowed/product_candidate_allowed/product_recommendation_allowed + SIASIU/Cosmile adapter별 기대 행동 컬럼.
5. **Cosmile 6-step alignment 시퀀스** + "v0.2=Foundation 방어 / Cosmile candidate-first=구조 부채" 명명.
6. **명명 framing**: SIASIU=source baseline · Foundation=canonical generalized standard · SIASIU/Cosmile=vertical application · Foundation=SIASIU 성공 원리의 상위 common brain.
7. (minor) pipeline에 **"safe draft generation"** 단계를 natural answer composition 앞에 분리.

## 최종 판정 / 처리
- **PARTIAL · GO-WITH-DOC-FIXES.** 위 1–4(필수)는 **문서 보강 train 1회** 후 A 진행 권장. 자동 수정/보강 commit **미실행**(Leo 승인 대기).
- 코드 0 · contract 0 · product repo 0 · memory write 0 · push 0. 본 검수 리포트만 docs-only commit.
