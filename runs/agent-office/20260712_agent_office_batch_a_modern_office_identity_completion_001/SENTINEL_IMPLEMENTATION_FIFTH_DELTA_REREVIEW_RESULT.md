# Sentinel Implementation Fifth Delta Re-Review — Agent Office Batch A

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

- current Codex process `711307`, started 2026-07-12, remains
  `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh ...`;
- its working directory remains `/home/leo/Project/foundation-reviewer`, in the
  same existing independent Sentinel context that produced the prior finding;
- no role change, temporary session, agent, sub-agent, delegated context, or
  secondary Reviewer was used;
- the exact 07P handoff and `/fable-sentinel` canonical V2, delta-review,
  provenance, classification, and contract rules were read directly before
  review.

Exact reviewed target:

- repository: `/home/leo/Project/agent-office-batch-a-001`;
- branch: `batch-a/modern-office-identity-001`;
- before: `95e493ce61e268d6352b3805692835f4b612a4ff`;
- after: `1e0b5505ae05e6339cc19fb1496a2fb5a36b87e7`;
- the after commit has exactly the stated before commit as its parent;
- exact delta: 7 files, 97 insertions, 17 deletions;
- local HEAD, configured upstream, remote-tracking ref, and direct
  `git ls-remote` all resolved to the exact after commit;
- `git diff --check 95e493c..1e0b550` passed;
- review began and ended with a clean target worktree and no listener.

Directly reviewed evidence included 07P, the prior Sentinel fourth-delta result,
Advisor records 66/67, Worker handoff 09P, Worker sixth-rework result and pointer
23, the exact single-commit diff and all seven changed files, and load-bearing
surrounding production label, roster, authoritative actor-set, drawer/focus, and
E2E source. Worker and Advisor summaries were treated as claims until actual
source or direct reproduction supported them.

No Agent Office source, test, media, configuration, dependency, baseline, or Git
state was patched.

## 2. Delta closure summary

| Finding | Status | Severity | Direct conclusion |
|---|---|---:|---|
| A6-1 initial-200% exact operation | `CLOSED` | — | The committed test now operates the authentic roster trigger before resetting the initial 200% mount. Actual source and direct production reproduction prove the same actor heading, one 17-field drawer, Enter/Escape/Close, same visible trigger focus, zero partial labels, normal recovery, and the retained normal→high focus path. |
| A6-2 actual value exactness | `PARTIAL__BLOCKING` | MEDIUM | The prior empty-label-value and empty-roster-value attacks now fail the same predicates and restoration passes. But both predicates globally count seven non-empty marker nodes without requiring one correctly keyed, rendered marker in each exact fact cell. Hiding one actual value, or removing one value and supplying a hidden duplicate marker under another fact, still returns `valid=true` for both labels and roster. |
| A6-3 trigger binding exactness | `CLOSED` | — | Every row requires exactly one trigger whose actor id equals its row id and belongs to the independent authoritative actor set. The prior wrong-trigger-id and duplicate-trigger attacks now fail the same predicate and restoration passes. |
| Directly affected regressions/boundaries | `PRESERVED_EXCEPT_A6_2_EVIDENCE` | — | Authentic pixels/values, drawer state, normal/high/mobile/static/forced-colors semantics, Channy meaning, strict CSP, authority/security boundaries, and Batch B exclusion remain preserved. |

The exact four prior attacks are closed. A6-2 nevertheless remains blocking
because 07P explicitly requires inspection of hidden/missing marker alternate
false passes, and both named alternate classes reproduce against the same current
predicates. This is a routine test/evidence/as-built correction inside the
already approved scope; the authentic product DOM is correct. `FAIL` and risk
acceptance are not warranted.

## 3. A6-1 — initial-200% operation closed

The evidence mismatch from the prior review is corrected in committed source:

- `tests/e2e/living-pixel-office.spec.ts:35-46` sets 200% before login, observes
  the initial roster-equivalent state, and calls `assertHighTextRosterDrawer`
  while that initial-high state is still active;
- only afterward does line 48 reset root text to normal;
- lines 50-73 exercise the normal production surface and re-prove the exact
  all-label predicate after the reset;
- lines 86-100 retain the later high-text checks and the separate normal→high
  same-actor focus proof;
- lines 615-641 bind the trigger/drawer by actor id, compare the drawer heading
  to that actor's stable roster name, require exactly 17 fact rows and one visible
  dialog, prove zero visible canvas labels, and exercise both Escape and Close
  with focus returned to the invoking trigger.

Direct reproduction against the real composed production surface from a fresh
initial-200% login found:

- `roster-equivalent`, 0 visible canvas labels, 8 authoritative actor ids, 8
  roster rows, and trigger counts `[1,1,1,1,1,1,1,1]`;
