# Fable5 AO12-A Implementation Review Brief

Status: `READY_FOR_EXISTING_REVIEWER_FABLE5`

## REVIEWER ROUTING DECISION

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Target session: `reviewer-fable5`
- Required skill: `/fable-sentinel`
- Model/effort: Fable5 Max, Level 3
- Reason: AO12-A establishes cross-project actor authority, source-evidence,
  redaction, fail-closed assignment, current-name, and M1 compatibility
  contracts. The same independent Fable5 context already reviewed the frozen
  design and must now verify code-to-design conformance.
- Not selected: Control Reviewer and Opus 4.8 are insufficient for this
  authority/security boundary; Codex SOL fallback is unnecessary while the
  independent Fable5 session is available; dual review is not required for this
  additive non-production-selected batch.
- Review level: Level 3
- Return result to: Advisor
- Status: READY_TO_USE

## Exact Subject

- base: `b7d8cdb21183bf909a13b902cffc95bf15c68dd9`
- implementation: `ecd2652501df55aba0aa0f55c236b1933c6dc1e3`
- Worker result: `WORKER_AO12_A_RESULT.md`
- Advisor validation: `26_ADVISOR_AO12_A_VALIDATION.md`

## Required Review Questions

1. Does the 20-path delta exactly match the authorized AO12-A scope?
2. Is the v1 read model closed, deterministic, safely redacted, and internally
   cross-referenced without trusting terminal prose or unverified display data?
3. Does invalid, absent, stale, conflicting, or unsupported evidence fail closed
   to static M1, `UNKNOWN`, `UNASSIGNED`, `CONFLICT`, or motion suppression?
4. Are Team authority, one responsible Advisor, actor identity, project/host/
   source, Reviewer independence, accepted activity event, and no-clone rules
   correctly enforced?
5. Are current Foundation and conditional VibeNews rosters represented exactly,
   with Agent Office inside Foundation Team and no visual-authority inference?
6. Does the M1 adapter preserve exact station meaning, precedence, routes,
   deduplication, timing, pagination, and fallback behavior?
7. Is mission/Pod selection explicit or canonical rather than inferred from
   activity, timestamp, array order, or unverified state?
8. Is the `SIASIU` correction complete in current surfaces without changing
   actor authority, IDs, assignments, transport, events, or baseline pixels?
9. Are display redaction and path/pane/credential/private-target suppression
   sufficient and test-backed?
10. Are source/application boundaries free of process, network, filesystem
    write, dispatch, persistence, transport, or gateway capability?
11. Do the tests actually cover the load-bearing claims, and do full test,
    build, E2E, dependency, baseline, path, and Git results reproduce?
12. Did the mechanical document updates remain factual without authorizing
    AO12-B/C/D or claiming production selection?
13. Did AO12-A alter M1 auth, exact Advisor delivery, transport authority,
    runtime composition, DB, network, package, asset, or deployment behavior?
14. Is AO12-A precise and safe enough for Advisor to accept the dependency gate
    and prepare AO12-B without a new Founder decision?

## Verdict Contract

Return one: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

- `PASS_WITH_RISK` returns to Leo/GPT and does not advance.
- `NEEDS_PATCH` returns to Advisor for the same-Worker/same-Reviewer bounded
  patch loop.
- `FAIL` stops.
- A clean `PASS` closes only the AO12-A review gate. It does not grant final
  approval or authorize any scope beyond the already frozen serial manifest.
