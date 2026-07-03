# FOUNDATION-FRC-TRACE-ID — 최소 보강안 설계서 (구현 전)

> 작성: foundation-control (control tower) · 2026-07-02 · ★설계서 작성만(코드 수정 0 · push 0)
> 목표: `/v1/consult_contract` 응답 FRC에 **stable trace_id**를 additive로 포함해 Foundation verdict ↔ 고객 행동 이벤트(foundation_decision_received·recommendation/product_card) 조인을 가능케 함.
> 성격: **Foundation core 변경**(build_frc) — control tower plan 경유. 이번 단계는 설계만.

## 0. 상태 / 승인
- 상태: **DRAFT(미승인)**. Leo 승인 전 구현·코드 수정 0.
- Foundation 변경이므로 role separation상 control tower plan → 승인 → 구현.

## 1. 현재 trace_id 존재 위치 (조사 결과)
- **생성기 존재**: `core.trace_id()` = `"fdsh_" + uuid.uuid4().hex[:16]`(core.py:90) — 요청당 stable 문자열(raw/PII 아님).
- **consult_chat resp**: `"request_id": trace_id()`(core.py:1446) — **top-level**에 존재. `resp["frc"] = build_frc(resp)`(core.py:1578).
- **build_frc 입력 `r`(=resp)에 request_id 있음**(contracts.py build_frc `r = result`) → ★그러나 **build_frc가 FRC에 trace_id/request_id를 넣지 않음**.
- **consult_contract 반환** = `frc`(= `result.get("frc")` = build_frc 출력·core.py `return frc`) — resp가 아니라 **frc만** 반환.
- **결론**: request_id는 consult_chat resp에 있으나 **consult_contract가 frc만 반환** + **FRC에 trace_id 없음** → `/v1/consult_contract` 응답에 trace_id **부재**. (그래서 Cosmile foundation_trace_id=null 정직 기록.)

## 2. consult_contract 응답 · FRC 구조 확인
- `/v1/consult_contract` HTTP 응답 = **FRC dict**(build_frc 출력). 구조:
  - top-level: contract_version·final_strategy·decision_type·safety_gate_result·final_severity_class·severity_class_basis·policy_rule_applied·products_allowed·recommendation_allowed·product_candidates·suppression_reason·forbidden_expressions·answer_substance·evidence·repair_or_verify_result.
  - `trace` 서브객체: semantic_intent_shadow·semantic_should_route_safety·final_safety_basis·avoid_atoms·routing_source·**raw_pii_included:false** (+ consult_contract가 ssc_valid/ssc_errors/semantic_source/provenance/contract_safety_signal 추가).
  - ★**trace_id / request_id 없음**.
- 소비자: Cosmile foundationClient `Frc.trace_id?`·foundationDecisionEvent `frc.trace_id ?? null`(읽음·현재 null). SIASIU adapters = trace_id/request_id **미사용**(grep 0).

## 3. 결정: **FRC top-level `trace_id` 필드**
- **위치 = FRC top-level `trace_id`**(trace 서브객체 아님).
- 근거:
  1. consult_contract가 FRC를 응답 본문으로 반환 → **FRC top-level = 응답 top-level**(별도 envelope 불필요).
  2. Cosmile이 **이미 `frc.trace_id` 읽음** → top-level 추가 시 **Cosmile 코드 변경 0으로 자동 populate**.
  3. trace_id = 요청 상관 식별자(first-class) — audit용 `trace` 서브객체와 구분.
- **값 = 기존 request_id 재사용**: `r.get("request_id")`(=이미 생성된 trace_id()). ★새 생성기·새 필드 의미 도입 0.

## 4. additive change 설계 (기존 FRC 계약 호환)
- **변경 지점 = `contracts.build_frc`(1곳)**: 반환 dict에 `"trace_id": r.get("request_id")` **1필드 추가**.
  ```
  # (설계 예시 · 구현 아님)
  return {
      "contract_version": FRC_VERSION,
      "trace_id": r.get("request_id"),   # ★additive: 기존 request_id 재사용(stable per request)
      "final_strategy": ...,
      ...
  }
  ```
- **additive 성질**: 필드 **추가만**(제거/이름변경/타입변경 0)·기존 값·판단 로직 **무변경**. `assert_frc_invariants`·정책 게이트 미접촉.
- consult_contract는 `result.get("frc")` 반환 → build_frc가 trace_id를 넣으면 **consult_contract 무변경으로 자동 포함**(consult_chat resp의 request_id가 build_frc에 이미 전달됨).
- (선택) robustness: `r.get("request_id")`가 없으면 null(정직). 필요 시 contracts에서 생성하지 않고 core가 request_id 보장(현재 consult_chat이 항상 생성).

