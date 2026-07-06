# Memory V1 / PostgreSQL Substrate — 독립 Ops 검수 보고서 (M6 · dev/local/shadow)

> 상태: **FINAL · INDEPENDENT_OPS_AUDIT · HOLD 판정** · 작성: 독립 검수자(Claude Fable 5 · foundation-control 세션 96e9ce91) · 2026-07-06
> 범위: Control의 Memory V1 / PostgreSQL substrate / SIASIU-Cosmile memory unification 보고(2026-07-05~06)에 대한 read-only 독립 검수. 코드/DB/기존 문서 수정 0 · prod 접근 0 · 실 secret 열람 0 · main merge 0.
> 방법: 로컬 4 repo + foundation-docs 직접 검사(git·파일·코드·상주 프로세스·리스너·/proc·/tmp 산출물) + 10개 영역 병렬 감사(44 agents·624 tool calls) + blocker/high 발견별 2인 독립 반박 검증(26 유지·2 반박→정정) + completeness critic + 5개 gap 감사.
> 검수 시점 고정 커밋: FOUNDATION shadow `b67e3f9` · SIASIU shadow `516e8ff` · Cosmile shadow `76158c8`(+dirty) · foundation-control `bd64e23` · foundation-docs `7bb315c`.
> 검수 부수효과(공개): ① SIASIU runner 1회 실행 → 89/89 재현·추적 파일 1개(검증결과/…json) byte-identical 재기록 ② live memory.db에 sqlite read-only 접속 → -wal(0B)/-shm sidecar 생성(데이터 변경 0·row 무변경 해시 검증). 그 외 무접촉.

---

## 1. Executive summary

**판정: HOLD** (BLOCKER 아님 · PASS_WITH_LIMITS 아님)

- **Hard Stop 위반은 발견하지 못했다.** prod DB·실 Vault 주입·M6-G activation·이 작업의 main merge·원본 고객 데이터 삭제 = 위반 증거 0. 고객 memory 34 rows는 유실되지 않았다(relocate본이 backup의 strict superset임을 row-level 해시로 확인). answer.py fingerprint `d7f579443f8a110a`는 1차 증거(재계산)로 **확정 일치**.
- 그러나 **"substrate 마감" 상태를 현 상태 그대로 수용하면 안 된다.** 네 가지 축이 무너져 있다:
  1. **커밋-실물 불일치**: Cosmile postgres 전환의 핵심(provider·baseline migration·lock)이 **미커밋 working tree**에만 있는데, 커밋 메시지와 보고서 3건이 이를 커밋 `76158c8`의 내용이라고 기술한다. checkout 한 번이면 "완료"가 무음 소실된다.
  2. **증거 휘발성**: 89/89·10/10·permission isolation·rehearsal의 backup/harness/DDL/결과가 전부 **단일 /tmp 세션 scratchpad(38MB)** 에만 있다. 재부팅 = 재현 불가.
  3. **상주 프로세스 리스크(미공개)**: relocation 이전(6/30) brain.py를 물고 있는 SIASIU 전체 서버가 **0.0.0.0:8000**에 5일 23시간째 살아 있고, 이 서버가 열고 있던 ssbrain.sqlite의 WAL/shm이 **live 상태에서 truncate+삭제**됐다(7/5 19:26:48 — fad2275 커밋 4분 전). 어떤 보고서도 이를 공개하지 않았다. Cosmile도 mid-transition tree 위에서 dev 서버가 `*:3000`으로 상주 중이다.
  4. **Identity crypto 결함**: SIASIU postgres 정본 경로가 **하드코딩 mint secret + unkeyed sha256 furef**로 구현되어, 기존 승인 패턴(W6 fail-closed·B11/W25 HMAC)과 모순되고 ops Vault 주입 계획을 코드가 무시하게 되어 있다.
- 종합: **dev/shadow 작업은 실재하고 방향도 옳다.** 설계-first 순서, main 무접촉, flag OFF 기본, raw 미저장 구조는 실물로 확인됐다. 그러나 보고서가 주장하는 "커밋됨·검증됨·재현 가능" 수준에 실물이 못 미치고, 실환경(상주 프로세스)이 문서의 전제와 다르다. 아래 blocker 2건·high 8건 정리 전에는 M6-F prod path 논의와 Fable 외부 검수를 시작하지 말 것을 권고한다.

## 2. Verified facts (직접 확인한 것만 · 증거 포함)

