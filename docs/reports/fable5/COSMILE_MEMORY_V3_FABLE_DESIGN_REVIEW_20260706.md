# COSMILE MEMORY V3 — Fable Final Independent Design Review

> 검증자: **Fable5** (구현 전 설계 리뷰·독립) · 2026-07-06 · **판정: DESIGN_NEEDS_PATCH**
> 대상: foundation-docs **`4e029d3`**(origin/main 조상 확인) — COSMILE_MEMORY_V3 11문서+index(2,784줄 전수 판독)
> 방법: 4축 적대 검수(상속/경계 · loop 계약 · safety/promotion · DB invariant/순서) + 전수 grep(Option A 부활·과대표기·boundary 침범) + V1 정본(Option B contract·M2·final review·closure 커밋)·Cosmile repo schema 실물 대조
> 무결성: read-only(수정 0·push 0은 본 리뷰만·실행 0) · 구현 검수 아님 · Hard Stop 무접촉

---

## 1. Final verdict: **DESIGN_NEEDS_PATCH**

**원칙 층은 승인 가능한 수준으로 견고하다** — Option B 상속 선언·Foundation boundary·safety>commerce 우선성·design-only 규율은 11문서 전체에서 일관되고, 경계 침범은 전수 grep에서 0건이다. 그러나 **계약 층의 내부 정합이 구현 지시서 수준에 미달한다**: join key 형식·fact_type/status enum·adverse 문턱·상호참조가 문서 간에 서로 모순되고(FAIL ~17건), 그중 1건(INV-DB-2)은 **safety fact를 자동 강등시키는 safety 약화 방향의 설계 충돌**이다. 전부 문서-레벨 패치로 해소 가능하므로 BLOCKER/HOLD가 아닌 NEEDS_PATCH다. §12의 패치 반영 전 V3-11 구현 batch 착수는 부적절하다.

## 2. Executive summary

- **잘된 것:** V1 CLOSED_WITH_LIMITS·"schema/validate 수준" 표기가 11/11 문서에서 흔들림 없이 유지(과대표기 0). Option A/FOUNDATION_SUBJECT_REF_SECRET는 ~30개소 전부 "미상속(superseded)" 부정문으로만 등장·V3-10이 재유입을 FAIL 조건으로 명문화. Foundation에 mint/durable/DB read/실행을 요구하는 문구 0. V3-02 19필드 raw/PII 유입 경로 0. safety>commerce는 선언이 아닌 **gate/불변식 수준**(5단 precedence·MAX·raise-only·adapter 하향 불가·margin이 adverse를 하향하는 경로 미발견). promotion은 의미=AI·정책=deterministic 원칙 준수. CLI-first는 실질 장치(분자/분모 동반·k-마스킹·SAFETY 0번 고정) 동반.
- **문제:** ① 계약 필드/enum이 문서 간 3자 불일치(loop가 계약상 연결 안 됨) ② V1 M2 fact 규율(SAFETY∩SINGLE·must_not_reappear·tombstone)이 통째로 미상속 ③ adverse 1건의 효력이 세 문서에서 서로 다름 ④ COSMILE-4가 이름·집합 수준에서 미해소 ⑤ 패키지 재편(5→11문서) 후 상호참조 미정리(체계적 drift) ⑥ **V1 closure 조건 L1이 정본 계약 파일에 실제로 미패치인데 ENTRY_PACKAGE는 "적용"으로 과대 기술** — V3가 이를 미인지.

## 3. Architecture review

Learning Commerce Memory Loop의 골격(consultation→rec→product→commerce event→revenue→feedback→MFC→promotion→개선)은 **적정 규모**다 — 과도한 신규 인프라 없이 V1 canonical 테이블+commerce extension으로 구성. 단 양방향 결함: **과잉** = 소비자 없는 수집 필드(brand_affinity/price_band·price_sensitivity·category_interest 등 — 생성 규칙·promotion 표·지표 어디에도 소비처 없음) / **부족** = 만족도·부작용 raw 신호→semantic_label 추출 계약이 **소유 문서 없이 고아 참조**(V3-06이 "V3-04 입력"이라 전제하나 V3-04는 저장 테이블만 정의), attribution 시나리오 3종(부분 환불·SKU 변형 재구매·repurchase의 rec 귀속) 미정의, 동일 상호작용(click/cart)이 3문서에 중복 기록되며 dedup/소유권 규칙 없음.

## 4. V1 inheritance review

