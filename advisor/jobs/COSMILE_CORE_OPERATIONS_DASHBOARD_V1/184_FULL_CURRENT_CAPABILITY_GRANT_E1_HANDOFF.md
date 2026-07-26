# Full current capability grant E1
MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`; existing `cosmile:claude.0` Opus 5/xhigh; `/fable-builder`.
SUPERSEDES: only handoff 182's external aggregate pin; preserve HOLD 183; no grant occurred.
PIN: product `2ccde154618f1bf31f48727ad33d4964495dc763`; runtime PID `1033479`; loopback DB `cosmile-o1-existing-domain-preview-pg-20260724`.
PATHS: require exactly the current five modified plus four untracked M5 paths already enumerated in HOLD 183; no other product path.
TEMP: only `grants/grant-current-capability-catalog-e1.mjs` and `grants/m5-preserved.manifest` under the mission temp root; regular `leo:leo 0600`, parent `0700`.
BEFORE: write `status<TAB>file-sha256<TAB>path` for the nine paths in HOLD 183 order; record locally.
PREFLIGHT: reuse prior M2 script/runtime evidence; exact existing Leo principal, Console+Google bindings, runtime allowlist, DB and current source catalog; emit no value/identifier.
CATALOG: exact current 16 names in `OPERATOR_CAPABILITIES`; no new capability.
WRITE: one Prisma transaction adds only missing active global/unscoped/no-expiry grants to that principal and one category-only Founder-authorized non-production audit row.
PRESERVE: existing grants/bindings/principal; default-deny; command step-up/nonce/audit/idempotency; `console.workspace.request_mock` remains non-live.
POST: principal `1`, bindings `2`, distinct active grants `16/16`, outside catalog `0`, exact set `YES`; identity/customer/session and commerce states unchanged.
AUTH: verify the current `/dashboard` predicate from the active Leo Console session + runtime allowlist + same principal/bindings + exact `dashboard.operations.read`; report `ALLOW`, not `DENIED`.
AFTER: recompute the identical nine-line manifest in memory; require byte-for-byte equality and unchanged HEAD/status.
CLEAN: delete only the temp grant script; preserve the `0600` manifest for Advisor validation.
REPORT: write concise `185_FULL_CURRENT_CAPABILITY_GRANT_E1_RESULT.md` and `186_FULL_CURRENT_CAPABILITY_GRANT_E1_POINTER.md`; commit/non-force-push; STOP.
FORBIDDEN: product/schema/migration/identity/runtime/test/build/provider/economic/secret/M5 write or action.
HOLD: any mismatch, manifest drift, non-16 result, authorization failure, or safety weakening.
RETURN_TO: `foundation-advisor`; do not resume M5.
