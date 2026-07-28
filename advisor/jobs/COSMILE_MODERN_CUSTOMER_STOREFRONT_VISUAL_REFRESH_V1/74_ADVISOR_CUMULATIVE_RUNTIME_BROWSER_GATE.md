# 74 — Advisor Cumulative Runtime/Browser Gate

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PRODUCT: `07561dcc618a846559733dcc108577acdad9f02d`
REVIEW: `72` / `73` · `PASS` · blocking 0

## Frozen execution

1. Verify candidate clean/upstream-equal, mission-local `node_modules`, protected
   env stores by names/mode only, dedicated non-production DB on loopback,
   Foundation bundle, old public runtime identity, and rollback command.
2. Run exactly one `npm run build` in the candidate app with the existing
   protected non-production/test environment. No typecheck, full suite, install,
   provider, DB write, or economic action.
3. Start exactly one isolated candidate dev runtime on `127.0.0.1:31082`.
   TCP readiness only; the old `127.0.0.1:3000` runtime stays untouched.
4. In one finite local Chromium session, GET-only verify:
   - desktop `1440×900`: `/`, `/shop`, first actual catalog detail href,
     `/wishlist`, `/cart`, `/account`, `/account/orders`;
   - mobile `390×844`: `/`, first actual detail href, `/cart`, `/account`.
   Prove the real O1 shell, no `.device`, current dynamic admitted count
   (expected runtime truth seven, never a fabricated eighth), desktop card
   composition, mobile two-column home/catalog flow, truthful pending media,
   non-production context, and no page/console error.
5. Stop the isolated process group and remove only its browser profile/temp
   controller output not retained as evidence. Verify `31082` closed.
6. Only after isolated PASS, stop the exact owned predecessor process group on
   `3000`, start this candidate once on `127.0.0.1:3000`, and prove
   CWD/HEAD/one-shot-OFF/local-substitute-absent binding. Preserve the old
   wrapper and rollback pointer.
7. Repeat the same GET-only desktop/mobile evidence against
   `https://cosmile.leohan.net`; retain only the final desktop and mobile PNGs.

## Stop conditions

First build, readiness, browser, binding, cleanup, or public verification
failure returns HOLD and restores the predecessor when safe. Never click login,
wishlist, cart, checkout, service request, provider, or refund controls. No
source/config/schema/DB/data/secret/provider/economic mutation; no merge,
production/live claim, Golden Reversal, or next mission.
