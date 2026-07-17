# AS1 Phase B R2 Recovery Independent Design Review Result

## Verdict

**NEEDS_PATCH**

The Socket-local depth design, exact R2 root/ID binding, sealed bridge identity,
closed Korean vocabulary, safe target derivation, and three-artifact design
scope are coherent and reproducible. The design is not yet safe to implement.

Three load-bearing design defects remain. First, a successfully recorded
DELIVERY_FAILED status is not defined as a durable barrier against a later
restart performing the still-unconsumed tmux delivery. Second, a recorded
PROCESSING_FAILED status is not a durable recovery barrier and the exact sibling
rules permit a later DELIVERY_CONFIRMED status. Third, the original-root
preservation procedure is path-raceable and rollout performs it before
installing the R2-only build, while the installed old-root owner initializes
and locks the original root even with a disabled descriptor. The Designer result
also omits the failed shell-only validation helper that handoff 89 requires this
review to assess.

All defects are patchable at design/evidence level without adding a framework
or expanding the proposed 12 implementation paths. Until the patched design is
independently re-reviewed, the 12-path implementation handoff is **not safe to
issue**.

REVIEW_PASS: DESIGN_REVIEW

## Findings

### F01 — CRITICAL — DELIVERY_FAILED does not durably prevent later execution

[lifecycle/authority] e2c9d002e030eefae0f67081653fab28f6500d4d:docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md:523,531-539,619-623,759-760 ↔ cca0cb5e2485c029b6d1715e37abf9bc55c548bd:src/adapters/gateways/slack-pilot/exact-transport.ts:407,416-420,463-483 ↔ cca0cb5e2485c029b6d1715e37abf9bc55c548bd:src/runtime/as1-slack-pilot/cli.ts:545-561 — “Send DELIVERY_FAILED” / “Terminal owner halt” — STOPPED_BEFORE_PASTE occurs before a PREPARED journal and before grant/lease consumption, but the design never makes an existing DELIVERY_FAILED outbox record a startup or pre-delivery terminal gate.

Concrete failure:

1. ACCEPTED is RESPONSE_RECORDED.
2. The exact transport returns STOPPED_BEFORE_PASTE with a null delivery
   journal; the grant and lease remain unconsumed.
3. DELIVERY_FAILED reaches RESPONSE_RECORDED and tells Leo
   “전달 실패 · 요청은 실행되지 않았습니다”.
4. The owner stops or crashes before any separate durable terminal action.
5. A restart recovers the intake. The tmux journal is still null and the
   authority may still be live, so deliverPending can perform the tmux paste
   and Enter after the user was told the request would not execute.

The sibling rules block a later DELIVERY_CONFIRMED status, but they do not
block the tmux delivery itself. “Terminal owner halt” is process-local prose,
not a durable restart invariant. The focused proof contract likewise tests
that the current owner halts, but contains no restart-after-DELIVERY_FAILED
case.

Required design patch:

- define every durable phase of DELIVERY_FAILED as a terminal no-future-tmux
  barrier checked during startup recovery and immediately before any delivery
  observation or side effect;
- define how the grant/lease becomes permanently unusable or how a durable
  profile latch dominates the still-null tmux journal, including the crash
  between status RESPONSE_RECORDED and owner shutdown/latch;
- add restart tests for DELIVERY_FAILED PREPARED, REQUEST_STARTED,
  RESPONSE_RECORDED, and MANUAL_RECONCILIATION_REQUIRED proving zero tmux
  observation/mutation, zero authority reuse, and zero contradictory outbound.

### F02 — HIGH — PROCESSING_FAILED can be followed by confirmation or result after a crash

[lifecycle/ordering] e2c9d002e030eefae0f67081653fab28f6500d4d:docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md:555-570,624-630,740-769 — “DELIVERY_CONFIRMED is allowed only when DELIVERY_FAILED has no durable record” / “PROCESSING_FAILED ... may follow ACCEPTED directly” / “After the attempt ... the owner latches/stops” — the exact rules do not require DELIVERY_CONFIRMED, evidence processing, or the existing RESULT outbound to be absent after any PROCESSING_FAILED phase.

