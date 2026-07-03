# Cosmile Product-Grounded Consultation + Web Learning Loop v0.3 — 설계서 — 2026-06-30

> ★design-first(`CLAUDE.md §2.6`). **설계자료 작성 단계** — 아직 Cosmile 코드는 구현하지 않는다.
> Cosmile AI 상담을 "preset scenario 버튼" → **실제 catalog 기반 자유 상담**으로 확장.
> 모르는 일반 지식은 web lookup → 출처와 함께 learning candidate 저장 → 유사 질문에서 재사용. **실 서버에서 테스트.**
> ★Cosmile Mall 전체 개편이 아니다. 몰 홈/상품상세/실 cart·order·payment·고객 DB·checkout/order/customer schema는 **무수정**.
> 근거 인벤토리(read-only): Cosmile catalog(`foundationProductClient`·28 ELT 제품) · vertical slice(`api/slice`·consultation client) · Foundation KR(`foundation_knowledge_runtime.decide`).

## 1. 목적
- 자유 상담(free chat)에서 **Cosmile catalog에 실제 존재하는 제품으로만** 추천하고, 성분/피부 지식은 **내부(Foundation KR + learning store) 우선·부족 시 web lookup**으로 보강하며, web 결과를 **출처·confidence와 함께 learning candidate로 저장**해 **유사 질문에서 재사용**하는 v0.3 loop를 설계한다.
- 작업 범위 = **AI 상담 진입점 · read-only catalog adapter · consultation/search/learning loop**. (몰 구조·실 write 경로는 건드리지 않는다.)

## 2. 사용자 의도 해석
| 사용자 의도 | 설계 반영 |
|---|---|
| 자유롭게 제품/피부/성분/구매 질문 | free-text chat 진입점(scenario 버튼 의존 제거, 버튼은 보조) |
| 답변·추천은 실제 존재 제품 한정 | **product-grounded**: 추천 후보 = `foundationProductClient` catalog only |
| 모르는 일반 지식은 web에서 | internal-first → 부족 시 `WebLookupPort` |
| 찾은 지식은 출처와 함께 저장 | web 결과 → source/URL/검색일시/요약/confidence 포함 **learning_candidate** |
| 같은/유사 질문에서 재사용 | shadow learning store reuse(출처·confidence 표시, **canonical 아님**) |
| 전체 루프를 실 서버에서 테스트 | dev/staging 서버에서 free-chat + web→learn→reuse 테스트(real write 0) |

## 3. Scope
- Cosmile repo-local(후속 구현): **read-only catalog adapter**, **free-chat consultation 파이프라인**, **web lookup interface + provider(real or mock)**, **shadow/local learning store**, **learned reuse**, **safety/medical gate 재사용**.
- foundation-control(이번): 본 설계서(+JSON)만.

## 4. Out of scope
- 몰 홈/상품 상세/검색몰 UI 개편 · 실제 cart/order/payment · 고객 DB · checkout/order/customer schema.
- catalog 제품 DB write(제품은 immutable reference) · Cosmile-owned commerce write(SKU/Offer/Listing).
- **Foundation canonical/learned promotion**(정식 학습 승격) → **후속 release train**(v0.1 dry-run only).
- 실 web provider의 프로덕션 운영(키/쿼터/약관) — v0.3는 dev 테스트 범위.

## 5. Role boundary
- **Cosmile:** commerce shell + 상담 진입점. catalog **read-only 소비**, 추천 UI, web lookup **호출**, shadow learning store **운영(dev)**. ★고객 성향 해석/ Foundation memory 저장 0(candidate 생성 금지 — 기존 slice role boundary 유지). ★**client-side text 휴리스틱 분류 금지**(Foundation/구조화 분류 사용).
- **Foundation:** 제품 정의·지식 판단·grounding/evidence·safety gate·learning 승인 워크플로의 **owner**. 분류/지식결정/learning 승인은 Foundation 책임(`decide`·`m6_gate`·`learning_approval_workflow`).
- **foundation-control:** 계약·설계·검증. 구현은 Cosmile repo-local(승인 후) + Foundation 변경 필요 시 별도 plan.

## 6. Data boundary
- Foundation으로 가는 것: **구조화 질의 + RetrievalHit(record_id/source_ref/provenance_ref/source_tier/review_status/content_hash, ★raw_text 불가)**. **raw 상담 원문·PII 저장/전송 0.**
- shadow learning store: **요약/source/URL/검색일시/confidence/content_hash만**. raw 원문 본문·PII 0. **memory.db 금지**(JSONL/in-memory/file만).
- 구매 연결: 기존 slice의 mock/shadow 경계 재사용(real write 0).

