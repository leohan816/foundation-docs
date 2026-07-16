# WU8 Implementation-Ready Design — Independent Design Review Result

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
REVIEW_ID: WU8-IMPLEMENTATION-READY-DESIGN-REVIEW-001
REVIEW_PASS: FULL_IMPLEMENTATION_READY_DESIGN_REVIEW (DESIGN_REVIEW class)
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: NEEDS_PATCH
BLOCKING-TO-PASS FINDINGS: DR-1, DR-2 (both bounded, document-level, same-Designer patchable)
RULINGS: 16/16 delivered; 14 VERIFIED clean, 2 VERIFIED-except-named-finding (rulings 7, 8)
INFO NOTES (no action required): DR-N3, DR-N4, DR-N5
```

## 0. Live runtime, skill, independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window_id=@5 pane_id=%5` — matches
  TARGET_ACTOR/SESSION. **ACTUAL_MODEL: claude-fable-5** (live runtime). **EFFORT: max**
  (live `CLAUDE_EFFORT=max`). SKILL: `/fable-sentinel` with the contract-review,
  safety-review, and review-classification references applied.
- Independence: the subject was authored by `foundation-designer` (pointer records
  gpt-5.6-sol / high, session `@29/%29`, live-verified at authoring); the Control
  contract by `foundation-control` (Opus 4.8 / high per its §0); the Founder decision,
  clarification, and handoffs by Advisor/Founder. This session authored none of them.
  (This session performed the upstream WU8 decision-package review and its delta — inputs
  to, not part of, this subject.) Read-only for the subject; wrote only the two declared
  result/pointer files; no stage/commit/push/fetch/branch/dispatch; no agent/subagent; no
  DB/network/secret/env access; no designed component executed or rehearsed.

## 1. Ruling 1 — Authority and subject integrity: VERIFIED

| Pin | Claimed | Reproduced | Match |
|---|---|---|---|
| SUBJECT_COMMIT/BLOB | `3fd7a49` / `726223cbbcfc0c231944edbba5b76acd3fe95f1c` | `git rev-parse 3fd7a49:<path>` identical | ✓ |
| SUBJECT_SHA256 | `08eb26538bed3b0960bd82ba22a4078cbb0a744f247690b388670ef9b903e914` | recomputed identical | ✓ |
| Ancestry | decision → clarification → Control → Designer-handoff → subject | `25ec350` → `47eaf97` → `80dfbe0` → `feabcf4` → `3fd7a49` → HEAD each `--is-ancestor` OK; subject byte-unchanged `3fd7a49..HEAD` | ✓ |
| Subject pointer | STATUS `DESIGN_READY_FOR_INDEPENDENT_REVIEW`; RESULT_SHA256 equals subject pin | read at `3fd7a49` | ✓ |
| Product pins | FOUNDATION `33570b9` · Cosmile `f26fa5c` · control `c89b792` · SIASIU (no pin claimed) | live HEADs identical; SIASIU `e1830b4` | ✓ |

Required reads performed directly: operating model + reviewer role (this session, from
disk), FOUNDATION `AGENTS.md`/`CLAUDE.md`, Cosmile `AGENTS.md`/`CLAUDE.md`, Founder
decision @`25ec350`, clarification @`47eaf97`, Control contract @`80dfbe0` (336 lines,
full), Designer handoff @`feabcf4` (04, full), subject+pointer @`3fd7a49` (965+20 lines,
full), WU7 review @`0d28bc0` (full, this session), prior C design @`4480b55` (via its
byte-pinned constraints quoted in the Control contract and re-verified against landed
source), and pinned FOUNDATION/Cosmile source per §3.

## 2. Rulings 2–3 — Directions and clarification compliance: VERIFIED

- **D8-1-A** preserved: gateway-owned authentication (§2 P3, §3.2); no mechanism selected
  anywhere (drift sweep: mTLS/keys/tokens/certificates appear only inside prohibition
  sentences, subject :161, :620); GATE U1 blocks dependent WorkUnits (F3, C3 "GATED now").
