# Memory V1 — M6 Status Matrix (2026-07-05)

> 작성: foundation-control(Control) · 2026-07-05 · **범위: M6 전체 goal 상태표 + Leo 승인 필요 항목 + Control 계속 가능/불가 분리.**
> ★status 값: PASS · APPROVE_WITH_WATCH · PATCH_REQUIRED · BLOCKED_BY_HARD_STOP · WAITING_FOR_OPS · WAITING_FOR_LEO.
> 근거(local·provenance HEAD): foundation-docs `c433f14`(→ 본 batch push 후 갱신) · FOUNDATION main `580093c`/shadow `df9f6cc` · SIASIU main `3cd068d`/shadow `13012c4` · Cosmile main `3ba91e0`/shadow `801924d`.

---

## 0. ★Option B pivot update (2026-07-05·최신)
> M6-F subject_ref = **Option B(service-local mint · Foundation validate/gate/contract only)**로 pivot. 아래 §1 표의 M6-F 행은 Option A 기준·**Option B 갱신은 본 절 우선**.
- **A1 real Foundation vault injection = STOPPED**(중단·`FOUNDATION_SUBJECT_REF_SECRET`/identity-touch 폐기).
- **Option B shadow pivot = PASS**(FOUNDATION `5a0003c`·SIASIU `d0f51cb`·flag OFF·회귀 0·runner 83/89 불변·docs `1e24c33`).
- **doc drift cleanup**: Option A 참조 19문서 supersede pointer·Option B backfill/post-injection/ops handoff 재작성 완료.
- **Foundation** = subject_ref format/validation/gate/contract만·durable customer memory/broker/service-DB-reader **아님**. subject_ref 생성/저장/SubjectRefMap = **service-local**.
- **remaining hard stops(재정리)**: 실 Vault write(per-service SUBJECT_SECRET·ops) · prod DB backfill(service-local mint) · hard reject activation · live enable · main merge/promotion · prod secret rotation · cross-service identity linkage.
- **residual cleanup(safe·완료)**: R-1 SubjectRefSecretMissing relic **제거 완료**(FOUNDATION shadow `225e25c`·active dep 0·mint 재도입 0) · R-2 SIASIU ENV policy Option B sync **완료**(SIASIU shadow `4848ad9`·5키·값 0).
- **watch**: Cosmile subject_ref mint 미배선(별도 gate·blocker 아님) · runner 83/89(runner-fix train·live 전 89/89) · furef secret 이름 정합(SIASIU_FUREF_SECRET vs FOUNDATION_USER_REF_SECRET·별도 확정).

## 1. Goal 상태표
| goal | 내용 | status | 근거(commit) |
|---|---|---|---|
| M6-C | ingress shadow scan | **PASS** | 706b60a |
| M6-D | SIASIU P3 auth live-prep | **PASS** | 7e07ad7 |
| M6-E | Cosmile emit live-prep | **PASS** | 57be368 |
| M6-F design gate | zero-orphan·identity-touch 설계 | **APPROVE_WITH_WATCH** | 02fe421 |
| M6-F schema(dev) | SubjectRefMap +secret_version | **PASS** | b0f8685 |
| M6-F impl(shadow·flag OFF) | identity-touch·furef·W1~W6 | **PASS** | 0687404 |
| M6-F impl review | code 대조 | **APPROVE_WITH_WATCH** | 088613a |
| M6-F dev backfill verify | guest 제외·idempotent·orphan 0 | **PASS** | 10996c5 |
| M6-F prod secret(계약) | synthetic·값 분리·fail-closed | **PASS** | 83ae233 |
| M6-F ops vault inject | 실 Vault 주입 | **WAITING_FOR_OPS** | c433f14(handoff) |
| M6-F prod DB backfill | 실 prod DB fill | **BLOCKED_BY_HARD_STOP** | 본 batch(package) |
| M6-G hard reject | activation | **BLOCKED_BY_HARD_STOP** | 본 batch(decision) |
| M6-H final readiness | 종합·live | **WAITING_FOR_LEO** | 본 batch(skeleton) |
| runner-fix train | 83/89→89/89 | **WAITING_FOR_LEO**(별도 train) | 본 batch(package) |

## 2. 현재 baseline(검증 수치·evidence)
- FOUNDATION shared_memory **41/41**·hard_gate **29/29**·eval **16/16** · SIASIU adapter **31/31**·p3 **16/16**·schema **27/27**·integration **39/39**·workflow **119/119**·fingerprint **d7f579443f8a110a** · Cosmile de-anon **14/14**·vitest **10/10**·readiness **164/164**·loop **112/112** · gate **57/57** · runner **83/89**(taxonomy {lmr 5, brain 1}·watch).
- main HEADs 무변경(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · identity-touch flag OFF · prod/live/backfill/vault write 0.

## 3. Leo(또는 ops) 승인 필요 항목
| # | 항목 | 승인 주체 | 종류 |
|---|---|---|---|
| A1 | 실 Vault 주입 | ops(Leo 지시) | Hard Stop(control 미수행) |
| A2 | prod DB backfill | Leo 최종 | Hard Stop |
| A3 | M6-G hard reject activation | Leo 최종 | Hard Stop |
| A4 | live enable / production promotion | Leo 최종 | Hard Stop |
| A5 | main merge(shadow→main) | Leo 최종 | Hard Stop |
| A6 | runner-fix 수정 실행 | Leo | 별도 train |
| A7 | Cosmile furef-mint 배선 | Leo | 별도 gate(필요 시) |

## 4. Control 계속 가능(Leo 승인 불요·safe scope)
- docs/package 작성 · read-only review · local-path external/Fable handoff 준비 · shadow code 구현 · dev/staging verification · synthetic/disposable DB verification · rollback rehearsal · boolean/hash/count evidence · test rerun · status matrix update · next gate package · **safe scope 내 PATCH_REQUIRED self-fix**(fix plan→patch→test→review).

## 5. Leo 승인 전 절대 진행 불가(Hard Stop)
1. **실 Vault write / 실 prod secret 취급**
2. **prod DB write / prod DB backfill**
3. **live enable / hard reject activation**
4. **main merge / production promotion**

## 6. Watch (carry)
- runner 83/89(runner-fix train·live 전 89/89) · COSMILE_FUREF_SECRET 미배선(Cosmile furef-mint gate·SIASIU backfill 비-blocker) · W1~W6(impl 반영·backfill 실증) · prisma baseline drift · at-rest 암호화(raw storage) · M6-C 라이브 실 트래픽 확대.

## 7. 한 줄 요약
> M6-C/D/E PASS · M6-F는 **prod DB write 직전까지 close**(design·schema dev·impl shadow·dev backfill verify·prod secret 계약 전부 PASS) · 남은 = **실 Vault 주입(ops) → prod DB backfill(Leo Hard Stop) → M6-G hard reject(Leo Hard Stop) → live/main merge(Leo Hard Stop)** · runner 89/89는 별도 train(live 전 필수).

## 무결성
status matrix only · 코드/DB 변경 0 · prod/live/backfill/vault write 0 · **main merge 0** · raw/PII/실 secret 값 0 · 본 matrix만 commit/push · **Hard Stop 항목은 각 별도 최종 Leo 승인/ops.**
