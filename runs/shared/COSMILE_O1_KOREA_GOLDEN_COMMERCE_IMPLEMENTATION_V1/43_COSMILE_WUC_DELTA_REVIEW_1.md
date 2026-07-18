# 43 — Cosmile WU-C Delta Review 1 (WUC-F1 closure, `84370e86..3ea1b211`)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-C correction cycle 1 — WUC-F1 only
REVIEW_PASS:  IMPLEMENTATION_REVIEW (delta-only; read-only; non-delta axes not reopened)
ACTOR:        foundation-reviewer-fable5 — same Reviewer identity/session as 41_ (and 31_/33_/35_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max in session environment)
SKILL:        /fable-sentinel (active this session; delta-review reference active)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 43_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/43_COSMILE_WUC_DELTA_REVIEW_1_HANDOFF.md
              @ foundation-docs commit b5a7e60941f6a1973023ce218faa05977f7bd4bf (read via git show at pin)
BINDING:      NEW_CANDIDATE_HEAD 3ea1b211b6111678add9f0e2814c289ed96adca4 — this verdict binds to exactly this commit
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS   (deterministic mapping per the committed handoff)
WUC-F1:       CLOSED
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `b5a7e609` contains 43_ handoff | `git cat-file -t` commit; handoff read at pin; foundation-docs worktree HEAD = `b5a7e609`, clean | ✅ |
| OLD_REVIEWED_HEAD / parent | `84370e86…` | `git rev-parse HEAD~1` = exact; **exactly one additive commit** in range ("fix(o1-wuc): WUC-F1 — bound identifiers to 256 Unicode code points … correction cycle 1"); no amend/rebase (old head is the parent) | ✅ |
| NEW_CANDIDATE_HEAD | `3ea1b211…` | `git rev-parse HEAD` = exact; worktree CLEAN (porcelain 0, pre and post) | ✅ |
| Upstream / ahead-behind | head `e1dc39e6` · 2_0 | `ls-remote` = `e1dc39e6`; `rev-list --left-right` = 0 behind / 2 ahead; candidate NOT pushed | ✅ |
| Full-review artifact | commit `c68410a6` · ROLE NEEDS_PATCH / MISSION PASS_WITH_CORRECTIONS · finding WUC-F1 | commit adds exactly my 41_ artifacts; committed 41_ blob sha256 = disk sha256 = `201bf829…` (**this Reviewer's 41_ text committed byte-identical, unaltered**) | ✅ |
| Correction handoff / evidence | `2cdc8c79` / `04c1a966` | `2cdc8c79` adds exactly the 42_ correction handoff; `04c1a966` adds exactly 42_RESULT + 42_POINTER; 42_ result read at pin (claims treated as claims) | ✅ |

## 1. Determinations (handoff list, one by one — all against the actual diff, not the report)

**(1) Delta path containment — ✅.** `git diff --name-status 84370e86..3ea1b211` = exactly `app/src/lib/inventory/service.ts` (M) and `app/scripts/o1_inventory_contract.vitest.ts` (M), +67/−4. Nothing else.

**(2) One 256-code-point maximum before every repository call — ✅.** `service.ts` adds `export const MAX_IDENTIFIER_CODE_POINTS = 256` and one predicate `isBoundedIdentifier(s) = typeof s === "string" && s.length > 0 && [...s].length <= MAX_IDENTIFIER_CODE_POINTS`, applied at the **only two repository entry points**: `reserve()` for `orderId` and `skuId` (before quantity/TTL checks, before `clock`/`id`/`repo`) and `runTransition()` for `reservationId` (shared by `commit`/`release`/`expire`, before `deps.repo.applyTransition`). The lane has no other repository call site.

**(3) Code-point length actually used and tested — ✅.** The implementation counts via the string iterator (`[...s].length`), which yields Unicode code points (surrogate pairs counted once). The tests prove this is not incidental: `"\u{1F600}".repeat(256)` (256 code points = **512 UTF-16 code units**) must be **accepted** — any `.length`-based (code-unit) implementation would reject it and fail this test; a sanity case additionally pins `[...atEmoji].length === 256` vs `atEmoji.length === 512` and `MAX_IDENTIFIER_CODE_POINTS === 256`.

**(4) Boundaries positive and adjacent-negative, zero repository call/write — ✅.** 256-code-point ASCII `orderId`+`skuId` accepted (→ `reserved`); 256 non-BMP accepted; 256-code-point `reservationId` **passes validation** (reaches the repo → `not_found`, distinguishing validation-pass from rejection); 257 ASCII `orderId` → `invalid_input` with `rows.size === 0`; 257 ASCII `skuId` → same; 257 non-BMP `orderId` → `invalid_input`; 257 `reservationId` → `invalid_input` for `commit`, `release`, **and** `expire` against a **throwing fake repository** — proving the repository is *never called* on rejection (stronger than zero-write).

**(5) No normalization/rewrite/hashing/truncation/logging/second policy — ✅.** The diff is a predicate swap plus one constant; identifier values flow through unchanged; 0 `console.*` added; a single policy (one constant, one function) governs all three identifiers; the pre-existing non-empty requirement is preserved (existing empty-string tests still pass unmodified).

**(6) No other behavior changed — ✅.** `decideReserve`, `decideTransition`, `evaluateRestoration`, quantity/TTL bounds, outcome unions, SQL, locking, and transition truth are untouched in the diff; `contracts.ts` and `repository.ts` are not in the delta; the over-cap rejection reuses the existing closed `invalid_input` category (no new category).

**(7) Byte-identity of unrelated paths — ✅ (directly confirmed).** Full-repo delta = 2 paths only; targeted `git diff 84370e86..3ea1b211 -- repository.ts contracts.ts o1_inventory_concurrency.dbtest.py app/prisma/` = **0 lines**. Route/checkout/payment/runtime and WU-0 schema/migration are byte-unchanged. Accordingly the 41_ full review's disposable-DB evidence (**28/28** concurrency, **54/54** WU-0 regression) is **preserved by byte-identity**, exactly as the handoff prescribes — no new DB run was performed and none is claimed.

**(8) Reproduction, cleanup, Git identity — ✅.**

```text
PRE:  HEAD 3ea1b211 · porcelain 0 · app/node_modules ABSENT
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules   (gitignored)
RUN1: cd app && node_modules/.bin/vitest run scripts/o1_inventory_contract.vitest.ts → 40 passed / 0 failed  (32 prior + 8 WUC-F1)
RUN2: node_modules/.bin/vitest run → 279 passed / 0 failed  (271 prior + 8; no regression)
ENV:  vitest 4.1.9 · NODE_ENV=test · offline · no install/network/DB/provider/prisma-generate
POST: symlink removed (verified ABSENT from the worktree root) · no .next · HEAD 3ea1b211 · porcelain 0
```

Both Worker-claimed counts (40/40, 279/279) reproduce exactly. No existing oracle was weakened: the test-file diff is additive (one import symbol + one new describe block); the −4 lines are the replaced validator in `service.ts`. Observations O-1..O-4 from 41_ are untouched by this delta (their files are byte-identical or semantics unchanged) and remain non-blocking.

## 2. Excluded scope

Non-delta WU-C axes (41_ determinations 2–10) were not reopened — nothing in this validation-only delta touches them; the PostgreSQL race and migration suites were deliberately not rerun per the handoff (byte-identity confirmed instead). No patch/stage/commit/push/dispatch/credential/risk action.

## 3. Verdict rationale

The delta is exactly the two authorized files and implements precisely the required correction: one deterministic 256-Unicode-code-point maximum, enforced before every repository call for all three identifiers, with genuine code-point semantics proven by a non-BMP acceptance test that would fail under any UTF-16 code-unit implementation, full positive/adjacent-negative boundary coverage including repository-never-called proof, no second policy or transformation, and no behavior change anywhere else (byte-identity directly confirmed for all preserved-evidence files). Focused and full suites reproduce exactly with clean cleanup. **WUC-F1 is CLOSED; no finding remains open against WU-C.** Role verdict **PASS**, mission mapping **PASS**.

```text
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS
BINDING: candidate 3ea1b211b6111678add9f0e2814c289ed96adca4 only
WUC-F1: CLOSED (bounded correction verified empirically; no regression; no new finding)
OPEN_FINDINGS_AGAINST_WU-C: NONE (O-1..O-4 remain non-blocking observations)
WU-C_CANDIDATE: 3ea1b211 (base e1dc39e6 + 2 additive commits: lane + identifier-bound correction; NOT pushed — push routing is Advisor's)
EVIDENCE_LEDGER: pure 40/40 + suite 279/279 (reproduced this review) · db-touch 28/28 + WU-0 54/54 (41_ runs, preserved by confirmed byte-identity — not rerun)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; post-review product state == pre-review state)
REVIEWER_ACTIONS_NOT_TAKEN: dispatch, credential request, risk acceptance, next WorkUnit
RETURN_TO: foundation-advisor
STOP
```
