# CONTRACT-01 Phase B Implementation Directive — Foundation Contract API (SSC in/FRC out) · 지시문 초안

> 작성: 샤슈(SIASIU) · ★구현 지시문 *초안* (Leo 승인 후 발송) · 이번 미션 = 초안만·코드 수정 0
> 성격: **contract entrypoint 신설**(consult_contract) — 판단 코어 재사용·어댑팅만. ★scaffold 제거/서비스 Adapter/Cosmile/로직 변경 아님.
> 설계 정본: `/home/leo/Project/SIASIU/설계문서/CONTRACT_01_PHASE_B_FOUNDATION_CONTRACT_API_DESIGN_20260701.md`
> 전제: Phase A CLOSED(commit `39b28f0`) · baseline `39b28f0`

---

## 지시문 (control용)

```
[CONTRACT-01 · Phase B] Foundation Contract API: consult_contract(SSC) -> FRC

목표:
Foundation이 SSC(입력)를 받아 FRC(출력)를 돌려주는 정식 contract entrypoint를 만든다.
★기존 판단 코어(consult_chat 내부)를 *재사용* — 판단 로직 중복 구현/변경 0. 어댑팅(SSC→코어 입력)+계약화(코어 출력→FRC)만.
★scaffold 제거 0 · 서비스 Adapter 0 · Cosmile 0 · routing/severity/policy 로직 변경 0.

기준 문서:
- /home/leo/Project/SIASIU/설계문서/CONTRACT_01_PHASE_B_FOUNDATION_CONTRACT_API_DESIGN_20260701.md
- /home/leo/Project/SIASIU/설계문서/CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md
- /home/leo/Project/SIASIU/설계문서/ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md
baseline commit: 39b28f0

── STEP 0. PREFLIGHT ──
- consult_chat 내부에서 *판단 코어*(judge/policy/severity/retrieval/enforcement/verify)와 *scaffold 호출(route_shadow)*·*응답 조립*을 식별.
- SSC 필드 → 코어 입력(intent_signal/risk_signal/recommendation_veto/adverse fields/session_context) 매핑표 작성.
- ★코어를 consult_chat에서 *공유 함수로 추출*할 수 있는지 확인(consult_chat과 consult_contract가 같은 코어 호출). 추출이 크면 최소 침습(consult_chat 시그니처에 semantic override 주입)으로.
- scope가 판단 로직 재작성/scaffold 제거/서비스 Adapter로 커지면 STOP 후 보고.

허용 범위:
- /home/leo/Project/foundation-control/foundation_http_service/core.py        (consult_contract + 코어 공유·최소 침습)
- /home/leo/Project/foundation-control/foundation_http_service/contracts.py    (SSC→코어 입력 정규화 helper·판단 0)
- /home/leo/Project/foundation-control/foundation_http_service/server.py       (옵션: POST /v1/consult_contract route only)
- eval/test 파일

절대 금지:
- semantic_router scaffold 제거 · 서비스(Shashu/Cosmile) Semantic Adapter 구현 · Cosmile connector · service voice 구현
- routing/severity/veto/policy gate/judge *로직* 변경(값 동일해야) · product rail 완화 · safety downgrade
- 판단 코어 *중복 구현*(consult_contract 안에 judge/severity를 새로 짜지 말 것 — 재사용)
- composer/patha/retrieval/llm_guard/ssbrain/profiles 수정 · SIASIU app · Cosmile · golden expected 수정 · push

해야 할 일:
1) 코어 공유: consult_chat의 판단부를 semantic 입력을 *주입 가능*하게(raw→scaffold 대신 SSC semantic 사용). 최소 침습:
   - consult_chat/코어가 `semantic_override`(SSC의 semantic 필드) 있으면 route_shadow 스킵하고 그 값 사용, 없으면 기존 scaffold(compatibility fallback).
2) consult_contract(ssc)->frc:
   - validate_ssc(ssc) → errors·보수 default.
   - SSC semantic → semantic_override로 코어 호출(judge/policy/severity/retrieval/enforcement/verify 재사용).
   - build_frc(core_result) → assert_frc_invariants → FRC(+trace에 ssc_errors).
   - ★raw_text optional: 있으면 lexical floor/backstop에만(의미 판단 아님).
3) (옵션) server.py: POST /v1/consult_contract — SSC in/FRC out. api_live=false·dev_shadow 불변.
4) fail-closed: SSC invalid/부분/애매 → safety uncertainty는 fail-closed(pass 금지·uncertainty_backstop). safety 필드는 raise-only(서비스가 낮춰도 Foundation guard/lexical floor 재상향).

Safety invariants (assert):
- safety_first → products=0 · recommendation_allowed=false
- adverse_continue_use → safety_gate ≥ caution
- lexical_floor_backstop ≠ semantic_policy_gate로 라벨링
- SSC invalid → safety_gate pass 금지(fail-closed)
- product rail 완화 0 · Foundation 제품/제품명 생성 0

검증/테스트:
1. ★parity: consult_contract(SSC) 결과 FRC == consult_chat(동일 raw→scaffold→같은 semantic) FRC. 8케이스(울긋불긋/좁쌀/따가운데/붓는데/자잘하게/이 성분 괜찮아/민감피부 세럼 추천/레티놀 알레르기) — final_strategy/decision_type/safety_gate_result/final_severity_class/severity_class_basis/products 동일.
2. SSC 케이스: valid/누락(raw fallback)/부분/invalid(errors+fail-closed) 각 처리 확인.
3. ★baseline 39b28f0 대비 consult_chat(raw text) 값 *불변*(Phase B가 기존 경로 안 깸).
4. Phase A FRC view == Phase B FRC output(같은 build_frc).
5. fail-closed: invalid/애매 SSC → safety pass 0(caution/block).
6. 비회귀: golden 21/21 · adversarial safety_viol=0·false_rec=0·decision_integrity=1.0 · 02.5/02B/02A/MAND-07/02.7C(울긋불긋/좁쌀 x3) 유지.
7. Architecture Constitution Check:
   - Raw utterance semantic by AI? YES(SSC=서비스 AI 판단·scaffold도 AI) · Heuristic final semantic judge? NO
   - Deterministic policy gate on structured output? YES · Heuristic floor/backstop only? YES
   - Safety = AI + policy gate + Foundation gate? YES(fail-closed) · AI fields decorative? NO
   - Service voice in Foundation? NO · Service data/action 침범? NO · platform voice in Foundation? NO
   - Transitional ownership 유지(scaffold=fallback·target owner=Service Adapter)? YES
   - ★판단 코어 중복 구현 0(재사용)? YES · scaffold 제거 0·서비스 Adapter 0·Cosmile 0? YES

완료 기준:
- consult_contract(SSC)->FRC 동작 · 코어 재사용(중복 0) · SSC valid/누락/부분/invalid 처리
- ★parity(SSC FRC == raw FRC) 8케이스 · consult_chat raw 값 불변 · Phase A FRC == Phase B FRC
- fail-closed(invalid/애매 → pass 0) · safety_first→products=0
- 비회귀(golden 21/21·adversarial·02.5~02.7C) · Constitution Check 전항 · 금지파일/SIASIU/Cosmile 0 · push 0

완료 보고:
1. PREFLIGHT: 코어 공유 방식·SSC→코어 매핑표
2. 변경/신규 파일·함수 — 절대경로
3. consult_contract 설계(입력 어댑팅·코어 재사용·FRC 출력)
4. SSC 4상황(valid/누락/부분/invalid) 처리 결과
5. ★parity 8케이스(SSC FRC == raw FRC)
6. consult_chat raw 값 baseline 불변 증거
7. Phase A FRC == Phase B FRC 증거
8. fail-closed 증거(invalid/애매 SSC → pass 0)
9. 비회귀(golden/adversarial/02.5~02.7C)
10. Architecture Constitution Check + 판단 코어 중복 0
11. 금지파일/SIASIU/Cosmile 0 · push 0
12. CONTRACT-01 Phase B 상태: CLOSED / PARTIAL / OPEN
13. commit · push 0

이번 미션 완료 후 STOP.
다음(예고·미착수): Phase C(Shashu Semantic Adapter → SSC 생성) → Phase D(COSMILE-CONNECT: Cosmile Adapter → Foundation Contract API·MOCK BRAIN 해제).
```

---

## 설계 메모 (왜 이렇게)
- **판단 코어는 하나·재사용**: consult_contract가 judge/severity를 *새로 짜면* raw path와 갈라져 덕지덕지 재발. → consult_chat 코어를 semantic 주입 가능하게 하고 *둘이 같은 코어 호출*.
- **parity test = 계약 신뢰의 핵심**: SSC path와 raw path가 *같은 semantic이면 같은 FRC* 여야 계약이 진짜. 8케이스 parity로 강제.
- **scaffold는 fallback로 유지**: Phase B에서 아직 서비스가 SSC를 못 낼 수 있으니 raw→scaffold 경로 살림. 제거는 Phase C 이후.
- **fail-closed 일관**: invalid/부분/애매 SSC에서 safety는 절대 pass로 안 열림(uncertainty_backstop).

## 한계 / 주의
- 이 문서는 지시문 초안 — 실제 구현은 Leo 승인 후. 코드 수정 0·commit 0·push 0.
