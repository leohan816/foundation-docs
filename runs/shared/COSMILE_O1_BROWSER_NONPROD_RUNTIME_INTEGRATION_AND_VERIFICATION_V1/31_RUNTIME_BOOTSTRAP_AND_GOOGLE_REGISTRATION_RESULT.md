# Cosmile Worker Result — Runtime Bootstrap and Google Registration Checkpoint

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: CREDENTIAL_GATED_RUNTIME_BOOTSTRAP_BEFORE_GOOGLE_LOGIN
ROLE_ACTOR: Cosmile repository-owner Worker
SKILL: /fable-builder
STATE: WAITING_FOR_LEO_GOOGLE_REGISTRATION_CONFIRMATION
RETURN_TO: foundation-advisor
```

## 1. Anchors verified from Git (not memory)

```text
FOUNDATION_DOCS_BRANCH: advisor/cosmile-o1-browser-nonprod-runtime-v1-20260718
HANDOFF_COMMIT: f136fbc7616ed00c70281b34929cec7521f97ee5
HANDOFF_BLOB: b15cd753c208c31463fa7aba01b4c64e77156869                                   VERIFIED
HANDOFF_SHA256: 23a1b03255662ef583813eb2ae31bcc4d6fc2378b9e67b012189f4500ef65c4e         VERIFIED
CLOSURE_BLOB: af5f277a331ccaacb8cdfe09b5c996b2e05b40ac                                   VERIFIED
CLOSURE_SHA256: 6c0a2ecb41d1c226d49eae083749b7e62e55593b7ff7ca52d905bda7763b8589         VERIFIED
RE-READ: agent-office TEAM_OPERATING_MODEL.md · roles/worker.md · Cosmile AGENTS.md · Cosmile CLAUDE.md
```

## 2. Live binding verified immediately before acting

```text
CWD: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab                       MATCHES REQUIRED PIN
UPSTREAM: ahead 0 / behind 0                                          MATCHES REQUIRED STATE
TRACKED_STATE: clean                                                  MATCHES REQUIRED STATE
MODEL: Opus 4.8 (1M context) family · Leo-configured max effort
ROLE: Cosmile repository-owner Worker · /fable-builder loaded
TMUX_PANE_SYNCHRONIZATION: off
SHELL_XTRACE: off (kept off for every command in this phase)
PRODUCT_COMMITS_THIS_PHASE: 0
PRODUCT_SOURCE_EDITS_THIS_PHASE: 0
```

## 3. Tooling verified (no install, no pull)

```text
docker: present · postgres:16-alpine: present locally · cloudflared: present
node: v24.18.0 · app node_modules: present (local copy; nothing installed)
playwright (host install) + cached Chromium: present (NOT used in this phase)
```

## 4. Pre-existing unrelated state — inventoried and preserved

```text
INVENTORIED BEFORE ACTING           STATE AFTER THIS PHASE
root-Cosmile next dev server        ALIVE, untouched
AdAstra next dev server (:3001)     ALIVE, untouched
cloudflared quick tunnel -> :8080   ALIVE, untouched (not reused, not disturbed)
exited hello-world container        PRESENT, untouched
```

Nothing pre-existing was stopped, altered, reused, or restarted. Every mission resource is uniquely named or
uniquely ported, and the only process this phase stopped was the mission's own app process, identified by its
unique loopback port.

## 5. owner.env validation — structural + names-only

```text
PATH: <mission runtime root>/owner.env
TYPE: regular file (not a symlink) · OWNER: leo:leo · MODE: 0600
COSMILE_GOOGLE_CLIENT_ID: SET
COSMILE_GOOGLE_CLIENT_SECRET: SET
NEXT_PUBLIC_O1_TOSS_TEST_CLIENT_KEY: SET
O1_TOSS_TEST_SECRET_KEY: SET
COSMILE_O1_PREVIEW_ACCESS_SECRET: SET
COSMILE_O1_OPERATOR_STEP_UP_SECRET: SET
O1_TOSS_MODE: MISSING            -> ACCEPTED: the runtime treats an absent mode as test provided the secret
                                    carries the test_ shape; a live-looking key or non-test mode is refused
