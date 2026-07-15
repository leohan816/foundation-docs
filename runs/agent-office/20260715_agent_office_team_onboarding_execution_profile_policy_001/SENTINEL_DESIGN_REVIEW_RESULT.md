# Sentinel Design Review Result — Team Onboarding and Execution Profile Policy

Review pass: `DESIGN_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: `Agent Office Reviewer` / independent Sentinel

Session: `agent-office-reviewer`

Live model / effort: `gpt-5.6-sol` / `max`

Return to: `agent-office-advisor`

This is an independent pre-implementation design review. It is not an
implementation review, candidate patch, risk acceptance, final approval,
dispatch, activation, or authority to begin implementation.

## 1. Blocking findings

### P1 — The nineteen-path allowlist cannot satisfy its own required typecheck

The candidate makes `registrationState`, `dispatchRelevant`, and
`executionCapabilities` required fields of every `OrganizationRegistryRow`
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:90-104` and
`24e5bc1:docs/architecture/AGENT_OFFICE_TEAM_ONBOARDING_EXECUTION_PROFILE_DESIGN.md:148-153`).
WU-02 authorizes updates to the type, production registry, index, and one
registry contract test only
(`24e5bc1:docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md:47-77,141-188`).

Two existing typed test consumers outside that allowlist construct complete
`OrganizationRegistryRow` literals:

- `50124a1:tests/ui/actor-detail-drawer.test.tsx:54-75`; and
- `50124a1:tests/ui/actor-summary.test.tsx:48-69`.

Neither literal has the three new required fields. The repository typecheck
includes every `tests/**/*.ts` and `tests/**/*.tsx` file
(`50124a1:tsconfig.json:24-34`), while the plan requires `npm run typecheck`
and a clean closed-path assertion
(`24e5bc1:docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md:337-359`).
Implementing the required interface therefore makes the mandatory typecheck
fail. Making the fields optional or silently defaulting them would instead
violate the candidate's exact required-field, explicit lifecycle, no-role-
default, and fail-closed catalog rules.

Required patch: add the two exact UI test paths to WU-02 and the closed
allowlist, limit their change to explicit fixture values plus preservation
assertions, and update the path count/gates. If the Designer chooses a different
solution, it must demonstrate how both complete object literals typecheck and
remain accepted without optional fields, inference, or defaults.

### P2 — The onboarding planner is not total for states it promises to plan

`OnboardingReason` has only `INITIAL`, `PROTOCOL_STALE`, `MISUNDERSTANDING`,
`READ_SET_CHANGED`, `REGISTRATION_PENDING`, and `EVIDENCE_CONFLICT`
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:170-176`).
The readiness state machine and diagnostics also include `SUSPENDED`, missing or
conflicting responsible Advisor, route mismatch, invalid registry identity, and
other non-ready states
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:408-448`).
Pending and suspended dispatch-relevant rows are deliberately kept in the
required set, yet `planTeamOnboarding()` is required to return one handoff for
*each* required non-ready Actor
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:470-491`).
FVS-12 likewise groups a suspended Actor with states expected to produce exactly
one targeted handoff
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:673`).

That is not implementable as written:

- a suspended Actor has no valid handoff reason, and onboarding cannot cure the
  suspension because reactivation is a separate reviewed registry change
  (`24e5bc1:docs/architecture/AGENT_OFFICE_TEAM_ONBOARDING_EXECUTION_PROFILE_DESIGN.md:341-361`);
- when the responsible Advisor is missing/conflicting or subordinate routes do
  not resolve, no valid authority exists to author the promised handoff; and
- `ProtocolReadinessDiagnostic` is referenced but never defined. The prose says
  it contains a stable detail code, but supplies neither the exact interface nor
  the closed detail-code vocabulary
  (`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:399-405,426-451`).

An implementation must currently choose between emitting an invalid/mislabelled
handoff, violating the one-handoff rule, or inventing an unowned reason and
diagnostic contract.

