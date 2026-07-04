# Foundation Service Memory Architecture V1 — M1 검증 통합 보고 (Consolidation)

> 작성: foundation-control (control tower) · 2026-07-04 · ★read-only · 코드 수정 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람.
> 대상: `FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1_20260704.md` v0.3-revised (opt-B·cross-service v1 범위 밖·Control self-review 제한).
> 통합 근거(3-side review):
> - Foundation-side: `FOUNDATION_MEMORY_ARCHITECTURE_V1_FOUNDATION_SIDE_REVIEW_20260704.md` (본 세션 작성)
> - SIASIU-side: `SIASIU_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md` (샤슈 세션·기존)
> - Cosmile-side: `COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md` (Cosmile 세션·기존)

## 1. 3-side verdict
| side | verdict | 요지 |
|---|---|---|
| **Foundation** | **PASS_WITH_WATCH** | request-stateless·고객 LTM 0·memory_context ephemeral 검증. M5 전 Foundation-side 배선 필요: ingress default-deny gate(W26)·subject_ref v2 gate 배선(W16)·FRC memory_reuse_decision(W15). 전부 additive·구조 blocker 0 |
| **SIASIU** | **PASS** | Common Service Memory Contract의 **viable reference**. 9엔티티 전부 additive 구현 가능·answer.py fingerprint `d7f579443f8a110a` unchanged 유지·recall/reset 보존. SIASIU-side PATCH: W1/W2/W3/W4/W16/W23 |
| **Cosmile** | **PATCH_REQUIRED** | feasible=YES(구조 blocker 0·전부 additive/flag-OFF)이나 **현 9엔티티 정합 미충족**: 8종 신설 + 확장/overlay + **P1/P2 de-anon 동반패치** + at-rest 암호화(W24) + subject_ref secret 배포. ★선결 **`1ce099e` readiness adapter 소재 미확인** |

## 2. M1 전체 verdict
- **`DESIGN_READY` (Control verdict 상한 · self-review 금지 → 최종 FINAL_PASS는 Fable5/독립 reviewer).**
- 근거: 아키텍처 v0.3은 적대 리뷰 3축 + Leo revision 2회(opt-B·cross-service v1 범위 밖) 반영으로 **경계·정의·대칭성이 검증 가능하게 확정**됨. **3-side 모두 feasible=YES·구조적 blocker 0·FAIL 0**. Foundation=PASS_WITH_WATCH·SIASIU=PASS·Cosmile=PATCH_REQUIRED이나, Cosmile PATCH는 **구현단계(M4) 정합 항목**이지 설계 blocker가 아니다.
- ★Control은 자기 작성 문서를 FINAL_PASS 하지 않는다 — M1 산출 = **DESIGN_READY까지**.

## 3. M2 / M3 진행 가능 여부
- **M2(Common Service Memory Contract 문서화) = 진행 가능.** 9엔티티 field-level 계약(`contracts/COMMON_SERVICE_MEMORY_CONTRACT_V0.md`)·consent enum·retention TTL·delete 3-state·service-local erasure/guest 병합을 정본화. 3-side가 동일 계약 구현 가능 확인.
- **M3(memory_context 계약) = 진행 가능.** SSC.session_context 매핑 + Foundation ingress 연결 + keyed hash 규약. Foundation-side가 ephemeral·default-deny 강제를 검증.
- **M4(서비스 정렬) = 조건부** — 아래 구현 전 blockers 해소 후. SIASIU=additive(유지+확장)·Cosmile=8종 신설+P1/P2 동반패치.
- ★M2/M3는 **문서·shadow 단계(코드 0·flag OFF)** — Fable5 FINAL_PASS 후 착수 권장.

