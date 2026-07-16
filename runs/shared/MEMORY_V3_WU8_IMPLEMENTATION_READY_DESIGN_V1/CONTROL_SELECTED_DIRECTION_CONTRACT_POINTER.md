# POINTER — WU8 Selected-Direction Cross-Project Contract (Control)

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
WORK_UNIT_ID: WU8-DESIGN-CONTROL-001
ROLE: Control · MODE: READ_ONLY_SELECTED_DIRECTION_CONTRACT_ANALYSIS
RETURN_TO: foundation-advisor
RESULT_TYPE: CROSS_PROJECT_CONTRACT_COORDINATION_INPUT_ONLY
  (not the implementation-ready design · not policy selection · not implementation · transport-neutral)

RESULT_FILE:
  runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/CONTROL_SELECTED_DIRECTION_CONTRACT_RESULT.md

PINNED_HEADS (read-only, pre==post):
  foundation-control shadow/m5-ingress-gate            c89b792b  porcelain b1b3b6962d0a0a17
  FOUNDATION         shadow/foundation-shared-memory-v0 33570b9d  porcelain 4b1f8fb568419969
  Cosmile            shadow/m4-cosmile-memory           f26fa5ce  porcelain 90210e452ce5bbef

LIVE_RUNTIME: foundation-control @4/%4 · Opus 4.8 (1M) claude-opus-4-8[1m] · effort high · skill /fable-builder (read-only contract-coordination mode)
```

## RESULT SUMMARY

Encoded the five Founder-selected WU8 directions (D8-1-A gateway-owned auth / D8-2-A
current-consent verify-at-every-transition / D8-3-B bounded outbox→ingress pipeline as
DESIGN DIRECTION ONLY / D8-4-A no current-`MemoryCandidate`/`SharedMemoryStore` bridge /
D8-5-A adverse UNCONFIGURED + guest forbidden) into a **transport-neutral cross-project
ownership + interface + invariant constraint package** for the Designer. Selects **no**
credential, backend, broker, endpoint, migration, or topology; introduces **no** new policy.

Contents: (2) five-owner ownership map — Cosmile producer/outbox, infra/gateway authenticity,
Cosmile current-consent authority, Foundation ingress/decision/durable-evidence state, later
candidate boundary; (3) five owner-to-owner logical interfaces incl. the landed minimized
`ProvenanceVerdict`/`ConsentVerdict` shapes (verified this pass); (4) nine delivery/durability
invariants (at-least-once, idempotent commit, per-root ordering, bounded retry, category-only
DLQ, backpressure, rollback, kill switch, fail-closed); (5) durable-state responsibilities +
the mandatory six uniqueness constraints and atomic boundary, backend-neutral; (6) explicit
handling of correction/retraction/replay/erasure/lineage/collision/poison/authority-unavailable/
transition-time consent; (7) exact stop at accepted-evidence + review-only drafts; (8) adverse
+ identity fail-closed boundaries; (9) Security/Legal gates U1–U6 and where each becomes
blocking; (10) ordered Designer design-only work-unit map D-1..D-6 ending in HARD STOP; (11)
traceability separating verified fact / selected direction / design constraint / unresolved gate.

Source re-verified this pass at pinned heads: `verifiers.py` verdict enums+bindings,
`ledger.py` six uniqueness sets + one-process/zero-durable claim, `contract.py` furef_v2 +
retention enum, `feature_flags.py` flags, Cosmile producer-only + guest-forbidden + revoke-
enqueues-nothing. No product/control write; no policy/option introduced.

## NEXT ACTION ROUTING

- **foundation-advisor** — validate/publish; hold as the cross-project contract basis for a
  future Designer WU8 implementation-ready design **only if Leo/GPT explicitly grants WU8
  design authority**. Then: Designer design → independent design review → HARD STOP → Leo/GPT.
  Blocking gates before dependent steps: U1 Security (auth mechanism), U2 Security/privacy
  (consent adapter/propagation), U3 architecture (durable backend), U4 architecture (candidate
  contract), U5 Legal (adverse policy), U6 Founder (guest). Control does not dispatch.

## POINTER BLOCK

```text
WRITES_THIS_MISSION: the 2 declared foundation-docs files only (result + this pointer); uncommitted (Advisor publishes)
PRODUCT_OR_CONTROL_REPO_WRITE: ZERO · COMMIT/PUSH/FETCH/BRANCH_SWITCH: ZERO · NEW_AGENT/SUBAGENT/DISPATCH: ZERO
DB/SECRET/ENV/NETWORK/MIGRATION/FLAG/BUILD/PRODUCT_TEST_RUN: ZERO · CREDENTIAL/BACKEND/BROKER/ENDPOINT SELECTED: ZERO
NEW_POLICY_OR_OPTION_SELECTED: ZERO · PII/RAW_ID/SECRET in artifacts: ZERO
WU8_IMPLEMENTATION / DELIVERY / INTAKE / CANDIDATE_RUNTIME / M3 / FULL_PACKAGE_1B: NOT_AUTHORIZED
HARD_STOP: ACTIVE · RETURN_TO: foundation-advisor · STOP_AFTER_RETURN: true
```
