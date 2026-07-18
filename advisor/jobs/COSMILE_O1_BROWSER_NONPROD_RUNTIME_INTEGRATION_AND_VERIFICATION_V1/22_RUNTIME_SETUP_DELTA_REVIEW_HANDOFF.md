# Advisor Handoff — Runtime Setup Delta Review

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REVIEW_TYPE: SAME_REVIEWER_DELTA_ONLY
FROM: foundation-advisor
TO: foundation-reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
REQUIRED_EFFORT: max
PATCH_AUTHORITY: NONE
OLD_REVIEWED_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1
NEW_CANDIDATE_HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab
DELTA: git diff 00feea3193a946963b15ded90d062db0ce1fdda1..d5c762fcf4029f7027daad02a18ffae43e62e5ab
EXPECTED_PRODUCT_PATHS: app/scripts/o1_nonprod_fixture_setup.vitest.ts ONLY
WORKER_RESULT_COMMIT: 5140028250a8d983321e3e06d3d54fe653b48c59
WORKER_RESULT_BLOB: b3c9ff4ff32ce0a155fe9fdd2c2633053594ee3a
WORKER_RESULT_SHA256: 014136ee03bc0c04a56a253ce79c0adc0f4a7f0016926ae30d8b699151ea69c9
WORKER_POINTER_BLOB: 2968cfa449f7c446be4ffed5dfcef22f0c62b4a3
WORKER_POINTER_SHA256: f431e53caf095f2d3d6dfea736f846608f8f87386c22654c2fe471bb33a31c5b
CORRECTION_HANDOFF_COMMIT: 520067c2ab8f729f6b68a508794bd8d26530df1e
CORRECTION_HANDOFF_BLOB: 75254682f9431d128efb3610c10ee0afd93d3dd8
CORRECTION_HANDOFF_SHA256: 95da50dd356bfd708699b3847d9233b25a18a4ebb647b0f42ee1eb5e3d6a18ba
```

Review only the declared delta and the corrected runtime runbook evidence. The previous full review remains the baseline.

Required checks:

1. Exactly one product path changed and the commit is additive; no amend/rebase/squash/history rewrite.
2. `O1_FIXTURE_PRESERVE_FOR_RUNTIME=1` has effect only with exact `O1_FIXTURE_ONESHOT=1`.
3. Default and near-miss values retain the existing cleanup behavior.
4. Production, non-loopback database, relative root, and in-repository root refusals are not weakened.
5. Preserve mode retains only the canonical bundle and introduces no second serializer/importer/binder/seed path, endpoint, route, process launcher, schema, migration, dependency, provider, or product behavior.
6. Database disconnect remains mandatory; retained bundle cleanup remains explicit and externally verifiable.
7. Adjacent-positive/negative assertions are meaningful and not vacuous.
8. Independently rerun the smallest relevant pure tests, typecheck, full Vitest suite, build, and both disposable-database teardown rehearsals if safe.
9. Validate RESULT §6.7 against actual `AuthIdentity` persistence and Google OIDC facts: the old unsupported account-console claim must be absent; the replacement must select the dedicated operator row unambiguously, move the subject into the owner-only 0600 env file without stdout/log/history/artifact disclosure, restart, report only booleans/counts, and leave no residue.
10. Confirm no credential, subject value, connection string, real PII, provider call, tunnel, real payment, shared/production resource, or excluded authority was used.

Write only:

```text
/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/22_RUNTIME_SETUP_DELTA_REVIEW.md
/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/22_RUNTIME_SETUP_DELTA_REVIEW_POINTER.md
```

Verdict: `PASS | NEEDS_PATCH | PASS_WITH_RISK | FAIL`. Do not patch, stage, commit, push, dispatch, accept risk, use credentials/providers, or start a tunnel. Return to foundation-advisor and stop.
