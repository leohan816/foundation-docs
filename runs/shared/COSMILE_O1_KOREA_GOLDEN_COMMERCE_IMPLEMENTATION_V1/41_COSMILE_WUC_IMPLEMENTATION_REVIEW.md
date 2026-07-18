# 41 — Cosmile WU-C Independent Implementation Review (Inventory reservation + oversell guard)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-C inventory reservation and oversell guard
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; read-only)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer; same session as 31_/33_/35_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max in session environment)
SKILL:        /fable-sentinel (active this session)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 41_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/41_COSMILE_WUC_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit 08b078d604005c7b9b706284ee483672f8884f1c (read via git show at pin)
CANDIDATE:    84370e8624c6e908da183a84b38551a6a9441527  ← this verdict binds to exactly this commit
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS   (deterministic mapping per the committed handoff)
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `08b078d6` contains 41_ handoff | `git cat-file -t` commit; handoff read at pin; foundation-docs worktree HEAD = `08b078d6`, clean | ✅ |
| Base / parent | `e1dc39e6…` (WU-A PASS head) | `git rev-parse HEAD~1` = exact; **single child commit** ("feat(o1-wuc): … library-only; no runtime activation") | ✅ |
| CANDIDATE_HEAD | `84370e86…` | `git rev-parse HEAD` = exact | ✅ |
| Worktree / branch / upstream | CLEAN · mission branch · upstream head `e1dc39e6` · ahead/behind 1/0 · not pushed | porcelain 0 (pre and post) · branch exact · `ls-remote` = `e1dc39e6` · `rev-list --left-right` = 0/1 (ahead 1) | ✅ |
| Diff boundary | exactly 5 NEW paths, zero existing-file modification | `git diff --name-status` = 5 × `A` (+737/−0): inventory `contracts.ts`/`service.ts`/`repository.ts`, `o1_inventory_contract.vitest.ts`, `o1_inventory_concurrency.dbtest.py`; no schema/migration/dependency/lockfile/Prisma-artifact/route/UI path | ✅ |
| Implementation handoff | commit `e72b5c37` | adds exactly the 40_ implementation handoff; read at pin | ✅ |
| Worker evidence | commit `a38bcb77` → 40_ RESULT + POINTER | commit adds exactly those two files; result read at pin | ✅ |
| Reviewed design / design review | `a1ac8016` / `daacd8a6` PASS | same pins verified in 31_ (sha256 re-verified then); design §5 RC-3, §11 invariants, §14 WU-C anchor this subject | ✅ |
| WU-0 schema head | `c559e7cd` | ancestor of candidate; `InventoryReservation`/`CommerceSku.stock` + CHECKs + partial-unique read at that commit | ✅ |

## 1. Sources read

Agent Office operating model + Reviewer role (this session), the 40_ implementation handoff @ `e72b5c37`, the complete 40_ Worker result @ `a38bcb77` (treated as claims), the pinned reviewed design (80_, previously sha256-verified), `app/docs/testing/TEST_MEANING_POLICY.md`, WU-0 schema + migration SQL at `c559e7cd` (constraints `qty_chk`, `status_chk`, `committed_time_chk`, `released_time_chk`, partial-unique `no_double_active_key` WHERE status IN ('reserved','committed') AND orderId IS NOT NULL), and all five candidate files in full.

## 2. Required determinations (handoff items 1–10, one by one)

