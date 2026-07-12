# Authentication Required

Status: `AUTHENTICATION_REQUIRED`

## Evidence

- First rework request failed before edits with HTTP `403 permission-denied` from
  `https://cli-chat-proxy.grok.com/v1/responses`.
- `grok models` still reported local `grok.com` authentication and exposed
  `grok-build`.
- One exact same-session idempotent retry was authorized and dispatched.
- The retry failed immediately with the same HTTP `403 permission-denied`.
- Leo completed `grok logout` and `grok login --device-auth`, and `grok models`
  again exposed `grok-build` for the same account.
- The same existing tmux session was restored with a live Grok process and one
  exact committed post-reauthentication launcher was dispatched.
- That post-reauthentication request failed immediately with the same HTTP
  `403 permission-denied` from the chat endpoint.
- Leo reports a newly subscribed account with usage at `0%`; this is
  owner-provided context, not independently verified quota evidence. The
  reproduced failure is therefore classified as an entitlement/endpoint
  permission blocker rather than a usage-exhaustion blocker.
- No further retry, model switch, credential inspection, key use, or permission
  change was attempted after the post-reauthentication failure.
- Candidate commit remains
  `2378b28de2975f3cf00ba9922ea2f14d7af0fd30`; required semantic rework A-1 through
  A-7 is not complete and Fable5 review has not started.

## Minimal Owner Action

Verify or restore the account's Grok Build chat-endpoint entitlement with xAI.
Reauthentication has already succeeded and did not clear the 403, so repeated
login attempts are not the next action. Do not provide or paste keys, tokens,
device codes, or credentials into Advisor chat.

## Resume Boundary

After xAI entitlement confirmation or an observed successful chat request,
Advisor must revalidate `grok models`, the existing
`agent-office-grok/$16/%16` pane, target Git state, and absence of a new session,
then may send one exact resume launcher. No Fable5 review or promotion decision
may occur before the rework passes Advisor validation.
