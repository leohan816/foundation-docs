# Foundation / SIASIU / Cosmile — Memory Inventory Audit — 상태: **PATCH_REQUIRED**

> 작성: Foundation-control (Memory Inventory Audit) · 2026-07-04 · ★read-only 재고조사 · 코드 수정 0 · migration 0 · PII/DB 덤프 0.
> 조사: Foundation `foundation_http_service` (HEAD 7cf53e8) · SIASIU app (3cd068d) · Cosmile app (a5547e1) · foundation-docs 미러 설계문서.
> ★핵심: **Foundation memory boundary는 clean(request-stateless)**. 그러나 **service-local 저장소(Cosmile 이벤트/아웃박스·SIASIU 로그인로그)에 de-anon/PII BLOCKER 3건** → PATCH_REQUIRED.

## 1. Executive Summary
- **Foundation = PASS**: request-level stateless(INVARIANTS write/raw_text/pii/memory_write=false)·persistent 고객기억 0·ssbrain KB는 canonical read-only·outbox 없음·subject_ref hard gate는 **mock/shadow only(live 아님)**.
- **SIASIU = PASS_WITH_WATCH + PATCH 1**: memory.db(개인/상담기억)는 **Foundation 미주입**(session_context={}·opaque furef_v2_만)·live. ★단 `logins.txt`에 **raw email/name 평문** = PATCH(PII-at-rest).
- **Cosmile = PATCH_REQUIRED**: SSC는 opaque furef_v2_·PII 미주입(clean). ★단 **분석/아웃박스 로컬 저장소에 de-anon 2건**(customer_id+anonymous_id+foundation_trace_id 동일 row).
- **종합 verdict: PATCH_REQUIRED** (de-anon 2 + PII-at-rest 1). Foundation 계약 경계는 안전, 위험은 전부 **service-local 저장**에 있음.

## 2. 전체 Memory Map
```
                         ┌──────────── Foundation (request-stateless·write 0) ────────────┐
User ─ SIASIU/Cosmile ─▶ │ session_context(in/out·미저장) · ssbrain KB(canonical RO)      │
        │  SSC(opaque    │ safety_facts union(미저장) · trace_ring(volatile·PII 0)         │
        │  furef_v2_)    │ mock subject_ref gate(shadow only) · memory_read_provider(미연결)│
        │                └──────────────────────────────────────────────────────────────┘
        ▼ (service-local 저장 — ★위험 집중 지점)
  SIASIU: memory.db(episode/memory_fact/user) · localStorage(state) · logins.txt(★raw email) · *.jsonl logs
  Cosmile: CommerceEvent(foundation_decision_received ★trace+customer+anon) · FoundationSignalOutbox(★raw ids·inert) · Cart/Order · sessionStorage(chat)
```

## 3. repo별 inventory (요약)
**Foundation (~24 layer·거의 LOW·stateless)**: INVARIANTS·session_context(in/out)·safety_facts union·memory_recall(session-only)·extract_candidates(compute-only·write 0)·memory_read_provider(★미연결)·profiles·ssbrain(docs/chunks/ingredients/product_ingredients/edges/sources)·search_logs/think_logs(diagnostic)·retrieval _STATE cache·trace_ring·mock_foundation_gate(shadow)·cosmile_memory_reuse_adapter(shadow).
**SIASIU (~15)**: memory.db{episode·memory_fact·user·fact_type_registry}·localStorage{foundation_state_v1·routine·diet·weight}·disk{logins.txt·events.jsonl·guardrail_log·risk_users·llm_usage}·endpoints{recall·reset·checkins·pitch·recos}·brain.chat(retired)·learning_memory_state(shadow).
**Cosmile (~15)**: shopper(cookie)·mockUser·foundationUserRef(furef_v2_)·CommerceEvent·foundation_decision_received·FoundationSignalOutbox·Cart·Order·OrderItem·Wishlist·ConsultationSessionMeta·sessionStorage{chat·cart}·voiceCache·piiPolicy 3-layer.

