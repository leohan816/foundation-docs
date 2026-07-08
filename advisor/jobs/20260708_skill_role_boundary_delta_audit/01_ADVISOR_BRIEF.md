# 01 Advisor Brief - Skill Role Boundary Delta Audit

## Verdict

`ADVISOR_SYSTEM_READY_WITH_LIMITS`

Instruction validation: `PROCEED_WITH_LIMITS`

Limits:

- Advisor `AGENTS.md` still lists `../skills`, but the actual repo path confirmed for this audit is `../skill`.
- This job only reports that path mismatch. It does not modify `AGENTS.md`.

## Executive Summary

- `fable-builder` is the implementation skill for approved implementation batches.
- `fable-sentinel` is the independent review/audit skill and must not execute implementation.
- `fable-debugger` is an optional non-contract/general debugging skill and must not replace builder or sentinel.
- `shared-reasoning-core` is not an active skill; it has no `SKILL.md` and is a shared reference store.
- Future Advisor briefs should use exact skill prefixes: `fable-builder`, `fable-sentinel`, `fable-debugger`. There is no `shared-reasoning-core` skill prefix for role assignment.

## Evidence Checked

| Source | Evidence |
|---|---|
| `../skill/README.md` | Root table says `fable-sentinel` = review/audit and `fable-builder` = implementation. It also says `shared-reasoning-core` is shared reference only, not a skill. |
| `../skill/fable-builder/SKILL.md` | Frontmatter `name: fable-builder`; description says approved implementation batches, contract-to-code, test-before-code, implementation evidence reports. It says review/audit belongs to `fable-sentinel`. |
| `../skill/fable-sentinel/SKILL.md` | Frontmatter `name: fable-sentinel`; description says independent review/audit, contract consistency, safety/adverse, provenance, readiness, delta review. It says implementation execution is `fable-builder` domain. |
| `../skill/fable-debugger/SKILL.md` | Frontmatter `name: fable-debugger`; description says general non-contract debugging/troubleshooting. It explicitly redirects design review/readiness/delta review to sentinel and approved implementation to builder. |
| `../skill/fable-debugger/README.md` | Confirms `fable-debugger` is for unknown bugs, repeated errors, scripts, pipelines, environment/runtime issues; not for review/audit or approved implementation. |
| `../skill/shared-reasoning-core/README.md` | States the folder intentionally has no `SKILL.md`, is not independently triggered, and is shared reference storage. |
| filesystem check | `../skill/shared-reasoning-core/SKILL.md` does not exist. |

## Role Boundary Findings

### 1. `fable-builder`

Status: confirmed implementation role.

Use for:

- Approved implementation batches.
- Contract-to-code mapping.
- Test-before-code work.
- Schema/API/event/test landing for contract fields.
- Implementation evidence reports.
- Repeated failure during builder work via shared failure-escalation reference.

Do not use for:

- Design review.
- Contract consistency review.
- Safety/adverse review.
- Provenance verification.
- Implementation readiness review.
- Delta review.

Advisor brief guidance:

- In Worker implementation briefs, write: `Required skill: fable-builder`.
- Use only after Advisor has validated that implementation is allowed.
- Include stop condition: if the Worker finds contract gaps or contradictions, stop and return to Advisor/Leo instead of resolving by inference.

### 2. `fable-sentinel`

Status: confirmed review/audit role.

Use for:

- Independent design review.
- Contract consistency review.
- Safety/adverse/consent/erasure review.
- Provenance/source verification.
- Implementation readiness gate.
- Delta review.
- Reported-complete vs actual-source verification.

Do not use for:

- Implementation execution.
- Writing code.
- Applying patches.
- Acting as Worker.

Advisor brief guidance:

- In technical Reviewer briefs, write: `Required skill: fable-sentinel`.
- Require a separate session from Advisor and Worker.
- Require read-only diff/test/code inspection.
- Instruct Reviewer not to trust Worker reports.

### 3. `fable-debugger`

Status: confirmed optional non-contract/general debugging role.

Use for:

- Unknown bugs.
- Repeated errors outside approved implementation batches.
- General scripts/pipelines/environment/runtime/PATH/cache/version problems.
- Async/race/performance debugging when not a contract review and not an approved implementation batch.

Do not use for:

- Contract review.
- Safety/adverse review.
- Provenance review.
- Readiness or delta review.
- Approved implementation batches.
- Contract-to-code mapping.
- Implementation reports.

Advisor brief guidance:

- Use sparingly in future briefs.
- Only write: `Required skill: fable-debugger` for non-contract debugging tasks.
- Do not use it as a fallback reviewer or implementation skill.

### 4. `shared-reasoning-core`

Status: confirmed shared reference, not active skill.

Evidence:

- `shared-reasoning-core/README.md` says it intentionally has no `SKILL.md`.
- Filesystem check confirms `shared-reasoning-core/SKILL.md` is absent.
- It stores `references/failure-escalation.md` as the shared failure-escalation reference.

Advisor brief guidance:

- Do not assign `shared-reasoning-core` as a required skill.
- Do not call it a Worker or Reviewer skill.
- If a Worker/Reviewer is already using builder/sentinel/debugger and hits repeated failure, the relevant skill may reference `../shared-reasoning-core/references/failure-escalation.md` through its own protocol.

## Skill Prefix Map for Future Advisor Briefs

| Role | Prefix Advisor Should Use | Session Type |
|---|---|---|
| Implementation Worker | `fable-builder` | Worker, implementation after approval |
| Independent Technical Reviewer / Sentinel | `fable-sentinel` | Reviewer, read-only |
| General non-contract debugger | `fable-debugger` | Debugger/worker only for non-contract troubleshooting |
| Shared failure escalation reference | none | Reference only, not an active skill |

## Advisor AGENTS.md Finding

Finding: `./AGENTS.md` allowed read scope currently lists `../skills`, but the actual skill repository path confirmed in this audit is `../skill`.

Impact:

- Future Advisor sessions following `AGENTS.md` literally may fail to inspect the skill repo, as happened in the previous current-state audit.
- The correct maintenance patch should update Advisor operating docs from `../skills` to `../skill`, or explicitly allow both if Leo wants backward compatibility.

Action in this job:

- No modification performed, per instruction.

## What Advisor Should Do In Future Briefs

- For Worker implementation briefs: require `fable-builder`.
- For independent technical review briefs: require `fable-sentinel`.
- For general non-contract debugging briefs only: require `fable-debugger`.
- For shared failure escalation: mention it only as a reference path used by the active skill, not as a skill prefix.

## What Advisor Should Not Do

- Do not assign `fable-debugger` to contract review.
- Do not assign `fable-sentinel` to implement code.
- Do not assign `fable-builder` to review/approve its own work.
- Do not list `shared-reasoning-core` as a skill.
- Do not write Worker briefs from this audit.

## Completion Criteria

- Role boundaries verified against files under `../skill`.
- Skill prefixes identified.
- `../skills` vs `../skill` mismatch recorded as a finding only.
- No skill executed.
- No runtime repo modified.
- No commit or push performed.

