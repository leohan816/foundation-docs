# 248 — Worker handoff: order-detail candidate runtime restart

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product candidate:
  `b652a8b2ea6a8221a764d42190c318ac2a005d0e`
- Review: `246` PASS, blocking `0`, actual Opus 5/max
- Runtime root:
  `/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/runtime`
- Existing owned group: PID/PGID `3144037`, listener child `3144059`,
  `127.0.0.1:3000`
- Start boundary: existing owner-only `start-candidate.sh`; execute exactly
  once after the old owned group and port are absent.

## Exact action

1. Verify product HEAD, clean/upstream equality, runtime root owner/modes, and
   existing PID/PGID/CWD exactly as pinned.
2. Verify names/status only: Toss mode TEST, one-shot OFF, local substitute
   absent. Never print values or any other protected environment.
3. Terminate only the exact owned mission runtime process group `3144037`.
   Do not touch tmux, Claude, Reviewer, or any other service.
4. Require complete group absence and port `3000` closed.
5. Execute `start-candidate.sh` exactly once; do not issue a second start.
6. Wait for authoritative TCP readiness on `127.0.0.1:3000`.
7. Verify new PID/PGID CWD is the exact mission app, product HEAD is
   `b652a8b2`, one-shot is OFF, local substitute absent, and public
   `https://cosmile.leohan.net/dashboard` is categorically reachable. Do not
   authenticate, use browser credentials, call providers, or perform an
   economic action.

No product/docs edit, test, build, typecheck, DB, browser, provider, refund,
checkout, or Golden Reversal. Preserve the running candidate after PASS.

Write only uncommitted:

- `250_WORKER_ORDER_DETAIL_RUNTIME_RESTART_RESULT.md`
- `251_WORKER_ORDER_DETAIL_RUNTIME_RESTART_POINTER.md`

Return concise categorical evidence and STOP.
