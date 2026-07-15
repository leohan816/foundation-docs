# M2 A/B — Cosmile Worker Implementation Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-001
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
BASELINE_COMMIT: 6e44aa40ffb2960573839a01424761dc5e98d610
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git
EXPECTED_UPSTREAM: origin/shadow/m4-cosmile-memory

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
FOUNDER_DECISION: advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/24_M2_FOUNDER_D1_D3_DECISION.md
CONTROL_CONTRACT_COMMIT: 73889c86f5170cfe20718a237dff989d52960c9f
REVIEWED_DESIGN_COMMIT: 9530b221d4430d29bfb545702390ebc9e6606d6a
DESIGN_DELTA_REVIEW_COMMIT: 5ebcb39b1ecfaaef8d9e5d35ef0268558944bd27
DESIGN_VERDICT: PASS

IMPLEMENTATION_EFFORT: ultracode
FINAL_TEST_AND_DIFF_AUDIT_EFFORT: max
REQUIRED_SKILL: /fable-builder

PRODUCT_COMMIT_PERMISSION: YES
PRODUCT_PUSH_PERMISSION: YES — non-force push only to the exact shadow branch
FOUNDATION_DOCS_COMMIT_PERMISSION: NO — Advisor commits/pushes evidence
BRANCH_CREATE_SWITCH_MERGE_PERMISSION: NO
TEST_EXECUTION: ONLY THE SAFE CHECKS DEFINED BELOW
EPHEMERAL_DATABASE_REHEARSAL: AUTHORIZED_WITH_PRECONDITIONS
REAL_TARGET_DB_ACCESS: NO
PRODUCTION_OR_LIVE_ACCESS: NO
```

## 1. Authority and scope

Implement only the Founder-authorized Cosmile A/B subset after the reviewed
design gate:

- A: contained write-only outbox hardening, payload minimization, purchased
  line-item reference, consent-state representation, idempotency, provenance,
  append-only correction/audit, retention representation, fail-closed behavior,
  flags OFF by default, local/non-prod/shadow only.
- B: purchased-line closed-choice satisfaction/adverse feedback, deterministic
  versioned provider-independent normalization, Cosmile-owned commerce evidence
  envelope, and safe enqueue into the contained producer-only outbox.
- Valid identified+elected+granted skin/other low/moderate/severe adverse
  evidence may enqueue locally; severe also raises local human review; unknown
  severity creates no outbox row. Adverse outbox expiry stays null with
  `duration_unconfigured`.
- RecommendationEvent is the recommendation lifecycle authority; CommerceEvent
  remains the operations/analytics ledger; producer-time pairing and
  deterministic idempotency prevent double counting.

Do not implement C, full Package 1B, delivery, Foundation intake, candidate
creation, memory promotion, ranking/safety mutation, production, or live
activation.

## 2. Required direct reads

Read directly before any write:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/worker.md`
3. `/home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md`
4. `/home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md`
5. `/home/leo/Project/Cosmile/AGENTS.md`
6. `/home/leo/Project/Cosmile/CLAUDE.md`
7. `/home/leo/Project/Cosmile/app/AGENTS.md`
8. `/home/leo/Project/Cosmile/app/CLAUDE.md`
9. `/home/leo/Project/Cosmile/app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`
10. `/home/leo/Project/Cosmile/app/docs/security/ENV_AND_MIGRATION_POLICY.md`
11. `/home/leo/Project/Cosmile/app/docs/testing/TEST_MEANING_POLICY.md`
12. Founder decision, Control contract, reviewed Designer result/pointer at
    `9530b221d4430d29bfb545702390ebc9e6606d6a`, and PASS delta-review result/
    pointer at `5ebcb39b1ecfaaef8d9e5d35ef0268558944bd27`.
13. `/home/leo/Project/skill/fable-builder/SKILL.md` and its routed references
    `contract-to-code-mapping.md`, `test-design-before-code.md`,
    `implementation-execution.md`, and `implementation-report-template.md`.
