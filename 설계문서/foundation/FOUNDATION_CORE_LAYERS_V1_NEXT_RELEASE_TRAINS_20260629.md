# Foundation Core Layers v1.0 — Next Release Trains (2026-06-29)

> 다음 작업은 **`/home/leo/Project/foundation-control`** workspace에서 Foundation / SIASIU / Cosmile을 함께 통제하는 별도 release train으로 시작.

## 대기 중 release trains
1. **Cosmile AI Commerce Decision Loop v0.1** — 고객상담→상품판단→추천/비추천/보류/사지마세요→안전gate→memory reuse→trust trace e2e(≥100 시나리오). ★read-only/mock/shadow. **기준 자산: Cosmile readiness adapter `1ce099e`·164/164 재사용·확장.**
2. **실 데이터 연동** — 고객 memory/LLM draft/retrieval 실 분포(read-only→점진).
3. **실 namespace 코드 이동** — additive wrapper → 실제 패키지 이동(human approval).
4. **API live / canary / controlled_apply** — feature flag 점진 개방(별도 승인).

## 절대 별도 승인 필요(닫힘)
production live·public API live·web live·customer memory live migration·canonical write·learned promotion·Vault write·checkout/order/customer DB write·real user exposure.
