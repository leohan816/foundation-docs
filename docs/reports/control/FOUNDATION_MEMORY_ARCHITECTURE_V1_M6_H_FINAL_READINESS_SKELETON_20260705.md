# Memory V1 — M6-H Final Readiness Skeleton (M6-C~G 통합 · blockers/watch/hard-stops)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: M6-H final readiness **skeleton** — M6-C/D/E/F/G 상태 통합 + remaining blockers/watch/hard-stops/approvals matrix.**
> ★skeleton(뼈대). live enable = Hard Stop. raw/PII/실 secret 값 0.
> 근거(local): M6-C(`706b60a`) · M6-D(`7e07ad7`) · M6-E(`57be368`) · M6-F 일련(`~c433f14`) · runner-fix train(본 batch) · M6-G decision(본 batch).

---

## 1. Fact
- M6-H = 종합 final readiness → **live enable** 판단(그 다음 별도 승인). 본 문서 = 통합 skeleton(현 시점 상태·blocker·approval matrix).

## 2. M6-C/D/E/F/G 통합 상태
| gate | 내용 | 상태 |
|---|---|---|
| **M6-C** | ingress shadow scan(flag ON·정상 reject 0·hard_reject 0) | **PASS**(`706b60a`) |
| **M6-D** | SIASIU P3 auth live-prep(de-id·회귀 0) | **PASS**(`7e07ad7`) |
| **M6-E** | Cosmile emit live-prep(same-row 0·commerce 회귀 0) | **PASS**(`57be368`) |
| **M6-F design** | secret_version zero-orphan·identity-touch·canonical furef | **APPROVE_WITH_WATCH**(`02fe421`) |
| **M6-F schema(dev)** | SubjectRefMap +secret_version | **PASS**(`b0f8685`) |
| **M6-F impl(shadow·flag OFF)** | identity-touch·furef·W1~W6 | **PASS**(`0687404`) → review **APPROVE_WITH_WATCH**(`088613a`) |
| **M6-F dev backfill verify** | guest 제외·idempotent·W1 orphan 0 | **PASS**(`10996c5`) |
| **M6-F prod secret(계약)** | synthetic·값 분리·fail-closed | **PASS**(`83ae233`) → ops handoff(`c433f14`) |
| **M6-F ops vault inject** | 실 Vault 주입 | **WAITING_FOR_OPS** |
| **M6-F prod DB backfill** | 실 prod DB fill | **BLOCKED_BY_HARD_STOP**(Leo 최종) |
| **M6-G hard reject** | activation | **BLOCKED_BY_HARD_STOP**(decision package 준비·본 batch) |
| **runner-fix train** | 83/89→89/89 | **별도 train**(watch carry·live 전 필수) |

## 3. Remaining blockers
- **B1(ops):** 실 Vault 주입 + post-injection verification(WAITING_FOR_OPS).
- **B2(Leo·Hard Stop):** prod DB backfill(실 prod DB write).
- **B3(Leo·Hard Stop):** M6-G hard reject activation.
- **B4(Leo·Hard Stop):** live enable / main merge / production promotion.
- **B5(별도 train):** runner 89/89 회복(live enable 전 필수).
- **B6(watch):** COSMILE_FUREF_SECRET 미배선(Cosmile furef-mint gate·SIASIU backfill 비-blocker).

## 4. Watch (carry)
- W1 write-side atomicity(구현·backfill에서 실증)·W2 zero-orphan canonical furef 의존·W3 canonical stable_id·W4 enum·W5 no-retention·W6 fail-safe(전부 impl 반영) · runner 83/89 · prisma baseline drift · at-rest 암호화(B5·raw storage) · M6-C 라이브 실 트래픽 확대.

## 5. Hard Stops (절대 미수행·Leo 별도 승인)
1. 실 Vault write / 실 prod secret 취급 2. prod DB write/backfill 3. live enable / hard reject activation 4. main merge / production promotion.

## 6. Required approvals matrix
| 항목 | 승인 주체 | 성격 |
|---|---|---|
| 실 Vault 주입 | ops(+ Leo 지시) | Hard Stop(control 미수행) |
| prod DB backfill | Leo 최종 | Hard Stop |
| M6-G hard reject activation | Leo 최종 | Hard Stop |
| live enable / main merge | Leo 최종 | Hard Stop |
| runner-fix 수정 실행 | Leo | 별도 train |
| Cosmile furef-mint 배선 | Leo | 별도 gate(필요 시) |

## 7. M6-F prod backfill 상태 (명확 표시)
- ★**M6-F는 아직 prod DB backfill 전.** dev/staging 검증 PASS·prod secret 주입 계약 검증 PASS·ops handoff 완료. **실 prod DB write 미수행**(BLOCKED_BY_HARD_STOP·ops post-injection PASS + Leo 최종 승인 선결).

## 8. M6-G 상태 (명확 표시)
- ★**M6-G는 아직 hard reject activation 전.** decision package 준비(본 batch)·non-prod dry-run/review/rollback/kill-switch 계획까지. **activation 미수행**(BLOCKED_BY_HARD_STOP·non-prod dry-run + runner 89/89 + Leo 최종 승인 선결).

## 9. Next action
- Control 계속 가능: docs/package·read-only review·shadow verification·evidence 생성·status update·다음 gate package·safe-scope patch.
- Leo/ops 필요: 실 Vault 주입(ops)·prod DB backfill·hard reject activation·live/main merge(Leo Hard Stop).

## 무결성
M6-H final readiness **skeleton** only · live enable 0 · prod 0 · **main merge 0** · 코드/DB 변경 0 · raw/PII/실 secret 값 0 · 본 skeleton만 commit/push · **Hard Stop 항목은 각 별도 최종 Leo 승인/ops.**
