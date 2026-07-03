# DUAL-SERVICE-ADAPTER-01 — SIASIU + Cosmile Dual Service Adapter Architecture (설계) · 2026-07-01

> 작성: SIASIU · ★설계 문서(정본) — 구현 지시 아님(directive 별도) · 코드 수정 0
> ★명칭: **SIASIU**(정본) — `shashu` 표기 금지.
> 전제: CONTRACT-01 Phase A CLOSED(`39b28f0`) · Phase B CLOSED(`98c852b`) · Foundation `consult_contract(ssc)->frc` 제공(SSC in/FRC out·안전신호/invalid fail-closed·provenance 정직·override strip).
> 근거: `.../CONTRACT_01_SERVICE_FOUNDATION_SEMANTIC_CONTRACT_20260701.md` · `.../FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md` · 부칙 `.../ARCHITECTURE_CONSTITUTION_ADDENDUM_SEMANTIC_POLICY_GATE_20260701.md`

---

## 0. 목적
Foundation Contract API를 **SIASIU와 Cosmile이 동시에** 쓰도록 — 공통 계약·서비스별 Adapter·response mode·fallback·검수 구조를 설계한다. ★거대 shared SDK는 지금 안 만든다(shared spec + thin helper만).

## 1. 전체 구조
```
┌── SIASIU (default consult_mode) ──┐        ┌── Cosmile (default commerce_mode) ──┐
│ 고객질문                          │        │ 고객질문                            │
│  → SIASIU Semantic Adapter        │        │  → Cosmile Semantic Adapter          │
│  → SSC (+service_context)         │        │  → SSC (+product/session context·raw_text) │
│         │                         │        │         │                            │
│         └──────────────┬──────────┴────────┴─────────┘                            │
│                        ▼  POST /v1/consult_contract (SSC in)                       │
│            ┌──────────────────────────────────────────┐                           │
│            │  Foundation Common Brain (공통·불변)       │  consult_contract          │
│            │  validate_ssc · policy/safety gate ·       │  (안전신호/invalid=fail-closed) │
│            │  severity(02.7C) · retrieval/evidence ·    │                           │
│            │  product/ingredient judgment · enforcement·│                           │
│            │  verify/repair · build_frc · assert         │                           │
│            └──────────────────────────────────────────┘                           │
│                        ▲  FRC out                                                  │
│         ┌──────────────┴──────────┬─────────────────────┐                          │
│  → SIASIU Response Adapter         │  → Cosmile Response Adapter                    │
│  → consult/safety(/commerce) 응답  │  → commerce/consult/safety 응답·상품카드/CTA 제어 │
└───────────────────────────────────┘        └───────────────────────────────────────┘

병행 유지(삭제 금지):
  SIASIU 고객질문 → SIASIU standalone 상담 코드(brain.chat) → 기존 응답   [parallel/fallback]
  Cosmile 고객질문 → Cosmile Mock Brain → 기존 쇼핑몰 응답                 [shadow/parallel]
```

## 2. Foundation / SIASIU / Cosmile 역할
| | 역할 |
|---|---|
| **Foundation** | 공통 판단 엔진: SSC/FRC contract · validate_ssc · consult_contract · safety/policy/evidence/product judgment · FRC invariants · fail-closed · product/recommendation suppression. ★이번 미션에서 Foundation 판단 로직 *수정 금지*. |
| **SIASIU** | SIASIU Semantic Adapter · SIASIU Response Adapter · standalone fallback(brain.chat 유지). 기본 consult_mode. |
| **Cosmile** | Cosmile Semantic Adapter · Foundation Client · Cosmile Response Adapter · 상품카드/CTA/commerce UX · Mock Brain fallback. 기본 commerce_mode. |