Concrete failure:

1. Terminal tmux delivery is durable.
2. A post-delivery evidence/projection operation fails before ACK acceptance.
3. PROCESSING_FAILED reaches RESPONSE_RECORDED.
4. The process crashes before the separate profile latch/stop is durable.
5. On restart, ACK can become accepted. Rule 4 permits DELIVERY_CONFIRMED
   because DELIVERY_FAILED is absent; later evidence can also reach the
   unchanged RESULT projection.

This can produce “처리 실패 · 안전하게 중지되었습니다” followed by
“메시지 전달 완료 · 답변 대기 중” or a business RESULT. The same crash gap
exists when processing failed after DELIVERY_CONFIRMED but before RESULT.

Required design patch:

- require DELIVERY_CONFIRMED to see both DELIVERY_FAILED and PROCESSING_FAILED
  absent in every durable phase;
- make any PROCESSING_FAILED phase a durable startup/evidence/business-outbound
  terminal gate, with deterministic latch recovery before any later Web or
  evidence side effect;
- add crash/restart tests at every PROCESSING_FAILED phase proving no later
  confirmation, INTAKE projection, RESULT projection, or alternate failure
  status.

### F03 — HIGH — original-root preservation is not race-safe

[forensics/race] e2c9d002e030eefae0f67081653fab28f6500d4d:docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md:308-379,801-808 ↔ cca0cb5e2485c029b6d1715e37abf9bc55c548bd:src/runtime/as1-slack-pilot/cli.ts:422,441,509 ↔ cca0cb5e2485c029b6d1715e37abf9bc55c548bd:src/runtime/as1-slack-pilot/composition.ts:536-539 — “The post-check closes the process/lock race” / preserve first, “install the reviewed build” second — the command holds no exclusive guard and resolves mutable paths repeatedly while the installed binary still selects the original root.

The two pgrep/lock observations do not cover the interval between them. An
old-root owner can start after the first observation, acquire the old lock and
open writable descriptors before chmod removes write bits, write after
AFTER_DIGEST, then exit and remove the lock before the final pgrep. Every final
check can then pass with bytes different from the recorded AFTER_DIGEST.
Likewise, a file or directory can be replaced by a symlink or multiply-linked
file after the initial find checks but before path-based chmod; chmod may act
on a swapped target outside the frozen tree.

The rollout order makes this reachable under the reviewed product itself:
step 5 performs preservation before step 6 installs the R2-only build. In the
frozen source, runForegroundOwner initializes the state root and opens the
writer-lock composition before composition.start checks the descriptor's
enabled value. A disabled descriptor therefore does not make the old installed
binary unable to touch the original root.

Required design patch:

- establish and verify an R2-only installed executable before the preservation
  interval, while still disabled, so the sanctioned owner path cannot reacquire
  the old namespace;
- define an exclusive quiescence mechanism and pin the original root identity
  for the full scan/chmod/digest interval;
- use no-follow, descriptor-relative or equivalently race-safe traversal for
  type/link checks and permission changes, rejecting parent/root inode changes;
- perform the final byte/path digest only after the final process/lock and
  identity proof, and define how “permanent read-only” is maintained rather
  than relying solely on reversible owner mode bits;
- add a synthetic race proof; never execute it against either real root during
  implementation testing.

### F04 — MEDIUM — Designer result omits the failed validation helper

[reported/provenance] ff6a858f61bc2b9335fd70297ff49a86ef0b0229:advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/89_PHASE_B_R2_RECOVERY_INDEPENDENT_DESIGN_REVIEW_HANDOFF.md:72-75 ↔ e2c9d002e030eefae0f67081653fab28f6500d4d:artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT.md:262-276 — handoff 89 records “/bin/bash: line 12: test: : integer expected” followed by a corrected exact-path validation, while the Designer result lists validation activities but discloses neither the failed helper nor the retry.

