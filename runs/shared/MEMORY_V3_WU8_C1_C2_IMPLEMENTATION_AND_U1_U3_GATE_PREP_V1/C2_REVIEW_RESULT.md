# WU8-C2 — Independent Implementation Review Result

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-C2-IMPLEMENTATION-REVIEW-001
REVIEW_PASS: FULL_IMPLEMENTATION_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: PASS
SUBJECT: Cosmile shadow/m4-cosmile-memory ad172db..b8b61d7 (1 commit, exactly 4 new paths)
BLOCKING_FINDINGS: 0
OBSERVATIONS (non-blocking, for the future C3 handoff): C2-N1, C2-N2
```

## 0. Live runtime, skill, independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window_id=@5 pane_id=%5`.
  **ACTUAL_MODEL: claude-fable-5** (Fable 5 family as required; live). **EFFORT: max**
  (live `CLAUDE_EFFORT=max`). SKILL: `/fable-sentinel`. Serialized: sole active Reviewer
  dispatch, after the C1 review completed.
- Independence: candidate authored by the Cosmile Worker (Opus 4.8, `/fable-builder` per
  its result at `5a9771a`); this session wrote no subject byte, staged/committed/pushed
  nothing, dispatched no actor, spawned no agent; Worker/Advisor prose was verified
  against the committed candidate and by reproduction, not trusted.

## 1. Base gate, ancestry, containment — VERIFIED

- **C1 PASS HEAD gate satisfied**: origin/shadow/m4-cosmile-memory = `ad172db…` (the
  exact C1 HEAD this session PASSed, now pushed and upstream-equal); candidate
  `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` is exactly one commit with parent
  `ad172db` — no intervening tracked drift or unreviewed commit; local `ahead 1`,
  **not pushed**, matching the handoff's expected state.
- `git diff --name-status ad172db..b8b61d7` = exactly the four authorized paths, all
  **new** files (types, lib, two vitest suites) — therefore **zero existing M2 file
  modified** (the M2 suites run byte-identical). Working tree clean; the six known
  untracked docs byte-untouched. FOUNDATION `33570b9`, SIASIU `e1830b4`,
  foundation-control `c89b792` re-verified unchanged with zero tracked drift.
- Required reads performed: Founder record @`691a2d0`, Manifest @`006ef91`, corrected
  design @`08dc39d` (SHA-256 re-verified `2213262a…` in this mission), Worker result +
  Advisor validation @`5a9771a`, operating model/reviewer role/Cosmile AGENTS+CLAUDE
  (this session, from disk).

## 2. Contract fidelity — letter-verified against design §3.1 / §3.4 / §4 and pinned source

- **§3.1 carrier**: `ENVELOPE_KEY_SHAPE` letter-matches the actual pinned
  `CommerceEvidenceEnvelope` (all 10 top-level keys and every nested key set — source 5,
  actor 4, purchase 4, feedback 4, consent 4, privacy 3 incl. `retention_class`,
  lineage 5 — compared field-for-field). `projectCarrier` enforces exact-key closure at
  every nesting level, the schema-version literal, identity `JSON.stringify` of the same
  object, UTF-8 `Buffer.byteLength` with the 32,768 ceiling (`payload_too_large`), and
  **never recomputes, substitutes, or repairs `source_hash`** (proved by the
  verbatim-wrong-hash property test). Structural or digest-relevant deviation is poison
  `payload_malformed`.
- **§3.4 acknowledgement**: `DELIVERY_ACK_CONTRACT_VERSION` is the exact literal
  `foundation.commerce_evidence_delivery_ack.v1`; the five outcomes, three dispositions,
  `cannot_determine`-only retryable reason, and the guarded-C set (imported from the
  existing 18-code `FOUNDATION_C_REASON_CODES`, counted 18 at the pin) are all
  letter-exact. `interpretAck` requires exactly the four contract keys, validates the
  closed outcome×reason×disposition matrix, and maps every malformed/unknown/extra-key/
  wrong-version input to `ack_malformed` — retries, never acknowledges; no permissive
  default exists. `ackEffect` reproduces the §3.4 final-action column exactly.
- **§4.1 state machine**: the eight states, four no-outgoing terminals, and the
  `TRANSITIONS` matrix are letter-identical to the design's transition listing
  (including `leased → ready` for crash/lease-expiry). `GENERIC_STATUS_BY_STATE` is the
  exact §4.1 mapping — consistent with the C1 database constraint this session verified.