14. Current source files in the allowlist and the relevant local Next.js docs in
    `app/node_modules/next/dist/docs/` before using a changed Next.js API.

The old foundation-docs V2 role protocol mentioned by nested project entry
files is historical evidence only. Current role/routing authority is Agent
Office plus this exact handoff. This clarification does not expand product
scope.

## 3. Pre-existing dirt to preserve

The tracked worktree is clean at baseline. These six pre-existing untracked
files must remain byte-untouched, unstaged, and uncommitted:

```text
app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md
app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md
app/docs/COSMILE_MEMORY_INVENTORY_20260704.md
app/docs/FOUNDATION_DOCS_SYNC_POLICY.md
```

Starting `git status --porcelain=v1` hash:
`90210e452ce5bbef5ba271122b55ad1755d4dedd7fca310bd1f08f12291d0939`.

Stop if any tracked dirt exists before work or if any pre-existing untracked
file overlaps the implementation.

## 4. Exact product-repository allowlist

Touch no product path outside this list.

Canonical product design document — create first, before any code change:

- `설계자료/COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md`

Schema and migration:

- `app/prisma/schema.prisma`
- `app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/migration.sql`
- `app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/down.sql`

Types and pure contracts:

- `app/src/types/commerceEvent.ts`
- `app/src/types/recommendationEvent.ts`
- `app/src/types/recOutcome.ts`
- `app/src/types/commerceEvidence.ts`
- `app/src/lib/ids.ts`
- `app/src/lib/attribution.ts`
- `app/src/lib/commerceEvidenceNormalizer.ts`
- `app/src/lib/purchaseFeedbackState.ts`
- `app/src/lib/recommendationClientContext.ts`

Server/domain services:

- `app/src/lib/commerceEventService.ts`
- `app/src/lib/recommendationEventService.ts`
- `app/src/lib/recOutcomeEventService.ts`
- `app/src/lib/commerceEvidenceService.ts`
- `app/src/lib/foundationSignalMapper.ts`
- `app/src/lib/cart.ts`
- `app/src/lib/checkout.ts`

API routes:

- `app/src/app/api/recommendations/present/route.ts`
- `app/src/app/api/recommendations/[recommendationId]/events/route.ts`
- `app/src/app/api/cart/items/route.ts`
- `app/src/app/api/wishlist/toggle/route.ts`
- `app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts`
- `app/src/app/api/commerce-evidence/consents/route.ts`
- `app/src/app/api/checkout/mock-complete/route.ts`

UI:

- `app/src/lib/slice/consultFoundationView.ts`
- `app/src/components/slice/ConsultationChatShell.tsx`
- `app/src/components/slice/ConsultationMessageList.tsx`
- `app/src/components/slice/ConsultFoundationResult.tsx`
- `app/src/components/product/AddToCartButton.tsx`
- `app/src/components/product/WishlistButton.tsx`
- `app/src/components/feedback/PurchaseFeedbackPanel.tsx`
- `app/src/app/orders/[orderId]/page.tsx`

Tests and rehearsal:

- `app/scripts/v3_11.vitest.ts`
- `app/scripts/v3_11c_rec_event.vitest.ts`
- `app/scripts/v3_11c2_rec_outcome.vitest.ts`
- `app/scripts/m2_ab_recommendation_lifecycle.vitest.ts`
- `app/scripts/m2_ab_commerce_evidence.vitest.ts`
- `app/scripts/m2_ab_feedback_state.vitest.ts`
- `app/scripts/m2_ab_no_transport.mjs`
- `app/scripts/m2_ab_migration_rehearsal.dbtest.py`

No package manifest, dependency, historical migration, generated lockfile,
memory-candidate file, environment file, Foundation/SIASIU file, or legacy
untracked document is allowed.

## 5. Exact foundation-docs write scope

