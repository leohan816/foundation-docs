# DUAL-SERVICE-ADAPTER-01 — Implementation Directive (SIASIU + Cosmile) · 지시문 초안

> 작성: SIASIU · ★구현 지시문 *초안* (Leo 승인 후 각 플랫폼 담당 발송) · 이번 미션 = 초안만·코드 수정 0
> ★명칭: SIASIU(정본)·`shashu` 금지. 설계 정본: `.../DUAL_SERVICE_ADAPTER_ARCHITECTURE_20260701.md` · test: `.../DUAL_SERVICE_ADAPTER_TEST_MATRIX_20260701.md`
> 전제: Foundation `consult_contract(ssc)->frc` 존재(Phase B CLOSED `98c852b`). ★Foundation 판단 로직 수정 금지.

---

## A. SIASIU 구현 지시 (SIASIU 담당 에이전트)
```
[DUAL-01 · SIASIU Adapter] Foundation 연동 parallel path (standalone 유지)

목표: SIASIU에 Semantic Adapter/Response Adapter + Foundation 연동 *parallel path* 추가. ★기존 standalone(brain.chat) 유지·삭제 0.

흐름(신규 parallel):
 고객질문 → SIASIU Semantic Adapter(raw→SSC·service_context) → Foundation /v1/consult_contract → FRC
          → decide_response_mode(FRC·default consult) → SIASIU Response Adapter → 상담/안전(/필요시 판매) 응답
동시 유지(기존): 고객질문 → brain.chat → 기존 응답 (parallel·비교 가능)

허용 파일(SIASIU repo 내):
 - (신규) app/adapters/siasiu_semantic_adapter.* · siasiu_response_adapter.* · foundation_client.* (thin helper)
 - (신규) parallel path 진입점(기존 /api/chat 옆에 shadow/parallel 플래그·기존 응답 불변)
 - eval/test(공통 contract test·parity·fallback)

금지:
 - ★기존 brain.chat/standalone 상담 코드 삭제·수정으로 기존 응답 변경 (parallel 추가만)
 - Foundation 코드 수정 · Cosmile 수정 · 대형 shared SDK
 - Foundation safety 우선 약화 · products_allowed=false인데 CTA/추천 노출 · service voice를 Foundation SSC/판단에 주입
 - push

thin helper(SIASIU 내부·작게): create_base_ssc()·normalize_locale()·validate_service_mode()·call_foundation_contract()·decide_response_mode()·enforce_response_suppression()

Response Adapter 규칙:
 - FRC.answer_substance를 SIASIU 목소리(따뜻한 상담사)로 마사지. ★Foundation decision/safety/products 전복 0·근거 밖 claim 0.
 - response_mode_final: safety_first/block → safety_mode(중단/확인 프레이밍). products_allowed=false → 판매 CTA 억제. recommendation_allowed=false → 추천 카드 억제.
 - default consult_mode. 추천 필요 시 commerce_mode 가능(단 safety 우선).

fallback/shadow/parallel:
 - Foundation 호출 실패/타임아웃 → standalone(brain.chat) fallback(★safety는 fail-closed·상담 지속). 
 - 초기 = shadow(기존 응답 노출·Foundation 결과는 비교/로깅) → parity·safety 확인되면 parallel 노출 검토(Leo 승인).

완료 기준: parallel path 동작·standalone 불변·공통 contract test/parity/fallback 통과·Foundation/Cosmile 미수정·push 0.
완료 보고: §D 양식.
```