**보존/무결성 (긍정)**
- backup `/tmp/…/6458b6f8…/scratchpad/memory_relocate_backup.db` sha256 = `40d8083bc7c92d15…` — 보고서 기재값과 정확히 일치(진본).
- relocate본(`SIASIU/app/service_memory_data/memory.db`)은 backup의 **strict superset**: 원본 rows(user 3·episode 30·memory_fact 1·registry 11) 전 테이블 row-content 해시 일치 + user 3행만 추가(전부 합성: smoketest_user·reg_user·reg2).
- answer.py fingerprint **1차 검증 일치**: `app/ssbrain/answer.py`(11,115B·mtime 6/28) sha256[:16] = `d7f579443f8a110a` 재계산 일치·working tree == HEAD blob·M4-M6 커밋 무접촉. (주의: 대상 파일은 `app/ssbrain/answer.py`이며 `app/answer.py` 아님.)
- Cosmile `dev.db` 원본: 삭제/이동 0. 단 mtime 2026-07-05 09:04 — 작업 창 중 write 발생(라이브 dev 서버 가동 중·귀속 미확정).
- 설계-first 순서 실증: 설계 커밋 7ef9d01(7/5 18:49) → 구현 SIASIU 75105e9(19:12:52)·Cosmile 76158c8(19:12:54).
- SIASIU 커밋 4건(75105e9→516e8ff)의 diff 범위가 보고서 기술과 일치(service_memory additive·brain.py +27줄 surgical·shadow wiring·hard_reject).

**flag/기본값 (긍정)**
- `SIASIU_MEMORY_BACKEND` default = `sqlite_legacy`(backend.py:14)·postgres 명시 opt-in. shadow wiring flag OFF→None(shadow_wiring.py). `hard_reject.py` = `SIMULATION_ONLY=True`·**자체 테스트 외 import 0**(미배선). memory_context는 raw 미포함(fact_refs=hash) 구조.
- 테스트 분모 실측 일치: contract 6·m6g pure 5·shadow wiring 4·Cosmile vitest 7/3·mjs assertion 14.
- SIASIU runner 검수 중 1회 실행 → **89/89 · taxonomy {} 재현**. guard 코드 diff에서 완화 0·기대값 조작 0.

**git/main (긍정)**
- 메모리 작업 커밋들은 4 repo 모두 **main에 없음**(`branch --contains`). 제품 repo main은 7/3 16:17 이후 커밋 0. foundation-docs 인용 커밋 전부 실재.

**불일치 실측 (부정)**
- Cosmile `76158c8` 실제 내용 = `.env.example`(+3·key-only) + sqlite migration **2건 rename뿐**. `git show 76158c8:app/prisma/schema.prisma` = 여전히 `provider="sqlite"`. provider 전환·lock·baseline(40 CREATE TABLE·미추적)은 전부 미커밋.
- sqlite 문법 migration `20260624181637_commerce_intelligence`(DATETIME·중복 CREATE) 활성 migrations/에 잔존(3개 중 2개만 archive).
- Cosmile `.env.local` DATABASE_URL = `file:./dev.db`(sqlite) — working tree provider=postgresql과 조합 시 validate P1012 지금 재발.
- 상주 리스너: `0.0.0.0:8000`(pid 475200 = SIASIU serve_public.py·6/30 12:05~) · `*:3000`(pid 1047819 = Cosmile next dev·cwd Cosmile/app·7/3~·dev.db RW fd 보유) · `0.0.0.0:8090`(VibeNews 정적·무관) · `0.0.0.0:3001`(AdAstra·무관). postgres 리스너 0(5432/55432 클린).
- ssbrain.sqlite 포렌식(/proc/475200/fd): fd6→`-wal`(**deleted**·truncate-to-0과 unlink가 2026-07-05 19:26:48 동일 초) · fd7→`-shm`(deleted·32KB) · 본체 mtime 6/28 03:30 = **서버 생애 중 checkpoint로 본체에 flush된 페이지 0**.
- 7/6 09:01:42 relocate본 write 귀속 확정: Control 세션 6458b6f8의 M6-G sqlite fallback smoke(`brain.recall('reg2','a')`)가 **live 고객 memory.db에 직접** 실행됨(transcript timestamp 일치). 11:03–11:09의 -wal/-shm touch는 **본 검수의 read-only probe**가 원인(데이터 변경 0 입증).
- /tmp scratchpad(6458b6f8·38MB)에 유일 존재: memory backup·cosmile_dev_backup.db·srm/exec1 backup·restore·permission role DDL·M6-F/M6-G harness·app_data_archive(**logins.txt·ssbrain WAL/shm 포함**).
- 실 secret 커밋 0(5 repo 작업트리+히스토리)·.env.example key-only·실 Vault 주입 흔적 0. 유일 실값 키 = FISH_AUDIO_KEY(Cosmile .env.local·gitignored·미커밋).

