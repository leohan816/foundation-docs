# Sentinel Implementation Review — Agent Office Batch A

Review pass: `IMPLEMENTATION_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: Independent Sentinel

Session: separate existing `foundation-reviewer-sol` role session

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is an independent read-only implementation, security, accessibility, and
visual review. It is not a candidate patch, risk acceptance, Founder approval,
merge/deploy authorization, or permission to start Batch B–E.

## 1. Exact review target and provenance

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Candidate: `0b2f923a8456eea9b2b7df5b4cec1ae8c6d26760`
- Accepted design checkpoint: `535f39aaf090043e4d7e1ddaf7d369a0c321b159`
- Candidate ancestry: base is an ancestor; candidate is 30 commits after base
  and 12 commits after the accepted design checkpoint.
- Push evidence: local `HEAD`, configured upstream, remote-tracking ref, and
  direct `git ls-remote origin refs/heads/batch-a/modern-office-identity-001`
  all resolved to `0b2f923a8456eea9b2b7df5b4cec1ae8c6d26760`.
- Diff: 63 files, `+5511/-716`; `git diff --check ac8ba75..0b2f923`
  passed.
- Candidate tracked state remained clean. Disposable untracked
  `test-results-batch-a-living-office/` and `test-results-composed/` remained
  before and after review and must not be omitted from a final clean-state
  claim.

Directly read and compared:

1. intake, Advisor brief, Worker brief, final superseding design acceptance,
   Advisor amendments 48–52, Advisor validation 53, and the Worker result;
2. the final candidate design/contract/WorkUnit documents and prior Sentinel
   design-review chain;
3. the exact `ac8ba75..0b2f923` commit train, changed-file list, source/test/
   config/docs diffs, upstream evidence, and rollback boundaries;
4. the organization registry/evidence/projector/render-input implementation;
5. the authenticated runtime shell/client/projection, production Pixi chain,
   shared renderer host/stage, actor overlay/drawer, semantic mirror, CSS,
   security headers, E2E harnesses, and focused acceptance/security tests; and
6. every committed production/prototype baseline named by the handoff plus the
   current prototype PNG/WebM evidence.

All source line references below are to candidate `0b2f923` unless another
snapshot is named.

## 2. Blocking findings

### SIR-1 — HIGH — authenticated production Pixi fails under the real CSP, leaves a blank canvas, and reports a false ready state

**Evidence.** The real loopback server correctly emits a restrictive CSP with
`script-src 'self'` and no `unsafe-eval`
(`src/server/security/headers.ts:3-16,26-31`; the security tests explicitly
forbid adding `unsafe-eval`). The promoted production renderer reaches the
existing public Pixi bridge (`src/ui/pixel/pixel-render-host.tsx:24-28,193-207`),
but the bridge imports the ordinary `pixi.js` path and does not install Pixi's
CSP-safe static synchronization polyfill
(`src/ui/pixel/pixi-public-export-bridge.js:1-3`).

Reproduction against the built candidate and the actual composed loopback
server:

```text
pageerror: Error: Current environment does not allow unsafe-eval, please use
           pixi.js/unsafe-eval module to enable support.
