# Memory Architecture V1 M2/M3 delta-2 — Fable5 재검증

> 검증자: **Fable5** (독립·Control self-review 금지) · 2026-07-04 · **판정: PATCH_REQUIRED (delta-3 · 자구-수준 극소 범위)**
> 대상: delta-2 패치(commit `94bd93b`) vs Fable5 delta review(`18dafdd`)의 PARTIAL/NOT_CLOSED/REGRESSION/NEW
> 방법: diff 전문 정독 + 3축 적대 검증(whitelist·gate·echo / fact model / enum·anchor·checklist) + read-only 코드 대조(core.py `_CONDITION_KW`·session_out 기록 키 전수·`_enrich_products` catalog 소비 형상·gate.py·brain.py)
> 무결성: 코드 수정 0 · migration 0 · source push 0 · raw 고객 데이터/secret 0 · 구현 지시 0

---

## A. Verdict: **PATCH_REQUIRED** (delta-3 — 자구 수준·구조 변경 0)

delta-2는 **직전 2라운드와 질적으로 다르다** — 반영 주장 전수 대조 결과 날조 없이 대부분 실재하고, **REG-1의 구조 축(top-level key)은 코드 시뮬레이션으로 닫혔음을 확인**했다. 남은 것은 **값-레벨 enum 출처/형상 정합 3곳 + 앵커 §J-2 1곳** — 문면대로 구현하면 여전히 정상 트래픽이 reject될 수 있어(판정 기준: whitelist/gate/echo/enum/guest_ref의 작동 가능성 문제) APPROVED가 아니라 PATCH_REQUIRED다. 단 수정은 전부 자구 수준이다.

## B. delta-2 항목별 판단

### CLOSED (6)
| 항목 | 근거 |
|---|---|
| **REG-1 (top-level key 축)** | round-trip 시뮬레이션: core가 session_out에 쓰는 키 = 정확히 4개(`core.py:1229/1231/1232/1239`·nested 3키 포함) — **전부 §4 whitelist에 nested 표기까지 존재**. `session_out=dict(session_in)`(:1224) 복사 고정점 = whitelist 부분집합 → **2턴째 unknown-key reject 없음**. §9 assert 4종+중단조건 실재(M3:113-118) |
| **D-3 predicate** | 요구 자구 그대로 2곳(`M2 §3.5·§5`) 정정 · active∧deleted 키 미점유 명시 · **pregnancy 삭제→재진술 시나리오 규칙상 통과** |
| **privacy_level enum** | (anonymous\|user_consented\|aggregated) 단일 정본 — 발명 enum 완전 제거(잔존=폐기 이력 표기뿐)·예시 user_consented 수정 |
| **sensitivity_level enum** | 앵커 §I-1/§J-2 포함 **4값 실통일**(직전의 '표기만 통일' 아님 — diff로 실수정 확인) |
| **D-10 앵커 §T** | M2 §9와 문언 일치·'별도 release train' 취소선 폐기 — 3설 병존 제거(잔존 6곳은 무관 주제) |
| **NEW-2 checklist** | 구줄 "B1~B9" 실삭제 · B1~**B15** 갱신 · B15 정의가 Fable5 처방과 일치 |

### PARTIAL (5) — delta-3 대상
1. **stated_concerns enum 출처 오지정** [값-레벨 REG 잔재·HIGH]: M3:36이 enum 출처를 **FactTypeRegistry로 고정했으나 registry는 fact *type* 목록이지 condition *값* 목록이 아님**. 실제 echo 값 = `core.py:167-176 _CONDITION_KW` 8키(dryness/barrier/sensitivity/wrinkle/pigmentation/pore/acne/oiliness·앵커 §P:555 "detected_conditions 누적"과 일치). rule 2(§4 정본 enum 검증)를 문면 구현하면 `'dryness'∉FactTypeRegistry` → **자기 echo 값이 enum 축으로 reject**(REG-1이 key 축에서 value 축으로 이동).
2. **catalog_candidates item 형상 불일치** [MED]: M3:45 "refs만·원문❌" vs 실코드 소비 형상 — `core.py:294-317 _enrich_products`는 item의 `grounding{category,concerns,match_level}`·`match_reason`(자유 텍스트)을 소비. 엄격 집행=catalog 재사망 / 완화 집행=free-text ingress 허용. **item 필드 목록 미열거** — 허용 필드 명시(또는 match_reason 금지 결정) 필요.
3. **D-14 잔여** [LOW-MED]: §5.1 실재·§5/§7-4와 무모순·version gate 정의 ✓. 단 ① **계약 자신의 §10 예시 `sess_synthetic_0001`이 §5.1 허용 형식(sess_ref_*/UUID/HMAC) 위반** — 정본 예시가 자기 gate에 reject ② bare "opaque UUID" 허용 vs "raw DB session_id" 금지가 UUID-PK 환경에서 값-판별 불가(prefix/HMAC-only로 좁히거나 검출-불가·service-side 의무 명시 필요) ③ 호환 모드 동작 정의 1줄뿐(호환 모드에서 §5 blacklist+PII scan 유지 여부 명문 필요 — version 필드 생략 우회 방지).
4. **D-5(b) candidate fact_state** [LOW]: 3축 분리·hypothesis 복원·raw_text_stored 불변 ✓ — 단 M2=(hypothesis|active) 2값 vs 앵커 J-1=3값(superseded 포함), "anchor J-1 정합" 주장 부정확. 한쪽으로 통일 필요.
5. **D-1 잔여** [LOW-MED]: 'role' 오염 제거·상한 수치·truncation 규칙(코드 대조로 현실성 확인 — stated_concerns는 8-vocab dedupe라 cap64 도달 불가) ✓. 잔여: risk_level/last_refined_intent/intent_types/signal_kind **값 목록·출처 미고정** · per-field max 합계(≈1,400) vs 전역 512 미조정 · version 필드의 §3 착지 미규정.

