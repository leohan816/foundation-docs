# Advisor Post-Rework Validation

- Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Target branch: `shadow/agent-office-m01`
- Worker code commit: `0f90e39d3995ffca97eb7a05ef051d8f9a3719c1`
- Worker documentation commit: `3bd0e8f8cf10ecd53b917ba6cc1da45b9410b57b`
- Validation role: Advisor, direct evidence review
- Implementation authorization: already limited to M01; no new scope granted
- Final approval: not granted

## 1. Worker Rework Evidence Reproduced

Advisor directly verified the Worker branch is clean, equals its upstream, and contains the two declared commits. Advisor also independently reran:

- `npm run check`: PASS, 52 files / 205 tests plus build
- `npm run test:composition`: PASS, 4/4
- `npm run test:authority`: PASS, 5/5
- `npm run smoke:runtime`: PASS for loopback shell/status, fail-closed auth, listener rebind, and writer-lock release
- dependency audit: zero known vulnerabilities

The narrow original findings have material patches:

- AO-E-R2 now carries `authorityRole` through the decision link and verifies an immutable authority artifact before accepting the link.
- AO-E-R1 now has an executable loopback composition, built runtime client, status/projection/SSE integration, and a fail-closed no-provider state.

These facts justify delta review. They do not by themselves prove that the M01 operational control plane is complete.

## 2. Newly Exposed Operational Conformance Question

### AO-E-R3 — composed runtime may still be a secure shell rather than the required operational control plane

**Advisor classification candidate:** `CODE_DEFECT` and `DESIGN_CONFORMANCE_GAP`, subject to independent Fable5 review.

This is not a request for broader product functionality. It tests the original M01 requirements: current progress, current actor states, structured alerts, animated office state, Advisor-only message delivery, acknowledgement, and work resumption.

Direct code evidence:

1. `src/runtime/cli.ts:24-28` hard-codes `fixtures/manifests/agent-office-m01.v1.json` and its fixture source metadata. The CLI has no argument for a current external canonical mission manifest.
2. The hard-coded fixture is stale relative to the canonical Advisor manifest. The fixture leaves AO-WU-06 at `REVIEWING` and AO-WU-07 through AO-WU-15 waiting, while the canonical job manifest records AO-WU-06 through AO-WU-12 completed and AO-WU-13 at `NEEDS_PATCH`.
3. `src/runtime/projection.ts:30-43` folds only the imported static manifest plus the local event store, then labels every WorkUnit observation `CURRENT` with `VERIFIED_LOCAL_EVENT_PROJECTION`. A fresh runtime state root contains no historical mission events proving current Git/tmux/artifact state.
4. `src/runtime/projection.ts:56-82` reads the durable alert projection but emits `communication.alerts: []`. Alert detail and actions therefore do not reach the runtime communication model.
5. `src/ui/runtime/runtime-app.tsx:36-44` renders the authenticated application projection with `showOfficeScene={false}`. The event-driven office scene required by Batch C is absent from the production projection path.
6. `src/runtime/composition-core.ts:98` constructs `HermesAdvisorGateway`, whose implementation is deliberately `DISABLED_NOT_IMPLEMENTED`. The implemented `TmuxAdvisorGateway` is not injected into the executable composition.
7. The executable composition does not invoke the Batch B Git, tmux, manifest, or artifact observation adapters. No runtime coordinator imports verified current project/session/artifact evidence into the local event projection.
8. Consequently, a browser submission can be proven in synthetic composition tests, but the default executable composition cannot deliver its immutable pointer to the active Advisor transport, observe Advisor acknowledgement from that transport, or prove work resumption.

Documentation evidence also requires scrutiny:

- `docs/FEATURE_INDEX.md` and the seven canonical design documents correctly disclose several real-auth and real-capability gates, but some as-built rows describe the application projection/runtime as implemented without explicitly disclosing the stale fixture manifest, absent observation coordinator, empty communication alerts, hidden office scene, and disabled executable Advisor gateway.
- The docs distinguish the implemented Tmux gateway from the disabled Hermes stub. The executable composition currently chooses the latter.

## 3. Required Independent Review Questions

Fable5 must decide from actual code, tests, docs, and diffs:

1. Is AO-E-R2 fully closed with durable authority-role correspondence and fail-closed mismatch behavior?
2. Is the original AO-E-R1 fully closed, or only the secure executable-shell portion closed?
3. Can the current executable honestly display current mission and actor state without an external canonical manifest and observation/import coordinator?
4. Is marking all static-manifest WorkUnits `CURRENT` evidence-correct?
5. Are runtime alerts, office animation, and Advisor communication actually present in the production application path?
6. Does selecting the disabled Hermes stub instead of an injectable/active Advisor gateway contradict the accepted M01 architecture?
7. Which gaps are patchable inside M01 without auth credentials, privileges, public exposure, DB access, or a new product decision?
8. Which remaining item, if any, genuinely requires Leo/GPT authority before AO-WU-14?
9. Are canonical as-built documents accurate, or do they require a documentation-stale correction?

## 4. Advisor Gate

`AO-WU-13` remains `NEEDS_PATCH` until the same Fable5 Reviewer issues separate delta design and implementation verdicts. `AO-WU-14` and final closure remain blocked.

Advisor will not activate real authentication, credentials, private-network access, privilege, production/live use, or browser-to-terminal authority. Any such requirement returns to Leo/GPT.

## Advisor Verdict

`PASS_TO_SAME_REVIEWER_DELTA_REVIEW_WITH_AO_E_R3_CHALLENGE`
