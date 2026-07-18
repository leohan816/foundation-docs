# Exact Cosmile Worker Handoff

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
WORKUNIT: BOUNDED_COSMILE_BROWSER_RUNTIME_INTEGRATION
FROM: foundation-advisor
TO: cosmile
ROLE: Cosmile repository-owner Worker
SKILL: /fable-builder
EFFORT: max
IMPLEMENTATION_AUTHORITY: COSMILE_ONLY
FOUNDATION_WRITE: NO
SCHEMA_OR_MIGRATION_CREATION: NO
PRODUCTION_OR_LIVE: NO
```

## Required start state

```text
REPOSITORY: /home/leo/Project/Cosmile
START_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4
MISSION_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REQUIRED_START_STATUS: CLEAN
```

Read the current Agent Office Worker role, Cosmile `AGENTS.md`, root `CLAUDE.md`, `app/CLAUDE.md`, the predecessor final pointer, this handoff, `00_ADMISSION_AND_AUTHORITY_RECORD.md`, and `01_SCOPE_AND_PATH_ALLOWLIST.md` before editing.

## Outcome

Implement the smallest browser-testable non-production composition over the reviewed WU-A through WU-G services while preserving the existing storefront and default-OFF legacy behavior.

The browser flow must:

1. show only the eligible synthetic ELT test catalog in O1 mode;
2. authenticate a dedicated Google test customer through the official flow;
3. add `elt-serum-vitayouth-01`, quantity one, to the cart;
4. revalidate the local Foundation bundle, binding, single KRW price, stock, and identity;
5. reserve before provider action;
6. invoke Toss V2 TEST checkout and server confirmation;
7. bind captured payment to order and committed inventory only after exact server verification;
8. show a sanitized confirmed customer projection;
9. authenticate a separate allowlisted Google test operator using immutable subject identity;
10. show a bounded operator projection, record shipment/tracking, and use test-only step-up for a full refund;
11. prove payment fully refunded, order consistent, inventory still committed/HOLD, audit/reconciliation consistent, and replay zero-effect.

## Non-negotiable invariants

- No browser return, client field, timer, or webhook payload is money truth.
- General-payment webhook is untrusted until authenticated server query matches the durable internal tuple.
- Only officially documented webhook signatures may be verified; do not invent one for general payment.
- No provider call before reservation and exact internal binding.
- Any timeout, unknown, mismatch, internal write failure, or missing configuration fails closed into HOLD/reconciliation.
- Full refund only; never send `cancelAmount`.
- Refund never restores sellable inventory; the reservation remains committed/HOLD.
- Customer and operator identities are different test identities. Operator access is exact Google-sub allowlisting; email is never an authority key.
- Test-only step-up is explicitly labeled non-production, action-bound, and single-use. Default is deny.
- Preview access is restricted by an application gate before any tunnel starts. A random URL is not access control.
- No secret or identifier may appear in logs, errors, response evidence, screenshots, commits, or result artifacts.
- Default flags are OFF and production is structurally refused.

## Exact paths and correction authority

The exact write allowlist is `01_SCOPE_AND_PATH_ALLOWLIST.md`. Do not write elsewhere. If a path is missing, stop before modifying it and return its exact necessity to the Advisor. Do not self-expand.

Use tests-before-code and a scope ledger. Preserve all existing untracked/user files. Do not amend, rebase, squash, force-push, or merge.

## Credential-independent phase

Complete first without any provider credential or external tunnel:

- runtime config/flag and preview-gate contracts;
- minimal composition/routes/UI;
- synthetic local Foundation bundle fixture and DB setup;
- Prisma generate, typecheck, build;
- focused contract/property tests;
- disposable-PostgreSQL migration/runtime tests;
- local browser flow using deterministic/local provider substitutes only, clearly labeled non-official;
- existing WU-A through WU-G and no-transport/default-off regressions;
- exact names-only credential checklist validation.

Do not manufacture official-provider evidence during this phase.

## Credentialed phase

Proceed only when the Advisor records the owner gate as ready. Secret values must be injected by Leo/approved owner through the approved owner-only mechanism and must never be printed or returned.

Official evidence must use:

- Google OAuth consent/test-user configuration and exact redirect URI;
- Toss Payments V2 TEST client/secret keys only;
- one restricted TLS preview URL;
- only exact Google/Toss callback ingress;
- separate customer and operator test identities;
- synthetic catalog/order/payment evidence only.

## Required commands and evidence

Before running each command, record the working directory, command, expected writes, DB/network boundary, and pre-command Git status. Afterward record status, bounded result counts/categories, unexpected writes, cleanup, and post-command Git status.

Required categories:

- `prisma generate`;
- TypeScript typecheck;
- non-production Next build;
- focused new Vitest suites;
- exact predecessor WU-A through WU-G regressions selected and justified;
- isolated migration and runtime DB tests;
- local browser route/access tests;
- official Google test execution when credential gate passes;
- official Toss TEST capture/query/webhook/refund when credential gate passes;
- browser Golden Order and Golden Reversal when human gate is ready;
- shutdown and cleanup verification.

## Worker result

Write the result only to:

```text
TEMP_RESULT: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/10_COSMILE_RUNTIME_INTEGRATION_RESULT.md
TEMP_POINTER: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/10_COSMILE_RUNTIME_INTEGRATION_POINTER.md
FINAL_RESULT: runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/10_COSMILE_RUNTIME_INTEGRATION_RESULT.md
FINAL_POINTER: runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/10_COSMILE_RUNTIME_INTEGRATION_POINTER.md
```

The result must include start/final branch and HEAD, commits, exact diff/path ledger, tests and counts, provider evidence levels, credential limitations, browser evidence, DB identity category, secret/PII containment, tunnel/access containment, cleanup state, known limitations, and a precise claim ceiling. Do not push a candidate for review until the Advisor pins the exact candidate HEAD and dispatches the Reviewer.

## Stop conditions

Stop and return to the Advisor if new schema/migration, Foundation modification, broad storefront rewrite, public exposure, production/shared DB, real PII/payment, live/provider commitment, secret leakage, unallowlisted path, or material contract deviation is required.
