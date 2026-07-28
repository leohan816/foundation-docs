# ADVISOR FREEZE — NON-PRODUCTION `next start` GATE

STATUS: **FROZEN**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1
PRODUCT: `82fb922b64a38d563db91cc87736a229fa5558dc`

Strategy accepted review `15`/`16` and the corrected local PNGs, but rejected the
Next development indicator for public preview.

## Runtime contract resolution

- Product `o1RuntimeEnabled()` structurally refuses
  `NODE_ENV="production"`.
- The pinned Next 16.2.9 local CLI sets `next start` to `isDev=false` while
  preserving an explicitly supplied standard `NODE_ENV`; source lines
  `next/dist/bin/next:53-66` prove this.
- Therefore this gate uses:
  - one standard optimized `NODE_ENV=production npm run build`;
  - one optimized `next start` (`isDev=false`) with application
    `NODE_ENV=development`, preserving the reviewed non-production O1 contract.
- This is a non-production optimized preview, never a production/live claim.

## Exact actions

1. Public `a106041` on port 3000 remains untouched.
2. Inherit only the verified owned public process environment without
   printing/persisting values. Force one-shot and local substitute OFF.
3. Build once from pinned offline dependencies; Prisma generate only, no DB
   connection/schema application.
4. Start exactly one process group on `127.0.0.1:31082` with `next start`.
5. With the existing local Noto CJK Fontconfig and pinned Chromium, capture:
   - `next-start-device-shell-desktop-1440x900.png`;
   - `next-start-device-shell-mobile-390x844.png`.
6. Re-prove freeze 10 categorical facts and additionally require
   `nextjs-portal` count `0` at both sizes.
7. Stop the isolated process group and remove log/profile/controller/cache
   residue. Preserve the one `.next` build only for rollback-safe public
   cutover after evidence PASS; no second build.

First build/start/browser failure returns HOLD. No product/config/DB/provider or
economic mutation is authorized.
