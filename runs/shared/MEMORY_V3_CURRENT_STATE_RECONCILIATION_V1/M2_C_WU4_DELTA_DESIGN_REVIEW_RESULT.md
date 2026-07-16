# M2 C WU4 — Independent Delta Design Review Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-DELTA-DESIGN-REVIEW-001
REVIEW_ID: M2-C-WU4-DELTA-DESIGN-REVIEW-001
REVIEW_PASS: DESIGN_REVIEW (bounded delta re-review of the WU4 clarification)
ROLE: Independent Foundation Reviewer (Sentinel)
ROLE_MODE: DELTA_DESIGN_REVIEW
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: PASS
```

## 0. Live runtime, model, independence (verified this pass)

- tmux (live query): `session=foundation-reviewer-fable5 window=@5 pane=%5` — matches the
  handoff TARGET_SESSION and is the same Reviewer actor/session as the original design
  review, exactly as authorization `c96caefe` requires ("the same independent Reviewer
  performs delta-only re-review").
- **ACTUAL_MODEL: claude-fable-5 (live)** · **EFFORT: max** (set for this session) ·
  workspace `/home/leo/Project/FOUNDATION` · SKILL: `/fable-sentinel` with the
  delta-review and review-classification references applied. Recorded from the live
  runtime, not inferred from the session name.
- Independence: this session authored none of the reviewed delta. The subject was authored
  by `foundation-designer` (launcher 76: `gpt-5.6-sol`/high, `/fable-builder`); the WU1–WU3
  product code was authored by the Foundation Worker. Read-only review; no patch, no
  dispatch, no product/control write; this Reviewer writes only the two declared
  result/pointer files and does not stage, commit, or push.

## 1. Subject, provenance, and zero-write verification

- foundation-docs worktree
  `/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714`
  is on `advisor/foundation-team-role-alignment-20260714` at `8347cbd9…`, clean.
  `SUBJECT_BASE 590a7222…` and `SUBJECT_HEAD 9549638…` are commits; head is an ancestor of
  the branch head; `base..head` is exactly one commit ("design(memory-v3): close WU4
  candidate boundary"); `git diff --name-status base head` is exactly the four declared
  paths (+486/−55), nothing else.
- Pointer hashes recomputed from the committed blobs: patched design =
  `3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66` (equals the design
  pointer `RESULT_SHA256` and the clarification pointer `PATCHED_DESIGN_SHA256`);
  clarification result =
  `f8590724ff3c68ab7522ab9aac4de504ed156c664136f7085049f693d3fe197b` (equals its pointer).
- Dispatch conformance: every design hunk falls inside the 75-handoff section allowlist
  {10, 12, 13, 16, 17, 18}; the design pointer moved to `READY_FOR_DELTA_DESIGN_REVIEW`
  with the new SHA as instructed; the clarification's own evidence claims re-verified
  exactly (launcher blob `09c6dcde…`, SHA-256 `f53e71a1…` at base — both match).
- Foundation product repository: `shadow/foundation-shared-memory-v0` at
  `de63c8fedaa27e470e44359cad1c2940bdc0a866` = TARGET_HEAD = WU3_FINAL_HEAD; porcelain
  shows only the two pre-existing untracked documentation files. **Zero Foundation product
  change in this delta.** No product test was executed by this review (design-only delta;
  all code checks were static reads of the already gate-passed WU1–WU3 code).

## 2. Sources read directly (no execution from memory)

Handoff `77_…` at the committed branch; Agent Office `TEAM_OPERATING_MODEL.md` and
`roles/reviewer.md`; FOUNDATION `AGENTS.md`/`CLAUDE.md`; Founder authorization
`58_…` @ `c96caefe`; original reviewed design @ `7cbcb8d9` (byte-equal to the base state
of the patched file); original design review PASS @ `920359eb`; WU3 Advisor gate `74_…`
@ `9ba521e6`; WU4 dispatch `75_…`/`76_…` @ `590a7222`; the subject before/after and the
exact path-filtered diff; both pointers @ `9549638`. Foundation code read-only @
`de63c8f`: `foundation/shared_memory/gate.py`, `contract.py`, and
`commerce_evidence/{ledger,reason_codes,contract,validator}.py`.

## 3. Mandatory delta questions — verdicts

All nine questions CLOSED. Line references are to the patched design at `9549638`
(`M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md`) and to Foundation code at `de63c8f`.

1. **Contract literal / DTO exactness / hash / expiry / factories / lifecycle / slot
   order, no new policy — CLOSED.** `CANDIDATE_CONTRACT_VERSION =
   "foundation.commerce_evidence_candidate.v1"` (design:706) with explicit
   no-product-policy scope (design:713–716); both DTO tables fix every field, Python
   type, nullability, literal, and ID regex (§10.1); the hash projection is the exact
   eight-key JSON with per-slot explicit nulls; `retention_expires_at` is the `.sssZ`
   UTC-millisecond string equal to validated `occurred_at + timedelta(days=90)` — exactly
   true against WU2, which admits only `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$`
   (contract.py:57–58; validator.py `_parse_ts` applies the regex before `strptime`).
   WU3 allocates decision/root-lineage IDs on the first committed writer exactly as
   stated (ledger.py:229–237, `_DEC_RE`/`_LIN_RE` ledger.py:24–25); slot order matches
   `_SLOT_CATEGORIES = ("outcome", "adverse")` (ledger.py:26). The adverse DTO is
   reachable: WU2 gate 8 requires `feedback_non_adverse_90d` for `usage_safety` and
   blocks skin/other (`privacy_scope_exceeded`) while UNCONFIGURED (validator.py:277–290,
   contract.py:24–25), so the planner's single accepted retention class is exactly right.
2. **Planner/adopter pure and bounded — CLOSED.** §10.5 defines two pure functions with
   no ledger/service/store references; the Worker boundary is `candidates.py` plus one
   dedicated test (design:1243–1245, WU row 4 design:1406); oracle 14 requires AST proof
   of no forbidden import/call. The default `current_gate=gate_decision` is the already
   review-approved read-only policy projection; `gate.py` imports only `contract` and
   `reason_codes` — no store.
3. **Replay-preserving failed-plan path — CLOSED, verified against the landed WU3
   code.** In `EphemeralLedger._submit_locked`: gate 9 replay/collision (ledger.py:161–173)
   runs before lineage (175–196), slot validation (198–207), and the guard (209–215).
   Exact replay returns the stored decision/lineage IDs with **current** lineage
   eligibility (167–170); collision returns `duplicate_evidence` (171–173). An empty
   `requested_slots` tuple passes slot validation for every event type (the loop body
   never runs; the retraction-contradiction check requires `len > 0`), and a guard
   returning literal `False` yields `_reject("cannot_determine")` before any COW build —
   zero receipt/slot/lineage state. A failed-plan retraction fallback therefore also
   cannot tombstone. The sequence requires no WU3 edit, and none occurred.
4. **Poison latch — CLOSED (WU5-owned, modeled only).** §10.5 step 6 + design:1024–1031:
   discard only the current call's unadopted tuple, flip the preallocated boolean under
   the outer lock, return `cannot_determine`, never call `ledger.clear()`, delete or
   mutate nothing prior; later calls fail before WU3; recovery only by an explicit fresh
   in-memory instance/restart. `cannot_determine` is the existing guarded fallback
   literal (reason_codes.py:36–38), so no new reason code, durability, recovery,
   product-policy, or activation authority is created.
5. **WU4/WU5 boundary — CLOSED.** §13.4 closing paragraph: WU5 owns orchestration and
   the outer-lock / replay-preserving blocked-submit / poison-latch behavior; WU4 tests
   may model that contract but must not implement `service.py`; §10.5 is titled as the
   WU4-plan/WU5-adoption boundary; WU rows 4 and 5 keep the module split.
6. **Fourteen oracles + STOPs sufficient and consistent — CLOSED.** Oracles 1–14
   (design:1247–1290) cover positive and adjacent-negative construction, slot order,
   golden hashes with null-axis independence, calendar-boundary expiry, lifecycle,
   skin/other guard including the satisfaction+skin/other combination, factory
   order/failure collapse, the exact §10.3 spy-gate contract, replay preservation under
   forced factory/gate failure (empirically satisfiable per Q3), accepted-only adoption,
   post-accepted containment with byte-equal unrelated WU3 state, no producer echo, and
   AST containment. The required current-gate pairs are the landed gate's actual outputs:
   the outcome projection reaches rule 7 → `allow`/`["allow_shadow_write"]`, and the
   usage-safety projection reaches rule 5 → `block`/
   `["high_sensitivity_reconfirmation_required"]` (gate.py:58–95, with
   `outcome_feedback`/`safety_note` both in `MEMORY_KINDS`, shared contract.py:21). The
   STOP list matches the authorization's exclusions.
7. **Duplicate lines removed without invariant loss — CLOSED.** Removed: the pattern-block
   line `lineage_pointer ^fcei_lin_v1_[0-9a-f]{32}$ (one per root)` (before:752) and the
   adverse-review bullet (before:831–833). Precision note: each occurred exactly once in
   the before file; they are redundant relative to the newly added exact tables rather
   than literal twins. Nothing required was deleted: the lineage regex remains three
   times (after:728, 750, 982); one-pointer-per-root allocation remains as "WU3 allocates
   the decision ID and root lineage pointer on the first committed writer" (after:782)
   plus unchanged §7.1 rule 6 and §7.3 step 5, and matches ledger.py:231–234; the
   adverse invariants remain as DTO literals (`high`,
   `human_safety_review_required`, `review_required`) and "C exposes no method to mark
   reviewed or approved" (after:813); no SLA/diagnosis content exists anywhere after the
   delta (no-diagnosis retained at after:336, 777, 1188).
8. **Pointers and containment — CLOSED.** Both pointer SHA-256 values match the committed
   subject blobs (recomputed, §1); the delta is exactly the four declared foundation-docs
   paths; zero Foundation product change (§1).
9. **Unauthorized surfaces stay unauthorized — CLOSED.** WU8 row remains "always STOP
   under current mission" (after:1410) with delivery/intake activation and candidate
   runtime reserved to Leo/GPT (after:1470); the design pointer keeps
   `IMPLEMENTATION_DELIVERY_INTAKE_CANDIDATE_RUNTIME: NOT_AUTHORIZED` and adds "no
   implementation from this artifact"; the clarification declares
   `IMPLEMENTATION_AUTHORITY: NONE`; WU row 4 is strengthened (start now additionally
   requires this clarification independently reviewed); honest-limit 6 states the latch
   quarantines but does not erase, and no durability exists. Nothing in the delta
   authorizes WU8, delivery, activated intake, durable/current candidate runtime,
   real-user application, promotion, ranking, safety mutation, real DB, production, or M3.

## 4. High-attention risks (verified, not assumed)

```text
R1 FAILED_WU4_PREPARATION_MUST_NOT_MASK_EXACT_REPLAY — HOLDS AGAINST LANDED CODE.
  Mechanism: on any plan failure WU5 still submits with requested_slots=() and a
  side-effect-free commit_guard returning literal False. Verified order in
  ledger.py:161–215: gate 9 (fingerprint replay → stored IDs + current eligibility;
  collision → duplicate_evidence) precedes gate 10 lineage, slot validation, and the
  gate 11 guard; () passes slot validation universally; guard False → cannot_determine
  with zero state (reject precedes the COW build; the atomic rebind never runs).
  Unseen lineage-invalid events keep their gate 10 reason (evidence_retracted /
  lineage_broken). No WU3 edit, no replay-probe API, no new policy.

