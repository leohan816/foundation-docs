# Foundation Core Testability Gate (2026-06-29)

> Foundation 이전 후에도 **LMR + Brain + Trust Core 전체 regression을 동일하게 재실행**할 수 있는지 검증. ★offline·shadow·no-live·read-only.

## 구현
- `foundation_core_test_registry.py` — 레이어별 테스트 등록(lmr 35·brain 16·trust_core 6 = **57**)·missing 0·REPO 상대.
- `foundation_core_fixture_registry.py` — fixture 등록·존재 검증(fail-clear)·문서화된 path dep(실 Vault remap).
- `foundation_core_testability.py` — 게이트: namespace parity·path remap·no-live·offline·shadow·절대경로·missing fixture fail-clear·post-migration·rollback rerun·설계문서 청결.
- `tools/foundation_core_test_runner.py` — ★**one-command** 러너(LMR+Brain+Trust 한 번에)·layer별 failure taxonomy·report→검증결과/.
- 테스트: `test_foundation_core_testability`(13).

## Pass Criteria 결과
| 기준 | 결과 |
|---|---|
| one command로 LMR+Brain+Trust regression | ✅ `python3 app/tools/foundation_core_test_runner.py` → 57/57·471 assertions |
| old SIASIU path PASS | ✅ |
| new foundation.lmr.* namespace PASS | ✅ (namespace parity) |
| path remap PASS | ✅ fixture+vault remap |
| missing fixture fail-clear | ✅ _parse_error/marker(조용한 성공 아님) |
| live dependency 0 | ✅ network/LLM 호출 0(소스 스캔) |
| 절대경로 의존 0 또는 문서화 | ✅ registered 테스트 0·실 Vault는 문서화(remap) |
| reports 검증결과/ 생성 | ✅ FOUNDATION_CORE_TESTABILITY_REPORT.json |
| 설계문서에 generated json/html 미혼입 | ✅ 설계문서 .json 0 |
| 실패 시 layer별 failure taxonomy | ✅ 10종·layer별 분류 |

## failure taxonomy
import_error·assertion_fail·missing_test·live_dependency·fixture_missing·namespace_parity_fail·path_remap_fail·shadow_violation·timeout·crash.

## 문서화된 path 의존 (이전 시 remap)
- 실 Vault `~/data/vaults/SIASIU_COSMILE_VAULT/knowledge` (home-relative·read-only) → `foundation_import_adapter.remap_vault_path`. 없어도 fixture로 대체(required=False).

## Gate → PASS (all_pass·gate_ok True)
