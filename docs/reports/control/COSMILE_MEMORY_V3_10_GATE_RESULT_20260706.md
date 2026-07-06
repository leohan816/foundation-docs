# COSMILE MEMORY V3-10 — Pre-Implementation Gate Result

> 검증자: fable-sentinel(독립 gate) · 2026-07-06 · 입력: Fable `bd01ba1` · patch `8f9b1a8` · delta review = **DESIGN_APPROVED_WITH_LIMITS** · V3-10 plan + canonical dictionary + V3-00~09 + V1 closure/entry.
> ★gate/review only. 구현 0 · DB migration 0 · prod/live/main/secret 0 · fable-builder/debugger 미사용. 문서 patch = P1 tightening 1건만(아래 §5).

## 1. Final gate verdict: **GATE_PASS_WITH_LIMITS**

설계 계약 층은 구현 지시서 수준으로 정합(P1~P12 CLOSED·regression 0)이며 V3-11 진입 준비 완료. **단 2개 limit**: (a) Leo 결정 4건이 **추천안으로 잠정 고정**됐으나 Leo 최종 sign-off 필요, (b) V3-11 착수는 그 sign-off + 아래 scope 확정 후. HOLD/NEEDS_DECISION 아님 — 결정 4건 전부 추천 default가 명확하고 설계와 정합하므로 pass-with-limits.

## 2. Executive summary
- delta review 잔여(Leo 결정 4·P1 tightening 1)를 gate에서 분리·처리: **P1 tightening = 문서 patch 적용 완료**(query predicate ↔ 산문 정합), Leo 결정 4건 = 추천 default 확정 제안.
- V3-11 implementation scope(dev/shadow)와 이월/제외를 명시 분리. pre-prod/live 7개 금지선 재확인.
- ★안전 우선 보존: margin_band는 ranking 신호 배제(analytics-only)·safety/adverse 절대 우선 유지.

## 3. Leo decision table (4건)
| # | 결정 | 추천 default | 대안 | 근거·정합 |
|---|---|---|---|---|
| D1 | 다중 추천 귀속 모델 | **last-touch 단일 귀속(V3-11)** | first/multi-touch/weighted → V3 backlog | V3-09:116 "다중 귀속=last-touch·★Leo" 이미 열림·V3-11 복잡도 최소 |
| D2 | anon→login stitching consent UX | **명시적 동의 전 memory promotion 금지·commerce attribution은 session-level 제한** | 광범위 stitching | Option B consent 경계·privacy·§2.10 stitching enum(unlinked/stitched_pending_consent/…)와 정합 |
| D3 | margin_band 사용 범위 | **analytics/reporting only·ranking signal 아님·safety/adverse 절대 우선 안 함** | ranking signal 사용 | safety>commerce 핵심 원칙 보존·P8 margin_band는 버킷·원가 저장 금지 유지 |
| D4 | adverse matrix severity×certainty | **자극/따가움=low~moderate·반복/명시/중단=moderate·의료/알러지/강붓기/발진=severe** | 별도 매핑 | AdverseSignalActionMatrix(V3-07 §4.5·사전 §5.3) 정본에 signal→severity 매핑 등재 필요 |

## 4. Recommended default decision
★**4건 모두 추천 default 채택 권고**(Leo 최종 확정 대상):
- D1 last-touch·D2 consent-first(promotion 차단)·D3 analytics-only(안전 우선)·D4 위 severity 매핑.
- ★D4는 확정 시 **사전 §2.4(adverse_severity)·§5.3(matrix)에 signal→severity 매핑을 등재**해야 정본화(별도 최소 patch·Leo 확정 후).
- D2/D3는 safety·privacy 경계를 강화하는 방향이라 gate가 강하게 지지.

## 5. P1 tightening result — **PATCHED (문서 only)**
- **문제(delta review 잔여):** V3-08 INV-DB-2 산문은 예외를 `direction=safety` **OR** `safety_flag 부착 fact`로 명시하나(사전 §2.13), query predicate는 `direction <> 'safety'`만 검사 → direction≠safety인데 `safety_flag`(safety_frozen/caution/block/resolved/pregnancy_nursing_context)를 단 fact가 강등 후보(§위반 시 non-safety demote)로 샐 실 gap(report-only backstop이 못 덮음).
- **적용 patch(V3-08 INV-DB-2·문서):** query predicate에 **`AND safety_flag IS NULL`** 추가 + "위반 시(non-safety)" 정의를 `direction≠safety AND safety_flag IS NULL`로 명시. → 산문 예외 범위와 값-레벨 일치·report-only 의존 제거.
- ★코드 구현 0(문서 patch만·gate 규율 준수). 다른 P 항목은 재-touch 0.

## 6. V3-11 allowed implementation scope (dev/local/shadow only)
| scope | 상태 | 조건 |
|---|---|---|
| recommendation_id threading(`rec_v3_`+ULID26) | **IN** | 사전 §1.1 단일 형식 |
| RecommendationEvent 얕은 상호작용 저장 계약 | **IN** | V3-03 소유·raw text 미저장 |
| rec_outcome_event order_item 단위 attribution | **IN(last-touch)** | D1 확정 전제 |
| anonymous_ref downstream 유지 | **IN(session-level)** | D2 전제·동의 전 promotion 금지 |
| MemoryFactCandidate 생성 규칙 | **IN** | R-C1 tombstone/must_not_reappear/SINGLE 선행 |
| adverse/safety gate 최소 구현 | **IN** | AdverseSignalActionMatrix + INV-DB-2 safety 예외(D4 전제) |
| provider-independent tests | **IN** | DB 미접촉·순수 로직 |
- ★전부 **dev/local/shadow·flag OFF**·service-local·Foundation validate/gate only.

