# Memory V1 — M6-B Leo Readiness Approval Package

> 작성: foundation-control(Control) · 2026-07-04 · **요청 유형: Leo "M6-B readiness approval" 판단 요청.**
> ★**이 요청 = readiness(계획·검증체계) 승인 요청이며, execution(실 migration·DB 상태 변경) 승인 요청이 아니다.**
> ★Control = 오케스트레이션·감독·보고·검증지시. 실 migration/backup/repair/dry-run/prod DB/prod secret/backfill/live/hard reject = **미수행·미요청.**
> 근거(직접 확인): Fable5 M6-B readiness review(GitHub `d4d97ec`·**APPROVE_WITH_WATCH**) · M6-B readiness report(foundation-docs) · M4_MIGRATION_PLAN(+M6-B banner) · M6-A watch patch report · M2/M3 v1.2.

---

## 1. 요청 요지 (한 줄)
**M6-B migration readiness package(계획·검증체계)의 readiness approval**을 요청합니다. 승인 시에도 **실 migration·DB 상태 변경은 별도 execution gate/별도 Leo 승인 없이 진행하지 않습니다.**

## 2. ★승인 범위 분리 (readiness vs execution)
| 구분 | 이번에 요청하는 것 (readiness) | 이번에 요청하지 않는 것 (execution·후속 별도 승인) |
|---|---|---|
| 대상 | migration **계획·검증체계**의 완결성/안전성 승인 | 실 migration·DB 상태 변경·repair 적용 |
| 내용 | WAL-safe backup 계획 · dry-run **계획**(non-prod/sanitized/disposable) · pre-scan SQL · deterministic repair **rule+후보 산출** · row count/checksum 기준 · rollback rehearsal **절차** · STOP 점검·확인범위 분리 | 실 backup 실행 · 실 dry-run 재현 · 실 pre-scan 실행 · **repair 적용** · 실 rollback rehearsal · 실 migration |
| 상태 변경 | **없음**(문서/계획) | 후속 gate에서만(승인·구현자 수행·Control 검증) |
- ★**readiness approval ≠ execution approval.** 본 승인은 **DB 상태를 바꾸지 않는다.**

## 3. Fable5 독립 검수 결과 (★GitHub 직접 확인)
- **commit `d4d97ec`**(`docs(fable5): M6-B migration readiness 독립 검수 — APPROVE_WITH_WATCH`) 직접 판독.
- **판정: APPROVE_WITH_WATCH** — "Leo readiness approval 판단으로 넘길 수 있다·단 DB 상태 변경 승인 아님."
- **게이트 A~J 전부 ✅:** A(scope readiness only)·B(Control orchestrator)·C(evidence separation·shadow 3브랜치 local-only 코드 교차검증)·D(WAL-safe backup)·E(dry-run plan)·F(pre-scan aggregate-only)·G(repair 후보만·적용 금지)·H(row count/checksum)·I(rollback 절차)·J(Leo approval readiness only).
- **STOP 스캔: 위반 0** · Fable5가 PATCH1에서 남긴 status enum watch도 **M6-A에서 진짜 CLOSED** 확인(`ab0937b:...schema_shadow.py` `DEFAULT 'candidate' CHECK(candidate|approved|rejected)`).

## 4. 유지되는 watch 6건 (★후속 execution gate에서 반드시 닫음·readiness에서 닫힌 것으로 처리 안 함)
1. **shadow 코드 원격 미검증** — M6-A 반영(status/overlay/retention)은 3개 shadow 브랜치 **local-only**(원격 0건). Leo/검수 시 push 또는 local 접근으로 코드 원격검증 필요.
2. **Cosmile prisma 명칭/boolean 미확정** — `@@map` 부재로 모델명↔물리 table명·`Boolean` SQLite 저장방식 미확정 → **pre-scan 실행 전 non-prod introspection에서 확정 필수**.
3. **실 dry-run 결과 부재** — §3은 계획·non-prod 재현은 후속 실행 gate.
4. **rollback rehearsal 결과 부재** — §7은 절차·실 복구 검증은 후속.
5. **repair 후보 산출 ≠ 적용** — winner 오판·tombstone 되살림 위험은 적용 gate(Leo 승인)에서 재검증.
6. **실 migration/prod DB/live/hard reject/prod secret/subject_ref backfill** — 전부 미승인·각 별도 M6-C~H gate.

