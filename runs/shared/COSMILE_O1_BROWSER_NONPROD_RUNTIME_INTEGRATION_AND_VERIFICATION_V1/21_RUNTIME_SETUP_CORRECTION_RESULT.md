# Cosmile Worker Result — Runtime Fixture Preservation Correction

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_TYPE: BOUNDED_RUNTIME_SETUP_CORRECTION
ROLE_ACTOR: Cosmile Worker
SKILL: /fable-builder
STATUS: COMPLETE — one additive candidate commit, not pushed
RETURN_TO: foundation-advisor
```

## 1. Anchors verified from Git (not memory)

```text
HANDOFF_COMMIT: 520067c2ab8f729f6b68a508794bd8d26530df1e
HANDOFF_BLOB: 75254682f9431d128efb3610c10ee0afd93d3dd8              VERIFIED
HANDOFF_SHA256: 95da50dd356bfd708699b3847d9233b25a18a4ebb647b0f42ee1eb5e3d6a18ba  VERIFIED
REQUIRED_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1             MATCHED (worktree clean at start)
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
```

## 2. Candidate chain

```text
63fdd2d  START_HEAD (predecessor reviewed head)
  └─ 6a3b718  candidate 1 — runtime composition + correction 1
       └─ 00feea3  candidate 2 — one-shot fixture bridge + founder reuse disposition
            └─ d5c762fcf4029f7027daad02a18ffae43e62e5ab  candidate 3 — THIS correction (additive)
REVIEW_DELTA: git diff 00feea3..d5c762f      1 file · +68 · -3
PUSHED: NO · AMEND/REBASE/SQUASH/FORCE-PUSH: NONE · WORKTREE_AT_END: CLEAN
```

## 3. Exact change (one file only)

`app/scripts/o1_nonprod_fixture_setup.vitest.ts` — no other product path changed.

```text
ADDED SWITCH: O1_FIXTURE_PRESERVE_FOR_RUNTIME=1   (non-secret execution switch; NOT a credential)
PREDICATE:    shouldPreserveBundle(oneShot, preserve) === (oneShot === "1" && preserve === "1")
CONJUNCTIVE:  effect only when O1_FIXTURE_ONESHOT is ALSO exactly "1" — the switch can never act alone
REFUSALS:     unchanged and still evaluated BEFORE any database work —
              production · non-loopback DATABASE_URL · relative bundle root · in-repository bundle root
DEFAULT:      absent/near-miss values preserve the EXISTING teardown behaviour exactly (remove bundle)
PRESERVE:     retains ONLY the canonical bundle tree; starts no process, launches no server, keeps no
              database open, writes no extra artifact
DISCONNECT:   the database client is disconnected at the end of fixture execution in BOTH modes
OUTPUT:       categories/counts/booleans only — no path, connection string, credential, subject, hash value,
              or identifier is printed
OWNERSHIP:    the retained tree is mission-created and is removed by the Advisor-controlled shutdown procedure
NOT INTRODUCED: second serializer · importer · binder · seed path · endpoint · route · process launcher ·
              dependency · schema · migration · provider path
```

## 4. Assertions added (same file; run in the ordinary suite — no DB, no filesystem, no runtime import)

```text
ADJACENT-POSITIVE   only the exact conjunction ("1","1") preserves
ADJACENT-NEGATIVE   the preserve flag ALONE never preserves — one-shot undefined/""/"0"/"true"/"TRUE"/"01"
ADJACENT-NEGATIVE   any near-miss preserve value keeps the DEFAULT cleanup contract, incl. " 1" and "1 "
DEFAULT CONTRACT    across a 5x5 near-miss matrix, preservation is impossible
```

## 5. Checks and rehearsals

```text
tsc --noEmit                 PASS  0 errors
next build (non-production)  PASS
eslint (changed file)        PASS  0 errors
focused, both flags absent   6 passed · 5 skipped
focused, PRESERVE set but ONE-SHOT absent   6 passed · 5 skipped   (identical — the flag alone is inert)
full suite                   25 files · 594 passed · 7 skipped
                             (prior candidate 25 · 590 · 6 — +4 assertions; no test count decreased)

REHEARSAL 1 — default one-shot, isolated loopback disposable PostgreSQL
  fixture run                5 passed · 6 skipped
  bundle after completion    REMOVED            (required: removed)   PASS
  container                  removed            repository writes: 0

