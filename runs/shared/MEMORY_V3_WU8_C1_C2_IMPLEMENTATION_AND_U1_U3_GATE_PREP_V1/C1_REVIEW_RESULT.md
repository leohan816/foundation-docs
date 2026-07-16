# WU8-C1 — Independent Implementation Review Result

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-C1-IMPLEMENTATION-REVIEW-001
REVIEW_PASS: FULL_IMPLEMENTATION_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: PASS
SUBJECT: Cosmile shadow/m4-cosmile-memory f26fa5c..ad172db (1 commit, exactly 4 paths)
BLOCKING_FINDINGS: 0
SKIP_RULING: m2_ab_migration_rehearsal SKIP_INFRA assessed NON-BLOCKING (not relabeled; §5)
```

## 0. Live runtime, skill, independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window_id=@5 pane_id=%5`.
  **ACTUAL_MODEL: claude-fable-5** (live). **EFFORT: max** (live `CLAUDE_EFFORT=max`).
  SKILL: `/fable-sentinel`. Serialization: this is the only active Reviewer dispatch
  (the premature Gate Package dispatch was cancelled with zero writes before it).
- Independence: the candidate was authored by the Cosmile Worker (`cosmile`, Opus 4.8,
  `/fable-builder` per its result); this session wrote no subject byte, staged/committed/
  pushed nothing in any repository, dispatched no actor, spawned no agent, and used only
  the three authorized review commands plus read-only git inspection. Worker and Advisor
  prose was verified against the actual committed candidate, not trusted.

## 1. Subject integrity and containment — VERIFIED

- Branch `shadow/m4-cosmile-memory`; HEAD = `ad172db403065fc8e498a1e80cdd347034ea7c48`;
  parent = base = `f26fa5ced7083bb8d0af00bda2a54951923ea22f`; exactly one candidate
  commit; local `ahead 1`, **not pushed** (origin still at base) — matches handoff and
  Advisor validation.
- `git diff --name-status f26fa5c..ad172db` = exactly the four authorized paths
  (schema.prisma M; migration.sql A; down.sql A; dbtest.py A). `git diff --check` clean.
  Working tree clean; the six known pre-existing untracked docs remain untracked and
  byte-untouched. Zero unrelated tracked drift. FOUNDATION `33570b9`, SIASIU `e1830b4`,
  foundation-control `c89b792` unchanged (verified this mission).
- Worker result read at its pinned evidence commit `b1e80b3`; Advisor validation `12_`
  read; design re-pinned (`08dc39d`, SHA-256 `2213262a…` — recomputed again this pass).

## 2. Faithful implementation of design §7.1 / §4.1 / §3.4 — VERIFIED letter-by-letter

- **Nine additive nullable columns** — names and types exactly §7.1 step 2
  (`evidenceDeliveryState` String?, `evidenceAttemptCount` Int?, `evidenceNextAttemptAt`,
  `evidenceLeaseExpiresAt` DateTime?, `evidenceLeaseVersion` Int?,
  `evidenceLastFailureCategory` String?, `evidenceAcknowledgedAt`, `evidenceCompletedAt`
  DateTime?, `evidencePayloadBytes` Int?). Correctly **without** Prisma `@default` — a
  table default would have violated the generic-rows-stay-NULL rule; the evidence-only
  default/backfill 0 is applied in the migration and then enforced by the constraint
  (NOT NULL + `>= 0` for evidence rows only).
- **Exactly two indexes** — `(signalType, evidenceDeliveryState, evidenceNextAttemptAt,
  createdAt)` and `(signalType, rootEvidenceId, createdAt, id)` — letter-exact §7.1 step 4.
- **Fail-closed preflight** (§7.1 step 1) — M2 evidence schema presence
  (`evidenceRetentionClass`), no evidence payload > 32,768 bytes, no unknown evidence
  status (the guard that also fences the generic `skipped` status for evidence rows);
  each RAISEs, and the migration runs transactionally so any failure leaves no partial
  state.
