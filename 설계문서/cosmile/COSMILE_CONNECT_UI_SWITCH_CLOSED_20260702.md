# COSMILE-CONNECT-UI-SWITCH — Slice 마감 기록 (CONTROL_PASS)

> 작성: foundation-control (control tower) · 2026-07-02 · 문서 정리(코드 수정 0 · push 0)
> 최종 판정: **UI_SWITCH_CONTROL_PASS** · commit **35febe2**(HEAD) · 상세 검수: `docs/COSMILE_CONNECT_UI_SWITCH_REVIEW2_20260702.md`
> ★성격: read-only/mock/shadow provider-switch slice. production exposure·write = 미포함(별도 승인 train).
> ★Fable5 = 아직 호출 안 함(Cosmile 큰 묶음 완료 후 **통합 감사로 보류**).

---

## 1. 마감 상태
**COSMILE-CONNECT-UI-SWITCH = CONTROL_PASS** (commit **35febe2** / HEAD 기준).
Cosmile 고객 상담 UI가 env flag로 기존 `/api/slice/consult`(legacy·Mock Brain) ↔ 검증된 `/api/slice/consult-foundation`(Foundation 계약)을 선택하는 구조를 계약·안전·경계 기준 통과.

## 2. provider-switch 항목 (HEAD 기준 PASS)
| 항목 | 결과 |
|---|---|
| provider flag(`COSMILE_CONSULTATION_PROVIDER`) | **PASS** — unknown/미설정/production → **legacy 강제**(fail-safe) · foundation_contract는 non-prod opt-in |
| endpoint switch | **PASS** — `foundation_contract`→`/api/slice/consult-foundation` · `legacy`→`/api/slice/consult` |
| foundation response mapping | **PASS** — `consultFoundationView`(surface→표시·shape guard/normalize·**any 0**)·legacy shape와 혼동 0 |
| safety rendering hard-stop | **PASS** — safety/consult/block/safety_first/products_allowed=false/recommendation_allowed=false/mock_fallback → 상품/CTA/추천/refs 0 |
| commerce rendering | **PASS** — commerce에서만·`productRefs ⊆ FRC.product_candidates`·foundation path productId 하드코딩 0·ConsultFoundationResult 읽기전용 |
| rollback | **PASS** — flag=legacy 즉시 복귀·기본 legacy·기존 consult route/Mock Brain 본체 무변경 |

## 3. cart write blocker — commit 기준 **해소**
이전 판정(PATCH_REQUIRED)의 blocker = commit 729bd38에 cart-unification WIP 번들(`addToCart → POST /api/cart/items` prisma cart write). **amend commit 35febe2에서 cart hunk 제거** → HEAD `addToCart = cart.add(line)`(client/session store 복원) → **blocker commit 기준 해소**.

## 4. HEAD 기준 `/api/cart/items` 호출 = **0**
`git show HEAD:app/src/components/slice/ConsultationChatShell.tsx` → `/api/cart/items` **0**(cart.add만) · commit diff `+…/api/cart/items` **0**.

## 5. HEAD 기준 checkout / order / payment / prisma cart write 변경 = **0**
commit 35febe2에 checkout·order·payment·prisma cart write 관련 변경 **0** · 기존 `/api/slice/consult` route·Mock Brain 본체 변경 **0**.

## 6. foundation path 신규 event tracking = **0**
`consultViaFoundation`(HEAD)는 신규 `emitSignal` **0**(주석: 행동 추적은 이번 slice 밖). legacy `consultation_shown`·`cart_add`는 **기존 신호**(신규 아님). order/customer/product/session/campaign tracking 작업 0.

## 7. ★working tree에 cart-unification WIP 잔존
온-디스크 `ConsultationChatShell.tsx`(L118~)에 `async addToCart … await fetch("/api/cart/items", POST …)` **cart-unification WIP가 uncommitted로 남아 있음**. `git status`: `M ConsultationChatShell.tsx` · `M cart/page.tsx`. → cart-unification은 **commit에 없고 working tree WIP로 분리됨**.

## 8. ★runtime cart write 0이라고 주장하지 말 것
현재 **dev server(:3000)는 working tree(=WIP 포함)를 서빙** 중 → runtime은 legacy 경로 담기에서 **cart write 실행**. 따라서 **"cart write 0"은 commit(HEAD) 기준으로만 참**이며, **:3000 runtime 기준으로는 거짓**. 런타임 "no cart write" 주장 **금지**. cart-write-0의 authoritative 근거 = 본 검수의 **HEAD 정적 확인**(§4·§5).

## 9. ★production / CI = HEAD-clean build 기준
production·CI 빌드는 반드시 **HEAD-clean(35febe2·working tree WIP 제외)** 기준이어야 cart write가 실배포되지 않는다. working tree(WIP 포함)로 빌드/배포하면 cart write가 새어나감 → 금지.

## 10. cart-unification → 별도 CART-WRITE 승인 train
working tree의 cart-unification WIP(`/api/cart/items` prisma cart write, `useSliceCart` 제거 등)는 **별도 CART-WRITE 승인 release train**으로 이동. 설계서 → 승인 → 구현. 승인 전까지 write/cart/checkout = **0 유지**.

## 11. 다음 slice: **COSMILE-EVENT-TRACKING-AUDIT**
- 성격: Cosmile 행동 추적/analytics(emitSignal `consultation_shown`·`cart_add` 등)·order/customer/product/session/campaign 연결의 **경계·write 게이트 감사**(이번 slice에서 명시적으로 제외한 영역).
- ★design-first: 설계자료 설계서 먼저 → 승인 → 구현. write/live/promotion = 별도 승인.
- Fable5 통합 감사(Cosmile 큰 묶음 완료 후)와 연계 가능.

## 12. 코드 수정 0 / push 0
- Control foundation-control 코드 변경 **0** · SIASIU/Cosmile 코드 미접촉 · 문서 = 본 마감 기록 1건.
- Cosmile commit 35febe2 = **local**(ahead·미push) · **push 0**.
- 서버/프로세스: `:8731`=0 · `:8732`=0 · foundation 프로세스=0 · `:3000`(Cosmile 팀·WIP 서빙·미접촉).

---

## 기준 커밋표
| repo | commit | 상태 |
|---|---|---|
| Foundation (foundation-control) | `02b5ac2` | CONTRACT-01 Phase B + A-1~A-4 |
| SIASIU | `1142198` | 02A + B-1~B-3 |
| Cosmile (adapter slice) | `11a8698` | 02B + C-1~C-5 |
| **Cosmile (UI switch)** | **`35febe2`** | **COSMILE-CONNECT-UI-SWITCH CONTROL_PASS** |

## 요약 (보고 언어)
COSMILE-CONNECT-UI-SWITCH = **CONTROL_PASS** (commit `35febe2`/HEAD). provider flag·endpoint switch·foundation mapping·safety hard-stop·rollback PASS. cart write blocker = **commit 기준 해소**(HEAD `/api/cart/items` 0·checkout/order/prisma write 0). ★cart-unification은 **working tree WIP로 잔존** → **runtime(:3000) cart write 0 아님** · **production/CI는 HEAD-clean build 필수** · WIP는 **CART-WRITE 승인 train**으로. foundation path 신규 tracking 0. 다음 = **COSMILE-EVENT-TRACKING-AUDIT**. Fable5 = 통합 감사로 보류. 코드 수정 0 · push 0 · 서버 잔여 0.
