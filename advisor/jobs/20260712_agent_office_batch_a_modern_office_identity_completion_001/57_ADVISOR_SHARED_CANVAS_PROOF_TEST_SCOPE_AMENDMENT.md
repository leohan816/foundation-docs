# Advisor Shared Canvas-Proof Test Scope Amendment

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Date: `2026-07-13`

Decision: `LOW_RISK_TECHNICAL_TEST_SCOPE_AMENDMENT_APPROVED`

The second Worker rework found that both authenticated Living Office and
composed E2E specs independently implement the same production-canvas nonblank
proof. Keeping two copies would create an avoidable split-brain test contract.

The following one new test-helper path is added to the 09L allowlist:

`tests/helpers/production-office-canvas-proof.ts`

It may contain only the shared overlay-hidden production-canvas capture and
direct nonblank/color-diversity proof imported by the two already authorized
E2E specs. It must not contain runtime behavior, fixtures, auth/credential
logic, server/config changes, snapshot rewriting policy, or a threshold-only
weakening. Both specs must continue to prove initialized dimensions, more than
100 rendered colors (or a stricter directly evidenced criterion), and the
corroborating blank-fill compression separation.

No other source/test/config path is added. No Control or Founder decision is
required because this only centralizes an already authorized evidence helper.
All 09L boundaries and required gates remain unchanged.