## 3. 공통 영역 vs 서비스별 영역
**Foundation 공통(불변)**: SSC/FRC·validate_ssc·consult_contract·safety/policy/evidence/product judgment·FRC invariants·fail-closed·suppression.
**서비스 입구 공통 패턴**: raw_text→SSC 생성 · service context→SSC 보강 · `/v1/consult_contract` 호출 · FRC→response_mode 결정 · 공통 test fixture.
**서비스별 독립**: (SIASIU) Semantic/Response Adapter·standalone fallback · (Cosmile) Semantic/Response Adapter·product card/CTA/commerce UX·Mock Brain fallback.
→ ★"공통 = 계약·판단·안전 / 서비스별 = 입력 이해·출력 목소리·데이터·액션"(4-edge 정합). 한 서비스 설계가 다른 서비스를 오염시키면 안 됨.

## 4. shared spec / thin helper / future shared package 기준
**지금 만든다 — shared spec(문서)**: SSC 필드·FRC 필드·enum·`service_mode_requested`·`response_mode_final`·safety 우선 규칙·products_allowed/recommendation_allowed 처리·suppression 규칙·test matrix.
**지금 만든다 — thin helper(작게·서비스 내부에 각자, 중복 확인되면 분리)**:
- `create_base_ssc()` · `normalize_locale()` · `validate_service_mode()` · `call_foundation_contract()` · `decide_response_mode()` · `enforce_response_suppression()`
**지금 *안* 만든다(대형 SDK 금지)**: 전체 semantic adapter · 전체 response adapter · SIASIU 상담 답변 생성 로직 · Cosmile 판매 답변 생성 로직 · Cosmile 상품카드 정책 전체 · 서비스별 prompt 전체 · 서비스별 UX 정책 전체.
**future shared package로 분리하는 기준**: ★양쪽에서 *실제 중복이 확인*되면 분리. 중복 후보 = Foundation client 호출·SSC 기본 뼈대 생성·FRC→response_mode 결정·safety suppression 규칙·enum/locale normalization·공통 test fixtures·contract compatibility test.

### 4-A. ★thin helper 위치 (패치 4 — 필수)
- **Phase 1**: thin helper를 **SIASIU와 Cosmile 각 repo 안에 각각** 둔다. ★별도 shared SDK/shared package를 새로 만들지 않는다.
- **shared package 추출 조건(3개 동시 충족 시에만)**: ①양쪽에서 *동일 코드가 반복* ②*변경 요구도 동일* ③*서비스별 차이가 없음*이 확인될 때. → 그전엔 각 repo 내부 복제 유지(성급한 공통화가 오염을 부름).

## 5. response mode 3종
| mode | 의미 | 기본 |
|---|---|---|
| **consult_mode** | 상담형(설명·되묻기·근거) | SIASIU default |
| **commerce_mode** | 판매형(상품카드·CTA·구매 연결) | Cosmile default |
| **safety_mode** | 안전 우선형(중단/확인/전문가·제품 억제) | (safety 트리거 시) |
→ ★고정값 아님. 두 서비스 모두 3모드 사용 가능(SIASIU도 추천 필요 시 commerce·Cosmile도 이상반응/성분 설명 시 consult/safety).

## 6. mode 결정 규칙 (★Foundation safety 최우선)
```
입력: service_mode_requested ∈ {consult, commerce, auto}
출력: response_mode_final ∈ {consult, commerce, safety}

1. FRC.final_strategy == safety_first        → response_mode_final = safety   (무조건)
2. FRC.safety_gate_result == block           → safety                          (무조건)
3. service_mode_requested == commerce 이지만 위 1·2 → safety (운영자 지정 < Foundation safety)
4. FRC.products_allowed == false             → commerce CTA/구매버튼 금지
5. FRC.recommendation_allowed == false       → 상품 추천 카드/추천 문구 금지
6. service_mode_requested == consult          → 판매 CTA 억제 가능(consult)
7. service_mode_requested == auto             → FRC + 서비스 기본값으로 결정
8. 그 외 → 서비스 기본(SIASIU=consult / Cosmile=commerce)
★불변: 운영자 지정 mode보다 Foundation safety 판단이 항상 우선. 판매형이 safety를 우선할 수 없다.
```

