# 31 — Cosmile WU-A Independent Implementation Review (Google OIDC customer-identity seam)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID:    COSMILE-WUA-FULL-REVIEW-1
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; not a delta)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max in session environment, not from session name)
SKILL:        /fable-sentinel (loaded before any review action; references: review-classification,
              provenance-review, contract-review)
SESSION:      tmux session foundation-reviewer-fable5 · window 0 · pane %51 · synchronize-panes OFF
              (manifest's initial actor plan listed pane %5; pane ids shift across tmux restarts —
              live pane recorded honestly; session identity matches the manifest actor plan)
CWD:          /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
INDEPENDENCE: fresh Reviewer session; contains no Worker/Advisor work; no overlapping review
              (0 pre-existing 31_* artifacts before this review)
HANDOFF:      advisor/jobs/.../handoffs/31_COSMILE_WUA_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit 050d45ae65716da4a94da0162ac78e3f25f9f074 (read via git show at pin)
VERDICT:      PASS_WITH_CORRECTIONS
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand, before any review action)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `050d45ae` exists, contains 31_ handoff | `git cat-file -t` = commit; handoff read via `git show 050d45ae:…31_…md` | ✅ |
| Repository / branch | exact worktree + `implementation/cosmile-o1-korea-golden-commerce-v1-20260717` | exact match (`git branch --show-current`) | ✅ |
| DECLARED_BASE | `c559e7cd132e7b837dc38d01395f790499abb70d` | `git rev-parse HEAD~1` = exact | ✅ |
| CANDIDATE_HEAD | `70b8b155f447ca3dd19bfecf64506df7cdfef41b` | `git rev-parse HEAD` = exact; single commit, parent = declared base (clean ancestry) | ✅ |
| Worktree state | CLEAN | `git status --porcelain` = 0 lines (pre and post review) | ✅ |
| Upstream / ahead-behind | `origin/implementation/…` at 1/0 | upstream present; `rev-list --left-right --count` = behind 0 / ahead 1 | ✅ |
| IMPLEMENTATION_PUSHED | NO | `git ls-remote origin <branch>` = `c559e7cd` (base) — candidate not pushed | ✅ |
| foundation-docs worktree | `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_…` | HEAD = `050d45ae` (pinned handoff commit), clean, branch `advisor/cosmile-o1-korea-golden-commerce-implementation-v1-20260717` | ✅ |
| EVIDENCE_COMMIT | `023c25988fe20aab1a4b0780f41280ae23fc3e91` | exists; adds exactly 30_RESULT + 30_POINTER (+233 lines) | ✅ |
| RESULT blob/sha256 | `940f3834…` / `f26cc183…` | `git ls-tree` blob id exact; `git cat-file blob | sha256sum` = exact | ✅ |
| POINTER blob/sha256 | `4ac6b85a…` / `da1824a4…` | `git ls-tree` blob id exact; sha256 exact | ✅ |
| WU-A implementation handoff | committed @ `7b02b53c` | `git cat-file -t` = commit ("authorize Cosmile WU-A Google OIDC seam"); read at pin | ✅ |
| Reviewed O1 design pin | admission record `REVIEWED_CANDIDATE_COMMIT a1ac8016` / blob `4622b564` / sha256 `9cb21471…` | blob located at `runs/shared/…DESIGN_READINESS_V1/80_ADVISOR_INTEGRATED_DESIGN_CANDIDATE.md`; sha256 recomputed = exact; full 344 lines read | ✅ |

## 1. Authority and sources read (before review)

