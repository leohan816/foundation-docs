# 81 — Cosmile WU-F Independent Implementation Review (Golden Order harness + bounded evidence)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-F Golden Order script-only non-production candidate
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; read-only)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer; same session as 31_..71_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max; session 1b356b8d-58b1-4f43-a75b-b5cd746f336a)
SKILL:        /fable-sentinel (active; Agent Office Reviewer role + Cosmile AGENTS.md/CLAUDE.md re-read this dispatch)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 81_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/81_COSMILE_WUF_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit ea709383570d7e19690a25e9d929978aca16731c (read via git show at pin)
BINDING:      CANDIDATE_HEAD c6e793d3459bc16c520bd09dbe739bf4306bdb40 — this verdict binds to exactly this commit
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS   (deterministic mapping per the committed handoff)
CANDIDATE_PUSH: eligible by the ADVISOR after publication of this review (Reviewer pushes nothing; WU-G not started)
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `ea709383` | exists; handoff read at pin; foundation-docs worktree HEAD = `ea709383`, clean | ✅ |
| Base / parent | `d1f21e0f` (WU-E PASS head, pushed) | `HEAD~1` = exact; **single additive commit**; `ls-remote` = `d1f21e0f`; ahead 1/0; candidate NOT pushed | ✅ |
| CANDIDATE_HEAD | `c6e793d3` | `git rev-parse HEAD` = exact; CLEAN (porcelain 0, pre and post) | ✅ |
| Foundation snapshot lane | `73ff0036` untouched | HEAD exact on `implementation/cosmile-o1-foundation-snapshot-v1-20260717`, porcelain 0 **before and after** review | ✅ |
| Path boundary | exactly 5 additive files | `git diff --name-status` = 5 × `A` (+1540/−0): harness, sandbox transport, vitest, dbtest, sandbox vitest; zero existing-file modification | ✅ |
| Worker evidence | commit `6e5d3c4d` → 80_RESULT+POINTER | adds exactly those two; read at pin (claims) | ✅ |
| Implementation handoff / clarification | `4be4ed23` / `db464663` | both read at pin | ✅ |
| Design pins | `a1ac8016` / `daacd8a6` PASS | consistent with 31_ (sha256-verified then) | ✅ |

## 1. Determinations

### A. Composition fidelity and single-truth discipline — SATISFIED

The harness imports and **executes the actual reviewed services** — `bindPrincipal`/`ownerForGoogleMode` (WU-A), `catalogDecision` (WU-D), `reserve` + the shared `decideReserve`/`decideTransition` (WU-C), `createIntent`/`confirmCapture` (WU-B), `confirmCapturedOrder`/`customerOrderView`/`operatorOrderView` (WU-E), and the deny-all `unconfiguredStepUpVerifier` — over a single in-memory world that is a **faithful port mirror**, not a competing truth model: spot-verified fidelity includes the WU-B claim rules (`captured`⇒`already_captured` same-key / conflict otherwise; `authorizing` same-key-only), the WUB-AF2 `providerIntentRef === providerTxnRef` capture requirement, the WU-B live-reserved required-set coverage, and the WU-E exact bidirectional coverage + full-bound coherence (one paid history, capture↔intent↔total alignment, committed coverage). The ordered run enforces exactly the required sequence — verified principal (guest and absent-principal denied) → snapshot-contract + catalog/binding + single authoritative KRW server price (client price revalidated; stale price rejected) → WU-C reservation (default-deny) → WU-B intent bound to order/orderNo/amount/KRW → provider confirm with the reviewed exact comparison → durable capture → WU-E bind (one paid order/history/committed set) → coherent `ORDER_CONFIRMED` projections → `pending` record-only fulfillment → replay with a measured **zero second provider/capture/order/inventory/history effect** (`replay.effectDelta` + `secondProviderConfirmCalls` counters). Test-only helpers (`buildSyntheticSnapshotDoc`, `fixtureBinding`, `makeDeterministicTransport`, `syntheticVerifiedPrincipal`) are unmistakably non-runtime script exports; nothing in `app/src` references any WU-F file (activation sweep = 0).

### B. Negatives, concurrency, restart, webhook — SATISFIED

