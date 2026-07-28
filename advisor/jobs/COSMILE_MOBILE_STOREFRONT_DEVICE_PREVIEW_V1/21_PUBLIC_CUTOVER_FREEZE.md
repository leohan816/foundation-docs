# ADVISOR FREEZE — ROLLBACK-SAFE PUBLIC CUTOVER

STATUS: **FROZEN**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1

## Before

- Public URL: `https://cosmile.leohan.net`
- Listener: `127.0.0.1:3000`
- Exact predecessor: `a10604121aeba0207c12bb1cce8e961e73ad7abc`
- Worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1/app`
- Owned process group: root `3852303`, child `3852328`, PGID/SID `3852303`,
  `next dev -H 127.0.0.1 -p 3000`.
- Both predecessor and candidate worktrees are clean. Protected environment is
  read by the cutover supervisor without value output or persistence.

## Action and rollback

1. Validate both Git pins, candidate clean state, built `.next/BUILD_ID`, old
   process CWD/group, and protected env names.
2. Hold the protected environment in memory, stop only PGID `3852303`, wait
   until port 3000 closes, then start candidate `next start` as a new owned
   process group with application `NODE_ENV=development`, one-shot/local
   substitute OFF, and public base `https://cosmile.leohan.net`.
3. If candidate TCP readiness fails, automatically start the exact predecessor
   `next dev` with the same protected environment and report rollback.
4. After candidate readiness, browser-check public `/` at 1440x900 and 390x844:
   seven cards, six SVG tabs, Cart, no dev indicator/errors/double frame.
   Check `/dashboard` 200 at 1440 and customer device wrapper count 0.
5. Any public browser failure invokes the owner-only rollback launcher before
   return.

No other hostname/service/tmux, product/config/DB/provider/economic action is
authorized.
