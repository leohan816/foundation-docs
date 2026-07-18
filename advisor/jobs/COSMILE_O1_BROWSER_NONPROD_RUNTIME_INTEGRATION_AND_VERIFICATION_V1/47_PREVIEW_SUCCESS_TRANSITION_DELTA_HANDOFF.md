# Advisor Handoff — Preview Success-Transition Diagnosis and Correction

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
FROM: foundation-advisor
TO: Cosmile repository-owner Worker
TARGET_SESSION: cosmile:0.0
ROLE: Worker
REQUIRED_SKILL: /fable-builder
MODEL: claude-opus-4-8[1m]
EFFORT: max
RETURN_TO: foundation-advisor
DELTA_ONLY_VERIFICATION: REQUIRED
FULL_REPOSITORY_OR_FULL_SUITE_EXECUTION: PROHIBITED
GOOGLE_LOGIN: BLOCKED
TOSS: BLOCKED
```

## Exact subject and baseline

```text
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
REQUIRED_BASE_HEAD: 62c468e9906acac0a6f61a9ca4f7108e790c4d06
REQUIRED_UPSTREAM_EQUAL: YES
RUNTIME_HOSTNAME: PRESERVE_EXISTING_REGISTERED_HOSTNAME
OWNER_ENV: DO_NOT_READ_OR_SOURCE
SECRET_VALUES: DO_NOT_REQUEST_OR_ACCESS
```

Before work, read the current Agent Office operating model, Worker role, Worker run/result
protocols, Cosmile `AGENTS.md` and `CLAUDE.md`, this committed handoff, and failure record 46.
Verify the exact worktree, branch, HEAD, upstream equality, clean state, live runtime, model,
effort, role, workspace, `/fable-builder`, idle state, and pane synchronization OFF. Stop on
any mismatch.

## Exact observed defect

The field accepts input and **Continue** is clickable. After clicking, the field is cleared,
but the browser remains at the preview gate instead of advancing. No secret was disclosed.
The prior input/hydration defect is closed and must not be reopened or broadly rewritten.

## Exact bounded diagnosis

Inspect only:

1. `POST /api/preview/access` response status and category-only body behavior;
2. preview-auth `Set-Cookie` issuance and browser acceptance, limited to domain/host-only
   behavior, path, `Secure`, `SameSite`, and expiry/max-age categories—never the value;
3. middleware acceptance of the issued cookie on the protected `/shop` navigation;
4. the client success branch and navigation/refresh transition;
5. whether `form.reset()` executes before an incomplete or false-positive transition;
6. whether a visible error state is suppressed when the API succeeds but the protected
   navigation returns to `/preview`.

Do not inspect or execute Google, Toss, payment, checkout, identity, operator, order,
inventory, Foundation, SIASIU, schema, migration, or unrelated storefront behavior.

## Exact path boundary

Diagnosis may read only these product paths plus category-only live process/HTTP metadata:

- `app/src/app/preview/page.tsx`
- `app/src/app/api/preview/access/route.ts`
- `app/src/lib/auth/o1PreviewAccess.ts`
- `app/src/middleware.ts`
- `app/scripts/o1_browser_runtime_contract.vitest.ts`
- `app/scripts/o1_browser_golden_order.playwright.mjs` only as existing browser-harness
  reference; do not execute its Google/Toss flow.

```text
EXACT_ALLOWED_CHANGED_PATHS:
- app/src/app/preview/page.tsx
- app/src/app/api/preview/access/route.ts
- app/src/lib/auth/o1PreviewAccess.ts
- app/src/middleware.ts
- app/scripts/o1_browser_runtime_contract.vitest.ts

ACTUAL_CHANGED_PATHS:
- must be the smallest necessary subset established by direct diagnosis;
- must be declared before editing in the Worker result;
- any required path outside this list requires STOP and return to Advisor.
```

Do not change the Playwright Golden Order harness. Do not change layout, popup, schema,
migration, dependency, package, configuration, runtime scripts, owner environment, tunnel,
Google/Toss, or any unrelated path.

## Directly affected contracts

```text
EXACT_CHANGED_BEHAVIOR:
- a valid preview submission must not be treated as complete until the browser has accepted
  the preview perimeter session and the protected navigation leaves /preview;
- failure or incomplete transition must retain or expose a safe visible category-only state;
- the protected input must not be disclosed or retained outside the live form;
- duplicate submission remains blocked only while the request/transition is in flight.

DIRECTLY_AFFECTED_CONTRACTS:
- POST /api/preview/access closed status/body contract;
- preview-auth cookie issuance and browser-acceptance attributes;
- middleware validation of that cookie for /shop;
- client reset/navigation/error-state transition;
- unchanged production refusal and preview-perimeter containment.
```

## Correction authority

If direct evidence identifies a defect within the exact paths/contracts above, implement the
smallest correction. Do not broaden UX, redesign the gate, change authentication ownership,
weaken cookie security, expose identifiers, or add a second authority path. Preserve the
existing hostname and protected secret handling. Create one additive candidate commit only;
do not push before independent review.

If no safe correction can be proven within this boundary, return the exact diagnosis and
STOP without editing.

## Focused verification only

```text
DELTA_ONLY_VERIFICATION: REQUIRED
FULL_REPOSITORY_TEST_SUITE: PROHIBITED
FULL_BUILD: PROHIBITED
UNRELATED_TYPECHECK_OR_LINT: PROHIBITED
ALREADY_EVIDENCED_TESTS_NOT_TO_REPEAT:
- full 597-pass Vitest suite;
- prior 45-test preview/runtime file as an unfiltered whole;
- previous typecheck;
- previous build;
- previous changed-path lint.
```

Required focused evidence:

1. Add or refine only tests for the exact preview status/body, cookie attributes,
   middleware acceptance, reset timing, navigation, and visible error contracts affected by
   the correction.
2. Run only the filtered preview tests, using the narrowest exact test names or pattern. The
   command must be recorded; it must not execute unrelated tests in the same file.
3. Perform at most one isolated browser reproduction if it is safe and useful. Use only a
   loopback-only scratch runtime with a synthetic placeholder secret, no `owner.env`, no
   existing protected key, no tunnel, no Google/Toss, no DB, no PII, no screenshot/HAR/trace/
   video, and no dependency installation. Record booleans/categories only. Clean exact
   mission-created scratch artifacts and prove cleanup.
4. If browser reproduction cannot be done safely, record `SKIPPED_WITH_REASON`; do not
   expand scope.

If you believe a full suite is materially necessary, STOP before running it and return the
exact cross-cutting evidence, affected surfaces, expected cost, and why focused testing is
insufficient. Advisor will route the request through Strategy to Leo. Reviewer preference or
generic caution is not justification.

## Result and pointer

Write only:

```text
TEMP_RESULT: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/35_PREVIEW_SUCCESS_TRANSITION_DELTA_RESULT.md
TEMP_POINTER: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/35_PREVIEW_SUCCESS_TRANSITION_DELTA_POINTER.md
```

Report exact diagnosis, actual changed paths, direct contracts, focused commands/results,
browser reproduction or justified skip, secret/PII containment, candidate commit/parent,
clean status, runtime/hostname preservation, and `PUSHED: NO`. Return only to
foundation-advisor and STOP. Do not dispatch a Reviewer.

```text
HARD_STOP_BEFORE_GOOGLE_TOSS: ACTIVE
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```

