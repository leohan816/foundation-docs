# Independent Candidate Review — O1 Browser Non-Production Runtime

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REVIEW_PASS: IMPLEMENTATION_REVIEW
REVIEW_PHASE: CREDENTIAL_INDEPENDENT_IMPLEMENTATION_CANDIDATE
REVIEWER_ACTOR: foundation-reviewer-fable5
LIVE_RUNTIME: model claude-fable-5 (Fable 5 family, verified from runtime system prompt);
              tmux session foundation-reviewer-fable5:0.0; synchronize-panes UNSET (OFF);
              effort max per dispatch (no in-session introspection interface; model identity verified live)
SESSION_SEPARATION: this session contains only the review dispatch — no Worker/Advisor context
OVERLAPPING_REVIEW: none (reviewer temp dir absent at start; no 20_* artifact existed in runs/shared)
SKILL: /fable-sentinel (loaded)
PATCH_AUTHORITY: NONE (nothing patched, staged, committed, pushed, or dispatched)
VERDICT: PASS
RETURN_TO: foundation-advisor
```

## 1. Cryptographic anchors verified (Git, not memory)

```text
REVIEW_HANDOFF: b597b364ea5dec896e04f53b75187a1dee11e5e9
  path advisor/jobs/.../20_INDEPENDENT_CANDIDATE_REVIEW_HANDOFF.md
  blob 2e388ba2bf68170f22dac3fd57a410e5436d7622                       MATCH
  sha256 6aa109c36d9f59aa72260bb9c5a47e986128754009fd37f4f87e461e20462e7e  MATCH
EVIDENCE_COMMIT: cadb51e0d53183d8e1cba9129963aa4e1b361f70 (parent of the dispatch commit)  EXISTS
WORKER_RESULT blob dd577477eb437f71aeadc76b737637c3647f3a5d
  sha256 e3f546a2bb81f4c662d870f7872956aaab06f371805c03112ce859221a784330  MATCH
WORKER_POINTER blob fb24768d83a31cc3d96767fd4469d95130af0b19
  sha256 3d70232eb8edcf5c10f5fc5cf06bf2fc9a7d09129d2fa7370f0af20209009ec9  MATCH
