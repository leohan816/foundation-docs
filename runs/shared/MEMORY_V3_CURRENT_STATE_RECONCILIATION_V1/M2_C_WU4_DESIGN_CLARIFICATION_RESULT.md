# Memory V3 M2 C WU4 — bounded design clarification result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-DESIGN-CLARIFICATION-001
ROLE: Foundation Designer
ROLE_MODE: BOUNDED_IMPLEMENTATION_DESIGN_CLARIFICATION
ACTOR_ID: foundation-designer
SESSION: foundation-designer
WINDOW_PANE: @29 / %29
ACTUAL_CWD: /home/leo/Project/FOUNDATION
ACTUAL_MODEL_EFFORT: gpt-5.6-sol / high
RESPONSIBLE_ADVISOR: foundation-advisor
REQUIRED_SKILL_APPLIED: /fable-builder
RESULT_STATUS: READY_FOR_DELTA_DESIGN_REVIEW
IMPLEMENTATION_AUTHORITY: NONE
STOP_AFTER_RETURN: true
```

## Outcome

The reviewed implementation-ready design now closes the six WU4-only ambiguities
without changing Founder policy, the v1 envelope, 18 reason codes, hash/idempotency
algorithms, gates 0–11, landed WU3 behavior, WorkUnit order, or WU8 HARD STOP.
Foundation product files remained read-only and no test was run.

The patched design SHA-256 is:

```text
3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66
```

## Exact clarification delta

1. Both immutable review-only DTOs and their content-hash projection use exactly
   `foundation.commerce_evidence_candidate.v1`. It is explicitly an existing DTO/hash
   version marker, not product, transport, storage, retention, or runtime policy.
2. Section 10.1 now lists every DTO field, Python type/nullability, literal/enum, ID
   regex, and invariant. `contract_version` is a required DTO field.
   `retention_expires_at` is a required UTC millisecond `str` equal to validated
   `occurred_at + timedelta(days=90)`; no datetime/epoch/current-retention enum or
   adverse-hold sentinel is permitted. Skin/other constructs no DTO.
3. Section 10.5 fixes a two-phase pure WU4 API:
   `plan_candidate_drafts_v1` precomputes validation-bound seeds, IDs, hashes,
   expiry, slot order, lifecycle, and read-only current-gate evidence;
   `adopt_candidate_drafts_v1` only binds WU3-issued decision/lineage references.
   Outcome precedes adverse; mapping is 0/1/2; correction maps corrected axes and
   supersedes; retraction is zero-draft revocation; all unexpected failures collapse
   to category-only `cannot_determine` with zero plan state.
4. The WU5 adoption sequence is exact without changing WU3. Fallible WU4 work is
   attempted before `EphemeralLedger.submit`, but its failure does not mask gate 9:
   WU5 submits empty slots with a hard-false guard so unchanged WU3 can still return
   exact replay/collision or the gate-10 lineage result, while an unseen committable
   event fails gate 11 with zero state. WU3 persists no candidate ID/evidence/hash/
   content; only its first `accepted` result binds DTOs. An unexpected post-ledger
   failure poisons the service-health latch and blocks the instance without clearing
   unrelated prior ledger state.
5. The current shared-memory gate receives only the exact seven-key temporary policy
   projection plus same-subject/empty-state contexts. It receives no `furef_v2`,
   `retention_policy`, product/SKU/IDs, stored gate decision, or write target.
   Outcome must return `allow/[allow_shadow_write]` as read-only evidence; usage-
   safety adverse must return
   `block/[high_sensitivity_reconfirmation_required]` while its separate human-
   review DTO remains eligible for adoption. Neither result authorizes a write.
6. Section 13.4 gives fourteen exact WU4 test oracles and explicit STOP conditions.
   The future Worker boundary is only `candidates.py` plus one dedicated mapping
   test; WU3, service/audit/flags, product stores, runtime, delivery, and WU5–WU8 are
   excluded.

## Advisor follow-up risk resolutions

### R1 — WU4 preparation failure versus exact replay

The risk was valid: returning immediately when a newly invoked candidate-ID factory
or read-only current-gate check fails could convert a previously committed exact
replay into `cannot_determine`. Those operations are gate-11 candidate-effect
preparation, not reviewed current gates 0–8, so they must not precede gate 9 as a
terminal outcome.

The corrected sequence uses WU3 itself as the unchanged replay authority. When the
WU4 plan fails, WU5 still calls `EphemeralLedger.submit` with `requested_slots=()`
and a side-effect-free `commit_guard` returning literal `False`. WU3 checks exact
replay/collision before slot validation and checks lineage before the guard. Thus:

- exact replay returns the original decision/lineage/current eligibility and adopts
  zero new drafts even if the retry's WU4 factory/gate work failed;
- collision remains `duplicate_evidence`;
- gate-10 lineage failure keeps its reviewed reason;
- only unseen lineage-valid evidence reaches the hard-false gate 11 and returns
  `cannot_determine` with zero WU3 state.

This preserves gates 0–11 and requires no replay-probe API, WU3 edit, or new policy.

### R2 — unrelated evidence erasure after post-ledger failure

The risk was also valid: clearing the entire WU3 epoch would erase unrelated prior
accepted ephemeral receipts, slots, lineages, tombstones, and eligibility. That
behavior is removed.

WU5 instead owns one preallocated category-only boolean health latch. After an
unexpected post-accepted bind/assembly failure, it discards only the current call's
unadopted DTO tuple, flips the latch false under the outer lock, returns
`cannot_determine`, and never calls `ledger.clear()`. Existing WU3 state remains
unchanged but the poisoned service instance fails every later call before WU3. Only
an explicit fresh in-memory instance/process restart recovers, at which point all
RAM-only state naturally disappears together. The latch stores no producer/customer
value and adds no WU3, durable-storage, or product-policy authority.

The two visible duplicate lines were also removed: the redundant global
`lineage_pointer` regex line and the repeated adverse-review bullet. Exact lineage
pointer validation remains in both DTO field contracts and the adopter boundary.

## Contract-to-code delta map

| Design closure | Future WU4 surface | Evidence required before Advisor gate |
|---|---|---|
| exact literal and full DTOs | `commerce_evidence/candidates.py` | field/annotation/literal/invalid-construction matrix |
| fixed hash and UTC expiry | same pure module | two-slot goldens, null-axis independence, calendar boundaries |
| deterministic 0/1/2 plan | same pure module | slot/order/factory/lifecycle/fail-closed matrix |
| accepted-only binding | same pure module; WU5 consumes later | replay-preserving failed-plan path, accepted/reject/collision adoption oracles |
| current-gate read-only projection | same pure module | spy exact-shape/result tests and no-writer AST proof |
| post-ledger containment | future WU5 health latch only | no-clear snapshot preservation and poisoned-instance fail-closed oracle |
| scope containment | one dedicated candidate test | exactly two future WU4 product paths; forbidden-import/call scan |

## Direct evidence and limitations

Verified before writing:

- live actor/session/window/pane/cwd/model/effort matched the dispatch;
- foundation-docs branch was
  `advisor/foundation-team-role-alignment-20260714` at exact dispatch HEAD
  `590a72220229169513c3b50eb035d8d706c8a6b1`;
- committed launcher blob/SHA matched
  `09c6dcde4e239bd069ec2ba255c85f2a8d64c8e9` /
  `f53e71a1ebcb632311bcde8e90dbc0b56b1065abe954af217103e3dca7f1c626`;
- design baseline `9ba521e6f34d0f35fcf29009c560873fbced3f13` was an ancestor;
- Foundation remained on `shadow/foundation-shared-memory-v0` at
  `de63c8fedaa27e470e44359cad1c2940bdc0a866`, with only its two pre-existing
  untracked documentation files;
- current WU1–WU3 contract, validator, lineage, ledger, tests, and Advisor gates were
  read directly; no product file was changed.

Proved by this artifact: the design has no blank WU4 literal/type/mapping/projection/
adoption/test boundary and needs no new Founder decision. Not proved or performed:
implementation correctness, test pass, independent delta review, WU4 Advisor gate,
service orchestration, persistence, transport, intake, candidate runtime, or
activation.

```text
PRODUCT_FILE_WRITE: ZERO
PRODUCT_TEST_EXECUTION: ZERO
DB_SECRET_ENV_NETWORK_PROVIDER: ZERO
STAGE_COMMIT_PUSH: ZERO
NEW_AGENT_OR_SUBAGENT: ZERO
NEXT: independent WU4 delta design review through foundation-advisor
RETURN_TO: foundation-advisor
STOP
```
