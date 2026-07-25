# M4-E1 Milestone Test Rebase — Additive Handoff

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M4_CORE_OPERATIONS_READ_SURFACES`
DECISION: `APPROVE_OPTION_1`

The frozen M4 handoff `50_M4_CORE_OPERATIONS_READS_WORKER_HANDOFF.md` remains authoritative with one additive correction:

- exact write ceiling becomes five paths by adding only
  `app/scripts/o1_core_dashboard_shell.vitest.ts`;
- in that file, change only the three M3 milestone assertions identified by
  `51_M4_CORE_OPERATIONS_READS_WORKER_RESULT.md`:
  1. Orders row `{ label: "Orders", m4: "/dashboard/orders" }` becomes
     `{ label: "Orders", href: "/dashboard/orders" }`;
  2. the forbidden `href: "/dashboard/orders"` assertion becomes a required assertion;
  3. the exact operations-nav href count changes from `6` to `7`.

Preserve every other M3 assertion and the complete compatibility gate. This is the tests-first M4 RED contract and a legitimate milestone rebase, not deletion, weakening, or scope expansion.

Same existing Cosmile Worker/session, `claude-opus-5/xhigh`, exact worktree and base `1ee8df08c95f2ef295881807faa3f4990e21c20b`. No new read, dependency command, DB/runtime/provider/economic action, authority, behavior, path, or M5 work. Execute the corrected M4 handoff, commit/non-force push once, compact return, STOP before M5.
