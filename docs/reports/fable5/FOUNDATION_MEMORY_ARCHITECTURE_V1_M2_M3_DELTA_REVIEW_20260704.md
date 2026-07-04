# Memory Architecture V1 M2/M3 v1.1 — Fable5 Delta 재검증

> 검증자: **Fable5** (독립·Control self-review 금지) · 2026-07-04 · **판정: PATCH_REQUIRED (delta-2 · 좁은 범위)**
> 대상: M2/M3/checklist v1.1 패치(commit `c864e37`) vs Fable5 D-1~D-14 (`FOUNDATION_MEMORY_ARCHITECTURE_V1_FINAL_REVIEW_20260704.md`)
> 방법: 패치 diff 전문 정독 + 3축 적대 delta 검증(gate spec / fact model / governance+blockers) + read-only 코드 대조(core.py·contracts.py·gate.py·brain.py)
> 무결성: 코드 수정 0 · migration 0 · source push 0 · raw 고객 데이터/secret 0 · 구현 지시 0

---

## A. Verdict: **PATCH_REQUIRED** (delta-2 — 전량 재검증 불요)

**14개 중 9개 CLOSED**(안전 핵심 D-8 포함) — 패치는 실질적이고 성실하다. 그러나 **REGRESSION 2건 + NOT_CLOSED 1건**이 남았고, 그중 REG-1은 *스펙 문면대로 구현 시 기존 safety carry·세션 연속성·catalog 경로를 능동 파괴*하는 등급이라 APPROVED_WITH_WATCH로 둘 수 없다. 수정 범위는 전부 좁은 문서-레벨(§C 목록)이다.

## B. D-1~D-14 delta 판단

