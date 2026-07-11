TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing agent-office session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation
RETURN_RESULT_TO: Advisor

Read directly:

- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/16_AO_WU_21_REHEARSAL_REWORK_BRIEF.md`
- current Agent Office repo instructions
- the exact current implementation and tests
- the actual Git reproduction in the brief

Patch only the exact-path history false positive. Do not work around the
immutable evidence gate and do not weaken rewrite/removal/dirty/ancestry
rejection. Add a regression that proves two distinct message evidence paths
with similar decision files do not become one rename/copy history chain.

Run focused and full repository gates. Commit and push the Agent Office patch on
the existing branch. Write and push the Worker rework result and Advisor pointer
to foundation-docs using explicit paths only. Preserve unrelated dirty files.

Do not start a real server, create authority material, create a readiness lease,
invoke real tmux mutation, access secrets/DB/prod/live, or perform AO-WU-21.
Return an ASCII-only pointer to Advisor and STOP.
