# Scope Allowlist Correction 2 — Existing Vitest Fixture Entrypoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
CORRECTION_ID: O1BR-ALLOWLIST-CORRECTION-2
ISSUED_BY: foundation-advisor
AUTHORITY_EFFECT: NARROW_NON_EXPANSIVE_TEST_ENTRYPOINT
DEPENDENCY_INSTALL_AUTHORITY: NO
PRODUCT_BEHAVIOR_EXPANSION: NO
SCHEMA_OR_MIGRATION_AUTHORITY: NO
```

## Direct evidence

The credential-independent candidate at
`6a3b71856f6db0b75e4193f594d23cf0e82512b2` contains the authorized
canonical synthetic fixture builder and runner, but the repository has no
`tsx`, `ts-node`, or other TypeScript script runner. Dependency installation
and `package.json` modification remain prohibited. The installed Vitest runner
already resolves the repository `@/*` aliases and includes only
`scripts/**/*.vitest.ts`; it does not execute the existing
`scripts/o1_nonprod_fixture_setup.ts` path.

This blocks execution of the authorized synthetic bundle/import/binding seed
and therefore blocks local browser composition evidence. It does not require a
new dependency, route, schema, migration, or product behavior.

## Added exact allowed path

- `app/scripts/o1_nonprod_fixture_setup.vitest.ts`

## Exact authorized correction

The same Cosmile Worker may add one minimal Vitest entrypoint that:

- imports and invokes only the existing authorized
  `src/lib/runtime/o1FixtureSetup.ts` builder;
- runs only when an exact explicit one-shot non-production fixture flag is set;
- refuses production, an absent disposable `DATABASE_URL`, an absent bundle
  root, and any ambiguous configuration;
- uses only synthetic evidence and the mission-owned disposable PostgreSQL;
- reports bounded categories, counts, and booleans only;
- never prints or persists a connection string, secret, provider value, PII,
  raw payload, internal identifier, or environment value;
- remains skipped or fail-closed during the ordinary full suite when the
  one-shot flag is absent;
- leaves no durable test resource after the authorized test teardown.

The existing `.ts` runner may remain as a documented standalone entry for a
future toolchain; it must not be treated as executed evidence in this mission.

## Prohibited by this correction

- no dependency or package/lockfile change;
- no new API route, endpoint, runtime switch, product behavior, schema, or
  migration;
- no Python or alternate reimplementation of canonical serialization;
- no fixture or catalog-gate bypass;
- no production/shared database, real data, provider, network, or credential;
- no modification outside the combined allowlist.

## Required evidence and review

The Worker must create a new additive correction commit, without amending or
rewriting candidate `6a3b71856f6db0b75e4193f594d23cf0e82512b2`, and record:

- ordinary-suite absent-flag behavior;
- explicit one-shot disposable-DB execution;
- canonical bundle/import/binding success evidence;
- post-run database, bundle, process, and container cleanup;
- typecheck, build, focused test, and full-suite results.

The independent Reviewer must review the exact old-candidate-to-new-candidate
delta and verify that this is only a test execution bridge and does not create
a product/runtime fixture endpoint or weaken any gate.

```text
ADVISOR_VERDICT: PROCEED_WITH_LIMITS
WORKER: same Cosmile Worker
REVIEWER: same independent Reviewer selected for the implementation candidate
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