- every trigger id equalled its row id;
- Enter on `foundation-advisor` opened exactly one dialog with heading
  `Foundation Advisor` and 17 `[data-actor-fact]` rows;
- Escape closed it and left focus on the same
  `BUTTON[data-actor-roster-trigger="foundation-advisor"]`;
- reopening with Enter and activating Close produced the same focus result;
- a separate normal-label → 200% → Escape path restored to that same actor's
  roster trigger, not `BODY` or another actor.

Fresh unmasked 1440x900 initial-high pixels were inspected at the top Office
viewport and at the roster. The Office remains primary, zero partial canvas
labels are shown, first-layer facts and Open-detail buttons remain readable, and
Channy retains explicit non-actor/no-authority/no-workflow meaning. The top
viewport was 332675 bytes / SHA-256
`88104ff05216a0462acb9aa3f63bb4a499728caad27597509c7509d2b0568b91`,
byte-identical to the prior accepted review capture; the roster viewport was
249373 bytes / SHA-256
`f55e732c6907c86ee64b942fa9f439e864d1a3864d43dfcafde5190d298efc21`.
Both were review-only artifacts and were removed.

The A6-1 claims at architecture line 437 and WorkUnit line 191 now match the
committed evidence. A6-1 is closed.

## 4. A6-2 — prior empty-value attacks close; hidden/missing-marker false passes remain

### What closed

Production now makes the actual compact values independently addressable:

- `src/ui/pixel/living-office-actor-overlay.tsx:400-405` wraps each sourced
  compact-label value in `data-actor-fact-value={key}`, separate from the visible
  field label and compact source text;
- `src/ui/pixel/living-office-semantic-mirror.tsx:87-93` uses the corresponding
  marker in each roster fact, separate from its label and full source text.

The normal predicate at
`tests/e2e/living-pixel-office.spec.ts:366-370` and roster predicate at
`:499-501` each require seven selected marker nodes with non-empty trimmed text.
The committed empty-value challenges at lines 426-433 and 560-566 mutate the
actual marker text, run the same predicate, restore it, and are asserted at
`:467` and `:604`.

The exact two prior attacks were reapplied to the current real DOM:

| Same-predicate state | Normal label | Roster |
|---|---:|---:|
| authentic positive | `valid=true` | `valid=true` |
| one actual marker value emptied, label/key/source retained | `valid=false` | `valid=false` |
| authentic restored | `valid=true` | `valid=true` |

Thus the specific total-cell-text false pass from A5-2 is closed.

### Blocking alternate false pass — hidden actual values still count as complete

Both predicates select every descendant `[data-actor-fact-value]` and check only
the global count and `textContent`. They do not reject `hidden`, computed
`display:none`, or another non-rendered marker. Directly adding `hidden` to one
authentic actual-value marker, while retaining its key and text, produced:

- normal label predicate: `valuesOk=true`, `valid=true`;
- roster predicate: `rowsOk=true`, `valid=true`.

The actual value is no longer visible (and `hidden` removes it from the
accessibility tree), while the label and source remain, reproducing the same
user-visible omission class that the exact value gate is intended to reject.

### Blocking alternate false pass — missing value plus hidden duplicate preserves count

The predicates also do not require one marker inside each exact keyed fact cell
or inspect the marker's key. A second direct mutation:

1. removed the first fact's actual-value node entirely, leaving that field's
   label, keyed cell, source attribute, and source text;
2. cloned another fact's non-empty value marker under its existing fact and made
   the clone hidden, keeping the total marker count at seven;
3. evaluated the exact current predicate, removed the clone, restored the
   original node, and re-evaluated.

Results for both normal label and roster were:

- challenged DOM: `valuesOk/rowsOk=true`, `valid=true`;
- restored authentic DOM: `valid=true`.

This is a deterministic same-predicate false pass, not an inference. Simple
six/eight marker counts are rejected, but a missing fact value can be masked by a
duplicate elsewhere because neither exact marker-key equality nor one-per-cell
binding is enforced. It directly answers 07P's required hidden/missing-marker
challenge and contradicts the “each actual value” exactness claims at
`tests/e2e/living-pixel-office.spec.ts:457,596`, architecture line 438, WorkUnit
line 192, contract line 282, Feature Index line 600, and the Worker result.

Classification: `TEST_AND_EVIDENCE`, MEDIUM, routine patchable. The authentic
production markup is correct and no product visual/data change is required.

Routine closure:

1. for each exact sourced fact cell, require exactly one descendant value marker
   whose `data-actor-fact-value` equals that cell's expected fact key;
2. require that marker's own trimmed value to be non-empty and rendered/not
   hidden, rather than globally counting any seven descendant markers;
