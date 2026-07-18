# Advisor Handoff — Runtime Fixture Preservation Correction

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_TYPE: BOUNDED_RUNTIME_SETUP_CORRECTION
FROM: foundation-advisor
TO: cosmile
ACTOR_ROLE: Cosmile repository-owner Worker
WORKSPACE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
REQUIRED_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1
REQUIRED_SKILL: /fable-builder
REQUIRED_EFFORT: max
INDEPENDENT_SOURCE_REVIEW: PASS
SOURCE_REVIEW_COMMIT: 1a46444420cd6b437802b0f77ef29b879eddb232
SOURCE_REVIEW_RESULT_BLOB: 98171da30cb0ccf8e217a7884e6a8abc509d05bb
SOURCE_REVIEW_RESULT_SHA256: ff8bbbf554c238738f090e791118493ac9842322259e175dc23a1305fe0e047c
CURRENT_DRAFT_PR: https://github.com/leohan816/Cosmile/pull/2
```

## Exact finding

The independently reviewed one-shot fixture bridge deliberately removes its generated Foundation bundle in `afterAll`. That is correct for isolated test evidence, but the authorized browser runtime needs the same canonical bundle to remain available while the restricted preview server is running. The current bridge therefore cannot prepare a runtime that simultaneously has the reviewed database seed/binding and the required local bundle.

This is a runtime-setup gap only. It does not change product semantics, schema, migrations, dependencies, provider behavior, routes, UI, or authority.

## Exact allowed product path

```text
app/scripts/o1_nonprod_fixture_setup.vitest.ts
```

No other product path may change.

## Required correction

Add one explicit non-secret execution switch:

```text
O1_FIXTURE_PRESERVE_FOR_RUNTIME=1
```

Required behavior:

- the switch has effect only when `O1_FIXTURE_ONESHOT=1` is also exact;
- production, non-loopback database, relative bundle root, and in-repository bundle root refusals remain unchanged;
- absent or near-miss values preserve the existing teardown behavior exactly;
- exact preserve mode leaves only the canonical bundle tree for the already-authorized restricted runtime session;
- the database connection is still disconnected at the end of the fixture execution;
- output remains bounded to categories, counts, and booleans and must not print paths, connection strings, credentials, subjects, hashes, or identifiers;
- the retained bundle is mission-created and must later be removed by the Advisor-controlled shutdown procedure;
- no second serializer, importer, binder, seed path, endpoint, route, process launcher, dependency, schema, migration, or provider path may be introduced.

Add adjacent-positive and adjacent-negative assertions inside this exact file for the preserve predicate and default cleanup contract. Run the smallest relevant focused suite, full Vitest suite, typecheck, and non-production build. If safe, rehearse both modes on isolated loopback disposable PostgreSQL resources:

1. default one-shot: bundle removed;
2. preserve-for-runtime one-shot: bundle present after fixture completion, then explicitly removed by the mission cleanup command, with removal verified.

Use only synthetic data. Do not use Google/Toss credentials, external providers, tunnel, real PII, real payment, or production/shared resources.

## Runtime runbook result

Return a names-only, no-secret runtime preparation plan that pins:

- exact disposable database creation/start/identity category;
- reviewed migration application command;
- canonical fixture command in preserve mode;
- Next non-production startup command class;
- preview-gate denial precheck before any tunnel;
- Google callback, Toss success/fail, and general-payment webhook URL shapes using a placeholder public base URL only;
- safe operator-sub bootstrap procedure that never prints, logs, commits, or returns the subject;
- ordered shutdown and cleanup steps for server, tunnel, database, bundle, and owner-only env file;
- how each cleanup check is proven without exposing sensitive values.

Write the Worker result and pointer only below the existing mission temp root. Create one additive candidate commit; do not amend, rebase, squash, force-push, or push. Return to foundation-advisor for same-Reviewer delta review.

```text
OFFICIAL_GOOGLE_EXECUTION: NOT_AUTHORIZED_IN_THIS_HANDOFF
OFFICIAL_TOSS_EXECUTION: NOT_AUTHORIZED_IN_THIS_HANDOFF
TUNNEL: NOT_AUTHORIZED_IN_THIS_HANDOFF
PRODUCT_SCHEMA_OR_MIGRATION_CHANGE: NOT_AUTHORIZED
DEPENDENCY_CHANGE: NOT_AUTHORIZED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
RETURN_TO: foundation-advisor
STOP
```
