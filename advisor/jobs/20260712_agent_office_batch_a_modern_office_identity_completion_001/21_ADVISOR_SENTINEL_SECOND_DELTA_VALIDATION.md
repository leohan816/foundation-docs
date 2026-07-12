# Advisor Validation - Sentinel Second Delta NEEDS_PATCH

Sentinel verdict: `NEEDS_PATCH`

- Result commit: `c1715f45c1c8e02545fd7cab792cf2eda8384c7d`
- Pointer commit: `d240af1d0471feb28a5a8446d7e714cf956c7347`
- Reviewed candidate: `77681d9ed5dae3567115082945508f8474308812`

Advisor directly read the exact result and accepts S1, S3, and S4 as
implementation-blocking design defects. R2 is independently `CLOSED` and must
not regress. The remaining defects are technical contract/scope corrections
inside the existing four-document design boundary. They require no new Founder
product, authority, security, legal, or Batch B-E decision.

## Required Control patch

### S1 - exact accepted-evidence input and arbitration

Define one exact TypeScript-oriented local accepted-evidence record contract for
the process/AI facts absent from current runtime projection. It must include:

- schema version and evidence id;
- `roleInstanceId`;
- a closed evidence-kind enum;
- typed value payload per kind;
- provenance discriminator, evidence status, observed/effective time, optional
  expiry, and immutable artifact/evidence reference;
- mission/WorkUnit correlation only where the evidence kind actually requires
  it;
- validation, rejection, deduplication, conflict, stale, expiry, and malformed
  behavior;
- a deterministic total arbitration table for process and AI runtime state.

No positive state may be inferred. Conflicting process facts fail to
`SESSION_PROCESS_UNKNOWN`. The arbitration must define combinations such as
ready + error, work + wait, and process-not-detected + runtime cue. It may use
the existing accepted observable projector for work/wait/error meaning; it must
not create a second work-state truth.

### S3 - preserve the existing runtime work truth

- The existing accepted runtime projection/cue reducer remains the sole owner
  of mission, WorkUnit, activity, and operational display state.
- The committed organization registry remains the owner of stable identity,
  organization, and allowed-token metadata.
- Any separate committed local evidence input is limited to explicit facts the
  current runtime source does not carry, such as process presence/offline,
  attested AI identity/model/effort, ready, or error facts where needed.
- Join those non-duplicating facts into the existing runtime-derived frame by
  `roleInstanceId`; preserve exact registry-only/runtime-only behavior and
  no-store-back.
- Define `STALE` normalization for every field. An explicitly stale fact must
  not render a positive current process, identity, model, effort, ready, work,
  wait, or error claim unless an exact existing contract says otherwise.

### S4 - exact closed file and artifact scope

- Do not defer asset paths to the Worker handoff. Prefer no asset edits: enumerate
  existing code-native assets as read-only reuse and remove them from the Worker
  write allowlist. If any asset edit is truly required, name every exact file in
  the canonical design now.
- Name every permitted new baseline directory exactly after inspecting current
  baseline conventions. Existing historical baseline files remain unchanged
  unless the design names an exact authorized replacement path.
- Replace every wildcard-pattern test reference with exact test paths.
- Replace the abbreviated Worker result and pointer locations with:
  `../foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_RESULT.md`
  and
  `../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/12_WORKER_RESULT_POINTER.md`.
- Any remaining unnamed path must return to Advisor for a design and handoff
  amendment before editing.

## Preservation and route

Preserve closed R2, the accepted Office-first direction, secondary views,
eager-shell isolation, auth/authority/security/transport boundaries, Channy,
accessibility, fallback, rollback, no-Grok/excluded-session rules, and Batch B-E
exclusions.

Patch only the same four Agent Office design documents and the existing Control
result/pointer. No implementation, source/test/package/config/media edit, server
start, self-review, new session, agent, sub-agent, DB, secret, remote/public,
production, or Batch B-E action is allowed.

Return the exact `77681d9..<new commit>` delta to the same independent Sentinel.
Implementation remains unauthorized.
