# Advisor Validation - Sentinel Design Delta Re-review

Sentinel verdict: `NEEDS_PATCH`

Result commit: `d4a86ded3fe69d794259d405aad9e726ff4e54c1`

Pointer commit: `f391d1479afb54d771fd699d1d0a4260144ca62e`

Reviewed delta:
`665b2514a0aa78e132556a746f044a16be58be9b..60a5a720ca52ffdc3805318b4c40a61d0199b4b1`

Advisor directly read the result and accepts R1 through R4 as reproducible,
implementation-blocking design defects. They are technically patchable inside
the existing four-document design scope. They require no new Founder product,
authority, security, legal, or Batch B-E decision.

Implementation remains unauthorized until the same independent Sentinel returns
a clean design verdict.

## Required second Control patch

### R1 - unknown is not verified offline

- Add one exact `sessionProcess` unknown sentinel, distinct from verified
  `SESSION_OFFLINE`, `NO_AI_PROCESS`, and `AI_PROCESS_DETECTED`.
- Reserve every positive process/runtime state for exact accepted structured
  evidence. Name the evidence kind, source field, freshness/compatibility rule,
  and conflict behavior.
- Remove attached state as proof of AI readiness. Do not invent a readiness fact
  absent from the current source contract.
- Missing, malformed, expired, conflicting, or unverified evidence must remain
  the appropriate unknown value.

### R2 - non-elevating total operational projection

- Define `PixelOperationalState` as a total function of the current accepted
  activity projector output and compatible structured activity/cue evidence.
- Enumerate every current WorkUnit state and every current `ROLE_ACTIVITIES`
  member, including `DELIVERY`, `READING`, `WRITING_RESULT`, and `RECOVERY`.
- A bare WorkUnit state must not imply working, routing, reviewing, returning,
  blocked, or dependency meaning that current source intentionally withholds.
- Missing, stale, conflicting, expired, or semantically unmappable inputs must
  produce the exact visible unknown state.

### R3 - implementable ownership and join

- Keep stable identity, organization, allowed-token metadata, and manually
  declared facts in the committed static registry.
- Assign changing process/runtime/work facts to exact projection-time sources;
  do not store dynamic `AI_WORKING` or equivalent state in Git registry facts.
- Define one exact join operation and row-presence behavior for registry-only,
  runtime-only, and matching `roleInstanceId` inputs. The prose and operation
  must agree.
- Define mint, validate, normalize, merge, conflict, freshness, and final-frame
  projection order without store-back.
- Correct the broken internal fact-envelope section pointer.

### R4 - closed file proposal

- Enumerate every proposed source, fixture, test, script, documentation, and
  baseline path by exact path. Remove `src/ui/*`, `tests/`, `scripts/ + docs`,
  `fixtures/`, and equivalent open globs.
- Keep the conditional PWA/static-shell path set exact.
- State that any path not enumerated must return to Advisor before editing.
- Preserve the already-closed inherited PWA/renderer failure matrix.

## Preservation rules

The patch must preserve the accepted Office-first direction, secondary views,
eager-shell isolation, auth/authority/security/transport boundaries, symbolic
surfaces, Channy's non-operational role, rollback, and Batch B-E exclusions.

Control may edit only the same four Agent Office design documents and its own
result/pointer. It must not implement, self-review, start a server, or modify
source, tests, package/config, media, auth, transport, DB, secrets, remote/public
state, or production state.

After the patch, return the exact `60a5a72..<new commit>` delta to the same
`foundation-reviewer-sol` session. A Control closure claim is not evidence of
review closure.
