# Sentinel Review Result — V3-11C2 Organic RecOutcomeEvent MVI

> Actor: **Sentinel** (fable5 Sentinel 세션·Level 3) · Target: Cosmile · Date: 2026-07-09 · Return to: **Advisor** (최종 승인 아님).
> Skill: `/fable-sentinel` — `.claude/skills` 미설치 상태라 `/home/leo/Project/skill/fable-sentinel/` references(contract/provenance/review-classification) 직접 로드 적용.
> Read-only 준수: 코드 수정 0 · runtime repo stage/commit/push 0 · schema/migration/DB-write/prod/live/secret 접근 0. 실행 = 로컬 provider-independent vitest·eslint·tsc만.

---

## 1. Verdict: **PASS_WITH_RISK**

구현은 brief·gate plan과 정합하고 Worker 보고의 핵심 주장은 전부 독립 재현됐다. 잔여 리스크는 전부 **승인된 이연(D-O1)·범위 밖 항목·경미 테스트 공백**이며 rework 불요 — 단 **flag-ON 전 unique index 선결**이 Advisor 라우팅에 중요해 PASS가 아닌 PASS_WITH_RISK로 반환한다.

## 2. Findings (심각도순 — 전부 LOW/INFO·NEEDS_PATCH급 0)

| # | 심각도 | 발견 | 근거 |
|---|---|---|---|
| F-1 | LOW | **flag 기본값(env) 분기 자체는 미테스트** — TC2/TC10c는 `flagEnabled:false`를 주입. 실제 기본 경로(`deps?.flagEnabled ?? (process.env.COSMILE_REC_OUTCOME_ENABLED === "1")`)의 env-미설정→OFF는 코드 판독으로만 확인(서비스 :46). 후속에 주입 없는 env-기본 테스트 1건 권장 | `recOutcomeEventService.ts:46` · `v3_11c2_rec_outcome.vitest.ts:60,188` |
| F-2 | LOW | **Worker 보고 lint 수치 편차**: 보고 "25 problems" vs 재현 **23 problems(15 errors, 8 warnings)**. 양쪽 모두 대상 4파일 무관(스코프 eslint = 0 problems·exit 0)이라 결론 불변 — reported≠actual 경미 편차로만 기록 | 아래 §4 출력 원문 |
| F-3 | LOW | **베이스 커밋 표기 편차**: 보고 "HEAD before work: 591e206" vs 현재 실측 base **caba8c6**(사이 커밋 1건 = `docs(agent)` 무관 문서·충돌 0). 작업 diff는 caba8c6 위에 clean | `git log 591e206..caba8c6` = 1건(CLAUDE.md·docs/agent 2파일) |
| F-4 | INFO | Worker 자진 신고 잔여 3건 재확인 — ① strict-XOR로 guest+login 동시 보유 주문은 무기록(brief 승인 동작·test 5) ② 동시성 race(existing-check 비원자 — **unique index는 D-O1로 승인된 이연**·flag-ON 전 필수) ③ group-buy paid 경로(`group-deal/team/[teamId]/mock-complete`) 미훅(brief 범위 밖·기존 sentinel 발견과 일치). 전부 gate plan §LIMITS와 정합 — 정직 보고 확인 | gate plan :62,69,71 |

## 3. Files inspected

- Cosmile 실물: `app/src/lib/ids.ts`(diff 전문) · `app/src/lib/recOutcomeEventService.ts`(전문 121줄) · `app/src/app/api/checkout/mock-complete/route.ts`(전문+diff) · `app/scripts/v3_11c2_rec_outcome.vitest.ts`(전문 193줄)
- 기준 문서: 02_WORKER_BRIEF · 03_SENTINEL_REVIEW_BRIEF · 07_SENTINEL_HANDOFF · V3_11C2 GATE_PLAN(D-O1·LIMITS 절) · WORKER_RESULT · 11_WORKER_RESULT_POINTER

## 4. Diff scope result — **PASS** (출력 원문 기반)

```
branch: shadow/m4-cosmile-memory · HEAD: caba8c6 (main/prod 아님 ✓)
git diff --name-status:  M route.ts · M ids.ts  (+14줄, 2파일)
untracked(V3-11C2): app/scripts/v3_11c2_rec_outcome.vitest.ts · app/src/lib/recOutcomeEventService.ts
  (그 외 untracked 6건 = 07-03/04 사전 존재 docs — 본 작업 무관)
금지 경로(prisma/checkout.ts/types/recOutcome.ts/memoryCandidate/adverse/adapters/foundation/SIASIU/fc): diff·untracked 모두 0 ✓
```
optional `dbtest.py` 미생성 = brief상 optional·미생성 사유(DB 연결 회피) 정당.

## 5. Tests inspected/rerun — **전건 재현**

