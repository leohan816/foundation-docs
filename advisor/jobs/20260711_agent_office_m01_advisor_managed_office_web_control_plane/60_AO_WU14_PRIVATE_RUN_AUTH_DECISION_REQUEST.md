# AO-WU-14 Private-Run Authentication Decision Request

```text
TARGET_ACTOR: Leo/GPT
MISSION: AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE
REQUEST_ID: AO-WU-14-PRIVATE-RUN-AUTH-POSTURE
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
READ_DECISION_REQUEST: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/60_AO_WU14_PRIVATE_RUN_AUTH_DECISION_REQUEST.md

CONFIRMED_FACTS:
- Agent Office code and seven canonical documents are at reviewed HEAD abff45c on origin/shadow/agent-office-m01.
- Fable5 final design delta review is PASS.
- Fable5 final implementation delta review is PASS.
- The app is loopback-only and fail-closed by default.
- The production composition intentionally has no real authentication provider or credential.
- Without an approved provider the UI is AUTH_BLOCKED / READ_ONLY and real Advisor delivery is unavailable.
- Guarded synthetic tests prove authenticated session behavior and a fixed Advisor lifecycle without touching a real secret or real tmux input.
- No DB, public exposure, production/live access, real secret, or Hermes implementation occurred.

UNKNOWN:
- Whether M01 should close on the reviewed fail-closed implementation boundary, or remain open until a separately approved LocalBootstrap credential and private-run verification are completed.

QUESTION:
Choose the M01 closure posture.

OPTION_A:
ACCEPT_REVIEWED_FAILCLOSED_M01_AND_DEFER_REAL_PRIVATE_RUN
- Close M01 as an implementation/design milestone.
- Record OFFICE_WEB_APP as IMPLEMENTED_REVIEWED_NOT_OPERATIONALLY_ACTIVATED.
- Keep real auth, real Advisor delivery, and private-run evidence as a separately approved future security/operations mission.
- Do not claim RUNNING_PRIVATE or ADVISOR_COMMUNICATION_ACTIVE.

OPTION_B:
KEEP_M01_OPEN_AND_AUTHORIZE_SEPARATE_LOCALBOOTSTRAP_PRIVATE_RUN_GATE
- Keep AO-WU-14 open.
- Open a narrowly scoped security/operations mission for LocalBootstrap credential lifecycle, owner-only injection, loopback authenticated private run, desktop/mobile/PWA verification, restart/revocation evidence, and post-run Fable5 review.
- Real tmux delivery remains a distinct default-off gate unless separately authorized.
- No public/Tailscale/remote-host/production exposure is included.

ADVISOR_RECOMMENDATION:
OPTION_B. Security and truthful operational status matter more than nominal closure. The additional mission should activate only LocalBootstrap authentication for a loopback private run and should keep real tmux delivery default-off until separately approved.

SAFE_DEFAULT:
Keep AUTH_BLOCKED / READ_ONLY, manual fallback, no real credential, no real tmux delivery, and no public exposure.

BLOCKED_CAPABILITY:
AO-WU-14 real authenticated private-run verification and final AGENT_OFFICE_M01_COMPLETE claim.

RETURN_RESULT_TO: Advisor
DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY: true
```
