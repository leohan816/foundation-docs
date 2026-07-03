# COSMILE-CONNECT-UI-SWITCH — Control Re-Review (PATCH · read-only)

> 작성: foundation-control (control tower) · 2026-07-02 · read-only(코드 수정 0 · 문서 수정 0(본 보고서 외) · push 0)
> 대상: amend commit **35febe2** (이전 729bd38 amend) · 이전 판정 PATCH_REQUIRED(cart write 혼입)

## 1. 최종 판정: **UI_SWITCH_CONTROL_PASS** (★단 working-tree/runtime WATCH 필수)
이전 blocker(**커밋에 cart DB write 혼입**)는 **commit 35febe2 기준 해소**. provider-switch 6항목·foundation path·safety·boundary 전부 유지. 단 **cart-unification은 working tree에 uncommitted WIP로 잔존** → dev server(:3000) runtime은 여전히 cart write 실행 → "cart write 0"은 **commit(HEAD) 기준으로만 성립**(runtime 아님). production/CI는 반드시 **HEAD-clean 빌드**여야 함(WATCH).

## 2. commit 35febe2 확인
- `35febe2 feat(slice): COSMILE-CONNECT-UI-SWITCH — 상담 provider flag(legacy ↔ foundation_contract)`.
- 729bd38 amend. **7 파일**. ConsultationChatShell **+42/-10**(729bd38의 +51/-16 대비 cart hunk 축소). push 0(ahead 17·미push).

## 3. 변경 파일 목록 (7 · git add -A 미사용)
flags.ts · consultFoundationView.ts(신규) · ConsultFoundationResult.tsx(신규) · ConsultationChatShell.tsx · ConsultationMessageList.tsx · consult-foundation/route.ts · consult-ui-switch-eval.mjs(신규). WIP·seed·oasis 미포함.

## 4. 이전 blocker(cart write 혼입) 해소 여부 — **해소(commit 기준)**
- **HEAD:ConsultationChatShell.tsx** L121-122: `function addToCart(line) { cart.add(line); // 공유 세션 store }` — **client/session store로 복원**.
- **commit diff `/api/cart/items` 추가 라인 = 0** (직접 확인). prisma/checkout/order write 변경 0.
- → 이전 blocker(커밋에 cart DB write) **commit 기준 해소**.

## 5. commit 기준 write/cart/checkout 0 증거
| 검사(HEAD 기준) | 결과 |
|---|---|
| `git show HEAD:ConsultationChatShell.tsx` `/api/cart/items` | **0**(cart.add만) |
| commit diff `+ …/api/cart/items` | **0** |
| checkout/order/payment/prisma write 변경 | **0** |
| 기존 `/api/slice/consult` route·Mock Brain 본체 변경 | **0** |

## 6. working tree WIP ↔ runtime 오염 가능성 — ★WATCH
- **온-디스크(working tree) ConsultationChatShell.tsx** L118-120: `async addToCart … await fetch("/api/cart/items", POST …)` — **cart-unification WIP가 아직 남아있음**(uncommitted).
- `git status`: `M ConsultationChatShell.tsx` · `M cart/page.tsx` — cart-unification = **uncommitted WIP로 분리됨**(commit엔 없음).
- **오염 판정**: dev server(:3000)는 **working tree를 서빙** → runtime은 여전히 legacy 경로 담기에서 cart write 실행. 즉 **"cart write 0"은 HEAD(commit) 기준으로만 참**이고 **runtime(:3000) 기준으론 거짓**.
- **검증 무결성**: 보고된 ui-switch/dual-adapter-eval 결과는 provider-switch·foundation-path 동작 검증(addToCart 미접촉)이라 **WIP에 오염되지 않음**(유효). 단 **"no cart write" 런타임 주장은 WIP 오염**되므로 신뢰 불가 — cart-write-0은 본 검수의 **HEAD 정적 확인**이 authoritative.
- **필수 조건**: production/CI 빌드는 **HEAD-clean(35febe2·WIP 제외)**이어야 cart write가 실배포되지 않음. cart-unification WIP → **CART-WRITE 승인 train**으로.

