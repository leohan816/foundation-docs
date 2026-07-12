# Agent Office M1.2 Worker Pixi Public-Export Bridge Design Result

Status: `CANDIDATE_PUBLIC_EXPORT_BRIDGE_DESIGN_DELTA_AUTHORED_VALIDATED_COMMITTED_AND_PUSHED__PENDING_ADVISOR_VALIDATION_AND_FABLE5_LEVEL3_REVIEW__IMPLEMENTATION_PAUSED_NOT_AUTHORIZED__RETURN_TO_ADVISOR`

This is factual Agent Office Worker evidence for the canonical technical design
delta under `73_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_HANDOFF_PROMPT.md`. It is not
implementation authority, a Fable5 verdict, prototype acceptance, authenticated
or production integration, risk acceptance, Advisor acceptance, final approval,
mission closure, or authority for another mission.

## 1. Identity and exact Git state

- Mission ID: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- Actor: `Agent Office Worker`
- Project: `Agent Office M1.2 Pixi public-export bridge design delta`
- Target repository: `/home/leo/Project/agent-office`
- Existing session: `agent-office/$13/%13`; no new or temporary session was
  created
- Requested model/effort: `Codex 5.6 SOL / High`
- Required skill: none
- Agent, sub-agent, delegated context, substitute Worker, or Reviewer invoked:
  none
- Target branch/upstream:
  `shadow/agent-office-m1-2-spatial-office` /
  `origin/shadow/agent-office-m1-2-spatial-office`
- Exact starting base:
  `9611d0da1479ca5e7a9677641fe767a6b39b4a38`
- Resulting Agent Office design commit:
  `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9`
- Commit subject: `docs: design Pixi public export bridge`
- Commit time: `2026-07-12T06:11:20Z`
- Push: non-force, successful
- Target HEAD/upstream after push: exact equality, ahead/behind `0/0`
- Starting base is the exact parent of the result commit: yes
- Target index after push: empty
- Target worktree after push: intentionally dirty with the byte-preserved,
  unstaged prepared prototype
- Result generated at UTC: `2026-07-12T06:12:22Z`
- Foundation Docs publication base before result creation:
  `cebcb7080f9ef186523c08d1b0387a184c1e2526`, equal to `origin/main`
- Result file:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_RESULT.md`
- Pointer file:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/74_WORKER_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_RESULT_POINTER.md`

The exact committed handoff and Worker brief, repository rules and reporting
protocols, reviewed living-office canonical designs, actual prepared prototype
source, package/lock/compiler/test state, Advisor blocker validation, GPT
compatibility decision package, and durable Leo/GPT bridge decision were read
directly. Work was not executed from chat memory, terminal prose, another role,
or another project.

## 2. Exact authorized outcome

The docs-only pass did exactly three things:

1. added the canonical prototype-only Pixi public-export compatibility bridge
   design;
2. patched the living pixel-office renderer design to bind that bridge,
   fail-closed status, and promotion boundary; and
3. patched the living pixel-office implementation plan with the supplemental
   review/implementation gates, exact proposed allowlist, and regressions.

No source, test, package, lockfile, configuration, baseline, asset, media,
ignore-file, `docs/FEATURE_INDEX.md`, runtime, auth, authority, delivery,
transport, DB, network, secret, server, or production integration change was
authorized or performed by this design delta.

## 3. Exact committed Agent Office delta

Commit `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9` changes exactly the
three authorized canonical Markdown paths:

1. `docs/architecture/AGENT_OFFICE_M1_2_PIXI_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE.md`
2. `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md`
3. `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`

Committed diff:

```text
files: 3
insertions: 625
deletions: 12
new canonical documents: 1
patched canonical documents: 2
implementation/package/test/config/media/baseline paths: 0
```

Exact SHA-256, lines, and bytes after commit:

```text
3a6733f012c49b31b10c01d1658e73ae2a1a81be56162c62d9b3bc8b5178251f  616 lines  38632 bytes  docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md
539eaee000a9805ccb6d0e39ea9d38357c0ade64ab6590384d55004af0209b7e  481 lines  22106 bytes  docs/architecture/AGENT_OFFICE_M1_2_PIXI_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE.md
4c36eb40753ba4670de155b6ac7e1f937b986103fa15a0f150d80ccda67fd631  822 lines  38639 bytes  docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md
```