- **Deterministic evidence-only backfill** (§7.1 step 3) — adverse-hold OR blocked →
  `blocked`; other pending → `contained`; sent → `acknowledged`; failed →
  `dead_lettered`; attempt/version 0; `evidencePayloadBytes = octet_length(payloadJson)`;
  `WHERE signalType='cosmile.commerce_evidence'` only. All SET CASEs read old row values
  (standard SQL), so the state and status assignments are mutually consistent. The
  status realignment of adverse-hold rows to `blocked` is the §4.1 mapping requirement
  the design's own constraint demands, is one-way conservative, and loses zero
  rows/payloads (proved by test). The sent/failed branches are unreachable on real data
  (the pre-WU8 M2 constraint restricted evidence rows to pending|blocked) — they are the
  design's own defensive mapping, faithfully carried.
- **Replaced `FSO_evidence_row_chk`** — the non-evidence branch forces all nine columns
  NULL; the evidence branch **preserves every original M2 minimization/identity/
  retention clause verbatim** (compared clause-by-clause against the pinned m2_ab
  migration at `f26fa5c`: signalVersion literal, canonicalUserId/anonymousId NULL,
  subjectRef/purchaseItemRef/productRef/evidenceId/consentRecordId NOT NULL,
  errorMessage NULL, privacyLevel literal, environment ∈ local|shadow, and the exact
  adverse/non-adverse retention XOR), replacing only the two M2 queue-state clauses
  (`status IN (pending,blocked)`, `sentAt IS NULL`) with the §4.1 state/status mapping
  and `sentAt`-only-acknowledged — exactly what design §7.1 step 4 specifies. New rules
  are letter-exact: the eight §4.1 states; nonnegative NOT-NULL count/version;
  bytes `BETWEEN 1 AND 32768`; lease-expiry only `leased`; retry-time only `retry_wait`;
  ack-time only `acknowledged`; completed-time only terminal; the closed nine-category
  §3.4 delivery-failure list; and the full generic-status↔delivery-state mapping.
- **Fail-closed, non-destructive down** — aborts unless every evidence row is pristine
  (`contained|blocked`, zero attempts, and no ack/completed/failure-category/lease/retry
  marker — the transition evidence the design names); drops only the additive
  constraint/indexes/columns; **restores the original M2 constraint letter-identical**
  (compared byte-level against `f26fa5c`); never deletes or rewrites a row.
- **No runtime surface** — the diff contains schema, SQL, and a test only: no sender,
  consumer, transport, endpoint, broker, timer, network, provider, flag activation, or
  process code of any kind; the future kill switch remains absent/OFF.

## 3. Independent test execution (fresh environment, authorized commands only)

```text
CMD1 python3 scripts/wu8_commerce_evidence_delivery_migration.dbtest.py
     → 28 passed / 0 failed · EXIT=0                                  (재현 — fresh disposable container)
     cleanup line: container removed=True, post-cleanup absent=True, named-volume=none(tmpfs), host-port=none
CMD2 python3 scripts/m2_ab_migration_rehearsal.dbtest.py
     → "SKIP: psycopg2 unavailable (infra-gate, NOT pass)" · EXIT=2   (재현 — identical to Worker report)
CMD3 npx prisma validate (placeholder DSN)
     → schema valid · EXIT=0                                          (재현)
git diff --check f26fa5c..ad172db → clean
```

The focused test is meaningful, not cosmetic: it reconstructs the **exact** M2 baseline
constraint (its embedded baseline letter-matches the original m2_ab migration), applies
the candidate's actual `migration.sql`/`down.sql` files, and covers forward apply, 5→5
zero row loss, all three backfill classes, defaults, byte-length equality and bounds,
generic-row NULL + status preservation (including an untouched generic `sent` row as a
negative control), nine targeted constraint rejections + closed-category acceptance,
down-gate abort on non-pristine with schema/rows intact, pristine down with the nine
columns dropped and rows preserved, **behavioral proof of M2 restoration** (evidence
`status='sent'` rejected again after down), and forward/down/forward. Helpers use
`ON_ERROR_STOP=1`; rejection probes assert failure; output is counts/categories/booleans
only.

