# Agent Office Grok Worker Pilot 001 Intake

Status: `ENTRY_VALIDATED__QUALIFICATION_PENDING`

## Mission

- Mission ID: `AGENT_OFFICE_GROK_WORKER_PILOT_001`
- Mission type: bounded low-risk implementation evaluation.
- Advisor: existing `foundation-advisor` session.
- Candidate Worker: existing `agent-office-grok/$16/@16/%16` session.
- Independent Reviewer: existing `reviewer-fable5/$5/@5/%5` session.
- Excluded session: `agent-office/$13/%13`; it must remain idle and receive no input.

## Leo/GPT Authority

Implement only `READ_ONLY_TMUX_SESSION_DISCOVERY_AND_RUNTIME_CLASSIFICATION_SLICE`,
then complete independent review and Advisor audit. Do not promote Grok, start a
larger batch, or alter Agent Office authority.

## Entry Facts

- Existing Grok process: PID `576823`, CLI `grok 0.2.93 (f00f96316d)`.
- Authentication: `grok models` reports logged in with `grok.com`.
- Exact exposed coding model: `grok-build`; official xAI documentation maps the
  current Grok Build default to Grok 4.5, while the durable runtime identity used
  for evidence remains the exact slug `grok-build`.
- Initial process effort was `high`, not the requested `medium`; Advisor must set
  and verify `medium` before qualification work is accepted.
- Main Agent Office base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`,
  upstream-equal on `shadow/agent-office-m1-2-spatial-office`.
- Main checkout contains pre-existing untracked `.grok/`, `grok-max`, and `grokx`.
  They are excluded and must remain untouched/uncommitted.
- Isolated worktree: `/home/leo/Project/agent-office-grok-pilot-001`.
- Pilot branch: `pilot/grok-tmux-runtime-classification`.
- Reviewer is idle after its prior clean `PASS`; no concurrent Reviewer job found.
- Excluded Codex Worker is idle; no concurrent Agent Office writer found.
- Foundation Docs is upstream-equal with unrelated pre-existing dirt. Only exact
  pilot, registry, ledger, result, and pointer paths may be staged.

## Rollback And Fallback

- Rollback: delete the isolated worktree and pilot branch after preserving review
  evidence; the main Agent Office branch is unchanged.
- Manual fallback: stop Advisor tmux transport and return exact prompts to Leo if
  any pane, role, model, effort, workspace, checksum, or readiness check fails.
- No destructive cleanup is authorized during the pilot.
