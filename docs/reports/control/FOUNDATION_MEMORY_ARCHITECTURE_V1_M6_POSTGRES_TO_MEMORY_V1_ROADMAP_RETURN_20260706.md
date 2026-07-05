# Memory V1 — PostgreSQL 기반 정리 → Memory V1 Roadmap 복귀

> 작성: foundation-control(Control) · 2026-07-06 · **목적: PostgreSQL unification은 Memory V1 완료가 아니라 service-local memory 기반 정리다. 본 문서로 Memory V1 roadmap 복귀를 고정한다.**
> ★Hard Stop 무접촉(문서 only): 코드/DB 0 · prod 0 · live 0 · main merge 0 · 실 secret 0.
> 근거: batch impl(`9cbad24`) · M6 status matrix(`6af9628` 갱신본) · Option B design(`7ef9d01`).

---

## 0. 위치 확인
- PostgreSQL 전환(dev/local·shadow) = **Memory V1의 substrate(기반) 정리**. Memory V1 기능 완료가 **아님**.
- Memory V1 arc: **M6-C ingress → M6-D SIASIU auth → M6-E Cosmile emit → M6-F identity/secret chain → M6-G hard reject → M6-H final**. PostgreSQL 작업은 이 arc가 딛고 설 **service-local memory 물리/구조 기반**을 정리한 것.

## 1. PostgreSQL 전환으로 해결된 기반 문제
1. **service-local memory 물리 기반 모호성 해소**: memory.db가 app/data(Foundation clean zone)에 legacy+shadow 혼재 → **canonical PostgreSQL service-local 구조**(schema siasiu/cosmile)로 정리(dev 검증).
2. **SIASIU/Cosmile 메커니즘 동일화 기반**: 양 서비스가 **동일 canonical 8 core + lifecycle/safety fields + memory_context/reuse_decision** 계약을 공유(physical 분리·logical 통일). Cosmile은 SQLite(Prisma)→PostgreSQL 정본 전환.
3. **service boundary DB-level 실증**: cross-schema **permission denied**·Foundation DB user 0 → "Foundation은 service DB 직접 참조 0" 원칙이 **문서가 아니라 DB 권한으로 강제**됨(검증).
4. **privacy invariant 기반**: `raw_text_stored=False`·content_hash only·Foundation에 raw 미전송 = repository/schema 레벨로 고정(migration rehearsal에서 raw_text_stored=TRUE 0 실증).
5. **runner 83/89 근본원인 해결 경로 확보**: 원인=memory.db in app/data(Runner Meaning Audit). postgres 정본 cutover + memory.db relocation으로 **89/89 정당 복원 경로**가 열림(테스트 조작 아님).

## 2. 아직 미완료인 Memory V1 기능
- **M6-F prod path**: ops Vault 실 주입(WAITING_FOR_OPS) · prod DB backfill(Hard Stop) · impl은 shadow·flag OFF.
- **M6-G hard reject activation**: BLOCKED_BY_HARD_STOP.
- **M6-H final readiness/live**: WAITING_FOR_LEO(skeleton).
- **memory reuse 실flow**: memory_context emit + Foundation memory_reuse_decision consume이 **실 상담/이벤트 경로에 미배선**(repository는 준비·live route 미cutover).
- **SIASIU live route cutover**: server.py(recall/reset/recos/checkins/pitch) → postgres service_memory 미전환(현 sqlite).
- **memory.db relocation/archive**: 원본 app/data/memory.db 유지 → runner 83/89 잔존.
- **Cosmile 기존 test suite postgres 정합**: vitest/readiness/loop postgres 기준 재실행·수정 미완.
- **legacy seed migration**: episode raw·fact_type_registry candidate 처리 정책 미결.
- **runner 89/89**: 별도 train(live 전 필수).

## 3. Memory V1으로 복귀하기 위한 다음 작업 목록 (권장 순서)
1. **[substrate 마감·dev]** SIASIU live route cutover(server.py→service_memory postgres·brain.py 무수술 유지) + memory.db relocation → **runner 89/89 정당 복원**.
2. **[substrate 마감·dev]** Cosmile 기존 test suite postgres 정합(깨지면 canonical 기준 수정·no skip).
3. **[Memory V1 복귀]** memory_context emit + memory_reuse_decision consume을 **M6-C/D/E live-prep 경로에 실배선**(shadow·flag OFF·양 서비스 동일 형식).
4. **[M6-F 재개]** Option B identity/secret chain(subject_ref service-local mint·SubjectRefMap·furef)를 postgres substrate 위에서 shadow 재검증(W1~W6·zero-orphan).
5. **[M6-G 준비]** hard reject 설계/シ뮬레이션(activation은 Hard Stop).
6. **[M6-H 준비]** 종합 readiness matrix 갱신(postgres 기반 반영).
7. legacy seed migration 정책 확정 후 candidate 처리.

## 4. 남은 구조/보안/DB Hard Stop
- **구조**: canonical schema 자체 변경(STOP #7·별도 승인) · SIASIU/Cosmile cross-schema direct ref(영구 금지) · Foundation service DB direct access(영구 금지).
- **보안**: 실 role/권한 grant(운영) · 실 secret 생성/주입 · ops Vault 실 주입 · at-rest 암호화(raw storage 정책).
- **DB**: prod DB backfill · 원본 prod memory.db/dev.db write · 실 DB migration(prod) · live activation.
- **공통**: main merge · 외부 공개 배포 · M6-G hard reject activation.

## 5. Leo 결정 필요 vs Control 계속 진행 가능
**★Control이 계속 진행 가능(dev/local/shadow·Hard Stop 무접촉):**
- SIASIU live route cutover(dev) + memory.db relocation(dev·copy/backup·runner 89/89 검증).
- Cosmile 기존 test suite postgres 정합(dev).
- memory_context/reuse_decision 실배선(shadow·flag OFF).
- M6-F Option B chain postgres substrate 재검증(shadow).
- M6-H readiness matrix 갱신 · runner-fix train(dev·89/89) · legacy seed candidate 분석.

**★Leo 결정 필요(Hard Stop·승인 전 불가):**
- ops Vault 실 주입 · prod DB backfill · **M6-G hard reject activation** · live · main merge · 외부 배포.
- 실 role grant(운영 권한) · 실 secret · canonical schema 변경 · prod DB migration.
- memory.db/dev.db 원본 **삭제**(현재는 relocation/archive 계획까지·삭제는 별도 승인).

---

## 무결성
roadmap 복귀 문서 only · 코드/DB 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · 실 secret 0 · PostgreSQL=Memory V1 substrate(완료 아님) · 다음 = **substrate 마감(cutover·relocation·89/89) → Memory V1 M6-F/G/H 복귀** · Hard Stop은 §4·Leo/Control 분리는 §5.