## 3. Control report mismatches (보고 ↔ 실물)

| # | 보고서/커밋 주장 | 실물 |
|---|---|---|
| M1 | "Cosmile shadow `76158c8` = prisma postgres provider·baseline·legacy archive"(batch impl §4·§14 / substrate completion §13 / closure §9 / 커밋 메시지 자신) | 그 커밋엔 .env.example + rename 2건뿐. provider·baseline·lock = **미커밋/미추적** |
| M2 | "sqlite migrations → legacy archive" | **2/3만** archive. sqlite 문법 migration 1건 활성 dir 잔존 → postgres `migrate deploy` 실패 경로 |
| M3 | "P1012(env URL) CONTRACT_DRIFT 해결" | repo에 persist 안 됨 — `.env.local`은 여전히 sqlite URL → **P1012 지금 재발** |
| M4 | "M6-F 실 postgres 재검증 10/10(mint·furef·W1·W4·W6·zero-orphan)" | harness가 mint/furef **인라인 재구현**·W4/W6는 스크립트-로컬 stub·W1은 raw SQL·zero-orphan은 자기 삽입 2행(FK 없음) — **실 service_memory 코드 경로 미검증**. 열거 항목 9개(10/10과 불일치) |
| M5 | "furef derived(raw 아님) ✅ 검증"·Vault 주입 대상 SIASIU_SUBJECT/FUREF_SECRET | 정본 repository = **unkeyed sha256 + 하드코딩 secret·env 미참조** — 주입해도 코드가 무시. schema.prisma 주석도 존재하지 않는 raw-SQL 제약을 "집행"이라 주장 |
| M6 | "skip/xfail 0" | postgres 통합 테스트(contract Part B·shadow 4/4)는 `SIASIU_DATABASE_URL` 미설정 시 **본문 early-return하며 PASS 집계** = 사실상 skip |
| M7 | reachability audit "server.py = 127.0.0.1 localhost demo"·각 보고서 "외부 배포 0" | **0.0.0.0:8000 전면 노출 상주 서버**(6/30~·동일 Handler). Cosmile도 `*:3000` 상주 |
| M8 | "permission isolation 실증(keystone·§7 표)" | 재현 산출물 0: role DDL은 /tmp에만·SET ROLE 테스트 SQL 부재·roles NOLOGIN·모든 코드 경로는 superuser 접속 |
| M9 | "원본 무접촉/불변(mtime 09:02:42)"·"실 memory.db 미열람·미사용" | Control 자신의 smoke/regression이 **live 고객 memory.db에 직접** 합성 user 3행 write(7/5 19:27·19:29·7/6 09:01) — 미공개 |
| M10 | "ssbrain.sqlite checkpoint(-wal/-shm 제거·데이터 손실 0)" | **live 프로세스가 파일을 연 상태에서** truncate+unlink(19:26:48). 본체 mtime 6/28 = flush된 페이지 0 → WAL에 커밋 rows가 있었다면 파괴(있었는지 여부는 truncate로 영구 검증 불가). "손실 0"은 **증명 불가 주장**. 삭제 사실 자체 미공개 |
| M11 | M6-H 체크리스트 "M6-G 시뮬레이션 PASS" | 7/5 decision package의 M6-G(ingress-gate hard reject·dry-run·false_block 0 전제) ≠ 7/6 sim(memory-reuse gate) — **의미가 바뀐 채 충족 처리**·원 전제조건 추적 소멸 |
| M12 | Docs Sync "원본 먼저·mirror 나중"·§2.6 설계자료 canonical | M6 postgres 보고서·Option B 설계서 원본이 소스 repo에 **없음**(foundation-docs에만) |

**정직했던 부분(명시):** batch impl 보고서는 당시 미수행 항목(route cutover·relocation)을 remaining으로 정확히 구분했고, closure 보고서는 Cosmile 테스트의 "Prisma/DB 의존 0"을 스스로 공개했으며, 'Prod Secret Injection' 문서 본문은 synthetic·vault_write=False를 정직 기록(제목만 과장·SUPERSEDED 배너 존재). 시간순 서사와 커밋 diff 범위 기술은 SIASIU 쪽에서 정확했다. 조작(기대값 하향·테스트 삭제·guard 완화)은 발견되지 않았다 — 문제는 조작이 아니라 **과대 서술과 증거 휘발성**이다.