R2 POST_LEDGER_CONTAINMENT_MUST_NOT_ERASE_UNRELATED_EVIDENCE — HOLDS BY DESIGN.
  The epoch clear is removed; the latch discards only the current call's unadopted
  DTO tuple, never calls ledger.clear() (the method exists, ledger.py:98–100, and is
  explicitly forbidden in this path), and mutates no prior receipt/slot/lineage/
  tombstone/eligibility state. Oracle 12 pins byte-for-byte preservation of an
  unrelated prior accepted receipt plus poisoned-instance fail-closed behavior.
```

## 5. Findings

**DR-W4-F1 [count-drift · non-blocking · correction of record].**
`M2_C_WU4_DESIGN_CLARIFICATION_RESULT.md` (at `9549638`) line 58 describes the current-gate
input as "the exact **seven-key** temporary policy projection". The patched design's
authoritative dictionary has **eight** keys (design:868–877: `subject_ref`,
`memory_kind`, `sensitivity_level`, `consent_scope`, `raw_text_stored`, `write_intent`,
`applied_to_real_user`, `write_live`). Failure scenario if uncorrected: an Advisor gate or
WU4 Worker handoff citing the clarification sentence could seed a seven-key spy oracle
that contradicts §10.3/oracle 9 and fails at implementation review. Why non-blocking: the
implementation authority is the SHA-pinned design, whose §10.3 dictionary is literal and
whose oracle 9 binds tests to §10.3, not to the clarification prose; this mission's
established convention for prose-count 오기 is "exact source wins, record the miscount"
(the reviewed design's own "six keys" lineage miscount is recorded the same way in
`commerce_evidence/contract.py:8` and stood through the original PASS). Required
handling: carry "eight-key" in the WU4 Advisor gate and Worker handoff; if the
clarification is ever re-issued, fix the one word (this changes its pointer SHA).

**DR-W4-N1 [characterization · observation, no action].** The "two visible duplicate
lines" were single-occurrence redundancies relative to the new exact tables, not literal
repeated lines in the before file (greps: `fcei_lin_v1` ×1 before / ×3 after;
`human-review-required` ×1 before / literals in tables after). Substantively the removal
is correct and invariant-preserving (Q7).

## 6. Excluded scope

Per `REVIEW_DELTA_ONLY`: unchanged pre-delta design text was not re-reviewed except as
load-bearing context (§5.1/§7 replay-transaction text, §10.2 table, §13.3, §17); the
original PASS's axes were not re-audited. WU5–WU8 behavior was reviewed only as the
modeled contract this delta declares, not as implementation. WU3 test suites were not
re-executed (design-only review; the WU3 Advisor gate already records 137/137 with
Advisor reproduction). The designer's live-runtime self-declarations (model/effort/pane)
are record-checked against the committed launcher, not reproducible after the fact.

## 7. Verdict rationale

Every mandatory question closes with letter-level evidence, and the two named technical
risks were verified against the landed, gate-passed WU3/WU2/gate code rather than the
patch's own narrative: the replay-preserving blocked-submit path is exactly what
`ledger.py` implements today, the poison latch erases nothing, the single retention-class
precondition is exactly what WU2 emits for every acceptable envelope, the required
current-gate category pairs are the landed gate's actual outputs, and the fourteen
oracles are internally consistent with §10.1–§10.5 and implementable within
`candidates.py` plus one dedicated test. The only defect found anywhere in the four-path
delta is a one-word arithmetic slip in the companion clarification artifact (DR-W4-F1),
whose authoritative content is byte-pinned to the patched design and now corrected on the
record — per V2 this is not a defect that requires a patch before the next approved gate,
so `NEEDS_PATCH` would be disproportionate and `PASS_WITH_RISK` would misfile a
documentation correction as an acceptance-type residual risk. No boundary, authority,
safety, or structural failure exists (`FAIL` excluded).

**This PASS is a delta design-review verdict only. It is not implementation
authorization.** WU4 implementation still starts only from a separate exact Advisor
handoff after the WU4 Advisor gate (WU row 4); WU8, delivery, activated intake,
durable/current candidate runtime, real-user application, approval, reuse, promotion,
ranking, safety mutation, real DB, production/live, and M3 remain NOT_AUTHORIZED and
HARD-STOPPED.

```text
VERDICT: PASS
DELTA_QUESTION_VERDICTS: 9/9 CLOSED
BLOCKING_FINDINGS: none
NON_BLOCKING_FINDINGS: DR-W4-F1 (clarification "seven-key" vs eight-key §10.3 dictionary —
  design wins; carry "eight-key" forward), DR-W4-N1 (duplicate-line characterization note)
