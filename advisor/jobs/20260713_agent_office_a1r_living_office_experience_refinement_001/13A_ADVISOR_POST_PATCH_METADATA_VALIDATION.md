# Advisor Post-Patch Metadata Validation

## Verdict

`PROCEED_WITH_NARROW_METADATA_CORRECTION`

Advisor directly verified Control patch `8522f3c3df1f39bed976eb7189ea3e43edbf2dbd`:

- exact linear ancestry from `b966c6a`;
- clean worktree and local/upstream/direct-origin equality;
- exactly 12 changed `docs/**` paths and no runtime/test/config/dependency path;
- all four affected PNGs inspected at original size;
- the six Sentinel findings are substantively addressed;
- prior Pod/mobile corrections remain visually intact.

Four documentation-only metadata inconsistencies must be corrected before the
same-Sentinel delta re-review:

1. `AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md` §4.1 reverses the canonical event
   contract section citations. `BlockerOpened` / `BlockerKind` is §7.2;
   `AlertRaised` / `AlertKind` is §7.3.
2. `AGENT_OFFICE_A1R_LIVING_OFFICE_PRODUCT_EXPERIENCE_DESIGN.md` traceability
   row 2 still says `390×844`; the committed mobile SVG is `390×1200` and PNG is
   `780×2400`.
3. The same design document still uses `BA-WU-03` as an example despite the
   explicit fail-closed rule that A-1R WorkUnits are undefined until approval.
   Remove that example; preserve the rule that real technical identifiers are
   shown exactly when an accepted source exists.
4. Clarify in the design traceability/spec that the long mobile artifact is a
   static state-comparison sheet: one Office frame followed by two alternative,
   mutually exclusive bottom-sheet states. It must never imply that actor and
   Advisor sheets are simultaneously open in the runtime viewport.

This correction changes no product decision, interaction contract, source
mapping, authority, visual geometry, SVG/PNG, runtime, test, or scope. Do not
re-export images and do not rerun geometry or runtime suites. Verify only the
four exact text corrections, `git diff --check`, changed paths, and regression
that the six finding closures remain unchanged.