COSMILE_O1_PUBLIC_BASE_URL: MISSING at validation time   -> supplied by this phase (step 10)
COSMILE_GOOGLE_REDIRECT_URI: MISSING at validation time  -> supplied by this phase (step 10)
COSMILE_O1_OPERATOR_SUB_ALLOWLIST: MISSING               -> CORRECT: operator bootstrap is explicitly OUT of
                                    this phase and remains unperformed
VALUES_DISPLAYED_HASHED_COPIED_OR_RETURNED: NONE
```

## 6. Isolated runtime prepared

```text
DATABASE
  image                postgres:16-alpine (already local; no pull)
  identity category    unique mission-owned, single-use, non-shared, non-production
  data                 tmpfs verified from inside the container (fstype=tmpfs)
  persistent volumes   0
  bind                 127.0.0.1 only on a random high port; no 0.0.0.0 binding
  credential           transient, locally generated, stored ONLY inside the 0600 protected boundary;
                       never printed, logged, hashed, or returned
  auto-remove          true
MIGRATIONS
  command              npx prisma migrate deploy
  applied              7 (the existing reviewed chain ONLY; none created, edited, or deleted)
FIXTURE (reviewed one-shot bridge, PRESERVE mode)
  flags                O1_FIXTURE_ONESHOT=1 · O1_FIXTURE_PRESERVE_FOR_RUNTIME=1
  result               5 passed · 6 skipped
  bundle retained      YES — entries: bundle_meta.json, manifests, snapshots (canonical bundle ONLY)
  bundle location      outside the repository (verified)
  database seed        snapshots=1 · bindings=1 · active_skus=1
  repository writes    0 (tracked state clean after the run)
APPLICATION
  process              one non-production Next dev server, unique loopback port, 127.0.0.1 only
  flags                COSMILE_O1_RUNTIME_ENABLED=true · COSMILE_O1_GOOGLE_AUTH_ENABLED=true
  output               stdout AND stderr redirected to /dev/null, so no future callback query parameter,
                       code, token, or cookie can ever be captured in a log
  env sourcing         performed inside the launcher with tracing off; no value echoed at any point
```

## 7. Preview-gate proof BEFORE any tunnel (status/category/boolean only)

```text
8a  unauthenticated general HTML  GET /shop          302 -> /preview                  DENIED
8b  unauthenticated general API   GET /api/o1/...    403 + category preview_access_required   DENIED
    response body leaked nothing beyond the category (no secret/cookie/token/DSN)     VERIFIED
8c  wrong secret posted to gate                       401                             REFUSED
8d  exact secret posted to gate                       200, gate cookie issued         ADMITTED
    cookie value / secret recorded anywhere                                           NO
    transient request body containing the secret shredded after use                   YES
8e  admitted session GET /shop                        200                             ADMITTED
8f  O1 eligible synthetic catalog item rendered                                       YES
```

The gate was proven denying **before** the tunnel process was started.

## 8. Restricted HTTPS preview

```text
TUNNEL              one mission-owned cloudflared quick tunnel -> the loopback app port
PRE-EXISTING TUNNEL untouched and still alive (total cloudflared = 1 pre-existing + 1 mission)
LOGGING             narrowest sufficient; written to a 0600 file inside the protected runtime dir
LOG CONTENT CHECK   contains no credential, cookie, token, authorization header, provider body, or PII
REBIND              protected runtime environment updated with the exact generated HTTPS base and the
                    matching Google callback URI; values derived in-process, never echoed