- Agent Office operating model `TEAM_OPERATING_MODEL.md` + `roles/reviewer.md` (current authority).
- V2 role-boundary protocol (read as required by /fable-sentinel; status `SUPERSEDED_HISTORICAL_EVIDENCE` noted).
- Cosmile repo-local `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, root `CLAUDE.md`, `app/CLAUDE.md` (security/testing rules).
- Mission job package at pin `050d45ae`: `00_ADMISSION_AND_AUTHORITY_RECORD.md`, `01_EXECUTION_MANIFEST.md`, WU-A handoff `30_…@7b02b53c`, review handoff `31_…`.
- Pinned independently reviewed O1 design (`80_` blob `4622b564`): WU-A = "customer OIDC behind existing Owner seam", provider-neutral port; provider selection was explicitly deferred to Leo — the WU-A handoff records the Founder-frozen **Google-first** decision. No design/handoff conflict.
- Worker evidence read from the pinned blobs (`git cat-file blob 940f3834…` / `4ac6b85a…`), treated as claims until directly verified.

## 2. Reviewed subject (direct inspection)

`git diff c559e7cd..70b8b155`: **19 files, +1141/−20** — matches the WU-A allowlist **name-for-name** (verified path-by-path; no extra, no missing, no deletes). Every changed file was read in full (new files) or as full diff + surrounding file (modified files). Pre-existing seam code read to validate integration claims: `app/src/lib/mockUser.ts`, `app/src/lib/cart.ts` (owner keying), base `mergeGuest.ts`, base `shopper.ts` helpers (`ownerActiveWhere`/`ownerMatches`), WU-0 identity tables in `app/prisma/schema.prisma` @ base (lines 1040–1068), gitignores, and the original repo's generated Prisma client (model-presence check only).

## 3. Explicit criterion coverage (handoff items 1–13, one by one)

**(1) Allowlist / ancestry / drift — PASS.** Exactly the 19 allowed paths; single candidate commit whose parent is the declared base; no `prisma/`, lockfile, dependency, generated-client, or `.next` path in the diff; WU-0 schema untouched (`git diff … -- app/prisma` empty by path-list). Secret/PII sweep over the full diff: 0 matches for private-key blocks, Google credential shapes (`AIza…`, `GOCSPX-…`), inline client_secret values, emails, phone patterns. `console.*` added lines: 0 in the entire diff. No runtime activation: flag default OFF + production-forced OFF (`flags.ts:28` `=== "true" && NODE_ENV !== "production"`).

**(2) Provider-neutral contract quality / Google-only containment — PASS.** `contracts.ts` holds only the neutral principal `(issuer,subject)` (`VerifiedPrincipal`), 22 closed error codes, and injected ports (Random/Clock/Jwks/TokenExchange/IdentityStore/SessionStore). The only provider-specific surface is `googleOidc.ts` (pinned constants, adapter) — replaceable without touching commerce ownership. No second provider is configured anywhere. Cosmetic note: `GoogleOidcConfig` type lives in the neutral contracts file (naming only; not a boundary defect).

**(3) Authorization request — PASS.** Pinned official endpoints (`googleOidc.ts:20-23`); scope exactly `openid` (`:80`, test asserts); PKCE S256 with 32-byte (43-char base64url) verifier (`:74`, RFC-conformant length); 32-byte state and nonce; `redirect_uri` sourced only from server env config (`readGoogleConfig`), never from the request; transaction cookies `g_state`/`g_nonce`/`g_pkce` HttpOnly, SameSite=Lax, path=/, maxAge 600s, Secure-in-production (`start/route.ts:18-25`); redirect targets are the pinned Google authorize URL (start) and fixed `/account` (callback) — **no open redirect** (no request-derived target).

**(4) ID-token verifier / fail-closed ordering — PASS.** Order verified at `googleOidc.ts:129-177`: strict parse → `alg==="RS256"` gate (alg=none/HS256 → `alg_unsupported` **before any signature use**; empty-signature b64url permitted only so the alg gate, not the parser, rejects none-tokens) → `typ` (absent or `JWT`) → non-empty `kid` → key select by kid∧RSA∧(alg∈{∅,RS256}) → RS256 signature via `createPublicKey({format:"jwk"})` + `verify("RSA-SHA256")` (throw ⇒ `signature_invalid`) → iss exact-pin → aud string/array includes clientId → azp (if present) === clientId → exp (`now >= exp` rejects; skew 0) → nbf (present∧(non-number ∨ future) rejects) → iat required ∈ `[now−300, now]` → nonce (empty expected **rejects**) → non-empty `sub`. Returns only `{issuer, subject}` — no email/name extracted. Unknown-kid ⇒ `key_unknown`; same-kid wrong-key ⇒ `signature_invalid` (tested); multiple-key selection is deterministic by kid.

**(5) JWKS / token-exchange runtime adapters — PASS with correction WUA-F2.** Configuration-before-network holds: both routes check flag → `readGoogleConfig` before constructing any port (`start:11-13`, `callback:32-34`); config is pure env-read. Failure mapping is closed: exchange non-OK ⇒ `code_exchange_failed`, thrown/aborted ⇒ `provider_unavailable` (`googleOidc.ts:208-214`); JWKS throw is caught in the callback ⇒ `provider_unavailable` 502 (`callback:53-58`); no provider payload is echoed anywhere. **However the concrete `fetch` calls (`googleOidc.ts:184`, `:203`) have no explicit timeout/abort and no response-size/shape bound before `r.json()`** — only platform defaults (~300s undici) backstop a hung endpoint. This does not leak, mis-categorize, or create a session, but it is not the *bounded* failure behavior the reviewed contract requires → finding **WUA-F2** (below). Tests correctly never invoke these adapters (injected fakes only).

**(6) One-time state / replay — PASS.** Constant-time compare (`timingSafeEqual` after length check), empty-expected always false (`googleOidc.ts:91-97`). Consumption timing: `bounded()` clears all three tx cookies on **every** callback failure path, and the success response clears them too (`callback:20-29,81`) — a replayed callback then fails `state_invalid` because the expected state is empty. Concurrent same-cookie double-submit before either response lands is bounded: idempotent bind ⇒ same customer, ≤2 session rows, no duplicate identity effect (cookie-transaction binding accepted by the reviewed design).

**(7) Opaque session token — PASS.** 32-byte CSPRNG base64url token; **only** its SHA-256 hex digest persisted (`session.ts:17-22,47-50`; schema `CustomerSession.tokenHash @unique` "hash only" — WU-0 line 1062; test asserts store contents never contain the raw token). Cookie HttpOnly/Lax/path=//maxAge 8h/Secure-when-applicable (`sessionCookieOptions`, applied at `callback:80`). Resolve predicate rejects unknown, revoked, expired (`<= now`), and non-`active` customer (suspended) — all four negatives tested. Logout: hash-based best-effort revoke + unconditional cookie clear; POST + SameSite=Lax bounds cross-site use. No raw token/code/subject appears in any log statement (0 in diff) or evidence file.

**(8) `(issuer,subject)` binding — PASS (observation R1).** Pure `bindPrincipal`: empty principal ⇒ `claims_invalid`; existing active ⇒ idempotent same customer; existing non-active ⇒ `identity_collision` default-deny; create-path errors ⇒ `persistence_failed` (all tested). Concrete repo (`repository.ts`): nested create = one atomic Prisma operation; race loser catches, re-reads the winner by the WU-0 `@@unique([issuer,subject])` (schema line 1055 — verified present at base) and returns the winner's `customerId`, else rethrows (⇒ fail-closed `persistence_failed`). Field/relation names match the WU-0 schema exactly (`issuer_subject` composite accessor, `tokenHash` unique, `customer.status`) — no unsafe cast trusting external data. Asymmetry: the race-loser re-read skips the `customerStatus` check that the normal path performs; `resolveSession` re-enforces `active` on every subsequent access, so no authenticated access materializes for a suspended account — recorded as hardening observation **R1**, not a violated invariant.

**(9) getShopper / events / mock routes / account UI / guest merge — PASS.** Flag ON: ownership derives only from `resolveSession` over the session cookie; `ownerForGoogleMode` structurally cannot return `MOCK_USER` (does not import it; tested against `demo_user_001`). Exhaustive `MOCK_USER` consumer sweep: the only ownership-bearing uses are the flag-OFF branch of `getShopper` (`shopper.ts:30`) and `mergeCurrentGuestIntoUser`'s default parameter — whose only no-arg caller is mock-login, which is 404-gated when the flag is ON (`mockAuthAvailable`). All commerce routes (cart/wishlist/checkout/orders/events/alerts/coupons/group-deal) derive owners via `getShopper`. Merge target: the callback passes the server-verified `bindPrincipal` result (`callback:73`); no request-derived value reaches `targetUserId`; the guest id is consumed inside the merge (pre-existing `jar.delete(GUEST_ID)`, base line 51 — preserved). Events route owner now from `getShopper`; the guest-events-attribute-to-`anonymousId` delta is the handoff-required derivation and was declared by the Worker (locale constant "ko" equals `MOCK_USER.locale` — no flag-OFF drift). Account UI in Google mode shows generic labels (no name/PII) and `AuthToggle` uses Google start/logout only. Flag OFF: the mock branch is byte-identical to base (diff) and the full pre-existing suite passes.

**(10) Route behavior / containment / issuance order — PASS.** Every failure returns a closed category (`{error: code}`) with no provider/error payload; the session cookie is set **only after** successful `issueSession` (`callback:68-80`), so provider/persistence failure cannot leave an authenticated state; merge failure is swallowed after identity is established and cannot alter the merge target; logout clears the cookie even if revoke fails. Status mapping: flag 404, config 503, provider 502, verification 400, collision 409, persistence 500.

**(11) Production-forced-OFF / config fail-closed / env example — PASS.** `o1GoogleAuthEnabled()` is false in production regardless of env; unset ⇒ OFF (tested with env save/restore). Missing any of client id/secret/redirect ⇒ `config_missing` before any network/persistence (pure + route order). `.env.example` adds **names only, all values empty**; no placeholder resembles a secret. No test requires a real Google credential/account (synthetic `client-123.apps.googleusercontent.com`, secret literal `"unused-in-verify"`, in-test generated RSA keys). Exception: the TTL key is inert → **WUA-F1**.

**(12) Test quality + independent reproduction — PASS.** The new suite's 35 cases each assert the **exact** closed error code (bidirectional oracles; every acceptance path has adjacent negatives: 1 valid-accept vs 15 rejection variants across the attack matrix; hash-only persistence positive vs 4 resolve negatives; idempotent bind vs collision/empty negatives; flag default-OFF vs ON). No existing test, snapshot, fixture, or oracle was modified anywhere in the diff (file list: one **added** test file only). Independently reproduced offline (no install, no network, no provider, no DB, no `prisma generate`):

```text
PRE:  HEAD 70b8b155 · git status --porcelain = 0 · app/node_modules ABSENT
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules  (gitignored: app/.gitignore:4)
RUN1: vitest run scripts/o1_google_oidc_contract.vitest.ts  → 1 file, 35 passed / 0 failed (598ms)
RUN2: vitest run                                            → 11 files, 215 passed / 0 failed (613ms)
ENV:  vitest 4.1.9 · NODE_ENV=test (vitest default) · alias @→src per app/vitest.config.ts
POST: symlink removed (app/node_modules absent) · no .next created · HEAD 70b8b155 · porcelain = 0
```

Both Worker-claimed counts (35/35 focused, 215/215 full) reproduce exactly; the 180 pre-existing tests confirm no seam regression.

**(13) Honest claim ceiling — PASS (one small note).** The Worker's proven/not-proven split matches direct inspection: live Google flow, route HTTP behavior, concrete fetch adapters, Prisma repository runtime, concurrency, build/tsc, and credentialed E2E are declared unproven/BLOCKED — correct. `build/tsc NOT_RUN` is substantively honest: the generated Prisma client in the original repo predates WU-0 (verified: 0 `AuthIdentity`/`CustomerAccount`/`CustomerSession` delegates; generated 2026-07-15 < WU-0 2026-07-17) and `prisma generate` is forbidden, so a typecheck cannot pass by construction. One stated sub-reason is factually wrong: "`next build` would emit a **non-gitignored** `.next`" — `.next/` *is* gitignored (`app/.gitignore:17`, root `.gitignore:59`). This inaccuracy does not change the NOT_RUN outcome or any claim (recorded as R5). Test labels (pure vs regression; zero db-touch) are accurate per provenance discipline.

## 4. Findings

### Required bounded corrections (owner: same Cosmile Worker; delta-only re-review by this Reviewer)

**[WUA-F1] Inert documented config key — session TTL.** `app/.env.example` (+18: `COSMILE_SESSION_TTL_SECONDS` — "(옵션) 세션 수명 상한(초). 미설정 시 코드 기본(8h)") ↔ `grep -rn COSMILE_SESSION_TTL_SECONDS app/src app/scripts` = **0 matches**; `callback/route.ts:68,80` always uses `DEFAULT_SESSION_TTL_SECONDS`. The Worker result §13.3 also lists the key as operator-settable. **Violated invariant:** WU-A handoff §8 config truthfulness — declared keys carry "safe descriptions" of real behavior; a documented-but-inert *security* knob (session lifetime) makes the operator runbook silently false at credential time. **Failure scenario:** Leo sets `COSMILE_SESSION_TTL_SECONDS=900` per the checklist; sessions still live 8h; nothing signals the value was ignored. **Affected allowlist paths:** `app/.env.example`, `app/src/app/api/auth/google/callback/route.ts`, `app/src/lib/auth/session.ts`, `app/scripts/o1_google_oidc_contract.vitest.ts`. **Required evidence:** either (a) wire the key — bounded positive parse (integer, clamped to a sane max; invalid/absent ⇒ 8h default) applied to both DB `expiresAt` and cookie `maxAge`, with positive test (set ⇒ reflected) plus adjacent negatives (unset ⇒ default; invalid/negative/oversized ⇒ bounded default, never unbounded TTL); or (b) remove the key from `.env.example` and declare the removal (and the checklist correction) in the correction result. Option (a) matches the already-published checklist.

**[WUA-F2] Unbounded concrete provider fetches (timeout/size).** `app/src/lib/auth/googleOidc.ts:184` (`fetch(config.jwksUri…)`) and `:203` (`fetch(config.tokenEndpoint…)`) have no explicit timeout/abort and parse `r.json()` with no size/shape bound (`:186,:209` unchecked casts). ↔ WU-A handoff §5 "provider failure returns a **bounded** category" and review-handoff item 5's explicit bounded-input/output/timeout lens. Closed-category mapping and no-leak behavior are correct, and downstream verification rejects malformed keys fail-closed; but a hung endpoint holds the callback for platform-default (~300s undici) rather than a designed bound. **Failure scenario:** at credential-gated runtime rehearsal, a stalled/tarpitted endpoint (or interposed proxy) pins server connections for minutes per attempt instead of returning `provider_unavailable` promptly; an oversized response is parsed unboundedly into memory. **Affected allowlist paths:** `app/src/lib/auth/googleOidc.ts`, `app/scripts/o1_google_oidc_contract.vitest.ts`. **Required evidence:** bounded timeout (e.g. `AbortSignal.timeout(<bounded const>)`) on both fetches ⇒ abort maps to `provider_unavailable`/`code_exchange_failed`; bounded response handling (size cap or strict shape guard before/at parse) ⇒ closed category; offline unit tests with an injected/stubbed global fetch proving positive (bounded success) plus adjacent negatives (hang/abort ⇒ closed category; oversized/malformed body ⇒ closed category, no throw escape). No network, credential, or install is needed for this evidence.

### Residual observations (no WU-A correction required; carried forward)

- **[R1]** `repository.ts:27-33` race-loser re-read returns the winner `customerId` without re-checking `customer.status` (pure path denies non-active at `session.ts:96`); `resolveSession` re-enforces `active` on every access, so no authenticated access can materialize. Optional hardening: status check in the re-read.
- **[R2]** Google mode has no guest-id mint (mock-logout is 404-gated; nothing else sets `cosmile_gid`), so pre-login guests have `guestId=null`: `ownerActiveWhere` maps null to the `"__none__"` sentinel (`shopper.ts:35-38`) — **no cross-owner access is possible** — but guest cart/wishlist continuity is inert in Google mode and each `addItem` can orphan a fresh cart row (`cart.ts:14`). Consistent with O1's signed-in rehearsal scope (guest checkout deferred); belongs to a later WU.
- **[R3]** Non-allowlist surfaces still render the mock persona under flag ON (`app/src/app/page.tsx:86`, `products/[id]/page.tsx`, `CategoryDrawer.tsx:44`, consult page; `locale: MOCK_USER.locale` metadata in various event calls). Display/metadata only — no ownership effect; correctly untouched (outside the WU-A allowlist).
- **[R4]** `GoogleOidcConfig` lives in provider-neutral `contracts.ts` (naming/placement cosmetic).
- **[R5]** Worker NOT_RUN sub-reason inaccuracy: `.next` **is** gitignored (`app/.gitignore:17`); the controlling reason (WU-0-less generated Prisma client + forbidden `prisma generate`) is verified true.
- **[R6]** Runtime surfaces remain unproven exactly as declared (routes over HTTP, concrete adapters, Prisma runtime, live Google, concurrency, build/tsc) — credential-gated; the natural next evidence per the Worker's own §9/§13 checklist.

## 5. Excluded scope and why

- No push, patch, stage, commit of product code; no credential request; no WU-B/C/D/E/F/G inspection beyond confirming the candidate does not start them (path set is identity-seam only).
- No live Google/network/DB/provider execution (forbidden; credential-gated by design) — review of those surfaces is structural + synthetic only, and the claim ceiling reflects that.
- `npm run build`/`tsc`/lint not run (would require forbidden `prisma generate`; see item 13).
- Non-allowlist mock remnants (R3) not treated as defects — changing them in WU-A would have been scope expansion.

## 6. Conflicts found

None at contract level: WU-A handoff ↔ pinned O1 design ↔ WU-0 schema ↔ code are consistent (Google-first is the recorded Founder freeze over the design's deferred provider choice; seam/flag/identity-key/session-hash contracts land name-for-name). The only reported-vs-actual mismatches found are WUA-F1 (env key claims behavior code lacks) and R5 (gitignore sub-reason), both recorded above.

## 7. Verdict rationale

All thirteen required determinations resolve to satisfied with direct evidence; the security core (verifier ordering, hash-only sessions, default-deny binding, flag containment, no-MOCK_USER ownership, closed error surfaces, no secret/PII) is implemented and independently reproduced (35/35 + 215/215, offline). The two findings are real, small, in-allowlist, and bounded — they do not make the candidate unsafe as a default-OFF, credential-gated, unpushed base, but WUA-F1 falsifies the published operator checklist and WUA-F2 leaves the credential-gated runtime path without a designed failure bound, and no later WU necessarily reopens these files. Per the handoff's correction routing, the honest verdict is **PASS_WITH_CORRECTIONS** (V2 vocabulary mapping: NEEDS_PATCH-equivalent routing — same Worker corrects, same Reviewer delta-reviews `70b8b155..<new-candidate>` only). No authority, security, scope, or feasibility blocker exists ⇒ not HOLD/FAIL.

```text
VERDICT: PASS_WITH_CORRECTIONS
REQUIRED_CORRECTIONS: WUA-F1, WUA-F2 (bounded; same Cosmile Worker; new additive commit on the mission branch)
RE_REVIEW: this Reviewer, delta-only 70b8b155..<new-candidate>
RESIDUAL_NON_BLOCKING: R1–R6 (no WU-A action required)
CANDIDATE_PUSH: withheld pending corrections + delta re-review (per manifest: only reviewed PASS heads are pushed)
REVIEWER_ACTIONS_NOT_TAKEN: no patch, stage, commit, push, dispatch, credential request, risk acceptance, or new WorkUnit
RETURN_TO: foundation-advisor
STOP
```
