# Sentinel Design Delta Review Result — Team Onboarding and Execution Profile Policy

Review pass: `DESIGN_PATCH_01_DELTA_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: `Agent Office Reviewer` / independent Sentinel

Session: `agent-office-reviewer`

Live model / effort: `gpt-5.6-sol` / `max`

Return to: `agent-office-advisor`

This is a bounded delta review of the original P1-P5 findings against exact
product range `24e5bc1..7fbaec6`. It is not a new full design review,
implementation review, candidate patch, risk acceptance, final approval,
dispatch, activation, or implementation authorization.

## 1. Delta finding

### P2 — `NOT_CLOSED`: primary-diagnostic selection and suspension recovery are still non-total

The patch adds exact diagnostic and planner schemas, a closed code/detail table,
and explicit no-handoff dispositions. Those changes close the original missing-
schema and invalid-Advisor-attribution defects. Two implementation-blocking P2
cases remain.

#### P2-A — Same-precedence diagnostics can select different handoff reasons

The readiness precedence groups protocol commit, protocol version, Actor
contract, required files, check set, and rehearsal version into one precedence
tier
(`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:427-436`).
Every non-ready Actor must nevertheless have exactly one `primaryDiagnostic`.
The contract says it is chosen by the six broad precedence steps and §6.3
collision/decision rules, while explicitly saying secondary diagnostics do not
replace it by array order
(`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:504-510`).
Neither location supplies an intra-tier ordering.

That missing order changes the output contract. For one Actor whose evidence has
both a stale protocol commit and a mismatched file set, both diagnostics occupy
precedence step 5, but the resolution table maps them differently:

- `PROTOCOL_COMMIT_STALE` -> `HANDOFF_PLANNED / PROTOCOL_STALE`; and
- `FILES_READ_MISMATCH` -> `HANDOFF_PLANNED / READ_SET_CHANGED`

(`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:627-654`).
The planner emits one action per non-ready Actor based on the primary diagnostic
(`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:669-677`).
An implementation must therefore invent which handoff reason wins. Sorting the
diagnostic output cannot be inferred as the answer because the contract
expressly separates primary selection from array ordering.

Required patch: define one exact total order across every diagnostic/code-detail
pair that may coexist, or define an exact composite/action rule that yields one
reason independent of input order. Add permutation tests where at least two
same-tier diagnostics map to different reasons.

#### P2-B — `MANUAL_SUSPENSION` has no implementable recovery transition

`MANUAL_SUSPENSION` remains an accepted immutable not-ready reason, and the
contract states that a later successful targeted onboarding emits a new ready
record
(`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:353-383`).
The new mapping instead sends
`READINESS_INVALIDATED / INVALIDATED_MANUAL_SUSPENSION` to
`NO_HANDOFF_LIFECYCLE_BLOCKED / REVIEWED_REACTIVATION_REQUIRED`
(`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:651-654`).

No reactivation evidence schema or transition clears that immutable not-ready
decision. If the registry row is already `ACTIVE`, no registry reactivation
exists. If a reviewed change cycles it through `SUSPENDED -> ACTIVE`, lifecycle
is excluded from `actorContractHash`, so the same latest not-ready evidence is
still current and maps to no handoff again. The Actor cannot reach the targeted
onboarding that the contract says must mint the later ready record.

Required patch: define the exact authority artifact and state transition that
lifts a manual suspension and then lawfully permits one targeted onboarding
handoff, or define a different exact supersession rule. Align §6.2, the §8 table,
planner schemas, lifecycle prose, FVS-12, and WU-03 tests so manual suspension is
fail-closed but not permanently unrecoverable.

## 2. P1-P5 disposition

| Finding | Delta verdict | Direct result |
|---|---|---|
| P1 — closed implementation paths | `CLOSED` | The future allowlist is exactly 21 paths and now includes both typed UI consumers. WU-02 restricts them to explicit required fixture fields plus preservation assertions; optionality, defaults, inference, UI source edits, and nonempty catalogs remain forbidden (`7fbaec6:docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md:47-102,144-218`). |
| P2 — total diagnostics/onboarding planning | `NOT_CLOSED` | Exact schemas, no-handoff states, and invalid-Advisor blocking are present, but P2-A leaves primary selection non-deterministic and P2-B leaves manual suspension without a recovery transition. |
| P3 — immutable retry/escalation chain | `CLOSED` | Exact catalog snapshot, selection/profile refs, attempt and attempt-bound outcome schemas, lineage validation, collision/replay rules, one-retry cardinality, exact trigger binding, repeated supersession rejection, and original-catalog equality are specified (`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:739-822,913-1064`). FVS-09 and WU-04 cover the named adversarial cases. |
| P4 — non-bypassable Reviewer independence | `CLOSED` | The caller boolean is removed. Reviewer targets require `INDEPENDENT_REVIEW`, a handoff-pinned immutable assignment, nonempty complete subject/producer scope, resolved Actors, identity/session separation, Reviewer readiness, and sufficient capability; legacy true/false shapes reject (`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:681-727,849-869,1066-1092`). |
| P5 — `NONE` semantics | `CLOSED` | Exact `['NONE']` serializes the empty set, normalization precedes subset comparison on both sides, mixed arrays reject, and positive/negative test obligations agree across all three documents (`7fbaec6:docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md:90-125,841-847,1134-1138`). |

No separate regression, structural pivot, second Registry, identity-key change,
optional-role regression, new-Actor dispatch bypass, transport activation, AS1
change, or external-project expansion was found in the frozen delta. The two P2
cases are incomplete closure of the original finding, not a reason to reopen
previously passing axes.

## 3. Frozen coordinates and provenance

### Review authority and independence

- Exact committed delta handoff:
  `9b8973b45aade2c3746bae44a6e901c284c9ac6b`
- Handoff SHA-256:
  `41371c807d8318b618305c860f725dedb03dd7576f3f410ddaad6fe8a866aa97`
- Governance dispatch tip at review entry:
  `d782ae9c992dd4c146adc3c52cc8587f54db5d0e`
- Required Sentinel skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Required delta-review reference SHA-256:
  `31965d290395f16ca64939d1d755d587ed460ff828586538eafa58fa8de70749`
- Contract, provenance, and classification references were also read directly
  at their previously pinned hashes.
- Live pane binding was read directly as
  `agent-office-reviewer|$28|@28|%28|2381134|/home/leo/Project/agent-office|codex|active|sync-off`.
- PID `2381362`, direct child of pane shell PID `2381134`, was launched as
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`.
- Advisor (`$26`), Designer (`$24`), Worker (`$16`), and Reviewer (`$28`) were
  distinct live sessions. No agent, sub-agent, delegated context, temporary
  session, or substitute Reviewer was created or used.

