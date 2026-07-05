# Memory V1 — M6 Runner-Fix Train Package (separate train · 83/89 → 89/89)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: runner 83/89 vs 89/89 baseline을 **별도 train**으로 정본화. M6-F progress를 block하지 않는 documented watch.**
> ★read-only 진단 + 계획. FOUNDATION 코드 대규모 변경·main merge = 별도 승인(Hard Stop 아님이나 별도). raw/PII 출력 0.
> 근거(local): FU-3 진단 · execution gate package runner decision(`676a362`) · dev backfill preflight(`10996c5`·taxonomy 확인) · FOUNDATION HEAD c9bb996.

---

## 1. Fact
- runner = **83/89**(fail 6)·CLAUDE.md §3 baseline = **89/89**. delta = 6 fail. **taxonomy {lmr 5, brain 1}**·전 세션 일관·M6-F 전후 불변(추가 감소 0).

## 2. 실패 6건(현 taxonomy)
| layer | 실패 테스트 |
|---|---|
| lmr(5) | learning_memory_reuse_hardening_loop · lmr_m6_shadow_loop · lmr_api_contract_loop · lmr_release_candidate · lmr_v1_final_loop |
| brain(1) | foundation_brain_runtime_e2e |

## 3. 원인(read-only 진단·FU-3 계승·재확인)
- FOUNDATION HEAD = **`c9bb996`**(subject_ref v2 hard gate·`subject_identity.py` 등 6파일)·HEAD 조상 확인.
- c9bb996이 **lmr/brain 테스트 파일을 수정하지 않음** → `subject_identity`(subject_ref format subj_→subj_v2_·prod fail-closed·require_furef_v2) 변경의 **간접 영향**(lmr/brain suite가 subject_ref/memory identity 소비).
- ★89/89 = **c9bb996 이전** baseline. 6 fail = c9bb996 도입 시점부터·**memory batch/M6-F identity 표면 무관**(memory 작업은 fc/SIASIU/Cosmile shadow·FOUNDATION lmr/brain 미수정).
- ★M6-F FOUNDATION impl(df9f6cc·shared_memory)도 lmr/brain 무영향(runner 83/89 불변 확인).

## 4. Train scope (별도·read-only 진단 → 수정은 별도 승인)
1. **진단(read-only):** 6 실패 테스트 개별 재현·assertion 판독·c9bb996 subject_identity 변경과 lmr/brain 기대의 정확한 불일치 지점 식별.
2. **정합 설계:** lmr/brain suite를 subject_ref v2(subj_v2_·require_furef_v2) 동작에 맞춰 정합(테스트 기대 갱신 또는 core 정합)·회귀 없이 89/89 회복.
3. **수정 실행:** 별도 승인 후(FOUNDATION 코드/테스트·control tower plan 경유·shadow).
- ★이 package = 진단/계획까지. 수정 실행은 별도 gate.

## 5. M6-F carry decision (Leo 확정 반영)
- ★**runner-fix train = 별도 gate**로 분리(M6-F identity/backfill과 독립).
- ★M6-F identity/backfill gate는 **83/89를 documented watch로 carry**(backfill은 identity/memory row 대상·lmr/brain 미접촉·비-blocker).
- ★execution 직전 runner 재실행 taxonomy 동일 필수·추가 감소/새 taxonomy → STOP.

## 6. Full production live enable precondition
- ★**full production live enable(flag ON·hard reject·real user) 전에는 runner 89/89 회복 필수**(runner-fix train PASS 선결). backfill(prod DB write·데이터)과는 분리하되, **live enable 게이트의 명시 선결**.

## 7. Boundary
- read-only 진단 + 계획. FOUNDATION lmr/brain 수정 = 별도 승인·main merge 별도. ★M6-F progress block 안 함(watch carry).

## 8. Next action
- Leo 판단: ① runner-fix train을 별도 gate로 인지(본 정본) ② 진단 실행(read-only) 승인 여부 ③ 수정 실행은 별도 gate. ★M6-F는 83/89 watch carry로 계속 진행·live enable 전 89/89 필수.

## 무결성
runner-fix train **package(진단/계획)** only · FOUNDATION 코드 변경 0 · main merge 0 · raw/PII 출력 0 · M6-F block 0(watch carry) · 본 package만 commit/push · **수정 실행·main merge는 별도 승인.**
