# M2 C WU4 — bounded implementation-design clarification handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-DESIGN-CLARIFICATION-001
ROLE: Foundation Designer
ACTOR_ID: foundation-designer
SESSION: foundation-designer
WINDOW_PANE: @29 / %29
TARGET_PRODUCT_REPOSITORY: /home/leo/Project/FOUNDATION
PRODUCT_REPOSITORY_MODE: READ_ONLY
TARGET_FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
TARGET_FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
DESIGN_SUBJECT_BASELINE: 9ba521e6f34d0f35fcf29009c560873fbced3f13
HANDOFF_AND_LAUNCHER_COMMIT: supplied by Advisor dispatch envelope; current HEAD must equal it
REQUIRED_SKILL: /fable-builder
EFFORT: high
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

`DESIGN_SUBJECT_BASELINE` is the pre-clarification design/evidence state. It is not
the expected dispatch HEAD. The Advisor dispatch envelope supplies the immutable
commit/blob/SHA containing this handoff and launcher; verify current foundation-docs
HEAD equals that commit and that `DESIGN_SUBJECT_BASELINE` is its ancestor.

## 0. Purpose and authority

Perform a narrow same-Designer clarification of the already reviewed C design so
reviewed-design WorkUnit 4 can be implemented without inventing contract literals or
transaction semantics. This is a design-artifact correction only. It grants no
product implementation, policy, runtime, delivery, intake, storage, or activation.

The current reviewed design requires candidate `content_hash` to include
`contract_version`, but does not define its exact literal or include that field in
the two DTO field lists. It also leaves the WU3-slot/WU4-draft handoff insufficiently
exact for an all-or-none one-process ephemeral service: candidate/evidence IDs,
precomputation/adoption, exact replay, and post-ledger failure behavior must be
specified without adding persistence or changing WU3.

This is not a Founder product-policy decision. Preserve all Founder D1-A/D2-A/D3-A
decisions, authorization `c96caef`, reviewed design subject `7cbcb8d9`, design review
PASS `920359eb`, and WU1–WU3 Advisor gates. If clarification would require a new
privacy, identity, consent, safety, legal, retention, product, or storage decision,
return `DESIGN_NOT_READY` and STOP.

## 1. Required reads

Read directly:

- Agent Office operating model and Designer role;
- Founder authorization `c96caef...` and documentation correction `36690ec...`;
- current design file
  `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md`;
- its prior independently reviewed subject at `7cbcb8d9...` and review PASS at
  `920359eb...`, especially C-R4–C-R8 and IR-C-N1–N4;
- WU1–WU3 product code and Advisor gates, with Foundation repository read-only;
- Foundation `AGENTS.md`, `CLAUDE.md`, and design-document index/sync rules.

Apply `/fable-builder` contract mapping and file-first reporting. Do not create an
agent/subagent and do not self-review.

## 2. Exact design questions to close

Patch only existing intent, without expanding it:

1. Define one exact candidate contract-version literal used by both review-only DTOs
   and by the fixed content-hash projection. State why it is the existing design's
   version marker rather than a new product policy.
2. List every field, exact Python type/nullability, enum/literal, and invariant for
   `CommerceOutcomeCandidateV1` and `CommerceAdverseCandidateV1`, including whether
   `contract_version` is a DTO field and the exact representation of
   `retention_expires_at`.
3. Specify the exact pure WU4 planning/mapping API: validated-envelope inputs,
   Foundation decision/lineage inputs, candidate/evidence ID factories and regexes,
   deterministic output ordering, 0/1/2 mapping, correction/retraction behavior,
   skin/other fail-closed behavior, and exception collapse. No producer echo in
   public/service results.
4. Specify the WU3/WU4/WU5 ephemeral adoption sequence so mapping/factory failures
   commit zero ledger state; only the first accepted writer adopts the precomputed
   drafts; rejected/collision/replay paths create/adopt zero new drafts; exact replay
   returns no draft effect; and no candidate ID/content must be persisted by WU3.
   Explain why a process crash cannot leave durable partial state in this one-process
   ephemeral design.
5. Specify the exact current-gate policy projection shape used only for a read-only
   policy check. It must not synthesize `furef_v2`, coerce the unresolved retention
   enum, call a store/API writer, or reinterpret `allow_shadow_write` as write
   authority. State outcome and adverse expected categories.
6. Define exact WU4 test oracles and STOP conditions sufficient for the Foundation
   Worker to implement only `candidates.py` and its dedicated mapping test.

Do not alter the v1 input envelope, 18 reason codes, hash/idempotency algorithms,
gates 0–11, WU3 ledger/lineage behavior, Founder policy, WorkUnit ordering, or WU8
HARD STOP.

## 3. Exact foundation-docs write allowlist

Only these four files may change:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

The first file receives the smallest coherent patch to sections 10, 12, 13, 16, 17,
or 18 only where required. The existing pointer must be updated to the new content
SHA and status `READY_FOR_DELTA_DESIGN_REVIEW`. The new result/pointer explain the
delta and exact evidence. Do not stage, commit, or push; Advisor publishes.

## 4. Product repository prohibitions

Foundation, SIASIU, Cosmile, and foundation-control are read-only. Do not modify
source, tests, canonical product design docs, schema, migration, config, flags,
fixtures, runtime, or Git state. Do not run product tests; static reads only. No DB,
file-backed state, network/provider, secret, environment, delivery, intake, current
MemoryCandidate, store, approval, reuse, promotion, ranking, or safety mutation.

## 5. Completion and return

Completion requires:

- all six questions above have exact, internally consistent answers;
- no new Founder decision or authority is introduced;
- no blank implementation-critical literal/type/transaction boundary remains;
- only the four declared foundation-docs paths changed;
- product repositories remain byte-untouched;
- result and pointer return to Advisor for independent delta design review.

Return only the compact pointer and STOP. WU4 product implementation must not start.