The staged allowlist contained exactly those three paths. `git diff --cached
--check` passed before commit. `git show --name-status` proves the resulting
commit has two canonical modifications and one canonical addition only.

## 4. Current defect inventory and public-root evidence

The actual preserved prototype has exactly six paired deep-import/suppression
sites across four files:

| Prepared file | `@ts-expect-error` count | Relative `node_modules` / package-internal imports |
|---|---:|---:|
| `src/ui/pixel/facility-sprites.tsx` | 2 | 2 |
| `src/ui/pixel/pixel-world-scene.tsx` | 2 | 2 |
| `src/ui/pixel/renderer-boundary.tsx` | 1 | 1 |
| `src/ui/pixel/world-clock.tsx` | 1 | 1 |
| **Total** | **6** | **6** |

There is no prepared `@ts-ignore`. The workaround imports the exact pinned
runtime JavaScript through relative package-internal files and casts narrow
local structural ports because the public vendor declaration graph produces 52
diagnostics under the repository compiler settings. The design removes, rather
than legitimizes, those imports and suppressions.

Direct installed-package inspection verified these public-root exports:

```text
@pixi/react root: Application, extend, useTick
pixi.js root: Container, Graphics, Sprite, Texture, VERSION
react root: createElement, forwardRef
```

These are all and only the runtime values needed by the prepared prototype.
`AnimatedSprite` is deliberately excluded because the current prototype does
not call it. A direct bare-Node ESM import of `@pixi/react` is not accepted as a
runtime test because Node rejects its browser-oriented extensionless internal
`react-reconciler` specifier. The design requires the public root to execute at
the actual Vite/browser boundary and forbids using a deep import to accommodate
the bare Node loader.

## 5. Binding bridge architecture

The design preserves exactly:

```text
TypeScript: 6.0.3
global skipLibCheck: false
exactOptionalPropertyTypes: true
noUncheckedIndexedAccess: true
React / React DOM: 19.2.7
@pixi/react: 8.0.5
pixi.js: 8.19.0
```

It proposes exactly these future files, pending review and a new handoff:

```text
src/ui/pixel/pixi-public-export-bridge.js
src/ui/pixel/pixi-public-export-bridge.d.ts
tests/ui/pixi-public-export-bridge.test.ts
```

The runtime JavaScript imports only the public `@pixi/react`, `pixi.js`, and
`react` roots. The adjacent declaration imports no Pixi vendor type and exposes
only exact application/ref props, Container/Graphics/Sprite host wrappers,
graphics methods, texture creation/destruction, tick delta, and frozen runtime
identity. Ordinary prototype TS/TSX imports only the local bridge.

The bridge centralizes exact `Container`, `Graphics`, and `Sprite` registration;
validates public export shapes, PixiJS `VERSION`, application/ticker/renderer
lifecycle ports, Container/Graphics refs, texture ownership, and finite tick
delta; and selects the already complete DOM-static/M1 fallback on import,
contract, lifecycle, or runtime failure. It does not expose vendor namespaces,
generic registration, broad `any`, an index signature, an ambient wildcard,
global augmentation, or a global error handler.

Deep/package-internal/relative-`node_modules` imports, `@ts-expect-error`,
`@ts-ignore`, vendor type graph imports, TypeScript downgrade, `skipLibCheck`
change, strictness relaxation, package fork/patch/override/version change, and
renderer replacement are all forbidden.

## 6. Exact proposed future implementation allowlist

This proposal is not implementation authority.

Existing prepared files that may receive only bridge import/name/suppression
cleanup:

```text
src/ui/pixel/facility-sprites.tsx
src/ui/pixel/pixel-world-scene.tsx
src/ui/pixel/renderer-boundary.tsx
src/ui/pixel/world-clock.tsx
```

Exact new files:

