# Worker Patch Handoff

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

PATCH_CLASS: `ROUTINE_BOUNDED_AUTHORITY_FENCE`

BASE_CANDIDATE: `b523b5cf0277badb093c6d1046d71ff3f414446c`

TARGET_WORKER: `agent-office-opus`

TARGET_WORKTREE:
`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

## Advisor Validation Findings

The first candidate is not ready for independent review. Preserve its valid
destination migration, but patch these two defects only.

### AO-PTIM-F01 — real registry row is rejected

`assertRegistry` accepts only a row beginning `| Advisor |`, while the current
canonical registry row begins `| Agent Office Advisor |`. The test fixture
invented the shorter row and therefore did not exercise the real committed
registry shape.

### AO-PTIM-F02 — historical authority remains sufficient

The active descriptor remains v1, still trusts the historical 20260711
activation job for its readiness/evidence path allowlist, and has no mandatory
snapshot of the current physical-identity migration decision. Merely replacing
constants means the historical activation chain can effectively authorize a
different physical destination. That violates the clarification that historical
delivery evidence is immutable but non-authoritative.

## Required Patch

1. Validate the actual current `Agent Office Advisor` registry row using an
   exact, structural column check. Require exactly one matching routable row and
   the current destination:
   `agent-office-advisor/$26/@26/%26`, indexes `0/0`, workspace
   `/home/leo/Project/agent-office`, command `codex`. Do not use loose substring
   matching that can accept a duplicate or malformed row.

2. Add a narrow versioned current-destination authority fence. A current
   activation must require an exact Git snapshot of:

   `advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/01A_ACTIVE_REFERENCE_SCOPE_CLARIFICATION.md`

   The snapshot validation must require the current destination, explicit
   historical-destination prohibition, historical evidence-only treatment,
   no VibeNews change, and no Slack/AS1 activation. Include this exact snapshot
   in the capability authority hash.

3. A legacy v1 activation descriptor or the historical activation snapshot
   chain alone must fail closed for the current physical destination. Use an
   explicit schema/version boundary; do not silently reinterpret old v1
   descriptors as authority for the new target.

4. Move active readiness-lease and Advisor-evidence path validation from the
   historical 20260711 activation job to the current 20260714 migration job.
   Do not edit, delete, or rewrite any historical artifact.

5. Historical artifacts may remain as immutable supporting evidence only when
   the new migration decision is also present and valid. They must not determine
   or authorize the current physical destination and must never provide an old
   fallback.

6. Preserve the existing live two-preflight behavior, one-use capability,
   exact single pane, kill switch, manual fallback, and journal fail-closed
   behavior. Do not send tmux input or activate transport.

7. Add targeted tests proving:
   - the real canonical registry row passes;
   - the fabricated `| Advisor |` row and duplicate/malformed rows fail;
   - legacy v1/current-target descriptors fail;
   - historical snapshots without the exact migration decision fail;
   - a wrong, tampered, dirty, non-ancestral, or stale migration decision fails;
   - the current exact migration decision and current destination pass;
   - readiness/evidence paths under the old 20260711 job fail;
   - all historical destination fields remain `FORBIDDEN_TARGET`.

8. Update the durable Worker result and pointer with every command and result.

## Allowed Files

- `src/adapters/gateways/tmux-advisor/exact-config.ts`
- `src/adapters/gateways/tmux-advisor/exact-authority.ts`
- `tests/integration/exact-advisor-delivery.test.ts`
- `config/agent-office.exact-delivery.disabled.example.json` only if its
  version/fail-closed note must change
- existing mission Worker result and pointer under
  `artifacts/pre-as1-physical-transport-identity-migration/`

Request a scope correction before touching any other path.

## Targeted Gates

- focused exact-config and exact-authority tests;
- focused exact-delivery integration test file;
- TypeScript typecheck;
- ESLint on changed TypeScript/test files;
- `git diff --check`;
- active transport-reference search with organization and immutable evidence
  references classified rather than blindly replaced.

Do not run product, visual, Living Office, Slack, VibeNews, or broad unrelated
tests. Do not merge, modify main, force push, or touch another worktree/session.

Return the patched candidate to `agent-office-advisor` and STOP.
