# Memory V1 — M6-F/G/H Readiness Rebaseline (postgres substrate 반영)

> 작성: foundation-control(Control) · 2026-07-06 · **범위: PostgreSQL substrate 마감 반영 후 M6-F/G/H 상태·Hard Stop·dev 가능 작업·Leo 승인 항목 재정렬(문서 only).**
> ★Hard Stop 무접촉(문서): 코드/DB 0 · prod 0 · 실 secret 0 · main merge 0 · live 0 · M6-G activation 0 · canonical schema 변경 0 · 원본 DB 삭제 0.
> 근거: dev closure(`fd48398`) · substrate completion(`3a25193`) · M6 status matrix.

---

## 1. Fact
- PostgreSQL substrate(schema siasiu/cosmile·canonical·permission isolation) dev/shadow 마감 → M6-F/G/H를 이 substrate 위에서 재정렬.
- ★M6-F identity/secret chain = postgres substrate에서 **10/10 재검증**(zero-orphan 유지). M6-G/M6-H = **Hard Stop 경유·미실행**.
- runner **89/89**·route cutover flag-gated·memory_context shadow wiring(flag OFF) 반영.

## 2. M6-F state
| 요소 | 상태 |
|---|---|
| Option B identity/secret chain(service-local mint·Foundation validate/gate only) | ✅ shadow PASS |
| subject_ref service-local mint(subj_v2_·HMAC·de-identified) | ✅ postgres 10/10 |
| SubjectRefMap(subject_ref PK·furef·secret_version·partial unique) | ✅ postgres 검증 |
| furef(내부 ref·derived·raw 아님) | ✅ 검증 |
| W1 atomic(map+memory·rollback orphan 0) | ✅ postgres 검증 |
| W4 reason enum(unknown→cannot_determine) / W6 fail-safe(unknown env→production) | ✅ 검증 |
| zero-orphan(memory→map 무결) | ✅ 검증 |
- ★**postgres substrate 10/10 반영**: identity/secret chain이 sqlite→postgres 이관에도 invariant 유지.
- **prod path 분리(미실행·Hard Stop)**: ops Vault 실 주입(per-service SUBJECT/FUREF/CANDIDATE/P3 secret) → **prod DB backfill**(SubjectRefMap 실 채우기). 둘 다 Hard Stop.
- ★현재 = shadow·flag OFF·실 secret 0·prod DB 0.

## 3. M6-G state
- **hard reject 설계**: block/deleted/expired/blocked memory reuse·consent_required·safety block에 대한 **hard reject** 방침(설계 단계·BLOCKED_BY_HARD_STOP).
- **activation 전 조건**: M6-F prod path 완료(Vault·backfill) · memory_reuse_decision 실flow 검증 · safety gate 실연동 · rollback 경로.
- ★**activation = Hard Stop**(Leo 최종). 활성화 시 실제 reuse 차단이 사용자 경험에 영향 → 승인 없이 불가.
- **postgres substrate 영향**: hard reject는 **decision gate 로직**(memory_reuse_decision consume)이라 substrate(저장소) 교체와 직교 → substrate가 hard reject 설계를 바꾸지 않음. canonical `deleted/blocked/expired` 필드가 postgres에 존재(hard reject 판정 근거 준비됨).

## 4. M6-H state (final readiness matrix)
| 항목 | 상태 |
|---|---|
| runner 89/89 | ✅ **정당 복원**(memory.db relocate·guard 완화 0) |
| SIASIU postgres substrate | ✅ service_memory repository·route cutover(flag OFF)·10/10 |
| Cosmile postgres substrate | ✅ provider postgresql·baseline·test 7/14/3 PASS |
| memory_context/reuse_decision shadow wiring | ✅ flag OFF·raw 0·durable 0 |
| permission isolation(cross-schema denied·Foundation DB user 0) | ✅ 검증 |
| **live/main merge 전 체크리스트** | ⬜ 아래 |
- **live/main merge 전 체크리스트(미충족·Hard Stop)**:
  1. M6-F prod path(ops Vault 실 주입 + prod DB backfill) 완료.
  2. M6-G hard reject activation 방침 확정 + 시뮬레이션 PASS.
  3. memory_context/reuse_decision **실flow**(flag ON) end-to-end 검증(shadow→live-prep).
  4. SIASIU postgres dev default 승격(인프라 표준화) — live는 postgres 정본 필요.
  5. 안전 invariant 0(false_allow·privacy leak·deleted reuse·write/live/promotion) 재확인.
  6. rollback 경로 + Leo 최종 승인.
