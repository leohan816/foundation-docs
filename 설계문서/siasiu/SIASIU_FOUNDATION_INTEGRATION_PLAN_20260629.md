# SIASIU ↔ Foundation Shadow/API Integration Plan (2026-06-29)

> SIASIU가 기존 answer/runtime을 유지한 채 Foundation Core를 **shadow/adapter**로 호출. ★answer.py 무변경·user_text 0·write 0·flag OFF면 fallback.

## 모듈 (app/ssbrain/ · additive)
`foundation_feature_flags`(전부 OFF·hard-off)·`foundation_core_client`(in-process adapter 호출)·`foundation_shadow_adapter`(siasiu_output 불변·shadow decision 부가)·`foundation_trace_bridge`(redacted shadow trace).

## 원칙 (검증됨)
feature flag default OFF·Foundation 미가용 시 기존 SIASIU behavior 유지·answer.py output unchanged(지문 d7f579443f8a110a·foundation 미import)·Foundation result는 shadow trace로만·real user_text 0·write/live/promotion 0·trace raw/query/PII 0.