All required adjacent-negative classes exist with real assertions and were reproduced: auth absent/unverified/guest denial; invalid snapshot contract (`non_production:false`); stale-client-price rejection; non-unit quantity rejection; failed reservation ⇒ **zero provider calls** (call-count asserted); failed capture ⇒ no internal bind; **last-item concurrency** ⇒ exactly one paid winner and a loser failing at reservation with zero provider calls; restart/replay from the durable world ⇒ idempotent re-bind with no second effect; the general-payment webhook remains an untrusted notification — duplicate/replay/conflict fail closed, state regression rejected, and **no order/capture is credited from the body alone** (only the existing WU-B query-and-exact-binding path); no signature is required or invented for the signatureless event class.

### C. Script-only Toss transport containment — SATISFIED (verified in source)

`o1_toss_sandbox_transport.ts`: exact origin constant `https://api.tosspayments.com` with URL = origin + path where the path must match one of the three WU-B `/v1/payments/*` regexes and is rejected on `://`, `..`, or `//` (no origin swap/traversal; `{paymentKey}` is a single URL-encoded segment from the WU-B adapter); methods GET/POST only; POST JSON only with the `Idempotency-Key` header byte-preserved. Gating fails closed with **no transport object at all** (`not_ready` categories: flag absent, credential absent/blank, live refused) — network is impossible when unconfigured; live-mode refusal admits only `test_`-prefixed secrets, rejects any `live` substring and any non-sandbox mode declaration. Basic authorization is constructed only inside a closure and never stored/returned/logged; the 10-second abort covers the body read (timer cleared in `finally` after `text()`); the 256 KiB response cap is enforced before parse; JSON parse is strict; `redirect: "error"`; no retry/poll/scheduler/runtime export. Errors are generic category messages; the containment report is boolean/number-only. Fixture-vs-leak resolution: synthetic identifiers exist **only inside executable tests**; the serialized evidence is asserted free of ids/paymentKey/orderNo/subject on both the happy path and a forced-failure path — no durable-evidence leak, no conflict left unresolved.

### D. Evidence layers and honest claim ceiling — SATISFIED

The two layers are structurally distinct (`EvidenceLayer` field; the deterministic transport is a scripted fake never described as official proof). The sandbox suite is default-fail-closed: the official block runs only under `describe.skipIf(!SANDBOX_GATE_OPEN)` where the gate requires the ready transport (one-shot flag + non-blank non-live TEST secret) **plus** four explicit operator affirmations (synthetic identity, local test payment key, no-live, no-PII); in the default suite the gate test asserts `not_ready` and the block is skipped — reproduced with the gate **provably closed** (0 `O1_TOSS_*` variables in the environment) and zero network. Official provider evidence remains **`NOT_RUN_CREDENTIAL_GATE`** — no manufactured proof. The evidence DTO serializes only categories/counts/booleans/timestamps and carries the required literals: `notLiveSaleEvidence: true`, `realPayment: "NO"`, `realCustomerPii: "NO"`, `production: "NO"`, plus `gatesAreSynthetic: true` and the credential-gate status; it claims no sellability, live payment, end-to-end provider completion, or production readiness.

### E. Disposable PostgreSQL proof and parity limits — SATISFIED (honest bounded residual)

The dbtest reuses the proven containment pattern (already-local `postgres:16-alpine`, no pull, tmpfs, no host port, docker-exec only, synthetic rows/credentials, blocking `finally` cleanup with absence verification — reproduced) and applies the exact committed WU-0 **and** WU-E migrations before proving the SQL chain: reservation → intent/claim/capture → paid bind with exact bindings, concurrency/replay, one history/audit/commit, and no false second effect (14/14). The split — TypeScript composition proven by vitest executing the reviewed services over the faithful mirror, DB semantics proven by the SQL twin, with the generated-Prisma-client boundary honestly excluded — is the **same bounded residual posture verified at every prior gate**, not a blocking parity defect; the twin is treated as independent evidence, not as proof of TypeScript repository execution.

### F. Reproduction and containment