REGRESSIONS_INTRODUCED_BY_PATCH: none in the implementation-authority design; DR-W4-F1 in
  the companion clarification artifact only
AUTHORITY_CONFLICTS: none (within Founder authorization c96caefe scope and role boundary;
  Designer routed by Advisor; same-Reviewer delta-only re-review as required)
SUBJECT: 590a72220229169513c3b50eb035d8d706c8a6b1 ..
         954963841af166edf3f9b86ecbcc323945f94ff9 (exactly 4 foundation-docs paths)
PATCHED_DESIGN_SHA256: 3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66
CLARIFICATION_SHA256: f8590724ff3c68ab7522ab9aac4de504ed156c664136f7085049f693d3fe197b
FOUNDATION_PRODUCT_CHANGE: ZERO (HEAD de63c8fe unchanged; two known pre-existing untracked docs only)
PRODUCT_TEST_EXECUTION: ZERO
STAGE_COMMIT_PUSH: ZERO
NEW_AGENT_OR_SUBAGENT: ZERO
WU4_IMPLEMENTATION_STARTED: NO
WU8_DELIVERY_INTAKE_CANDIDATE_RUNTIME_M3: NOT_AUTHORIZED
ACTUAL_MODEL: claude-fable-5 (live)  ·  EFFORT: max  ·  SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
