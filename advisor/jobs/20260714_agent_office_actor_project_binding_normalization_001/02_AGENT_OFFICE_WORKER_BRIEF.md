# Agent Office Worker Brief

## Target

- Repo: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Worker: `agent-office-opus`
- Required skill: `/fable-builder`

## Allowed Files

- `docs/roles/**`
- `.agent-office/project-binding.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/FEATURE_INDEX.md`
- `src/application/organization/types.ts`
- `src/application/organization/registry.ts`
- `src/application/organization/index.ts`
- one focused organization-registry contract test under `tests/contract/`

## Exact Work

1. Reuse the reviewed registry model from commit `58a484b`; do not copy its
   visual renderer, evidence fixture, UI, or product behavior.
2. Define one current actor registry with the required Founder fields:
   actor ID, role, Team, reports-to, allowed projects, tmux session, default
   project binding, model/runtime observation policy, protocol state, authority
   profile, and dispatchability.
3. Define current Team records for Agent Office, Foundation, and VibeNews,
   including responsible Advisor, projects, members, and unresolved future Slack
   channel-ID mapping. No Team authority may be inferred from names or proximity.
   Encode the invariant that all assignments and result routing pass through the
   one responsible Advisor; subordinate roles cannot self-assign or dispatch.
4. Register current concrete actors, including Agent Office Advisor/Designer/
   Worker/Reviewer, Foundation Advisor/Designer/Control/Workers/Reviewer, and
   current verified VibeNews roles. Model and effort remain revalidation-bound.
5. Create one common role-document set: `advisor.md`, `designer.md`, `worker.md`,
   `reviewer.md`, `control.md`, plus a short role-system index and one deduplicated
   set of useful Advisor templates.
6. Preserve useful constraints from foundation-docs commit `076f0f4` without
   duplicating actor manuals or creating role-named project folders.
7. Update Agent Office root instructions and overlay with concise pointers only.
8. Link the role system and organization registry from `FEATURE_INDEX.md`.

## Forbidden

- Slack implementation or connection;
- visual/UI/runtime behavior changes;
- transport, authentication, DB, secret, remote, production, or delivery
  activation;
- any Slack, Worker, Designer, Control, or Reviewer path that bypasses the
  responsible Advisor;
- copying rejected visual code or failed Grok code;
- editing any other repository;
- broad tests, role/session creation, self-review, or next-mission start.

## Focused Gates

- focused organization registry contract tests;
- `npm run typecheck` only if required to prove the added source contract;
- targeted lint for changed TypeScript;
- `git diff --check`;
- exact role/registry/overlay reference checks;
- verify unrelated `.grok/`, `grok-max`, `grokx`, and `grokx-max` remain
  untouched and unstaged.

Commit and push non-force. Return exact diff, commands including failures, test
counts, commit, upstream state, and rollback.
