# 82 — Home Visual-Delta Review

VERDICT: **`PASS`** · blocking **0** · `RETURN_TO: foundation-advisor`

Binding: actual `claude-opus-5` / `max` / `/fable-sentinel`; handoff `81` @ docs `594bda1` sha256 `c67c10d1…`. Product `3f4f368c..cb1e2c6e` in the exact mission worktree = 2 commits, **exactly 3 paths** (`page.tsx`, `globals.css`, home visual test), clean. Read-only: no rerun, no build/runtime/browser, no mutation, no commit. Predecessor worktree untouched.

**Plain home → editorial + ledger: CLOSED.** `page.tsx` groups kicker/serif title/body/pill into `.o1-lead-copy` and adds an `aria-hidden` `.o1-lead-ledger` whose count is `{items.length}` and whose tiles are `items.map(...)` — no literal, no control, no href, no image. `globals.css` gives the lead real presentation: `1fr` mobile → `minmax(0,7fr) minmax(0,5fr)` at ≥1024, serif title 31px → 54px/1.08, `62ch` measure, pine 999px pill, mist ledger surface. Both PNGs match: desktop shows the two-column lead with `7` + 7 tiles; mobile shows the same lead stacked.

**Overlap and action order: CLOSED.** `.o1-card-actions` is now `grid-template-columns: 44px minmax(0,1fr)`, the legacy absolutely-positioned `.wish-card-btn` is returned to normal flow **inside this grid only** (`position: static; grid-column: 1`) and everything else takes column 2. Wishlist therefore sits left of the flexible Cart action in both captures, visual order equals DOM order (card DOM is wishlist → cart), and no control overlaps another. The component itself is untouched.

**Preserved.** Count-independence holds — the lead copy names no number, and count/tiles/`sec-label` all derive from the same rendered array, so eight admitted items need no branch. Media stays truthfully absent (`제품 이미지 준비 중`), the shell is a real responsive viewport with no device frame, targets stay ≥44 px (`> * { min-height: 44px }` plus the C1 anchor rule), and the delta adds no data, route, behavior, component, or authority.

## Residual limitations

- **R1 (pre-existing, outside this delta).** Both captures show the Cart action as Tailwind orange with **white** label, while accepted contract `12` §3 froze persimmon `#F15A35` with **ink** text after design finding F3. The button's colors live in `AddToCartButton`'s classes, untouched here, so the delta neither caused nor closes it — but the accepted color/contrast rule is not yet implemented on the primary commerce action.
- **R2.** Mobile bottom-tab icons render as missing-glyph boxes in the capture environment (legacy emoji icons, CJK-only font set). Labels remain, so state is not carried by icon alone.
- **R3.** Both PNGs carry the Next.js dev indicator over the bottom-left tab — a dev-runtime artifact, not product.
- **R4.** I did not render or rerun anything: layout claims rest on the two owner-supplied PNGs plus cascade reading, and gate `80`'s computed measurements (`653.328/466.672`, `326px`, overlap 0) are cited as reported, not reproduced.
