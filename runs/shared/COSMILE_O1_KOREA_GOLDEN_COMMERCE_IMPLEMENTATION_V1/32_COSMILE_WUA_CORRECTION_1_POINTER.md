# 32 — Cosmile WU-A Correction Cycle 1 Pointer

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1 · WU-A-CORRECTION-1
ACTOR: cosmile (Cosmile repository-owner Worker) · RETURN_TO: foundation-advisor
HANDOFF: 32_COSMILE_WUA_CORRECTION_1_HANDOFF.md @ 7d96fea6a8fac267e99dbec91a1daf031002a61d (committed; working-tree == committed, verified)
REVIEW: 31_ WU-A review @ bf9358fd (blob 79b97758 / sha256 a611b9e5…) — PASS_WITH_CORRECTIONS, findings WUA-F1 + WUA-F2
STATUS: COMPLETE — one additive correction commit · focused 55/55 + suite 235/235 · READY_FOR_DELTA_RE_REVIEW
```

## RESULT SUMMARY

Corrected the two independently reviewed WU-A findings within the 5 allowed paths; R1–R6 preserved untouched.
**WUA-F1**: `COSMILE_SESSION_TTL_SECONDS` is now real — a pure `resolveSessionTtlSeconds` parser (positive
integer clamped to **[60s, 8h default]**; absent/invalid/zero/negative → 8h; never exceeds 8h) whose single
resolved value is applied identically to the DB session expiry and the cookie `maxAge` in the callback;
`.env.example` description matches (names-only, no new key). **WUA-F2**: one shared bounded provider fetch —
**≤10s abort** + **≤256KiB cap** (content-length pre-check + streaming/post-read byte count) + strict shape
validation on **both** JWKS and token exchange (non-empty `id_token` with length bound; bounded `keys` array
with required primitive fields, no unchecked cast); every failure maps to an existing **closed** category with
no provider body/error leaked; no dependency change. Focused **55/55** (35 + 4 + 16), full suite **235/235**
(no regression). Delta = exactly the 5 allowed paths (+291/−17), additive on the reviewed candidate; no
Prisma/WU-0/repository/shopper/merge/events/UI change; no secrets/PII. Tests stub `globalThis.fetch` offline —
no real network/Google/credential/PII.

## NEXT ACTION ROUTING

- **Same Reviewer** (per review §Verdict): **delta-only** re-review `70b8b155..2b8efdc`; question set in
  `32_…RESULT.md §7`.
- **Advisor** publishes the foundation-docs evidence (left uncommitted).
- Push withheld until the Reviewer returns delta PASS. No WU-B/C/D/E/F/G started.

## POINTER BLOCK

```text
PRODUCT_REPO: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_CANDIDATE: 70b8b155f447ca3dd19bfecf64506df7cdfef41b
NEW_CANDIDATE_HEAD: 2b8efdcc484d211a7cc6957c3d632a073afefbe4  (parent 70b8b155; additive; +291/-17; 5 files; 2 ahead / 0 behind; NOT pushed)
DELTA_FOR_RE_REVIEW: 70b8b155..2b8efdc
ALLOWED_PATHS_CHANGED:
  app/.env.example
  app/src/lib/auth/session.ts
  app/src/lib/auth/googleOidc.ts
  app/src/app/api/auth/google/callback/route.ts
  app/scripts/o1_google_oidc_contract.vitest.ts
EVIDENCE (foundation-docs, uncommitted — Advisor publishes):
  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/32_COSMILE_WUA_CORRECTION_1_RESULT.md
  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/32_COSMILE_WUA_CORRECTION_1_POINTER.md
FOCUSED_TEST: cd app && <orig>/node_modules/.bin/vitest run scripts/o1_google_oidc_contract.vitest.ts  → 55/55 (suite 235/235)
BUILD_LINT_TSC: NOT_RUN (pre-WU-0 generated Prisma client + forbidden prisma generate; .next IS gitignored — R5 corrected)
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/NETWORK/PROVIDER/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
