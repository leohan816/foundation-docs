# Worker Durable Result Contract Correction

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

CORRECTION_CLASS: `RESULT_EVIDENCE_ONLY`

SOURCE_CANDIDATE_COMMIT: `1a4e1e98a0ea07c3f383da3761792298cd807f29`

This is a bounded correction under the existing `09` result-file allowlist.
Do not modify source, tests, configuration, governance, or historical evidence.

## Concrete Gap

The code/test patch is Advisor-accepted for re-review, but the durable pointer
does not use the required active shape from
`docs/agent/RESULT_REPORTING_PROTOCOL.md`. It omits at least
`FOUNDATION_DOCS_COMMIT`, `TARGET_COMMIT`, and `PUSH_STATUS`. The full result
also does not clearly record the Patch 02 resulting source commit and exact
post-push Git state, although the pane return did.

## Required Correction

1. Update only:
   - `artifacts/pre-as1-physical-transport-identity-migration/WORKER_RESULT.md`
   - `artifacts/pre-as1-physical-transport-identity-migration/WORKER_RESULT_POINTER.txt`

2. In the full result, record for Patch 02:
   - source candidate `1a4e1e98a0ea07c3f383da3761792298cd807f29`;
   - patch base `9a7e9444208b613752dc4ab42e23b3cc70cc1516` and mission baseline
     `88c6cbd757ed205eb1aadd68d8ea7629865d5765` as ancestors;
   - exact four changed paths in the Patch 02 source-candidate commit;
   - focused test/typecheck/ESLint/diff-check results already obtained;
   - failed commands for Patch 02, including explicit `none` when none occurred;
   - staged, unstaged, untracked, clean, non-force push, and upstream-equality
     facts for the source candidate;
   - durable result and pointer paths;
   - `FOUNDATION_DOCS_COMMIT: not applicable` because Advisor owns governance;
   - all existing boundary/STOP facts.

3. Replace the pointer with the exact compact field set required by the active
   result protocol. Set `TARGET_COMMIT` to the immutable source candidate
   `1a4e1e98a0ea07c3f383da3761792298cd807f29`. State the source-candidate push
   fact exactly; do not claim that an evidence-only commit contains source
   changes.

4. Commit and non-force push this evidence-only two-file amendment. Return its
   commit hash to Advisor in the pane result. The Advisor will independently
   verify that amendment commit and branch/upstream equality; do not attempt a
   self-referential commit hash inside the files.

## Validation

- `git diff --check` over the two evidence files;
- exact two-path staged diff inspection;
- Git ancestry, clean-state, non-force push, and upstream-equality checks.

Do not rerun tests, typecheck, ESLint, product suites, or prior review. Do not
change the accepted source candidate, send tmux input, activate transport,
start Slack/AS1, merge, or begin another mission. Return to
`agent-office-advisor` and STOP.