| 실행 | 결과(원문) |
|---|---|
| `npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts` | **13 passed (13)** — Worker 주장과 일치 |
| `npx vitest run scripts/v3_11c_rec_event.vitest.ts` (회귀) | **10 passed (10)** — 기존 V3-11C 무회귀 |
| `npx eslint <4파일>` | 0 problems·exit 0 |
| `npx tsc --noEmit` (전체) | 에러 7건 전부 `scripts/foundation-memory-deanon.vitest.ts`(사전 존재) — **대상 4파일 0** (파일 분포 uniq 확인) |
| `npm run lint` (전체) | 23 problems(15E/8W) — 전부 사전 존재 파일(F-2) |

**테스트 의미 검증**(약화/조작 헌팅): skip/xfail 0 · 양방향 oracle(정답 수락+오답 거부 — TC1이 `REC_ID_RE` 교차 거부까지) · write shape을 필드 단위 assert(refund 필드 **부재**까지 assert) · 미호출 검증(`calls.length`+`existsArgs.length`) · 기대값 완화 흔적 0. **의미 있는 테스트로 판정.**

## 6. Technical checklist (handoff 25항 — 전항 실물 판정)

diff 한정 ✓ · untracked 의도적 ✓ · schema/migration 0 ✓ · SIASIU 0 ✓ · fc 0 ✓ · prod/live/main/secret 0 ✓ · flag명 `COSMILE_REC_OUTCOME_ENABLED` ✓ · 기본 OFF(`==="1"`) ✓(코드 — F-1 참조) · OFF→write/find 0 ✓(flag check가 XOR/mint/exists보다 선행 — 서비스 :46-47) · `rec_out_v3_`+ULID(26) 전용 생성기·`recommendationId()` 미재사용 ✓ · fail-open+observable ✓(mint 포함 try 커버·TC8 2경로) · DI seam ✓ · prisma lazy import(기본 경로 클로저 내부만) ✓ · `recommendationId=null` ✓ · `attributionMode="organic"` ✓ · XOR 강제(both/neither→xor_violation·write/find 0) ✓ · anonymous ref는 commerce outcome만(memory 계층 import 0 — grep 원문) ✓ · idempotency=orderItemId existing-check ✓ · unique index/migration 미추가 ✓(D-O1 승인 이연 — gate plan :69) · `purchase_complete` 블록 무변경 ✓(diff가 블록 밖 append만) · justPaid gate ✓(route는 무조건 호출하나 `trackOrderOutcomeOnPaid`가 내부 gate — brief TC10 "order-level service helper 경유" 명시 허용 형태·TC10a) · already-paid 재호출→justPaid=false→무발화 ✓ · direct/session/refund/reorder 미구현 ✓ · semantic/V3-11D 미구현 ✓ · 로그=count만(route :39-40)·PII/id 로그 0 ✓ · 필수 10케이스 커버(13 assertions) ✓ · 약화 없음 ✓

## 7. Open questions (Advisor행)

- Q1: F-4①(strict-XOR 무기록)은 brief 승인 동작이지만 guest→login 주문의 outcome 유실이 누적 관측될 경우 stitching 정책(사전 §2.10)과의 연결 시점 결정 필요.
- Q2: group-buy paid 경로 훅은 별도 batch로 계획할지.

## 8. Residual risks

- **flag-ON 선결**: unique index(D-O1 후속 schema gate) 전 flag-ON 금지 — 동시성 이중 기록 가능(코드 존재 확인·승인된 이연).
- 실 DB insert 미실증(DI 경계까지만 — dbtest 미생성·V3-11B CHECK가 DB층 방어) · runtime flag-ON emit 미실증(shadow 단계 정합).
- F-1 env-기본 분기 미테스트.

## 9. Worker report claims — 독립 검증 선언

**핵심 주장 전건을 보고서가 아닌 실물(diff 전문·서비스/테스트 소스 전문·테스트 재실행 원문)로 재검증했다.** 일치 — 13/13·10/10·scoped lint 0·schema 무접촉·범위 준수·자진 신고 리스크의 gate plan 정합까지. 불일치 2건(경미): F-2 lint 수치(25→23)·F-3 base 커밋 표기. 과장·은폐 패턴 미발견 — 특히 "Not proven" 절(라이브 insert·동시성·flag-ON)을 Worker가 스스로 명시한 것 확인.

## 10. 자기검수 절 (Sentinel 6규칙 적용)

- 수행: 본 결과의 모든 상태 주장에 명령 출력 원문 대응(§4/§5) · Worker 주장-실물 대조 = provenance 절차 · 테스트 약화 헌팅 = test-meaning 절차 · verdict = review-classification 기준(PASS_WITH_RISK: rework 불요·추적 리스크 존재).
- 발견·수정: 초안에서 "기본 OFF 검증됨"이라 쓰려다 F-1(주입 방식이라 env 분기 미검증)을 자기 적발 — 코드 판독 근거로 정정 후 LOW 발견으로 분리.
- 확인 안 된 것: 실 DB 동작(의도적 미실행) · Worker의 당시 lint 환경(수치 편차 원인 — 재현 불가·기록만).

## 무결성

read-only 준수 · runtime repo 변경 0(git status 재확인: 검수 전후 동일) · 본 결과/포인터 파일만 foundation-docs commit/push · 최종 승인 아님 — **Advisor 반환**.
