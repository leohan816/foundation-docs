# Final Local Rehearsal

- Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`
- Candidate: `58a484b088b4e57e7b3ee6e582f54c7f3ce6dc85`
- Executed by: Advisor
- Date: `2026-07-13` UTC
- Verdict: `PASS`

## Direct commands and results

1. `npm run build`
   - core TypeScript build: `PASS`
   - Vite dashboard production build: `PASS`
   - Living Office emitted as a separate lazy production chunk;
   - eager application entry remained Pixi-free.

2. `node scripts/local-office-rehearsal.mjs`
   - loopback bind: `127.0.0.1`
   - shell status: `200`
   - built asset status: `200`
   - no-credential safe state: `AUTH_BLOCKED`
   - auth mode: `UNAVAILABLE_READ_ONLY`
   - mutation mode: `DISABLED`
   - protected projection: `503 AUTH_PROVIDER_UNAVAILABLE`
   - post-stop port rebind: `true`
   - post-stop writer-lock release: `true`

3. `npx playwright test --config playwright.batch-a-living-office.config.ts`
   - authenticated desktop Office, actor label, 17-field drawer, keyboard/focus,
     and current exact fact predicates: `PASS`
   - mobile containment and no horizontal overflow: `PASS`
   - reduced-motion/static semantic equivalent with no canvas: `PASS`
   - total: `3/3 PASS`

4. Cleanup and listener verification
   - the disposable Playwright result directory created by this run was removed;
   - target worktree returned clean;
   - no process matching the Batch A worktree or its browser/runtime harness
     remained;
   - existing listeners owned by unrelated projects were not touched.

## Private/local operation

The established owner-controlled procedure remains:

```text
Prerequisites: supported Node/npm, current canonical foundation-docs manifest,
owner-only state/config/proof paths, and loopback-only LocalBootstrap authority.
Install: npm ci
Build: npm run build
Start: npm run start:loopback -- --state-root <absolute-owner-only-state-root> --runtime-config <absolute-owner-only-runtime-config>
Local URL: http://127.0.0.1:4317
Stop: SIGINT/Ctrl-C to the foreground process
Restart: repeat the start command with a fresh one-use LocalBootstrap proof
Logs: foreground process output plus the configured owner-only state-root audit paths
Visual evidence: tests/e2e/baselines/living-pixel-office.spec.ts/ and tests/e2e-composed/baselines/application-office-scene.spec.ts/batch-a-living-office/
External visual media: /home/leo/Project/agent-office/artifacts/m1-2-visual-prototype/
Rollback: stop the process and use reviewed start commit ac8ba75d3a128385beaeeac58ae5bf54c03d23f2; no data migration is part of Batch A
```

The final rehearsal intentionally did not create or expose a real credential.
It combines the current production fail-closed start/open/stop proof with the
current authenticated local browser harness. The previously reviewed M1
LocalBootstrap authority and exact Advisor-delivery boundaries remain unchanged.
