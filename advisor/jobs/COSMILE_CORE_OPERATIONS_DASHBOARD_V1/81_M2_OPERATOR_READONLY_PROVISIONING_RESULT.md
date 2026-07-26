# M2 operator read-only provisioning — Worker result

OUTCOME: `PROVISIONED` — every completion criterion met; no HOLD path taken.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · ACTOR existing Cosmile Worker (`cosmile:claude.0`) · `claude-opus-5/xhigh` · SKILL `/fable-builder` (implementation-execution; report template at return)
HANDOFF: docs `3c6c042921e9769e64e54c718e493e9fe354f14e`, blob `13f85e2536143501bfece36edd8e5f74404e17ce`, SHA256 `f74e9bb9e5a86e172189bac9c300992f25b570dd62253475ee3f71ad91de8f14`, worktree copy identical to the commit.
PRODUCT: branch/HEAD unchanged at the exact candidate; tracked delta `0`, untracked `0`; no product commit or push.

## Preflight (all fail-closed checks passed before any write)

Product clean/upstream-equal `YES`. Candidate process CWD inside the product worktree `YES`, `next-server` `YES`, listener on the public loopback port `1`. DB container running, port mapping loopback-only with no wildcard bind `YES`. Local generated Prisma client present `YES`; pinned local CLI used throughout. Protected Google and Toss stores observed by name/mode only (`600 leo:leo`, regular) — never opened. Operator-authority store absent before the run `YES`.

Cardinalities: `AuthIdentity 1`, `CustomerAccount 1`, `CustomerSession 1`, matching active Console owner `1`. Sole identity issuer is the reviewed Google issuer `YES`. Its subject satisfies the existing immutable-subject structural rule (the canonical rule reused from the product source, not re-derived) `YES`. All three authority tables absent `YES`. Pending migrations `1`, and it is exactly the reviewed migration `YES`.

## Writes performed

1. Migration applied exactly once through the pinned local CLI, exit `0`, "all migrations successfully applied"; product tracked delta `0` immediately after. No generate, install, schema edit, other migration or other DB touched.
2. One DB transaction created: principal `1`, bindings `2` (`console 1`, `google_oidc 1`), global grants `5`, provisioning audit row `1`. Exact grant-set match `YES`. All grants `scopeKind=global` with null scope `YES`, no expiry invented `YES`, `grantedByPrincipalId` null (no grantor impersonation) `YES`. Grants outside the approved five, and any mutation/step-up/economic capability: `0`. Grant source and reason categories state non-production owner bootstrap and read-only Dashboard activation. The audit row is category-only (no payload, no target identifier) and is attributed to both the principal and the Console owner by FK.
3. Allowlist store created as a separate atomic fail-closed filesystem step after the transaction: regular non-symlink `YES`, mode `0600` `YES`, owner `leo:leo` `YES`, single key only `YES`, entry count `1`, sole-subject match `YES`. No temporary artifact left behind (`0`). The revoke-on-failure path was therefore not exercised.
4. One temporary execution file authored at the exact approved path, `0600 leo:leo`, regular, syntax-checked before use.

## Post-state

Customer cardinalities unchanged at `1/1/1`. Candidate runtime still running on its original PID with its **pre-provision environment** — the allowlist variable is absent from the running process environment (`0`), so the new authority cannot take effect until the Advisor's restart boundary. No session, runtime restart or public request was made.

## Reversible revocation target (proved, not executed)

`executed: false`. Target: principals `1`, bindings `2`, grants `5`; audit rows preserved `1`. Method: in one transaction set grants → bindings → principal to `revoked` with `revokedAt` and a categorical `revocationReason`, delete nothing, preserve audit history, and remove the allowlist store file. The migration itself is additive substrate and is not part of this revocation.

## Disclosure discipline

Only counts, booleans and closed category strings were emitted here and in the pane. No cookie, token, subject, issuer value, DB URL, secret, email, provider payload, or customer/account/session/user/principal/binding/grant/audit identifier was printed, hashed, copied into docs, or passed in argv. `DATABASE_URL` was taken from the candidate process environment inside the executing shell only, never printed or persisted; CLI output was filtered to keep connection strings out of the pane.

## Not proven

No runtime verification of the new authority: no restart, no request, no browser, no Dashboard render, no authorization outcome observed. Whether the five grants actually satisfy the Dashboard reads at runtime remains unverified and is the next stage's subject. No typecheck, build, test or provider action ran. This is provisioning evidence, not a review verdict.

## Boundaries

No product tracked file, schema source, migration source, fixture, test, config, manifest, lockfile, dependency, build, typecheck, browser, provider, Google, payment, refund, shipment, inventory or economic action. No mutation/step-up/economic capability, expiry invention, customer/operator conflation, direct SQL bypass of the reviewed authority shape, shared/production DB, real PII, session/runtime restart, public request or unrelated read. No agent/sub-agent/delegation, self-review, risk acceptance or approval. Stopped before Reviewer, Google identity capture, DB migration/provisioning beyond the reviewed one, public runtime switch and browser acceptance.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
