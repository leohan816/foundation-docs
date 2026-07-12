TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 기존 Agent Office Opus Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Agent Office Batch A Implementation Handoff

You are the Agent Office implementation Worker in the same existing
`agent-office-opus` session.

Required skill: `/fable-builder`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

## Exact Target

- worktree: `/home/leo/Project/agent-office-batch-a-001`
- branch: `batch-a/modern-office-identity-001`
- accepted design commit and implementation base: `453c661c4f4243c77b2f53089ec599561876b06f`
- upstream: `origin/batch-a/modern-office-identity-001`
- reviewed historical base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`

Change to the exact worktree before reading or running commands. Do not work in
`/home/leo/Project/agent-office` and do not touch its unrelated files.

## Required Entry Reads

Read directly, in this order:

1. this handoff;
2. `/home/leo/Project/agent-office-batch-a-001/AGENTS.md`;
3. `/home/leo/Project/agent-office-batch-a-001/CLAUDE.md`;
4. `/home/leo/Project/agent-office-batch-a-001/docs/agent/RUN_PROTOCOL.md`;
5. `/home/leo/Project/agent-office-batch-a-001/docs/agent/RESULT_REPORTING_PROTOCOL.md`;
6. `28_ADVISOR_FINAL_DESIGN_ACCEPTANCE.md` in this Advisor job;
7. `32_ADVISOR_SCOPE_CORRECTION_REVIEW_VALIDATION.md` in this Advisor job;
8. `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md`;
9. `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md`;
10. `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md`;
11. `docs/FEATURE_INDEX.md`;
12. the actual source and tests named by those documents.

Use `/fable-builder` for the implementation. Do not execute from memory.

The repository instructions contain historical wording that names Fable5 as the
Reviewer. That wording grants the Worker no review authority and does not change
this mission's independent Reviewer route. Do not edit `AGENTS.md` or `CLAUDE.md`.
Return the Worker result to Advisor; Advisor selects and routes the Reviewer.

## Entry Gate

Before editing, verify and record:

- exact branch and HEAD equal the target above;
- branch equals its upstream and the worktree is clean;
- `ac8ba75` is an ancestor;
- failed Grok pilot branch/worktree is isolated and not merged;
- no Grok pilot code is present in the candidate ancestry or diff;
- no concurrent Agent Office writer exists;
- rollback to `453c661` is available;
- actual session/model/effort: `agent-office-opus`, Opus 4.8 (1M), Ultracode;
- `/fable-builder` loaded;
- no unexpected auth, privilege, secret, DB, production, or approval prompt.

STOP and return the exact blocker to Advisor if an entry condition is false.

## Authorized Work

Implement BA-WU-01 through BA-WU-09 in the dependency order in the accepted
WorkUnit plan. Batch A must be an actually runnable private/local application,
not a documentation-only or prototype-only result.

Required product result:

1. promote Living Pixel Office into the authenticated application shell as the
   default primary screen;
2. preserve technical/control/evidence/dashboard surfaces as secondary views;
3. add the committed local/static organization and evidence projection with
   stable identity separated from mutable Team/session bindings;
4. render truthful compact actor labels with independent process, AI identity,
   model, effort, AI runtime, and operational-work fields;
5. add the complete accessible actor detail drawer contract;
6. add safe role-specific symbolic work surfaces;
7. integrate the reviewed modern palette and non-operational Channy behavior;
8. preserve mobile, keyboard, focus, Escape, focus restoration, 200% text,
   contrast, reduced-motion, semantic/static, and M1 fallback behavior;
9. add and directly run the loopback-only local rehearsal and regenerate current
   visual evidence;
10. publish an accurate evidence-bearing Worker result and pointer.

## Closed File Scope

The only writable Agent Office paths are the literal paths enumerated in section
9 of the accepted application-integration design delta and in BA-WU-01 through
BA-WU-08 of the accepted WorkUnit plan. No wildcard is authorization.

This includes only the exact named:

- pixel renderer files and eight existing code-native asset files;
- `src/ui/pixel/living-office-actor-overlay.tsx` as the exact compact-label and
  actor-specific 17-field dialog host;
- authenticated shell/navigation/projection files;
- new `src/application/organization/` files and exact organization fixture;
- conditional PWA/static-shell files only under the written condition;
- exact existing/new test paths and exact new baseline directories;
- `tests/ui/pixel-actor-overlay.test.tsx` and
  `tests/ui/pixel-world-semantic-parity.test.tsx` as exact coupled tests;
- `scripts/runtime-smoke.mjs` and new `scripts/local-office-rehearsal.mjs`;
- four literal canonical documentation paths.

Any unnamed file, dependency, package, configuration, test, baseline, script,
fixture, or documentation path requires an Advisor handoff amendment before edit.
Do not silently broaden scope.

`npm ci` is authorized only to install the existing committed lockfile dependency
tree. Do not change `package.json`, `package-lock.json`, dependency versions, or
toolchain rules. Do not use `npm exec` to fetch an unpinned substitute tool.

## Required Invariants

- Existing authenticated runtime projection remains the sole source of mission,
  WorkUnit, activity, and operational work state.
- Local attestation evidence may supply only absent process/AI identity/model/
  effort/ready/error facts under the accepted contract.
- Missing, stale, invalid, conflicting, or unverified evidence fails closed.
- Tmux attached state, names, locations, proximity, timestamps alone, terminal
  prose, or prior model identity never prove AI identity or work.
- `UNASSIGNED` actors cannot receive work.
- No actor cloning or visual-proximity authority.
- Office shell and fallback graph remain eager-Pixi-free; Office loads as a lazy
  chunk and prototype fixture markers stay outside production.
- Browser-direct Worker/Reviewer dispatch and arbitrary shell execution remain
  forbidden.
- Channy remains ambient and non-operational with no command/retry/watchdog role.
- Static/M1 fallback, auth, delivery, authority, security, kill-switch, and
  protected-cue clearing behavior remain unchanged.

## Forbidden

Do not:

- use or create agents, sub-agents, delegated contexts, or temporary sessions;
- contact or send input to the excluded historical `agent-office` session;
- read from, copy, adapt, cherry-pick, or merge the failed Grok pilot code;
- implement live tmux discovery, polling, server registration, SSH pairing,
  model/effort detection, role mutation, Team reassignment, Advisor chat,
  command-dispatch expansion, watchdog/recovery automation, Batch B-E, or Hermes;
- access or introduce DB/schema/migration, secrets/credentials/env values,
  remote/public/production/live systems, external assets, or paid dependencies;
- weaken lint, TypeScript, security, accessibility, test, or build rules;
- add file-wide suppression, `@ts-ignore`, `@ts-expect-error`, or omit failures;
- alter existing historical baseline files;
- push/merge to main, force push, rewrite history, or stage unrelated files;
- self-review, issue the independent verdict, accept risk, or grant final approval.

## Test and Evidence Gates

Run focused tests as each WorkUnit is completed, then run the complete accepted
gate set. At minimum record exact commands and results for:

- focused organization, actor-summary, drawer, shell/navigation, fallback,
  security, authority, composition, bundle-boundary, and visual tests;
- complete unit suite with accurate totals;
- `npm run lint`;
- `npm run typecheck`;
- `npm run check`;
- production build;
- required integration, PWA/failure, recovery, security, authority, composition,
  UI/accessibility, e2e, and e2e-composed suites exposed by the repository;
- performance budgets and retained-heap/non-growth evidence;
- `git diff --check`;
- desktop, mobile, reduced-motion, static, actor-label, actor-drawer, role-surface,
  Channy close-up, and continuous-motion visual evidence;
- direct loopback start/readiness/open/Office/secondary-view/drawer/mobile/
  reduced-motion/stop/zero-listener rehearsal.

Do not claim a command passed unless its actual exit status and output support it.
Record every failed command and subsequent correction. Do not reuse stale visual
media as evidence for changed behavior.

## Git and Result Contract

Use explicit-path staging. Commit implementation to the authorized branch and
push non-force to `origin/batch-a/modern-office-identity-001`. Verify local and
upstream equality and a clean worktree.

Write the long result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_RESULT.md`

Write the Advisor pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/12_WORKER_RESULT_POINTER.md`

Commit and push only those exact Foundation Docs result/pointer files in a
separate explicit-path commit. Preserve unrelated dirty Foundation Docs files.

The result must include every field required by the Founder authorization and
the repo reporting protocol, including exact session/model/effort, base and final
commit, changed files, diff summary, reused components, all commands and failures,
test totals, lint/type/build/browser/a11y/performance/visual/runtime/listener
evidence, known limitations, rollback, Git/upstream state, no-Grok-code-reuse
attestation, and excluded-session-no-input attestation.

Return a short pointer to Advisor and STOP. Do not start review or Batch B.
