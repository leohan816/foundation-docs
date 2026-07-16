# Memory V3 M2 C WU5 — bounded design clarification result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-DESIGN-CLARIFICATION-001
ROLE: Foundation Designer
ROLE_MODE: BOUNDED_IMPLEMENTATION_DESIGN_CLARIFICATION
ACTOR_ID: foundation-designer
SESSION: foundation-designer
WINDOW_PANE: @29 / %29
ACTUAL_CWD: /home/leo/Project/FOUNDATION
ACTUAL_MODEL_EFFORT: gpt-5.6-sol / high
RESPONSIBLE_ADVISOR: foundation-advisor
REQUIRED_SKILL_APPLIED: /fable-builder
RESULT_STATUS: READY_FOR_DELTA_DESIGN_REVIEW
IMPLEMENTATION_AUTHORITY: NONE
STOP_AFTER_RETURN: true
```

## Outcome

The main implementation-ready design now closes all nine WU5 implementation
questions against the landed WU1–WU4 interfaces. It adds no Founder policy, changes
no v1 envelope/hash/reason/gate/WU1–WU4 behavior, and grants no WU5 implementation or
WU6–WU8 authority. The patched design SHA-256 is:

```text
3dcc600848e61647f068848f616452043bfbc739b78697326373876d39a61821
```

## Exact clarification delta

1. **Types and signatures:** section 11.4 fixes Python 3.7 `NamedTuple` field order,
   literals, private constructors, audit/metric records and sinks, the one
   `CommerceEvidenceShadowService` constructor, and its single in-process
   `evaluate` method. No endpoint, singleton, consumer, or runtime import exists.
2. **Injections and defaults:** section 11.5 names every injected dependency and
   landed/local default. UNCONFIGURED verifiers accept zero; malformed values and
   exceptions fail closed; no default reads environment, secret, DB, file, network,
   provider, or runtime configuration.
3. **Flags:** section 11.6 fixes
   `commerce_evidence_c_shadow=False` and the hard-off live, intake, and candidate-
   runtime names. OFF returns before parsing/ID/clock/verifiers/WU3/WU4/sinks, and
   the shadow flag is re-read by WU3's commit guard. No environment activation or
   setter is added.
4. **Reason integration:** shared `reason_codes.code` preserves the current dynamic
   set, then delegates to the landed exact 18-code C guard inside one exception
   boundary. Unknown, unhashable, exception-bearing, typo, and service-health values
   collapse to the existing `cannot_determine`; there is no nineteenth C code.
5. **Ordering and audit honesty:** one service-owned outer `RLock` serializes each
   call and the preallocated health latch. Landed WU3 remains unchanged and its
   commit is not falsely described as audit-atomic. Rejection sink failure preserves
   the rejection; accepted/replay output is released only after audit and metrics.
   A later failure returns category-only `cannot_determine`, poisons the instance,
   and never clears or mutates unrelated ledger evidence.
6. **Decision-ID ownership:** disabled, already-poisoned, and ID-factory-failure
   paths return null; enabled pre-commit and WU3 rejection paths use the current
   Foundation evaluation ID; exact replay uses the original stored WU3 ID; first
   accepted uses the ID stored by WU3; post-ledger failure retains only the
   corresponding Foundation ID and safe category, with null lineage. Producer,
   candidate, and evidence IDs never appear.
7. **Path projections:** section 11.8 fixes response/audit/metric fields and missing-
   field behavior for OFF, poison, ID/clock/validation/WU4 failure, adverse-policy
   UNCONFIGURED, collision, replay, root, correction, retraction, sink failure, and
   unexpected exceptions. Audit and metrics are closed category/low-cardinality
   records with no payload, raw text, PII, diagnostic, exception, stack, credential,
   or producer/candidate identifier.
8. **WU5/WU6 boundary:** WU5 owns exactly `service.py`, `audit.py`, the shared flag
   and reason files, and the two Founder-corrected canonical Korean design-doc paths.
   It owns no test or fixture and runs no product test. WU6 alone later owns three
   exact test modules and one synthetic fixture, with ten deterministic oracle
   groups. Non-mutating WU5 evidence is exact path/diff, AST/literal/call-graph/
   containment inspection and unchanged Git state.
9. **STOP, rollback, and acceptance:** section 13.5 maps every WU5 concern to one
   allowed code/doc surface, non-mutating evidence, and a later WU6 oracle. Any
   WU1–WU4/test edit, new policy/version/reason/gate, persistence/intake/runtime/
   transport/store/activation or seventh path is a STOP. Rollback is source OFF plus
   reviewed forward reversion of WU5-only deltas; it never clears a ledger or removes
   WU1–WU4.

## Two contract-risk resolutions preserved

- Fallible WU4 factory/gate preparation cannot turn an exact replay into a new
  failure. A failed plan still enters unchanged WU3 with empty slots and a literal-
  false commit guard. WU3 therefore decides gate-9 replay/collision and gate-10
  lineage before gate 11; only unseen lineage-valid work becomes
  `cannot_determine`, with zero new effect.
- Clearing the service-owned ledger after post-ledger failure would erase unrelated
  accepted ephemeral receipts, slots, lineage, tombstones, and eligibility. WU5
  instead discards only the current unadopted effect, flips one category-only boolean
  latch under the outer lock, preserves the complete ledger, and fails all later
  calls before WU3 until a fresh in-memory instance/process restart. This needs no
  WU3 edit, durable store, recovery API, or product-policy expansion.

## Contract-to-code and verification boundary

| Closure | Future WU5 surface | WU5 evidence now permitted | Later WU6 proof |
|---|---|---|---|
| response/service and IDs | `service.py` | AST/signature/call graph | types, path matrix, ID ownership |
| minimized audit/metrics | `audit.py` | closed-field/static inventory | allowlist, ordered labels, sink failures |
| flags/reasons | shared flag/reason files | exact set/literal/delegation diff | OFF/recheck/default and safe-code matrix |
| orchestration/containment | `service.py` | no WU1–WU4 diff, no `clear`, forbidden-call scan | replay/lineage ordering and ledger snapshot preservation |
| product-design sync | two canonical Korean docs | exact six-path inventory | containment/legacy regression |

## Direct evidence and honest limits

Verified directly before and after writing:

- live footer: `gpt-5.6-sol high`; actor/session/window/pane/cwd matched dispatch;
- foundation-docs branch
  `advisor/foundation-team-role-alignment-20260714` stayed at
  `00d65f8bd09636ebf57c55ace45e5cc8a7ae4ff3`; design baseline
  `b96bfe4970420730707c2b289c8589998e3b9821` is an ancestor;
- Foundation stayed read-only on `shadow/foundation-shared-memory-v0` at
  `3e6abeec04f370dff1844afc429bd39487149c02`, with only the two pre-existing
  untracked documentation files and porcelain SHA-256
  `4b1f8fb5684199691bfbafc427bc6ad85ba8d9a577b007693eadb901acf7a0f2`;
- only the four handoff-declared foundation-docs result/pointer paths changed;
  `git diff --check` passed.

This artifact proves that WU5 has no implementation-critical design blank against
the pinned landed interfaces. It does not prove implementation correctness, product
test pass, independent delta review, WU5 authorization/gate, WU6 verification,
transport, persistence, intake, candidate runtime, or activation.

```text
PRODUCT_FILE_WRITE: ZERO
PRODUCT_TEST_EXECUTION: ZERO
DB_SECRET_ENV_NETWORK_PROVIDER: ZERO
STAGE_COMMIT_PUSH: ZERO
NEW_AGENT_OR_SUBAGENT: ZERO
NEXT: independent WU5 delta design review through foundation-advisor
RETURN_TO: foundation-advisor
STOP
```