3. add same-predicate hidden-value and missing-value-plus-duplicate-marker
   mutations for both normal labels and roster, then restore and re-prove;
4. retain the now-working empty-value attacks and every earlier negative gate.

## 5. A6-3 — exact trigger binding closed

`tests/e2e/living-pixel-office.spec.ts:493-513` combines the independently
published expected actor ids with exact unique row ids. For every row, lines
502-506 require exactly one trigger, exact trigger-id equality to the row id, and
membership of that row id in the authoritative frame-derived set.

The current same-predicate attacks at lines 567-583 alter the trigger id and add
a second trigger in turn. Direct reproduction against the composed production
DOM produced:

| State | Predicate |
|---|---:|
| authentic 8 rows / exact one trigger each | `valid=true` |
| first trigger id changed to `__wrong_trigger_id__` | `valid=false` |
| second trigger cloned into first row | `valid=false` |
| authentic restored | `valid=true` |

Actual source remains the same single product path: the semantic mirror's native
button carries `actor.roleInstanceId`, and the pre-existing callback opens the
overlay's one `selectedActorId` / one drawer state. The delta adds no drawer,
actor store, callback authority, or work inference. A6-3 is closed.

## 6. Affected tests, pixels, and regression boundaries

Independent commands and outcomes:

| Command / evidence | Outcome |
|---|---|
| `npm test -- --run tests/ui/actor-summary.test.tsx tests/ui/pixel-actor-overlay.test.tsx tests/ui/pixel-world-semantic-parity.test.tsx` | PASS: 3 files, 12 tests. |
| `npx playwright test --config playwright.batch-a-living-office.config.ts` | PASS: 3/3 on the real composed strict-CSP loopback surface, including desktop initial-high/normal-transition, mobile, and reduced/static routes. The suite does not contain the hidden/missing-marker attacks above. |
| targeted ESLint on both changed markup files and the changed E2E | PASS. |
| `npm run typecheck` | PASS. |
| direct initial-high / transition browser operation | Exact actor, one 17-field drawer, Enter/Escape/Close and same-actor focus passed. |
| four prior same-predicate attacks | Empty label value, empty roster value, wrong trigger id, and duplicate trigger all returned `valid=false`; restoration returned `true`. |
| required alternate value-marker attacks | Hidden actual value and missing value plus hidden duplicate returned `valid=true` for both label and roster; restoration returned `true`. |

Delta-first scope was retained. Worker reports one stabilized broad gate with
632/632 unit tests, build, composed 3/3, prototype 20/20 byte-identical, demo
43/23, and fail-closed rehearsal. Those unrelated broad suites were not repeated
because the delta changes no dependency/config/baseline and produced no concrete
broad regression signal. The directly affected unit and real Living Office
surfaces were reproduced.

Preserved boundaries confirmed from the exact diff, tests, and pixels:

- exactly seven changed files: two non-visual markup files, one affected E2E,
  and four as-built/index documents;
- no baseline/snapshot, dependency/lockfile, config, auth/server, CSP, Channy,
  render authority, drawer architecture, or Batch B change;
- no `.skip`/`.only`, lint/type suppression, Grok reuse, or weakened security
  boundary;
- normal-scale labels, high-text zero-partial-label state, mobile/static,
  forced-colors/Axe, screen-reader semantics, and normal→high focus remain green;
- no work/authority/assignment inference, main/protected-branch action, merge,
  deploy, approval, or next-mission action.

The Worker report is accurate about candidate Git state, the exact changed-file
list, prior four attacks, initial-high operation, trigger binding, authentic
pixels, and directly reproduced test totals. Its statement that the predicates
prove each exact actual value is incomplete because the hidden/missing-marker
substitutions above still pass. Reported unrelated broad totals were not treated
as independently reproduced.

## 7. Classification and routing

| Finding | Classification | Routine patchable? | Route |
|---|---|---:|---|
| Hidden actual-value marker passes both predicates | `TEST_AND_EVIDENCE` / MEDIUM | Yes | Same Worker, then same Sentinel session. |
| Missing per-fact value masked by hidden duplicate marker | `TEST_AND_EVIDENCE` / MEDIUM | Yes | Same Worker, then same Sentinel session. |

These corrections remain inside the approved evidence/as-built scope and do not
require Control redesign or Leo/GPT risk acceptance. Advisor should route one
exact focused predicate/test correction to the same Worker, then return only that
delta to this same independent Sentinel session.

## 8. Final verdict

`NEEDS_PATCH`

A6-1 and A6-3 are closed, and the original four exact attacks are closed. A6-2
remains blocking because the same value predicates deterministically accept
hidden actual values and a missing per-fact value masked by a hidden duplicate
marker. No final approval is granted.
