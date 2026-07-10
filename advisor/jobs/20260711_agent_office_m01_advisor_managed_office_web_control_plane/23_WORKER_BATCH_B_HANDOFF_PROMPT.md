# Agent Office M01 Batch B Implementation Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`IMPLEMENTATION_BATCH_B__READ_ONLY_OBSERVATION_AND_BASE_DASHBOARD`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same existing Worker session/context. Do not create or use agents,
sub-agents, delegated model contexts, temporary sessions, or another Worker.

## Entry Authority

Read directly:

- current Agent Office instructions and all seven canonical design documents;
- the Batch A code, tests, commits, result, pointer, and Advisor validation;
- M01 intake, mission manifest, design review PASS, and this exact handoff;
- active tmux transport authority documents read-only for reference only;
- current target branch/status/upstream and actual repository tree.

Batch A dependency verdict:
`PASS__BATCH_A_ACCEPTED_AS_BATCH_B_DEPENDENCY`.

Batch B is authorized. Batch C and later batches are not authorized by this
handoff.

## Objective

Implement the read-only local observation boundary and a usable base operations
dashboard. The dashboard must derive visible state from the versioned manifest,
accepted structured events, verified artifacts, and typed read-only observations.
It must never derive mission status or actor activity from arbitrary terminal
prose.

## Required Implementation

### 1. Read-Only Observation Ports and Adapters

Implement narrow typed ports and local adapters for:

- `MissionManifestSource`;
- `GitObservationSource`;
- `ArtifactSource`;
- `TmuxObservationSource`; and
- the local subset of project/host/freshness projection.

Requirements:

- trusted configuration maps stable IDs to allowlisted absolute roots;
- browser or artifact content never becomes cwd, argv, ref syntax, pathspec,
  tmux target, or executable command;
- use direct argument arrays with no shell interpolation;
- Git adapter exposes only reviewed read operations needed for top-level, HEAD,
  upstream, porcelain-v2 status, exact allowlisted refs, ancestry, and exact
  commit diff metadata;
- no writable Git subcommand or generic execute method exists;
- artifact/manifest reads are bounded, regular-file-only, no-follow,
  containment-checked, hash/commit-aware, and explicit about missing, stale,
  dirty, or unverified evidence;
- tmux adapter reads structured format fields only for exact configured session,
  window, and pane identities;
- tmux observation must not expose `send-keys`, buffers, paste, `run-shell`,
  config sourcing, capture-pane prose, process signals, pane/session mutation, or
  a generic tmux command surface;
- fixed timeouts and output-size caps fail closed with stable typed errors;
- actual local read-only metadata smoke checks are allowed, but tests must use
  deterministic fakes and must not mutate Git, tmux, files outside disposable
  fixtures, sessions, or processes;
- remote collectors, signing keys, private network, Mac hosts, and Hermes remain
  interface/deferred-only and are not implemented.

### 2. Project Registry and Freshness

Implement a trusted local project registry and deterministic freshness overlay:

- root IDs and project IDs, not arbitrary browser paths;
- root isolation across registered projects;
- local host/session/repo observations with source time, received time, policy
  ID, freshness, and evidence reference;
- `CURRENT`, `STALE`, `OFFLINE`, `UNKNOWN`, and conflict/error presentation as
  typed projection data;
- stale observations never satisfy completion or silently change durable
  WorkUnit state;
- expired or incompatible activity remains `UNKNOWN_OR_STALE`;
- no unverified deployment, credential, provider, DB, or customer state becomes a
  fact.

### 3. Base Dashboard

Build the actual first-screen operations dashboard, not a landing page.

The Batch B dashboard must include:

- current initiative, package, mission, phase, and declared WorkUnit hierarchy;
- Korean user-facing hierarchy labels:
  `활성 작업 묶음`, `패키지`, `현재 미션`, `단계`, `세부 작업`;
- WorkUnit-count progress and required-gate progress as distinct values;
- declared denominator only, with future unapproved work separated;
- actor/work-unit table or compact operational list with state, phase,
  dependency, freshness, last activity, blocker reason, resolution owner, and
  next action where present;
- explicit differentiation of `WAITING_DEPENDENCY`, `WAITING_ADVISOR`,
  `WAITING_LEO`, `HOLD`, and `BLOCKED`;
- a visible `UNKNOWN_OR_STALE` fallback instead of an invented active label;
- blocker detail that never displays a bare blocked count without reason;
- evidence paths, hashes, commits, and verification state as copyable/read-only
  values;
- stale/offline/conflict banners derived from typed projection data;
- stable dimensions, no card nesting, no marketing hero, no decorative blobs,
  and no text overlap at desktop or mobile widths;
- local bundled icons through an exact pinned icon dependency when appropriate;
  use familiar icons and tooltips rather than text-filled pseudo-icon buttons;
- deterministic synthetic/current mission fixtures suitable for tests and visual
  review.

