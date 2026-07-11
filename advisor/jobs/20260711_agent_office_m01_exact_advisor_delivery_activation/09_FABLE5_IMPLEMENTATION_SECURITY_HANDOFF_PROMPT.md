# Fable5 Level-3 Implementation and Security Review - Exact Advisor Delivery

TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing independent `reviewer-fable5` session, never Advisor or Worker
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation`
DO_NOT_PASTE_INTO: Advisor or Agent Office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Review identity

- Mission: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION`
- WorkUnit: `AO-WU-20`
- Pass: `IMPLEMENTATION_SECURITY_REVIEW__AGENT_OFFICE_EXACT_ADVISOR_DELIVERY`
- Level: `LEVEL_3`
- Required skill: `/fable-sentinel`
- Model/effort: `Fable5 Max`
- Reviewed design commit: `d1708809467c6e97302c336c50aca7ffd4b355e5`
- Reviewed implementation commit: `889a29b3e75da086a32ac76909a0ce9f4848ddfa`
- Target branch: `shadow/agent-office-m01`

## Direct evidence reads

Read the actual current files and full `d170880..889a29b` diff. Do not trust the
Worker report as proof. Read:

1. all active Agent Office instructions and canonical design documents;
2. every changed source, test, config, script, and documentation file;
3. this job's intake, Advisor brief, DQ register, reviewed design, design result,
   design PASS, implementation handoff, Advisor prerequisite record, SIASIU naming
   correction, Worker implementation result, and pointers;
4. current V2 role authority, transport protocol/activation/registry/kill state,
   parent manifest v5, and exact Option A decision evidence;
5. actual Agent Office and foundation-docs Git/upstream/dirty state.

## Mandatory review coverage

Independently verify at least:

1. Code conforms to the reviewed design; classify every divergence as
   `CODE_DEFECT`, `DESIGN_DEFECT`, `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or
   `NEEDS_LEO_GPT_DECISION`.
2. Production defaults remain manual/read-only. Existing v1/v2 compatibility is
   preserved and v3/v2 exact selection is closed-schema, owner/mode/no-follow,
   loopback-only, and two-key matched.
3. Production cannot accept caller-injected capability/delivery ports; synthetic
   test seams are unmistakable and uncallable from production/browser paths.
4. All eight authority snapshots, exact Git blob/hash/ancestry/current-path/dirty
   state, active transport, kill, fixed registry, Option A, and manifest facts are
   validated before capability minting and revalidated immediately before input.
5. Readiness lease is committed/pushed, bounded, one-use, destination/message-bound,
   expiry checked, and durably consumed across restart.
6. Pointer artifact bytes and path are immutable, owner-only, no-follow,
   containment-safe, and contain no body/command/target/executable/secret authority.
7. The mutation runner exposes only closed `/usr/bin/tmux` operations, exact `%9`,
   fixed argv, `shell:false`, and no general command, eval, interpolation, wildcard,
   broadcast, sync, capture, session creation, Worker, or Reviewer route.
8. The journal is canonical, fsynced, hash-chained, closed-schema, corruption-
   quarantining, and authoritative for idempotency. Reproduce every phase, restart,
   concurrency, changed-content, and no-blind-resend rule from `PASTE_STARTED` on.
9. Delivery control is default-disabled, grant-bound, durable, tamper-evident,
   latched on every required failure, restart-safe, and cannot auto-enable or
   re-enable under activation v1.
10. ACK/intake/decision/resume ingress derives only fixed paths, verifies exact Git
    evidence and ordering, freezes accepted refs, rejects rewrite/removal/reorder/
    dirty/non-ancestor/forgery, and appends no transition on failure.
11. Routine Advisor authority is exactly bounded to already-authorized READY,
    dependency-complete, non-final WorkUnits; material/new-scope/risk/final authority
    remains Leo/GPT-only through immutable governing evidence.
12. Delivery receipt, ACK, intake, decision, and resume remain separate across
    events, restart replay, projection, and UI. No stage is inferred.
13. Legacy durable events and legacy SIASIU IDs replay safely without weakening new
    strict inputs; all current UI/output/new actor data use `SIASIU Worker` / `siasiu`
    and never render the legacy name.
14. UI/projection expose only bounded state/evidence and no message body, absolute
    root, capability, proof, tmux target/control, secret, or false completion.
15. Browser routes cannot select panes, dispatch to Worker/Reviewer, issue terminal
    commands, enable delivery, upload authority, or bypass LocalBootstrap/CSRF/rate
    and idempotency controls.
16. Hermes remains disabled and uncomposed; DB, multi-user, remote/public/Tailscale/
    SSH-forwarded/prod/live and M1.2 remain absent.
17. P-A registry exact window IDs and P-B narrow Advisor inbox-read instruction are
    precise, reload-evidenced, non-broadening, and consistent with code/design.
18. Disabled example/runbook contains no usable grant, snapshot hashes, lease,
    capability, proof, credential, or enabled descriptor.
19. Reproduce focused and full test/lint/typecheck/build/browser/smoke/audit evidence.
    Inspect generated artifacts and ensure cleanup. Tests must not touch a real pane.
20. Source/diff/OS evidence supports the Worker claim that no real server, actual
    tmux invocation/input, activation material, credential, state root, DB, remote,
    public, prod, or live action occurred.
21. The implementation is precise and safe enough for AO-WU-21 synthetic rehearsal,
    but this review itself must not perform or authorize that rehearsal.

Do not modify Agent Office, patch code/docs, create authority material or a
credential, start a real server, call the real tmux mutation runner, send tmux
input, or perform AO-WU-21. Reviewer test runs may use only repository-defined
synthetic adapters and disposable loopback fixtures.

## Verdict

Return exactly one: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

- `PASS_WITH_RISK`: return to Leo/GPT; never auto-advance.
- `NEEDS_PATCH`: list exact findings, affected files/lines, required patch scope,
  and fixed same-session re-review questions.
- `FAIL`: STOP.
- `PASS`: closes AO-WU-20 only; AO-WU-21 remains separately Advisor-owned.

## Result publication

Write only:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/FABLE5_DELIVERY_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/14_FABLE5_DELIVERY_IMPLEMENTATION_SECURITY_REVIEW_RESULT_POINTER.md`

Commit and push only those two files to foundation-docs. Keep terminal output
ASCII-only. Return the exact pointer to Advisor and STOP.
