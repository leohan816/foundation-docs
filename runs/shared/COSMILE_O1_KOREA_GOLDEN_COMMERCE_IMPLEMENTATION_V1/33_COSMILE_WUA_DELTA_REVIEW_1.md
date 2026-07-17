# 33 — Cosmile WU-A Delta Review 1 (WUA-F1 / WUA-F2 correction, `70b8b155..2b8efdcc`)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID:    COSMILE-WUA-DELTA-REVIEW-1
REVIEW_PASS:  IMPLEMENTATION_REVIEW (delta-only re-review; NOT a full re-review — prior PASS axes not re-audited)
ACTOR:        foundation-reviewer-fable5 — same Reviewer identity/session that issued WUA-F1/WUA-F2
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max in session environment)
SKILL:        /fable-sentinel (already loaded this session; delta-review reference loaded for this pass)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
INDEPENDENCE: Reviewer session performed no patch; correction authored by the Cosmile Worker session
OVERLAP:      none — 0 pre-existing 33_* artifacts before this review
HANDOFF:      advisor/jobs/.../handoffs/33_COSMILE_WUA_DELTA_REVIEW_1_HANDOFF.md
              @ foundation-docs commit 277fe931dcfc31cf2053f0286fcc1307a9bc4251 (read via git show at pin)
VERDICT:      PASS_WITH_CORRECTIONS (WUA-F1 CLOSED · WUA-F2 PARTIAL → one named finding WUA-F2b · no regression)
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `277fe931` contains 33_ handoff | `git cat-file -t` commit; handoff read at pin | ✅ |
| OLD_REVIEWED_CANDIDATE | `70b8b155…` | `git rev-parse HEAD~1` = exact (the subject I reviewed in 31_) | ✅ |
| NEW_CANDIDATE_HEAD / parent | `2b8efdcc…`, parent `70b8b155…` | HEAD = exact; `%P` = exact; **exactly one additive commit** in range ("fix(o1-wua): WUA-F1 … + WUA-F2 … correction cycle 1"); no amend/rebase (old head is the parent) | ✅ |
| Worktree / branch / upstream | CLEAN · mission branch · 2/0 · not pushed | porcelain 0 (pre and post) · branch exact · `rev-list --left-right` = 0/2 (ahead 2) · `ls-remote` = `c559e7cd` (base; nothing pushed) | ✅ |
| ORIGINAL_REVIEW pin | commit `bf9358fd` · blob `79b97758` · sha256 `a611b9e5…` · PASS_WITH_CORRECTIONS | ls-tree blob exact; `git cat-file blob | sha256sum` exact; disk copy of my 31_ artifact re-hashed = same sha256 (**committed review text is byte-identical to what this Reviewer wrote — unaltered**) | ✅ |
| CORRECTION_EVIDENCE pin | commit `b1ce10a3` · result blob `4d13282d` · sha256 `fa12c108…` | commit adds exactly 32_RESULT + 32_POINTER; blob id and sha256 exact; 32_ result read from the pinned blob | ✅ |
| foundation-docs worktree | — | HEAD = `277fe931` (pinned handoff commit), clean | ✅ |

## 1. Delta containment and regression scan

- `git diff --name-status 70b8b155..2b8efdcc` = **exactly 5 files** (+291/−17), name-for-name the five authorized correction paths: `.env.example`, `o1_google_oidc_contract.vitest.ts`, `callback/route.ts`, `googleOidc.ts`, `session.ts`.
- Forbidden/adjacent surfaces show **zero diff**: `repository.ts`, `shopper.ts`, `mergeGuest.ts`, `events/route.ts`, components/, account/, `prisma/`, `package.json`, lockfile (single combined diff → 0 lines). R1–R6 areas untouched; no WU-B..G file appears.
- `verifyIdToken` and everything above `googleOidc.ts:177` unchanged; the 35 prior test cases are byte-untouched (test diff is additive: imports + two new describe blocks). **No oracle/expectation/fixture weakened.**
- Added lines contain **0** `console.*`; secret/PII sweep of the delta: none (env value remains empty; synthetic stub bodies only).
- Declared behavioral delta (from 32_, verified in code): malformed/empty JWKS previously yielded `[]` → verifier `key_unknown` (400); now throws → callback `provider_unavailable` (502). Both are fail-closed closed-category outcomes with no session; strictness increased; `contracts.ts` untouched (no new public error category). **Not a regression.**
- New cosmetic drift introduced by the patch (**R7**, non-blocking): the retained comment `googleOidc.ts` "RUNTIME concrete network adapters … NEVER called by unit tests" is now stale — the WUA-F2 tests do call these adapters (with an offline stubbed `fetch`).

## 2. WUA-F1 closure — verdict **CLOSED** (all handoff bullets, before→after fixed by commit)