REHEARSAL 2 — preserve-for-runtime one-shot, isolated loopback disposable PostgreSQL
  fixture run                5 passed · 6 skipped
  bundle after completion    PRESENT            (required: present)   PASS
  retained tree contents     bundle_meta.json · manifests · snapshots   (canonical bundle ONLY)
  database seed              snapshots=1 · bindings=1
  mission cleanup command    rm -rf <bundle-root>
  removal verified           YES                (required: verified)  PASS
  container                  removed            repository writes: 0
```

Both rehearsals used a unique `postgres:16-alpine` container with tmpfs data on a 127.0.0.1 random port,
applied only the existing repository migration chain, and used synthetic data only. No Google/Toss credential,
provider call, tunnel, real PII, real payment, or production/shared resource was involved.

## 6. Runtime preparation runbook — NAMES ONLY, NO SECRETS

Every step below is a **plan**, not an execution: nothing in this section was run. No value is recorded
anywhere; only names, command classes, and URL shapes appear.

### 6.1 Disposable database

```text
IDENTITY_CATEGORY: mission-owned, single-use, disposable, non-shared, non-production
IMAGE:             postgres:16-alpine (already local; NO pull)
DATA:              tmpfs only — no named or persistent volume
NETWORK:           published to 127.0.0.1 on a RANDOM free port; loopback only; never 0.0.0.0
CREATE/START:      docker run -d --rm --name <unique-mission-name> \
                     -e POSTGRES_PASSWORD=<owner-supplied> -e POSTGRES_DB=postgres \
                     --tmpfs /var/lib/postgresql/data -p 127.0.0.1:<random>:5432 postgres:16-alpine
READINESS:         docker exec <name> pg_isready -U postgres   (bounded retry)
ENV NAME SET:      DATABASE_URL        (value owner-supplied; loopback host is enforced by the fixture gate)
```

### 6.2 Reviewed migration application

```text
COMMAND: npx prisma migrate deploy
SCOPE:   applies ONLY the migrations already present in the repository; creates/edits/deletes none
```

### 6.3 Canonical fixture in preserve mode

```text
ENV NAME SET: O1_FIXTURE_ONESHOT · O1_FIXTURE_PRESERVE_FOR_RUNTIME · COSMILE_O1_FOUNDATION_BUNDLE_ROOT · DATABASE_URL
COMMAND:      npx vitest run scripts/o1_nonprod_fixture_setup.vitest.ts
EFFECT:       canonical bundle written + reviewed importer + reviewed binder + Cosmile SKU seed;
              bundle RETAINED for the runtime session; database client disconnected
CONSTRAINT:   COSMILE_O1_FOUNDATION_BUNDLE_ROOT must be ABSOLUTE and OUTSIDE the repository (gate-enforced)
```

### 6.4 Next non-production startup (command class only)

```text
CLASS:      non-production Next server bound to loopback
ENV NAMES:  NODE_ENV(non-production) · DATABASE_URL · COSMILE_O1_RUNTIME_ENABLED ·
            COSMILE_O1_GOOGLE_AUTH_ENABLED · COSMILE_O1_FOUNDATION_BUNDLE_ROOT ·
            COSMILE_O1_PUBLIC_BASE_URL · COSMILE_O1_PREVIEW_ACCESS_SECRET ·
            NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY · O1_TOSS_TEST_SECRET_KEY · O1_TOSS_MODE ·
            COSMILE_O1_OPERATOR_SUB_ALLOWLIST · COSMILE_O1_OPERATOR_STEP_UP_SECRET ·
            COSMILE_GOOGLE_CLIENT_ID · COSMILE_GOOGLE_CLIENT_SECRET · COSMILE_GOOGLE_REDIRECT_URI
SOURCE:     owner-only 0600 mission env file under the mission temp root, or no-echo injection.
            Values are never read, echoed, logged, committed, or returned by the Worker or the Advisor.
