# 34 — Cosmile WU-A Correction Cycle 2 Result (WUA-F2b)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-A-CORRECTION-2
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (same session; dispatcher-confirmed for this session; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (reconfirmed loaded before edits)
HANDOFF:      advisor/jobs/.../handoffs/34_COSMILE_WUA_CORRECTION_2_HANDOFF.md @ 75707ce93ee078e8a4ca1cd8754dec84c49f4d45 (committed; working-tree == committed blob, verified)
STATUS:       COMPLETE — one additive test-only commit · focused 59/59 + suite 239/239 · READY_FOR_DELTA_RE_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Pins verified before any edit (first-hand, local-only — no network)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Correction-2 handoff | `34_…@75707ce9` | FDOCS HEAD == `75707ce9`; committed ("dispatch WU-A correction 2"); working-tree == committed | ✅ |
| Repository / branch | exact worktree + mission branch | exact | ✅ |
| OLD_CORRECTION_CANDIDATE / parent | `2b8efdcc…`, parent `70b8b155…` | HEAD == `2b8efdcc…` (pre-edit); `HEAD~1` == `70b8b155…`; clean | ✅ |
| Upstream / behind-ahead | `origin/…` at `0/2` | upstream present; 0 behind / 2 ahead; not pushed | ✅ |
| Delta-review evidence | commit `aaf58ae9`, blob `e2bfb55d`, sha256 `b1a7fbbd…`, VERDICT PASS_WITH_CORRECTIONS | all match exactly; CLOSED WUA-F1, PARTIAL WUA-F2, ONLY finding **WUA-F2b** | ✅ |
| Worktree clean | CLEAN | clean pre-edit | ✅ |
| Model / Effort / Skill | Opus 4.8 (1M) / max / /fable-builder | verified / carried-forward (same session) / reconfirmed | ✅ / ⚠️ recorded / ✅ |

## 1. Correction scope

Corrected **only** `WUA-F2b` in the **one** authorized file `app/scripts/o1_google_oidc_contract.vitest.ts`.
**No product/runtime code changed** — `googleOidc.ts`, `session.ts`, `callback/route.ts`, `.env.example`, docs,
schema, migration, generated Prisma client, dependencies, UI, WU-0, and later WUs are all **untouched**
(verified: `git diff --name-only 2b8efdc..e1dc39e` = exactly the one test file). Residual observations R1–R7,
including the cosmetic **R7** stale comment, are **not** corrected (out of scope) and are retained below.

## 2. WUA-F2b — offline proof of the product timeout signal

**Root cause (delta review §3, WUA-F2 PARTIAL):** WUA-F2's 10s abort bound was code-correct, but the only
abort-adjacent test used `stubThrow()` throwing an unrelated `Error("network")` — it never asserted the stub
receives an `AbortSignal`, and never proved a **hanging** fetch is ended by the product's own timer. Deleting
`signal: controller.signal` or the `setTimeout` arming would have failed **no** test → the 10s bound was
regression-unguarded.

**Fix (test-only, 4 new offline cases; `vi.useFakeTimers()` + stubbed `globalThis.fetch`):**

1. **token exchange — product timer+signal aborts a hang → `provider_unavailable`.** A hanging stub records the
   received signal and rejects **only** when that signal fires. Asserts `rec.calls === 1` and
   `rec.signal instanceof AbortSignal` and `rec.signal.aborted === false` **before** advancing; then
   `vi.advanceTimersByTimeAsync(10_000)` fires the product's own `setTimeout` → `controller.abort()` →
   `rec.signal.aborted === true` → the awaited exchange returns `AUTH_ERROR.provider_unavailable`.
2. **token exchange — not aborted before the bound.** Advancing `9_000ms` keeps `aborted === false` (still
   hanging); a further `1_000ms` (crossing 10s) aborts → `provider_unavailable`. Proves the **product 10s timer**
   (not the stub) drives the abort at the specific bound.
3. **JWKS — same product timer+signal aborts a hang → rejects fail-closed.** `rec.signal instanceof AbortSignal`;
   after the 10s advance `rec.signal.aborted === true` and `fetchKeys()` **rejects** (handler attached
   immediately; no unhandled rejection).
4. **adjacent fast success — same signal-asserting stub.** A stub that resolves immediately still receives an
   `AbortSignal` (`received instanceof AbortSignal`) and the exchange succeeds (`id_token` returned) before any
   timeout — the signal is wired on the success path too.

`afterEach` restores `vi.useRealTimers()` **and** `globalThis.fetch` (no suite contamination; all hanging
promises settle via the product abort by test end → no open handles). **No real waiting/network/Google/
credential/token/PII/provider call and no new dependency.**

**Mutation sensitivity (the property the finding requires) — how each mutation breaks a specific assertion:**
- Remove `signal: controller.signal` (product) → the stub records `rec.signal === undefined` →
  `expect(rec.signal).toBeInstanceOf(AbortSignal)` **fails**; and, with no signal, the hanging promise never
  settles → the awaited exchange/JWKS **times out** (also a failure).
- Remove `setTimeout(() => controller.abort(), 10_000)` (product) → `advanceTimersByTimeAsync(10_000)` fires
  nothing → `rec.signal.aborted` stays `false` → `expect(rec.signal!.aborted).toBe(true)` **fails**; the awaited
  hang never resolves → **times out**.

These assertions observe the **real product's** `AbortSignal` instance and its `false→true` abort transition
caused precisely by advancing fake time to the product's own 10s timer — i.e., the product timer + product
signal, not the stub, end the hang (handoff-required proof). All prior 55 focused cases and the full suite are
kept **without weakening any oracle** (the change is additive: one import symbol `vi` + one new describe block).

## 3. Test + Git evidence

```text
DELTA:  git diff 2b8efdcc484d211a7cc6957c3d632a073afefbe4..e1dc39e6e0179c095e47695594b6ea3fec57d006
        = 1 file, +95 / -1  == app/scripts/o1_google_oidc_contract.vitest.ts (the ONLY authorized path)
NEW_CANDIDATE_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006 (parent = OLD_CORRECTION_CANDIDATE 2b8efdcc; additive; no amend/rebase/squash/force)
PRE_GIT:  branch implementation/…-20260717 @ 2b8efdcc (clean; 2 ahead / 0 behind; not pushed)
POST_GIT: same branch @ e1dc39e6 (clean; 3 ahead / 0 behind; NOT pushed)
FOCUSED:  vitest run scripts/o1_google_oidc_contract.vitest.ts -> 1 file, 59 passed / 0 failed  (55 prior + 4 WUA-F2b)
FULL:     vitest run -> 11 files, 239 passed / 0 failed  (235 prior + 4; no regression)
PROOF_DRIVEN_BY_PRODUCT_SIGNAL+FAKE_TIME: the hang tests assert rec.signal instanceof AbortSignal and rec.signal.aborted false->true exactly across vi.advanceTimersByTimeAsync(10_000); the fast-success test asserts the same signal on the resolve path.
TIMER/FETCH_RESTORATION: afterEach vi.useRealTimers() + globalThis.fetch = origFetch; no open handle / no suite contamination (full suite green, order-independent).
DEP_SOURCE: original repo /home/leo/Project/Cosmile/app/node_modules via a gitignored symlink for the run only; removed after (app/node_modules absent); no install/update, no lockfile, no prisma generate.
CLEANUP:  symlink removed · no .next created · tracked state == the one test file only.
SECRETS/PII: none — 0 real Google/private-key/email signatures in the delta; synthetic stub bodies only.
BUILD/LINT/TSC: NOT_RUN (unchanged authority: pre-WU-0 generated Prisma client + forbidden prisma generate; .next IS gitignored — R5).
```

## 4. Preserved residual observations R1–R7 (NOT changed this cycle)

- **R1** — `repository.ts` race-loser re-read omits the `customer.status` recheck (`resolveSession` re-enforces
  `active`); `repository.ts` is outside scope → untouched.
- **R2** — Google mode has no guest-id mint (guest continuity inert; no cross-owner access) → later WU.
- **R3** — non-allowlist surfaces still render the mock persona under flag ON (display/metadata only) → outside allowlist.
- **R4** — `GoogleOidcConfig` placement in `contracts.ts` (cosmetic) → unchanged.
- **R5** — the original WU-A `.next`-not-gitignored NOT_RUN sub-reason was inaccurate; the controlling reason
  (pre-WU-0 generated Prisma client + forbidden `prisma generate`) holds and is restated in §3.
- **R6** — runtime surfaces (routes over HTTP, concrete adapters at runtime, Prisma runtime, live Google,
  concurrency, build/tsc) remain unproven as declared — credential-gated.
- **R7 (new, from delta review §1)** — the `googleOidc.ts` comment "RUNTIME concrete network adapters … NEVER
  called by unit tests" is now stale (the WUA-F2/F2b tests do call these adapters with an offline stubbed
  `fetch`). **Cosmetic; the handoff explicitly excludes it from this correction** → deliberately untouched.

