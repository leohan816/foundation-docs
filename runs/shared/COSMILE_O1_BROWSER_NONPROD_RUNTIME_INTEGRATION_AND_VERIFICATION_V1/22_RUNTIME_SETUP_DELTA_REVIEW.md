# Same-Reviewer Delta Review — Runtime Fixture Preservation Correction

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REVIEW_TYPE: SAME_REVIEWER_DELTA_ONLY (IMPLEMENTATION_REVIEW pass; baseline = 20_ full review, PASS)
REVIEWER_ACTOR: foundation-reviewer-fable5 (same session/actor as the 20_ full review; the patch
                author is the Cosmile Worker — no self-review)
SKILL: /fable-sentinel (+ delta-review reference)
PATCH_AUTHORITY: NONE (nothing patched, staged, committed, pushed, dispatched)
VERDICT: PASS
RETURN_TO: foundation-advisor
```

## 1. Cryptographic anchors verified (Git, not memory)

```text
DELTA_HANDOFF: 04a00249eefb4895523b871cea62863b6b7e1224
  path .../22_RUNTIME_SETUP_DELTA_REVIEW_HANDOFF.md
  blob 1cb30cfe30854bc48d55d15ba284dd698c39a869                        MATCH
  sha256 932d2d36254df3a921d170ad89cb889f87b78997072e117e312044cf509fdbc6  MATCH
CORRECTION_HANDOFF: 520067c2ab8f729f6b68a508794bd8d26530df1e
  path .../21_RUNTIME_SETUP_CORRECTION_HANDOFF.md
  blob 75254682f9431d128efb3610c10ee0afd93d3dd8 / sha256 95da50dd...6a18ba   MATCH
CORRECTED_WORKER_RESULT: 5140028250a8d983321e3e06d3d54fe653b48c59
  path runs/shared/.../21_RUNTIME_SETUP_CORRECTION_RESULT.md
  blob b3c9ff4ff32ce0a155fe9fdd2c2633053594ee3a / sha256 014136ee...69c9     MATCH
  pointer blob 2968cfa449f7c446be4ffed5dfcef22f0c62b4a3 / sha256 f431e53c...31c5  MATCH
  (both additive at 5140028; the original 10_ result blobs remain untouched — history preserved)
CHAIN_CONSISTENCY: the correction handoff pins the published 20_ review result
  (blob 98171da3 @ 1a46444, SHA256 ff8bbbf5...0e047c) — byte-identical to the temp artifact this
  reviewer authored and hash-reported in the publication preflight.
CANDIDATE: OLD_HEAD 00feea3193a946963b15ded90d062db0ce1fdda1
           NEW_HEAD d5c762fcf4029f7027daad02a18ffae43e62e5ab (= worktree HEAD, clean pre/post)
           parent(d5c762f) = 00feea3  -> ADDITIVE; no amend/rebase/squash/rewrite; PUSHED: NO
```

## 2. Delta containment (required check 1) — CLOSED

`git diff 00feea3..d5c762f` = exactly ONE product path, `app/scripts/o1_nonprod_fixture_setup.vitest.ts`,
+68/−3. No schema, migration, dependency, package/lockfile, route, endpoint, UI, or authority surface
touched. No new import appears in the file (the delta adds a pure predicate, a flag read, a teardown
condition, assertions, and two bounded output fields). Secret scan over the delta: flag names only.

## 3. Required checks 2–7 — all CLOSED (code + empirical)

| # | Check | Evidence | Verdict |
|---|---|---|---|
| 2 | Preserve has effect only with exact `O1_FIXTURE_ONESHOT=1` | `shouldPreserveBundle(a,b) === (a==="1" && b==="1")` (pure, exported); rerun: `O1_FIXTURE_PRESERVE_FOR_RUNTIME=1` alone → identical 6 passed + 5 skipped (inert; nothing created, nothing retained) | CLOSED |
| 3 | Default/near-miss retain existing cleanup | Adjacent-negative matrix incl. `" 1"`/`"1 "` + 5×5 both-flag matrix asserted in the ordinary suite; Rehearsal 1 (default one-shot): bundle REMOVED | CLOSED |
| 4 | Refusals not weakened | `productionRefused` / `isDisposableLoopbackPostgres` / `isSafeBundleRoot` byte-untouched by the delta; still evaluated before any DB work; re-asserted inside the one-shot run in BOTH modes | CLOSED |
| 5 | Preserve retains ONLY the canonical bundle; no second serializer/importer/binder/seed/endpoint/route/launcher/schema/migration/dependency/provider | afterAll is the only behavioral change (`!preserveForRuntime` on the existing rmSync); Rehearsal 2 retained tree = exactly `bundle_meta.json · manifests · snapshots`; no process/server/db handle survives (disconnect test) | CLOSED |
| 6 | DB disconnect mandatory; retained-bundle cleanup explicit + externally verifiable | Disconnect test unchanged and still runs last in one-shot mode; retention is externally observable (directory-exists boolean) and the mission cleanup `rm -rf` + removal verification succeeded in rehearsal | CLOSED |
| 7 | Assertions meaningful, not vacuous | Three-way oracles: exact conjunction accepted + each near-miss of each flag rejected + full 5×5 default matrix; behavioral truth additionally proven by the two rehearsals (present vs removed). Note: the in-run `preserveForRuntime === shouldPreserveBundle(...)` assert is tautology-adjacent on its own; the rehearsals carry the behavioral proof | CLOSED |

## 4. Independent reruns (required check 8) — all reproduce the Worker's claims

Pre and post: clean tree at `d5c762f`; zero leftover containers.

```text
npx tsc --noEmit --pretty false            PASS  0 errors
focused suite, both flags absent           6 passed + 5 skipped   (= claim)
focused suite, PRESERVE=1 alone            6 passed + 5 skipped   identical -> flag provably inert (= claim)
npx vitest run (full)                      25 files · 594 passed · 7 skipped  (= claim; +4 asserts, +1 skip,
                                           no count decreased vs the reviewed 590/6 baseline)