## 7. provider-switch 항목별 PASS/FAIL (HEAD 기준)
| 항목 | 결과 | 근거(HEAD) |
|---|---|---|
| provider flag | **PASS** | `optIn(===foundation_contract) && NODE_ENV!==production` → 그 외/unknown/**production=legacy 강제** |
| endpoint switch | **PASS** | `provider==="foundation_contract"&&message → consultViaFoundation(/consult-foundation)` else `consultViaLegacy(/consult)` |
| 기존 consult route/Mock Brain 무변경 | **PASS** | commit에 해당 파일 0 |
| response mapping | **PASS** | consultFoundationView(any **0**·shape guard·hard-stop 유지)·legacy `resp.decisionType`와 별 함수/별 타입 |
| rollback | **PASS** | flag=legacy 즉시 복귀·기본 legacy·production 강제 legacy |

## 8. safety / commerce rendering PASS/FAIL (HEAD)
| 조건 | 결과 |
|---|---|
| mode=safety/consult·block·safety_first·products_allowed=false·recommendation_allowed=false·mock_fallback → 상품/CTA/추천/refs 0 | **PASS**(view hard-stop 7 + route safety/fallback→[]) |
| commerce: productRefs ⊆ FRC candidates | **PASS**(route allowedRefs filter·displayProducts⊆) |
| foundation path productId 하드코딩 | **PASS**(0·fprod_elt01은 legacy에만) |
| ConsultFoundationResult 읽기전용(담기/CTA 없음) | **PASS** |

## 9. analytics / event tracking 0 (foundation path)
- **consultViaFoundation** (HEAD L92-98): `foundationSurfaceToMessage → push` — **신규 emitSignal 0**. 주석 "행동 추적은 이번 slice 밖(COSMILE-EVENT-TRACKING-*)".
- legacy path `emitSignal("consultation_shown")`·addToCart `emitSignal("cart_add")`는 **기존 신호**(신규 아님). order/customer/product/session/campaign tracking 작업 0.

## 10. 남은 리스크
- **[WATCH·HIGH] working-tree/runtime 오염**: cart-unification WIP(`/api/cart/items`)가 온-디스크에 잔존 → :3000 runtime은 cart write 실행. commit은 clean이나 **runtime≠HEAD**. production HEAD-clean 빌드 강제 + WIP는 CART-WRITE train 격리 필요.
- **[정보] 테스트 재실행 안 함**: 팀 보고(ui-switch 16/16·dual-adapter-eval 15/15·fallback 8/8·loop100 1377/0·tsc 0) 인용. Control은 **blocker(cart write 0)만 HEAD 정적 직접 확인**. 런타임 재실행은 WIP 오염이라 미실시(팀 WIP를 stash/수정하지 않음).
- foundation path 자체 리스크 0.

## 11. 다음 단계
- provider-switch slice(commit 35febe2) = CONTROL_PASS. **Fable5는 보류**(지시대로 — Cosmile 큰 묶음 완료 후 통합 감사).
- 후속: (a) cart-unification WIP → **CART-WRITE 승인 train**(별도 설계서·승인). (b) production exposure(실사용자 main path=foundation_contract) → **별도 승인 train**. (c) 통합 감사 시 HEAD-clean 기준 재실행 + cart write 0 runtime 재확인.

## 12. 코드 수정 0 / 문서 수정 0 / push 0
Control foundation-control 코드 **0** · SIASIU/Cosmile 미접촉(파일 read + git show만) · 문서 = 본 검수 보고서 1건 · **push 0**.

## 13. 서버 / 프로세스 상태
`:8731`=0 · `:8732`=0 · foundation_http_service 프로세스=0 · `:3000`(Cosmile 팀·미접촉·WIP 서빙 중).

---

## 요약
amend commit **35febe2**로 cart write가 **commit에서 제거**(HEAD `addToCart=cart.add`·`/api/cart/items` 0) → 이전 blocker **해소**. provider-switch/foundation-path/safety/boundary/any-0 전부 유지 → **UI_SWITCH_CONTROL_PASS**. ★단 cart-unification이 **working tree uncommitted WIP로 잔존** → dev(:3000) runtime은 cart write 실행 → **cart-write-0은 HEAD 기준만 참**·production은 HEAD-clean 빌드 필수·WIP는 CART-WRITE train으로. Fable5는 통합 감사로 보류. Control 코드 0·push 0·서버 잔여 0.
