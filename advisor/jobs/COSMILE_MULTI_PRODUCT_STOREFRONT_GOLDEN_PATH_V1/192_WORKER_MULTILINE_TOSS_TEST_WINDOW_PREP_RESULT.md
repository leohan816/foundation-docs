# WORKER RESULT — ONE MULTI-LINE TOSS TEST WINDOW PREP

Status: **CHECKOUT_RETRY_READY**

- Handoff `190` at docs `6604c4b6f973013633a62f10a3313778efc88498`; computed sha256 `f452cdf93165c4b563e33661c2eb1ff87d6405c297d2748ecf9784478ab9debd`.
- Product `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal before and after. **No product, source, config, schema, DB, cart, session or grant change.**

## Pre-effect gate — all four items pass

1. **Counts unchanged since 188**: orders `3` (`paid 1`, `pending 2`), succeeded captures `1`, refunds `0`, payment intents `1`, payment transactions `1`, inventory reservations `3`. No new intent, transaction or reservation.
2. **Unique target cart identified categorically**: exactly `1` owner holds exactly one paid order, and that owner has exactly `1` active cart. No identifier was selected or printed.
3. **Cart shape exact**: `3` lines, `3` distinct SKUs, total quantity `3`; all `3` lines admitted (one of the seven active `o1tc_` candidate SKUs, non-hidden, positive server price, stock ≥ line quantity, `missing_initial` snapshot); superseded/non-admitted lines **`0`**.
4. **Checkout path unchanged**: the runtime still revalidates **every** line (`for (const line of lines)`), and the deterministic replay boundary remains active — `deriveO1OrderNo` / `isExactO1CheckoutReplay` present, with `pending_replay` and `checkout_attempt_conflict` intact.

## Runtime-only action

Wrapper `runtime/start-candidate.sh` — regular file, non-symlink, `leo:leo`, `0700`. **Exactly one line changed**: `O1_TOSS_SANDBOX_ONESHOT=0` → `1`. `O1_TOSS_MODE=test`, `unset O1_TOSS_LOCAL_SUBSTITUTE`, `NODE_ENV=development` and the `exec … next dev` line are untouched.

Stopped only the exact owned port-3000 process group (PID `3010079`, PGID `3010052`, CWD verified as the mission app before signalling); the old group is gone. Restarted **exactly once** through the same wrapper with positional port `3000`: PID `3044020`, PGID `3043982`, CWD the mission app, one listener, local `GET /` **200**.

Post-restart verification, categories/status only:

| Check | Result |
|---|---|
| `O1_TOSS_SANDBOX_ONESHOT=1` | true |
| local substitute absent | true |
| `O1_TOSS_MODE=test` | true |
| Toss secret / client key present, TEST-prefix classification | present · `TEST_PREFIX_OK` (both) |
| `NODE_ENV=development`, runtime enabled, Google enabled | true / true / true |
| pre-effect counts unchanged after restart | **true**, `diffs = none` |

No env value was printed. No HTTP checkout, browser, provider, payment, refund, DB write, build, test or product commit occurred.

## Safety conditions for the window (unchanged, restated)

The process flag is **not** auto-consuming. Therefore: Leo clicks checkout **exactly once**; no second click and no replay; after Leo returns the categorical result, the Advisor restores wrapper and process one-shot **OFF** before any further browser action. The deterministic idempotency boundary remains the duplicate-effect guard, and the transport preflight still precedes every durable write.

**Golden Reversal remains HOLD**; detail placement confirmation is still required before any refund.

## Not proven

- The window is prepared, not exercised: no checkout was attempted, so the multi-line path is still unproven end to end.
- The one-shot flag now admits the official Toss sandbox transport, so the previously diagnosed `transport_unavailable` refusal should no longer occur — that is an expectation from the transport gate's code, not an observed outcome.
- Detail placement remains unconfirmed, exactly as recorded.