- **§4.2 claim/lease/CAS/retry**: `claim` allows only ready/retry_wait, enforces
  retry-due time, no-overtake (`earlierRootRowUnfinished`), per-root single lease, and
  sets `leased`/attempt+1/version+1/expiry `now+30s`. `reapExpiredLease` returns an
  expired lease to ready without attempt change. `retryDelayMs` is the exact
  `[1,2,4,8]s` base plus injected jitter clamped to `[0,250]ms`; the 5th failure returns
  null → dead letter — attempt arithmetic traced end-to-end (5 claims → attemptCount 5 →
  exhaustion). `applyAck` is a strict compare-and-set: mutation only when still leased at
  the recorded lease version and unexpired; stale/late/not-leased never mutate — the
  design's late-ack/redelivery-as-exact-replay semantics.
- **§4.1 retraction (DR-1-corrected semantics)**: `retractionEffect` blocks only
  **earlier** unfinished rows, keeps **the retraction row itself deliverable**, and
  leaves acknowledged predecessors untouched — exactly the corrected design clause this
  session required and delta-PASSed; the contract test pins the full five-row scenario.
- **§4.3/§4.4 limits/DLQ**: `DELIVERY_LIMITS` is the exact frozen constant set
  (5/30 000/4/1/20/10/20/1 000/32 768); depth admission blocks at 1 000 with
  `backpressure`; `canLease` enforces 4/1; `containmentDecision` requires exact-`true`
  flag + consent + eligible class + no backpressure, else `blocked` (the §4.1
  contained→ready gate). `DlqObservationV1`/`buildDlqObservation` produce exactly the
  seven §4.4 fields with `count: 1` — category-only by construction, no identifier/hash/
  payload input even exists in the signature.
- **Purity**: token sweep of both source files is empty for
  fetch/axios/http/prisma/fs/net/child_process/process.env/Date.now/Math.random/
  setTimeout/setInterval/require; imports are only the envelope type module and the C2
  types module. No sender, consumer, scheduler, route, endpoint, provider, broker,
  credential, flag activation, or delivery exists anywhere in the diff.

## 3. Independent test execution (reproduced live)

```text
CMD1 npx vitest run wu8_…contract.vitest.ts wu8_…property.vitest.ts → 2 files, 33/33 PASS · EXIT=0   (재현)
CMD2 npx vitest run m2_ab_commerce_evidence + m2_ab_feedback_state  → 2 files, 57/57 PASS · EXIT=0   (재현, suites byte-unchanged)
CMD3 node scripts/m2_ab_no_transport.mjs                            → PASS all containment checks · EXIT=0 (재현)
CMD4 npx tsc --noEmit → 7 errors total, ALL in the pre-existing, untouched
     scripts/foundation-memory-deanon.vitest.ts (the only file prefix in the output);
     ZERO diagnostics in the four subject paths. Not claiming whole-repo typecheck clean.
```

All counts equal the Worker-reported numbers exactly (33 / 57 / clean scan / 7
pre-existing). The tests are meaningful, not reward-hacked: oracles hardcode the frozen
design constants independently of the implementation (exact state/outcome/category
lists, the limits object, backoff array, contract-version literals); adjacent-invalid
probes surround every acceptance; the 75-cell ack cross-product pins **exactly 6**
accepted rows (the five §3.4 combinations, with terminal_rejected exercised under two
guarded categories); byte boundary is probed at 32,768/32,769; extension-map injection
is swept per nesting level and key deletion per top-level key; determinism and input
non-mutation are asserted; and the DLQ output is scanned for forbidden keys and all
opaque-ref prefixes. The Worker's declared tests-after-types ordering deviation did not
weaken any oracle — the assertions constrain the implementation from the design side.

## 4. Criterion coverage (handoff requirements)

Every handoff bullet closes: ancestry/four-path containment (§1); no M2/Foundation/
SIASIU/control modification (§1); carrier preservation without new/renamed fields +
exact keys + UTF-8 ≤ 32,768 + no hash repair (§2); exact ack contract/version/outcomes/
matrix + fail-closed unknown (§2, §3); eight states/closed transitions/terminals/generic
mapping (§2); deterministic claim/lease/version/expiry, per-root ordering, attempt
limits, `[1,2,4,8]s` + bounded injected jitter, attempt-5 exhaustion, stale/late ack
(§2, §3); retraction ordering + backpressure/concurrency + category-only DLQ with zero
leakage (§2, §3); purity (§2); no permissive unknown (§2, §3); tests meaningful (§3);
TypeScript diagnostics scoped honestly (§3 CMD4).

