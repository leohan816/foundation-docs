# ADVISOR FREEZE — ISOLATED ORIGINAL-SIZE BROWSER GATE

STATUS: **FROZEN**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1

## Pins and non-collision

- Candidate: `82fb922b64a38d563db91cc87736a229fa5558dc`, clean and upstream-equal.
- Existing public runtime remains untouched on `127.0.0.1:3000`, predecessor
  worktree `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`, product
  `a10604121aeba0207c12bb1cce8e961e73ad7abc`.
- Isolated candidate runtime: one process group on `127.0.0.1:31082`.
- The wrapper may inherit the existing protected non-production runtime
  environment from the verified owned public process without printing or
  persisting values. It must force `O1_TOSS_SANDBOX_ONESHOT=0`,
  `O1_TOSS_LOCAL_SUBSTITUTE=0`, and a loopback public-base override.
- No public-host, DB-write, auth, provider, cart, order, payment, refund, or
  economic action is permitted.

## Exact gate

1. Use only worktree-local pinned dependencies. Generate the pinned Prisma
   client without a DB connection, dependency change, or network fetch.
2. Start the candidate once on loopback `31082`; TCP readiness only.
3. Use the already-installed local Playwright module and pinned local Chromium
   once, with two read-only pages:
   - `/` at `1440x900`;
   - `/` at `390x844`.
4. Prove categorically:
   - HTTP 200, seven product cards, seven distinct product detail links;
   - all seven detail links return 200 read-only;
   - exactly six customer tabs and six inline SVG icons;
   - Cart label/link present;
   - desktop device width `390px`, horizontally centred, tabs contained;
   - mobile edge-to-edge with no device padding/radius/shadow and no horizontal
     overflow;
   - no iframe, replacement glyph, console error, or page error;
   - `/dashboard` returns 200 and is not wrapped by the customer device.
5. Persist only the two original-size PNGs and categorical JSON under:
   `/home/leo/Project/FOUNDATION/tmp/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/evidence/`.
6. Stop the exact isolated process group, remove its generated `.next`, runtime
   PID/log/controller residue, and prove ports/process absence. Preserve the
   screenshots/JSON for Strategy inspection.

First failure returns HOLD. No second start or browser attempt without a new
bounded Advisor decision. Public cutover remains prohibited.
