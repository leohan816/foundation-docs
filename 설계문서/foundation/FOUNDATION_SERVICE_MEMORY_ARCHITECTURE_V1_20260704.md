# Foundation-Control Memory Architecture 통합 설계서

> 상태: **DESIGN** (Control verdict 상한 = **DESIGN_READY** · 최종 검증(FINAL_PASS)은 별도 reviewer/Fable5)
> 버전: v0.3-revised · 작성일: 2026-07-04 · 선행: v0.2-integrated(적대 리뷰 3축 반영) + **Leo revision**(opt-B 기본 · 서비스별 원문 저장 · 동일 계약=9엔티티 전부 · external_consult_ref 보조링크 · Control self-review 제한)
> 작업 유형: **design-only** (코드 수정 0 · migration 0 · git 0 · raw 고객 데이터 미열람 · secret 값 출력 0)
> 근거: 확정된 정본 audit + 10 핵심 결정 + read-only 코드/스키마/설계문서 인벤토리 + FOUNDATION_COMMON_IDENTITY_REF_POLICY_20260703 · FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_RESULT_20260704 · FOUNDATION_MEMORY_INVENTORY_AUDIT_20260704
> 관할: foundation-control (control tower) · cross-project (Foundation + SIASIU + Cosmile) → **release train 필수**
> **design-first 전제:** 본 문서는 **구현 전 설계**다(CLAUDE.md §2.6). DESIGN_READY 전에는 implementation prompt 미발행 · FOUNDATION/SIASIU/Cosmile 코드 미수정.
> **★Control self-review 제한(governance):** foundation-control이 작성한 본 문서를 foundation-control이 **FINAL_PASS 하지 않는다.** Control이 낼 수 있는 최고 verdict는 **DESIGN_READY**이며, 최종 검증(FINAL_PASS / APPROVED)은 **별도 reviewer 또는 Fable5**가 수행한다(self-review 금지·독립 검증 원칙).
> **목적:** 세 프로젝트에 걸친 고객 메모리(customer memory) 아키텍처를 하나의 역할 경계 위에 고정하고, 계약↔저장 비대칭·de-anon 표면·동일 계약 대칭성을 검증 가능한 설계로 확정한다.

---

## 0. 문서 거버넌스 매핑 (CLAUDE.md §2.6 "16 필수 섹션" 충족 선언)

본 설계서의 **A~W 23섹션 스킴은 CLAUDE.md §2.6가 요구하는 16 필수 섹션의 superset(포함집합)**이다. 16 요건 대비 커버리지 매핑(정본 템플릿 = `설계자료/` design-first rule 문서):

| 16 필수 섹션(정본 요건) | 본 문서 커버 섹션 |
|---|---|
| 1. 목적/배경 | front-matter · A |
| 2. 범위/비범위 | A · C · D · U(M6 범위 밖 명시) |
| 3. 결정 사항 | B (B-a~B-e) |
| 4. 아키텍처/역할 경계 | C · D · E · R |
| 5. 데이터 모델/스키마 | F · G · H · I · J · K · L · M · N |
| 6. 인터페이스/계약 | E · O · P · Q · R |
| 7. 보안/프라이버시 | D · N · S · T |
| 8. 신원/identity | M · S · N-1 · B-a · B-e |
| 9. 동의/보존/삭제 | N |
| 10. de-anon/위협 모델 | S · T |
| 11. 위험/미해결 | W · A(마지막 갭 서술) |
| 12. 테스트/검증 | V |
| 13. 구현 단계 | U |
| 14. 롤백 | 말미 완료/미완/금지 구분 · U(flag OFF·additive) |
| 15. 승인/게이트 | B(승인 항목) · U(M1) · 말미 |
| 16. 참조/근거 | front-matter 근거 목록 · 각 표 근거 열 |

★16 요건 중 누락 없음. A~W가 각 요건을 포함하거나 세분한다.

**★검증 거버넌스(self-review 금지):** 본 문서는 foundation-control(작성자)이 스스로 FINAL_PASS 하지 않는다. Control 산출 verdict = **DESIGN_READY 상한**. 최종 검증(FINAL_PASS/APPROVED)은 **독립 reviewer 또는 Fable5**가 수행하며, 그 통과 전에는 어떤 구현 prompt도 발행하지 않는다.

---

## A. Executive Summary

이 설계서는 세 프로젝트에 걸친 **고객 메모리 아키텍처**를 하나의 역할 경계 위에 고정한다. 한 줄 원칙은 변하지 않는다: **Foundation은 판단하고, SIASIU·Cosmile은 소유하고, foundation-control은 깨지지 않았음을 증명한다.**

핵심 구조 결론(정본 audit과 정합):

