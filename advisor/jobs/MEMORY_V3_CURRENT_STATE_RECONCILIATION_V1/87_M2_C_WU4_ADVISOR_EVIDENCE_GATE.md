# M2 C WU4 — Advisor dependency and evidence gate

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-CANDIDATE-DRAFTS-001
ADVISOR: foundation-advisor
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
GATE_VERDICT: PASS_TO_WU5_IMPLEMENTATION_DESIGN_CLARIFICATION
PRODUCT_REPOSITORY: /home/leo/Project/FOUNDATION
PRODUCT_BRANCH: shadow/foundation-shared-memory-v0
PRODUCT_BASE_HEAD: de63c8fedaa27e470e44359cad1c2940bdc0a866
PRODUCT_RESULT_HEAD: 3e6abeec04f370dff1844afc429bd39487149c02
PRODUCT_HEAD_EQUALS_UPSTREAM: YES
PRODUCT_AHEAD_BEHIND: 0/0
PRODUCT_DIFF_PATH_COUNT: 4
PRODUCT_PREEXISTING_DIRT_ONLY: YES
FOUNDATION_DOCS_EVIDENCE_COMMIT: b96bfe4970420730707c2b289c8589998e3b9821
WORKER_RESULT_SHA256: 231e80344d26219abb9a1e98c5811f8275b83399a9d848e323cb14344b552254
WORKER_POINTER_SHA256: 8e1482407080e6551dda5434f07d0bcee4962c9acd79d9a2629e481151d6d781
CANONICAL_AND_MIRROR_SHA256: 8a813a095dd038d60ac0d2910b9ec16fc5321acf259ad3f992ee07f74033cfed
MIRROR_BYTE_IDENTICAL: YES
WORK_UNIT_5_TO_8_STARTED_AT_GATE: NO
WORK_UNIT_8_AUTHORITY: NOT_AUTHORIZED
```

## Direct Advisor evidence

- Product HEAD and upstream are the exact pushed WU4 commit; no fetch or branch
  change was performed.
- `git diff de63c8f..3e6abee` contains exactly the two WU4 implementation/test
  paths and the two Founder-authorized canonical documentation paths.
- The only product worktree dirt remains the two pre-existing untracked files;
  neither was staged or changed by WU4.
- Advisor reproduced the declared five-suite delta/regression command with
  `python3 -W error -m unittest -q`; it exited zero. Worker max-effort evidence
  records 227/227 tests, zero failure/error/skip.
- Static inspection found no endpoint, transport, DB, provider, environment,
  secret, store writer, approval, reuse, promotion, ranking, or safety-mutation
  dependency in `candidates.py`.
- The Worker result's initial next-routing error was corrected by the same Worker
  under committed handoff `b310e1e`; the corrected result identifies the required
  independent implementation review as WU7. The correction changed evidence
  routing only, not product or test facts.
- The canonical Foundation design and foundation-docs mirror are byte-identical;
  all three WU4 artifacts were explicitly staged, committed, and non-force pushed.

## Why WU5 does not route directly to implementation

Reviewed-design section 17 authorizes WU5 only after WU1–WU4 evidence, but its
current prose leaves implementation-critical choices unresolved: exact service
API/injection types, flag and guarded-reason integration, audit/ledger atomicity,
poison-latch behavior, rejection decision-ID ownership, and the WU5/WU6 test-file
boundary. A Worker must not invent those choices.

These are bounded implementation-design questions inside the already approved C
contract, not new Founder product policy. Route the same Foundation Designer to
produce a narrow implementation-ready clarification; then route the independent
Foundation Reviewer for a delta-only design review. WU5 product implementation may
start only after that review passes and a separate exact Worker handoff is committed.

```text
WU4_STATUS: ADVISOR_GATE_PASS
WU5_STATUS: DESIGN_CLARIFICATION_REQUIRED_BEFORE_IMPLEMENTATION
WU6_STATUS: NOT_STARTED
WU7_STATUS: NOT_STARTED
WU8_STATUS: NOT_AUTHORIZED
DELIVERY_OR_ACTIVATED_INTAKE: NOT_AUTHORIZED
DURABLE_OR_CURRENT_MEMORY_RUNTIME: NOT_AUTHORIZED
REAL_USER_APPLICATION_APPROVAL_REUSE_PROMOTION_RANKING_SAFETY_MUTATION: NOT_AUTHORIZED
REAL_DB_NETWORK_SECRET_PRODUCTION_M3: NOT_AUTHORIZED
NEXT_ACTOR: foundation-designer
```
