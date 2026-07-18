# 51 — Cosmile WU-D Implementation Review Pointer

```text
POINTER BLOCK
RESULT_WRITTEN
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-D catalog / single KRW price / Foundation snapshot consumption
REVIEW_PASS: IMPLEMENTATION_REVIEW (full; read-only)
ROLE_ACTOR: Independent Foundation Reviewer (foundation-reviewer-fable5 · Fable 5 · max · /fable-sentinel)
RESULT_FILE: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW.md
POINTER_FILE: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW_POINTER.md
FOUNDATION_DOCS_COMMIT: not committed (Reviewer writes only; Advisor publishes — worktree HEAD d6464f41, only the two 51_ files untracked)
REVIEWED_HANDOFF: advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/handoffs/51_COSMILE_WUD_IMPLEMENTATION_REVIEW_HANDOFF.md @ d6464f41
REVIEWED_SUBJECT: candidate 21012d0e06a04f82377659b897fd07fa39683133 vs base 3ea1b211 (single child · exactly the 9 authorized paths · +1366/−4 · NOT pushed, remote at 3ea1b211) · Foundation producer 73ff0036 read-only (unchanged pre/post, verified)
ALL_PINS: VERIFIED (Git pins exact · Worker evidence @66f0f68e · implementation handoff @d589a53c · design pins consistent with 31_)
INDEPENDENT_REPRODUCTION: focused 42/42 (contract 19 + bundle 9 + catalog 14; cross-language fixtures genuinely produced by the pinned Python impl) · full suite 321/321 · import dbtest 21/21 exit 0 · WU-0 regression 54/54 exit 0 · all cleanups proven (containers 1→1, zero leftovers, zero tempdirs, symlink removed, product+FOUNDATION Git state byte-identical)
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS   (deterministic mapping recorded per the committed handoff)
REQUIRED_FINDINGS:
  WUD-F1 (MEDIUM) verify→import chain unconnected — importer/withdraw/bindSku accept standalone inputs without verified bundle/manifest/notice evidence; no durable import progress (snapshotRepository.ts:74-84)
  WUD-F2 (MEDIUM) two current heads constructible — supersedes-of-non-current + no per-product serialization; WU-0 has no one-current backstop; catalog resolves by capturedAt tiebreak (snapshotRepository.ts:56-66,113; shared by the dbtest mirror)
  WUD-F3 (MEDIUM) bindSku under-validation (no bounded ids / snapshot existence / currency / product-variant equality) and SkuBinding.snapshotId stored-but-ignored (snapshotRepository.ts:85-100,108-113)
  WUD-F4 (MEDIUM) non-null variant bindings permanently conflict — store hardcodes snapshotVariantKey null vs decideCatalog equality (snapshotRepository.ts:134 ↔ snapshotCatalog.ts:73); blocks the pad-80 boundary lane
  WUD-F5 (LOW) DB-sourced product-id/sha joined into fs path without read-time re-validation (snapshotRepository.ts:118)
  WUD-F6 (LOW) resolveUnitPrice default-SKU branch lacks an active-status check (sku.ts:12-17,68-69) — inactive default price resolvable, contrary to "active default"
  WUD-F7 (LOW) claimed U+F000-vs-U+10000 canonical-sort parity fixture absent — oracle cannot catch a UTF-16-sort regression; 50_ §3 claim is reported-not-actual (contract vitest :70)
ALL_CORRECTIONS_IN_SCOPE: yes — inside the nine already-authorized WU-D paths; no schema change, no new path, no policy selection required
POSITIVES: byte-compatible cross-language contract/bundle verification proven against the real pinned producer · fail-closed catalog decision matrix (stale/withdrawn/superseded/gates default-deny; producer-outage independence) · mirror parity faithful (defects shared, not masked) · idempotency/immutability/injectivity/rollback/history-immutability proven on disposable PostgreSQL · fallback removal exact and narrow · no activation (zero lane imports) · zero logging/secrets/PII
OBSERVATIONS_NON_BLOCKING: O-1..O-6 (see result §2)
CANDIDATE_PUSH: MUST NOT BE PUSHED until corrections + delta re-review PASS
CORRECTION_OWNER: same Cosmile Worker · RE_REVIEW: same Reviewer, delta-only 21012d0e..<new-candidate>
RUNTIME_REPO: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
RUNTIME_COMMIT_STATUS: candidate untouched by Reviewer — REVIEWER_PRODUCT_WRITES: ZERO (clean @ 21012d0e; FOUNDATION clean @ 73ff0036)
SECRETS/PII/NETWORK/PROVIDER/REAL_DB: none accessed or emitted (disposable synthetic instances only); evidence is status/count/boolean/pointer only
RETURN_TO: foundation-advisor
NEXT_ACTOR: foundation-advisor (route WUD-F1..F7 to the same Cosmile Worker; then delta re-review)
STOP
```
