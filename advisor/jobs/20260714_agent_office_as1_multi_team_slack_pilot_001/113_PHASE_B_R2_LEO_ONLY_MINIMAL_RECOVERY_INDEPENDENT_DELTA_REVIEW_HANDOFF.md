# AS1 Phase B R2 Leo-Only Minimal Recovery Independent Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

REVIEW_UNIT: `PHASE_B_R2_LEO_ONLY_FIXED_NODE_AND_RUNBOOK_DELTA_REVIEW`

TARGET_ACTOR: independent Agent Office Reviewer

TARGET_SESSION: `agent-office-reviewer`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

## 1. Scope correction and review boundary

The Founder replaced the enterprise F02 threat model with a private,
single-user trusted-server model. The host and `leo` Unix account are trusted.
The fixed NVM Node binary may be owned by Leo. This review must not reopen the
superseded privileged-helper, root-owned-binary, manifest/journal, immutable
seal, generic executable-trust, or broad host-attestation design.

Review only the exact implementation delta:

- base: `453d697905592ea0b6a4580be289957f05f0f283`
- candidate: `4f57e3f59e01d8af1643f6672f11b253e61e47c1`
- branch: `feature/as1-phase-b-live-pilot-001`
- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

Exactly four changed paths are authorized:

1. `src/runtime/as1-slack-pilot/cli.ts`
2. `tests/operations/as1-slack-lifecycle.test.ts`
3. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
4. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`

Do not inspect unrelated product history, rerun broad suites, or turn a possible
commercial-hardening improvement into a finding for this Leo-only pilot.

## 2. Review profile

- SELECTED_MODEL: GPT-5.6 SOL
- SELECTED_MODE: independent Sentinel Reviewer
- SELECTED_EFFORT: xhigh
- REQUIRED_SKILL: `/fable-sentinel`
- WHY_NOT_LOWER: the delta gates a live Slack owner before state, secret,
  network, and tmux boundaries
- WHY_NOT_HIGHER: one fixed trusted interpreter, four changed paths, and no
  architecture or authority redesign; max is unnecessary
- ESCALATION_TRIGGER: a concrete bypass, secret/path leak, state-root mutation,
  descriptor/authority expansion, or a required change outside the four paths

Review independently and read-only. Do not patch, implement, stage, commit, or
push product files. Do not delegate or create another agent.

## 3. Required evidence

Read directly:

- product `AGENTS.md` and `CLAUDE.md`;
- the Reviewer role/run protocol named by those entry files;
- `/home/leo/Project/skill/fable-sentinel/SKILL.md`;
- this handoff;
- the exact four-file diff;
- the Worker result and pointer:
  - `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_LEO_ONLY_MINIMAL_RECOVERY_WORKER_RESULT.md`
  - `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_LEO_ONLY_MINIMAL_RECOVERY_WORKER_RESULT_POINTER.txt`

Expected Worker-result SHA-256:
`177b50ea2e54c3bbff837b5ec84d969ea60af2865f63404b7d7d6312182b717a`.

Verify the candidate and its upstream directly. The two Worker evidence files
are expected untracked outputs; no other dirty product path is allowed.

## 4. Exact review questions

Return PASS only if all are true:

1. `process.execPath` must equal exactly
   `/home/leo/.nvm/versions/node/v24.18.0/bin/node`.
2. The fixed final path is checked without following a symlink, is a regular
   executable, and is not group- or world-writable. Leo ownership is accepted.
3. Failure exposes only the stable redacted reason `TRUSTED_NODE_REQUIRED`.
4. `start` and `redacted-check` fail before capability subprocess, secret read,
   state-root initialization, network, or tmux side effects.
5. The production foreground path cannot bypass the check. Specifically assess
   the two production preflight calls and the optional injected test seam: flag
   only a concrete bypass or functional defect, not harmless redundancy.
6. The original root remains operationally untouched/non-authoritative and the
   fixed R2 root remains the sole active root.
7. The disabled descriptor, Exact Delivery, writer lock, authority, grants,
   leases, parser behavior, and same-thread status contract are not broadened.
8. Active documentation clearly supersedes the enterprise F02 requirement and
   does not claim immutable sealing.
9. The Worker report accurately states paths, tests, failures, Git state, and
   prohibited actions.

The actual fixed Node may be inspected only with read-only metadata commands.
Do not read or mutate either real state root, read the secret, connect Slack,
activate a descriptor, create authority artifacts, signal a process, or send
tmux input.

## 5. Focused reproduction only

Run only:

```bash
npx eslint src/runtime/as1-slack-pilot/cli.ts tests/operations/as1-slack-lifecycle.test.ts
npx tsc --noEmit -p tsconfig.json
npx vitest run --maxWorkers=1 tests/operations/as1-slack-lifecycle.test.ts tests/adapters/as1-slack-socket-frame.test.ts tests/integration/as1-slack-live-composition.test.ts
npm run build:core
git diff --check 453d697905592ea0b6a4580be289957f05f0f283 4f57e3f59e01d8af1643f6672f11b253e61e47c1
```

One read-only `lstat`/`stat` of the exact Node path is allowed. Do not run broad,
visual, browser, Living Office, full-suite, privileged, live Slack, state-root,
secret, or real tmux-delivery tests.

## 6. Result contract

Write only these governance outputs:

- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/114_PHASE_B_R2_LEO_ONLY_MINIMAL_RECOVERY_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/114_PHASE_B_R2_LEO_ONLY_MINIMAL_RECOVERY_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return exactly one verdict: `PASS`, `NEEDS_PATCH`, or `FAIL`.

- `PASS`: the four-path delta is acceptable for the private Leo-only R2 pilot.
- `NEEDS_PATCH`: identify only the smallest concrete source/test/doc defect.
- `FAIL`: identify a material security or authority conflict that cannot be
  repaired inside the fixed four-path model.

Return the result and pointer to `agent-office-advisor`, then STOP. Do not start
or activate the live pilot.
