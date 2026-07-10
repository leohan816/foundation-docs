# Role Protocol Reload Instructions

Status: `ACTIVE_AFTER_FABLE5_DUAL_PASS`

These instructions reload existing actor sessions only. Do not create a new
session, sub-agent, substitute actor, or implementation/review task.

## Common Procedure

1. Confirm the launcher names your current actor and workspace.
2. Directly read every entry/reference file listed by the launcher.
3. Directly read the canonical V2 protocol:
   `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`.
4. Confirm its status is `ACTIVE_CANONICAL_V2`.
5. Do not edit files, execute implementation, review prior work, commit, push, or
   broaden scope.
6. Return only this short confirmation to Advisor:

```text
ROLE_PROTOCOL_RELOADED
ACTOR: <actor from launcher>
WORKSPACE: <workspace from launcher>
ENTRY_FILES_READ: <exact paths>
CANONICAL_FILE_READ: ../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md
CANONICAL_STATUS: ACTIVE_CANONICAL_V2
ROLE_SUMMARY: <one sentence>
FORBIDDEN_SUMMARY: <one sentence>
RETURN_TO: Advisor
```

## STOP Conditions

STOP and report to Advisor if:

- the actor/session/workspace does not match the launcher;
- any listed file is absent or unreadable;
- canonical status is not `ACTIVE_CANONICAL_V2`;
- an active instruction conflicts with canonical V2;
- reload would require an edit, new session, implementation, review, commit, push,
  DB/query/migration, flag change, main merge, production/live, or secret access.

