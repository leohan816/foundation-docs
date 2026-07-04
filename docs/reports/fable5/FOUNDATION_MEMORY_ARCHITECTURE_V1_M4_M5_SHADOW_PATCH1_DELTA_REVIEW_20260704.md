# Memory Architecture V1 — Fable5 M4/M5 Shadow PATCH1 Delta Review

> 검증자: **Fable5** (독립 검수) · 2026-07-04 · **판정: APPROVED_WITH_WATCH** (§F FAIL 3 전부 CLOSED · watch 3건 — 전부 migration 승인 전 처리)
> 대상: fc `8f27a08` · SIASIU `70a9235` · Cosmile `caa6fb5` vs post-impl review(`ede2ada`) §F · PATCH1 보고(`c4791fa`)
> 방법: PATCH1 diff만 대조(경량) + 3-repo empirical 반례/field-level + 회귀 11종 전건 재현 + STOP 15항
> 무결성: 코드 수정 0 · migration 실행 0 · source push 0 · raw/secret/PII 열람 0(DB/logins.txt stat만) · live 0 · prod secret 0

---

## A. Verdict: **APPROVED_WITH_WATCH**

post-impl review §F의 **FAIL 3건(F-1·F-2·F-3)이 전부 CLOSED**, RISK도 대부분 해소. **M6 planning으로 넘길 수 있다**(live는 여전히 금지). 단 실 migration 승인 전 반드시 처리할 watch 3건이 남았다 — 그중 하나(SIASIU status enum)는 **PATCH1이 틀린 값을 CHECK로 codify한 field-level 미해소**로, "닫혔다"는 보고와 코드가 어긋난 케이스라 명시 추적한다.

## B. §F 대응 확인표

| 항목 | 판정 | 근거 |
|---|---|---|
| **F-1** gate 검증 7종 미구현 | **CLOSED** | empirical 전건 reject: `evil_service`·`mctx-9.9`·consent/retention/sensitivity bogus·per-field 상한 6종·grounding.match_level 17자·catalog name 129자. SENSITIVITY 이제 집행(dead 해소)·plan §5 privacy_level 테스트 존재 |
| **F-2** echo_strip value-level 미strip | **CLOSED** | email/enum/raw(한글) 3종 clean verbatim 잔존 **0**·재스캔 ok·echo_strip **멱등**(2회 동일) — G-7-5 위반 구조 해소(`_scrub node[k]=None`) |
| **F-3** CommerceMemory standalone | **CLOSED** | standalone model **완전 제거**(grep 0) → CommerceEvent/Cart/Order/Wishlist 4개 기존 모델에 **nullable overlay**(memorySubjectRef+memoryOverlayJson+@@index)·**destructive change 0**(전부 String? 추가) |
| **R-1** 호환모드 미구현 | **CLOSED** | version 읽어 strict/compat 분기 — compat은 whitelist/enum만 유예·blacklist/PII/raw/상한 무조건. legacy 정상 pass·customer_id reject 실증 |
| **R-2** 한글 catalog 오탐 | **CLOSED** | catalog name `수분크림` pass(length/PII만)·raw utterance 여전히 reject — REG-1 재발 구조 해소 |
| **R-3** SIASIU field-complete | **PARTIAL (2/3)** | ✅ ltm_fact 3필드(§3.5)·candidate source_ref/raw_text_stored(§3.4) — ❌ **R-3c status enum(하단 watch-1)** |
| **R-5** Cosmile field 보강 | **CLOSED** | SubjectRefMap.allowLink·EpisodeSummary.contentHash+sessionId·candidate sourceRef+rawTextStored·ConsentRecord.version+state 전부 존재 |

## C. 재현 테스트 결과표 (11/11 전건 일치)