## 5. Minor patch (P-1/P-2·비-blocker·반영 완료)
- **P-1**(반영): M6-B report §4.2(11) Cosmile same-row SQL의 컬럼(`customer_id`·`foundation_trace_id`)·테이블명도 **Cosmile 명칭 미확정 대상**임을 명기.
- **P-2**(반영): §1.1 main 해시 인용을 시점 정합(작성 `910b73b` → 병합 후 `98d2043` → Fable5 review 후 `d4d97ec`).
- ★Fable5 판단대로 **readiness approval 요청 전 필수 patch 아님**(문구 정합·내용 영향 0).

## 6. ★readiness 승인 이후에도 각각 별도 Leo 승인이 필요한 execution gate
| gate | 내용 | 승인 |
|---|---|---|
| **EXEC-0 non-prod dry-run 실행** | 승인된 non-prod/sanitized/disposable 범위에서 backup·pre-scan·repair 후보 산출·checksum·rollback rehearsal **실 재현**(구현자 수행·Control 검증) | 별도 Leo 승인 |
| **EXEC-1 실 migration** | M4_MIGRATION_PLAN(+M6-B addendum) 실행 | 별도 Leo 승인 |
| **M6-C** consult/chat gate shadow 배선 | Foundation 라이브 경로 배선(hard reject 금지) | 별도 Leo 승인 |
| **M6-D** SIASIU P3 live auth | logins.txt raw → keyed-hash/auth 전환 | 별도 Leo 승인 |
| **M6-E** Cosmile P1/P2 live emit | de-anon 라이브 배선(TS runner 확보 후·same-row 검증) | 별도 Leo 승인 |
| **M6-F** prod secret / subject_ref chain | prod secret 주입·subject_ref 단일 backfill | 별도 Leo 승인 |
| **M6-G** hard reject decision | ingress gate hard reject 활성 여부/조건 | 별도 Leo 승인 |
| **M6-H** final live readiness | 종합·live enable은 그 다음 별도 승인 | 별도 Leo 승인 |
- ★**절대 금지(M6에서도):** cross-service memory · Foundation durable customer memory · V3 intelligence live · raw storage live without approval · subject_ref prod backfill without prod secret approval.

## 7. Leo 승인 요청문 (★readiness / execution 분리)
> **[요청]** 위 M6-B **migration readiness package(계획·검증체계)**에 대한 **readiness approval** 판단을 요청합니다.
> **[이 승인의 의미]** migration 계획·검증체계가 안전·완결하며 Fable5 독립 검수(APPROVE_WITH_WATCH)를 통과했음을 인정하고, **다음 단계(EXEC-0 non-prod dry-run 실행 준비)로 넘어갈 자격**을 부여합니다.
> **[이 승인이 아닌 것]** 실 migration·DB 상태 변경·repair 적용·prod DB 접근·prod secret·subject_ref backfill·live 배선·hard reject 활성 = **어느 것도 승인하지 않습니다.**
> **[승인 이후 원칙]** readiness approval 이후에도 **실 migration은 EXEC-0/EXEC-1 등 별도 gate·별도 Leo 승인 없이 진행하지 않습니다.** 각 execution gate(EXEC-0·EXEC-1·M6-C~H)는 개별 승인 대상입니다.
> **[승인 선택지]** ① readiness approval 승인 → EXEC-0 준비로 진행 · ② watch/문구 보강 요청 후 재검토 · ③ hold.

## 8. 첨부 (foundation-docs·GitHub 원격 확인 가능)
1. M6-B readiness report(`..._M6_B_MIGRATION_READINESS_REPORT_...`·P-1/P-2 반영본)
2. Fable5 M6-B readiness review(`..._M6_B_READINESS_INDEPENDENT_REVIEW_...`·`d4d97ec`)
3. M4_MIGRATION_PLAN(+M6-B supplement banner)
4. M6-A watch patch report(`..._M6_A_WATCH_PATCH_REPORT_...`)
5. M6 planning(`..._M6_PLANNING_...`)
6. M2/M3 v1.2 계약(`설계문서/foundation/...`)
- ★**local shadow diff(3개 제품 repo shadow 브랜치)는 GitHub 미push·원격 미검증** — 코드 원격검증은 후속 gate(§4-1).

## 무결성
readiness approval 요청만 · execution approval 요청 0 · 실 migration 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · repair 실행/적용 0 · 제품 repo main/remote 변경 0 · schema code main merge 0 · **Leo readiness approval 이후에도 실 migration은 별도 gate/별도 승인 필요** · 본 package + M6-B report P-1/P-2 문구 보강만 foundation-docs commit/push.
