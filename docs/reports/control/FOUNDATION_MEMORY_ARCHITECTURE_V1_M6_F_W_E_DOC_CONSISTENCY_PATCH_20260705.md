# Memory V1 — M6-F W-e Doc-Consistency Patch (inline correction pointers)

> ★[OPTION A — Option B pivot(shadow FOUNDATION `5a0003c` / SIASIU `d0f51cb` · docs `1e24c33`)로 **SUPERSEDED**. 정본: `..._M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705.md` · `..._OPTION_B_SHADOW_PIVOT_RESULT_20260705.md`. ★Foundation-side mint · FOUNDATION_SUBJECT_REF_SECRET · identity-touch = **폐기(deprecated·Option A relic)**. subject_ref = service-local mint(Foundation validate/gate only).]

> 작성: foundation-control(Control) · 2026-07-05 · **범위: delta re-review watch W-e만 — package 본문 이전 표현에 §11 PATCH ROUND 2 정정 inline 포인터 추가(docs-only).**
> ★docs-only cleanup. runtime · schema · FOUNDATION-side · execution 작업 0. Restricted Actions List = source report 참조.
> 근거: delta re-review(`c36bb75`·APPROVE_WITH_WATCH·W-e) · M6-F package §11 PATCH ROUND 2.

---

## 1. Fact
- delta re-review W-e: package **§2/§3/§4 본문**에 이전(이제 정정된) 표현이 미주석 잔존 → 본문만 읽는 구현자가 폐기 문구로 행동할 위험.
- 조치: 해당 3개 본문에 **inline "SUPERSEDED — §11 PATCH ROUND 2 <item> 참조" 포인터** 추가. ★이전 문구 **대규모 삭제 0**(clean-not-compress)·명확 연결만.
- ★코드/schema/FOUNDATION/execution 변경 0. package doc 1개만 수정.

## 2. Changed lines (package `..._M6_F_GOAL_PACKAGE_20260705.md`)
| 위치 | 이전 표현(보존) | 추가된 inline 포인터 |
|---|---|---|
| **§2**(2-layer) | "★cross-service correlation 방지(…)" | **★[SUPERSEDED — §11 ⑩: "correlation 방지"는 crypto 보증 아님(양 furef 역산→id→graph join)·실 차단선=consent fail-closed·flag OFF·gate.]** |
| **§3**(경계 원칙) | "한 secret 유출이 전 체인 역추적으로 이어지지 않음(defense-in-depth)" | **★[SUPERSEDED — §11 ⑨: SubjectRefMap이 furef↔subject_ref 실체화 → 서비스 secret+서비스 DB 접근이면 Foundation secret 없이 전 체인 역추적. 2-layer 방어=매핑 미접근 공격자 한정.]** |
| **§4**(rotation) | "service secret rotation = furef 재계산(consumer-side)" | **★[SUPERSEDED — §11 ⑥/5a: service secret rotation도 subj_v2=HMAC(F,furef)상 그 서비스 전 subj_v2 연쇄 변경→orphan. 두 축 모두 re-key 축.]** |

## 3. W-e closure evidence
- SUPERSEDED 포인터 **3개** 추가 확인(§2→⑩·§3→⑨·§4→⑥).
- 이전 문구 **보존**(삭제 0): "cross-service correlation 방지"·"전 체인 역추적으로 이어지지 않음"·"service secret rotation = furef 재계산" 원문 유지 + 포인터로 연결.
- ★본문만 읽어도 §11 정정으로 연결됨 → W-e(doc-consistency) **CLOSED**.
- 나머지 watch(W-a·W-b·W-c·W-d·W-f·W-g)는 **FOUNDATION/schema 설계 gate** 대상(본 패치 범위 밖·유지).

## 4. Integrity
docs-only · package doc 1개 수정(inline 포인터 3개) · 이전 문구 대규모 삭제 0 · runtime/schema/FOUNDATION-side/execution 0 · M6-F execution 0 · prod secret 0 · subject_ref backfill 0 · **main merge 0**(siasiu 3cd068d·cosmile 3ba91e0·fc ee055ef) · 코드/DB 변경 0 · raw/PII/실 secret 값 출력 0 · 본 패치 report + package inline 포인터만 foundation-docs commit/push.

## 5. Next gate recommendation
- ★**W-e CLOSED** → delta re-review의 doc-level 잔여 마감. M6-F 상태 = **PATCH_ROUND_2_DONE / DECISION_CONFIRMED / DELTA_REVIEW=APPROVE_WITH_WATCH / W-e CLOSED.**
- **다음(별도 goal): FOUNDATION/schema design gate** — 범위 = ① `secret_version` **full zero-orphan design**(SubjectRefMap version당 1행·read-side union·rolling 중 no-rewrite·은퇴 re-key) ② **identity-touch API design**(stateless·furef 미보존·per-service auth·namespace-scoped·rate-limited·oracle 저항) ③ **canonical furef derivation**(candidate adapter/auth/backfill 단일 per-service furef secret+formula·W-d) ④ **FOUNDATION deferred items 설계**(⑧ _factory/entrypoint furef 수용·R9-1 local_user_ref echo 제거·R8-2 reason_codes enum guard). ★설계까지로 제한(schema migration·FOUNDATION 구현·execution 미포함).
- ★**M6-F execution gate(prod secret 주입·backfill)는 계속 닫힘** — 위 설계 gate PASS 후 각 별도 Leo 승인.

## 무결성
W-e doc-consistency patch(docs-only) only · runtime/schema/FOUNDATION-side/execution 0 · M6-F execution 0 · prod secret 0 · backfill 0 · main merge 0 · 이전 문구 삭제 0(inline 포인터만) · raw/PII/실 secret 값 0 · 본 report + package inline 포인터만 commit/push · **FOUNDATION/schema design gate·execution은 각 별도 Leo 승인.**