## 5. 기존 소비자 non-breaking
| 소비자 | 영향 |
|---|---|
| **Cosmile** foundationDecisionEvent(`frc.trace_id`) | **자동 populate**(코드 변경 0) → foundation_decision_received의 foundation_trace_id 채워짐 |
| **Cosmile** foundationClient `Frc.trace_id?` | optional 필드·이미 선언 → 무영향 |
| **SIASIU** adapters | trace_id 미사용 → **무영향** |
| 기존 golden/adversarial/parity(FRC 필드 비교) | 비교 대상 필드 목록에 trace_id 미포함 → 무영향(★단 random이므로 full-dict 비교 테스트는 trace_id 제외 필요·§7) |
- 어떤 소비자도 필드 **부재를 가정하지 않음** → 추가 안전.

## 6. raw_text 저장/노출 금지 유지
- trace_id = **random hex**(fdsh_+uuid16)·발화/원문/PII 아님. `raw_pii_included:false`·`raw_text_stored:false` **불변**.
- ★trace_id에 원문/식별 개인정보 **미포함**(순수 상관 id). 로그도 trace_id/decision만(server.py 기존 원칙 유지).

## 7. 테스트 기준
1. **FRC.trace_id 존재·형식**: `/v1/consult_contract` 응답 top-level `trace_id`가 `fdsh_[0-9a-f]{16}`·non-null.
2. **stable within request**: 한 요청 내 단일 trace_id(중복 생성 0).
3. **unique across requests**: 서로 다른 요청 → 서로 다른 trace_id.
4. **additive·기존 FRC 값 불변**: final_strategy/decision_type/safety_gate/products_allowed/recommendation_allowed/severity/basis 등 기존 필드 **baseline 동일**(trace_id만 추가·★비교 시 random trace_id 제외).
5. **raw/PII 0**: trace_id에 원문/PII 없음·raw_text_stored=false·raw_pii_included=false.
6. **소비자 non-break**: SIASIU 어댑터 무영향(회귀 유지) · Cosmile foundation_decision_received의 foundation_trace_id **non-null(foundation_http)** 채워짐(정직).
7. **회귀**: golden 21/21 · adversarial safety_viol=0 · parity 8/8 · 02.5~02.7C(단 full-FRC 비교는 trace_id 제외).

## 8. 구현 범위 최소화
- **contracts.py `build_frc` 1필드 추가**(top-level `trace_id = r.get("request_id")`).
- ★**새 endpoint 0 · 새 schema 0 · consult_contract/consult_chat 로직 변경 0 · SIASIU/Cosmile 코드 변경 0**(Cosmile 자동 populate).
- (선택) `assert_frc_invariants`에 soft check(trace_id가 있으면 문자열)·`contracts.FRC` 문서/타입에 trace_id 명시 — 선택.
- 구현 파일 = `foundation-control/foundation_http_service/contracts.py` 1곳(+테스트).

## 9. 구현 프롬프트 초안 (승인 후 · Foundation 담당)
```text
[FOUNDATION-FRC-TRACE-ID — Foundation 구현]
대상: foundation-control/foundation_http_service/contracts.py(build_frc) · baseline 02b5ac2 · ★승인 후.
목표: FRC top-level에 trace_id 추가(기존 request_id 재사용·additive).
수정: build_frc 반환 dict에 "trace_id": r.get("request_id") 1필드 추가.
금지: consult_contract/consult_chat 판단 로직 변경 · 새 endpoint/schema · SIASIU/Cosmile 수정 · raw/PII 저장 · trace 필드 외 변경.
테스트: /v1/consult_contract FRC.trace_id=fdsh_16(non-null·요청간 unique) · 기존 FRC 값 baseline 동일(trace_id 제외) · golden 21/21 · adversarial safety_viol=0 · parity 8/8(trace_id 제외) · raw_text_stored=false.
서버/정리: 검수용 :8731 기동 시 종료 · push 0 · 로컬 commit(명시 파일).
완료 보고: build_frc diff · trace_id 형식/유일성 증거 · 기존 값 불변 · Cosmile foundation_trace_id populate 확인(별도 Cosmile eval) · push 0.
STOP.
```

## 10. 한계 / 보류
- 이 문서 = 설계(DRAFT). 구현은 승인 후. ★코드 수정 0 · push 0.
- **Cosmile 무변경**(자동 populate) — 단 구현 후 Cosmile foundation_decision_received의 foundation_trace_id non-null 확인은 별도 Cosmile eval(read).
- trace_id를 SSC(입력)까지 전파(end-to-end correlation)·Foundation 내부 trace persist는 **후속**(이번은 FRC 노출만).

## 요약
Foundation FRC에 **top-level `trace_id`(기존 request_id 재사용) 1필드 additive 추가**(build_frc 1곳). Cosmile은 이미 `frc.trace_id`를 읽으므로 **코드 변경 0으로 foundation_trace_id 자동 populate**·SIASIU 무영향·raw/PII 0·기존 값 불변(회귀 유지). 최소 침습·새 endpoint/schema 0. 승인 후 §9 구현.
