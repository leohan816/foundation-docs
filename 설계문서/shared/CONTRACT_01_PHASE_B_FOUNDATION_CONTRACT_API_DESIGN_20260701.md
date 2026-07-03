# CONTRACT-01 Phase B — Foundation Contract API: SSC in / FRC out (설계) · 2026-07-01

> 작성: 샤슈(SIASIU) · ★설계 문서(정본) — 구현 지시 아님(directive 별도) · 코드 수정 0
> 전제: Phase A = **CLOSED**(commit `39b28f0`) — `contracts.py`(validate_ssc·build_ssc_from_semantic·build_frc·assert_frc_invariants) 존재·runtime 값 baseline `b0addba` 동일.
> 상위: `.../CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md` · 부칙 `.../ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md`

---

## 0. 목적 / 범위
- Foundation이 **SSC(입력)를 받아 FRC(출력)를 돌려주는 정식 contract path**를 *설계*한다.
- ★Phase B = *contract entrypoint 신설*까지. **아직 Shashu/Cosmile Semantic Adapter 구현 X · Cosmile connector X · scaffold 제거 X · routing/severity/policy 로직 변경 X.**
- 핵심: raw text path(기존 consult_chat)와 SSC path를 *분리*하되, 내부 판단 코어는 *하나*로 공유(중복 판단 코어 금지).

## 1. Contract API entrypoint
```
신규:  consult_contract(ssc: dict) -> frc: dict         # 함수 진입점(코어)
       POST /v1/consult_contract   (server.py·SSC in / FRC out)   # HTTP 진입점(옵션)
공존:  기존 consult_chat(payload) 그대로 유지(raw text path·Phase A FRC view 포함)
```
- **entrypoint는 얇은 어댑터**: `consult_contract(ssc)` = ①`validate_ssc` → ②SSC를 내부 판단 입력으로 정규화 → ③**기존 판단 코어 재사용**(consult_chat 내부 로직·중복 구현 금지) → ④`build_frc` → ⑤`assert_frc_invariants` → FRC 반환.
- ★**판단 코어는 하나**: consult_chat과 consult_contract는 *같은 judge/policy/severity/retrieval/verify*를 호출. 계약 path는 *입력 어댑팅 + 출력 계약화*만 담당.
- raw text path vs SSC path 분리:
  - `consult_chat`(raw text) → 내부 scaffold(semantic_router)로 semantic 생성 → 코어 판단 → 응답(+Phase A FRC view).
  - `consult_contract`(SSC) → semantic 이미 계약으로 옴 → scaffold 스킵(SSC 우선) → 코어 판단 → FRC.
- 기존 scaffold(semantic_router) = **compatibility/transitional fallback**으로 유지(SSC 미제공/부분 시 채움).

## 2. Input contract handling
| 상황 | 처리 |
|---|---|
| **SSC 제공(valid)** | SSC 우선 — semantic 필드를 코어에 주입(scaffold 스킵). raw_text 있으면 lexical floor/backstop에만 사용(의미 판단 아님). |
| **SSC 누락(raw_text만)** | transitional scaffold(semantic_router)로 semantic 생성(기존 consult_chat 경로와 동일). |
| **SSC 부분(일부 필드만)** | 제공 필드는 SSC 우선, 누락 필드는 scaffold 보완(hybrid). ★safety 필드 누락 시 fail-closed 기본(아래 §4). |
| **SSC invalid(enum 이탈·타입 오류)** | `validate_ssc` errors 반환 + **보수 default**(unknown/none) + ★**safety fail-closed**(pass로 열지 않음). errors를 FRC.trace에 기록. |
| service_id/locale/channel/service_context | 코어 판단에 미개입(라우팅 편의·trace·profile 선택만). locale은 FRC answer_substance 언어 힌트(자연어 허용). |

## 3. Foundation 내부 처리 흐름 (contract path)
```
SSC ──▶ validate_ssc(errors·보수 default)
     ──▶ [semantic 주입] intent_signal/risk_signal/recommendation_veto/adverse fields
     ──▶ judge(policy gate: decision_type·safety_gate·refined_intent)         [코어 재사용]
     ──▶ risk = MAX(kw, semantic, struct) · adverse severity(AI-primary + lexical floor)  [02.7C]
     ──▶ retrieval/evidence(ssbrain) · product/ingredient judgment
     ──▶ enforcement(avoid/MAND-07·safety_first suppress·products refs)
     ──▶ verify/repair(llm_guard)
     ──▶ build_frc(...)  ──▶ assert_frc_invariants  ──▶ FRC
```
- ★모든 판단 = 기존 코어(consult_chat 내부). Phase B는 *SSC→코어 입력* 어댑팅 + *코어 출력→FRC*만.

## 4. Safety invariants (1급)
- ❌ invalid/ambiguous SSC → **fail-open 금지**. safety 관련 uncertainty = **fail-closed**(uncertainty_backstop·pass 금지).
- ✅ safety_first → products=0 · recommendation_allowed=false (assert_frc_invariants 강제).
- ✅ adverse_continue_use → safety_gate ≥ caution (02.7·02.7C).
- ❌ lexical_floor_backstop을 semantic_policy_gate로 위장 금지(basis 정직).
- ❌ product rail 완화 금지 · Foundation 제품/제품명 생성 0.
- ✅ safety = MAX(service semantic, Foundation guard, product/ingredient policy)·서비스/adapter가 낮출 수 없음.
- ★SSC의 `semantic_*` safety 필드는 *올릴 수만*(raise-only) — 서비스가 낮춘 값이 와도 Foundation guard/lexical floor가 fail-closed로 재상향.

## 5. Backward compatibility
- 기존 `consult_chat`(raw text) 응답 shape·값 **불변**(Phase A와 동일·golden 21/21).
- ★**Phase A의 FRC view == Phase B의 FRC output**: 같은 `build_frc`/`assert_frc_invariants` 사용 → *동일 입력이면 동일 FRC*. (consult_contract(SSC)와 consult_chat(raw→scaffold→같은 semantic)이 같은 semantic이면 FRC 동일해야.)
- 기존 테스트/golden/adversarial/02.5~02.7C 유지.
- 회귀 게이트: consult_contract(SSC) 결과가 consult_chat(동일 raw) FRC와 *일치*(parity test).

## 6. 금지 범위
- ❌ Shashu Adapter 구현 · Cosmile Adapter 구현 · Cosmile connector · service voice 구현.
- ❌ semantic_router scaffold 제거 · routing/severity/policy 로직 변경 · product rail 완화 · push.
- ✅ 허용: contract entrypoint(consult_contract) + (옵션) HTTP route + SSC→코어 입력 어댑팅 + FRC 출력 + parity/invariant 테스트.

## 7. 산출물 / 다음
- 구현 directive: `CONTRACT_01_PHASE_B_IMPLEMENTATION_DIRECTIVE_20260701.md`.
- 다음(예고): Phase C(Shashu Semantic Adapter가 SSC 생성) → Phase D(COSMILE-CONNECT).

---

## 한계 / 주의
- 이 문서는 **설계 정본** — 구현은 directive + Leo 승인 후.
- entrypoint는 *얇은 어댑터*·판단 코어 하나 재사용(중복 판단 코어 = 덕지덕지 재발).
- 코드 수정 0 · foundation-control/Cosmile/SIASIU app 무수정 · push 0.