viewport data-pixel-renderer-status: PIXEL_READY
viewport data-pixel-backend: WEBGL
canvas intrinsic size: 300 x 150
canvas CSS/client size: 1436 x 558
canvas sampled 2D pixels: transparent 0,0,0,0 only
canvas data-pixel-canvas attribute: absent (onInit never completed)
visible DOM actor labels: 8
```

`PixelRenderHost` initializes state as `WEBGL`
(`pixel-render-host.tsx:55-60`) and derives `PIXEL_READY` solely from the absence
of its local fallback reason (`:164-173`). The asynchronous Pixi initialization
error occurs before `onInit` (`:137-157`) and is not converted into
`DOM_STATIC`/`M1_FIXED_STATIONS`; the error boundary therefore does not make
the status truthful. Direct unmasked captures after 1.5 and 5 seconds showed
only the gray stage plus DOM labels—no floor, facilities, desks, sprites,
role-specific symbolic surfaces, or Channy pixels.

**Impact.** The authenticated default experience is not a living pixel office.
The primary visual canvas is blank, the renderer advertises a backend/readiness
state it never reached, and the required fail-closed degradation does not run.
This defeats the main Batch A outcome while leaving the security header itself
correct.

**Required correction.** Keep the current CSP strict. Make Pixi initialization
CSP-compatible inside the authorized lazy production graph; do not add
`unsafe-eval` to the CSP. Make `PIXEL_READY`/backend publication contingent on
successful `onInit`, and convert any synchronous or asynchronous initialization
failure into the specified DOM-static then M1 fallback. Add a real composed-
runtime assertion for zero page errors, initialized canvas dimensions, a
nonblank canvas, and truthful fallback/status.

**Batch A patchability:** yes, but Advisor must confirm the exact source-path
amendment if the shared bridge path is outside the current edit allowlist.

### SIR-2 — HIGH — the authenticated production theme integration fails WCAG AA and the committed visual baselines encode the defect

**Evidence.** Global production styling is dark and sets inherited text to
`#e8edf3` (`src/ui/styles.css:1-29,40-46`). The modern light-office variables,
base foreground, button treatment, and focus treatment are scoped only under
`.living-office-prototype` (`src/ui/pixel/living-office.css:14-64`). The real
production root is instead `.living-office-surface`
(`src/ui/pixel/production-pixel-world-scene.tsx:51-53`), and the new
`.app-shell__nav` / `.app-shell__nav-button` classes have no authored rules.
Consequently production inherits light text into light HUD/card surfaces; for
example semantic cards use `#f3efe8` (`living-office.css:650-659`) while their
text remains the global `#e8edf3` (approximately `1.03:1`).

Direct pixel inspection of all four dedicated Living Office baselines showed
the raw browser-default navigation, the nearly invisible Living Office title,
and nearly invisible semantic-card/route/Channy text. A full-surface Axe run
against the actual authenticated composed runtime (not the drawer-only subset)
returned one `serious` `color-contrast` violation with eight failing targets,
including both pod-card headings, route-log content, Channy content, and section
headings. Reported ratios included `1.02:1`, `3.64:1`, and `4.07:1` where
`4.5:1` was required.

The committed E2E checks run Axe only against
`.living-office-actor-detail` (`tests/e2e/living-pixel-office.spec.ts:41-45`),
so their green result does not cover the primary surface.

**Impact.** The DOM semantic parity surface—the required accessible equivalent
of the decorative canvas—is unreadable in material areas and fails the accepted
contrast/accessibility contract. The shell also does not present a finished
Office-first navigation treatment.

**Required correction.** Apply the modern light-office variables/foreground and
an intentional responsive/focus-visible navigation style to the authenticated
production wrapper without regressing the prototype. Run full-surface Axe over
desktop, mobile, reduced/static, forced-colors, and 200% text states and refresh
the authorized production baselines after direct inspection.

**Batch A patchability:** yes.

### SIR-3 — HIGH — the production visual gate masks the failure it is supposed to prove

**Evidence.** The authenticated E2E asserts only a static Pixi version attribute
and one visible DOM actor label before taking a screenshot
(`tests/e2e/living-pixel-office.spec.ts:24-27`). Its screenshot helper masks the
entire canvas (`:96-104`). In Playwright that magenta overlay also covers the
camera-tracked actor-label layer occupying the same stage rectangle, contrary
to the source comment that actor labels are compared. The composed suite uses
the same mask (`tests/e2e-composed/application-office-scene.spec.ts:456-463`).

There is no authenticated-production check for canvas intrinsic dimensions,
successful `onInit`, nontransparent/nonblank pixels, console/page errors, or
motion. That gate passed 3/3 while SIR-1 was fully reproducible. The current
prototype suite and its refreshed 27.12-second WebM are coherent, but they run
the synthetic demo path under a different serving/CSP context; they cannot
prove production composition. Prototype baselines and `prototype-entry.tsx`
are unchanged from `ac8ba75`, as required.

**Impact.** The evidence split is not merely weaker than ideal; it is a false
positive that concealed a blank authenticated renderer. Actor labels, symbolic
facilities, Channy, pixel motion, and the production fallback chain are not
proven by the committed production screenshots.

**Required correction.** After SIR-1/SIR-2, add unmasked authenticated-
production evidence, an explicit nonblank-canvas assertion, an initialization/
page-error assertion, and refreshed continuous production motion evidence.
Keep deterministic DOM-only captures as supplemental evidence, but mask only
what they honestly exclude and do not describe covered overlays as compared.