This was a shell-only validation failure, not a product test failure, and the
corrected validation may still support the design. Omitting it makes the
durable result less accurate than the terminal record. Patch the Designer
result to list the failed command, error, correction, and successful retry,
then recompute every affected result/pointer SHA-256. Do not rewrite it as a
product-suite failure.

## Required determination coverage

| Criterion | Determination | Direct basis |
|---|---|---|
| Shared JSON nesting remains 8 | **PASS** | Frozen contracts.ts fixes LIMITS.JSON_NESTING_DEPTH_MAX at 8; the design changes only socket-frame.ts and explicitly leaves the shared walker unchanged. |
| Ordinary rich-text depth 10 / one-level-over depth 11 | **PASS** | The candidate fixtures statically calculate to maximum depths 10 and 11 under the frozen walk convention. |
| Depth 11 fails before inbound validation or Socket ACK | **PASS BY DESIGN** | parseTrustedJson precedes parseEventsApiValue, handler queueing, and ACK construction in the frozen Socket dispatch; the design keeps that order and latches on local-walk rejection. |
| Frame/array/envelope/identity/text/replay/latch protections | **PASS BY DESIGN** | The local walk retains 32,768-byte serialized/raw bounds and array 16; parseEventsApiValue, socket-client, and inbound service remain unchanged. |
| No raw/provider/secret capture or exposure | **PASS BY DESIGN** | Fixed error/latch codes remain; no capture/log path or dynamic status text is introduced. |
| R2 only active owner/root/observer/lock/marker/outbox/status/recovery | **PASS BY DESIGN** | Only cli.ts and writer-lock.ts currently contain the exact old root literal; both are allowlisted. R2 marker identity and fixed observer paths are explicit. |
| Original root preserved byte-for-byte and read-only | **NOT SATISFIED — F03** | Content digest intent is sound, but process/path races and rollout order invalidate the claimed preservation proof. |
| Sealed pidfd bridge two-substitution identity | **PASS, REPRODUCED** | Frozen literal is 17,983 bytes. One exact lock-path and one exact stateRootId substitution produce 17,989 bytes and sha256:d5b831e29dfb19b23f194e928258d74f2a43a2bfb51fa76350ec6595537a8de2. |
| No old grant/lease/capability/latch/root hash crosses to R2 | **PASS BY DESIGN** | New marker-derived root hash, fixed R2 ID/path, fresh initialization, and no copy/fallback/read path isolate the roots. |
| Four exact Korean messages and no caller text | **PASS BY DESIGN** | Closed kind and total constant renderer exactly match the handoff; existing Web adapter fixes plain-text safe options. |
| No status before durable identity/root/target validation | **PASS BY DESIGN** | NEW_MISSION_ROOT + MATERIALIZED/root correlation gates ACCEPTED; the existing root resolver and construction-bound profile secret derive channel/thread. |
| ACCEPTED precedes deliverability | **PASS BY DESIGN** | lastIntakeId is assigned only after ACCEPTED RESPONSE_RECORDED, with explicit startup recovery. |
| DELIVERY_CONFIRMED requires terminal tmux + accepted ACK | **PARTIAL — F02** | Forward-path trigger is correct, but recovery ordering permits confirmation after PROCESSING_FAILED. |
| DELIVERY_FAILED truthfully proves no execution | **NOT SATISFIED — F01** | It proves no execution at the instant of posting but does not durably prevent later execution. |
| PROCESSING_FAILED limited to post-delivery failure | **PARTIAL — F02** | Trigger placement is narrow, but its durable record does not prevent later processing/output after a crash. |
| Deterministic IDs, replay, dedupe, sibling exclusion | **PARTIAL — F01/F02** | IDs and same-kind replay are coherent; terminal failure-state recovery is incomplete. |
| Ambiguous status latches/no blind retry | **PASS BY DESIGN** | Existing REQUEST_STARTED/manual reconciliation path and fixed failure handling are retained. |
| Existing RESULT projection unchanged | **PASS FOR FORWARD PATH; BLOCKED ON RECOVERY BY F02** | RESULT format/path stays unchanged, but it needs a PROCESSING_FAILED terminal gate. |
| Exact 12-path implementation allowlist | **CONDITIONALLY COHERENT; NOT SAFE TO ISSUE** | All 12 paths exist and cover the proposed parser/root/status/test responsibilities. The design fixes fit those paths, but implementation must wait for patched contracts and re-review. |
| Non-expansion / disabled-default / one profile | **PASS BY DESIGN** | No database, Registry/schema, framework, systemd, UI, external product, generic target, second profile, or descriptor change is proposed. |
| Focused proof contract | **NOT SUFFICIENT — F01/F02/F03** | It lacks restart-after-failure-status and synthetic preservation-race proofs. |