RESTART             mission app restarted with stdout/stderr suppressed; unrelated servers untouched
```

## 9. Denial proof over public HTTPS (after rebind)

```text
gate page          GET /preview                       200 (scheme https, TLS terminated by provider)
general HTML       GET /shop                          302 -> /preview                     DENIED
general API        GET /api/o1/operator/orders        403 + preview_access_required        DENIED
storefront root    GET /                              302 -> /preview                     DENIED
Google callback    GET /api/auth/google/callback      400 + state_invalid/code_missing     FAILS CLOSED
                   response carried no provider payload, secret, token, or cookie          VERIFIED
readiness          admitted session over HTTPS renders the O1 eligible catalog             VERIFIED
```

The public origin exposes no browsable storefront, no operator surface, and no data to an unauthenticated
visitor. Only the gate page, the exact provider callback paths, and the gate endpoint answer at all, and the
callback fails closed on its own verification.

## 10. Registration checkpoint values (non-secret; to be returned to Leo)

```text
AUTHORIZED_JAVASCRIPT_ORIGIN_IF_REQUIRED:
  https://website-richmond-watch-planes.trycloudflare.com

AUTHORIZED_REDIRECT_URI:
  https://website-richmond-watch-planes.trycloudflare.com/api/auth/google/callback
```

The redirect URI must be registered **exactly**. No wildcard, alternate path, HTTP origin, localhost
substitute, or inferred hostname is acceptable. This origin is ephemeral: if the tunnel is restarted the host
changes and registration must be repeated against the new value.

## 11. Explicit disclosure — what was and was not touched at the Google boundary

```text
GOOGLE LOGIN INITIATED: NO. No Google authentication was started, no authorization code or token was
  requested or received, and no Google account interacted with the runtime.
NETWORK CONTACT WITH GOOGLE: NONE. One request was made to our OWN route /api/auth/google/start, which
  returned 302. That route builds the authorization URL locally (no outbound Google call) and sets
  state/nonce/PKCE cookies; the redirect was NOT followed. It is reported here only as evidence that the
  route is active and its configuration resolved. Disclosed explicitly so the Advisor can judge the boundary.
TOSS: no call of any kind was made.
BROWSER GOLDEN ORDER / REVERSAL: not executed.
OPERATOR SUBJECT BOOTSTRAP: not performed (explicitly out of this phase).
```

## 12. Containment summary

```text
PRODUCT SOURCE EDITS: 0 · PRODUCT COMMITS: 0 · HEAD unchanged at d5c762f · tracked clean · upstream 0/0
SCHEMA / MIGRATION CREATED: 0 · DEPENDENCY INSTALLED: 0 · IMAGE PULLED: 0
SECRET VALUES printed / logged / hashed / copied / returned: NONE
SHELL TRACING: off throughout · env / printenv / cat owner.env: never executed
PROTECTED BOUNDARY: runtime dir 0700 · owner.env 0600 leo:leo · mission runtime file 0600 · tunnel log 0600
REAL CUSTOMER PII / REAL PAYMENT / PRODUCTION / SHARED DATABASE: NONE
UNRELATED PROCESSES, CONTAINERS, TUNNELS, FILES: all preserved
```

## 13. Live mission resources (kept alive for the bounded registration wait)

```text
mission PostgreSQL container   ALIVE (disposable, tmpfs, loopback-only)
mission Next app process       ALIVE (loopback-only, output suppressed)
mission cloudflared tunnel     ALIVE (restricted preview; gate proven denying)
canonical Foundation bundle    RETAINED outside the repository for this runtime session
```

These remain up only for the registration wait. The ordered shutdown and cleanup procedure — with a
boolean/count/status proof form that exposes no value — is pinned in
`21_RUNTIME_SETUP_CORRECTION_RESULT.md` §6.8.

## 14. Stop state

```text
REQUIRED_STOP_STATE REACHED: WAITING_FOR_LEO_GOOGLE_REGISTRATION_CONFIRMATION
NEXT STEP (NOT AUTHORIZED YET): Google login may begin only after Leo confirms the exact origin and redirect
  URI above are registered in Google Auth Platform. The Worker will not initiate it before that confirmation
  arrives through the Advisor.
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
