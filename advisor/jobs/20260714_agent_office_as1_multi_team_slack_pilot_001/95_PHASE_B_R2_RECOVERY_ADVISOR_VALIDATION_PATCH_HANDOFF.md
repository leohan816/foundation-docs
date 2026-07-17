# AS1 Phase B R2 Recovery Advisor Validation Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `PHASE_B_R2_RECOVERY_ADVISOR_VALIDATION_PATCH`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## 1. Why this bounded patch is required

The R2 implementation result at product HEAD
`04e8e0170ea4e846480099e105788ef1255651ac` is clean, pushed, and useful, but
targeted Advisor validation found three contract mismatches before independent
implementation review. This is a same-Worker correction, not a design restart.

1. The accepted design and handoff require a real fixed, reviewed, no-argument
   production preservation helper in setup section 10.6. The candidate provides
   only the injected-seam algorithm while the setup document and Worker result
   inaccurately claim that the production helper exists.
2. The accepted R2 design requires status ordering and failure-sibling checks at
   every named durable/network boundary. The candidate checks only selected
   outer boundaries and lets `sendStatus` run without the status-specific
   ordering guard at each outbox side effect.
3. The setup document names the original root outside the exclusive forensic
   section while claiming it is named only there.

Do not rewrite accepted parser, root-R2, exact-delivery, or bridge behavior.
Preserve the previous Worker result as immutable historical evidence; correct
its claims in the new patch result instead of editing it.

## 2. Exact coordinates and profile

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact patch parent: `04e8e0170ea4e846480099e105788ef1255651ac`
- original accepted R2 design: product commit
  `a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff`
- prior source candidate:
  `89c11d21e1e51d44877d81c68f0fe4399094512c`
- prior result/pointer: `39e24fbe4048d5bf360b2e22a9f699563fb68609`
  and `04e8e0170ea4e846480099e105788ef1255651ac`

Dispatch profile remains Opus 4.8 (1M context), Claude Code Ultracode,
Ultracode effort, with `/fable-builder`.

- `WHY_NOT_LOWER`: the patch closes cross-await status-ordering and a
  descriptor-relative forensic-preservation claim before live activation.
- `WHY_NOT_HIGHER`: this is a bounded correction within already accepted design
  and existing source surfaces; Ultracode is sufficient.
- `ESCALATION_TRIGGER`: return `HOLD` if the fixed production preservation
  helper cannot be represented safely in the existing approved paths, or if
  status ordering requires a new store/schema/framework or weaker invariant.

Verify runtime/profile/skill, exact clean HEAD, and upstream equality before
editing. Do not silently change profile or delegate.

## 3. Exact patch allowlist

Only these eight existing implementation/document/test paths may change:

1. `src/application/slack-pilot/outbox.ts`
2. `src/runtime/as1-slack-pilot/composition.ts`
3. `src/runtime/as1-slack-pilot/cli.ts`
4. `src/persistence/file-store/writer-lock.ts`
5. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
6. `tests/integration/as1-slack-outbound.test.ts`
7. `tests/integration/as1-slack-live-composition.test.ts`
8. `tests/operations/as1-slack-lifecycle.test.ts`

