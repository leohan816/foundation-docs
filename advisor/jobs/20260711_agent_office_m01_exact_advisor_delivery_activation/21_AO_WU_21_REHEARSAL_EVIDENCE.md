# AO-WU-21 Exact Advisor Delivery Rehearsal Evidence

Status: `REHEARSAL_COMPLETE__CLEANUP_PENDING`

This record contains only non-secret evidence. LocalBootstrap proof and session
material are excluded and are deleted during cleanup.

## 1. Reviewed implementation

- Initial implementation: Agent Office `889a29b3e75da086a32ac76909a0ce9f4848ddfa`
- Initial Fable5 implementation/security verdict: `PASS`, foundation-docs
  `24bc621`
- Rehearsal-discovered exact-path history fix:
  `73157613345ad3046e45b99b145f5400c8dc5428`
- Worker focused/full verification: `46/46`, `296/296`, lint, typecheck, build
- Fable5 Level-3 history-fix delta verdict: `PASS`, foundation-docs `a9e7888`

## 2. Positive exact delivery

The first one-use attempt delivered exactly one pointer to the fixed existing
Advisor pane `foundation-advisor/$9/@9/%9`.

- request ID: `019f51c1-add6-7af1-9ff8-5a5edd183b31`
- message ID: `019f51c1-ae2d-7b46-b1ee-083ec96db7f3`
- notification ID: `019f51c1-ae35-71d0-8fe9-0585c56ac86e`
- message artifact hash:
  `sha256:9214d0382301a6743fbb1885f88a4d4b136561061c51380cc9e172e67ce75f6d`
- exact journal phases:
  `PREPARED > BUFFER_LOADED > PASTE_STARTED > PASTE_CONFIRMED > SUBMIT_STARTED > TRANSPORT_RECORDED`
- journal SHA-256:
  `15956c3887dcf346a50c71c19104bf46a23664a5f8f602e38adede96f0c1eb7e`
- duplicate request replay returned the original message with `replayed=true`;
  no second notification, paste, or submit occurred.
- the exact pointer envelope was received in the existing Advisor session and
  its message artifact hash was verified before acknowledgement.

The first chain applied ACK and intake. Its first generated decision reference
incorrectly named a later HEAD instead of the immutable intake-addition commit,
so decision application failed closed. No resume occurred from that chain.

## 3. Fail-closed target-change attempts

Two subsequent fresh leases reached `BUFFER_LOADED`, but the Advisor window
activity changed between the two exact preflights while this same Advisor
session was actively running the rehearsal. Both attempts stopped before paste:

```text
PREPARED > BUFFER_LOADED > MANUAL_RECONCILIATION_REQUIRED
```

- round 2 journal SHA-256:
  `20cbc47f0ead94908857be6145bda35639b193ac705e9d8377b6a58487bc9354`
- round 3 journal SHA-256:
  `ea3705ba69be9186e098bf12510b74955cbc984c26015ca99a88c34894591034`
- both instances durably latched delivery disabled;
- no blind retry, paste, Enter, or duplicate delivery occurred;
- manual fallback remained visible.

This is expected safe behavior: exact delivery requires the fixed Advisor pane
to remain unchanged between preflights. The earlier idle-pane attempt is the
single positive real-delivery proof.

## 4. Rehearsal-discovered code defect and closure

The round-3 decision evidence exposed a separate Git-history false positive:
`git log --follow` linked similar `03_DECISION.json` files across distinct
message directories. The observer rejected the evidence before applying the
decision.

The scoped fix removed only `--follow`, retained exact-path multi-commit rewrite
rejection, added a deterministic disposable-Git regression, passed all Worker
gates, and received Fable5 `PASS`. After the patch, the preserved decision
evidence applied without rewrite.

## 5. Complete acknowledgement and resume chain

The round-3 manual-fallback chain proves that work cannot resume from transport
receipt alone. Exact committed evidence was applied in this order:

1. ACK: foundation-docs `17bd43c`, event sequence 9
2. intake `ROUTINE_ROUTE`: `23d9d5b`, event sequence 10
3. bounded Advisor decision: authority `6b48bd7`, decision `d086978`, event
   sequence 11
4. resume proof: `b8ff148`, event sequence 12
5. `AO-WU-21`: `WAITING_ADVISOR -> READY`

The resume proof binds the exact intake hash, exact decision-authority hash,
decision ID, original waiting event, and expected stream version 11. No work was
marked resumed before canonical intake and decision evidence existed.

The round-3 ACK file contains the inherited free-form evidence label
`exact-pointer-received`. That label is not authoritative for round 3 and must
not be interpreted as a second positive transport. The authoritative journal
and receipt state are `MANUAL_RECONCILIATION_REQUIRED`. The sole positive exact
transport is the first attempt recorded in section 2.

## 6. State evidence before disposal

| Run | Events | Event stream SHA-256 | Delivery-control SHA-256 |
|---|---:|---|---|
| positive delivery | 10 | `64501b59e1712085034548fa1485e04de2ef56c19da82874359d91bf384fb1e6` | `bcf7c9e086bc6987160300f4314154c0b38e9b56093039550a5c89ba613b3297` |
| target-change round 2 | 8 | `ff7dc79ec3cf0726ecc895a2f1e3dd9392e581599360765b81cea34997b25f2a` | `343e86adb9b3641215c657daa66a22f2a7c1017a2831e7d260126800791a6af1` |
| complete evidence chain round 3 | 12 | `2c29a5f807f6f94033deddecf9a0f980ebdb9e5f0ec221daa892acf69768a3d6` | `e143ce53bbaed9c458990dc0cfb21ae4c2368bd3e0d2a6a9d94bbc1d75bd697a` |

## 7. Security conclusions

- browser input targeted Advisor only;
- browser received no Worker, Reviewer, pane, shell, or arbitrary-command
  authority;
- no shell interpolation, wildcard, broadcast, or synchronized-pane dispatch;
- one exact destination only;
- one-use lease and request idempotency held;
- target instability caused fail-closed manual fallback;
- delivery disable latched across control reopen;
- no DB, public, remote, production, Hermes, or multi-user scope;
- no secret value is present in this artifact.

## 8. Remaining action

Delete all disposable config/run/state roots and the committed current readiness
file, verify no listener/lock/buffer/proof/session material remains, then perform
AO-WU-15 final audit.
