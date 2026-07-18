# Independent Reviewer Handoff — Cosmile WU-G Golden Reversal

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-G captured-payment Golden Reversal script-only non-production candidate
REVIEW_PASS: IMPLEMENTATION_REVIEW
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Exact pins and independence

```text
PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_BASE_HEAD: c6e793d3459bc16c520bd09dbe739bf4306bdb40
CANDIDATE_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4
CANDIDATE_EXPECTED_PARENT: c6e793d3459bc16c520bd09dbe739bf4306bdb40
CANDIDATE_PUSH_STATUS: NOT_PUSHED
EXPECTED_UPSTREAM_HEAD: c6e793d3459bc16c520bd09dbe739bf4306bdb40
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

FOUNDATION_SNAPSHOT_WORKTREE: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_SNAPSHOT_REVIEWED_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_HANDOFF_COMMIT: <this handoff commit>
WORKER_EVIDENCE_COMMIT: 9d4280cba497af9cf515d7b440d0d95794d4185b
WORKER_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/90_COSMILE_WUG_RESULT.md
WORKER_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/90_COSMILE_WUG_POINTER.md
IMPLEMENTATION_HANDOFF_COMMIT: e003d41bc25aec0caa684977acc654138ef5d72a
WU_F_REVIEW_COMMIT: dc4ebaf508be56bf2da5a1a2ff856939a00b6798
WU_F_REVIEW_VERDICT: PASS
REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
```

Before review, live-verify session/model/effort/skill/CWD/independence, pane synchronization OFF,
no overlapping review, every Git pin, clean product state, exact unpushed ancestry, and untouched
Foundation snapshot lane. Re-read the current Agent Office Reviewer role and Cosmile rules. Treat
Worker evidence and test names as claims, not proof. Do not patch, stage, commit, push, dispatch,
request credentials, accept risk, start integrated review, or begin another mission.

## Exact candidate path boundary

The base-to-candidate diff must contain exactly four additive files:

- `app/scripts/o1_golden_reversal_harness.ts`
- `app/scripts/o1_golden_reversal.vitest.ts`
- `app/scripts/o1_golden_reversal.dbtest.py`
- `app/scripts/o1_golden_reversal.sandbox.vitest.ts`

No existing WU-F/WU-B/WU-E file, route, UI, component, package, lockfile, schema, migration,
generated client, configuration, runtime/provider path, Foundation, SIASIU, control, or unrelated path.

## Founder-frozen boundary

- This is a separate captured-payment full-refund rehearsal, not a pre-capture void and not a generalized
  refund/returns product. It must start from a fresh distinct Golden Order and payment key.
- It composes the final reviewed WU-F order, WU-B full-refund service/adapter, WU-E refund finalization,
  and unchanged WU-F sandbox transport. It must not redefine money/refund/order/inventory/authorization truth.
- Runtime step-up remains unconfigured deny-all. Explicit grants are test/harness-only, exactly bound,
  single-use already-decided verdicts; they are not a live authorization mechanism.
- Inventory remains committed/HOLD. No automatic release, stock increment, sellable restoration, return
  receipt, restock, partial refund, courier, or customer-facing runtime.
- Official Toss execution remains a distinct credential-gated layer and may honestly be
  `NOT_RUN_CREDENTIAL_GATE`.
- No real payment, live credential, real PII, production, public sale, Controlled Live, Paid Beta,
  Foundation/SIASIU AI, Memory V3, later WorkUnit, or automatic next mission.

## Required direct determinations

### A. Separate captured-order prerequisite and composition fidelity

Trace the complete harness. Verify it creates a fresh WU-F Golden Order on a fresh world and distinct
payment key, reaches one exact succeeded capture/paid order/committed reservation/paid history, and only then
begins reversal. Ensure it cannot refund an absent, failed, mismatched, partial, or pre-capture transaction.
Inspect whether it invokes actual reviewed `refundFullCapture` and `finalizeRefundToOrder` contracts rather
than replacing their policy/validation/state semantics.

The WU-G in-memory refund-finalization mirror is load-bearing. Compare it field-for-field and branch-for-branch
against the reviewed WU-E `OrderRepository.finalizeRefund`: exact order/capture/refund/idempotency/amount/KRW
bindings, durable-refund status, one succeeded full-refund transaction, order lock/state, committed-inventory
coherence, replay, reconciliation, history, audit, and error behavior. Decide whether it is a faithful test port
mirror or an impermissible competing truth/semantic shortcut.

### B. WU-B full-refund/provider truth

Verify the harness exercises the actual WU-B full-only path and existing Toss V2 cancel adapter:

