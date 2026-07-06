# COSMILE MEMORY V3-11 — Implementation Execution Plan

> 작성: foundation-control / **fable-builder** 스킬(분기 reference `implementation-execution.md` 로드 적용) · 2026-07-06 · ★계획 only·**제품 코드 수정 0**·Leo 승인 전 착수 금지.
> anchor: gate `cdede5d`(GATE_PASS_WITH_LIMITS·D1~D4 CONFIRMED) · P1 `3b52994` · design patch `8f9b1a8` · Fable `bd01ba1` · 사전 `DATA_DICTIONARY_CANONICAL`. Cosmile `prisma/schema.prisma`·`src/lib`·`src/types`.

---

## 1. Executive summary
V3-11(Learning Commerce Memory Loop 최소 구현)을 **바로 코딩하지 않고** fable-builder 절차로 준비: 계약 원천 고정 → contract-to-code mapping(별도 산출) → 실패하는 테스트 먼저(별도 산출) → 최소 구현(Leo 승인 후). ★이번 scope = **provider-independent TS 계약·로직·테스트만**(DB migration·live·prod = 이월).

## 2. V3-11 allowed scope (dev/local·provider-independent)
1. recommendation_id threading(`rec_v3_`+ULID26 단일 생성기)
2. RecommendationEvent 얕은 상호작용 계약(TS type·소유=V3-03·R-K7)
3. rec_outcome_event order_item 단위 attribution(**last-touch**·D1)
4. anonymous_ref downstream 유지(R-K3·commerce 계층·memory 직접 유입 금지)
5. MemoryFactCandidate 생성 규칙(R-C1 tombstone/must_not_reappear 선행)
6. adverse/safety gate 최소(D4 severity 매핑·§5.3 matrix effect·INV-DB-2 safety 예외)
7. provider-independent tests(순수 로직·DB 무접촉)

## 3. Explicitly excluded / deferred
- DB-touch integration tests → 별도 non-prod gate
- prisma model/migration·prod DB migration·live emit·real secret/Vault·subject_ref prod backfill·hard reject activation·external release·main merge without approval
- multi-touch attribution(V3 backlog)·margin_band ranking signal·anon→login memory promotion(consent 전)·COSMILE-4 실 DDL(G13)·LTM full promotion pipeline

## 4. Affected files inventory (수정 예정·축 분리)
**NEW (provider-independent·src):**
- `src/lib/ids.ts` — recommendationId(rec_v3_+ULID)·subjectRef(subj_v2_)·anonymousRef(anon_v3_) **단일 정본 생성기**
- `src/types/recommendationEvent.ts` — RecommendationEvent + event_type enum(const-array)
- `src/types/recOutcome.ts` — rec_outcome_event·rec_outcome_feedback 계약 type
- `src/lib/attribution.ts` — last-touch attribution(D1·pure)
- `src/lib/memoryCandidate.ts` — createCandidate + R-C1(tombstone/must_not_reappear precheck)·promotionGate(consent·D2)·demotionEligible(P1 safety 예외)
- `src/lib/adverse.ts` — severityOf(D4)·matrixEffect(§5.3)
- `src/**/__tests__/*.vitest.ts` (또는 scripts/*.vitest.ts) — provider-independent 테스트
**IMPORT (재발명 금지):** 없음(V3 키 생성기 부재 확인 → 신규·단일화). ★`identityRef`(de-anon)와 혼동 금지.
**NOT TOUCHED (diff scope 밖):** `prisma/schema.prisma`(model 추가=이월)·기존 commerce 모델·`foundation-memory-deanon.mjs`·기존 vitest 3종(회귀 baseline).

## 5. 구현 순서 (권장·Leo 승인 후)
① 계약 원천 고정(본 문서 anchor) → ② contract-to-code mapping(완료·별도) → ③ **실패하는 provider-independent 테스트 먼저**(완료·별도) → ④ 최소 구현(ids→types→attribution/adverse→memoryCandidate) → ⑤ 테스트 통과 → ⑥ 회귀(기존 vitest 3종·delta) → ⑦ evidence report.
- ★선언=배선 자기검사: 상수/enum 선언 후 `grep 참조≥1`(dead constant 금지·F-1 재발 방지).

## 6. STOP conditions (구현 중 설계로 반환)
- 계약 문서 간 모순 발견(같은 개념 다른 값·같은 트리거 다른 효과) → 임의 선택 금지·STOP
- 계약에 없는 필드/값 필요(placement·nullability 미정) → STOP·계약 보강 요청
- safety 약화 선택지밖에 없음 → STOP(sentinel safety-review로)
- required field가 contract에 없음 → STOP
- test 설계 불가 → STOP
- scope가 pre-prod/live를 건드림 → STOP
- failure-escalation 3회 중단 발동 → 공유 reference 규칙
- ★현재 delta review에서 P1~P12 CLOSED·매핑 공백 0 → **알려진 STOP 조건 미발생**(구현 착수 가능 상태).

## 7. Reward hacking guard (구현 시 준수)
- 테스트 기대값 하향 금지·snapshot/fixture로 초록 만들기 금지·skip/xfail 추가 금지·oracle 약화 금지·선재 실패 편승 금지·판별 우회 금지. `git diff`의 테스트 `-`줄 assert/expected/threshold grep → 각 건 계약 근거 요구. (상세 = test-design 산출물 §reward hacking.)

## 8. Whether actual coding can begin
- ★**설계·매핑·테스트 설계는 준비 완료**(STOP 0). 그러나 **실제 코딩 착수 = Leo 승인 필요**(본 라운드는 준비). fable-builder 규율: 계획 산출 후 승인 전 코드 수정 0.

## 9. Required Leo approval before code changes
1. V3-11 scope(§2 IN/§3 이월) **최종 승인** + 착수 지시.
2. ULID 방식(dev dep vs 내장) 및 `COSMILE_SUBJECT_SECRET`/`COSMILE_FUREF_SECRET` env 키 반영(.env.example key-only) 승인.
3. 착수 시 별도 fable-builder 구현 batch로 진행.

## 무결성
implementation plan only · 코드 0 · DB/migration 0 · prod/live/main/secret 0 · anchor 실확인 · affected files 축 분리·diff scope 선언 · STOP 조건 명시 · reward hacking guard 명시 · Leo 승인 전 착수 금지.