Required patch: define the exact diagnostic and planner input/output schemas and
a total, deterministic mapping from every blocking diagnostic to either one
valid `OnboardingReason` or an explicit no-handoff authority/lifecycle result.
Align suspended and unresolved-authority behavior across §8, FVS-12, WU-03, and
the targeted tests. No handoff may be attributed to a missing or conflicting
Advisor.

### P3 — Retry and capability escalation lack a complete immutable attempt chain

The contract defines a selection record and outcome evidence
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:524-570`),
then requires a new retry “dispatch record” after the first operational failure
and a linked new selection after accepted capability insufficiency
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:605-622`).
WU-04 requires `planOperationalRetry` and `selectCapabilityEscalation`
(`24e5bc1:docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md:266-298`).

No retry-dispatch schema exists. `DispatchOutcomeEvidenceV1` identifies a
selection but has no dispatch-attempt ID or attempt number, so two operational
failure records cannot be proven to represent the initial attempt and its one
permitted retry rather than duplicate reports or two initial-attempt events.
There is also no immutable retry record or prior-attempt input with which
repeated calls to `planOperationalRetry` can enforce one emission.

The escalation chain is also incomplete. A new selection has
`supersedesSelectionId`, but no field binding the exact accepted
`CAPABILITY_INSUFFICIENT` outcome that authorized exclusion. The rule says the
next profile must already exist in the “same Actor catalog,” but does not require
the escalation to use the original selection's `registryCommit`, an exact
catalog hash, or another immutable catalog snapshot. A profile introduced after
the failed selection can therefore be indistinguishable from one that was
already declared, contrary to FVS-09
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:670`).

Required patch: define exact outcome validation/deduplication plus an immutable
retry-attempt record containing an attempt identity, original selection/profile,
triggering outcome evidence, and the one-retry cardinality rule. Bind every
capability escalation to the exact accepted outcome evidence and to the exact
original catalog (for example, unchanged registry commit plus validated row, or
an explicit catalog hash). Define total function inputs/outputs and adversarial
tests for replay, conflicting outcomes, repeated planning, and post-selection
catalog changes.

### P4 — Reviewer independence is caller-disableable

`DispatchCapabilityRequirementV1` lets the requester set
`reviewerIndependence.required` to any boolean and supply the reviewed Actor list
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:493-512`).
All role, Actor/session separation, Reviewer-understanding, and route checks are
conditional on that caller-controlled value being true
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:624-637`).
That conflicts with WU-04's unconditional statement that Reviewer selection
requires those checks
(`24e5bc1:docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md:277-298`)
and with the canonical Reviewer role, which performs independent review only
(`50124a1:docs/agent/roles/reviewer.md:5-8,21-24`).

Adversarially, a responsible Advisor can target a current-ready Reviewer with a
sufficient profile and submit
`{ required: false, reviewedRoleInstanceIds: [] }`. The §11 checks never run, so
the selector can emit a normal selection without proving separation from the
reviewed Actor. Even `{ required: true, reviewedRoleInstanceIds: [] }` makes the
per-reviewed-Actor comparisons vacuous. FVS-11's “only when” expected outcome is
therefore gameable
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:672`).

Required patch: make review dispatch an authoritative closed kind rather than an
optional caller waiver, or require every target whose registry role is
`REVIEWER` to carry and pass the independent-review contract. Define the source,
nonempty/cardinality rules, and exact completeness validation for reviewed Actor
IDs, reject false/empty bypasses, and add both cases to FVS-11 and WU-04 tests.

### P5 — `NONE` has contradictory literal-set and no-requirement semantics

