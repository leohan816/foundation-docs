# COSMILE MEMORY V3-11 — Implementation Evidence Report

> 작성: foundation-control / **fable-builder** 스킬(분기 reference `implementation-report-template.md` 로드 적용) · 2026-07-06.
> anchor: mapping/plan/test-design `3f6596a` · gate `cdede5d`(D1~D4) · P1 `3b52994` · 사전 `DATA_DICTIONARY_CANONICAL`. Cosmile shadow commit **`b744871`**(branch shadow/m4-cosmile-memory·main 3ba91e0 무변경).
> ★"완료"가 아니라 **증명한 것/증명하지 않은 것**을 구분한다(§7/§8).

---

## 1. 구현 범위
V3-11 provider-independent scope 7항 이행: recommendation_id threading·RecommendationEvent 얕은 상호작용 계약·rec_outcome order_item attribution(last-touch)·anonymous_ref downstream·MemoryFactCandidate 생성 규칙·adverse/safety gate 최소·provider-independent tests.
- **이행하지 않은 절(설계상 이월)**: DB 영속(prisma model/migration)·rec_outcome_feedback semantic 추출 **로직**(V3-04 §9.5는 type만)·LTM 승격 pipeline·stitching·multi-touch — 전부 scope 밖(§7 excluded).

## 2. 수정 파일 (Cosmile shadow `b744871`)
| 파일 | 요약 |
|---|---|
| `app/src/lib/ids.ts` (NEW) | rec_v3_+ULID·subj_v2_·anon_v3_ 단일 정본 생성기·L1 fail-closed |
| `app/src/lib/attribution.ts` (NEW) | last-touch(D1) |
| `app/src/lib/adverse.ts` (NEW) | D4 severity 매핑·§5.3 matrix effect |
| `app/src/lib/memoryCandidate.ts` (NEW) | R-C1 tombstone/must_not_reappear·consent gate(D2)·demotion 예외(P1) |
| `app/src/lib/ranking.ts` (NEW) | RANKING_SIGNALS allowlist(margin 배제·D3) |
| `app/src/lib/analytics.ts` (NEW) | marginBandDistribution(analytics only·D3) |
| `app/src/lib/identity.ts` (NEW) | assertXor(subject_ref XOR anonymous_ref) |
| `app/src/types/recommendationEvent.ts` (NEW) | RecommendationEvent·event_type enum |
| `app/src/types/recOutcome.ts` (NEW) | rec_outcome_event/feedback·attribution_mode·semantic_label |
| `app/scripts/v3_11.vitest.ts` (NEW) | 35 provider-independent tests |
| `app/package.json`·`package-lock.json` | ulid dep 추가 |

## 3. 수정하지 않은 파일 (diff scope 선언 대비 일치)
- ★`app/prisma/schema.prisma`·migrations — **무수정**(DB 이월). `foundation-memory-deanon.mjs`(identityRef·de-anon) 무수정. 기존 commerce 모델·vitest 3종 무수정. `.env.example`은 COSMILE_SUBJECT/FUREF_SECRET 키가 **이미 존재**(값 0)라 변경 0. diff scope = src/lib(7)+src/types(2)+scripts(1)+pkg(2)로 주장과 일치.

## 4. 계약 매핑
`COSMILE_MEMORY_V3_11_CONTRACT_TO_CODE_MAPPING_20260706.md`(`3f6596a`). 공백 행 0. enum은 const-array 단일 소스로 착지(값 재선언 0).

## 5. 계약 이탈(deviation)
- **없음.** 계약과 다른 필드/값 필요 0·임의 우회 0. 단 2개 **결정 반영**(이탈 아님): ULID=`ulid` 패키지(Leo 승인)·attribution session-mode는 rec 미매칭+동일세션을 `session`(rec_id null)으로 최소 표현(R-K2 정합).

## 6. 테스트 결과
- **pure(provider-independent): 35/35** — 재현: `cd app && NODE_ENV=test ./node_modules/.bin/vitest run scripts/v3_11.vitest.ts`.
- db-touch: **미실행**(scope 밖·이월).
- safety invariant(T10 demotion 예외·T12 matrix·T14 consent) : 위 35에 포함(pure 층·별도 카운트 관점 3 describe).
- regression: 기존 vitest **10/10**(foundation-memory-deanon + candidate-status·baseline 무손상·delta 0).
- 테스트 diff에 기대값/oracle 변경: **없음**(신규 테스트만·기존 테스트 무수정·skip/xfail 0).

## 7. 무엇을 증명했는가 (라벨 층위)
- **순수 로직 계약 준수**(pure): rec_id 형식(rec_v3_+ULID·구 rec_v3_+32 거부)·subject_ref env-HMAC(하드코딩 아님·Option B)·anon_v3_ 형식/계층 구분·last-touch 귀속·XOR·tombstone/must_not_reappear 선행 차단·**safety fact demotion 예외(direction=safety OR safety_flag 부착)**·D4 severity 매핑(mild 거부)·§5.3 matrix effect·margin ranking 배제·consent/anon promotion 차단.
- ③쌍 oracle(과거 결함값 문자 거부) 15건으로 **잘못된 구현이 통과 못 함**을 보증.