```

### 6.5 Preview-gate denial precheck — BEFORE any tunnel

```text
CHECK 1 (must DENY): unauthenticated request to a general path -> redirect to /preview (HTML) or 403 JSON
CHECK 2 (must DENY): request carrying a wrong or absent gate cookie -> denied
CHECK 3 (must ADMIT): only after the exact secret is posted to the gate endpoint
GATE MUST BE PROVEN DENYING BEFORE THE TUNNEL IS STARTED. A random tunnel URL is not access control.
PROOF FORM: HTTP status/redirect target only — no cookie value, secret, or header is captured.
```

### 6.6 Callback URL shapes (placeholder base only)

```text
PUBLIC_BASE_PLACEHOLDER: https://<preview-host>
GOOGLE_REDIRECT_URI:     https://<preview-host>/api/auth/google/callback
TOSS_SUCCESS_URL:        https://<preview-host>/api/o1/checkout/toss/success?orderId=<internal-order-id>
TOSS_FAIL_URL:           https://<preview-host>/api/o1/checkout/toss/fail
TOSS_WEBHOOK_URL:        https://<preview-host>/api/o1/webhooks/toss
NOTE: the success/fail/webhook paths are exempt from the preview gate ONLY as exact literals; each performs its
      own fail-closed verification, and the webhook treats its body as untrusted until server-pull-verified.
```

### 6.7 Operator-subject bootstrap that never exposes the subject

> **CORRECTED (Advisor finding O1BR-RUNBOOK-1).** A prior revision of this section claimed the owner could read
> the operator's `sub` from "their own Google account console". That was unfounded: Google's OIDC documentation
> establishes that `sub` is delivered **in the ID token** and is the stable per-client identifier, but it does
> not provide a Google account-console surface that displays `sub` to an end user. The procedure below is
> instead grounded in the value this system actually persists.

**Where the subject actually exists.** The reviewed WU-A login path (`prismaIdentityStore.createAccountWithIdentity`)
writes the verified principal to `AuthIdentity(issuer, subject, createdAt)` in the **mission-owned disposable
database**. That table — not any Google console — is the authoritative, local, already-authorized source. No new
product path, route, endpoint, or schema change is required, so the operator browser gate is **NOT blocked**.

```text
GOAL: place the dedicated operator's immutable Google subject into COSMILE_O1_OPERATOR_SUB_ALLOWLIST without the
      subject ever appearing in stdout, chat, tmux, shell history, container logs, Git, screenshots, or any
      artifact — and with the selected row provably unambiguous.
```

**Primary procedure — empty-table bootstrap (maximally unambiguous).** Run it on the freshly migrated disposable
database, before any other Google sign-in.

```text
STEP 1  PRECONDITION (count only, no values):
        docker exec <db> psql -U postgres -d postgres -t -A -c 'SELECT count(*) FROM "AuthIdentity"'
        REQUIRED: 0.  If non-zero, do NOT continue here — use the fallback below.

STEP 2  ONLY the dedicated OPERATOR signs in through the normal Google flow on the preview host.
        The customer sign-in is deliberately deferred until after step 5.

STEP 3  UNAMBIGUITY ASSERTION (count only, no values):
        docker exec <db> psql -U postgres -d postgres -t -A -c \
          'SELECT count(*) FROM "AuthIdentity" WHERE "issuer" = ''https://accounts.google.com'''
        REQUIRED: exactly 1.  Any other value => ABORT (ambiguous); reset the disposable database and restart
        at step 1. Exactly one Google identity exists, so "the operator's row" is unambiguous by construction.

STEP 4  SECURE TRANSFER — the value goes from psql straight into the 0600 file and is never rendered:
        ( umask 077
          printf 'COSMILE_O1_OPERATOR_SUB_ALLOWLIST=' >> <mission-env-file>
          docker exec <db> psql -U postgres -d postgres -t -A -q -c \
            'SELECT "subject" FROM "AuthIdentity" WHERE "issuer" = ''https://accounts.google.com''' \
            >> <mission-env-file>
        )
        chmod 600 <mission-env-file>
        WHY THIS IS SAFE: stdout is redirected to the file, so the value never reaches a terminal or tmux pane;
        the COMMAND TEXT contains no subject, so shell history stays clean; `psql -c` writes no ~/.psql_history
        (history is interactive-only); `docker exec` output is not captured in container logs; the value is never
        bound to a shell variable, so it cannot leak through `set -x`, an error message, or a trap.

STEP 5  SHAPE PROOF WITHOUT DISCLOSURE (count only):
        grep -c '^COSMILE_O1_OPERATOR_SUB_ALLOWLIST=[0-9][0-9]*$' <mission-env-file>
        REQUIRED: 1.  This proves the line exists AND is digits-only (a well-formed Google subject) while
        printing only the count. NEVER `cat`, `echo`, or open the env file for inspection.

STEP 6  RESTART the non-production server so the new allowlist is loaded.