### NOT_CLOSED (1) — delta-3 대상
6. **앵커 §J-2 미패치** [MED]: `subject_ref nullable=N` 잔존·`guest_ref` row 부재·upsert 키 규칙에 subject_key/COALESCE 미반영 — **M2 §3.5와 정본 간 직접 모순**. (M2 §5 다중값 규칙도 subject_key 미반영 — guest 다중값 fact NULL 문제 잔존.)

### 신규 (2·LOW)
- **version label drift**: M2/M3 헤더 v1.1인데 앵커 3곳·checklist가 "v1.2" 인용 · DELTA2_PATCH의 "→ v1.2" 승격 주장은 4문서 모두 헤더-레벨 거짓. 헤더 승격+changelog로 정리.
- **has_raw_or_pii 포괄 선언의 위치 열거 부정확**: §S 허위 지목(0건)·실잔존 §D:135/§Q:584 미열거(포괄 선언이 의미상 커버하므로 LOW — 열거 정정 권장).

## C. 남은 blocker
**B1~B15 유지** (B15 정의 적정). delta-3 수정 목록(전부 자구): ① stated_concerns enum 출처 → `_CONDITION_KW` 카테고리(또는 신설 condition-category 정본) ② catalog item 필드 열거+match_reason 방침 ③ §10 예시 session_ref 형식 정정+§5.1 UUID 판별 한계 명시 ④ 호환 모드 semantics 1문장(blacklist+PII scan 유지) ⑤ enum 값 출처 고정 4종+상한 합계 조정 ⑥ candidate fact_state 통일 ⑦ 앵커 §J-2(nullable·guest_ref·subject_key)+M2 §5 subject_key ⑧ 버전 라벨 정리. **신규 blocker 불요** — 전부 B15/기존 D-항목의 잔여.

## D. M4/M5 착수 가능 여부
**아직 불가** — delta-3(자구) → Fable5 delta-3 재검증(§B PARTIAL/NOT_CLOSED 항목만·최소 범위) → B1~B15 해소 → M4. 이번 잔여는 좁아서 delta-3 재검증은 경량으로 충분하다.

## E. M4 설계 준비 가능 여부
**가능.** M2 스키마 골격(상태머신·upsert·SAFETY∩SINGLE·guest COALESCE 설계)은 안정 — 잔여는 M3 gate 값-레벨과 앵커 자구. **B12 migration plan 초안·B5 at-rest 스펙 세부·B10 V0 헤더 표기·B11 adapter 재작성 설계** 등 blocker 산출물 준비는 지금 병행 가능(단 merge/구현은 delta-3 APPROVED 후).

## F. V3-ready 영향
**없음.** 잔여는 전부 gate 값-레벨/문서 정합 — §15 V3 seam(purpose·un-learning·attribution)은 delta-2에서 무변경·유효.

## G. Code change: **0** (migration 0 · source push 0 · raw 고객 데이터 0 · secret/PII 0 · 구현 지시 0)

## H. foundation-docs commit hash
본 문서 commit hash는 커밋 후 세션 보고에 기재.

---
> **한 줄 결론:** 구조는 닫혔다 — key 축의 REG-1은 코드로 반증 실패(해소 확인). 이제 남은 것은 enum이 가리키는 손가락 끝(출처 3곳)과 앵커 한 테이블뿐이다. delta-3는 자구 수정이며, 그 후 APPROVED가 합리적 기대치다.
