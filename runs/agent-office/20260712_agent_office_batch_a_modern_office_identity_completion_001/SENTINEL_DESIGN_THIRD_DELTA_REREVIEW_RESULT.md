# Sentinel Third Design Delta Re-review — Agent Office Batch A

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_THIRD_DELTA`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel re-review

Session: same existing `foundation-reviewer-sol` session

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is a same-reviewer review of the complete combined documentation delta for
S1/S3/S4 and Advisor T1–T3. It is not implementation, implementation review,
risk acceptance, final approval, or permission to begin the Worker pass.

## 1. Exact candidate and evidence inspected

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Before: `77681d9ed5dae3567115082945508f8474308812`
- Intermediate: `a39634d`
- After: `5f8ffd102f8344c5b34e1d97f00cdca578871c3c`
- After/upstream at review: equal (`0 0`); target worktree clean.
- Exact combined delta: the same four documentation paths, `+106/-54`; no
  runtime, source, test, package, config, asset, baseline, script, or media path.
- `git diff --check 77681d9..5f8ffd1`: clean.

Reviewed directly:

1. the complete exact four-file combined diff, intermediate correction history,
   and all four after snapshots;
2. `SENTINEL_DESIGN_SECOND_DELTA_REREVIEW_RESULT.md` plus Advisor validations
   `21`, `22`, and `23`, without treating their closure claims as evidence;
3. current `src/domain/activity/index.ts`,
   `src/domain/state-machines/work-unit.ts`,
   `src/runtime/observation-coordinator.ts`,
   `src/application/spatial-office/authenticated-projection.ts`, and
   `src/ui/pixel/contracts.ts`;
4. every cited renderer, asset, fixture, test, baseline, script, result, and
   pointer path convention relevant to S4/T2; and
5. the inherited Office/auth/authority/security/transport/accessibility/fallback/
   Channy/rollback/no-Grok/excluded-session/Batch-boundary contracts.

No runtime test result is claimed as reproduced. The candidate is
documentation-only, so review evidence is the snapshot-fixed Git delta, actual
current source contracts, path inventory, and governing review references.

## 2. Closure verdicts

| Item | Verdict | Result |
|---|---|---|
| S1/T1 — evidence schema and total arbitration | `PARTIAL__BLOCKING` | Version, identity, artifact reference, validation, expiry, same-kind ordering, and runtime-state precedence were added. Duplicate-ID conflict handling and contradictory process-kind arbitration remain undefined, so conforming implementations can disagree. |
| S3 — one runtime work truth | `CLOSED` | RT remains the sole mission/WorkUnit/activity/operational source; B is limited to absent process/AI attestations; the full-outer rows, field sentinels, STALE handling, conflict reporting, and no-store-back rule are coherent. |
| R2 — non-elevating operational display | `CLOSED__PRESERVED` | The total `projectRequiredObservable(...).requiredObservableName` mapping still matches actual current source and does not elevate bare raw WorkUnit states. |
| S4/T2 — literal closed write scope | `PARTIAL__BLOCKING` | Assets, baselines, acceptance tests, script, Worker result, and pointer are now closed. The writable documentation class is still written as “the four Batch A documentation paths” rather than four literal paths in both canonical source-scope and WU-08. |
| T3 — historical/current rule separation | `CLOSED` | One prominent canonical rule is authoritative; older P1/P3/R3 statements are explicitly historical and marked superseded while remaining traceable. |
| Previously accepted boundaries | `NO_REGRESSION_FOUND` | No regression found in the enumerated product, security, authority, transport, accessibility, fallback, Channy, rollback, excluded-session/no-Grok, or Batch B–E boundaries. |

## 3. Blocking findings

### U1 — `sessionProcess` has no total contradictory-kind arbitration

Contract §2.3.1 selects one valid record **per same kind** by greatest
`effectiveFrom`, then `evidenceId`. Its exception then refers to “contradictory
kinds,” such as `process_detected` versus `process_absent`, inside that same-kind
selection rule. Records of contradictory kinds can never meet a same-kind
condition. Section 2.3.2 starts from an already-derived `P = sessionProcess` and
therefore does not resolve the missing cross-kind step.

Concrete valid input: one unexpired accepted `process_detected` record effective
at `12:00` and one unexpired accepted `process_absent` record effective at
`11:00`, for the same `roleInstanceId`. The design permits at least these
different implementations:

- select the newest process record overall and produce `AI_PROCESS_DETECTED`;
- treat co-present contradictory process kinds as conflict and produce
  `SESSION_PROCESS_UNKNOWN`; or
- select each kind first and then apply an unstated precedence.

The equal-time case is likewise not reached by the stated same-kind rule. Thus
the claimed total process/runtime arbitration is not total even though the
downstream `aiRuntimeState` table is total once `P` exists.

Required patch: define one explicit total arbitration across the selected
`process_offline`, `process_absent`, and `process_detected` records, including
missing, single-kind, multiple-kind with unequal effective times, multiple-kind
ties, expiry, and conflict-to-sentinel behavior. Place contradictory-kind logic
in that cross-kind rule rather than the same-kind selector.

### U2 — duplicate `evidenceId` with unequal content has no deterministic result

Section 2.3.1 says equality is `evidenceId` equality and duplicates collapse to
one. It does not require byte-/field-identical content for repeated IDs and does
not say what happens when the same `evidenceId` arrives with different `kind`,
`evidenceRef`, `effectiveFrom`, `value`, or other fields. Keeping first, keeping
last, or rejecting the ID all satisfy “collapse to one” but can produce
different facts and runtime states depending on input order.

Required patch: distinguish an identical replay from an ID collision. Define
identical repeated records as the idempotent replay case and specify a single
fail-closed disposition plus diagnostic for the same `evidenceId` with any
unequal contract field. The rule must be input-order independent.

### U3 — the documentation write class is still abbreviated

Application delta §9 and WorkUnit WU-08 both authorize “the four Batch A
documentation paths” rather than spelling out the four paths. `FEATURE_INDEX`
does enumerate the candidate set elsewhere, so this is narrow and readily
repairable, but the reviewed requirement is that **every writable** source,
asset, fixture, test, baseline, script, result, and pointer path be literal and
closed. A descriptive class is not a literal exact-path allowlist.

Required patch: replace that phrase in both write-scope locations with the four
literal repository-relative documentation paths already used by this candidate.
Keep the existing rule that anything else requires an Advisor amendment.

## 4. Closed items and regression check

S3 is now coherent against current source. `(RT)` owns mission, WorkUnit,
activity, and operational state; `(B)` cannot carry or override those facts;
registry-only and runtime/evidence-only rows fail closed; STALE/INVALID/MISSING/
UNVERIFIED normalize per field; and no changing value is stored back. No second
work-state truth remains.

R2 remains closed. `projectRequiredObservable` still gates activity through
compatibility/derivation and returns `UNKNOWN_OR_STALE` where raw states alone
cannot prove observable work. The exhaustive display table preserves that
non-elevation.

S4/T2 otherwise closes the former open classes: all eight existing code-native
assets are named, both baseline directories are literal, both acceptance test
paths replace the wildcard, `scripts/local-office-rehearsal.mjs` is fixed, and
the Worker result/pointer are absolute and exact. The conditional PWA set names
only three exact files and does not authorize an unnamed path.

T3 is clear: §14 begins with the canonical current rule and directs readers away
from explicitly superseded historical P1/P3/R3 prose. Review provenance remains
available without creating a competing active contract.

No regression was found in Office-first default behavior, reachable secondary
views, eager-shell isolation, auth, authority, security, transport,
accessibility, static/M1 fallback, Channy's non-operational boundary, rollback,
no-Grok/excluded-session rules, or the Batch B–E exclusion. The exact delta is
documentation-only and explicitly grants neither implementation nor final
approval.

## 5. Verdict rationale and routing

`NEEDS_PATCH` is required because U1 and U2 leave accepted evidence capable of
different valid projections, directly failing S1/T1's implementation-
determinism gate. U3 also leaves one requested literal-path class abbreviated.
These are design-contract defects, not residual implementation risks suitable
for `PASS_WITH_RISK`.

The patch can remain confined to the same four design documents and does not
require a new product or authority decision. Advisor should route a narrow
documentation correction and return its exact delta to this same Sentinel
session. Sentinel did not patch Agent Office and grants no implementation or
final approval.

`RETURN_TO: Advisor`

`STOP`
