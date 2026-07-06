# Memory Architecture V1 → V3 Entry Package

> 작성: foundation-control(Control) · 2026-07-06 · **V1 CLOSED_WITH_LIMITS(`..._M6_FINAL_CLOSURE_20260706.md`) 기준 V3 진입 패키지. Fable Final Review `39a00dc` 반영.**
> ★Hard Stop 무접촉(문서): prod DB 0 · 실 secret 0 · main merge 0 · live 0 · M6-G activation 0.

---

## 1. V3 시작 정본(inherited baseline)
- ★**Option B service-local subject_ref** — subject_ref mint/저장/SubjectRefMap = service-local · Foundation = validate/gate/reasoning only.
- ★**V3는 Option A(FOUNDATION_SUBJECT_REF_SECRET mint) 계약을 상속하지 않는다**(L1 supersede·M2/HARD_GATE 문서 supersede pointer 적용).
- **canonical identity**: subject_ref=`subj_v2_+HMAC(<SVC>_SUBJECT_SECRET,'<svc>:subject:'+ref)[:32]` · furef=`furef_v2_+HMAC(<SVC>_FUREF_SECRET,'<svc>:local_user:'+ref)[:32]`(cross-producer 3자 동일).
- **substrate**: PostgreSQL(schema siasiu/cosmile·canonical 8 core·permission isolation·Foundation DB user 0).
- **crypto**: prod fail-closed(unknown env→prod raise·dev fallback 조건부).

## 2. V3 진입 backlog(우선순위)
1. **M6-G 정의 확정** — (A) ingress-gate hard reject vs (B) memory-reuse gate hard reject 분리 정의 + activation gate 설계(현재 정의 미확정·activation Hard Stop).
2. **실 DB-integration** — Cosmile/SIASIU 실제 postgres DB-integration 테스트(현재 schema/validate + 순수 로직 수준).
3. **prod fail-closed 실 경로** — ops Vault 실 주입·prod secret rotation·secret_version dual-read(Hard Stop 경유).
4. **at-rest 암호화 / raw storage 정책** — raw_text_stored=False 유지 + 민감 필드 암호화.
5. **scale** — read replica·partitioning·vector/search extension(pgvector)·connection pool.
6. **SIASIU postgres dev default 승격** — 인프라 표준화 후 default 전환(현재 opt-in).

## 3. V3가 상속하지 않는 것(폐기)
- ★Option A / FOUNDATION_SUBJECT_REF_SECRET subject_ref mint(supersede).
- Foundation-side subject mint / identity-touch API(Option B에서 제거).
- app/data 내 memory.db(relocate 완료).
- 하드코딩 mint secret · unkeyed sha256 furef(L1/L2 정정).

## 4. V3 진입 전 Leo decision / Hard Stop
- **Leo decision**: V3 진입 승인 · M6-G 정의(A/B) 방향 · docker volume/env_local_backup.SENSITIVE 처리.
- **Hard Stop(V3에서도 승인 경유)**: prod DB backfill · 실 Vault/secret · **M6-G activation** · live · main merge · external release · prod DB migration.

## 5. 언어/상태 조건(Fable 반영)
- Cosmile postgres = **schema/validate 수준**(실 DB integration 완료 아님).
- identity substrate pure 8/8 = **APP_ENV=dev 전제**·postgres infra-gated.
- V1 = **CLOSED_WITH_LIMITS**(not CLOSED).

## 6. Evidence 연속성
- V1 closure: `..._M6_FINAL_CLOSURE_20260706.md` · evidence chain: Ops HOLD→corrective→HOLD_WITH_LIMITS→L1-L6→HOLD_RELEASE→Fable CLOSED_WITH_LIMITS.
- ops artifacts: `/home/leo/ops-artifacts/memory_v1/20260706/`(MANIFEST·git 무관).
- main 무변경(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0).

## 무결성
V1→V3 entry package · V3 정본=Option B(Option A 미상속) · backlog/Hard Stop/Leo decision 분리 · 언어 조건 반영 · 실 secret 0 · prod 0 · live 0 · **main merge 0** · M6-G activation 0 · V3 진입은 Leo 승인 경유.
