# P0 Advisor Admission

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
VERDICT: PROCEED_WITH_LIMITS
PRODUCT_BASE: 3dc5129b573237a85f34bfa65a329a299d31fef2
PRODUCT_BRANCH: implementation/cosmile-console-dashboard-authority-correction-v1-20260724
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
DESIGN_DOCS_HEAD: b47f1b8e85bcb7020b5b5b8bb952aeade94f8db7
DESIGN_VERDICT: PASS_WITH_RISK
DESIGN_BLOCKERS: 0
```

## Admission evidence

- Product base and upstream pin were clean and equal before worktree creation.
- The isolated product branch/worktree was created directly from the authorized base; product changes remain none.
- The existing preview remains bound to `127.0.0.1:3000` from the predecessor worktree. Its process, disposable DB, hostname and tmux sessions were not changed.
- Existing Cosmile Worker is live on Claude Opus 4.8 `[1m]` / xhigh and idle. Its process CWD is the predecessor worktree, so every mission command must use the exact mission worktree explicitly.
- Existing independent Reviewer is live on Fable 5 `[1m]` / max and idle. It is not admitted until a stable candidate exists.
- Agent Office authority, product rules, security/env/migration policy, test-meaning policy, `/fable-builder`, and `/fable-sentinel` were re-read.

## Limits before product write

The reviewed design fixes the target authority and UI contracts but deliberately did not propose implementation schema or paths. Product write is blocked until the Worker returns a read-only source-to-contract map and the Advisor freezes:

1. the smallest additive authority persistence and migration, or a proven no-schema route;
2. Console credential-to-OperatorPrincipal binding that grants no capability by itself;
3. exact capability/grant/revocation/session/step-up/audit enforcement seams;
4. exact route/component reuse and transition behavior;
5. exact focused tests, disposable DB boundary, rollback and final gate;
6. module-by-module file ceilings.

No Founder decision is presently missing: Mission 2 authorizes the provider-neutral principal, explicit default-deny grants, additive isolated non-production schema where necessary, and preservation of the reviewed O1 command boundary. Any contradiction requiring weaker authority, commerce semantic change, destructive/shared data action, or broader rewrite returns `NEEDS_DECISION`.

## Next gate

Dispatch one read-only technical-mapping pass to the existing Cosmile Worker. No product write, test, build, dependency, DB, runtime, provider, preview or session action is admitted in that pass.