CANDIDATE_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
BASE: 63fdd2d507357861aec582b980006baa7d7045a4
CANDIDATE_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1 (= HEAD, pre-review AND post-review)
PARENT_CHAIN: 63fdd2d -> 6a3b718 (candidate 1) -> 00feea3 (candidate 2, additive; candidate 1 not amended)
WORKTREE_STATUS: CLEAN before review, CLEAN after all reruns
PUSHED: NO (as declared)
```

Authority read before review: agent-office `TEAM_OPERATING_MODEL.md` + `roles/reviewer.md`
(current authority), V2 protocol (superseded historical background), and the pinned
admission / allowlist / correction-1 / correction-2 / founder-reuse-check / worker-handoff /
credential-checklist documents, all at commit `cadb51e` (snapshot-pinned via `git show`).

## 2. Containment — full diff 63fdd2d..00feea3 (45 files, +3978/−39)

- **Allowlist: EXACT MATCH.** All 45 changed paths reconcile file-by-file against the
  original allowlist (8 modified existing + 30 new) + correction 1 (exactly its 7 paths) +
  correction 2 (exactly its 1 path). Nothing outside `app/`. Allowlisted-but-unchanged files
  (flags.ts, checkout.ts, foundationProductClient.ts, account/orders, WU-A google
  start/callback routes) confirmed untouched — the reviewed WU-A OIDC route is byte-identical
  to the predecessor-reviewed state, so state/nonce/PKCE/token/JWKS/claim verification and
  exact redirect binding are retained by construction.
- **No schema/migration/package/lockfile/next.config/.gitignore change** (grep over the full
  name list: none touched). No Foundation/SIASIU/foundation-control/protected-branch/production
  change. No legacy console/admin path touched.
- **No secret/credential/PII in the diff.** Credential-shaped-literal scan over all added
  lines: none found. Only connection strings are the disposable loopback container's
  throwaway `postgres:postgres` bootstrap and a refused-case example inside a test.
  `.env.example` carries names only; the one added name `O1_TOSS_LOCAL_SUBSTITUTE` is a
  declared non-credential local switch, documented and production-refused. `.env.local` is
  absent from the worktree (existence check only; nothing read).
- **Default OFF / production refused:** exact-string `"true"` + `NODE_ENV !== "production"`;
  `readO1RuntimeConfig` evaluates production refusal FIRST; contract + property tests pin
  both (arbitrary flag values under production never enable).

## 3. Required direct review — item-by-item

**Identity / access / preview**
- Google remains the only OIDC provider; WU-A routes unchanged (see §2).
- Guest/mock cannot enter O1 checkout — structural: `startO1Checkout`/`confirmO1Payment`
  call `readO1RuntimeConfig` first, which fails closed (`google_auth_disabled`) unless
  `COSMILE_O1_GOOGLE_AUTH_ENABLED="true"`; with that flag ON, `getShopper` derives ownership
  ONLY from the verified WU-A session (MOCK_USER exists only in the flag-OFF legacy branch);
  guest (`userId null`) denied at route and runtime.
- Operator authority = verified immutable Google issuer+subject vs server-only exact
  allowlist (`o1Operator.ts`): issuer must equal `GOOGLE_ISSUER`; digits-only subject format
  required on BOTH sides so an email/username/display-name/session-id can never match;
  allowlist unconfigured → default deny; DB read failure → deny. Contract test proves an
  allowlist literally containing an email never authorizes. Customer and operator identities
  are separate accounts by construction (operator resolution reads the AuthIdentity row of a
  separately authenticated session; a mock id has no AuthIdentity row).
- Test-only step-up: explicitly labeled non-production/not-MFA in code and UI; single grant
  bound to exact {action, operator, order scope, reason, freshness}; server-minted single-use
  nonce consumed before verification; secret compared timing-safe; unconfigured/absent/
  mismatch → deny-all. Property test: authorizes at most once per minted nonce.
- Preview gate: middleware enforces before any route/page when O1 ON + secret configured;
  denial is bounded (302 `/preview` or 403 JSON); exemptions are the four exact-string paths
  only (property test: no generated path other than the four literals is exempt), and each
  exempt route independently fails closed (OIDC checks / untrusted-webhook discipline / the
  gate's own entry). Cookie carries a domain-separated SHA-256 derived token — never the
  secret; httpOnly, SameSite=Lax, bounded 8h, `secure` keyed to the actual TLS protocol
  (correct for a non-production TLS preview). Unconfigured secret → `previewAccessAllowed`
  denies everything.

**Catalog / price / inventory / order / refund / webhook**
- O1 catalog = snapshot-eligible synthetic ELT only, via the reviewed WU-D fail-closed
  `catalogDecision`; non-eligible product detail in O1 mode → `notFound` with NO legacy
  fallthrough (`decideProductRoute`, 2×2 matrix tested); flag OFF → legacy behavior
  preserved exactly.
- Local Foundation bundle: written/read/imported/bound ONLY through the reviewed canonical
  serializer (`contentSha256`/`canonicalBytes`), importer (byte re-verification), and binder.
  No second hashing path; no synchronous Foundation dependency (local files only; no
  Foundation network call in the runtime).
- Price: `resolveUnitPrice` remains the single Cosmile KRW authority; snapshot never prices;
  non-KRW SKU fails closed; client `clientExpectedPrice` goes only through the reviewed
  reconfirmation mechanism and the server price always charges.
- Reserve-before-provider: enforced by code order (revalidate → order row → RESERVE →
  internal intent (WU-B re-checks the COMPLETE reservation set in the locked txn) →
  provider). Property tests over the reviewed WU-F world: ZERO provider calls in all 9
  rejecting cases and in every insufficient-stock case; oversell default-deny (WU-C).
- Money truth: browser return contributes only the opaque `paymentKey`; amount/orderNo/intent
  re-read from durable state; ownership enforced with unified not-found (no existence
  probing); Toss confirmation bound to internal order + exact positive-integer KRW + payment
  key + currency + state via reviewed WU-B; fail route changes NO state (reservation held —
  never released by a browser callback); non-DONE provider results never commit AND never
  release (property-tested over 9 scripts, HOLD direction).
- Webhook: no invented signature for general payment; size-bounded before parse (route +
  reviewed lane); idempotent untrusted inbox; hint used only as a query driver; server pull
  verification against the durable tuple; replay of the same provider event refused
  (disposable-DB assertion); always-bounded acknowledgment.
- Refund: full-capture only through reviewed WU-B (`cancelReason` only — `cancelAmount`
  grep-verified absent from the entire payment lane and diff except prohibition comments);
  WU-B authorization and WU-E finalization share the SAME step-up verdict; inventory stays
  committed/HOLD — disposable-DB test asserts committed + zero released/expired after refund,
  and second-refund refusal; idempotency key gives replay zero second economic effect.
- Shipment: record-only (`advanceFulfillment`), no carrier contact, labeled record-only in
  route response and UI.
- Projections: customer view = reviewed WU-E sanitized projection (no internal id/payment
  key/intent/capture/provider ref — verified in route and component); operator view =
  categories/counts/booleans (7 fields); operator list = orderId + opaque orderNo + status
  category, LIMIT-bounded; checkout start returns only owner's orderId, opaque orderNo,
  server amount, public client key, evidence layer (internal `intentId` is dropped at the
  route).

**Founder reuse disposition — verified against ground truth**
Direct inspection confirms every row of the Worker's table: `api/admin/orders` returns raw
full Order rows (`findMany({ include: { items: true } })` with userId/guestId/amounts) under
console-password authority — UNSAFE as claimed; `admin/orders/[orderId]/status` is a direct
`Order.status` patch with no capture verification/step-up/provider reversal/inventory
transition — reusing it for refund would make an admin field money truth (violates handoff
invariant 1); console authority is a local password account (wrong authority axis vs
immutable Google sub); shipment/reconciliation surfaces: my own grep confirms NONE exist
outside the new O1 files; commerce dashboard is MATERIAL/out-of-scope. Preserving the
minimal O1 operator surface is the correct disposition; no operator capability broadened;
no legacy console path touched (diff-verified).

**Corrections**
- Correction 1: all seven files are type-only or strictly strengthening — two transaction
  return-type annotations (snapshotRepository), the already-existing `providerIntentRef`
  column added to the SELECT + both IntentRow projections (read-only; NULL stated on fresh
  intents; no write/transition change), canonical-owner import move (ReservationStatus),
  `unknown`-bridge casts, added not-null assertions, canonical input-type annotations with
  identical "KRW" values. No test deleted/skipped/weakened; no diagnostic-site overreach.
- Correction 2: the single added file is exactly the authorized bridge — static imports are
  only vitest/node built-ins; runtime graph (incl. PrismaClient) loads dynamically only on
  the guarded one-shot path; exact flag `"1"` with near-miss values denied; refuses
  production, non-loopback DB, relative/in-repo bundle roots BEFORE any DB work; bounded
  boolean/count evidence; teardown removes the bundle tree; no route/endpoint/dependency.

**Declared deviation D-1** (runtime transport copy of the out-of-allowlist script twin):
mitigated by a real equivalence test — both modules imported side-by-side; origin, timeout,
byte cap pinned equal; full allowed/denied path matrix parity; every credential/flag refusal
category parity; non-vacuity asserted. Divergence fails the suite.

## 4. Independent reruns (no credential, no provider, no tunnel, no production)

Pre-rerun: clean tree at `00feea3`. Post-rerun: clean tree at `00feea3`.

```text
npx prisma generate                    PASS  no tracked modification (containment clean)
npx tsc --noEmit --pretty false        PASS  0 errors (claimed baseline 19 -> 0 confirmed)
npx vitest run (full)                  PASS  25 files · 590 passed · 6 skipped  (= claim)
focused (contract+property+fixture)    PASS  3 files · 61 passed · 4 skipped    (= claim)
npx next build                         PASS  exit 0; /api/o1/**, /o1/operator, /preview in artifact
python3 o1_browser_runtime.dbtest.py   PASS  33/33; disposable postgres:16-alpine, tmpfs,
                                             loopback random port; container removed = True;
                                             zero leftover containers (verified)
one-shot fixture (reviewer-owned DB)   PASS  existing migration chain applied cleanly;
                                             O1_FIXTURE_ONESHOT=1 -> 4 passed + 2 skipped;
                                             canonical seed/import/binding + idempotent replay;
                                             bundle dir removed = YES; container removed = YES
playwright golden order / reversal     SKIP  exit 2 fail-closed precondition gates confirmed
                                             live (SKIP != PASS; no browser evidence exists)
```

Evidence-layer honesty confirmed: pure suite / disposable-DB / deterministic-local-substitute
/ official-provider layers are labeled distinctly in code, UI, tests, and the Worker result;
no official-provider claim is made anywhere in the candidate.

## 5. Excluded scope (and why)

- Official Google/Toss execution, TLS tunnel, browser Golden Order/Reversal: credential- and
  owner-gated; NOT_RUN in this phase per the handoff ("do not accept ... those gates remain
  NOT_RUN"). Their fail-closed skip behavior was verified instead.
- Predecessor-reviewed WU-A..WU-G lane internals: re-reviewed only at their O1 composition
  seams (narrow-delta rule); their content is covered by the predecessor PASS at `63fdd2d`.
- eslint rerun: not among the handoff's required rerun categories; superseded by tsc/build/
  test evidence.

## 6. Residual observations (none blocking; no risk acceptance required)

- OBS-R1 `o1CommerceRuntime.ts:359` — the `intent_absent` rejection hardcodes evidence layer
  `DETERMINISTIC_LOCAL_COMPOSITION` (transport not yet resolved at that point). Cosmetic
  label in a no-effect error path; no economic or evidence-class impact.
- OBS-R2 `middleware.ts` — the preview gate enforces only when the secret is configured
  (legacy local dev unchanged). O1-ON + unconfigured-secret + tunnel would be ungated, but
  the runbook's completion gate 3 (deny-verification BEFORE tunnel start) fails exactly in
  that state, the tunnel is owner-controlled, and tunnel is NOT_STARTED this phase.
  Procedurally fenced; recommend the pre-tunnel checklist keep that verification mandatory.
- OBS-R3 — the `o1CommerceRuntime` composition functions are exercised this phase at the
  reviewed WU-F harness-mirror + typecheck/build level; direct route-level execution arrives
  only with the credential-gated browser phase. Consistent with the claim ceiling (no browser
  execution claimed).
- OBS-R4 `o1Operator.ts` — in-process single-use nonce registry is single-process only;
  explicitly labeled non-production; restart drops nonces (deny direction).
- OBS-R5 `o1_browser_runtime.dbtest.py` docstring still describes the TS-runner LIMITATION
  that correction 2 has since resolved (stale comment only; the dbtest's own claims remain
  accurate, and the design doc + revised result record the resolution).

## 7. Verdict rationale

Every changed path is inside the combined committed allowlist; forbidden surfaces are
untouched; every handoff invariant was verified in code (not from summaries) with meaningful
bidirectional/property tests; both corrections stayed exactly within their authorizations;
the founder reuse disposition matches ground truth; all seven required rerun categories
reproduce the Worker's evidence bit-for-bit at the same HEAD; evidence layers and the claim
ceiling are honest; residuals are note-level with no safety-weakening path, no
source-of-truth pollution, no join-key/enum contract break, and no undecidable value.

```text
VERDICT: PASS
MAXIMUM_ACCEPTABLE_PHASE_CLAIM:
REVIEWED_CREDENTIAL_INDEPENDENT_NON_PRODUCTION_BROWSER_RUNTIME_CANDIDATE

BROWSER_GOLDEN_ORDER: NOT_RUN
BROWSER_GOLDEN_REVERSAL: NOT_RUN
OFFICIAL_GOOGLE_EXECUTION: NOT_RUN
OFFICIAL_TOSS_EXECUTION: NOT_RUN
TUNNEL: NOT_STARTED
CONTROLLED_LIVE: NOT_AUTHORIZED
PAID_BETA: NOT_AUTHORIZED
PUBLIC_LAUNCH: NOT_AUTHORIZED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
RETURN_TO: foundation-advisor
```
