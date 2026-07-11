# Advisor Batch D Validation

Status: `BATCH_D_REWORK_REQUIRED`

## Verified Evidence

- Worker result and pointer exist and are pushed.
- Target branch `shadow/agent-office-m01` is clean and equals
  `origin/shadow/agent-office-m01` at
  `6f93dcd209da6219f9c8f240470034cb639db3d7`.
- Code/test commit `7366036f8a1e6fc9d4e911e8d193e17eeb95f54c`
  and seven-file as-built documentation commit
  `6f93dcd209da6219f9c8f240470034cb639db3d7` have the reported scope.
- The Worker-reported verification is internally consistent, but direct source
  inspection found the fail-closed defect below.

## Finding AO-D-R1: Invalid capability vocabulary can become READY

Severity: `HIGH` for the future transport-authority boundary.

`src/adapters/gateways/tmux-advisor/index.ts` calls `assertCapability`, but the
validator does not verify the runtime values of `state`, `killSwitch`, or
`synchronization`. An object with all three set to an invalid string passes the
validator and `capabilityFailure` returns `NONE`.

Direct reproduction against the built commit returned:

```json
{"adapter":"TMUX_ADVISOR","status":"READY","failureCode":"NONE"}
```

The reproduction used invalid runtime strings for all three fields and otherwise
valid identifiers, timestamps, and hashes. This contradicts the canonical rule
that any absent, stale, conflicting, or invalid capability field must fail closed
without invoking delivery.

Related temporal precision gaps:

- a capability whose `issuedAt` is in the future is currently accepted;
- exact `expiresAt` is currently accepted because the check is `>` rather than
  an exclusive `>=` boundary; and
- `health()` does not validate the adapter clock before temporal comparison.

## Required Rework

1. Validate the exact runtime vocabulary for `state`, `killSwitch`, and
   `synchronization`.
2. Invalid capability data must not produce `READY` or invoke the delivery port.
   Preserve the existing manual-fallback behavior for unavailable/invalid
   authority rather than adding a dynamic recovery path.
3. Treat `now < issuedAt` and `now >= expiresAt` as stale/mismatched.
4. Validate the clock used by `health()` and queue/lookup paths consistently.
5. Add regression tests using deliberately malformed runtime values cast through
   `unknown`, plus future-issued and exact-expiry cases. Assert manual fallback
   and zero delivery-port calls.
6. Update only materially affected as-built documentation. Do not start Batch E.

## Verdict

`NEEDS_PATCH__BATCH_E_NOT_AUTHORIZED`