## 4. 구현 전 blockers (M4 착수 전)
| # | blocker | 소관 | 근거 |
|---|---|---|---|
| B1 | **`1ce099e` readiness adapter 소재 확인** (Cosmile clone·git 히스토리·코드에 없음) — ★CLAUDE.md baseline엔 164/164 PASS로 기록 → **소재 discrepancy 해소 선행** | Cosmile+control | Cosmile review §9/§7 |
| B2 | **Cosmile P1/P2 de-anon 동반 패치** (foundation_decision_received userId+trace 동일 row · FoundationSignalOutbox raw ids → payload_refs) | Cosmile | Cosmile review §6·INVENTORY_AUDIT P1/P2 |
| B3 | **subject_ref v2 gate 배선(Foundation W16) + prod secret 배포** (FOUNDATION_SUBJECT_REF_SECRET·양 서비스 FOUNDATION_USER_REF_SECRET) | Foundation | subject_ref hard gate RESULT·W16 |
| B4 | **Foundation ingress default-deny gate**(has_raw_or_pii 재사용·W26) | Foundation | Foundation-side review §3 |
| B5 | **opt-B raw 상담원문 at-rest 암호화/접근통제**(W24) — Cosmile 신규 서버 raw·SIASIU episode | Cosmile+SIASIU | Cosmile review §7·W24 |
| B6 | **SIASIU consent/expiry/delete 컬럼·reset per-fact·user_id email keying**(W1/W2/W3) | SIASIU | SIASIU review §4~6 |
| B7 | **M2 공통 계약 문서 선행**(field-level enum·TTL·3-state) | control | M2 |
- ★전부 additive·flag OFF·shadow·rollback 가능 — **구조적 blocker 아님**(순서/정합 blocker).

## 5. Fable5에게 물어볼 질문
1. **FINAL_PASS 판정:** Control self-review 제한상 이 아키텍처(v0.3)의 최종 검증을 Fable5가 수행 — **DESIGN_READY → APPROVED** 여부?
2. **opt-B raw storage governance:** 서버 raw 상담원문 저장(opt-B)이 생기는데 at-rest 암호화/접근통제(W24)가 충분한가? Cosmile의 기존 "Foundation-only·서버 raw 미저장" 원칙과 상충하지 않는가(서비스 자체 저장은 별개)?
3. **경계 강제(W26):** Foundation ingress default-deny gate(has_raw_or_pii)가 session_context 경계 강제로 충분한가, 아니면 session_context를 freeform→typed schema로 전환해야 하는가?
4. **subject_ref v2(W16):** service-local subject_ref keying(subj_v2_·HMAC·prod fail-closed)이 memory-key-live 전제로 충분한가·secret rotation 정책은?
5. **cross-service 경계:** cross-service 고객기억 공유 v1-범위-밖이 문서 전체에서 일관되며, 미래 재도입 시 hard precondition(consent+broker+v2 gate)이 명확한가?
6. **동일 계약 대칭성:** commerce populate-conditional(SIASIU 미populate)이 "9엔티티 동일 계약" 명제를 실질적으로 깨지 않는가?
7. **keyed hash(W25):** content_hash/query_hash의 keyed(HMAC)/per-service salt가 cross-service correlator/저엔트로피 열거 방지에 충분한가?

## 6. 종합
- 아키텍처 v0.3 = **DESIGN_READY**(Control 상한). 3-side feasible·구조 blocker 0. Foundation=PASS_WITH_WATCH·SIASIU=PASS·Cosmile=PATCH_REQUIRED(구현단계 정합).
- **M2/M3 진행 가능**(문서·shadow). **M4는 B1~B7 해소 후.**
- **Fable5 FINAL_PASS 필요**(Control self-review 금지).

## 7. 무결성
- **코드 변경 0** · migration 0 · source repo push 0 · foundation-docs mirror만 push.
- **raw 고객 데이터 미열람**(memory.db·logins.txt·dev.db·PII 원문 0) · **secret 값 출력 0**.
- 산출: Foundation-side review(신규)·M1 consolidation(신규). Cosmile-side review·SIASIU-side review = **기존 존재(동시 세션)·미덮어씀·입력으로 사용**.
