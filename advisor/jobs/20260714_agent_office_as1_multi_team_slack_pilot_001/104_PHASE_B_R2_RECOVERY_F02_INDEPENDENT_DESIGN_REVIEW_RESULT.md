# AS1 Phase B R2 Recovery F02 Independent Design Review Result

## Verdict

**NEEDS_PATCH**

The exact three-path design candidate
`d0b14949181d89c2caeb4e93bca91a2ea1647c80..44eb5975eca2de1b8cc9abda2ab749d422d1e7a7`
is correctly scoped, keeps the product disabled, preserves the accepted R2/F01
architecture, and provides a credible descriptor-relative one-way sealing
algorithm. It does not yet satisfy the committed review contract, however.
Six implementation-blocking design gaps remain in the fixed invocation,
pre-execution provenance root, reproducible manifest/digest contract,
import-safe test seam, privilege transition, and durable retry journal.

These defects are bounded design-document repairs; they do not require a new
architecture or accepted risk. They must return to the same Designer and then
to this same independent Reviewer before any implementation handoff.

`LIVE_R2_SLACK_ACTIVATION: BLOCKED_F02`

REVIEW_PASS: DESIGN_REVIEW

REVIEW_CLASS: F02_FIXED_ORIGINAL_ROOT_PRESERVATION_DESIGN

## Blocking findings

### F02-D1 — HIGH — the sole sudo invocation is interactive and its denial is outside the closed result contract

Candidate design lines 346-362 fix the sole invocation as:

`/usr/bin/sudo -- /usr/bin/env -i ...`

It does not include sudo's noninteractive option. Closing the helper's stdin
cannot constrain sudo because sudo executes before the helper and may read from
the controlling terminal or invoke its own authentication path. A cold or
expired sudo credential can therefore prompt and wait instead of failing
closed. If sudo refuses authorization, the helper never runs, so the claimed
single canonical helper result/empty-stderr contract at lines 550-555 also
cannot represent that privilege outcome.

Required patch: fix one explicitly noninteractive invocation (for example, an
exact sudo noninteractive mode), state the bounded external-denial exit/output
contract separately from helper outcomes, and require a synthetic command-
construction test proving that no password, askpass, stdin, terminal, or retry
path is reachable before helper execution. Do not add a wrapper or alternate
invocation.

### F02-D2 — HIGH — helper and manifest provenance is circular at the execution boundary

The fixed command at design lines 348-355 executes the worktree helper by path
before any trusted code authenticates it. Lines 495-520 put the helper hash in
the manifest, say that the manifest hash will be pinned only by the Reviewer
result/later handoff, and then assign verification of both artifacts to that
already-running helper. The exact invocation consumes neither the externally
pinned manifest hash nor an independently pinned helper descriptor. A replaced
helper can therefore bypass its own verifier; a replaced helper/manifest pair
is not made trustworthy by self-consistency. No exact pre-execution verifier,
descriptor handoff, or TOCTOU-closed loader is specified.

This directly fails the handoff's non-circular-manifest question. The problem
is not repaired by an operator reading a hash in a result artifact: the design
must bind that reviewed value to the bytes actually executed before privileged
code can approach the original root.

Required patch: define one non-circular, independently checkable trust root in
the fixed invocation/installation procedure that authenticates and pins the
manifest and helper bytes before executing those same bytes, closes pathname
replacement between verification and execution, and still exposes no caller-
selected path, wrapper, package alias, or second production mode. State exactly
which reviewed digest is embedded or otherwise bound and how the later handoff
can verify the binding without creating a hash cycle.

### F02-D3 — HIGH — manifest and digest reproduction contracts are not exact enough to regenerate independently

Design lines 495-520 call the manifest a closed canonical-JSON schema but list
only categories of fields. They do not fix the schema-version literal, exact
keys, value types/encodings, canonical serializer, regular-file tree stream,
directory representation, numeric encoding, digest domain separator, or the
exact generator/reproducer command. The initial/final stream at lines 426-430
likewise leaves byte encoding for type, size, hash, path ordering, and stream
termination implicit. Lines 1141-1144 require the Worker and Reviewer to
generate and independently regenerate the artifact without naming a reviewed
generator surface.

Two conforming implementations can consequently produce different manifest
and digest bytes from the same tree, while the four-path allowlist provides no
separately named generator. Tests written after implementation would pin an
implementation choice, not prove conformance to this design.

Required patch: publish the exact manifest schema and canonical byte grammar,
including every key/type/value format and the complete tree/digest stream;
name the deterministic fixed-input generation and independent reproduction
surface; and specify the source-commit/build/evidence-commit sequence so the
recorded commit and tree cannot be interpreted two ways. The solution must
remain inside the final reviewed allowlist and must not become a production
root selector or alternate preservation mode.

