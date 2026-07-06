# COSMILE MEMORY V3-11A — Snapshot Code Review (fable-sentinel)

> 검증자: fable-sentinel(독립·자기검수 금지) · 2026-07-06 · 대상: public snapshot `cosmile-v3-11-shadow-snapshot/`(정본=private Cosmile shadow **`b744871`**).
> ★검수만 — 코드/snapshot/Cosmile 수정 0 · 문제는 finding으로 보고(직접 수정 안 함).
> anchor: 사전 `DATA_DICTIONARY_CANONICAL` · gate `cdede5d`(D1~D4) · P1 `3b52994` · mapping/test/evidence `3f6596a`/`963073a`.
> 방법: ★이 코드는 Control 작성 → 제 주장 불신·**독립 검증 에이전트 2채널(제3 채널)** + 최고위험 finding(F1) **직접 재확인**. 분기 reference(contract-review·safety-review·review-classification) 로드 적용.

---

## 1. Final verdict: **V3_11A_SNAPSHOT_NEEDS_PATCH**

계약/생성기/attribution/safety gate/adverse/ranking/analytics·테스트 정직성은 **대체로 PASS**이나, **safety-relevant 계약 divergence 1건(F1)**이 실재한다: `semantic_label` enum이 사전 §2.12와 불일치하며 **`usage_question_safety`("계속 써도 돼?"·safety-first 분리) 라벨을 누락**하고, 주석은 "사전 §2.12 소유"라 **허위 주장**(reported≠actual). 전부 문서/코드-레벨 patch로 해소 가능하므로 HOLD/BLOCKER 아닌 NEEDS_PATCH.

## 2. Executive summary
- ★자기검수 금지 원칙이 실제로 결함을 잡음: Control이 evidence에서 "§2.12 소유"라 쓰고 값 대조를 누락한 semantic_label divergence를 **제3 채널이 적발**(제가 직접 재확인).
- reward-hacking 신호 0(skip/xfail/tautology/기대값 하향 없음)·테스트는 정직·구체 값 assert. snapshot은 정본 b744871과 **10파일 전부 동일**(충실).
- 결함은 **provider-independent 계약 층**(type/enum·테스트 커버리지)에 국한·live safety hole·regression 삭제·write 경로 없음.

## 3. Snapshot integrity — PASS
- Q1: snapshot 10 소스 파일 **전부 `git show b744871`와 diff 0**(reported=actual·충실). Q13: `package.json.diff` = **ulid dep만**(react-dom은 콤마 추가·버전 불변)·PII/secret 0. Q3: `identityRef` 언급은 "혼동 금지" **주석**(재사용 0)·생성기 3종 자체 구현.

## 4. Contract compliance table
| Q | 항목 | 판정 | 근거 |
|---|---|---|---|
| Q2 | ids 생성기(rec_v3_+ULID26·subj_v2_+HMAC[:32]·anon_v3_)·단일 소스·L1 fail-closed | **PASS** | ids.ts:25/33/42·정규식 정확·unknown env→prod throw |
| Q4 | attribution D1 last-touch(최근)·multi-touch 없음·organic→null | **PASS** | attribution.ts:17-27 |
| Q5 | anon_ref downstream·assertXor | **PASS**(caveat) | identity.ts:3-4·타입 계약 XOR쌍. ★attribution 결과 타입은 anon_ref 미포함(주석 과대) |
| Q6 | tombstone/must_not_reappear precheck·consent/anon block·P1 demotion 예외 | **PASS**(flag) | memoryCandidate.ts:21-37. ★`canPromote`는 fact-state 인자 없어 **승격 시점** tombstone 재검증 불가(caller 의존) |
| Q7 | D4 severity 매핑·§5.3 matrix effect | **PASS** | adverse.ts:9-29·§5.3 셀 전부 커버 |
| Q8 | ranking에 margin_band 없음·safety 포함 | **PASS** | ranking.ts:4-14 |
| Q9 | analytics margin_band read-only | **PASS** | analytics.ts:4-8 |

## 5. T1~T14 test compliance table
| T | 상태 | 비고 |
|---|---|---|
| T1 rec_id | ✓ 완전 ③쌍 | rec_v3_+32·UUID 거부(최강) |
| T2 null attribution | ✓(T5에 병합) | |
| T3 subject_ref | ✓ (③쌍 부분) | 특정 결함값 거부 없음(Option A prefix 미부정) |
| T4 anon not_in_memory_layer | ⚠ **부분** | ★format+prefix만·**memory 계층 유입 금지 invariant 미검증**(블록명 과대) |
| T5 last-touch | ✓ | |
| T6 anon downstream | ✓ | |
| T7 xor | ✓ | |
| T8/T9 tombstone/must_not_reappear | ✓ | |
| T10 safety demotion 예외 | ✓ | ★`safety_resolved` 값 미검증(safety_frozen만) |
| T11 adverse severity | ✓ 완전 ③쌍 | mild 거부 |
| T12 matrix effect | ⚠ 부분 branch | moderate/contradicted/default 미검증 |
| T13 margin analytics/not-ranking | ✓(tautology 위험) | ★§8 참조 |
| T14 consent/anon promotion | ✓ | |

