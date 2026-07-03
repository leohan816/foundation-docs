# Cosmile ↔ Foundation Core Integration Contract v1 (2026-06-29)

## CosmileRequest → CosmileDecision
- 입력: `cosmile_request(request_id, kind, query, audience, user_id)` — mock=True·read_only=True.
- 출력: `cosmile_decision(...)` — allowed·decision(allow/block/fallback/classified)·reason_codes·max_answer_mode·safer_alternative·fallback_used·integration_enabled.
- ★출력 불변식: live_write=False·checkout_changed=False·order_changed=False·customer_db_write=False·product_canonical_write=False·trace(redacted).

## 호출 흐름
`Cosmile → cosmile_*_adapter → cosmile_foundation_adapter.evaluate → (flag OFF? fallback) → foundation_trust_core_runtime.evaluate(shadow) → CosmileDecision`.

## reason code (예)
`integration_disabled_fallback`·`trust_core_passed`·`product_recommendation_gate`·`do_not_buy_gate`·`medical_boundary_gate`·`inquiry_classified:{kind}`.

## fallback 계약
`cosmile_integration_enabled=False`(기본) → 기존 Cosmile/SIASIU 동작·Foundation 미노출·allowed=False·live write 0.
