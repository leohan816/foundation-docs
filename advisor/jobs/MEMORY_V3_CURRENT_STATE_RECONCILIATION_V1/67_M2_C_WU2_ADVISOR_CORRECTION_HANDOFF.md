# M2 C WU2 — Advisor bounded correction handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU2-VERIFIER-VALIDATOR-CORRECTION-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
WINDOW_PANE: @3 / %3
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: a57344680650d5fb22452b94bf92ba4f4a5caa0e
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
REQUIRED_SKILL: /fable-builder
EFFORT: max
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Outcome

Correct only two Advisor findings in the already-pushed WU2 implementation. This
is a bounded same-Worker correction, not a new WorkUnit and not WU3. Preserve all
other WU2 behavior and all WU1 files.

## Required reads

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/worker.md`
- `/home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md`
- `/home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `/home/leo/Project/FOUNDATION/AGENTS.md`
- `/home/leo/Project/FOUNDATION/CLAUDE.md`
- this exact handoff
- WU2 handoff `65_M2_C_WU2_VERIFIER_VALIDATOR_HANDOFF.md`
- canonical design `설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md` §9.2–§9.4
- reviewed design `7cbcb8d9` §4.1, §4.2, §5.1, §5.2, §6.2

Do not execute from memory. The current actual runtime switched from Fable 5 to
Opus 4.8 under the harness safeguard in the same Worker session; record that fact
without treating model brand as actor authority.

## Finding A — Gate 1 base scalar enforcement missing

The canonical WU2 design and WU2 handoff require Gate 1 to perform base scalar
checks before Gate 2. The committed implementation removed that check and now
allows non-contract numeric/other leaves to reach later gates (or hash
recomputation), while the canonical design still states:

```text
base scalar sweep at Gate 1
all numeric and other non-contract leaf types -> invalid_normalization
```

Implement a pure recursive Gate 1 base-decode check with zero global mutable
state. Mappings/lists may be traversed; mapping keys must be strings; allowed
leaves are only `str`, literal `bool`, and `None`; every numeric or other leaf is
`invalid_normalization`. Run it at the exact Gate 1 position already documented,
before raw/PII Gate 2. Do not alter the canonical design text to weaken this rule.

Update tests so they prove:

- numeric leaves, including int/float and bool-vs-int adjacency, fail at Gate 1;
- a numeric leaf plus a raw/PII or extra-key defect still returns
  `invalid_normalization` because Gate 1 wins;
- valid literal booleans remain accepted where the contract permits them;
- the existing raw/PII precedence over extra-key expansion remains intact;
- no source-hash or verifier call occurs after a Gate 1 scalar failure.

Where an existing WU2 test incorrectly expected a later field-specific code for a
numeric wrong type, correct that test to the Gate 1 contract. This is contract
alignment, not oracle weakening.

## Finding B — untrusted consent status can escape the enum

`_consent_category` accepts any string carried by `ConsentVerdict.status`. An
unknown value can therefore appear in `ValidationResultV1.consent_status`, which
violates the category-only/no-diagnostic boundary. Validate status membership
against the exact consent enum. Unknown values and invalid return shapes collapse
to the literal `ERROR`; their primary reason remains `consent_missing`.

Add a test proving a synthetic unknown status returns:

```text
primary_reason_code: consent_missing
consent_status: ERROR
```

and that the untrusted status string is absent from `repr(result)`.

## Exact product write allowlist

Only these two product paths may change:

```text
foundation/shared_memory/commerce_evidence/validator.py
foundation/shared_memory/tests/test_commerce_evidence_validator.py
```

Do not modify the design document, README, verifier module, WU1 code/tests/fixture,
package init, any other source/test, or either pre-existing untracked intake file.

## foundation-docs write allowlist

Update only the already-declared WU2 evidence files to describe the correction and
new resulting head truthfully:

```text
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT_POINTER.md
```

The existing design mirror must remain byte-identical; do not change it. Do not
stage, commit, or push foundation-docs.

## Delta verification and commit

At live `max` effort:

1. run the WU2 validator suite (the changed test subject);
2. run the WU2 verifier suite only as a narrow seam-integration check;
3. do not rerun WU1 suites because neither dependency changed;
4. verify the delta from `a573446...` is exactly the two allowlisted files;
5. prove canonical design/mirror bytes remain equal and untouched;
6. prove the two pre-existing untracked intake files remain untouched/unstaged;
7. explicitly stage only the two allowlisted product paths;
8. commit a follow-up correction (do not amend) and non-force push only to the
   exact shadow branch;
9. update the result/pointer with both the original WU2 commit and correction head.

## Forbidden

No WU3–WU8, gate 0 or 9–11, ledger, lineage state, candidate, service, runtime
import, endpoint, transport, DB, network, provider, secret, env, feature flag,
production/live, protected branch, new dependency, new agent/subagent, Reviewer
dispatch, or foundation-docs commit/push.

Return the compact pointer to `foundation-advisor` and STOP.