## 7. Existing product catalog read-only boundary
- 진입은 **단일 인터페이스** `CatalogReadPort`(기존 `foundationProductClient` 래핑): `getProduct(id)` · `listProducts(opts)` · `searchProducts(q, filter)`(name/brand/category/ingredient atomId) · `getBrand/listBrands`. **전부 read-only.**
- 제품 데이터는 `mockFoundationProducts.ts`(28 ELT, immutable). ★제품 table/필드 **write 0**, schema 변경 0. `DISPLAYED_BRANDS` 필터 존중.
- catalog write 경로(CommerceSku/Offer/ProductListingConfig)는 **이 loop에서 접근 금지**.
- FoundationProduct 필드(id/brand/name/category/spec/benefits/ingredients(atomIds)/claims/skinType/cautions/brandClaims(unverified)/knowledgeStatus) → 추천·grounding 근거로 read만.

## 8. Product-grounded recommendation policy
1. 추천 제품은 **반드시 catalog에 존재**(`CatalogReadPort`에서 resolve된 productId). catalog에 없으면 **추천하지 않는다**.
2. 제품명이 불명확 → 먼저 **후보 제품 제시**(searchProducts 결과 카드) 또는 **추가 질문**(ask_more). 임의 추천 금지.
3. 추천은 Foundation 판단(`decisionType`/`evidenceMode`/`safetyGateResult`)을 **그대로** 따른다 — grounded+pass만 직접 추천(기존 slice 정책 재사용). 근거 부족 → hold/ask_more.
4. `brandClaims`(unverified)는 **검증되지 않은 주장으로 표시**, 단정 금지.

## 9. Free chat query pipeline
```
free-text 입력
  → [intake] PII 마스킹/길이 검사(서버) — raw 원문 Foundation 미전송
  → [classify] Foundation 구조화 분류(product/ingredient/skin/purchase/safety intent)  ※Cosmile 키워드 파싱 금지
  → [route]
       product-intent  → CatalogReadPort.search → 후보 → Foundation judge(grounded면 추천, 모호면 ask_more)
       knowledge-intent→ KnowledgeLookupPort(internal-first: Foundation KR decide + shadow learning read)
                          └ 내부 부족 → WebLookupPort → external RetrievalHit → Foundation decide(mixed) → learning_candidate 저장
       safety-intent   → safety/medical gate(아래 §16) 우선
  → [respond] decisionType/evidenceMode/safetyGateResult + 출처/ confidence(있으면) 표시
```
- 새 진입: 기존 `FoundationConsultationRequest`에 **`scenario:"free"` + `freeText`** 추가(또는 `/api/slice/consult` 확장). 응답 스키마(`FoundationConsultationResponse`)는 **재사용**(decisionMapping/RecommendationCards 무변경).
- v0.3 provider: **실 서버 테스트 가능한 Foundation consultation provider**(real bridge) 또는 **deterministic mock provider**(분류·지식 결정 시뮬레이션). 둘 다 interface 뒤.

## 10. Product/ingredient/skin intent classification
- ★**no-heuristics**: Cosmile에서 정규식/키워드로 의도를 추측하지 않는다(CLAUDE.md §5 + 인벤토리 "Cosmile forbids client-side text parsing").
- 분류는 **Foundation 구조화 분류**(structured intent: `{intent, product_refs?, ingredient_refs?, skin_attrs?, risk_signal?}`) 또는 그 구조 출력에 대한 **결정론 정책**으로 수행. v0.3 mock provider는 이 구조를 **deterministic fixture**로 반환(server test 재현성).
- 분류 결과가 unknown/모호 → **fail-closed**(ask_more / cannot_determine), 임의 추천 금지.

## 11. Product retrieval strategy
1. `searchProducts(q)`: name/brand `.includes` + category exact + (가능 시) ingredient atomId 매칭 → 후보 set(DISPLAYED_BRANDS 필터).
2. 후보 0개 → "해당 제품을 취급하지 않아요" + 대안 카테고리 안내(추천 아님).
3. 후보 1개 + grounded → 직접 판단. 후보 다수/모호 → **후보 카드 제시 + 선택/추가질문**.
4. 검색은 in-memory(28제품). ★확장(full-text/DB index)은 후속(scope 밖).