### F02-D4 — HIGH — the importable test seam is asserted but no closed export/direct-entry boundary is designed

Lines 577-590 require the new TypeScript test to import the actual `.mjs`
helper without running its direct-entry main and to inject production-core
seams. Lines 978-985 make the same file the production direct-entry parser and
all privileged adapters. The design never names the permitted exports, the
direct-entry predicate, which functions are pure, or which fixed-root,
manifest, spawn, journal, and ioctl adapters must remain private. It also does
not require import itself to have zero filesystem, `/proc`, spawn, journal, or
root side effects.

An implementer can therefore expose `main`, a production adapter, or a
caller-injectable production I/O path and still claim to have followed the
current prose. Conversely, hiding everything would make the required
production-core tests impossible.

Required patch: define the exact import-safe export set and direct-entry guard;
keep production fixed-path adapters and `main` unexported and non-injectable;
limit exports to named pure/state-machine/manifest functions with no production
defaults; and require a test that importing the module performs zero I/O,
spawn, privilege, journal, or root action. Calling exported test seams must not
be able to select or reach either production root.

### F02-D5 — HIGH — interpreter startup and privilege reduction are not fully decidable

Lines 364-372 say only that the pinned Python descriptor is executed with a
"fixed argv," that UID/GID become 1000, and that bounding/permitted/effective
capabilities retain only `CAP_LINUX_IMMUTABLE`. The fixed argv itself is absent:
isolated/no-site flags, embedded-literal operand, cwd, fd-3 mapping, stdin,
stdout/stderr caps, and child-failure behavior are not specified. The existing
reviewed bridge context at `src/persistence/file-store/writer-lock.ts`:656-744
shows these details are load-bearing, including `-I -S -c`, cwd `/`, an exact
two-key environment, and explicit fd-3 stdio wiring.

The privilege transition also omits ordering, supplementary groups, real/
effective/saved UID and GID verification, inheritable/ambient capability sets,
securebits/keep-caps handling, and the exact `/proc/self/status` values checked.
"UID/GID 1000" plus three capability sets permits materially different Linux
authority states and does not tell the Worker how to retain exactly one
capability across the root-to-user transition without retaining another.

Required patch: state the exact interpreter argv/fd/cwd/env/stdio and bounded
failure contract, and state an ordered privilege transition with all UID/GID/
supplementary-group and capability sets plus `no_new_privs` verification.
Every unexpected field or transition failure must occur before original-root
open and map to one fixed HOLD outcome; no site customization, inherited
Python option, or post-drop exec surface may remain.

### F02-D6 — HIGH — the journal is append-by-convention, not a durable anti-retry authority

Lines 524-548 specify exclusive creation, mode 0600, retained identity, append
calls, and syncs during one run. They do not require an append-only open flag or
filesystem property, an exclusive operation lock, a re-read immediately before
each terminal append, or protection against truncate/delete/rename/replacement
between invocations. Because the journal resides in the owner-writable worktree,
deleting or replacing a durable `PRESERVED` journal makes the next invocation
observe "no terminal journal" and enter the preservation branch described at
lines 374-378. That is precisely the ambiguous retry the handoff requires the
journal to block.

The current contract also allows a concurrent writer to insert a canonical
terminal/conflicting record after the initial parse but before the helper's own
terminal append, while the helper can still emit a success claim unless a final
state transition check is mandated.

Required patch: define a durable monotonic journal authority across process
lifetimes, including exact open flags, identity/ownership/mode/link/flag checks,
concurrency exclusion, legal record-state transitions, full re-read before
terminal success, and a deletion/replacement/tamper rule that can never turn a
prior or ambiguous attempt into a fresh mutation attempt. The journal must
remain redacted, fixed-path, and incapable of selecting helper behavior except
through an authenticated legal state; no repair/delete/reset mode is allowed.

## Required-question disposition

