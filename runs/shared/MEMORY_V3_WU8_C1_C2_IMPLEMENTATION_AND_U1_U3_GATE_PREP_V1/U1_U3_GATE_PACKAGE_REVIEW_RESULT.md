# WU8 U1–U3 Gate Package — Independent Full Review Result

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-U1-U3-GATE-PACKAGE-REVIEW-001
REVIEW_PASS: FULL_GATE_PACKAGE_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: NEEDS_PATCH
BLOCKING-TO-PASS FINDINGS: GP-1 (single, document-only, one-sentence fix, Advisor-correctable)
ALL OTHER CRITERIA: VERIFIED
```

## 0. Live runtime, skill, independence, serialization (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window_id=@5 pane_id=%5`.
  **ACTUAL_MODEL: claude-fable-5** (live). **EFFORT: max** (live `CLAUDE_EFFORT=max`).
  SKILL: `/fable-sentinel`.
- Serialization: this is the re-dispatch of the same pinned review (same REVIEW_ID,
  same handoff commit `252ccd2`, same subject pin) after the earlier premature dispatch
  was cancelled with zero writes; Track A is complete (C1 PASS pushed as `ad172db`,
  C2 PASS `b8b61d7` now pushed as origin — both verified live), so the Manifest §3 order
  is satisfied. Sole active Reviewer dispatch.
- Independence: subject authored by `foundation-advisor` from Control evidence
  (`foundation-control`, Opus 4.8 (1M)/high per its §0); this session authored neither.
  Read-only for the subject; wrote only the two declared files; no stage/commit/push/
  dispatch; no agent/subagent; no DB/network/secret/migration/runtime/test execution.

## 1. Subject and evidence pins — reproduced exactly

| Pin | Claimed | Reproduced | Match |
|---|---|---|---|
| SUBJECT @`a30aa66` | blob `bdd7d175a7ba4791f4378f9554d511d8b5403b35`, SHA-256 `8c036ffa…67e3c3` | both recomputed identical (326 lines read in full) | ✓ |
| CONTROL_EVIDENCE @`1efef80` | `U1_U3_CONTROL_RESULT.md` | read in full (345 lines) at the pinned commit | ✓ |
| DESIGN @`08dc39d` | SHA-256 `2213262a…` | re-verified this mission | ✓ |
| FOUNDER_DECISION @`691a2d0` / MANIFEST @`006ef91` | — | read in full this mission at their pins | ✓ |

## 2. Criterion rulings (handoff REVIEW_CRITERIA)

**Factual accuracy — VERIFIED except GP-1.** Every load-bearing fact in the package is
letter-consistent with the pinned Control evidence and with this session's own direct
source reproductions at the same heads: the `ProvenanceVerdict` statuses/bindings and
UNCONFIGURED default (verifiers.py:15-42); the `ConsentVerdict` GRANTED-only continue and
nine-state fail-closed mapping (verifiers.py:46-70, validator.py:210-217); Cosmile as
consent authority with separate purposes and login≠consent; the local, append-only,
no-enqueue revocation path (commerceEvidenceService.ts:410-427); the snapshot-never-
current boundary; the one-process RLock zero-durability ledger (ledger.py:2,5,85); the
storage-framework absence with the `sqlite3`/`psycopg2` occurrences correctly explained
as `_core` boundary **denylists** (my own prior verification, accurately carried); the
Cosmile-Prisma-is-not-a-Foundation-decision boundary; and the correctly scoped
"commerce-evidence" absence claim in U1. The §1 meaning boundaries (unkeyed hash ≠
authenticity; snapshot ≠ current consent; ephemeral ledger ≠ durable backend) are exact.

**Per-gate completeness (record §11 lists) — VERIFIED.** U1, U2, and U3 each contain
verified facts, one exact unresolved question, exactly three concrete options, an
Advisor recommendation, implementation and security/privacy consequences, deferred
scope, and the exact `PATH_STATUS: UNRESOLVED / REQUIRED_OWNER / REQUIRED_DISCOVERY /
DEPENDENT_WORKUNITS: BLOCKED` block extended with `FAIL_CLOSED_DEFAULT` and
`DECISION_AUTHORITY`. U1 covers workload/service principal, environment, digest/
source-hash, idempotency-key, freshness/replay, custody/rotation/revocation/incident
implications, and owners. U2 covers the request/closed-verdict contract, all failure
states (MISMATCH covered by the "every other state fails closed" rule with the exact
landed mapping carried in the pinned Control evidence §U2.4), intake-time plus
every-later-transition verification, the snapshot-never-authority statement, and
privacy/Security/Legal/Cosmile/Founder owners. U3 covers the entities, transaction
boundary (matching design §6.1/§6.2 including the exact-true commit-guard re-read,
bounded serialization retry, and no external calls inside the transaction),
multi-process/restart/crash/replay/retention/cleanup/migration/rollback requirements,
tradeoffs, owners, and paths-only-when-verified.

