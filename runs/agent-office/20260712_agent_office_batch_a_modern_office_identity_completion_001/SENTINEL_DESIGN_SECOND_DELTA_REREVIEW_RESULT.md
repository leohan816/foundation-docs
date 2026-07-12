# Sentinel Second Design Delta Re-review — Agent Office Batch A

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_SECOND_DELTA`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel re-review

Session: same existing `foundation-reviewer-sol` session

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is a same-reviewer delta re-review of R1–R4. It is not implementation,
implementation review, risk acceptance, final approval, or permission to begin
the Worker pass.

## 1. Exact delta and review evidence

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Before: `60a5a720ca52ffdc3805318b4c40a61d0199b4b1`
- After: `77681d9ed5dae3567115082945508f8474308812`
- After/upstream at review: equal (`0 0`)
- Exact delta: the same four documentation paths, `+108/-91`; no runtime,
  source, test, package, config, or media path.
- `git diff --check 60a5a72..77681d9`: clean.

Reviewed directly:

1. the complete exact four-file before/after diff and after snapshots;
2. `SENTINEL_DESIGN_DELTA_REREVIEW_RESULT.md` at result commit
   `d4a86ded3fe69d794259d405aad9e726ff4e54c1`;
3. `19_ADVISOR_SENTINEL_DELTA_REREVIEW_VALIDATION.md` and
   `20_ADVISOR_CONTROL_SECOND_PATCH_VALIDATION.md`;
4. the Control rework result/pointer at Foundation Docs commit
   `8a65e503bc31a4e84c15fe29cb96b018bf76e08a`;
5. every current source cited by the patch, including
   `src/domain/activity/index.ts`, `src/domain/state-machines/work-unit.ts`,
   `src/runtime/observation-coordinator.ts`,
   `src/application/spatial-office/authenticated-projection.ts`, and
   `src/ui/pixel/contracts.ts`;
6. the inherited integration/PWA/fallback design and the previously accepted
   Office, auth, authority, security, transport, accessibility, Channy, rollback,
   excluded-session/no-Grok, and Batch boundaries.

No runtime test result is claimed as reproduced because the reviewed delta is
documentation-only. Evidence is snapshot-fixed Git diff, source-contract,
reference, and closed-scope inspection.

## 2. R1–R4 delta verdicts

| Item | Delta verdict | Result |
|---|---|---|
| R1 — process/runtime sentinels and accepted evidence | `PARTIAL__BLOCKING` | `SESSION_PROCESS_UNKNOWN` correctly separates unknown from verified offline/no-process and attached metadata is removed as proof. The newly named evidence kinds still lack a closed accepted-record schema and deterministic precedence/conflict contract. |
| R2 — total non-elevating operational display | `CLOSED` | Display is now a total function of the existing `projectRequiredObservable` output; all 16 required observable names plus `UNKNOWN_OR_STALE` map exactly, and every current activity passes through existing compatibility/derivation. |
| R3 — ownership, join, provenance, no store-back | `REGRESSION` | The full-outer join and row-presence rules are now precise, but a second committed evidence store is made owner of mission/work/operational facts that the accepted runtime projection already owns; stale normalization also remains unspecified. |
| R4 — genuinely closed file proposal | `NOT_CLOSED` | Most paths are enumerated, but assets and baseline directories remain deferred to the handoff, a wildcard-pattern test path remains, and the Worker result path is abbreviated. |
| Previously accepted product/security boundaries | `NO_REGRESSION_FOUND_EXCEPT_R3_SINGLE_TRUTH` | Office-first, secondary views, eager-shell direction, auth, authority, security, transport, accessibility, fallback, Channy, rollback, no-Grok/excluded-session, and Batch B–E boundaries remain intact. The one-frame/one-truth input rule regressed under R3. |

## 3. Findings

### S1 / R1 — Named evidence kinds are not yet an implementable acceptance contract

The after contract correctly adds `SESSION_PROCESS_UNKNOWN` and reserves
`SESSION_OFFLINE`, `NO_AI_PROCESS`, and `AI_PROCESS_DETECTED` for distinct
evidence at
`77681d9:docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:39-55`.
It also removes attached metadata as readiness proof. Those corrections are
semantically sound.

However, the document introduces
`process_offline`, `process_absent`, `process_detected`,
`ai_identity_attestation`, `model_attestation`, `effort_attestation`, `ai_ready`,
and `ai_error` as new “accepted structured” kinds without defining the raw
accepted-evidence record type. The per-field output envelope at lines 87-91 is
`{ value, source, status, evidenceTimestamp }`; it does not define the input
record's `kind`, `roleInstanceId`, mission/WorkUnit correlation, source-event or
artifact reference, acceptance status, optional expiry, or validation rule.
None of those new kinds exists in current source; the patch proposes a new
`evidence.ts` file but leaves its contract to the Worker.

`AI_READY` also depends on the absence of work/wait/error facts while
`AI_WORKING`, `AI_WAITING`, and `AI_ERROR` can coexist as raw accepted inputs.
The design does not give deterministic precedence for those simultaneous facts,
nor say whether they are a conflict that yields `AI_RUNTIME_UNKNOWN`.

Failure scenario: two implementations can accept different record shapes and
choose different runtime states for `ai_ready + ai_error` or work + wait input,
while both conform to the prose. The exact positive values are named, but their
acceptance and arbitration remain invented during implementation.

Required patch: define one exact TypeScript-oriented accepted-evidence input
schema and validation/acceptance rules, including role/mission/WorkUnit
correlation, provenance/status, expiry/freshness, and deterministic precedence or
conflict-to-sentinel behavior for every process/runtime evidence combination.

### S2 / R2 — Closed against actual source

The after contract at lines 59-85 makes `operationalState` a total function of
`projectRequiredObservable(...).requiredObservableName`, not raw WorkUnit state.
The table covers every current `REQUIRED_OBSERVABLE_NAMES` member plus
`UNKNOWN_OR_STALE` and defaults every other value to `UNKNOWN`.

Direct current-source walk confirms:

- `DELIVERY -> DISPATCHING`;
- `READING -> READING`;
- `WORKING -> WORKING`;
- `TESTING -> TESTING`;
- `REVIEW -> REVIEWING`;
- `WRITING_RESULT -> WRITING_RESULT`;
- `BLOCKED -> BLOCKED`;
- `WAITING_LEO -> WAITING_LEO`;
- `RESULT_RETURN -> RETURNING_RESULT`;
- `RECOVERY -> UNKNOWN_OR_STALE`; and
- `IDLE` falls through to the raw-state derivation
  (`src/domain/activity/index.ts:58-90,153-205`).

Missing, incompatible, expired, or source-projector-unknown input reaches
`UNKNOWN`; bare `RUNNING`, `HOLD`, and `WAITING_ADVISOR` no longer create work,
blocked, or dependency meaning. R2 is closed with no progress elevation found.

### S3 / R3 — Second committed work-evidence truth conflicts with the accepted runtime source

The after contract lines 87-122 now correctly define field provenance,
projection-time ownership, an exact full outer join, registry-only/evidence-only
behavior, conflict-to-sentinel, and no store-back. The broken internal pointer is
also corrected.

But the patch creates two committed inputs under
`src/application/organization/` and makes input (B), “accepted-structured-evidence
records,” the source of changing `mission`, `workUnit`, and `operationalState`
(contract lines 92-100 and 114-122). The application design still says the
existing authenticated runtime projection and cue reducer are the **only** data
source and that `livingOffice` is derived from that same runtime projection
(`77681d9:docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:26-50`).

Current runtime already projects accepted WorkUnit state/activity/evidence into
`sceneRoles` (`src/runtime/observation-coordinator.ts:269-320`) and into the
authenticated spatial presentation. A separate committed B record for mission,
WorkUnit, activity, or operational state can diverge from that current accepted
projection. Calling the output “one frame” does not remove the second truth input.

The new `status` vocabulary includes `STALE` (contract line 90), but the changing
fact normalization at lines 95-101 and §2.6 names invalid/missing/conflicting or
`UNVERIFIED`; it never states the output for a `STALE` identity/model/effort/
process fact. “No time-only freshness inference” does not decide how an explicitly
stale status is handled.

Failure scenario: the current runtime says WorkUnit `REVIEW_PENDING` while the
committed B record still says `RUNNING`; the design does not choose the canonical
input because it assigns B ownership. Separately, a stale model attestation can
remain visible or normalize to `MODEL_UNKNOWN` depending on Worker judgment.

Required patch: keep current mission/WorkUnit/activity/operational facts owned by
the existing accepted runtime projection/cue reducer. Limit the committed local
evidence input to facts genuinely absent from that source (for example explicit
process/model/effort attestations), or define a non-duplicating adapter into the
same runtime projection. Specify `STALE` normalization for every field. Preserve
the now-correct full-outer row behavior and no-store-back rule without a second
work-state truth store.

### S4 / R4 — The canonical file proposal still permits unnamed classes

The after application design lines 140-153 and WorkUnit plan line 5 remove the
former top-level globs and enumerate most source/test/script paths. The
conditional PWA set is exact and any entirely unlisted path is said to require an
Advisor amendment.

The list nevertheless remains open in the exact ways the handoff requires this
review to challenge:

- application design line 146 and WorkUnit line 61 permit original asset files
  “named by the handoff” without enumerating those canonical paths;
- application design line 150 permits “new living-pixel baseline directories
  only” without naming the exact directories;
- WorkUnit line 34 still uses
  `tests/acceptance/production-*-boundary.test.ts` despite the document's no-glob
  claim;
- WorkUnit line 89 abbreviates the Worker result path as
  `20260712_.../WORKER_RESULT.md`.

The exact handoff could therefore authorize an asset or baseline path that is not
enumerated in canonical design without first returning for a design-scope
amendment. That fails the explicit R4 question even if the later handoff itself
is exact.

Required patch: name every permitted asset file and every new baseline directory
in the canonical design, replace the acceptance wildcard with the two exact test
paths already listed in the application design, and use the exact Worker result
and pointer paths. Any remaining unnamed class must return to Advisor for a
design/handoff amendment before edit.

## 4. Required-question coverage

| # | Question | Answer |
|---|---|---|
| 1 | R1 unknown distinction and implementable positive evidence | `NO` — unknown/offline distinction is closed; accepted input/arbitration contract remains open (S1). |
| 2 | R2 complete non-elevating current-projector function | `YES` — S2. |
| 3 | R3 ownership/full-outer/provenance/conflict/no-store-back | `NO` — join mechanics close, but duplicated work truth and stale handling remain (S3). |
| 4 | R4 genuinely closed file proposal | `NO` — assets, baselines, wildcard test, and abbreviated result path remain open (S4). |
| 5 | No regression in previously accepted boundaries | `NO REGRESSION` for the enumerated product/security boundaries; `REGRESSION` for the one-runtime-projection/one-truth rule under S3. |
| 6 | Documentation-only and no implementation/final approval authority | `YES` — exact delta is four docs only and grants neither. |

## 5. Conflicts, residual risk, exclusions, and verdict rationale

Conflicts: S1, S3, and S4. These are implementation semantics and file-authority
defects, not accepted residual risks. S2 is closed.

Excluded: implementation, runtime mutation, source/test/config/package/media
changes, server start, credentials, DB/schema/migration, remote/public/live,
transport/tmux input, protected branch/main, Batch B–E, risk acceptance, final
approval, and next-mission selection.

`NEEDS_PATCH` remains required under the V2 and delta-review contracts because
R1 is materially partial, R3 contains a patch-created regression, and R4 is not
closed. All appear correctable inside the same four documentation paths without
a new Founder product/authority decision, but candidate `77681d9` is not yet
implementation-deterministic.

Advisor should route another in-scope documentation patch and return the exact
delta to this same Sentinel session. Sentinel did not patch Agent Office and
grants no final approval.

`RETURN_TO: Advisor`

`STOP`