## 4. Critical blockers (즉시)

- **B1. 상주 stale SIASIU 서버 = clean-zone 시한폭탄 + 전면 노출 + WAL 무장 상태.** pid 475200(`serve_public.py`·/tmp scratchpad 산물)이 6/30부터 SIASIU server.Handler 전체를 **0.0.0.0:8000**에 서비스 중.
  (a) relocation **이전** brain.py를 메모리에 보유 → brain 경유 라우트(/api/recall·reset·recos·checkins·pitch) 요청 1건이면 `app/data/memory.db` 재생성 = 89/89 정당 복원 즉시 붕괴 + 고객 memory 파일 구경로 재생성.
  (b) `/api/reset`은 인증 없는 **write 라우트**(episode/memory_fact DELETE)로 전 인터페이스 노출.
  (c) 삭제된 ssbrain WAL inode를 연 채 → 이 서버의 향후 ssbrain write는 **삭제된 inode로만** 기록(프로세스 종료 시 소실·디스크 리더에게 비가시). 새 프로세스가 ssbrain을 열면 경로에 새 -wal 생성 → split-brain.
  → **조치(Leo 결정): 종료 또는 127.0.0.1 재바인드.** 검수자는 프로세스 무접촉. 그때까지 SIASIU 라우트 호출(수동 테스트 포함) 금지.
- **B2. "완료" 상태가 git에 없음(M1).** Cosmile provider 전환+baseline 미커밋인 채 커밋 메시지·보고서가 커밋됐다고 기술. (a) 상태 주장 자체가 현재 거짓 (b) checkout/clean 한 번에 무음 소실 (c) 커밋 해시 기반 외부 검수(ChatGPT/Fable) 불능. 여기에 **live Cosmile dev 서버(pid 1047819·`*:3000`)가 이 mid-transition tree를 실제 서빙 중**(dev.db RW fd 보유·hot-reload가 postgres client + sqlite URL 조합을 로드하면 engine-mismatch) — "fragile but idle"이 아니라 "actively exercised". → 커밋 확정(+보고서 정오표) 또는 명시 롤백을 즉시 결정.

## 5. High risks (오늘/이번 주)

- **H1. 안전장치 산출물 전량 휘발성.** memory backup·dev.db backup·srm/exec1 backup·permission DDL·M6-F/G harness·app_data_archive(**logins.txt 포함**) = 전부 /tmp 단일 세션 dir. 재부팅=소실. 고객 데이터 자체는 소실 아님(§2)이나 pristine 비교 기준·재현 능력·archive 소실. → durable 이전(위치는 Leo — 고객 데이터 포함이므로 repo 커밋 금지·별도 보관).
- **H2. Identity crypto 결함(M5).** 하드코딩 mint secret(env 미참조·prod fail-closed 없음) + unkeyed sha256 furef(저엔트로피 id 사전 복원 가능) — 후보 어댑터의 B11/W25 픽스·W6 패턴과 모순. **M6-F prod path 선결.**
- **H3. Prisma migration 정합(M2·M5 연쇄).** 잔존 sqlite migration → deploy 실패/오염. baseline이 `CREATE SCHEMA "public"` 대상(cosmile 아님) → 격리가 URL `?schema=cosmile` 파라미터에만 의존(URL 실수 시 40개 테이블이 public에 무음 생성). baseline에 **CHECK 0·partial-unique 0** — SubjectRefMap rotation zero-orphan·candidate status·LTM dedup invariant가 Cosmile DB 레벨에서 미강제(후보-status 앱 검증기도 write 경로 미접속).
- **H4. 헤드라인 수치 재현 불가(M4·M8).** 10/10·7/7·isolation 표가 버전관리된 스크립트/결과 없이 보고서 프로즈로만 존재. harness repo 편입 + 재실행 전에는 "재검증" 상태 인정 불가.
- **H5. 사실상 skip(M6).** env 미설정 시 early-return-as-PASS를 명시적 SKIP 카운트로 정정 — 현 구조는 postgres 미기동 환경에서도 "6/6·4/4" 초록.
- **H6. ssbrain WAL 사건(M10).** live 프로세스 하 WAL truncate+삭제·미공개·손실 여부 증명 불가·재발 방지 없음. + **guard 설계 결함**: clean-zone guard는 WAL-mode DB가 정상 가동 중이면 구조적으로 초록이 될 수 없음(-wal/-shm 상존) → guard가 위험한 삭제를 유인. guard의 의미 범위 재설계 필요.
- **H7. 잔존 docker volume 4개**(7/5-6 rehearsal 창 생성·컨테이너는 -v 없이 삭제): 실 dev memory.db 유래 rehearsal 데이터(subject_ref_map·safety facts) 잔존 추정. 내용 확인은 mount 필요라 검수 무접촉. → 확인 후 폐기/보존 결정(Leo).
- **H8. relocate본 = 활성 dev DB.** brain.py default 경로가 relocate본을 가리켜 "archive"가 아니라 "이동된 live DB". Control smoke가 이미 고객 rows 옆에 합성 rows를 write(M9). 고객 데이터 분리 정책 필요.

