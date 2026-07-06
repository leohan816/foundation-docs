# Memory V1 — M6-G Hard Reject Simulation & PostgreSQL Dev Default Infra (dev/local/shadow)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: M6-G hard reject dev 시뮬레이션(activation 금지) + SIASIU postgres dev default 인프라(default 전환 금지). M6-F prod path=HOLD.**
> ★Hard Stop 무접촉: M6-G activation 0 · prod DB 0 · ops Vault 0 · 실 secret 0 · prod backfill 0 · main merge 0 · live 0 · 외부 배포 0 · canonical schema 변경 0 · 원본 DB 삭제 0 · guard 완화 0 · skip/xfail 0.
> 근거: 실 docker postgres 검증 · rebaseline(`a2a6608`).

---

## 1. Fact
- Leo 결정: M6-G dev 시뮬레이션 GO(activation 금지) · postgres dev default 인프라 GO(default 전환 금지) · M6-F prod path HOLD.
- ★M6-G hard reject **7/7 시나리오 · false_allow 0** · postgres dev 인프라 구축 · runner **89/89**(postgres env·backend 무관). **실 사용자 경로 hard reject OFF**(SIMULATION_ONLY).

## 2. M6-G dev simulation result
- `service_memory/hard_reject.py`: **deterministic policy gate**(구조화 state→memory_reuse_decision·AI semantic 아님·정책 집행). ★`SIMULATION_ONLY=True`·실 경로 미배선·flag OFF.
- 시나리오(postgres canonical 상태 기반):
| 시나리오 | decision | reuse | false_allow |
|---|---|---|---|
| deleted | deleted | **REJECT** | 0 |
| blocked | blocked | **REJECT** | 0 |
| expired | expired | **REJECT** | 0 |
| consent_required(revoked) | consent_required | **REJECT** | 0 |
| safety_block | blocked | **REJECT** | 0 |
| unknown(consent None·fail-safe) | consent_required | **REJECT** | 0 |
| clean | allowed | ALLOW | 0 |
- ★**7/7 OK · false_allow 0 · false_block 0**. memory_reuse_decision 6종 연계(allowed/blocked/expired/deleted/consent_required/not_available).
- 테스트: `test_m6g_hard_reject_simulation.py` **5/5**(pure·false_allow 0 over full matrix) + postgres sim 7/7.

## 3. False allow / false block analysis
- ★**false_allow = 0**(STOP 조건 미발생). fail-closed: `hard_reject(decision) = decision != "allowed"` → allowed만 reuse·나머지(deleted/blocked/expired/consent/safety/unknown) 전부 차단.
- **false_block = 0**: clean(consent granted·available·not deleted/blocked/expired/safety)만 allow → 정당한 reuse 차단 없음.
- unknown/모호(consent None) → consent_required(차단·fail-safe) → false_allow 방지.
- ★full matrix(deleted×blocked×expired×consent×safety) 조합 전수 false_allow 0 검증.

## 4. SIASIU postgres dev default infra result
- **dependency**: `requirements.txt`에 `psycopg2-binary>=2.9`(dev/local·주석으로 opt-in 명시). venv 검증(2.9.12).
- **docker-compose**: `docker-compose.dev.yml`(postgres:16-alpine·port 55432·★dev placeholder secret·prod 아님).
- **문서**: `service_memory/README_POSTGRES_DEV.md`(기동·schema·opt-in 실행·테스트·rollback·Hard Stop).
- **backend default 정합**: `active_backend()` default = **`sqlite_legacy`**(opt-in postgres). ★**실 live/prod default 전환 안 함**(Leo 지시)·정본은 postgres이나 dev default 승격은 인프라 표준화 후.

## 5. Runner/test result
| 테스트 | 결과 |
|---|---|
| runner(postgres env) | **89/89 · {}clean**(backend 무관·app/data clean-zone) |
| service_memory contract(postgres) | **6/6** |
| shadow wiring(postgres) | **4/4** |
| M6-G hard reject(pure) | **5/5**·false_allow 0 |
| M6-G hard reject(postgres sim) | **7/7**·false_allow 0 |
| sqlite fallback(default·env 없음) | **회귀 0**(legacy recall OK·default sqlite_legacy) |
- ★no skip/xfail·no expectation manipulation·실패 0.

## 6. Rollback path
- ★**flag 1개로 즉시 rollback**: `unset SIASIU_MEMORY_BACKEND`(또는 `=sqlite_legacy`) → 기존 sqlite 경로. **회귀 0**·코드 변경 불요.
- postgres 컨테이너: `docker compose -f docker-compose.dev.yml down`(데이터 유지)·`down -v`(dev volume 삭제).
- ★default가 sqlite_legacy라 **미설정 시 자동으로 legacy**(안전).

## 7. Readiness update
| phase | 상태 |
|---|---|
| M6-G hard reject **dev 시뮬레이션** | ✅ **완료**(7/7·false_allow 0·SIMULATION_ONLY) |
| M6-G **activation** | **BLOCKED_BY_HARD_STOP**(Leo 최종·실 경로 OFF) |
| SIASIU postgres dev default **인프라** | ✅ **완료**(requirements·compose·docs·default 정합) |
| SIASIU postgres dev default **전환** | 미전환(opt-in·인프라 표준화 후) |
| **M6-F prod path** | ★**HOLD**(ops Vault·prod backfill·실 secret = 금지) |
| M6-H live/main checklist | 6개 중 M6-G 시뮬·postgres 인프라 항목 ✅·나머지(M6-F prod·실flow·안전 invariant·rollback+Leo) 미충족 |

## 8. Remaining Hard Stops
- **M6-G hard reject activation** · ops Vault 실 주입 · prod DB backfill · 실 secret · prod DB 접근 · live · main merge · external deployment · 실 role grant · canonical schema 변경 · prod DB migration · 원본 DB 삭제 · SIASIU postgres **live/prod default 전환**.

## 9. Commit hashes
- **SIASIU shadow `516e8ff`**(hard_reject·m6g sim test·postgres infra·backend default 정합) + `609eba7`(shadow wiring·이전)·main 3cd068d 무변경.
- **foundation-docs**: 본 report(아래 commit).

## 10. What was not touched
- ★hard reject **실 사용자 경로 미배선**(SIMULATION_ONLY·activation 0)·원본 DB(삭제 0)·canonical schema(변경 0)·guard(완화 0)·runner 89/89(조작 0)·answer.py fingerprint·SIASIU **dev default 전환 안 함**(sqlite 유지)·concurrent 세션 파일·prod/live/main/실 secret/실 Vault.

---

## 무결성
M6-G dev 시뮬레이션(7/7·false_allow 0·activation 0) · postgres dev 인프라(requirements·compose·docs·default sqlite 유지) · runner 89/89(postgres env) · service_memory 6/6·shadow 4/4·hard reject 5/5 · sqlite fallback 회귀 0 · rollback flag 1개 · 실 secret 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · canonical schema 변경 0 · **M6-G activation·M6-F prod path·live·main = Hard Stop 유지**.
