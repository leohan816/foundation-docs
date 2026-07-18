# Cosmile Worker Result — Official Google Test Identity Execution Checkpoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: OFFICIAL_GOOGLE_TEST_IDENTITIES_AND_OPERATOR_BOOTSTRAP
ROLE_ACTOR: Cosmile repository-owner Worker
SKILL: /fable-builder
STATE: WAITING_FOR_LEO_OPERATOR_GOOGLE_LOGIN
RETURN_TO: foundation-advisor
```

## 1. Anchors verified from Git (not memory)

```text
FOUNDATION_DOCS_BRANCH: advisor/cosmile-o1-browser-nonprod-runtime-v1-20260718
HANDOFF_COMMIT: 296eaf88d315628d92c612a5d218db9213682c83
HANDOFF_BLOB: d5e652f4cff2f2972d432822b4a273d25c2632d1                               VERIFIED
HANDOFF_SHA256: 36f153aca772741b9e9b106af2f8a0b2f36266691e9625378d675bec644d0649     VERIFIED
LEO_CONFIRMATION_BLOB: f1c3058f57759f3ead574b697f8beb6b792ba13d                      VERIFIED
LEO_CONFIRMATION_SHA256: cdb2b07a2c01dcf241051623cb0b454224ec1f5dd81496488036a93f9c4091d5  VERIFIED
RE-READ: agent-office roles/worker.md (ACTIVE) · Cosmile AGENTS.md (ACTIVE) · CLAUDE.md · app/CLAUDE.md
```

## 2. Live binding reverified immediately before acting

```text
CWD/WORKTREE: exact mission worktree          BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab   MATCHES PIN
UPSTREAM: ahead 0 / behind 0                     TRACKED STATE: clean
MODEL: Opus 4.8 (1M) family · Leo-configured max effort · /fable-builder
TMUX PANE SYNCHRONIZATION: off · SHELL XTRACE: off throughout
PRODUCT EDITS THIS PHASE: 0 · PRODUCT COMMITS THIS PHASE: 0
```

## 3. Runtime revalidation (step 1) — registration gate PASSED

```text
mission PostgreSQL container      ALIVE
mission loopback app              LISTENING (127.0.0.1 only)
mission cloudflared tunnel        ALIVE
canonical Foundation bundle       RETAINED outside the repository

REGISTRATION HOSTNAME MATCH (blocking gate):
  recorded public base == value Leo registered        YES
  live tunnel log host == value Leo registered        YES
  => NO REGISTRATION BLOCKER; the tunnel hostname is unchanged since registration.

public origin still enforcing:
  GET /preview                       200
  GET /shop (unauthenticated)        302 -> /preview        DENIED
  GET /api/auth/google/callback      400 (fails closed)

UNRELATED STATE PRESERVED: root-Cosmile dev ALIVE · AdAstra dev ALIVE · pre-existing :8080 tunnel ALIVE
```

## 4. owner.env revalidation (step 2) — structural + names-only

```text
TYPE: regular file (not a symlink) · OWNER: leo:leo · MODE: 0600
COSMILE_GOOGLE_CLIENT_ID: SET            COSMILE_GOOGLE_CLIENT_SECRET: SET
NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY: SET O1_TOSS_TEST_SECRET_KEY: SET
COSMILE_O1_PREVIEW_ACCESS_SECRET: SET    COSMILE_O1_OPERATOR_STEP_UP_SECRET: SET
COSMILE_O1_OPERATOR_SUB_ALLOWLIST: MISSING   <- CORRECT: this phase does not populate it; Leo does
VALUES DISPLAYED / HASHED / COPIED / LOGGED / RETURNED: NONE
```

## 5. Pre-login precondition (step 4) — empty-table operator-first contract

```text
AuthIdentity total count                 0    (required 0)
AuthIdentity google-issuer count         0    (required 0)
CustomerAccount count                    0    (required 0)
EMPTY-TABLE PRECONDITION MET             YES
```

Because the table is empty, the **operator must sign in FIRST**. The single Google identity created by that
login is then unambiguously the operator's, which is the only reviewed-unambiguous capture path.

## 6. Authorization-request binding verified (boolean-only, no Google contact)

Verified locally through the app's own start route using an admitted gate session. The redirect was **not
followed**; no Google network contact, no code, no token.

```text
start route returns a redirect                                   YES
redirect target host is accounts.google.com                      YES
app-bound redirect_uri == the value Leo registered               YES   <- pre-empts redirect_uri_mismatch
scope is openid-only (no email, no profile)                      YES   <- email can never become authority
PKCE code_challenge_method=S256 present                          YES
client_id / state / nonce / full URL rendered anywhere           NO
```

A measurement correction is disclosed: an initial probe of the start route without a gate cookie returned
403 and produced a false "redirect_uri mismatch" reading. The route is preview-gated; re-measured correctly
with an admitted session it matches exactly. This is a **sequencing fact Leo needs** (see §7 step 1).

## 7. EXACT HUMAN CHECKLIST — operator login (for Leo, via the Advisor)

> Two dedicated **non-personal** Google test accounts are used. This checkpoint is the **OPERATOR** only.
> Do not sign in with the customer account yet, and never sign in with a personal Google account.
> Never paste any email, password, MFA code, subject, cookie, token, or URL back into chat.

```text
STEP 1  Open the preview gate and unlock it FIRST (the Google button is blocked until you do):
          https://website-richmond-watch-planes.trycloudflare.com/preview
        Enter the preview access key. You already hold it — it is the value of
        COSMILE_O1_PREVIEW_ACCESS_SECRET inside your own protected owner.env. Do not share or paste it.
        Expected: you land on the test catalog.

