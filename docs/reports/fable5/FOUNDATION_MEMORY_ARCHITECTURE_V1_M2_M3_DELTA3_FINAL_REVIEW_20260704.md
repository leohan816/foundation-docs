# Memory Architecture V1 M2/M3 delta-3 — Fable5 최종 경량 재검증 (FINAL)

> 검증자: **Fable5** (독립·Control self-review 금지) · 2026-07-04 · **판정: APPROVED_WITH_WATCH — M2/M3 FINAL_PASS**
> 대상: delta-3 패치(commit `26d3a91`) — D3-01~08 반영 확인 + 문면 gate 시뮬레이션 (전체 구조 재검토 없음·CLOSED 항목 재논쟁 없음)
> 방법: diff(`907d141..26d3a91`) 전문을 제안서 자구와 1:1 대조 + 독립 시뮬레이터의 7케이스 문면 시뮬레이션 + 잔재 grep 스윕
> 무결성: code change 0 · migration 0 · source repo push 0 · raw 고객 데이터/secret 열람 0

---

## A. Verdict: **APPROVED_WITH_WATCH** → **M2/M3 = FINAL_PASS**

필수 5건(D3-01/02/03/05/06) 전부 제안 자구 그대로 반영·신규 모순 0. WATCH 3건(D3-04/07/08)도 반영 확인. 잔여는 계약 내용이 아닌 **문서 상태-라벨 3건**(§E) — M4/M5 설계 착수에 영향 없음.

## B. 읽은 문서
- 제안서: `docs/reports/fable5/FOUNDATION_MEMORY_ARCHITECTURE_V1_DELTA3_PATCH_PROPOSAL_20260704.md` (`907d141`)
- 패치 보고: `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M2_M3_DELTA3_PATCH_20260704.md`
- 패치 본문 4: M3(`MEMORY_CONTEXT_CONTRACT_V1`, v1.2) · M2(`COMMON_SERVICE_MEMORY_CONTRACT_V1`, v1.2) · 앵커(`FOUNDATION_SERVICE_MEMORY_ARCHITECTURE_V1`) · checklist — 전부 HEAD `26d3a91`
- diff `907d141..26d3a91` 전문

## C. D3-01~D3-08 반영 확인표

| issue | 반영 | 확인 내용 |
|---|---|---|
| D3-01 | ✅ | stated_concerns → **ConditionCategory 8값**(`_CONDITION_KW` 정본·"FactTypeRegistry 아님" 명기) — `dryness` 등 정상 echo 값 pass |
| D3-02 | ✅ | catalog item 허용 필드 표 신설(product_id 필수·slug·name/brand/category ≤128+PII스캔·concerns/grounding enum-bound) · **match_reason 자유문장 금지** · "모두 opaque refs" 불릿에 catalog 예외 자구 동반 반영 |
| D3-03 | ✅ | session_ref = `sess_ref_*`/keyed-HMAC만(bare UUID 불허·서비스 의무 명문) · §4 행 동기 · 예시 2곳 `sess_ref_synthetic_*` · **호환 모드 3원칙**(blacklist/PII/식별자/휴리스틱/상한 무조건 적용 — version 생략 ≠ 우회) · version 착지 §3 명시 |
| D3-04 | ✅ | 앵커 §J-1 candidate fact_state **(hypothesis\|active) 2값**·superseded=LTM 전용 — M2 §3.4와 일치 |
| D3-05 | ✅ | enum 값 정본 표 신설: last_refined_intent **`_refine_intent` 실산출 11값** · intent_types = **SummaryIntentTag 분리**(product_fit 멤버) · risk_level/signal_kind 출처 고정 · 전역 count **2,048**(Σ per-field 1,376 ≤ 전역·불변식 명문) |
| D3-06 | ✅ | 앵커 §J-2 subject_ref nullable(Y)+guest_ref row+`subject_key=COALESCE` 키 규칙 · M2 §5 다중값 subject_key 통일 — 앵커·M2 §3.5·§5 3자 일치 |
| D3-07 | ✅ | M2/M3 헤더 **v1.2**+changelog(v1.1 이력 보존) · checklist verdict v1.2 · DELTA2_PATCH 보고서 원문 유지 = **문제없음**(이력 문서 원칙 정합) |
| D3-08 | ✅ | supersede 열거 **7곳**(§A/§D/§Q/§R/§U-M5/§V/W26)·§S 제거 — 제안 자구 그대로 |

