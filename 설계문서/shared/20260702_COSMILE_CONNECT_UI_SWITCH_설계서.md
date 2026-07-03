# COSMILE-CONNECT-UI-SWITCH — 설계서 (구현 전 · design-first)

> 작성: foundation-control (control tower) · 2026-07-02
> 성격: Cosmile 고객 상담 UI **main path 전환 설계**(기존 `/api/slice/consult` → 검증된 `/api/slice/consult-foundation`). ★설계서 작성만 · 코드 수정 0 · push 0.
> 전제(CLOSED 기준): Foundation `02b5ac2` · SIASIU `1142198` · Cosmile `11a8698` · Dual-Service Adapter Layer CLOSED(Fable5 **PASS_WITH_WATCH**) — `docs/DUAL_SERVICE_ADAPTER_LAYER_CLOSED_20260702.md`.
> ★불변: production live · write · checkout · cart DB write · real user exposure = **이번 설계에서 승인 게이트로 분리**(이 slice에 포함 안 됨).

---

## 0. 상태 / 승인
- 상태: **DRAFT (미승인)**. Leo 승인(PASS/APPROVED) 전에는 구현 프롬프트 발행·Cosmile 코드 수정 금지.
- 이번 단계: 설계서만. 다음: 승인 → 구현 프롬프트(§10) → Cosmile repo-local 구현 → control 검수 → (필요 시) Fable5 targeted UI-path audit.

## 1. 현재 상태
- **고객 UI main path = 기존 `/api/slice/consult`(Mock Brain).** 근거: `app/src/components/slice/ConsultationChatShell.tsx:59` 가 `fetch("/api/slice/consult", … body:{…payload, productId:"fprod_elt01"})` 를 직접 호출. 응답을 `resp.decisionType`·`resp.safetyGateResult`로 소비(L67 emitSignal).
- **`/api/slice/consult-foundation`은 검증됐지만 main UI path가 아님.** live eval 15/15(source=foundation_http·mock_fallback=false·safety suppression·commerce refs⊆FRC)로 CLOSED. 그러나 어떤 고객 UI도 이 route를 호출하지 않음(shadow/parallel).
- **Mock Brain / legacy 역할(현재)**: `/api/slice/consult` + `mockBrain`/`mockFoundationConsultation` = **현 고객 상담의 실제 판단자**. consult-foundation route는 fallback에서만 Mock Brain을 pseudo-FRC로 재사용.
- ★**충돌 주의**: `ConsultationChatShell.tsx`는 **미커밋 WIP(M)**. control 미접촉. 이 switch는 이 파일을 바꾸므로 **Cosmile 팀 WIP와 조율 필수**(아래 §5).
- ★**응답 형태 불일치**: Mock Brain resp(`{decisionType, safetyGateResult, …}`) vs consult-foundation(`{source, surface{mode,showProductCards,showCTA,showRecommendation,productRefs,answerText}, decision, frc{…}}`). 전환은 shell이 **새 surface/frc 계약을 소비**하도록 매핑 필요.

## 2. 목표 상태
- **고객 UI main path가 `/api/slice/consult-foundation` 호출**(flag=foundation_contract일 때). 요청: `{message, serviceMode, productId?, locale?}`.
- **Foundation FRC를 Cosmile response adapter가 소비**(이미 route가 `decideResponseMode`/`enforceResponseSuppression` 수행 → `surface` 반환). shell은 `surface`를 렌더.
- **safety/commerce UI 렌더가 Foundation flag를 따름**:
  - `surface.mode==="safety"` → 상담/안전 문구, 상품카드/CTA/추천 0.
  - `surface.mode==="commerce"` → `surface.productRefs`(⊆ FRC.product_candidates)만 카드, CTA는 `surface.showCTA`.
  - `surface.mode==="consult"` → 설명, 카드 0.
- **기존 legacy route(`/api/slice/consult` + Mock Brain)는 rollback path로 유지**(삭제 0·격리).