**Batch A patchability:** yes.

### SIR-4 — MEDIUM — the second render-input validator casts the nested layout and can throw instead of failing closed

**Evidence.** The accepted design requires the seven-field wrapper and complete
`CommittedOfficeLayoutConfigV1` to be runtime-validated, including unique pod
IDs, closed Advisor Team values, total role-category mapping, responsible-
Advisor membership, selection, and a no-throw hard-failure result
(`docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:103-114`;
`docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:166-220`).

Actual `parseLivingOfficeProductionRenderInput` checks only
`committedLayout.schemaVersion`, casts the remaining object, and immediately
calls `assembleOfficeLayout`
(`src/application/organization/production-render-input.ts:279-300`). Direct
reproduction from the built candidate produced:

```text
committedLayout={schemaVersion, no pods} -> THREW TypeError:
  committedLayout.pods is not iterable
roleCategoryByRole={} -> ok:true (invalid total map accepted)
```

The focused contract test covers responsible-Advisor omission, cross-pod actor
membership, cues, selection, and numeric defaults, but does not challenge the
nested layout shape, total role map, or no-throw invariant
(`tests/contract/production-render-input.test.ts:88-196`).

**Impact.** The declared fail-closed boundary is not total. The current
committed constant is well formed, so this is not the cause of SIR-1, but an
invalid reviewed config or future composition can crash or emit invalid actor
categories instead of selecting the safe tier.

**Required correction.** Validate every nested layout/config field before
assembly, deterministically reject duplicates/invalid enums/incomplete maps,
and wrap all hard failures as the declared `{ok:false, reason, fallbackTier}`.
Add hostile-shape and no-throw tests.

**Batch A patchability:** yes.

### SIR-5 — MEDIUM — production does not implement the accepted eight-state Channy sequence

**Evidence.** The accepted WorkUnit requires the real shell to integrate the
eight-state Bedlington sequence and prove that sequence while preserving
`authorityRole: none`
(`docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md:67-72`;
architecture delta `:144,174`). The production projector hardcodes Channy to
`animation: 'STOP'` at the bed anchor for every logical time
(`src/ui/pixel/production-frame-projector.ts:159-169`). Candidate as-built docs
nevertheless claim “eight-state Channy + modern palette” is committed
(`docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md:137`).

The prototype 20/20 suite proves the eight states only on the synthetic
prototype timeline. The authenticated production E2E never asserts a Channy
state transition, and SIR-1 prevents Channy from rendering at all in the real
shell.

**Impact.** The non-operational boundary is correctly encoded
(`authorityRole: none`), but the required real-shell presentation sequence and
its motion evidence are absent; the as-built claim is inaccurate.

**Required correction.** After production rendering works, implement the
fixture-free, ambient eight-state sequence in the authenticated production
clock without creating operational meaning or importing prototype fixtures.
Test state coverage/authority and capture current production motion evidence.

**Batch A patchability:** yes.

## 3. Criterion-by-criterion coverage

