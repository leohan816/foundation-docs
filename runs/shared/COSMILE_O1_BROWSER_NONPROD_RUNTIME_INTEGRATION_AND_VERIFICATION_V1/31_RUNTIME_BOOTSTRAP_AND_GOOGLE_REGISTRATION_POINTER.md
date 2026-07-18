# Pointer — Runtime Bootstrap and Google Registration Checkpoint

```text
POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: CREDENTIAL_GATED_RUNTIME_BOOTSTRAP_BEFORE_GOOGLE_LOGIN
RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/31_RUNTIME_BOOTSTRAP_AND_GOOGLE_REGISTRATION_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/31_RUNTIME_BOOTSTRAP_AND_GOOGLE_REGISTRATION_POINTER.md
RUNTIME_REPO: /home/leo/Project/Cosmile
RUNTIME_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
PRODUCT_HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab  (UNCHANGED — 0 edits, 0 commits this phase)
UPSTREAM_STATE: ahead 0 / behind 0 · tracked clean
RETURN_TO: Advisor
NEXT_ACTOR: Advisor
STATE: WAITING_FOR_LEO_GOOGLE_REGISTRATION_CONFIRMATION
```

## Anchors verified

```text
HANDOFF @ f136fbc7 / blob b15cd753 / sha256 23a1b032…   VERIFIED
CLOSURE           / blob af5f277a / sha256 6c0a2ecb…    VERIFIED
LIVE BINDING: exact worktree · exact branch · exact HEAD · upstream 0/0 · clean ·
              Opus 4.8 (1M) family · Leo-configured max effort · /fable-builder ·
              tmux pane synchronization OFF · shell tracing OFF
```

## FOR LEO — exact Google Auth Platform registration values

```text
AUTHORIZED_JAVASCRIPT_ORIGIN_IF_REQUIRED:
  https://website-richmond-watch-planes.trycloudflare.com

AUTHORIZED_REDIRECT_URI:
  https://website-richmond-watch-planes.trycloudflare.com/api/auth/google/callback
```

Register the redirect URI **exactly**. No wildcard, alternate path, HTTP origin, localhost substitute, or
inferred hostname is acceptable. The origin is ephemeral — if the tunnel restarts, the host changes and
registration must be repeated against the new value.

## Evidence summary (categories, booleans, statuses only)

```text
owner.env                 regular file · leo:leo · 0600 · six closure names SET · zero values rendered
database                  unique mission-owned postgres:16-alpine · tmpfs verified · loopback-only random port
                          · transient local credential kept inside the protected boundary
migrations                7 applied — existing reviewed chain only; none created/edited/deleted
fixture (preserve mode)   5 passed · 6 skipped · canonical bundle retained OUTSIDE the repo
                          · seed snapshots=1 bindings=1 active_skus=1 · repository writes 0
app process               loopback-only · stdout AND stderr suppressed (no callback parameter can be logged)

PRE-TUNNEL GATE PROOF     HTML 302->/preview DENIED · API 403 preview_access_required DENIED
                          · wrong secret 401 REFUSED · exact secret 200 ADMITTED · admitted /shop 200
                          · cookie/secret never recorded · transient secret-bearing body shredded
TUNNEL                    one mission-owned restricted quick tunnel · pre-existing :8080 tunnel untouched
                          · log 0600 and free of credential/cookie/token/provider body/PII
POST-REBIND HTTPS PROOF   /preview 200 · /shop 302 DENIED · /api/o1/... 403 DENIED · / 302 DENIED
                          · /api/auth/google/callback 400 state_invalid FAILS CLOSED, no payload leaked
                          · admitted HTTPS session renders the O1 eligible catalog (runtime ready)

GOOGLE LOGIN INITIATED    NO · GOOGLE NETWORK CONTACT: NONE
TOSS CALL                 NONE · BROWSER GOLDEN ORDER/REVERSAL: NOT EXECUTED
OPERATOR SUBJECT BOOTSTRAP NOT PERFORMED (out of this phase)
PRODUCT EDIT / COMMIT / SCHEMA / MIGRATION / DEPENDENCY / IMAGE PULL   ZERO
SECRETS printed/logged/hashed/copied/returned   NONE
UNRELATED processes, containers, tunnels, files  ALL PRESERVED
```

## Disclosure the Advisor should weigh

```text
One request was made to our OWN route /api/auth/google/start (302). That route builds the authorization URL
LOCALLY with no outbound Google call and sets state/nonce/PKCE cookies; the redirect was NOT followed and no
code or token was requested or received. It is reported purely as evidence that the route is active and its
configuration resolved. If the Advisor considers even this to be inside the Google boundary, say so and it will
not be repeated in the next phase.
```

## Live mission resources (kept alive for the bounded registration wait)

```text
mission PostgreSQL container · mission Next app process · mission cloudflared tunnel · retained canonical bundle
Ordered shutdown/cleanup with a value-free proof form is pinned in 21_RUNTIME_SETUP_CORRECTION_RESULT.md §6.8.
Teardown will be executed on Advisor instruction, or immediately if a safety blocker appears.
```

```text
REQUIRED_STOP_STATE REACHED: WAITING_FOR_LEO_GOOGLE_REGISTRATION_CONFIRMATION
NEXT AUTHORIZED STEP: none until Leo confirms registration through the Advisor.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
STOP
```