## 5. Observations (non-blocking — route to the future C3 sender handoff)

- **C2-N1.** The design's §4.1 `retry_wait → leased` edge requires "due time + lease
  claim + current flag/consent recheck". The pure `claim` enforces due time and lease
  mechanics; the flag/consent recheck is provided as the separate reusable
  `containmentDecision` primitive rather than embedded in `claim`. That decomposition is
  within C2's pure-contract scope, but the **C3 sender handoff must mandate composing a
  current flag/consent check before every lease/retry claim** (the design's §12.1
  "current-consent loss before every lease/retry" oracle) so the guard cannot be skipped.
- **C2-N2.** Per-root ordering uses strict `createdAtMs` comparison; equal-timestamp
  rows within one root would tie (the C1 database index `(…,createdAt,id)` provides the
  total order). The C3 sender should pass DB-ordered rows or extend the tiebreak by `id`
  when composing. No current effect: tests and the producer create distinct timestamps.

## 6. Excluded scope and honest limits

- Proved: pure contract/state-machine fidelity to the pinned design and reproduction of
  all declared tests. Not proved (out of C2 scope by design): any live sending,
  scheduling, wall-clock behavior (clock/jitter injected), Foundation intake, or
  durability — the module is inert until a separately authorized C3 sender exists.
- The 7 pre-existing TypeScript errors in `foundation-memory-deanon.vitest.ts` predate
  this range (the file is untouched by it) and are outside this review's subject.
- This PASS is bound to exactly `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`. Any new
  commit is a new candidate requiring the delta loop.

## 7. Verdict rationale

The candidate is exactly the authorized four new paths on exactly the pushed C1 PASS
HEAD; every frozen vocabulary, constant, matrix, mapping, and rule I compared is
letter-identical to the delta-PASSed corrected design — including the DR-1-corrected
retraction semantics and the exact §3.4 acknowledgement matrix validated against the
18-code guarded set at the pin; the module is provably pure; the tests independently pin
the design constants with adversarial adjacent-invalid, boundary, injection, and leak
probes, and I reproduced every suite and the no-transport scan exactly (33/33, 57/57,
clean, subject-path-clean tsc). No forbidden surface, no permissive unknown, no
weakened oracle, no leakage. `PASS`. (`NEEDS_PATCH` has no finding; `PASS_WITH_RISK`
would misfile the two composition observations that bind a future WorkUnit, not this
one; `FAIL` has no basis.)

**This PASS is an independent implementation-review verdict for WU8-C2 only. Per the
Manifest: the Advisor may now push exactly `b8b61d7` and verify upstream equality. It is
not final product approval; no sender/delivery/intake exists or is authorized; U1/U2/U3
remain OPEN; the Gate Package review follows in serialized order; no later WorkUnit
starts automatically.**

```text
VERDICT: PASS
SUBJECT_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6 (parent = pushed C1 PASS HEAD ad172db; 4 new paths; NOT pushed)
TEST_EVIDENCE (재현): C2 suites 33/33 EXIT=0 · M2 A/B suites 57/57 EXIT=0 (byte-unchanged) ·
  no-transport scan PASS EXIT=0 · tsc: 0 diagnostics in subject paths (7 pre-existing in one untouched file)
CONTRACT_FIDELITY: key shape, ack matrix, 8-state transitions, limits, backoff/jitter, CAS, retraction (DR-1-corrected),
  DLQ shape — all letter-exact vs design 08dc39d (SHA-256 2213262a…)
PURITY: zero I/O/DB/network/timer/random/env tokens; type-only imports
BLOCKING_FINDINGS: none · OBSERVATIONS: C2-N1, C2-N2 (bind the future C3 handoff)
PRODUCT_WRITE_BY_REVIEWER / STAGE_COMMIT_PUSH / DISPATCH / NEW_AGENT: ZERO
OTHER_BASELINES: FOUNDATION 33570b9 · SIASIU e1830b4 · control c89b792 (unchanged, zero tracked drift)
U1_STATUS: OPEN · U2_STATUS: OPEN · U3_STATUS: OPEN
WU8_F1_F2_F3_C3_X1 / FULL_PACKAGE_1B / M3: NOT_AUTHORIZED
ACTUAL_MODEL: claude-fable-5 (live) · EFFORT: max (live env) · SKILL: /fable-sentinel
NEXT: foundation-advisor — push exactly b8b61d7 + upstream equality; then serialized Gate Package review
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
