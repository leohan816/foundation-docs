# Worker Patch Path Fence

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

This is an in-place clarification of `07_WORKER_PATCH_HANDOFF.md`, not a new
scope or another patch train.

Before completing the current patch:

1. Require `snapshotRefs.physicalMigrationDecision.path` to equal exactly:

   `advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/01A_ACTIVE_REFERENCE_SCOPE_CLARIFICATION.md`

   Valid migration text at any other path must fail closed.

2. Validate unambiguous prohibition semantics from the committed decision, not
   only the presence of legacy tokens. Require exact stable clauses proving:
   - no active code/config may resolve, deliver, or fall back to the historical
     destination;
   - historical artifacts are non-routable and non-authoritative;
   - the historical roleInstanceId is evidence-only and never a current
     destination or authority subject;
   - VibeNews, Slack/AS1, and tmux input remain unchanged/inactive.

3. Add a negative test where identical valid decision bytes are referenced from
   a different trusted-repository path. It must fail.

Keep the current allowed files and targeted gates unchanged.