### Product delta proof

- Delta base:
  `24e5bc1b52f617648742162376c07e747a2f31e0`
- Designer patch:
  `f7ae36100f13c715ef943a9a5e882c76a53cf7a8`
- Designer patch result:
  `4babefaf6ddf598e6b496304c9dd8a0f1b819475`
- Frozen candidate/pointer:
  `7fbaec6f593aff9422075e3c5f033bfbc0d7abaa`
- Branch:
  `feature/team-onboarding-execution-profile-policy-001`
- Review-time candidate HEAD/upstream: exact candidate / exact candidate,
  divergence `0 0`, clean worktree.
- The merge base of delta base and candidate is the exact delta base. The three
  commits are linear direct descendants.
- Base-to-candidate delta: exactly five paths, 1,046 insertions and 151
  deletions. The patch commit changes only the three canonical design documents;
  the next two commits add only Designer result and pointer.
- The canonical design documents do not change after patch commit `f7ae361`.

Frozen candidate hashes reproduced directly:

- architecture:
  `db577f780d30f99cbb3a0a677740d5f4851d075194d01408f59c669b98e88e2b`
- contract:
  `93870b52e0d1bb1e9d7fc313005d12dc1747df4ee4a053fb461c77024b86e465`
- WorkUnit plan:
  `f18b41f3f0b2c4d4353d54219b7a5326904abdaba7a0f32c17ef05f809120812`
- Designer patch result:
  `05aeeade1a2faeeefa6c636aa59333441fb12812fb2f3423fb4a8064df5b9fb4`
- Designer pointer:
  `9ffdb6ee7c692ee13216f17f7737e81caa9c689b511a5c2db1d13cce9352fe7f`

The actual three-document delta was inspected before the Designer patch result,
pointer, or Advisor patch-validation summary. Those later claims were then
checked against the frozen files and commits. The Designer reports P2 as total;
P2-A and P2-B above are direct reported-state versus actual-contract
disagreements.

## 4. Proportionate checks

Reproduced:

1. exact commit parents, ancestry, branch, clean state, and upstream equality;
2. exact five-path delta and three-path patch-commit scope;
3. `git diff --check 24e5bc1..7fbaec6`: PASS;
4. all five candidate SHA-256 values: PASS;
5. Markdown fences: architecture `6`, contract `36`, plan `12`; all even;
6. exact 21-path future implementation allowlist: PASS;
7. exact 24-row diagnostic/detail resolution table: present;
8. exact twelve FVS rows: present;
9. legacy `reviewerIndependence.required` appears only in explicit rejection
   prose; the old interface shape is absent;
10. secret-shape scan for Slack tokens, common cloud keys, and private-key
    headers: no match; and
11. adversarial P1-P5 contract walkthroughs, including same-tier diagnostic
    coexistence and manual-suspension recovery.

Product tests, lint, typecheck, build, server, runtime, Living Office, AS1,
Slack, browser/E2E, owner, and live-system checks were not run. The frozen delta
is documentation/evidence only, and the exact handoff requires proportionate
static/path/hash/contract checks rather than broad suites. No Designer-reported
test or runtime result is represented as independently reproduced.

## 5. Verdict rationale and STOP

`NEEDS_PATCH` is required because one original finding remains `NOT_CLOSED`.
P2-A and P2-B are bounded documentation-level corrections; they do not require
a new Registry, identity model, authority decision, implementation, transport,
or scope expansion. They nevertheless force a Worker to invent a primary-
diagnostic winner and a manual-suspension recovery protocol, so a clean `PASS`
would violate the delta-review and implementation-readiness contracts.

Implementation must not begin from candidate
`7fbaec6f593aff9422075e3c5f033bfbc0d7abaa`. The responsible Advisor should
route only the bounded P2 correction and return the frozen patch to this same
Reviewer session for another narrow delta review. This Reviewer did not patch
the candidate, dispatch an Actor, accept risk, grant final approval, select a
next mission, or perform a live/owner action.

`RETURN_TO: agent-office-advisor`

`STOP`
