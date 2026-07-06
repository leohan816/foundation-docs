# COSMILE MEMORY V3 — Design Contract Patch P1~P12 (완료 보고)

> 작성: foundation-control(Control) · 2026-07-06 · **Fable verdict `bd01ba1`(DESIGN_NEEDS_PATCH) 수용·P1~P12 전량 이행.**
> 목표: 문장 미화가 아니라 11문서를 **하나의 구현 가능한 계약 체계**로 — 같은 키·같은 enum·같은 lifecycle·같은 safety precedence·같은 provenance.
> 방법: 어휘 정본(DATA_DICTIONARY) 선작성 → 6개 파일-클러스터 병렬 편집(비중첩) → 완료 기준 13종 자동 grep 검증(**13/13 PASS** — 1건 오탐 판명 포함 재검).
> Hard Stop 무접촉: 코드/DB 0 · prod/live/main 0 · 실 secret 0 · M6-G activation 0 · 구현 batch(V3-11) 미착수 · 구현 지시 0.

---

## 1. Executive summary
- Fable P1~P12 전량 문서-레벨 이행. 신규 어휘 정본 `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(키/enum 15종/문턱/window/fact 규율/safety lifecycle/margin/consent lifecycle의 유일 정본) 신설 — 11문서는 값 선언 대신 사전 참조.
- **V1 closure 이월 L1을 실제 완결**: 정본 계약 2건(M2·HARD_GATE)에 supersede pointer 실적용(+foundation-control 원본 동기화)·ENTRY_PACKAGE 과대 표현 정정.
- 5-mission read-only reconciliation **실수행 완료**(M5 실명 앵커 확정 포함) — 결과 문서 별첨.
- 완료 기준 13/13: safety demotion conflict 0 · adverse 효력 모순 0 · tombstone 부활 경로 0 · rec_id drift 0 · anonymous_ref 소실 0 · enum drift 0 · 죽은 참조 0 · COSMILE-4 미인용 0 · margin 모순 0 · 신호추출 고아 0 · consent 충돌 0 · Option A 오염 0 · 순서 모순 0.

## 2. Fable verdict accepted
`docs/reports/fable5/COSMILE_MEMORY_V3_FABLE_DESIGN_REVIEW_20260706.md`(`bd01ba1`) — DESIGN_NEEDS_PATCH·P1~P12. 본 보고서가 그 이행 결과이며, 델타 재검수 package(§15)를 별도 첨부.

## 3. Patch table P1~P12

| P | Fable 지적(요약) | 수정 문서 | 수정 내용(정본 문구/구조) | 해소 근거 | 잔여 제한 |
|---|---|---|---|---|---|
| **P1** | INV-DB-2가 safety fact를 evidence 문턱으로 자동 강등(safety 약화) | V3-08·V3-07·V3-06·사전 §5.2 | 필수 문구 원문 삽입("Safety/adverse facts are not subject to ordinary evidence-threshold demotion…")·INV-DB-2 적용 대상 = direction≠safety 한정·safety 강등 3경로(resolution/consent-erasure/verified correction)만·위반 검출 시 자동 조치 금지(보고만) | grep: 필수 문구 3문서 존재·V3-06 SO-5 대상 재정의 | safety-resolution rule의 세부 절차 파라미터는 ★Leo |
| **P2** | adverse 1건 효력 3문서 모순 | V3-07 §4.5(정본)·V3-04·V3-06·사전 §2.4/2.5/5.3 | **AdverseSignalActionMatrix** 신설(severity 3값 × certainty 4값·6행 효과·불변식 4: commerce보다 우선·low 무시 금지·single low는 target 축 한정·matrix 밖=fail-closed)·V3-04/06의 자체 문턱 선언 제거→matrix 참조 | matrix 정본 1곳·타 문서 참조 grep 확인 | 초기 threshold 수치 확정 ★Leo |
| **P3** | V1 M2 fact 규율 통째 미상속·tombstone 부활 경로 | 사전 §5.1·V3-02 §3.5(신설)·V3-06 R-C1 | SAFETY∩SINGLE active≤1·직교 tombstone·must_not_reappear·**promotion 전 (subject_key,fact_type,fact_target) active/tombstone 조회 선행·우회 불가**·erasure 후 재등장 금지 명문 | 필수 키워드(must_not_reappear·tombstone·SAFETY_SINGLE·active≤1) 정본 존재 | — |
| **P4** | rec_id 형식/nullability 불일치·anonymous_ref 소실·귀속 시나리오 부재 | 사전 §1(Join Key Contract)·V3-03·V3-04·V3-09 | `rec_v3_`+ULID(26) 유일 형식·outcome의 rec_id NULLABLE+`attribution_mode`(direct/session/organic/unattributed/unknown)·anonymous_ref downstream 유지(R-K3)+`identity_stitching_state`·order_item 단위 attribution·partial refund(R-K4)/SKU variant repurchase(R-K5·product_id 기준)/bundle split(R-K6)·저장 소유 단일(R-K7) | 키 관계도+R-K1~7 정본·형식 drift grep 0 | stitching consent UX = ★Leo(기존 open Q3와 통합) |
| **P5** | enum/수치 문서간 드리프트 | **신규 사전**(유일 정본)·11문서 참조화 | enum 15종 정본(M2 reused/V3 ext/RESERVED 구분·superseded 매핑 표)·C_min 0.60·N_min 2·window 14d/90d 파라미터 표(★Leo 확정) | 옛 enum 비-superseded 잔존 grep 0·중복 선언 제거 | 파라미터 수치 확정 ★Leo |
| **P6** | 죽은 참조·번호 drift·소유 불명 | 11문서 전체 | depends_on/owns/referenced_by 메타 블록·실제 파일명 전면 교정·memory_context 최소화 계약 소유 = **V3-02**(§2.1 신설) | 참조 파일명 실재 검사 0 miss | — |
| **P7** | COSMILE-4 미인용·다른 집합 | V3-08(복원 계획 절)·V3-10(gate 3행) | COSMILE-4 이름 인용+원 3종(SubjectRefMap partial unique — legacy-null 거짓 전제 정정 포함·LTM active partial unique/SAFETY-SINGLE·MFC CHECK/lifecycle)을 baseline migration 보강 항목으로·INV-DB-1/2/3과 "별개 집합" 명시·V3-10에 L1/L2/COSMILE-4 추적 gate | grep: COSMILE-4 V3-08+V3-10 존재 | 실 복원 = migrate deploy 전 gate(실행은 별도 승인) |
| **P8** | margin 지표 vs 원가 저장 금지 모순 | 사전 §6·V3-04·V3-05·V3-09 | **Option A 채택**: margin_band(low/med/high)+margin_coverage만·정확 원가/실매가 저장 금지 유지·금액 margin 표현 전부 superseded·band 산출 소유=V3-05·정확 line cost는 pre-prod gate 이월 | 금액 margin 비-superseded 잔존 grep 0 | Option B(internal line margin) 재검토 = pre-prod |
| **P9** | 신호추출 계약 고아 | V3-04(Semantic Extraction Contract 절 신설)·V3-07(safety gate 소유) | semantic_label enum(사전 §2.12)·taxonomy·**AI=라벨 제안·deterministic gate=결정**·raw 미저장(label/source_ref/hash)·certainty 산정·human review 조건 | 소유 문서 지정·고아 참조 0 | — |
| **P10** | consent 철회 후 fact 운명 자기모순·un-learning/guest 병합 부재 | 사전 §7·V3-06(D3/상태표/E3 통일) | `consent_withdrawn`=보존+`reuse_blocked` / `erasure_requested`=deleted+must_not_reappear / guest_to_user_merge=재평가 승계(safety는 승계) / **un-learning**=fact_id 참조 파생 가중/suppression 회수+audit boolean | D3 정본화·"즉시 deleted"(consent) 잔존 0 | un-learning 구현 세부 = V3-11 설계 검증 대상 |
| **P11** | L1이 정본 계약에 미패치·ENTRY_PACKAGE 과대·provenance 0 | `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md`·`…FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_20260704.md`(+foundation-control 원본)·ENTRY_PACKAGE·index/V3-00 | 정본 2건에 supersede pointer 2줄 실적용(**원문 보존·삭제 0**)·ENTRY_PACKAGE "적용" → 실제 이력("ffb7d21은 보고서 2건만·정본 2건은 본 패치로") 정정·V3 문서에 V1 provenance(Option B 정본 1e24c33·CLOSED_WITH_LIMITS·L1/L2/COSMILE-4 열거) 명시 | pointer grep 3파일 존재·원문 공식 보존 확인 | — |
| **P12** | index §13 순서 자기모순·옛 번호 | index·V3-00·V3-10 | V3-10 = **각 단계의 gate**(단계 산출물→해당 절 gate→다음 단계)·구현 batch=**V3-11**·post-impl review=**V3-12** 명시 분리·옛 5문서 번호 전면 제거 | "각 단계의 gate"·V3-11/12 존재 grep | — |

## 4. Canonical data dictionary summary
`COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md` — §1 Join Key Contract(키 형식 표·관계도·R-K1~7) · §2 enum 15종(fact_type 정본 11 + RESERVED 3·status=M2 3값+lifecycle_state ext·severity/certainty·consent 3분해(scope[M2]/state/purpose)·retention TTL 파라미터화·attribution_mode·stitching·feedback/semantic_label/safety_flag/margin_band/reason_code) · §3 confidence/evidence(C_min 0.60·N_min 2) · §4 window 표(★Leo) · §5 fact 규율+safety lifecycle+AdverseSignalActionMatrix 등재 · §6 margin Option A · §7 consent/erasure/guest-merge/un-learning · §8 raw_text_stored · §9 참조 규율.

## 5. Safety consistency result
P1+P2+P3 정렬 후: safety fact 자동 강등 경로 **0**(INV-DB-2 예외 명문·SO-5 유지) · adverse 효력 정본 1곳(V3-07 §4.5 matrix) · tombstone 부활 경로 **0**(promotion 조회 선행 명문) · safety>commerce 5단 precedence·MAX·raise-only 기존 PASS 구조 무변경.

## 6. Join key consistency result
rec_v3_+ULID(26) 단일 · NULLABLE+attribution_mode 5값 · anonymous_ref end-to-end 유지+stitching state · order_item 단위 · refund/variant/bundle 규칙 정의 · 저장 소유 단일화(V3-03 얕은/V3-04 깊은/V3-09 읽기 전용). 형식 drift grep **0**.

## 7. DB invariant / COSMILE-4 result
COSMILE-4 이름 인용+원 3종 복원 계획(V3-08)·legacy-null 거짓 전제 정정·guest_ref 경로 invariant 추가·dual-read에 V1 실태(라벨뿐·파생 미결합·G3 이월) 명시·V3-10에 L1/L2/COSMILE-4 gate 3행. 실 복원 실행은 migrate deploy 전 gate(별도 승인).

## 8. Margin/cost policy result
**Option A(margin_band only)** — 세 문서(V3-04/05/09) 표현 일치·금액 margin superseded·모순 grep 0. 정확 line cost = pre-prod gate 이월.

## 9. Semantic extraction ownership result
V3-04 = feedback input/outcome 저장+추출 계약 소유 · V3-07 = safety semantic gate 소유 · AI 제안/deterministic 결정 분리 · raw 미저장. 고아 참조 0.

## 10. Consent/erasure lifecycle result
사전 §7 단일 lifecycle로 통일(V3-06 D3/상태표/E3 모순 해소)·un-learning(파생 회수+audit)·guest_to_user_merge(재평가 승계·safety 승계·allow_link=false 거부) 정의. 충돌 grep 0.

## 11. V1 provenance / L1 source contract result
**실제 패치 파일**: ① `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md` — front-matter 말미에 pointer 2줄(before: Option A 공식 line 19 무단서 / after: "[OPTION A IDENTITY SUPERSEDED — 2026-07-06 P11]" + 원문 보존 명시) ② `설계문서/foundation/FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_20260704.md` — 동일 방식("[OPTION A MINT SUPERSEDED…]") ③ 동일 pointer를 **foundation-control 원본** `docs/FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_20260704.md`에 동기화 ④ ENTRY_PACKAGE line 10 과대 표현 정정. **Option A 원문 보존 = 확인**(공식 라인 잔존 grep). V3 index/V3-00에 provenance(1e24c33·CLOSED_WITH_LIMITS·limit 3종 열거) 삽입.

## 12. Cross-reference/numbering result
11문서 메타 블록·실파일명 교정·죽은 참조 grep **0**·memory_context 최소화 계약 소유=V3-02 확정·index mission map에 사전+V3-11/12 행 추가.

## 13. Existing 5 mission reconciliation result
별첨: `COSMILE_MEMORY_V3_EXISTING_5_MISSION_RECONCILIATION_RESULT_20260706.md` — **M5 실명 확정: 'COSMILE-FOUNDATION-COMMERCE-LOOP'는 실존하지 않는 코드명 → 실제 = COSMILE AI Commerce Decision Loop v0.1**(112/112·foundation-control `cosmile_loop/`+eval). 5미션 전부 실제 evidence path+commit 앵커 명기·축별(Option B/postgres/service-local/boundary/safety-first) read-only 판정·계약 의존 항목은 2-pass 재판정 표기. V3-01 문서에도 앵커 반영.

## 14. Remaining limits
- ★Leo 확정 파라미터: C_min/N_min·window(14d/90d/180d/30d)·adverse threshold 세부·stitching consent UX·M6-G 정의(L2 — 이월 유지)·skin_condition_context 포함 여부.
- COSMILE-4 실 복원·정확 line cost(Option B margin)·secret_version 실 rotation = pre-prod/migrate-deploy gate(실행 별도 승인).
- RESERVED 필드 3종(price_sensitivity 등)은 수집 금지로 봉인 — 해제는 사전 개정으로만.
- ★**검수 독립성 주의**: 본 패치는 Fable review(`bd01ba1`)를 작성한 것과 **같은 세션이 Control 역할로 수행**했다. 델타 재검수는 자기검수 방지를 위해 **별도 독립 채널**(다른 Fable 세션/ChatGPT/Codex) 사용을 권고.

## 15. Fable delta review package path
`docs/reports/control/COSMILE_MEMORY_V3_FABLE_DELTA_REVIEW_PACKAGE_20260706.md`

## 16. Commit hash
본 커밋(아래 push 후 확정 — 커밋 메시지에 P1~P12 명시) + foundation-control 원본 동기화 커밋. 세부는 delta package §대상에 기재.

## 무결성
design-only · 문서 17건 수정+3건 신설 · 코드/DB 0 · prod/live/main merge 0 · 실 secret 0 · M6-G activation 0 · V3-11 구현 미착수·구현 지시 0 · 원문 삭제 0(superseded 표기) · Hard Stop 무접촉.
