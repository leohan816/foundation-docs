# M2 C — WU1 Authority/Evidence Correction Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU1-AUTHORITY-EVIDENCE-CORRECTION-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation Worker
TARGET_SESSION: foundation
TARGET_WINDOW_ID: @3
TARGET_PANE_ID: %3
ROLE: Worker — same WU1 author
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: 5b9d08abd049fcfb4eefd3d86f140561e5b94282
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
EXPECTED_UPSTREAM: origin/shadow/foundation-shared-memory-v0

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
ACTUAL_WU1_HANDOFF_COMMIT: 53759fce7a3be61a0033eb79ac5f5f106ab3a0bf
ACTUAL_WU1_HANDOFF_BLOB: 6cf42ef6aa280a7f7ac3b6f3903c5a4130b14562
ACTUAL_WU1_HANDOFF_SHA256: de59a97b076983ad5a1b94e489f9a755240f4b577621a14854e6081b16d832dd
FOUNDER_AUTHORIZATION_COMMIT: c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2
DOCUMENT_ALLOWLIST_CORRECTION_COMMIT: 36690ec2b0810dc46bb90be9fda4a596d5d17af0

EFFORT: max — retain current live setting for evidence correction/audit
REQUIRED_SKILL: /fable-builder
PRODUCT_COMMIT_PERMISSION: YES — correction commit only
PRODUCT_PUSH_PERMISSION: YES — non-force exact shadow upstream only
FOUNDATION_DOCS_COMMIT_PERMISSION: NO — Advisor publishes
WORK_UNIT_2_TO_8_EXECUTION: FORBIDDEN
```

## 1. Exact findings to correct

Advisor independently verified WU1 commit `5b9d08a`, its 10-path allowlist,
remote containment, byte-identical mirror, and 33/33 WU1 delta tests. Two bounded
evidence/documentation defects remain:

1. The canonical design document, README index line, `__init__.py` docstring, and
   `contract.py` docstring say or imply `WU2~WU8` are all unauthorized. This is
   stale authority wording. Founder authorization `c96caef` authorizes WU1–WU7
   only under their dependency/review gates and separate Advisor handoffs; none
   automatically starts. WU8 alone remains `NOT_AUTHORIZED`.
2. WU1 result §13 records handoff `60_…` as `f3bf313 / dc7b3d6`. The file did not
   exist at that historical commit. The actual committed handoff is exactly
   `53759fce7a3be61a0033eb79ac5f5f106ab3a0bf`, blob
   `6cf42ef6aa280a7f7ac3b6f3903c5a4130b14562`, SHA-256
   `de59a97b076983ad5a1b94e489f9a755240f4b577621a14854e6081b16d832dd`.

No behavior, contract, architecture, policy, data, hash, reason code, fixture, or
test oracle change is authorized.

## 2. Exact product write allowlist

Modify only:

```text
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
설계문서/README.md
foundation/shared_memory/commerce_evidence/__init__.py
foundation/shared_memory/commerce_evidence/contract.py
```

Use this meaning consistently and minimally:

```text
WU2–WU7:
Founder-authorized only under the reviewed dependency/review gates and a separate
exact Advisor handoff; not implemented or started by WU1; no automatic transition.

WU8:
NOT_AUTHORIZED and must not start.
```

Do not edit any executable statement, constant, regex, type, hash logic, reason
code, fixture, test, or any other product path.

## 3. Exact foundation-docs write allowlist

Modify only the still-unpublished WU1 artifacts:

```text
설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU1_CONTRACT_FREEZE_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU1_CONTRACT_FREEZE_RESULT_POINTER.md
```

- Re-copy the corrected canonical design document byte-for-byte to the same mirror.
- Correct the handoff anchor in result §13.
- Append a clearly labeled Advisor-found correction section recording original
  product head `5b9d08a`, correction product head, exact four product paths, delta-
  only checks, mirror hash, and that behavior delta is zero.
- Update the result header/pointer so the final WU1 product head and push evidence
  point to the correction commit while preserving the original implementation
  content head.
- Do not rewrite or hide the original fact; disclose this as a follow-up correction.

## 4. Delta-only verification

This is a documentation/evidence correction. Re-read only the correction delta and
prove:

1. product diff `5b9d08a..<new head>` contains exactly four allowlisted files;
2. Python diff changes docstrings only—no AST/executable behavior change;
3. design/README wording now matches `c96caef` exactly and does not claim WU2–WU7
   have started or may bypass gates;
4. WU8 remains explicitly forbidden;
5. product design doc and foundation-docs mirror are byte-identical;
6. result uses the actual handoff commit/blob/SHA above;
7. existing two unrelated untracked product files remain byte-untouched/unstaged;
8. no test oracle/fixture/source logic changes and no WorkUnit 2 execution occurs.

Do not rerun the full WU1 or legacy suites merely for docstrings. A syntax/import
check limited to the two touched Python modules is sufficient; record that this is
delta verification, not a new behavior review.

## 5. Commit, evidence, and STOP

Only after the delta checks pass:

- stage the exact four Foundation paths;
- inspect cached names and diff;
- create a follow-up correction commit (do not amend `5b9d08a`);
- non-force push only to `origin/shadow/foundation-shared-memory-v0`;
- verify upstream contains the correction commit;
- update only the three declared foundation-docs artifacts, return the pointer to
  `foundation-advisor`, and STOP.

Do not commit/push foundation-docs. Do not start WU2 or dispatch Reviewer. Stop on
any need to change behavior, contract, test, fixture, other path, or authority.

Result boundaries must include:

```text
CORRECTION_TYPE: DOCUMENTATION_AND_EVIDENCE_ONLY
BEHAVIOR_DELTA: ZERO
PRODUCT_PATHS_CHANGED: EXACTLY_4
FOUNDATION_DOCS_PATHS_CHANGED: EXACTLY_3
FULL_TEST_RERUN: NO_DELTA_ONLY
WORK_UNIT_2_TO_8_STARTED: NO
WU8_AUTHORITY: NOT_AUTHORIZED
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
