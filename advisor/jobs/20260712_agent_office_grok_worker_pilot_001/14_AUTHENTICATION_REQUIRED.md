# Authentication Required

Status: `AUTHENTICATION_REQUIRED`

## Evidence

- First rework request failed before edits with HTTP `403 permission-denied` from
  `https://cli-chat-proxy.grok.com/v1/responses`.
- `grok models` still reported local `grok.com` authentication and exposed
  `grok-build`.
- One exact same-session idempotent retry was authorized and dispatched.
- The retry failed immediately with the same HTTP `403 permission-denied`.
- No further retry, model switch, credential inspection, logout, login, key use,
  or permission change was attempted.
- Candidate commit remains
  `2378b28de2975f3cf00ba9922ea2f14d7af0fd30`; required semantic rework A-1 through
  A-7 is not complete and Fable5 review has not started.

## Minimal Owner Action

Reauthenticate or restore Grok Build chat-endpoint permission for the existing
account, then confirm completion to Advisor. Recommended owner-side command on
this remote server:

```text
grok logout
grok login --device-auth
```

If reauthentication succeeds but the same 403 remains, verify the account's
Grok Build entitlement/usage permission with xAI; do not provide or paste keys,
tokens, or credentials into Advisor chat.

## Resume Boundary

After owner confirmation, Advisor must revalidate `grok models`, the existing
`agent-office-grok/$16/%16` pane, target Git state, and absence of a new session,
then may send one exact resume launcher. No Fable5 review or promotion decision
may occur before the rework passes Advisor validation.
