# Advisor Handoff — Runtime Bootstrap and Google Registration Checkpoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: CREDENTIAL_GATED_RUNTIME_BOOTSTRAP_BEFORE_GOOGLE_LOGIN
FROM: foundation-advisor
TO: Cosmile repository-owner Worker
RETURN_TO: foundation-advisor
IMPLEMENTATION_AUTHORITY: RUNTIME_EXECUTION_ONLY; PRODUCT_SOURCE_CHANGE_NONE
GOOGLE_LOGIN_AUTHORIZED_IN_THIS_HANDOFF: NO
TOSS_PAYMENT_EXECUTION_AUTHORIZED_IN_THIS_HANDOFF: NO
```

## Exact subject

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab
UPSTREAM: origin/implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
REQUIRED_UPSTREAM_STATE: ahead 0 / behind 0
REQUIRED_TRACKED_STATE: clean
PRODUCT_WRITE_ALLOWLIST: EMPTY
PRODUCT_COMMIT_ALLOWED: NO
```

Re-read current Agent Office `TEAM_OPERATING_MODEL.md`, `roles/worker.md`, Cosmile
`AGENTS.md`, and Cosmile `CLAUDE.md`. Verify the exact live session, actual model,
Leo-configured effort, CWD, role, `/fable-builder`, idle state, and pane synchronization
OFF immediately before acting. Preserve unrelated processes and files.

## Pinned reviewed evidence

- Full independent candidate review: `runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/20_INDEPENDENT_CANDIDATE_REVIEW.md`
- Runtime setup correction: `runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/21_RUNTIME_SETUP_CORRECTION_RESULT.md`
- Same-Reviewer delta review: `runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/22_RUNTIME_SETUP_DELTA_REVIEW.md`
- Credential closure: `advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/31_CREDENTIAL_GATE_CLOSURE_RECORD.md`

All are to be read from this handoff's exact committed foundation-docs snapshot.

## Authorized work in this phase only

1. Verify the product pin, clean state, installed dependencies, locally available
   `postgres:16-alpine`, Playwright/Chromium availability, and `cloudflared` availability.
2. Inventory existing unrelated processes, containers, ports, files, and tunnels; do not
   stop, alter, or reuse them.
3. Validate the protected `owner.env` only by owner/mode/type and names-only `SET/MISSING`.
   Never display, hash, copy, summarize, or return any value.
4. Create a unique mission-owned PostgreSQL container using the already-local image,
   tmpfs data, loopback-only random port, synthetic data, and a transient local-only test
   credential. Never print or persist the credential outside the protected runtime boundary.
5. Apply only the existing reviewed migration chain with `npx prisma migrate deploy`.
6. Run the reviewed one-shot fixture bridge with exact flags
   `O1_FIXTURE_ONESHOT=1` and `O1_FIXTURE_PRESERVE_FOR_RUNTIME=1`, retaining the canonical
   local Foundation bundle outside the repository for this runtime session.
7. Start the non-production Next development server on a unique loopback-only port with
   O1 runtime and Google-auth flags ON, using the protected environment without echo or
   tracing. Suppress runtime stdout/stderr so future callback query parameters cannot be
   captured in logs.
8. Before any tunnel, prove the application preview gate denies a general HTML request,
   denies a general API request, and admits only after the exact preview secret is posted.
   Record status/category/boolean evidence only; never record the cookie or secret.
9. Start one mission-owned restricted `cloudflared` quick tunnel to the loopback server.
   Use the narrowest logging that allows the generated HTTPS origin to be discovered
   without rendering credential, cookie, token, provider body, or PII. Do not disturb any
   pre-existing tunnel.
10. Update only the protected runtime environment with the exact generated HTTPS base and
    matching Google callback URI, restart the loopback Next process with stdout/stderr
    suppressed, and re-prove unauthenticated denial over HTTPS.
11. Return only the exact non-secret registration checkpoint information below. Do not
    initiate Google login, capture a Google code/token, call Toss, execute browser Golden
    Order/Reversal, or bootstrap the operator subject in this phase.

## Exact URL contract

```text
AUTHORIZED_JAVASCRIPT_ORIGIN_IF_REQUIRED: https://<exact-generated-preview-host>
AUTHORIZED_REDIRECT_URI: https://<exact-generated-preview-host>/api/auth/google/callback
```

The origin may be registered in Google Auth Platform if its console requires an Authorized
JavaScript Origin. The redirect URI must be registered exactly. No wildcard, alternate path,
HTTP origin, localhost substitute, or inferred hostname is acceptable.

## Runtime safety

- no `set -x`, `env`, `printenv`, `cat owner.env`, value-bearing `grep`, value-bearing hash,
  screenshot, or log capture;
- no production/shared database, real data, real customer identity, live payment, or public
  unrestricted access;
- no image pull, dependency installation, schema/migration creation, product edit, or commit;
- no Google login before Leo registration confirmation;
- no Toss call or browser economic flow in this phase;
- do not touch the existing root-Cosmile dev server, unrelated cloudflared tunnel, or any
  unrelated container/process/file;
- keep mission processes alive only for the bounded registration wait;
- if safe containment or no-leak execution cannot be proven, stop and return a blocker.

## Result paths

```text
TEMP_RESULT: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/31_RUNTIME_BOOTSTRAP_AND_GOOGLE_REGISTRATION_RESULT.md
TEMP_POINTER: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/31_RUNTIME_BOOTSTRAP_AND_GOOGLE_REGISTRATION_POINTER.md
```

The result must contain no raw env value, DB URL, credential, cookie, token, subject,
identifier, provider body, payment key, or PII. It may contain the public preview origin and
exact Google redirect URI because they must be returned to Leo. Include process/container
categories and booleans only, preview denial/admission statuses, exact product/docs pins,
worktree containment, and the explicit registration wait state.

```text
REQUIRED_STOP_STATE: WAITING_FOR_LEO_GOOGLE_REGISTRATION_CONFIRMATION
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
