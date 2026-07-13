# Sentinel Implementation Third Delta Re-Review — Agent Office Batch A

Review pass: `IMPLEMENTATION_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: Independent `Sentinel-ReReview`

Session: same existing independent `foundation-reviewer-sol` role session

Model / effort: actual `gpt-5.6-sol`, `xhigh`

Return to: Advisor

This is a bounded, independent, read-only implementation/accessibility delta
re-review. It is not a candidate patch, risk acceptance, Founder approval,
merge/deploy authorization, or permission to start Batch B.

## 1. Runtime, independence, target, and provenance

The actual Reviewer runtime was verified directly:

- current Codex process `711307` is
  `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh ...`;
- its working directory is `/home/leo/Project/foundation-reviewer`, its thread is
  the same existing Sentinel thread, and no role change, temporary session,
  agent, sub-agent, or delegated context was used;
- the exact 07N handoff and `/fable-sentinel` canonical V2/delta/provenance/
  classification/contract rules were read directly before review.

Exact reviewed target:

- repository: `/home/leo/Project/agent-office-batch-a-001`;
- branch: `batch-a/modern-office-identity-001`;
- before: `fcd55a2df04aa14284fceaab12c653492edf22f2`;
- after: `43107b9c087a5d172d5f670e6b01bd75ab9ac1db`;
- the after commit has exactly the stated before commit as its parent;
- exact delta: 8 files, 241 insertions, 9 deletions;
- local HEAD, configured upstream, remote-tracking ref, and direct
  `git ls-remote` all resolved to the exact after commit;
- `git diff --check fcd55a2..43107b9` passed;
- review began and ended with a clean target worktree.

Directly reviewed evidence included 07N, Advisor records 60/61/62, the Worker
fourth-rework result and pointer, the prior Sentinel second-delta result, the
current Founder intake/brief and 17-item authorization, contract section 2.7,
the exact commit/diff, all eight changed files, and load-bearing surrounding
overlay, semantic-roster, production-scene, drawer, CSS, and E2E source. Worker
and Advisor summaries were treated as claims until direct source or reproduction
supported them.

No Agent Office source, test, media, configuration, or Git state was patched.

## 2. Delta closure summary

| Finding | Status | Severity | Direct conclusion |
|---|---|---:|---|
| A4-1 high-text roster-equivalent mode | `PARTIAL__BLOCKING` | MEDIUM | The real `rem` probe, pre-paint initial selection, atomic marker, zero partial labels, complete eight-row first layer, and Office-primary pixels work. But 200-percent mode removes every actor-detail trigger; the roster has no interactive equivalent, and closing a drawer after a normal-to-high transition loses focus to `BODY`. The claimed keyboard/drawer/focus equivalence is false. |
| A4-2 exact anti-false-pass gates | `PARTIAL__BLOCKING` | MEDIUM | The new exactly-one-hidden challenge correctly fails and restores the shared predicate, including the prior one-label/seven-hidden class of shortcut. The same predicate nevertheless accepts a wrong unique actor id, a missing fact replaced by a duplicate, empty provenance values, and eight off-viewport labels; the high-text helper similarly accepts empty role/name and a missing fact replaced by a duplicate. It is not the exact predicate/set gate required by 61/07N. |
| A4-3 complete accessible sources | `PARTIAL__BLOCKING` | LOW | Production code now emits all seven full source labels and the affected tests pass. The focused unit's generic `[A-Z][^.]*` pattern accepts `source X.` for every fact, so it does not fail when every required full source name is replaced/omitted. Code behavior is correct; the mandated exact unit gate and as-built claim about it are not. |
| Directly affected regressions/boundaries | `PRESERVED_EXCEPT_ABOVE` | — | Normal-scale Office-first pixels, A3-1 Team propagation, the truthful roster content, I2/security/authority file boundaries, strict-CSP Living Office test, mobile/static routes, and Batch B exclusion remain preserved. The high-text actor-detail keyboard/focus regression is the direct exception. |

Any blocking partial prevents `PASS`. These defects are routine and patchable
inside the already authorized overlay/test/as-built scope, so `FAIL` is not
warranted.

## 3. A4-1 — visual/semantic switch works, keyboard/detail equivalence does not

### What closed

The implementation is production-observable rather than test-only:

- `src/ui/pixel/living-office-actor-overlay.tsx:152-175` measures an actual
  `10rem` probe in `useLayoutEffect`, derives the scale from its width, and
  observes later size changes with `ResizeObserver`;
- lines 211-226 publish the probe and the single explicit
  `data-office-label-mode="labels|roster-equivalent"` state;
- `src/ui/pixel/living-office.css:537-555` hides every production label and
  connector from that single roster-equivalent marker, so there is no 1..N-1
  label state;
- `src/ui/pixel/living-office-semantic-mirror.tsx:72-96` independently renders
  the exact visible production actor rows from the frame, with role, stable
  display name, Team, the other six compact facts, and full source labels.

An initial authenticated 200-percent mount was directly reproduced. Its first
post-mount state was `roster-equivalent`, with 0 visible canvas labels and 8
roster rows. Direct scale/coverage measurements on the real surface were:

| Requested root text | Probe width | Mode | Visible labels | Label union coverage |
|---:|---:|---|---:|---:|
| 100% | 160px | `labels` | 8 | 16.7608% |
| 129% | 206.390625px | `labels` | 8 | 21.4166% |
| 130% | 208px | `roster-equivalent` | 0 | 0% |
| 200% | 320px | `roster-equivalent` | 0 | 0% |

Fresh unmasked 1440x900 high-text viewport and full-page pixels were inspected.
They show the Office without the rejected card wall and the complete eight-actor
roster below it. Review-only capture evidence was 332675 bytes / SHA-256
`88104ff05216a0462acb9aa3f63bb4a499728caad27597509c7509d2b0568b91`
for the viewport and 977444 bytes / SHA-256
`fad76ec7bd01bfd2103c86d4028ed6adcc55d9878edcf0054e4b54f38f434adc`
for the full page. These were inspection artifacts, not candidate baselines.

The `useLayoutEffect` source supports the claimed initial pre-paint correction:
the initial `textScale=1` commit is synchronously remeasured and updated during
the layout-effect phase before paint. The later switch is a single attribute
transition, so labels/connectors change as one CSS state. No work, authority,
source, model, or operational fact is inferred by this path.

### Blocking regression — high-text users lose actor-detail operation and focus

The roster is a truthful static first layer, but it is not interaction-equivalent:

- the only actor-detail invokers are the production label buttons at
  `living-office-actor-overlay.tsx:260-298`;
- CSS lines 549-550 set every one of those buttons to `display:none !important`;
- the roster rows at `living-office-semantic-mirror.tsx:73-95` are plain `li`/
  `span` content with no button, link, `tabindex`, or callback to the same
  17-field actor drawer.

Direct reproduction on the real 200-percent surface found:

- visible actor-detail triggers: 0;
- interactive descendants inside the roster: 0;
- visible labels: 0; roster rows: 8; open actor details: 0.

Thus a user who starts in high-text mode can read the first layer but cannot
open the contract's 17-field second layer by pointer or keyboard. A second
transition reproduction opened the drawer at normal text, changed to 200
percent, then activated `Close actor detail`. `close()` attempted to restore
focus to the now-`display:none` invoker (`living-office-actor-overlay.tsx:194-197`);
the actual active element became `BODY`, with zero visible actor triggers.

The browser test does not cover this regression. It resets root text to normal
before the drawer/keyboard sequence (`tests/e2e/living-pixel-office.spec.ts:83-91`)
and at 200 percent checks roster counts/Axe only (`:74-82`). Consequently the
claims of static/reduced/keyboard/screen-reader/forced-colors equivalence in
`docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:421`,
the WorkUnit plan at `:175`, `docs/FEATURE_INDEX.md:596`, and the Worker result
overstate actual high-text behavior.

Routine closure: retain the complete no-card-wall state while providing an
actor-specific operable equivalent that opens the same 17-field drawer, and
prove initial high text plus normal↔high transitions, keyboard activation,
drawer close, and focus restoration in the high-text route. Do not restore
partial canvas labels.

## 4. A4-2 — the named challenge closes, but the required exact gate does not

### What closed

`tests/e2e/living-pixel-office.spec.ts:312-367` does use one local `predicate`
for positive, hidden, and restored evaluations. It hides exactly one production
label with an inline important declaration, evaluates the same function, removes
the declaration, and re-evaluates it. Direct reproduction produced:

- positive: 8/8 visible, 16.0753% step-6 coverage, `valid=true`;
- exactly one hidden: 7/8 visible, 14.0367% coverage (coverage alone still
  passes), `cardinalityOk=false`, `valid=false`;
- restored: 8/8 visible, `valid=true`.

The prior one-label/seven-hidden false pass therefore fails the new count check.
At high text, the unmodified authentic page also has exact equality between the
eight label-derived actor ids and eight roster ids, one authentic row per actor,
seven authentic mapped facts including Team, and seven non-empty authentic
source attributes.

### Blocking exactness failures

The combined normal-mode predicate is not bound to the exact actor or field set:

- line 317 reads only a numeric `data-actor-label-count`; lines 322-323 require
  count and uniqueness, but never compare ids to an independently fixed expected
  visible-actor id set;
- lines 324-327 count nine arbitrary field-marked nodes, count at least seven
  arbitrary source attributes, and look for Team, but never require the exact
  nine unique keys, non-empty values, or a non-empty source on each of the exact
  seven sourced fields;
- lines 328-344 do not test rectangle containment/intersection for every label,
  and `coverage >= 0` accepts zero coverage. The assertion message at line 358
  says "in-viewport", but the predicate does not establish it.

Four DOM challenges against the exact shipped predicate all returned
`valid=true`:

1. replace `foundation-advisor`'s label id with a new unique
   `BOGUS_UNIQUE_ACTOR`;
2. relabel the model field as a duplicate Team field, leaving nine nodes but no
   model key;
3. set every compact `data-actor-fact-source` value to the empty string;
4. move all eight labels to `translate3d(-10000px,-10000px,0)`; the predicate
   still counted 8 visible labels and accepted 0-percent coverage.

The roster-equivalent helper at lines 375-415 has the analogous field exactness
gap. It compares authentic ids and counts seven field nodes, but checks role/name
element existence rather than non-empty content and never requires the exact
seven unique mapped field keys. After emptying one row's role and stable name and
changing its model key to a duplicate Team key, the exact shipped helper logic
still passed.

These are deterministic false passes against A4-2's explicit gate contract, not
hypothetical product mutations. The current product DOM happens to be correct,
but the mandatory anti-shortcut evidence does not prove that correctness. The
as-built statements at contract line 280, architecture lines 422/425, WorkUnit
plan lines 176/179, Feature Index line 596, and the Worker result incorrectly
describe the gates as exact.

Routine closure: take a fixed expected actor-id set from the visible production
frame/contract; require exact set equality, one in-viewport label per id, the
exact nine unique non-empty fields, and exactly the seven expected non-empty
source-bearing facts inside the one reusable predicate. Apply equally exact
unique/non-empty role/name/fact/source checks to each roster row. Keep the
existing exactly-one-hidden/coverage-alone/restoration challenge and add focused
negative challenges for wrong id, wrong/missing field, empty source, and
off-viewport labels.

## 5. A4-3 — code truth closed; exact source test remains open

`actorLabelAccessibleName` at
`src/ui/pixel/living-office-actor-overlay.tsx:570-580` now uses
`PIXEL_ACTOR_FACT_SOURCE_LABELS[...]` for Team, session process, AI identity,
model, effort, AI runtime, and operational state. Direct source inspection and
the passing affected unit confirm the authentic accessible names contain all
seven full labels. The implementation portion of A4-3 is correct, and the
contract's production-behavior statement agrees with it.

The new focused test at `tests/ui/actor-summary.test.tsx:142-156` does not prove
the exact full source names. For each fact it accepts the generic pattern
`, source [A-Z][^.]*.`. Replacing every authentic full source label in a real
accessible name with the one-letter value `X` produced:

`Team ..., source X. ... Process ..., source X. ... AI identity ..., source X.
... Model ..., source X. ... Effort ..., source X. ... AI runtime ..., source X.
... Operational ..., source X.`

All seven iterations of the exact current unit regex still passed. Therefore the
test would not fail if every mandated full source phrase were replaced by an
abbreviation/arbitrary uppercase token. Architecture line 423, WorkUnit plan
line 177, Feature Index line 596, and the Worker report say the test fails on any
full-source omission; that test-capability claim is false.

Routine closure: assert each fact's exact expected full
`PIXEL_ACTOR_FACT_SOURCE_LABELS[source]` phrase (or exact complete accessible
name), with a focused negative case that removes or abbreviates each source in
turn. Do not weaken the correct production code or narrow the contract.

## 6. Affected tests, pixels, and regression boundaries

Independent commands and outcomes:

| Command / evidence | Outcome |
|---|---|
| `npm test -- --run tests/ui/actor-summary.test.tsx tests/ui/pixel-actor-overlay.test.tsx` | PASS: 2 files, 9 tests. |
| `npx playwright test --config playwright.batch-a-living-office.config.ts` | PASS: 3/3 under the real composed strict-CSP loopback surface. The suite does not exercise the false passes or high-text detail/focus path above. |
| targeted ESLint on the changed overlay/E2E/unit files | PASS. |
| `npm run typecheck` | PASS. |
| fresh authenticated 100/129/130/200-percent probe | Reproduced the mode/coverage table in §3, exact authentic 8-row roster, and the false-pass/focus challenges in §§3-5. |
| fresh unmasked high-text visual inspection | Office is primary and no card wall is present; the complete roster is visually present below the Office. |

The broad Worker gate was not repeated in this delta-first pass because the
exact affected units, real Living Office suite, lint/typecheck, pixels, and
direct challenges localized the defects, and the delta contains no concrete
regression signal in the previously closed renderer/validator/Channy/prototype
surfaces.

The delta changes only:

- `src/ui/pixel/living-office-actor-overlay.tsx`;
- `src/ui/pixel/living-office.css`;
- `tests/e2e/living-pixel-office.spec.ts`;
- `tests/ui/actor-summary.test.tsx`;
- the four directly affected Batch A as-built/index documents.

No baseline, package/lockfile, dependency, TypeScript/Playwright configuration,
auth/server/transport, projector/clock/scene, CSP, prototype, or Batch B path
changed. No delta match exists for Grok/excluded-session reuse, `.skip`/`.only`,
`eslint-disable`, `@ts-ignore`, `@ts-expect-error`, auth/secret/DB/schema/
migration/remote/public/live/production expansion, command/dispatch authority,
tmux input, or force/protected/main action.

Normal 100-percent pixels and A3-1 Team/source propagation remain materially
preserved. I2-1/I2-3/I2-4 source is outside the delta, the real Living Office
suite remains 3/3, the complete authentic roster remains truthful, and no new
security or authority behavior is introduced. The directly affected regression
is the high-text detail/keyboard/focus loss described in §3.

## 7. Worker/Advisor report accuracy

Accurate and independently supported:

- exact base/candidate/parent, 8-file delta, non-force upstream equality, clean
  worktree, and clean `diff --check`;
- real root-text probe, pre-paint initial measurement, reactive observer, explicit
  mode marker, and zero partial labels;
- authentic 100-percent Office coverage, 130/200-percent roster-equivalent mode,
  exact authentic 8-row first layer, and correct seven-source production name;
- 9/9 affected unit and 3/3 Living Office results;
- no baseline/config/dependency/security/authority/Grok/suppression expansion.

Inaccurate or overstated:

1. high-text `keyboard`/drawer/focus equivalence is reported preserved, but the
   mode has no actor-detail trigger and loses focus after the transition/close
   sequence;
2. `assertCompleteLabelSet` is reported as exact actor/field/source/in-viewport
   proof, but it accepts all four directly reproduced malformed states;
3. `assertRosterEquivalentMode` is reported as exact complete per-row proof, but
   it accepts empty role/name and a missing fact replaced by a duplicate;
4. the A4-3 unit is reported to reject any full-source omission, but it accepts
   `source X.` for all seven facts.

Advisor 62's technical-closure statements inherit the same gaps. Its Git, scope,
and affected test reproductions remain accurate.

## 8. Scope, cleanup, rollback, and verdict rationale

All changed paths are inside 09N/61's authorized source/test/as-built scope.
The review-started loopback server was stopped, the exact generated
`test-results-batch-a-living-office/` directory was removed, no listener remains
on port 4317, and the target repository is clean and upstream-equal at the exact
candidate. Unrelated pre-existing foundation-docs dirt was preserved and is not
part of this result.

Whole-batch rollback remains return/revert to
`ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`; this delta adds no DB, migration,
secret, external, or live state.

`NEEDS_PATCH` is required. A4-1's actual Office-first semantic switch is valid,
but its high-text route violates the expressly preserved keyboard/drawer/focus
boundary. A4-2's named one-hidden challenge is improved but the mandated exact
predicate has several reproduced false passes. A4-3's product code is truthful,
but its required exact full-source unit gate is not. These are narrow, routine
corrections within the existing A4 scope; risk acceptance or a new Founder
decision is unnecessary.

Return to Advisor for an exact Worker patch and the same existing Sentinel
re-review. Do not accept risk, grant Founder approval, merge/deploy, or start
Batch B.

Excluded from this bounded review: unrelated prior-PASS axes without a direct
regression signal, candidate patching, risk acceptance, real credentials/
secrets/private-run delivery, DB/schema/migration, remote/public/production/live
action, tmux input, agents/sub-agents, protected branch/main, final approval,
and Batch B-E.

RETURN_TO: Advisor

PROPOSED_NEXT_ACTOR: Advisor

STOP
