# Advisor Brief - V3 Durable Knowledge and Unknown Gate Canonicalization

Date: 2026-07-10

Validation verdict: `PROCEED_WITH_LIMITS`

Risk level: `LEVEL_3_DOCUMENTATION_AUTHORITY`

Recommended reasoning effort: `<GPT-5.6-Sol:Max>`

## Validated State

- Package 1A final decision closure is published through foundation-docs commit `6164278`.
- U-01 through U-09, all accepted addenda, D1 through D5-ii, scenarios 1-8, and Fable5 founder-package PASS artifacts exist.
- Package 1B remains `NOT_STARTED_NOT_APPROVED`.
- Foundation-docs contains unrelated dirty Advisor files; they must not be staged or changed.
- Runtime repos have no tracked runtime modifications from this mission. Pre-existing untracked documentation remains unrelated and excluded.

## Canonicalization Scope

Create under `../foundation-docs/설계문서/shared/v3/`:

- `V3_UNKNOWN_DECISION_GATE_REGISTER.md`
- `V3_FOUNDER_DECISION_LEDGER.md`
- `V3_EXTENSION_ROADMAP.md`
- `V3_MISSION_ENTRY_EXIT_CHECKLIST.md`
- `V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md`
- `V3_CANONICAL_INDEX.md`

Update only the discoverability pointer in:

- `../foundation-docs/설계문서/cosmile/COSMILE_FEATURE_INDEX.md`

Create only this Advisor job's documentation/review-routing artifacts.

## Required Coverage

- U-01 through U-09.
- A-C1 through A-C3.
- Fable5 ADD-01 through ADD-09, with original ADD-03 visibly superseded by corrected A-C3.
- Foundation evidence-freshness note.
- D1, D2, D3, D4, D5-i, D5-ii.
- Acceptance scenarios 1-8 and their accepted modifications.
- Actor disagreements E-1 through E-6.
- Global safe defaults and all carry-forward gates.
- Deferred-but-designed-for extension points.
- Mandatory V3 entry/exit checklist.
- Level A/B/C gate and escalation rule for Packages 2, 3, and 4.
- Historical V3 evidence precedence and Package 1B non-authorization.

## Forbidden

- Control invocation or Package 1B design.
- Runtime/schema/API/migration edits.
- DB/query/write, secret/env access, flags, main, production/live.
- New actors, sub-agents, or temporary sessions.
- Product decisions or legal conclusions.
- Staging unrelated foundation-docs changes.

## Review Requirement

The same existing Fable5 Reviewer session must read actual source artifacts and canonical files. The Reviewer must verify coverage and non-expansion, not trust this brief or an Advisor summary.

`PASS_WITH_RISK` returns to Leo/GPT. `NEEDS_PATCH` returns to Advisor for in-scope patch and same-session re-review. `FAIL` stops.

## Completion Criteria

- All canonical files exist and are indexed.
- Source traceability is explicit.
- Unknowns, addenda, decisions, scenarios, disagreements, safe defaults, and extensions are complete.
- Packages 2/3/4 cannot bypass the unknown gate.
- Package 1B remains not started.
- Fable5 `PASS` exists.
- Advisor final audit confirms no forbidden changes.