Worker may write only these three evidence/mirror paths and may not stage,
commit, or push foundation-docs:

- `설계문서/cosmile/COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md`
- `runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_RESULT.md`
- `runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_RESULT_POINTER.md`

The mirror must be byte-identical to the final product design document and the
result must record both SHA-256 values. Advisor will independently inspect and
commit/push these three paths after return.

## 6. Required execution sequence

1. Verify the live Actor/session/model/effort/workspace, exact product repo,
   branch, baseline HEAD, origin/upstream, tracked-clean state, and pre-existing
   untracked set. Load `/fable-builder`. No new agent/sub-agent or delegated
   context.
2. Pin the reviewed design and review commits. Create the canonical product
   design document first, with version/date/change history and the exact review
   anchors, without changing substantive policy.
3. Before code, write a contract-to-code mapping table covering every reviewed
   contract field, lifecycle transition, key propagation, safety precedence,
   DB/API/event/test landing, and explicit deferred field. Put the table in the
   canonical product design document. Any blank landing is a STOP and returns
   to Designer through Advisor.
4. Add failing tests before corresponding implementation. Record the expected
   initial failures and classify them under TEST_MEANING_POLICY; do not weaken an
   assertion, refresh a snapshot, delete a case, or add a skip to obtain green.
5. Implement the smallest safe diff in the reviewed §9 order: additive
   schema/migration and rollback; recommendation lifecycle and atomic pairs;
   context propagation and attribution; consent/evidence/lineage/retention/
   contained outbox; API/UI. Reuse canonical ID/enum helpers; no duplicate
   generator or vocabulary.
6. Keep cart/wishlist product mutations outside and before the atomic evidence
   pair. Evidence failure must not roll back the product mutation and must return
   only sanitized `canonicalEvidenceStatus=failed_closed`.
7. Keep all three flags OFF by default. No `NEXT_PUBLIC` flag may enable server
   writes. No env file may be changed or read for secrets.
8. Switch effort to `max` immediately before the final test/diff/security audit.
   Record the live confirmation. Run only the checks whose isolation is proven.
9. Inspect full diff and changed-path list; run reward-hacking/static containment
   scans; verify the six unrelated files remain untouched and unstaged.
10. Only if mandatory safe checks pass and no STOP exists: explicitly stage only
    changed product allowlist paths; inspect staged names and diff; commit with
    repo-required no-verify/GPG-safe form and required trailer; non-force push
    only to `origin shadow/m4-cosmile-memory`; verify remote branch contains the
    commit. Never merge or touch `main`.
11. Write the exact result, pointer, and byte-identical design mirror. Return the
    pointer to `foundation-advisor` and STOP. Do not dispatch Reviewer.

## 7. Safe final checks

From `/home/leo/Project/Cosmile/app`, after verifying no command reads a real
DB, secret, provider, or network:

```text
npx vitest run scripts/v3_11.vitest.ts \
  scripts/v3_11c_rec_event.vitest.ts \
  scripts/v3_11c2_rec_outcome.vitest.ts \
  scripts/m2_ab_recommendation_lifecycle.vitest.ts \
  scripts/m2_ab_commerce_evidence.vitest.ts \
  scripts/m2_ab_feedback_state.vitest.ts
node scripts/m2_ab_no_transport.mjs
npx tsc --noEmit
npm run build
```

All A/B flags must be OFF and no external DB/provider/network access may occur.
If build safety cannot be proved, report `NOT_RUN_SAFETY_UNPROVEN` rather than
guessing.

Ephemeral migration rehearsal is permitted only if all of these are proved
before execution:

- an already-local Postgres runtime/image is available without network pull;
- a fresh disposable database/container with a random local port is created;
- no named/persistent Docker volume and no existing database are used;
- the connection string is synthetic and scoped only to that disposable
  process; no `.env` is read or changed;
