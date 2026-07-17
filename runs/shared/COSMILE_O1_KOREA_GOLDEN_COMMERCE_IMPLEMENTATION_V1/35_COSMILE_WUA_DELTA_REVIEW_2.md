# 35 — Cosmile WU-A Delta Review 2 (WUA-F2b closure, `2b8efdcc..e1dc39e6`)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID:    COSMILE-WUA-DELTA-REVIEW-2
REVIEW_PASS:  IMPLEMENTATION_REVIEW_DELTA_ONLY (WUA-F2b only + adjacent invariants; closed axes not re-opened)
ACTOR:        foundation-reviewer-fable5 — same Reviewer identity/session as 31_ and 33_
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max in session environment)
SKILL:        /fable-sentinel (loaded this session; delta-review reference active)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 35_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/35_COSMILE_WUA_DELTA_REVIEW_2_HANDOFF.md
              @ foundation-docs commit 3c0d1e8447948f947f20799b844d9361bcc88874 (read via git show at pin)
VERDICT:      PASS
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `3c0d1e84` contains 35_ handoff | `git cat-file -t` commit; handoff read at pin; foundation-docs worktree HEAD = `3c0d1e84`, clean | ✅ |
| OLD_REVIEWED_HEAD / parent | `2b8efdcc…` | `git rev-parse HEAD~1` = exact; **exactly one additive commit** in range ("test(o1-wua): WUA-F2b — … correction cycle 2"); no amend/rebase | ✅ |
| NEW_CANDIDATE_HEAD | `e1dc39e6…` | `git rev-parse HEAD` = exact | ✅ |
| Delta path/stat | `app/scripts/o1_google_oidc_contract.vitest.ts` · 1 file, +95/−1 | `git diff --name-status/--stat` = exact (single M, +95/−1; the −1 is the vitest import line gaining `vi`) | ✅ |
| Worktree / branch / upstream | CLEAN · mission branch · behind/ahead 0/3 · not pushed | porcelain 0 (pre and post) · branch exact · `rev-list --left-right` = 0/3 · `ls-remote` = `c559e7cd` (base) | ✅ |
| PRIOR_DELTA_REVIEW pin | commit `aaf58ae9` · PASS_WITH_CORRECTIONS · only open finding WUA-F2b | commit adds exactly my 33_ artifacts; committed 33_ blob `e2bfb55d` sha256 = `b1a7fbbd…` = current disk copy (**this Reviewer's 33_ text committed byte-identical, unaltered**) | ✅ |
| CORRECTION_EVIDENCE pin | commit `29402bb8` · result blob `a29c7e1c` · sha256 `df9e933a…` | commit adds exactly 34_RESULT + 34_POINTER; blob id and sha256 exact; 34_ read from the pinned blob | ✅ |

## 1. Determinations (handoff items 1–9, one by one)

**(1) Delta containment — ✅.** Exactly one test file, additive on the pinned parent; **all product/runtime code byte-unchanged** (no other path in `git diff --name-status`; `googleOidc.ts`/`session.ts`/`callback`/config/docs/schema/deps untouched by path-set).

**(2) Hanging stub receives the actual product `AbortSignal` and settles only via it — ✅.** `installHangingFetch` records `init?.signal`; the returned promise has **no independent settle path**: with no signal it returns without ever settling (the lever that breaks the test if product wiring is removed); with a signal it rejects **only** from `sig.addEventListener("abort", …, {once:true})` (or already-aborted). The stub never aborts anything itself and the test never calls abort — only the product's `AbortController` can end the hang.

**(3) Fake time through the product 10s bound flips the received signal and closes exchange — ✅.** Sequencing is sound: `exchange()` runs synchronously to the `await fetch(...)` inside `boundedProviderFetch` (controller created, `setTimeout` armed, stub invoked), so `rec.calls === 1`, `rec.signal instanceof AbortSignal`, `aborted === false` hold immediately; `await vi.advanceTimersByTimeAsync(10_000)` fires the **product's own** timer → `controller.abort()` → `rec.signal.aborted === true` → the awaited exchange returns exactly `AUTH_ERROR.provider_unavailable`.

**(4) Same product-driven abort closes JWKS fail-closed — ✅.** Identical hang stub; rejection handler attached **before** advancing (`p.then(…, …)` → `"rejected"`), so the reject is observed deterministically with no unhandled-rejection window; after the 10s advance the port rejects.

**(5) Not-before-bound + fast success, no real waits — ✅.** Advancing 9 000ms keeps `aborted === false` (still hanging), a further 1 000ms crosses the bound and aborts — the 10s value is pinned **from below** (a shorter product bound would abort at 9s and fail) and **from above** (a longer bound would leave `aborted === false` at 10s in items 3/4). The adjacent fast-success case uses a signal-asserting resolving stub (real `ReadableStream` body through the real capped reader) — the signal is wired on the success path too and the exchange succeeds. All under fake timers: focused-run test time **83ms** (no real 10s waits); no network, provider, credential, token, PII, or new dependency (only vitest's own `vi`).

**(6) Restoration / no contamination — ✅.** The block's `afterEach` runs `vi.useRealTimers()` and restores `globalThis.fetch` (captured original); every hang settles via the product abort before test end and `boundedProviderFetch`'s `finally` clears its timer on rejection — no open handles. Full suite passes with the pre-existing WUA-F2 block's own fetch restoration (both capture the untouched real fetch at collection time); no cross-test order dependence observed (full run green).

**(7) Mutation sensitivity closes WUA-F2b — ✅ (analytical, from the test structure; executing mutations would require patching product code, which is forbidden).** Removing `signal: controller.signal` ⇒ the stub records `undefined` ⇒ `expect(rec.signal).toBeInstanceOf(AbortSignal)` fails synchronously in items 2–4 (and the un-signaled hang can never settle). Removing the `setTimeout` arming ⇒ the advance fires nothing ⇒ `expect(rec.signal!.aborted).toBe(true)` fails — and these assertions run **before** `await p`, so the failure is fast and deterministic, not a suite timeout. This is no longer "an unrelated throw": the assertions observe the real product signal instance and its `false→true` transition caused by the product timer. The regression gap named in 33_ WUA-F2b is closed.

**(8) Reproduction — ✅.**

```text
PRE:  HEAD e1dc39e6 · porcelain 0 · app/node_modules ABSENT
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules  (gitignored)
RUN1: vitest run scripts/o1_google_oidc_contract.vitest.ts → 59 passed / 0 failed  (55 prior + 4 WUA-F2b; tests 83ms — fake timers, no real waits)
RUN2: vitest run → 11 files, 239 passed / 0 failed  (235 prior + 4; no regression)
ENV:  vitest 4.1.9 · NODE_ENV=test · offline (stubbed fetch only; no network/DB/provider/credential/PII)
POST: symlink removed (ABSENT) · no .next · HEAD e1dc39e6 · porcelain 0
```

Both Worker-claimed counts reproduce exactly. No oracle weakened: the sole removed line is the vitest import (re-added with `vi`); all 55 prior focused cases and the full pre-existing suite are byte-untouched and green. 0 `console.*` in the delta.

**(9) R1–R7 untouched — ✅.** The delta contains no product path, so R1–R6 areas are trivially unchanged; **R7** (stale "NEVER called by unit tests" comment in `googleOidc.ts`) is intentionally retained per the correction handoff's exclusion and remains cosmetic/non-blocking. The 34_ result's residual table restates all seven accurately.

## 2. Excluded scope

Closed WU-A axes (31_) and closed WUA-F1 (33_) were not re-opened — nothing in this delta touches them. No push, patch, stage, commit, dispatch, credential, network, DB, provider, build/tsc, or `prisma generate`.

## 3. Verdict rationale

The delta is exactly the single authorized test file; the four new offline cases observe the product's own `AbortSignal` instance and prove that the product's 10-second timer — not the stub — ends a hanging provider fetch on both adapters, pin the bound from both sides, assert the signal on the success path, and restore timers/fetch cleanly; 59/59 and 239/239 reproduce offline with no oracle weakening and no regression; all residuals remain non-blocking and untouched. **WUA-F2b is CLOSED**, which completes WUA-F2 — with WUA-F1 closed in 33_, **no finding remains open against WU-A**. Verdict: **PASS** at the authorized non-production, credential-gated claim ceiling (runtime surfaces in R6 remain unproven as declared; that ceiling is unchanged by this verdict).

```text
VERDICT: PASS
ITEM_VERDICTS: containment ✅ · WUA-F2b CLOSED (signal receipt ✅ · product-timer abort ✅ · not-before-bound ✅ · JWKS fail-closed ✅ · fast-success signal ✅ · restoration ✅ · mutation-sensitive ✅) · reproduction 59/59 + 239/239 ✅ · regression NONE · R1–R7 non-blocking, untouched
OPEN_FINDINGS_AGAINST_WU-A: NONE (WUA-F1 closed @33_ · WUA-F2/WUA-F2b closed @35_)
WU-A_CANDIDATE: e1dc39e6e0179c095e47695594b6ea3fec57d006 (base c559e7cd + 3 additive commits; NOT pushed — push withheld per handoff even on PASS; push routing is Advisor's)
CLAIM_CEILING: reviewed non-production, default-OFF, credential-gated identity seam; R6 runtime surfaces remain unproven as declared
REVIEWER_ACTIONS_NOT_TAKEN: no patch, stage, commit, push, dispatch, credential request, risk acceptance, or new WorkUnit
RETURN_TO: foundation-advisor
STOP
```
