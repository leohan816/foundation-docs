# Agent Office Worker Implementation Handoff - Exact Advisor Delivery

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation`
DO_NOT_PASTE_INTO: Advisor or Fable5 Reviewer session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Identity and authority

- Mission: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION`
- WorkUnit: `AO-WU-19`
- Mode: implementation and tests under the reviewed design only
- Model/effort: `Codex 5.6 Sol Ultra`
- Target repo: `../agent-office`
- Target branch: `shadow/agent-office-m01`
- Required starting commit: `d1708809467c6e97302c336c50aca7ffd4b355e5`
- Design review: Fable5 Level-3 `PASS`, foundation-docs commit `62973c4`
- Implementation authorization: Leo/GPT Option A, exact scope only

## Direct reads

Read directly, not from memory:

1. all active Agent Office repo instructions;
2. `docs/architecture/AGENT_OFFICE_EXACT_ADVISOR_DELIVERY_BRIDGE_DESIGN.md`;
3. all canonical Agent Office design documents and `docs/FEATURE_INDEX.md`;
4. the complete current source and tests for Advisor Inbox, tmux gateway,
   runtime composition/config, operational delivery control, observations,
   authority verification, projection, UI communication, and runbooks;
5. this job's `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`, frozen DQ register,
   Worker design result, and Fable5 design review result;
6. `08_ADVISOR_PREREQUISITE_RECORD.md` and the exact current registry/instruction
   evidence it names.

## Exact implementation

Implement the reviewed design without inventing policy. At minimum:

1. Closed trusted configuration and activation registration with existing-version
   backward compatibility and strict loopback/owner/mode/no-follow checks.
2. Internal production composition that can mint only a notification-bound,
   one-use in-memory capability after every Git snapshot, registry, kill-switch,
   lease, and live preflight check succeeds. Remove or isolate arbitrary production
   capability/port injection; synthetic test composition may remain explicit.
3. Owner-only immutable pointer artifact and exact fixed-argv tmux delivery port:
   file-backed buffer load, paste to only `%9`, buffer deletion, and one exact Enter.
   No shell, interpolation, wildcard, broadcast, synchronized panes, pane selector,
   general process runner, or browser-controlled transport field.
4. Durable fsynced transport journal and authoritative receipt lookup implementing
   request/hash idempotency, success replay, and no blind resend at every ambiguous
   crash boundary from `PASTE_STARTED` onward.
5. Closed-schema Git/blob/hash/ancestry verified Advisor evidence ingress for ACK,
   intake, bounded decision, and resume. Preserve exact stage ordering and authority
   separation; delivery is not ACK and ACK is not intake/decision/resume.
6. Durable default-disabled delivery control, local disable latch, expiry/restart/
   stale/preflight/ambiguity fail-closed behavior, and no automatic re-enable.
7. Honest projection/UI states for activation, transport, ACK, intake, decision,
   and resume without exposing message bodies, sensitive paths, tmux controls, or
   unverified completion.
8. Disabled example configuration and runbooks only. Do not commit a live activation
   grant, readiness lease, capability, credential, proof, state root, or enabled
   delivery descriptor.
9. Update canonical design/traceability documentation as-built. Do not rewrite
   design to excuse a code defect; classify any unavoidable divergence explicitly.
10. Apply the approved SIASIU nomenclature correction from
    `08_SIASIU_NOMENCLATURE_CORRECTION.md`: all user-visible labels and new
    canonical actor data use `SIASIU` / `SIASIU Worker` / `siasiu`. If existing
    persisted Agent Office evidence uses internal ID `shashu`, accept it only as a
    backward-compatible input alias, normalize it to `siasiu`, never render the
    legacy name, and do not rewrite historical evidence.

## Required tests

Implement and run focused plus full relevant tests covering all design section 14
cases, including:

- schema/version/mode/owner/symlink/path/hash/ancestry validation;
- exact destination and immediate preflight mismatches;
- no shell/interpolation/wildcard/broadcast/sync/Worker/Reviewer route;
- pointer immutability and exact buffer argv/order;
- concurrent duplicates and every journal crash boundary;
- no resend after paste-start ambiguity and durable success replay;
- forged/reordered/rewritten/removed ACK/intake/decision/resume evidence;
- routine Advisor versus Leo/GPT authority separation;
- kill/latch/restart/expiry/no-auto-enable/manual fallback;
- loopback-only production composition and absence of browser transport controls;
- projection, responsive/PWA regressions, and existing M01 behavior.

Run lint, typecheck, build, full unit/integration/acceptance suites, and relevant
Playwright/browser suites. Record exact commands and exit evidence. Tests may use
synthetic adapters and temporary roots only; they must not send input to any real
tmux pane.

## Forbidden during AO-WU-19

- actual tmux input or actual Agent Office-to-Advisor delivery;
- server private run or AO-WU-21 rehearsal;
- real credential, proof, readiness lease, capability, activation descriptor, or
  enabled operational config;
- browser-selected destinations, Worker/Reviewer routes, arbitrary commands;
- DB, remote/public/Tailscale/SSH-forwarded/prod/live access;
- Hermes, multi-user auth, M1.2, another product mission;
- new session/agent/sub-agent/delegated context;
- foundation-advisor or transport-registry edits (Advisor already owns P-A/P-B);
- self-review, risk acceptance, final approval, force push, main merge, unrelated
  staging.

## Completion and publication

Commit and non-force push the scoped Agent Office implementation to
`origin/shadow/agent-office-m01`. Publish:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/WORKER_IMPLEMENTATION_RESULT.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/13_WORKER_IMPLEMENTATION_RESULT_POINTER.md`

The result must list exact files, design-to-code/test traceability, test/build
evidence, commits/push/upstream state, exclusions, remaining prerequisites, and
proof that no real delivery/capability/credential/server/tmux input occurred.
Return the ASCII-only pointer to Advisor and STOP.
