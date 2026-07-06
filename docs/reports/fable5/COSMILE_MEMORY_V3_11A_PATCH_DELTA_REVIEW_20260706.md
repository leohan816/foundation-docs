# COSMILE MEMORY V3-11A — Patch Delta Review (fable-sentinel)

> 검증자: fable-sentinel(독립·자기검수 금지) · 2026-07-06 · delta review(F1/F2/F3/P-d 닫힘 확인·전체 재설계 아님).
> 대상: 원 review `3f9aaf1`(NEEDS_PATCH) → patch `d11b6ff` · 정본 코드 Cosmile shadow **`af26f94`**(public snapshot=정본 동일·확인).
> 방법: ★patch는 Control 작성 → 제 보고 불신·**정본 af26f94 git show 값-레벨 직접 대조** + **독립 에이전트(제3 채널) 적대적 regression hunt**. delta-review·safety-review reference 적용.

---

## 1. Final verdict: **V3_11A_PATCH_CLOSED_WITH_LIMITS**

F1/F2/F3-T4/F3-T13/P-d **5건 전부 CLOSED**(양 채널 일치)·patch가 만든 **regression 0**. 잔여는 **추적 LIMIT**(신규 INFO 1 + 명시 이월 항목)뿐·open defect 아님. P-a/P-b가 닫혀 **V3-11B DB Integration 차단 해제**.

## 2. Executive summary
- 직접 대조(정본 af26f94)와 독립 에이전트(before 7252e98 ↔ after d11b6ff)가 **독립적으로 동일 결론**: 5건 CLOSED·0 regression.
- ★F1(safety-relevant): `SEMANTIC_LABELS`가 사전 §2.12 10값과 **정확히 일치**·`usage_question_safety` 복원·`adverse_reaction`/`unknown` 제거·주석 정직화(허위 "소유" 주장 제거).
- 테스트 43/43·regression 10/10 재현(HEAD af26f94)·reward-hacking 0·snapshot=정본 동일.

## 3. F1/F2/F3/P-d delta table
| finding | before(`7252e98`) | after(`af26f94`) | 판정 | 증거 |
|---|---|---|---|---|
| **F1** semantic_label | 6값·`adverse_reaction`/`unknown`·허위 주석 | §2.12 **10값 정확**·usage_question_safety 존재·adverse skin/other 분리·unclear·주석 정직 | **CLOSED** | recOutcome.ts:24-28·10값 각 grep ✓·adverse_reaction 0·semantic엔 unknown 0("unknown"은 §2.9 ATTRIBUTION_MODES만) |
| **F2** adverse enum | inline `"low"\|"moderate"\|"severe"` 재선언 | `../lib/adverse`에서 `AdverseSeverity`/`AdverseCertainty` import·inline 0 | **CLOSED** | recOutcome.ts:4 import·36-37 사용·inline 재선언 0 |
| **F3-T4** not_in_memory_layer | format/prefix만 검증(gate 없음) | `isMemorySubjectKeyAllowed` gate + `canCreateCandidate` 배선·test가 실 gate 호출 | **CLOSED** | memoryCandidate.ts:21(호출)·31-33(gate)·test:34-38(anon subject_key→reject reason 검증) |
| **F3-T13** 과대표기 | "margin_not_in_ranking"(runtime 오해) | describe "constant-level; runtime enforcement deferred"·margin 배제 test 유지 | **CLOSED** | v3_11.vitest.ts:103(rename)·101-102(한계 주석)·104(margin 배제 유지) |
| **P-d** created_at 정렬 | 문자열 비교 sort(ISO 미강제) | `Date.parse` epoch·NaN throw·전 매칭 이벤트 선검증(단일 원소도 throw)·혼합 TZ test | **CLOSED** | attribution.ts:18-26·test:121-126(+09:00 vs Z·toThrow) |

## 4. Tests reproduction
- V3-11: **43/43 PASS**(기존 35 무파손 + 신규 8: T4×2·T15 semantic §2.12×4·T16 created_at×2) — HEAD af26f94에서 재현.
- regression: **10/10 PASS**(foundation-memory-deanon + candidate-status·baseline 무손상).
- reward-hacking: skip/xfail/only **0**·공허 `expect(true)` **0**·신규 assertion 전부 실질(T15 `toEqual` 전배열·T16 특정 rec_id/`toThrow`·T4 ok+reason). ★독립 에이전트도 "none tautological/lowered" 확인.

## 5. Remaining limits (추적·open defect 아님)
- ★**신규 INFO(L-a)**: `isMemorySubjectKeyAllowed`는 **denylist**(`!startsWith("anon_v3_")`). anon_v3_는 정확히 차단·subj_v2_는 정확히 허용(false-positive 0)이나, **기타 non-anon garbage key**(guest_·raw user_id·malformed)도 통과. R-K3(anon 유입) 범위엔 충분하나, 실 memory/ranking engine 배선 시 **subj_v2_ allowlist로 강화** 권장. non-anon garbage 커버 test 없음.
- **이월(patch가 명시 LIMIT로 남김)**: HMAC secret_version/rotation·`canPromote` 승격시점 tombstone 재검증·full DB lifecycle·T12 branch(moderate/contradicted/default)·T10 `safety_resolved` 값·RANKING_SIGNALS **runtime enforcement**(ranking wiring 단계 재증명). 전부 후속 gate.

## 6. V3-11B DB Integration gate 진행 가부
- ★**진행 가능(차단 해제)**. 원 review가 건 조건 = "P-a(F1)/P-b(F2) 선행". 둘 다 **CLOSED** → DB CHECK 제약이 이제 **사전 §2.12 정합 enum**을 굳히게 됨(watch-1 오염 전파 위험 제거).
- ★단 **V3-11B 착수 시 준수**: (1) enum→CHECK 착지 시 사전 자구 재대조(§2.4/§2.5/§2.9/§2.12), (2) L-a(subject_key allowlist)를 DB 제약/입력 검증에 반영 고려, (3) 이월 LIMIT는 각 후속 gate에서 개별 검증. DB/prisma/migration은 별도 non-prod gate·prod/live/main/secret 금지 유지.

## 7. Evidence paths & commit hashes
- 원 review `3f9aaf1`(NEEDS_PATCH) → patch `d11b6ff`(snapshot 4파일 동기화 + evidence addendum) · 정본 Cosmile shadow `af26f94`(main 3ba91e0 무변경).
- 직접 대조: `git show af26f94:app/src/types/recOutcome.ts`(§2.12 10값)·`memoryCandidate.ts`(gate)·`attribution.ts`(epoch)·test 43/43. 독립 에이전트: before 7252e98 ↔ after d11b6ff·5 CLOSED·0 regression·L-a INFO.
- 양 채널 독립 일치. 판정 **V3_11A_PATCH_CLOSED_WITH_LIMITS**.

## 무결성
delta review only · 코드/snapshot/Cosmile 수정 0 · 직접 대조 + 제3 채널 독립 · 5건 CLOSED·regression 0 · reward-hacking 0 · snapshot=정본 동일 · **verdict CLOSED_WITH_LIMITS**(신규 INFO L-a + 이월 LIMIT) · V3-11B 차단 해제(P-a/P-b closed·준수 3항) · 직접 patch 미수행(finding 보고).
