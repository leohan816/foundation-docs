# Memory V1 M4/M5 — Batch 0 + Batch 1 구현 보고

> 작성: foundation-control · 2026-07-04 · 오케스트레이션 v2(작은 batch·검증 우선). ★source 제품 repo push 0 · DB migration 0 · raw/secret/PII 0 · live/write/promotion 0.
> 기준: M4_IMPLEMENTATION_PLAN · M5_FOUNDATION_GATE_PLAN · M4_MIGRATION_PLAN · M4_M5_READINESS_REVIEW(Fable5).

## W-item 등록: W-M5-RUNNER-BASELINE-01
- **내용:** Foundation runner 현재 baseline = **83/89**(assertions 641).
- **실패 6건:** lmr 5(`learning_memory_reuse_hardening_loop`·`lmr_m6_shadow_loop`·`lmr_api_contract_loop`·`lmr_release_candidate`·`lmr_v1_final_loop`) + brain 1(`foundation_brain_runtime_e2e`).
- **Batch 1 구현물 원복 후에도 동일** — 원인 후보 = FOUNDATION HEAD `c9bb996`(subject_ref hard gate) 전진.
- ★**이번 M5 gate shadow 구현의 blocking 조건 아님.** Batch 1 성공 기준 = **83/89 대비 추가 감소 0**.
- ★**별도 원인 분석/복구 mission으로 분리**(이번 batch에서 임의 수정 금지).

---

## Batch 0 — Preflight Baseline Freeze
| 항목 | 결과 |
|---|---|
| **B1 readiness 재현** | ✅ `tests/test_cosmile_readiness_adapter_regression.py` **PASS=14 FAIL=0**(164 시나리오·baseline 재현) |
| **B10 V0 SUPERSEDED** | ✅ 헤더 존재. **로컬 커밋 `ee055ef`**(foundation-control·main)·**push 0**. foundation-docs mirror(`설계문서/shared/`·commit f7a4621) 존재 → ★**판단: mirror만으로 GPT 관측 충분하나, ee055ef 로컬 유지 권장**(제품 repo 아님·source push 금지 무관). |
| **B12 승인 준비** | ✅ `M4_MIGRATION_PLAN_20260704.md` 신설 완료 = **Leo 승인 대상 성립**(WAL backup·pre-scan SQL·결정론 수리·Prisma 금지·subject_ref backfill 금지·checksum·rollback·Leo gate). ★실 migration 미실행·DB 파일 미열람. |
| **Foundation runner baseline** | ✅ **83/89** 기록(layers: lmr 30/35·brain 15/16·trust_core 16/16·migration 4/4·api 4/4·siasiu 7/7·cosmile 7/7). 실패 6건 = W-item·**수정 0**. |
- Batch 0 완료 기준 충족: B1 PASS · B10 확인 · B12 승인대상 · runner 83/89 기록 · **code 0(측정/기록만)** · migration 0 · raw/secret/PII 0.

---

## Batch 1 — Foundation M5 Gate Shadow 1차 구현 (14-item)
1. **Batch:** 1 / Foundation M5 Gate Shadow.
2. **수정 repo:** foundation-control(control workspace·Foundation HTTP service 위치)·branch **`shadow/m5-ingress-gate`**(main 미변경).
3. **수정 파일:** 신규 `foundation_http_service/ingress_gate.py` · 신규 `tests/test_ingress_gate.py`(2건·explicit add).
4. **commit hash:** **`a0711f0`**(shadow/m5-ingress-gate·**local·push 0**). main HEAD `ee055ef` 무변경.
5. **diff 요약:** +2 신규 파일. gate = 순수 scan 함수(`scan(ssc)`→{ok,violations,clean,shadow})·`echo_strip`. default-deny whitelist(§4)·enum 정본(ConditionCategory 8·last_refined_intent 11·SummaryIntentTag·risk_level·signal_kind·privacy/sensitivity/fact_state)·session_ref prefix/HMAC(bare UUID·>128 reject)·catalog item shape(match_reason 금지)·식별자/order-payment key·nested recursive·size/depth/count 상한·subject_ref strip. **server/core/contracts 무변경(미배선)**.
6. **실행 테스트/결과:** `python3 tests/test_ingress_gate.py` → **PASS=27 FAIL=0**(reject 18 + strip 1 + pass 8). reject matrix 전량(raw utterance·email PII·customer/user/anonymous/session_id·order/payment·bare UUID·nested customer_id·match_reason·unknown key·fact_state deleted 비멤버·compat+raw·safety_facts>128·session_ref>128·invalid ConditionCategory/SummaryIntentTag·small_talk·oversized·version missing+identifier) · pass matrix 전량(dryness·safety carry·catalog refs·synthetic SIASIU/Cosmile·legacy version 생략·subject_ref strip·**self-echo round-trip**).
7. **기존 테스트 baseline 유지:** Foundation runner **83/89 → 83/89**(gate 신설 후 재측정·**추가 감소 0**). gate는 어디서도 import 안 됨(격리) → 기존 consult 무영향.
8. **선재/신규 실패 구분:** 선재 6건(lmr 5+brain 1·W-M5-RUNNER-BASELINE-01)·**수정 0** · 신규 실패 **0**.
9. **STOP 조건 위반:** 없음(hard reject OFF·durable write 0·memory_read_provider 미연결·cross-service 0·customer LTM 0·raw payload log 0·baseline 추가감소 0·answer.py 무변경).
10. **raw/secret/PII 열람:** 0(synthetic payload only·memory.db·dev.db·logins.txt 미열람·gate 반환 = code+path index만·key-name/raw value 미기록).
11. **migration 실행:** 0.
12. **live/write/promotion:** 0(SHADOW_MODE=True·hard reject 금지·순수 scan).
13. **rollback 방법:** `git checkout main`(gate 파일은 shadow 브랜치에만 존재) 또는 `git branch -D shadow/m5-ingress-gate` 또는 두 신규 파일 삭제. main·제품 repo 무영향(격리).
14. **다음 batch 착수 가능/불가:** **Batch 2/3은 별도 승인 대기**(task 최종 지시 = Batch 0/1까지). ★consult/chat 배선·hard reject·prod secret = M6/별도 승인.

### Batch 1 필수 조건 대조
- gate = raw SSC dict를 `validate_ssc` 이전 검사 가능(순수 함수·진입점 무관하게 호출 가능) ✅
- shadow only ✅ · hard reject 금지(SHADOW_MODE) ✅ · reject = enum/code+path index만 ✅ · raw payload log 0 ✅ · key-name log 0(index만) ✅
- shadow echo strip(위반 필드 session_context_out 제거) ✅(strip 테스트·`echo_strip`)
- memory_read_provider 미연결 ✅ · durable write 0 ✅ · Foundation customer LTM 미생성 ✅
- ★**`/v1/consult/chat`(+alias) 배선 = 미착수(W-item):** 본 Batch 1은 gate 모듈+test만(미배선). consult/chat 배선은 **W-item(M5_GATE_PLAN §10·G-7-4)로 등록·M6 전 처리 약속**. 주 유입 경로 우회 방지는 배선 batch(별도 승인)에서 이행.

## 무결성
source 제품 repo(FOUNDATION/SIASIU/Cosmile) push 0 · DB migration 0 · subject_ref backfill 0 · hard reject 0 · prod secret 0 · raw payload/PII/secret log 0 · Foundation durable customer memory 0 · memory_read_provider 0 · cross-service 0 · answer.py 무변경 · runner baseline 추가감소 0. foundation-control gate = shadow 브랜치 로컬(push 0). 본 보고서만 foundation-docs commit/push.
