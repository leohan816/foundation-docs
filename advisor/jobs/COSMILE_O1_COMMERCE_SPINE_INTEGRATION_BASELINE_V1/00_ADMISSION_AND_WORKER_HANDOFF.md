# Advisor Admission and Cosmile Worker Handoff

```text
MISSION_ID: COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
FOUNDER_AUTHORIZATION: APPROVED_BY_LEO
ADVISOR: foundation-advisor
WORKER_ACTOR: cosmile
WORKER_SESSION: cosmile:0.0
INSTRUCTION_GATE: PROCEED_WITH_LIMITS
MISSION_TYPE: INTEGRATION_BASELINE_VERIFICATION_WITH_BOUNDED_CORRECTION_ONLY
PRODUCT_FEATURE_ADDITION: NO
COUNCIL: NOT_USED
DESIGNER: NOT_USED
CONTROL: NOT_USED
```

## Verified admission facts

```text
REPOSITORY: /home/leo/Project/Cosmile
REVIEWED_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
REVIEWED_HEAD: 94693d26cec3c2e9ac830e9d2c2f6235dcf4c011
REVIEWED_UPSTREAM_AHEAD_BEHIND: 0/0
REVIEWED_WORKTREE: CLEAN
DRAFT_PR: https://github.com/leohan816/Cosmile/pull/2
DRAFT_PR_STATE: OPEN_DRAFT
REVIEWED_FINAL_POINTER_COMMIT: d61aae109bf3089a9f3d017483d9cb79af55d721
REVIEWED_FINAL_POINTER_BLOB: bf396fc9e0d623816f10b396fd440efaa5c7261f
REVIEWED_FINAL_POINTER_SHA256: 8c24e4c7a22875e37e22bc22fe78c9187fc3080bbf0d0061a2829262c4058a74
PREDECESSOR_REVIEW_VERDICT: PASS
PREDECESSOR_ADVISOR_AUDIT: PASS
PREDECESSOR_CLAIM:
REVIEWED_BROWSER_BASED_NON_PRODUCTION_GOLDEN_ORDER_AND_GOLDEN_REVERSAL_EVIDENCE
```

## Exact assignment

```text
TARGET_WORKTREE:
/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
TARGET_BRANCH:
integration/cosmile-o1-commerce-spine-baseline-v1-20260719
START_HEAD:
94693d26cec3c2e9ac830e9d2c2f6235dcf4c011
EXPECTED_MODEL: Opus 4.8
EXPECTED_EFFORT: max
EXPECTED_ROLE: Cosmile repository-owner Worker
REQUIRED_SKILL: /fable-builder
```

Before work, read the current Agent Office operating model, Worker role, run and
result protocols, Cosmile `AGENTS.md`, Cosmile `CLAUDE.md`, and this exact
committed handoff. Confirm the live actor/session/model/effort/CWD and that no
sub-agent, delegated context, or substitute Worker is used.

## Verification pass — no product writes

The first pass is verification-only. Product source writes are not authorized in
this pass.

1. Reverify repository, branch, exact start HEAD, remote, worktree cleanliness,
   and absence of unrelated dirt.
2. Inspect `app/package.json`, `app/vitest.config.ts`, and versioned O1 design and
   evidence references to identify the repository-defined gate. Do not invent a
   package script.
3. From `app/`, with existing dependencies only and no install:
   - run `npx prisma generate`;
   - run one complete current-HEAD TypeScript check using the repository's
     applicable compiler invocation;
   - run `npm run build` once as the non-production build gate;
   - run the canonical complete Vitest gate once if repository evidence supports
     it; otherwise record that no canonical full-suite command exists and run the
     complete O1 and directly integrated contract set, enumerating every file.
4. Inspect source and tests to trace separation between O1 and:
   - mock login;
   - mock payment completion;
   - legacy checkout;
   - legacy admin order-status mutation.
5. Determine whether any legacy/mock route can silently bypass O1 identity,
   payment/refund, inventory, or reconciliation truth.
6. Do not run DB tests, migrations, runtime/browser/provider calls, sandbox/live
   payment, or any command requiring a secret, credential, PII, network provider,
   production/shared DB, or environment mutation.
7. Capture pre/post Git status. Generated ignored output is allowed only when
   attributable to the exact command and must not create tracked drift.
8. If all gates pass with no product correction, push the mission branch at the
   unchanged candidate HEAD and report it.
9. If a gate fails or a bypass exists, do not edit yet. Return the exact failure,
   proposed minimal changed paths, affected contract, and focused correction test
   to Advisor. Advisor will issue a bounded correction instruction if it remains
   inside Founder scope.

## Verification policy

```text
INITIAL_BASELINE_GATE: RUN_ONCE
DELTA_ONLY_VERIFICATION_AFTER_ANY_CORRECTION: REQUIRED
FULL_SUITE_AFTER_CORRECTION: PROHIBITED
FULL_BUILD_AFTER_CORRECTION: PROHIBITED_UNLESS_CHANGED_PATH_MATERIALLY_REQUIRES_IT
```

Never rerun the one-time complete gate after a small correction. A correction
must use only the exact focused test and materially affected type/build check.
If broader verification appears necessary, stop and return exact cross-cutting
evidence to Advisor before running it.

## Strict exclusions

- no new product feature or design;
- no storefront redesign, broad rewrite, unrelated cleanup, legacy deletion, or
  opportunistic refactor;
- no schema/migration change or DB access;
- no production, shared service, provider, secret, credential, PII, live payment,
  public exposure, or deployment;
- no webhook implementation/expansion, cancellation/return, partial refund,
  additional PSP/identity provider, guest checkout, Foundation/SIASIU/Memory
  work, US/USD, merge, force push, or next mission;
- no test weakening, snapshot laundering, or fabricated PASS;
- no Reviewer dispatch or self-review.

## Evidence outputs

Worker authors only these two files in the named foundation-docs worktree;
Advisor alone stages, commits, and pushes them:

```text
FOUNDATION_DOCS_WORKTREE:
/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
RESULT_PATH:
runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/10_WORKER_BASELINE_RESULT.md
POINTER_PATH:
runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/11_WORKER_BASELINE_POINTER.md
```

The result must include exact commands/outcomes/counts, test inventory, collision
findings, changed paths, preserved failures/unknowns, Git state, branch push
state, exclusions, and any requested correction. Do not include secrets, PII,
identifiers, raw environment values, or provider bodies.

```text
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP_AFTER_RESULT: YES
```
