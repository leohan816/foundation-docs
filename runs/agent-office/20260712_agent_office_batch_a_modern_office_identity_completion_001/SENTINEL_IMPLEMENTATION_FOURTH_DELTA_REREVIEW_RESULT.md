# Sentinel Implementation Fourth Delta Re-Review — Agent Office Batch A

Review pass: `IMPLEMENTATION_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: Independent `Sentinel-ReReview`

Session: same existing independent `foundation-reviewer-sol` role session

Model / effort: actual `gpt-5.6-sol`, `xhigh`

Return to: Advisor

This is a bounded, independent, read-only implementation/accessibility/evidence
delta re-review. It is not a candidate patch, risk acceptance, Founder approval,
merge/deploy authorization, or permission to start Batch B.

## 1. Runtime, independence, target, and provenance

The actual Reviewer runtime was verified directly:

- current Codex process `711307` is
  `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh ...`;
- its working directory is `/home/leo/Project/foundation-reviewer`, and its
  thread is the same existing independent Sentinel thread used for the prior
  review;
- no role change, temporary session, agent, sub-agent, delegated context, or
  parallel reviewer was used;
- the exact 07O handoff and `/fable-sentinel` canonical V2, delta-review,
  provenance, classification, and contract rules were read directly before
  review.

Exact reviewed target:

- repository: `/home/leo/Project/agent-office-batch-a-001`;
- branch: `batch-a/modern-office-identity-001`;
- before: `43107b9c087a5d172d5f670e6b01bd75ab9ac1db`;
- after: `95e493ce61e268d6352b3805692835f4b612a4ff`;
- the exact range contains two ordered commits:
  `d235db4088b9dee7c8648b5d2e5ace0940d9dab4` and
  `95e493ce61e268d6352b3805692835f4b612a4ff`, with the stated before commit as
  the first commit's parent;
- exact cumulative delta: 10 files, 402 insertions, 82 deletions;
- local HEAD, configured upstream, remote-tracking ref, and direct
  `git ls-remote` all resolved to the exact after commit;
- `git diff --check 43107b9..95e493c` passed;
- review began and ended with a clean target worktree.

Directly reviewed evidence included 07O, Advisor records 63/64/65, the Worker
fifth-rework handoff/result/pointer, the prior Sentinel third-delta result, the
current Founder intake/brief and 17-item authorization, contract section 2.7,
affected as-built sections, the exact two-commit cumulative diff, all ten changed
files, and load-bearing surrounding overlay, semantic roster, production scene,
drawer, CSS, unit, and E2E source. Worker and Advisor summaries were treated as
claims until actual source or direct reproduction supported them.

No Agent Office source, test, media, configuration, dependency, baseline, or Git
state was patched.

## 2. Delta closure summary

| Finding | Status | Severity | Direct conclusion |
|---|---|---:|---|
| A5-1 high-text drawer/focus equivalence | `IMPLEMENTATION_CLOSED__EVIDENCE_PARTIAL` | LOW | The authentic production DOM has exactly one native trigger in each of eight roster rows, each trigger carries its row's actor id, and both initial-high and transition paths open the existing single 17-field drawer and restore focus to the same visible actor trigger. However, the shipped browser test only operates the drawer after a later normal→high change, while the as-built documents say that browser tests prove operation from the initial-200% mount. |
| A5-2 exact anti-false-pass evidence | `PARTIAL__BLOCKING` | MEDIUM | The independent expected actor set, exact id/key/source checks, viewport check, named negative challenges, and restoration work. The same predicates nevertheless accept an empty actual fact value in either a label or roster cell, a roster trigger tied to the wrong actor id, and a duplicate roster trigger. They therefore do not enforce the stated exact unique non-empty values or one correctly tied trigger per actor. |
| A5-3 exact full-source proof | `CLOSED` | — | Production still emits all seven full source labels. The unit imports the canonical source-label table and requires every exact phrase; replacing any one with `SRC.` no longer satisfies the exact assertion. `source X.` cannot pass the positive gate. |
| Directly affected regressions/boundaries | `PRESERVED_EXCEPT_EVIDENCE_ABOVE` | — | Normal labels, high-text zero-partial-label mode, mobile/static/reduced/forced-colors/screen-reader behavior, Office-primary pixels, Channy non-actor meaning, drawer semantics, strict CSP, authority/security boundaries, and Batch B exclusion remain preserved. |

Any blocking partial prevents `PASS`. These are routine test/evidence/as-built
corrections within the already authorized files; the actual production actor
mapping and drawer behavior are correct. `FAIL` and risk acceptance are not
warranted.

## 3. A5-1 — production implementation closed; initial-mount test claim is not exact

### Actual source and product behavior

The implementation uses one actor and drawer state rather than a parallel
high-text drawer:

- `src/ui/pixel/living-office-actor-overlay.tsx:122-126` exposes
  `openActorDrawer(actorId, invoker)` on the existing overlay handle;
- lines 145-168 retain the single `selectedActorId` / `selectedActor` path;
- lines 206-243 record the actual invoker, open that single state, focus the
  drawer's Close button, and on close choose only the recorded visible invoker,
  the same actor's visible canvas label, or the same actor's visible roster
  trigger;
- `src/ui/pixel/living-office-semantic-mirror.tsx:80-105` creates one native
  `type="button"` trigger inside each authentic visible actor row, carries the
  same `roleInstanceId`, and sends the current target as invoker;
- `src/ui/pixel/production-pixel-world-scene.tsx` routes that callback to the
  same overlay ref. There is no second selected-actor store or duplicate drawer.

On a fresh authenticated 1440x900 production mount with root text set to 200%
before login, direct DOM inspection found:

- mode `roster-equivalent`;
- 0 visible canvas labels and 8 authoritative actor ids;
- 8 roster rows and exactly 8 native `BUTTON type=button` triggers;
- every row had exactly one trigger and each trigger id equalled its row id;
- each row retained the exact seven compact fact keys and readable full source
  labels.

Direct operation from that initial-high state reproduced both flows for
`foundation-advisor`: Enter opened exactly one same-actor drawer containing 17
fact rows; Escape closed it and restored focus to the same roster button; Enter
followed by Close-button activation did the same. A separate normal-label →
200%-text → Close-button reproduction restored focus to the same actor's roster
button, not `BODY`, the hidden label, or another actor. This directly closes the
prior A5-1 product/accessibility defect.

The fresh unmasked 200%-text full-page capture was inspected at 1440x900. It
showed the Office as the primary visual, the complete readable actor roster and
native Open-detail controls, and the explicit Channy text retaining its
non-actor/no-authority/no-workflow meaning. The review-only capture was 998718
bytes with SHA-256
`6cd93c83feffdee23fb9dcd871b6cc905f87b01a79ff10090c093d970700ffcd`;
it was removed after inspection and was not added as a baseline.

### LOW evidence/as-built mismatch

`tests/e2e/living-pixel-office.spec.ts:35-45` mounts at initial 200% and calls
only `assertRosterEquivalentMode`, then resets root text to normal. The drawer
operation helper is not called until lines 83-94, after the test changes from
normal back to 200%. Thus the later reactive high-text path is covered, but
operation from the initial-high mount is not.

The statements that “browser tests prove initial-200% keyboard activation” at
`docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:429`
and
`docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md:183`
overclaim the committed test. The real behavior works under direct Sentinel
reproduction, so this is an evidence/documentation mismatch, not a product
regression.

Routine closure: invoke the same `assertHighTextRosterDrawer` operation before
the initial state is reset, or narrow the as-built claims to the reactive path.
The former supplies the exact missing regression proof without changing product
scope.

## 4. A5-2 — named attacks close, but exact value and trigger gates false-pass

### What closed

The new expected set is independently sourced from the production frame:

- `production-pixel-world-scene.tsx` publishes `data-office-actor-ids` from the
  visible frame actor ids;
- `tests/e2e/living-pixel-office.spec.ts:328-342` and `:466-477` read that
  authoritative set rather than deriving it from labels or roster rows under
  test;
- the normal predicate at lines 334-383 requires exact set equality, one
  positive-area intersecting label per id, the exact nine unique field keys,
  the exact seven source-bearing keys with non-empty source attributes, Team,
  and the Office coverage bound;
- the same predicate rejects exactly-one-hidden while coverage alone remains
  within bound, wrong unique label id, duplicated/missing key, empty source, and
  all labels off-viewport, then passes after restoration (`:385-455`);
- the roster predicate requires exact authoritative row ids, non-empty role and
  name, the exact seven unique fact keys, non-empty source attributes, and at
  least one trigger (`:472-491`); its wrong-row-id, empty-name, empty-role,
  empty-source, and duplicate-key challenges all fail and the restored DOM
  passes (`:493-556`).

All of those committed attacks were independently reproduced against the real
composed DOM. The normal predicate returned `true → false` for each named
mutation → `true` after restoration, with normal label union coverage
16.075268817204304%. The roster predicate likewise returned `true → false` for
each named roster mutation → `true` after restoration.

### MEDIUM blocking false-pass — “non-empty value” checks include label/source text

The normal predicate's value condition at
`tests/e2e/living-pixel-office.spec.ts:348-355` is
`cell.textContent.trim().length > 0`. Each sourced cell also contains its field
label and `<small>` source code, so that condition is true even when the actual
fact value is empty. The roster predicate has the same defect at lines 478-489:
each cell still contains its field label and full `<small>` source label after
the fact value is removed.

Focused real-DOM reproduction, applying each mutation and restoring it before
the next:

1. change the production label's visible Effort value to empty while retaining
   its `Effort:` label, exact key, source attribute, and source `<small>`;
2. evaluate the exact shipped normal predicate: `valid=true`;
3. change the first roster row's visible Effort value to empty while retaining
   its label, key, source attribute, and full source `<small>`;
4. evaluate the exact shipped roster predicate: `valid=true`.

This directly contradicts A5-2's required “exact seven unique non-empty facts”
and the candidate's “unique non-empty field” assertions at architecture line
430, WorkUnit line 184, contract line 281, and Feature Index line 598. The
authentic unmodified product values are present; the committed gate cannot prove
that property.

### MEDIUM blocking false-pass — trigger existence is not one correctly tied trigger

The roster predicate ends with only
`row.querySelector('[data-actor-roster-trigger]') !== null` at
`tests/e2e/living-pixel-office.spec.ts:489`. It does not require exactly one
trigger or compare the trigger's actor id to the row/authoritative actor id.

Two additional focused real-DOM mutations against that exact predicate both
returned `valid=true`:

1. replace the first row trigger's `data-actor-roster-trigger` with
   `__wrong_trigger__`;
2. restore it, then clone a second trigger into the first row.

The current product source and authentic DOM happen to have exactly one correct
trigger per actor, and direct keyboard operation works. But the required
anti-false-pass evidence does not enforce “one row/trigger per actor” or A5-1's
same-actor tie, and `assertHighTextRosterDrawer` at lines 564-586 operates only
the first trigger while taking the trigger's own attribute as its expected
actor. The test suite can therefore miss a wrong-row mapping or duplicate on
other rows.

Routine closure:

1. expose/extract each fact's actual value independently from its label/source
   text, require it to trim non-empty in both shared predicates, and add
   empty-label-value plus empty-roster-value mutations against those same
   predicates;
2. require exactly one roster trigger per row and exact equality between its
   `data-actor-roster-trigger`, row id, and authoritative actor id; add
   wrong-trigger-id and duplicate-trigger mutations against the same predicate;
3. retain every existing named negative and restored-authentic re-proof.

No product authority, data source, drawer, or visual change is needed.

## 5. A5-3 — exact source proof closed

Production source remains exact: every compact fact renders the full
`PIXEL_ACTOR_FACT_SOURCE_LABELS[fact.source]` label in the roster, and
`actorLabelAccessibleName` uses the same canonical table for Team, session
process, AI identity, model, effort, AI runtime, and operational state.

`tests/ui/actor-summary.test.tsx:143-166` now constructs each exact expected
phrase from the actual fact value and canonical source-label table, requires the
accessible name to contain it, then replaces that complete phrase with `SRC.`
and verifies that the exact phrase is absent. The exact positive assertion is
load-bearing: replacing an authentic source with generic `source X.` or any
abbreviation fails before the negative step. This closes the prior generic-regex
false pass. Code, current authentic DOM, and the A5-3 as-built statement agree.

## 6. Affected tests, pixels, and regression boundaries

Independent commands and outcomes:

| Command / evidence | Outcome |
|---|---|
| `npm test -- --run tests/ui/actor-summary.test.tsx tests/ui/pixel-actor-overlay.test.tsx tests/ui/pixel-world-semantic-parity.test.tsx` | PASS: 3 files, 12 tests. |
| `npx playwright test --config playwright.batch-a-living-office.config.ts` | PASS: 3/3 on the real composed strict-CSP loopback surface, including desktop, mobile, and reduced/static routes. The suite does not contain the four false-pass attacks in §4 and does not operate the drawer before the initial-high reset. |
| targeted ESLint on the three affected source files and two affected test files | PASS. |
| `npm run typecheck` | PASS. |
| fresh initial-200% and normal→high production operation | Same-actor 17-field drawer, Enter/Escape/Close, and focus restoration passed as described in §3. |
| focused same-predicate DOM attacks | Existing named challenges failed and restored correctly; the four additional exactness attacks in §4 all false-passed. |
| fresh unmasked initial-200% visual inspection | Readable complete roster and native controls; Office remains primary; zero partial canvas labels; Channy meaning remains non-actor/non-authority/non-workflow. |

Delta-first scope was retained. The broader Worker totals were not repeated
because no changed dependency/config/baseline or concrete broad regression
signal exists. The directly affected unit and real Living Office surfaces were
reproduced instead.

Preserved boundaries confirmed from the exact diff and affected tests:

- no package/lockfile, Playwright/Vite configuration, auth, server, CSP,
  dependency, baseline, or snapshot changes;
- no Grok-origin asset or implementation reuse;
- normal-scale production labels, connectors, Office-primary coverage, Team
  first layer, mobile roster, static/reduced path, forced-colors Axe coverage,
  and screen-reader mirror remain exercised;
- no new work/authority/assignment inference and no security/identity contract
  broadening;
- no Batch B implementation, approval, merge, or deploy action.

The Worker report is accurate about the authentic A5-1 implementation, exact
source phrases, candidate state, test totals, unchanged baselines/config, and
preserved product boundaries. Its claims that the committed predicates enforce
non-empty values/one correctly tied trigger and that the browser suite proves
initial-high drawer operation are not accurate for the shipped tests.

## 7. Classification and routing

| Finding | Classification | Routine patchable? | Route |
|---|---|---:|---|
| Initial-200% browser-proof overclaim | `EVIDENCE_AND_DOCUMENTATION` / LOW | Yes | Same Worker, then same Sentinel session. |
| Empty actual fact values false-pass label/roster predicates | `TEST_AND_EVIDENCE` / MEDIUM | Yes | Same Worker, then same Sentinel session. |
| Wrong-id or duplicate roster triggers false-pass exact predicate | `TEST_AND_EVIDENCE` / MEDIUM | Yes | Same Worker, then same Sentinel session. |

These corrections are closed-scope and do not require Leo/GPT risk acceptance.
Advisor should issue an exact bounded Worker correction for the affected E2E and
as-built statements, then return only that delta to this same independent
Sentinel session.

## 8. Final verdict

`NEEDS_PATCH`

A5-1's actual production drawer/focus defect and A5-3's exact source proof are
closed. A5-2 remains blocking because its exact committed predicates
deterministically accept empty actual fact values and incorrect/duplicate roster
triggers. The initial-high browser-proof claim also needs routine reconciliation.
No final approval is granted.