## 3. 전환 방식 (feature/env flag)
- **flag**: `COSMILE_CONSULTATION_PROVIDER = foundation_contract | legacy`.
  - `legacy`(기본값 제안) → 기존 `/api/slice/consult`(Mock Brain). 현 동작 100% 보존.
  - `foundation_contract` → `/api/slice/consult-foundation`(Foundation 계약).
- **기본값 = `legacy`**(fail-safe·회귀 0). dev/shadow에서 opt-in으로만 foundation_contract.
- **flag 위치**: 서버측 env(route 선택) + shell이 참조하는 공개 설정(예: 기존 `lib/slice/flags`의 `sliceEnabled` 패턴 재사용). ★새 flag 인프라 신설 최소화(기존 flag 유틸 확장).
- **단계 구분**:
  - **dev**: flag=foundation_contract, 개발자 로컬 + :8731(02b5ac2) 가동. 
  - **shadow**: 기본 legacy 유지 + (선택) foundation_contract를 내부 계정/샘플 트래픽에만.
  - **live**: ★**별도 승인 게이트**(§8). 이번 설계는 dev/shadow까지만 열고 live는 닫아둔다.

## 4. 안전 조건 (fail-closed·불변)
- **Foundation unavailable/timeout/5xx/404** → route fallback fail-closed 유지(Mock Brain pseudo-FRC + safety wrapper·`dual-adapter-fallback-eval.mjs` 검증). shell은 `source`와 무관하게 `surface`만 신뢰(surface가 이미 억제 반영).
- **mock_fallback**이 카드/CTA/refs/recommendation을 **열지 않음**(fallback도 suppression 통과·detector escalate-only).
- **safety mode** → 상품카드/CTA/추천/refs **0**(surface.showProductCards/showCTA/showRecommendation=false·productRefs=[]).
- **commerce mode** → `surface.productRefs ⊆ FRC.product_candidates`(서비스 제품 자작 0). productId/candidates는 catalog port에서만.
- **forbidden_expressions 렌더링 처리**: FRC.forbidden_expressions(예 `continue_use_permission`·`efficacy_overclaim`)를 shell 렌더가 **금지 토큰으로 취급**(해당 표현 생성/노출 금지). 최소: safety mode 문구 템플릿에 계속사용 허가·효능 단정 미포함(현 route surface.answerText가 이미 안전 문구). 완전 강제는 WATCH(렌더 계약 train)와 연계.
- **Foundation FRC가 최종 안전 기준**: shell은 surface를 낮추지 않음(서비스는 escalate만).

## 5. UI 변경 범위
- **변경 대상(후보·Cosmile 팀 소유)**:
  - `app/src/components/slice/ConsultationChatShell.tsx` — 호출 endpoint를 flag 분기(`/api/slice/consult` ↔ `/api/slice/consult-foundation`) + 응답 매핑(Mock Brain resp ↔ consult-foundation surface). ★현재 **미커밋 WIP** → Cosmile 팀이 WIP 안정화/커밋과 함께 처리(control 미접촉).
  - (선택) `app/src/lib/slice/flags*` — `COSMILE_CONSULTATION_PROVIDER` 게이트 추가(기존 flag 유틸 확장).
  - (선택) 응답 매핑 helper(shell 내부 또는 `adapters/`의 얇은 view mapper·판단 0).
- **수정하면 안 되는 파일 / 금지**:
  - ★`/api/slice/consult/route.ts`(기존 Mock Brain route) **삭제·수정 금지**(rollback).
  - ★`lib/foundation/mockBrain`·`mockFoundationConsultation`(Mock Brain) **삭제 금지**(fallback/legacy/shadow 격리).
  - ★`app/src/adapters/*`(foundationClient/cosmileSemanticAdapter/cosmileResponseAdapter) 계약 로직 변경 금지(뷰 매핑만 shell측).
  - ★Foundation/SIASIU 코드 수정 금지 · shared SDK 생성 금지 · 다른 WIP 6종 미접촉.

