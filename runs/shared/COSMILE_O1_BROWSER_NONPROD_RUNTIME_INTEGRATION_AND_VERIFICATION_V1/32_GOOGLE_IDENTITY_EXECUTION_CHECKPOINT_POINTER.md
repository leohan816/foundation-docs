# Pointer — Official Google Test Identity Execution Checkpoint

```text
POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: OFFICIAL_GOOGLE_TEST_IDENTITIES_AND_OPERATOR_BOOTSTRAP
RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/32_GOOGLE_IDENTITY_EXECUTION_CHECKPOINT_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/32_GOOGLE_IDENTITY_EXECUTION_CHECKPOINT_POINTER.md
PRODUCT_HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab  (UNCHANGED — 0 edits, 0 commits this phase)
UPSTREAM_STATE: ahead 0 / behind 0 · tracked clean
RETURN_TO: Advisor
NEXT_ACTOR: Advisor (to relay the human checklist to Leo)
STATE: WAITING_FOR_LEO_OPERATOR_GOOGLE_LOGIN
EXPECTED_LEO_RESPONSE: OPERATOR_GOOGLE_LOGIN_COMPLETE
```

## Anchors verified

```text
HANDOFF @ 296eaf88 / blob d5e652f4 / sha256 36f153ac…        VERIFIED
LEO CONFIRMATION   / blob f1c3058f / sha256 cdb2b07a…        VERIFIED
LIVE BINDING: exact worktree · branch · HEAD pin · upstream 0/0 · clean · Opus 4.8 (1M) ·
              Leo max effort · /fable-builder · pane sync OFF · xtrace OFF
```

## Gate results

```text
REGISTRATION HOSTNAME MATCH        PASS — recorded base and live tunnel host both equal the registered value.
                                   NO registration blocker; Google login may proceed when Leo is ready.
RUNTIME REVALIDATION               db ALIVE · loopback app LISTENING · tunnel ALIVE · bundle RETAINED
PUBLIC ORIGIN STILL DENYING        /shop 302->/preview · callback 400 fails closed · /preview 200
owner.env                          regular file · leo:leo · 0600 · six names SET ·
                                   COSMILE_O1_OPERATOR_SUB_ALLOWLIST MISSING (correct — Leo populates it)
EMPTY-TABLE PRECONDITION           AuthIdentity 0 · google-issuer 0 · CustomerAccount 0  => operator-first
AUTH REQUEST BINDING (boolean)     redirect_uri == registered value YES · scope openid-only YES ·
                                   PKCE S256 YES · no Google contact, redirect not followed
UNRELATED STATE                    root-Cosmile dev · AdAstra dev · pre-existing :8080 tunnel — ALL PRESERVED
```

## FOR LEO — exact operator checkpoint (relay via Advisor)

> OPERATOR account only. Not the customer account. Never a personal Google account.
> Never paste an email, password, MFA code, subject, cookie, token, or URL back into chat.

```text
1. Unlock the preview gate FIRST (the Google button is blocked until you do):
     https://website-richmond-watch-planes.trycloudflare.com/preview
   Key = the COSMILE_O1_PREVIEW_ACCESS_SECRET value already inside your own owner.env. Do not share it.

2. In the SAME browser session open:
     https://website-richmond-watch-planes.trycloudflare.com/api/auth/google/start
   Sign in with the dedicated OPERATOR test account.
   If Google shows "redirect_uri_mismatch", STOP and report that phrase only.

3. Run, as yourself (prints counts/booleans only; never the subject):
     <mission runtime root>/bootstrap_operator_subject.sh
   Expect: RESULT: OPERATOR_SUBJECT_BOOTSTRAP_COMPLETE

4. Load the allowlist:
     <mission runtime root>/restart_app.sh
   Expect: app restarted and responding: 200

5. Reply with the categorical phrase ONLY:  OPERATOR_GOOGLE_LOGIN_COMPLETE
   On failure, reply with the failing step number and nothing else.
```

## Owner-only helper

```text
bootstrap_operator_subject.sh   0700 leo:leo   executed by the Worker: NO (zero runs)
restart_app.sh                  0700 leo:leo

Verified by reading the actual source lines, not assumed:
 · the subject never enters a shell variable and is never echoed/logged
 · the only subject-selecting psql call redirects straight into owner.env (continuation line 62)
 · refuses unless EXACTLY ONE google-issuer identity exists (0 = not signed in; >1 = ambiguous -> abort)
 · refuses if the allowlist line already exists (idempotency)
 · proves placement with grep -c on a digits-only pattern (COUNT ONLY)
 · re-applies chmod 600 and reports owner/mode as a check
 · set +x inside; takes no caller-supplied argument (the only "$1" is fail()'s own parameter, line 32)
```

## Disclosure

```text
An initial probe of /api/auth/google/start WITHOUT a gate cookie returned 403 and produced a false
"redirect_uri mismatch" reading. The start route is preview-gated. Re-measured with an admitted gate
session it matches the registered value exactly. Reported because it is also the reason Leo must unlock
the preview gate BEFORE using the Google entry point (checklist step 1).
```

## Boundary compliance

```text
GOOGLE LOGIN BY WORKER: NO · GOOGLE NETWORK CONTACT: NONE · CREDENTIAL AUTOMATION: NONE
SUBJECT CAPTURED BY WORKER/ADVISOR: NO (owner-performed helper only)
CUSTOMER LOGIN: NOT STARTED · TOSS CALL: NONE · GOLDEN ORDER/REVERSAL: NOT EXECUTED
PRODUCT EDIT/COMMIT/SCHEMA/MIGRATION/DEPENDENCY: ZERO
SECRETS or IDENTIFIERS in any output: NONE
```

```text
REQUIRED_STOP_STATE REACHED: WAITING_FOR_LEO_OPERATOR_GOOGLE_LOGIN
Bounded mission runtime kept ALIVE during the human pause.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
STOP
```