| 항목 | 기대 | 재현 |
|---|---|---|
| Foundation gate tests | 44/44 | ✅ 44/44 (32→44) |
| Foundation runner baseline | 83/89·추가 감소 0 | ✅ 83/89 — 동일 6건(taxonomy 일치) |
| SIASIU candidate adapter | 26/26 | ✅ |
| SIASIU schema shadow | 21/21 | ✅ (16→21·+5 R-3 테스트) |
| SIASIU integration | 39/39 | ✅ (answer_unchanged) |
| SIASIU workflow | 119/119 | ✅ (behavior_changed 0) |
| answer.py fingerprint | d7f579443f8a110a | ✅ 재계산 일치 |
| Cosmile de-anon | 14/14 | ✅ (same-row 0·payload_refs·tref_) |
| Cosmile prisma validate | PASS | ✅ (env 부여 후 valid 🚀) |
| Cosmile readiness | 164/164 | ✅ |
| Cosmile loop | 112/112 | ✅ (trace_clean) |

## D. STOP 조건: **위반 0/15**

raw/PII/secret exposure 0 · migration 0(dev.db/memory.db/ssbrain.sqlite mtime PATCH1 커밋 선행·migrations diff 0) · backfill 0 · **hard reject 부재**(차단 코드 경로 없음·SHADOW_MODE 상수) · prod secret 0 · raw payload log 0(code+index만) · Foundation LTM 0(import=re/copy/json) · memory_read_provider 0 · cross-service 0 · baseline 추가 실패 0 · fingerprint 무변경 · same-row 0 · **CommerceMemory standalone 미유지** · SIASIU field-complete 보강(R-3c 제외 완료) · **echo_strip value-level PII 잔존 0**.

## E. M6 planning으로 넘겨도 되는 항목

기존 W-item 6종 유지: consult/chat 라이브 배선 · Cosmile P1/P2 라이브 emit(TS 러너) · SIASIU P3 라이브 auth · 실 migration(Leo 승인·M4_MIGRATION_PLAN) · runner 선재 6건 조사(FOUNDATION c9bb996 기인) · subj_v2_ 파생체인 정본 연결(B3).

## F. M6 전(정확히는 실 migration/배선 승인 전) 반드시 고칠 watch — 3건

1. **[watch-1·SIASIU·field-level 미해소]** `foundation_memory_schema_shadow.py:37` candidate `status DEFAULT 'pending' CHECK(IN 'pending',...)` — M2 §3.4 정본 enum은 `candidate|approved|rejected`(초기값=`candidate`). **PATCH1이 틀린 'pending'을 CHECK에 codify**(주석 line 34는 "off-enum 정정" 주장 — **보고-코드 불일치**). 테스트 9d도 garbage만 reject하고 'candidate' 수락/'pending' 거부를 assert 안 함. → `pending`→`candidate`로 정정 + 테스트 보강. (실 DDL이라 migration 전 필수)
2. **[watch-2·Cosmile·field-fidelity]** overlay가 JSON-blob(`memoryOverlayJson`) 방식이라 §3.7 개별 컬럼(consent_scope/retention_policy/privacy_level/deleted/blocked/**expires_at**)이 쿼리가능 컬럼으로 없음 · **AlertSubscription 미overlay**(§3.7은 5개 모델). F-3 core(standalone→overlay)는 닫혔으나 migration 승인 전 field-fidelity 결정 필요.
3. **[watch-3·Cosmile·보고 정직]** schema 주석 자기모순 — line 691 "4개 모델"(정확) vs line 807 "5개 모델(…CartItem)"인데 **CartItem에 overlay 컬럼 없음**(과대주장). + SIASIU 신규 테스트가 off-contract retention 값 `safety_max_age`(enum 밖) 사용 — 정정 권장.

## G. 최종 판단

PATCH1은 **정직하게, 그리고 대부분 정확하게** §F를 닫았다 — gate FAIL 2건은 empirical 반례로 완전 해소됐고(직전 review의 Control 보고 과장 패턴 재발 없음), Cosmile은 계약이 금지한 신규 테이블을 제거하고 overlay로 재구현했다. 남은 것은 **실 migration 전 field-level 정합 3건**뿐이며, 이는 M6 *planning*(설계·승인 준비) 진행을 막지 않는다 — 실 DDL 실행 gate에서 watch-1/2를 닫으면 된다. **APPROVED_WITH_WATCH · live 금지 유지.**

---
> **한 줄 결론:** 두 방은 설계도대로 고쳐졌고 울타리는 여전히 튼튼하다 — 벽지 세 군데(status 'pending'·overlay blob·주석)만 손보면 입주 준비(M6 planning) 끝이다. 입주(live)는 그때도 아니다.
