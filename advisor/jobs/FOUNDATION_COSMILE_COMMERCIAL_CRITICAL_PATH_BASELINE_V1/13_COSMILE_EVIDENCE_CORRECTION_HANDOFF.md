# Bounded Pre-Review Evidence Correction — Cosmile

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
CORRECTION_ID: COSMILE_PRE_REVIEW_EVIDENCE_CORRECTION_1
ORIGINAL_AUTHOR: cosmile
RESPONSIBLE_ADVISOR: foundation-advisor
MODE: SAME_AUTHOR_BOUNDED_E2_CORRECTION
RETURN_TO: foundation-advisor
```

Correct only the following named evidence defects in the actor-owned result. This is evidence completion before the immutable P1-P4 full review; it grants no product authority and invokes no Reviewer.

## Frozen original

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/cosmile/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_COSMILE_STATIC_AUDIT_RESULT.md
ORIGINAL_RESULT_SHA256: fae38260f0fb7704b412ad3d07a11511a916bc8b72dad54cbc2e25f6073edd27
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/cosmile/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_COSMILE_STATIC_AUDIT_POINTER.md
SUBJECT_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
```

## Named corrections

1. `SESSION_MODEL` conflicts with the Advisor's dispatch-time live UI observation (`Fable 5`). Use the agent's live status mechanism now and record the exact actual current model without inference. Keep the dispatch effort `high` and `/fable-builder` evidence.
2. `E3-01` incorrectly defers password hashing algorithm/strength entirely to execution. Statically inspect committed `app/src/lib/console/password.ts` and the exact committed console-login/auth route(s) that invoke it. Record what E2 establishes and retain only genuinely dynamic claims as later E3.
3. `E3-03` similarly treats brute-force/rate-limit/lockout behavior as wholly dynamic. Statically inspect the committed login/auth entry path for source-defined controls and record present/absent/unverified accurately at E2; defer only dynamic effectiveness.
4. Update any affected R10, blocker/debt, unknown/E3 request, file-read, and summary wording. Do not change unrelated evidence rows or conclusions.
5. Recompute `RESULT_SHA256` and update the pointer. Add a correction note listing old SHA, exact changes, new SHA, and `NO_UNRELATED_CHANGES: YES`.

## Boundaries

- Read only committed Git objects at the same subject head.
- Write only the same result and pointer paths.
- No product write, build, lint, test, runtime, DB, endpoint, network, secret-value read, commit, push, dispatch, review, or next mission.
- Preserve all six product untracked entries untouched.

Return the updated pointer to `foundation-advisor` and STOP.
