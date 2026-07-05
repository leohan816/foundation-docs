# Memory V1 — M6 PostgreSQL Substrate Completion & Memory V1 Return (dev/local/shadow)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: substrate 마감(route cutover·relocation·89/89·test 정합·shadow wiring·M6-F 재검증·seed 분석)·dev/local/shadow. prod/live/main 0.**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret 0 · main merge 0 · live 0 · 외부 배포 0 · Foundation service DB direct access 0 · cross-schema direct ref 0 · canonical schema 변경 0 · 원본 memory.db/dev.db 삭제 0(relocate/backup) · M6-G activation 0 · skip/xfail 0.
> 근거: 실 docker postgres 검증 · roadmap return(`bafea35`) · batch impl(`9cbad24`).

---

## 1. Fact
- PostgreSQL substrate 마감을 dev/local/shadow에서 실 검증. **SIASIU runner 89/89 정당 복원**(memory.db relocate로 실 invariant 위반 제거·guard 완화 0·테스트 조작 0).
- ★7개 task(A route cutover·B relocation·C Cosmile test·D shadow wiring·E M6-F 재검증·F M6-H matrix·G seed) dev/shadow 완료. **live route는 flag-gated(default OFF·회귀 0)**.

## 2. SIASIU route cutover result (A)
- brain.py **surgical**(대수술 0): `DB_PATH` env화(`SIASIU_MEMORY_DB_PATH`·default app/data 밖) + `_pg_bridge()` delegation(6 primitive: ensure_user·add_episode·recent_episodes·active_facts·reset·init_db).
- `service_memory/brain_bridge.py`: postgres backend(canonical siasiu schema). **flag `SIASIU_MEMORY_BACKEND=postgres`**(default `sqlite_legacy`·회귀 0).
- ★검증(postgres backend): recall returning=True·facts=1(ltm_fact)·**episodes=0(raw 미복원·canonical raw 미저장)**·reset backend=postgres·**content_hash only·raw_text_stored=TRUE 0**. ★raw episode text = Foundation은 물론 postgres에도 미저장.
- routes(server.py recall/reset/recos/checkins/pitch/boot init_db)는 brain 경유라 backend flag만으로 postgres 전환(server.py 무변경).

## 3. memory.db relocation/archive result (B)
- **원본 삭제 0**: backup(sha256 40d8083bc7c92d15·integrity ok·legacy 45 rows) 후 **relocate(mv)** `app/data/memory.db`→`app/service_memory_data/`(app/data 밖·gitignore).
- clean-zone: ssbrain.sqlite **checkpoint**(-wal/-shm 제거·데이터 손실 0)·checkin_pool·logins.txt = **archive(mv·regenerable dev artifact·삭제 0)**.
- ★app/data 전체가 gitignore된 runtime artifact 확인(clean checkout=빈 app/data). 삭제 필요 없음(relocate/archive만)·STOP 미발생.

## 4. runner 89/89 result
- ★**runner 89/89 · failure_taxonomy {} (clean)**. guard `verify_app_data_clean().ok=True`(files=[events.jsonl·llm_usage.jsonl·ssbrain.sqlite]).
- ★**정당 복원**: memory.db를 app/data 밖으로 relocate(실 invariant 위반 제거) → Runner Meaning Audit의 올바른 해결. **guard 완화 0·기대값 조작 0·skip 0**. 전체 brain.py 편집 후에도 89/89 안정(default sqlite 회귀 0).

## 5. Cosmile postgres test result (C)
- `test:memory`(de-anon vitest) **7/7 PASS**(postgres provider 하). de-anon 로직 = **Prisma/DB 의존 0**(순수 hashing·provider 무관) → provider 전환에도 회귀 0.
- ★분류: **MEANINGFUL_PASS**(provider-independent memory 로직). 광범위 Prisma DB-integration 테스트는 postgres 연결 필요(별도·본 batch 미실행·§11).

## 6. memory_context/reuse_decision shadow wiring (D)
- `service_memory/canonical.py` `build_memory_context()`: **minimized request-scoped**(subject_ref/guest_ref/service_id/fact_refs/consent/retention/sensitivity/safety_flags·**raw 미포함**·`raw_text_stored=False`·`request_scoped=True`) — **SIASIU/Cosmile 동일 형식**(canonical logical contract).
- `assert_no_raw_text()` fail-closed(raw_text_stored≠False·request_scoped 아님 → reject). contract test 검증(6/6).
- reuse_decision 6종(allowed/blocked/expired/deleted/consent_required/not_available) consume 형식 통일.
- ★**Foundation durable 저장 0**(request_scoped)·**Foundation service DB direct access 0**(memory_context만 전달)·**flag OFF shadow**(M6-C/D/E emit 경로 연결점·live 미배선).

