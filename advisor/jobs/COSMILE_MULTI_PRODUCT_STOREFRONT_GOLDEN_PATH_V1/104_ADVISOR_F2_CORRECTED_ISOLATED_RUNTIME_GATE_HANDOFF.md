# Advisor handoff — F2 corrected isolated runtime gate

VERDICT: `PROCEED_WITH_LIMITS` · this authorizes one corrected gate after the
zero-effect failure in 93 and reviewed E4 fix.

## Pins

- Cosmile `8a1a5b70c8b6df1f9aaf75cf40821d761a089ae7`,
  clean/upstream-equal.
- Foundation `966db20822b7accb36c33dedb01ffba51a9bef68`; vault
  `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`, clean/read-only.
- Bundle: exact owner-only handoff-91 bundle, review-verified shape.
- E4 delta review `102`/`103`, docs `7b9c6ac`: PASS, blocking 0.
- Existing Cosmile Worker, actual Opus 5/xhigh, exact CWD, `/fable-builder`.

## Procedure and ceiling

No tracked write, schema/migration, package/lock, bundle rewrite, runtime
restart, build/typecheck, other test, provider/browser/economic action.

Reuse the exact handoff-92 transient ceiling (`counts.mjs`, `before.json`,
`after.json`) under owner-only `f2/evidence/`, then delete all three and the
empty directory. No scratchpad, `/tmp`, log, PID, or other path.

1. Verify pins, bundle (one read-only `verify_bundle`), exact owned listener,
   environment names only, and ready non-production/Google/Toss-TEST gates.
   Sandbox one-shot and local substitute remain off.
2. Record fresh count/status-category-only baseline using the handoff-92 reader.
3. Load the owned listener environment only in process memory; override only
   the exact bundle root and `O1_TEST_CANDIDATE_SETUP=1`.
4. From `app/`, execute the exact owner one-shot command from handoff 91 once.
   Require PASS and exact admitted/bound/activated counts of 7, offers 0.
5. Execute the identical one-shot exactly once more as the authorized
   idempotent replay. Require PASS, same admitted/bound/activated contract and
   no extra rows.
6. Read back exact candidate state: seven candidate snapshots, seven exact
   bindings, seven active/non-hidden candidate SKUs, zero candidate
   CommerceOffer rows, incomplete eighth absent. Require the representative
   predecessor to be superseded exactly once where applicable and no split
   heads.
7. Require every protected order/cart/wishlist/customer/identity/session/
   payment/refund/reservation/shipment/reconciliation/audit count and category
   to equal the fresh baseline. The two pending orders and two reserved holds
   remain untouched.
8. Delete transient evidence, preserve bundle, verify Git/dependency/listener/
   port state and no provider/browser/economic effect.

First failure stops with no further retry or diagnosis. Write only:

- `105_WORKER_F2_CORRECTED_ISOLATED_RUNTIME_RESULT.md`
- `106_WORKER_F2_CORRECTED_ISOLATED_RUNTIME_POINTER.md`

Commit/push only those docs and STOP before runtime restart, browser, Google,
Toss checkout, order, or refund.
