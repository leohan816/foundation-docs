# Memory V1 — M6-F Option B Residual Cleanup Plan

> 작성: foundation-control(Control) · 2026-07-05 · **범위: Option B pivot 후 잔여 정리 **계획**(코드 미실행·별도 승인 전 실행 0).**
> ★docs-only plan. 코드 변경 · 실 secret 생성/출력/커밋 · Vault write · prod DB backfill · live · main merge = **미수행.**
> 근거(local): Option B contract·shadow pivot·doc drift patch(`f8d1647`) · FOUNDATION/SIASIU/Cosmile 실코드.

---

## 1. Fact
- Option B pivot 정본 고정(contract + shadow pivot + doc drift patch). 잔여 4항 정리: SubjectRefSecretMissing relic · SIASIU ENV policy sync · Cosmile subject mint 미배선 · runner 83/89 watch.
- ★본 문서 = 계획. 코드/repo 수정은 각 별도 승인.

## 2. Residual items
### R-1 SubjectRefSecretMissing relic (Option A relic·제거 대상)
- **active dependency 재확인:** 정의 = `subject_identity.py:29`(class). 사용 = `__init__.py` **import + `__all__` export 2건뿐**. ★**raise/except/기능 호출 = 0**(resolve_subject는 `SubjectMintDeprecated`를 raise)·**active functional dependency 0** → 제거 가능.
- **shadow code patch plan(★별도 Leo 승인 전 실행 금지):**
  1. `subject_identity.py`: `class SubjectRefSecretMissing` 제거.
  2. `__init__.py`: import 목록 + `__all__`에서 `SubjectRefSecretMissing` 제거.
  3. 테스트 재실행(shared_memory 41·hard_gate 21·eval 16/16)·import 오류 0 확인.
- ★위험 낮음(unused relic)·단 코드 변경이므로 별도 승인·shadow 브랜치.

### R-2 SIASIU security ENV policy sync
- Option B에서 `SIASIU_FUREF_SECRET`(내부 furef ref·SubjectRefMap.local_user_ref_hash)·`SIASIU_SUBJECT_SECRET`(service-local subject mint) 사용(adapter/p3).
- SIASIU repo에 `docs/security/` 존재. **SIASIU repo `docs/security/ENV_AND_MIGRATION_POLICY.md`에 Option B env(SIASIU_SUBJECT_SECRET·SIASIU_FUREF_SECRET·SIASIU_MEMORY_CANDIDATE_SECRET·SIASIU_P3_AUTH_SECRET) 반영 필요.**
- ★**실제 수정 = SIASIU repo 작업으로 분리**(role separation: SIASIU Claude Code가 repo-local·control tower는 contract/env 정본 제공). control은 정본 env 목록(ops handoff·env policy)만 정의. `.env.example`은 key 이름만·실 값 0.

### R-3 Cosmile subject_ref mint 미배선
- 현재 Cosmile de-anon(`foundation-memory-deanon.mjs`)은 subject_ref mint **0**(commerce event de-anon만). Cosmile은 subject_ref를 mint하지 않음.
- ★**blocker 아님:** M6-F subject_ref backfill = **SIASIU-중심**(SIASIU가 subject_ref 소비). Cosmile subject mint는 Cosmile가 자체 memory subject_ref가 필요할 때만.
- **별도 gate 초안(Cosmile subject mint gate):** 필요 시 Cosmile에 `COSMILE_SUBJECT_SECRET` + `subject_ref = subj_v2_ + HMAC(COSMILE_SUBJECT_SECRET, "cosmile:subject:"+id)[:32]`(service-local·Foundation 미호출)·SubjectRefMap W1·post-injection에 COSMILE_SUBJECT_SECRET 추가. ★현재 미필요·미배선 유지.

### R-4 runner 83/89 watch
- runner 83/89 taxonomy {lmr 5, brain 1}·Option B 전후 불변. ★**live enable 전 89/89 회복 필수**(runner-fix train PASS 선결). backfill(데이터)과는 분리·live gate의 명시 선결.

## 3. Recommended order
1. **(safe·docs·지금 가능)** 본 plan + Cosmile subject mint gate 초안 + SIASIU ENV sync note. ← 완료(본 문서).
2. **(별도 승인·shadow code)** R-1 SubjectRefSecretMissing 제거(FOUNDATION shadow·테스트).
3. **(별도·SIASIU repo)** R-2 SIASIU docs/security ENV policy 반영(SIASIU Claude Code·control env 정본 기준).
4. **(별도 gate·필요 시)** R-3 Cosmile subject mint 배선.
5. **(별도 train·live 전)** R-4 runner 89/89 회복.

## 4. Safe-scope vs hard-stop
| 항목 | 분류 |
|---|---|
| 본 residual plan·Cosmile gate 초안·SIASIU ENV sync note | **Safe(Control·docs)** |
| R-1 SubjectRefSecretMissing 코드 제거(shadow) | 별도 Leo 승인(코드·shadow·Hard Stop 아님) |
| R-2 SIASIU docs/security 수정 | 별도(SIASIU repo·role separation) |
| R-3 Cosmile subject mint 구현 | 별도 gate |
| R-4 runner-fix 수정 | 별도 train |
| 실 Vault write · prod DB backfill · live enable · hard reject · main merge · prod secret rotation · cross-service linkage | **Hard Stop(Leo 최종/ops)** |

## 5. Next action
- Control 계속 가능(safe): 후속 docs·gate 초안·status update.
- Leo 승인 필요: R-1 코드 제거(shadow)·R-2 SIASIU repo 반영 지시·R-3 Cosmile gate·R-4 runner-fix.
- ★prod backfill·live·main merge·실 Vault write = Hard Stop 유지.

## 무결성
Option B residual cleanup **plan** only · 코드 변경 0 · 실 secret 0 · Vault write 0 · prod DB 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · SubjectRefSecretMissing active dep 0 확인(제거는 별도 승인) · 본 plan만 foundation-docs commit/push · **R-1~R-4 실행은 각 별도 승인.**
