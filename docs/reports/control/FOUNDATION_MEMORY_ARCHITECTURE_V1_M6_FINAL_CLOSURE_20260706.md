# Memory Architecture V1 — Final Closure (CLOSED_WITH_LIMITS)

> 작성: foundation-control(Control) · 2026-07-06 · **Fable Final Independent Review `39a00dc` CLOSED_WITH_LIMITS 수용. dev/shadow/readiness 기준 최종 종료.**
> ★Hard Stop 무접촉(문서): prod DB 0 · 실 secret/Vault 0 · main merge 0 · live 0 · M6-G activation 0 · 외부 배포 0.

---

## 1. Final verdict
> **Memory V1 is CLOSED_WITH_LIMITS under dev/shadow/readiness scope.**
> **No V1 closure blockers remain.**
> **Remaining items are V3 backlog or pre-prod/pre-live gates.**

★**CLOSED**가 아니라 **CLOSED_WITH_LIMITS**(prod/live 미활성·아래 §5·§6).

## 2. Scope
- ★**dev/shadow/readiness closure** — **NOT production/live activation**.
- 검증은 **local/disposable postgres·shadow·flag OFF** 기준. prod DB·실 secret·live·main merge = 미수행(Hard Stop).

## 3. Accepted evidence chain
| 단계 | 판정 |
|---|---|
| Ops Independent Audit | **HOLD** |
| Corrective Batch(B1·B2·H1·H2) | 시정 |
| Corrective Reverify | **HOLD_WITH_LIMITS** |
| L1–L6 Corrective | 시정 |
| Ops L1–L6 Reverify | **HOLD_RELEASE** |
| Fable Final Independent Review(`39a00dc`) | **CLOSED_WITH_LIMITS** |
- ★독립 감사(Ops)·외부 검수(Fable)가 HOLD→HOLD_WITH_LIMITS→HOLD_RELEASE→CLOSED_WITH_LIMITS로 수렴. 과대 서술은 errata로 정정됨.

## 4. What is closed (dev/shadow/readiness)
1. **Option B service-local subject_ref** — service-local mint(subj_v2_ HMAC)·Foundation mint 폐기(M2 Option A supersede·L1).
2. **Foundation validate/gate/reasoning boundary** — Foundation은 service DB 직접 참조 0(psycopg2 package boundary 금지·connect 0)·minimized request-scoped memory_context만.
3. **PostgreSQL substrate readiness** — schema siasiu/cosmile·canonical 8 core·permission isolation(cross-schema denied·Foundation DB user 0).
4. **SIASIU memory.db relocation & runner 89/89** — app/data clean-zone 복원(memory.db relocate·guard 완화 0·테스트 조작 0·정당 복원).
5. **subject_ref/furef canonical_v2** — furef 통일(furef_v2_·HMAC·[:32])·cross-producer 3자 동일(crypto==candidate==p3_auth).
6. **prod fail-closed crypto behavior** — prod/unknown env secret 미설정 → raise(dev/test/local/shadow만 fallback·secret 값 미출력).
7. **memory_context/reuse_decision shadow wiring** — flag OFF·raw 미전송·Foundation durable 저장 0.
8. **M6-G dev simulation/readiness** — hard reject 6종 시나리오 false_allow 0(★SIMULATION_ONLY·activation 아님·§L2 아래).

★**언어 조건 반영**:
- **Cosmile postgres = "schema/validate 수준 검증"**(prisma validate PASS·baseline 40 tables·db push). **"실 DB integration 완료" 아님**(순수 로직 테스트만·실 DB-integration 테스트 부재).
- **identity substrate "pure 8/8" = APP_ENV=dev 전제**(fail-closed 테스트가 dev env 가정)·postgres 부분은 infra-gated(disposable docker).

## 5. What is not live/production yet (Hard Stop)
- prod DB backfill · real Vault/secret injection · **live M6-G activation** · main merge · external release · production DB migration.
- ★전부 Leo 승인 + 별도 gate 경유. 본 closure는 이들을 **닫지 않는다**(readiness까지만).

