# Foundation Brain Runtime v0.8 — Offline Canary / Controlled Apply Simulation

> **2026-06-29 · v0.8 PASS.** controlled_apply 정책을 offline side-by-side로 검증. ★실 사용자 노출 0·production flag OFF·DB/Vault/memory write 0·canonical/learned promotion 0.

## 구현
- `foundation_brain_controlled_apply_policy.py` — ★feature flag 기본 OFF·allowlist(low-risk)만·blocklist(의료/임신/시술/구매/내부…) 차단·근거충분+diff clean+gate 전부 필요.
- `foundation_brain_response_diff_validator.py` — 확신 upgrade·safety caveat 제거·unsupported claim 탐지·coverage 100%.
- `foundation_brain_canary_simulator.py` — offline side-by-side·old/new ref만·apply 시뮬·rollback. ★canary는 절대 실 적용/노출 0.
- 테스트: controlled_apply(10)·canary(8)·diff_boundary(7).

## 1차 발견 & 수정 (중대)
- 파이프라인 `classify()`가 atc에 빈 hits → `no_hits` 조기반환 → **고위험 쿼리(임신/시술/치료/부작용/내부) high_risk 미탐지** → tier2 근거 시 grounded 통과 위험(high-risk false_allow). **쿼리 키워드 기반 고위험 분류 추가**로 수정 → 전부 cautious 이하·시술/내부 차단. 게이트 완화 아님.

## 결과
- 통합 eval **667**(LMR 514 + Brain 153) **667/667** · LMR 514 보존.
- ★high-risk apply 0·blocklist apply 0·dirty diff(확신/caveat/unsupported) apply 0·실 노출 0·user_text/write/promotion 0·diff coverage 100%·rollback pass.
- perf: canary 단일 p95 <0.2ms·crash 0.

## Gate → PASS (high-risk apply 0·unsupported 0·caveat 제거 0·노출 0·write/live 0·total≥650·LMR 보존) → v0.9 자동 진행