Before (`git show 70b8b155:…`): key documented, `grep -r COSMILE_SESSION_TTL_SECONDS app/src` = 0; callback hardcoded `DEFAULT_SESSION_TTL_SECONDS` at both call sites. After (`2b8efdcc`):

| Handoff requirement | Evidence (after) | Result |
|---|---|---|
| No longer inert | `session.ts` `resolveSessionTtlSeconds(env)` added; called at `callback/route.ts:68` | ✅ |
| Pure, positive-integer-only parsing | pure function over an env record; `typeof`/trim guard → `Number` → `Number.isInteger(n) && n > 0` required | ✅ |
| absent/empty/non-integer/non-finite/zero/negative → 8h default | code path returns `DEFAULT_SESSION_TTL_SECONDS`; tests cover `{}`, `""`, `"abc"`, `"1.5"`, `"0"`, `"-30"`, `"Infinity"` | ✅ |
| Positive values clamp `[60, 28_800]`, cannot exceed 8h | `Math.min(DEFAULT, Math.max(MIN=60, n))`; tests: `"30"`→60, `"1"`→60, `"60"`→60, `"900"`→900, `DEFAULT`→DEFAULT, `DEFAULT+100000`→DEFAULT, `"999999999"` ≤ DEFAULT | ✅ |
| Resolved exactly once; identical value to DB expiry and cookie maxAge | one `const ttlSeconds` (`callback:68`) used at both `issueSession({…, ttlSeconds})` and `sessionCookieOptions(ttlSeconds, secure)`; the stale `DEFAULT_…` import removed; tests assert `900` (and default) reflected in **both** `expiresAtSeconds == NOW+ttl` and `maxAge == ttl` | ✅ |
| `.env.example` values-empty, accurate description | value line still empty; description now states positive-int-only, `[60s, 8h]` clamp, invalid→default, no exceed, applied to DB **and** cookie — matches code exactly | ✅ |
| Positive + adjacent-negative tests, no weakening | 4 new cases (12 parser assertions + both-sink application), additive only | ✅ |

## 3. WUA-F2 closure — verdict **PARTIAL** (implementation verified; one required test-evidence leg missing → WUA-F2b)

| Handoff requirement | Evidence (after `2b8efdcc`) | Result |
|---|---|---|
| Both fetches one explicit timeout ≤ 10s | single shared `boundedProviderFetch` used by **both** adapters; `PROVIDER_FETCH_TIMEOUT_MS = 10_000`; `AbortController` + `setTimeout(abort)` | ✅ code |
| Signal actually reaches both fetches; cleanup can't disable bound before body completion | `fetch(url, { ...init, signal: controller.signal })` — signal applied after spread (cannot be overridden); `clearTimeout` only in `finally` **after** `readBodyCapped` returns/throws, so the bound covers the body phase; an abort mid-stream rejects `reader.read()` | ✅ code · ❌ **no test guards it** (see WUA-F2b) |
| ≤256 KiB cap: numeric content-length pre-check + streaming/post-read count incl. absent/lying/malformed headers | finite declared `> 256*1024` throws **before any body read**; `readBodyCapped` streams with running byte count and `reader.cancel()` on excess (absent/lying header covered); non-finite header value falls through to the stream cap; no-stream fallback re-checks `arrayBuffer` length | ✅ code + tests (declared oversize with non-JSON body proves no-parse; undeclared oversize exercises the real streaming cap) |
| Stream cancel / body-read failure closed, no provider leak | cancel wrapped try/ignore; thrown messages are generic constants; exchange catch → `provider_unavailable`; JWKS throw → callback catch → `provider_unavailable`; 0 `console.*` | ✅ |
| Token exchange top-level shape + bounded non-empty `id_token` | 2xx window → JSON.parse guarded → non-object/null/array rejected → `id_token` non-empty string `≤ 8192` chars; returns `{idToken}` only | ✅ code + tests (non-OK, malformed JSON, missing token, 8193-char token) |
| JWKS bounded non-empty keys + required primitive fields, no unchecked cast | `keys` array required, `1..20`; each entry rebuilt via `toValidJwk` (kty/kid/n/e required non-empty strings; alg/use optional); malformed entry throws (fail-closed, not skipped) | ✅ code + tests (`keys:"nope"`, `[]`, missing `e`) |
| Non-OK / throw-abort / declared oversize / undeclared oversize / malformed JSON / invalid shape / malformed JWK → only existing closed behavior, no body escape | 16 offline stubbed-fetch tests assert exact closed codes (exchange) and fail-closed throws (JWKS); no new public category (`contracts.ts` untouched) | ✅ |
| **Offline tests prove the timeout signal/bounds rather than merely simulating an unrelated throw** | **Bounds: proven** (oversize tests drive the real cap logic). **Timeout signal: NOT proven** — the only abort-adjacent test is `stubThrow()` throwing an unrelated `Error("network")`, which is precisely the pattern this criterion names as insufficient; no test asserts the stub receives an `AbortSignal`, and no test proves a **hanging** fetch is aborted by the 10s bound (my 31_ required evidence for WUA-F2 explicitly listed "hang/abort ⇒ closed category" — the hang leg is absent). Consequence: deleting `signal: controller.signal` (or the timer) would fail **no** test — the entire timeout bound is regression-unguarded. | ❌ → **WUA-F2b** |