## Candidate, scope, and provenance

- **Governance authority — PASS.** Governance HEAD and upstream both resolved
  to ff6a858f61bc2b9335fd70297ff49a86ef0b0229 with 0/0 divergence. The commit
  is a direct child of 0ab13cdf and adds only handoff 89 and run prompt 89A.
- **Product candidate — PASS.** Product HEAD and upstream both resolved to
  e2c9d002e030eefae0f67081653fab28f6500d4d with 0/0 divergence. It is the
  direct child of design base 64d15e34b50ec953fca5dc6c27c2c48703c6513f.
- **Exact design delta — PASS.** The candidate adds exactly the design,
  Designer result, and Designer pointer: three files, 1,223 insertions, no
  runtime or test change. git diff --check passed.
- **Frozen implementation — PASS.** cca0cb5..e2c9d00 changes no src, tests,
  setup, or descriptor path. All source citations above are snapshot-fixed at
  cca0cb5.
- **Artifact hashes — PASS.** Design SHA-256 is
  b10cca7b25095e9ec6af14f4e5705167a5ac30479b830cb33ab44acebc058a91;
  Designer result SHA-256 is
  b32553fb54eef7eb2517a1d134fe9272bfd44182fb51ae5581d101c2ae7b7dae;
  both match the pointer. Pointer SHA-256 is
  d0d518fce6e2ed87e14f94bc5bc176f8a9912226c6d902a8813e67d99f3f5767.
- **Product review boundary — PASS.** The product worktree remained clean,
  upstream-equal, and strictly read-only. No source, test, configuration,
  descriptor, state-root, live system, or authority artifact was changed.

## Read-only calculations and source checks

| Check | Result |
|---|---|
| Candidate/base direct parent and exact three-path diff | PASS |
| Design/result SHA-256 pointer linkage | PASS |
| Shared parser depth constant and call order | PASS |
| Static accepted/one-over depth calculation | 10 / 11 |
| Exact old-root literal occurrences in active source | Only cli.ts and writer-lock.ts, both allowlisted |
| Sealed bridge literal substitution count | One lock path + one stateRootId |
| Sealed bridge proposed bytes/hash | 17,989 / exact expected SHA-256 |
| Existing outbox phases, root resolver, no-blind-resend path | Present and reusable |
| Exact transport pre-PREPARED/consumption ordering | Confirms F01 scenario |
| Evidence ACK idempotent re-ingestion and RESULT path | Present; compatible once F02 terminal recovery is specified |
| Twelve proposed implementation paths at frozen source | All 12 exist |
| Product and governance state | Clean/upstream-equal before outputs |

No Vitest, lint, typecheck, build, product suite, live probe, or broad test gate
was run. The only executable checks were snapshot-fixed Git reads/hashes and
the two narrowly necessary in-memory static calculations for JSON depth and
the sealed bridge literal.

## Attempt disclosure

1. A read-only git grep command used an unescaped backtick in its shell regex
   and failed with “unexpected EOF while looking for matching backtick.” It
   wrote nothing. The literal-safe retry succeeded.
2. The first in-memory bridge calculator assumed no blank line between the
   template terminator and identity constants and failed with “literal
   boundary missing.” It wrote nothing. The corrected exact terminator
   succeeded and reproduced 17,989 bytes plus the expected SHA-256.
