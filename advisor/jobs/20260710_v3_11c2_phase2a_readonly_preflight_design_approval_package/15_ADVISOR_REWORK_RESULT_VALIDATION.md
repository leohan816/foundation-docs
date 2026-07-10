# Advisor Rework Result Validation

Date: 2026-07-10

Advisor verdict: `VALIDATED_FOR_SAME_SESSION_FABLE5_REREVIEW`

Phase 2A execution status: `NOT_APPROVED`

## Evidence Inspected Directly

- Cosmile rework commit: `453b6c94b6c72a19f0e5ea7848928be25583d4c6`.
- foundation-docs result commit: `415436b6f752fbbee488a043d6b57efc0cb7b49b`.
- Actual diff from Cosmile `9e9ad28` to `453b6c9`.
- Repo-local plan, canonical mirror, Worker rework result, and result pointer.
- Original Fable5 `NEEDS_PATCH` result and Advisor finding classification.
- The three tracked migration files used for expected checksum constants.
- Cosmile branch, upstream delta, staged state, and working-tree scope.

## Validation Results

| Check | Result |
|---|---|
| Rework changed only the repo-local execution-plan Markdown file in Cosmile | PASS |
| Cosmile HEAD is `453b6c9`, equals upstream, and staged files are empty | PASS |
| Six pre-existing unrelated untracked `app/docs/**` files remain uncommitted | PASS |
| foundation-docs commit contains only mirror, rework result, and pointer | PASS |
| Repo-local plan and foundation-docs mirror are byte-identical | PASS |
| All inspected result/design files are valid UTF-8 | PASS |
| Embedded checksums equal direct SHA-256 results for the three tracked migration files | PASS |
| F-1 exact-name and catalog-shape checks are present | PASS FOR REREVIEW |
| F-2 unexpected migration count is present | PASS FOR REREVIEW |
| F-3 pending/rollback/incomplete/checksum/unknown state mapping is explicit | PASS FOR REREVIEW |
| DB connection, query, migration, permission change, or secret-value access | NOT PERFORMED |
| Runtime source/schema/migration/test/package/flag change | NONE |

## Independent Re-Review Questions

Advisor validation confirms that the requested patch exists; it does not replace
independent design review. The same Fable5 Reviewer session must determine:

1. Whether C-2 proves the exact approved index shape, including whether checking
   `indnkeyatts = 1` without separately checking total attributes leaves any
   included-column shape able to pass.
2. Whether C-3b's complete-ledger comparison detects every unexpected migration
   state without creating a false pass.
3. Whether C-3a's state precedence correctly handles a missing row, rolled-back
   row, unfinished row, checksum mismatch, and unreadable ledger while emitting
   only approved names, booleans, counts, and statuses.
4. Whether the local SHA-256 constants and the documented Prisma checksum
   assumption are sufficiently supported for an execution-approval package.
5. Whether any new ambiguity, contradiction, secret exposure, write path, or
   Phase 2B expansion was introduced by the patch.

The duplicated routine-return sentence in section 12 is editorial and does not
change routing semantics. Fable5 may classify it as non-blocking or require a
same-scope cleanup if clarity is materially affected.

## Routing Decision

Route the patched plan to the **same existing Fable5 Reviewer session** for
`DESIGN_REVIEW` re-review. Do not route to a new reviewer session, Worker, Control,
or GPT strategy session at this point.

