<GPT-5.6-Sol:Max>

========
TARGET_ACTOR: Control
TARGET_PROJECT: V3 Package 1B canonical master design
TARGET_REPO: ../foundation-control (read-only evidence workspace; no repo commit)
TARGET_SESSION_NAME: existing Control session
TARGET_SESSION: same existing Control session, never Advisor, Worker, or Reviewer session
CONTROL_MODE: CONTROL_MASTER_DESIGN_MODE
REQUIRED_SKILL: none
REGISTER_FREEZE_COMMIT: 06198f2c1a002b82874465211cd120d3503ec463
REGISTER_BLOB: c1a811457ff6929972334d663b97dc6ccbe2a8b3
REGISTER_SHA256: 8e2c74c7bf4a222780a0038f36bc496126a519f1de195b8ad08ada77d0005fa2
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design/07_CONTROL_DESIGN_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
FILE_FIRST_REPORTING: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve normal UTF-8 paths and source language
Open READ_AND_EXECUTE directly and perform only the CONTROL_MASTER_DESIGN_MODE candidate-authoring pass.
Verify the frozen question register, read actual canonical files and code, answer Q-01 through Q-29, and write only the four candidate docs plus Control result and pointer named in the handoff.
Do not modify any runtime repo, schema, API, migration, test, frozen register, active canonical index/register/ledger/roadmap, or existing decision artifact.
Do not access DB, secrets, env values, customer data, production/live, or external models. Do not invoke Workers or Reviewers. Do not start implementation.
Commit and push only the six permitted foundation-docs files, return the ASCII-only pointer to Advisor, and STOP.
========