## 4. Ephemeral-DB containment and cleanup — independently verified

- Pre-run: zero `wu8c1_ephemeral*` containers existed (independent confirmation of the
  Worker's cleanup evidence). The `postgres:16-alpine` image was already local
  (`docker images -q` non-empty), so no pull occurred; the script never pulls.
- The test runs `docker run` with `--tmpfs /var/lib/postgresql/data` (RAM-only data, no
  named/persistent volume), **no `-p`** (no host port; access only via `docker exec` →
  Unix socket inside the container), synthetic data only, and a synthetic transient
  credential (`POSTGRES_HOST_AUTH_METHOD=trust` + a synthetic password that exists only
  in the removed container's env; the literal in the committed test file is a synthetic
  test-only value, not a real secret).
- Post-run (my execution): `docker ps -aq -f name=wu8c1_ephemeral` → empty;
  `docker volume ls | grep wu8` → empty; no host port was ever published; no unrelated
  process/container/volume/file altered. Cleanup runs in `finally` and self-verifies
  absence, warning "C1 cannot close" if incomplete.

## 5. SKIP_INFRA ruling — NON-BLOCKING (not relabeled)

`m2_ab_migration_rehearsal.dbtest.py` exits 2 with an honest infra-gate SKIP. Ruling
basis, per the Test Meaning Policy (interpret before judging):

1. **Pre-existing and unchanged** — the psycopg2 import gate is in the pinned `f26fa5c`
   file (lines 7-9); C1's diff does not touch it; the SKIP reproduces identically on the
   baseline and the candidate, so it is not a C1-caused regression and C1 cannot be
   masking a failure behind it.
2. **The load-bearing risk is directly covered in scope** — the only M2 contract C1
   could regress is the `FoundationSignalOutbox` evidence-row contract, and the focused
   test proves exactly that: it rebuilds the letter-exact M2 constraint, proves the
   forward migration preserves every M2 clause (letter-verified in §2), and proves down
   restores the original constraint both textually (down.sql compared to the m2_ab
   original) and behaviorally (post-down rejection probe). C1 touches no other M2 table
   or migration file.
3. **Curing the skip is out of scope** — installing host `psycopg2` would be a new
   dependency/network action forbidden in this WorkUnit.

Therefore the SKIP is recorded as SKIP_INFRA (never PASS), is not blocking, and leaves
one honest environmental note: the M2 rehearsal script itself remains unrunnable on this
host until a separately authorized dependency decision provides `psycopg2`. That gap
predates C1 and is unchanged by it.

## 6. Criterion coverage (handoff REVIEW_CRITERIA)

1. Base/parent/branch/four-path containment/no drift — VERIFIED (§1).
2. Faithful §3.4/§4.1/§7.1 — VERIFIED letter-by-letter (§2).
3. Nine columns + exactly two indexes — VERIFIED (§2).
4. Deterministic backfill, bounded bytes, closed state/failure categories, conditional
   timestamps, generic status mapping, preserved M2 constraints — VERIFIED (§2, §3).
5. Non-evidence rows all-NULL + generic semantics unchanged — VERIFIED (constraint
   branch + g1/g2 probes + backfill WHERE clause).
6. Fail-closed preflight and non-destructive down; zero deletion/fabrication —
   VERIFIED (§2; down never touches rows; aborted down proven intact).
7. Focused forward/down/forward reproduced in a **new** disposable local PostgreSQL —
   VERIFIED, 28/28, exit 0 (§3).
8. Cleanup independently verified — VERIFIED (§4: no container, volume/data, transient
   credential, host port, or unrelated resource remains).
9. SKIP_INFRA assessed, not relabeled — NON-BLOCKING with reasoning (§5).
10. No raw payload/identifier/secret/credential/DSN/PII/exception detail in evidence —
    VERIFIED (Worker result and test output are counts/categories/booleans; the only
    credential-like literal is the synthetic test-only container password).
11. No sender/consumer/transport/endpoint/broker/network/provider/flag activation/
    shared-or-production DB/next WorkUnit — VERIFIED (diff has no runtime code; my
    execution used only the disposable container; C2 not begun).

## 7. Excluded scope and honest limits

- Proved: the four-path candidate against the pinned design sections, on synthetic data
  in a disposable PostgreSQL 16 instance, including forward/down/forward and constraint
  closure. Not proved (by design, out of C1 scope): `prisma migrate` runner integration
  on a full multi-table database, production/live behavior, any delivery behavior (none
  exists), and the M2 rehearsal script's own execution (§5 note).
- The backfilled `evidenceCompletedAt` for hypothetical sent/failed rows uses
  `COALESCE(sentAt, createdAt)` — unreachable on real data (§2) and constraint-legal;
  recorded for precision only.
- This PASS is bound to exactly `ad172db403065fc8e498a1e80cdd347034ea7c48`. Any new
  commit is a new candidate requiring the delta loop.

## 8. Verdict rationale

The candidate is exactly the authorized four-path change; every design clause I compared
— columns, types, indexes, preflight, backfill, all constraint rules including the
verbatim-preserved M2 clauses, the letter-identical M2 restoration in down.sql, and the
closed §3.4/§4.1 vocabularies — matches the pinned corrected design letter-for-letter;
the focused test is meaningful under the Test Meaning Policy and I reproduced it 28/28
in a fresh disposable environment with independently verified cleanup; the one skip is
honest, pre-existing, environmental, out-of-scope to cure, and its protected risk is
covered in-scope; and no forbidden surface, leakage, or authority expansion exists.
`PASS`. (`NEEDS_PATCH` has no finding to name; `PASS_WITH_RISK` would misfile the
pre-existing environmental note as a C1 risk requiring acceptance; `FAIL` has no basis.)

**This PASS is an independent implementation-review verdict for WU8-C1 only. Per the
Manifest: the Advisor may now push exactly `ad172db` and verify upstream equality, then
gate C2 on that exact HEAD. It is not final product approval; delivery remains inert;
U1/U2/U3 remain OPEN; no later WorkUnit starts automatically.**

```text
VERDICT: PASS
SUBJECT_HEAD: ad172db403065fc8e498a1e80cdd347034ea7c48 (parent f26fa5c; exactly 4 authorized paths; NOT pushed)
TEST_EVIDENCE (재현): wu8 dbtest 28/28 EXIT=0 (fresh disposable) · m2_ab rehearsal SKIP_INFRA EXIT=2 (pre-existing gate) ·
  prisma validate EXIT=0 · git diff --check clean
CLEANUP: independently verified — zero wu8 containers/volumes, no host port, tmpfs-only, no unrelated resource touched
M2_CONSTRAINT: preserved verbatim in forward; restored letter-identical in down (compared against pinned m2_ab original)
SKIP_RULING: SKIP_INFRA non-blocking; NOT relabeled PASS; psycopg2 host gap pre-existing and out of C1 scope
BLOCKING_FINDINGS: none
PRODUCT_WRITE_BY_REVIEWER: ZERO · STAGE_COMMIT_PUSH: ZERO · NEW_AGENT_OR_SUBAGENT: ZERO · DISPATCH: ZERO
EXTERNAL_NETWORK / IMAGE_PULL / SHARED_OR_PRODUCTION_DB / REAL_SECRET: ZERO
WU8_C2: NOT begun (gated on Advisor push of the exact C1 PASS HEAD + upstream equality)
U1_STATUS: OPEN · U2_STATUS: OPEN · U3_STATUS: OPEN · HARD_STOP: per Founder record after the batch
ACTUAL_MODEL: claude-fable-5 (live) · EFFORT: max (live env) · SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
