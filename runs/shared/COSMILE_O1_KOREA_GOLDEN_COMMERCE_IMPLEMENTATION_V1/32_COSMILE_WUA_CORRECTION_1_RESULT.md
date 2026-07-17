# 32 — Cosmile WU-A Correction Cycle 1 Result (WUA-F1, WUA-F2)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-A-CORRECTION-1
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (same session; dispatcher-confirmed for this session; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (reconfirmed loaded before edits)
HANDOFF:      advisor/jobs/.../handoffs/32_COSMILE_WUA_CORRECTION_1_HANDOFF.md @ 7d96fea6a8fac267e99dbec91a1daf031002a61d (committed; working-tree == committed blob, verified)
STATUS:       COMPLETE — one additive correction commit · focused 55/55 + suite 235/235 · READY_FOR_DELTA_RE_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Pins verified before any edit (first-hand, local-only — no network)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Correction handoff | `32_…@7d96fea6` | FDOCS HEAD == `7d96fea6`; committed ("route bounded WU-A corrections to Cosmile Worker"); working-tree == committed | ✅ |
| Repository / branch | exact worktree + mission branch | exact | ✅ |
| OLD_REVIEWED_CANDIDATE | `70b8b155f447…` | HEAD == `70b8b155…` (pre-edit), clean | ✅ |
| Upstream / ahead-behind | `origin/…` at `1/0` | upstream present, 1 ahead / 0 behind, not pushed | ✅ |
| Review evidence | commit `bf9358fd`, blob `79b97758`, sha256 `a611b9e5…`, VERDICT PASS_WITH_CORRECTIONS | all match exactly; REQUIRED_FINDINGS WUA-F1, WUA-F2 | ✅ |
| Worktree clean | CLEAN | clean pre-edit | ✅ |
| Model / Effort / Skill | Opus 4.8 (1M) / max / /fable-builder | verified / carried-forward (same session) / reconfirmed | ✅ / ⚠️ recorded / ✅ |

## 1. Correction scope

Corrected **only** the two independently reviewed findings (WUA-F1, WUA-F2) within the **five** allowed
already-reviewed WU-A paths. No residual observation R1–R6 was corrected. No schema/migration/Prisma-artifact/
dependency/lockfile change; `repository.ts`, `shopper.ts`, `mergeGuest.ts`, `events/route.ts`, UI, WU-0, and any
later WU were **not** touched (verified by name — see §5).

## 2. WUA-F1 — session TTL made real and bounded

**Root cause (review §4 WUA-F1):** `COSMILE_SESSION_TTL_SECONDS` was documented but inert (0 code references);
the callback always used the 8-hour default → the published operator checklist was silently false.

**Fix — code:**
- `app/src/lib/auth/session.ts`: added `MIN_SESSION_TTL_SECONDS = 60` and one pure parser
  `resolveSessionTtlSeconds(env)` — positive integer **clamped to `[60s, 8h default]`**; absent/empty/
  non-integer/`NaN`/`Infinity`/zero/negative → **8h default**; `Math.min(DEFAULT, Math.max(MIN, n))` so **no
  value can extend a session beyond 8h**.
- `app/src/app/api/auth/google/callback/route.ts`: `const ttlSeconds = resolveSessionTtlSeconds(process.env)`
  computed **once**, passed to **both** `issueSession({…, ttlSeconds})` (DB `expiresAt`) **and**
  `sessionCookieOptions(ttlSeconds, secure)` (cookie `maxAge`) — the same resolved value at both call sites
  (direct code inspection: one local `ttlSeconds`, two uses; the prior `DEFAULT_SESSION_TTL_SECONDS` import was
  replaced).
- `app/.env.example`: description now states "양의 정수만 유효 · [최소 60초 ~ 최대=기본 8h(28800초)] clamp · 미설정/
  0·음수/비정수 → 기본 8h · 8h 초과 불가 · DB 만료와 세션 쿠키 maxAge에 동일 적용" — **names-only, value empty, no new key**.

**Fix — tests (`o1_google_oidc_contract.vitest.ts`, WUA-F1 block, 4 cases):** absent/empty/`abc`/`1.5`/`0`/
`-30`/`Infinity` → default; `"30"`/`"1"` → 60 (sub-min clamp); in-range `"900"`/`"60"` pass through; oversized
`DEFAULT+100000`/`"999999999"` → 8h (`≤ DEFAULT`); **configured `900` reflected in BOTH** `issueSession`
`expiresAtSeconds == NOW+900` **and** `sessionCookieOptions(ttl).maxAge == 900`; absent → default applied
identically to both.

## 3. WUA-F2 — both concrete provider fetches bounded

**Root cause (review §4 WUA-F2):** `fetch(jwksUri)` / `fetch(tokenEndpoint)` had no timeout/abort and parsed
`r.json()` with no size/shape bound → a stalled/oversized endpoint could pin the callback for undici's
~300s default and parse an unbounded body.

**Fix — code (`app/src/lib/auth/googleOidc.ts`):** one **shared, deterministic** bound used by both adapters:
- `boundedProviderFetch(url, init)`: `AbortController` aborting at **`PROVIDER_FETCH_TIMEOUT_MS = 10_000`** (≤10s);
  a numeric `content-length` **> `PROVIDER_MAX_RESPONSE_BYTES = 256*1024`** rejects **before any body read/parse**;
  `readBodyCapped` streams the body and throws as soon as the running byte count exceeds the cap (so an
  absent/lying `content-length` cannot bypass it), with an `arrayBuffer` fallback that re-checks byte length.
- **Token exchange**: non-OK status → `code_exchange_failed`; `JSON.parse` throw / non-object / array →
  `code_exchange_failed`; `id_token` must be a **non-empty string with `length ≤ MAX_ID_TOKEN_CHARS = 8192`**;
  fetch throw/abort/too-large → `provider_unavailable`. Returns only `{idToken}`.
- **JWKS**: non-OK → throw; malformed JSON / non-object → throw; `keys` must be an array with
  `1 ≤ length ≤ MAX_JWKS_KEYS = 20`; each entry validated by `toValidJwk` (required **non-empty string**
  `kty/kid/n/e`; optional string `alg/use`) — a malformed entry **fails closed (no unchecked cast)**. The
  callback catches any JWKS throw → `provider_unavailable` (unchanged).
- **No leakage**: every failure maps to an existing **closed** category; no provider body/error is returned or
  logged (0 `console.*`). **No external library/dependency change.**

**Fix — tests (WUA-F2 block, 16 cases; `globalThis.fetch` stubbed offline, restored in `afterEach`):**
token-exchange — bounded valid success; non-OK → `code_exchange_failed`; fetch throw → `provider_unavailable`;
declared-oversized (`content-length` > cap) rejected without parsing → `provider_unavailable`; undeclared
oversized body rejected after byte count → `provider_unavailable`; malformed JSON / invalid shape / oversized
`id_token` → `code_exchange_failed`. JWKS — bounded valid success (validated array); non-OK / fetch-throw /
declared-oversized / undeclared-oversized / malformed-JSON / invalid-shape (`keys` not array, empty) /
malformed-entry (missing `e`) all throw fail-closed. **No real network, Google account, credential, token, PII,
or provider call** (synthetic stubs only).

## 4. Test + Git evidence

```text
DELTA:  git diff 70b8b155f447ca3dd19bfecf64506df7cdfef41b..2b8efdcc484d211a7cc6957c3d632a073afefbe4
        = 5 files, +291 / -17  == exactly the 5 allowed correction paths (name-for-name)
NEW_CANDIDATE_HEAD: 2b8efdcc484d211a7cc6957c3d632a073afefbe4 (parent = OLD_REVIEWED_CANDIDATE 70b8b155; additive; no amend/rebase/squash/force)
PRE_GIT:  branch implementation/…-20260717 @ 70b8b155 (clean; 1 ahead / 0 behind; not pushed)
POST_GIT: same branch @ 2b8efdcc (clean; 2 ahead / 0 behind; NOT pushed)
FOCUSED:  vitest run scripts/o1_google_oidc_contract.vitest.ts -> 1 file, 55 passed / 0 failed (35 prior + 4 WUA-F1 + 16 WUA-F2)
FULL:     vitest run -> 11 files, 235 passed / 0 failed (215 prior + 20 new; no regression)
DEP_SOURCE: original repo /home/leo/Project/Cosmile/app/node_modules via a gitignored symlink for the run only; removed after (app/node_modules absent); no install/update, no lockfile, no prisma generate
CLEANUP:  symlink removed · no .next created · tracked state == the 5 allowlist paths only
SECRETS/PII: none — .env.example TTL key value empty; 0 real Google/private-key/email signatures in the diff
BUILD/LINT/TSC: NOT_RUN — the original repo's generated Prisma client predates WU-0 (no CustomerAccount/AuthIdentity/CustomerSession delegates) and `prisma generate` is forbidden, so a typecheck cannot pass by construction (corrects prior R5 note: `.next` IS gitignored — that was never the controlling reason). Vitest transpiles and runs the exercised pure modules offline.
```

## 5. Preserved residual observations R1–R6 (NOT changed this cycle)

Per the handoff, no R was authorized for correction; each is carried forward as a **non-blocking observation**,
not silently altered:

- **R1** — `repository.ts` race-loser re-read omits the `customer.status` recheck; `resolveSession` re-enforces
  `active` on every access. `repository.ts` is **outside the 5 allowed paths** → deliberately untouched.
- **R2** — Google mode has no guest-id mint (guest continuity inert; no cross-owner access) → later WU.
- **R3** — non-allowlist surfaces still render the mock persona under flag ON (display/metadata only) → outside allowlist.
- **R4** — `GoogleOidcConfig` placement in `contracts.ts` (cosmetic) → unchanged.
- **R5** — the prior WU-A `.next`-not-gitignored NOT_RUN sub-reason was inaccurate; the controlling reason
  (pre-WU-0 generated Prisma client + forbidden `prisma generate`) is true and restated correctly in §4.
- **R6** — runtime surfaces (routes over HTTP, concrete adapters at runtime, Prisma runtime, live Google,
  concurrency, build/tsc) remain unproven as declared — credential-gated; the natural next evidence.

## 6. What is proven / not proven

**Proven (offline, deterministic):** the TTL parser bounds every documented case and is applied identically to
DB expiry and cookie lifetime; both provider adapters are timeout- and size-bounded with strict shape
validation and closed-category, non-leaking failure mapping. Focused 55/55 + full 235/235 reproduce offline.

**Not proven (unchanged from WU-A):** live Google flow, route HTTP behavior, the concrete adapters against a
real endpoint, Prisma repository runtime, real concurrency, and build/tsc — all credential-gated BLOCKED / NOT_RUN.

## 7. Next review question set (delta re-review, `70b8b155..2b8efdc`)

1. Does `resolveSessionTtlSeconds` reject every non-positive-integer and clamp to `[60, 8h]` with no path
   exceeding 8h, and does the callback pass the **same** resolved value to DB expiry and cookie maxAge?
2. Is the ≤10s abort wired on **both** fetches, and is the ≤256KiB cap enforced both **before** (content-length)
   and **after** (streaming/byte count) — including the undeclared-content-length case?
3. Do all fetch/timeout/oversize/malformed/shape failures map only to existing closed categories with **no**
   provider body/error returned or logged, and does JWKS validation avoid any unchecked cast?
4. Is the diff exactly the 5 allowed paths, additive on `70b8b155`, with R1–R6 untouched and no dependency/
   Prisma/WU-0 change?

## 8. rollback

Revert the single correction commit `2b8efdcc…` (the branch returns to the reviewed WU-A candidate `70b8b155`);
nothing was pushed; no runtime/DB state exists.

```text
PRODUCT_CODE_CHANGED: YES (two bounded corrections; still default-OFF, credential-gated)
DEPENDENCY/LOCKFILE/PRISMA_ARTIFACT/WU0_SCHEMA/REPOSITORY/SHOPPER/MERGE/EVENTS/UI_CHANGED: NO
NEW_CANDIDATE_HEAD: 2b8efdcc484d211a7cc6957c3d632a073afefbe4  (parent 70b8b155…; additive)
IMPLEMENTATION_PUSHED: NO
FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes)
REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/NETWORK/PROVIDER/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