### 6-A. ★mode 책임 위치 (패치 3 — 필수)
- `service_mode_requested`(consult|commerce|auto) = **서비스가 SSC에 넣는 요청값**.
- `response_mode_final`(consult|commerce|safety) = **각 서비스 Response Adapter가 Foundation FRC + 서비스 기본값으로 최종 결정**.
- ★단 아래 제약은 **Response Adapter가 절대 무시할 수 없다**(하드):
  - `final_strategy=safety_first` · `safety_gate_result=block` · `products_allowed=false` · `recommendation_allowed=false`.
  → 즉 mode의 *편의 결정*은 서비스가, *안전 제약*은 Foundation FRC가 소유. Response Adapter는 FRC 제약을 우회 못 함.

## 7. 기존 코드 보존 원칙
**SIASIU standalone**: 기존 `brain.chat` 상담 코드 *유지*. Foundation 연동은 **parallel path로 추가**. ★안정화(parity/safety/rollback 조건) 전 기존 코드 삭제 금지. 연동 후에도 fallback 유지.
**Cosmile Mock Brain**: *즉시 삭제 금지*. Foundation 연동은 **shadow/parallel로 추가**. 두 경로 병행/비교 가능하게.
→ 두 서비스 모두 *병행/비교* 설계(신·구 경로 나란히).

### 7-A. ★fallback safety wrapper (패치 1 — 필수)
Foundation 호출 실패/타임아웃으로 fallback(standalone/Mock Brain)을 써도 — **raw_text 또는 service-side safety detector가 safety 의심을 감지하면 fallback 응답은 반드시 safety_mode로 제한**한다. fallback 경로에서도:
- `products_allowed=false` · `recommendation_allowed=false` · 상품카드/CTA 숨김 · 추천 문구 금지 · "계속 사용 허가" 금지 · 구매 유도 금지.
- ★특히 **Cosmile Mock Brain fallback에서도 safety 의심 시 상품/CTA 노출 금지**.
→ fallback = "기능 연속성"이지 "safety 개방"이 아님(fail-closed 유지·부칙 정합).

### 7-B. ★standalone/Mock Brain = 비교 대상이지 safety 기준 아님 (패치 2 — 필수)
- standalone/Mock Brain과의 비교는 **regression/shadow 비교용**이다. safety 충돌 시 **최종 기준은 Foundation FRC**.
- ★기존 경로가 pass인데 Foundation FRC가 safety_first/block/caution이면 → 서비스 응답은 **Foundation safety를 따른다**(기존 경로가 이기지 않음).

## 8. 동시 개발 원칙
- SIASIU + Cosmile **동시 설계**. 둘 다 *같은 Foundation SSC/FRC contract* 사용.
- Adapter 구현은 *각 플랫폼 안*. 처음부터 거대 공통 SDK 금지.
- 각 서비스 독립 구현하되 **공통 contract test 통과 필수**.
- ★한 서비스 맞춤 설계가 다른 서비스 오염 금지·공통 contract 왜곡 금지.

## 9. 구현 책임
- **Foundation 코드 = Control**: contract/consult_contract/safety policy 유지. ★판단 로직 이번 미션 수정 금지.
- **SIASIU 코드 = SIASIU 담당**: Semantic/Response Adapter·standalone fallback.
- **Cosmile 코드 = Cosmile 담당**: Semantic Adapter·Foundation Client·Response Adapter·commerce UX.

## 10. 검수 구조
| 대상 | 검수 |
|---|---|
| **SIASIU 구현** | Control(Foundation contract compat) + Cosmile 관점(commerce 오염 여부) + GPT/Leo 최종 |
| **Cosmile 구현** | SIASIU(safety/consult 관점) + Control(contract compat) + GPT/Leo 최종 |
| **Foundation 변경** | SIASIU+Cosmile 양쪽 영향 검토 + GPT/Leo 최종 |
| **공통 contract 변경** | Control 구현 + SIASIU+Cosmile adapter 영향 검토 + ★Leo/GPT 승인 전 변경 금지 |

---

## 한계 / 주의
- 이 문서는 설계 정본 — 구현은 directive + Leo 승인 후·각 플랫폼 담당.
- Foundation 판단 로직 수정 0 · 대형 shared SDK 0 · 기존 standalone/Mock Brain 삭제 0 · Foundation safety 우선 약화 0.
- 코드 수정 0 · SIASIU app/Cosmile/Foundation 무수정 · push 0.
