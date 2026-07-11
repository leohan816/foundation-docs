# Fable5 Level-3 Design Review Handoff - Exact Advisor Delivery

TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing independent `reviewer-fable5` session, never Advisor or Worker
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation`
DO_NOT_PASTE_INTO: Advisor session or Agent Office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Review identity

- Mission: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION`
- Pass: `DESIGN_REVIEW__AGENT_OFFICE_EXACT_ADVISOR_DELIVERY`
- Level: `LEVEL_3`
- Required skill: `/fable-sentinel`
- Model/effort: `Fable5 Max`
- Reviewed target commit: `d1708809467c6e97302c336c50aca7ffd4b355e5`
- Reviewed base commit: `9c403da5662aeedc28a8c677c37a134aaa44dce3`
- Target branch: `shadow/agent-office-m01`

## Direct reads

Read the actual files and diffs. Do not trust the Worker report as proof.

1. `../agent-office/AGENTS.md`
2. `../agent-office/CLAUDE.md`
3. `../agent-office/docs/architecture/AGENT_OFFICE_EXACT_ADVISOR_DELIVERY_BRIDGE_DESIGN.md`
4. Every other Agent Office file changed by `9c403da..d170880`
5. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/00_INTAKE.md`
6. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/01_ADVISOR_BRIEF.md`
7. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/02_DELIVERY_DESIGN_QUESTION_REGISTER.md`
8. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/03_FABLE5_DESIGN_REVIEW_BRIEF.md`
9. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/WORKER_DESIGN_RESULT.md`
10. Actual referenced source, tests, V2 role authority, tmux transport authority, registry, kill-switch, activation, and M01 manifest evidence.

## Required review

Verify explicitly:

1. DQ-01 through DQ-08 are all resolved from evidence without new authority or product policy.
2. The exact destination is fixed to the existing Foundation Advisor role session and cannot be browser-selected or generalized.
3. Only an immutable exact pointer is transported; browser content cannot become a command, target, key, path, or executable argument.
4. No shell interpolation, wildcard, broadcast, synchronized-pane, arbitrary terminal, Worker, or Reviewer dispatch exists.
5. Durable idempotency and crash boundaries prevent blind resend, including every state at or after paste start.
6. Delivery receipt, Advisor ACK, canonical intake, decision, and resume are distinct evidence stages.
7. Advisor evidence ingress is closed-schema, Git/blob/hash/ancestry verified, and cannot elevate routine Advisor authority into material Leo/GPT authority.
8. Kill switch, local disable latch, expiry, restart, stale registry, failed preflight, and ambiguity fail closed to manual fallback without auto-enable.
9. LocalBootstrap remains exact IPv4 loopback only; remote, public, Tailscale, SSH-forwarded, production, DB, Hermes, and multi-user scope remain absent.
10. The registry window-ID refresh and narrow Advisor inbox-read instruction/reload are explicit prerequisites, not hidden implementation assumptions.
11. The nine Leo/GPT success criteria map to implementation, tests, review, and actual rehearsal proof.
12. The rehearsal is synthetic and non-sensitive, uses only the fixed Advisor pane, proves duplicate non-delivery and cleanup, and does not authorize operational use.
13. The design is precise enough for implementation without requiring the Worker to invent security or product policy.
14. The docs-only commit did not hide runtime/config/test/capability/tmux changes or weaken unrelated safety instructions.

Reproduce relevant documentation checks and inspect current Git/upstream state. Do not start a server, create credentials/capabilities/readiness leases, send tmux input, modify Agent Office, or perform the rehearsal.

## Verdict contract

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` returns to Leo/GPT and never auto-advances. `NEEDS_PATCH` must identify exact patchable findings and fixed re-review questions. A design PASS does not approve implementation or delivery.

## Result publication

Write only:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/FABLE5_DELIVERY_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/12_FABLE5_DELIVERY_DESIGN_REVIEW_RESULT_POINTER.md`

Commit and push only those two files to `foundation-docs`. Keep terminal output ASCII-only. Return the exact pointer to Advisor and STOP.