## D. 문면 시뮬레이션 결과 (독립 시뮬레이터·7/7 기대 일치)

**정상 pass:** (a) 정상 echo(`dryness`·safety_facts·`safety_question`) → **pass** (b) catalog refs `{product_id}` → **pass** (c) §10 예시 payload 2건 전 필드/값 1:1 대조 — **비멤버 0·pass** (g) guest fact(subject_ref=null·guest_ref) → `subject_key=COALESCE` 비NULL로 partial UNIQUE **성립**
**reject:** (d) `match_reason` 자유문장 → item 표 금지+rule 1+rule 5 **reject** (e) bare UUID session_ref → §5.1 형식 검증 **reject** (f) version 생략+`customer_id` → 호환 모드에서도 §5 blacklist+rule 4 **reject**

## E. 남은 문제 — 계약-레벨 blocker 없음 (WATCH 3건·전부 문서-라벨)

1. [LOW] `checklist:64` "★Fable5 delta-2 재검증 필요 = YES" 낡은 상태 플래그 잔존 — §5 헤더는 이미 delta-3 반영 표기. **자구:** `★Fable5 delta-3 재검증 완료(FINAL_PASS — DELTA3_FINAL_REVIEW 참조).`로 교체.
2. [LOW] `checklist:40` B7 행 "(본 v1.1)" 이력성 표기 — **자구:** `(본 v1.1→v1.2)`.
3. [LOW] M3 §4 `episode_summary_refs` tuple의 `confidence` 필수/opt 미표기(§10 예시는 생략) — **자구:** ltm_fact_refs 행 `confidence`에 `(opt)` 1어 추가.

→ **"남은 문서-level blocker 없음"** — 위 3건은 차기 문서 정리 시 반영(승인 비차단).

## F. M2/M3 FINAL_PASS 여부
**FINAL_PASS = YES.** M2 v1.2 · M3 v1.2를 계약 문서-레벨로 **승인**한다(Control 상한 DESIGN_READY → Fable5 FINAL_PASS). M1 앵커(v0.3-revised)는 delta-1~3 정정을 포함해 정합 — 별도 재판정 불요.

## G. M4/M5 착수 가능 여부
**M4 착수 가능**(문서-레벨) — 단 **구현-stage blocker B1~B15는 별도 유지**: B15는 본 승인으로 문서-레벨 충족(구현 시 §9 round-trip assert로 검증) · 잔여 B1(1ce099e 소재)·B2(P1/P2)·B3(secret)·B4(gate 구현)·B5(at-rest)·B6(SIASIU)·B8(TTL)·B9(taxonomy)·B10~B14는 M4/M5 train 내 해소 후 flag ON. live/write/promotion = 0 유지·M6 별도 승인 불변.

## H. V3-ready 영향
**영향 없음(유지).** §15 seam(ConsentRecord purpose 축·un-learning·attribution keyed-hash)은 delta-3 무접촉·유효. SummaryIntentTag 신설은 V3 요약-태그 학습의 추가 seam(긍정적).

## I. 무결성
code change **0** · migration **0** · source repo push **0** · raw 고객 데이터/secret 열람 **0** · 전체 구조 재검토 반복 없음 · 범위 확장 없음.

---
> **한 줄 결론:** 3라운드의 적대 검증 끝에 계약이 코드를 정확히 받아쓰게 됐다 — M2/M3 FINAL_PASS. 이제 남은 것은 문서가 아니라 구현(B1~B15)이다.
