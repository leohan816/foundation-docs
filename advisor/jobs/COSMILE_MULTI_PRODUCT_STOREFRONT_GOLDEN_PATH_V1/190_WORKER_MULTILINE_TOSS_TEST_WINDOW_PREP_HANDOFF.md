# 190 — WORKER HANDOFF: ONE MULTI-LINE TOSS TEST WINDOW PREP

## Authority and binding

- Same Cosmile Worker; actual Opus 5 / xhigh; exact mission CWD.
- Product `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal.
- Exactly one additional official Toss TEST multi-line window is authorized. No browser/provider action by Worker.
- Golden Reversal remains HOLD; detail placement confirmation is still required before refund.

## Pre-effect gate

Using the exact active non-production DB read-only and values never printed:

1. require orders `3` (`paid 1`, `pending 2`), succeeded capture `1`, refunds `0`, and no new intent/transaction/reservation since 188;
2. select categorically the unique active customer cart whose owner has the one paid order;
3. require exactly `3` lines, `3` distinct SKUs, total quantity `3`, and every line to be one of the seven admitted active candidate SKUs with positive server price, sufficient stock, and `missing_initial`; superseded/non-admitted lines `0`;
4. confirm the unchanged checkout path server-revalidates every line and the deterministic replay boundary remains active.

Fail closed without runtime change on any mismatch.

## Runtime-only action

- Product/source/config/schema/DB/cart/session/grant files: no change.
- Exact owner-safe mission wrapper only: `.../runtime/start-candidate.sh`, regular non-symlink `leo:leo 0700`.
- Change only `O1_TOSS_SANDBOX_ONESHOT=0` to `1`; retain Toss TEST and local substitute unset.
- Stop only the exact owned port-3000 mission runtime process group; restart exactly once with the existing wrapper and positional port `3000`.
- Verify exact worktree/product, TCP readiness, `O1_TOSS_SANDBOX_ONESHOT=1`, TEST credential classification names/status only, local substitute absent, and unchanged pre-effect counts.
- No HTTP checkout, browser, provider, payment, refund, DB write, build, test, or product commit.

The process flag is not auto-consuming. Safety therefore also requires: Leo clicks checkout exactly once; no second click/replay; after Leo returns the categorical result, Advisor immediately restores wrapper/process one-shot OFF before any further browser action. Existing deterministic idempotency remains the duplicate-effect guard.

Write only `192_WORKER_MULTILINE_TOSS_TEST_WINDOW_PREP_RESULT.md` and `193_WORKER_MULTILINE_TOSS_TEST_WINDOW_PREP_POINTER.md`, commit/non-force-push docs, return `CHECKOUT_RETRY_READY` or exact HOLD, STOP.
