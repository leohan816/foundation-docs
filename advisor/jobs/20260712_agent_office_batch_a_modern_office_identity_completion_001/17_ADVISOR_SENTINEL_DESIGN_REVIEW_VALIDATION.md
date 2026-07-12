# Advisor Validation - Sentinel Design Review NEEDS_PATCH

Sentinel verdict: `NEEDS_PATCH`

Review result commit: `bd5c2510de31f01b491e8a1e565da5ad52248455`

Pointer commit: `f0f8240d31323bf110ed3a572d0ec5f9d287def2`

Advisor accepts P1 through P4 as evidence-backed, in-scope documentation
defects. No new Founder decision or authority expansion is required.

## Required Control patch

### P1 - exact fail-closed field vocabularies

For each actor fact, define the exact TypeScript-oriented field type, accepted
values, positive evidence requirement, malformed/unverified/offline result, and
one visible fallback. Do not mix generic `UNKNOWN` with field-specific sentinels
without an explicit normalization rule. Placeholder values are forbidden.

### P2 - one owned operational display vocabulary and total mapping

Choose and name the exact display-owner vocabulary from current source. List the
complete enum. Provide a total mapping from every current WorkUnit state and
accepted observable activity/cue to the displayed operational state, including
conflict/stale/unknown fallback and precedence. `e.g.` is forbidden.

### P3 - implementable per-field evidence and registry flow

Define an exact fact-envelope schema with per-field value, source discriminator,
evidence status, and timestamp. Use the exact existing discriminator spellings
or specify an explicit replacement mapping. Define field ownership, static
registry row shape, mint -> validate -> join -> project flow, `roleInstanceId`
join, source precedence, conflict behavior, and facts that must never be stored
in the static registry. Specify the exact compact-summary subset and complete
drawer order/test matrix, including `assignedBy`, `returnsResultTo`, and source.

### P4 - exact source scope and inherited integration matrix

Replace broad source globs with a closed changed-file proposal and an explicit
handoff rule: any additional path returns to Advisor before editing. Include the
conditional same-origin PWA/static-shell paths only when emitted chunk/cache
behavior requires them. Add exact cases for first-online, cached reload,
offline-after-cache, offline-before-pixel-cache DOM fallback, WebGL and Canvas
failure, lazy chunk failure, atlas/hash failure, semantic divergence,
context-loss/restore, user-selected static mode, teardown, and M1 fallback.

Preserve the narrow hashed-asset/cache-version boundary and all auth,
communication, delivery, transport, security, DB/secret/remote/public, and
Batch B-E exclusions.

### Evidence metadata

Correct the stale Control result header that still names Fable5 as the required
design reviewer. Preserve historical references only when clearly historical.

## Re-review contract

Patch only the four existing Agent Office design paths and the Control
result/pointer. Commit and non-force push. Return the exact delta to the same
`foundation-reviewer-sol` session for P1-P4 delta re-review. Implementation
remains unauthorized.