- one exact full captured amount, KRW, order, capture transaction and payment key;
- no `cancelAmount`, partial refund, void, alternate provider, webhook/client truth, retry loop, or second call;
- durable refund only after `CANCELED`, zero balance, exact payment key and distinct nonblank cancel reference;
- timeout, partial/incomplete, missing ref, wrong key/amount/order/capture, unknown state, provider error, and
  provider-success/internal-write failure all HOLD/reconcile without false completion or false terminal failure;
- provider idempotency derives from durable internal refund identity and replay returns before provider I/O;
- one active/full refund per capture and no second provider/economic effect.

### C. Step-up, order finalization, inventory and projections

Attack both privileged transitions. Verify the runtime default denies everything and the test-only grants are
exactly bound to action/ref/role/order/reason/freshness, distinct where the single-use contract requires two
transitions, and cannot reuse consumed freshness. Wrong role/action/scope/reason/freshness and malformed input
must cause zero provider/product mutation.

Verify WU-E re-reads exact durable full-refund truth before projecting one refunded order/history/audit outcome.
Inventory must be committed before and after refund; any incoherence must HOLD/reconcile, never restore or falsely
finalize. Customer and operator projections must agree on refunded status. Replay must produce zero second provider
cancel, refund record/transaction, order/history/audit, inventory, or reconciliation effect.

### D. Evidence separation, claim ceiling and leakage

The deterministic fake must never be described as official sandbox proof. The official sandbox block must be
default-fail-closed and require one-shot mode, TEST secret, a fresh separately captured test payment key/full amount,
synthetic identity, no-live and no-PII. It must reuse WU-F transport unchanged, never manufacture/reuse a capture,
and perform zero network call when any gate is absent. No pre-capture void can close Golden Reversal.

The evidence DTO may contain categories/counts/booleans/timestamps only and must carry all required non-claim flags.
Attack happy/failure serialization, thrown errors, test output and fixtures for secret/auth/paymentKey/orderNo/
idempotency/refund-reference/operator/freshness/identity/raw-PII/provider-body/SQL/digest/path leakage. State any
synthetic executable-fixture exception explicitly. The claim ceiling is one bounded non-production walking-skeleton
reversal; not merchant eligibility, live/production, Legal/return policy, reliability, Controlled Live, or Paid Beta.

### E. Disposable PostgreSQL proof and parity limit

Inspect and reproduce only after safety preflight. Verify already-local image, no pull, no host/public port,
tmpfs/no shared volume, synthetic data/transient credentials, exact committed WU-0+WU-E migrations, blocking
`finally` cleanup and post-removal absence. Verify the SQL twin directly proves captured order -> durable full
refund -> refunded order, exact bindings, committed/HOLD inventory, history/audit, replay zero effect, and selected
failure/reconciliation branches. The twin is independent evidence, not proof that TypeScript repositories executed
against PostgreSQL. Decide whether the documented generated-client split is bounded or blocking.

### F. Direct reproduction and containment

When safety preflight passes, reproduce:

```text
cd app
npx vitest run scripts/o1_golden_reversal.vitest.ts
python3 scripts/o1_golden_reversal.dbtest.py
npx vitest run
npx vitest run scripts/o1_golden_reversal.sandbox.vitest.ts
```

The last command may run only in default no-credential/no-network mode. No install, Prisma generation, image pull,
external network, shared/real/target DB, provider contact, credential, PII, real payment, route, activation, or
unrelated write. Record exact counts, pre/post Git state, resource identity/containment/cleanup and attributable
temporary symlink/cache removal. Cleanup failure is blocking. `tsc`/build may remain honestly unrun only if the
pinned generated-client boundary makes it unsafe; classify the residual.

## Verdict contract

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

Mission-facing mapping:

```text
PASS -> PASS
NEEDS_PATCH -> PASS_WITH_CORRECTIONS
PASS_WITH_RISK -> HOLD
FAIL -> FAIL
```

Do not PASS if separate-capture provenance, exact refund binding, full-cancel verification, test-only authorization,
durable refund re-read, inventory HOLD, reconciliation, replay zero effect, mirror fidelity, evidence separation,
leak containment, database cleanup, or honest claim ceiling is unconnected, contradicted, or asserted only by a
test name. Every finding needs a stable ID, severity, exact file/line, proof/reproduction, impact, and smallest
in-scope correction boundary. State whether the candidate may be pushed.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/91_COSMILE_WUG_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/91_COSMILE_WUG_IMPLEMENTATION_REVIEW_POINTER.md`

Return to `foundation-advisor` and STOP. Do not patch, stage, commit, push, dispatch, request credentials,
start integrated review, or begin another mission.
