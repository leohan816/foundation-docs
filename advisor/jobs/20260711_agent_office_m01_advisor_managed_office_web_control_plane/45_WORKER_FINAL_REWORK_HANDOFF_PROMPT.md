# Agent Office M01 Final Rework Handoff

TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing `agent-office` Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane`
DO_NOT_PASTE_INTO: Advisor session or Fable5 Reviewer session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Assignment

Patch only the two independently reproduced final-review defects and their
as-built documentation. Work in the same existing Agent Office Worker session.

Model/effort: `<Codex 5.6 Sol:Ultra>`

Target repo: `/home/leo/Project/agent-office`

Target branch: `shadow/agent-office-m01`

Required base: `72c24fe064247c1afe20ff00a5c85ea955cda5cd`

Read directly:

- `41_ADVISOR_BATCH_E_PRE_REVIEW_VALIDATION.md`
- `44_ADVISOR_FINAL_DUAL_REVIEW_CONSOLIDATION.md`
- both Fable5 final review artifacts referenced by
  `43_FABLE5_FINAL_DUAL_REVIEW_RESULT_POINTER.md`
- the original mission, manifest, addendum, all seven canonical documents,
  active Agent Office instructions, and actual current code/tests.

Do not execute from memory and do not trust summaries in place of source.

## Rework R1: executable fail-closed private composition

Implement the actual integrated path without creating or using a real secret:

1. Add an executable composition root and exact package script that combines:
   - the reviewed loopback-only Node HTTP/static server;
   - the local state/event/artifact/projection application;
   - the built dashboard shell;
   - status/readiness and shutdown cleanup;
   - explicit config and state-root validation.
2. The default executable must:
   - bind loopback only;
   - use no real provider or credential;
   - start visibly `AUTH_BLOCKED` and mutation-disabled;
   - expose only the reviewed redacted liveness/readiness/status surfaces to an
     unauthenticated request;
   - keep projection, SSE, Advisor messages, acknowledgement, intake, decision,
     alert acknowledgement, and delivery controls authenticated/capability
     gated;
   - never fall back to `NoAuth` or localhost-as-identity.
3. Replace the production browser default fixture composition with a typed
   runtime client that:
   - reads the redacted status endpoint;
   - uses authenticated session context when one exists;
   - fetches the current projection;
   - subscribes to SSE with cursor/reconnect/reset handling;
   - supplies the Advisor message action port only when capability and CSRF
     evidence permit it;
   - shows exact fail-closed states when auth/projection/SSE are unavailable;
   - never dispatches to a Worker/Reviewer or exposes terminal/session targeting.
4. Keep synthetic fixtures available only through an explicit test/demo import
   or build mode that is visibly labeled and cannot become the production
   default silently.
5. Add an authenticated synthetic composition test harness guarded by the
   existing test-only provider conditions. Do not create a production test-auth
   switch or expose a synthetic proof route in a production build.
6. Add tests that prove at minimum:
   - production composition starts and serves the built shell on loopback;
   - no-provider default is `AUTH_BLOCKED`, mutation disabled, and protected
     projection/message routes fail closed;
   - authenticated synthetic test composition receives a projection and SSE
     update, and persists one Advisor message idempotently through the browser
     client/application path;
   - session expiry/revocation closes SSE and disables mutation;
   - fixture/demo data is not the production default;
   - no non-loopback, generic command, direct Worker/Reviewer, or browser tmux
     path is introduced;
   - startup/shutdown leaves no listener or writer lock behind.

Technical names and narrow interfaces are Worker choices, but product policy and
security posture are not. If a real provider or secret is necessary to complete
any requested test, STOP and return the exact need instead of weakening auth.

## Rework R2: durable verified authority linkage

1. Preserve `authorityRole` through:
   - parsed HTTP command;
   - application command;
   - immutable decision-link artifact;
   - append-only event payload;
   - projector and durable projection;
   - replay/idempotency command hash.
2. Introduce a narrow authority-evidence verification port or existing-adapter
   integration that checks the immutable decision artifact before linkage.
3. A caller-provided `authorityRole` is never sufficient. The verifier must bind
   repository, commit, path, SHA-256, mission/scope, and named authority as
   applicable to the canonical decision record.
4. Missing, unreadable, mutable, mismatched, stale, wrong-mission, wrong-scope,
   or wrong-authority evidence must reject with a stable fail-closed error and
   append no decision-link event/artifact.
5. Keep the Advisor as the actor performing the link. Preserve the separate
   named canonical authority (`Leo/GPT` or bounded Advisor routine authority) as
   evidence; do not transfer final approval to Advisor.
6. Add regression tests for:
   - exact role preserved through write/replay/projection;
   - verified Leo/GPT evidence accepted;
   - verified bounded Advisor evidence accepted only where the current contract
     permits it;
   - claimed role/evidence mismatch rejected with no durable change;
   - artifact hash/scope/mission mismatch rejected;
   - idempotent replay and conflicting request behavior remain correct.

If the current approved contract does not define a safe bounded Advisor routine
decision scope, fail closed for that variant and document the unresolved gate;
do not invent one.

## Canonical as-built documentation

Update all seven canonical files as needed, without weakening the design:

- record the new executable composition path and exact fail-closed default;
- record production runtime client versus explicit synthetic fixture mode;
- record verified authority linkage and its tests;
- correct FEATURE_INDEX AO-REQ-010 and AO-REQ-019 from actual evidence;
- correct Master section 2's stale Batch D heading;
- preserve every real-provider, secret, private-network, production, multi-host,
  Hermes, DB, and external-access deferred gate;
- preserve the Leo/GPT AO-WU-14 auth-posture decision as unresolved;
- maintain `DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH ->
  CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE` traceability.

Do not rewrite the design to excuse a defect or claim active authenticated
operation from synthetic evidence.

## Required verification

Run sequentially:

- `npm run check`
- `npm run test:e2e`
- `npm run test:security`
- `npm run test:recovery`
- `npm run test:pwa`
- `npm run audit:dependencies`
- the new composed-runtime and authority-evidence suites;
- a disposable loopback smoke test with exact listener and cleanup evidence;
- `git diff --check`

Directly inspect desktop, mobile, and reduced-motion output if page pixels
change. Update visual baselines only when the visible change is intentional and
explain every changed image.

## Git and result

- stage only exact Agent Office rework files;
- commit code/tests/config first and canonical docs second;
- push non-force only to `origin/shadow/agent-office-m01`;
- do not merge or push main;
- preserve unrelated changes if any and STOP on a material conflict;
- publish the durable Worker result and pointer to foundation-docs without
  staging unrelated existing dirt.

Result:

- `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_FINAL_REWORK_RESULT.md`

Pointer:

- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/46_WORKER_FINAL_REWORK_RESULT_POINTER.md`

The result must include exact files, commits, pushes, tests, direct smoke
evidence, R1/R2 closure mapping, limitations, no-secret proof, and return to
Advisor.

## Forbidden

- real secret, credential, provider, DB, production/live, public/private-network
  exposure, TLS/Tailscale deployment, main merge, feature activation, Hermes
  implementation, browser terminal/tmux/Worker/Reviewer dispatch;
- new session, agent, sub-agent, delegated context, or temporary context;
- Reviewer artifact edits or verdict changes;
- automatic AO-WU-14 completion or another mission.

Return result to Advisor and STOP.
