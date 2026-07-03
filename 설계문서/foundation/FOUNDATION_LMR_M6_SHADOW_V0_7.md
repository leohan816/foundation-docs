# Foundation — LMR v0.7: Memory Trust Gate M6 Shadow Integration

> **2026-06-28 · v0.7 PASS.** state·reuse_gate·approval·provenance·conflict·supersede·dry-run·vault read-only·scale를 하나의 **Memory Trust Gate M6 shadow layer**로 묶음. SIASIU runtime 옆에서 **shadow trace만** 생성 — user_text·응답 behavior 변경 0.
> ★user_text_modified 0 · write_performed 0 · promotion_performed 0 · raw/teacher raw 0 · Vault write 0 · memory.db 0(LMR scope) · ssbrain 무변경 · live 0.

## A. 버전 목표
M6 = 모든 LMR 게이트(상태/재사용/출처/충돌/dry-run)를 단일 shadow 결정으로 통합. runtime은 trace만 — 절대 적용/쓰기/승격 안 함.

## B. 구현한 파일
- `app/memory_trust_gate_m6.py` — `m6_gate(ctx)` → allowed/blocked/flags/max_answer_mode/shadow_decision/audit_trace. ★고위험 비-Tier1 차단·trace는 id/hash/ref만(raw 미포함).
- `app/memory_trust_shadow_runtime.py` — `shadow_observe`/`plan_shadow_for_answer`·`self_import_audit`(answer/brain/memory.db import 0 검증).
- `app/tools/lmr_m6_shadow_eval.py` — M6 단일/배치 latency·trace gen·memory·shadow 불변식 집계.
- 테스트: `test_memory_trust_gate_m6`(12)·`test_m6_shadow_runtime`(8)·`test_lmr_m6_shadow_loop`(8).

## C/D. 테스트 수
- 총 eval **310**(신규 M6 shadow **54** cases) · v0.1~v0.6 256 regression 전부 포함.
- 내 스위트 assertions **459**(이전 431↑·37/37 GREEN).

## E. regression 보존
v0.1~v0.6 테스트·하니스·eval JSON 삭제 0. v01 regression 22 유지.

## F. 카테고리 비율
v0.1~v0.6(256) + m6_shadow(54). m6_shadow 내: normal/candidate/reviewed/high-risk/privacy/customer/internal_only/conflict/deprecated/superseded/dry-run/shadow-invariant/batch1k/adversarial/legacy-isolation/trace/taxonomy.

## G. pass/fail → **310 / 0**
## H. false_allow / false_block → **0 / 0**
## I. high-risk/privacy/customer
- 고위험(safety_sensitive) 비-Tier1 → M6 **차단**(`high_risk_insufficient_provenance`). customer memory 무맥락 → 차단·플래그. internal_only external → 차단.

## J. speed (M6)
- 단일 결정 p95 **0.14ms**(목표<5ms) · batch1000 **23.3ms**(목표<50ms) · conflict p95 sub-ms · trace gen sub-ms.
## K. throughput
- batch 100/500/1000 records/sec 高. ## L. slowest: batch1000 단일 호출(23ms)이 최대.

## M. failure taxonomy
누적 63종 + M6 분류(high_risk_insufficient_provenance 등). 발생 0.

## N. 1차 실패와 수정 (1건·게이트 강화)
- M6가 tier3 브랜드 safety-critical record를 차단 않고 required_review만 표시 → **M6에서 고위험 비-Tier1 충분성 미달 시 차단**으로 강화(category 4/5 정책 준수). 게이트 완화 아님.

## O. 최종 재실행 → 310/310 · m6 54/54 · 불변식 0
## P. write guard → Vault diff 0 · canonical write 0 · `open('w')` 0
## Q. raw/teacher raw 저장 → 0 · audit_trace raw 본문 미포함(id/hash/ref/status/flag만)
## R. regression retention → 보존(delete_forbidden)
## S. assertions / FAIL → **459 / 0**
## T. full-loop → **100/100**

## Preflight (요구 항목)
- LMR/Foundation 모듈 memory.db 사용 스캔 → M6/shadow 0(self_import_audit clean).
- legacy `brain.py` memory.db 참조 → **out-of-scope legacy**로 문서화(LMR scope 밖·gitignore·현재 부재). M6는 brain/memory.db를 import/호출 안 함.
- app/data → ssbrain.sqlite 단독 유지(변경 없음). git diff 0. live call 0.

## U. 다음 버전 진행 → gate PASS → **v0.8(API Contract Dry-run)** 자동 진행
## V. commit/push → 본 v0.7 커밋(아래) · force push 0

## 감사
8차원 독립 adversarial 워크플로(m6_false_allow_scale·high_risk_privacy_customer·shadow_invariants·no_raw_in_trace·vault_write·learned_promotion·memory_db_ssbrain_legacy·regression_retention_live) → 위반 0.
