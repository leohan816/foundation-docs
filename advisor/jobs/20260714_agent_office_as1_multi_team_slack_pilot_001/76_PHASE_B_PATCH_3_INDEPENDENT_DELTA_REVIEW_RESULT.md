# AS1 Phase B Patch 3 Independent Delta Review Result

## Verdict

`NEEDS_PATCH`

Patch 3 materially improves all three assigned areas, but it does not close the
exact review-73 contract. The post-signal observer deadline is now enforced, and
the durable control decoder now uses a retained no-follow descriptor, retained-
object metadata, strict schema/correlation, fatal UTF-8, and exact canonical
bytes plus one LF. Cleanup results also expose several previously swallowed
ambiguities. Those are real repairs.

F01 nevertheless remains open. `runForegroundOwner()` samples the incident only
around whole composition calls. The calls themselves contain multiple awaited
Git, filesystem, Web, Socket, delivery, evidence, and cleanup boundaries and can
begin later side effects after SIGUSR2 has closed the incident gate but before
the owner samples the pending incident. In particular, startup can proceed from
one awaited provenance/Web boundary to the next network or durable side effect;
delivery/evidence can continue to later observations and persistence; and an
incident arriving during clean/error cleanup can still be followed by
`DISABLED_CLEAN` and a non-incident terminal. The new tests assert the eventual
terminal result, not the required absence of every later side effect.

F05 is partial. The deadline and canonical-byte subfindings close, but the
retained control object is fstat-checked only before the read. There is no
post-read fstat or current-leaf device/inode correlation. If the fixed leaf is
unlinked/replaced after the first fstat, the retained old descriptor can still
yield canonical killed bytes and be accepted even though its link count has
become zero and the fixed leaf now names another object. The explicitly required
retained-object replacement/tampering test is absent.

F06 remains open because the Patch 3 result, pointer, and setup text claim the
stronger F01/F05 closure; required startup-internal, error-cleanup,
persistence/fallback-kill, and retained-replacement proofs are missing. The
Worker also reports the exact five-file suite as `165/165`; independent
reproduction of those exact files is `166/166`.

These defects remain patchable inside the existing six-path Patch 3 lock and
the private Leo-only 14-path implementation map. They require no design
expansion, live rehearsal, secret access, Slack connection, owner-state
initialization, live tmux observation/input, real signal, descriptor activation,
or risk acceptance.

REVIEW_PASS: `IMPLEMENTATION_REVIEW`

## F01-F06 delta disposition

| Finding | Delta disposition | Direct basis |
|---|---|---|
| F01 — incident domination and truthful cleanup | **NOT CLOSED — CRITICAL** | Incident sampling remains outside load-bearing internal awaits and after neither clean nor error cleanup; later durable/network/Git/evidence work and a clean terminal remain possible after SIGUSR2. |
| F02 — authority order/fixed inputs | **CLOSED; NO CONCRETE REGRESSION** | Patch 3 does not alter the accepted construction-bound snapshots, exact pre-transition comparisons, fixed root/descriptor/env inputs, or provenance/Web/Socket order. |
| F03 — immutable Git/expiry | **CLOSED FOR THE EXACT REVIEWED IMMEDIATE PATH; NO CONCRETE REGRESSION** | Accepted grant/lease retention and evidence-time re-observation are unchanged; the Patch 3 source touches no F03 acceptance contract. |
| F04 — exact pointer/recovery | **CLOSED; NO CONCRETE REGRESSION** | `exact-transport.ts` is unchanged by Patch 3; the accepted buffer/retained-FD behavior remains covered by the focused and full suites. |
| F05 — exact durable-kill proof and deadline | **PARTIAL — HIGH, NOT CLOSED** | Exact canonical bytes, retained-FD metadata, and actual deadline races close; retained-leaf replacement/tampering remains unproved and source-accepting. |
| F06 — proof/operator truth | **NOT CLOSED — MEDIUM** | Result/pointer/setup overclaim F01/F05, required adversarial cases are missing, and the focused total is inaccurate. |

## Findings

### F01 — CRITICAL — incident priority is still outside internal awaited boundaries and cleanup can mask it