## 12. Web lookup policy
- **internal-first**: Foundation KR(`decide`) + shadow learning store에서 **먼저** 찾는다. 충분(grounded/cautious + 무충돌)하면 web lookup 안 함.
- 내부 부족(uncertain/cannot_determine)일 때만 `WebLookupPort.search(query)` 수행. provider: **real(서버 테스트 가능)** 또는 **mock**(둘 다 interface 뒤, DI 교체).
- web 결과 → `foundation_retrieval_hit_contract`로 **정규화**: `source_tier="external"`, `review_status="raw"`, `source_layer="external"`, `source_ref=URL`, `provenance_ref`, `content_hash`(★raw_text 미저장). 
- 정규화 hit를 Foundation `decide(query, hits=internal+external)`에 전달 → answer_mode 결정(external/unknown tier는 **cautious 상한**, 단정 금지).
- ★web 결과를 **즉시 canonical truth로 승격하지 않는다**(§14).

## 13. Source citation policy
- 모든 web-derived 지식은 **출처 표기 필수**: `{source_name, url, retrieved_at(검색일시), summary, confidence, source_tier, provenance_ref?}`.
- 답변에 **인용(citation) + confidence + "검증 전(shadow/external)" 라벨** 표시. 은폐 금지.
- evidence는 Foundation `evidence_packet.source_refs/provenance_refs` 모델 재사용(별도 스키마 신설 최소화).

## 14. Learning candidate policy
- web 결과는 **`learning_candidate`(origin="web_search")** 또는 **`shadow_learned_knowledge`**로 저장 — **canonical/learned 아님**.
- 저장 위치: **shadow/local learning store**(JSONL/in-memory/file). ★**memory.db 금지** · Foundation canonical store write 금지.
- 저장 필드: `{candidate_id, query_norm, intent, summary, source_name, url, retrieved_at, confidence, source_tier="external", review_status="raw", content_hash, origin="web_search", risk_level, answer_type, raw_text_stored=false}`.
- 승격(candidate→approved_for_reuse→learned/canonical)은 **Foundation learning_approval_workflow** 책임이며 **v0.1 dry-run only**(auto-promotion 없음). v0.3는 candidate 저장 + dry-run propose까지만, **정식 승격은 후속 release train**.
- 고위험(medical/pregnancy/adverse/금기) 후보는 tier1+provenance+reviewed 없이는 cautious 초과 불가(보수적, by design).

## 15. Learned knowledge reuse policy
- 재사용 후보: shadow store의 항목 — v0.3에서는 **출처·confidence·"shadow/검증 전" 라벨과 함께** 재사용한다(Foundation reuse_gate 정신: candidate auto-reuse 보수적).
- 재사용 시 **항상 출처·confidence 표시**, canonical인 것처럼 단정 금지. 고위험 지식은 reviewed 전엔 cautious로만.
- privacy_sensitive/customer-specific 지식 재사용 금지(본 loop는 일반 지식만; 고객 memory와 분리).
- 동일/유사 질문 매칭: `query_norm`(정규화) + intent + ingredient/skin key. 충돌(conflict)시 Foundation conflict_detector 정신으로 cautious 표기.

## 16. Safety / medical guardrail
- 의료/치료/임신/이상반응/금기 intent → **강한 safety gate**: Foundation `medical_boundary_guard`(고위험 → cautious 상한) + `trust final_guard`(evidence_boundary·safety_caveat·medical_overreach·purchase-without-evidence).
- `safety_gate_result=block` → **구매로 연결하지 않는다**(기존 slice UX v1.1 hard stop 재사용: 담기/checkout 차단, override 0).
- web-sourced 의료 지식은 tier1+provenance 없이는 grounded/assertive 불가(cautious only) — 위험 단정 차단.
- 위험 신호 있으면 **전문가 상담 안내** 우선, 구매 유도 금지.

## 17. UI / UX requirements
- **free-text 입력 우선**(채팅), scenario 버튼은 보조 제안(기존 `VerticalSliceFlow` 확장, 5/5 smoke 경로 유지).
- 답변 카드: decision badge(기존 `DecisionBadge`) + 추천 제품 카드(catalog only, 기존 `RecommendationCards`) + **출처/confidence/"shadow·검증 전" 라벨**(web-derived 시).
- do_not_recommend/do_not_buy(비-block) → 기존 **확인 모달**(`ConfirmModal`) 재사용. block → hard stop.
- dev/staging banner(`ShadowBanner`) 유지. 제품 불명확 → 후보 카드/추가질문.
- ★기존 컴포넌트 **확장·재사용**(갈아엎기 금지).