- **원칙 상속 = PASS**: Option B 공식(subj_v2_/furef_v2_·`<SVC>_SUBJECT/FUREF_SECRET`)이 정본 계약·ENTRY_PACKAGE와 자구 일치. secret_version/zero-orphan/fail-closed crypto 계승. 부활 0.
- **세부 상속 = FAIL 3**: ① V3-02가 "canonical V1 테이블 재사용·재정의하지 않는다"고 선언하면서 **enum 4종(candidate status·consent_scope·retention_policy·sensitivity_level) 전부 M2와 조용히 상이**·ltm_fact 필수 필드(fact_state·직교 3-state·guest_ref·is_safety) 누락·canonical guest_ref 대신 anonymous_ref(anon_v3_) 병립 발명. ② **V1 M2 fact 규율 미상속**(SAFETY∩SINGLE active≤1·must_not_reappear·tombstone — 전 패키지 grep 0건) → 삭제된 fact가 fresh candidate로 부활하는 경로 열림. ③ **L1 잔존 미인지**: closure 커밋(ffb7d21)은 보고서 2건만 패치했고 정본 계약 파일 2건(`설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1`·`HARD_GATE`)은 Option A 공식을 pointer 없이 유지 — ENTRY_PACKAGE의 "M2/HARD_GATE 적용" 문구는 실제 패치 범위 대비 **과대**. V3 문서가 V1 정본 문서/커밋을 한 번도 인용하지 않아(provenance 0), 구현자가 canonical 계약 원문을 열면 Option A 공식을 현행으로 읽는 **상속 오염 경로**가 열려 있다.

## 5. Foundation boundary review — **침범 없음 (PASS)**

11문서 전수 grep: Foundation에 mint/durable memory/service DB read/추천 실행/학습 저장을 요구하는 문구 **0건**. loop 전 단계의 저장·소유 = Cosmile service-local 명시. Foundation 입력 = request-scoped minimized memory_context(허용/금지 목록 명문·raw_text_stored=False 4개 층위 일관). cross-schema 직접 참조 금지 유지.

## 6. Cosmile-first review — **타당 (조건 1)**

5가지 근거(결과 신호의 commerce 소재·SIASIU baseline 보호·기존 read-only loop v0.1 재사용·safety 계약 기존재·역할 경계) 전부 성립. **조건**: SIASIU 확장 시 identity bridge가 미정의 — subject_ref/furef가 서비스별 secret HMAC이라 cross-service join은 구조적으로 불가(V1 의도)인데, V3가 "SIASIU 확장 경로"를 말할 때 이 제약(각자 자기 loop·데이터 비공유)을 명시해야 함. index §12-1의 Leo 결정(read-only 참조 vs 별도 train)은 적절히 열려 있음.

## 7. Contract review — **FAIL 다수 (패치 핵심 영역)**

recommendation_id→product/SKU→order/revenue→feedback→MFC 흐름이 **계약상 연결되지 않는다**:
- **join key**: rec_id 형식이 V3-03(`rec_v3_`+32) vs V3-04(UUID/ULID) 불일치 — 1차 키 타입 붕괴. V3-03은 nullable FK(추천 없는 주문 대비) vs V3-04는 NOT NULL + 자체 `unattributed` mode 보유 — 자기모순으로 "추천 없이 직접 구매" 기록 불가.
- **identity**: V3-03의 subject_ref XOR anonymous_ref 불변식이 하류(V3-04 rec_outcome_event·V3-09)에서 **anonymous_ref 소실** — guest 여정·anon→로그인 stitching 미정의.
- **어휘**: fact_type enum 3자 불일치(V3-02/04/06 — 정확 일치 1개뿐)·candidate 상태 모델 충돌(V3-02 4-state vs V3-06 9-state vs V3-08 `long_term` 제3 어휘)·초안 수치 드리프트(confidence 0.6 vs 0.70·window 14d/90d vs 7d/60d·adverse_severity 3종 표기).
- **계산 가능성**: V3-09 지표가 정본 계약에 없는 필드(furef·sku·trace_id 등)로 정의 — furef+sku fallback 귀속·개인 집계가 상류 필드로 계산 불가. **margin 지표는 V3-05의 "원가 저장 금지" Hard Stop과 정면 모순**(스코프 미명시).

## 8. Safety review — **원칙 PASS · 정합 FAIL 3**