## B. Cosmile 구현 지시 (Cosmile 담당 에이전트)
```
[DUAL-01 · Cosmile Adapter] Foundation 연동 shadow/parallel (Mock Brain 유지)

목표: Cosmile에 Semantic Adapter/Foundation Client/Response Adapter + commerce UX 연동. ★기존 Mock Brain 유지·즉시 삭제 0.

흐름(신규 shadow/parallel):
 고객질문 → Cosmile Semantic Adapter(raw_text + product/session context 포함 SSC) → Foundation /v1/consult_contract → FRC
          → decide_response_mode(FRC·default commerce) → Cosmile Response Adapter → commerce/consult/safety 응답·상품카드/CTA/구매버튼 제어
동시 유지(기존): 고객질문 → Mock Brain → 기존 쇼핑몰 응답 (parallel·비교 가능)

허용 파일(Cosmile repo 내):
 - (신규) src/adapters/cosmileSemanticAdapter.* · cosmileResponseAdapter.* · foundationClient.* (thin helper)
 - (신규) shadow/parallel 진입점(기존 Mock Brain 옆·기존 UX 불변)
 - eval/test(공통 contract test·parity·fallback)

금지:
 - ★기존 Mock Brain 삭제 · 기존 쇼핑몰 응답 변경(shadow/parallel 추가만)
 - Foundation 코드 수정 · SIASIU 수정 · 대형 shared SDK
 - ★FRC.safety_first인데 상품카드/구매 CTA 노출 · products_allowed=false인데 상품카드 · recommendation_allowed=false인데 추천 문구/카드
 - 판매형이 safety를 우선 · Foundation safety 약화 · service voice를 Foundation SSC에 주입
 - push

Response Adapter 규칙(commerce):
 - FRC.answer_substance를 Cosmile 커머스 목소리로 마사지 + 상품카드/CTA는 **FRC 허용 시에만**.
 - ★safety_first/block → safety_mode: 상품카드/구매 CTA **숨김**·중단/확인 프레이밍.
 - products_allowed=false → 상품카드 금지 · recommendation_allowed=false → 추천 문구/카드 금지.
 - 이상반응/성분 설명/피부 고민 → consult_mode 또는 safety_mode 가능.
 - product_candidates(refs)만 사용·Foundation이 안 준 제품/claim 생성 0.

fallback/shadow/parallel:
 - Foundation 호출 실패/타임아웃 → Mock Brain fallback(★단 safety 질문은 fail-closed·상품 노출 금지). 
 - 초기 = shadow(기존 UX 노출·Foundation 결과 비교/로깅) → parity·safety 확인되면 parallel/실노출 검토(Leo 승인·MOCK BRAIN 해제는 별도).

완료 기준: shadow/parallel 동작·Mock Brain 불변·상품카드/CTA가 FRC 규칙 준수(safety 시 숨김)·공통 contract test/parity/fallback 통과·Foundation/SIASIU 미수정·push 0.
완료 보고: §D 양식.
```

## C. Foundation 변경 금지 범위
- ❌ consult_contract/judge/policy/severity/safety/enforcement/verify *로직* 수정 · SSC/FRC 스키마 임의 변경 · product rail 완화 · fail-closed 약화.
- ✅ 이번 미션 Foundation = *그대로 사용만*. 공통 contract 변경이 필요하면 → Control 구현 + SIASIU+Cosmile 영향 검토 + **Leo/GPT 승인 전 변경 금지**(별도 미션).

## D. 완료 보고 양식 (각 플랫폼)
1. 신규 파일·함수(절대경로) · 2. parallel/shadow 진입점 · 3. Semantic Adapter(raw→SSC) 설계 · 4. Foundation Client 호출 · 5. Response Adapter(FRC→목소리·mode) · 6. decide_response_mode/suppression 구현 · 7. fallback(실패 시)·safety fail-closed · 8. 공통 contract test/parity/fallback 결과 · 9. ★기존 코드(standalone/Mock Brain) 불변 증거 · 10. Foundation/타서비스 미수정 증거 · 11. FRC suppression 준수(safety→CTA/카드 숨김) · 12. push 0 · 13. 상태: CLOSED/PARTIAL/OPEN.

## 운영 방식 (fallback / shadow / parallel)
- **shadow**: 기존 응답 노출·신규(Foundation) 결과는 *비교/로깅만*(사용자 미노출). 최초 단계.
- **parallel**: 신·구 경로 둘 다 실행·비교. parity/safety 확인용.
- **fallback**: Foundation 실패 시 기존 경로. ★단 safety 질문은 fail-closed(제품/CTA 금지).
- 실노출 전환·기존 코드 제거·Cosmile MOCK BRAIN 해제 = 전부 **Leo 승인 별도 게이트**.

## ★패치 반영 (구현 필수 규칙)
**[패치 1] fallback safety wrapper**: Foundation 실패로 fallback(standalone/Mock Brain)을 써도 — **raw_text 또는 service-side safety detector가 safety 의심을 감지하면 fallback 응답을 반드시 safety_mode로 제한**. fallback에서도 products_allowed=false·recommendation_allowed=false·상품카드/CTA 숨김·추천 문구 금지·"계속 사용 허가" 금지·구매 유도 금지. ★**Cosmile Mock Brain fallback에서도 safety 의심 시 상품/CTA 노출 금지**.
**[패치 2] 비교 대상 vs 안전 기준**: standalone/Mock Brain 비교는 *regression/shadow용*. safety 충돌 시 **최종 기준 = Foundation FRC**. 기존 경로 pass·FRC safety_first/block/caution → **FRC 따름**.
**[패치 3] mode 책임**: `service_mode_requested`=서비스가 SSC에 넣는 요청 · `response_mode_final`=각 Response Adapter가 FRC+기본값으로 결정. ★단 `final_strategy=safety_first`·`safety_gate_result=block`·`products_allowed=false`·`recommendation_allowed=false`는 **Response Adapter가 절대 무시 불가**.
**[패치 4] thin helper 위치**: Phase 1은 thin helper를 **SIASIU/Cosmile 각 repo 안에 각각**. ★shared SDK/package 신설 금지. 추출은 *동일 코드 반복 + 변경요구 동일 + 서비스 차이 없음* 3개 동시 확인 시에만.

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 구현은 Leo 승인 후·각 플랫폼 담당. 코드 수정 0·commit 0·push 0.