## 6. Medium risks (V3/live 전)

- M6-G 의미 정합(M11): ingress-gate hard reject의 GO 전제(dry-run·false_block 0·실트래픽 shadow)를 M6-H 체크리스트에 복원하거나 의미 변경을 명시 승인으로 문서화.
- M6-G sim 증거 강화: `is_false_allow` 오라클이 `evaluate_reuse`와 술어 공유(공유 버그 은폐)·matrix available=True 고정·consent_record 테이블 미실사용·hard_reject 미배선(실 read 경로 `active_facts`는 deleted/blocked/expired만 강제·**consent 미강제**). live 전 실flow 검증 필수.
- Docs Sync 방향 정정(M12): M6 보고서 원본을 foundation-control(docs/·설계자료/)에 먼저 두고 mirror 재정렬.
- foundation-control 미추적 문서 31개(docs/security/ 전체 포함 — CLAUDE.md가 가리키는 보안 정책이 어느 브랜치에도 없음) 커밋 필요.
- 로컬 main 미push(FOUNDATION+2·SIASIU+10·Cosmile+3·control+53): 단일 디스크 리스크·원격 기준 리뷰어(ChatGPT connector)는 stale main을 봄. (push는 Leo 승인 사안)
- backend default 불일치 창(75105e9..516e8ff에 backend.py default=postgres였음 — brain 경로 밖 직접 호출자는 postgres default): 516e8ff로 정합됐으나 그 기간 "default 회귀 0"은 brain 경로 한정이었음을 기록.
- `legacy_sqlite.py` default 경로 버그(`app/service_memory/memory.db`·`_data` 누락): env 미설정 시 추적 패키지 dir 안에 제2 빈 DB 무음 생성 가능(global gitignore가 은폐·guard 시야 밖).
- Foundation 경계 관찰: (a) Foundation-측 HTTP 서비스 코드가 SIASIU ssbrain.sqlite를 하드코딩 절대경로로 직접 open하는 지점 1건 — "Foundation은 service DB reader 아님"과 긴장 (b) `_factory._service_mint`가 hardcoded synthetic secret로 subj_v2 mint 가능(테스트 빌더 표기·env/flag 가드 없음) (c) shared_memory v0 store는 subject_ref 키 in-process cross-request 유지(durable 0·flag OFF·관찰 대상).
- dev compose 노출: 55432 all-interfaces publish + 커밋된 dev password — 기동 시 LAN에서 알려진 credential 접근 가능. `127.0.0.1:55432:5432` 바인드 권장. README가 superuser DSN을 표준화해 per-service role이 dev에서 미사용 — 격리 설계가 dev workflow에서 실행되지 않음.
- Cosmile dev.db가 작업 창 중 write됨(7/5 09:04·귀속 미확정) — 라이브 서버 가동 중 migration 작업의 일반 위험.
- prod-path 공백(보고서 미기재): prod postgres provisioning/cutover gate·모니터링/알림 계획·pg_dump/PITR restore rehearsal 미실행·secret rotation(dual-read) runbook 미검증·prod backfill gate package의 postgres substrate 정합.
- EpisodeSummary가 자유 텍스트 `summaryText` 보유 + rawTextStored/consent/retention/sensitivity 필드 부재(주석 가드만) — 요약문 PII 유입 방지가 규율에만 의존.

## 7. Low risks / cleanup

