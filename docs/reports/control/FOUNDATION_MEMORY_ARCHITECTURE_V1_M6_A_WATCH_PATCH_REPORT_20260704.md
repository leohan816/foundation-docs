# Memory V1 — M6-A Watch Patch Report (Fable5 watch 3건 CLOSE)

> 작성: foundation-control · 2026-07-04 · ★shadow patch + 문서 정정. live 배선 0 · 실 migration 0 · hard reject 0 · prod secret 0 · real-user write 0 · subject_ref backfill 0.
> 기준: M6_PLANNING(§1 entry gate) · PATCH1_DELTA_REVIEW(APPROVED_WITH_WATCH §F watch 1/2/3) · M2 v1.2(§3.4/§3.5/§3.7).

## WATCH-1/2/3 대응표
| watch | repo | 문제 | 대응 | CLOSE 근거 |
|---|---|---|---|---|
| **WATCH-1** status enum | SIASIU | candidate `status DEFAULT 'pending' CHECK(pending,...)` — M2 §3.4 정본 = **candidate\|approved\|rejected**(초기 candidate)·PATCH1이 틀린 'pending' codify | DDL `DEFAULT 'candidate' CHECK(candidate\|approved\|rejected)` + 테스트(candidate/approved/rejected 수락·**pending/garbage 거부**·DEFAULT=candidate) | ✅ shadow schema 26/26·pending 거부·DEFAULT candidate 실증 |
| **WATCH-2** overlay fidelity | Cosmile | overlay JSON-blob(memoryOverlayJson) — §3.7 개별 컬럼(consent_scope/retention_policy/privacy_level/deleted/blocked/**expires_at**) 쿼리불가·**AlertSubscription 미overlay**(§3.7=5모델) | **개별 nullable 컬럼 승격**(memorySubjectRef·GuestRef·ConsentScope·RetentionPolicy·PrivacyLevel·Deleted·Blocked·ExpiresAt)·잔여 metadata만 memoryOverlayJson·**AlertSubscription overlay 추가(5모델)** | ✅ prisma validate PASS·5모델 개별 컬럼·destructive 0 |
| **WATCH-3** 정직성 | Cosmile+SIASIU | 주석 "4개/5개(CartItem)" 자기모순(CartItem overlay 없음) · SIASIU 테스트 off-contract retention `safety_max_age` | 주석 "5개(CommerceEvent·Cart·Order·Wishlist·AlertSubscription·★CartItem 제외)" 일치 · SIASIU 테스트 retention **`revocable`**(정본) | ✅ 주석-schema 일치·off-contract 값 0 |
- ★**추가 발견/정합(WATCH-3 확장):** Foundation gate `ingress_gate.py` RETENTION_POLICY도 off-contract(`extended_ttl`·`safety_max_age`)였음 → **정본 `session\|short_ttl\|standard_ttl\|revocable`(M2 §5)** 정합(gate 미배선이나 M6-C 배선 시 정상값 오거부 방지). gate 44/44 유지.

## repo별 수정 파일 / commit
| repo | branch | commit | 파일 |
|---|---|---|---|
| SIASIU | `shadow/m4-siasiu-memory` | **`ab0937b`** | `foundation_memory_schema_shadow.py` · `test_foundation_memory_schema_shadow.py` |
| Cosmile | `shadow/m4-cosmile-memory` | **`334b830`** | `app/prisma/schema.prisma` |
| foundation-control | `shadow/m5-ingress-gate` | **`1c79943`** | `foundation_http_service/ingress_gate.py`(retention enum 정합) |
- ★제품 repo main 무변경(SIASIU `3cd068d`·Cosmile `3ba91e0`·fc `ee055ef`)·전부 shadow 브랜치 local·**push 0**.

## 테스트 결과
| 항목 | 결과 |
|---|---|
| SIASIU schema shadow | **26/26**(21→26·status accept/reject/default 신규) |
| SIASIU candidate adapter | **26/26**(무변경) |
| SIASIU integration | **39/39**(answer_unchanged) |
| SIASIU workflow | **119/119**(behavior_changed 0) |
| answer.py fingerprint | **d7f579443f8a110a**(unchanged) |
| Cosmile prisma validate | **PASS 🚀** |
| Cosmile de-anon | **14/14**(same-row 0·payload_refs) |
| Cosmile readiness | **164/164** |
| Cosmile loop | **112/112** |
| Foundation gate(참고·retention 정합) | **44/44** |
- ★Foundation runner = **이번 scope 밖·미실행/미변경**(83/89 baseline·건드리지 않음).

## STOP 조건 위반: **0**
DB migration 실행 0(memory.db/dev.db mtime 07-03 유지) · live 배선 0 · hard reject 0 · prod secret 0 · raw/secret/PII 열람 0 · subject_ref backfill 0 · answer.py 변경 0(fingerprint 유지) · checkout/order 로직 변경 0(.ts 0) · **destructive schema change 0**(전부 nullable 추가·기존 컬럼 무변경) · **off-contract enum 잔존 0**(candidate status·retention 정본) · **주석-schema 불일치 잔존 0**(CartItem 제외 명시) · baseline 추가 실패 0.

## migration 0 · live/write/promotion 0 · raw/secret/PII 0
- 실 migration **0**(prisma migrate/db push 미실행·:memory:/dummy만·mtime 유지) · live/write/promotion **0** · raw 고객데이터/secret/PII 열람 **0**(synthetic only·memory.db·dev.db·logins.txt 미열람) · 서버 잔여 0.

## rollback 방법
- SIASIU: `git checkout main`(ab0937b revert·shadow module·additive·answer.py/adapter 무영향).
- Cosmile: `git checkout main`(334b830 revert·overlay 컬럼 append revert·기존 컬럼 무변경·dev.db 무영향).
- fc: `git checkout main`(1c79943 revert·gate 미배선·inert).
- 3 브랜치 전부 local·push 0 → 제품 repo main/remote 무영향.

## M6-B로 넘길 조건 (migration readiness·Leo 승인)
- ★WATCH-1/2/3 CLOSE 완료 → **M6-B(migration readiness/Leo approval gate) 진행 가능**.
- M6-B = M4_MIGRATION_PLAN을 WATCH-1 반영 DDL(status candidate) 기준으로 완성·**dry-run(non-prod·backup)**·pre-scan/수리·rollback rehearsal → **Leo 승인 후에만 실 migration**. ★실 migration·live 배선·prod secret·hard reject = 여전히 금지(각 train Leo 승인).
- WATCH-2 개별 컬럼 승격이 실 DDL에 반영되므로 M6-B migration 대상 스키마 = 본 M6-A 반영본.

## 무결성
코드 = shadow/local(push 0) · DB migration 0 · live 배선 0 · hard reject 0 · prod secret 0 · subject_ref backfill 0 · raw/secret/PII 0 · answer.py fingerprint 무변경 · checkout/order 무변경 · destructive 0 · 본 report만 foundation-docs commit/push.