| # | Determination | Direct basis |
| --- | --- | --- |
| 1 | **NOT SATISFIED** | One artifact/path and no wrapper/CLI/root operand are well stated, but F02-D4 leaves an alternate importable production surface undecidable. |
| 2 | **NOT SATISFIED** | F02-D1: sudo can prompt before the helper and denial is outside the fixed outcome contract. |
| 3 | **NOT SATISFIED** | F02-D4: no exact exports, direct-entry guard, or zero-I/O import contract. |
| 4 | **NOT SATISFIED** | F02-D2 and F02-D3: self-verifying provenance has no pre-execution trust anchor and the manifest has no exact independently reproducible schema/generator. |
| 5 | **NOT SATISFIED** | F02-D5: interpreter argv/stdio and complete UID/GID/capability transition are underdetermined. |
| 6 | **SATISFIED AT ALGORITHM LEVEL** | Lines 409-455 fix descriptor-relative no-follow traversal, retained identities, single-mount/type/link/entry-set checks, and no pathname reopen for original-root entries. This does not cure the trust/privilege findings above. |
| 7 | **SATISFIED AT ALGORITHM LEVEL** | Lines 434-468 seal root plus `locks` first, recheck races, retain partial seals, and prohibit unseal/success after partial failure. |
| 8 | **NOT SATISFIED** | Retained-descriptor ordering is sound, but F02-D3 leaves the canonical byte grammar independently ambiguous. |
| 9 | **NOT SATISFIED** | F02-D6: in-run syncing exists, but cross-run deletion/replacement/concurrency can reopen or corrupt the state machine. |
| 10 | **SATISFIED AS A SEPARATE GATE** | Lines 592-605 fix one sibling scratch path, forbid both real roots, require a separately authorized named test, immutable set/get and write rejection, cleanup, parent sync, and HOLD on preexistence/skip/cleanup drift. |
| 11 | **NOT YET PROVEN SUFFICIENT** | The four implementation paths are otherwise plausible and current lint/TS/Vitest/build configuration can accommodate `.mjs` plus a computed test import, but F02-D2 through D5 must be resolved without silently requiring another loader/generator/config path. |
| 12 | **SATISFIED** | Lines 1156-1212 retain disabled configuration, require design/implementation/privilege/review gates, preserve then reverify, initialize only R2, defer live destination and one round trip to separate authority, and never unseal on rollback. |

## Direct scope and provenance evidence

- Governance dispatch is exact, clean, and upstream-equal at
  `6561f7f44a089e7dfae63bb7679280f1b60d7ab9`; that commit changes only handoff
  103 and launcher 103A. Their SHA-256 values are
  `98ed85f9c5cf676fe442dcda791e849f0e75727408614826cb600dffbf297a49`
  and
  `5432d17f035ac492a95901653300f9d5833effc0028be756766048564e6d3b93`.
- Product base and candidate resolve exactly. Base is the merge base and an
  ancestor of candidate. Product HEAD/upstream are both
  `44eb5975eca2de1b8cc9abda2ab749d422d1e7a7` on
  `feature/as1-phase-b-live-pilot-001`; the worktree was Git-clean.
- The one candidate commit changes exactly the authorized three paths: the
  design delta, Designer result, and Designer pointer. `git diff --check`
  reports no error. No product source, test, package, configuration,
  descriptor, secret, state, or generated output is changed.
- Accepted design `a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff` is an ancestor of
  base. Its design blob is byte-identical to the base blob
  (`a9cfb7007f3d8405cdb99c55860da61f67666c73`); candidate changes that one
  design blob to `9747434b31a5d11f860b8f3c24cee6acfbf55d76`.
- Candidate design SHA-256 is exactly
  `1d31ce8b096f48780b7129e1e8516b89ae3b9a1d684a1fbb991d438b686e24a5`,
  matching handoff 103 and the Designer pointer.
- Designer result SHA-256 is exactly
  `663bfb6bc480e49a6b9486a11af61edcffed9521928229d1dde4ec6b3184daf1`,
  matching handoff 103 and its pointer. Designer pointer SHA-256 is
  `96924ae036ce8886a57ee1b9c022222955dd68945d010e6e1ab01d5838025ce4`.
  Its claims were read only after substantive design/source/setup/test/config
  context; the claims do not close F02-D1 through F02-D6.
- Authority commit
  `50507326ee3c4e2dba9b6defd45ab73d3b599cc2` changes only handoff 102 and
  launcher 102A. Their SHA-256 values match Designer evidence:
  `739a740fc44cc0137a007c9b0436cd9ae74d0cbd06dbf809d44602a443bb49fe`
  and
  `928755d45af034486decfa5c8abe2d29f28933525a3a8ccb3e19054bf0e2a2f2`.
  Advisor audit 101 SHA-256 is
  `6222c6d8a51e8f8fb376c8ceac4ab85b346fff91b797afdf123099491ff64ea8`.
- The disabled descriptor remains `enabled: false` with
  `receiveGrantRef: null`; SHA-256 is
  `8e3b9985f09b366e046d03392bd60b2157264ec1f2eb4498bfa92e615802f5d7`.
- Static source checks found zero active `src` occurrence of the original-root
  slash literal and zero old `stateRootId` comparison. The production helper
  and its focused test correctly do not yet exist at this design-only commit.