Capability skills must be nonempty; `['NONE']` is the only no-skill
representation and cannot coexist with a real skill
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:94-104`).
The architecture repeats that `NONE` is the only no-skill *requirement*
(`24e5bc1:docs/architecture/AGENT_OFFICE_TEAM_ONBOARDING_EXECUTION_PROFILE_DESIGN.md:279-305`).
Selection, however, applies an ordinary required-skill subset test
(`24e5bc1:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:577-582`).

Under literal set semantics, a no-skill requirement `['NONE']` is not a subset
of a profile declaring `['/fable-sentinel']`; the profile cannot include both.
That treats “no skill required” as “the profile must be a NONE-only profile,”
even though the subset rule otherwise permits extra skills. The Worker must
invent either a special normalization or an exact-match policy, and the choice
changes lowest-sufficient selection.

Required patch: define one exact semantic rule. If `NONE` means the empty
requirement/capability set, normalize it explicitly before subset comparison. If
it means an exact no-skill execution configuration, say so and replace the
misleading subset/no-requirement language. Add positive and negative tests for
`NONE`, real-skill profiles, and mixed-token rejection.

## 2. Review-question disposition

| # | Handoff question | Independent result |
|---|---|---|
| 1 | One additive registry extension | `SATISFIED`: the design extends the existing `OrganizationRegistryRow`; it creates no second Actor, capability, or readiness truth. |
| 2 | Immutable identity/evidence joins | `SATISFIED`: `roleInstanceId` remains the sole evidence join and `actorId` remains routable identity. No baseline identity change is proposed. |
| 3 | Readiness, invalidation, staleness, reload, lifecycle, Team aggregation | `NEEDS_PATCH`: the evidence/currentness direction is fail-closed, but P2 leaves the planner and diagnostics non-total for suspended and unresolved-authority states. |
| 4 | Optional roles, multiple Workers, Advisor inclusion, required Actors | `SATISFIED_IN_PROJECTION`: actual rows form the required set, no absent role is synthesized, every relevant Worker remains distinct, and the Advisor is mandatory. P2 must correct handoff behavior for blocked states. |
| 5 | Capability selection, retry/escalation, self-override, Reviewer sufficiency | `NEEDS_PATCH`: Actor-local ranks and closed dimensions avoid name inference; P3-P5 leave retry/escalation provenance, Reviewer independence, and no-skill comparison incomplete or bypassable. Self-override rejection itself is explicit. |
| 6 | New-Actor lifecycle | `SATISFIED`: nomination grants nothing; reviewed pending registration, readiness, and reviewed activation remain separate, and pending cannot dispatch. |
| 7 | One-instruction entrypoint/project pointer | `SATISFIED_IN_DESIGN`: the entrypoint is structured and local; the central pointer contract requires no transport activation or cross-project edit. |
| 8 | FVS-01 through FVS-12 | `NEEDS_PATCH`: all twelve IDs are present and FVS-01..08/10 have sound core outcomes; FVS-09 lacks a closed evidence/catalog chain, FVS-11 is caller-bypassable, and FVS-12 contradicts the suspended lifecycle. |
| 9 | Nineteen-path plan | `NEEDS_PATCH`: P1 proves the allowlist cannot pass its required typecheck; P2-P3 require exact contract/test corrections before implementation. |
| 10 | Frozen external/live surfaces | `SATISFIED`: the candidate changes five documentation/evidence files only and keeps AS1, Slack, tmux delivery, secrets, external projects, runtime, and live rollout frozen. |

## 3. Frozen coordinates and direct provenance

### Review authority and independence

- Governance handoff commit:
  `862c7c2fdc97041703c9b204eda7dc5d68013208`
- Handoff SHA-256:
  `b4d32962e4d14e0825dfebc0f2c5ad89d1381bc0c1d1f3b58ebdc2b04bb4f72e`
- Required Sentinel skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Required skill references were read directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
- Live pane binding was read directly as
  `agent-office-reviewer|$28|@28|%28|2381134|/home/leo/Project/agent-office|codex|active|sync-off`.
- PID `2381362`, direct child of pane shell PID `2381134`, was launched as
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`.
- Advisor (`$26`), Designer (`$24`), Worker (`$16`), and Reviewer (`$28`) were
  distinct live sessions. No agent, sub-agent, delegated context, temporary
  session, or substitute Reviewer was created or used.