- **PASS**: safety>commerce가 규칙 수준으로 살아 있음 — 5단 precedence(하위가 상위를 뒤집기 불가)·adverse=true→strength 상승 불가·block→commerce 0·MAX 합성·raise-only·의료 단정 금지·"계속 써도 돼?" 분리 전부 V1 Foundation gate와 정합. margin이 adverse를 가중 하향하는 경로 미발견.
- **FAIL**: ① **adverse 1건의 효력이 3문서 모순** — V3-06 SO-1(severity 무관 즉시 safety_frozen+재추천 차단) vs V3-04 §5(severe/moderate만 즉시) vs V3-07 §7(단일 신호=low=caution 프레이밍만). 과잉(오보고 1건에 전 affinity 동결)과 과소(수집됐는데 미반영) 양방향 위험. ② **V3-08 INV-DB-2가 V3-06 SO-1~5와 정면 충돌** — "evidence 문턱 미달 long_term은 candidate로 강등"을 무예외 DB invariant로 정의해 **문턱 없이 활성화된 adverse safety fact를 자동 강등**시키는 safety 약화 경로(SO-5 "어떤 규칙도 우회 불가"와 모순 — **최우선 패치**). ③ consent 철회 후 fact 운명 자기모순(V3-06 D3 "유지+재사용 정지" vs 상태표/E3 "즉시 deleted") + un-learning(승격 fact 삭제 시 파생 효과 회수)·guest→user 병합 시 승격 이력 처리 전 패키지 미정의. M6-G는 index가 Leo 결정으로 명시했으나(인지 PASS) 정작 gate 설계 본문(V3-06/07)에 0회 등장.

## 9. DB invariant review — **불충분 (FAIL 2·RISK 3)**

- **COSMILE-4 미해소**: V3-08의 "baseline invariant 3종"(INV-DB-1/2/3)은 V1 final review COSMILE-4가 지목한 3종(schema 주석이 raw-SQL enforced라 주장하나 baseline migration에 없는 제약)과 **다른 집합** — COSMILE-4 인용 0건·SubjectRefMap partial unique 1건만 커버·LTM active partial-unique 등 잔여 미복원.
- INV-DB-2 safety 충돌(§8) · invariant 쿼리의 필드/enum이 canonical schema·V3-02·V3-06과 3중 불일치 · secret_version "legacy null" 전제가 실물(NOT NULL DEFAULT 1)과 다른 **거짓 전제** · dual-read 설계가 V1 실태(라벨뿐·파생 미결합·G3 이월)를 현재 gap으로 미명시 · guest_ref-only 행이 identity invariant 사각지대.
- **PASS**: sqlite 잔재 정리(격리 디렉터리 실재 확인)·migrate deploy pre-gate(G1~G12·STOP·rollback)·provider-independent vs DB-touch 2층 분리는 실행 가능한 계획.

## 10. Analytics review — **방향 PASS · 보강 2**

CLI/Markdown-first는 실질 장치(재현 헤더·분자/분모·0/결측 구분·margin_coverage·k-마스킹·SAFETY 0번 고정)를 동반해 dashboard-first 함정을 실제로 회피. 보강 필요: ① adverse가 count뿐 — **rate(분모: 귀속 paid 주문/노출)** 부재로 기간/SKU 비교 왜곡 + safety suppression 효과 검증 지표 부재(loop의 safety 측 검증 필요조건 미달) ② 지표 계산 가능성(§7 — 정본 계약에 없는 필드 의존·margin/원가 모순).

## 11. Existing 5 mission reconciliation recommendation

**"정합 먼저"(index §13)는 조건부 타당** — V3-01 분류의 지배 축(Option B 정합·service-local·boundary·safety-first)은 V3 계약과 무관하게 지금 판정 가능하고, 기존 미션(특히 event tracking spec의 실 필드 목록)이 V3-02/03/04 계약 확정에 실질 입력을 준다. **권고 순서: §12 설계 패치(문서-only)와 V3-01 read-only 정합을 병행 → 계약 재확정 → 델타 재검수.** 단 착수 전 2건 고정: ① V3-01의 M5 미션 코드 `COSMILE-FOUNDATION-COMMERCE-LOOP`는 어디에도 없는 명칭(실제 = COSMILE AI Commerce Decision Loop v0.1 추정) — 5개 미션 전부 원본 문서 경로 앵커 명기 ② NEEDS_V3_PATCH 판정 중 계약 의존 항목은 계약 패치 후 2-pass 재판정 허용.

## 12. Required design patches before implementation (전부 문서-레벨)