`[lifecycle/fail-closed] d0e7ebc091f4882dbe25060812b6cb0329fb32e3:src/runtime/as1-slack-pilot/cli.ts:475-563 ↔ d0e7ebc091f4882dbe25060812b6cb0329fb32e3:src/runtime/as1-slack-pilot/composition.ts:364-472,565-745 ↔ d0e7ebc091f4882dbe25060812b6cb0329fb32e3:src/adapters/gateways/slack-pilot/exact-authority.ts:117-164 — "after every awaited boundary" is implemented only after whole start/delivery/evidence calls — SIGUSR2 can be pending while a later Git, durable, Web, Socket, evidence, or clean-shutdown side effect begins.`

Positive repair is accepted: CLI lines 475-478 dominate an incident retained
during successful lock-owned control initialization before calling `start()`,
and lines 499-537 resample after the four outer loop awaits. The composition's
cleanup result also records disconnect, latch, fallback-kill, drain, and release
ambiguity when its cleanup function returns normally.

The exact source still violates the required granularity:

1. `start()` has no incident getter/check. After the receive-grant observation
   at composition line 376 it continues through state-root reads, snapshot
   reads, provenance, and durable transitions at lines 395-411. After secret or
   store awaits at lines 415 and 428-429 it continues to later durable work.
   After transition/provenance awaits it invokes the startup verifier. Within
   that verifier, a SIGUSR2 during `assertAccepted()` or `authTest()` is followed
   by `authTest()`, `botsInfo()`, or `socket.connect()` at exact-authority lines
   124-164. The incident-aware predicate is not consulted until the Socket
   readiness seal, after the Web calls.
2. `deliverPending()` resumes from the delivery-grant await at composition line
   575 and starts the readiness-lease observation at line 590, then the exact
   transport at line 614. `ingestEvidenceAndProject()` resumes from the lease
   observation at line 661 and continues through durable reads and evidence
   observations/ingress at lines 672-722. The owner does not resample until the
   entire method returns at CLI lines 513-524. Closing only the eventual live-
   delivery predicate does not satisfy the design rule that no new Git poll,
   delivery, evidence, or outbound side effect begins after incident admission
   closes.
3. A SIGUSR2 during `composition.stop()` at CLI lines 481 or 541 is not sampled
   after that await. `stop()` can resume from Socket disconnect and call
   `finishCleanup(true)`, whose `shutdown()` writes `DISABLED_CLEAN` without
   consulting the incident gate. The owner then returns a non-incident terminal.
   The error path has the same defect: if SIGUSR2 arrives during
   `latchActiveProfileAndStop()` at CLI line 559, line 560 can return the owner-
   halted result without another incident sample.
4. The missing-handler path at CLI lines 456-460 still catches and discards a
   lock-release failure, then throws before the stable owner-result `try` block.
   More generally, the catch fallback at lines 559-563 can discard cleanup/close
   failure and synthesize `STATE: DISABLED_LATCHED` without proving the latch or
   release.

The Patch 3 tests at `tests/integration/as1-slack-live-composition.test.ts:1037-1182`
do not close these cases. The “startup” case fires during the install hook and
therefore before `start()` begins. The delivery/evidence cases fire inside an
observation but assert only the final incident result; they do not assert that
the later lease observation, transport/evidence persistence, or other next
operation stayed at zero. There is no incident-during-cleanup/error test and no
injected profile-latch persistence or fallback-global-kill failure test.

Required closure: propagate a synchronous incident-admission check into every
load-bearing async operation, or split those operations so the owner can sample
after every await, before the next side effect. Re-sample after every cleanup
await before returning any non-incident terminal. Prove zero later side effects
with ordered deferred promises for startup internals, delivery/evidence
internals, clean/error cleanup, persistence, fallback kill, disconnect, and
release failure.

### F05 — HIGH — retained-FD metadata/bytes are improved, but current-leaf replacement is still accepted

