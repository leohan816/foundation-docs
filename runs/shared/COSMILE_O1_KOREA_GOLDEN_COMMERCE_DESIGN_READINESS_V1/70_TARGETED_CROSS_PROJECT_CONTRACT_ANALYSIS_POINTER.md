# 70 — Targeted Cross-project Contract Analysis · POINTER

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID:  O1-P6-CONTROL-TARGETED-CONTRACT
ACTOR:        foundation-control (Control — targeted support only)
RETURN_TO:    foundation-advisor
STATUS:       COMPLETE — analysis only · READY_FOR_ADVISOR_INTEGRATION
RESULT_PATH:  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS.md
RESULT_SHA256: a088a42235b34de0e6bd218943bfdb9460fb440e8dc2e230c28f55b9e8f2c280
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9
EVIDENCE_COMMIT:  c8f16404602cece33a66fcb261998bd7efe6f1c8   (four evidence files byte-identical at worktree HEAD cb01c11)
HANDOFF_COMMIT:   45656f5db664457bb5ff6e98e7e59782cff318ff
IMPLEMENTATION_AUTHORIZED: NO   ·   PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO   ·   NO_NEW_AGENT_OR_SUBAGENT: TRUE
```

## RESULT SUMMARY

Independent Control validation of the Foundation↔Cosmile cross-project contract for the O1 Korea/KRW Golden
Order + separate captured-payment Golden Reversal. Answered the seven exact handoff questions; every contract
element carries OWNER / SOURCE_OF_TRUTH / CONSUMER / VERSION_OR_ID / FAILURE_BEHAVIOR / CORRECTION_BEHAVIOR /
EVIDENCE / STATUS / REQUIRED_DECISION_OWNER.

- **Q1 `foundation_product_id ↔ cosmile_sku_id`** — `VALIDATED_WITH_CONDITION`. Cardinality is **1 Foundation
  product → 0..N Cosmile SKUs**, unique-keyed on `cosmile_sku_id`; binding owned/stored by Cosmile; snapshot
  pin `{vault_commit, product_tree_hash, data_version, formula_version}`. Control findings INV-B2 (git
  `product_tree_hash` is the reliable change detector — versions did **not** bump on the observed rename) and
  INV-B3 (pin on git object identity, rename-stable across the pending vault path migration). Foundation
  `offers.yaml` KRW figures are **non-authoritative dated reference**, never price authority.
- **Q2 ownership** — `VALIDATED`. Catalog = Foundation reference/display (gated) + Cosmile SKU/price/stock;
  cart/checkout fully Cosmile server-authoritative; **historical order lines immutable** under later
  correction/withdrawal (core invariant).
- **Q3 correction/withdrawal/stale/missing/unavailable** — consumption side `VALIDATED`; the **delivery /
  signaling mechanism is `UNRESOLVED_PENDING_FOUNDATION_WORKER`** (`PATH_STATUS: UNRESOLVED`). Affirmed:
  connection-status ≠ canonical-product-status; ordinary commerce continues on Foundation outage.
- **Q4 state & transaction/compensation** — `VALIDATED`. Ten cross-system invariants (charge-after-availability,
  server-confirmed money truth, one-capture/one-refund idempotency, reservation gated by payment truth,
  duplicate ⇒ zero effect, post-capture failure contained not re-charged, `Order.status` is a projection,
  refund needs a real capture, independent inventory disposition, DB invariants in raw SQL). Foundation is
  **absent from the money path**.
- **Q5 dependencies/fail-closed/SPOF/sequence** — `VALIDATED`. D1/D4 pending Foundation Worker; 8 fail-closed
  points affirmed; SPOF-1 = synchronous Foundation dependency is **contract-prohibited**; minimum safe sequence
  separates the Cosmile spine from the Foundation-blocked catalog source-swap.
- **Q6 conflicts** — reconciled; **34-vs-45 Prisma count = NON-MATERIAL**; facts/candidate/assumptions/
  unknowns/owners/Leo-decisions separated.
- **Q7 carry-forward** — CF-1…CF-8 listed, none started; no scope broadening (Memory V3 / SIASIU / recommendation
  / production / general redesign remain excluded).

**Decisive open dependency:** Foundation Worker Phase 5 bounded snapshot-delivery design (CE-9 / CF-1) — not
authored, not replaced. Control did not implement, select any provider/Legal policy, accept risk, or dispatch.

## NEXT ACTION ROUTING

```text
- Target actor:    Advisor (foundation-advisor)
- Target session:  Same Advisor session (Phase 7 integration)
- Prompt/file:     runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS.md
- Advisor action:  Integrate this Control analysis into the Phase 7 candidate package; route CE-9/CF-1 to the
                   Foundation Worker (bounded snapshot-delivery design) before Independent Design Review can
                   close the snapshot-delivery contract; carry Leo decisions (order_no, stale threshold,
                   provider selection, scope freeze) to Founder closure.
- Return result to: Advisor (final approval remains Leo/GPT)
- Do not send to:  Worker / Sentinel as an implementation authorization (this grants none)
- Status:          UNRESOLVED_PENDING_FOUNDATION_WORKER for CE-9/D1/D4; otherwise READY_FOR_ADVISOR_INTEGRATION
```

## POINTER BLOCK

```text
RESULT:        70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS.md  (sha256 a088a42235b34de0e6bd218943bfdb9460fb440e8dc2e230c28f55b9e8f2c280)
POINTER:       70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS_POINTER.md  (this file)
OUTPUT_ROOT:   runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/
COMMIT_PUSH:   left to Advisor (per sibling 10_/20_/40_/60_ precedent); not in this handoff's scope
REPO_STATE:    Foundation 33570b9 · SIASIU e1830b4 · Cosmile b8b61d7 · foundation-control c89b792 — read-only, unchanged
STOP
```