| # | 패치 | 심각도 |
|---|---|---|
| **P1** | **INV-DB-2에 safety-fact 예외**(V3-06 SO-1~5와 정합화 — safety fact는 evidence 문턱 강등 대상 아님) | **최우선(safety 약화 방향)** |
| **P2** | adverse 1건 효력 단일화(V3-04/06/07 — severity·certainty 축으로 SO-1 정렬·확정은 Leo) | 높음 |
| **P3** | V1 M2 fact 규율 상속 절(SAFETY∩SINGLE·must_not_reappear·**tombstone 부활 금지** — promotion R-C1에 tombstone 조회 선행) | 높음 |
| **P4** | join key 정합: rec_id 형식 단일화·nullability(unattributed 허용)·anonymous_ref 하류 전파 or 명시 종료·부분 환불/SKU 변형/재구매 귀속 정의 | 높음 |
| **P5** | 어휘 단일 정본화: fact_type·candidate status·consent/retention/sensitivity enum + 초안 수치 통일 — **데이터 사전 문서 1개** 신설, canonical M2와의 관계("재사용" vs "V3 확장 재정의") 명시 | 높음 |
| **P6** | 상호참조 전면 재매핑(11문서·존재하지 않는 참조 제거·memory_context 최소화 계약의 소유 문서 확정) | 중 |
| **P7** | COSMILE-4 명시 해소(V3-08에 이름 인용+원 3종 복원 계획) + V3-10 checklist에 L1/L2/COSMILE-4 gate 항목 추가 | 중 |
| **P8** | margin/원가 모순 해소(V3-05 금지 스코프 vs V3-04/09 margin 계산 — 버킷 기반인지 라인 원가인지 결정·Leo) | 중 |
| **P9** | 만족도/부작용 semantic 신호추출 계약의 소유 문서 지정(라벨 enum·트리거·AI semantic/deterministic 분리) | 중 |
| **P10** | consent 철회(D3 vs E3)·erasure un-learning·guest→user 병합 승격 이력 일관화 | 중 |
| **P11** | **L1 실제 완결**: 정본 계약 파일 2건에 supersede pointer + ENTRY_PACKAGE "적용" 표현 정정 + V3 문서에 V1 정본 provenance 인용 | 중(정직성) |
| **P12** | index §13 순서 자기모순 해소(V3-10 검수를 구현 성격 단계 뒤가 아니라 각 단계 gate로) + V3-00 형제 번호 갱신 | 낮음 |

## 13. Recommended next step

1. **P1~P12 설계 패치 batch**(문서-only·Hard Stop 무접촉) — P1/P2/P3(safety 정합)를 최우선으로.
2. 병행: **V3-01 read-only reconciliation**(M5 명칭 앵커 고정 후·5 미션 원본 경로 명기).
3. 패치 후 **Fable 경량 델타 재검수 1회**(P1~P12 반영 + join key/enum 시뮬레이션) → DESIGN_APPROVED(_WITH_LIMITS) 기대.
4. 그 다음 V3-10 pre-implementation gate → (통과 시) V3-11 구현 batch — 지금 구현 착수는 부적절.

---

## 12개 질문 요약 답변

| # | 질문 | 답 |
|---|---|---|
| 1 | 문제 정의 정확? | 대체로 예 — 단 V1 limit 3종을 이름으로 미인용·L1 잔존 미인지 |
| 2 | Option B 상속 정확? | 원칙 예 / 세부 아니오(enum 4종·fact 규율 미상속·provenance 0) |
| 3 | Foundation boundary 침범? | **없음**(전수 grep 0) |
| 4 | Cosmile-first 타당? | 예(SIASIU identity bridge 제약 명시 조건) |
| 5 | loop 과부족? | 골격 적정·과잉(소비자 없는 필드)과 부족(신호추출 계약·귀속 시나리오) 동시 |
| 6 | rec_id→…→MFC 충분? | **아니오**(join key 형식/nullability/anon_ref/귀속 결함 — P4) |
| 7 | promotion/demotion 안전? | 결정론 구조 예 / tombstone 부활·M2 규율 미상속으로 아니오(P3) |
| 8 | safety > commerce? | **예 — gate 수준으로 설계됨.** 단 모순 3건 정리 필요(P1/P2/P10) |
| 9 | DB invariant 충분? | 아니오(COSMILE-4 미해소·INV-DB-2 충돌·enum 불일치 — P1/P7) |
| 10 | analytics minimum 적합? | 방향 예(CLI-first 실질) / adverse rate 분모·계산 가능성 보강 |
| 11 | 구현 전 필수 보강? | **있음 — P1~P12**(전부 문서-레벨) |
| 12 | reconciliation 순서? | 설계 패치와 **병행**(정합 먼저 조건부 타당·M5 앵커 고정 선행) |

## 무결성

design review only · 코드/DB/문서 수정 0 · push 0(본 리뷰만) · 실행 0 · Hard Stop 무접촉 · 구현/live/prod 승인 아님. 본 판정은 V3-11 구현 batch 착수 승인이 아니며, P1~P12 반영 후 델타 재검수를 전제로 한다.

---
> **한 줄 결론:** 설계의 뼈대와 안전 원칙은 옳다 — 그러나 열한 장의 설계도가 서로 다른 자를 쓰고 있다(키 형식·어휘·문턱·번호). 자를 하나로 맞추고(P4/P5/P6), 안전 규칙끼리 싸우는 곳(P1/P2)을 화해시키고, V1에서 가져와야 할 규율(P3)과 못 끝낸 숙제(P11)를 마저 가져온 뒤에 못질을 시작하라.