Two new evidence-only paths are additionally authorized:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_WORKER_PATCH_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_WORKER_PATCH_RESULT_POINTER.txt`

No other path may change. Do not modify the accepted R2 design, prior Worker
result/pointer, descriptor, contracts, stores/schemas, package files, secrets,
configuration, or another repository.

## 4. Required corrections

### F01 - exact status ordering and durable failure barriers

Implement sections 5.5-5.7 of the accepted R2 design exactly, without adding a
generic workflow or notification framework.

- Every status after `ACCEPTED` requires the deterministic `ACCEPTED` record at
  `RESPONSE_RECORDED`; absent/nonterminal is a fixed profile latch and zero
  later status/business work.
- `DELIVERY_FAILED` may start only while `DELIVERY_CONFIRMED` and
  `PROCESSING_FAILED` are wholly absent.
- `DELIVERY_CONFIRMED` may start only while both failure siblings are wholly
  absent. Recheck immediately before its request-artifact/PREPARED write,
  REQUEST_STARTED write, Web call, response-artifact write, and
  RESPONSE_RECORDED write.
- `PROCESSING_FAILED` may start only after terminal tmux proof and while
  `DELIVERY_FAILED` is wholly absent.
- The status-specific guard must run at `sendStatus` entry and before every
  durable or Web side effect. It must permit only byte-identical recovery of the
  same failure status from its own PREPARED record and must never permit a
  sibling or business operation behind a durable failure record.
- Re-read the failure classifier at `deliverPending` entry, before grant/lease
  authority use, immediately before exact transport, and before retaining an
  accepted grant/lease pair.
- Re-read it at `ingestEvidenceAndProject` entry and before every evidence
  checkpoint, status, and business projection.
- A non-`DELIVERED` status outcome is terminal for the current progression:
  preserve its exact outbox state, durably latch with a stable local reason when
  no stronger latch exists, expose no intake/authority, and perform no later
  delivery/evidence/status/business work. Do not substitute another status.
- An `ACCEPTED` recovery that reaches REQUEST_STARTED/manual must not arm Socket
  receive or continue benign polling. A failed/non-delivered
  `DELIVERY_CONFIRMED` must not continue to INTAKE or RESULT projection.
- Do not ignore a failure-status send result or swallow failure-barrier
  establishment. If no first durable failure phase exists, do not falsely call
  it a crash-durable barrier; use the existing durable profile/global latch and
  halt, or return `HOLD` if the invariant cannot be established.
- Preserve the single foreground writer and sequential owner loop. Add no
  parallel sender.

Add focused proofs for all four outbox phases plus conflict, status-side-effect
rechecks, accepted/manual no-arm, confirmed-failure no-projection,
pre-transport/pre-retain checks, and restart-safe terminal behavior. Tests must
demonstrate the defect would fail without the correction.

### F02 - real fixed no-argument production preservation helper

The setup document's forensic section must contain the actual fixed reviewed
operator helper/command required by design 4.4, not prose that calls the
injected-seam TypeScript algorithm a production helper.

- The production helper is no-argument and binds only the exact original root
  literal. It accepts no argv path, environment root, discovery result, or
  generic destination.
- It must use retained no-follow descriptors and descriptor-relative traversal,
  pin ancestor/root/mount identities, reject symlink/hard-link/mount/path/inode/
  type/entry-set races, establish namespace quiescence, remove write bits, set
  and verify `FS_IMMUTABLE_FL`, and compute/compare the final digest only after
  final process/lock/identity/seal proofs.
- Unsupported interpreter/filesystem/ioctl/privilege behavior returns the fixed
  `HOLD` outcome with no path-based or mode-bit-only fallback.
- The helper must first verify the installed R2-only manifest/disabled state,
  exact build facts, no old-root-capable active AS1 owner, and no original lock.
  It must output only redacted fixed outcomes and bounded success proof fields.
- Do not execute it, inspect either real root, probe privilege, or mutate a real
  file in this Work Unit. Synthetic tests may inspect the committed helper
  contract and exercise temporary injected seams only.
- If this cannot be implemented and tested without adding a new path or
  weakening the design, return `HOLD`; do not retain the false production claim.

Keep the exact original-root literal out of active `src`. In the setup document,
name it only inside the explicit original-root forensic-preservation section.
Remove the contradictory occurrence in section 10.1.

### F03 - evidence accuracy

The new patch result must explicitly correct these prior claims:

- the previous candidate did not contain a real fixed no-argument production
  helper; it contained only the seam-driven synthetic algorithm;
- status ordering was not rechecked at every design-required side-effect
  boundary;
- the prior setup document's `ONLY` statement was false.

Do not edit or erase the prior result. Record every patch command, failure,
retry, test total, limitation, and final commit accurately.

## 5. Prohibitions

Do not access or print secrets, connect to Slack, post a message, send tmux
input to a destination, signal a real process, initialize/mutate/preserve either
real state root, activate the descriptor, mint/consume live authority, or start
a pilot. Do not add a DB, Registry/schema, package/dependency, framework,
systemd/service, UI, VibeNews, external-project change, generic root/target,
standing authority, or second profile operation.

## 6. Delta-only gates

Run only the affected focused gates:

```bash
npx eslint src/application/slack-pilot/outbox.ts src/runtime/as1-slack-pilot/composition.ts src/runtime/as1-slack-pilot/cli.ts src/persistence/file-store/writer-lock.ts tests/integration/as1-slack-outbound.test.ts tests/integration/as1-slack-live-composition.test.ts tests/operations/as1-slack-lifecycle.test.ts

npx tsc --noEmit -p tsconfig.json

npx vitest run --maxWorkers=1 tests/integration/as1-slack-outbound.test.ts tests/integration/as1-slack-live-composition.test.ts tests/operations/as1-slack-lifecycle.test.ts

npm run build:core

git diff --check
```

Also run exact path-scope, original-root-location, descriptor-byte-identity,
secret/redaction, and no-real-root-operation scans needed for these findings.
Do not rerun Living Office, visual, browser, full product, or unrelated suites.

## 7. Commit and return

Use explicit staging and non-force push only. Produce:

1. one bounded source/test/doc patch commit;
2. one new patch-result commit;
3. one new patch-pointer commit.

Return the new pointer to `agent-office-advisor` and STOP. The same independent
SOL Sentinel Reviewer will inspect the full implementation candidate and this
patch. Do not self-review or activate live operation.
