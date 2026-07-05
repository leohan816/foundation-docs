# Memory V1 — M6-F Option B furef Secret Naming Reconciliation

> 작성: foundation-control(Control) · 2026-07-05 · **범위: SIASIU furef secret 이름 정본 확정 + 문서 drift 정리(docs 정합·코드 변경 0).**
> ★Hard Stop 무접촉: 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · main merge 0 · Cosmile mint/runner-fix 미수행.
> 근거(local): SIASIU/FOUNDATION 실코드 audit · Option B contract · safe residual cleanup(`145dabe`).

---

## 1. Fact
- ★**정정된 발견:** `SIASIU_FUREF_SECRET`과 `FOUNDATION_USER_REF_SECRET`은 **서로 다른 두 furef 메커니즘**이다(가설의 "단순 rename/legacy alias"가 아님).
  - `SIASIU_FUREF_SECRET` = **Option B memory adapter** furef 내부 ref(shadow·2 모듈).
  - `FOUNDATION_USER_REF_SECRET` = **CUTOVER-01** furef_v2_ HMAC(`provider_flag.py` + test 2개·**기존 코드 배선**).
- 따라서 FOUNDATION_USER_REF_SECRET을 wholesale "legacy/superseded"로 처리하면 CUTOVER-01 코드를 오표기 → **정직하게 두 메커니즘 구분**.

## 2. Audit targets
| 위치 | SIASIU_FUREF_SECRET | FOUNDATION_USER_REF_SECRET |
|---|---|---|
| SIASIU 코드 | `foundation_memory_candidate_adapter.py`·`foundation_p3_auth_shadow.py`(2) | `app/adapters/provider_flag.py`·`test_dual_adapter_02a.py`·`test_cutover_01.py`(3) |
| FOUNDATION 코드 | 0 | 0 |
| foundation-docs | 15 파일 | 8 파일(대부분 M4/M1/CUTOVER 구 문서) |
| SIASIU docs | 1 | 2 |

## 3. Code source of truth
- **Option B memory furef 정본 = `SIASIU_FUREF_SECRET`**(adapter L33·p3 L32·`_FUREF_SECRET = _load_secret("SIASIU_FUREF_SECRET", ...)`).
- **CUTOVER-01 furef = `FOUNDATION_USER_REF_SECRET`**(`provider_flag.py`·기존 배선·별개 목적).
- ★FOUNDATION repo 코드에는 둘 다 **없음**(Option B에서 Foundation subject secret 제거·CUTOVER는 SIASIU-side).

## 4. Naming decision
- ★**Option B memory context**: furef 내부 ref = **`SIASIU_FUREF_SECRET`**(정본·code 일치).
- ★**CUTOVER-01**: `FOUNDATION_USER_REF_SECRET`은 **기존 CUTOVER-01 코드 secret**(별개·superseded 아님·rename 안 함 — 코드 참조라 문서만 정정 불가).
- ★**Foundation 명칭 혼선**: Option B에서 Foundation은 subject mint 없음 → `FOUNDATION_*` user_ref 명칭은 혼선 소지. 단 CUTOVER-01 **코드가 사용** → **명칭 정정은 코드 변경 수반·별도 승인**.
- ★**unification 질문**(memory furef == CUTOVER-01 furef 통일?): 사용자 furef 일관성 위해 통일이 바람직할 수 있으나 **별도 design 결정**(코드 변경·별도 승인). **지금은 두 secret 구분 유지**.

## 5. Docs patched or no-patch
- **patched(docs-only):**
  - SIASIU `docs/security/ENV_AND_MIGRATION_POLICY.md`: reconciliation watch를 **정확한 구분**으로 갱신(두 메커니즘·unification 별도).
  - Option B ops handoff: `SIASIU_SUBJECT_SECRET_VERSION` 추가(env policy와 키 정합) + `FOUNDATION_USER_REF_SECRET`을 **CUTOVER-01 별개**로 명시(삭제/superseded 아님).
- **no-patch(의도적):**
  - M4/M1/CUTOVER 구 문서의 FOUNDATION_USER_REF_SECRET(역사 기록·CUTOVER-01 정본)·이미 Option A supersede pointer 있는 M6-F 문서 → 추가 rename note 불요(정보 손실 방지·CUTOVER는 유효).
- ★키 목록 정합 확인: SIASIU env policy ↔ Option B ops handoff = SIASIU_SUBJECT_SECRET·_VERSION·FUREF·MEMORY_CANDIDATE·P3_AUTH(공통) + FOUNDATION_USER_REF_SECRET(CUTOVER 별개·양쪽 note).

## 6. 코드 변경 필요 여부
- ★**naming 정합만으로는 코드 변경 불요**(각 메커니즘이 자기 이름을 코드에서 일관 사용). **docs 정합으로 충분.**
- ★**코드 변경이 필요한 경우 = unification 결정 시**(memory furef를 CUTOVER-01 furef와 통일·또는 FOUNDATION_USER_REF_SECRET rename) → **별도 Leo 승인 요청**(이번 batch 미수행).

## 7. Remaining watch
- **unification design**: Option B memory furef(SIASIU_FUREF_SECRET) ↔ CUTOVER-01 furef(FOUNDATION_USER_REF_SECRET) 통일 여부·별도 design·코드 변경 시 별도 승인.
- **FOUNDATION_USER_REF_SECRET rename**: Option B 혼선 명칭·CUTOVER-01 코드 참조라 rename은 코드 변경·별도.
- Cosmile subject mint(별도 gate)·runner-fix(별도 train).

## 8. Hard stops
실 Vault write · prod DB write/backfill · live enable · hard reject activation · main merge · prod secret rotation · cross-service identity linkage · **CUTOVER-01/memory furef unification 코드 변경(별도 승인)** = 미수행.

## 무결성
furef secret naming reconciliation(docs 정합) · 코드 변경 0 · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 두 furef 메커니즘 정직 구분(병합 0) · docs 정합만 · 본 reconciliation + patched docs만 commit/push · **unification·rename 코드 변경은 별도 Leo 승인.**
