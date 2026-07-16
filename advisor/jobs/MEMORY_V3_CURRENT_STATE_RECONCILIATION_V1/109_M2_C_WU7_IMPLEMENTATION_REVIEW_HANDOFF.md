# Memory V3 M2 C — WU7 independent implementation review handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU7-IMPLEMENTATION-REVIEW-001
REVIEW_ID: M2-C-WU7-IMPLEMENTATION-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer (Sentinel)
ROLE_MODE: IMPLEMENTATION_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
TARGET_PROJECT: FOUNDATION
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
VERDICT_TARGET_BASE: f6417004d9157766b2b23d4d0870ade7f0c7fe96
VERDICT_TARGET_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
FOUNDATION_DOCS_GATE_HEAD: f3725a1aa63506e013a2c42ac7fcb1833f097ad8
REQUIRED_SKILL: /fable-sentinel
REQUESTED_EFFORT: max
INDEPENDENCE: separate session from Advisor, Designer, Control, and Worker
PRODUCT_WRITE_AUTHORITY: NONE
COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 1. Required authority reads

Read directly before review:

- Agent Office `TEAM_OPERATING_MODEL.md` and `roles/reviewer.md`;
- Foundation `AGENTS.md`, `CLAUDE.md`, Test Meaning Policy, security guardrails,
  env/migration policy, and current canonical commerce-evidence design;
- Founder bounded C authorization at `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`;
- Founder documentation correction `36690ec2b0810dc46bb90be9fda4a596d5d17af0`;
- final implementation-ready design correction `4480b55f43b876499746efe6497b5e2e4eb1931d`
  with SHA-256
  `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9`;
- final independent design delta PASS `062c1d6391e4f595d5d57e3cc81ec60df3157be0`;
- WU5 product/evidence/gate `90d6298` / `a937dfe` / `ff5f681`;
- WU6 STOP, decision, response/ACK, correction, green evidence, and Advisor gate:
  `4552b89`, `a0a7bc6`, `d058e08`, `33570b9`, `97633ed`, `f3725a1`.

Apply `/fable-sentinel`. Verify actual session, model, live `max` effort, workspace,
role, and independence; do not infer from the session name. Do not create an agent
or subagent.

## 2. Immutable implementation subject

Review the full authorized implementation range:

```text
SUBJECT_BASE: f6417004d9157766b2b23d4d0870ade7f0c7fe96
SUBJECT_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
SUBJECT_PATH_COUNT: 28
```

Use ancestry and path-filtered diff. The subject includes WU1-WU6 only: contract,
hash/reasons, verifier/validator, lineage/ephemeral ledger, review-only candidate
drafts, default-OFF Shadow service/audit/metrics/flags/shared-reason delegation,
canonical design/index, synthetic fixture/tests, and the Founder-approved one-test
contract alignment.

No WU8, delivery, intake activation, durable/current `MemoryCandidate`, real-user
application, approval/reuse/promotion/ranking/safety mutation, DB, production,
live, or M3 subject exists or is authorized.

## 3. Mandatory independent review

Distrust Worker/Advisor summaries until direct code, diff, tests, and Git evidence
confirm them. At minimum verify:

1. Exact `cosmile.commerce_evidence.v1` envelope/field/version/idempotency/source-
   hash contract and byte-compatible reviewed sentinel behavior.
2. The exact 18 Foundation C reason codes, first-failure ordering, positive and
   adjacent-negative coverage, shared guard delegation, unknown/unhashable/error
   collapse, and absence of a nineteenth code or diagnostic leakage.
3. Provenance verifier and current-effective-consent verifier interfaces are
   fail-closed; defaults remain `UNCONFIGURED` and accept zero.
4. Adverse retention/legal policy remains `UNCONFIGURED`; `skin_reaction` and every
   other adverse input produce accepted evidence 0, effective eligibility 0, and
   candidate drafts 0. No duration, jurisdiction, role, reporting duty, or retention
   exception is inferred.
