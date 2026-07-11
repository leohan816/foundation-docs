# Fable5 Design Review Brief - Exact Advisor Delivery

Use the same existing independent `reviewer-fable5` session, `/fable-sentinel`,
Fable5 Max, Level 3. Read the actual candidate, full diff, current code, V2 role
authority, transport authority/registry/kill-switch documents, and repository
instructions. Distrust summaries.

Verify at minimum:

1. all DQ-01 through DQ-08 are actually resolved or visibly gated;
2. no new Leo/GPT decision is hidden;
3. browser input cannot choose target, command, path, pane, key sequence, or role;
4. only exact immutable pointer content reaches the fixed Advisor pane;
5. capability and live preflight fail closed;
6. no shell interpolation, wildcard, broadcast, sync-pane, or blind resend;
7. idempotency survives restart/crash/ambiguous outcomes;
8. tmux receipt is not Advisor ACK;
9. canonical intake/decision/resume evidence has a non-test production trust path;
10. kill switch/manual fallback cannot auto-enable;
11. LocalBootstrap remains loopback-only and Worker/Reviewer dispatch impossible;
12. rehearsal and cleanup can prove the nine success criteria safely;
13. design is precise enough to implement without Worker policy invention;
14. active repo instructions no longer contain a conflicting stale bootstrap lock.

Verdicts: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, `FAIL`.

Fable5 is read-only for Agent Office and cannot create a capability, send tmux
input, patch design, or grant final approval.
