# Dual-Service Adapter Layer — CLOSED 기록

> 작성: foundation-control (control tower) · 2026-07-02 · 문서 정리(코드 수정 0 · push 0)
> Fable5 targeted re-audit verdict: **PASS_WITH_WATCH** · PATCH_REQUIRED 없음 · NEEDS_EVIDENCE 없음
> ★성격: **read-only/mock/shadow contract-integration slice**의 계약·안전·경계 검증 CLOSED.
> ★NOT production live · api_live=false · dev_shadow · write/live/promotion 0 · real user exposure 0.

---

## 1. Dual-Service Adapter Layer = CLOSED
SIASIU / Cosmile이 고객 입력을 **Foundation 정본 계약 경로(`POST /v1/consult_contract`, SSC in / FRC out)**로 정직하게 연결하고,
Foundation이 safety/policy/product rail을 FRC로 판단하며, 서비스가 목소리/UX로만 소비하는 구조가 **계약·안전·경계 기준 CLOSED**.

- **contract 배선**: 양 서비스 `/v1/consult_contract` 사용 · `/v1/consult/judge` contract 사용 0.
- **safety**: safety 케이스 → safety_first/block · 상품/CTA/추천/refs 억제 · fail-closed(fallback 포함).
- **commerce**: `product_context.catalog_candidates` → Foundation 도달 · surface refs ⊆ FRC.product_candidates(서비스 제품 자작 0).
- **경계**: Foundation에 service voice/CTA/UI 0 · 기존 brain.chat/Mock Brain baseline 무변경 · shared SDK 0.
- **판정 근거**: Control §D 20항 PASS(`docs/CONTROL_D_CHECKLIST_REVIEW_20260702.md`) + Cosmile live eval 15/15(source=foundation_http·mock_fallback=false) + Foundation in-process A-1/A-2/A-3 검증 + Fable5 targeted PASS_WITH_WATCH.

★한계(불변): dev_shadow · api_live=false · write/checkout/cart DB write 0 · canonical/learned promotion 0 · real user exposure 0. **production live·실사용자 연결은 별도 승인 release train.**

---

## 2. 3 repo commit 기준표
| repo | commit | 범위 | 상태 |
|---|---|---|---|
| **Foundation** (foundation-control) | `02b5ac2` | CONTRACT-01 Phase B + patch A-1~A-4 | CLOSED |
| **SIASIU** | `1142198` | 02A slice + patch B-1~B-3 | CLOSED |
| **Cosmile** | `11a8698` | 02B slice + patch C-1/C-2/C-5(+C-4 tracked) | CLOSED |
| Cosmile C-3 | — | live foundation_http 실증(:8731=02b5ac2) | 15/15 PASS |

- 3 repo commit 모두 **local**(push 0). Foundation `/health` = `commit:02b5ac2` 로 실행본 식별 가능.

---

## 3. Fable5 targeted re-audit 요약 (PASS_WITH_WATCH)
- **표적(닫힘 재확인)**: LOWER-6 FRC-FLAG · F3-SEVERITY-DEMOTION · A-3 block suppression · FALLBACK-FAIL-OPEN(양 repo) · TEST-EVIDENCE(live/SKIP 분리) · UNTRACKED-CLOSED · COSMILE-FRC-ECHO · COSMILE-BLOCK-GAP → **전부 PASS**.
- **PATCH_REQUIRED: 없음 · NEEDS_EVIDENCE: 없음.**
- **WITH_WATCH**: CLOSED를 막지 않는 관찰 항목을 별도 train으로 이관(§4). 범위 = FABLE5-AUDIT-01 §1.5(배선/계약/안전/경계/seam). retrieval/memory 품질은 비범위(AUDIT-02).

---

## 4. 남은 WATCH / TRACKING (CLOSED-blocker 아님 · 별도 release train)
| 항목 | 성격 | 이관처(후보) |
|---|---|---|
| **fallback eval 주기 재실행** | B-1/C-1 fail-closed는 코드+별도 eval(`dual-adapter-fallback-eval.mjs`)·팀 보고로 확인. 회귀 게이트로 주기 실행 권장 | CI 게이트 |
| **LEGACY-JUDGE-ACTIVE** | `/v1/consult/judge` endpoint 활성(계약 아님) — deprecation | Foundation cleanup train |
| **HEALTH-STALE** | `/health` commit 노출(A-4)로 최소 대응 완료 · 기동/버전 운영 절차 | 운영 절차 |
| **forbidden_expressions 렌더 강제** | FRC 금지표현을 서비스 렌더가 실제 강제하는지 | 렌더 계약 train |
| **provider hardcoding / timeout 산재** | DeepSeek 하드코딩·timeout 분산 | **GLOBAL-AI-RUNTIME-01** |
| **session_context / catalog 배치 · PHANTOM-FIELDS** | SSC/FRC 스키마 정리(미사용/중첩 필드) | 스키마 정리 train |
| **product_candidates 비움 범위** | non-block·non-permitting에서 flag=false(누수 0)이나 리스트 미비움 | 스키마 정리 train |
| **CART-WRITE** | commerce write 경로 위험 — ★현재 write/checkout/cart DB write **0 유지(금지)** | COSMILE-CONNECT 이후 승인 train |

---

## 5. 다음 slice (예고 · 미착수): **COSMILE-CONNECT-UI-SWITCH**
- 목표: Cosmile 실제 UI가 Mock Brain → Foundation 계약 경로로 **소비 전환**(shadow/parallel → 표면 노출 후보).
- ★전제: **설계자료/ 설계서 먼저 → 승인 → 구현**(design-first). 
- ★안전 경계 유지: Foundation 계약·fail-closed·suppression 불변 · 기존 Mock Brain baseline 롤백 가능 유지.
- ★live/write/promotion·checkout·cart DB write·real user exposure = **별도 승인 release train**(이번 CLOSED에 포함 안 됨). CART-WRITE(WATCH)는 이 train에서 명시 승인 전까지 write 0.
- 착수 조건: 본 layer CLOSED(현재) + COSMILE-CONNECT-UI-SWITCH 설계서 PASS/APPROVED.

---

## 6. push 0
- Control 코드 수정 0 · foundation-control HEAD `02b5ac2` unchanged · 3 repo commit local · **push 0**.

## 7. 서버 / 프로세스 잔여 0
- `:8731`=0 · `:8732`=0 · foundation_http_service 프로세스=0 (Control 기동분 전량 종료 · stale 방지).
- `:3000`(Cosmile 팀 dev) 미접촉·유지.

---

## 요약 (보고 언어)
Dual-Service Adapter Layer = **CLOSED** (read-only/mock/shadow · contract·safety·boundary 검증).
Foundation `02b5ac2` · SIASIU `1142198` · Cosmile `11a8698` · Fable5 **PASS_WITH_WATCH**(PATCH/NEEDS_EVIDENCE 0).
WATCH/TRACKING = 별도 train 이관. 다음 = COSMILE-CONNECT-UI-SWITCH(설계-우선·승인 필요).
★production live·write·promotion·real user exposure = 0(별도 승인 release train). push 0 · 서버 잔여 0.
