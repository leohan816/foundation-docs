# Pointer — Runtime Fixture Preservation Correction

```text
POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_TYPE: BOUNDED_RUNTIME_SETUP_CORRECTION
RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/21_RUNTIME_SETUP_CORRECTION_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/21_RUNTIME_SETUP_CORRECTION_POINTER.md
PRIOR_RESULT: .../10_COSMILE_RUNTIME_INTEGRATION_RESULT.md (candidates 1–2)
FOUNDATION_DOCS_COMMIT: not mirrored by the Worker (Advisor owns the runs/shared placement)
RUNTIME_REPO: /home/leo/Project/Cosmile
RUNTIME_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
RUNTIME_COMMIT_STATUS: committed d5c762fcf4029f7027daad02a18ffae43e62e5ab
PUSHED_BY_WORKER: NO — this Worker executed no push (reflog shows commits only)
UPSTREAM_STATE: origin tip = 00feea3193a946963b15ded90d062db0ce1fdda1 (candidate 2, pushed by the Advisor for
                draft PR #2). Local branch is AHEAD_BY_1 / BEHIND_BY_0; candidate 3 (d5c762f) is LOCAL ONLY and
                is NOT on origin. The draft PR therefore does NOT yet contain this correction — publishing it is
                an Advisor action.
RETURN_TO: Advisor
NEXT_ACTOR: Advisor
```

## Anchor verification

```text
HANDOFF @ 520067c2 / blob 75254682 / sha256 95da50dd…   VERIFIED
REQUIRED_HEAD 00feea3193a946963b15ded90d062db0ce1fdda1  MATCHED (clean at start)
```

## Candidate chain (no amend, no rebase, no force-push, no push)

```text
63fdd2d -> 6a3b718 (candidate 1) -> 00feea3 (candidate 2) -> d5c762f (candidate 3, THIS)
REVIEW_DELTA: git diff 00feea3..d5c762f     1 file · +68 · -3
CHANGED PATH: app/scripts/o1_nonprod_fixture_setup.vitest.ts   (the exact allowed path; no other)
```

## Evidence summary

```text
tsc --noEmit                 PASS 0 errors
next build                   PASS
eslint (changed file)        PASS 0 errors
focused, both flags absent   6 passed · 5 skipped
focused, PRESERVE only       6 passed · 5 skipped  (identical — the switch is inert without one-shot)
full suite                   25 files · 594 passed · 7 skipped   (prior 25 · 590 · 6; no count decreased)
rehearsal 1 default          bundle REMOVED after completion              PASS
rehearsal 2 preserve         bundle PRESENT after completion              PASS
                             retained tree = canonical bundle ONLY (bundle_meta.json/manifests/snapshots)
                             DB snapshots=1 bindings=1
                             removed by mission cleanup command, removal VERIFIED
both rehearsals              container removed · zero repository writes
credentials / provider calls / tunnel / real PII / real payment / production / dependency change   ZERO
```

## What the correction does

```text
SWITCH:      O1_FIXTURE_PRESERVE_FOR_RUNTIME=1  (non-secret execution switch, not a credential)
CONJUNCTIVE: effective only with exact O1_FIXTURE_ONESHOT=1 — never acts alone, cannot touch the ordinary suite
REFUSALS:    production · non-loopback DB · relative bundle root · in-repo bundle root  ALL UNCHANGED
DEFAULT:     absent/near-miss values keep the existing teardown behaviour exactly
PRESERVE:    retains ONLY the canonical bundle tree; no process, server, open database, or extra artifact
DISCONNECT:  database client disconnected at the end in BOTH modes
OUTPUT:      categories/counts/booleans only — no path, connection string, credential, subject, hash, identifier
CLEANUP:     retained tree is mission-created; removed by the Advisor-controlled shutdown procedure
```

## Runtime runbook

A names-only, no-secret runtime preparation plan is in RESULT §6, pinning: disposable database identity and
creation class · reviewed migration command · canonical fixture command in preserve mode · Next non-production
startup class · preview-gate denial precheck required BEFORE any tunnel · Google callback, Toss success/fail and
general-payment webhook URL shapes against a placeholder base · an operator-subject bootstrap that never prints,
logs, commits, or returns the subject · and an ordered shutdown/cleanup sequence with a boolean/count/status
proof form for every step. Nothing in that section was executed.

### Correction — Advisor finding O1BR-RUNBOOK-1 (result artifact only)

```text
FINDING:   RESULT §6.7 previously claimed the owner could read the operator's `sub` from the Google account
           console. UNFOUNDED — Google's OIDC documentation establishes that `sub` is delivered in the ID token
           and is the stable identifier, but provides no account-console surface that displays it to a user.
CORRECTED: §6.7 is now grounded in the value this system actually persists — AuthIdentity(issuer, subject,
           createdAt) in the MISSION-OWNED DISPOSABLE database, written by the reviewed WU-A login path
           (prismaIdentityStore.createAccountWithIdentity).
UNAMBIGUITY: primary procedure runs on a freshly migrated database and asserts AuthIdentity count = 0 before the
           operator signs in, then asserts exactly ONE Google-issuer identity after — so the selected row is
           unambiguous by construction. Fallback uses an explicit createdAt boundary with an "exactly one new
           row" assertion and ABORTS on 0 or >1; no selection is ever made under ambiguity.
NON-DISCLOSURE: the value moves from psql straight into the 0600 mission env file by shell redirect. It is never
           bound to a shell variable, never rendered to a terminal or tmux pane, absent from command text (so
           shell history stays clean), absent from ~/.psql_history (psql -c writes none), and absent from
           container logs. Correct placement is proven with `grep -c` on a digits-only pattern, which returns a
           COUNT ONLY and never the value. The env file is never cat/echoed.
REPORTING: booleans and counts only — authIdentityPreCount, googleIdentityCount, allowlistLineWellFormed,
           allowlistConfigured, operatorAdmitted, customerRefused.
OWNERSHIP: owner-performed; the Worker and Advisor neither execute it nor receive its output.
BLOCKING?  NO. An exact safe procedure exists with NO new product path, so the operator browser gate is NOT
           marked unresolved.
SCOPE:     RESULT §6.7 and this pointer only. Product code, product commit d5c762f, and every other result
           section are UNCHANGED.
```

## Reviewer focus

```text
1. the delta is ONE file and is a teardown-policy switch only — verify it introduces no second serializer,
   importer, binder, seed path, endpoint, route, process launcher, dependency, schema, migration, or provider;
2. the switch is conjunctive and cannot relax any refusal or affect the ordinary suite;
3. adjacent-positive and adjacent-negative assertions cover the preserve predicate and the default cleanup
   contract, including whitespace near-misses;
4. preserve mode retains the canonical bundle and nothing else, and the database is still disconnected.
```

```text
CLAIM_CEILING: FIXTURE CAN NOW PREPARE A RUNTIME HOLDING BOTH THE REVIEWED DB SEED/BINDING AND THE CANONICAL
               BUNDLE, WITH BOTH TEARDOWN MODES REHEARSED ON ISOLATED DISPOSABLE RESOURCES.
               NO BROWSER, NO OFFICIAL-PROVIDER, NO TUNNEL, NO PRODUCTION-READINESS EVIDENCE.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
STOP
```
