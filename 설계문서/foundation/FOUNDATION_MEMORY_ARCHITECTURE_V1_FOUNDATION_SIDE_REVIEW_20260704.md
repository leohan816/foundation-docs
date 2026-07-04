# Foundation-side Review — Foundation Service Memory Architecture V1 (v0.3-revised) — 상태: **PASS_WITH_WATCH**

> 작성: foundation-control (Foundation-side 검증) · 2026-07-04 · ★read-only 검증 · 코드 수정 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람.
> 대상: `foundation-control/docs/FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` v0.3-revised (A~W).
> 근거(종합): `FOUNDATION_MEMORY_INVENTORY_AUDIT_20260704`(Foundation=PASS·request-stateless) · `FOUNDATION_MEMORY_SUBJECT_REF_HARD_GATE_RESULT_20260704`(subject_ref v2·local commit c9bb996) · 아키텍처 적대 리뷰 2축(ownership-boundary / pii-deanon) · foundation_http_service(core/contracts/server) 구조.
> ★정직 노트: 별도 Foundation 세션의 verbatim in-chat review는 본 세션에 미보유 — 본 문서는 위 정본 Foundation-side 근거(inventory audit·subject_ref hard gate·아키텍처 ownership/pii 적대 리뷰)를 통합한 Foundation-side 검증이다.

## 0. Verdict
**PASS_WITH_WATCH** — Foundation memory 경계는 **request-stateless로 clean**(고객 장기기억 미저장·memory_context 요청 후 폐기)하며 아키텍처의 Foundation-side 설계는 **건전**하다. 단 **consult 연결(M5) 전 반드시 닫아야 할 Foundation-side 항목**이 있다: (a) session_context ingress **default-deny gate 미배선**(W26), (b) subject_ref v2 hard gate **foundation_http_service 미배선**(W16), (c) FRC **memory_reuse_decision 부재**(W15). 전부 **additive·flag OFF·구조적 blocker 아님**. FAIL 조건 0.

## 1. Foundation = request-stateless / 고객 장기기억 미저장 (§C/§D)
**PASS(검증).** INVARIANTS `write_performed/raw_text_stored/pii_stored/memory_write=false` · `memory_read_provider` **미연결** · persistent customer fact 0 · session_context 요청 in/out만·미저장(INVENTORY_AUDIT §1·§6·§12). → 결정 #5/#9 충족. Foundation storage에 customer LTM = **0**.

## 2. memory_context 요청 후 폐기 (§O~Q)
**PASS(검증).** consult_contract는 session_context를 payload IN, session_context_out을 OUT으로만 다루고 응답 후 미보관 · `_TRACE_RING`은 path(쿼리제거)/status/trace_id/decision만 휘발(max~200·PII 0) · `memory_write=false` 불변식. → memory_context ephemeral(결정 #6/#7) 충족.

## 3. ★경계 = 구조적 보장이 아니라 ingress gate 강제 대상 (W26)
**WATCH → PATCH-before-M5.** `validate_ssc`가 session_context/service_context/product_context를 **freeform dict로 통과**(contracts.py)하고 consult가 verbatim copy·session_out echo. FOUNDATION `shared_memory/has_raw_or_pii`는 **foundation_http_service에 미배선**(grep 0). → 서비스가 raw/PII/식별자를 넣으면 Foundation이 수용·반영. 경계는 현재 **service-side convention** → **§R ingress default-deny scan(has_raw_or_pii 재사용)이 M5에서 강제**해야 한다. §V에서 `session_context 내 raw/PII/식별자=0` assert.

## 4. Foundation KB 소유 = 판단/검색 레이어 (§C·W17)
**PASS_WITH_WATCH.** Foundation은 Knowledge/Product/Ingredient/Brand/Safety/Search/Judgment **판단·검색·decision 레이어를 소유**(결정 #8). 단 **물리 `ssbrain.sqlite`는 SIASIU-hosted read-only data path**(retrieval_provider.py:13·per-project index owned by SIASIU) — Foundation storage 아님. canonical-KB 물리 재배치는 별도 release train(W17·WATCH).

## 5. subject_ref v2 hard gate — 구현됨·미배선 (W16)
**PATCH-before-memory-key-live.** subject_ref v2(`subj_v2_`+HMAC[:32]·prod fail-closed·furef_v2 bridge)는 **FOUNDATION local commit `c9bb996`에 구현**(hard gate 29/29 PASS)되었으나 **foundation_http_service consult 경로에 미배선**(unpushed·flag OFF·consult 미소비·grep 0). → service-local subject_ref keying이 memory-key로 live되기 전 M5에서 **배선 + prod secret 배포**가 전제. (cross-service broker는 v1 범위 밖.)

## 6. FRC memory_reuse_decision 부재 (W15)
**WATCH(후속).** CLAUDE.md §5 필수 output `memory_reuse_decision`(allowed/blocked/expired/deleted/consent_required/not_available)이 FRC에 없다 → Foundation이 SSC의 safety_facts를 그대로 신뢰(consent/삭제/만료 검증 부재). 완화: **서비스-side가 memory_context 조립 시 deleted/blocked/expired fact를 애초에 제외**(fail-closed). FRC 필드 추가는 후속 release train.

## 7. Foundation ≠ cross-service 고객기억 broker (v1 확정)
**PASS(정합).** v1에서 Foundation은 다른 서비스 고객기억을 **조회/중계하지 않는다**(memory_read_provider 미연결·§B #10). cross-service broker/cross-service SubjectRefMap = v1 범위 밖. 아키텍처 v0.3 개정이 이를 명문화 — Foundation-side 정합.

## 8. de-anon guard (Foundation-side) (§S)
**PASS(Foundation-side 한정).** `trace_id='fdsh_'+uuid4().hex[:16]`(랜덤·매요청) → Foundation 내부에서 identity와 join 불가 · FRC `raw_pii_included=false`·furef echo 0 · mask_pii/query_hash. ★단 이 불변식은 **Foundation-side 한정** — 서비스-side가 FRC trace_id를 raw identity 옆에 persist하면 de-anon(P1) → 서비스 소관(§T).

## Foundation-side 구현 전 항목 (M5·전부 additive·flag OFF)
1. **ingress default-deny gate 배선**(W26·has_raw_or_pii 재사용) — session_context raw/PII/식별자 reject.
2. **subject_ref v2 gate 배선 + prod secret 배포**(W16) — service-local keying.
3. **FRC memory_reuse_decision**(W15·후속) 또는 서비스-side 조립 게이트로 대체.
4. (WATCH) canonical-KB 물리 재배치(W17)·extract_candidates upsert 명시 차단.

## 위험 / 모순
- **모순 0**(아키텍처가 Foundation request-stateless 경계를 깨지 않음·전부 additive·flag OFF).
- **구조적 blocker 0** · FAIL 0.
- WATCH/PATCH: W15(FRC reuse decision)·W16(subject_ref 배선)·W17(KB 물리 위치)·W26(ingress gate) — 전부 Foundation-side M5·additive·rollback 가능.
- 기존 regression 유지 필수: Foundation runner 89/89·651.

## 코드 변경 여부: **0** (read-only 검증·Foundation/SIASIU/Cosmile 무수정·migration 0·push 0·raw 고객데이터/secret 미열람).