- **Foundation = request-stateless.** 고객 장기기억(LTM)을 저장하지 않는다. Foundation이 소유하는 memory는 **Knowledge / Product / Ingredient / Brand / Safety / Search / Judgment 판단·검색 레이어**(ssbrain KB content 위, read-only)뿐이다. 요청마다 서비스가 실어 보내는 **memory_context**를 *임시로만* 소비하고 응답 후 폐기한다.
- **★경계는 "구조적 보장"이 아니라 "규약 + ingress gate로 강제해야 할 대상"이다.** (적대 리뷰 high 반영) SSC.session_context/service_context/product_context는 `validate_ssc`에서 **freeform dict로 통과**(contracts.py:51/71/72)되고, consult_contract가 verbatim copy(core.py:1602)하며 consult_chat이 `session_out=dict(session_in)`(core.py:1224)으로 응답 trace에 echo(core.py:1462/1469)한다. FOUNDATION `shared_memory/has_raw_or_pii`는 **foundation_http_service에 미배선**이다(grep 0). 즉 서비스가 session_context에 customer_id/email/raw 원문/주문 데이터를 넣으면 Foundation은 **수용·처리·반영**한다. 경계는 현재 **service-side convention**이며, **Foundation ingress default-deny scan으로 강제**되어야 한다(§R/§U-M5/§V).
- **SIASIU = reference.** `memory.db{user·episode·memory_fact·fact_type_registry}` + recall/reset + client localStorage로 이미 고객 장기기억 정본을 소유한다. 단, storage 스키마에 **consent·retention·delete-audit 필드가 없어** Foundation 정책 모듈이 요구하는 flag와 비대칭이다.
- **Cosmile = alignment target.** 행동·커머스·집계 memory는 있으나, **상담 원문/장기 사실/프로필/후보 persistent 5종**이 전무하다.
- **공통 계약이 목표.** SIASIU를 reference로, Cosmile를 같은 **Common Service Memory Contract**로 정렬(결정 #1~#4). ★**"동일 계약" = 양 서비스가 9 엔티티(ConversationSession·ConversationMessage·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·CommerceMemory·ConsentRecord·SubjectRefMap)를 모두 보유**하고 동일 필드-의미/상태머신/게이트/거버넌스를 공유함(**opt-B 확정**). **각 서비스는 자기 서비스에서 발생한 상담 원문을 자기 DB에 저장**한다(SIASIU→SIASIU DB, Cosmile→Cosmile DB).
- **★cross-service 고객기억 공유는 v1 범위 밖(future release train).** SIASIU와 Cosmile은 v1에서 **서로 고객기억을 공유하지 않는다.** **Foundation은 고객기억 broker가 아니다** — 다른 서비스의 고객기억을 조회/중계하지 않는다. SubjectRefMap·guest 병합·erasure는 모두 **service-local**(§M-2/§N-4/§N-5).
- **memory_context는 요청마다 생성 → consult 중 임시 사용 → 즉시 폐기.** 각 서비스가 **자기 memory에서** 요청 단위로 조립하고, opaque refs·enum·atom·consent flags만 담으며 **raw 상담원문 · raw PII · 주문/결제/배송은 제외**한다.
- **identity/de-anon.** furef_local_ref/subject_ref는 **가명(pseudonymous) 개인정보**다 — 익명이 아니며 삭제·보존·동의 lifecycle 대상(§M/§N/§S). secretless SHA256 furef(SIASIU 현행 16-hex plain SHA256)은 **열거 가능 → 원 식별자 복원 가능**하므로 recoverable pseudonymous PII로 취급한다. ★subject_ref는 **service-local** — SIASIU subject_ref와 Cosmile subject_ref를 **연결하지 않는다**. cross-service linkage는 **v1 범위 밖(future release train)**.

가장 큰 구조적 갭 = **storage에 consent/expiry/delete-audit 컬럼이 없고, Foundation 정책 모듈은 그 flag를 요구**한다는 계약↔저장의 어긋남 + **Foundation ingress에 raw/PII default-deny gate가 미배선**이라는 경계 강제의 부재. 본 설계의 중심 산출물은 (1) 이 비대칭을 메우는 공통 스키마와 memory_context 계약, (2) session_context ingress를 default-deny로 강제하는 gate, (3) furef/subject_ref를 가명 개인정보로 governance에 편입하는 identity 규칙이다.

**본 설계는 live/write/promotion을 열지 않는다.** 모든 신규 경로는 flag default OFF · shadow/read-only · `applied_to_real_user=false` · `write_live=false`. live 전환은 별도 release train.

---

## B. 최종 결정 사항

10 핵심 결정을 설계 결정으로 고정한다(원문 보존 + 설계 귀결). 적대 리뷰로 #3·#1/#2의 정의를 **명문화**한다.

> **★★ v1 범위 고정 (Leo revision 2026-07-04 · 아래 표·이후 섹션의 이전 "consent-gated broker/cross-service/opt-A" 서술보다 이 banner가 우선):**
> 1. **opt-B 확정:** SIASIU는 SIASIU 상담 원문을 SIASIU DB에, Cosmile은 Cosmile 상담 원문을 Cosmile DB(ConversationMessage)에 저장 — **각 서비스가 자기 발생 원문의 정본 소유**. `external_consult_ref` = 정본 대체 **아님**·고객지원/이관/마이그레이션/디버깅 **보조 참조**만.
> 2. **"동일 계약" = 양 서비스가 9 엔티티 모두 보유**: ConversationSession · ConversationMessage · EpisodeSummary · MemoryFactCandidate · LongTermMemoryFact · CustomerProfile · CommerceMemory · ConsentRecord · SubjectRefMap.
> 3. **cross-service 고객기억 공유 = v1 범위 밖(future release train):** SIASIU↔Cosmile 고객기억 공유 · consent-gated broker · cross-service SubjectRefMap · cross-service allow_link · cross-store erasure propagation = **v1 미구현**. **Foundation은 고객기억 broker가 아니다.**
> 4. **SubjectRefMap · guest 병합 · erasure = service-local:** SIASIU subject_ref ↔ Cosmile subject_ref **미연결**. guest→user 병합은 **같은 서비스 내에서만**(SIASIU guest→SIASIU subject · Cosmile guest→Cosmile subject · SIASIU↔Cosmile 병합 없음). erasure는 각 서비스 내에서만(Foundation은 고객기억 미저장 → 고객기억 erasure 대상 아님).
> 5. **memory_context 유지:** 각 서비스가 **자기 memory에서** 요청 단위 생성 → Foundation 임시 사용 후 **미저장** → Foundation은 다른 서비스 고객기억 **미조회**.
> 6. **Control self-review 제한:** Control verdict = **DESIGN_READY 상한** · 최종 검증(FINAL_PASS)은 별도 reviewer/Fable5.

| # | 결정 | 설계 귀결 |
|---|------|-----------|
| 1 | SIASIU·Cosmile 동일 Service Memory Contract 구현 | §E 공통 계약 1벌 정의 → 양 서비스가 각자 로컬 storage로 구현. ★**"동일 계약" = 양 서비스가 9 엔티티(ConversationSession·ConversationMessage·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·CommerceMemory·ConsentRecord·SubjectRefMap)를 모두 보유** + 동일 필드-의미/상태머신/게이트/거버넌스 공유. 각 서비스가 자기 원문·정본 소유(opt-B). commerce 축만 populate-conditional(#3) |
| 2 | 둘 다 상담 히스토리 장기보관 + 고객 재열람 | §I ConversationSession/Message/EpisodeSummary. ★**opt-B 확정: 각 서비스가 자기에서 발생한 상담 원문을 자기 DB의 ConversationMessage로 저장**(SIASIU→SIASIU DB, Cosmile→Cosmile DB). 원문 정본은 발생 서비스 소유·재열람 양쪽 제공. `external_consult_ref`는 정본 대체 아님 — 고객지원/이관/마이그레이션/디버깅 **보조 참조**만(§I-3) |
| 3 | 둘 다 cart/order/purchase/상품행동 memory | **재정의:** 두 서비스가 동일 필드-의미/상태머신/거버넌스 오버레이를 공유하되, **commerce 축은 해당 축이 존재하는 서비스에서만 populate**(Cosmile=full, SIASIU=commerce 도입 시에만). SIASIU commerce 부재 = 계약 위반 아님(schema-available·populate-conditional, §L·§W-W21) |
| 4 | 고객 장기기억 정본 = 서비스 소유 | subject_ref 소유·삭제권·consent ledger 모두 서비스 소유(§K/§N) |
| 5 | Foundation은 고객 장기기억 미저장 | §C/§D — Foundation storage에 customer LTM 0 |
| 6 | Foundation은 요청마다의 memory_context만 임시 사용 | §O/§Q — request-scoped, SSC.session_context 착지 |
| 7 | memory_context는 요청 후 폐기 | §Q lifecycle — session_context_out 반환 후 폐기, `memory_write=false` 불변식 |
| 8 | Foundation은 Knowledge/Product/Ingredient/Brand/Safety/Search/Judgment memory 소유 | §C — **판단/검색/decision 레이어를 소유**. 물리 ssbrain.sqlite는 **SIASIU-hosted read-only data path**(Foundation storage 아님, §C·§W-W17) |
| 9 | Foundation에 raw PII/상담원문/주문결제배송/장기프로필 미저장 | §D 금지 목록 + §S de-anon guard + **§R ingress gate로 강제**(convention→enforced) |
| 10 | ★**cross-service 고객기억 공유 = v1 범위 밖(future release train)** | v1에서 SIASIU↔Cosmile 고객기억 공유·consent-gated broker·cross-service SubjectRefMap **미구현**. **Foundation ≠ 고객기억 broker.** 필요 시 향후 **별도 release train에서 재설계**(§N-4·§M-2·§U-M6) |

추가 설계 결정(파생, 승인 필요):

- **B-a. subject_ref keying 통일.** 서비스 로컬 저장은 `subject_ref`(furef_v2 → HMAC 파생, opaque)로 keyed. SIASIU가 `user_id = s.userId || s.email || 'u_'+name`으로 **email을 PK에 쓸 수 있는** 위험(store.js:71)을 계약 레벨에서 차단.
- **B-b. taxonomy 정합.** brain.py fact types · CDM `CDM_TYPES` · shared `MEMORY_KINDS` 3자 불일치(`condition`↔`concern`·`safety_note` 부재)를 §N canonical mapping으로 정합.
- **B-c. consent/retention/delete를 storage 1급 컬럼으로 승격.** 정책 모듈에만 있던 flag를 저장 스키마에 배선.
- **B-d. 안전 비대칭 보존(정확히 한정).** `avoid_ingredient·allergy·pregnancy_nursing`은 즉시 active·영구(auto-decay/auto-expire 제외)·**same-service 보호 게이팅에서만 우회**. **cross_service consent gate는 우회하지 않는다**(§J-2·§N-1 상술). safety는 보호를 MAX로 올릴 뿐 cross-service 동의 장벽을 낮추지 못한다. `pregnancy_nursing`은 안전이면서 SINGLE(재진술/reconfirm supersede 허용) — '영구'='immutable' 아님(§J-2).
- **B-e. (신규) guest → subject 신원확정 병합 규칙 — ★service-local 한정.** 게스트가 로그인/신원확정될 때 `guest_ref`/`anonymousId` 소유 레코드(ConversationSession·LongTermMemoryFact·CommerceMemory·consent)를 **같은 서비스의** subject_ref로 재키잉/동의승계/병합한다(§M-2/§N-5). ★**SIASIU guest→SIASIU subject · Cosmile guest→Cosmile subject · SIASIU↔Cosmile 병합 없음.** `allow_link`는 **service-local guest→user 병합에만** 사용(cross-service allow_link/broker = v1 범위 밖). 미동의(allow_link=false) 시 병합 거부. (§W-W22 WATCH)

---

## C. Foundation Memory Scope (Foundation이 소유하는 memory)

Foundation이 소유·판단하는 memory는 **도메인 무관 core 지식/판단 레이어**뿐이다. 고객 개인의 장기기억은 포함되지 않는다.

**★KB 소유권 명확화(적대 리뷰 medium 반영):** Foundation은 **KB content 위의 judgment/decision/retrieval 레이어를 소유**한다. 그러나 **물리 아티팩트 `ssbrain.sqlite`는 SIASIU repo에 호스팅된 read-only data path**다 — `retrieval_provider.py:13`이 `_KB_PATH=/home/leo/Project/SIASIU/app/data/ssbrain.sqlite`를 하드코딩하고 `ssbrain/schema.py:8`은 이를 **per-project index owned by SIASIU**로 라벨한다. 따라서 "Foundation이 KB를 소유"는 **판단/검색 레이어 소유**를 뜻하며, **물리 저장소는 Foundation storage가 아니다**(canonical-KB 재배치는 별도 release train 후보, §W-W17).

| Foundation-owned memory | 내용 | 저장/성격 | 근거 |
|---|---|---|---|
| Knowledge (judgment/retrieval) | ssbrain `documents`(doc_type=knowledge)·`chunks`·`sources` **위의 검색/판단** | ssbrain.sqlite `mode=ro`(**SIASIU-hosted read-only path**, Foundation storage 아님) | retrieval_provider.py:13/25/36 · ssbrain/schema.py:8 |
| Product (judgment) | `documents`(doc_type=product)·`product_ingredients` 판단 | canonical read-only(SIASIU-hosted), 고객 데이터 아님 | ssbrain/schema.py |
| Ingredient (judgment) | `ingredients`·`edges`(rel) 판단 | canonical read-only(SIASIU-hosted) | ssbrain/schema.py |
| Brand (judgment) | `documents.brand`·brand refs 판단 | canonical read-only(SIASIU-hosted) | ssbrain/schema.py |
| Safety judgment | semantic + deterministic policy gate + lexical floor backstop (MAX-merge, raise-only) | request-scoped 계산, 저장 0 | core.py:65-115 · contracts.py:133-164 |
| Search/Evidence | bm25+graph+RRF retrieval → source_trace/snippets | read-only 검색, 결과는 응답 trace로만 | retrieval_provider.py:55-88 |
| Judgment/Decision | decision_type·evidence_mode·reason_codes·refined_intent(fail-closed·결정론) | request 처리 중만 계산, durable 저장 0 | core.py:871-1029 / 1164-1581 |
| memory_context (transient) | 서비스가 요청마다 실어 보내는 안전 컨텍스트 | **payload IN/OUT only, 저장 0** | core.py:1170/1222-1246 (SSC.session_context) |

핵심: Foundation은 이 지식/판단을 **SSC로 소비·검증하고 FRC로 refs만 반환**한다. 제품명/효능을 생성하지 않고(refs만), service persona/CTA/price/stock/cart를 core에 넣지 않는다. `INVARIANTS`(api_live:False·write_performed:False·raw_text_stored:False·pii_stored:False·memory_write:False)가 모든 응답에 박힌다(core.py:50-51). **단, INVARIANTS는 출력 라벨이며, session_context ingress의 raw/PII 미유입은 §R ingress gate가 별도로 강제해야 한다**(라벨≠강제).

---

## D. Foundation이 절대 저장하지 않는 것

결정 #5·#9의 정본 금지 목록. Foundation storage/trace/report 어디에도 아래를 **durable 저장하지 않는다.** ★단, 아래 금지는 **현재 service-side convention**이며 **§R ingress gate(default-deny raw/PII scan)로 강제되어야 한다** — Foundation이 구조적으로 수신을 막고 있는 것이 아니다(적대 리뷰 high 반영).

| 금지 항목 | 이유 | 대신 | 강제 상태 |
|---|---|---|---|
| 고객 raw PII (email·phone·RRN·card·name) | de-anon/유출 위험 | `mask_pii→[REDACTED]` + `query_hash`만, `pii_stored=false` | ★출력 라벨은 강제, **session_context 유입은 ingress gate 필요**(§R) |
| 상담 원문 (raw utterance/transcript) | 원문 영구보존 = 서비스 소관 | 서비스 소유(ConversationMessage). Foundation엔 summary refs/content_hash만 | ★ingress gate 필요 — freeform dict는 verbatim 수용됨 |
| 주문·결제·배송 데이터 | commerce는 Cosmile 소관 | Foundation은 product **refs**만 소비 | ★ingress gate 필요 |
| 고객 장기 프로필 (skin/allergy/pregnancy 통합) | 서비스 소유 LTM | 요청 시 memory_context의 fact **refs/atom**만 | ★ingress gate 필요 |
| customer 영속 memory (memory.db) | Foundation = stateless | `memory_read_provider_called=False`(미연결, core.py:1244-1255) | 미연결(구조적) |
| memory write / upsert | write 0 원칙 | `extract_candidate`=compute-only + `upsert_blocked_by_policy` | 구조적(write 경로 없음) |
| consent 원장 (grant/withdrawal 이력) | 서비스-소유 audit trail | §N 서비스-소유 consent ledger 신설 | 서비스 소유 |
| 고객 식별자 (customer_id/anonymous_id/user_id) | de-anon join 원천 | SSC **top-level** 스키마에 식별자 필드 부재(contracts.py:37-73) | ★단 session_context는 freeform — 식별자 삽입 가능 → **convention, ingress gate로 강제** |

★정정(적대 리뷰 high/medium): 초안의 "Foundation 요청 경로에는 고객 식별자가 없으므로 de-anon join이 **구조적으로 불가**"는 **부정확**하다. 정확한 서술 = **consult 요청 경로는 오늘 identity 필드를 싣지 않으며, cross-service linkage는 v1 범위 밖(미구현·Foundation은 broker 아님)**(구조적 불가가 아님). session_context는 untyped freeform dict이므로 서비스가 식별자/원문/주문을 넣으면 Foundation은 수용·반영한다. 따라서 **경계 강제는 §R의 ingress default-deny scan**(FOUNDATION `shared_memory/gate.has_raw_or_pii` 재사용)이 담당해야 하며, §V에서 `session_context 내 raw/PII = 0`을 assert한다. ★(미래·v1 밖) cross-service broker를 켜는 것은 **오늘 identity 토큰이 없는 경로에 identity를 배선하는 행위** = 별도 release train에서 게이팅해야 할 위험이다.

---

## E. Common Service Memory Contract

SIASIU·Cosmile가 각자 로컬 storage로 구현하되 **동일한 필드 의미·상태 머신·게이트**를 따르는 공통 계약(결정 #1). storage는 서비스 소유, 계약은 control tower 정본.

**★"동일 계약"의 정확한 정의(대칭성 리뷰 반영):** 동일 계약 = **동일 필드-의미 + 동일 상태머신(fact_state/status/delete 3-state) + 동일 게이트(consent/retention/de-anon) + 동일 거버넌스 오버레이**. **정본(canonical)의 물리 위치는 서비스-소유이며, 축별 대칭성은 다음과 같이 조건부다:**
- **Conversation 축(opt-B 확정):** 각 서비스가 **자기 발생 상담 원문을 자기 DB의 ConversationMessage로 저장**(SIASIU→SIASIU DB, Cosmile→Cosmile DB). 원문 정본 = 발생 서비스 소유 · 재열람 양쪽 제공 · `external_consult_ref`는 보조 참조만.
- **Commerce 축:** schema-available·**populate-conditional**(Cosmile=full, SIASIU=commerce 도입 시). SIASIU 미populate는 계약 위반 아님.
- **Fact/Profile/Governance 축:** 양 서비스 대칭(동일 스키마·게이트).

**계약 구성(5축):**

1. **Identity 축** — `subject_ref`(opaque, furef_v2→HMAC 파생) 로 keyed. `local_user_ref`/`guest_ref`는 서비스 내부에서만, PII를 key로 쓰지 않는다(B-a). **furef_local_ref/subject_ref = 가명 개인정보**(§S/§N governance 대상).
2. **Conversation 축** — ConversationSession / ConversationMessage / EpisodeSummary (§I).
3. **Fact 축** — MemoryFactCandidate → LongTermMemoryFact (§J).
4. **Commerce 축** — CommerceMemory (§L, populate-conditional).
5. **Governance 축** — Consent / Retention / Delete (§N).

**공통 불변식(모든 축·모든 서비스):**

- `raw_text_stored`(Foundation candidate/adapter 경로) = **False**.
- 삭제·차단·만료 memory는 답변/추천/trace/report에 **재등장 금지**(`must_not_reappear`).
- consent 없는 sensitive memory(condition/reaction/safety_note) 재사용 = fail-closed 금지.
- **cross-service 노출은 `consent_scope=cross_service`일 때만, 기본 OFF. 안전 fact(pregnancy_nursing/allergy 등 특수범주 건강정보 포함)도 예외 아님** — 안전 우회는 same-service 보호 게이팅에 한하며 cross_service consent gate는 우회 불가(B-d).
- memory reuse ≠ storage: 저장됐다고 재사용하지 않는다(learning_memory_state의 `approved_for_reuse` 이상만).
- 안전 fact(avoid_ingredient/allergy/pregnancy_nursing)는 즉시 active·영구(auto-decay/auto-expire 제외)·**same-service 보호 우회만**(단, 명시적 erasure/reconfirm은 존중).
- raw text/PII/query에서 파생한 hash는 **keyed(HMAC, server-side secret) 또는 per-service salt**로 계산한다(전역 unsalted 절단 hash = cross-service correlator 금지, §S).

**taxonomy(canonical, §N에서 상세):** `preference · concern · reaction · decision_history · outcome_feedback · safety_note` + fact-type 확장(`skin_type · avoid_ingredient · allergy · pregnancy_nursing · goal · personal_color · age_range · lifestyle`). `condition`(CDM) ↔ `concern`(shared)는 alias로 정합.

---

## F. SIASIU reference memory model

정본 reference. 아래를 **깨지 않고 유지**하되(§6 SIASIU 규칙, answer.py fingerprint `d7f579443f8a110a` unchanged), consent/retention/delete 컬럼을 **가산(additive)** 한다.

| 엔티티 | 역할 | 핵심 필드 | 상태/삭제 | 근거 |
|---|---|---|---|---|
| `episode` | 상담 원문(append-only) | id PK·user_id·ts·role(user\|ai)·text(원문) | append-only, 삭제=reset hard DELETE만, TTL 없음 | brain.py:82/116-127/1277/1285 |
| `memory_fact` | LTM 영속 사실 | id·user_id·type·value·note·confidence·as_of·status·source_episode_id·norm_value·fact_state | 2번규칙(hypothesis 0.40→active 0.60)·SINGLE supersede·안전 즉시 active 영구·비안전 90일 '(예전)' 약화 | brain.py:83-284, SAFETY/CONF:48/53-56 |
| `fact_type_registry` | fact 타입 canon | type PK·label·is_safety·norm_aliases·status | CANON 11타입 seed·default-deny | brain.py:35-47/85/94-96/153-163 |
| `user` | 고객 신원 root | user_id PK·name·created_at | reset이 user row 미삭제 · ★user_id=email 파생 위험 | brain.py:81/107-114 · store.js:71 |
| `recall`/`memory_context` | 회상 read surface | active_facts+recent episode 4+greeting+chips | read-only projection | brain.py:289-299/1266-1281 · server.py:68-74 |
| `reset` | 삭제 메커니즘 | user_id 전량 hard DELETE(episode+fact) | soft-delete/tombstone/audit/per-fact 없음 | brain.py:1283-1288 · server.py:132-134 |
| `foundation_state_v1` | client localStorage 프로필 | loggedIn·provider·email·name·gender·answers·pcTone·membership·freeLeft | browser 영속·평문·Store.reset()만 | store.js:5-33/50-71 |
| `fnd_routine/diet/weight` | client tracker | 루틴/식단/체중 JSON | browser 영속·서버 미전송 | routine/diet/body/progress.html |
| CDM · consent_guard · deleted_expired_guard | Foundation-side 재사용 정책 계약 | consent·deleted·expired·blocked·risk_level·reconfirmed·raw_text_stored=False | **무저장·SIASIU runtime 미주입**(furef_v2 bridge만) | foundation_customer_*_memory*.py |
| learning_memory_state | 재사용 자격 12-state 머신 | record_type·status·memory_scope·source_ref·provenance_ref | DRY_RUN_ONLY·customer_memory auto-approve 금지 | learning_memory_state.py:9-127 |

**reference의 갭(= 본 설계가 메울 대상):**

- `memory_fact`/`episode` 스키마에 **consent·expires_at·deleted·blocked 컬럼 전무.** 개념은 Foundation-side 정책 모듈에만 있고 runtime 저장/회상에 **미주입**(계약↔저장 어긋남).
- 삭제 = reset의 user 단위 hard DELETE 뿐(GDPR 삭제권 대비 조악, per-fact/audit 없음).
- retention/TTL 없음(비안전 90일 약화, 안전 무기한).
- **user_id keying이 email 파생 가능 → PII-in-key**(P3 logins.txt와 동류). ★현행 furef가 secretless 16-hex SHA256이면 **열거 가능**(§S).
- provenance = `source_episode_id` 내부 링크뿐(외부 source_ref/evidence 없음) — learning_memory_state 요구 필드 부재.

---

## G. Cosmile alignment target memory model

Cosmile memory는 **행동·커머스·집계**에 집중. 상담 원문/장기 사실/프로필/후보 persistent가 부재하다.

**보유(정렬 대상):**

| 모델 | 성격 | 고객 키 | consent 흔적 |
|---|---|---|---|
| CommerceEvent | 행동 원장(append-only) | userId?/sessionId?/anonymousId? | 없음(propertiesJson sanitize 주석뿐) |
| ProductSalesDaily | 상품×일자 집계(PII-free) | @@unique(date,productId) | n/a |
| LearningInsight | 학습/판단 memory(집계·세그먼트) | 개인 키 없음 | n/a |
| FoundationSignalOutbox | Foundation 신호 큐 | canonicalUserId?/anonymousId? | privacyLevel(anonymous\|user_consented\|aggregated) ★P2 raw ids |
| ConsultationSessionMeta | 상담 메타(원문❌·구조화 refs만) | userId?/guestId?/consultationSessionId(SIASIU 링크) | 없음 |
| Cart/CartItem·Order/OrderItem | 구매의도·결과(mock) | userId?/guestId? | 없음 |
| Wishlist·CouponRedemption | 취향·혜택 행동 | userId?/guestId? | 없음(Wishlist.note 자유텍스트 PII 유입 주의) |
| AlertSubscription/AlertEvent | 재참여 의사(mock) | userId?/guestId? | **consentStatus(unknown\|consented\|not_consented)** ← Cosmile 유일 명시 consent |
| Console* | 내부 운영자 콘솔(★고객 아님) | ConsoleUser.id | n/a (role separation — 고객 LTM 오인 금지) |

**부재(신설 필요, alignment gap):** ConversationSession · ConversationMessage · EpisodeSummary · LongTermMemoryFact · CustomerProfile · MemoryFactCandidate. 상담 원문은 클라이언트 sessionStorage(ephemeral, reset=removeItem)뿐 · 서버 persistent 0. 고객 계정 모델 자체 부재(userId 문자열 참조만).

**정렬 원칙:**

- **opt-B 확정:** Cosmile은 Cosmile 발생 상담 원문을 **자체 ConversationMessage로 저장**(자기 원문 정본 소유). `consultationSessionId`/`external_consult_ref`는 정본 대체가 아니라 **고객지원/이관/마이그레이션/디버깅용 보조 참조**.
- 기존 readiness adapter `1ce099e`(164/164)는 **삭제/갈아엎기 금지 · 재사용/확장**(§5).
- Cart/Order/Alert = mock 유지(live/write 0).
- consent/retention/delete 컬럼을 신규 모델 + 기존 고객 행동 모델(Cart/Order/Wishlist/CommerceEvent)에 additive 배선.

---

## H. Service Memory tables/entities 후보

공통 계약이 만들어낼 서비스-소유 엔티티 후보. 각 상세 스키마는 §I~§M.

| 그룹 | 엔티티 | SIASIU 대응 | Cosmile 대응 | 신규/유지 |
|---|---|---|---|---|
| Conversation | ConversationSession | (episode 묶음 개념) | ConsultationSessionMeta 확장 | 유지+확장 / 신설 |
| Conversation | ConversationMessage | episode | (없음·sessionStorage만) | 유지 / 신설 or 링크(opt) |
| Conversation | EpisodeSummary | (없음·원문만) | (없음) | 신설(양쪽) |
| Fact | MemoryFactCandidate | (extract compute) | (없음) | 신설(양쪽) |
| Fact | LongTermMemoryFact | memory_fact | (없음) | 유지+컬럼가산 / 신설 |
| Fact | FactTypeRegistry | fact_type_registry | (없음) | 유지 / 신설(공유 canon) |
| Profile | CustomerProfile | (foundation_state_v1 일부·서버화 필요) | (없음) | 신설(양쪽) |
| Commerce | CommerceMemory(거버넌스 오버레이) | (없음·populate-conditional) | CommerceEvent·Cart·Order·Wishlist·Alert에 오버레이 | **논리 계약** / 기존 모델 컬럼 가산 |
| Governance | ConsentRecord(ledger) | (없음·정책 모듈만) | AlertSubscription.consentStatus 부분 | 신설(양쪽) |
| Sync | FoundationSyncState | ssbrain/foundation_* candidate adapter | FoundationSignalOutbox | 유지/정렬 |
| Identity | SubjectRefMap | (user_id, 위험) | (userId 문자열) | 신설(opaque keying·가명 PII governance) |

---

## I. ConversationSession / ConversationMessage / EpisodeSummary 구조

상담 히스토리 장기보관 + 고객 재열람(결정 #2). **raw 원문은 서비스 소유** — Foundation엔 절대 안 넘어간다.

### I-1. ConversationSession

| 필드 | 타입 | 키/제약 | nullable | refs | 비고 |
|---|---|---|---|---|---|
| id | TEXT(uuid) | PK | N | — | |
| service_id | TEXT | idx | N | (siasiu\|cosmile) | |
| subject_ref | TEXT | idx | Y | → SubjectRefMap | opaque(furef 파생·**가명 PII**); 게스트=null |
| guest_ref | TEXT | idx | Y | — | opaque guest cookie 파생(**가명 PII**·병합 대상 B-e) |
| channel / locale | TEXT | | Y | | |
| status | TEXT | | N | (active\|ended\|abandoned\|handoff) | Cosmile 정합 |
| started_at / ended_at | TEXT(ts) | | N/Y | | |
| external_consult_ref | TEXT | idx | Y | 보조 참조(정본 아님) | ★고객지원/이관/마이그레이션/디버깅용 보조 링크만 · **원문 정본 대체 아님**(원문은 각 서비스 자체 ConversationMessage) |
| consent_scope | TEXT | | N | enum(§N) | 세션 기본 동의 범위 |
| retention_policy | TEXT | | N | enum(§N) | 기본 standard_ttl |
| sensitivity_default | TEXT | | N | (low\|normal\|sensitive\|high) | ★4값 정정(code SENSITIVITY_LEVELS·M2 정합) |
| deleted / blocked / expired | BOOL | | N | | soft, must_not_reappear |
| deleted_at / expires_at | TEXT(ts) | | Y | | TTL enforcement |
| source | TEXT | | Y | | |

### I-2. ConversationMessage

| 필드 | 타입 | 키/제약 | nullable | refs | 비고 |
|---|---|---|---|---|---|
| id | INTEGER/TEXT | PK | N | — | |
| session_id | TEXT | FK idx | N | → ConversationSession.id | |
| seq / ts | INT/TEXT | | N | | 순서 |
| role | TEXT | | N | (user\|ai\|system) | |
| content | TEXT | | N | — | ★서비스-소유 raw 원문(고객 재열람용). Foundation 미전송. **at-rest 암호화·접근통제 필수**(§W-W24) |
| content_hash | TEXT | | N | **HMAC/keyed·per-service** | de-dup·참조용(원문 복원 불가). ★전역 unsalted 절단 hash 금지(§S) |
| pii_flags | TEXT(JSON) | | Y | | 검출만(email/phone/…) — 저장은 서비스 정책 |
| derived_facts | TEXT(JSON) | | Y | → MemoryFactCandidate.id[] | provenance |

★설계 주의: SIASIU `episode.text`는 이미 raw 평문(masking 없음). 본 계약은 **원문 폐기를 강제하지 않음**(고객 재열람 요구) — 대신 session-level consent/retention/delete를 배선하고, **Foundation 방향으로는 content_hash/summary refs만** 통과시킨다. **서버-측 raw sink는 at-rest 암호화·접근통제가 필수 조건**(§K와 함께 §W-W24 별도 보안 patch/train). 원문 masking 여부는 서비스 정책(WATCH §W).

### I-3. EpisodeSummary (신설, 양 서비스)

| 필드 | 타입 | 키/제약 | nullable | refs | 비고 |
|---|---|---|---|---|---|
| id | TEXT | PK | N | — | |
| session_id | TEXT | FK idx | N | → ConversationSession.id | |
| summary_text | TEXT | | Y | — | 서비스-소유 요약(고객 재열람용). Foundation 미전송 |
| mentioned_product_ids | TEXT(JSON) | | Y | → product refs | productId만(원문❌) |
| mentioned_ingredient_atoms | TEXT(JSON) | | Y | → ingredient atom | atom id만 |
| intent_types | TEXT(JSON) | | Y | 화이트리스트 enum | 자유텍스트❌ |
| risk_level | TEXT | | Y | (none\|low\|medium\|high) | 라우팅 플래그(진단❌) |
| derived_from_message_ids | TEXT(JSON) | | Y | → ConversationMessage.id[] | provenance |
| content_hash | TEXT | | N | **HMAC/keyed·per-service** | ★durable cross-service store에 미포함(§S) |
| created_at | TEXT | | N | | |

**★opt-B 확정 (Leo revision 2026-07-04 · opt-A 취소):**
- **opt-B = 각 서비스가 자기 발생 상담 원문을 자기 DB의 ConversationMessage로 저장.** SIASIU는 SIASIU 상담 원문을 SIASIU DB에, **Cosmile은 Cosmile 상담 원문을 Cosmile DB(ConversationMessage)에 저장** — 원문 정본은 발생 서비스가 소유(원장 이원화가 아니라 **서비스별 자기 원문 소유**가 정본 구조). 재열람은 양쪽 제공.
- **`external_consult_ref` = 정본 대체 아님.** cross-service **참조/이관/고객지원/마이그레이션/디버깅용 보조 링크**로만 둔다(원문을 다른 서비스에서 끌어오는 정본 경로 아님).
- ★이로써 결정 #1/#2의 "동일 계약"은 **양 서비스가 9 엔티티 모두 보유 + 각자 원문 정본 소유**로 문자 그대로 충족된다(conversation 축 비대칭 없음). ~~opt-A(단일 정본+링크)는 취소.~~ **cross-service 원문 조회는 v1 범위 밖.**

---

## J. MemoryFactCandidate / LongTermMemoryFact 구조

의미 인식(fact 추출)은 AI semantic이 하고, 승격/저장은 deterministic 정책이 한다(semantic=AI · policy=rule).

### J-1. MemoryFactCandidate (신설, 양 서비스)

| 필드 | 타입 | 키/제약 | nullable | refs | 비고 |
|---|---|---|---|---|---|
| id | TEXT | PK | N | — | |
| subject_ref | TEXT | idx | Y | → SubjectRefMap | **가명 PII** |
| session_id / source_message_id | TEXT | FK | Y | → Conversation* | provenance |
| fact_type | TEXT | | N | → FactTypeRegistry.type | default-deny |
| norm_value | TEXT | | N | | 결정론 비교키(ing: atom) |
| value_display | TEXT | | Y | — | 서비스-소유 표시값(원문). Foundation엔 norm/atom만 |
| confidence | REAL | | N | | |
| fact_state | TEXT | | N | (hypothesis\|active) | ★2값 — superseded는 LTM(§J-2) 전용(승격 후 lifecycle)·candidate 폐기는 status=rejected |
| is_safety | BOOL | | N | ← registry.is_safety | 파생 |
| consent_scope / sensitivity_level | TEXT | | N | enum(§N) | |
| status | TEXT | | N | (candidate\|approved\|rejected) | learning_memory_state 정합 |
| source_ref / provenance_ref | TEXT | | Y | | learning_memory_state 필수 필드 |
| raw_text_stored | BOOL | | N | =False | Foundation candidate 경로 불변 |
| created_at | TEXT | | N | | |

★semantic override 금지 지점: fact_type 확정은 AI semantic이 하되 registry 화이트리스트 밖이면 drop(normalize_type default-deny). 안전 승격(safety_gate)은 키워드가 최종 확정하지 않음 — AI semantic + deterministic gate + Foundation safety gate MAX-merge.

### J-2. LongTermMemoryFact (SIASIU memory_fact 확장 · Cosmile 신설)

| 필드 | 타입 | 키/제약 | nullable | refs | 신규 여부 |
|---|---|---|---|---|---|
| id | INT/TEXT | PK | N | — | 유지 |
| subject_ref | TEXT | idx | **Y(게스트=null)** | → SubjectRefMap | ★신규 keying·가명 PII·★subject_ref XOR guest_ref 중 하나 필수(NEW-1) |
| guest_ref | TEXT | idx | Y | — | ★subject_ref NULL 시 세션/디바이스 참조(병합 대상 B-e) |
| type | TEXT | | N | → FactTypeRegistry | 유지 |
| norm_value | TEXT | **키 의미는 아래 참조** | N | | 유지(migration) |
| value | TEXT | | Y | — | 유지(서비스-소유 표시값) |
| note / confidence / as_of | | | Y | | 유지 |
| status | TEXT | | N | (active\|superseded) | 유지 |
| fact_state | TEXT | | N | (active\|hypothesis\|superseded) | 유지 |
| is_safety | BOOL | | N | | 유지(파생) |
| source_episode_id / source_ref | | | Y | → episode / provenance | 유지 + ★source_ref 신규 |
| consent_scope | TEXT | | N | enum(§N) | ★신규 |
| retention_policy | TEXT | | N | enum(§N) | ★신규 |
| sensitivity_level | TEXT | | N | (low\|normal\|sensitive\|high) | ★신규·4값 정정(M2/code 정합) |
| deleted / blocked / expired | BOOL | | N | | ★신규(3-state) |
| reconfirmed / reconfirmed_at | BOOL/ts | | Y | | ★신규 |
| deleted_at / expires_at | ts | | Y | | ★신규(TTL·erasure) |
| created_at / updated_at | ts | | N | | 유지 |

**★upsert/identity 키 규칙(적대 리뷰 low 반영 — SINGLE 정합):**
- **다중값 타입**(preference·concern·avoid_ingredient·allergy 등): dedup 키 = `(subject_ref, type, norm_value)`. 동일 (subject_ref,type,norm_value)면 갱신, 다르면 새 row(공존 정상).
- **SINGLE 타입**(skin_type·personal_color·age_range·goal·pregnancy_nursing): identity = `(subject_ref, type)`. 새 norm_value 도착 시 **절차적 supersede**(brain.py `upsert_fact` 동일 — DB UNIQUE 제약 아님). ★migration이 `(subject_ref,type,norm_value)` UNIQUE를 추가하면 SINGLE 값 변경(dry→oily)이 supersede 대신 새 row를 만들어 **'단일값' 규칙이 깨진다** → **경고: SINGLE 타입에 (subject_ref,type,norm_value) UNIQUE 부여 금지.**
- ★guest 포함 keying: subject_key = COALESCE(subject_ref, guest_ref)(비NULL 보장 — SQL NULL별 UNIQUE 무효 방지). 다중값 dedup 키 = (subject_key, type, norm_value)·SINGLE identity = (subject_key, type). guest fact는 §N-5 병합 시 subject_ref로 재키잉(merge 시 동일 (type,norm_value) 충돌 = 기존 subject fact 우선·guest 쪽 supersede).

**보존 규칙(유지):** 비안전 2번 규칙(hypothesis 0.40 → 다른 source 2차 active 0.60) · SINGLE 타입 supersede 후 active · **안전 타입 즉시 active·영구(auto-decay/auto-expire 제외)·same-service 보호 게이팅 우회** · 비안전 as_of>90일 회상서 '(예전)' 약화(삭제 아님). supersede는 옛 row 보존.

**★안전 fact 우회의 정확한 한정(적대 리뷰 medium 반영):** 안전 타입의 "게이팅 우회"는 **same-service 보호 게이팅**(보호 목적 재사용·decay 없음·supersede 억제 없음)에만 적용된다. **cross_service consent gate는 우회하지 않는다.** `pregnancy_nursing`·`allergy`는 **특수범주 건강정보**이므로 cross-service 공유는 여전히 `consent_scope=cross_service` + default-OFF broker를 요구한다. 안전 MAX는 보호를 올릴 뿐 cross-service 동의 장벽을 낮추지 못한다.

**★pregnancy_nursing 이중 소속(적대 리뷰 low 반영):** `pregnancy_nursing ∈ SINGLE ∩ SAFETY_TYPES`. **안전(auto-decay/auto-expire 제외)이면서 SINGLE(명시적 재진술/reconfirm에 의한 supersede 허용)**이다. '영구'의 의미 = auto-decay/auto-expire 대상 아님이며 **immutable 아님**(임신중→아님 전이 가능). 구현자는 pregnancy_nursing을 immutable로 오해하지 말 것.

**신규 규칙:** consent 없는 sensitive는 재사용 fail-closed · expired&high는 reconfirm 전 재사용 금지 · deleted/blocked는 must_not_reappear · retention_policy에 따른 expires_at 자동 sweep(§N).

---

## K. CustomerProfile 구조 (신설, 양 서비스)

고객 장기 프로필 통합 엔티티. **정본 = 서비스 소유**(결정 #4). Foundation 미저장(결정 #9). PII 최소화 — 상세 사실은 LongTermMemoryFact를 참조.

| 필드 | 타입 | 키/제약 | nullable | refs | 비고 |
|---|---|---|---|---|---|
| id | TEXT | PK | N | — | |
| subject_ref | TEXT | UNIQUE | N | → SubjectRefMap | opaque keying(★email-in-key 금지·**가명 PII**) |
| service_id | TEXT | idx | N | (siasiu\|cosmile) | |
| display_name | TEXT | | Y | — | 서비스-소유 PII(최소 보관·마스킹·**at-rest 암호화·접근통제 필수** §W-W24) |
| locale / gender / age_range | TEXT | | Y | ← facts projection | age_range는 fact에서 파생 |
| skin_type / personal_color | TEXT | | Y | → LongTermMemoryFact(SINGLE) | 프로필은 projection, 정본은 fact |
| membership / free_left | TEXT/INT | | Y | | foundation_state_v1 서버화(client 평문 탈피) |
| preference_refs | TEXT(JSON) | | Y | → fact.id[] | 선호 요약 refs |
| consent_scope_default | TEXT | | N | enum(§N) | |
| deleted / blocked | BOOL | | N | | erasure |
| created_at / updated_at | ts | | N | | |

★설계 의도: 현재 SIASIU는 프로필을 `foundation_state_v1`(client localStorage, email/name/gender 평문)에 둔다. CustomerProfile 서버화는 **선택**이며(client-only 유지 가능), **서버화 시 반드시 subject_ref keying + consent/delete + at-rest 암호화/접근통제를 배선**한다(WATCH §W-W18/W24). 프로필은 fact의 **projection**이지 독립 진실원이 아니다(중복 진실 방지).

---

## L. CommerceMemory 구조

cart/order/purchase/상품행동 memory(결정 #3, **populate-conditional**). 

**★CommerceMemory = 논리적 거버넌스 계약(신규 물리 테이블 아님) — 적대 리뷰 medium 반영.** CommerceMemory는 **기존 Cosmile 모델(Cart/Order/Wishlist/CommerceEvent/AlertSubscription)에 거버넌스 컬럼(consent_scope/retention_policy/sensitivity/deleted/blocked/expires_at)을 additive로 얹는 논리 오버레이**다. 신규 CREATE TABLE도, DB view도 아니다(readiness adapter `1ce099e` 재사용 원칙과 정합). SIASIU는 commerce 축이 없으면 미populate(계약 위반 아님, §B #3).

**아래 표: `[논리]` = 계약상 논리 뷰 필드 · `[컬럼]` = 기존 모델에 additive로 추가할 실제 컬럼.**

| 필드 | 종류 | 타입 | 값/enum | refs | 비고 |
|---|---|---|---|---|---|
| id | [논리] | TEXT | | — | 기존 모델 각자의 PK로 매핑 |
| subject_ref | [컬럼] | TEXT | idx | → SubjectRefMap | userId?/guestId?/anonymousId? 통합(**가명 PII**) |
| signal_kind | [논리] | TEXT | (view\|add_to_cart\|checkout\|purchase\|wishlist\|alert\|coupon\|ai_verdict) | | CommerceEvent.eventType 정합 |
| product_ref / brand_ref | [논리] | TEXT | | → canonical refs | canonicalProductId/commerceProductId |
| order_ref / cart_ref | [논리] | TEXT | | → Order/Cart(mock) | ★mock checkout, 실결제/재고차감 0 |
| properties_sanitized | [컬럼] | TEXT(JSON) | | | ★sanitize 강제(원문/PII 금지) — 주석 규약→계약 강제 승격 |
| privacy_level | [컬럼] | TEXT | (anonymous\|user_consented\|aggregated) | | Outbox 정합 |
| consent_scope / consent_status | [컬럼] | TEXT | enum(§N) / AlertSubscription 정합 | | |
| retention_policy / expires_at | [컬럼] | | enum(§N) | | 행동 signal TTL |
| deleted / blocked | [컬럼] | BOOL | | | erasure 대상 |
| ts / environment / is_test | [논리/기존] | | | | production만 집계 |

**정렬 규칙:** Cart/Order/Wishlist/Alert = **mock 유지**(live/write 0). Wishlist.note·CommerceEvent.propertiesJson·payloadJson 자유텍스트 PII 유입은 계약 레벨 sanitize로 차단(현재 주석 규약 의존 → WATCH §W-W7). ProductSalesDaily·LearningInsight는 PII-free 집계라 CommerceMemory governance 밖(고객 키 없음).

---

## M. FoundationSyncState / SubjectRefMap 구조

서비스 → Foundation로 **안전한 신호/컨텍스트 동기화 상태**를 관리하는 서비스-소유 엔티티. ★고객기억을 Foundation에 심지 않는다 — memory_context 조립을 위한 **참조/동의 상태**만 관리.

### M-1. FoundationSyncState (Cosmile FoundationSignalOutbox + SIASIU candidate adapter 정렬)

| 필드 | 타입 | 키/제약 | nullable | refs | 비고 |
|---|---|---|---|---|---|
| id | TEXT | PK | N | — | |
| subject_ref | TEXT | idx | Y | → SubjectRefMap | ★raw id 미포함(P2 대응)·**가명 PII** |
| furef_local_ref | TEXT | idx | Y | furef_v2_<32hex> | opaque bridge · ★**가명(pseudonymous) 개인정보 — 익명 아님**(삭제·보존·동의 대상) |
| signal_type / signal_version | TEXT | | N | | |
| idempotency_key | TEXT | UNIQUE | N | | 중복 방지 |
| source_event_id | TEXT | | Y | → CommerceEvent/EpisodeSummary | provenance |
| payload_refs | TEXT(JSON) | | N | refs only | ★raw ids/PII 금지 — refs/atom/enum만(P2 patch) |
| privacy_level | TEXT | | N | (anonymous\|user_consented\|aggregated) | consent 등급 |
| status | TEXT | | N | (pending\|sent\|failed\|blocked\|skipped) | |
| last_synced_at / sent_at | ts | | Y | | |
| error_message | TEXT | | Y | | |
| ~~cross_service_broker~~ | — | | — | **v1 범위 밖** | ★cross-service broker = **v1 미구현·future release train**(결정 #10). v1 SubjectRefMap은 service-local(cross-service 필드 없음) |

### M-2. SubjectRefMap (신설, identity 축) — ★가명 PII governance 대상

| 필드 | 타입 | 키 | 비고 |
|---|---|---|---|
| subject_ref | TEXT | PK | 파생 토큰 · **가명 개인정보** |
| service_id | TEXT | idx | |
| furef_local_ref | TEXT | idx | furef_v2_<32hex> · **가명 개인정보**(익명 아님) |
| guest_ref / anonymousId_ref | TEXT | idx | 병합 대상(B-e) |
| allow_link | BOOL | | consent-gated identity linking(미동의=매핑 미생성) |
| consent_scope / retention_policy | TEXT | | ★신규 — SubjectRefMap도 LongTermMemoryFact와 **동일 consent/retention/delete governance** 적용 |
| deleted / blocked / deleted_at / expires_at | BOOL/ts | | ★erasable(삭제권 대상) |
| created_at | ts | | 매핑 저장(파생) · ★secret 값 로그/출력 0 |

**★identity 분류·정합(적대 리뷰 high/medium — pii-deanon 핵심):**
- **furef_local_ref/subject_ref = 가명(pseudonymous) 개인정보다. '익명(anonymous)'이 아니며 'PII 아님'이 아니다**(FOUNDATION_COMMON_IDENTITY_REF_POLICY_20260703 §17/§54/용어 규약 정합). **삭제·보존·동의 lifecycle 대상**이다.
- **secretless SHA256 furef(SIASIU 현행 16-hex plain SHA256)은 열거 가능 → 원 식별자 복원 가능** = recoverable pseudonymous PII로 취급.
- **★SubjectRefMap = service-local map**: 한 서비스 내부의 `subject_ref ↔ furef_local_ref ↔ (guest_ref/anonymousId)` 매핑만 담는다. **SIASIU subject_ref와 Cosmile subject_ref를 연결하는 cross-service join table이 아니다**(cross-service linkage = v1 범위 밖·§B #10). LongTermMemoryFact와 **동일한 consent/retention/delete governance** 아래 둔다(erasable·service-local).
- **`allow_link` consent가 없으면 `furef_local_ref` + `subject_ref`를 같은 row에 저장 금지**(join key 생성 차단).

**★subject_ref keying 현황(적대 리뷰 medium — 강한 표현 정정):**
- **TARGET(미배포):** `subj_v2_` + HMAC_SHA256(secret, furef_v2)[:32] · 평문 PII local_ref reject · prod secret 부재 시 `SubjectRefSecretMissing` fail-closed. **이 v2 형태는 local commit c9bb996에만 존재(unpushed, flag `shared_memory_v0_shadow` OFF, write 0)이며 consult_contract가 소비하지 않는다**(foundation_http_service grep 0, §W-W16).
- **현행 shadow keying:** 기배포 `resolve_subject` = `subj_` + sha256(_SALT|svc|ref)[:16] (64-bit) + **하드코딩 DEV salt 기본값**(secret 없으면 열거 저항 붕괴).
- **오늘 consult 요청 경로는 subject_ref를 아예 싣지 않는다.**
- 따라서 **'v2 HMAC + prod fail-closed + 하드코딩 salt 제거'는 service-local subject_ref keying의 기본 요건**이며, (v1 범위 밖인) 어떤 미래 cross-service broker보다 **먼저** 충족되어야 한다. §V에서 "평문 local_ref 거부"를 assert. ★cross-service broker 자체는 v1 미구현(future release train).

---

## N. Consent / Retention / Delete 구조

계약↔저장 비대칭 해소의 핵심. 4층 consent + retention TTL + 3-state delete + cross-store erasure + guest 병합.

### N-1. Consent (4층 + ledger)

| 층 | 위치 | 형태 | 저장 |
|---|---|---|---|
| ① 선언 | MemoryCandidate/Fact.`consent_scope` | enum: none\|same_service\|cross_service\|foundation_only | 서비스 storage(1급 컬럼) |
| ② 증거 | 런타임 `consent_record` | {scope, allow_link} | ephemeral(요청 후 폐기) |
| ③ per-record | CDM `consent`(bool) | SENSITIVE_TYPES(condition/reaction) 없으면 금지 | 정책 판정(무저장) |
| ④ identity | resolve_subject `allow_link` | 미동의=subject_ref 매핑 미생성 | 파생(가명 PII) |
| ★신설 | **ConsentRecord ledger(서비스-소유)** | grant_ts·version·scope·withdrawal·audit | **영속(서비스 소유)** — 현재 전무 |

**ConsentRecord ledger(신설):**

| 필드 | 타입 | 키 | 비고 |
|---|---|---|---|
| id | TEXT | PK | |
| subject_ref | TEXT | idx | |
| scope | TEXT | | consent_scope enum |
| granted_at / withdrawn_at | ts | | ★현재 어디에도 없는 audit trail |
| consent_version | TEXT | | 계약 버전 |
| source | TEXT | | 동의 획득 경로 |

**taxonomy 정합(canonical):** `MEMORY_KINDS = preference·concern·reaction·decision_history·outcome_feedback·safety_note`. alias: CDM `condition` → `concern`. SENSITIVE = {concern/condition, reaction, safety_note} 또는 sensitivity_level∈(sensitive,high) → consent_scope 필수. ★shared_memory `gate.py:77`가 `condition`을 `invalid_memory_kind`로 block하는 현재 divergence를 alias로 해소(WATCH §W-W12).

**★특수범주 안전정보:** pregnancy_nursing/allergy 등 안전 fact의 cross-service 공유는 안전 우회와 무관하게 `consent_scope=cross_service` + broker OFF-해제(consent-gated)를 반드시 요구한다(§J-2/B-d).

### N-2. Retention (TTL 표 — 신설, 승인 필요)

현재 enum(session/short_ttl/standard_ttl/revocable)만 있고 **구체 기간·expires_at·자동 sweep 부재**.

**★enum↔'(safety)' 충돌 해소(적대 리뷰 medium):** `retention_policy` enum = `{session, short_ttl, standard_ttl, revocable}`. `safety`는 **enum 값이 아니다** — `is_safety`(brain.py CANON.is_safety 파생)에서 나오는 파생 플래그다. **확정: `is_safety=true`가 retention_policy를 override하여 auto-expire를 skip한다.** 아래 표에서 '(safety)' 행은 policy-값이 아니라 **is_safety override** 주석이다(별도 permanent enum 값 추가하지 않음).

| retention_policy (enum) | 대상 예 | TTL(제안) | 만료 동작 |
|---|---|---|---|
| session | 세션 한정 signal | 미영속 | 세션 종료 시 폐기(read 미노출) |
| short_ttl | 휘발성 행동 signal(view 등) | 30일(제안) | expired → sweep |
| standard_ttl | 비안전 fact·episode | 365일(제안) | expired(비안전은 '(예전)' 약화 후 만료) |
| revocable | 동의-철회 구동 | 자동만료 없음 | consent withdrawal → block/삭제 전파 |
| *is_safety override (enum 값 아님)* | avoid_ingredient·allergy·pregnancy_nursing | **auto-expire 제외** | 명시적 erasure/reconfirm만 존중(is_safety가 위 어떤 policy든 auto-expire를 무력화) |

**자동 만료:** `expires_at` 컬럼 + 시간기반 sweep 필요(현재 수동 `expire_sweep`만). `is_safety=true` row는 auto-expire 제외(비대칭 유지).

### N-3. Delete (3-state + must_not_reappear)

| 상태 | 트리거 | 효과 |
|---|---|---|
| deleted | 삭제 요청(right-to-erasure) | must_not_reappear · read skip · 파생물(hash/summary) 폐기 |
| blocked | 정책 차단 | must_not_reappear (★shared gate.py 현재 blocked 미검사 — 배선 필요) |
| expired | retention 만료 & !reconfirmed | reconfirm 전 재사용/노출 금지 |

★3-state 통일: SIASIU `deleted_expired_guard`·CDM은 blocked 명시 처리하나 FOUNDATION `shared_memory/gate.py:72-76`은 deleted/expired만 검사 → **blocked 분기 배선**(WATCH §W-W13).

### N-4. Erasure 전파 — ★v1 = service-local only

right-to-erasure는 **v1에서 각 서비스 내에서만** 다룬다: 삭제 요청 → **자기 서비스 store**(SIASIU면 SIASIU memory.db, Cosmile이면 Cosmile prisma) + 그 서비스의 파생물(content_hash/summary/evidence_refs) + **service-local SubjectRefMap 매핑** 폐기. ★**Foundation은 고객기억을 저장하지 않으므로 고객기억 erasure 대상이 아니다**(Foundation shadow store는 synthetic·write 0). 본 계약 정의 항목(service-local): 전파 순서·idempotency·audit·revocation(consent withdrawal→block→delete). ★**cross-service erasure propagation(SIASIU↔Cosmile 간)은 v1 범위 밖 → future release train**. live 전파도 별도 release train(본 설계는 shadow 시뮬레이션까지).

### N-5. Guest → Subject 병합 — ★service-local only (B-e 상술)

게스트 로그인/신원확정 시 (**같은 서비스 내에서만**):

1. **재키잉:** `guest_ref`/`anonymousId_ref` 소유 레코드(ConversationSession·LongTermMemoryFact·CommerceMemory·EpisodeSummary·ConsentRecord)를 **같은 서비스의** subject_ref로 재키잉. ★**SIASIU guest→SIASIU subject · Cosmile guest→Cosmile subject · SIASIU↔Cosmile 병합 없음.**
2. **consent 승계/재확인:** 게스트 시점 consent를 subject로 승계하되 sensitive는 재확인. (cross_service consent는 v1 미사용 — 범위 밖.)
3. **idempotency·audit:** 병합은 idempotent(중복 실행 무해)하고 audit 기록.
4. **미동의 거부:** `allow_link=false`면 병합 거부(매핑 미생성, guest 레코드 분리 유지). ★`allow_link`는 **service-local guest→user 병합에만** 사용(cross-service allow_link = v1 범위 밖).

★anonymousId(device-level)→subject_ref(furef 파생) 매핑도 이 규칙을 따르며 **service-local**이다(§W-W22).

---

## O. memory_context 정의

**memory_context** = 서비스가 **매 요청마다** 자기 소유 memory에서 조립해 Foundation consult에 실어 보내는 **request-scoped, ephemeral 안전 컨텍스트**다.

- ★별도 최상위 필드가 아니라, 실제 착지점은 **SSC.session_context**(+ known_allergies/avoid_ingredients/product_context)다. 'memory_context'라는 in/out 필드는 코드에 없음 — 서비스-side 조립 객체를 지칭하는 논리명.
- Foundation은 이것을 **소비/검증만** 하고 저장하지 않는다(결정 #6). 요청 종료 시 폐기(결정 #7).
- **★단, SSC.session_context는 freeform dict이므로 Foundation이 raw/PII 미유입을 구조적으로 보장하지 못한다** — memory_context의 raw 제외는 **service-side 조립 규약 + Foundation ingress default-deny gate**(§R)의 이중 강제로 지킨다.
- 담는 것: subject_ref(opaque·가명 PII·broker OFF면 미포함) · session refs · 최근 episode summary refs · LTM fact refs(enum/atom) · commerce signal refs · consent flags.
- **담지 않는 것: raw 상담원문 · raw PII · 주문/결제/배송 원문 · value_display 평문 · summary_text 평문.**
- Foundation은 memory_context로부터 없는 기억을 생성하지 않고(create 0), memory_read_provider 미연결(고객 영속 memory 미접근).

---

## P. memory_context schema

서비스-side 조립 객체 → Foundation SSC 매핑. ★raw 제외.

| 필드 | 타입 | 값/enum | Foundation 착지 | 비고 |
|---|---|---|---|---|
| subject_ref | TEXT | subj_v2_/furef_v2_ opaque(**가명 PII**) | (미전송 권장) | ★broker OFF면 미포함; ON이면 §R ingress 평문 reject 게이트 통과 필수 |
| session_refs.stated_concerns | []TEXT | detected_conditions 누적 | SSC.session_context.stated_concerns | 카테고리(원문❌) |
| session_refs.recommendation_deferred | BOOL | | session_context | |
| session_refs.last_refined_intent | TEXT | enum | session_context | |
| session_refs.safety_facts.avoid_ingredient | []atom | ingredient atom | session_context.safety_facts + SSC.avoid_ingredients | immutable union(same-service 보호) |
| session_refs.safety_facts.allergy | []TEXT | | session_context.safety_facts + SSC.known_allergies | ★특수범주 — cross-service는 consent 필요 |
| session_refs.safety_facts.pregnancy_nursing | BOOL/enum | | session_context.safety_facts | 안전 비대칭(same-service) · cross-service consent 필요 |
| episode_summary_refs | []{summary_id, content_hash(keyed), intent_types, risk_level} | | (refs만) | ★summary_text·원문 제외 · content_hash=HMAC/keyed·durable cross-service 미저장 |
| ltm_fact_refs | []{type, norm_value/atom, confidence, fact_state} | registry enum | (refs만) | ★value_display(원문 표시값) 제외 |
| commerce_signal_refs | []{signal_kind, product_ref, privacy_level} | | product_context | ★주문/결제/배송 제외 |
| consent_flags | {consent_scope, sensitivity_level, retention_policy} | enum | (policy 입력) | fail-closed 판정용 |
| user_constraints | {no_recommendation, explanation_only} | | SSC.user_constraints | |

**제외 목록(불변):** raw utterance · email/phone/RRN/card · name · 주문번호/결제/배송 주소 · value_display 평문 · summary_text 평문 · customer_id/anonymous_id/user_id. (Foundation은 mask_pii + keyed query_hash로만 흔적화.) **★모든 raw-파생 hash는 keyed(HMAC) 또는 per-service salt** — 전역 unsalted 절단 hash는 cross-service correlator이므로 금지(§S).

---

## Q. memory_context 생성 / 사용 / 폐기 lifecycle

```
[서비스] 요청 수신
  → (1) 생성: 서비스가 자기 소유 storage에서 조립
       - subject_ref 해석(consent allow_link 확인 · broker OFF면 subject_ref 미포함)
       - active LTM fact refs(안전 fact 우선, deleted/blocked/expired skip)
       - 최근 episode summary refs(원문❌·summary_id/keyed hash만)
       - commerce signal refs(sanitized)
       - consent_flags 부착
  → (2) 직렬화: 안전 부분집합만 SSC.session_context/known_allergies/avoid_ingredients/product_context로
  → [Foundation] consult_contract 진입 (server.py:77-79)
       - ★(신규 M5) ingress default-deny scan: session_context/service_context/product_context를
         shared_memory/gate.has_raw_or_pii로 검사 → raw/PII/식별자 발견 시 reject(fail-closed)
       - session_in = payload.session_context (core.py:1170)
       - safety_facts immutable union (prior ∪ current) + stated_concerns recall (core.py:1222-1246)
       - SSC known_allergies/avoid_ingredients → safety_facts.avoid_ingredient 합류 (core.py:1601-1607)
       - judge/safety/evidence 판단 (request-scoped, 저장 0)
       - extract_candidate = compute-only, upsert_blocked_by_policy (core.py:1244-1255)
       - memory_read_provider_called = False (고객 영속 memory 미접근)
  → (3) 반환: session_context_out으로 갱신본 반환 (core.py:1462-1469)
       - INVARIANTS: write_performed=false · memory_write=false · raw_text_stored=false · pii_stored=false
  → (4) 폐기: 요청 종료 시 Foundation은 memory_context/session_out 미보관
       - 서버 _TRACE_RING: path(쿼리제거)/status/trace_id/decision만 휘발(max 200), 원문/PII 0
  → [서비스] session_context_out을 자기 storage에 반영(정본은 서비스 소유)
       - ★FRC trace_id를 로컬 고객 record 옆에 저장 시 hashing 또는 미저장(P1 방지, §T)
```

핵심 불변: **Foundation 쪽 durable write 0** · memory_context는 payload IN/OUT only · 요청 경계 밖 생존 0 · **ingress raw/PII reject(§R)**.

---

## R. Foundation consult_contract와 연결 방식

- **진입점:** `core.consult_contract` (server.py:77-79). SSC in → FRC out.
- **memory_context 착지:** SSC.session_context + known_allergies/avoid_ingredients/product_context. 별도 memory_context 필드 신설 불필요(기존 session_context 재사용 — **더 단순**하다. ★정정: **더 단순할 뿐 더 안전하지 않다** — untyped freeform dict는 경계에서 schema-validate가 불가하므로 ingress gate로 raw/PII를 default-deny해야 한다).
- **★ingress default-deny scan:** consult_contract 진입 시 session_context/service_context/product_context를 스캔해 raw utterance/PII/고객 식별자 발견 시 **fail-closed reject**한다. ★**정본 gate 스펙 = `MEMORY_CONTEXT_CONTRACT_V1`(M3) §7 v1.2 신규 default-deny gate**(unknown-key reject·whitelist 강제·type/enum·nested recursive·상한·CUTOVER echo 호환). ★**본 앵커 §A(:50)·§D(:135)·§Q(:584)·§R·§U-M5·§V·W26 7곳의 "has_raw_or_pii" 재사용/검사/미배선 서술 전부**를 이 M3 v1.2 신규 스펙이 SUPERSEDE한다(§S 제거 — §S에는 해당 서술 없음·§A 추가 — Executive Summary 미배선 서술 포함·각 원문은 유지하되 본 선언이 supersede함을 명시)(has_raw_or_pii는 default-allow blacklist라 불충분·Fable5 D-1). 현재 미배선(M5 배선). §V assert.
- **safety_facts union:** consult_chat이 prior ∪ current-turn을 immutable union(core.py:1222-1246). SSC known_allergies/avoid_ingredients도 avoid_ingredient로 합류(core.py:1601-1607). same-service 보호 목적 — cross-service 노출은 별개 consent gate.
- **반환:** FRC(trace_id·decision_type·safety_gate_result·products_allowed·product_candidates refs·evidence source_trace) + session_context_out. **FRC엔 raw 없음**(`raw_pii_included:False`, contracts.py:221). ★서비스가 FRC trace_id를 로컬 고객 record에 저장 시 hashing/미저장(§T P1).
- **flag OFF:** cross-service broker·shared_memory_v0_shadow = **default OFF**. OFF면 API inert. memory_read_provider 미연결 유지.
- **★subject_ref bridge precondition(적대 리뷰 medium):** foundation_http_service에는 subject_ref/subj_v2/furef 미배선(FOUNDATION repo c9bb996에만, unpushed). 현재 memory_context는 익명 session payload로만 흐름. **cross_service_broker=True로 켜기 전, `subj_v2 HMAC + prod secret 부재 fail-closed(SubjectRefSecretMissing) + 평문 local_ref reject + 하드코딩 DEV salt 제거`를 consult_contract ingress에 배선하는 것이 hard precondition**이다. broker를 켜는 것은 오늘 identity 토큰이 없는 경로에 identity를 배선하는 위험 순간이다.
- **★현재 gap:** FRC에 `memory_reuse_decision`(allowed/blocked/expired/deleted/consent_required/not_available — CLAUDE.md §5 필수 output)이 없다. consult_contract는 SSC가 준 safety_facts를 그대로 신뢰(consent/삭제/만료 검증 부재). → **memory reuse 게이트를 서비스-side에서 memory_context 조립 시 적용**(deleted/blocked/expired fact를 애초에 refs에 안 넣음)하고, FRC `memory_reuse_decision` 필드 추가는 **후속 release train 후보**(WATCH §W-W15).

---

## S. raw PII / trace / de-anon guard

★적대 리뷰 반영: 아래는 **현재 활성 불변식**과 **TARGET(미배선)**·**scope 한정**을 구분한다.

| guard | 구현 | 상태 | scope/불변식 |
|---|---|---|---|
| trace_id ↔ raw id 미결합 | `trace_id='fdsh_'+uuid4().hex[:16]`(랜덤·매요청, core.py:90-91) | **활성(Foundation-side 한정)** | ★**Foundation 내부에서만** identity와 join 불가. **서비스-side에서 FRC trace_id를 identity 옆에 persist하면 de-anon correlator가 된다**(P1) → §T |
| opaque subject_ref (v2 HMAC) | `subj_v2_`+HMAC_SHA256(secret, furef)[:32]·평문 local_ref reject·prod secret 부재 fail-closed | **TARGET · NOT wired**(c9bb996 unpushed·flag OFF·consult 미소비, §W-W16) | broker enable 전 hard precondition |
| 현행 shadow keying | `subj_`+sha256(_SALT\|svc\|ref)[:16] (64-bit) + 하드코딩 DEV salt | **현행(약함·열거 가능)** | secret 없으면 열거 저항 붕괴 · 오늘 consult 경로엔 subject_ref 미탑재 |
| 식별자 미수신 | SSC **top-level** 스키마에 customer_id/user_id/anonymous_id 필드 부재(contracts.py:37-73) | **부분**(top-level만) | ★session_context는 freeform → 식별자 삽입 가능 = **convention, ingress gate로 강제**(§R). de-anon은 **consent fail-closed+broker OFF로 차단 중**, 구조적 불가 아님 |
| raw text 미저장 | mask_pii→[REDACTED]+found · query_hash | **활성(출력 라벨)** | ★query_hash는 **keyed(HMAC)/per-service salt** 필수 — unsalted 절단 hash는 correlator |
| trace ring 휘발 | _TRACE_RING: path(쿼리 제거)/status/trace_id/decision만, max 200 | **활성** | 원문/PII/query 미보관·durable 아님 |
| INVARIANTS | api_live/write_performed/raw_text_stored/pii_stored/memory_write=False | **활성(출력 라벨)** | ★라벨이지 ingress 강제가 아님 → §R gate 병행 |
| furef/subject_ref 분류 | — | **정책** | ★**가명(pseudonymous) 개인정보 — 익명 아님·'PII 아님' 아님.** secretless 16-hex SHA256은 열거→복원 가능. 삭제·보존·동의 대상(§M/§N) |

**서비스-side 추가 guard(신설):** subject_ref keying(email-in-key 금지, B-a) · memory_context 조립 시 raw 제외(§P) · properties sanitize 강제(§L) · consent ledger audit(§N) · **FRC trace_id 로컬 저장 시 hashing/미저장(§T)** · **raw-파생 hash keyed/per-service salt**.

---

## T. P1 / P2 / P3 patch와의 관계

| patch | 위치 | 위험 | 본 계약의 흡수(★canonical fix 복원) |
|---|---|---|---|
| P1 | Cosmile `foundation_decision_received`(foundation_trace_id + customer_id + anonymous_id 동일 row) | **service-side join** — 랜덤 trace_id가 identity 옆에 persist되면 de-anon correlator | ★**canonical fix 복원(적대 리뷰 medium):** (a) **FRC/foundation_trace_id는 로컬 고객 record에 hashing하거나 미저장**(FOUNDATION_MEMORY_INVENTORY_AUDIT §11/§12/§13), (b) identity 필드 분리(userId XOR anonymousId) 또는 opaque subject_ref로 대체, (c) trace_id ↔ 식별자 동일 row 금지 |
| P2 | Cosmile `FoundationSignalOutbox` raw ids | payloadJson raw id 노출 | §M payload_refs = refs/atom/enum only · sanitize 계약 강제 · privacy_level 태깅 · furef/subject_ref는 가명 PII governance 편입 |
| P3 | SIASIU `logins.txt` raw email(원문 미열람) | ts/provider/name/email tab-line raw PII sink | SubjectRefMap opaque keying(email-in-key 금지) · display_name 최소화·암호화 · logins.txt는 memory 스키마 밖이나 신원 저장소 → 마스킹/keyed-hash patch(별도) |

**관계:** P1/P2/P3는 본 공통 계약이 **정본 구조로 예방**해야 할 실재 de-anon/PII 표면이다. **★§S row1의 'trace_id de-anon 불가'는 Foundation-side에 한정된 진술**이며, **서비스-side persistence(trace_id를 identity 옆에 저장)는 명백한 de-anon 벡터**임을 명시한다. ★**동반패치 semantics(M2 §9와 일치·D-10):** P1·P2·P3는 **M4 구현과 원자적으로 묶인 동반 patch이며, 각 서비스 memory 정렬 커밋은 해당 P-patch 없이 먼저 merge/live 되지 않는다**(= **M4 동반·M4 선행조건**). ~~"별도 release train"~~·"사후" 표현 폐기(3설 병존 제거). 실제 코드 수정은 해당 repo 소관(control tower가 contract/plan 발행 → repo-local 구현). 본 설계는 patch가 정합해야 할 계약(opaque keying · payload refs only · sanitize · trace_id hashing/미저장 · identity 필드 분리)을 고정한다.

---

## U. 구현 단계 계획

design-first · flag OFF · live 게이트 최후. 각 단계 = 검증 가능한 목표.

- **M1 — Scope 확정 (본 문서).** Foundation memory scope(§C/§D) · 공통 계약(§E·9엔티티) · taxonomy 정합(§N) · **opt-B 확정(§I-3·반영됨)** · **cross-service 공유 v1 범위 밖 확정(§B #10)** · **furef/subject_ref 가명 PII 분류(§M/§S)** 확정. 산출: **Control verdict = DESIGN_READY 상한** → **별도 reviewer/Fable5 FINAL_PASS**(Control self-review 금지). 검증: 독립 reviewer 승인 · 정본 audit·identity policy 정합.
- **M2 — Common Service Memory Contract 문서화.** `contracts/COMMON_SERVICE_MEMORY_CONTRACT_V0.md`(§E~§N field-level) 작성. consent enum·retention TTL 표(is_safety override 명시)·delete 3-state·erasure 전파·guest 병합(§N-5)을 정본화. 검증: contract lint · CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0와 enum 일치.
- **M3 — memory_context 계약.** §O~§R를 SSC.session_context 매핑으로 고정 + Foundation consult 연결 스펙 + **keyed hash 규약**. 검증: memory_context 조립 harness(shadow) · raw 제외 assertion · session_context_out round-trip.
- **M4 — 서비스 정렬 (SIASIU 유지 · Cosmile 신설).**
  - SIASIU: memory_fact/episode에 consent_scope·retention_policy·sensitivity·(soft)deleted/blocked/expired·source_ref·subject_ref keying **additive** 배선(기존 behavior·answer.py fingerprint unchanged). consent/delete 게이트를 runtime에 주입.
  - Cosmile: ConversationSession/Message(opt 확정본)·EpisodeSummary·MemoryFactCandidate·LongTermMemoryFact·CustomerProfile·ConsentRecord·SubjectRefMap 신설 + Cart/Order/Wishlist/CommerceEvent에 CommerceMemory 거버넌스 컬럼(§L) 가산. readiness adapter `1ce099e` 재사용·확장(삭제 금지).
  - 검증: SIASIU integration 39/39 · workflow 119/119 · Cosmile readiness 164/164 유지.
- **M5 — Foundation consult 연결 (flag OFF).** **★ingress default-deny gate 배선 = M3 §7 v1.2 신규 스펙**(has_raw_or_pii 재사용 아님·SUPERSEDED)(§R) · memory_reuse_decision(FRC) 후속 배선은 shadow·default OFF. ★Foundation은 **다른 서비스 고객기억을 조회하지 않는다**(broker 아님·cross-service v1 밖). **service-local subject_ref keying 전제: v2 HMAC + prod fail-closed + 하드코딩 salt 제거 + 평문 local_ref reject**. 검증: OFF면 API inert · ingress가 raw/PII/식별자 reject · memory_read_provider_called=False · Foundation runner 89/89·651.
- **M6 — live 게이트 + cross-service (별도 release train · v1 미포함).** consent ledger live · **service-local** erasure live · guest 병합 live(service-local, 설계는 M4)의 live 전환 = 각각 별도 승인. ★**cross-service 계열(SIASIU↔Cosmile 고객기억 공유 · consent-gated broker · cross-service SubjectRefMap · cross-store erasure propagation)은 v1 미구현 → 전부 future release train에서 재설계.** 본 v1 설계 범위 밖.

★모든 단계 write/live/promotion=0 · applied_to_real_user=false 유지. repo-local 구현은 control tower가 발행한 contract/plan에 따라서만.

---

## V. 테스트 / 검증 기준

phase별 PASS/FAIL + safety invariant 0 필수. Dual-Vertical Test Policy(§8.5) 적용 — 상담/안전/판단/추천/memory reuse 관련이면 SIASIU + Cosmile 함께.

**기존 regression 유지(삭제/완화 금지):**

- Foundation Core runner: 89/89 · 651 assertions.
- SIASIU integration eval: 39/39 · answer.py fingerprint `d7f579443f8a110a` unchanged.
- SIASIU workflow regression: 119/119.
- Cosmile readiness adapter `1ce099e`: 164/164.
- Cosmile AI Commerce loop: v0.1 112/112.
- cross_project_regression_runner: 전 항목 PASS.

**신규 검증(design→shadow):**

- **ingress gate(M3 §7 v1.2 신규 default-deny·has_raw_or_pii SUPERSEDED):** session_context/service_context/product_context 내 **raw utterance/PII/고객 식별자 = 0**(신규 gate reject 동작 assert)·**정상 echo/safety carry/catalog round-trip 통과**(REG-1). ★freeform dict raw 삽입 reject·whitelist 외 key reject 확인.
- memory_context 조립: raw utterance/PII/주문결제 **제외** assertion(0건).
- consent gate: consent 없는 sensitive(condition/reaction/safety_note) 재사용 = blocked(fail-closed).
- **cross-service 안전 fact:** pregnancy_nursing/allergy cross-service 노출이 `consent_scope=cross_service` 없이 = blocked(안전 우회가 consent gate 안 뚫는지).
- delete 3-state: deleted/blocked/expired must_not_reappear(재등장 0).
- retention: expired&high는 reconfirm 전 재사용 0 · is_safety override로 안전 fact auto-expire 제외 확인.
- taxonomy 정합: condition↔concern alias · shared gate blocked 분기 · invalid_memory_kind 0(정합 후).
- **de-anon:** trace_id ↔ 식별자 join 0(Foundation-side) · **서비스-side FRC trace_id는 hashing/미저장 확인(P1)** · subject_ref opaque · payload_refs raw id 0(P1/P2) · logins.txt/email-in-key 0(P3) · **raw-파생 hash keyed/per-service salt 확인**.
- **identity governance:** SubjectRefMap이 consent/retention/delete 대상인지 · allow_link 없으면 furef+subject_ref 동일 row 미생성 · **broker-ON + 평문 local_ref = reject**(v2 gate precondition).
- **guest 병합:** allow_link=false면 병합 거부 · 병합 idempotency/audit.
- INVARIANTS: api_live/write_performed/raw_text_stored/pii_stored/memory_write = false 전 경로.

**중단 조건(하나라도 = STOP):** false_allow>0 · privacy/customer leak>0 · unsupported recommendation>0 · medical/pregnancy overreach>0 · safety caveat removal>0 · deleted/blocked/expired memory reuse>0 · **cross-service 안전 fact consent 우회>0** · write/live/promotion>0 · checkout/order/customer DB write>0 · raw query/body/PII in trace · **session_context ingress raw/PII/식별자>0** · regression deleted · 설명 없는 test count 감소 · force push.

---

## W. WATCH / PATCH_REQUIRED 예상 목록

| # | 항목 | 유형 | 근거/위치 |
|---|---|---|---|
| W1 | SIASIU memory_fact/episode에 consent/expiry/delete-audit 컬럼 부재 → 정책↔저장 비대칭 | PATCH_REQUIRED | brain.py:82-84 · 정책 모듈 미주입 |
| W2 | SIASIU 삭제 = reset user 단위 hard DELETE만(per-fact/tombstone/audit 없음, GDPR 삭제권 미설계) | PATCH_REQUIRED | brain.py:1283-1288 |
| W3 | user_id = email 파생 가능(PII-in-key) → subject_ref opaque keying 필요 | PATCH_REQUIRED(P3 동류) | store.js:71 |
| W4 | SIASIU logins.txt raw email tab-line sink | PATCH_REQUIRED(P3) | server.py:26/193 (원문 미열람) |
| W5 | Cosmile 상담/사실/프로필/후보 persistent 5종 부재(결정 #1~#4 미충족) | PATCH_REQUIRED | schema.prisma gap |
| W6 | Cosmile CommerceEvent/FoundationSignalOutbox de-anon(동일 row 식별자 상관) | PATCH_REQUIRED(P1/P2) | schema.prisma:15-54/185-206 |
| W7 | 자유텍스트 PII 유입(Wishlist.note·propertiesJson·payloadJson) sanitize 주석 규약뿐(스키마 강제 아님) | WATCH | schema.prisma |
| W8 | retention TTL 구체 기간·expires_at·자동 sweep 부재 + enum에 permanent 없음(is_safety override로 확정) | WATCH | contract.py:23 enum만 |
| W9 | revocable retention · consent withdrawal→propagation 미구현 | WATCH | gate.py(revocable=standard 취급) |
| W10 | 영속 consent ledger(grant/version/withdrawal audit) 어디에도 없음 | PATCH_REQUIRED | consent_record ephemeral만 |
| W11 | ★cross-service erasure propagation(SIASIU↔Cosmile) = **v1 범위 밖 → future release train**. v1은 service-local erasure만(§N-4). Foundation은 고객기억 미저장→erasure 대상 아님 | WATCH(future train) | §N-4 |
| W12 | taxonomy 불일치: condition(CDM)↔concern(shared)·safety_note 부재 → shared gate가 condition을 invalid_memory_kind block | PATCH_REQUIRED | gate.py:77 · CDM_TYPES |
| W13 | blocked 상태 divergence: shared gate.py가 blocked 미검사(deleted/expired만) | PATCH_REQUIRED | gate.py:72-76 vs deleted_expired_guard |
| W14 | reconfirmation 흐름(주체·유효기간·이벤트 기록) 미정의 | WATCH | 정책 모듈 |
| W15 | FRC에 memory_reuse_decision 부재(CLAUDE.md §5 필수 output) — consent/삭제/만료 검증 부재 | WATCH(후속 train) | contracts.py FRC |
| W16 | subject_ref v2 hard gate(c9bb996)가 foundation_http_service에 미배선(unpushed·flag OFF·consult 미소비) | **PATCH_REQUIRED-before-memory-key-live**(service-local subject_ref keying 전제 · cross-service broker는 v1 밖) | core/contracts/server grep 0 · SUBJECT_REF_HARD_GATE_RESULT_20260704 |
| W17 | KB 물리 아티팩트 ssbrain.sqlite가 SIASIU repo 소유(per-project index) — Foundation은 판단/검색 레이어만 소유(소유권 표면 상충) | WATCH(canonical-KB 재배치 train 후보) | retrieval_provider.py:13 · **ssbrain/schema.py:8** |
| W18 | CustomerProfile 서버화 시 foundation_state_v1 client 평문(email/name/gender) 탈피 필요 | WATCH | store.js:7-20 |
| W19 | Console*(운영자 콘솔)를 고객 LTM으로 오인 금지(role separation) | WATCH | schema.prisma:208-326 |
| W20 | 자가성장 지식층(knowledge_claim/regrow/Opus gate)은 설계만·코드 0(phantom) | WATCH | 감사 §6 위험2 |
| **W21** | **SIASIU commerce 부재로 commerce 축 대칭 불가 → 계약은 schema-available·populate-conditional(결정 #3 재정의)** | **WATCH(신규)** | §B #3 · §L · §H |
| **W22** | **guest_ref/anonymousId → subject_ref 병합(재키잉·consent 승계·idempotency·미동의 거부) 미정의(B-e로 도입) — ★service-local only(SIASIU↔Cosmile 병합 없음)** | **PATCH_REQUIRED(신규·service-local)** | §M-2/§N-5 · CommerceEvent.anonymousId |
| **W23** | **furef/subject_ref를 '익명/PII 아님'으로 오분류 위험 — 가명(pseudonymous) 개인정보로 governance 편입 필요(secretless 16-hex SHA256 열거 가능)** | **PATCH_REQUIRED(신규)** | IDENTITY_REF_POLICY_20260703 §17/§54 · store.js furef |
| **W24** | **서버-측 raw ConversationMessage.content(특히 Cosmile opt-B) 및 CustomerProfile PII의 at-rest 암호화·접근통제 미정의** | **WATCH(신규·별도 보안 train)** | §I-2 · §K |
| **W25** | **raw-파생 truncated hash(content_hash/query_hash sha256:16)가 unsalted 전역이면 cross-service correlator·저엔트로피 PII 열거 가능 → keyed(HMAC)/per-service salt 필요** | **WATCH(신규)** | §D · §I-2 · §P · §S |
| **W26** | **Foundation ingress에 session_context raw/PII default-deny gate 미배선(has_raw_or_pii 미연결) — 경계가 convention에 의존** | **PATCH_REQUIRED(신규)** | contracts.py:51/71/72 · core.py:1602/1224/1462/1469 · grep 0 |
| **W27** | **§S trace_id 불변식이 Foundation-side 한정임에도 무조건적으로 서술되기 쉬움 — 서비스-side FRC trace_id persist는 de-anon 벡터(P1)** | **WATCH(신규)** | §S · §T · INVENTORY_AUDIT §11-13 |

---

> **완료/미완/금지 구분**
> **완료(설계):** Foundation memory scope 고정 · **공통 계약(9엔티티·opt-B·동일 계약 정의 확정)** · memory_context 정의/schema/lifecycle · consent/retention/**service-local delete/erasure/guest 병합** 구조(is_safety override) · de-anon guard(가명 PII 재분류·ingress gate·keyed hash·trace_id scope) · P1/P2/P3 canonical fix 복원 · 구현 단계 · **cross-service = v1 범위 밖 고정**.
> **아직 아님(구현):** M2~M6 구현 · ingress gate 배선 · consent ledger · **service-local erasure** · Cosmile 신규 모델 · service-local SubjectRefMap governance · **service-local guest 병합** · FRC memory_reuse_decision · retention TTL 기간 확정.
> **v1 범위 밖(future release train):** SIASIU↔Cosmile 고객기억 공유 · consent-gated broker · cross-service SubjectRefMap · cross-service allow_link · cross-store erasure propagation.
> **금지(별도 승인 없이 불가):** production live · public API live · customer memory live migration · cross-service broker enable · checkout/order/customer DB write · canonical/learned promotion · Vault write · force push.
> **다음 release train:** M2 공통 계약 문서화 → M4 서비스 정렬(SIASIU additive·Cosmile 신설) → M5 ingress gate + subject_ref precondition → (별도) live 게이트.
> **rollback:** 본 문서는 design-only(코드 0). 모든 후속 구현은 flag OFF·additive·shadow로 rollback 가능해야 함.
> **read-only 준수:** memory.db·*.db·logins.txt·raw PII 미열람 · secret 값 출력 0 · 코드/migration/git 변경 0.
