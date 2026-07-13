# Advisor Validation - Control Source-Exactness Patch

## Verdict

`READY_FOR_SAME_SENTINEL_FDR_DELTA_REREVIEW`

Control commit `535f39aaf090043e4d7e1ddaf7d369a0c321b159` is clean,
upstream-equal, and changes only the four authorized canonical documents.
Direct source and diff inspection confirms the three accepted findings are
addressed without implementation or scope expansion.

## Verified Corrections

1. Camera now uses `fullOfficeCamera(...)` and actual `FULL_OFFICE` vocabulary;
   a renderable pod uses non-sentinel `AdvisorTeam`, while actor-level
   `UNASSIGNED` remains fail-closed.
2. Raw parsing now has a distinct exact contract for top-level, frame, actor,
   sixteen envelopes, diagnostics, revision equality, canonical UTC, and
   `canReceiveWork`; wrapper parsing remains separate.
3. Vite eager entry now uses absolute `index.html` facade and asserts
   `src/ui/main.tsx` in `.modules`; the production Office dynamic facade and all
   existing graph/isolation checks remain intact.

`git diff --check` passes. Source, tests, package/config, prototype entry, and
fixtures are untouched. All prior PRC and stale-text corrections remain present.

## Reviewer Routing Decision

- Target actor: Sentinel
- Selected reviewer: Codex SOL / GPT-5.6 SOL Sentinel
- Target session: `foundation-reviewer-sol`
- Required skill: `/fable-sentinel`
- Reason: the same reviewer must close FDR-1/FDR-2/FDR-3 using its own reproduced
  evidence; review remains narrow and read-only.
- Not selected: Control cannot self-review; Worker remains stopped; secondary
  reviewer is unnecessary for this exact technical delta.
- Review level: Level 2 design-contract delta
- Effort: xhigh
- Return result to: Advisor
- Status: READY_TO_USE