## 6. rollback 전략
- **env flag로 즉시 legacy 복귀**: `COSMILE_CONSULTATION_PROVIDER=legacy` → 재빌드/재시작 없이(또는 최소 재시작) 기존 `/api/slice/consult` 경로 복귀. 기본값이 legacy라 미설정 시 자동 안전.
- **장애 시 fail-closed**: foundation_contract인데 route가 fallback(Foundation down)이면 surface가 이미 fail-closed(카드/CTA 0). shell은 정상 렌더하되 상품 유도 0.
- **Foundation down 시 green/normal 위장 금지**: dev/eval에서 `source=foundation_http` 미관측이면 "정상"으로 표기 금지(preflight LIVE BLOCKED 원칙 유지). 고객 UI는 fail-closed 상담 모드로만 동작(상품 0), "정상 추천"으로 위장 안 함.

## 7. 테스트 계획
1. **UI 실제 호출 endpoint 확인**: flag=foundation_contract에서 shell이 `/api/slice/consult-foundation` 호출(네트워크/로그).
2. **source=foundation_http 확인** (Foundation :8731=02b5ac2 가동 시).
3. **mock_fallback=false 확인**(live).
4. **safety case**: 붓/발진/따가+계속/화끈+추천/레티놀알레르기 → UI에 카드/CTA/추천/refs **0**·전체 payload fprod_ 누수 0.
5. **commerce case**: 민감피부 세럼 → refs 노출·`refs ⊆ FRC.product_candidates`·CTA는 products_allowed/recommendation_allowed 종속.
6. **legacy rollback test**: flag=legacy → 기존 `/api/slice/consult`(Mock Brain) 동작·응답 shape 유지.
7. **Foundation down test**: :8731 down → route fallback fail-closed(카드/CTA 0)·UI green 위장 0.
8. **loop100 / smoke**: `vertical-slice-v0-loop100.mjs`(기존 UX 회귀) + `dual-adapter-eval.mjs`(live) + `dual-adapter-fallback-eval.mjs`(fallback) 전부 green(live는 Foundation 가동 필수).
9. **기존 경로 불변**: legacy에서 Mock Brain baseline·`/api/slice/consult` 응답 유지.

## 8. Release Gate (승인 단계 분리)
| 게이트 | 범위 | 승인 |
|---|---|---|
| **dev only** | flag=foundation_contract, 개발 로컬, :8731 가동 | 개발자 |
| **internal smoke** | 내부 계정/합성 트래픽, dev/shadow | control 검수 |
| **Leo 승인** | UI switch를 shadow 기본 노출 후보로 | ★Leo |
| **production exposure** | 실사용자 UI main path=foundation_contract | ★별도 승인 release train |
| **write / cart / checkout** | 상품 담기·주문·결제·cart DB write | ★별도 승인(CART-WRITE WATCH)·현재 **write 0 유지** |
- ★이번 설계는 **dev/shadow까지만** 여는 것을 목표. production exposure·write는 명시적 별도 승인 전까지 **닫힘**.

## 9. Fable5 재검수 필요 여부
- **필요(권장)**: UI switch 후 **targeted UI-path audit** — 고객 UI가 실제로 `/api/slice/consult-foundation`을 타고, surface 억제가 렌더까지 강제되며, legacy rollback·Foundation-down fail-closed·mock_fallback 비노출·forbidden_expressions 미노출을 UI 레벨에서 재확인.
- **범위**: FABLE5-AUDIT-01 §1.5 유지(배선/계약/안전/경계) + **렌더 강제**(surface→실제 DOM/응답 억제) 추가. retrieval/memory 품질은 여전히 비범위(AUDIT-02).
- **트리거**: dev/internal smoke PASS + shell commit(WIP 안정화) + control §D-UI checklist PASS.

