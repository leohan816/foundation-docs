# Fable5 Agent Office M01 Final Dual Review Handoff

TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: existing independent `reviewer-fable5` session, never Advisor or Worker
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane`
DO_NOT_PASTE_INTO: Advisor session or Agent Office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Assignment

Perform two independent Level 3 review passes in this same existing Reviewer
session. Keep separate artifacts and separate verdicts:

1. `DESIGN_REVIEW__AGENT_OFFICE_M01_FINAL_AS_BUILT`
2. `IMPLEMENTATION_REVIEW__AGENT_OFFICE_M01_FINAL`

Model/effort: `<Fable5:Max>`

Required skill: `/fable-sentinel`

Do not trust the Worker or Advisor conclusions. Read actual source, tests,
canonical documents, commits, diffs, and Git/upstream state directly.

## Exact inputs

- target repo: `/home/leo/Project/agent-office`
- target branch: `shadow/agent-office-m01`
- implementation commit: `e0a11f69fffc9d35d67cc478cbefbb92d93cf528`
- as-built docs/final target: `72c24fe064247c1afe20ff00a5c85ea955cda5cd`
- full Worker result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_FINAL_IMPLEMENTATION_RESULT.md`
- Advisor pre-review validation:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/41_ADVISOR_BATCH_E_PRE_REVIEW_VALIDATION.md`
- mission intake, entry gate, unknown gate, manifest, original design brief,
  design addendum, prior design review, delta review, and Batch A-D validations
  in the same Advisor job folder;
- all seven canonical files in Agent Office:
  - `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`
  - `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
  - `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`
  - `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
  - `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
  - `docs/operations/AGENT_OFFICE_OPERATIONS_RECOVERY.md`
  - `docs/FEATURE_INDEX.md`

## Design review requirements

Verify the exact canonical documents against the approved mission and actual
implementation. At minimum cover:

- purpose, non-goals, and authority boundaries;
- Initiative/Package/Mission/Phase/WorkUnit counting and scope-change rules;
- actor, mission, blocker, alert, decision, communication, and activity states;
- evidence-backed completion and no terminal-prose inference;
- Advisor-only browser communication and no direct Worker/Reviewer dispatch;
- tmux/Hermes boundary and no browser duplication of transport authority;
- multi-project, multi-host, Linux, and Mac additive extension boundaries;
- authentication, CSRF, sessions, audit, rate limits, kill switch, fallback;
- UI/animation mapping only from accepted structured events;
- crash/restart/stale/corruption/backup/restore/rollback behavior;
- exact as-built requirement-to-code-to-test-to-evidence traceability;
- visible unknowns, limitations, and deferred gates;
- no silent rewrite of design to excuse code defects.

## Implementation review requirements

Inspect all material code and tests from the bootstrap through final target,
with focused review of the Batch E delta and the complete integrated product.
Re-run representative tests and direct reproductions where needed. Explicitly
verify:

1. exact loopback bind, peer, Host, proxy, Origin/Referer, Fetch Metadata,
   content type, UTF-8/JSON, size, timeout, and rate boundaries;
2. session expiry/revocation/rotation, capability separation, CSRF, and test-only
   provider fail-closed behavior;
3. no browser terminal, shell, generic command, tmux-pane, Worker, or Reviewer
   dispatch surface;
4. static path containment, headers, PWA caching, offline behavior, SSE privacy,
   cursor/reset, and session revocation;
5. event/artifact durability, idempotency, audit redaction, backup completeness,
   isolated restore, compatibility, delivery disable, and recovery proof;
6. desktop/mobile/reduced-motion rendering, accessibility, stable dimensions,
   Korean labels, and no incoherent overlap;
7. actual executable/composition path from server to live projection to browser;
8. actual operational path for Leo input -> immutable artifact -> Advisor
   acknowledgement/intake/decision -> verified resumption;
9. project/Advisor isolation and additive multi-project expansion without shared
   mutable authority or cross-project dispatch;
10. exact Git scope, commits, pushes, clean state, and no hidden forbidden work.

## Mandatory open-finding disposition

Independently reproduce and classify both findings in
`41_ADVISOR_BATCH_E_PRE_REVIEW_VALIDATION.md`:

- `AO-E-R1`: production browser composition is fixture-only and no executable
  integrated private runtime is present;
- `AO-E-R2`: HTTP `authorityRole` is parsed but dropped before durable decision
  linkage.

For every divergence use exactly one classification:

- `CODE_DEFECT`
- `DESIGN_DEFECT`
- `DOCUMENTATION_STALE`
- `DEFERRED_WITH_GATE`
- `NEEDS_LEO_GPT_DECISION`

Do not accept an operational capability merely because an interface or fixture
exists. Do not require a real secret/provider or weaken authentication without
returning a Leo/GPT decision need.

## Verdicts and outputs

Each pass uses:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Write separate result artifacts:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_IMPLEMENTATION_REVIEW_RESULT.md`

Write one pointer:

- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/43_FABLE5_FINAL_DUAL_REVIEW_RESULT_POINTER.md`

The result must list reviewed artifacts, files/diffs, tests/reproductions,
excluded scope, conflicts, unresolved risks, and verdict rationale.

Rules:

- no patch, implementation, runtime commit, or target push;
- no new session, agent, sub-agent, delegated context, or temporary session;
- no DB, secret, production/live, public/private-network exposure, or real tmux
  input;
- no final approval;
- `PASS_WITH_RISK` returns to Leo/GPT through Advisor;
- `NEEDS_PATCH` returns to Advisor for the same Worker and same Reviewer delta
  loop;
- design PASS does not imply implementation PASS;
- implementation PASS does not activate a real provider or external access.

Commit and push only the two review results and one pointer in
`foundation-docs`, then return the pointer to Advisor and STOP.