STEP 7  EFFECT VERIFICATION (booleans only):
        operatorAdmitted   = (GET /o1/operator as the OPERATOR session renders the panel)          expect true
        customerRefused    = (GET /o1/operator as the CUSTOMER session shows the denial)           expect true
        Proof form is HTTP status / rendered-category only — no identity, subject, or cookie is captured.
```

**Fallback — non-empty table (a customer identity already exists).** Use an explicit creation boundary instead
of table emptiness; the abort rule is what preserves unambiguity.

```text
F1  Record a boundary timestamp BEFORE the operator signs in (a timestamp is not an identifier):
    docker exec <db> psql -U postgres -d postgres -t -A -c 'SELECT now()'   -> T0
F2  ONLY the dedicated operator signs in.
F3  ASSERT exactly one new Google identity since T0 (count only):
    ... -c "SELECT count(*) FROM \"AuthIdentity\" WHERE \"issuer\" = 'https://accounts.google.com'
            AND \"createdAt\" > '<T0>'"
    REQUIRED: exactly 1.  0 => the operator already had an identity (re-run on a fresh disposable database so
    the primary procedure applies).  >1 => concurrent sign-ins occurred => ABORT; no selection is made.
F4  Transfer with the SAME redirect form as step 4, adding AND "createdAt" > '<T0>' to the WHERE clause.
F5..F7  identical to steps 5–7 above.
```

```text
WORKER/ADVISOR REPORTABLE FORM: booleans and counts only —
  authIdentityPreCount, googleIdentityCount, allowlistLineWellFormed, allowlistConfigured,
  operatorAdmitted, customerRefused.  No subject, issuer-subject pair, env value, or file content is ever
  reported, echoed, or committed.
OWNERSHIP: this bootstrap is OWNER-PERFORMED. The Worker and the Advisor neither execute it nor receive its
  output; they receive only the booleans above.
CLEANUP: the mission env file is shredded/removed in shutdown step 6 (§6.8) and the disposable database — the
  only place the subject was stored — is destroyed in step 4, so no residue survives the session.
STRUCTURAL BACKSTOP (unchanged): the app requests scope=openid ONLY, so no email claim is ever issued; and a
  non-digit (e.g. email-shaped) allowlist entry can never match the digits-only subject format. Email cannot
  become an authority key regardless of how the allowlist is populated.
```

### 6.8 Ordered shutdown and cleanup, with proof form

```text
ORDER  STEP                      COMMAND CLASS                        PROOF WITHOUT EXPOSING VALUES
1      stop the tunnel           terminate the tunnel process         process absent by name/pid class; public URL
                                                                      no longer resolves (status only)
2      stop the Next server      terminate the server process         port no longer listening on loopback (status)
3      remove callback           owner-performed console removal      owner attests removal; no URL/value returned
       registrations             (Google test client, Toss dashboard)
4      remove the database       docker rm -f <unique-mission-name>    `docker ps -a -q -f name=<name>` is EMPTY
5      remove the bundle         rm -rf <bundle-root>                 directory-exists test is FALSE (boolean only)
6      remove the env file       shred/rm the owner-only 0600 file     file-exists test is FALSE; contents never read
7      confirm no residue        container/process/port/dir checks     all four report absent; counts only
EVERY proof above is a boolean, a count, or an HTTP status. No path contents, connection string, secret,
subject, hash, or identifier is captured at any step.
```

## 7. Containment for this correction

```text
FILES CHANGED: 1 (the exact allowed product path)
SCHEMA / MIGRATION / DEPENDENCY / PACKAGE / LOCKFILE: UNCHANGED
ROUTE / ENDPOINT / UI / AUTHORITY / PRODUCT SEMANTICS: UNCHANGED
GOOGLE / TOSS CREDENTIALS · PROVIDER CALLS · TUNNEL: NONE
REAL PII · REAL PAYMENT · PRODUCTION OR SHARED RESOURCE: NONE
EXTERNAL NETWORK: NONE (loopback only)
SHARED node_modules: byte-unmodified (fingerprint re-verified)
STRAY CONTAINERS AFTER RUN: 0
```

## 8. Claim ceiling (unchanged by this correction)

```text
CLAIMED: the authorized fixture can now prepare a runtime that simultaneously holds the reviewed database
         seed/binding AND the canonical local bundle, with both teardown modes rehearsed and proven on
         isolated disposable resources.
NOT CLAIMED: any browser execution, any official Google or Toss execution, any provider-sandbox evidence,
         any tunnel exposure, any merchant eligibility, any production readiness.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