## 8. 무엇을 증명하지 않았는가 (★과장 방지)
- ★**DB 영속·조회 미검증**: 전부 순수 함수. 실제 저장/join/CHECK 제약은 **미구현·미검증**(DB-touch gate).
- ★RecommendationEvent/rec_outcome는 **type/contract만** — 실제 emit 배선·Cosmile 이벤트 flow 연결 **없음**.
- ★semantic 추출 **로직** 미구현(V3-04 §9.5 owner 선언·type만).
- ★matrix effect는 **문자열 표현**·실제 gate 집행(추천 차단 UI/flow) 미배선. consent gate는 pure predicate·실제 promotion pipeline 미배선(이월).
- ★L1 fail-closed prod 경로는 **로직 존재**하나 prod env에서 미실행(테스트는 opts.secret/NODE_ENV=test로 검증).
- ★attribution session/unattributed/unknown 경로는 최소 표현·부분 환불/bundle 실데이터 시나리오 미검증.

## 9. 남은 risk
- DB 착지 시 enum/CHECK/DEFAULT를 사전 자구 대조해야(watch-1 재발 방지) — 이번 미포함.
- matrix effect 문자열이 실제 gate 코드와 연결될 때 단방향(재대입 금지) 구조 유지 필요.
- ULID 시간정렬성이 last-touch created_at 대체 아님(created_at 별도 유지) — 의존 시 위험.

## 10. 다음 검수 질문 (리뷰어 공격 지점·delta 입력)
1. `demotionEligible`의 safety_flag 검사가 **모든 safety_flag 값**(safety_resolved 포함)을 예외 처리하는데, safety_resolved fact는 강등 가능해야 하지 않나? (사전 §5.2 lifecycle 대조 필요)
2. `lastTouchAttribution`의 created_at 문자열 정렬이 타임존/형식 혼재 시 오정렬 가능 — ISO 강제 계약이 있나?
3. `severityOf` unknown→severe fail-closed가 **정상 신호 오분류**(오탐 severe)를 만들지 않나? matrix 밖=fail-closed 원칙과 실용 균형?
4. anon_v3_/subject_ref가 keyed HMAC 결정적 — 같은 입력 재식별 위험 대비 salt/rotation 계약이 §1.1에 있나?
5. RANKING_SIGNALS allowlist가 **실제 ranking 코드에서 참조**되는지(dead constant 아닌지) — 배선 미구현이라 현재는 계약 선언만.

## 11. rollback
- Cosmile shadow: `git -C /home/leo/Project/Cosmile revert b744871` 또는 `git reset --hard 6c6aa7f`(shadow만). 신규 파일 9 + test 1 + pkg 2 제거·ulid 의존 롤백. main 무영향(merge 0).

## 무결성
V3-11 provider-independent 구현 · Cosmile shadow `b744871`(main merge 0) · pure 35/35·regression 10/10 · prisma/DB/migration/prod/live/secret 무접촉 · 단일 정본 생성기(identityRef 재사용 0·split-brain 방지) · reward hacking 0(skip/기대값 하향/공허 assertion 0) · §8에 미증명 범위 정직 명시 · DB 착지·emit 배선·LTM pipeline = 이월(후속 gate).

---

## Addendum — V3-11A patch batch (2026-07-06 · Cosmile shadow `af26f94`)
> V3-11A snapshot review `V3_11A_SNAPSHOT_NEEDS_PATCH`(F1/F2/F3) 이행. ★코드 수정만·DB/prisma/prod/live/main/secret 0.

| finding | patch | 결과 |
|---|---|---|
| **F1** semantic_label divergence | `recOutcome.ts` SEMANTIC_LABELS = 사전 §2.12 10값(**usage_question_safety 복원**·adverse skin/other 분리·unclear)·허위 주석 정정 | ✓ T15 4케이스(adverse_reaction/unknown 거부·usage_question_safety 존재) |
| **F2** adverse enum inline | `recOutcome.ts`가 `adverse.ts`의 AdverseSeverity/AdverseCertainty **import**(inline 재선언 0) | ✓ single-source |
| **F3-T4** not_in_memory_layer 미검증 | `memoryCandidate.isMemorySubjectKeyAllowed` gate + canCreateCandidate 배선(anon_v3_ subject_key 거부) | ✓ T4 실검증 2케이스 |
| **F3-T13** 과대표기 | test 이름/설명을 "constant-level·runtime enforcement deferred(ranking wiring 단계 재증명)"로 정직화·margin allowlist 배제는 계속 검증 | ✓ |
| **P-d** created_at 문자열 정렬 | `attribution.ts` epoch 파싱(혼합 TZ 정확)·ISO 위반 throw·전 매칭 이벤트 선검증 | ✓ T16 2케이스 |

- 테스트: **43/43**(기존 35 + 신규 8)·regression **10/10**·reward-hacking 0(skip/xfail/기대값 하향 0).
- ★**이월 LIMIT(scope 확대 금지)**: HMAC secret_version/rotation·canPromote 승격시점 tombstone 재검증·full DB lifecycle·T12 branch 보강 = V3-11B/후속. RANKING_SIGNALS runtime enforcement = ranking wiring 단계.
- Cosmile shadow `af26f94`(구 b744871·main 3ba91e0 무변경). public snapshot 4파일 동기화(정본과 diff 0).
