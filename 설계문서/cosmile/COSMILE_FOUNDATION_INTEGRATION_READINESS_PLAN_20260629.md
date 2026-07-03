# Cosmile ↔ Foundation Core Integration Readiness Plan (2026-06-29)

> Cosmile이 Foundation Core 판단을 **사용**할 수 있도록 contract/adapter/mock/shadow 인터페이스 준비. ★live commerce 적용 아님.
> production live·API live·checkout live·customer memory live migration·canonical write·learned promotion **아님.**

## 범위 (9 계약)
Product/Brand Query · Product Recommendation Decision · Do-Not-Buy/Purchase Guard · Ingredient/Safety Decision · CDM Read Policy · B2B/B2B2C Inquiry Classification · CS/Order Response Safety · Trace/Reason Code · Feature Flag/Fallback.

## 모듈 (foundation/cosmile/)
`cosmile_foundation_contract`(9계약)·`cosmile_foundation_adapter`(main·Trust Core 라우팅)·`cosmile_recommendation_adapter`·`cosmile_purchase_guard_adapter`·`cosmile_safety_decision_adapter`·`cosmile_b2b_inquiry_adapter`·`cosmile_trace_adapter`·`cosmile_feature_flags`(전부 OFF·hard-off).

## 정책 (검증됨)
read-only/mock/shadow only·feature flag default OFF·Foundation unavailable→fallback(기존 동작)·no checkout/order/customer DB write·no customer memory migration·no canonical/learned write·no live API/web·추천은 Trust Core gate 통과 전 노출 금지·do-not-buy는 reason+evidence boundary+safer alternative·high-risk cautious/block·trace raw/PII 금지.