3. The JSON depth calculator and all other permitted Git/hash/static checks
   succeeded on first execution.
4. Separately, the Designer terminal record captured by handoff 89 includes
   the failed shell-only helper “test: : integer expected” and its corrected
   validation retry. Candidate result/pointer omit it; that is F04, not a
   Reviewer command and not a product test failure.

No workaround, dependency installation, emitted file, synthetic root,
network call, signal, tmux input, or product write was used.

## Reviewed artifacts and references

- Governance handoff commit:
  ff6a858f61bc2b9335fd70297ff49a86ef0b0229
- Handoff 89 / run prompt 89A SHA-256:
  9738ac140455a9e7d80f37811be726ec96e5011301c109c52a9bcd5f4269eb3b /
  cf9344352812cf5c9cfef08eb24c5d897937e44150138abecc8ca705ca699c4e
- Designer handoff 88 / run prompt 88A SHA-256:
  aaaf49e316c8fda4826ce6e85d479dc2acfb1ec096a89cbc410b5f3ad433c3aa /
  cff55b82491ac398526ad2ad0040e0aa72cfeef7f442927ec60fc3bdb895fe7a
- Sentinel skill SHA-256:
  429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7
- Sentinel contract / safety / provenance / classification reference
  SHA-256:
  344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1 /
  91ec7aea9df4c2d77b85dd8c38133e109c4c4fb0b0033ef4b111ea9a4e55d69e /
  d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe /
  23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e
- Current role authority read directly: Agent Office AGENTS.md, CLAUDE.md,
  TEAM_OPERATING_MODEL.md, roles/reviewer.md, exact handoff 89, and run prompt
  89A. The Sentinel-required V2 protocol was read as superseded historical
  review-separation evidence.
- Reviewed candidate artifacts: the complete 882-line R2 design, complete
  Designer result and pointer, exact base-to-candidate diff, and the
  load-bearing frozen parser, Socket dispatcher, inbound state/service,
  exact transport, outbox/Web port, evidence ingress, composition/CLI,
  writer-lock, and focused test contracts needed for the determinations.
- Reviewer runtime: independent agent-office-reviewer, pane %28, shell PID
  2381134, direct child 3829034, codex -m gpt-5.6-sol -c
  model_reasoning_effort=max --no-alt-screen; Node v24.18.0, Git 2.53.0,
  Linux 7.0.0-27-generic x86_64, UID 1000; delegation none.
- Review concluded: 2026-07-17T04:43:26Z UTC.

## Excluded scope and residual unknowns

- The unavailable incident frame was not reconstructed or sought. The design's
  bounded depth-10 compatibility fixture and fail-closed handling for deeper
  legitimate Slack shapes remain acceptable residual behavior.
- No secret, environment value, Slack endpoint, real message, live owner,
  state-root content, live-pilot destination, process signal, or descriptor
  activation was accessed.
- No implementation correctness, live status delivery, R2 initialization, or
  original-root preservation was claimed. Those remain later gates after a
  patched design, exact implementation, and independent implementation review.
- PASS_WITH_RISK is not appropriate: F01-F03 are contract gaps that can cause
  unsafe execution, contradictory user output, or false forensic proof and
  therefore must be patched before implementation.

## Required next action

Keep implementation, preservation, R2 initialization, descriptor activation,
and live execution blocked. Advisor may route an in-scope design/evidence patch
that:

1. makes DELIVERY_FAILED and PROCESSING_FAILED durable cross-restart terminal
   barriers for tmux, evidence, status, and business outbound;
2. closes all sibling-order and crash gaps and adds the exact restart tests;
3. replaces the original-root preservation/rollout sequence with a race-safe,
   R2-installed, identity-pinned procedure and synthetic proof;
4. records the Designer helper failure and corrected retry honestly, updating
   result/pointer hashes; and
5. returns the exact patched three-artifact design delta for same-Reviewer
   re-review.

No implementation path expansion is presently required by these findings.

RETURN_TO: agent-office-advisor

STOP