`[security/process-incarnation] d0e7ebc091f4882dbe25060812b6cb0329fb32e3:src/operations/readiness/as1-slack-control.ts:549-594 ↔ d0e7ebc091f4882dbe25060812b6cb0329fb32e3:tests/operations/as1-slack-lifecycle.test.ts:630-667 — one pre-read fstat and same-FD read, with no post-read fstat/current-path inode proof — unlink/rename replacement after fstat leaves the old FD readable and can return KILLED for an object no longer bound to the fixed control leaf.`

The following F05 subcriteria are closed:

- the fixed leaf is opened `O_NOFOLLOW` and the retained descriptor itself is
  checked for regular type, current UID, private mode, one link, and bounded
  size;
- the same descriptor supplies the bytes; fatal UTF-8, strict exact schema and
  correlations, state-root marker binding, and exact
  `canonicalBytes(control) + LF` are required;
- JSON-equivalent pretty/reordered/whitespace records fail closed;
- one deadline-first, latched monotonic promise races lock observation, poll
  delay, and the post-signal durable-kill proof. The never-resolving lock and
  durable-proof tests return stable timeouts.

The remaining required property is not implemented. Metadata is sampled once
at line 558. If the path is unlinked/replaced after that sample, the retained
descriptor continues to read the original bytes at line 573. Its link count may
now be zero and the fixed leaf may name another inode, but neither fact is
checked again before lines 589-591 accept the old canonical killed record. The
test at lines 641-644 replaces the file before the function opens it and relies
on an extra-key parse rejection; the noncanonical cases also replace before the
call. No test performs the handoff-required retained-object replacement or
same-object tampering race.

Required closure: after the retained read, re-fstat and prove the identity/
link/size facts did not change, and re-open or lstat the fixed leaf no-follow to
correlate its current device/inode with the retained object before accepting
`KILLED`. Add deterministic replacement and same-size tampering tests. Keep the
now-correct canonical-byte and deadline behavior.

### F06 — MEDIUM — Patch 3 evidence and operator prose overstate closure

`[reported/evidence] d0e7ebc091f4882dbe25060812b6cb0329fb32e3:artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_3_WORKER_RESULT.md:7-26,69-123,129-166 ↔ cb6085b30007b51b491a89059c16cc85bb8bc038:artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_3_WORKER_RESULT_POINTER.txt:24-33 ↔ d0e7ebc091f4882dbe25060812b6cb0329fb32e3:docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md:403-414 — reported F01/F05 closure and every-await proof exceed the source/tests — an operator or later reviewer can treat an incident-masking build as proven.`

- The Worker result says `runForegroundOwner` prevents every next side effect and
  that startup/error handling are covered. The pointer is stronger: it names
  “control init, startup, receive re-observation, delivery, evidence, idle poll,
  error handling.” F01 above disproves those claims.
- The Worker result labels the added tests “init/startup/poll/delivery/evidence”
  and says cleanup covers every latch/fallback/disconnect/release ambiguity.
  Tests cover eventual init/poll/delivery/evidence terminals plus disconnect and
  release, not startup-internal next-side-effect suppression, cleanup/error
  incident priority, latch persistence, or fallback-kill failure.
- The F05 result/source comment says replaced records are unreadable, but no
  retained-leaf replacement proof exists and the source race remains.
- Setup section 10.3 correctly narrows handler installation to the exact post-
  lock-acquire boundary. Section 10.4 still says the incident dominates after
  every awaited boundary and cleanup is truthful; that is not yet the actual
  behavior.
- Independent reproduction of the named exact five files is `5/5`, `166/166`,
  while result line 134 and pointer line 33 report `165/165`. The two changed
  files (`84/84`) and full 19-file suite (`390/390`) match.

Positive F06 facts are accepted: Patch 3 explicitly supersedes the inaccurate
Patch 2 F01/F05 claims without modifying prior evidence; the post-lock handler
wording itself is corrected; generic `status`, local-vs-owner argv separation,
`OWNER_SETUP_COMPLETE`, one selected client/profile, fixed root, default-
disabled descriptor, zero-operand observer verbs, and live-disabled restart are
preserved.

## Closed findings and non-regression check

### F02 — CLOSED; no concrete Patch 3 regression

