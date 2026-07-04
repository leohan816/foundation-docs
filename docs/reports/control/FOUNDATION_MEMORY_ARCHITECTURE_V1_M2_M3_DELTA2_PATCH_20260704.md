# Memory Architecture V1 — M2/M3 DELTA-2 PATCH (Fable5 delta review 반영)

> 작성: foundation-control · 2026-07-04 · ★read-only 문서 patch(좁은 범위) · 코드 0 · migration 0 · source push 0 · raw/secret 미열람 · 구현 지시 없음 · 전량 재작성 없음.
> 기준: `FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_DELTA_REVIEW_20260704.md`(Fable5·PATCH_REQUIRED delta-2·9/14 CLOSED + REG 2 + NOT_CLOSED 1) → M3/M2/checklist/anchor v1.2.

## 1. Fable5 PARTIAL / NOT_CLOSED / REGRESSION / NEW 항목별 반영
| 항목 | 등급 | 반영 | 반영 위치 |
|---|---|---|---|
| **D-5(d) whitelist 3자 정합** | **NOT_CLOSED** | ✅ 반영 | **M3 §4 전면 재정합**(B15) — 앵커 §P + core.py 소비 필드 전체(stated_concerns·safety_facts·recommendation_deferred·last_refined_intent·user_constraints·product_context.catalog_candidates) + field별 type/enum/max/truncation + 전역 상한(32KB/depth5/512) |
| **REG-1 echo self-reject** | **REGRESSION·HIGH** | ✅ 반영 | **M3 §4**(echo 필드 whitelist 포함)·**§7**(CUTOVER echo round-trip 호환·version gate)·**§9**(round-trip assert). Foundation 자기 echo가 자기 gate 통과·catalog 경로 유지 |
| **D-3 SINGLE predicate** | **REGRESSION** | ✅ 반영 | **M2 §5·§3.5**: `WHERE fact_state='active'` → **`WHERE fact_state='active' AND deleted=false AND blocked=false`**(active∧deleted soft-delete row가 키 미점유) |
| **D-1 gate spec 미완4** | PARTIAL | ✅ 반영 | §7 stray `role` 제거(§4 정의표 정본)·상한 수치(32KB/5/512)·append-only truncation(§4 oldest-drop/reject)·앵커 5곳 SUPERSEDE 선언 |
| **D-5(b) candidate fact_state** | PARTIAL | ✅ 반영 | **M2 §3.4**: `fact_state`(hypothesis\|active) 복원·status/fact_state/gate_decision **3축 역할 분리**(anchor J-1 정합) |
| **D-5 sensitivity 앵커 3값** | PARTIAL | ✅ 반영 | **앵커 §J-2/§I-1 `(normal\|sensitive\|high)` → `(low\|normal\|sensitive\|high)`** 정정(code SENSITIVITY_LEVELS 4값으로 통일·M2 동일) |
| **D-10 앵커 §T** | PARTIAL | ✅ 반영 | **앵커 §T** "별도 release train" → **M2 §9와 일치**(M4 동반·M4 선행조건·3설 병존 제거) |
| **D-14 session_ref spec** | PARTIAL | ✅ 반영 | **M3 §5.1 신설**: 허용(`sess_ref_*`/UUID/HMAC) vs 금지(raw DB/customer-linked session_id)·키 `session_id` reject·`session_ref` allow |
| **NEW-1 guest_ref/NULL** | NEW·LOW | ✅ 반영 | **M2 §3.5**: `guest_ref` 컬럼 명시·subject_ref XOR guest_ref·`subject_key=COALESCE(subject_ref,guest_ref)` partial unique·guest fact merge/supersede(§N-5) |
| **NEW-2 checklist 구줄** | NEW·LOW | ✅ 반영 | **checklist §5** "M4/M5 착수 = B1~B9 해소 후" **삭제** → B1~B15 통일 |
| **privacy_level enum 통일** | (D-5) | ✅ 반영 | **정본 1개 = `anonymous\|user_consented\|aggregated`**(앵커)·M2 §3.7·M3 §4·예시 통일(v1.1의 `normal\|sensitive\|restricted` 폐기) |
- **CLOSED 9건(D-2·D-4·D-5a·D-5c·D-6·D-7·D-8·D-9·D-11·D-12·D-13)** = delta-1에서 이미 닫힘·재수정 없음.