```text
PRE:  HEAD c6e793d3 porcelain 0 · docker containers 1 · O1_TOSS_* env vars: 0 (gate closed)
RUN1: vitest run scripts/o1_golden_order.vitest.ts → 37 passed / 0 failed
RUN2: python3 scripts/o1_golden_order.dbtest.py → 14 passed / 0 failed · exit 0 · cleanup removed=True absent=True · git post 0 changed paths
RUN3: vitest run → 20 files, 506 passed | 1 skipped (507)   (468 prior + 37 golden + 1 sandbox gate; the 1 skip IS the honest NOT_RUN_CREDENTIAL_GATE official block)
RUN4: vitest run scripts/o1_golden_order.sandbox.vitest.ts → 1 passed | 1 skipped · default fail-closed · ZERO network (no ready transport constructible from the empty gate)
POST: symlink removed (ABSENT) · no .next · HEAD/porcelain unchanged · FOUNDATION 73ff0036 unchanged · containers 1 (unchanged) · 0 ephemeral leftovers
```

All Worker-claimed counts reproduce exactly. Sweeps: harness has 0 `console.*`/`process.env`/`fetch(`; the transport contains exactly one `fetch` (the single send); 0 console additions in the delta; no `app/src` file references any WU-F script. `tsc`/build remain honestly NOT_RUN under the unchanged generation blocker — the WU-F files are pure (no `@/lib/prisma` import) and are transpiled+executed by vitest, so this stays a **bounded residual unknown**, not blocking.

## 2. Findings

**Blocking/required: NONE.**

Observations (non-blocking):
- **[O-F1]** The sandbox transport's 256 KiB response cap is enforced after `res.text()` completes (post-read) rather than streaming; the 10-second abort bounds the read in time. Acceptable at this script-only, credential-gated, one-shot scope; if this transport is ever promoted toward runtime use, adopt the WU-B streaming-cap pattern.
- **[O-F2]** The harness world is a third encoding of the reviewed repository semantics (alongside the runtime repositories and the plpgsql twins); fidelity was spot-verified at this candidate (AF1/AF2/coverage/coherence rules present) — keep parity discipline on any future change.
- **[O-F3]** `tsc`/build deploy-time residual unchanged (consistent posture since WU-B; WU-F adds no runtime-repository code).

## 3. Excluded scope

No patch/stage/commit/push/dispatch/credential request/risk acceptance; no provider contact (gate provably closed); no real DB/PII/payment; no WU-G inspection beyond confirming it has not started; Foundation lane read-only and proven unchanged.

## 4. Verdict rationale

WU-F is exactly the frozen subject: a script-only, non-production Golden Order harness that composes — and demonstrably does not weaken or reimplement — the reviewed WU-A..E contracts in the required order, with measured zero-second-effect replay, complete adjacent-negative and concurrency coverage, a rigorously contained one-shot sandbox transport that cannot exist unconfigured, honest two-layer evidence separation with the official layer fail-closed and truthfully `NOT_RUN_CREDENTIAL_GATE`, a category-safe evidence DTO carrying every required non-claim flag, and a clean disposable-DB twin — all inside exactly five additive script files with zero activation and zero leakage, and every claimed count reproduced under a provably closed credential gate. No load-bearing invariant is unconnected, contradicted, or asserted only by a test name. **ROLE_VERDICT: PASS.**

```text
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS
BINDING: candidate c6e793d3459bc16c520bd09dbe739bf4306bdb40 only
BLOCKING_FINDINGS: NONE · OBSERVATIONS: O-F1..O-F3 (non-blocking)
WU-F_CANDIDATE: c6e793d3 (base d1f21e0f + 1 additive commit; NOT pushed) — push eligible by ADVISOR after publication; WU-G dispatch remains Advisor/Leo; official sandbox execution remains NOT_RUN_CREDENTIAL_GATE pending Leo's consolidated checklist
EVIDENCE_LEDGER: focused 37/37 + full 506/506(+1 honest skip) + sandbox-gate 1/1(+1 skip, zero network) (reproduced) · db-touch 14/14 (reproduced, cleanup proven)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; product + Foundation states byte-identical pre/post)
RETURN_TO: foundation-advisor
STOP
```
