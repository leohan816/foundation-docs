# FOUNDATION Max-Effort Test Reverification Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M1-FOUNDATION-MAX-TEST-REVERIFY
TARGET_ACTOR: foundation Worker
TARGET_SESSION: foundation
ROLE: Worker
MODE: TEST_EVIDENCE_REVERIFICATION_ONLY
REQUIRED_SKILL: /fable-builder
REQUIRED_EFFORT: MAX
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
BASELINE_COMMIT: f6417004d9157766b2b23d4d0870ade7f0c7fe96
RETURN_TO: foundation-advisor
```

Do not repeat the repository audit. Reverify only the three already safety-proven commands listed in Section 5 of `FOUNDATION_WORKER_RESULT.md`, at actual effort `max`:

```text
python3 foundation/shared_memory/tests/test_shared_memory_v0.py
python3 foundation/shared_memory/tests/test_subject_ref_v2_hard_gate.py
python3 foundation/shared_memory/eval.py
```

Before and after, record exact HEAD, branch, `git status --porcelain=v1 --untracked-files=all` hash, and each command's real exit code without a masking pipeline. Stop if the previously documented safety proof no longer holds.

Write only the existing FOUNDATION result and pointer files. Preserve the original xhigh audit/test disclosure and add a clearly separated `MAX_EFFORT_REVERIFICATION` record with actual model/effort, commands, exit codes, result counts, and Git invariance. Do not change any status classification or other evidence unless the max rerun directly contradicts it.

No source/config/schema/migration/flag/fixture/snapshot/generated/lockfile/runtime write; no DB/secrets/network/provider/fetch/branch/commit/push; no dispatch; no next mission. Return only the updated pointer to `foundation-advisor`, then STOP.