**(1) Closed contract and bounds — SATISFIED except one bounded finding (WUC-F1).** Outcome unions are closed and discriminated (`ReserveOutcome` 9 kinds / `TransitionOutcome` 10 / `RestorationOutcome` 2; no permissive default success). Quantity: integer `[1, 100_000]` enforced pre-persistence; TTL: integer `[1, 86_400]` (bounded future); missing SKU / invalid input / unknown state / repository error all map to closed categories; every rejection is zero-write (service rejects before the repo; the repo's reject paths are SELECT-only; tested via `rows.size` assertions and dbtest S9). **Gap:** identifiers (`orderId`, `skuId`, `reservationId`) are checked non-empty only — **no upper length bound exists or is tested**, while both the implementation handoff ("integer/time/identifier bounds enforced before persistence") and this review's determination 1 ("bounded identifiers") require one → finding **WUC-F1**.

**(2) Idempotency and conflict — SATISFIED.** `decideReserve`: active `reserved` + same quantity ⇒ idempotent truth return; different quantity or active `committed` ⇒ `conflict` fail-closed (pure tests, service tests, dbtest S3). Duplicate active creation is impossible through the lane (existing-active check under the SKU lock) **and** backstopped by the WU-0 partial-unique — dbtest S10 proves a direct duplicate-active INSERT is rejected by the constraint itself.

**(3) Atomic availability — SATISFIED.** `repository.reserveAtomic` runs one `prisma.$transaction`; the **first** statement is `SELECT "stock" … FOR UPDATE` on the SKU row (per-SKU serialization) — *before* the existing-active read, the `SUM(reserved|committed)` aggregate, and the INSERT. All four statements are Prisma tagged-template parameterized (values only via `${}`; static identifiers; no `$queryRawUnsafe`). `applyTransition` locks the reservation row `FOR UPDATE`, delegates to the shared decision, and applies status-guarded conditional UPDATEs (guaranteed to match under the held lock). Catch-all maps to `repository_error` with no SQL/identifier leakage.

**(4) Mirror parity — SATISFIED (no semantic gap).** Field-by-field comparison of `repository.reserveAtomic` (+`decideReserve`) vs the dbtest plpgsql `reserve_atomic`: identical lock-first order (SKU `FOR UPDATE` → sku_missing), identical decision precedence (same-qty active-`reserved` ⇒ idempotent; any other active pair row ⇒ conflict; then `qty > stock − SUM(reserved|committed)` ⇒ insufficient; else insert `status='reserved'`), identical active-set definition (`status IN ('reserved','committed')`). The two-step SQL encoding (same-qty check, then any-active count) is logically equivalent to the TS branch order because the idempotent case returns first. Timestamp provenance differs harmlessly (app-clock vs `now()+make_interval`); `reservedAt` uses the schema default in SQL vs explicit `now()` in TS — no behavioral divergence in any decided outcome.

**(5) Race oracle — SATISFIED and reproduced.** Dbtest S1 launches 4 genuinely concurrent connections against stock=1 and asserts **both** sides plus the state: exactly 1 `reserved`, exactly 3 `insufficient_stock`, exactly one active row, `SUM ≤ stock`. Multi-quantity boundary (5/5 then insufficient), idempotent replay with a no-duplicate row-count assertion, conflict, per-scenario and **global** cross-SKU oversell query (counts `used > stock` groups; expects 0 — a negative-space invariant, not a self-confirming count), no-partial-write, and a FINAL global invariant. Independently reproduced: **28/28, exit 0** (see §4).

**(6) Transition truth — SATISFIED.** `decideTransition` (pure, 13 matrix tests): commit only with `verified_capture`; release only with `conclusively_non_captured`; expire requires `conclusively_non_captured` **and** `now ≥ expiresAt` (boundary tested at equality and at −1); `unknown`/`confirming` (and wrong-proof kinds, including capture-proof-for-release) always `proof_required` — never release/expire; repeated same transition with valid proof ⇒ `idempotent_noop`; committed is terminal (release/expire from committed ⇒ `incompatible_state`, matching the schema CHECK); missing ⇒ `not_found`; empty id ⇒ `invalid_input`. No client/redirect/timer/webhook/label path exists — proof is a structured union only. Dbtest S5–S8 prove the DB-side effects: status-guarded transitions, repeated-apply zero duplicate effect, release frees stock, past-TTL expires vs before-TTL stays reserved, unknown holds inventory.

**(7) Restoration boundary — SATISFIED (strongest form).** `evaluateRestoration` is a pure function with **no repository/database access at all**; it returns `hold_default_deny` unless both operator confirmation and a non-empty policy reference are present, and even then returns `hold_unrepresentable` with the exact recorded later dependency (operator lane + WU-0 schema extension; `committed→released` is forbidden by `committed_time_chk`). Beyond that: **no WU-C code path writes `CommerceSku.stock` anywhere** — the lane only ever reads stock under lock — so automatic restoration is structurally impossible, not merely refused. Tests cover all four deny combinations (incl. whitespace policy) plus the dependency-recording case.

**(8) Error and evidence containment — SATISFIED.** Closed categories only; no SQL text, payload, PII, credential, or raw row crosses any boundary (outcome objects carry at most the lane's own `reservationId` handle); 0 `console.*` across the three TS files; delta secret/PII sweep = 0; the dbtest prints check names/counts/categories only and reads **no environment** (no `DATABASE_URL`/`os.environ`/`getenv` — it cannot inherit a real endpoint or credential); its container password is a transient synthetic dummy on a trust-auth disposable instance. Product SQL is parameterized-only. (The dbtest's own fixture SQL uses %-formatted **script-internal constants** — no external input; noted as observation O-2, not an unsafe-construction violation.)

**(9) No activation — SATISFIED.** `grep -rn "lib/inventory" app/src` outside the new directory = **0 matches**: nothing imports or wires the lane; checkout/cart/payment/order/refund/route/UI/console/job/timer/provider/Foundation files are untouched (5 strictly-new paths, −0 lines); no endpoint, transport, network, or credential path exists in the candidate.

**(10) Test meaning and cleanup — SATISFIED.** Oracles are mutation-sensitive: every decision branch is pinned by an exact-outcome assertion (flipping any comparison in `decideReserve`/`decideTransition` fails a named test; the TTL boundary, proof gates, and zero-write counts are each individually asserted), and the dbtest asserts winners **and** losers **and** row counts **and** aggregates. Disposable-DB containment is enforced in code and was verified before running: already-local-image gate with **SKIP(exit 2) ≠ PASS**, unique per-pid name, tmpfs data dir, no published port (docker-exec/Unix-socket only), synthetic rows, only the already-committed WU-0 migration applied, blocking cleanup in `finally` with post-cleanup absence verification. Reproduction confirmed shutdown/removal/absence and **no alteration of unrelated Docker resources** (host container count 1 → 1; zero `*ephemeral*` leftovers).

## 3. Findings

### Required bounded correction (single; owner: same Cosmile Worker; delta-only re-review by this Reviewer)

**[WUC-F1] Identifiers lack an upper bound (LOW).** `app/src/lib/inventory/service.ts:26-28` `isNonEmptyString` (length > 0 only) is the sole identifier validation for `orderId`/`skuId` (`reserve`, :92) and `reservationId` (`runTransition`, :117) ↔ 40_ implementation handoff "integer/time/**identifier bounds** enforced before persistence" and 41_ determination 1 "**bounded identifiers**". **Failure scenario:** a later caller (e.g. the WU-E checkout integration) passes an unbounded or attacker-influenced identifier string; the service accepts any length, so an arbitrarily large value flows into the parameterized query and is persisted/indexed (no injection — SQL stays parameterized — but unbounded input reaches the DB layer and row/index/log bloat is unbounded, and the declared bounds contract is not real). **Affected authorized paths:** `app/src/lib/inventory/service.ts`, `app/scripts/o1_inventory_contract.vitest.ts` (both inside the five WU-C paths; no new path needed). **Required correction + proof:** one bounded identifier length constant (cuid-scale ids are ~25 chars; any cap ≤ ~256 is reasonable) enforced before persistence for `orderId`, `skuId`, and `reservationId` ⇒ `invalid_input`; positive test (max-length accepted) plus adjacent negatives (over-max ⇒ `invalid_input` with zero write, for reserve and for a transition id) without weakening any existing oracle.

### Observations (non-blocking; no correction required in WU-C)

- **[O-1]** `rid_of` in the dbtest is defined but never called (dead helper; cosmetic).
- **[O-2]** Dbtest fixture SQL uses %-formatting of script-internal synthetic constants (not parameterized) — test-only, no external input, disposable container; product code is parameterized throughout.
- **[O-3]** `reservedAt` provenance differs cosmetically between repo (explicit `now()`) and mirror (schema default) — no decided-outcome divergence.
- **[O-4]** Repeated-commit idempotency requires valid proof (`proof_required` without it) — stricter than a bare no-op and the correct fail-closed reading of "repeated transition is idempotent"; recorded so the later WU-B/E integration expects it.

## 4. Independent reproduction (exact commands and results)

```text
PRE:  HEAD 84370e86 · porcelain 0 · app/node_modules ABSENT · docker containers (all) = 1 · o1wuc_* = 0
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules   (gitignored)
RUN1: cd app && node_modules/.bin/vitest run scripts/o1_inventory_contract.vitest.ts → 32 passed / 0 failed
RUN2: node_modules/.bin/vitest run → 12 files, 271 passed / 0 failed  (239 prior + 32 new; no regression)
RUN3: python3 scripts/o1_inventory_concurrency.dbtest.py → 28 passed / 0 failed · exit 0
      (incl. live 4-way last-item race: 1 winner + 3 insufficient_stock; WU-0 migration applied; final global
       oversell violations = 0; cleanup: container removed=True, post-cleanup absent=True, tmpfs, no host port)
RUN4: python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · exit 0  (WU-0 regression;
      containment header re-verified: local image, tmpfs, no -p, unique name, forced cleanup + absence check)
ENV:  vitest 4.1.9 · NODE_ENV=test · docker with already-local postgres:16-alpine (no pull) · no network beyond
      docker-local · no install · no prisma generate · no build
POST: symlink removed (ABSENT) · no .next · HEAD 84370e86 · porcelain 0 · docker containers (all) = 1 (unchanged)
      · zero *ephemeral* leftovers
```

All four Worker-claimed counts (32/32, 271/271, 28/28, 54/54) reproduce exactly. Labels per TEST_MEANING_POLICY: RUN1/RUN2 = pure provider-independent; RUN3/RUN4 = db-touch on a disposable synthetic instance only — none of this is runtime/integration evidence for a wired commerce flow (the lane is deliberately unwired).

## 5. Excluded scope and why

No build/tsc (`prisma generate` forbidden; pre-WU-0 generated client verified in 31_), no real/shared/staging/production DB, no provider/network/credential, no push/patch/stage/commit/dispatch, no WU-B/D/E/F/G inspection beyond confirming the candidate does not start them. `repository.ts` under the real generated Prisma client remains runtime-unproven (declared; its algorithm is dbtest-proven via the parity-verified mirror and its decisions are vitest-proven).

## 6. Residual risks

- The reservation lane is intentionally unwired; oversell protection exists only for writes **through this lane**. `CommerceSku.stock` remains directly editable by pre-existing admin/console surfaces (unchanged, outside WU-C) — the invariant is enforced at reserve-time against the then-current stock, which is the reviewed design's stated model (§11.1), not a defect.
- Twin-encoding risk (repository.ts ↔ plpgsql mirror) persists structurally: any future edit to one must re-prove parity (this review verified parity at this candidate).
- Restoration remains inert HOLD until the recorded operator-lane + schema-extension dependency is authorized.
- `repository.ts` runtime behavior under the generated Prisma client is a deploy-time gate (unchanged claim ceiling).

## 7. Verdict rationale

Nine of ten required determinations are fully satisfied with direct code evidence plus exact independent reproduction of all four suites, including the live concurrency race and both disposable-DB containment/cleanup proofs; the mirror-parity and no-activation questions — the two highest-risk axes — close cleanly. The single unmet element is the explicitly required identifier upper bound (WUC-F1): real, LOW-severity, trivially patchable inside two of the five authorized paths, with an exact evidence recipe. Per the Reviewer role vocabulary that is `NEEDS_PATCH` (defect patchable inside approved scope; not `PASS_WITH_RISK` — nothing needs risk acceptance; not `FAIL` — no boundary/authority/structural failure), which the committed handoff maps deterministically to mission `PASS_WITH_CORRECTIONS`.

```text
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
BINDING: candidate 84370e8624c6e908da183a84b38551a6a9441527 only
REQUIRED_FINDINGS: WUC-F1 (LOW · service.ts identifier upper bound + tests · exact recipe in §3)
CORRECTION_OWNER: same Cosmile Worker (new additive commit on the mission branch; no amend/push)
RE_REVIEW: this same Reviewer, delta-only 84370e86..<new-candidate>
OBSERVATIONS_NON_BLOCKING: O-1..O-4
CANDIDATE_PUSH: withheld pending correction + delta re-review (manifest: only reviewed PASS heads are pushed)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; post-review product state == pre-review state)
REVIEWER_ACTIONS_NOT_TAKEN: dispatch, credential request, risk acceptance, next WorkUnit
RETURN_TO: foundation-advisor
STOP
```
