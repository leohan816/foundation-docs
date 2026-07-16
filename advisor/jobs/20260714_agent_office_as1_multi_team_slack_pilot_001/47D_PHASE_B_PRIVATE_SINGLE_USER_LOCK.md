# AS1 Phase B Private Single-User Lock

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

STATUS: `ACTIVE_SCOPE_LOCK_BEFORE_DESIGN_COMMIT`

Phase B is locked to the smallest private pilot Leo can personally use:

- one configured Slack workspace;
- one authorized user, Leo;
- two fixed apps and immutable channel mappings;
- one fixed profile active at a time;
- foreground manual start and stop only;
- exactly one real round trip per channel, sequentially.

Preserve only the essential identity, secret, fail-closed, dedupe, exact-tmux,
and same-thread-result protections already reviewed in Phase A.

The active design and later implementation must not add multi-user or
multi-workspace behavior, generic frameworks, databases, admin UI, permanent
services, high availability, generic rollout machinery, or exhaustive
enterprise test scope. Existing extensible allowlist data structures may remain
unchanged, but this Phase B implementation must not extend or exercise them
beyond Leo.

Apply this clarification to the same three staged Designer artifacts while
performing `47B_PHASE_B_SCOPE_AUDIT_AND_DESIGN_CORRECTION.md`. Do not restart the
design, create another product artifact, or broaden the implementation map.