**Option quality — VERIFIED.** 3/3/3 options, materially distinct, decision-ready, none
selected. The U1 option space is exactly the mechanism families already named in the
committed authority chain (mTLS / platform workload identity / signed token — traced by
Control to the reviewed decision package), with exemplary path-truth in U1-B ("depends on
an actual platform capability that is not yet verified") and a no-silent-fallback
instruction in the recommendation. U3 options are backend *classes* with honest
tradeoffs; U3-A is recommended as an architecture **direction** with explicit
non-selection of product/ORM/tool/path/topology. Recommendations are advisory
(the header states the package selects no option) — exactly the pattern the Founder
record's Track B requires.

**No invented paths — VERIFIED.** No repository path, technology, product, provider,
transport, protocol, adapter surface, or mechanism is invented anywhere; every
unresolved item carries the exact UNRESOLVED block with named owners and discovery.

**Blocked/unlocked WorkUnit accuracy — VERIFIED.** U1/U2 block F3, C3, X1; U3 blocks F1,
F2, F3, C3, X1 — letter-consistent with the reviewed design §14 dependency DAG (F1's
dependency names U3; F2 needs U3 + reviewed F1; F3 needs U1+U2+U3+F2; C3 needs U1/U2 +
C1/C2 + F3) and with Control §4. The "closure alone unlocks no executable WorkUnit"
statements (U1, U2) and the U3 closure sentence (supplies the backend allowlist; reviewed
WU8-F1 and a new exact handoff still required before F2) are exact and honest.

**PASS semantics and open gates — VERIFIED.** §7 states PASS = decision-ready package
quality only, explicitly not option selection/risk acceptance/gate closure/
implementation authority; U1/U2/U3 OPEN in header, §5, and §7; every excluded WorkUnit
and authority (F1/F2/F3/C3/X1, delivery, intake, durable backend, 1B, M3) is
NOT_AUTHORIZED; HARD_STOP ACTIVE.

## 3. Finding

**GP-1 [P5 counted-set drift in normative text · blocking-to-PASS · one-sentence fix].**
Subject `20_U1_U3_GATE_PACKAGE.md:205-207` (§4 "Required logical model") ↔ reviewed
design @`08dc39d` §5.7 ↔ Control evidence @`1efef80` §U3.2.
— Quoted value: "It must enforce unique service/source-event, service/evidence,
service/idempotency, **service/purchase-lineage-head**, service/predecessor-successor,
and service/root-tombstone identities."
— Defect: this six-item enumeration does not match the design's canonical six uniqueness
constraints (§5.7), which the same section's facts and question invoke by name ("six
uniqueness constraints"). The package's list **omits** the review-draft slot uniqueness
`(service, evidence_id, candidate_slot)` (design #5 — the constraint that prevents
duplicate candidate-draft slots per evidence) and **substitutes** the lineage-head
uniqueness `(service, purchase_item_ref)`, which the design carries as an additional
§5.3 entity constraint, not one of the §5.7 six. The pinned Control evidence enumerates
the entity constraints correctly (its §U3.2 includes the ReviewDraftV1 slot uniqueness);
the drift arose in the package's summarization.
— Failure scenario: the Founder/architecture owner treats §4's "must enforce" paragraph
as the U3 requirement checklist (it is the package's own normative summary), and the U3
backend decision or the later WU8-F1/F2 allowlist omits the draft-slot uniqueness —
allowing duplicate review-draft slots per evidence in the durable model, silently
weakening a reviewed invariant. The Founder record §11 explicitly requires "the six
reviewed uniqueness requirements" in this package, so the mis-enumeration is a factual-
accuracy defect at exactly the load-bearing spot.
— Required correction (document-only, by `foundation-advisor`, subject file only):
replace the enumeration with the design §5.7 six — `(service, source_event_id)` ·
`(service, evidence_id)` · `(service, idempotency_key)` ·
`(service, predecessor/target_evidence_id)` across correction and retraction ·
`(service, evidence_id, candidate_slot)` · `(service, root_evidence_id)` tombstone plus
the purchase-lineage replay block — optionally adding "plus the `LineageHeadV1`
`(service, purchase_item_ref)` head uniqueness (design §5.3)" as an explicitly
*additional* entity constraint. No other sentence, option, owner, dependency, or
authority line may change.
— Allowed subject path for the correction:
`advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/20_U1_U3_GATE_PACKAGE.md` only.

No other finding: I swept the package for further counted-set drift (entity list ✓ six
groups matching §5.1–5.6; transaction sequence ✓; option counts ✓; owner sets ✓;
blocked-WorkUnit sets ✓), option selection or risk-acceptance language (none), invented
paths (none), and authority expansion (none).

## 4. Excluded scope and honest limits

- This review validates package accuracy/completeness/decision-readiness only. It does
  not evaluate which option *should* be selected, does not close U1/U2/U3, and does not
  extend any prior verdict. Legal/Security/architecture substance remains with the named
  owners.
- Source facts were verified against the same pinned heads used throughout this mission
  (FOUNDATION `33570b9`, Cosmile `f26fa5c` and its two reviewed WU8 commits, control
  `c89b792`); Control's live-runtime self-declaration is record-checked from its
  committed artifact.
- Per the Founder record §9 and the handoff: the Advisor makes the bounded document-only
  correction (cycle 1 of maximum 2) and this same Reviewer/session reviews only the
  declared old-subject → new-subject delta.

## 5. Verdict rationale

The package is complete against every record §11 requirement, its facts reproduce
letter-exact against pinned source and the Control evidence, its options are genuinely
decision-ready with exemplary path-truth discipline, its dependency and authority maps
match the reviewed design's DAG exactly, and it selects nothing, closes nothing, and
invents nothing. The single defect is a determinate counted-set drift in the package's
own normative U3 requirement summary — precisely the class of defect a decision package
must not carry to its decision owners, explicitly required correct by the Founder record
("the six reviewed uniqueness requirements"), and fixable by one sentence within the
provisioned document-only correction loop. Under the verdict contract that is
`NEEDS_PATCH` (defect real, patchable inside approved scope, same-Reviewer delta ready);
`PASS` would forward a wrong requirement set to Leo/GPT/architecture; `PASS_WITH_RISK`
would misfile a correctable document defect as acceptable risk; `FAIL` has no basis —
no boundary, authority, or structural failure exists.

**This verdict selects no option, accepts no risk, and closes no gate. U1/U2/U3 remain
OPEN; all excluded WorkUnits and authorities remain NOT_AUTHORIZED; HARD STOP remains
per the Founder record.**

```text
VERDICT: NEEDS_PATCH
FINDINGS: GP-1 (subject :205-207 — six-identity enumeration ≠ design §5.7 six; omits
  (service,evidence_id,candidate_slot), substitutes lineage-head; one-sentence correction)
ALL_OTHER_CRITERIA: VERIFIED (facts · per-gate completeness · option quality · path truth ·
  blocked/unlocked accuracy · PASS semantics · open gates · exclusions)
SUBJECT: a30aa663ee978253ac4918bbda7e34856a35be04 (blob bdd7d175…, SHA-256 8c036ffa…)
CONTROL_EVIDENCE: 1efef80 (correct enumeration — drift is package-local)
CORRECTION: document-only by foundation-advisor, subject file only, cycle 1 of max 2;
  same-Reviewer delta-only re-review via the declared GATE_DELTA_1 paths
PRODUCT_OR_CONTROL_WRITE: ZERO · STAGE_COMMIT_PUSH: ZERO · DISPATCH/NEW_AGENT: ZERO
OPTION_SELECTED / RISK_ACCEPTED / GATE_CLOSED: NONE
U1_STATUS: OPEN · U2_STATUS: OPEN · U3_STATUS: OPEN
WU8_F1_F2_F3_C3_X1 / DELIVERY / INTAKE / DURABLE_BACKEND / FULL_PACKAGE_1B / M3: NOT_AUTHORIZED
ACTUAL_MODEL: claude-fable-5 (live) · EFFORT: max (live env) · SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