## 10. 구현 프롬프트 초안 (승인 후 Cosmile 담당에게 · 복사용)
```text
[COSMILE-CONNECT-UI-SWITCH — Cosmile 구현]
대상 repo: Cosmile (app/src/components/slice/, app/src/lib/slice/, app/scripts/) · baseline: 11a8698
전제: Dual-Service Adapter Layer CLOSED · /api/slice/consult-foundation 검증됨(15/15) · ★설계서 승인 후 착수.

목표: 고객 상담 UI main path를 flag로 /api/slice/consult(legacy·Mock Brain) ↔ /api/slice/consult-foundation(Foundation 계약) 전환.

수정 대상:
- ConsultationChatShell.tsx: 호출 endpoint를 COSMILE_CONSULTATION_PROVIDER flag로 분기 + consult-foundation 응답(surface/frc) 소비 매핑(mode/showProductCards/showCTA/showRecommendation/productRefs/answerText). productId 하드코딩("fprod_elt01") 제거·실제 context 사용.
- (선택) lib/slice/flags*: COSMILE_CONSULTATION_PROVIDER=foundation_contract|legacy 게이트(기본 legacy).
- (선택) 얇은 응답 view mapper(판단 0).

수정 금지:
- ★/api/slice/consult/route.ts 삭제·수정 금지(rollback) · Mock Brain(mockBrain/mockFoundationConsultation) 삭제 금지(fallback/legacy 격리).
- ★adapters/* 계약 로직 변경 금지(뷰 매핑만) · Foundation/SIASIU 수정 금지 · shared SDK 금지 · 다른 WIP 6종 미접촉.
- ★production exposure·write·cart·checkout 금지(flag 기본 legacy·write 0).

안전 불변(fail-closed):
- safety mode → 카드/CTA/추천/refs 0 · commerce → refs ⊆ FRC.product_candidates · mock_fallback도 상품 0 · Foundation down → fail-closed(green 위장 0) · forbidden_expressions 미노출.

테스트(필수):
- UI 호출 endpoint 확인 · source=foundation_http · mock_fallback=false · safety 5 카드/CTA/refs/추천 0(payload fprod_ 누수 0) · commerce refs⊆FRC · legacy rollback · Foundation down fail-closed · loop100 + dual-adapter-eval(live) + dual-adapter-fallback-eval.
- ★live 테스트는 Foundation :8731(02b5ac2) 가동 필요 → Control에 서버 기동 요청(담당이 직접 :8731 안 띄우면 Control이 기동/정리).

경계/정리:
- 기존 UX 회귀 0 · Mock Brain baseline 보존 · 자기가 띄운 dev/서버만 정리 · 남의 서버 미접촉.
- 로컬 commit(git add <명시 파일>·git add -A/. 금지·WIP 6종 미포함) · ★push 0.

완료 보고: 변경/커밋 파일(절대경로) · flag 동작(legacy/foundation_contract) · UI endpoint 증거 · source=foundation_http · safety/commerce 결과 · rollback/down fail-closed · loop100/eval 결과 · 기존 consult/Mock Brain 무접촉 · push 0 · 서버 정리.
STOP.
```

---

## 위험 / rollback 요약
- **최대 위험**: 고객 UI main path 변경 = 실사용자 경험에 가장 근접 → flag 기본 legacy·production 별도 승인으로 격리. WIP(ConsultationChatShell) 충돌 → Cosmile 팀 조율.
- **rollback**: env flag=legacy 즉시 복귀 · Mock Brain/legacy route 보존 · Foundation down fail-closed.

## 한계 / 승인 필요 항목
- 이 문서 = 설계서(DRAFT). 구현은 **Leo 승인 후** Cosmile repo-local.
- ★승인 필요: (1) 설계 방향 승인 · (2) 구현 프롬프트 발행 · (3) production exposure(별도 train) · (4) write/cart/checkout(별도 train·CART-WRITE).
- live/write/promotion·real user exposure = 이번 설계 **미포함**(dev/shadow까지). 코드 수정 0 · push 0.
