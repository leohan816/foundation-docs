# SOL Sentinel Review Brief - Batch A

Status: `WAITING_FOR_ADVISOR_ACCEPTED_WORKER_CANDIDATE`

## REVIEWER ROUTING DECISION

- Target actor: Sentinel
- Selected reviewer: Codex GPT-5.6 SOL Sentinel
- Target session: `foundation-reviewer-sol`
- Required contract: independent Sentinel behavior; read-only candidate review
- Reason: Batch A is a substantial UI/application-shell integration with local
  security and accessibility regression risk, but no authorized Level 3 DB,
  PII, payment, production, or authority expansion.
- Not selected: Fable5-lineage reviewer retained as capacity/fallback or
  additional narrow visual cross-check; old `agent-office-sol` is excluded.
- Review level: Level 2 comprehensive implementation/security/accessibility/visual
- Effort: xhigh by default; Max only if an actual Level 3 issue appears.
- Return result to: Advisor
- Status: `WAIT_FOR_WORKER_RESULT`

The exact review handoff will require direct base/candidate diff inspection,
focused and complete test reproduction, visual inspection, Worker report
accuracy checks, local run evidence, scope/authority preservation, and one of:
`PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

