# AS1 Phase B Patch 5 Independent Delta Review Handoff

## Assignment

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Reviewer: same independent `agent-office-reviewer`
- Model / effort: GPT-5.6 SOL / max
- Required Sentinel instructions:
  `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Review mode: source-first, read-only, exact Patch 5 delta review

Max remains the lowest sufficient profile because this delta closes two
previously CRITICAL defects in incident domination and single-writer authority.
Do not change profile, delegate, implement, patch, or accept risk.

## Exact subject

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Patch 5 exact baseline / prior evidence HEAD:
  `3165e7470e7e69658aaa1b627d7cd47767478043`
- Patch 5 source candidate:
  `cca0cb5e2485c029b6d1715e37abf9bc55c548bd`
- Patch 5 result commit:
  `cbf81c79f681d7a590da92351da38f59bcb48bee`
- Product evidence HEAD:
  `2507cc7f15e677c781c026881ca721a2d4d3e5ae`
- Product result SHA-256:
  `9b4e4bc7034d9a7b7c0e447d68a4b23cbeba24e97ebfb3a31e141d2fdcaf7b27`
- Product branch was independently observed clean, pushed, and upstream-equal
  before this dispatch.

Read directly:

- prior independent review result
  `79_PHASE_B_PATCH_4_INDEPENDENT_DELTA_REVIEW_RESULT.md`;
- Worker brief `80_PHASE_B_WORKER_PATCH_5_BRIEF.md`;
- product Patch 5 result and pointer;
- actual source delta `3165e747..cca0cb5` and load-bearing surrounding source;
- canonical Phase B design/security/setup only where the delta depends on it.

Inspect source before relying on Worker or Advisor summaries.

## Scope lock

The source candidate may change exactly these six paths relative to `3165e747`:

1. `src/runtime/as1-slack-pilot/composition.ts`
2. `src/operations/readiness/as1-slack-control.ts`
3. `src/persistence/file-store/writer-lock.ts`
4. `tests/integration/as1-slack-live-composition.test.ts`
5. `tests/operations/as1-slack-lifecycle.test.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`

The result and pointer are the only later evidence paths. Verify no CLI,
service, descriptor, package, Registry, schema/database, framework, UI,
VibeNews, external project, prior-evidence, secret, or authority-surface
change.

## Review order

1. Inspect the actual Patch 5 source delta first.
2. Re-review only open F01-A, F01-B, and dependent F06 from result 79.
3. Confirm accepted F02-F05 have no concrete source regression; do not reopen
   them from general concern.
4. Reproduce the bounded relevant gates once.
5. Verify the Patch 5 Worker result and return one explicit verdict.

## Required closure checks

### F01-A - incident domination inside the actual inbound service

- The live Socket callback constructs `As1InboundService` over the existing
  synchronous incident-guarded inbound store and control/gate and wraps the
  Slack ACK continuation with the same pre/post guard.
- Every collaborator invocation is checked immediately before invocation and
  immediately after its returned promise. An incident during an await begins no
  later store, transport, bind/consume, ACK, materialization, Slack, or other
  side effect.
- The same guarded service instance covers `recoverPending()` without changing
  the service source or contract. Any injection seam is test-only and inert in
  production.
- Ordered callback-level tests directly cover receipt persistence,
  dedupe/open, Slack ACK, root binding, pre-ACK recovery, and result
  materialization. Each assertion must isolate the next forbidden durable
  effect, not merely an eventual terminal state.
- A pending incident routes exactly once through the existing durable incident
  path. No real Slack, tmux, process signal, secret, or owner state is used.
- Confirm the tests are genuinely adversarial from source inspection and the
  recorded neutralization evidence; do not repeat every destructive
  neutralization run unless a concrete inconsistency requires it.

### F01-B - phase-aware WriterLock release and one-writer authority

- The namespace unlink is the exact authority-relinquishing point. Once it
  succeeds, the old owner is irrevocably `RELEASED` even if a later hook,
  directory fsync, or retained-handle close is ambiguous.
- A missing, replaced, mismatched, or otherwise unprovable fixed leaf yields
  `LOST`: no unlink of an unowned object and no old-owner fallback mutation.
- `RETAINED` is possible only before unlink while the fixed leaf remains
  positively proven to be this owner's exact lock. Only that sole-owner case
  may perform the existing bounded fallback kill.
- Released/lost retained descriptors close deterministically. A retained
  descriptor is not abandoned to GC; the retained-path test closes it during
  test cleanup without changing production ownership semantics.
- Cleanup never retries an ambiguous release, never re-acquires, never unlinks
  a second owner's leaf, and never performs a stale fallback write.
- The post-unlink interleaving test proves a second writer can acquire the
  freed namespace before the first owner's injected failure, while the first
  owner reports released authority and performs no later authority-bearing
  mutation.
- Composition state, `killEngaged`, `lockReleased`, `cleanupProven`, and detail
  fields report the observed outcome rather than a synthetic clean or killed
  claim.

### F06 - proof and operator truth

- Setup text describes only the proved inbound incident and phase-aware release
  behavior; it no longer claims every release failure retains authority.
- Patch 5 evidence explicitly supersedes review 79's F01-A/F01-B findings and
  Patch 4's inaccurate retained-release statement without editing prior
  evidence.
- Independently verify the reported totals (`106`, `188`, `412`), recorded
  failures/corrections, absence of the FileHandle-on-GC warning, descriptor
  identity, no-live-I/O attestations, exact source/evidence lineage, and Git
  state.
- Preserve the private Leo-only pilot, one selected profile/client, fixed state
  root, no historical destination fallback, live-disabled restart, and the
  byte-unchanged default-disabled descriptor.

## Bounded reproduction

Run only:

- the two changed focused test files;
- the exact five-file Phase B suite;
- the established AS1 19-file suite once with `--maxWorkers=1`;
- read-only typecheck and core build;
- ESLint over the exact five changed TypeScript paths;
- `git diff --check`;
- exact scope/lineage/descriptor/prior-evidence checks and narrow
  secret/dynamic-target/unsafe-Git scans.

Do not rerun full product, Living Office, visual, or unrelated suites. Do not
repeat every baseline adversarial run when source inspection and the exact new
tests are sufficient. Do not install dependencies, access owner secrets,
connect Slack, initialize owner state, observe or mutate a live pilot tmux
destination, send a real signal, or activate the descriptor.

## Independence and output

The product worktree is read-only. Do not patch, stage, commit, push, or alter
it. Do not delegate.

Write only:

- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/82_PHASE_B_PATCH_5_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/82_PHASE_B_PATCH_5_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return exactly one verdict: `PASS`, `NEEDS_PATCH`, `FAIL`, or
`PASS_WITH_RISK`. A risk may not be silently accepted. Return both paths to
`agent-office-advisor` and STOP.
