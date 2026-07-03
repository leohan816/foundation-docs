# Foundation Repo Physical Materialization Report (2026-06-29)

> **이전 보고 정정**: Phase 3 "safe additive migration"은 SIASIU **내부** `foundation/` namespace 빌드(SIASIU/app을 가리키는 re-export wrapper)였음 — **Foundation repo physical migration이 아니었음.** 본 작업으로 `/home/leo/Project/FOUNDATION` repo에 **실제 소스 dependency closure를 독립 core로 물리 materialization** 완료.

## 무엇을 했나 (정직하게)
- SIASIU/app의 **실제 구현 소스 dependency closure 50개**(LMR/Brain/Trust Core/contracts/adapters/api·answer/ssbrain 결합 0)를 계산.
- `/home/leo/Project/FOUNDATION/foundation/_core/`에 **실제 .py 50개 물리 복사**(SIASIU 내부 wrapper를 복사한 것이 아님).
- 문서 경로(`foundation/lmr`·`foundation/brain/runtime`·`foundation/trust_core`·`foundation/contracts`·`foundation/adapters`·`foundation/api`)는 **FOUNDATION 자체 `_core`를 re-export**(SIASIU/app 미참조).
- `foundation/__init__.py`가 `_core`를 sys.path에 등록 → FOUNDATION 단독 import.
- api(4)·cosmile(8) 소스 물리 복사·feature_flags·단독 test runner(3 테스트 23 assertions)·test_fixtures(read-only).

## Materialization Gate — 결과
| 게이트 | 결과 |
|---|---|
| foundation/{lmr,brain/runtime,trust_core,contracts,adapters,api} 경로 | ✅ 6개 전부 존재 |
| ★FOUNDATION 코드의 SIASIU/app import·sys.path 의존 | **0** (격리 env -i import 후 sys.path SIASIU 0·로드 소스 전부 FOUNDATION/_core) |
| FOUNDATION 단독 import smoke | ✅ PASS (8/8 + runner 3/3·23 assertions) |
| FOUNDATION internal API/adapter smoke | ✅ PASS (7 method·healthcheck·fail-closed·applied/write 0) |
| SIASIU → FOUNDATION repo shadow call | ✅ PASS (`foundation_repo_link` 프로세스격리·recommend/hold/do_not_buy·source=foundation_repo) |
| 기존 SIASIU workflow regression | ✅ one-command 89/89 유지 |
| answer.py unchanged | ✅ 지문 d7f579443f8a110a |
| write/live/promotion·memory.db·ssbrain·Vault/canonical/learned | ✅ 전부 0 |

## 수치
- real source modules(_core) = **50** · package re-export = 55 · **SIASIU/app 코드 의존 = 0**.
- FOUNDATION 단독 runner = 3/3·23 assertions. SIASIU one-command = 89/89·651 assertions.

## 남은 데이터 의존(코드 아님·문서화)
- `vault_readonly_reader`는 `~/data/vaults/SIASIU_COSMILE_VAULT/knowledge`(home-relative·read-only Vault) 참조 — **코드 의존이 아닌 데이터 경로**. FOUNDATION 측 Vault(`~/Project/foundation-vault`)로 repoint은 후속 작업.
