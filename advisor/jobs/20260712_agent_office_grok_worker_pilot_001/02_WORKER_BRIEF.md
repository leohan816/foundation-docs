# Grok Pilot Worker Brief

## Exact Assignment

Implement the read-only tmux session discovery and AI runtime classification
slice in `/home/leo/Project/agent-office-grok-pilot-001` on branch
`pilot/grok-tmux-runtime-classification`, base `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`.

## Allowed Files

- `src/domain/observations/**` (new bounded domain files only)
- `src/adapters/observations/process-runner.ts`
- `src/adapters/observations/ports.ts`
- `src/adapters/observations/index.ts`
- `src/adapters/observations/tmux/**`
- `tests/domain/runtime-observation.test.ts`
- `tests/adapters/tmux-readonly.test.ts`
- `tests/adapters/tmux-runtime-discovery.test.ts`
- `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
- `docs/FEATURE_INDEX.md`

No preview/UI file is authorized. A preview is unnecessary for this slice.

## Required Behavior

- Define evidence-bearing server, session/window/pane, AI runtime, and timestamp
  contracts for all states named by Leo/GPT.
- Parse only explicit structured fields from fixed argv
  `tmux list-panes -a -F <format>` output; no shell and no terminal capture.
- Keep session names and process names opaque facts, never authority.
- Separate process detection from verified runtime identity metadata.
- Keep model/effort unknown unless supplied by accepted structured metadata.
- Require accepted structured WorkUnit evidence for `AI_WORKING`.
- Resolve duplicate identical observations deterministically and classify
  conflicting observations fail-closed without guessing.
- Represent malformed output and offline server without partial promotion.

## Required Fixtures

Shell-only; Claude unknown model; Codex unknown effort; Grok verified runtime;
dead pane; unknown process; attached-idle; duplicate/conflict; offline server;
malformed tmux output.

## Required Checks

```text
npm run lint
npm run typecheck
npm test -- --runInBand (or the repository-equivalent serial full suite)
npm run build
git diff --check
```

Focused tests must be run separately. Report exact results, retries, errors,
elapsed time, context, and token/cost data only when the Grok tool exposes them.

## Forbidden

No polling daemon, remote/SSH/server pairing, credential/env/secret access,
tmux input, process signaling, browser dispatch, onboarding, runtime composition,
production UI, DB/schema, public network, Hermes, model switching, visual changes,
main/protected merge, force push, sub-agent, delegated context, self-review, or
contact with `agent-office`.

## Result Contract

Write:

- `../foundation-docs/runs/agent-office/20260712_agent_office_grok_worker_pilot_001/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001/11_WORKER_RESULT_POINTER.md`

Commit/push Agent Office first, then only the result and pointer in Foundation
Docs. Return to Advisor and stop.
