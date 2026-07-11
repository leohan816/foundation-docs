# FABLE5 HISTORY-FIX DELTA REVIEW — Exact Advisor Evidence Path History

- Mission: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION` (AO-WU-21 rework loop) · Actor: **Fable5 Reviewer** (`reviewer-fable5`) · Pass: Level-3 implementation/security DELTA · Skill: `/fable-sentinel` · Date: 2026-07-11
- Delta: `889a29b3 -> 73157613` = HEAD = origin (fetched); exactly 2 files, +79/-2: one argv line in `exact-authority.ts` + a deterministic regression test.
- **VERDICT: `PASS`** — no divergence to classify; AO-WU-21 remains Advisor-owned and was not resumed by this review.

## Checks (each reproduced first-hand)
1. **`--follow` removed; history is exact-path**: `git log --format=%H --follow -- <path>` -> `git log --format=%H -- <path>` (the entire runtime change). `--follow`'s similarity detection was attributing an identical decision file in a DIFFERENT message directory to the same history, fabricating a false multi-commit history for fresh single-commit evidence.
2. **Distinct-directory identical files no longer share history**: the new test creates two byte-identical `03_DECISION.json` files under distinct message dirs in a disposable repo, PROVES the original defect condition (raw `--follow` probe returns 2), and asserts `pathHistory` returns exactly 1 per path with distinct commit IDs.
3. **Real same-path rewrite still yields multiple entries**: the test rewrites the same exact path, commits, and asserts history length 2 — the immutability rejection input remains intact.
4. **All other rejections intact**: the delta touches only the log argv; removal/dirty-path/ancestry/current-blob/checkpoint-freeze/ordering/correlation/scope rejections are unchanged code covered by the focused suite — **41/41 passed in my own run** (2.06s).
5. **No rename/copy or Git-history bypass introduced**: the change strictly narrows history semantics to the exact path (removal of an option; nothing added).
6. **Test is deterministic and disposable-only**: `mkdtemp` fixture repo, sandboxed env (`HOME=/nonexistent`, `GIT_CONFIG_NOSYSTEM=1`, fixed PATH, `--no-gpg-sign`), cleanup via tracked roots; no real pane/server/authority material touched.
7. **No authority/route/target/policy/activation change**: 2-file diff verified by name; no runtime surface beyond the one argv line.

## Verdict rationale
The fix is the minimal correct narrowing (exact-path semantics IS the designed immutability contract; `--follow` was the bug), the original defect and the fixed behavior are both deterministically reproduced by the added test, and my focused-suite run passes. Per V2: **PASS**.

## Self-review
Diff, test content, and suite result are my own outputs; Worker report cross-checked only. Read-only; no patch/server/tmux/authority material; only this result + pointer written. Not rerun: full suite this round (focused suite covers the changed surface; full suite passed at 889a29b in the prior pass and the delta is 2 files).

Return to: **Advisor**.
