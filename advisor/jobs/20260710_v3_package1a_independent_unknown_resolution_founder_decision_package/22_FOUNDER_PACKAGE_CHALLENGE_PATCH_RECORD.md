# Advisor Patch Record - Fable5 Founder Package Challenge

Date: 2026-07-10

Challenge result commit: `362c331`

Challenge verdict: `NEEDS_PATCH`

Patch status: `READY_FOR_SAME_SESSION_FABLE5_DELTA_REREVIEW`

## Scope

Patched only:

- `FOUNDER_DECISION_PACKAGE.md`
- `FOUNDER_ACCEPTANCE_SHEET.md`
- Advisor loop/index/handoff artifacts for this job

No frozen register, actor assessment, comparison matrix, runtime, schema, API, DB, secret, or canonical design was modified.

## Finding Closure

| Finding | Level | Resolution |
|---|---|---|
| P-1 | REQUIRED | Decision 5 split into independent D5-i ownership and D5-ii containment choices; every ownership option remains subject to the independent containment choice |
| P-2 | REQUIRED | Added Scenario 8 covering fake, incentivized, replayed, and competitor feedback, including forbidden automatic action and proof evidence |
| P-3 | RECOMMENDED | Added an explicit separate gate for the existing consultation external-egress path in safe defaults and the consolidated pre-1B list |
| P-4 | RECOMMENDED | Corrected Fact A-12: raw local ID is in the outbox row `canonicalUserId` column; `payloadJson` excludes user identifiers |
| P-5 | RECOMMENDED | Added consolidated pre-Package-1B gate list, including historical-doc status/supersession treatment |
| P-6 | RECOMMENDED | Restored the no-migrate/no-populate safe default for unresolved M4 governance-overlay columns |
| P-7 | INFO | Corrected E-3 actor grouping to preserve Cosmile's conditional-skeptical position |
| P-8 | INFO | Added sensitive-population/legal-safety cross-reference to Decision 1 eligibility |
| P-9 | INFO | Clarified that the incident/user-notification policy in Scenario 5 does not exist yet and must be created/reviewed |

## Decision Count

The package still contains five founder decision sections. Decision 5 now contains two independent sub-decisions so a governance-owner choice cannot silently waive containment.

## Acceptance Coverage

The acceptance sheet now contains eight scenarios. Scenario 8 carries Fable5 ADD-01 into explicit behavior, storage, blocked action, human approval, rollback, and evidence requirements.

## Delta Review Requirement

The same existing Fable5 Reviewer session must review only:

- P-1 through P-9 closure;
- regression in the five-decision limit;
- regression in scenario completeness and no-current-capability claims;
- any new unsupported recommendation introduced by the patch.

No new agent, sub-agent, delegated context, or temporary session is allowed.
