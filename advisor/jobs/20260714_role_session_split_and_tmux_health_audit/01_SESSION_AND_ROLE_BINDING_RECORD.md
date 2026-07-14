# Session and Role Binding Record

## Live Locators

| Role | Session | Locator | Workspace | Runtime |
|---|---|---|---|---|
| Agent Office Advisor | `agent-office-advisor` | `$9/@9/%9` | `/home/leo/Project/agent-office-advisor` | existing Codex context; live status GPT-5.6 SOL xhigh |
| Foundation Advisor | `foundation-advisor` | `$22/@22/%22` | `/home/leo/Project/foundation-advisor` | Codex v0.144.3; GPT-5.6 SOL max |
| Foundation Designer | `foundation-designer` | `$23/@23/%23` | `/home/leo/Project/foundation-designer` | Codex v0.144.3; GPT-5.6 SOL max; Ultra only by documented escalation |
| Agent Office SOL Reviewer | `agent-office-reviewer-sol` | `$20/@20/%20` | `/home/leo/Project/agent-office-reviewer` | existing Codex reviewer context; live status GPT-5.6 SOL xhigh |
| Foundation Reviewer | `foundation-reviewer-fable5` | `$5/@5/%5` | `/home/leo/Project/foundation-control` | Claude; live pane shows Opus 4.8 Max, not Fable5 |
| Foundation Control | `foundation-control` | `$4/@4/%4` | `/home/leo/Project/foundation-control` | Claude; live pane shows Opus 4.8 xhigh |

## Ownership

- `agent-office-advisor` owns Agent Office mission orchestration.
- `agent-office-reviewer-sol` returns independent Agent Office reviews to
  `agent-office-advisor`.
- `foundation-advisor` owns Foundation Team mission orchestration.
- `foundation-control`, `foundation`, `cosmile`, `siasiu`,
  `foundation-designer`, and `foundation-reviewer-fable5` route authorized
  results to `foundation-advisor`.
- Reviewer independence remains intact; reporting does not permit verdict edits.
- Foundation Control is excluded from Agent Office work.

## Workspace Isolation

The existing Advisor and SOL Reviewer directories were moved with their live
processes to dedicated Agent Office paths. New Foundation workspaces are
separate. No active context was restarted or replaced.

## Exact Delivery Hold

`AGENT_OFFICE_EXACT_DELIVERY: HOLD__LOCATOR_REBIND_REQUIRED`

Do not reuse historical activation artifacts, authority leases, or inbox
exceptions. A future rebind must update the closed code/config/document
contract, receive independent implementation/security review, and rehearse with
fresh one-use authority.