## 6. Safety / adverse review
- **PASS**: P1 demotion 예외(`direction!=='safety' && safety_flag==null`)·§5.3 matrix fail-closed·adverse=severe 상위·margin이 safety 하향 경로 0.
- ★**FAIL(F1)**: `semantic_label`이 사전 §2.12의 **`usage_question_safety`(safety-first 분리 라벨)를 누락** — "계속 써도 돼?"류를 safety-first로 라우팅하는 계약 라벨이 코드 enum에 없음. 추출 로직 미구현(deferred)이나 **type 계약 자체가 safety 라벨을 잃음** → 후속 로직/DB CHECK가 이 잘못된 enum을 상속하면 safety 경로 누락.
- **공격 지점 #1/#3 = NOT-A-DEFECT**(demotionEligible·unknown→severe 둘 다 계약-correct fail-closed). 단 safety_resolved 실 deactivation 경로 미구현(deferred·미검증).

## 7. Reward hacking review — **CLEAN**
- `.skip/.todo/xit/.only` **0** · tautology(`expect(true).toBe(true)`) **0** · 기대값 하향 **0** · 구체 값 assert(reason code·matrix effect·severity 문자열)·enum `toEqual` 전배열 lock. 약점은 **커버리지 폭**(T4/T12)이지 reward-hacking 아님.

## 8. Findings
- ★**F1 (safety-relevant·NEEDS_PATCH)**: `recOutcome.ts:20-22` `SEMANTIC_LABELS`(6값) ↔ 사전 §2.12(10값) **divergence**. `usage_question_safety` 누락·`adverse_reaction`이 skin/other 미분리·`unknown`≠`unclear`·`usage_question_general`/`avoid_intent` 누락. 주석 "사전 §2.12 소유" **허위**(reported≠actual). [P5 코드판 재발 + safety 라벨 손실]
- **F2 (split-brain·patch)**: `recOutcome.ts:30-31` `adverse_severity`/`adverse_certainty` **inline 재선언**(adverse.ts import 0). 값 현재 일치하나 코드 자신의 ids.ts 경고(단일 정본) 위반.
- **F3 (test 과대·patch)**: T4 `not_in_memory_layer` 미검증(format만)·T13 `RANKING_SIGNALS`는 **test만 참조하는 dead constant**(비-test src 참조 0) → T13은 정적 배열 membership tautology·**실 ranking 경로의 margin 배제(D3)는 미증명**.
- **F4 (minor·deferrable)**: created_at **문자열 정렬**(ISO 강제 없음·주석만·attribution.ts:19)→혼합 TZ 시 last-touch 오정렬. HMAC **secret_version/rotation 부재**(§1.1·코드 모두)→correlatable pseudonym·영구 미회전. `canPromote` 승격 시점 tombstone 재검증 불가. T12 branch·T10 safety_resolved 미검증.

## 9. Required patches (직접 수정 안 함·보고만)
1. **P-a(최우선·safety)**: `recOutcome.ts` `SEMANTIC_LABELS`를 사전 §2.12 전체 집합으로 정정(**`usage_question_safety` 복원** + skin/other 분리·unclear·usage_question_general·avoid_intent). 허위 "§2.12 소유" 주석 정정. → 사전 단일 소스에서 import 권장.
2. **P-b**: `recOutcome.ts` adverse_severity/certainty를 `adverse.ts`의 `AdverseSeverity`/`AdverseCertainty` **import**(inline 재선언 제거).
3. **P-c**: T4를 실 memory-layer 유입 금지 gate+test로 강화하거나 블록명 정정(과대표기 제거). T13은 "constant membership"임을 명시하고 **D3 실 enforcement는 ranking engine 배선 시 재증명** 조건으로 이월.
4. **P-d(이월 가능)**: created_at ISO 강제(파싱/정규화)·HMAC secret_version/rotation 계약(§1.1 개정)·canPromote tombstone 재검증·T12/T10 branch 보강.

## 10. V3-11B DB Integration gate 진행 가부
- ★**진행 불가(BLOCKED until P-a/P-b)**. 이유: DB 통합은 이 enum들을 **CHECK 제약으로 굳힌다**(watch-1 교훈: 틀린 값을 제약으로 영속화). F1(잘못된 semantic_label·safety 라벨 누락)·F2(중복 enum)를 **DB CHECK 작성 전에** 정정해야 오염 전파를 막는다. P-c/P-d는 병행/이월 가능하나 P-a는 선행 필수.

## 11. Evidence paths & commit hashes
- snapshot 정본: Cosmile `b744871`(private) · public 사본 `cosmile-v3-11-shadow-snapshot/`(foundation-docs). 계약: `DATA_DICTIONARY_CANONICAL`(§1.1·§2.4·§2.5·§2.12·§2.13·§5.2·§5.3).
- F1 근거: `recOutcome.ts:20-22` ↔ dict §2.12(usage_question_safety 코드 0·사전 1·직접 grep 확인). F2: `recOutcome.ts:30-31`. F3: `ranking.ts`(test-only 참조).
- 독립 검증 2채널 + 직접 재확인. 판정 **V3_11A_SNAPSHOT_NEEDS_PATCH**.

## 무결성
snapshot code review only · 코드/snapshot/Cosmile 수정 0 · 제3 채널 독립 검증 + F1 직접 재확인 · reward-hacking 0 · snapshot 충실(b744871 동일) · **verdict NEEDS_PATCH**(F1 safety-relevant enum divergence·F2 중복·F3 test 과대) · V3-11B는 P-a/P-b 선행 후 진행 · 직접 patch 미수행(finding 보고).