5. WU3 ledger/replay/collision/correction/retraction/lineage/idempotency and bounded
   in-process concurrency are deterministic, one-process ephemeral only, and never
   clear unrelated prior state.
6. WU4 DTOs/draft planning/adoption remain review-only; `applied_to_real_user`,
   `write_live`, and `promotion_performed` are always false; no current candidate or
   `SharedMemoryStore` write exists.
7. WU5 flag gate is exact-`True`, default Shadow OFF, live/intake/candidate-runtime
   hard OFF, rechecked under the WU3 commit guard; failed WU4 preparation preserves
   replay/collision/gate-10 precedence; post-ledger sink/invariant failure is honest,
   fail-closed, poisons the instance, and preserves unrelated prior evidence.
8. Response/audit/metric schemas, field order, allowlists, ordered labels, IDs,
   decision ownership, sink literal-`True` semantics, and every section-11.8 path
   match the reviewed design exactly.
9. Responses, audits, metrics, exceptions, fixtures, comments, and test diagnostics
   contain no raw text, PII, producer identifiers, credentials, secrets, payload
   detail, real customer/order data, or leaked exception content.
10. The WU6 ten-oracle implementation is meaningful, synthetic, deterministic, and
    complete; the Option-A correction repoints rather than weakens the stale WU1
    test and preserves adjacent fail-closed negatives.
11. No endpoint, API route, consumer, sender, transport, network, broker, polling,
    provider, file/durable store, DB/schema/migration, environment loader, secret,
    live intake, existing ingest semantic overload, or runtime import/activation was
    introduced.
12. Canonical product design and foundation-docs mirror are byte-identical; commit
    range/path inventory is exact; only two known pre-existing untracked Foundation
    files remain; HEAD equals upstream; SIASIU and Cosmile have no change from this
    subject.
13. WU8 remains not authorized and no WorkUnit or evidence implies delivery,
    activated intake, durable/current candidate runtime, real-user application,
    approval, reuse, promotion, personalization, ranking, safety mutation,
    production/live, protected merge, Full Package 1B, or M3 authority.

## 4. Independent test execution

At live `max`, run read-only/synthetic/in-memory verification with `python3 -B`:

```text
python3 -B -m unittest \
  foundation.shared_memory.tests.test_commerce_evidence_service \
  foundation.shared_memory.tests.test_commerce_evidence_audit \
  foundation.shared_memory.tests.test_commerce_evidence_containment

python3 -B -m unittest discover \
  -s foundation/shared_memory/tests \
  -p 'test_commerce_evidence_*.py'

python3 -B -m unittest \
  foundation.shared_memory.tests.test_shared_memory_v0 \
  foundation.shared_memory.tests.test_subject_ref_v2_hard_gate
```

Also perform `git diff --check`, JSON validation, Python compile/AST checks without
bytecode, exact range/path inventory, leak/forbidden-surface scans, flag/reason
literal checks, and product/design mirror comparison. Record exact counts and any
skip/xfail. Do not access DB, Docker, network/provider, secret, environment mutation,
production, or live services.

## 5. Read-only and output boundary

Do not modify, format, stage, commit, or push any Foundation product/test/design
path or existing foundation-docs artifact. Reviewer must not patch findings.

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU7_IMPLEMENTATION_REVIEW_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU7_IMPLEMENTATION_REVIEW_RESULT_POINTER.md
```

Do not stage, commit, or push those two files. Return them to the Advisor.

## 6. Verdict and patch loop

Return exactly one:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

If `NEEDS_PATCH`, provide bounded finding IDs, exact paths/lines/contracts, protected
risk, and minimum required delta; do not patch. The Advisor routes the same
Foundation Worker for a bounded correction. This same Reviewer then performs a
delta-only re-review from the prior subject head to the corrected head. Do not
accept risk or grant final product approval.

Return the compact pointer to `foundation-advisor` and STOP.