| Required review criterion | Result | Direct conclusion |
|---|---|---|
| 1. Office-first shell; secondary technical/control views | `PARTIAL` | Office is the authenticated default and Technical dashboard remains keyboard-reachable; composed tests prove the secondary views. The primary pixel surface is blank under the real CSP (SIR-1), so the product outcome is not satisfied. |
| 2. Stable identity, mutable assignment, Team/reports-to, sentinels, no inference | `PASS_WITHIN_REVIEWED_SOURCE` | `roleInstanceId` stays stable; registry bindings are separate; Team/reports-to are explicit committed fields; runtime/evidence-only actors fail to `UNKNOWN`/`UNASSIGNED`; no name/proximity/timestamp/attached-state/prose inference path was found. |
| 3. 17-field drawer, focus/keyboard/mobile/reduced/static/contrast/parity/a11y | `PARTIAL` | The ordered 17 rows, source/status, Escape/Tab handling, invoker focus restoration, mobile containment, and reduced-motion static tier reproduce. Full production contrast/accessibility fails (SIR-2); production canvas parity is unproven/blank (SIR-1/SIR-3). |
| 4. Fixture-free production, lazy Pixi, marker rejection, frozen prototype | `PARTIAL` | Production graph is lazy and fixture-free; CD-3 6/6 rejects all three markers without filtering; prototype entry/fixtures/baselines are unchanged. Actual production Pixi initialization fails (SIR-1), and the second validator is not total (SIR-4). |
| 5. Symbolic role surfaces and Channy boundary | `FAIL` | Source surfaces are symbolic and no raw content path was found; Channy remains `authorityRole:none`. They are not visible in authenticated production, and Channy is hardcoded to STOP rather than eight states (SIR-1/SIR-5). |
| 6. Content/security/authority boundaries | `PASS_WITH_LIMIT` | No raw terminal/source/secret/private/customer payload, browser-direct Worker/Reviewer dispatch, arbitrary command path, new auth mode, remote/public access, DB, deployment, or authority expansion was found. The strict CSP is correctly preserved and must not be weakened to repair SIR-1. |
| 7. Focused and complete gates | `AUTOMATION_GREEN_BUT_INSUFFICIENT` | Exact reproduced totals are listed in §4. The green production E2E does not exercise CSP-compatible initialization, nonblank pixels, full-surface Axe, or production motion. |
| 8. Direct visual/media inspection | `FAIL` | Production masks hide the blank canvas and actor overlay. Prototype PNG/WebM evidence is current and coherent but is not production evidence. SIR-1–SIR-3 require refreshed unmasked production proof. |
| 9. Worker claims/totals | `MIXED` | All numeric test totals reproduced. Completion, full-gate, PWA/visual, and no-required-skip claims are overstated; details in §5. |
| 10. Scope/Grok/session/Git/rollback | `PASS_WITH_EVIDENCE_LIMIT` | Changed paths fit the frozen scope plus amendments 48–52; no tracked Grok artifact/string/code path or Grok ref is present; ancestry/upstream/rollback are sound. Historical excluded-session non-participation is asserted by intake/Worker but has no independently auditable repository evidence. |
| 11. Disposable output cleanliness | `OPEN_CLEANUP` | Two untracked Playwright result directories remain. They are not candidate changes but must be reconciled before final clean-state audit. |

## 4. Independent test and runtime reproduction

All commands ran against candidate `0b2f923` without updating baselines or
patching source:

| Command | Result |
|---|---|
| `npm run check` | PASS: lint and strict typecheck clean; Vitest 93 files / 595 tests; core and dashboard builds pass. |
| focused CD-3 Vitest | PASS: 1 file / 6 tests. |
| `npx playwright test --config playwright.batch-a-living-office.config.ts` | PASS: 3/3 (but false-negative coverage described in SIR-1/SIR-3). |
| `npx playwright test --config playwright.composed.config.ts` | PASS: 3/3; benchmark reported 17 ms pod-selection p95, zero >50 ms long tasks, 377 DOM nodes, 84 SVG elements, 309,544-byte retained-heap growth, zero pending cues. |
| `npx playwright test --config playwright.pixel-prototype.config.ts` | PASS: 20/20; current 27.12-second VP8 WebM inspected via six sampled frames. |
| `npx playwright test` | PASS: 43 passed / 23 skipped. |
| `node scripts/local-office-rehearsal.mjs` | PASS: loopback shell/asset 200, eager Pixi-free, protected projection 503 `AUTH_PROVIDER_UNAVAILABLE`, listener rebind and lock release true. |
| built `parseLivingOfficeProductionRenderInput` hostile-shape probe | FAIL as expected for review: missing nested layout throws; incomplete role map accepted. |
| actual composed-runtime unmasked browser probe | FAIL: CSP page error, transparent default-size canvas, false `PIXEL_READY`. |
| full `.living-office-surface` Axe probe | FAIL: serious color-contrast violation, eight targets. |

The prototype performance result also remained within its configured budgets
(600 active frames, 0.6 ms p95, zero long tasks, zero retained canvas/root after
teardown). That result is labelled prototype-only and is not used as proof of
the broken production renderer.

## 5. Worker-report accuracy

Accurate and directly reproduced:

- branch/base/candidate, 12 post-design commits, fast-forward push and upstream
  equality;
- 93/595 Vitest, CD-3 6/6, Living Office 3/3, composed 3/3, prototype 20/20,
  demo 43 passed/23 skipped, lint/type/build, and rehearsal results;
- unchanged package/lockfile, existing Playwright configs, prototype entry/
  fixtures, historical composed baselines, and no added suppressions;
