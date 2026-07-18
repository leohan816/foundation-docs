# Handoff 120: PERSONAL_LEO_ONLY Legacy Latch Retirement

Status: `ACTIVE`

Implementation base: `0ba8df392af7ce96e0e4fde118d054552fd280a3`

Worktree: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

Branch: `feature/as1-phase-b-live-pilot-001`

## Objective

Retire only the obsolete `agent-office-advisor` profile latch whose exact reason is
`receive-grant diverged post-acceptance: GIT_ERROR`, after the fresh startup grant has
passed expiry, state-root binding, exact snapshot equality, and Git provenance checks.

## Required behavior

1. Add a no-argument control operation that can retire only the
   `agent-office-advisor` latch when all of these are true:
   - global state is exactly `DISABLED_CLEAN`;
   - active profile is `null`;
   - global kill is clear;
   - incident admission is open;
   - the strictly parsed profile latch is `true`;
   - its reason exactly equals the obsolete reason above.
2. Persist the canonical false latch atomically before updating the in-memory cache.
   On every mismatch or persistence failure, mutate nothing and fail closed.
3. Invoke this operation only in `PERSONAL_LEO_ONLY`, immediately before the existing
   `isProfileLatched` startup check and only after all four startup-grant validations
   named in the objective have succeeded.
4. Extend only the existing sequential PERSONAL integration test. Seed the exact latch
   before grant snapshot hashes are derived, then prove retirement, two same-thread
   messages, and clean stop.

## Allowed paths

- `src/operations/readiness/as1-slack-control.ts`
- `src/runtime/as1-slack-pilot/composition.ts`
- `tests/integration/as1-slack-live-composition.test.ts`

## Forbidden

No generic reset; caller-selected reason or profile; root deletion; other-latch or global
kill bypass; non-PERSONAL change; new test; document beyond this authority handoff;
framework; broad test; typecheck; build; legacy outbox change; profile or routing change.

## Validation

Run only:

- `npx vitest run tests/integration/as1-slack-live-composition.test.ts -t "handles two sequential PERSONAL_LEO_ONLY messages with same-thread replies and dedupe"`
- ESLint on the three allowed files only;
- `git diff --check 0ba8df392af7ce96e0e4fde118d054552fd280a3..HEAD`;
- legacy outbox zero-diff proof.

Commit once and non-force push. Preserve the two existing untracked R2 artifacts.
Return the candidate or one concrete compile/test blocker, then stop.
