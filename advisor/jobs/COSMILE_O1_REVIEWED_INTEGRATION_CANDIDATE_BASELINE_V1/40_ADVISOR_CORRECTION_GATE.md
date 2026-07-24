# Advisor correction gate

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`

VERDICT: `PASS_TO_INDEPENDENT_REVIEW`

- Base: `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`
- Candidate: `51ef5f2b4d576979f4b432f114151755f02f3385`
- Branch: `integration/cosmile-o1-reviewed-candidate-baseline-v1-20260724`, clean/upstream-equal
- Delta: only `app/scripts/o1_order_service_request.dbtest.vitest.ts` (`+25/-24`)
- M2B diagnosis: stale shared-fixture ordering; three byte-equivalent inspection assertions moved before the first state mutation
- M3A diagnosis: stale shared-fixture isolation; only earlier-test request rows for synthetic `O.paid`/`O.race` are deleted before the existing exact queue seed
- Product repository/service/runtime/query/contracts: unchanged
- Preserved RED: reachable disposable DB, `44/46` PASS; exact M2B and M3A assertions failed
- GREEN: generate-first Prisma Client `6.19.3`; exact focused file `46/46` PASS in `108.77s`
- Execution deviation: two intermediate Claude Bash calls ended with harness exit `144` before any Vitest verdict; preserved as inconclusive, then bounded by committed addendum 31
- Prohibited gates: no other Vitest file, full suite rerun, typecheck, build, lint, schema/migration, provider/runtime/economic action
- Cleanup: disposable DB/container/ports, worktree dependencies, mission cache/build/test/log/PID residue absent
- Canonical dependency hashes: byte-identical before/after
- Product commit attribution: Claude Opus 4.8/xhigh, truthful trailer

NEXT: independent evidence/delta review only; no product write or test rerun.
