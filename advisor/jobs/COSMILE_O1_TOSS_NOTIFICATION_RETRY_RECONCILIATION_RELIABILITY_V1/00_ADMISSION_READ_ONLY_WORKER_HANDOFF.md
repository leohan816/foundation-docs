# Advisor Handoff — Admission and Read-Only Reliability Design

```text
MISSION_ID: COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
FROM: foundation-advisor
TO: Cosmile Worker
PHASE: ADMISSION_AND_READ_ONLY_PASS
PRODUCT_WRITE: PROHIBITED
DB_OR_RUNTIME: PROHIBITED
MODEL: Opus 4.8
EFFORT: max
```

## Required reads

Read completely before acting:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/worker.md`
- `/home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md`
- `/home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `/home/leo/Project/Cosmile/AGENTS.md`
- `/home/leo/Project/Cosmile/CLAUDE.md`
- `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/app/CLAUDE.md`
- relevant security, environment/migration, and testing-meaning policies named by `app/CLAUDE.md`

Current Agent Office `docs/agent` controls role authority. Historical foundation-docs role material is evidence only.

## Exact repository subject

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
BRANCH: implementation/cosmile-o1-toss-reliability-v1-20260719
HEAD: 02bb064cf24da568dc83be53afb8afe1e984acea
BASE: 02bb064cf24da568dc83be53afb8afe1e984acea
EXPECTED_STATE: clean; no upstream yet; exact new mission branch
```

Reverify the path, branch, HEAD, ancestry, status, and absence of unrelated work before inspection. Stop on mismatch.

## Current official Toss facts to verify directly

Use read-only HTTP GET access only to current official `docs.tosspayments.com` pages. No provider API, credentials,
console action, endpoint registration, payment, or vendor contact is authorized.

- `https://docs.tosspayments.com/en/webhooks`
- `https://docs.tosspayments.com/reference`
- relevant official pages directly linked from those pages, only when needed to resolve a named contract fact.

Advisor preflight observed on 2026-07-19:

- `PAYMENT_STATUS_CHANGED` is the documented one-time-payment webhook and carries `eventType`, `createdAt`, and a
  Payment object in `data`.
- the current official general-payment webhook documentation defines no signature header for
  `PAYMENT_STATUS_CHANGED`; do not invent one;
- the documented `secret` validation field applies to `DEPOSIT_CALLBACK`, not to the general
  `PAYMENT_STATUS_CHANGED` shape;
- a non-200 webhook response causes Toss to retry, with up to seven documented re-sends;
- Core API supports payment lookup by `paymentKey` and by merchant `orderId`;
- full cancellation returns the Payment object with cancellation data, and Toss documents idempotency-key use for
  safe cancellation.

Verify these facts directly and report any contradiction. The Founder trust rule controls implementation: general
payment notification remains untrusted until server-side Payment Query binds `paymentKey`, exact opaque O1 order
number, exact positive KRW amount, currency, and current internal state. Signatures may be verified only when an
officially documented signature header exists for the exact event class.

## Read-only task

Inspect the existing O1 architecture and return the smallest implementation proposal covering exactly:

1. general-payment notification intake;
2. duplicate, delayed, and out-of-order notifications;
3. missing-status Payment Query recovery;
4. capture success followed by internal persistence failure;
5. full-refund success followed by internal persistence failure;
6. durable retry and restart recovery;
7. minimal operator-visible reconciliation queue and bounded repair status;
8. replay safety proving exactly one capture or full-refund economic effect.

The proposal must preserve the reviewed Golden Commerce economic semantics and current payment, order, refund,
inventory, shipment, identity, and reconciliation contracts.

## Required proposal

Return a concise, implementation-ready result containing:

### A. Existing architecture map

- exact load-bearing files, routes, repositories, state transitions, DB models, migrations, transport/query code,
  tests, and operator surface;
- exact gaps for each authorized scenario;
- existing reusable mechanisms versus missing mechanisms.

### B. Smallest module sequence

Propose independently gated modules. For every module state:

```text
MODULE:
OBJECTIVE:
DEPENDENCY:
EXACT_FILE_ALLOWLIST:
NEW_OR_MODIFIED:
SCHEMA_EFFECT:
ECONOMIC_INVARIANTS:
TESTS_FIRST_SCENARIOS:
FOCUSED_TEST_COMMANDS:
ROLLBACK:
STOP_CONDITIONS:
```

Prefer the fewest coherent modules that permit Advisor inspection without combining unrelated responsibilities.
Do not assign work to another actor.

### C. Exact additive schema proposal

Before any schema write, provide:

- exact Prisma models/fields/indexes/uniqueness constraints proposed;
- exact migration path name;
- SQL effect and compatibility with non-empty baseline data;
- forward and rollback consequences;
- how durability, retry claiming, lease/freshness, restart, replay, and idempotency are represented;
- how raw provider payloads, PII, secrets, payment keys, and sensitive identifiers are minimized or excluded;
- why existing tables cannot safely express the exact need without the additive change;
- confirmation of no destructive change, rename, broad cleanup, or existing semantic change.

Do not edit schema or create the migration during this pass.

### D. Scenario and exactly-once matrix

For all ten Founder-authorized scenarios, define precondition, stimulus, durable record, permitted state transition,
retry/replay result, economic-effect count, focused test, and fail-closed outcome.

### E. Complete candidate gate plan

Name the exact one-time final commands for Prisma generation, typecheck, non-production build, focused reliability
integration tests, and the repository-defined full gate. Do not run them now.

## Strict exclusions

No product source/schema/migration/test/document write; no DB/runtime/build/test; no credential or secret access; no
Toss API/payment/refund; no production/live/PII; no cancellation/returns/partial refund; no UI redesign; no new PSP,
identity provider, Foundation/SIASIU/Memory work; no Council/Designer/Control/Foundation Worker/second Worker/subagent;
no branch movement, commit, push, PR, merge, install, or broad research.

## Output

Author only:

```text
/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/10_READ_ONLY_ADMISSION_RESULT.md
/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/11_READ_ONLY_ADMISSION_POINTER.md
```

Return to `foundation-advisor` and STOP. This pass grants no implementation authority.