Patch 3 changes no construction-bound snapshot input, exact pre-transition hash
comparison, fixed installed descriptor/root/env rule, profile-root binding, or
provenance/Web/Socket authority order. The startup-revert edits stay inside the
existing first-transition rollback envelope. The descriptor remains disabled.

### F03 — CLOSED for the exact immediate path; no concrete Patch 3 regression

Patch 3 does not change provisional delivery-grant/readiness-lease retention,
the `DELIVERED` acceptance point, or evidence-time re-observation/rebinding. The
new incident race is an F01 defect, not evidence that the accepted F03
immutability contract regressed.

### F04 — CLOSED; no concrete Patch 3 regression

`src/adapters/gateways/slack-pilot/exact-transport.ts` is byte-unchanged by
Patch 3. The accepted no-delete recovery and retained pointer-FD `finally`
behavior remains intact and passes the exact-transport regressions.

## Scope, lineage, and repository state

- **Patch 3 lineage — PASS.** `d0e7ebc` has direct parent `5a23c25c`; result
  `c3d3bc3` has direct parent `d0e7ebc`; pointer/evidence HEAD `cb6085b` has
  direct parent `c3d3bc3`. Product `HEAD == upstream == cb6085b30007b51b491a89059c16cc85bb8bc038`, clean.
- **Exact Patch 3 scope — PASS.** `5a23c25c..d0e7ebc` is exactly the six
  handoff paths, 706 insertions / 136 deletions. The next two commits contain
  only the Patch 3 Worker result and pointer respectively.
- **Private 14-path map — PASS.** Relative to last reviewed base
  `cf657632165d85ed4b4f43eb67404c98b70a5b58`, the source/test/doc delta is
  exactly eight authorized paths, 1,299 insertions / 246 deletions; the other
  six map paths are unchanged. Four intervening Patch 2/Patch 2A paths are
  evidence only. Patch 3 adds no package, lockfile, Registry, descriptor,
  schema/database, framework, UI, service, VibeNews, external project, generic
  target, or prior-evidence edit.
- **Default disabled — PASS.** Descriptor blob is
  `2716f34dedb93959e95bded699b3714e962561ec` at the reviewed base, Patch 3
  source, and evidence HEAD; working SHA-256 is
  `8e3b9985f09b366e046d03392bd60b2157264ec1f2eb4498bfa92e615802f5d7`,
  with `enabled:false` and `receiveGrantRef:null`.
- **Narrow static scans — PASS.** Added lines contain no credential literal,
  dynamic execution/target primitive, unsafe Git mutation, numeric process
  kill, or new tmux command. Fixed-binding matches are comments and synthetic
  fake-tmux test construction only.
- **Review boundary — PASS.** Product stayed read-only. No secret, credential,
  Slack/network connection, owner state, live-pilot destination, real signal,
  descriptor activation, tmux input, patch, stage, commit, push, delegation, or
  sub-agent was used.

## Bounded reproduction

All synthetic Vitest runs used the established sibling dependency/config tree,
targeted only the candidate test paths, disabled cache, used `--maxWorkers=1`,
and ran under the host identity so the pinned UID/interpreter lifecycle checks
were valid. No live I/O was reachable.

| Gate | Independent result |
|---|---|
| Two changed files: live composition + lifecycle | `2/2`, `84/84` PASS |
| Exact five-file Phase B suite | `5/5`, `166/166` PASS; Worker reported `165/165` |
| Established AS1 19-file suite | `19/19`, `390/390` PASS |
| Read-only typecheck | PASS; 329 configured files; dependency reads only redirected to the existing identical-lock sibling dependency tree |
| Read-only core build | PASS; 157 source files; 628 outputs / 3,438,190 bytes captured in memory and discarded |
| ESLint exact changed TypeScript paths | PASS; 5 files, 0 errors, 0 warnings, using the candidate TypeScript Program read-only |
| `git diff --check` source and evidence deltas | PASS |
| Scope, parents/ancestry, descriptor/prior-evidence identity | PASS |
| Credential/dynamic-target/unsafe-Git scans | PASS |

Green totals do not override the source findings: none of the existing tests
asserts the missing internal-await and retained-replacement properties.