The base dashboard may use an exact pinned React/Vite stack if needed. Record and
audit every added dependency. It may provide a local development preview, but it
must not implement the final HTTP authority boundary, real authentication,
mutation routes, SSE, PWA, service worker, deployment, or network exposure.

### 4. State and Authority Boundary

- UI actions in Batch B are read-only filtering, selection, expansion, evidence
  copy, and navigation only.
- No browser form or control may dispatch to Advisor, Worker, Reviewer, tmux,
  Git, or shell in Batch B.
- No arbitrary file path, command, role/session target, or terminal pane is
  browser-visible or caller-selectable.
- No animation may claim work. Structured office animation belongs to Batch C.
- No completion may be inferred from a clean tree, pane process, test text,
  commit presence, or terminal output alone.

## Required Tests and Verification

At minimum add and run clearly mapped tests for:

- fixed Git argv allowlist and proof no writable subcommand/generic shell path
  exists;
- hostile refs/pathspecs/options, timeout, output cap, and repository-root
  isolation;
- manifest/artifact traversal, symlink, special-file, size, hash, dirty,
  missing, and stale cases;
- tmux structured parsing with hostile names and proof that capture/input/mutation
  operations are absent;
- proof that terminal prose cannot alter WorkUnit/activity state;
- multi-project isolation and local stale/offline/restart behavior;
- deterministic dashboard view-model projection;
- exact Korean hierarchy/state/blocker/freshness labels including
  `WAITING_ADVISOR`, `HOLD`, and `UNKNOWN_OR_STALE`;
- separate WorkUnit-count and required-gate progress;
- blocker reason/owner/next-action visibility;
- long IDs, hashes, Korean text expansion, and mobile-width overflow safety at
  component/layout-test level;
- Batch A regression and Batch C/E forbidden-scope gates.

Run:

- clean dependency install;
- dependency audit;
- lint;
- strict typecheck;
- complete unit/property/integration/UI test suite;
- production build; and
- `git diff --check`.

No test may write a real repository, send tmux input, read pane prose, access DB,
read secrets/env values, bind a non-loopback listener, or contact production/live.

## As-Built Canonical Documentation

After code/tests pass:

1. Commit code/config/tests/assets first.
2. Update only materially affected Agent Office canonical documents to exact
   as-built truth, including implementation path, test path, evidence, status,
   and deferred gate.
3. The integration design and FEATURE_INDEX must no longer describe implemented
   Batch B surfaces as `NOT_IMPLEMENTED`.
4. Keep server/auth/PWA/SSE/inbox/gateway/animation and later-batch surfaces
   visibly unimplemented.
5. Classify divergence as `CODE_DEFECT`, `DESIGN_DEFECT`,
   `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or
   `NEEDS_LEO_GPT_DECISION`.
6. `DESIGN_DEFECT` or `NEEDS_LEO_GPT_DECISION` is STOP.
7. Commit as-built documentation separately and push both commits non-force.

## Allowed Paths

- exact project/config/lock changes required by reviewed Batch B dependencies;
- `src/adapters/observations/**` and narrow shared adapter execution utilities;
- `src/application/projects/**`, `src/application/hosts/**`, and query/view-model
  modules needed for Batch B;
- `src/ui/**` only for the read-only base dashboard, layout, i18n, icons, and
  evidence/freshness/blocker presentation;
- `tests/**` and deterministic local fixtures for Batch B;
- local static assets plus exact license inventory if used;
- canonical Agent Office docs materially affected by Batch B as-built evidence;
- README for Batch B commands/status.

Do not create Advisor Inbox mutation, TmuxAdvisorGateway delivery, browser command
dispatch, animation choreography, final server/security/PWA/deployment, DB, remote
collector, or Hermes implementation.

## Git and Durable Result

- branch: `shadow/agent-office-m01`;
- explicit-path staging only;
- code/config/tests commit first, as-built docs commit second;
- non-force push only; no main merge/push;
- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BATCH_B_RESULT.md`;
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/24_WORKER_BATCH_B_RESULT_POINTER.md`;
- commit/push only those exact two foundation-docs result paths;
- terminal output ASCII-only; repository UI/locale/docs may use normal UTF-8.

## STOP / Forbidden

STOP for product/design conflict, unexpected auth/approval/model-change prompt,
package requiring a secret/service, DB/schema/migration, production/live/public or
private-network action, protected/main branch, destructive Git, unresolved test
failure, or scope beyond Batch B.

No tmux input, capture-pane prose parsing, Git mutation, generic shell/command
surface, Advisor/Worker/Reviewer dispatch, arbitrary browser path/target,
Inbox/gateway mutation, animation, PWA, real auth, secret, DB, deployment, Hermes,
remote host, Reviewer work, self-review, risk acceptance, final approval, new
context, or automatic Batch C.

Return the durable pointer to Advisor and STOP.