## 7. Explicitly excluded scope (V3-11 이월/제외)
- **DB-touch integration tests** → non-prod 별도 gate(V3-08 G-series pre-gate).
- **multi-touch attribution** → V3 backlog(D1).
- **margin_band ranking signal** → 제외(D3·analytics only).
- **anon→login memory promotion(stitching)** → 동의 UX 확정(D2) 후 별도.
- **COSMILE-4 실 DDL 복원** → migrate-deploy pre-gate G13(실행=별도 승인).
- **LTM 승격 full pipeline** → candidate 생성까지 IN·promotion→LTM 실배선은 후속 phase 권고.

## 8. Pre-prod/live gates (V3-11에서 절대 안 함 — Hard Stop 재확인)
prod DB migration · live emit activation · real secret/Vault injection · subject_ref prod backfill · hard reject activation · external release · main merge without approval. **7선 전부 Hard Stop 유지.**

## 9. Required approval before V3-11
1. **Leo: D1~D4 최종 확정**(추천 default 채택 여부) — 특히 D4는 확정 후 사전 등재 최소 patch.
2. **Leo: V3-11 scope(§6/§7) 승인**.
3. 착수는 **fable-builder 스킬로 별도 batch**(이번 gate는 fable-sentinel·구현 아님).
- ★위 승인 전 V3-11 구현 착수 금지.

## 10. Evidence paths & commit hashes
- delta review: DESIGN_APPROVED_WITH_LIMITS(직전 fable-sentinel 라운드·journal `wf_f0bc4450-b20`)
- Fable `bd01ba1` · patch `8f9b1a8` · P1 tightening = 본 gate에서 V3-08 patch(아래 commit)
- 근거: `COSMILE_MEMORY_V3_08_...:72-81`(INV-DB-2) · 사전 `..._DATA_DICTIONARY_CANONICAL_...:§2.1/§2.13/§5.3` · `..._V3_09_...:116`(D1) · `..._V3_07_...:§4.5`(D4 matrix)

---

## Addendum (2026-07-06) — Leo D1~D4 확정 반영

> Leo가 D1~D4를 추천 default로 **확정**. fable-sentinel 분기 reference(safety-review·review-classification) 로드 적용.

### A1. D1~D4 final decision (CONFIRMED)
| # | 결정 | 확정값 | 상태 |
|---|---|---|---|
| D1 | 다중 추천 귀속 | **last-touch 단일**(V3-11)·first/multi/weighted = V3 backlog | ✅ CONFIRMED |
| D2 | anon→login stitching consent | **명시 동의 전 memory promotion 금지**·attribution = session-level 제한·UX는 후속 gate | ✅ CONFIRMED |
| D3 | margin_band 범위 | **ranking signal 아님·analytics only·safety/adverse 절대 우선 안 함**·line cost 저장 = pre-prod gate 이월 | ✅ CONFIRMED |
| D4 | adverse signal→severity | **자극/따가움=low(반복→moderate)·중단/악화=moderate·붓기/발진/의료/알러지=severe** | ✅ CONFIRMED·사전 등재 |

### A2. D4 dictionary patch
- 사전 §2.4에 **raw signal → adverse_severity 매핑** 최소 등재(7 신호·base severity·certainty 결정화). 위치: `DATA_DICTIONARY_CANONICAL:89~`.
- ★"low~moderate" 범위를 **certainty 축으로 결정화**(base=low·repeated→§5.3 matrix moderate escalate) — 구현자가 저장할 결정값 확보.
- ★§5.3 AdverseSignalActionMatrix 효과는 **불변**(동일-트리거 단일 정본 유지) — D4는 severity 축 **입력**만 확정. 새 다효과 충돌 0.

### A3. STOP 재확인 (review-classification §3·5조건)
safety 약화(P1)·정본 오염(P11)·join key(P4)·이질 enum(P5)·구현 불가 = **전부 미해당**. 구현 착수 금지 조건 없음.

### A4. Verdict 유지: **GATE_PASS_WITH_LIMITS**
잔여 = 전부 **추적 가능한 제한/이월 gate**(닫기를 막는 미해결 아님): line cost 저장(pre-prod)·DB-touch tests(별도 gate)·COSMILE-4 DDL(G13)·anon stitching UX(후속 gate)·multi-touch(V3 backlog). → DESIGN 층은 구현 준비 완료.

### A5. V3-11 준비 가부
- **준비 가능(CAN BE PREPARED)**: D1~D4 확정 + scope(§6/§7) 정의 + STOP 0 → 구현 계획 수립 단계 진입 가능.
- ★**단 명시적 Leo 승인 대기(STILL WAITING)**: V3-11 **착수**는 Leo의 "§6/§7 scope 승인 + 시작 지시" 필요. 이번 라운드는 gate 마무리이며 **V3-11 미착수**.

## 무결성
V3-10 gate 마무리 · 구현 0 · DB/migration 0 · prod/live/main/secret 0 · fable-builder 미사용 · 문서 patch 2건(P1 tightening[V3-08]·D4 등재[dictionary]) · Leo D1~D4 확정 반영 · fable-sentinel 분기 reference(safety-review·review-classification) 로드 적용 · STOP 5조건 미해당 · verdict **GATE_PASS_WITH_LIMITS** · V3-11 준비 가능하나 **착수는 Leo 명시 승인 대기**.