- ★현재 = **WAITING_FOR_LEO**·live/main 미실행.

## 5. Dev/shadow remaining (Control 가능·승인 불요)
- SIASIU postgres dev default 승격 **인프라**(psycopg2 requirements·docker-compose dev postgres·기존 sqlite 테스트 postgres 정합).
- fact_type_registry → SIASIU config extension **승격 구현**(canonical core 밖·seed).
- Cosmile 실제 DB integration test 확대(현재 순수 로직 3종·Prisma DB-touch 테스트 추가).
- memory_context **실flow 추가 검증**(flag ON shadow end-to-end·M6-C/D/E gate 통과·reuse_decision 6종).
- M6-G hard reject **설계/시뮬레이션**(dev·activation 아님).

## 6. Hard Stops
ops Vault 실 주입 · prod DB backfill · **M6-G hard reject activation** · live · main merge · external deployment · 실 role grant · 실 secret · canonical schema 변경 · prod DB migration · 원본 memory.db/dev.db 삭제.

## 7. Recommendation
- ★substrate·shadow·identity chain 전부 검증 완료 → **다음은 Leo 결정 3개로 압축**:
  1. **M6-G hard reject를 dev 시뮬레이션까지 진행할지**(activation은 여전히 Hard Stop·시뮬레이션은 Control 가능) — 권장: dev 시뮬레이션 GO.
  2. **SIASIU postgres dev default 승격 인프라를 지금 정비할지**(psycopg2 requirements·docker-compose·테스트 정합) — 권장: dev 정비 GO(회귀 0·live 전 필요).
  3. **M6-F prod path 착수 시점**(ops Vault 실 주입 → prod DB backfill) — ★**Hard Stop·Leo 승인 필수**·인프라/시뮬레이션 마무리 후 진행 권장.
- Control은 1·2(및 §5 잔여)를 승인 없이 진행 가능. 3은 Leo 승인 전 불가.

## 8. Required Leo decisions (≤3)
1. **M6-G dev 시뮬레이션 GO 여부**(activation 제외·Control 가능 범위).
2. **SIASIU postgres dev default 승격 인프라 정비 GO 여부**(dev·회귀 0).
3. **M6-F prod path 착수 승인**(ops Vault + prod backfill·**Hard Stop**).

## 9. What must not be changed
- ★canonical schema(변경 0) · 원본 memory.db/dev.db(삭제 0·relocated/backup) · guard 로직(완화 0) · runner 89/89(조작 0) · answer.py fingerprint · SIASIU dev default(현 sqlite·flag 구조) · concurrent 세션 파일 · **prod/live/main/M6-G activation/실 secret/실 Vault**(전부 Hard Stop).

---

## 무결성
M6-F/G/H rebaseline 문서 only · 코드/DB 0 · M6-F postgres 10/10 반영 · M6-G/M6-H Hard Stop 명시 · runner 89/89·substrate·shadow wiring 반영 · Leo 결정 3개로 압축 · Control 가능 vs Leo 승인 분리 · 실 secret 0 · prod 0 · live 0 · **main merge 0**(fnd 580093c·siasiu 3cd068d·cosmile 3ba91e0) · canonical schema 변경 0 · **M6-F prod/M6-G activation/M6-H live = Hard Stop 유지**.