STEP 2  In the SAME browser session, open:
          https://website-richmond-watch-planes.trycloudflare.com/api/auth/google/start
        Sign in with the dedicated OPERATOR test account.
        Expected: Google returns you to the site and you land on the account page.
        If Google shows "redirect_uri_mismatch", STOP and report that phrase only.

STEP 3  Capture the operator subject into the protected file WITHOUT reading it. Run, as yourself:
          /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/bootstrap_operator_subject.sh
        It prints only counts and booleans. It refuses unless exactly one Google identity exists.
        Expected final line: RESULT: OPERATOR_SUBJECT_BOOTSTRAP_COMPLETE

STEP 4  Load the new allowlist:
          /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/runtime/restart_app.sh
        Expected: app restarted and responding: 200

STEP 5  Reply to the Advisor with the categorical phrase ONLY:
          OPERATOR_GOOGLE_LOGIN_COMPLETE
        If any step failed, reply instead with the failing step number and nothing else.
```

## 8. Owner-only helper prepared (step 6)

```text
PATH: <mission runtime root>/bootstrap_operator_subject.sh      MODE 0700  OWNER leo:leo
COMPANION: <mission runtime root>/restart_app.sh                MODE 0700  OWNER leo:leo
EXECUTED BY THE WORKER: NO (zero runs) — it is for Leo only
```

Static safety properties, each verified by inspecting the actual source lines (not assumed):

```text
subject printed / echoed / logged                     NO — the only "subject" echo is the literal
                                                      "subject printed anywhere: NO"; the others are a
                                                      comment and the banner
subject bound to a shell variable                     NO — it never enters a variable, so it cannot leak
                                                      through tracing, an error message, or a trap
subject transfer form                                 psql -> ">> owner.env" redirect on the statement's
                                                      continuation line (verified at source line 62)
only two psql calls exist                             one returns a COUNT into a variable; one selects the
                                                      subject and is redirected to the file. Neither writes
                                                      the subject to stdout
unambiguity guard                                     refuses unless exactly one google-issuer identity
                                                      exists (0 => not signed in; >1 => ambiguous, abort)
idempotency guard                                     refuses if the allowlist line already exists
placement proof                                       grep -c on a digits-only pattern => COUNT ONLY
owner.env boundary                                    chmod 600 re-applied; owner/mode printed as a check
tracing                                               set +x inside the helper
caller-supplied arguments                             none — the only "$1" is the fail() function's own
                                                      parameter (verified at source line 32)
database credential printed                           NO
```

## 9. Boundary compliance for this phase

```text
GOOGLE LOGIN INITIATED BY WORKER            NO
GOOGLE CREDENTIAL AUTOMATION                NONE
GOOGLE NETWORK CONTACT                      NONE (the start-route probe is local; redirect not followed)
SUBJECT CAPTURED BY WORKER OR ADVISOR       NO — capture is owner-performed by the 0700 helper
CUSTOMER LOGIN STARTED                      NO (explicitly deferred to a later checkpoint)
TOSS CALL / GOLDEN ORDER / GOLDEN REVERSAL  NONE
PRODUCT SOURCE EDIT / COMMIT                NONE — HEAD unchanged, tracked clean, upstream 0/0
SCHEMA / MIGRATION / DEPENDENCY / IMAGE PULL NONE
SECRETS printed, hashed, copied, logged, returned  NONE
EMAIL / SUBJECT / PASSWORD / MFA / COOKIE / CODE / TOKEN / ACCOUNT ID in any output  NONE
```

## 10. Live mission resources (kept alive for the human pause)

```text
mission PostgreSQL container · mission Next app (loopback, output suppressed) · mission cloudflared tunnel
· retained canonical bundle. Ordered teardown with a value-free proof form remains pinned in
21_RUNTIME_SETUP_CORRECTION_RESULT.md §6.8, to be executed on Advisor instruction or on a safety blocker.
```

## 11. Stop state

```text
REQUIRED_STOP_STATE REACHED: WAITING_FOR_LEO_OPERATOR_GOOGLE_LOGIN
EXPECTED_LEO_RESPONSE: OPERATOR_GOOGLE_LOGIN_COMPLETE
AFTER THAT (this phase, steps 7): restart the loopback app, then prove operator ADMITTED and customer
  REFUSED using booleans/status only, then prepare the separate customer login checkpoint.
NOT AUTHORIZED UNTIL A LATER EXACT HANDOFF: Toss execution, browser Golden Order, Golden Reversal.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
