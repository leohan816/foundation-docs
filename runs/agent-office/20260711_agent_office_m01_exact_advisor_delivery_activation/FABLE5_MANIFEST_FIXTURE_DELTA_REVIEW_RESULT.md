# FABLE5 MANIFEST-FIXTURE DELTA REVIEW — Canonical-Manifest-Independent Activity Fixture

- Mission: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION` · Actor: **Fable5 Reviewer** (`reviewer-fable5`) · Pass: narrow Level-3 implementation/test DELTA · Skill: `/fable-sentinel` · Date: 2026-07-11
- Delta: `73157613 -> 2f663304` = HEAD = origin (fetched); **exactly one test file**, `tests/integration/observation-coordinator.test.ts`, +17/-1.
- **VERDICT: `PASS`** (one recommended non-blocking robustness note under item 5).

## Checks (each reproduced first-hand)
1. **Root cause confirmed**: the current canonical M01 manifest records `AO-WU-15` as `"status":"READY"` (dependsOn AO-WU-21) — read directly from the actual foundation-docs manifest. The seven failures came only from the activity-freshness fixture assuming the historical `WAITING_DEPENDENCY` live state.
2. **Test-behavior-only**: the diff touches zero runtime/canonical files; it derives `activityFixtureManifest` from the verified manifest, overriding only AO-WU-15 for the projection fixture. Canonical lifecycle state is unchanged.
3. **Real-manifest verification preserved**: the coordinator startup path still loads and verifies the actual canonical manifest; only the downstream projection fixture (`createInitialProjection`) consumes the synthetic override.
4. **All seven activity-freshness variants intact**: the diff adds the fixture derivation and swaps one initializer line; no assertion was removed or weakened.
5. **Field preservation**: the reconstructed WorkUnit lists all eight fields of the strict `ImportedWorkUnit` type (id/phase/actor/title/status/dependsOn/initialState/requiredObservableName) — lossless against the actual v1 manifest today, and the type's exact-key validation plus TypeScript would reject required-field drift. Disposition of the handoff's conditional: object-spread preservation (`{...workUnit, status, initialState, requiredObservableName}`) is the more future-proof form and SHOULD be adopted at the next test touch (silent drift risk exists only for future optional fields), but no field is dropped today — classified `TEST_GAP` (recommended, non-blocking), no patch loop required.
6. **Evidence reproduced by my own runs**: focused `21/21 passed` and full `296/296 passed (56 files)` — exact match to the Worker claims.
7. **Zero authority/delivery/browser/tmux/policy scope change**: one test file only (diff name-verified).

## Verdict rationale
The fix isolates the test fixture from live canonical progression exactly as intended, changes nothing outside one test, and both suites pass in my own runs. The single robustness preference is recorded for the next touch and does not alter behavior today. Per V2: **PASS**.

## Self-review
Diff, manifest state, type shape, and both suite results are my own outputs; the Worker report was cross-checked only. Read-only; no patch/server/tmux/authority material; only this result + pointer written.

Return to: **Advisor**.