## 6. Remaining item classification
### 6-A. L2 — M6-G 정의 처리 (정직 이월)
- ★**M6-G의 두 의미를 분리**:
  - **A. ingress-gate hard reject** — 입력 ingress 단계 차단(별도 gate·본 V1에서 정의 미확정).
  - **B. memory-reuse gate hard reject** — deleted/blocked/expired/consent_required/safety block memory reuse 차단(본 V1에서 dev/shadow **simulation/readiness** 검증·false_allow 0).
- ★**본 Memory V1에서 검증된 것 = dev/shadow simulation/readiness**(B의 시뮬레이션)·**live activation 아님**.
- ★**M6-G 정의 미확정 + activation은 Hard Stop** — pre-prod/pre-live gate로 **이월**.
### 6-B. V3 backlog
- Cosmile 실 DB-integration 테스트 확대 · at-rest 암호화(raw storage 정책) · vector/search extension · read replica/partition · SIASIU postgres dev default 승격.
### 6-C. pre-prod/pre-live gate
- ops Vault 실 주입 · prod DB backfill · **M6-G(A/B) activation** · M6-H live · main merge · prod secret rotation.
### 6-D. Leo decision items
- docker volume(6) 처리 · env_local_backup.SENSITIVE 최종 처리 · V3 진입 승인.

## 7. V3 entry recommendation
- ★**V3는 폐기된 Option A 계약(FOUNDATION_SUBJECT_REF_SECRET mint)을 상속하지 않는다**(L1 supersede). V3 정본 시작점 = Option B service-local subject_ref + Foundation validate/gate/reasoning only.
- V3 entry package: `FOUNDATION_MEMORY_ARCHITECTURE_V1_TO_V3_ENTRY_PACKAGE_20260706.md`(동반 산출).
- 권장: V3는 (a) M6-G 정의 확정(ingress vs reuse) (b) 실 DB-integration (c) prod fail-closed 실 secret/Vault 경로 (d) at-rest 암호화부터.

## 8. Commit chain and evidence table
| 항목 | commit/evidence |
|---|---|
| SIASIU service-local memory(repository·route cutover·crypto·hard reject) | shadow `fe90d99`(HEAD)·`938c44c`·`609eba7`·`fad2275`·`75105e9` |
| Cosmile postgres provider(schema/validate) | shadow `6c6aa7f` |
| FOUNDATION Option B(shared_memory·subject_ref v2 gate) | shadow `225e25c`(main 580093c 무변경) |
| runner 89/89 | foundation_core_test_runner {}clean |
| identity substrate(pure/postgres) | 8/8 (APP_ENV=dev·postgres infra-gated) |
| hard reject sim | false_allow 0(SIMULATION_ONLY) |
| Cosmile prisma | validate 🚀(P1012 0·schema/validate 수준) |
| ops artifacts | `/home/leo/ops-artifacts/memory_v1/20260706/`(MANIFEST·git 무관) |
| closure evidence chain | Ops HOLD→corrective→HOLD_WITH_LIMITS→L1-L6→HOLD_RELEASE→Fable CLOSED_WITH_LIMITS |
- ★main 전부 무변경(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0).

## 9. Integrity statement
Memory V1 **CLOSED_WITH_LIMITS**(dev/shadow/readiness) · V1 closure blocker 0 · 잔여=V3 backlog / pre-prod·pre-live gate / Leo decision · Option A supersede(L1·doc-only·원문 보존) · M6-G 정의 분리+activation 이월(L2) · 언어 조건 반영(Cosmile=schema/validate 수준·identity=APP_ENV=dev 전제·CLOSED_WITH_LIMITS) · 실 secret 0 · prod 0 · live 0 · **main merge 0** · M6-G activation 0 · Fable review·closure는 HOLD_RELEASE 후 수행.
