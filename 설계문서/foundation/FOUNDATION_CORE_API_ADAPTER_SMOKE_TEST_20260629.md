# Foundation Core Internal API / Adapter Smoke Test (2026-06-29)

> Foundation으로 이전된 LMR/Brain/Trust Core가 **local/internal API·in-process adapter**로 정상 호출되는지 확인. ★public production API live 아님·write 0.

## 모듈 (foundation/api/)
`foundation_core_contract`(7 method·6 decision type·output schema)·`foundation_core_service`(in-process)·`foundation_core_adapter`(dispatch·fail-closed)·`foundation_core_healthcheck`.

## 7 method
healthcheck·evaluate_consultation·judge_product·recommend_or_hold·do_not_buy_decision·memory_reuse_decision·trust_trace.

## output schema
status·decision_type·evidence_mode·safety_gate_result·memory_reuse_decision·reason_codes·trace_id·**applied_to_real_user=false·write_performed=false·public_api_live=false·production_live=false**.

## 결과
- 4 smoke 테스트(25 assertions)·7 method 전부 contract 반환·healthcheck PASS.
- decision_type: recommend/hold/ask_more/do_not_buy/cannot_determine 커버(do_not_recommend은 Cosmile commerce 레이어).
- ★public API exposure 0·production live 0·write/live/promotion 0·trace raw/PII 0·timeout/crash 0.
- unknown method/예외 → **fail-closed**(status error·decision error·silent success 아님).
- API 소스 network/sqlite/write import 0.
