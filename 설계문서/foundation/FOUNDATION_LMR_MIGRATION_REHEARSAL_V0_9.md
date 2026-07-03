# Foundation — LMR v0.9: Migration Rehearsal / Release Candidate

> **2026-06-28 · v0.9 PASS (Release Candidate).** 실 Foundation 이전 없이 import path/adapter/fixture path/package boundary/rollback을 rehearsal. ★live migration·API live·write·실승격 0.
> **v1.0은 자동 확정하지 않는다** — readiness review + human approval 후 별도 작업.

## A. 버전 목표
이전된 것처럼 가정하고 namespace import·의존성·경계·remap·rollback을 검증(정적·read-only). RC 단계.

## B. 구현한 파일
- `foundation_lmr_package_boundary.py` — 순수 로직 17모듈이 ssbrain/answer/brain/memory.db/live client를 import 안 하는지 정적 스캔.
- `foundation_import_adapter.py` — SIASIU→`foundation.lmr.*` namespace remap·fixture/vault path remap·`simulate_import`·missing adapter fail-closed.
- `foundation_migration_rehearsal.py` — boundary·adapter·import·dependency graph·circular 탐지·rehearsal 종합. write/live/promotion 0.
- `foundation_lmr_rollback_plan.py` — migration/rollback checklist(human approval 체크포인트 포함).
- `tools/lmr_migration_rehearsal_eval.py` — rehearsal latency·불변식 집계.
- 테스트: `test_foundation_lmr_package_boundary`(6)·`test_foundation_import_adapter`(8)·`test_lmr_migration_rehearsal`(10)·`test_lmr_release_candidate`(9).

## 패키지 경계 원칙 (검증됨)
순수 로직 17모듈은 `app/ssbrain/answer.py`·Response Brain runtime·live retrieval·live DB write·live customer memory·live API client·memory.db·DeepSeek/GPT/Claude를 import하지 않음. → **boundary clean·violations 0.**

## C/D. 테스트 수 → 총 eval **415**(신규 migration **53** cases) · 내 스위트 assertions **529**(496↑·45/45 GREEN).
## E. regression 보존 → v0.1~v0.8 362 전부 포함·삭제 0.
## F. 비율 → v0.1~v0.8(362) + migration(53).
## G. pass/fail → **415 / 0** · ## H. false_allow/false_block → **0 / 0**
## I. high-risk/privacy/customer → 이전 게이트(M6/reuse) 전부 simulated layout에서도 동작·차단 유지.
## J. speed → rehearse p95 **12ms**·boundary scan p95 sub-ms(목표 충족). ## K/L. 정적 분석·빠름.
## M. failure taxonomy → 누적·발생 0.
## N. 1차 실패와 수정 → **0건**(설계대로 통과).
## O. 최종 재실행 → 415/415 · migration 53/53 · rehearsal 불변식 0.
## P. write guard → rehearsal write 0·Vault diff 0·memory.db 0. ## Q. raw → 0.
## R. regression retention → 보존(delete_forbidden). ## S. assertions/FAIL → **529 / 0**. ## T. full-loop → **100/100**.

## Rehearsal 범위 (검증 항목)
- Foundation-like namespace import dry-run ✅ · module dependency check ✅ · ssbrain/Response Brain/retrieval_evidence dependency = **0**(boundary clean) ✅
- fixture/vault/test path remapping ✅ · circular import 0 ✅ · missing adapter 0 ✅ · adapter fail-closed ✅
- regression suite re-run under simulated layout ✅ · M6 shadow/API contract under simulated layout ✅
- **no write·no live·no promotion 검증** ✅ · **human_approval_required_before_actual_migration=true** ✅

## U. 다음 → gate PASS → **v1.0 readiness review 생성 후 STOP**(v1.0 자동 확정 ❌)
## V. commit/push → 본 v0.9 커밋 · force push 0
## 감사 → 8차원 독립 워크플로(boundary·rehearsal no-write/live·false_allow/regression·vault/memory.db·promotion·circular/adapter·retention·live/human gate) → 위반 0.
