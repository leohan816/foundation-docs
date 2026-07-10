# Agent Office M01 Batch A Implementation Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`IMPLEMENTATION_BATCH_A__DOMAIN_STORE_PROJECTION_ONLY`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same existing Worker session/context. Do not create or use agents,
sub-agents, delegated model contexts, temporary sessions, or another Worker.

## Authority and Entry Evidence

Read directly:

- active Agent Office instructions and all seven canonical design files at current
  commit `82821afe48b08f70b6888e3ebf12dee3095cd2bb`;
- original M01 intake/entry/unknown gates, manifest, addendum, and Batch A design;
- Fable5 original review and delta PASS result/pointer (`6c9d94f`);
- this exact handoff, current branch/status/upstream, and actual repository tree.

Design review gate: `PASS`. Implementation remains limited to this exact batch.

## Batch A Objective

Implement the tested local domain core and deterministic file projection needed by
later batches. No web UI, browser server, tmux/Git adapter, Advisor gateway,
animation, PWA, real auth, or deployment is in Batch A.

## Required Implementation

### Project and Quality Scaffold

- strict TypeScript/Node project with pinned lockfile and minimal reviewed
  dependencies;
- deterministic `lint`, typecheck, unit/property/integration test, and build
  commands suitable for later batches;
- no database package or remote service dependency;
- no code generation requiring secrets or external credentials.

### Domain Contracts

Implement canonical schemas/types and validation for:

- Initiative, Package, Mission, Phase, WorkUnit and versioned mission manifest;
- exact manifest denominator and authority-backed scope changes;
- WorkUnit primary lifecycle and all valid/invalid transitions;
- two-axis RoleActivity and exact 16 `requiredObservableName` mappings;
- Fable5 R-1: explicitly pin primary-only/expired-activity fallback for
  `DISPATCHED`, `RUNNING`, `RESULT_REPORTED`, `REVIEW_PENDING`, plus reviewed
  handling for `WAITING_ADVISOR` and `HOLD`; it must resolve to a deterministic
  `UNKNOWN_OR_STALE` overlay or another design-consistent fail-closed value, never
  silently relabel active work;
- message, blocker, alert, decision, and notification states;
- exact 16 BlockerKinds and `BlockerOpened` payload;
- exact 9 AlertKinds, payload/deduplication/action contract;
- exact ordered 13-field deterministic GPT package schema;
- versioned command/event envelopes, causal/correlation IDs, stable rejection
  codes, idempotency, expected-stream/version checks, and UTC timestamp parsing;
- evidence references and completion-policy primitives.

### Local Persistence and Projection

Implement the canonical no-DB local core:

- one-writer append-only JSONL event segments;
- canonical JSON hashing and previous-hash chain;
- immutable content-addressed artifact writes;
- create-exclusive/owner-only files, path containment, no symlink traversal;
- write/flush/fsync ordering and atomic checkpoint/projection publication;
- deterministic pure projection fold/replay from genesis and verified checkpoint;
- incomplete tail handling versus mid-stream corruption quarantine;
- same request ID/same hash replay and same ID/different hash conflict;
- startup/recovery primitives sufficient for Batch A tests;
- synthetic/disposable local fixtures only.

### Mission Manifest Fixture

Include a versioned fixture/import adapter for the approved 15-WorkUnit M01
manifest. Preserve source path, source commit/hash, version, labels, dependencies,
and current facts. Do not infer state from terminal text.

## Required Tests

At minimum implement and run the canonical paths or equivalent clearly mapped
paths:

- `tests/domain/manifest.test.ts`
- `tests/property/scope-counting.test.ts`
- `tests/domain/event-envelope.test.ts`
- `tests/persistence/hash-chain.test.ts`
- `tests/domain/transitions.test.ts`
- `tests/property/transition-matrix.test.ts`
- `tests/contract/required-observable-conformance.test.ts`
- `tests/domain/writing-result-activity.test.ts`
- `tests/contract/blocker-alert-vocabulary.test.ts`
- `tests/snapshot/gpt-package.test.ts`
- `tests/persistence/replay.test.ts`
- `tests/recovery/crash-consistency.test.ts`
- `tests/recovery/restart-replay.test.ts`
- `tests/recovery/corruption-quarantine.test.ts`
- `tests/acceptance/batch-gates.test.ts`

Also run dependency audit, lint, typecheck, complete test suite, and production
build. Record any skip explicitly. Tests must not access DB, secret/env values,
tmux, Git remotes, production/live, or external services.

## As-Built Canonical Documentation

After implementation/tests pass:

1. Commit code/config/tests first.
2. Update only materially affected canonical docs to as-built truth, referencing
   exact implementation/test paths, the code commit, current evidence, status, and
   deferred gate.
3. Do not rewrite design to excuse a code defect. Classify divergence exactly as
   `CODE_DEFECT`, `DESIGN_DEFECT`, `DOCUMENTATION_STALE`,
   `DEFERRED_WITH_GATE`, or `NEEDS_LEO_GPT_DECISION`.
4. A `DESIGN_DEFECT` or `NEEDS_LEO_GPT_DECISION` is STOP; do not choose policy.
5. Commit the as-built doc update separately and push both commits non-force.

## Allowed Paths

- project/config/lock files required for the strict TypeScript scaffold;
- `src/domain/**`, `src/contracts/**`, `src/persistence/**`,
  `src/application/projections/**`, `src/application/evidence/**`,
  `src/application/startup/**` only as needed for Batch A;
- `tests/**` for Batch A only;
- a synthetic `fixtures/**` or `manifests/**` M01 manifest source;
- canonical documents materially affected by Batch A as-built evidence;
- README only for Batch A commands/status if needed.

Do not create UI/server/PWA/adapters/gateway/animation/deployment code.

## Git and Result

- branch: `shadow/agent-office-m01`;
- explicit-path staging, no unrelated changes;
- non-force push only, no main merge/push;
- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BATCH_A_RESULT.md`;
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/21_WORKER_BATCH_A_RESULT_POINTER.md`;
- commit/push only those two foundation-docs result paths;
- terminal output ASCII-only; repository docs/locale data may use normal UTF-8.

## STOP / Forbidden

STOP for product/design conflict, unexpected auth/approval, package requiring a
secret/service, DB/schema/migration, production/live/public/private-network action,
protected/main branch, destructive Git, unresolved test failure, or scope beyond A.

No UI/server/PWA, tmux/Git/artifact observation adapters beyond local persistence,
Advisor gateway, browser dispatch, arbitrary commands, Hermes, DB, real secret,
deployment, external exposure, Reviewer work, self-review, risk acceptance, final
approval, new context, or automatic Batch B.

Return the durable pointer to Advisor and STOP.
