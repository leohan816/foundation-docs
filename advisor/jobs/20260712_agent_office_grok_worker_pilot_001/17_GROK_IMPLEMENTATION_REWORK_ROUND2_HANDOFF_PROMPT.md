# Grok Pilot Implementation Rework Round 2

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing `agent-office-grok/$16/%16`
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
DO_NOT_PASTE_INTO: Advisor, `agent-office`, or Reviewer
RETURN_RESULT_TO: Advisor

Patch candidate `bc143e396d323e2ed5df267561b7fa5548c3673e` only. Directly read
`16_ADVISOR_REWORK_ROUND2_VALIDATION.md`, the original brief, the actual source,
tests, dirty docs, and active repo instructions. Do not trust the prior result.

## Required Corrections

1. Replace the single union-state response with a coherent typed observation
   whose independent facets preserve session/process/identity/model/effort/work
   truth without treating one facet as proof of another.
2. Implement pure evidence-resolution logic. A separately accepted runtime
   identity evidence object may prove `AI_READY`; accepted structured WorkUnit
   evidence with evidence ID and matching runtime/session context is required
   for `AI_WORKING`. Unstructured prose, attach state, activity timestamps,
   process names, session names, and proximity must be rejected as work proof.
3. Implement explicit fail-closed outcomes for dead pane, unknown process,
   offline server, waiting, error, and same-identity conflicting observations.
4. Deduplicate only complete field-identical records. Compare every parsed
   field. Preserve or reject same-identity differences as conflict; never drop
   them through a partial key.
5. Restore an exact 13-field tuple boundary or convert immediately into a fully
   validated named record. Remove unreachable defaults and `|| '0'` fallbacks.
   Validate integers with full-string syntax, preserve exact record bytes except
   one allowed final newline, and make attached required.
6. Carry all parsed list fields needed for session/window/pane hierarchy and
   evidence: indexes, workspace, dead, activity, synchronization, attached, and
   deterministic observation time.
7. Match executable names exactly or through an explicit normalized basename
   allowlist. Unknown processes must remain unknown, not become
   `NO_AI_PROCESS` by default.
8. Add real focused tests for every original required fixture plus ready,
   working, waiting, error, rejected unstructured work, strict integer suffix,
   invalid UTF-8, partial-key conflict, and empty/missing field rejection.
9. Fix lint without weakening strict type checks. Run the exact repository
   commands and report their real totals and failures/retries.
10. Correct and commit the two authorized docs only after source and tests prove
    every statement. Correct the Worker result and pointer with exact commit
    SHAs and no unsupported claims.

## Required Gates

```text
npm run lint
npm run typecheck
npm test
npx vitest run --maxWorkers=1 tests/domain/runtime-observation.test.ts tests/adapters/tmux-runtime-discovery.test.ts tests/adapters/tmux-readonly.test.ts
npm run build
git diff --check
```

Also run exact changed-file and forbidden-scope scans.

## Scope

The prior allowlist plus the already approved three compatibility test files
remains exact. No package/lock/config/runtime/UI change. No agent, subagent,
delegated context, new session, model switch, DB, secret, remote access, or
contact with `agent-office`.

Commit and push one corrected target commit. Publish one corrected Worker result
commit and at most one pointer metadata commit. Return the ASCII-only pointer to
Advisor and STOP. Do not invoke Fable5.
