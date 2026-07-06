# COSMILE MEMORY V3-11 — Test Design Before Code (실패 상태로 먼저 정의)

> 작성: foundation-control / **fable-builder** 스킬(분기 reference `test-design-before-code.md` 로드 적용) · 2026-07-06 · ★테스트 **설계** only·코드 0·테스트 파일도 아직 미작성(설계 매트릭스).
> anchor: 사전 `DATA_DICTIONARY_CANONICAL`(§1/§2/§5) · gate `cdede5d`(D1~D4) · P1 `3b52994`. ★모든 케이스는 구현 전에 **실패**해야 정상.

---

## 1. 원칙
- 계약의 reject/pass 기준을 **케이스 매트릭스**로 먼저 뽑는다(구현이 이를 향해 수렴).
- 모든 형식/enum 검증 = **③쌍**: 정답 수락 + 오답 거부 + **경계의 구체 오답**(과거 결함값·계약 금지값)을 문자 그대로 거부.
- 공허 assertion 금지(항상 참 구조 스캔)·커버리지 = **결함 축** 커버.
- 4층 분리 라벨: **provider-independent(pure)** / DB-touch(이월) / safety invariant(별도 카운트) / regression(baseline delta).

## 2. Provider-independent test matrix (구현 전 실패해야 함)
| # | 테스트 | 수락(pass) | 거부(구체 오답) | 결함 축 |
|---|---|---|---|---|
| T1 | `rec_id_format` | `rec_v3_`+ULID(26) | ★`rec_v3_`+32(구 표기·superseded)·UUID·bare32 거부 | 형식 단일화(P4) |
| T2 | `rec_id_null_attribution` | organic/unattributed/unknown → rec_id=NULL 허용 | NOT NULL 강제 시 실패(구 V3-04 선언) | nullability(R-K1) |
| T3 | `subject_ref_format` + `subject_ref_env_hmac` | `subj_v2_`+HMAC[:32]·env secret 변경 시 값 변경 | 하드코딩 secret·Option A(`FOUNDATION_SUBJECT_REF_SECRET`) 파생 거부 | Option B 상속(P11) |
| T4 | `anon_ref_format` + `anon_ref_not_in_memory_layer` | `anon_v3_`+opaque32·commerce 계층만 | memory_fact_candidate.subject_key에 anon_ref 직접 유입 거부 | 계층 경계(R-K3) |
| T5 | `attribution_last_touch` | 다중 rec 중 **last-touch** 단일 귀속(D1) | first-touch/multi-touch 결과 거부 | D1 확정값 |
| T6 | `anon_downstream_signature` | 하류 함수 시그니처에 anonymous_ref 인자 존재 | 인자 누락 시 소실 = 실패 | P4 코드판 소실 |
| T7 | `xor_subject_anon` | subject_ref XOR anonymous_ref 정확히 1 | 둘 다/둘 다 null 거부 | XOR CHECK |
| T8 | `candidate_tombstone_precheck` | 생성 전 tombstone/must_not_reappear 조회 선행 | 조회 없이 생성 = 실패 | M2 규율(P3) |
| T9 | `must_not_reappear_block` | must_not_reappear=true fact 재생성 거부 | 삭제 fact가 fresh candidate로 부활 = 실패 | tombstone 부활(P3) |
| T10 | `safety_fact_demotion_exempt` | direction=safety **또는** safety_flag 부착 fact는 evidence 문턱 강등 대상 아님 | direction≠safety **AND** safety_flag=null만 강등 대상 — safety fact 강등 시 실패 | ★P1 safety 예외(safety invariant 층) |
| T11 | `adverse_severity_map` | D4 매핑(자극/따가움=low·중단/악화=moderate·붓기/발진/의료/알러지=severe) | 다른 매핑 거부 | D4 확정 |
| T12 | `adverse_matrix_effect` | §5.3 severity×certainty 효과(single low=caution_candidate·severe=safety_block) | 3문서 상이 효과(구 SO-1/§5/§7) 거부 | P2 단일 정본 |
| T13 | `margin_band_analytics_only` + `margin_not_in_ranking` | margin_band를 analytics read에서만 사용 | recommendation ranking 입력에 margin 등장 = 실패 | D3 |
| T14 | `consent_before_promotion` + `anon_no_promotion` | 명시 동의 후에만 promotion·anon은 promotion 차단 | consent 없이 promotion·anon promotion = 실패 | D2 |

- ★safety invariant 층(T10·T12·T14)은 **별도 카운트**(pure 합산 금지). infra-gate/early-return 케이스는 PASS 분모 분리.

## 3. 양방향 oracle 강제 (§2 test-design)
- 각 형식/enum 테스트(T1/T3/T4/T11)는 **과거 결함값을 문자 그대로** 거부 케이스에 포함(예: T1은 `'rec_v3_'+ '0'*32` 거부·T11은 `mild` 거부). 존재/타입 확인만으로 통과 금지(공허 assertion 스캔).

## 4. 커버리지 축 (케이스 수 아님)
key-level vs value-level · single vs repeated(certainty) · 정상 vs 특례(anon·organic) · safety vs non-safety · 한국어/영문 신호. ★T10은 **value-level**(safety_flag 부착 fact)까지 — direction만 보는 key-level 커버는 P1 gap을 놓친다(F-2 교훈).

## 5. 테스트 실패 시 판정 (코드 vs 테스트)
계약 원문(사전 §N) 우선 판정 → 코드 어긋나면 코드 수정·테스트 오독이면 테스트 수정(+오독 지점 보고). ★불확실 = STOP·계약 소유자 질문(TEST_MEANING_POLICY 원칙).

## 6. Reward hacking guard (자기 diff 스캔·red flag)
1. 기대값 하향(assert 상수를 실패값으로) 2. snapshot/fixture로 초록 3. 케이스 삭제/skip/xfail 추가 4. oracle 약화(값 비교→존재 확인) 5. 선재 실패 편승 6. 판별 우회(계약 절 인용 없이 테스트 수정). ★기계 감지: `git diff` 테스트 `-`줄에 assert/expected/threshold → 각 건 계약 근거 주석 요구.

## 7. STOP (test 설계 불가 시)
- 계약이 pass/reject 기준을 결정 못 하게 함 → STOP. 현재: T1~T14 전부 사전에 결정값 존재(D1~D4 확정·P1~P12 CLOSED) → **설계 가능·STOP 미발생**.

## 무결성
test design only · 테스트/코드 파일 0(설계 매트릭스만) · ③쌍 oracle·결함 축 커버·4층 분리·safety invariant 별도 카운트 · reward hacking guard 명시 · 사전 정본 기준 · Leo 승인 전 구현/테스트 작성 착수 금지.
