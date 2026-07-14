# Designer Preflight Patch Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PATCH_CLASS: `ROUTINE_ADVISOR_PREFLIGHT_REQUIREMENT_ALIGNMENT`

TARGET_ACTOR: `agent-office-designer`

PATCH_BASE: `daf46e5885151acf2b430288464b137d0370efb1`

The initial Designer package is preserved as immutable evidence. Apply only the
following narrow corrections before independent review.

## Required corrections

1. In both Slack manifests, set both the app name and bot display name to the
   exact approved literal for that profile:
   - `agent-office-advisor`
   - `foundation-advisor`
2. Update the current setup runbook to use those exact literals everywhere.
   State that display names are operator-facing labels and never routing
   authority; App/channel/workspace/user IDs and the closed profile remain the
   authority inputs.
3. Add the exact app/bot display-name literals to the integration design's
   closed-profile table or adjacent fixed setup contract.
4. Remove the two accidental duplicate lines in the integration design:
   - repeated `AS1 uses the existing owner-only atomic-file...` sentence;
   - repeated `evidence verification.` line.
5. Parse both manifests with the already available local `python3` + PyYAML.
   Do not install or change a package. Record the earlier unavailable Ruby/Node
   YAML attempts and the successful Python parse honestly.

Do not change security or routing semantics, scopes, event subscriptions,
environment keys, runtime source, tests, packages, existing contracts, feature
indexes, tmux, secrets, or live Slack.

## Exact allowed files

1. `config/slack/agent-office-advisor.manifest.yaml`
2. `config/slack/foundation-advisor.manifest.yaml`
3. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
4. `docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md`
5. `artifacts/as1-multi-team-slack-pilot/DESIGNER_PATCH_01_RESULT.md`
6. `artifacts/as1-multi-team-slack-pilot/DESIGNER_PATCH_01_RESULT_POINTER.txt`

Do not rewrite or amend the prior Designer result or pointer. Use only the
existing Designer session; no agents, sub-agents, delegated contexts,
substitute actors, or new tmux sessions.

## Completion

Commit and non-force push the four corrected package files as one narrow patch.
Then commit/push the new durable patch result and pointer in protocol order.
Verify exact changed paths, YAML parse, `git diff --check`, clean status, and
upstream equality. Return the new pointer to `agent-office-advisor` and STOP.
