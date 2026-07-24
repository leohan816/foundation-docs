# P1 Census Correction — O1 Cart Checkout Classification

ACTOR: Cosmile Worker (Opus 4.8/xhigh), read-only. Handoff 16 verified SHA256 `9c51ad6b…` ✓ blob `c0eb24e1…` ✓ (docs `c42e485e`). Base `51ef5f2` clean, no product write. Corrects only result-14 C1 from the exact three files; every other result-14 finding is preserved by reference (unchanged).

## RETRACTION of C1 (result 14 was wrong)
The O1 cart checkout IS wired, conditionally:
- `cart/page.tsx:13,56` — `const o1 = o1RuntimeEnabled(process.env)`; `<CartList … o1={o1} o1Error={…} />`.
- `CartList.tsx:5,167-185` — renders `o1 ? <O1TossCheckout disabled={!lines.length}/> : <legacy mock button onClick={checkout}>`. The legacy `checkout()` (→ `/api/checkout/start`+`/api/checkout/mock-complete`) is reached ONLY in the flag-OFF branch. So O1 mode never uses the mock lane; there is NO missing cart→O1 wire.

## O1 checkout behavior (classified only where the three files prove it) — status CONNECTED
- **Start**: `O1TossCheckout.pay()` POST `/api/o1/checkout/start` body `{}` → `{ok,orderId,orderNo,amount,clientKey,evidenceLayer}` (O1TossCheckout.tsx:94-104).
- **Pending/busy**: `setBusy(true/false)`; button "결제 진행 중…", `disabled={busy||disabled}` (85,145-149).
- **Local substitute** (`DETERMINISTIC_LOCAL_COMPOSITION`): mints `localsub_${orderNo}`, navigates to own success return; no SDK/provider/network; UI-labelled amber "공식 sandbox 증거 아님" (110-115,150-153).
- **Official Toss TEST** (`OFFICIAL_PROVIDER_SANDBOX_EXECUTION`): `loadTossSdk()` (js.tosspayments.com/v2/standard) → `sdk.payment({customerKey:o1_${orderNo}}).requestPayment(buildTossPaymentRequest{method CARD, amount{KRW,value}, orderId=orderNo, success/failUrl, sandbox:{paymentResult:"SUCCESS"}})` (61-82,117-134). Component never handles card data.
- **Fail redirect**: `failUrl = ${origin}/api/o1/checkout/toss/fail` passed to the request (108,133).
- **Browser-visible error/recovery**: `setError(category|reason|error|"checkout_unavailable"|"client_key_missing"|"sdk_unavailable"|"checkout_failed")` rendered inline; plus server `o1Error` shown in `CartList` `data-testid="o1-cart-error"` (100-101,118-137,155; CartList.tsx:169-173).
- **Successful navigation**: local → `window.location.href` success; official → provider redirects to `successUrl`; server `toss/success` confirms (WU-B) then redirects `/orders/{id}?o1=1` (result-14 evidence, unchanged).

## Remaining proposed modules (no cart→O1 wire invented; P1 withdrawn)
- **P2** O1-gate home `/` (page.tsx never checks `o1RuntimeEnabled`) — stands (result 14 C2).
- **P3** account Google-mode identity (no MOCK_USER leak) — stands.
- Cart→O1 checkout: **already CONNECTED** — no module needed.

## Preserved by reference (result 14, unchanged)
Surfaces 1-8, api/cart/**, o1/checkout/start + toss success/fail, o1/orders + service-request, auth/google + logout classifications; contract-change assessment (none apparent); UNVERIFIED list (legacy api/checkout/**, foundationProductClient/MOCK_USER/getShopper/o1CommerceRuntime, coupons/wishlist). No product/test/build/DB/runtime/browser/provider/network action; no commit/push.

RETURN_TO foundation-advisor. STOP.