### New required finding (single, bounded, inside the five correction paths)

**[WUA-F2b] Missing offline proof of the timeout signal.** `app/scripts/o1_google_oidc_contract.vitest.ts` (only file to change). **Violated criterion:** 33_ handoff WUA-F2 closure — "offline stubbed-fetch tests prove the timeout signal/bounds rather than merely simulating an unrelated throw" (and 31_ WUA-F2 required adjacent-negative "hang ⇒ closed category"). **Failure scenario guarded against:** a future edit drops `signal: controller.signal` or the `setTimeout` arming; every current test still passes; the 10s bound silently vanishes and a stalled provider once again pins the callback for platform-default minutes. **Required evidence (offline, no network/credential/install; product code should not need changes):** (a) a stub fetch that **asserts it receives an `AbortSignal`** (e.g. records `init.signal instanceof AbortSignal`), and (b) a **hanging** stub fetch that never resolves on its own and rejects when its received signal fires (listening to that same signal), driven with `vi.useFakeTimers()` advancing ≥ `PROVIDER_FETCH_TIMEOUT_MS` (or an equivalently bounded real-timer variant), proving the exchange path returns `provider_unavailable` and the JWKS path throws — i.e., the product timer + product signal, not the stub, end the hang. Adjacent positive: a fast success under the same signal-asserting stub still passes.

## 4. Independent reproduction (delta)

```text
PRE:  HEAD 2b8efdcc · porcelain 0 · app/node_modules ABSENT
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules  (gitignored)
RUN1: vitest run scripts/o1_google_oidc_contract.vitest.ts → 55 passed / 0 failed  (35 prior + 4 WUA-F1 + 16 WUA-F2)
RUN2: vitest run → 11 files, 235 passed / 0 failed  (215 prior + 20 new; no regression)
ENV:  vitest 4.1.9 · NODE_ENV=test · offline (stubbed fetch only; no network/DB/provider/credential/PII)
POST: symlink removed (ABSENT) · no .next · HEAD 2b8efdcc · porcelain 0
NOT_RUN (unchanged authority): build/tsc/lint (pre-WU-0 generated Prisma client + forbidden prisma generate), live provider/runtime behavior
```

Both Worker-claimed counts (55/55, 235/235) reproduce exactly.

## 5. Excluded scope

Prior-PASS WU-A axes were not re-audited (delta discipline); no push/patch/stage/commit of product code; no credential, network, DB, provider, or build execution; R1–R6 remain non-blocking and untouched (R5's corrected restatement in 32_ §4 verified accurate).

## 6. Verdict rationale

WUA-F1 is fully closed with exact positive and adjacent-negative evidence reproduced offline. WUA-F2's implementation satisfies every structural bullet by direct code inspection — one shared ≤10s abort covering the body phase, dual-layer 256 KiB caps, strict shape validation, closed non-leaking failure mapping — and 15 of its 16 evidence legs are test-proven; but the handoff's explicitly pre-stated test-evidence criterion for the **timeout signal** is unmet (the sole abort test simulates an unrelated throw), leaving the 10s bound with zero regression protection. That is a bounded, named, single-file gap inside the authorized correction paths — exactly the shape the handoff routes as a new finding — so the honest verdict is **PASS_WITH_CORRECTIONS** (not PASS: a pre-committed closure criterion would be falsely declared satisfied; not HOLD/FAIL: no authority/security/feasibility blocker, and the invariant itself is code-verified). No regression was found anywhere in the delta.

```text
VERDICT: PASS_WITH_CORRECTIONS
ITEM_VERDICTS: WUA-F1 CLOSED · WUA-F2 PARTIAL (implementation ✅ / timeout-signal test evidence ❌) · containment CLOSED · regression NONE
NEW_REQUIRED_FINDING: WUA-F2b (test-file only: app/scripts/o1_google_oidc_contract.vitest.ts)
CORRECTION_OWNER: same Cosmile Worker (new additive commit on the mission branch; no amend/push)
RE_REVIEW: this same Reviewer, delta-only 2b8efdcc..<new-candidate>
RESIDUAL_NON_BLOCKING: R1–R6 unchanged · R7 new (stale "NEVER called by unit tests" comment, cosmetic)
CANDIDATE_PUSH: withheld pending WUA-F2b closure (manifest: only reviewed PASS heads are pushed)
REVIEWER_ACTIONS_NOT_TAKEN: no patch, stage, commit, push, dispatch, credential request, risk acceptance, or new WorkUnit
RETURN_TO: foundation-advisor
STOP
```