- Direct load-bearing context included candidate design lines 318-609 and
  963-1274; `writer-lock.ts` preservation seam lines 1376-1522 and verified
  interpreter child lines 656-820; setup section 10.6; lifecycle preservation
  tests; `package.json`; ESLint, TypeScript build/typecheck, and Vitest configs;
  and the exact disabled descriptor.

## Review gates and exclusions

This was a source-first design review. Per handoff 103, no product suite was
rerun. No F01, Slack, Living Office, broad security, integration, privilege,
filesystem, or live gate was executed. Read-only design gates were:

| Gate | Independent result |
| --- | --- |
| Exact governance dispatch | PASS — HEAD/upstream exact and clean; commit contains only 103/103A |
| Product lineage/state | PASS — exact base/candidate/branch, base ancestor, HEAD/upstream equal, clean |
| Exact three-path design scope | PASS |
| Design/Designer evidence hashes | PASS |
| Accepted-design-to-base identity | PASS |
| Disabled descriptor identity/state | PASS |
| Active old-root and old-ID static checks | PASS — zero matches |
| Candidate `git diff --check` | PASS |
| Twelve design questions | NEEDS_PATCH — F02-D1 through F02-D6 |

F01, accepted R2 status/Socket/Exact Delivery behavior, private Leo-only
workspace/profile/channel bindings, sequential one-profile operation, and the
disabled descriptor remain intact because no corresponding source,
configuration, or accepted evidence path changed. This review does not reopen
or reapprove those accepted surfaces.

## Runtime, skill, authority, and independence

- Actual Reviewer runtime: existing `agent-office-reviewer` pane `%28`, shell
  PID 2381134, workspace `/home/leo/Project/agent-office`; direct child PID
  3829034 is
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max --no-alt-screen`.
- Advisor `%26`, Designer `%30`, and Worker `%16` are distinct panes and
  processes. This Reviewer did not reuse the authoring or implementation
  session and dispatched no actor.
- Applied directly:
  `/home/leo/Project/skill/fable-sentinel/SKILL.md`, SHA-256
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`.
  Contract/provenance/classification/delta reference SHA-256 values are
  `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`,
  `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`,
  `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`,
  and `31965d290395f16ca64939d1d755d587ed460ff828586538eafa58fa8de70749`.
- Current authority was read directly from repository `AGENTS.md`, `CLAUDE.md`,
  Team Operating Model, Reviewer role, and exact committed handoff/launcher.
  The Sentinel-required V2 protocol was read completely as superseded
  historical review-separation evidence, SHA-256
  `9bdd36ddd3f0d718da7adc3c2f0d0204c53d1191f0119f2a6e56c5160dc37b7b`;
  it was not treated as current role authority.

## Reviewer attempt disclosure

1. One broad read-only source/context search completed but its displayed output
   was truncated by the tool budget. Its ordered reads had already covered the
   preservation seam, lifecycle test, setup, package, and build/lint/test
   configuration before the final descriptor search also surfaced lines from
   the Designer artifact. The substantive design delta had been read first.
   Targeted bounded reads were then used for every cited load-bearing region.
   Nothing was written.
2. Read-only `rg` checks for the two prohibited active-source literals and for
   the not-yet-implemented helper/test exited 1 because they correctly found no
   match. These are expected PASS/absence results, not execution failures.
3. The fixed Node and Python objects were inspected only by metadata at their
   named paths; neither interpreter/helper was executed. Sandbox-visible
   ownership metadata was not used as a verdict premise because the future
   manifest and privileged validation must independently freeze host facts.
4. No product test, build, lint, typecheck, privilege, filesystem, sudo, helper,
   live, network, or dependency workaround was attempted, as required by the
   design-review handoff.

No secret or environment value was read; neither real state root nor the fixed
scratch path was accessed, stated, traversed, hashed, or mutated as a filesystem
target; no Slack/network connection occurred; no descriptor was activated; no
owner or pilot was started; no live destination was observed or mutated; no
tmux input or process signal was sent; and no product edit, stage, commit, push,
stash, patch, agent, sub-agent, delegation, merge, risk acceptance, final
approval, or next mission occurred.

## Return and stop

Return this `NEEDS_PATCH` result to `agent-office-advisor`. Route only a bounded
same-Designer correction for F02-D1 through F02-D6, followed by same-Reviewer
design delta review. Do not issue the implementation handoff and do not infer
authority for privilege validation, original-root access, R2 initialization,
descriptor activation, Slack, owner start, live-destination work, signaling,
or tmux delivery.

RETURN_TO: agent-office-advisor

STOP
