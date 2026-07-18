# 61 — Cosmile WU-B Implementation Review Pointer

```text
POINTER BLOCK
RESULT_WRITTEN
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-B direct Toss V2 payment/refund truth lane
REVIEW_PASS: IMPLEMENTATION_REVIEW (full; read-only)
ROLE_ACTOR: Independent Foundation Reviewer (foundation-reviewer-fable5 · Fable 5 · max · /fable-sentinel · session 1b356b8d…)
RESULT_FILE: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW.md
POINTER_FILE: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW_POINTER.md
FOUNDATION_DOCS_COMMIT: not committed (Reviewer writes only; Advisor publishes — worktree HEAD c4ddf8eb, only the two 61_ files untracked)
REVIEWED_HANDOFF: advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/handoffs/61_COSMILE_WUB_IMPLEMENTATION_REVIEW_HANDOFF.md @ c4ddf8eb
REVIEWED_SUBJECT: candidate d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01 vs base 2733bfd6 (single child · exactly 8 NEW paths · +1929/−0 · zero existing-file modification · NOT pushed, remote at 2733bfd6)
ALL_PINS: VERIFIED (Git pins exact · Worker evidence @bf2d21f7 · implementation handoff @efffa642 · design pins consistent · official-provider basis = committed admission/design records, agreeing with reviewer knowledge; external network forbidden)
INDEPENDENT_REPRODUCTION: adapter+contract 40/40 · full suite 373/373 · WU-B dbtest 38/38 exit 0 (real parallel two-paymentKey claim race → one claimed; concurrent captures → one succeeded row) · WU-C regression 28/28 · WU-0 regression 54/54 · all cleanups proven (containers 1→1, zero leftovers, symlink removed, Git state byte-identical)
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS   (deterministic mapping recorded per the committed handoff)
REQUIRED_FINDINGS: WUB-F1 (LOW) — 60_ §5's stuck-state recovery surface is missing: no bounded stuck-intent/refund queries on the repository port, and ambiguous confirm outcomes (timeout/provider_error/unsupported at service.ts:99; post-ok binding/amount mismatch at :101-102) leave an authorizing intent with NO ReconciliationTask; money safety NOT violated (claim binding prevents any second charge; same-key replay recovers) — fix inside contracts/service/repository + both test files (exact recipe in result §2)
POSITIVES: adapter exact vs documented Toss V2 server API (full-cancel structurally cannot send cancelAmount; unknown-status default-deny; no leakage) · claim-before-provider-effect with per-order advisory locks + WU-0 partial-unique backstops (one succeeded capture per order; one active refund per capture — both verified in migration SQL) · triple tuple verification incl. actual Order.orderNo · ABORTED/EXPIRED-only conclusive non-capture; CANCELED-at-confirm holds + reconciles · full-only refund with persistence-gated success and double-throw containment · webhook: size-bound before parse, digest-only persistence, no invented signature, distinct-states-distinct, verified/quarantined claimed only when actually persisted, monotonic states · schema alignment field-exact · zero activation/logging/env/fetch · Order+reservation proven unmutated by the lane
OBSERVATIONS_NON_BLOCKING: O-B1..O-B4 (Worker-declared, verified accurate) · O-B5 post-ok mismatch folded into WUB-F1 evidence fix · O-B6 failed-refund-key replay bounded (WU-E design note)
CANDIDATE_PUSH: MUST NOT BE PUSHED until WUB-F1 correction + delta re-review PASS
CORRECTION_OWNER: same Cosmile Worker · RE_REVIEW: same Reviewer, delta-only d17a0926..<new-candidate>
RUNTIME_REPO: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
RUNTIME_COMMIT_STATUS: candidate untouched by Reviewer — REVIEWER_PRODUCT_WRITES: ZERO (clean @ d17a0926)
SECRETS/PII/NETWORK/PROVIDER/REAL_DB: none accessed or emitted (disposable synthetic instances only); evidence is status/count/boolean/pointer only
RETURN_TO: foundation-advisor
NEXT_ACTOR: foundation-advisor (route WUB-F1 to the same Cosmile Worker; then delta re-review)
STOP
```
