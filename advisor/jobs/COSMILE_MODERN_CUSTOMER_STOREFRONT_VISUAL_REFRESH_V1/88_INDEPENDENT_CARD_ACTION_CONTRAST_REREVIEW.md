# 88 — Card Action Contrast Re-review

VERDICT: **`PASS`** · blocking **0** · residual R1 of `82`/`83` `CLOSED` · `RETURN_TO: foundation-advisor`

Binding: actual `claude-opus-5` / `max` / `/fable-sentinel`; handoff `87` @ docs `c1a07bf` sha256 `59a0efd0…`; product `cb1e2c6e..a1060412` in the exact mission worktree = 2 commits, **exactly 2 paths** (`globals.css`, home visual test), clean. Read-only: no rerun, render, mutation, or commit; predecessor worktree untouched.

**Cart only, persimmon on ink.** `globals.css:356` `.o1-shell .o1-card-actions > :not(.wish-card-btn) button { background: var(--persimmon); color: var(--ink); }` targets the one `button` inside the sole non-wishlist action child. Specificity `(0,3,1)` beats the component's utility classes without touching them, and the `.o1-shell` ancestor plus the shell-scoped custom properties keep the legacy (flag-off) surface and every other route out of range. Ink `#18211D` on persimmon `#F15A35` ≈ **4.9:1**, clearing the 4.5:1 body rule that white (≈3.4:1) failed — contract `12` §3 / F3 satisfied. Both final PNGs show dark labels on persimmon across all seven cards.

**Wishlist stays quiet.** The `:not(.wish-card-btn)` child boundary is what excludes it — the wishlist control is itself a `button`, so a plain descendant selector would have caught it, exactly as the first attempt (`e6b402e`) did. Both PNGs show white outlined 44 px hearts beside coloured cart actions, with no overlap and Wishlist still first in DOM order.

**Disabled is truthfully distinct.** `…button:disabled { background: var(--mist); color: var(--pine) }` `(0,3,2)` overrides the action colour with mist `#DDE8E1` + pine `#24463C` ≈ **8.3:1**, so an unavailable action no longer reads as an active commerce control and never uses white.

**Test meaning is adversarial.** It pins the exact scoped selector and both colour pairs, forbids white on persimmon in enabled and disabled states, re-asserts the wishlist's quiet outline, and — the real guard — forbids the overbroad `.o1-card-actions button {` form that produced the caught defect. This is a regression oracle derived from an observed failure, not a green count.

**Scope.** CSS and one test file only: no component, behavior, data, route, auth, schema, DB, provider, economic, or public-runtime change.

## Environment-only residuals

- Mobile bottom-tab emoji icons still render as missing-glyph boxes in the CJK-only capture environment; labels remain, so no state depends on the icon.
- The Next.js dev indicator overlays the bottom-left tab in both captures — a dev-runtime artifact.
- I neither rendered nor reran: colour claims come from the two owner-supplied PNGs plus cascade reading, and gate `86`'s computed values (`rgb(241,90,53)` / `rgb(24,33,29)` / `rgb(255,255,255)`) are cited as reported.