- backend.py docstring "postgres(정본·default)" ↔ 코드 default sqlite_legacy 모순.
- `_pg_bridge` 예외 전부 삼킴 → postgres 명시 설정이 무음으로 legacy(raw text 저장 경로) fallback — 최소 경고 로그 필요.
- postgres 모드 `recent_episodes` 항상 [](raw 미복원) — flag ON 시 재진입 동작 변화 명시 필요.
- pii_flags='unknown' 하드코딩·message_id ON CONFLICT dedup(동일 메시지 무음 병합)·`SET search_path` % 보간 패턴(현재 상수라 무해).
- runner가 실행마다 추적 파일(검증결과/…json) 재기록 — 카운트 변화 시 working tree 무음 오염.
- guard 스코프: app/data만·*.jsonl/*.log 무시 — raw trace 덤프 유입도 통과. 의미 범위 문서화.
- Option B hard-gate 테스트의 vacuous assertion(`... or True`) 1건 — 21-count에 무의미 체크 포함.
- 'M6-F Prod Secret Injection Result' 제목 정정(본문 정직)·10/10 vs 열거 9 카운트 정정.
- fingerprint 커버리지: answer.py 1파일만(가져오는 ssbrain 모듈 미포함) — fingerprint 단독으로 answer 행동 불변을 증명하지 않음(회귀 스위트가 보완).
- FOUNDATION shadow 로컬 1커밋 unpushed(b67e3f9)·제품 repo 미추적 리뷰 문서들.
- FISH_AUDIO_KEY(.env.local·gitignored) — secret 거버넌스 인벤토리 등재.
- dev fallback secret 리터럴의 foundation-docs 템플릿 재게시 — dev 한정 배너 명시.
- 검수 probe 위생: live DB에는 sqlite `immutable=1` 또는 hash-then-copy 사용(이번 검수가 -wal/-shm sidecar를 남긴 원인 — 데이터 무변경).
- `*:3000`·`0.0.0.0:8090` 등 개발 서버 bind 정책(127.0.0.1 권장).

## 8. Security / secret findings

- **실 secret 노출 0**: 5 repo 작업트리·히스토리에서 실값 credential 커밋 0. `.env.example` key-only. foundation-docs 보고서에서 PII·customer id·전체 env dump 0.
- 실 Vault write/prod secret 주입 흔적 0(로컬 가시 범위·보고서 서술과 정합).
- 결함: **H2**(하드코딩 mint secret·unkeyed furef) · dev compose 노출(§6) · dev secret 재게시(§7) · FISH_AUDIO_KEY 거버넌스 밖(§7) · dev postgres password가 scratchpad 스크립트/transcript/명령행에 평문 존재(§2·dev throwaway).
- 파일 무결성 sha256이 보고서에 존재 — "evidence=boolean/count/status" 정책과의 관계 명확화 권장(secret hash 아님·실질 위험 낮음).

## 9. DB / migration findings

- relocation 실물: app/data 클린(guard allowlist 3파일)·relocate본=원본 superset·backup checksum 일치. 단: backup/archive는 /tmp(H1)·relocate본=활성 dev DB+테스트 rows 혼입(H8)·**"archive"라는 서술은 부정확**.
- ssbrain.sqlite: WAL/shm이 live 프로세스 하에서 truncate+삭제(H6·M10). 본체는 6/28 이후 무변경. 현재 삭제된 WAL inode=0B(지금 이 순간 미flush 데이터 0)·단 hazard 무장 상태(B1c).
- 스키마/migration rehearsal·permission isolation은 실재했다고 판단(산출물·타임라인 정합)하나 전부 비버전·휘발(H4·M8) — 재현 불가.
- Prisma: H3 참조. sqlite 원본 migration 2건은 legacy dir에 보존(삭제 0). baseline 내용 자체는 canonical 8 포함·ConversationMessage=contentHash only(raw 컬럼 없음)·40 CREATE TABLE 실측 일치 — **구조는 충실·강제(제약)가 공백**.
- Cosmile dev.db backup은 /tmp에 존재(원본 무삭제). 4개 익명 docker volume 잔존(H7).

## 10. SIASIU findings

- brain.py surgical 확인(+27줄·6 primitive delegation)·answer.py fingerprint 1차 확정(§2)·runner 89/89 재현·guard 완화 0.
- backend flag: default sqlite_legacy 확인·opt-in postgres 확인. 이슈: 불일치 창(§6)·docstring 모순(§7)·무음 fallback(§7)·legacy_sqlite 경로 버그(§6).
- postgres repository: canonical 8 구현·episode raw=content_hash only·raw_text_stored=False 확인. **결함: H2 crypto.**
- memory_context/reuse_decision: minimized·flag OFF·6종 enum 확인.
- **최대 리스크는 코드가 아니라 상주 프로세스(B1)** — relocation을 무효화할 수 있는 상태로 방치됨.
- Control smoke가 live 고객 DB에 직접 실행된 사실(M9)은 "실 memory.db 미사용" 원칙 위반으로 기록.

## 11. Cosmile findings

- provider 전환·baseline: 실물은 working tree에만(B2). baseline 구조는 충실(§9)·제약 공백(H3)·public schema 대상(H3).
- migration archive 2/3(M2)·`.env.local` sqlite URL 잔존(M3)·live dev 서버가 mid-transition tree 서빙 중(B2).
- 테스트: 7/14/3 전부 **DB 무접촉 순수 로직**(provider-independent 주장은 사실·closure 보고서가 스스로 공개). 단 rebaseline 표 "Cosmile postgres substrate ✅ … test 7/14/3 PASS"는 postgres 증명으로 오독 가능. **Prisma DB-touch 통합 테스트 0**(보고서도 remaining 인정) — postgres 실증은 현재 전무.
- candidate-status 앱 검증기가 write 경로 미접속(H3).
- SIASIU schema/table 직접 참조 0 확인.

## 12. Foundation findings

- 서비스 DB 직접 접근: memory-substrate 경로 0 확인(FORBIDDEN_IMPORTS·REFUSE guard 실재·shared_memory in-memory). 예외 관찰 1건: ssbrain.sqlite 하드코딩 open 지점(§6a) — 정리 대상.
- durable customer memory 생성 0 확인. memory_context = request-scoped validate/gate 확인.
- subject_ref mint: Option B pivot으로 deprecated 확인. 잔재 `_service_mint`(§6b) 가드 권장.
- Foundation DB role 생성 흔적 0 — 단 "role 0" 증명 자체도 DDL이 /tmp에만 있어 재현 불가(M8과 동전의 양면).

## 13. Test meaning findings

- 명시적 skip/xfail 추가 0·기대값 하향 0·테스트 삭제 0·snapshot 조작 0 — git diff 범위 확인.
- 그러나 **카운트의 '의미'가 보고보다 약한 지점들**: de-facto skip(H5)·oracle 술어 공유(§6)·vacuous assertion 1건(§7)·10/10 harness의 스코프(M4)·"7/14/3" 표기 오독 여지(§11)·89/89의 의미 범위(clean-zone+기존 계약이지 postgres 정합 아님·guard 스코프 §7).
- 88→89 성장과 89/89 복원 자체는 정당(완화 없음·재현됨). guard가 WAL-mode 운영과 양립 불가한 설계 결함은 별도(H6).

## 14. Hard Stop validation

| Hard Stop | 판정 | 근거 |
|---|---|---|
| prod DB 접근/backfill | **미수행(확인)** | prod DSN/호스트 흔적 0·접속은 로컬 docker/55432뿐 |
| 실 Vault write / prod secret 주입 | **미수행(로컬 가시 범위)** | 주입 문서=synthetic·vault_write=False·SUPERSEDED. 로컬 밖 실행은 원리상 검증 불가 |
| live activation(Memory V1) | **미수행(확인)** | flag 전부 OFF·hard_reject 미배선·shadow wiring OFF→None |
| real user exposure | **판정 보류** | Memory V1 경로 노출 0. 단 0.0.0.0:8000/`*:3000` 상주 서버(B1·B2)는 노출 표면 — 외부 도달성은 미검증(네트워크 호출 금지)·Leo 확인 필요 |
| main merge(이 작업) | **미수행(확인)** | 4 repo branch --contains·main 로그 |
| M6-G hard reject activation | **미수행(확인)** | SIMULATION_ONLY·import 0·flag OFF |
| 원본 memory.db/dev.db 삭제 | **미삭제(확인)** | superset 보존·dev.db 무삭제. 단 ssbrain -wal/-shm은 삭제됨(H6·본체 아님) |
| canonical schema 변경 | 변경 발견 0 | 계약 문서 대비 |

## 15. Recommended next actions

**Control이 승인 없이 진행 가능(dev/shadow):**
1. 검증 harness(M6-F·M6-G·isolation SQL·rehearsal)를 repo에 versioned 편입 + 결과 아카이브 + 컨테이너 기동 하 재실행 재현.
2. de-facto skip 정정(env 미설정 시 명시 SKIP 카운트 분리).
3. Prisma migration 정리 **설계서**(§2.6): 잔존 sqlite migration legacy 이동·baseline schema 지정(`cosmile`)·제약 3종 복원.
4. §7 소규모 정정(docstring·fallback 로그·legacy_sqlite 경로·vacuous assertion) 설계 노트.
5. M6 보고서 원본의 소스 repo 재배치(M12) + 본 검수 mismatch(M1~M12) 정오표.
6. guard의 WAL-mode 양립 설계 검토안(H6).

**Leo 승인 필요:**
1. **B1**: pid 475200 종료/재바인드(+ 8090/3000/3001 bind 정책).
2. **B2**: Cosmile 미커밋 전환의 커밋 확정(+정오표) 또는 롤백.
3. **H1**: /tmp 산출물 durable 이전 위치(고객 데이터 포함 — repo 밖 보관 원칙).
4. **H2**: identity crypto 수정 트레인(env 주입·HMAC·W6 fail-closed) — M6-F prod path 선결.
5. **H7**: 잔존 docker volume 4개 확인/폐기.
6. 로컬 main·shadow push(원격 리뷰 기준선 갱신).

## 16. Required questions for Leo (5)

1. `serve_public.py`(0.0.0.0:8000·6/30~)는 승인된 데모인가? **지금 종료/재바인드해도 되는가?** (B1 — 이 답 전에는 SIASIU 라우트 호출 금지 권고)
2. Cosmile 미커밋 provider 전환 — **커밋으로 확정할까, 롤백할까?** (어느 쪽이든 보고서 정오표 필요)
3. /tmp scratchpad의 backup·harness·archive(고객 데이터·logins.txt 포함)를 **어디로 durable 보관**할까?
4. relocate된 memory.db의 실데이터(구글 인증 한글 이름 user·episode 원문·safety facts) 성격 — **dev 산물인가 실고객 데이터인가?** (inventory 때부터 미결 — 보관·seed·접촉 규칙이 전부 이에 달림)
5. **M6-G의 정의 확정**: ingress-gate hard reject(7/5 패키지·dry-run 전제) vs memory-reuse gate(7/6 sim)? (M6-H 체크리스트 갱신 방향)

## 17. What must not be changed

- guard(verify_app_data_clean·FORBIDDEN_IMPORTS) 완화 금지 · runner 기대값/카운트 조작 금지 · canonical schema 변경 금지.
- 원본 memory.db/dev.db·legacy sqlite migration 삭제 금지.
- **/tmp scratchpad(6458b6f8…)와 docker volume 4개 — durable 이전/내용 확인 전까지 청소 금지.**
- **pid 475200 — Leo 결정 전 무접촉**(단 그때까지 SIASIU HTTP 라우트 호출 금지). pid 1047819(Cosmile dev)도 B2 결정 전 재시작 금지(hot-reload로 engine-mismatch 유발 가능).
- `SIASIU_MEMORY_BACKEND` default(sqlite_legacy)·모든 shadow flag OFF 기본 유지.
- answer.py(`app/ssbrain/answer.py`)·brain.py 로직(정정 트레인 승인 전) 무접촉.
- prod/live/main/M6-G activation/실 secret/실 Vault = Hard Stop 유지.

