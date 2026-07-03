# Foundation Brain Runtime v1.0 — FF2: Real Retrieval Hits Calibration

> **2026-06-29 · FF2 PASS.** synthetic이 아닌 **실 Vault(read-only) + fixture** retrieval hit 분포로 evidence_mode/conflict/high-risk cap 재캘리브레이션. ★read-only·web live 0·Vault/canonical write 0·memory.db 0·raw 미저장.

## 구현
- `foundation_brain_retrieval_distribution_sampler.py` — 실 Vault read-only 샘플 + fixture → RetrievalHitContract·분포 측정.
- `foundation_brain_conflict_semantic_probe.py` — hit 간 충돌 probe.
- `tools/foundation_brain_evidence_calibration_eval.py` — 캘리브레이션 eval(217).
- 테스트: sampler(6)·evidence_calibration(7)·conflict(4)·high_risk_cap(5).

## 실 분포 측정 (read-only)
- ★unknown tier 비율 **0.96**·provenance coverage **0.025**·source_ref coverage 낮음 → 실 Vault 대부분 메타 부재.
- mode 분포: uncertain 202·cautious 13·**grounded 2**(정상 tier1/2+provenance만).

## Gate 결과 (전부 0)
- calibration eval **217/217** · false_allow 0 · **unknown tier grounded 0** · missing provenance high-risk allow 0 · brand claim safety allow 0 · source_ref 없으면 grounded 0 · 고위험 비-Tier1 근거불충분.
- Vault diff 0·write/live/promotion 0·memory.db 0.

## Gate → PASS (eval≥200·high-risk false_allow 0·unknown grounded 0·brand safety 0·write/live 0)