- **D8-2-A** preserved: Cosmile remains authority (§2 P4, §3.3); verification at intake and
  every later eligibility-affecting transition, enumerated (:192-197) and enforced in the
  draft invariants (:472-473); fail-closed on all nine non-GRANTED states (:188-191);
  snapshot never authority (:109-110 carrier, :191, :659-660); D8-2-C explicitly deferred
  (:663-665), not smuggled (GATE U2 :199-202).
- **D8-3-B design-only** preserved: every pipeline element is designed, none built; the
  eight-state source machine, retry/lease/backpressure constants, ack contract, and DLQ
  are paper contracts; zero transport/broker/endpoint selected (§8 "no broker … no claim
  that direct HTTP … is selected").
- **D8-4-A** preserved: stop at durable accepted evidence + review-only drafts (§5.5, §10);
  no `MemoryCandidate`/`SharedMemoryStore`/`furef_v2` use (:680-682); false effect flags
  literal (:685-689).
- **D8-5-A** preserved: adverse policy constant `UNCONFIGURED`, skin/other rejected with
  zero records/drafts (:691-693); guest/anonymous/linking rejected (:694); U5/U6 gated.
- **Clarification compliance**: implementation-ready exactly for the authorized six areas
  (application contracts §3; delivery semantics §4; durable logical model §5; schema/
  migration plan §7; local/non-prod topology §8; rollback §11 + verification strategy §12;
  future WorkUnits §14); performs/authorizes none of them (header + §16 STOP block);
  Security-authentication readiness explicitly NOT claimed (:157-163, header line 14);
  Designer defined only the permitted principal/verdict/bindings/failure-states/gates.

## 3. Ruling 15 — Source truth: 20 direct reproductions this pass, zero drift

All at FOUNDATION `33570b9` / Cosmile `f26fa5c` git blobs (17 prior reproductions from
this session's decision-package review at the identical pins remain valid: flags,
verifier defaults/enums, 17-field contract + furef_v2, retention tuple, RLock ledger,
lineage_broken, unkeyed hash sentinel, guest rejection, identified-only envelope,
revocation-no-enqueue, producer-only outbox, consult-plane existence, six-uniqueness count).

| # | Design claim | Direct evidence |
|---|---|---|
| S1 | Outbox model fields incl. `status` default pending, `sentAt`, `errorMessage`, evidence-only columns, `queueExpiresAt` | `schema.prisma` model `FoundationSignalOutbox` (:198-236) |
| S2 | "Prisma 6.19.3 with PostgreSQL migrations under app/prisma/migrations" (:571-573) | `package.json` `"prisma": "^6.19.3"`; migrations dir with `00000000000000_init_postgres` … `20260715120000_m2_ab_…` |
| S3 | `FSO_evidence_row_chk` exists to be replaced (:594) | present in m2_ab `migration.sql` and `down.sql` (down.sql pattern precedent ✓) |
| S4 | `evidence_type` enum purchase_feedback/correction/retraction (:371) | `EVIDENCE_TYPES = ["purchase_feedback","correction","retraction"]` (commerceEvidence.ts:15) — letter-exact |
| S5 | Retention literals | `RETENTION_CLASSES = ["feedback_non_adverse_90d","adverse_regulatory_hold"]` (:18); `RETENTION_CLASS_NON_ADVERSE = "feedback_non_adverse_90d"` (FND commerce_evidence/contract.py:24) |
| S6 | ID formats `pf_evt_v1_*`, `cevi_v1_*`, `cevi_idem_v1_*`, `subj_v2_*`, `pir_v1_*` (§5.1) | exact regexes in Cosmile source (`…_v1_[0-9A-HJKMNP-TV-Z]{26}$`, `subj_v2_[0-9a-f]{32}$`) |
| S7 | `fcei_dec_v1_*` / `fcei_lin_v1_*` (§5.1) | ledger.py:24-25 regexes, :34/:38 mints |
| S8 | usage_safety severity always null (:401) | normalizer:49 rejects usage_safety+severity (`adverse_fields_inconsistent`); skin/other REQUIRE severity (:50); candidates.py:291 axes `(None,"usage_safety",None,"reported")` |
| S9 | Consent verdict→reason mappings (:186-191) | validator.py:210-217 — REVOKED→consent_revoked, EXPIRED→consent_expired, MISMATCH→privacy_scope_exceeded, other non-GRANTED→consent_missing — letter-exact |
| S10 | Fingerprint "sha256: of strict validated envelope + provenance/consent categories, existing algorithm" (:369) | ledger.py:41-47 `_fingerprint(envelope, prov, cons)` = `"sha256:" + sha256(sorted/compact/ascii JSON)` — letter-exact incl. prefix |
| S11 | Exact replay returns stored decision + **current** lineage eligibility (:535-536) | ledger.py:164-169 (comment: replay reports revoked after later retraction) |
| S12 | Adverse draft literals (:456-458) | candidates.py:386-387 `safety_handling="human_safety_review_required"`, `response_policy="preapproved_static_guidance_only"`, `status="review_required"` |
| S13 | "blocked by the current shared safety gate" (:79-80) | candidates.py:51-52 `_ADVERSE_GATE = ("block", ("high_sensitivity_reconfirmation_required",))`, `_OUTCOME_GATE = ("allow", ("allow_shadow_write",))`; gate projection expected pair per slot |
| S14 | Cosmile queue content 30-day expiry (:439, §9 table) | commerceEvidenceService.ts:193 `queueExpiresAt: adverse ? null : createdAt + RETENTION_MS.outbox_pending_30d` — non-adverse 30d exact; adverse held (null) consistent with "no invented cleanup duration" |
| S15 | Retraction envelope nulls all four feedback axes (:405) | service.ts:122-125 literal `evidenceType === "retraction" ? null : …` × 4 |
| S16 | "No current Foundation storage/migration framework" (:610-611) | repo-wide grep: sqlite3/psycopg/alembic/sqlalchemy appear only in forbidden-import denylists (`_core/foundation_brain_runtime_map.py:43`, `_core/foundation_lmr_package_boundary.py:31`) and containment-test negative controls |
| S17 | Duplicate/out-of-order root/lineage → reject not buffer | ledger.py:175-196 `plan_lineage` verdict → `evidence_retracted`/`lineage_broken` |
| S18 | Planning purity / empty-plan + hard-false guard preserves gates 9/10 (:546-549) | landed WU5 semantics (WU7 review check 7, `TestWU4FailureGateOrder`) — letter-consistent |
| S19 | Landed eligibility literals | ledger.py: committed values `{eligible, revoked}` (+ `not_evaluated` on rejects) — see finding DR-2 for the design's added members |
| S20 | Vitest + `app/scripts/*.vitest.ts` test pattern (:723-728) | `"vitest": "^4.1.9"`; existing `"test:memory": "vitest run scripts/foundation-memory-deanon.vitest.ts"` |

**Zero mission writes**: FOUNDATION `33570b9` (only the two known pre-existing untracked
docs), Cosmile `f26fa5c` (untracked docs only, zero tracked change), foundation-control
`c89b792` (untracked only), SIASIU `e1830b4` (zero tracked change). foundation-docs
worktree clean before this result; only the two declared files written.

## 4. Rulings 4–14 and 16 — evidence summaries

**4. Authentication boundary — VERIFIED.** §3.2 defines the landed 4-status verdict seam
(letter-equal to verifiers.py:15-22) with six required gateway bindings (workload=cosmile,
environment local/shadow, strict-projection digest incl. product/SKU refs as source
claims — matching Control I2 — digest equality with Foundation recomputation, single-
evaluation anti-substitution, failure→never-permissive). Fail-closed default UNCONFIGURED;
opaque context never inspected/stored/logged (:108-110, :154-156); no mechanism selected;
U1 explicitly blocks intake implementation/activation (:157-163); WU8-F3/C3 GATED on U1.

**5. Consent boundary — VERIFIED.** §3.3/§9: Cosmile authoritative; intake + all five
enumerated later transitions; nine states (count matches landed enum); fail-closed
mapping letter-exact (S9); snapshot never authority (four independent statements); failed
later check preserves receipt but atomically blocks/revokes drafts with no new effect
(:195-197); D8-2-C and complete legal erasure deferred honestly (U2/U5; "Retraction is
eligibility revocation and replay blocking, not proof of complete legal erasure" :666-667).

**6. Carrier/hash/ack — VERIFIED.** Exact v1 envelope frozen; delivery may not add/
reshape/enrich (:106-108); sender never recomputes/repairs `source_hash` (:112-113);
recomputation pinned to golden fixtures incl. the JS-undefined sentinel (:113-115);
structural/digest mismatch = poison; 32 KiB labeled a reversible non-prod containment
value, not a C validation rule (:117-119); strict minimization with verified opaque
prefixes (S6); ack matrix (§3.4) is a closed 5-outcome × fixed-combination table; the
nine delivery-safe categories are disjoint from the 18 C codes and never appear in C
decisions (:232-235); `committed`/`exact_replay` only after durable commit + both sinks
literal True (:228-230), matching landed WU5 release semantics.

**7. Delivery semantics — VERIFIED except finding DR-1.** At-least-once with explicit
no-exactly-once (:281); idempotent commit on the three replay identities + fingerprint
(S10); per-root FIFO via claim rule + per-root in-flight 1; 30s lease with CAS at lease
version and safe late-ack rejection (:294-296); bounded retry (5 attempts, 1/2/4/8s +
jitter [0,250]ms, injected clock) → category-only dead letter; retry only on no-response/
`retryable_unavailable`/malformed ack; guarded C rejection final; "no silent drop and no
infinite retry" (:292-293) and failed admission "is not deletion" (:324); poison = zero
network attempt, terminal category-only (:321-324); crash boundaries enumerated for all
three windows (:297-299); acknowledgement timing after durable commit + sinks; no ledger
epoch clear (:304). The one defect is the §4.1 retraction wording (DR-1 below).

**8. Durable logical model — VERIFIED except finding DR-2.** Entities §5.1–5.6 with
per-field null/contract tables; all ID/enum/retention literals grounded (S4–S8, S12);
six uniqueness constraints preserved as backend constraints and mapped entity-by-entity
(§5.7 ↔ §5.1 keys 1-3, §5.3 partial-unique successor 4, §5.5 slot 5, §5.4 tombstone +
purchase-lineage replay block 6 — letter-consistent with Control §5 and landed sets);
tombstones content-free with cleanup ordered after the 30-day queue ceiling (S14);
review-only slots with literal-false effect flags and fresh-GRANTED transition guard;
no full envelope/credential/raw ID/text/PII/arbitrary JSON (explicit; ReviewDraftV1 has
no JSON column); no hidden candidate/store bridge (:475-477). The one defect is the
undefined `ineligible` enum member (DR-2 below).

**9. Transactions/concurrency — VERIFIED.** Verifier/network calls strictly outside the
transaction (:502-505); consent same-call validity bound re-check is pure, with a
pre-transaction second query fallback — never a call inside the transaction (:507-511);
10-step all-or-none atomic boundary with serializable-preferred + proof-required
equivalent (:515-531); internal retry budget 3 → `retryable_unavailable`, no partial
state; first-writer/exact-replay/mutated-collision/two-successor/tombstone races each
specified (§6.3) and letter-consistent with landed ledger behavior (S11, S17); replay
runs current flag/auth/consent/retention gates first (matches landed gate order);
planning purity preserves gate-9/10 precedence exactly as landed (S18); post-commit sink
failure poisons only the instance, preserves all committed rows, forbids epoch clear
(§6.4 — matches landed WU5 poison-latch rule).

**10. Schema/migration/topology design-only — VERIFIED.** Cosmile plan reflects the
pinned repo exactly (S1–S3): additive nullable evidence-only columns (9, named), check-
constraint replacement of the existing `FSO_evidence_row_chk`, two new indexes, backfill
rules, and a down migration gated on zero-attempt/contained-only state — otherwise
forward-fix (non-destructive); preflight guards unknown evidence statuses. Foundation
side honestly refuses to invent a backend/path and gates on U3 (:610-622) — exactly what
the Designer handoff §8 demands. No DB access, migration application/rehearsal, network,
runtime, or flag change occurred (§3 zero-write evidence).

**11. Candidate/adverse/identity — VERIFIED.** Stop before current `MemoryCandidate`/
`SharedMemoryStore` with `furef_v2` unused (:680-682); effect flags literal false
everywhere; skin/other rejected while `UNCONFIGURED` with zero records/drafts (validator
:285-288 landed); `usage_safety` treatment letter-matches the landed contract — severity
null enforced at producer and draft (S8), safety_note/high, review-required, shared-gate
("block", high_sensitivity_reconfirmation_required) expected pair (S13), static-guidance
ceiling literals (S12) — nothing lowers safety; guest/anonymous/linking rejected with
zero state (:694).

**12. Retention/privacy/observability — VERIFIED.** Reversible non-prod ceilings
explicitly distinguished from production/Legal policy (:117-119, :308, :793); 90-day
content expiry from the landed contract; 180-day minimized-metadata ceiling with "legal
deletion may shorten"; tombstone outlives any deliverable retry (30d queue ceiling — S14);
erasure honesty explicit; DLQ projection is a seven-field category-only contract with
minute buckets and count:1 (:333-346); audit/metrics category-only per landed allowlists;
automated leakage-denylist required in the future test plan (:773-774).

**13. Rollback/kill switch — VERIFIED.** OFF/HARD_OFF/UNCONFIGURED defaults with "no
enable path" (:645-649); sender-first ordered rollback (§11, seven steps); queued rows
never drained/marked-sent/deleted; committed durable state preserved; down migration
only under the zero-attempt gate; "Rollback never clears a Foundation epoch … reopens a
root, or enables a candidate path" (:712-713); no automatic next stage anywhere (§14
preamble + §16; Founder decision's HARD STOP language intact).

**14. Future tests and WorkUnits — VERIFIED.** §12 covers every high-risk contract this
review attacked (serialization, malicious input, auth zero-accept, all nine consent
states + substitution + transition recheck, multi-process idempotency races, lineage
races, drafts, crash/restart windows, sink failure, migration forward/down + six-
constraint violations, rollback, observability denylist) plus mandatory existing
regressions; tests-before-code stated; none run. §14 WorkUnits: correct repo-owners
(C*→Cosmile Worker, F*→Foundation Worker, WU8-0→Security/privacy/architecture, X1→cross-
project with new explicit Leo/GPT authority); explicit dependencies; exact paths for C1/
C2/F1, provisional-flagged paths for F3, U3-supplied paths for F2, U1-supplied transport
path for C3; per-unit stop/rollback/evidence/skill/effort. No WorkUnit is currently
executable: the §14 preamble requires a new Advisor handoff **and explicit Leo/GPT
authority** for every unit, and WU8 implementation remains NOT_AUTHORIZED throughout.
No candidate/adverse/guest/D8-2-C/erasure/production/activation WorkUnit exists (:922-923).

**16. Ambiguity/drift hunt — VERIFIED except DR-1/DR-2.** Zero TBD/TODO/unresolved
options; concrete mechanisms named only inside prohibitions (:161, :620); no hidden
policy/backend/credential; no overbroad allowlist (paths are narrow and exact); operational
constants bounded and labeled non-prod; no stale source (every checked FACT reproduced at
the pins); no authority-expanding language (labels FACT/DIRECTION/DESIGN/GATE/FORBIDDEN
used consistently). The two contradictory/undefined-state items found are DR-1 and DR-2.

## 5. Findings

**DR-1 [P10 same-event transition contradiction · blocking-to-PASS · one-clause fix].**
Subject `WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md:271-273` (§4.1) ↔ same sentence's
second clause, §6 handling matrix (retraction → Foundation tombstone), §5.4, §12.2
lineage oracles.
— Quoted value: "Retraction additionally changes **every unfinished row in its root** to
`blocked`; an already acknowledged predecessor remains as evidence of what was accepted
and **is revoked by the Foundation tombstone**."
— Defect: the retraction's own outbox row is itself an unfinished row in that root at
enqueue time. The literal reading blocks the retraction row too; `blocked` is terminal
with no exit (:270-271 "No other transition is valid"), so the retraction never delivers,
the Foundation tombstone never forms, and the sentence's own second clause — plus §5.4,
§6, and the §12.2 tombstone oracles — becomes unreachable. The coherent reading (block
only **earlier/predecessor** unfinished rows; the retraction row remains deliverable) is
what the rest of the design presupposes, but the normative state-machine text does not
say it.
— Failure scenario: implementer A blocks all root rows including the retraction; user
retractions then silently stop propagating cross-service (accepted evidence and drafts
stay eligible in Foundation despite withdrawal — a privacy-relevant wrong behavior that
every §12.1 test written from the same literal wording would confirm as "correct").
The §12.1 oracle (:734 "retraction blocks unfinished root") inherits the same ambiguity.
— Required correction (document-level only): in §4.1 replace the clause with, e.g.,
"Retraction additionally changes every **earlier** unfinished row in its root to
`blocked`; **the retraction row itself remains deliverable** …", and align the §12.1
oracle wording (:734) to "retraction blocks earlier unfinished root rows; the retraction
row itself remains deliverable". No other change.

**DR-2 [P5 undefined enum member · blocking-to-PASS · one-line fix].**
Subject `:381` (§5.1 `effective_eligibility` = "eligible/revoked/expired/ineligible") and
`:427` (§5.3 head enum "eligible|ineligible|revoked|expired") ↔ subject `:410-413` (§5.2)
↔ landed ledger literals (ledger.py: committed values `{eligible, revoked}` only).
— Defect: no transition anywhere in the design produces the stored value `ineligible`:
expiry stores `expired` (§5.2 :412-413 "mark receipt eligibility **expired**"), retraction
stores `revoked`, acceptance stores `eligible`, and failed later consent checks move
drafts/lineage to "blocked/revoked" (:195-197). Meanwhile the §5.2 prose (:411) uses the
word "ineligible" to describe the expiry effect whose mandated stored value is `expired`.
— Failure scenario: two implementers diverge — one maps a transition-time consent
MISMATCH (or expiry, following :411's prose) to `ineligible`, another to `revoked`/
`expired` per the explicit rules; eligibility semantics split-brain across rows, and a
future reviewer cannot tell which value a given state should hold (구현자가 어느 값을
저장할지 결정 불가).
— Required correction (document-level only): either (a) delete `ineligible` from both
enums (:381, :427), or (b) add one line defining its exact producing transition; and
reword :411 so the expiry effect does not reuse the word "ineligible" for a state whose
stored value is `expired`. No other change.

**INFO notes (no patch required):**
- **DR-N3.** The landed outbox generic `status` enum has five values (`pending · sent ·
  failed · blocked · skipped`, schema.prisma comment); §4.1's mapping covers four. Safe
  because the §7.1 preflight aborts on "no unknown evidence status", and no evidence
  transition produces `skipped` — recorded so the mapping is not read as exhaustive of
  the schema enum.
- **DR-N4.** The nine delivery-safe categories are a closed vocabulary; the exact
  situations recording `authority_unavailable` vs `receiver_unavailable` vs
  `ancestor_not_committed` are partially implicit sender-side bookkeeping. Foundation-side
  behavior is fully specified, every implicit case has a conservative decidable choice,
  and the values never enter C decisions — acceptable as-is.
- **DR-N5.** `blocked` is terminal with no re-eligibility transition (e.g., consent
  re-granted later does not unblock old rows). This is a deliberate fail-closed non-prod
  ceiling consistent with D8-2-A/D8-5-A; any future unblock path requires new authority.

## 6. Patch loop

Per the handoff: the same Designer makes the bounded design-artifact corrections for
DR-1 and DR-2 only; this same Reviewer/session then reviews only the old-commit → new-
commit delta. **Prohibited expansion:** no new states, columns, categories, limits,
mechanisms, transports, or WorkUnits; no change to any section other than the five
anchors named above (:271-273, :734, :381, :411-413, :427); no authority or gate language
change; no reopening of the five selected directions.

## 7. Excluded scope and honest limits

- This review proves design-level trustworthiness at the pinned subject bytes. It does
  not prove any runtime behavior — nothing was executed, no test run, no DB/network
  touched; delivery/intake/durability remain unimplemented and NOT_AUTHORIZED.
- The prior C design @`4480b55` was verified through its byte-pinned constraints as
  quoted in the Control contract and, wherever load-bearing, re-verified directly against
  landed source at `33570b9` — the stronger anchor; it was not re-read end-to-end.
- Security-mechanism adequacy (U1), consent-transport adequacy (U2), backend adequacy
  (U3), Legal adverse policy (U5), and any guest policy (U6) are external gates by
  design; this review confirms they are honestly gated, not that they are resolved.
- Designer/Control live-runtime self-declarations are record-checked from their committed
  artifacts, not reproducible after the fact.
- Non-prod containment constants (32 KiB, 1,000 depth, 10/s / burst 20, concurrency 4,
  batch 20, lease 30 s, attempts 5, retry 1/2/4/8 s + jitter, internal tx retries 3) are
  reviewed as bounded, internally consistent, and reversible — not as production capacity
  policy, which remains out of scope.

## 8. Verdict rationale

Fourteen of sixteen rulings close clean on direct evidence, including every boundary the
handoff marks highest-risk: the five Founder directions are preserved without silent
extension; the clarification's design-only line is respected on both sides (implementation-
ready exactly where authorized, explicitly not Security-authentication-ready); twenty new
source reproductions at the pinned heads found zero FACT drift — every enum, literal,
regex, algorithm ("sha256:" fingerprint, JS-undefined sentinel), version (Prisma ^6.19.3),
constraint set, and retention constant the design asserts as current fact is letter-true
at `33570b9`/`f26fa5c`; the six uniqueness constraints, atomic boundary, replay/first-
writer/poison-latch semantics letter-match the landed reviewed contract; and all four
product/control repositories received zero mission writes.

The two defects found are real but narrow: a normative state-machine sentence whose
literal reading deadlocks retraction delivery (DR-1 — privacy-relevant if implemented
literally, and its own §12.1 oracle would pin the wrong behavior), and a durable-schema
enum member no rule produces, with adjacent prose inviting conflation (DR-2). Both are
exactly the class review-classification reserves for `NEEDS_PATCH`: 결함이 실재하나 전부
문서-레벨 수정으로 해소 가능 — five line-anchored corrections by the same Designer, no
structural rework, no reopened decision, followed by a same-session delta-only re-review.
`FAIL` has no basis (no boundary/authority/safety-weakening structure — the fail-closed
architecture is intact); `PASS_WITH_RISK` would misfile document defects as acceptable
residual risk; `PASS` would land a self-contradictory normative clause into the canonical
chain that future implementation handoffs quote.

**This verdict selects no policy, accepts no risk, and grants no implementation
authority. WU8 implementation, delivery, intake, DB/schema/migration execution, and
activation remain NOT_AUTHORIZED; HARD STOP remains ACTIVE.**

```text
VERDICT: NEEDS_PATCH
FINDINGS: DR-1 (§4.1 :271-273 + §12.1 :734) · DR-2 (§5.1 :381 · §5.2 :411 · §5.3 :427)
INFO: DR-N3 · DR-N4 · DR-N5 (no action)
RULINGS: 16/16 delivered — 14 clean, 2 carry the named findings
SUBJECT: 3fd7a49aa00346afc0142b92f69790819cd90e7a (blob 726223cbbcfc0c231944edbba5b76acd3fe95f1c,
  SHA-256 08eb26538bed3b0960bd82ba22a4078cbb0a744f247690b388670ef9b903e914) — byte-unchanged to HEAD
SOURCE_REPRODUCTIONS: 20 this pass + 17 prior-pass at identical pins — FACT drift 0
PRODUCT_OR_CONTROL_WRITE: ZERO (FOUNDATION 33570b9 · Cosmile f26fa5c · control c89b792 · SIASIU e1830b4)
FOUNDATION_DOCS_WRITE: only the two declared files; NOT staged/committed/pushed
DB_NETWORK_SECRET_ENV_FLAG_MIGRATION_EXECUTION: ZERO · TESTS_RUN: ZERO
NEW_AGENT_OR_SUBAGENT: ZERO · DISPATCH: ZERO
WU8_IMPLEMENTATION / DELIVERY / INTAKE / CANDIDATE_RUNTIME / FULL_PACKAGE_1B / M3: NOT_AUTHORIZED
HARD_STOP: ACTIVE
ACTUAL_MODEL: claude-fable-5 (live) · EFFORT: max (live env) · SKILL: /fable-sentinel
NEXT: foundation-advisor routes DR-1/DR-2 to the same Designer; same-session delta re-review
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
