# Independent Design Review Brief

REVIEWER: `agent-office-reviewer`

REQUIRED_SKILL: `/fable-sentinel`

REVIEW_LEVEL: `LEVEL_3_DESIGN_SECURITY_TRANSPORT`

Do not use until the Designer returns a clean, pushed candidate. Review the
actual Setup Pack and design commit before reading its summary.

The review must determine whether:

1. existing Exact Delivery v2 behavior and accepted historical evidence remain
   unchanged;
2. the design uses a closed two-profile contract rather than a dynamic target;
3. Actor identity and immutable roleInstanceId lineage are exact;
4. each profile has independent one-use authority and durable state namespaces;
5. token pairs, App IDs, workspace, channel, and Leo identity fail closed;
6. secret parsing cannot execute shell content and no secret can enter Git/logs;
7. Socket ACK, durable receipt, dedupe, replay, and restart ordering prevents
   loss or duplicate Mission intake;
8. top-level messages create intake only and thread replies cannot create a
   second Mission;
9. DMs, bot loops, edits/deletes, wrong identities, deferred queries, and
   cross-Team fallback are rejected;
10. outbound ambiguity never causes blind resend or unsupported completion;
11. Foundation evidence and failure state cannot reuse Agent Office state;
12. kill switch, failure isolation, shutdown, rollback, and owner gates are
    implementable and tested;
13. the two Slack manifests and exact-key template are minimal and mutually
    isolated;
14. the proposed Worker scope is bounded, testable, and does not include
    VibeNews, public HTTP, DB, Hermes, Living Office, or direct Worker/Reviewer
    dispatch.

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
Do not patch, implement, accept risk, connect Slack, or create authority material.
