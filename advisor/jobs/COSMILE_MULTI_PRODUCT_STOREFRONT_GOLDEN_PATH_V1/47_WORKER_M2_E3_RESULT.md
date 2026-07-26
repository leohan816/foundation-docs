# M2 E3 O1-FLAG CORRECTION — WORKER RESULT

Status: **PASS**

- Handoff: `46_WORKER_M2_E3_O1_FLAG_CORRECTION_HANDOFF.md`, docs `d26562188f270e2cf91bcab404a6f445e10c4883`, blob `a7ad3e05065efbc164cb1003b3882dc21243a8ea`, sha256 `22ebb75bf52201b60a0a38bd37d4e1e1e13b671d8883c3635da8c2d2e955e02a` — all four pins verified exactly before any action.
- Base verified `04409346ca777b7e3cbf082497f0cf75d7628cbe`, clean and upstream-equal.
- Result commit `e257ae08e7111603c930d54197ba01001a70a354`, non-force pushed; tree clean, upstream-equal.

## Defect corrected

`o1GuestBootstrapEnabled` keyed only on the Google slice flag plus non-production. The boundary could therefore mint a guest identity in a runtime the rest of O1 structurally refuses to serve.

## Correction

The predicate now requires `COSMILE_O1_RUNTIME_ENABLED === "true"` in addition to the exact Google flag and non-production. All three conditions are exact-equality comparisons; nothing is trimmed or coerced. Only the pure predicate and its injected env type changed.

## Tests-first evidence

Command, identical for both runs:

`cd app && ./node_modules/.bin/vitest run scripts/o1_guest_owner_projection.vitest.ts --config vitest.config.ts -t "O1 guest ownership projection"`

- RED, run once after the test edit and before the source edit: **1 failed / 14 passed (15)**, exit `1`. Failure was exactly `runtime flag absent = deny: expected true to be false` at the strengthened assertion.
- GREEN, identical command run once after the source edit: **15 passed (15)**, exit `0`.

Assertions added: runtime flag absent denies; near-miss values `"1"`, `"TRUE"`, `" true"`, `""` each deny. No E2 assertion was weakened or removed — the previously admitted env `{Google:"true", NODE_ENV:"development"}` is now asserted to deny, so the admitted set is strictly narrower.

## Containment

- Exactly the two ceiling paths changed: `app/scripts/o1_guest_owner_projection.vitest.ts`, `app/src/lib/shopperIdentity.ts` (37 insertions, 10 deletions).
- `git diff --check` exit `0`; `app/package.json`, `app/package-lock.json`, `app/prisma` unchanged (0 entries).
- No DB, runtime, browser, provider, payment, refund, build, typecheck or install action. Preserved E2 facts untouched: ownerless rows not reset; order/payment/refund effects `0`.

## Not proven here

No typecheck or runtime execution was authorized or run, so the change is proven by the focused contract test only, not by a live request against the candidate runtime.
