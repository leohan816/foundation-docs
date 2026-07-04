# Foundation Memory Architecture V1 — M6 Planning

> 작성: foundation-control · 2026-07-04 · **상태: PLANNING (계획 수립만 · 코드 0 · migration 0 · live 0)** · Control verdict 상한 = DESIGN_READY.
> 전제: M4/M5 shadow 완료 · Fable5 post-impl PATCH_REQUIRED → PATCH1 → **PATCH1 delta = APPROVED_WITH_WATCH**(watch 3·전부 실 migration 승인 전 처리) · M6 planning 진행 가능.
> ★**live / 실 migration / hard reject / prod secret / real-user write = 여전히 금지.** 본 문서는 **전환 계획·승인 gate·배선 순서·rollback·검증·운영 위험**만 정의한다.
> 근거: PATCH1_DELTA_REVIEW(APPROVED_WITH_WATCH §F) · PATCH1_REPORT · POSTIMPL_REVIEW · SHADOW_IMPLEMENTATION_REPORT · M4_MIGRATION_PLAN · M2/M3 v1.2.

## 0. 원칙
- M6 = **live 전환 준비·planning**. 구현/배선/migration은 각 train의 **Leo 승인 gate** 이후·별도.
- 모든 train은 **독립 revert·shadow→live 단계적·flag OFF 기본**. 실패 시 STOP.
- Control 상한 = 계획/문서. 실 repo 구현은 repo-local Claude Code가 train 계약에 따라·독립 검증(Fable5/Codex).

## 1. Fable5 watch 3건 = M6 Entry Gate (★실 migration/배선 승인 전 CLOSE 필수)
| gate | repo | 문제 | 처리(M6-A) | CLOSE 기준 |
|---|---|---|---|---|
| **WATCH-1 status enum** | SIASIU | `foundation_memory_schema_shadow.py` candidate `status DEFAULT 'pending' CHECK(...)` — M2 §3.4 정본 enum = **`candidate\|approved\|rejected`**(초기값 `candidate`). PATCH1이 **틀린 'pending'을 CHECK에 codify**(주석은 "정정" 주장·보고-코드 불일치). 테스트 9d는 garbage만 reject·`candidate` 수락/`pending` 거부 미assert | `pending`→**`candidate`** 정정 + CHECK 갱신 + **candidate 수락·pending 거부 테스트** 추가 | 정본 enum 3값·초기값 candidate·수락/거부 테스트 PASS·실 DDL 반영 전 필수 |
| **WATCH-2 overlay field-fidelity** | Cosmile | overlay가 **JSON-blob**(`memoryOverlayJson`) — §3.7 개별 컬럼(consent_scope·retention_policy·privacy_level·deleted·blocked·**expires_at**)이 **쿼리가능 컬럼으로 부재** · **AlertSubscription 미overlay**(§3.7=5모델) | ① blob 유지 vs 개별 컬럼 승격 **결정**(recall 쿼리 요구 기준) ② AlertSubscription overlay **포함 여부 결정** ③ 결정을 문서화 | blob/컬럼 결정 근거·AlertSubscription 결정·§3.7 정합 또는 명시 편차승인 |
| **WATCH-3 정직성** | Cosmile+SIASIU | schema 주석 자기모순(line ~691 "4개 모델" vs ~807 "5개 모델(CartItem)"인데 **CartItem overlay 없음**·과대주장) · SIASIU 신규 테스트가 **off-contract retention `safety_max_age`**(enum 밖) 사용 | 주석 "4개 모델"로 통일(CartItem 제외 명시) · SIASIU 테스트 retention을 정본 enum 값으로 정정 | 주석-코드 일치·테스트 off-contract 값 0 |
- ★WATCH-1은 **실 DDL이라 migration(M6-B) 전 필수** · WATCH-2/3은 field-fidelity/정직성(문서-레벨 다수).

