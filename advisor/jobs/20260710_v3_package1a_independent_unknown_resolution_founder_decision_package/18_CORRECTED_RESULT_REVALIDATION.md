# Advisor Revalidation - Corrected Blind Assessments

Date: 2026-07-10

Status: `ALL_CORRECTED_ASSESSMENTS_ACCEPTED_FOR_COMPARISON`

## Frozen Input Integrity

- Register commit: `fab82c45f7e92ed2652dc6de9db55532fabb661b`
- Register Git blob: `0eac3e290269c5154029d79864b99c9235807013`
- Register SHA-256: `dab0ffa15452db860d3ba6f71b58401d4447e81b811c22c3c4a87a379f26e0cb`
- Current register matches all three identifiers.
- No frozen question was edited. Post-freeze findings remain assessment addenda.

## Cosmile Correction Revalidation

Correction commit: `d28307b282427236611477ff6c6e0a3d6976e357`

Commit scope is limited to the Cosmile assessment and its pointer.

`C-F1` is closed:

- the corrected result names all active sanitizer layers;
- blocked raw-text keys and the message-rejection test are acknowledged;
- the remaining unlisted-key prose exposure is correctly labeled a static code-path possibility;
- no observed persistence, deployed behavior, or customer-use claim remains;
- dependent U-01/U-05 text, tables, addendum A-C3, and surface inventory were corrected;
- the runtime evidence base remains Cosmile commit `e4ed6680fee2a2e55117fb406cae8714e3680465` with no runtime change.

Verdict: `ACCEPTED_FOR_COMPARISON`.

## Foundation Correction Revalidation

Correction commits: `1e03aa5a0527be87f16520823270be9d155f6dfb` and pointer metadata commit `9518bc681022d75c080a6cb3f33adb0375cd6d4b`.

Commit scope is limited to the Foundation assessment and its pointer.

All findings are closed:

- `F-P1`: the original use of five sub-agents is disclosed and labeled process-noncompliant; the corrected artifact records direct same-session re-verification without agents, delegated contexts, or temporary sessions;
- `F-F1`: U-01 through U-09 each contain exactly one occurrence of all 14 required fields;
- `F-S1`: the vault-dashboard addendum and dependent claims are removed from the Package 1A result;
- `F-V1`: the pointer records the actual process status, correction commits, scope, and field compliance.

Blindness remained intact: no other actor or Advisor first-pass content was read. No runtime, DB, secret, live-model, or production access was introduced.

Verdict: `ACCEPTED_FOR_COMPARISON`.

## Fable5 Correction Revalidation

Correction commit: `99559f7194d4b13f9392e85a00bc5318138aa571`.

Commit scope is limited to the Fable5 assessment and its pointer.

All findings are closed:

- `FB-P1`: the original five sub-agents are disclosed; the original pass is labeled process-noncompliant; the corrected result contains a direct same-session verification inventory and accepts the prohibition as written;
- `FB-E1`: env-key-name, secret-path metadata, and DB-file metadata are removed from evidence and conclusions; affected runtime states are `UNVERIFIED`;
- `FB-F1`: ADD-03 is limited to a static unlisted-key write-capable path, with no observed-persistence or feedback-product-path claim.

Advisor spot checks confirmed the load-bearing code claims used in the comparison:

- `FoundationSignalOutbox` enqueue is called from the commerce event service without a feature-flag guard;
- 33 API route files import the commerce event service at the inspected Cosmile commit;
- the mapper writes a local user identifier and derives `user_consented` from user-id presence in code;
- foundation-control hardcodes the response invariants and `compose: true` in the inspected contract path;
- deployed rows, credential presence, provider behavior, and DB state remain unverified.

Verdict: `ACCEPTED_FOR_COMPARISON`.

## Process Finding

Both Foundation and Fable5 originally violated the no-sub-agent rule. Their original commits remain historical evidence of that process deviation. The corrected versions are accepted because:

1. the violation was disclosed rather than hidden;
2. blind independence was preserved;
3. the same existing actor sessions directly re-verified their load-bearing claims without delegation;
4. unsupported or out-of-scope claims were removed or downgraded;
5. no new temporary actor/session was used for the correction.

This acceptance does not weaken the no-sub-agent rule for future missions.

## Comparison Gate

The four independent positions now available for comparison are:

- Advisor first pass at freeze commit `fab82c4`;
- corrected Foundation assessment at `9518bc6`;
- corrected Cosmile assessment at `d28307b`;
- corrected Fable5 blind assessment at `99559f7`.

Cross-actor comparison may begin. Package 1B design, Control invocation, implementation, DB access, live-model calls, and product-policy approval remain forbidden.
