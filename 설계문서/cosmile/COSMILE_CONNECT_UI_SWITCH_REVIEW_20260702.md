# COSMILE-CONNECT-UI-SWITCH — Control Review (read-only)

> 작성: foundation-control (control tower) · 2026-07-02 · read-only 검수(코드 수정 0 · 문서 수정 0(본 보고서 외) · push 0)
> 대상: Cosmile UI switch commit **729bd38** (baseline 11a8698 · Foundation 02b5ac2 · Dual-Service Adapter CLOSED)

## 1. 최종 판정: **PATCH_REQUIRED**
provider-switch slice(6항목)의 **foundation path 구현 자체는 clean**(읽기전용·write 0·tracking 0·refs⊆FRC·fail-closed). 그러나 커밋이 **out-of-scope cart-unification WIP를 번들**해 `addToCart`를 **실제 cart DB write(`POST /api/cart/items`, prisma)**로 바꿈 → 이 write는 **production-default(legacy) 경로에서 도달** → 지시 item 2("write/cart/checkout DB write 없음") 및 설계 §8(cart/write = 별도 CART-WRITE 승인·현재 write 0) **위반**. CLOSED/READY 차단.

## 2. 변경 파일 목록 (7 · git add -A 미사용)
| 파일 | 성격 |
|---|---|
| `app/src/lib/slice/flags.ts` | provider flag(consultationProvider/consultationEndpoint) |
| `app/src/lib/slice/consultFoundationView.ts` (신규) | surface→표시 view mapper(판단 0·any 0·hard-stop) |
| `app/src/components/slice/ConsultFoundationResult.tsx` (신규) | 읽기전용 상품 표시(담기/CTA 없음) |
| `app/src/components/slice/ConsultationChatShell.tsx` | provider 분기 + ★cart-unification WIP 번들 |
| `app/src/components/slice/ConsultationMessageList.tsx` | foundationProducts 렌더 훅(+4줄) |
| `app/src/app/api/slice/consult-foundation/route.ts` | commerce refs만 catalog overlay(+8줄) |
| `app/scripts/consult-ui-switch-eval.mjs` (신규) | ui-switch eval |
- ★WIP 6종(next.config/cart/page/group-deal/layout/AppHeader/WishlistList)·seed·oasis **미포함**(여전히 M·미stage). ConsultationChatShell(구 WIP)은 switch와 함께 커밋됨(동일 파일 부분 스테이지 회피).

## 3. 항목별 PASS/FAIL
| # | 항목 | 결과 | 근거 |
|---|---|---|---|
| 1 | slice 범위 6항목 유지 | **FAIL** | 7번째(cart-unification·useSliceCart→prisma write·🛒 Link 제거) 번들 = 범위 이탈 |
| 2 | tracking/write 미혼입(write/cart/checkout 0) | **FAIL** | `addToCart` → `POST /api/cart/items`(prisma cart write) 추가. ★foundation path는 0이나 legacy(prod-default)에서 도달 |
| 3 | provider flag | **PASS** | `optIn(===foundation_contract) && NODE_ENV!==production` → 그 외/unknown/production=**legacy 강제**(fail-safe) |
| 4 | endpoint switch 증거 | **PASS** | shell이 flag로 `/api/slice/consult` ↔ `/api/slice/consult-foundation` 분기 · 기존 consult route/Mock Brain 본체 무수정 |
| 5 | foundation response mapping | **PASS** | `consultFoundationView`(surface→표시·shape guard/normalize·any 0) · legacy `resp.decisionType`와 혼동 0(별 함수·별 타입) |
| 6 | safety rendering hard-stop | **PASS** | view+route: safety/consult/mock_fallback/products_allowed=false/block → 상품 0 · foundation 렌더=ConsultFoundationResult(읽기전용·담기/CTA 없음) |
| 7 | commerce rendering | **PASS** | route: displayProducts ⊆ surface.productRefs(⊆FRC) · safety/fallback→[] · foundation path fprod_elt01 하드코딩 0(legacy에만 격리) |
| 8 | quality bar | **PARTIAL** | any 0·guard/normalize·책임분리(flag/view/render) 양호 · ★단 cart-unification churn(useSliceCart 제거·Link 제거·addToCart 변경)이 switch 범위 밖 churn |
| 9 | 테스트 | **REPORTED**(control 미재실행) | 팀 보고: ui-switch 16/16·dual-adapter-eval 15/15(foundation_http=true)·fallback 8/8·loop100 1377/0·tsc 0. ★blocker는 정적 규명이라 이번 미재실행(재실행해도 cart write는 잔존) |
| 10 | git/무결성 | **PASS(단 §2)** | commit 729bd38 · 7파일 · WIP 6종 미stage · push 0(ahead 17·미push) · 서버 잔여 0 |

