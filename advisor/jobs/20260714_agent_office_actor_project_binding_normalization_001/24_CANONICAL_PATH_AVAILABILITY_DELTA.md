# Canonical Path Availability Delta

## Finding

The reviewed role documents exist on
`normalization/actor-project-binding-001`, but project roots point to the stable
canonical path `/home/leo/Project/agent-office/docs/agent/...`. The current
canonical checkout is still `shadow/agent-office-m1-2-spatial-office` at
`ac8ba75`, so the newly referenced files are not yet visible there.

## Exact Patch

Using the same `agent-office-opus` Worker:

1. In `/home/leo/Project/agent-office`, verify the branch is
   `shadow/agent-office-m1-2-spatial-office`, its tracked state equals upstream,
   and the four pre-existing Grok-related untracked paths remain excluded.
2. Cherry-pick only the two documentation commits:
   - `b6fd321b27b0bb76d1ea935bb7ab977924fdf5ba`
   - `5df16b3`
3. Before accepting the cherry-picks, verify the resulting diff from `ac8ba75`
   contains only:
   - root `AGENTS.md` / `CLAUDE.md`;
   - `docs/agent/**`.
4. Resolve only documentation conflicts without changing meaning. If any source,
   test, fixture, product, config, or package file would change, abort safely and
   return the blocker.
5. Run `git diff --check`, exact path/link checks, commit/upstream checks, and
   non-force push the existing shadow branch.
6. Update the durable Worker result with the final canonical-checkout commit and
   state that the temporary normalization branch remains review evidence only.

No VibeNews protected/master merge is authorized. Its docs-only branch remains
pending review/Founder disposition. Machine registry and AS1 remain deferred.
