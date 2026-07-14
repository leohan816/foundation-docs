# Worker Brief

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/fable-builder`

Implement only the physical identity migration described in `01_ADVISOR_BRIEF.md`.
Use the existing exact-delivery architecture; do not redesign transport.

Allowed production areas:

- `src/adapters/gateways/tmux-advisor/exact-config.ts`
- `src/adapters/gateways/tmux-advisor/exact-authority.ts`
- `src/adapters/gateways/tmux-advisor/exact-transport.ts`
- `src/adapters/observations/artifacts/decision-authority.ts`
- `src/application/advisor-inbox/evidence-ingress.ts`
- `src/runtime/operational-config.ts` only if required by explicit version parsing
- `config/agent-office.exact-delivery.disabled.example.json`
- exact-delivery canonical docs that are materially stale because of this delta
- focused exact-delivery tests
- this mission's Agent Office result artifacts

Forbidden:

- historical evidence/job artifact modification;
- VibeNews files or registry rows;
- Slack/AS1 code or activation;
- actual tmux input;
- destination selection, wildcard/broadcast, shell interpolation, or authority
  expansion;
- unrelated source, product, visual, auth, DB, secret, remote, or dependency
  changes;
- merge, main push, force push.

Completion requires a committed, non-force-pushed candidate and a durable result
that reports every command, failure, changed file, versioning choice, historical
preservation proof, current-target negative tests, Git state, and rollback.
