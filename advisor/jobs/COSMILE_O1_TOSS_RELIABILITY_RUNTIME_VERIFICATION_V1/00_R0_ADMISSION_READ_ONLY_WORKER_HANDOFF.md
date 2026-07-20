# R0 Read-Only Admission Worker Handoff

```text
MISSION_ID: COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
PHASE: R0_ADMISSION_AND_EVIDENCE_CEILING
INSTRUCTION_GATE: PROCEED_WITH_LIMITS
ACTOR: cosmile
ROLE: Cosmile Worker
MODEL: Opus 4.8
EFFORT: max
SKILL: /fable-builder
SKILL_REFERENCES: contract-to-code-mapping; test-design-before-code; implementation-report-template at return
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
BRANCH: verification/cosmile-o1-toss-reliability-runtime-v1-20260720
BASE: 2faf7497448541d1bb42f3fcdb6141214f8c5608
PREDECESSOR_AUDIT_COMMIT: f66228fae2e75bcd0255e063e5bcd6d146040040
PRODUCT_WRITE: PROHIBITED
BUILD_TEST_DB_RUNTIME_PROVIDER: PROHIBITED

MANDATORY_READS:
- /home/leo/Project/agent-office/AGENTS.md
- /home/leo/Project/agent-office/CLAUDE.md
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- repository AGENTS.md, CLAUDE.md, app/CLAUDE.md, app/docs/testing/TEST_MEANING_POLICY.md
- /home/leo/Project/skill/fable-builder/SKILL.md and exact listed references

AUTHORITY_RULE:
- Current Agent Office authority controls. Any foundation-docs V2 role text referenced by repository or skill material is historical evidence only.

READ_ONLY_TASK:
1. Cryptographically verify this committed handoff, product base/branch/worktree/upstream/clean state, and predecessor audit pins.
2. Map only the load-bearing Toss reliability runtime surfaces at HEAD: existing routes, runtime/service/repository contracts, approved migrations, focused scripts, runtime flags, secret-variable names, and cleanup surfaces.
3. Freeze the smallest R1-R4 module/action sequence, exact product write ceiling if a bounded correction is later required, and exact command inventory. Do not execute commands that build, test, generate, install, start runtime, touch DB, or contact a provider.
4. Define the isolated DB boundary: one disposable PostgreSQL instance, loopback or Unix socket only, no host/shared/prod DB, synthetic data only, exact approved migrations, identity/category evidence only, and blocking teardown proof.
5. Define HTTP/runtime composition: exact bind address/port, restricted access rule, callback need, route matrix, restart points, log redaction, cache/output paths, and start/stop/cleanup commands. Do not start it.
6. Separate evidence layers: ACTUAL_TOSS_TEST_PROVIDER versus CONTROLLED_PROVIDER_SHAPED_SYNTHETIC. General-payment notifications remain untrusted until server-side Payment Query binds orderId, exact positive KRW amount, paymentKey, currency, and durable internal state. Signature checks apply only to officially documented signed event classes.
7. Cover named scenarios: intake, duplicate, delayed, out-of-order, paymentKey-missing orderId query, capture/refund persistence recovery, restart/lease recovery, exhausted-visible/nonclaimable, operator GET/POST with allowlist+fresh nonce+step-up, and exactly-once economic effects.
8. Determine whether Google browser/console action is actually required. Prefer synthetic test identities and existing server/session boundaries when they prove the contract without weakening auth. Do not mint/bypass authority.
9. Record credential readiness by variable NAME and SET/MISSING only. No protected owner.env or equivalent was discoverable at Advisor preflight; do not read, print, copy, hash, or infer any value. Treat provider execution as blocked until a protected owner-controlled source is verified.
10. Return exact stop conditions, expected duration within 1-2 workdays, review evidence bundle, and any single consolidated non-secret Leo action needed later.

OFFICIAL_TOSS_GROUNDING:
- https://docs.tosspayments.com/reference
- https://docs.tosspayments.com/reference/using-api/webhook-events
- https://docs.tosspayments.com/en/webhooks
- https://docs.tosspayments.com/guides/v2/get-started/environment
- Current official docs: general PAYMENT_STATUS_CHANGED has no documented signature header; payout.changed/seller.changed do. Non-200 triggers webhook resend; TEST keys isolate virtual payment effects.

STRICT_EXCLUSIONS:
- No source/doc/config/package/lock/schema/migration write; no branch movement after admission; no install/generate/build/typecheck/test/runtime/DB/provider/network action.
- No secret value, PII, raw identifier, paymentKey/order ID/provider body, credential hash, env dump, or public callback registration.
- No broad inventory, Golden Commerce re-review, redesign, feature expansion, cancellation/return/partial refund, another PSP/identity provider, Foundation/SIASIU/Memory work, merge, production/live/Controlled Live/Paid Beta.
- No subordinate dispatch, sub-agent, Reviewer, or next phase. Return to Advisor and STOP.

RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/10_R0_ADMISSION_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/11_R0_ADMISSION_POINTER.md
REPORT_CEILING: 80 lines result; 20 lines pointer
RETURN_TO: foundation-advisor
STOP
```