## 2. M6 W-item 6종
| W-item | 내용 | train |
|---|---|---|
| W-1 consult/chat gate live 배선 | 주 유입 경로 `/v1/consult/chat`(+alias)에 ingress gate 배선(먼저 shadow) | M6-C → M6-G/H |
| W-2 Cosmile P1/P2 live emit | de-anon 모듈을 라이브 emit(.ts)에 배선(TS 러너 확보 후) | M6-E |
| W-3 SIASIU P3 live auth | logins.txt raw email/name → keyed-hash/Foundation-backed auth 전환 | M6-D |
| W-4 실 migration | M4_MIGRATION_PLAN 실행(backup·dry-run·rollback·Leo 승인) | M6-B |
| W-5 runner 선재 6건 조사 | 83/89(lmr 5+brain 1) 원인(FOUNDATION `c9bb996`) 조사·복구 | 별도 조사 train(M6와 병행 가능·M6 blocker 아님) |
| W-6 subj_v2_ 파생체인 정본 | adapter 자체 secret+synthetic → M2 공통규약(FOUNDATION_SUBJECT_REF_SECRET·furef_v2·B3) 연결 | M6-F |

## 3. M6 Release Train 분리 (한 번에 구현 금지)
**M6-A** watch 3건 patch + 문서 정정 · **M6-B** migration readiness/Leo approval gate · **M6-C** Foundation consult/chat **shadow** wiring · **M6-D** SIASIU P3 live auth · **M6-E** Cosmile P1/P2 live emit(TS runner) · **M6-F** prod secret / subject_ref chain planning · **M6-G** hard reject decision gate · **M6-H** final live readiness review.
- 순서 권고: **A → B(승인) → C(shadow) → (D·E·F 병행·각 승인) → G(결정) → H(최종)**. 각 train은 앞 train 미완 시 다음 진행 금지.

## 4. Train별 정의

### M6-A — Watch patch + 문서 정정
- **목적:** Fable5 watch 3건 CLOSE(실 migration 전 정합).
- **scope:** WATCH-1 status enum 정정+테스트(SIASIU shadow module·:memory:) · WATCH-2 overlay 결정 문서화(+필요 시 schema 개별 컬럼 additive) · WATCH-3 주석/테스트 정정.
- **금지:** live·migration 실행·answer.py·memory.db/dev.db 접촉·prod secret.
- **repo:** SIASIU(schema shadow·test) · Cosmile(schema.prisma) · foundation-docs(결정 문서).
- **예상 파일:** `foundation_memory_schema_shadow.py`+test · `schema.prisma` · M6-A 결정 report.
- **required tests:** SIASIU shadow(status candidate 수락·pending 거부)·adapter 26/26·integration 39/39·workflow 119/119·fingerprint · Cosmile prisma validate·de-anon 14/14·readiness 164/164·loop 112/112.
- **rollback:** shadow 브랜치 `git checkout main`·additive revert.
- **Leo 승인:** 불요(shadow patch)·단 실 DDL 반영은 M6-B. **Fable5/Codex review:** 경량 delta(watch CLOSE 확인).
- **STOP:** off-contract enum 잔존·baseline 추가 실패·주석-코드 불일치 잔존.

### M6-B — Migration readiness / Leo approval gate
- **목적:** M4_MIGRATION_PLAN을 승인 가능 상태로 완성·Leo 승인 획득(실행은 승인 후).
- **scope:** WAL backup·pre-index 스캔 SQL·결정론 수리·D-8 수리·row count/checksum·rollback rehearsal 절차 확정 + **dry-run(non-prod·backup 대상)**. WATCH-1 반영된 DDL 기준.
- **금지:** 실 migration 실행(승인 전)·`prisma migrate reset`·`db push --accept-data-loss`·prod DB·raw 고객데이터 열람·subject_ref backfill.
- **repo:** foundation-docs(plan 갱신) · (승인 후) SIASIU/Cosmile migration script.
- **예상 파일:** M4_MIGRATION_PLAN 갱신 · migration/backup script(승인 후).
- **required tests:** dry-run PASS(무손실·index 생성)·pre-scan 0/수리 완료·rollback rehearsal PASS.
- **rollback:** backup 복원.
- **Leo 승인:** **필수(실 migration).** **Fable5/Codex review:** migration plan 재검수.
- **STOP:** dry-run 손실·index abort·backup 없이 실행 시도·승인 전 schema code merge.