## 7. M6-F postgres substrate verification (E)
- 실 postgres 재검증 **10/10 PASS**: subject_ref v2 format(service-local mint)·de-identified·SubjectRefMap secret_version·**furef derived(raw 아님)**·partial unique(furef,version) 중복 차단·**W1 atomic rollback(map/memory orphan 0)**·**zero-orphan(memory→map 무결)**·W4 reason enum(unknown→cannot_determine)·W6 fail-safe(unknown env→production).
- ★Option B identity/secret chain이 postgres substrate 위에서 무결(zero-orphan 유지).

## 8. M6-H readiness update (F)
| phase | 상태 | 비고 |
|---|---|---|
| M6-C/D/E | PASS(substrate 반영) | live-prep·shadow |
| **substrate**(route cutover·relocation·89/89·M6-F 재검증) | ✅ **dev/shadow 완료** | 본 batch |
| M6-F prod path(Vault·backfill) | WAITING_FOR_OPS / **BLOCKED_BY_HARD_STOP** | 실 Vault·prod DB |
| **M6-G hard reject activation** | **BLOCKED_BY_HARD_STOP** | Leo 최종 |
| **M6-H final/live** | **WAITING_FOR_LEO** | 종합·live·main merge |
- ★runner 89/89 = **달성**(substrate). live 전 전제 충족(테스트 조작 아님). Hard Stop = M6-G activation·prod·live·main.

## 9. legacy seed candidate analysis (G)
- **episode raw text(30)**: ★canonical core에 raw **미저장**(content_hash만·raw_text_stored=False). 정책: raw는 **canonical 밖 seed/archive**(원본 sqlite backup에 보존)·core 오염 0. 재진입 raw 복원은 episode_summary/facts로 대체(canonical).
- **fact_type_registry(11)**: canonical core에 대응 테이블 **없음** → **core 밖 SIASIU config/extension 후보**(seed). canonical core 오염 0.
- ★정책 결정 필요 항목: raw episode 보존 기간/삭제·fact_type_registry를 SIASIU config table로 승격 여부(Leo·§11).

## 10. Tests / failures and meaning classification
| 테스트 | 결과 | 분류 |
|---|---|---|
| SIASIU runner | **89/89** clean | 정당 복원(invariant 제거) |
| service_memory contract | **6/6** | MEANINGFUL_PASS |
| M6-F substrate(postgres) | **10/10** | MEANINGFUL_PASS |
| Cosmile de-anon(postgres) | **7/7** | MEANINGFUL_PASS(provider-independent) |
| brain legacy sqlite 회귀 | OK | default 경로 무변경 |
- ★no skip/xfail·no expectation manipulation. 실패 0. (P1012 등 이전 batch 이슈는 해결됨.)

## 11. Remaining Memory V1 work (dev·별도)
- Cosmile 광범위 Prisma DB-integration 테스트 postgres 정합(de-anon 외).
- memory_context/reuse_decision을 M6-C/D/E emit **실코드에 shadow 배선**(현재 format/contract 검증·연결점 확인까지).
- legacy seed 정책 확정(episode raw 보존·fact_type_registry config 승격).
- SIASIU route postgres backend를 dev default로 승격할지(현재 flag OFF).
- **Memory V1 본 구현 복귀**: M6-F prod path → M6-G → M6-H(전부 Hard Stop 경유).

## 12. Remaining Hard Stops
- ops Vault 실 주입 · prod DB backfill · **M6-G hard reject activation** · live · main merge · 외부 배포 · 실 role grant · 실 secret · canonical schema 변경 · prod DB migration · 원본 DB 삭제.

## 13. Commit hashes
- **SIASIU shadow `fad2275`**(brain DB_PATH env·_pg_bridge delegation·brain_bridge·relocation·gitignore) + `75105e9`(service_memory repository·이전 batch)·main 3cd068d 무변경.
- **Cosmile shadow `76158c8`**(prisma postgres provider·이전 batch)·main 3ba91e0 무변경.
- **foundation-docs**: 본 report(아래 commit).

## 14. What was not touched
- ★원본 `app/data/memory.db`(relocate·backup·삭제 0)·원본 Cosmile `dev.db`(무변경)·brain.py 로직(surgical 분기만·대수술 0)·answer.py fingerprint·guard 로직(완화 0)·canonical schema(변경 0)·concurrent 세션 파일(무접촉)·prod/live/main.

---

## 무결성
substrate 마감 dev/local/shadow · runner **89/89 정당 복원**(guard 완화 0) · route cutover flag-gated(회귀 0·raw 미저장) · memory.db relocate(삭제 0·backup/checksum/integrity) · M6-F substrate 10/10 · Cosmile de-anon 7/7 · memory_context Foundation durable 0·direct DB 0 · 실 secret 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · canonical schema 변경 0 · cross-schema ref 0 · **M6-G/prod/live/main = Hard Stop 유지**.
