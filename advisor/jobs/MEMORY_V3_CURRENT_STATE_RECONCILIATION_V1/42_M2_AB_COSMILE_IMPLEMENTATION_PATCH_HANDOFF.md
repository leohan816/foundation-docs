# M2 A/B — Cosmile Worker Bounded Implementation Patch Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-PATCH-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: cosmile Worker
TARGET_SESSION: cosmile
TARGET_WINDOW_ID: @1
TARGET_PANE_ID: %1
ROLE: Worker
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: Cosmile
TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
PATCH_BASE: b8f1c57502011dc7656ada91b3655432583be925
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git
EXPECTED_UPSTREAM: origin/shadow/m4-cosmile-memory

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
REVIEWED_DESIGN_COMMIT: 9530b221d4430d29bfb545702390ebc9e6606d6a
DESIGN_DELTA_REVIEW_COMMIT: 5ebcb39b1ecfaaef8d9e5d35ef0268558944bd27
IMPLEMENTATION_REVIEW_EVIDENCE_COMMIT: ada898e0212d2f36381b7609f9c612b53d1fa952
IMPLEMENTATION_REVIEW_VERDICT: NEEDS_PATCH

REQUIRED_SKILL: /fable-builder
IMPLEMENTATION_EFFORT: highest available code-reasoning mode; Fable 5 credits are exhausted, so preserve the same Worker/session/conversation and report the actual model
FINAL_TEST_AND_DIFF_AUDIT_EFFORT: max
PRODUCT_COMMIT_PERMISSION: YES
PRODUCT_PUSH_PERMISSION: YES — non-force, exact shadow branch only
FOUNDATION_DOCS_COMMIT_PERMISSION: NO — Advisor commits/pushes evidence
BRANCH_CREATE_SWITCH_MERGE_PERMISSION: NO
REAL_DB_SECRET_ENV_NETWORK_PRODUCTION: FORBIDDEN
C_IMPLEMENTATION_FOUNDATION_INTAKE_DELIVERY: FORBIDDEN
STOP_AFTER_RETURN: true
```

## 1. Purpose and exact delta

Patch only the three blocking findings from the independent implementation
review. Do not reopen the full 39-file implementation and do not implement the
non-blocking findings in this pass.

### IR-F1 — actor-scoped consent reads

- In both default Prisma query call sites, construct exactly one predicate for
  the non-null Actor identity.
- Never emit an `OR` branch containing `undefined` or `{}`.
- Prove with a cross-actor test that Actor A cannot resolve Actor B's
  same-service or cross-service grant, and that revocation targets only Actor
  A's latest grant.

### IR-F2 — pre-existing consent provenance

- When cross-service consent already exists, populate envelope
  `captured_at` and `notice_version` from the resolved effective grant row.
- Use request time/current notice only for a new grant created by the same
  submission.
- Add a regression test that distinguishes the historical grant timestamp and
  notice from request-time/current values.

### IR-F3 — feedback UI contract and accessibility

- Implement the reviewed modal/bottom-sheet contract in the existing feedback
  component: `role=dialog`, `aria-modal`, labelled heading, focus on open,
  focus trap, Escape close, origin-focus restoration, fieldset/legend radio
  semantics with keyboard operation, responsive sheet behavior, and no
  clipping at 200% text.
- Expose correction and retraction flows already supported by the API without
  adding raw text or new policy.
- Restore focus after recommendation dismiss as required by the reviewed
  design.
- Keep the B UI flag OFF by default. Do not add a client-side flag that enables
  server writes.

## 2. Required direct reads

Read directly before changing anything:

1. Agent Office operating model, Worker role, RUN_PROTOCOL, and
   RESULT_REPORTING_PROTOCOL.
2. Cosmile root/app `AGENTS.md`, `CLAUDE.md`, security, environment/migration,
   and TEST_MEANING_POLICY files from the original implementation handoff.
3. `/home/leo/Project/skill/fable-builder/SKILL.md` and the references routed
   by it for bounded patching and test design.
4. The reviewed design at commit `9530b221d4430d29bfb545702390ebc9e6606d6a`.
5. The complete implementation review result and pointer at foundation-docs
   commit `ada898e0212d2f36381b7609f9c612b53d1fa952`.
6. The current source and tests in the exact patch allowlist below.

Current Agent Office files define role authority. Historical foundation-docs
protocols are evidence only.

## 3. Preflight and preserved dirt

- Verify live Actor/session/model/effort/workspace and the same Worker
  conversation before starting.
- Product HEAD and local upstream must both be
  `b8f1c57502011dc7656ada91b3655432583be925` before work; do not fetch.
- The only pre-existing dirt may be the six previously recorded untracked
  `app/docs/*.md` files. Keep them byte-untouched, unstaged, and uncommitted.
- Stop on any tracked dirt, branch mismatch, Actor mismatch, or new unrelated
  file.

## 4. Exact product patch allowlist

Only these paths may change:

```text
app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts
app/src/app/api/commerce-evidence/consents/route.ts
app/src/lib/commerceEvidenceService.ts
app/src/components/feedback/PurchaseFeedbackPanel.tsx
app/src/components/slice/ConsultFoundationResult.tsx
app/src/lib/purchaseFeedbackState.ts
app/scripts/m2_ab_commerce_evidence.vitest.ts
app/scripts/m2_ab_feedback_state.vitest.ts
```

Do not modify schema, migrations, dependencies, environment, generated files,
the reviewed design, unrelated tests, or any non-blocking-finding path.

## 5. Tests before code and delta-only verification

1. Add failing regression tests for IR-F1, IR-F2, and the pure state shaping
   needed by IR-F3 before implementation. Record the expected red results.
2. Apply the smallest code delta that makes those tests pass without weakening
   any old assertion.
3. Run only the two directly affected suites first:

```text
npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
```

4. Then run the six previously approved provider-independent suites as the
   bounded regression set, the containment scanner, allowlist-scoped type
   classification, and `git diff --check`.
5. Inspect the IR-F3 component statically for dialog/radio/focus/Escape/
   responsive/200%-zoom behavior. If an existing safe local visual or browser
   harness can prove it without network, secrets, environment, persistent
   state, dependency installation, or artifact update, use it; otherwise
   record the exact manual/static evidence and limitation. Do not invent a
   build PASS.
6. Do not run `npm run build` because `.env.local` autoload safety is not
   proven. Do not run DB rehearsal because disposable PostgreSQL infrastructure
   is unavailable. These remain honest exclusions, not failures.
7. End-state diff must be only `PATCH_BASE..NEW_HEAD`; the later Reviewer will
   inspect only this delta plus the necessary load-bearing context.

## 6. Commit, evidence, and return

- At max effort, verify changed paths, staged paths, full patch, tests,
  containment, flags OFF, no product/evidence boundary expansion, and the six
  preserved untracked docs.
- Explicitly stage only the exact changed allowlist paths. Never use blanket
  staging.
- Create one follow-up product patch commit; do not amend or rewrite
  `b8f1c575`.
- Non-force push only to `origin shadow/m4-cosmile-memory` and verify the local
  tracking ref contains the commit without fetching.
- Write only these new foundation-docs artifacts; do not stage, commit, or
  push them:

```text
runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_PATCH_RESULT.md
runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_PATCH_RESULT_POINTER.md
```

The result must list the old/new product heads, exact changed paths, each
IR-F1..F3 disposition, red-before/green-after evidence, safe regression results,
excluded checks, actual model/effort/skill, Git push evidence, zero forbidden
access, and the exact delta-review base/head. Return only the compact pointer to
`foundation-advisor` and STOP. Do not dispatch Reviewer or begin C.
