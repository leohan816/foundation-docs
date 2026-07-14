# Worker Process-Cell Grammar Fence

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

This is an in-scope clarification of F01 in
`09_WORKER_SENTINEL_PATCH_HANDOFF.md`. It does not add files, behavior, or
tests outside the existing patch.

The in-progress expression shaped like:

```text
^`codex` v<semver>; \S.*$
```

is too permissive. It allows arbitrary text after the semicolon and therefore
does not satisfy the requirement that only the explicitly validated current
registry observation annotation shape may follow the exact command token.

Before completion:

1. Accept the complete exact cell `` `codex` ``.
2. If an annotation is accepted, require the complete current canonical grammar:
   `` `codex` v<numeric semver>; live launch record identifies `<model>` / `<effort>` at this observation ``.
3. Keep the entire cell end-anchored. Reject arbitrary, missing, reordered, or
   appended annotation text.
4. Add at least one negative case that would pass the permissive
   `; \S.*` expression, such as a valid version followed by an arbitrary suffix.
5. Preserve the real canonical row as the positive annotated case.

Use only the already authorized files and gates. Continue the same Worker run;
do not restart, broaden scope, activate transport, or start Slack/AS1.
