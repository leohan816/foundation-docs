# Independent Full Review Handoff

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
REVIEW_ID: COMMERCIAL_BASELINE_P1_P4_FULL_REVIEW_1
REVIEW_PASS: FULL_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
ACTOR: foundation-reviewer-fable5
SESSION: foundation-reviewer-fable5
WINDOW: @5
PANE: %5
WORKSPACE: /home/leo/Project/FOUNDATION
ACTUAL_MODEL: Fable 5 (live session evidence)
EFFORT: max
REQUIRED_SKILL: /fable-sentinel
INDEPENDENCE: separate session; no authorship or implementation in subject
SUBJECT_BRANCH: advisor/foundation-cosmile-commercial-baseline-v1-20260717
SUBJECT_COMMIT: 24ee89f44989bdd37cb04a8e2abb29b9932ce1ac
EVIDENCE_CEILING: E2_STATIC_ONLY
```

## Current authority reads

Read directly before reviewing:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
- `/home/leo/Project/FOUNDATION/AGENTS.md`
- `/home/leo/Project/FOUNDATION/CLAUDE.md`
- the exact Strategy handoff at commit `c94c122ebcbe8d9acfbc76566ada85021ad95f6a`

## Immutable subject

Read every subject file from Git at `SUBJECT_COMMIT`, not from mutable working-tree
state.

| File | Blob | SHA-256 |
|---|---|---|
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/AUTHORITATIVE_EVIDENCE_ROWS.md` | `cd859a09a7a11fa9f2c637e35e5c43cd777d59eb` | `d75afe1a43971497994865b37b362a3b9b8b19d61cf1e97d0281124ef118fb20` |
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P1_AUDIT_MANIFEST_AND_CLOSURE_RECORD.md` | `7723825cb1438b1cd56c42c8667cd667853778b7` | `ef939a3d77f8a5588a2c1d78318d7fc554f433124c655b4f7ca68c57748bd411` |
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P2_CAPABILITY_EVIDENCE_MATRIX.md` | `e84cfe1b0c66002f9df8c2ffaa749ac06ce4cf31` | `78ae0525277065012e833b97ab9ec88723fabfae343311295728df1355d3eb21` |
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P3_RELEASE_GATE_AND_BLOCKER_MATRIX.md` | `18eda89b4b75005b0db6c982a35db9ae54c2e755` | `0dcdded6a70f6e7ceb78b859f81564b247b19e60d5be691a2974e6ac7236da6d` |
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P4_DELIVERY_AND_DECISION_PACKAGE.md` | `024f35275912fd1f1dd2d0f57731b6fc1a1ad17e` | `7d4ef82790bca1e438edf1a5e7460ce9f21b53581a3c8cf142c0b5514797d83c` |
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_OPTION_AND_DECISION_GATE.md` | `b62249117e2f5b83c7a89f44e64f592f996e205f` | `c79ae0e05f2b3ae81aa5f9c15bc17b73bc4f75f1fa172eb0cec153c8cbe91291` |
| `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY3_CHECKPOINT.md` | `11be136896ea109f26a54757eb9bf945b16ccf42` | `9f70464301bc4081d3e79ecf2b619c24c1646c4a36f016c9dfc41a1d182a3c33` |

## Source evidence

Independently inspect the published actor-owned evidence at commit
`6cf253c9e04890ac7b512a5bbb7a48b07af807f8`. Verify the integrated rows and
projections against those sources, current role authority, and the pinned repository
commits using read-only Git object inspection only.

## Required review criteria

1. exact authority, subject, branch, blob, hash, and repository pins;
2. product/Control write zero and preservation of pre-existing untracked files;
3. source-claim fidelity and no silent evidence-level promotion above E2;
4. completeness of the selected customer/operator critical slice;
5. correct separation of mock, partial, source-only, shadow, missing, obsolete, and
   unverified states;
6. physical location/runtime provider versus canonical owner/current actor authority;
7. Control historical implementation not treated as current Worker authority;
8. SIASIU boundary remains bounded and no unsupported dependency claim is made;
9. blocker counts, gate verdicts, workarounds, conditional blockers, and no-build list;
10. Paid Beta options and the commerce-first recommendation follow from evidence without
    selecting policy or accepting risk;
11. workday and elapsed-time ranges are internally coherent, assumption-labeled, and not
    represented as commitments;
12. branch recommendation is evidence-supported and performs no branch movement;
13. external/vendor/Legal/operations facts remain explicit unknowns;
14. Memory V3 pause and all mission exclusions remain intact;
15. the package answers the intended release-planning decision and is decision-ready.

## Verdict and correction routing

Return exactly one:

```text
PASS
NEEDS_PATCH
PASS_WITH_RISK
FAIL
```

For every finding include ID, severity, exact file/claim, source evidence, required
correction, and whether it is blocking. On `NEEDS_PATCH`, do not patch: return named
findings to `foundation-advisor`. The original author must correct only the named delta,
and this same Reviewer reviews only the declared old-subject-to-new-subject delta.

Write only:

```text
RESULT_PATH: runs/foundation-reviewer-fable5/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/80_FULL_REVIEW_RESULT.md
POINTER_PATH: runs/foundation-reviewer-fable5/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/80_FULL_REVIEW_POINTER.md
RETURN_TO: foundation-advisor
```

Do not patch, stage, commit, push, dispatch, implement, accept risk, approve release,
or begin another mission. Stop after returning the pointer.