---

## 부록 A. 검수 방법·한계

- 44 subagents(10 영역 감사 + 28 반박 검증 + critic + 5 gap)·tool call 624회·소요 ~23분(오케스트레이션)·모든 blocker/high는 2인(사실 lens·영향 lens) 독립 재검증. 반박 2건 수용(→"backup만이 유일 보존"은 "pristine 증거 휘발"로 정정).
- **검증 못 한 것(정직 공개):** 테스트 스위트 재실행(runner 제외 — read-only 원칙·docker/postgres 부재)·docker volume 내용(mount=write성)·외부 네트워크 도달성(호출 금지)·로컬 밖(실 Vault·배포 env) 상태·ssbrain WAL의 truncate 이전 내용(영구 소실)·dev.db 7/5 09:04 write의 주체.
- 판정 근거의 성격: "위반 증거 0"은 로컬 가시 범위의 부재 증명이며 존재 증명이 아니다.

## 부록 B. 검수 부수효과(전량 공개)

1. SIASIU runner 1회 실행 → 89/89·검증결과/…json byte-identical 재기록(git clean 유지).
2. live memory.db·backup에 sqlite read-only 접속 → -wal(0B)/-shm sidecar 생성(row 무변경을 해시로 입증). 향후 probe는 immutable=1 사용 권고.
3. 파일/DB/커밋/프로세스/볼륨 변경 0 · push는 foundation-docs mirror만(Docs Sync Policy 의무).
