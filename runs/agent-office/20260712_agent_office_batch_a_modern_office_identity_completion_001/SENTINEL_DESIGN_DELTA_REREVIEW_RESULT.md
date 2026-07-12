# Sentinel Design Delta Re-review — Agent Office Batch A

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DELTA`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel re-review

Session: same existing `foundation-reviewer-sol` session that issued P1–P4

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is a same-reviewer delta re-review of P1–P4. It is not implementation,
implementation review, risk acceptance, final approval, or authority to begin the
Worker pass.

## 1. Exact delta and evidence

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Before: `665b2514a0aa78e132556a746f044a16be58be9b`
- After: `60a5a720ca52ffdc3805318b4c40a61d0199b4b1`
- After/upstream at review: equal (`0 0`)
- Ancestry: before is an ancestor of after.
- Exact delta: the same four documentation paths, `+150/-96`; no runtime,
  source, test, package, config, or media path.
- `git diff --check 665b251..60a5a72`: clean.

Reviewed directly:

1. the complete exact four-file delta and all four after snapshots;
2. the prior Sentinel result at commit
   `bd5c2510de31f01b491e8a1e565da5ad52248455`;
3. Advisor validations `17_ADVISOR_SENTINEL_DESIGN_REVIEW_VALIDATION.md` and
   `18_ADVISOR_CONTROL_POST_SENTINEL_PATCH_VALIDATION.md`;
4. the amended Control result/pointer at Foundation Docs commit
   `b6118dab883bd435571ef06176d2e35d9f49cdc1`;
5. current `src/domain/activity/index.ts`,
   `src/domain/state-machines/work-unit.ts`, `src/ui/pixel/contracts.ts`,
   `src/runtime/observation-coordinator.ts`, and
   `src/application/spatial-office/authenticated-projection.ts`;
6. the inherited living-office integration/PWA/fallback plan and the canonical
   actor/release-train, role, auth, authority, security, and Batch boundaries
   already fixed by the original design review.

No runtime tests were represented as reproduced: this delta is documentation
only. The review used snapshot-fixed Git diff, source-contract, reference, and
scope inspection.

## 2. P1–P4 delta verdicts

| Item | Delta verdict | Result |
|---|---|---|
| P1 — exact fail-closed field vocabularies | `NOT_CLOSED` | The patch adds field-specific tokens, but still conflates unknown with proven offline and leaves `AI_READY` evidence contradictory/non-exact. |
| P2 — one owned operational display vocabulary and total mapping | `NOT_CLOSED` | The owner enum is now exact, but the mapping promotes states without accepted activity, conflicts with current source, and does not enumerate all valid activities. |
| P3 — per-field evidence and registry flow | `NOT_CLOSED` | The envelope/drawer/provenance pieces improved, but runtime facts are assigned to an immutable registry, and the declared join cannot produce its runtime-only case. |
| P4 — exact source scope and inherited integration matrix | `PARTIAL__BLOCKING` | The PWA/renderer failure matrix is closed; the changed-file proposal still contains broad globs and unnamed paths. |
| Previously satisfied sections/regressions | `NO_REGRESSION_FOUND` | Office-first, secondary views, eager-shell isolation direction, auth/authority/security/transport, symbolic/Channy, documentation-only scope, continuation authority, and Batch B–E exclusions remain preserved. |

## 3. Remaining findings

### R1 / P1 — Missing or unverified process evidence is falsely labelled offline

After snapshot
`60a5a72:docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:39-56`
defines `sessionProcess` as
`SESSION_OFFLINE | NO_AI_PROCESS | AI_PROCESS_DETECTED` and makes
`SESSION_OFFLINE` the fail-closed result for missing, malformed, or unverified
input. The application delta repeats that choice at lines 57-76.

`SESSION_OFFLINE` is a positive operational claim, not an unknown sentinel. A
missing/unverified observation does not prove that a registered session is
offline, just as it does not prove `NO_AI_PROCESS`. The re-review handoff
explicitly requires those cases to remain distinct.

The same section says attached state proves nothing (line 48) but defines
`AI_READY` using a “verified ready/attached signal” (line 49). It names no exact
accepted event/fact kind, compatibility rule, or source field for that signal.
Current `RuntimeActorObservation` exposes connection/freshness/evidence metadata,
not a ready/process fact (`src/runtime/observation-coordinator.ts:39-50`), and the
authenticated actor input likewise has no such field
(`src/application/spatial-office/authenticated-projection.ts:53-68`).

Failure scenario: an unavailable or unverified source visibly asserts
`SESSION_OFFLINE`; an implementer must then invent what an “attached signal” is
to emit `AI_READY`. Both violate the fail-closed/no-inference requirement.

Required patch:

- give `sessionProcess` a distinct unknown sentinel (for example an exact
  `SESSION_PROCESS_UNKNOWN` token);
- reserve `SESSION_OFFLINE`, `NO_AI_PROCESS`, and `AI_PROCESS_DETECTED` for their
  own named accepted structured evidence;
- name the exact accepted source/fact/cue and compatibility conditions for every
  non-sentinel runtime state; remove “attached” as proof unless it is a separately
  defined accepted structured fact that is not attached metadata inference.

### R2 / P2 — The mapping contradicts its own fallback and the current observable projector

After snapshot contract lines 58-84 correctly name the 14-value
`PixelOperationalState`, but the table directly maps:

- `DISPATCHED -> ROUTING / DISPATCH`;
- `RUNNING -> WORKING`;
- `RESULT_REPORTED -> RETURNING_RESULT`;
- `REVIEW_PENDING -> REVIEWING`;
- `WAITING_ADVISOR -> WAITING_DEPENDENCY`; and
- `HOLD -> BLOCKED`.

This conflicts with the sentence immediately above the table that says no
accepted cue defaults to `UNKNOWN`. Current source deliberately returns
`UNKNOWN_OR_STALE` for exactly `DISPATCHED`, `RUNNING`, `RESULT_REPORTED`,
`REVIEW_PENDING`, `WAITING_ADVISOR`, and `HOLD` when no compatible usable
activity exists (`src/domain/activity/index.ts:115-150,184-205`). It emits
task-signifying `DISPATCHING`, `WORKING`, `RETURNING_RESULT`, or `REVIEWING` only
through compatible accepted activity (`src/domain/activity/index.ts:58-113,153-181`).

The patch also provides only an example of activity refinement. It does not give
a total mapping for all current `ROLE_ACTIVITIES`, including `DELIVERY`,
`READING`, `WRITING_RESULT`, and `RECOVERY`. Mapping `WAITING_ADVISOR` to
`WAITING_DEPENDENCY` and `HOLD` to `BLOCKED` avoids progress elevation but still
asserts a false reason/state.

Failure scenario: a bare `RUNNING` snapshot with no accepted work activity is
displayed as `WORKING`, or a `HOLD` is displayed as a blocker. The UI thereby
creates operational meaning that the current source intentionally withholds.

Required patch: define the displayed value as a total function of the current
source projector result plus the compatible accepted activity/cue, not a
progress-elevating raw-state shortcut. Every WorkUnit state and every valid
activity must have an exact row. Missing, expired, stale, conflicting, or
semantically unmappable inputs must map to `UNKNOWN`.

### R3 / P3 — Static ownership and join direction cannot implement the runtime rules

After snapshot contract lines 86-115 now define the per-field envelope, exact
UPPER_SNAKE provenance, drawer order, and no-store-back rule. Those portions
close substantial parts of P3.

There is also a broken internal contract pointer: line 18 sends the fact-envelope
definition to §2.6, while the envelope is defined in §2.5.

The remaining owner/flow rules are inconsistent:

- lines 91-95 assign `sessionProcess` and `aiRuntimeState` to the committed static
  registry and forbid runtime overwrite;
- lines 48-54 require `aiRuntimeState` to change from accepted ready/work/wait/
  error runtime evidence;
- runtime/work ownership at lines 92-95 includes only `mission`, `workUnit`, and
  `operationalState`, so there is no mint/merge path by which an accepted work cue
  can produce `AI_WORKING` without rewriting an immutable registry fact;
- the flow uses a left join `registry ⟕ runtime`, yet line 95 specifies behavior
  for a runtime-only `roleInstanceId`; a registry-left join cannot produce that
  row.

The statement that the registry projection is derived from the runtime projection
at lines 108-115 also reverses the preceding mint order, where registry facts are
inputs joined into the runtime-derived frame.

Failure scenario: one implementation stores `AI_WORKING` in Git and cannot react
to accepted cues; another derives it at runtime and violates the stated registry
owner/no-overwrite rule. A runtime-only actor is either absent under the written
left join or visible as `UNASSIGNED` under the prose. Both implementations fit
part of the design.

Required patch: assign changing process/runtime-state facts to an exact
projection-time owner/source, while keeping stable identity/organization and
allowed-token metadata in the committed registry. State whether the join is
registry-left, runtime-left, or full/union, and make runtime-only/registry-only
behavior possible under that exact operation. Keep runtime/work facts out of the
static registry and preserve one final projected frame.

### R4 / P4 — Failure/PWA matrix closed; source proposal remains open-ended

After snapshot application delta lines 150 and 164-175 now carry the conditional
PWA/static-shell boundary and the inherited first-online/cached/offline, backend,
chunk, atlas/hash, semantic-parity, context-loss, teardown, static, and M1
fallback gates. This closes the missing scenario portion of P4 without expanding
auth, authority, network, or protected caching.

The source proposal is still not closed:

- application delta line 144 uses `src/ui/pixel/*`;
- line 151 authorizes `tests/` plus “named integration/recovery/ui specs” without
  naming them all;
- line 152 uses `scripts/ + docs`;
- WorkUnit plan line 38 uses a new module plus `fixtures/` without exact files;
- WorkUnit plan line 73 still uses `src/ui/*` and `tests/`;
- WorkUnit plan line 80 still uses `scripts/ + docs`.

This directly misses the prior requirement to replace broad globs with a closed
changed-file proposal. The sentence requiring an Advisor amendment cannot close
paths that the same plan already authorizes by wildcard.

Required patch: enumerate the exact proposed source, new-module, fixture, test,
script, documentation, and baseline paths per WorkUnit. Any unnamed path must
return to Advisor before editing. Keep the conditional PWA subset exact.

## 4. Re-review questions

| # | Required question | Answer |
|---|---|---|
| 1 | P1 semantically correct sentinels/evidence | `NO` — R1. |
| 2 | P2 exact owner and total non-elevating mapping | `NO` — owner enum is correct; mapping is not. R2. |
| 3 | P3 implementable envelope/ownership/join/drawer/test contract | `NO` — envelope, provenance, summary/drawer, and tests improved; owner/join flow remains contradictory. R3. |
| 4 | P4 exact bounded source and inherited gate matrix | `NO` — gate matrix is closed; source proposal remains wildcarded. R4. |
| 5 | Preserve prior sections/no new authority or Batch expansion | `YES` — no regression found outside the unresolved P1–P4 patch axes. |

## 5. Conflicts, residual risk, exclusions, and verdict rationale

Conflicts: R1–R4 above. Each is reproducible from the exact after snapshot and
current source. No unresolved item is classified as accepted residual risk:
each controls implementation semantics or file authority and must be fixed before
the Worker handoff.

Excluded: implementation, runtime mutation, source/test/config/package/media
changes, server start, credentials, DB/schema/migration, remote/public/live,
transport/tmux input, protected branch/main, Batch B–E, risk acceptance, final
approval, and next-mission selection.

`NEEDS_PATCH` remains the correct V2 verdict because every defect is patchable in
the same four design documents without a new Founder product or authority
decision, but at least one `NOT_CLOSED` item remains. Candidate `60a5a72` must not
open implementation. Advisor should route a second in-scope documentation patch
and return the exact new delta to this same Sentinel session.

Sentinel did not patch Agent Office and grants no final approval.

`RETURN_TO: Advisor`

`STOP`
