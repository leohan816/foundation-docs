# F2 E6 O1 FAKE-PROMO SUPPRESSION — WORKER RESULT

Status: **PASS**

- Handoff `117` verified: docs `1148f9ab85d780c6c7c4a6a605a59e3f3143013e`, sha256 `4158a3b6ef6545fe8206445ef7dd79922e1d8411e29bc647e04e649602f6d4a8`.
- Base `40c12947aca718bc76b4b8e34e99e357239b9963` clean/upstream-equal → commit `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`, non-force pushed, clean/upstream-equal.
- The Advisor's reclassification is correct and I accept it: an unbacked promotion on a truth surface is a defect to fix, not a dialog for Leo to close.

## Correction

`layout.tsx` already derived the `o1` boolean once and threaded it to `AppHeader`, `CategoryNav`, `MallTabs`, `CategoryDrawer` and `ProductCartFab`. `ShippingPopup` was the **only** shell child mounted unconditionally, so it rendered over the admitted catalog claiming a one-day shipping event and `15,000원 → 0원` — a commercial claim no Cosmile price, offer or campaign backs.

It is now `{o1 ? null : <ShippingPopup />}`: not mounted under O1, byte-for-byte legacy behaviour otherwise. One line changed plus a comment. The popup component, shell, device frame, navigation, catalog, cart, favorite, checkout, price, stock, DB, provider, schema, config, package and lock are untouched.

## Tests first

`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_storefront_navigation.vitest.ts -t "O1 storefront never mounts the fabricated shipping promotion"`

- **RED**: `1 failed | 8 skipped (9)`, exit `1`, on the ungated mount.
- **GREEN**, identical command: `1 passed | 8 skipped (9)`, exit `0`.

The case is adversarial rather than a bare absence check: it requires the popup to be **still imported and still rendered for the legacy branch**, requires the gate to reuse the single existing `o1RuntimeEnabled` derivation (exactly one in the file), forbids any surviving unconditional mount, pins the rest of the shell structure unchanged, and asserts the popup component keeps its own content.

## Live verification (hot reload only)

The owned runtime hot-reloaded in place — **same PID `2737382`**, one listener, no rebuild, no restart, local `GET /` 200. Then exactly two read-only public navigations through one clean owner-only temporary CDP profile under `runtime/f2-promo-check/`:

| Page | Status | Promo text absent | `15,000` token absent | Blocking overlay absent | Distinct product links | Exactly the seven |
|---|---|---|---|---|---|---|
| `/` | **200** | ✅ | ✅ | ✅ | 7 | ✅ |
| `/shop` | **200** | ✅ | ✅ | ✅ | 7 | ✅ |

Overlay absence was measured structurally — no visible fixed/absolute element larger than 300×250 within the viewport — not merely by text matching. No clicks, login, Google, Toss, provider, DB, cart, order, payment, refund, or any other route.

## Containment

- Exactly the two ceiling paths; 32 insertions, 1 deletion. `git diff --check` exit `0`; `package.json`, `package-lock.json`, `prisma/` unchanged.
- `runtime/f2-promo-check/` removed and verified absent; Chromium fully exited (0 processes). The live runtime, both earlier screenshots, `candidate.pid` and the `.next` rollback quarantine are preserved untouched.
- No build, restart, DB, provider or economic action; no other catalog/detail/readiness gate was re-run.

## Not proven

- The legacy (O1-off) branch was not exercised at runtime; its preservation is proven by source contract only, since no non-O1 runtime exists here.
- The two earlier screenshots in `runtime/` still show the promotion — they are the pre-correction evidence and were deliberately not regenerated, as this handoff authorized no new capture.
- Only `/` and `/shop` were navigated. Detail routes, authenticated routes and every write path remain untested here.
