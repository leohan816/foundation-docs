# Memory V1 — EXEC-1 Compat Enum-field Scrub Follow-up

> 작성: foundation-control(Control) · 2026-07-05 · **범위: compat scrub gap closure용 shadow patch.**
> ★**이 follow-up = shadow patch이며, EXEC-1 실 migration 승인·실 데이터 pre-scan·repair 적용·prod/live/hard reject/backfill/main merge 승인이 아니다.**
> 근거: EXEC-1 BUG closure delta review(GitHub main `71a825a`·CONFIRMED_WITH_WATCH·compat enum-field scrub gap).

---

## 1. Fact
delta 검수가 flag한 잔여 WATCH(compat-mode enum-field scrub gap)를 shadow에서 닫음:
- **문제:** gate compat 모드에서 `service_id`·`last_refined_intent`는 enum-only 분기(_scrub_value fallback 없음) → **compat 모드**에서 enum도 scrub도 skip → 이 두 필드에 scalar PII/raw가 있으면 `ok:true` 통과 가능(계약 "compat도 PII/raw 무조건 scrub" 상충). strict 모드는 ENUM으로 차단(gap 없음).
- **repo/commit:** foundation-control `shadow/m5-ingress-gate` **`05bd05f`**(main `21b05e1` 무변경·push 완료).

## 2. patch 내용
- `service_id` 분기: `if not compat: _enum_field(...)` **`else: _scrub_value(sc, k, p, out)`** 추가.
- `last_refined_intent` 분기: 동일 `else: _scrub_value(...)` 추가.
- 효과: compat 모드에서 **enum만 유예**하고 **scalar PII/raw는 scrub**(detect + None strip). strict 모드 무변경(enum check 유지).
- ★hook inert 유지(`SHADOW_HOOK_FLAG != "1"` → None) · hard_reject=False 유지 · live 배선 0.

## 3. regression evidence
- **compat service_id = PII(synthetic email 패턴)** → **`ok:False`·GATE_REJECT_PII**(patch 전 ok:True).
- **compat service_id = raw(한국어 원문)** → **`ok:False`·RAW_TEXT**.
- **compat last_refined_intent = raw(한국어 원문)** → **`ok:False`·RAW_TEXT**.
- **compat last_refined_intent = PII(email)** → **`ok:False`·PII**.
- **compat 정상 enum(`service_id:"siasiu"`·`last_refined_intent:"greeting"`)** → **`ok:True`(회귀 없음)**.
- **strict 정상** → **`ok:True`(무변경)**.
- regression test 5건 추가(4 reject + compat 정상 enum pass). 기존 BUG-1 regression 유지.

## 4. test 결과
| 항목 | 결과 |
|---|---|
| Foundation gate(+follow-up) | **57/57**(52→57) |
| Foundation runner | **83/89**(추가감소 0·선재 6) |
- ★이번 follow-up = fc gate 국소 수정. SIASIU/Cosmile 코드 무변경(직전 bugfix 상태 유지: SIASIU 26/27/11/39/119·fingerprint·Cosmile 14/5/valid/164/112).

## 5. STOP / 무결성
STOP 위반 **0**: 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 0 · prod secret 0 · subject_ref backfill 0 · **live 배선 0** · **hard reject 활성 0**(gate inert·hard_reject=False·server/core hard reject 0) · durable customer memory 0 · cross-service 0 · **product repo main merge 0**(main `ee055ef` 무변경) · schema code main merge 0 · 실 memory.db/dev.db 무접촉(07-03) · 서버 잔여 0.

## 6. remaining watch
- **runner 83/89 선재 6건**(lmr 5+brain 1) — memory batch 무관·EXEC-1 전 실선재 확인(별도 조사).
- **Cosmile candidate CHECK DB강제**(P-b) — prisma `@default("candidate")`만·`CHECK(status IN …)`는 EXEC-1 Cosmile migration SQL(raw)/app-level validation 필수.
- watch-1(shadow code 원격검증) — 3 브랜치 push됨(fc 최신 `05bd05f`)·판정=검수자.

## 7. EXEC-1 gate 준비 가능 여부
- **코드-레벨 gate 정합·field-level 정합 = 준비 완료.** BUG-1/2/3 CONFIRMED + compat scrub gap CLOSED·gate 57/57·field-complete(SIASIU/Cosmile LTM·candidate)·계약 정합.
- **EXEC-1 execution 승인 요청 준비 가능 상태** — 단 EXEC-1 실행은 **여전히 별도 gate·별도 Leo 승인**이며, 실행 전 P-b(Cosmile CHECK raw SQL) 반영 + watch-2(runner 선재 확인) + P-c(실 데이터 pre-scan 별도 승인)가 EXEC-1 gate 안에서 처리됨.
- ★**이 follow-up은 EXEC-1 실 migration/prod/live/hard reject 승인이 아니다.**

## 무결성
shadow patch only · 실 migration 0 · 실 데이터 pre-scan 0 · repair 적용 0 · prod DB 0 · prod secret 0 · subject_ref backfill 0 · live 배선 0 · hard reject 0 · **product repo main merge 0** · schema code main merge 0 · fingerprint 무변경 · 실 DB 무접촉 · 본 report만 foundation-docs commit/push.