- lazy Office chunk, eager-shell Pixi isolation, production marker rejection,
  frozen prototype behavior, loopback-only operation, and no DB/remote/live/
  protected-branch/force-push/authority expansion.

Inaccurate, omitted, or overstated:

1. “17 Founder items implemented,” “Office primary experience satisfied,” and
   “role-specific symbolic surfaces / Channy integration” are false for the
   actual authenticated production runtime (SIR-1/SIR-5).
2. “Full gate set green” and “No required check was skipped” omit the accepted
   production PWA/render initialization, nonblank canvas, full-surface
   accessibility, and current production motion requirements. Green test
   commands did not cover these behaviors.
3. The claim that masked Office screenshots compare the deterministic DOM shell
   is incomplete: the mask also hides the actor-label overlay, and it concealed
   the blank canvas (SIR-3).
4. “Single validated frame source” overstates the second boundary because the
   nested committed layout is cast and can throw (SIR-4).
5. “Security/authority/PWA/delivery/M1 fallback preserved” is only partly
   supported: authority/security headers are preserved, but the production Pixi
   CSP failure does not activate the promised M1/static fallback and the
   production lazy renderer was not exercised by the generic demo PWA suite.
6. Candidate as-built docs claim the eight-state Channy sequence despite the
   production projector's constant `STOP` state.
7. Worker Git status reports pre-existing `.grok/`/`grok*` as untracked in the
   isolated target, but direct target status at review shows only the two
   `test-results-*` directories. No Grok artifact is tracked or merged; the
   status wording appears copied from the excluded original checkout rather
   than the actual Batch A worktree.

## 6. Scope, security, Git, rollback, and residuals

- No scope expansion was found in the 63-file candidate diff relative to the
  final accepted closed source/test/docs list plus Advisor amendments 48–52.
- `AGENTS.md`, `CLAUDE.md`, package manifests/lockfile, both existing Playwright
  configs, `tsconfig.build.json`, `prototype-entry.tsx`, prototype fixtures, and
  every pre-existing historical baseline are unchanged from `ac8ba75`.
- No added `eslint-disable`, `@ts-ignore`, or `@ts-expect-error` was found.
- No tracked `.grok`/Grok pilot artifact, Grok branch/ref, or implementation reuse
  was found in candidate ancestry/diff. The excluded historical session's
  non-participation cannot be proven from Git; only the routing records and
  Worker assertion support it.
- Whole-batch rollback remains deletion/reversion of the feature branch back to
  `ac8ba75`; no DB/schema/migration/secret/remote/live state needs reversal.
- The strict CSP is a preserved security boundary, not a defect. Any repair that
  weakens it would create a new security failure.
- Untracked `test-results-batch-a-living-office/` and
  `test-results-composed/` remain an Advisor final-audit cleanup item. This
  review did not delete or reconcile them because candidate mutation was
  forbidden.

## 7. Verdict rationale and routing

`NEEDS_PATCH` is required. The authenticated production surface is blank under
the real CSP while reporting `PIXEL_READY`; the committed mask hides that
failure; the production semantic surface fails WCAG AA; the second render-input
boundary is not fail-closed; and production Channy does not implement the
accepted eight-state sequence. These defects and evidence gaps are material but
repairable inside Batch A, so `FAIL` is not warranted.

Return to Advisor for an exact in-scope patch and same-session Sentinel
implementation re-review. Do not grant Founder final approval, merge, deploy,
or start Batch B–E. Required re-review evidence must include:

1. strict-CSP authenticated production with no page error;
2. truthful initialization/fallback state, initialized dimensions, and explicit
   nonblank canvas pixels;
3. unmasked desktop/mobile authenticated production captures and refreshed
   continuous production motion evidence;
4. full-surface WCAG A/AA coverage and corrected baselines;
5. total/no-throw nested render-input validation tests;
6. fixture-free eight-state Channy production coverage with
   `authorityRole:none`; and
7. reconciliation of disposable untracked test output before final clean audit.

Excluded from this review: candidate patching, dependency changes, CSP
weakening, real credentials/secrets, real private-run or live Advisor delivery,
database/schema/migration, remote/public/production deployment, tmux/session
input, agents/sub-agents, protected branch/main, risk acceptance, final
approval, and Batch B–E.

`RETURN_TO: Advisor`

`STOP`