## Attempt disclosure

No bounded gate failed. Three read-only discovery attempts were corrected and
did not affect the candidate:

1. The first product-result lookup guessed `docs/agent/runs`; that directory
   does not exist. `rg --files` located the committed result and pointer under
   `artifacts/as1-multi-team-slack-pilot/`.
2. The first lint-config read guessed `eslint.config.js`; the repository uses
   `eslint.config.mjs`. The exact committed config was then read and applied.
3. An initial broad-scope command manually expanded `cf657632` to the wrong
   full hash, producing `Invalid revision range` and a failed descriptor lookup.
   `git rev-parse cf657632` supplied the exact
   `cf657632165d85ed4b4f43eb67404c98b70a5b58`; the corrected scope and
   descriptor checks passed.

Because the candidate has no `node_modules`, typecheck/build/ESLint used the
already established read-only compiler/API mapping to the sibling worktree with
the byte-identical `package-lock.json`
(`b4b4e9984cdcefc0a9e522366045c109a91dc600f3e2f2de224c57c187697da7`).
No symlink, mount, install, cache, emitted file, or dependency workaround was
written into the product worktree.

## Reviewed artifacts and provenance

- Governance handoff/run-prompt commit:
  `64003f00ea011a0394163e19a48c2afb1f3a675b`
- Handoff / run-prompt SHA-256:
  `1e467926b5fd5f08ccb6c1a5addf7180414c56880e6409697a290fb7c40ae061` /
  `03be5348c64b12c851f35c7e2222b60e254bca286ebd132ac4f40c460104933f`
- Review 73 / Worker brief 74 SHA-256:
  `5c62bfc70b0bc7e88449c89dadce73bf518a33d408a5f56e51cc2e9e1fba5d95` /
  `490a7e823bb2d1573e5a472ec6eec50a699c5d04e8e1feeae9d024ae0b6e94be`
- Patch 3 Worker result / pointer SHA-256:
  `9c245f03b447c80a741e2cc3a78d9e2f085763f5b6e4eee629a86f96c91ae233` /
  `2d25eaa5fa9a274d3d47ef4d53edaf1184050e408b0e7ec3a2decea2ebb9703f`
- Phase B design / security / Patch 3 setup SHA-256:
  `ef8647588c905362d53131ef17bff4271991e259d09a4f0bc41f7d412f3553bc` /
  `27c0220ef87709c0c26081988d2a40957ff8ccdba93cf0e0c17313e6e8dca375` /
  `4585d3c6562057272610a43f7e060de5cdd7140b0a9c047a177be090c89e8f34`
- Sentinel skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Current role authority read directly: Agent Office `AGENTS.md`, `CLAUDE.md`,
  `docs/agent/TEAM_OPERATING_MODEL.md`, and `docs/agent/roles/reviewer.md`.
  Historical V2 review-separation/evidence protocol was read as the skill-
  required reference and treated as superseded historical evidence, consistent
  with its status.
- Sentinel references applied: contract, provenance, delta, classification,
  and safety review.
- Reviewer runtime: independent `agent-office-reviewer`, tmux `%28`, pane PID
  `2381134`, direct child `3829034`, `codex -m gpt-5.6-sol -c
  model_reasoning_effort=max --no-alt-screen`; delegation none.
- Review concluded: `2026-07-16T20:34:29Z` UTC.

Immediately before result creation, governance was clean with
`HEAD == upstream == 64003f00ea011a0394163e19a48c2afb1f3a675b` and product
was clean/upstream-equal at
`cb6085b30007b51b491a89059c16cc85bb8bc038`. The result and pointer are the
only authorized uncommitted governance changes.

## Return and stop

RETURN_TO: `agent-office-advisor`

EXACT_VERDICT: `NEEDS_PATCH`

NEXT_REQUIRED_ACTION: return F01, the remaining F05 retained-object identity
gap, and dependent F06 truth/proof corrections to `agent-office-opus` for one
bounded same-scope patch; preserve closed F02-F04 and route the frozen candidate
back to the same independent Reviewer. No finding is accepted as risk.

STOP
