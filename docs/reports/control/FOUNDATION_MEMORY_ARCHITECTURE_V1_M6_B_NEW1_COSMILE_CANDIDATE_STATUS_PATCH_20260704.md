# Memory V1 — NEW-1 Cosmile Candidate Status Mini-Patch

> 작성: foundation-control(Control) · 2026-07-04 · ★shadow/local schema 정정 + 테스트 보고 only. **실 DB migration 0 · 기존 row repair 0 · repair 적용 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · live 배선 0 · hard reject 0.**
> ★본 지시 = EXEC-1 실 migration 승인 아님. NEW-1 patch = **shadow/local schema 정정 및 테스트 보고까지**(실 DB migration/기존 row repair 미포함).
> 근거: EXEC-0 result(GitHub main `2dc281a`·NEW-1 발견) · M2 §3.4(candidate status 정본) · EXEC-0 prep.

---

## 1. 문제 (EXEC-0가 표면화)
- Cosmile `MemoryFactCandidate.status` **DEFAULT `'pending'` = off-contract.** M2 §3.4 정본 = `candidate | approved | rejected`(초기값 `candidate`).
- 원인: M6-A WATCH-1은 **SIASIU shadow module만** 정정했고, Cosmile prisma schema의 candidate status(patch1 F-3/R-5에서 `@default("pending")`)는 미정정 잔존. EXEC-0 pre-scan #5가 flag(off_contract_candidate_status_count=1).

## 2. Patch 내용 (shadow/local)
- **정정:** `status String @default("pending")` → **`@default("candidate")`** (line 783·MemoryFactCandidate). 정본 enum = `candidate|approved|rejected`.
- **CHECK 집행 경로 명시(prisma CHECK 미지원):** `CHECK (status IN ('candidate','approved','rejected'))`는 **EXEC-1 migration SQL(raw SQL) 또는 app-level validation**으로 집행(문서화·SIASIU shadow는 sqlite CHECK로 이미 집행·Cosmile는 prisma 한계로 이연).
- **미수행:** `pending` 자동 변환/repair 적용 0 · 기존 row 정정 0(default만 변경) · 실 DB migration 0.
- **무변경:** 다른 모델(`FoundationSignalOutbox`·`Order`)의 `'pending'`은 각자 정본 enum·미변경(2건 잔존 정상).

## 3. 테스트 결과 (★local shadow diff vs GitHub 원격 구분)
### 3.1 local shadow diff (★GitHub 미검증·shadow 브랜치 local-only)
- Cosmile `shadow/m4-cosmile-memory` commit **`78678ed`** · main `3ba91e0` 미merge · **원격 미push(local-only·원격 0건)**.
| 검증 | 결과(local) |
|---|---|
| prisma validate | **PASS 🚀** |
| migrate diff(no-DB) status default | **`"status" TEXT NOT NULL DEFAULT 'candidate'`** 확인(정정 반영) |
| off-contract 'pending' 잔존(candidate) | 0(default candidate) |
| 다른 모델 'pending' | 2건 무변경(정본) |
| Cosmile readiness | **164/164** |
| Cosmile AI Commerce loop | **112/112** |
| de-anon | **14/14**(same-row 0·P1/P2 유지) |
| dev.db mtime | 07-03 무접촉 | checkout/order .ts | 0 변경 |

### 3.2 GitHub 원격 검증 가능
- 본 NEW-1 patch report(foundation-docs) = **GitHub 원격 검증 가능**(push 후 main).
- ★Cosmile schema 코드(`78678ed`) = **local shadow diff·GitHub 미검증**(shadow 브랜치 local-only) — Leo/검수 시 push 또는 local 접근 필요(watch-1과 동일 성질).

## 4. NEW-1 CLOSED 판정 (EXEC-1 전)
- **schema default off-contract = CLOSED**(shadow/local·`pending`→`candidate`·migrate diff 확인). ✅
- **CHECK 완전 집행 = EXEC-1 조건부**: prisma가 CHECK를 emit 못 하므로, `candidate|approved|rejected` **강제(CHECK)**는 **EXEC-1 실 migration SQL(raw) 또는 app-level validation**에서 반드시 추가(문서화 완료). → EXEC-1 pre-scan #5로 재확인.
- ★**판정: NEW-1 = schema-level CLOSED(local shadow)** · **CHECK 강제는 EXEC-1 migration SQL 필수 항목으로 등록**(off-contract 값 유입 완전 차단은 그때 확정).

## 5. 무결성
shadow/local schema 정정 only · 실 DB migration 0 · 기존 row repair 0 · repair 적용 0 · pending 자동 변환 0 · prod DB 접근 0 · raw/PII/secret 열람 0 · live 배선 0 · hard reject 0 · 제품 repo main merge 0 · schema code main merge 0(shadow 브랜치 local·main `3ba91e0` 미merge) · dev.db 무접촉 · **EXEC-1 실 migration은 여전히 별도 gate·별도 Leo 승인** · 본 report만 foundation-docs commit/push.