npx next build                             PASS
REHEARSAL 1  default one-shot, disposable loopback PG (reviewer-owned):
             5 passed + 6 skipped · bundle after run: REMOVED (required) · container removed: YES
REHEARSAL 2  preserve one-shot, disposable loopback PG (reviewer-owned):
             5 passed + 6 skipped · bundle after run: PRESENT (required) ·
             retained tree exactly {bundle_meta.json, manifests, snapshots} ·
             db seed snapshots=1 · bindings=1 ·
             mission cleanup rm -rf executed · removal verified: YES · container removed: YES
```

Disclosed reviewer misstep (self-corrected): a first combined rehearsal script produced a false
"bundle absent" for preserve mode — a reviewer-harness scripting artifact (the vitest invocation
never ran correctly inside the shell function; its summary lines were absent). Re-verified twice
with explicit, unwrapped runs: preserve mode behaves exactly as specified. No candidate defect.

## 5. RESULT §6.7 validation (required check 9) — CLOSED, grounded in actual source

- Old unsupported claim ABSENT: the corrected §6.7 contains the account-console claim only inside
  its own disavowal note (Advisor finding O1BR-RUNBOOK-1); the only other "console" mention is the
  legitimate owner-performed callback deregistration in shutdown step 3.
- Persistence grounding verified in code: `prisma/schema.prisma` `model AuthIdentity` has exactly
  `issuer`/`subject`/`createdAt` (+id/customerId, `@@unique([issuer, subject])`);
  `prismaIdentityStore.createAccountWithIdentity(issuer, subject)` writes them atomically with the
  CustomerAccount (WU-A). The runbook's SQL table/column names and the issuer literal
  `https://accounts.google.com` match `GOOGLE_ISSUER` exactly.
- Unambiguous selection: empty-table bootstrap (precount 0 → operator-only sign-in → count must be
  exactly 1 → abort otherwise) and the timestamp-boundary fallback with explicit abort rules are
  sound; step 5's digits-only shape grep matches the reviewed operator-subject format contract.
- No-disclosure transfer mechanics check out: value flows psql→0600 file by redirection only
  (umask 077), command text carries no subject, non-interactive `psql -c` writes no history,
  `docker exec` output is not captured by container logs, no shell variable ever holds the value;
  detection of empty/multiple rows falls out of the step-5 shape count. Restart + boolean-only
  effect verification + shutdown/cleanup ordering are consistent with §6.8 (env file shredded,
  disposable DB destroyed — no residue).
- Structural backstop re-verified: WU-A requests `scope: "openid"` only (no email claim issued),
  and non-digit allowlist entries can never match the digits-only subject rule.
- INFO (non-blocking): §6.7 calls `sub` "the stable per-client identifier". Google's documented
  `sub` is stable and unique per Google account (public subject type — the same across clients),
  so "per-client" is an imprecision. The operative claims (delivered in the ID token; no
  account-console surface exposes it; immutable identity key) are correct and the procedure is
  unaffected.

## 6. Containment of this review (required check 10)

No credential, subject value, connection string beyond disposable throwaway loopback bootstrap,
real PII, provider call, tunnel, real payment, shared/production resource, or excluded authority
was used or exposed. Both rehearsal databases were reviewer-owned, unique, tmpfs, loopback-only,
and verified removed. The product tree was never modified (clean at `d5c762f` before and after).

## 7. Verdict rationale

All ten required checks are CLOSED with empirical evidence; the delta is exactly the authorized
one-file, conjunctive, refusal-preserving change; both teardown modes are rehearsal-proven; the
corrected runbook §6.7 is grounded in the actual persisted schema and OIDC facts with the
unsupported claim removed; no regression was introduced anywhere in the previously reviewed
baseline (full-suite and build reruns green with only the intended +4/+1 count change). One INFO
note (wording imprecision) does not affect behavior or safety.

```text
VERDICT: PASS
BASELINE_REVIEW: 20_ full review PASS at 00feea3 (unchanged and still valid)
MAXIMUM_ACCEPTABLE_PHASE_CLAIM (unchanged):
REVIEWED_CREDENTIAL_INDEPENDENT_NON_PRODUCTION_BROWSER_RUNTIME_CANDIDATE
BROWSER_GOLDEN_ORDER: NOT_RUN · BROWSER_GOLDEN_REVERSAL: NOT_RUN
OFFICIAL_GOOGLE_EXECUTION: NOT_RUN · OFFICIAL_TOSS_EXECUTION: NOT_RUN · TUNNEL: NOT_STARTED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
RETURN_TO: foundation-advisor
```