### M6-C — Foundation consult/chat shadow wiring
- **목적:** ingress gate를 consult_contract + `/v1/consult/chat`(+alias)에 **shadow(판정+strip·hard reject 금지)**로 배선.
- **scope:** gate 호출 지점(validate_ssc 이전)·shadow echo strip·enum/code+path index 로그·session_context_out clean assert.
- **금지:** **hard reject 활성화**·durable write·memory_read_provider 연결·raw payload 로그·기존 consult behavior 변경.
- **repo:** foundation-control/Foundation HTTP service.
- **예상 파일:** `server.py`/`core.py`(gate 호출·최소)·`ingress_gate.py`(기존).
- **required tests:** gate 44/44 유지·runner 83/89 추가감소 0·정상 요청 차단 0·shadow echo strip·미배선→배선 후에도 behavior 무변경.
- **rollback:** flag OFF(gate inert)·배선 revert.
- **Leo 승인:** 필요(라이브 경로 배선·shadow라도). **Fable5/Codex review:** 필요.
- **STOP:** hard reject 활성·정상 요청 차단>0·durable write>0·기존 consult 변경.

### M6-D — SIASIU P3 live auth transition
- **목적:** logins.txt raw email/name 무기한 잔존 제거 → keyed-hash/Foundation-backed auth 전환.
- **scope:** P3 keyed-hash util 라이브 배선·기존 로그인 동작 보존·회귀 무파괴.
- **금지:** answer.py·기존 recall/reset 변경·raw 고객데이터 열람(마이그레이션 시 hash-only)·live write(고객 memory)·prod secret 없이 배포.
- **repo:** SIASIU.
- **예상 파일:** auth 관련 모듈(P3)·util.
- **required tests:** integration 39/39·workflow 119/119·fingerprint·로그인 회귀·logins.txt raw email 0.
- **rollback:** auth patch revert·백업.
- **Leo 승인:** **필수(라이브 auth·고객 식별자).** **Fable5/Codex review:** 필요.
- **STOP:** 로그인 회귀·raw email 잔존·fingerprint 변경·raw 고객데이터 열람.

### M6-E — Cosmile P1/P2 live emit (TS runner)
- **목적:** de-anon 모듈을 라이브 emit(.ts)에 배선 — **먼저 TS 테스트 러너(vitest 등) 확보**(검증 가능성 선결).
- **scope:** TS runner 도입 → de-anon 단위/통합 테스트 → foundationDecisionEvent.ts/foundationSignalMapper.ts emit 경로에 배선(same-row 0·payload_refs only).
- **금지:** checkout/order 로직 변경·raw content populate·P1/P2 없는 배선·prisma reset·live write(commerce DB).
- **repo:** Cosmile.
- **예상 파일:** TS test 설정·`foundationDecisionEvent.ts`·`foundationSignalMapper.ts`·de-anon 모듈.
- **required tests:** TS de-anon 단위·readiness 164/164·loop 112/112·same-row 0·payload_refs only·기존 event 회귀.
- **rollback:** emit 배선 revert(de-anon 모듈은 격리 유지).
- **Leo 승인:** **필수(라이브 emit).** **Fable5/Codex review:** 필요(TS runner 확보 후).
- **STOP:** TS 러너 부재로 미검증 배선·same-row>0·checkout/order 변경·기존 event 회귀.