| D | 판정 | 요지 |
|---|---|---|
| D-1 gate 스펙 | **PARTIAL** | §7 재작성은 진짜(unknown-key reject·재귀·식별자+session/order/payment/shipping·상한·fail-closed·echo clean — 방향 옳음·한국어 원문 문제를 whitelist 강제로 구조적 우회). 미완 4: ① 잘못된 §4에 배선(REG-1) ② type/enum 정의표 부재(§7 예시에 §4에 없는 `role` — 스펙 오염) ③ 상한 수치 0 + append-only 성장 필드(stated_concerns/safety_facts) truncation 규칙 부재 ④ **앵커 5곳(:135/:584/:607/:658/:680/W26)이 여전히 "has_raw_or_pii 재사용" 명령** — M3 v1.1 우선 선언 부재로 정본 간 gate 메커니즘 정면 모순 |
| D-2 fact_state 직교 | **CLOSED** | (active\|hypothesis\|superseded)+직교 3-state BOOL 복원·superseded∧deleted 표현·hypothesis 소실 금지 명문 |
| D-3 SINGLE UNIQUE | **REGRESSION** | 원 충돌은 해소(DB UNIQUE 고정 금지·procedural/partial 명시). **단 option ② predicate `WHERE fact_state='active'`가 deleted/blocked 미제외** — 직교 모델상 active∧deleted 소프트삭제 row가 SINGLE 키 점유 → 삭제 후 재진술 INSERT 충돌 = **pregnancy_nursing 삭제→재진술 시 안전 fact 저장 실패 경로**. 수정 1줄: `WHERE fact_state='active' AND deleted=false AND blocked=false` |
| D-4 EpisodeSummary | **CLOSED** | summary_text 복원·"전달 금지≠저장 금지" 분리·subject_ref nullable — 처방과 정확 일치 |
| D-5(a) SubjectRefMap | **CLOSED** | 컬럼 복원 + `allow_link` 단일목적 명문(REF-2 WATCH까지 반영) |
| D-5(b) Candidate | **PARTIAL** | status·raw_text_stored·gate_decision enum·subject_ref nullable ✓ — **fact_state(hypothesis 축) 미복원**(앵커 J-1과 잔여 불일치) |
| D-5(c) goal | **CLOSED** | SINGLE 확정(앵커·brain.py 재대조 일치) |
| D-5 sensitivity | **PARTIAL** | 4값(low 포함) 확정·gate 의미 불변(안전 영향 0). 단 **앵커 §J-2/§I-1은 여전히 3값** — "통일" 주장은 앵커 텍스트 기준 미성립 |
| D-5(d) whitelist 3자 정합 | **NOT_CLOSED** | M3 §4 실변경 = privacy_level 주석 1줄뿐. 앵커 §P·실코드 소비 필드(stated_concerns/safety_facts/recommendation_deferred/last_refined_intent/user_constraints/**product_context.catalog_candidates**) 전부 whitelist 부재 지속. **privacy_level "정정"은 제3의 enum(normal\|sensitive\|restricted) 발명** — 앵커(anonymous\|user_consented\|aggregated)와 형태만 바꾼 불일치 지속. delta 문서 "✅ 반영" 주장은 field-level에서 거짓(직전 라운드 failure mode 재발) |
| D-6 at-rest §11 | **CLOSED** | 6항(암호화·키/rotation·접근모델·감사·보존·파기) + dev 평문 위험 + 검증 가능한 B5 exit criteria |
| D-7 write-gate | **CLOSED** | 사전 grant 필요·grant 없으면 session-only·backfill 기본값(same_service·cross/학습 purpose 기본 grant 아님) |
| D-8 pregnancy supersede | **CLOSED** ★안전 | "현행 동일" 삭제·SINGLE supersede 우선 신규 규칙·brain.py 분기 변경 M4 명시·active≤1 불변 — 모순 active 2건 구조적 불가 확인 |
| D-9(a) soft-delete key | **CLOSED** | partial UNIQUE(deleted/blocked 제외)·"저장 허용≠자동 재노출" 규칙 명문 (단 SINGLE 측은 D-3 REG로 재개방) |
| D-9(b) 임신 max-age | **CLOSED**(방향) | ~300일 reconfirm_required→미확인 시 active→hypothesis. M4 명문화 2건: hypothesis 강등 후 safety 게이팅 포함 여부·reconfirm UX |
| D-10 동반패치 | **PARTIAL** | §9 1문장 확정+P3→B13 결속 ✓. **앵커 §T "별도 release train" 서술 미수정** — supersession 선언 부재로 문서 간 3설 중 2설 잔존 |
| D-11 V0 SUPERSEDED | **CLOSED** | §12 모순 구체 명시·enum만 참고·U-M2 검증 대체. V0 파일 헤더 표기는 B10 소관으로 위임(적정) |
| D-12 adapter v0 | **CLOSED** | 재작성(승계 아님) 확정·결함 정확 재기술·목표 계약 명시 |
| D-13 migration train | **CLOSED** | 5요소(backup/dry-run/rehearsal/plan/Leo 승인) 전부 |
| D-14 잔여 | **PARTIAL** | session_id 차단 신설(§7-4 — delta의 "§5" 위치 주장은 오류)·`session_ref`(opaque) vs raw session_id **판별 스펙 부재**·prompt-injection은 whitelist 강제로 구조적 방향 확보(단 stated_concerns 복귀 시 enum 정의 필수). trace-blob/INVARIANTS 이월은 정직·blocker 아님 동의 |

**신규 발견 (v1.1이 도입/노출):**
- **REG-1 [HIGH]** §7 unknown-key reject × 무변경 §4 = 구현 시 **Foundation 자신의 echo가 자기 gate에 reject**(core.py:1229-1239 → §6-(7) 재송신 → 2턴째 전 세션 거부·safety carry 파괴) + **catalog_candidates 경로 사망**(contracts.py:71·core.py:1612). v1.0의 잠복 결함이 능동 파괴로 격상. 호환 모드/버전 게이트 전무.
- **NEW-1 [LOW]** LTM subject_ref 필수→nullable 변경 — 방향은 앵커 B-e(guest fact) 정합이나 앵커 §J-2(N)와 새 불일치·guest_ref 컬럼 명시 누락·NULL별 partial UNIQUE 동작 미규정.
- **NEW-2 [LOW]** checklist §5에 구줄 "M4/M5 착수 = B1~B9 해소 후" 잔존(신줄과 병존 — B10~B14 우회 여지·1줄 삭제로 해소) + "앵커 정합" 표기 과대(직전 "충돌 0" 패턴 소폭 재발).

## C. 남은 blocker

- **B1~B14 유지** (B-list 개정 자체는 충실 — B6 순환 해소·B5 exit criteria·B4 재정의 확인).
- **★B15 신설 필요(delta-2의 핵심):** M3 §4 whitelist를 앵커 §P + 실코드 소비 필드로 **재정합**(stated_concerns[enum 정규 목록 포함]·safety_facts·recommendation_deferred·last_refined_intent·user_constraints·catalog_candidates) + **기존 CUTOVER 트래픽 호환/cutover 검증**(echo 재송신 round-trip이 gate를 통과함을 assert) + 상한 수치·버전 게이트.
- **delta-2 수정 목록(전부 문서-레벨·좁음):** ① M3 §4 재정합(B15) ② D-3 predicate 1줄 ③ 앵커 6곳 1줄(§T 동반패치·has_raw_or_pii×5 — M3 v1.1 supersede 선언 또는 수정) ④ privacy_level enum 정본 1개로 통일 ⑤ Candidate fact_state 복원 ⑥ sensitivity 앵커 정합 ⑦ session_ref opaque 형식 스펙 ⑧ checklist 구줄 삭제 ⑨ LTM guest_ref 명시+NULL 처리.

## D. M4/M5 착수 가능 여부

**아직 불가.** 경로: **delta-2 패치(§C·좁음) → Fable5 delta-2 재검증(해당 항목만) → B1~B15 해소 → M4.** M2의 스키마 골격(D-2/3/8 수정 반영 후)은 사실상 안정 — delta-2는 M3 §4와 문서 정합에 집중되므로 M4 *설계 준비*(migration plan 초안 등 B12 산출물)는 병행 가능.

## E. V3-ready 영향

**개선.** §15 신설(ConsentRecord `purpose` 축·erasure에 학습 산출물 포함(un-learning)·attribution keyed-hash 고정+W15 선행)은 원검증 G 권고 3건을 전부 반영. REG-1/D-3는 V3 구조에 영향 없음(수정 후 무영향).

## F. 코드 변경 여부

**0.** 코드 수정 0 · migration 0 · source repo push 0 · raw 고객 데이터 열람 0 · secret/PII 출력 0 · 구현 지시 0.

## G. foundation-docs commit hash

본 문서의 commit hash는 커밋 후 세션 보고에 기재.

---
> **한 줄 결론:** 패치는 성실했고 안전 핵심(D-8)은 닫혔다 — 그러나 gate를 진짜 default-deny로 만든 순간, 고치지 않은 whitelist가 이제는 시스템 자신을 거부한다. §4를 앵커·실코드와 재정합하는 delta-2 한 번이면 APPROVED 경로가 열린다.