## 5. What is proven / not proven

**Proven (offline, deterministic):** the product's ≤10s `AbortController` bound is real and regression-guarded —
a hanging fetch is ended by the product's own timer+signal (token exchange → `provider_unavailable`; JWKS →
fail-closed reject), the abort occurs at the 10s bound (not before), and the signal is wired on the success path
too. Focused 59/59 + full 239/239 reproduce offline.

**Not proven (unchanged):** live Google flow, route HTTP behavior, the concrete adapters against a real endpoint,
Prisma repository runtime, real concurrency, and build/tsc — all credential-gated BLOCKED / NOT_RUN.

## 6. Next review question set (delta re-review, `2b8efdc..e1dc39e`)

1. Do the hang tests assert the stub receives a real `AbortSignal` and that it aborts `false→true` exactly at
   the product's 10s fake-time advance (product timer+signal, not the stub)?
2. Would removing `signal: controller.signal` or the `setTimeout` arming fail these tests (signal-instance
   assertion / aborted-true assertion / awaited-hang timeout)?
3. Are the 55 prior focused cases and the full suite still passing with no oracle weakened, and are timers +
   `globalThis.fetch` restored (no contamination / open handle)?
4. Is the delta exactly the one test file, additive on `2b8efdc`, with product code and R1–R7 untouched?

## 7. rollback

Revert the single test-only commit `e1dc39e6…` (the branch returns to correction-1 candidate `2b8efdc`); nothing
was pushed; no product/runtime/DB change exists.

```text
PRODUCT_CODE_CHANGED: NO (test-file only)
GOOGLEOIDC/SESSION/CALLBACK/CONFIG/DOCS/SCHEMA/PRISMA/DEP/UI/WU0_CHANGED: NO
NEW_CANDIDATE_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006  (parent 2b8efdcc…; additive; test-only)
IMPLEMENTATION_PUSHED: NO
FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes)
REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/NETWORK/PROVIDER/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