### M6-F — Prod secret / subject_ref chain planning
- **목적:** subj_v2_ 파생체인을 M2 공통규약(FOUNDATION_SUBJECT_REF_SECRET·furef_v2·B3)으로 정본 연결 + prod secret 관리 계획(주입·rotation·Vault).
- **scope:** dev fallback → prod secret 주입 설계·subject_ref 단일 backfill 계획(prod secret 확정 후·M4 migration NULL 유지 전제).
- **금지:** **prod secret 실사용**·**subject_ref backfill 실행**(계획만)·Vault write·hardcoded prod secret.
- **repo:** foundation-docs(계획) · (승인 후) Foundation/SIASIU/Cosmile.
- **예상 파일:** subject_ref chain 설계 문서.
- **required tests:** (계획 단계) 파생체인 정합 시뮬레이션·per-service 상이·backfill 0 assert.
- **rollback:** 계획 문서(코드 0).
- **Leo 승인:** **필수(prod secret·backfill).** **Fable5/Codex review:** 필요.
- **STOP:** prod secret 실주입·backfill 실행·Vault write.

### M6-G — Hard reject decision gate
- **목적:** ingress gate hard reject(실차단) 활성 **여부/조건 결정**(shadow 무파괴 실증 후).
- **scope:** shadow 통계(정상 트래픽 reject 0 실증)·hard reject 활성 조건·단계적 rollout·kill-switch 설계.
- **금지:** **승인 없이 hard reject 활성**·정상 트래픽 차단.
- **repo:** foundation-control/Foundation HTTP service.
- **예상 파일:** gate 설정(flag)·결정 문서.
- **required tests:** shadow 기간 정상 트래픽 reject 0·hard reject dry(카나리)·runner/consult 회귀.
- **rollback:** flag OFF(즉시 shadow 복귀).
- **Leo 승인:** **필수(hard reject 활성).** **Fable5/Codex review:** 필요.
- **STOP:** 정상 트래픽 차단>0·kill-switch 부재.

### M6-H — Final live readiness review
- **목적:** M6-A~G 종합·live 전환 최종 준비 검증(그래도 live enable은 별도 Leo 승인).
- **scope:** 전 train 결과 통합·회귀 전량·STOP 스캔·운영 위험/rollback 총점검·live readiness 판정 패키지.
- **금지:** live enable(본 train도 준비까지).
- **repo:** foundation-docs(readiness report).
- **예상 파일:** M6 final readiness report.
- **required tests:** 전 baseline 회귀·gate·de-anon·same-row·migration rollback rehearsal·STOP 15항 0.
- **rollback:** 각 train 독립 rollback.
- **Leo 승인:** **필수(최종·live enable은 그 다음 별도).** **Fable5/Codex review:** 최종 검수.
- **STOP:** 회귀 실패·STOP 항목 발생·rollback 미검증.

## 5. 절대 금지 (M6에서도 불가·계약 경계)
- cross-service memory(SIASIU↔Cosmile 공유·broker·cross-service SubjectRefMap).
- Foundation durable customer memory(memory_write>0·memory_db_created).
- V3 intelligence live(learning/attribution live).
- raw storage live **without approval**(at-rest §11 exit criteria + Leo 승인 전 raw write 0).
- subject_ref prod backfill **without prod secret approval**(dev-secret backfill 0·prod 확정 후 단일 backfill).

## 6. Leo 승인 필요 항목 (요약)
- **M6-B 실 migration** · **M6-C consult/chat 배선(shadow)** · **M6-D P3 live auth** · **M6-E P1/P2 live emit** · **M6-F prod secret/backfill** · **M6-G hard reject 활성** · **M6-H 최종·live enable**.
- M6-A(watch patch·shadow)만 Leo 승인 불요(단 실 DDL 반영은 M6-B 승인).

## 무결성
코드 수정 0 · DB migration 0 · source repo push 0 · raw/secret/PII 열람 0 · live 배선 0 · hard reject 0 · prod secret 0 · subject_ref backfill 0 · 본 문서 = planning(구현 지시 아님) · foundation-docs만 commit/push.
