# Advisor Final Rework Delta Consolidation

- Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Review commit: `d0e9e80`
- Design verdict: `NEEDS_PATCH`
- Implementation verdict: `NEEDS_PATCH`
- Next actor: same existing Agent Office Worker
- Implementation status: not accepted
- Final approval: not granted

## Accepted Review Disposition

Advisor accepts the same Fable5 Reviewer's direct findings:

- AO-E-R2 is closed.
- The original AO-E-R1 wording is closed, but AO-E-R3 supersedes it.
- R3.1-R3.8 are seven patchable runtime-composition defects.
- R3.9 is a required canonical as-built documentation correction.
- The real LocalBootstrap authentication/secret-handling decision remains a separate `NEEDS_LEO_GPT_DECISION` gate and must not be used to hide patchable defects.

The M01 final state is not achieved while the executable composition uses a stale fixture, lacks structured observation imports, presents unverified state as current, suppresses alerts and the office scene, and selects the disabled Hermes stub.

## In-Scope Rework Boundary

The Worker may modify Agent Office runtime/config/tests and the seven canonical Agent Office documents only to close R3.1-R3.9. The Worker must preserve the reviewed domain, security, event, state-machine, recovery, PWA, and browser authority boundaries.

The rework must remain transport-neutral at the application boundary and multi-project safe. It must not hard-code the current project as a permanent singleton architecture.

## Deferred Authority Boundary

The following remain forbidden and are not prerequisites for this patch:

- creating or reading a real authentication secret;
- enabling a LocalBootstrap provider;
- sending through real tmux without an externally approved capability and delivery port;
- exposing the server beyond loopback;
- DB, production, live, or customer data access;
- browser direct Worker/Reviewer/terminal dispatch;
- implementing Hermes;
- starting another mission.

The runtime must fail closed or show manual fallback when these external authorities are absent. The code and tests must nevertheless prove that approved ports can be injected and that the operational projection is not permanently wired to disabled stubs or stale fixtures.

## Required Verification

After the patch, Advisor and the same Fable5 Reviewer must be able to reproduce:

1. no production hard-coded fixture manifest fallback;
2. exact external manifest/source evidence validation;
3. read-only structured observation import with freshness and isolation;
4. no unsupported `CURRENT` state;
5. durable alerts rendered in the communication center;
6. live office scene driven only by structured evidence;
7. injected Advisor gateway with manual-fallback behavior when authority is absent;
8. an end-to-end composed test covering browser message, immutable pointer receipt, acknowledgement/intake/decision, and resumption through a deterministic approved test port;
9. honest canonical as-built documentation;
10. all existing security, recovery, PWA, visual, and authority tests remain green.

## Advisor Verdict

`ROUTE_SAME_WORKER_R3_IN_SCOPE_REWORK`
