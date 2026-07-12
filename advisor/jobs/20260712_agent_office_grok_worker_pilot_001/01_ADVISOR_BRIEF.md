# Advisor Brief - Agent Office Grok Worker Pilot 001

## Instruction Verdict

`PROCEED_WITH_LIMITS`

The existing Grok session is authenticated and exposes `grok-build`, but it was
launched at `high` effort. The exact pilot requires `medium`; Advisor must change
and reverify that setting before accepting qualification. Existing main-checkout
Grok files are unrelated dirt and are excluded through a dedicated worktree.

## Objective

Evaluate Grok as a bounded candidate Worker by implementing only a truthful,
read-only tmux discovery and AI-runtime classification foundation. A tmux session
must never be treated as proof of an AI, model, effort, or active work.

## Authority Boundaries

- Worker implements only the exact pilot slice and returns evidence to Advisor.
- Fable5 independently reviews the candidate and may not patch it.
- Advisor validates routing, evidence, scope, and the final recommendation.
- Leo/GPT alone decides whether Grok receives another evaluation.
- `agent-office` Codex Worker is excluded from all participation.

## Acceptance Summary

1. Strict read-only types cover server, tmux hierarchy, runtime evidence, source,
   observation time, and the authorized truthful states.
2. Parser/adapter consumes fixed structured `tmux list-panes -a -F ...` output.
3. Shell-only, dead, unknown, attached-idle, offline, malformed, duplicate, and
   conflicting cases fail closed.
4. Process names never prove model/effort; session names never prove identity.
5. `AI_WORKING` requires accepted structured work evidence, not prose/time/attach.
6. No polling, remote access, tmux input, browser command route, runtime integration,
   auth, DB, secret, team assignment, or visual-direction changes.
7. Focused tests plus lint, typecheck, complete unit suite, and build pass.
8. Candidate is committed and non-force pushed only on the pilot branch.

## Mandatory Stops

Stop for authentication, model/effort mismatch, overlapping dirt, new authority,
security expansion, destructive action, Reviewer `PASS_WITH_RISK`/`FAIL`, or need
to contact the excluded Worker.
