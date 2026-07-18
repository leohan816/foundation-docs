# Independent Reviewer Handoff — Cosmile WU-D Delta Review 1

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-D-DELTA-REVIEW-1
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
REVIEW_MODE: DELTA_ONLY
RETURN_TO: foundation-advisor
```

## Live-verified binding and exact subject

Immediately before dispatch, the Advisor live-verified the same independent Reviewer session:

```text
TMUX: foundation-reviewer-fable5:0.0
SESSION_ID: 1b356b8d-58b1-4f43-a75b-b5cd746f336a
ACTUAL_MODEL: claude-fable-5[1m] (claude-fable-5)
ACTUAL_EFFORT: max
WORKSPACE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
PANE_SYNCHRONIZATION: OFF
ACTIVE_OVERLAPPING_REVIEW: NO
INDEPENDENCE: same Reviewer that authored 51_; separate from Worker; no patch authority
```

Verify these bindings again on receipt. Read `/fable-sentinel`, the current Agent Office Reviewer rules, Cosmile
repository rules, and the committed artifacts below. Stop on any model, effort, skill, workspace, independence,
authority, branch, head, history, worktree, or evidence mismatch.

```text
COSMILE_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
COSMILE_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_HEAD: 21012d0e06a04f82377659b897fd07fa39683133
NEW_CORRECTION_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
EXPECTED_PARENT_OF_NEW: 21012d0e06a04f82377659b897fd07fa39683133
EXPECTED_UPSTREAM_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4
EXPECTED_AHEAD_BEHIND: 2_0
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_PUSH_STATUS: BOTH_WUD_COMMITS_NOT_PUSHED

FOUNDATION_PRODUCER_REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_PRODUCER_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a
FOUNDATION_PRODUCER_EXPECTED_STATE: CLEAN_UNCHANGED_READ_ONLY

FOUNDATION_DOCS_COMMIT: ec4ce3db11ebcae0fce4ef4e62329303ef3d80c9
ORIGINAL_REVIEW: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW.md
CORRECTION_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/52_COSMILE_WUD_CORRECTION_1_RESULT.md
CORRECTION_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/52_COSMILE_WUD_CORRECTION_1_POINTER.md
FINDINGS: WUD-F1 WUD-F2 WUD-F3 WUD-F4 WUD-F5 WUD-F6 WUD-F7
```

## Review boundary

Review the declared additive delta `21012d0e06a04f82377659b897fd07fa39683133..2733bfd61e407389c3336eba2e655ad081d4cdb5`
only, while checking the adjacent invariants required to decide whether WUD-F1 through WUD-F7 are actually closed.
Do not reopen unrelated reviewed WU-D behavior unless this delta causes a concrete regression. Do not review WU-B,
WU-E, WU-F, WU-G, production, Controlled Live, or any excluded lane.

The exact product-path allowlist remains:

- `app/src/lib/foundation/snapshotContract.ts`
- `app/src/lib/foundation/snapshotBundle.ts`
- `app/src/lib/foundation/snapshotRepository.ts`
- `app/src/lib/foundation/snapshotCatalog.ts`
- `app/src/lib/sku.ts`
- `app/scripts/o1_foundation_snapshot_contract.vitest.ts`
- `app/scripts/o1_foundation_snapshot_bundle.vitest.ts`
- `app/scripts/o1_catalog_price_authority.vitest.ts`
- `app/scripts/o1_foundation_snapshot_import.dbtest.py`

No schema, migration, generated client, package, lockfile, route, page, component, payment, inventory, identity,
transport, provider, configuration, runtime activation, Foundation, SIASIU, or control change is allowed.

## Required direct checks

Verify each finding independently from source and evidence:

1. **WUD-F1:** a complete verified bundle is the only public durable-import entry; callers cannot inject a forged
   plan or invoke accepted raw lifecycle operations; manifest shapes, strict sequence, replay, restart, and zero
   partial state remain fail closed; every reachable import-plan value is actually immutable.
2. **WUD-F2:** per-product transaction serialization; exactly one structural lineage head; declared supersedes SHA
   must equal that head; second initial, non-current target, different product, and split head fail closed; two
   concurrent initials do not create multiple heads; a gate-contained structural tip can be corrected in place.
3. **WUD-F3:** all binding/path identifiers are deterministically bounded/validated; referenced snapshot and
   Commerce SKU product/variant agree; `SkuBinding.snapshotId` selects the exact bound snapshot; replay is exact and
   conflicting rebind fails closed.
4. **WUD-F4:** exact non-null variant resolution is load-bearing from `content.variant_descriptors`; verify the frozen
   boundary fixture is exactly product `elt-pad-vitayouth-01`, variant `elt-pad-vitayouth-01-80`, with adjacent
   mismatch/absence negatives.
5. **WUD-F5:** path construction validates product ID and SHA first; loader requires the document's embedded product
   ID to equal the path product; embedded SHA and raw canonical-byte equality remain load-bearing; wrong-directory,
   malformed, traversal, absent, and tampered cases fail closed.
6. **WUD-F6:** default pricing is available only for active, non-hidden default/fallback SKUs without changing price
   precedence or broader offer policy.
7. **WUD-F7:** U+F000 and U+10000 prove Unicode code-point ordering and exact byte/SHA parity against the pinned
   Python producer so JavaScript UTF-16 default ordering would fail.

Also verify:

- the new commit is additive with the exact old parent and exact nine-path diff;
- the Worker's 54/54 focused, 333/333 full, 44/44 WU-D PostgreSQL, and 54/54 WU-0 regression evidence is accurate;
- disposable PostgreSQL and the temporary `node_modules` symlink were cleaned;
- Foundation stayed clean and unchanged at `73ff0036...`;
- no secret, raw PII, real DB, real customer data, external vendor call, payment, network/provider activation, route,
  runtime process, or product behavior outside WU-D was introduced;
- build/typecheck remain honestly unverified where Prisma generation is forbidden; do not convert that unknown into
  PASS evidence or require out-of-scope generation;
- observation O-7 is accurately bounded as fail-closed deferred gate-status policy and does not conceal an accepted
  runtime activation.

Re-run only commands whose safety is independently established from the handoff and current environment. Existing
dependencies only; no install, image pull, external network, Prisma generation, real/shared DB, secret, customer
data, vendor request, payment, or runtime activation. Record exact commands, counts, cleanup, and pre/post Git state.

## Reviewer boundary, output, and stop

You are read-only. Do not patch, stage, commit, push, amend, rebase, squash, force-push, accept risk, select policy,
dispatch another actor, or begin another WorkUnit. Preserve the unpushed candidate exactly.

Allowed verdicts:

```text
PASS
NEEDS_PATCH
PASS_WITH_RISK
FAIL
```

`PASS` means every WUD-F1…F7 finding is closed at exact head `2733bfd...`, no blocking finding remains, and the
candidate may be pushed by the Advisor after publication of this review. `NEEDS_PATCH` must name exact bounded
findings. `PASS_WITH_RISK` or `FAIL` returns immediately without risk acceptance.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/53_COSMILE_WUD_DELTA_REVIEW_1.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/53_COSMILE_WUD_DELTA_REVIEW_1_POINTER.md`

Include actor/model/effort/skill/session verification, exact old/new heads, diff scope, per-finding verdicts,
reproduction evidence, cleanup and containment evidence, blocking/non-blocking observations, product-write status
zero, candidate push status unchanged, and `RETURN_TO: foundation-advisor`. Then STOP.
