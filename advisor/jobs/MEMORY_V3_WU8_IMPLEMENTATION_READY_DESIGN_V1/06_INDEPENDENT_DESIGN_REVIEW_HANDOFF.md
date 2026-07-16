# Independent Reviewer Handoff — Memory V3 WU8 Implementation-Ready Design

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
REVIEW_ID: WU8-IMPLEMENTATION-READY-DESIGN-REVIEW-001
REVIEW_PASS: FULL_IMPLEMENTATION_READY_DESIGN_REVIEW
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE: Independent Reviewer (Sentinel)
RESPONSIBLE_ADVISOR: foundation-advisor

TARGET_WORKSPACE: /home/leo/Project/FOUNDATION
SUBJECT_COMMIT: 3fd7a49aa00346afc0142b92f69790819cd90e7a
SUBJECT_FILE: runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
SUBJECT_BLOB: 726223cbbcfc0c231944edbba5b76acd3fe95f1c
SUBJECT_SHA256: 08eb26538bed3b0960bd82ba22a4078cbb0a744f247690b388670ef9b903e914
SUBJECT_POINTER: runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_POINTER.md

AUTHORITY_CLARIFICATION_COMMIT: 47eaf97c235f5de86dc4e06cd58238619cc55409
CONTROL_CONTRACT_COMMIT: 80dfbe00dd2235a12fea2f168d07ed930e0cc1c3
DESIGNER_HANDOFF_COMMIT: feabcf46a74b8f9dcc6d35335840faae9010a0fc

REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: max
```

## Required reads

Read directly; distrust summaries until reproduced:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
3. `/home/leo/Project/FOUNDATION/AGENTS.md` and `CLAUDE.md`
4. `/home/leo/Project/Cosmile/AGENTS.md` and `CLAUDE.md`
5. Founder direction decision at commit `25ec350584fc2df0a9ae77a1bb5192dbaa36630a`
6. `03_FOUNDER_DESIGN_AUTHORITY_CLARIFICATION.md` at commit `47eaf97c235f5de86dc4e06cd58238619cc55409`
7. Control contract result at commit `80dfbe00dd2235a12fea2f168d07ed930e0cc1c3`
8. Designer handoff at commit `feabcf46a74b8f9dcc6d35335840faae9010a0fc`
9. Exact subject and pointer at commit `3fd7a49aa00346afc0142b92f69790819cd90e7a`
10. Prior C design at `4480b55`, WU7 implementation review at `0d28bc0`, and the pinned
    FOUNDATION/Cosmile source needed to verify every load-bearing claim.

## Independence and scope

This is a full, high-risk design review. The Reviewer authored none of the Founder decision,
Control contract, Designer handoff, or subject. Review read-only; do not patch, stage, commit,
push, dispatch, accept risk, select policy, or grant final approval.

## Required review rulings

Return an evidence-backed ruling on each item:

1. **Authority and subject integrity.** Recompute commit blob and SHA-256; confirm exact
   ancestry, subject paths, actual model/effort/skill, session/workspace, and independence.
2. **Five selected directions.** Prove D8-1-A, D8-2-A, D8-3-B design-only, D8-4-A, and D8-5-A
   are preserved without reopening or silently extending them.
3. **Clarification compliance.** Confirm the design is implementation-ready only for the
   authorized application contracts, delivery semantics, logical durable model, schema/
   migration plan, local/non-prod topology, rollback, verification strategy, and exact future
   WorkUnits; confirm it performs or authorizes none of them.
4. **Authentication boundary.** Confirm infrastructure/gateway ownership, exact principal/
   opaque verdict bindings and failure states, and fail-closed default. Confirm no mTLS, key,
   token, certificate, credential custody, rotation policy, secret, endpoint, or other concrete
   mechanism is selected or implied. U1 must block dependent implementation.
5. **Consent boundary.** Confirm Cosmile remains current authority; intake and every later
   eligibility-affecting transition re-verifies current consent; snapshot never becomes
   authority; unavailable/unverifiable fails closed. Confirm D8-2-C and complete legal erasure
   remain deferred and U2 is honest.
6. **Carrier/hash/ack contract.** Verify exact v1 carrier preservation, reviewed JavaScript
   source-hash sentinel behavior, no delivery-layer enrichment or repair, strict minimization,
   acknowledgement combinations, and safe delivery-only categories.
7. **Delivery semantics.** Attack at-least-once/idempotent commit, per-root ordering, leases,
   retry/exhaustion, malformed ack, poison input, category-only dead letter, backpressure,
   crash boundaries, and acknowledgement timing. Reject any exactly-once, silent-drop,
   infinite-retry, or fail-open claim.
8. **Durable logical model.** Verify entities, field types/nullability/enums, six uniqueness
   constraints, tombstones, review-only slots, retention/cleanup, no full envelope/credential/
   raw ID/text/PII/arbitrary JSON, and no hidden current-candidate/store bridge.
9. **Transactions/concurrency.** Verify outside/inside transaction placement, serializable-
   equivalent conflict handling, first-writer behavior, exact replay, collision, correction/
   retraction races, precommit guard, bounded internal retry, and post-commit sink failure.
10. **Schema/migration/topology design-only boundary.** Verify Cosmile paths reflect the pinned
    Prisma/PostgreSQL repository; the plan is additive and rollback-safe. Verify Foundation has
    no invented backend/path and U3 blocks it. Confirm zero DB access, migration application or
    rehearsal, network/runtime creation, or flag activation occurred.
11. **Candidate/adverse/identity boundary.** Verify accepted evidence/drafts stop before current
    `MemoryCandidate`/`SharedMemoryStore`; false effect flags remain; skin/other remain rejected
    while adverse policy is UNCONFIGURED; `usage_safety` treatment matches the landed reviewed
    contract without lowering safety; guest/anonymous/linking remain forbidden.
12. **Retention/privacy/observability.** Distinguish reversible non-prod design ceilings from
    production Legal policy; check tombstone/retry ordering, erasure honesty, category-only
    DLQ/audit/metrics, and automated leakage-denylist requirements.
13. **Rollback and kill switch.** Verify OFF/HARD_OFF/UNCONFIGURED defaults, sender-first stop,
    queue and committed-state preservation, non-destructive down gate, no ledger epoch clear,
    and no automatic next stage.
14. **Future tests and WorkUnits.** Confirm the test matrix covers the high-risk contracts and
    that every future WorkUnit has the correct repo-owner, dependency, exact/provisional paths,
    skill/effort, STOP, rollback, evidence, and separate authority. No WorkUnit may be currently
    executable or automatically unlock delivery/intake/runtime.
15. **Source truth and zero writes.** Reproduce load-bearing facts from pinned source and verify
    FOUNDATION, Cosmile, SIASIU, and foundation-control received no mission write.
16. **Ambiguity/drift hunt.** Search for TBD/TODO/options, hidden policy/backend/credential,
    contradictory state mappings, missing transition, overbroad allowlist, unsafe operational
    constant, stale source, unreviewed external choice, or authority-expanding language.

## Verdict

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

`PASS_WITH_RISK` does not close the mission without Leo/GPT risk acceptance. `NEEDS_PATCH`
must name finding IDs, exact subject sections, required correction, and prohibited expansion.
The same Designer will make bounded design-artifact corrections and this same Reviewer/session
will review only the delta.

## Allowed writes

Write only:

```text
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_REVIEW_RESULT.md
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_REVIEW_POINTER.md
```

Do not modify the subject/pointer, any product/control file, or any other evidence. Do not
stage, commit, push, fetch, switch branches, run unsafe tests, access DB/network/secrets/env,
or execute/rehearse any designed component.

```text
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
