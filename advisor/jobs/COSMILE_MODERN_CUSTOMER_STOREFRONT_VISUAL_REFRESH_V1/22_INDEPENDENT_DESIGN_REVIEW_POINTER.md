# 22 — Pointer: Independent Design Review

| Field | Value |
|---|---|
| Artifact / verdict | `21_INDEPENDENT_DESIGN_REVIEW.md` · `DESIGN_REVIEW` · `NORMAL_COMPLEX_BOUNDED_DESIGN` · **`NEEDS_PATCH`** (design-document corrections only; direction sound) |
| Handoff / pins | `20` @ docs `2e86736` sha256 `2e0e1ad3…` · product read-only `8d4a3272`, clean · candidate = Designer `11`–`16` + gate `17`, product delta 0 |
| Render evidence | `13`/`14` rendered once each at original size with the existing Chromium + recorded `FONTCONFIG_SYSROOT` Noto CJK env; temp PNGs deleted · Korean legible, no tofu/clipping/overlap, no phone frame, no bezel, **seven cards 4+3, no eighth tile** |
| F1 (blocking) | `13` states the count four ways incl. the word headline **“일곱 가지”** and a seven-tile hero field; `12` §2 binds only numeric `catalog.length` → at eight the headline lies. Derive every count expression, or drop the word form |
| F2 (blocking) | `12` §6 fixes radius 14 and “Media is 4:3”; `13` cards are radius 16 with portrait 112×170 media in a 312×194 horizontal card → card primitive unfrozen. Pick one composition and restate |
| F3 (blocking) | White on persimmon ≈**3.36:1** at 12 px/14 px bold violates `12` §7’s own rule; ink on persimmon ≈4.91:1 passes. Switch to ink or reach large-text size |
| F4 (blocking) | Mobile `AddStatus` has two homes (fixed bar vs in-flow `상품 상태`, whose copy points at the other); name the exact slot, focus return, and 200 % zoom behaviour |
| F5 / F6 (non-blocking) | Mobile 5-tab set is faithful (`MallTabs.tsx:13–20` excludes 찜 by design) but the `찜한 상품` account row + badge (`account/page.tsx:62`) is unnamed while desktop adds 찜 · duplicated wishlist control on mobile detail needs one source of truth |
| Q1–Q6 | Q1 PASS · Q2 PASS except F1 · Q3 PASS · Q4 PASS · Q5 PASS except F3/F4 · Q6 PASS once F1–F4 close |
| Residual limits | Mobile catalog/cart/checkout/orders/service-request frozen textually only (2 visuals authorized) · owned order detail never observed live · names/prices are a 2026-07-27 snapshot · contrast computed from declared tokens |
| Binding | actual `claude-opus-5` / `max` / `/fable-sentinel` · session `foundation-reviewer-fable5` · only the two mission worktrees used |
| Boundaries | read-only: no candidate edit, product/runtime/DB/provider/browser mutation, commit, push, dispatch, or risk acceptance |
| `RETURN_TO` | `foundation-advisor` — route F1–F4 as a bounded Designer patch, then same-pass re-review; F5/F6 at Advisor discretion |
