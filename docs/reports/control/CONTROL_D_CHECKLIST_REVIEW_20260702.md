# Control §D Integrated Review — Dual-Service Adapter Patch

> 작성: foundation-control (control tower) · 2026-07-02 · read-only 검수(코드 수정 0 · push 0)
> 기준: Foundation `02b5ac2` · SIASIU `1142198` · Cosmile `11a8698` · Cosmile C-3 live 15/15(별도 확인)

## 1. 최종 판정: **READY_FOR_FABLE5_TARGETED_REAUDIT**
P0/P1 배정 항목(A-1~A-4 · B-1~B-3 · C-1~C-5) 전부 CLOSED. §D checklist 20항 PASS. 남은 것은 TRACKING(별도 train)뿐.

## 2. commit 기준표
| repo | commit | 범위 | 검증 방식 |
|---|---|---|---|
| Foundation | **02b5ac2** | A-1~A-4 (+patch test 96L) | in-process 직접 + live /health |
| SIASIU | **1142198** | B-1~B-3 | git/code + test assert 확인 |
| Cosmile | **11a8698** | C-1/C-2/C-5 (+C-4 tracked) | live eval 15/15 + git/code |
| Cosmile C-3 | — | live foundation_http 실증 | Control 재기동(:8731=02b5ac2)로 15/15 |

## 3. 항목별 PASS/FAIL
| # | 항목 | 결과 | 근거 |
|---|---|---|---|
| 1 | A-1 LOWER-6 FRC-FLAG | **PASS** | build_frc flag가 strategy/decision/block과 정합(매트릭스 7/7) · assert 확장(non_permitting_*/reco_without_prod) 위반 검출 |
| 2 | A-2 F3-SEVERITY-DEMOTION | **PASS** | `_adverse_severity_class` raise-only: 붓/발진/열감(AI=mild)→visible/block · 진물/눈주변→red_flag · demote 경로 0 · red_flag escalate |
| 3 | A-3 block suppression invariant | **PASS** | block→products/reco=false·candidates=[]·continue_use_permission 강제(build_frc + assert block_*) |
| 4 | A-4 /health commit + endpoint | **PASS** | live `/health` = commit `02b5ac2` · canonical_contract_endpoint · endpoints[]에 consult_contract |
| 5 | B-1 SIASIU fallback fail-closed | **PASS** | `_fallback` tiered — tier1 safety_suspect→safety, tier3 애매/미상→conservative(제품/CTA/추천 0) |
| 6 | B-2 SIASIU live evidence·green 위장 방지 | **PASS** | reachability=/health · live timeout≥45s · source=foundation_contract assert · **down→SKIP(≠PASS)** · exit code로 SKIP 분리 |
| 7 | B-3 SIASIU untracked closed | **PASS** | adapters/test committed(1142198)·`??` 0 |
| 8 | C-1 Cosmile fallback fail-closed | **PASS** | `dual-adapter-fallback-eval.mjs`(별도)·"detector 못 잡아도 fail-closed·상품/CTA/추천/refs 0" |
| 9 | C-2 Cosmile FRC echo suppression | **PASS** | live eval B: 정본 FRC 13필드 echo(decision_type/policy_rule_applied/suppression_reason/evidence 포함) |
| 10 | C-3 Cosmile live foundation_http evidence | **PASS** | live eval 15/15 · source=foundation_http · full-JSON fprod_ leak 0(Control 독립 재확인) |
| 11 | C-4 Cosmile untracked closed | **PASS** | adapters/route/eval committed(11a8698)·`??` 0 |
| 12 | C-5 Cosmile block/safety_first hard suppression | **PASS** | live eval C: safety 5 → mode=safety·cards/CTA/refs/추천 0 |
| 13 | commit 기준점 존재 | **PASS** | 02b5ac2 / 1142198 / 11a8698 git log 확인 |
| 14 | 기존경로/Mock Brain/brain.chat/WIP 무접촉 | **PASS** | SIASIU 기존 app 변경 0 · Cosmile 기존 route/mockBrain 변경 0 · WIP 7종 미커밋 유지 · eval F 기존 consult 정상 |
| 15 | source=foundation_http assert 존재 | **PASS** | Cosmile live eval A/B/G · SIASIU source=foundation_contract assert |
| 16 | mock_fallback=false assert 존재 | **PASS** | Cosmile eval G(sawFallback=false) |
| 17 | fallback-only ↔ live test 분리 | **PASS** | Cosmile: live=`dual-adapter-eval.mjs` / fallback=`dual-adapter-fallback-eval.mjs` · SIASIU: LIVE/FB 분리 카운트 |
| 18 | Foundation down 시 green 위장 방지 | **PASS** | Cosmile preflight down→`LIVE BLOCKED` exit3 · SIASIU down→SKIP(≠PASS) |
| 19 | 서버/프로세스 잔여 0 | **PASS** | 8731=0·8732=0·foundation proc=0(Control 기동분 종료) · 3000=Cosmile팀(미접촉) |
| 20 | push 0 | **PASS** | Control 코드수정 0·push 0 · commit은 각 repo 팀 local |

## 4. 남은 리스크 (CLOSED-blocker 아님)
- **fallback 재실행 증거**: B-1/C-1 fail-closed는 **코드 + 별도 eval 파일 존재 + 팀 보고**(SIASIU fallback 14/14 · Cosmile fallback eval)로 확인. Control이 fallback eval을 이번 턴에 재실행하진 않음(Foundation down+dev 서버 필요) → 원하면 Fable5 targeted에서 fallback eval 1회 재실행 권장.
- **product_candidates 비움 범위**: non-block·non-permitting strategy에서 `products_allowed=false`(누수 없음·flag가 governs)이나 `product_candidates` 리스트는 비워지지 않음(block만 비움). 서비스는 flag로 억제 → leak 아님. 스키마 엄격화는 TRACKING(PHANTOM-FIELDS와 함께).
- **WIP 7종**(Cosmile) 미커밋 유지 — slice와 무관·정상. 부유 상태.
- **TRACKING**(§F): LEGACY-JUDGE-ACTIVE(/v1/consult/judge 활성)·provider hardcoding/timeout 산재·session_context 중첩·CART-WRITE(write 0 유지) — 별도 release train.

## 5. Fable5 Targeted Re-Audit 넘길 요약
- **트리거 충족**: §D 20항 PASS · 3 repo commit 확정 · Foundation /health=02b5ac2.
- **재감사 표적(닫힘 재확인만)**: LOWER-6 FRC-FLAG · F3-SEVERITY-DEMOTION · A-3 block · FALLBACK-FAIL-OPEN(양 repo·★fallback eval 1회 재실행 권장) · TEST-EVIDENCE(live/SKIP 분리) · UNTRACKED-CLOSED · COSMILE-FRC-ECHO · COSMILE-BLOCK-GAP.
- **제공물**: commit 3종 · Foundation /health commit · 본 §D 결과 · 각 팀 완료 보고 · live eval 15/15 로그.
- **범위 유지**: FABLE5-AUDIT-01 §1.5(배선/계약/안전/경계/seam). retrieval/memory 품질 = AUDIT-02(비범위).
- **판정 규칙**: 표적 전부 PASS → Dual-Service Adapter Layer = CLOSED 후보. TRACKING은 차단 아님.

## 6. 서버/프로세스 상태
- Control 기동 :8731(02b5ac2·PID 784178) → 검증 후 **종료**. 8731=0·8732=0·foundation proc=0.
- :3000(Cosmile 팀·760739) 미접촉·유지.

## 7. push 0
foundation-control HEAD `02b5ac2` unchanged · Control 코드수정 0 · push 0.
