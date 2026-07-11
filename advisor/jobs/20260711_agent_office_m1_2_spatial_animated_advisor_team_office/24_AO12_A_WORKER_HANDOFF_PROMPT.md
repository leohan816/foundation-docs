TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: existing agent-office session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# Agent Office M1.2 Batch AO12-A Implementation

Read directly:

1. `16_LEO_GPT_CHAINED_DECISION_RECORD.md`
2. `22_DESIGN_FREEZE_AND_IMPLEMENTATION_GATE.md`
3. `23_M1_2_IMPLEMENTATION_MANIFEST.json`
4. `24_AO12_A_WORKER_BRIEF.md`
5. the five frozen canonical M1.2 documents at exact base `b7d8cdb`
6. the clean Fable5 delta result and pointer
7. Agent Office `AGENTS.md`, `CLAUDE.md`, run/result protocols
8. actual relevant M1 source/tests/baselines and current Git state

Implement only `AO12-IWU-01..04` and the exact paths in the Worker brief. Follow
the dependency order within AO12-A. Do not execute from memory or terminal prose.

Run every required check. A failing check must be fixed within the exact allowed
scope or returned as a blocker. Do not update snapshots, broaden paths, alter
M1 authority/security/delivery/auth, or begin AO12-B.

Publish the exact target commit and durable Worker result/pointer. Terminal
output must be ASCII-only. Return to Advisor and STOP.
