# Memory V3 M2 C — Foundation Control Contract Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-CONTROL-CONTRACT-ANALYSIS-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
TARGET_WINDOW_ID: @4
TARGET_PANE_ID: %4
ROLE: Control
MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_DESIGN
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_WORKSPACE: /home/leo/Project/foundation-control
FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_HEAD: f6417004d9157766b2b23d4d0870ade7f0c7fe96
SIASIU_REPOSITORY: /home/leo/Project/SIASIU
SIASIU_BRANCH: shadow/m4-siasiu-memory
SIASIU_HEAD: e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602
COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_IMPLEMENTATION_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f
FOUNDATION_CONTROL_HEAD: c89b792bed177aad9322e09debecc76caab0c8a0

FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
FOUNDATION_DOCS_HANDOFF_COMMIT: RECORDED_IN_LAUNCHER_AFTER_COMMIT

ACTUAL_MODEL: verify live and record exactly
EFFORT: high
REQUIRED_SKILL: /fable-builder
PRODUCT_AND_CONTROL_REPO_WRITE: FORBIDDEN
FOUNDATION_DOCS_COMMIT_PUSH: FORBIDDEN — Advisor publishes returned artifacts
TEST_DB_SECRET_ENV_NETWORK_PROVIDER: FORBIDDEN
C_IMPLEMENTATION_DELIVERY_INTAKE: FORBIDDEN
STOP_AFTER_RETURN: true
```

## 1. Objective and authority boundary

Produce the smallest complete **C cross-project contract analysis** that a
Designer can convert into an implementation-ready, independently reviewable
design without inventing policy. The contract describes a future, separately
approved Foundation intake and candidate-creation boundary. It grants no
runtime, delivery, intake, database, migration, feature-flag, or implementation
authority.

Founder-fixed authority:

- D1-A, D2-A, D3-A and all custom constraints in
  `24_M2_FOUNDER_D1_D3_DECISION.md` remain fixed.
- Cosmile owns the closed-choice normalization and commerce evidence envelope.
- Cosmile never creates `MemoryFactCandidate` or adverse candidates.
- In a future separately approved C implementation, Foundation may validate
  schema, consent, provenance, identity, lineage, and policy eligibility;
  accept or reject evidence; and create Foundation-owned candidates only from
  accepted evidence.
- C contract and implementation-ready design plus independent design review are
  authorized. C implementation, delivery, Foundation intake activation,
  candidate runtime connection, outbox consumer/flush/network, production/live,
  and full Package 1B are NOT authorized.

## 2. Mandatory direct reads

Read directly, not from memory:

1. Current Agent Office operating model and Control role document.
2. `/home/leo/Project/foundation-control/CLAUDE.md`, applying Agent Office as
   current role authority where its historical pointer differs.
3. FOUNDATION, SIASIU, and Cosmile root `AGENTS.md` and `CLAUDE.md`; Cosmile
   `app/AGENTS.md`, `app/CLAUDE.md`, security and migration rules.
4. `/home/leo/Project/skill/fable-builder/SKILL.md` and only the task-relevant
   references it routes to.
5. Mission artifacts `00`, `16`, `20`, `22`, `24`, `25`, and the complete
   reviewed A/B chain `26` through `49` at foundation-docs commit
   `24d6082aa7a3040ca7521e6e8a254b63da57ac1f`.
6. Current M1 Foundation/Cosmile/Control results and pointers.
7. Current Cosmile A/B source/schema/migration/tests at exact head `f26fa5c`,
   including the evidence envelope, consent, provenance, correction,
   retraction, identity, outbox containment, and no-transport invariants.
8. Current Foundation source/contracts/schema/tests at exact head `f6417004`
   needed to establish the existing intake, candidate, adverse, consent,
   identity, provenance, lineage, rejection, and promotion boundaries.
9. SIASIU only to prove non-participation or identify a real shared-contract
   dependency; do not expand C into SIASIU work.

Worker/Designer/Reviewer prose is not evidence until checked against the pinned
source and Git state.

## 3. Required contract analysis

Return an evidence-backed contract package containing:

1. **Current truth at pinned heads.** Exact code/schema/contract facts,
   contradictions, legacy or duplicate paths, and facts not proved.
2. **Ownership and trust boundary.** Cosmile producer/envelope ownership;
   deferred transport ownership; Foundation validator, decision, and candidate
   ownership; explicit SIASIU non-role unless evidence proves otherwise.
3. **Versioned evidence schema.** Minimum fields Foundation would require,
   optional/forbidden fields, closed-choice rules, satisfaction/adverse
   independence, purchase-item opacity, nullable Cosmile-local `sessionId`, and
   stable contract-version negotiation.
4. **Ingress authenticity without inventing transport.** Provenance and source
   attestation requirements, replay/idempotency inputs, duplicate handling,
   and how an intake must fail closed when authenticity cannot be established.
   Do not design or authorize a consumer, network protocol, credential, or live
   endpoint.
5. **Accept/reject boundary.** Deterministic validation order and a stable,
   versioned rejection-reason taxonomy covering schema/version, purpose
   consent, identity/linking, provenance/authenticity, lineage, duplication,
   correction/retraction, retention/erasure, policy eligibility, and safety.
6. **Consent boundary.** Feedback-storage consent remains separate from
   cross-service evidence-use consent; login/userId is never consent; revoked,
   expired, unknown, purpose mismatch, and version mismatch fail closed.
7. **Identity boundary.** Default OFF linking; explicit user action plus
   versioned linking consent; anonymous and authenticated references remain
   opaque; no destructive re-key; no silent retroactive linking.
8. **Lineage and lifecycle.** Append-only correction, retraction plus minimal
   tombstone, supersession graph, late/out-of-order evidence, erasure boundary,
   non-prod retention representation, and `adverse_regulatory_hold` remaining
   unimplemented/unactivated pending jurisdiction/legal-role decision.
9. **Candidate boundary.** Only Foundation may create Foundation-owned
   `MemoryFactCandidate` or adverse candidate from accepted evidence; no direct
   durable promotion, ranking mutation, or safety downgrade; satisfaction may
   never lower adverse severity/handling. Separate acceptance from candidate
   eligibility and candidate creation outcomes.
10. **Response contract.** Minimal receipt/accept/reject shape, decision and
    reason identifiers, lineage pointer, audit correlation, and no PII/raw
    payload echo. This is a data contract only, not delivery design.
11. **Rollback, kill switch, and activation sequence.** Default OFF, shadow
    verification, version compatibility, fail-closed rollback, evidence replay
    constraints, metrics/audit gates, and a hard stop requiring new Founder
    approval before any consumer, delivery, intake, or candidate runtime.
12. **Threat and misuse analysis.** Forged provenance, consent laundering,
    identity confusion, replay, correction/retraction evasion, adverse-signal
    suppression, cross-tenant leakage, retention bypass, unsupported version,
    and downgrade attacks.
13. **Open decisions and residual risks.** Distinguish implementation detail
    from any genuinely new Founder/legal/security decision. Do not silently
    resolve the latter.
14. **Traceability.** Every normative clause maps to a Founder constraint and/or
    direct pinned-source evidence. Clearly label proposed future behavior versus
    current implementation.
15. **Designer inputs and objective review criteria.** Exact requirements the
    Designer must turn into an implementation-ready C design, without any C
    implementation or activation.

The contract must not require raw free text, an external semantic provider,
automatic identity linking, Cosmile candidate creation, outbox delivery,
Foundation intake activation, real DB access, production retention policy, or
automatic promotion/ranking/safety mutation.

## 4. Allowed writes and output contract

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_CONTROL_CONTRACT_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_CONTROL_CONTRACT_RESULT_POINTER.md
```

The result records live actor/session/model/effort/skill, all pinned repository
heads and pre/post porcelain hashes, files read, proved/not-proved facts,
contract clauses, Designer acceptance inputs, limitations, and STOP state.
Control must not commit or push; Advisor publishes the two returned files.

## 5. Completion and STOP conditions

Complete only when both declared files exist, every normative clause is
traceable, product/control Git state is unchanged, and the result explicitly
states that it is contract input—not reviewed design and not implementation
authority.

STOP and return `HOLD` with evidence if actor/session/model/effort/workspace or
skill is wrong; pinned source is unavailable; product/control write, DB,
secret, environment, network, provider, test, fetch, branch, or new policy
decision is required; evidence conflicts cannot be bounded; or the work would
cross into C implementation/delivery/intake. Return only the compact pointer to
`foundation-advisor`, then STOP.