- RecommendationEvent row count is zero before the PK correction;
- forward/down/forward and rollback preconditions are exercised;
- cleanup removes the disposable container/database; product Git status remains
  unchanged after the run.

If any condition is not provable, mark the rehearsal `SKIP_INFRA_UNAVAILABLE`.
SKIP is never PASS. Never connect to, query, or migrate a real target database.

## 8. Completion criteria

- Canonical design doc exists first and has a byte-identical foundation-docs
  mirror plus complete contract-to-code mapping.
- Reviewed A/B recommendation lifecycle, deterministic normalization, separate
  consent/election, correction/retraction/lineage, retention representation,
  evidence envelope, and contained producer-only outbox are implemented exactly
  within the allowlist.
- Recommendation/card generic baseline, flags-OFF behavior, no-double-counting,
  product-mutation-vs-evidence atomicity, refunded feedback eligibility,
  scoped idempotency, adverse raise-only behavior, and privacy responses match
  the reviewed design.
- No consumer/delivery/Foundation intake, C runtime, candidate writer/call,
  raw/free text, external provider, identity auto-link, production/live path, or
  flag activation exists.
- Mandatory safe pure/API/UI/static/type/build checks pass, with each test layer
  labeled honestly. Ephemeral DB rehearsal is PASS or explicit SKIP, never
  silently counted as PASS.
- Product diff contains only allowlisted files; pre-existing untracked files are
  byte-untouched and uncommitted; product commit is on the exact shadow branch
  and non-force pushed to its exact upstream.
- Durable result/pointer identifies exact proof, non-proof, residual risk,
  product commit/push, and foundation-docs evidence paths.

## 9. Hard STOP / forbidden scope

Stop and return evidence immediately for:

- Actor/session/workspace/branch/HEAD/origin/upstream mismatch;
- overlapping tracked dirt or any need to touch outside the allowlist;
- any RecommendationEvent row in disposable migration preflight;
- a contract field, nullability, enum, lifecycle, consent, retention, identity,
  or safety meaning not fixed by the reviewed design;
- a new dependency or package/lockfile change;
- secret/env/PII/raw user/order/payment identifier exposure;
- real DB, persistent/staging/prod DB, production/live, public exposure,
  protected/main branch, merge, force push, or flag activation;
- outbox consumer/sender/flush/retry/timer/cron/network/Foundation intake;
- MemoryFactCandidate, adverse candidate, promotion, ranking, or safety mutation;
- generated medical advice, raw text, external semantic provider, auto identity
  linking, new session source, retention duration, legal decision, or new consent
  purpose;
- repeated failure escalation or a desire to weaken test meaning;
- authentication/approval prompt or inability to verify push/ancestry/evidence.

M2 C implementation/delivery/intake and full Package 1B remain unauthorized.
No next work unit starts automatically.

## 10. Required result contract

Write:

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_IMPLEMENTATION_RESULT_POINTER.md
MIRROR_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/설계문서/cosmile/COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md
```

Use the fable-builder implementation report template and Agent Office result
protocol. Include the contract-to-code mapping, changed/unchanged file lists,
initial failing-test evidence, final commands/results by layer, test-oracle
change audit, ephemeral DB status, static containment evidence, product commit,
remote push verification, remaining dirt, exact mirror hash equality, what was
proved/not proved, residual risks, at least three independent-review attack
questions, rollback, and:

```text
PRODUCT_REPO_WRITE_STATUS: ALLOWLIST_ONLY
REAL_TARGET_DB_ACCESS: ZERO
SECRET_ENV_PII_ACCESS: ZERO
PRODUCTION_LIVE_ACCESS: ZERO
FEATURE_FLAG_ACTIVATION: ZERO
OUTBOX_DELIVERY_OR_CONSUMER: ZERO
FOUNDATION_INTAKE: ZERO
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP_AFTER_RETURN: true
```

Do not claim independent PASS or final approval. Return only the compact pointer
to `foundation-advisor` and STOP.
