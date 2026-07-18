Activate `/fable-builder`, then execute the exact committed handoff
`119_PERSONAL_LEO_ONLY_DIRECT_SPOOL_WORKER_HANDOFF.md` from its committed current-mission
authority revision.

Use the existing `agent-office-opus` Worker and current verified Opus 4.8 Max profile in
the named worktree. Preserve the immediate `DELIVERY_CONFIRMED` dirty delta, remove only
the superseded handoff-118 additions, and leave legacy outbox/evidence final diff at zero.
Implement only the fixed direct spool path within the frozen allowlist. Run only the two
exact `-t` cases, changed-file ESLint, diff-check, and zero-outbox-diff proof. Commit and
non-force push one complete candidate or return one concrete blocker; then STOP.