```text
src/ui/pixel/pixi-public-export-bridge.js
src/ui/pixel/pixi-public-export-bridge.d.ts
tests/ui/pixi-public-export-bridge.test.ts
```

One newly proposed legacy path only:

```text
tests/acceptance/batch-gates.test.ts
```

That legacy assertion may change only from the approved exact three runtime
dependencies to the approved exact five:

```text
@pixi/react
lucide-react
pixi.js
react
react-dom
```

No package, lockfile, compiler, configuration, fixture, snapshot, baseline,
media, script, feature-index, ignore, production, authenticated, authority,
auth, transport, DB, or network path is in the proposed allowlist.

## 7. Required later regressions and promotion gate

The canonical delta requires later proof of:

- public-root-only runtime imports and local-bridge-only prototype imports;
- zero deep/package-internal/relative-`node_modules` imports and zero diagnostic
  suppressions;
- exact declaration export/property/callback inventory without vendor types,
  broad `any`, wildcard modules, global overrides, or index signatures;
- exact installed/locked/runtime package version and export identity;
- TypeScript `6.0.3`, global `skipLibCheck: false`, and clean typecheck;
- exact five-dependency legacy assertion only;
- existing lifecycle, teardown, StrictMode, semantic parity, DOM-static/M1,
  accessibility, performance, production-boundary, browser, build, media,
  baseline-byte, and complete sequential regression gates; and
- fail-closed behavior for missing/malformed export, call, lifecycle, version,
  or runtime identity.

The bridge remains synthetic-prototype-only. It cannot enter authenticated or
production composition through reuse, file movement, or an earlier review.
Promotion requires fresh compatibility evidence, canonical design update,
security/accessibility/lifecycle/rollback review, explicit Leo/GPT authority,
and a separate exact Advisor handoff. Full authenticated integration is
`DEFERRED_WITH_GATE`.

## 8. Exact design-pass validation evidence

- All three authorized design targets were clean relative to the exact starting
  base before edit: pass.
- Current imports and suppressions were inspected directly: exact 4-file,
  6-pair inventory above.
- Installed public package export maps/root modules were inspected directly:
  required runtime values available.
- Exact changed-path gate before commit: 3/3 authorized Markdown paths only.
- Local Markdown links in all three documents: resolve.
- Trailing whitespace and TODO/TBD/PLACEHOLDER scan: pass.
- Git whitespace check: pass.
- Target commit parent, path list, push, ancestry, and upstream equality: pass.
- Prepared prototype preservation manifest: 69 dirty/untracked/ignored file
  entries before and after, zero path/hash differences.
- Prepared prototype source, tests, package, lockfile, media, config, baselines,
  `docs/FEATURE_INDEX.md`, and `.gitignore`: preserved and unstaged.
- Package install, source generation, implementation test, browser/server,
  snapshot update, and media generation: intentionally not run because the
  exact design handoff prohibited runtime mutation.

No formal self-review or Reviewer action is claimed. The result is a candidate
pending Advisor validation and independent Fable5 Level-3 design review.

## 9. Preserved unrelated Foundation Docs state

The following pre-existing Foundation Docs state was not edited or staged:

- modified `advisor/_system/AGENTS.md`;
- modified `advisor/_system/README.md`;
- modified
  `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
- untracked `advisor/jobs/20260709_reviewer_selection_protocol/`; and
- untracked `advisor/jobs/20260709_role_result_storage_protocol/`.

Only the prescribed result and pointer paths are eligible for the Foundation
Docs publication commits.

## 10. Routing and completion state

```text
DESIGN_DELTA_STATUS: CANDIDATE_PENDING_FABLE5_LEVEL3_REVIEW
IMPLEMENTATION_STATUS: PAUSED_NOT_AUTHORIZED_BY_THIS_HANDOFF
PROTOTYPE_WORKTREE_STATUS: BYTE_PRESERVED_UNSTAGED
FULL_INTEGRATION_STATUS: DEFERRED_WITH_GATE
FABLE5_REVIEW_STATUS: NOT_ROUTED_BY_WORKER
RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
NEXT_MISSION_STATUS: NOT_STARTED_NOT_AUTHORIZED
STOP
```