## 4. 남은 리스크 (PATCH_REQUIRED 본체)
- **[HIGH·BLOCKER] cart DB write 혼입**: `addToCart`(ConsultationChatShell:118, onAddDirect/onWeakAdd/ConfirmModal에서 호출)가 `POST /api/cart/items`(기존 prisma cart endpoint)로 **실제 write**. 이전엔 client `useSliceCart` 세션 store(무write)였음 → 이 커밋이 **client-only 담기를 실제 DB write로 승격**. production 기본 legacy 경로에서 도달 → 설계 write-0/CART-WRITE 게이트 위반.
  - **권고(remediation)**: cart-unification을 **provider-switch slice에서 분리**. ① 이 커밋에서 addToCart 변경을 되돌려 client store 유지(CART-WRITE 승인 전까지), 또는 ② cart-unification을 **별도 커밋/slice(CART-WRITE 승인 train)**로 격리. provider-switch 커밋은 cart write 0이어야 CLOSED 가능.
- **[정보] 동일 파일 번들 사유**: 팀 설명 = ConsultationChatShell WIP(cart-unification)와 switch가 동일 파일이라 부분 스테이지 회피. → `git add -p`(hunk staging) 또는 WIP 되돌림으로 분리 가능(파일 전체 커밋이 유일 방법 아님).
- **[낮음] test 미재실행**: 팀 보고 수치는 근거로 인용하나 control 미재현. cart 분리 재패치 후 재실행 필요.
- foundation path 자체(읽기전용·write 0·tracking 0·refs⊆FRC·fail-closed)는 **리스크 없음**.

## 5. Fable5 UI-path audit 필요 여부
- **아직 부적합(먼저 PATCH)**. cart-unification 분리 재패치 후: UI-path targeted audit **필요**(고객 UI 실제 endpoint·surface→렌더 억제 강제·legacy rollback·Foundation-down fail-closed·mock_fallback 비노출·**cart write 0 재확인**). 범위 = FABLE5-AUDIT-01 §1.5 + 렌더 강제. retrieval/memory 품질은 비범위(AUDIT-02).

## 6. 코드 수정 0 / 문서 수정 0 / push 0
- Control foundation-control 코드 변경 **0** · SIASIU/Cosmile 코드 미접촉 · 문서 = 본 검수 보고서 1건(그 외 문서 수정 0) · **push 0**.

## 7. 서버 / 프로세스 상태
- `:8731`=0 · `:8732`=0 · foundation_http_service 프로세스=0(잔여 0·stale 방지) · `:3000`(Cosmile 팀) 미접촉.

---

## 요약
provider-switch slice의 **foundation path·flag·mapping·safety·rollback·품질(any 0)**은 양호하나, 커밋이 **cart-unification WIP(실제 `/api/cart/items` prisma cart write)**를 번들해 **write/cart 0 게이트를 위반**(production-default legacy 경로 도달) → **PATCH_REQUIRED**. cart write를 별도 CART-WRITE 승인 train으로 분리(또는 이 커밋에서 되돌림) 후 재검수 → 통과 시 Fable5 UI-path audit. Control 코드 0·push 0·서버 잔여 0.