## 2. B15 추가 여부
✅ **추가.** **B15 = M3 §4 whitelist 재정합 + CUTOVER echo round-trip compatibility gate**(앵커 §P+실코드 echo 필드·상한·version gate·echo round-trip pass). checklist B-list = **B1~B15**.

## 3. whitelist 정합표 (M3 §4·앵커 §P·core.py 소비)
| whitelist 필드 | 앵커 §P | core.py 소비 | type/enum | 상한/truncation |
|---|---|---|---|---|
| service_id | ✓ | validate_ssc | siasiu\|cosmile | — |
| request_memory_context_version | (신규) | (version gate) | mctx-1.0 | 미일치 reject |
| session_ref | ✓ | session_context | opaque(§5.1) | ≤128 char |
| stated_concerns | ✓(session_refs) | core.py:1224-1229 echo | concern enum | ≤64·oldest-drop |
| recommendation_deferred | ✓ | core.py:1231 echo | bool | — |
| last_refined_intent | ✓ | core.py:1232 echo | intent enum | ≤64 char |
| safety_facts{avoid_ingredient,allergy,pregnancy_nursing} | ✓ | core.py:1235-1239 carry | atom/bool | 각 ≤128·drop 금지 |
| known_allergy_atoms·avoid_ingredient_atoms | ✓ | SSC.known_allergies/avoid_ingredients | atom | ≤128·dedupe |
| episode_summary_refs·ltm_fact_refs | ✓ | (refs) | object(enum) | ≤32/≤256 |
| product_refs·product_context.catalog_candidates | ✓ | core.py:877/1334 catalog | refs | ≤128 |
| commerce_signal_refs | ✓ | product_context | {…privacy_level} | ≤128 |
| consent_flags·retention_flags·safety_flags | ✓ | (policy) | enum/bool | — |
| user_constraints{no_recommendation,explanation_only} | ✓ | contracts.py:67-68 | bool | — |
| trace_refs | ✓ | (hex·raw id 아님) | object | — |
- ★unknown-key = reject(default-deny) · 위 whitelist는 Foundation echo/carry를 전부 포함(REG-1 해소).

## 4. echo round-trip compatibility 조건 (REG-1)
1. **이전 `session_context_out` → 다음 `session_context_in` → gate PASS**(2턴째 세션 거부 0).
2. **safety_facts carry PASS**(`{avoid_ingredient,allergy,pregnancy_nursing}` immutable union 2턴째 유지).
3. **product_context.catalog_candidates PASS**(catalog 경로 유지).
4. **unknown malicious key REJECT**(customer_id·raw 원문·whitelist 외).
5. **version gate**: version 없는 legacy 트래픽 = 호환 모드(능동 파괴 방지)·신규 필드는 mctx-1.0부터 강제.
6. **append-only 상한**: stated_concerns/episode_summary_refs = oldest-drop·safety_facts = drop 금지(초과 reject)·전역 32KB/depth5/512.

## 5. M4/M5 착수 가능 여부
- **아직 불가.** 경로: **delta-2 패치(완료) → Fable5 delta-2 재검증(해당 항목만) → B1~B15 해소 → M4.**
- M2 스키마 골격(D-2/3/8 반영)은 안정 → M4 *설계 준비*(B12 migration plan 초안 등)는 병행 가능(Fable5 delta 동의).

## 6. Fable5 delta-2 재검증 필요 여부
- ★**필요 = YES**(전량 재감사 불요 — delta-2 반영분만: M3 §4 whitelist·§7 echo 호환·§9 round-trip assert·D-3 predicate·앵커 SUPERSEDE/§T/sensitivity·candidate fact_state·session_ref·guest_ref).
- 최종 FINAL_PASS = Fable5(Control self-review 금지·Control 상한 = DESIGN_READY).

## 무결성
코드 변경 0 · migration 0 · source push 0 · raw 고객데이터/secret 미열람 · 구현 지시 없음 · 전량 재작성 없음(좁은 문서-레벨 패치).
