# Session and Role Binding Record

## Live Locators

| Role | Session | Locator | Workspace | Runtime |
|---|---|---|---|---|
| Agent Office Advisor | `agent-office-advisor` | `$9/@9/%9` | `/home/leo/Project/agent-office` | GPT-5.6 SOL xhigh baseline |
| Agent Office Reviewer | `agent-office-reviewer` | `$20/@20/%20` | `/home/leo/Project/agent-office` | GPT-5.6 SOL xhigh baseline; read-only by default |
| Agent Office Designer | `agent-office-designer` | `$24/@24/%24` | `/home/leo/Project/agent-office` | GPT-5.6 SOL max baseline; idle, no mission |
| Foundation Advisor | `foundation-advisor` | `$22/@22/%22` | `/home/leo/Project/FOUNDATION` | GPT-5.6 SOL max baseline |
| Foundation Designer | `foundation-designer` | `$23/@23/%23` | `/home/leo/Project/FOUNDATION` when idle; exact active project/worktree when dispatched | GPT-5.6 SOL max baseline; Ultra only by documented escalation |
| Foundation Reviewer | `foundation-reviewer-fable5` | `$5/@5/%5` | `/home/leo/Project/foundation-control` | Claude; live pane shows Opus 4.8 Max, not Fable5 |
| Foundation Control | `foundation-control` | `$4/@4/%4` | `/home/leo/Project/foundation-control` | Claude; live pane shows Opus 4.8 xhigh |

## Ownership

- `agent-office-advisor` owns Agent Office mission orchestration.
- `agent-office-reviewer` returns independent Agent Office reviews to
  `agent-office-advisor`.
- `foundation-advisor` owns Foundation Team mission orchestration.
- `foundation-control`, `foundation`, `cosmile`, `siasiu`,
  `foundation-designer`, and `foundation-reviewer-fable5` route authorized
  results to `foundation-advisor`.
- Reviewer independence remains intact; reporting does not permit verdict edits.
- Foundation Control is excluded from Agent Office work.

## Workspace Model

Role identity is registry state and runtime identity is tmux state. No role owns
a project directory. Agent Office roles share the canonical Agent Office
repository, while Foundation roles use the canonical Foundation-family target
repository or an authorized temporary worktree. Role instructions are stored in
`foundation-docs/advisor/_system/roles/`.

## Exact Delivery Hold

`AGENT_OFFICE_EXACT_DELIVERY: HOLD__LOCATOR_REBIND_REQUIRED`

Do not reuse historical activation artifacts, authority leases, or inbox
exceptions. A future rebind must update the closed code/config/document
contract, receive independent implementation/security review, and rehearse with
fresh one-use authority.