## 18. Test plan (실 서버 테스트 포함)
1. **기존 vertical slice 5/5 smoke 유지**(`smoke-commerce.mjs`/slice demo) — 회귀 0.
2. **product-grounded free chat 테스트:** 자유질문 → catalog-한정 추천(비-catalog 추천 0), 모호 시 후보/ask_more, grounded+pass만 직접추천. (서버 기동 후 `/api/slice/consult` free 경로.)
3. **web→learn→reuse 테스트:** 내부부족 질문 → WebLookupPort(real/mock) → learning_candidate 저장(출처/url/검색일시/confidence) → **다음 동일/유사 질문에서 shadow 재사용**(출처·confidence 표시) PASS.
4. **safety 테스트:** 임신/이상반응/금기 → safety gate block → 구매 비연결(hard stop). web 의료지식 cautious 상한.
5. **불변식(각 테스트):** real order/payment/customer DB write 0 · catalog write 0 · memory write 0 · raw/PII 0 · production disabled · schema 변경 0.
6. control-side: foundation-control가 위 흐름을 mock provider로 묶은 e2e harness로 독립 재검증(별도).

## 19. Regression plan (보존)
- vertical slice loop100(1377/0) · Cosmile readiness **164/164** · Decision Loop v0.1 **112/112** · Foundation runner **89/89** · SIASIU **39/39+119/119** · control loop tests **23/23** · **answer.py fingerprint `d7f579443f8a110a` 불변** · `tsc --noEmit` PASS.
- 본 loop는 **additive**(flag OFF면 기존 동작 불변) → 기존 테스트 변경/삭제 0.

## 20. Rollout plan
- **flag default OFF**: `NEXT_PUBLIC_COSMILE_FREECHAT_ENABLED`(+ web/learning sub-flags) — dev/staging only, **production 무조건 OFF**(기존 flag 패턴 재사용).
- 단계: (a) read-only catalog adapter + free-chat(mock provider) → (b) WebLookupPort(mock→real dev) + shadow learning store → (c) reuse → (d) 실 서버 dev 테스트.
- **후속 release train(별도 승인):** Foundation canonical/learned 정식 승격 · 실 web provider 운영(키/약관/쿼터) · 다고객/스케일 검색 인덱스.

---

## 핵심 정책 (요약 — 위반 금지)
- 추천은 **catalog 존재 제품만**; 없으면 추천 안 함. 불명확 → 후보 제시/추가질문.
- 지식은 **internal(Foundation KR + learning store) 먼저**, 부족 시 web. web 결과는 **출처/URL/검색일시/요약/confidence** 동반 저장.
- web 결과 **즉시 canonical 승격 금지** → `learning_candidate`/`shadow_learned_knowledge`(local/shadow).
- 학습 지식 재사용은 **출처·confidence 표시**, 단정 금지.
- 의료/치료/임신/이상반응/금기 → 강한 safety gate, 위험 시 **구매 비연결**.

## 오늘 가능한 v0.3
- Cosmile repo: read-only catalog adapter(foundationProductClient 래핑) · WebLookupPort(real-testable or mock provider) · shadow/local learning store · free-chat 파이프라인 · reuse.
- 정식 Foundation canonical learning = **후속**.

## 금지
기존 몰 구조 수정 · 실 결제/주문/고객 DB write · real customer memory write · raw 상담 원문 Foundation 저장 · PII 저장/전송 · production live · catalog 제품 DB write · checkout/order/customer schema 변경 · memory flag default ON · memory.db 생성 · Foundation canonical/learned 승격 · push · force push.

## 승인 조건
- 설계서 20섹션 존재 · JSON valid · 제품 repo 변경 0 · secret/PII 0.
- (구현 검증 시) 기존 vertical slice **5/5 smoke 유지** · product-grounded free chat 테스트 PASS · **web lookup→learning candidate 저장→다음 질문 재사용 테스트 PASS** · real write 0 · raw/PII 0 · production disabled · catalog write 0.
- ★승인 근거: Leo APPROVED(본 설계서 채택) 후에만 Cosmile repo-local 구현 착수.

## 다음 implementation prompt (초안 — 승인 후 Cosmile repo-local)
> **Cosmile Product-Grounded Free Chat + Web Learning Loop v0.3 (shadow/dev)**: `CatalogReadPort`(foundationProductClient read-only 래핑) · `KnowledgeLookupPort`(internal-first) · `WebLookupPort`(real/mock provider, external RetrievalHit 정규화) · `LearningStorePort`(shadow JSONL/in-memory, memory.db 금지) · free-chat `scenario:"free"` 확장(decisionMapping/RecommendationCards 재사용) · 출처/confidence UI · safety gate 재사용 · flag default OFF + production fail-closed. **금지:** catalog/customer/order/payment write · canonical 승격 · raw/PII Foundation 저장 · memory.db. **검증:** smoke 5/5 · free-chat catalog-only · web→learn→reuse · real write 0 · raw/PII 0 · production OFF · tsc PASS. 완료 후 foundation-control control revalidation.