### Candidate proof

- Product base:
  `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- Design package:
  `d9a95cf101fca93f3c721e7d751bcd5d7a2c661a`
- Designer result:
  `53dc551def13d203f63224fb17f2e93e9a1c9d1c`
- Frozen candidate/pointer:
  `24e5bc1b52f617648742162376c07e747a2f31e0`
- Branch:
  `feature/team-onboarding-execution-profile-policy-001`
- Review-time HEAD/upstream: exact candidate / exact candidate, divergence
  `0 0`, clean worktree.
- Ancestry is linear: base -> package -> Designer result -> pointer. The merge
  base of base and candidate is the exact base.
- Base-to-candidate delta: exactly five added paths, 1,914 insertions, no
  deletion. The three product design files are unchanged between package and
  candidate.

Frozen candidate hashes:

- architecture:
  `2bc8c1baebe51e4c1ce8ae5dc49d02ae1bf69b39f4c3742c3ac8fdf608a82ba9`
- contract:
  `09b863c134c7125110bed9b726fdeb2f4b678f27adf0e06534ab773d69c06398`
- WorkUnit plan:
  `a2cc9587d4842468e21aab8234e35c63f0c39f8e340aa87b9f172f2497c160ef`
- Designer result:
  `01628532d629e7ac543357b6849a0720af232f4b0acd63a8df7b951d9a4c8504`
- Designer pointer:
  `7cda6c40d6a485ba339e0c60e2bd4224724cb11d467d8ac24f7cc9da9e5c28ae`

The actual five-file diff and all three product design documents were inspected
before the Designer result or pointer was read. The Designer hashes and commit
claims were then reproduced directly; summaries were not used as authority.

## 4. Proportionate checks

Reproduced:

1. exact base/candidate/package/result/pointer commits and parent chain;
2. clean candidate and governance entry states plus upstream equality;
3. exact five-path base-to-candidate diff and 1,914-insertion stat;
4. `git diff --check 50124a1..24e5bc1`: PASS;
5. no product-document delta after package commit: PASS;
6. SHA-256 checks for all five candidate files: PASS;
7. Markdown fence counts: architecture `6`, contract `30`, plan `10`; all even;
8. exact FVS table cardinality: twelve rows, `FVS-01` through `FVS-12`;
9. secret-shape scan for Slack tokens, common cloud keys, and private-key
   headers: no match; and
10. direct contract walk against baseline registry types/partitioning/evidence/
    projector/tests and the additional typed UI consumers exposed by the
    proposed required-field change.

Product tests, build, server, runtime, Living Office, AS1, Slack, browser/E2E,
and live/owner checks were not run. The candidate is documentation/evidence
only, and the handoff calls for contract walkthroughs and static checks unless
a candidate claim requires runtime execution. No test result from the Designer
summary is represented here as independently reproduced.

## 5. Verdict rationale and STOP

`NEEDS_PATCH` is required under the Sentinel review-classification contract.
P1-P5 are concrete design/contract/plan defects, but each is repairable by a
bounded documentation patch without changing the accepted one-registry,
immutable-identity, fail-closed, no-transport architecture. They are not
residual risks that this Reviewer can accept. At least P1-P4 independently make
implementation unsafe or impossible without policy invention.

Implementation must not begin from candidate
`24e5bc1b52f617648742162376c07e747a2f31e0`. The responsible Advisor should
route the exact bounded design corrections and return the frozen patched
candidate to this same Reviewer session for delta re-review. This Reviewer did
not patch the candidate, dispatch an Actor, accept risk, grant final approval,
select a next mission, or perform any live/owner action.

`RETURN_TO: agent-office-advisor`

`STOP`