## 4. category별 inventory
| # | 카테고리 | 항목 |
|---|---|---|
| 1 Personal | SIASIU `memory_fact`(skin/allergy/pregnancy·HIGH) · Cosmile shopper(userId/guestId) |
| 2 Session | Foundation session_context(미저장) · SIASIU localStorage · Cosmile Cart/session |
| 3 Conversation | SIASIU `episode`(상담 원문) · Cosmile sessionStorage chat |
| 4 KB/Knowledge | Foundation ssbrain docs/chunks · profiles |
| 5 Product | ssbrain products/product_ingredients · Cosmile Cart/Order/catalog |
| 6 Ingredient | ssbrain `ingredients`(농도/caution·safety) |
| 7 Brand | ssbrain document.brand |
| 8 Analytics/Event | Foundation trace_ring/search_logs · SIASIU events/guardrail/risk_users · Cosmile CommerceEvent/**foundation_decision_received** |
| 9 Learning | SIASIU learning_memory_state(shadow v0.1) · Foundation cosmile_memory_reuse_adapter(shadow) |
| 10 Cache | Foundation _STATE/_TRACE_RING · Cosmile voiceCache(content-addressed) |
| 11 Legacy/Retired | SIASIU brain.chat(retired·dev flag) · Cosmile mockBrain(삭제됨) |
| 12 Mock/Dev | Foundation mock_foundation_gate·memory_sim · Cosmile MockUser/ShadowSignalOutbox |

## 5. live / shadow / legacy / dev 구분
- **live**: Foundation KB·session pass-through(stateless) / SIASIU memory.db·endpoints·logs / Cosmile CommerceEvent·Cart·Order·SSC.
- **shadow/dry-run**: Foundation mock_foundation_gate·cosmile_memory_reuse·SIASIU learning_memory_state·memory_trust_shadow / Cosmile FoundationShadowSignalOutbox.
- **legacy/retired**: SIASIU brain.chat(runtime 상담 retire·dev flag만) / Cosmile mockBrain·mockFoundationBridge(삭제).
- **inert**: Cosmile FoundationSignalOutbox(enqueue만·dispatch 없음).

## 6. Customer memory 현황
- **Foundation: 없음**(persistent customer fact 미저장·memory_read_provider 미연결).
- **SIASIU: 있음**(memory.db `memory_fact` = skin_type/allergy/avoid/pregnancy·HIGH sensitivity·**local only·Foundation 미전송**·keyed by user_id).
- **Cosmile: 최소**(shopper userId/guestId·ConsultationSessionMeta는 meta only·원문은 SIASIU).

## 7. Session / Conversation memory 현황
- SIASIU `episode`(모든 상담 원문·health-sensitive·TTL/익명화 없음·WATCH) · Cosmile sessionStorage chat(session-scoped·end 시 clear).
- Foundation session_context = 요청 in/out·미저장.

## 8. KB / Product / Ingredient / Brand memory 현황
- **canonical**: Foundation ssbrain(SIASIU 소유·Foundation read-only·URI mode=ro·파일=정본·sqlite=파생 재빌드). documents·chunks·ingredients(농도/pregnancy_safe/caution)·product_ingredients·edges(graph). **PII 0·안전 판단 근거**.
- Cosmile 상품/카탈로그는 refs(canonicalProductId)만·Foundation엔 ref 전달.

## 9. Analytics / Event / Outbox memory 현황
- Foundation: trace_ring(volatile·~200·PII 0)·search/think_logs(diagnostic·write_enabled 없음).
- SIASIU: events.jsonl·guardrail_log·risk_users(user_id keyed·truncated msg).
- **Cosmile(★위험)**: CommerceEvent(sanitized·piiPolicy 3-layer)·**foundation_decision_received**(customer_id+anonymous_id+**foundation_trace_id 동일 row**)·**FoundationSignalOutbox**(canonicalUserId+anonymousId raw·**inert**).

## 10. Learning / self-growth memory 현황
- 전부 **shadow/dry-run**(실 promotion 0): SIASIU learning_memory_state(v0.1)·memory_trust_shadow(v0.7) · Foundation cosmile_memory_reuse_adapter(read-only policy). **승인 없이 실 write 켜질 경로 없음**(현재). WATCH: v0.x→live 승격 게이트 검토.

## 11. PII / trace / de-anon risk
- ★**BLOCKER(Cosmile de-anon)**: `foundation_decision_received` CommerceEvent 1 row에 **customer_id + anonymous_id + foundation_trace_id 공존** → 분석 쿼리로 trace_id를 두 신원에 연결 가능. `FoundationSignalOutbox` 1 row에 **canonicalUserId + anonymousId raw 공존**(inert이나 설계상 de-anon).
- ★**BLOCKER(SIASIU PII-at-rest)**: `logins.txt` = `ts \t provider \t name \t email` **평문**.
- **clean**: Foundation SSC/FRC는 opaque furef_v2_·trace_id는 hex(PII 0)·raw_text_stored=false. SIASIU/Cosmile→Foundation raw PII 전송 0.
- WATCH: SIASIU `user_id`가 email/name 파생(logins.txt 유출 시 user_id 위조 가능)·episode raw health text.

## 12. Foundation payload injection risk
- **SIASIU**: session_context={}·furef_v2_만·memory.db 미주입 ✅.
- **Cosmile**: SSC에 furef_v2_·product ref만·raw PII 미주입 ✅(foundationUserRef.ts·piiPolicy).
- → **양 서비스 모두 Foundation에 memory/PII 몰래 주입 0**. de-anon 위험은 **service-local 저장**에만 존재(Foundation 계약 밖).

## 13. Retired but present code
- SIASIU `brain.chat`(상담 runtime retire·소스 존재·dev flag `SIASIU_DEV_LEGACY_CONSULT=1`만 도달) · Cosmile legacy `/api/slice/consult`(debug-only). mockBrain/mockFoundationBridge = **삭제됨**. Foundation subject_ref gate = mock only.

## 14. PATCH_REQUIRED 목록
| # | repo | 항목 | 문제 | 조치 |
|---|---|---|---|---|
| P1 | **Cosmile** | `foundation_decision_received` event | customer_id+anonymous_id+foundation_trace_id 동일 CommerceEvent row → de-anon | 신원 필드 **분리**(userId XOR anonymousId) 또는 **opaque subject_ref**로 대체·trace_id는 hash/미저장 |
| P2 | **Cosmile** | `FoundationSignalOutbox` | canonicalUserId+anonymousId **raw** 동일 row(inert) | **opaque subject_ref(furef_v2_)** 저장·dispatch 켜기 전 필수 |
| P3 | **SIASIU** | `data/logins.txt` | raw email+name **평문** flat file | email **hash/암호화** 또는 Foundation-backed auth 로그로 이관 |

## 15. WATCH 목록
- Foundation: extract_candidates upsert 명시 차단(throw) 추가 · subject_ref gate mock→live 전환 시 **v2 furef_ 채택** · memory_read_provider 계속 미연결 유지.
- SIASIU: `episode` 상담 원문 TTL/익명화 정책 부재 · `user_id` email/name 파생(안정 내부 id 권장) · events/guardrail/risk_users user_id keyed.
- Cosmile: sessionStorage chat 원문 PII 정책 문서화 · FRC trace_id 로컬 고객 record 저장 시 hashing · learning v0.x→live 승격 게이트.
- 공통: user_ref v1(64-bit)이 memory key로 남은 곳 0 확인(SIASIU/Cosmile 모두 furef_v2_ live) ✅.

## 16. 다음 블록 추천 순서
1. **COSMILE-DEANON-PATCH-01** (P1+P2): foundation_decision_received·SignalOutbox → opaque subject_ref/신원 분리. ★de-anon BLOCKER·최우선(Cosmile 담당).
2. **SIASIU-AUTH-PII-PATCH-01** (P3): logins.txt raw email → hash/Foundation auth (SIASIU 담당).
3. **FOUNDATION-MEMORY-SUBJECT-GATE-LIVE** (진행중 subject_ref hard gate): mock→live·furef_v2_ 채택·현재 stateless라 낮은 긴급도.
4. **SIASIU-MEMORY-RETENTION**: episode 상담기억 TTL/익명화 정책.
5. learning v0.x 승격 게이트 정의(공통).
