# Sentinel Final Design Delta Re-Review

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_FINAL_DESIGN_DELTA`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel re-review

Session: separate existing `foundation-reviewer-sol` role session

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is an independent read-only design-delta re-review. It is not
implementation, implementation review, risk acceptance, final approval, or
permission to resume the Worker.

## 1. Exact candidate and evidence inspected

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Previously reviewed candidate:
  `e8531a306a28b4f2858a49b32cc2b3c1bfb4ce6d`
- Final candidate: `d65716c27e258e5cfc332a8b68a58583697ffca8`
- Cumulative delta commits: `8c5d0c25c8b91fbe2bf47ac25dde46494c4a982c`
  and `d65716c27e258e5cfc332a8b68a58583697ffca8`.
- Final candidate/upstream at review: equal (`0 0`); target worktree clean.
- Exact cumulative delta: four canonical documentation paths, `+64/-27`.
- `git diff --check e8531a3..d65716c`: clean.
- Non-documentation delta: zero.

Read directly:

1. the prior
   `SENTINEL_PRC1_PRC8_DELTA_REREVIEW_RESULT.md`;
2. Advisor validations 40, 41, and 42, as routing/challenge claims rather than
   proof;
3. the exact commit-fixed cumulative delta and all four current canonical docs;
4. actual organization projector/types/registry, runtime projection/client,
   pixel contracts/layout/camera/clock and overlay/mirror/HUD/prototype chain;
5. current Vite configuration, both named bundle tests, installed Vite 8.1.4 and
   Rolldown 1.1.5 declarations; and
6. two in-memory Vite JS-API builds using `write:false` (production and
   `test-demo`) to reproduce the returned chunk/facade graph without writing
   output.

The in-memory builds completed successfully and left the target worktree clean.
No runtime/source/config/test file was patched and no on-disk build was created.

## 2. PRC-1 through PRC-8 verdicts

| Finding | Verdict | Direct current result |
|---|---|---|
| PRC-1 — per-field source/authority | `CLOSED` | `aiRuntimeState` is now the exact projector RT+(B) arbitration with the actual per-result provenance; `advisorTeam` remains (A)-registry-owned. |
| PRC-2 — no second operational progress truth | `CLOSED` | All four pod progress counts remain literal display-only `0`; no committed WorkUnit/gate catalog or completion assertion exists. |
| PRC-3 — cues empty; diagnostics non-operational | `CLOSED` | The seven-field wrapper declares `cues: readonly []`; non-empty cues reject, and diagnostics cannot manufacture motion. |
| PRC-4 — owned sentinels and duplicate identity | `CLOSED` | `UNKNOWN`/`AI_RUNTIME_UNKNOWN` and drop-all-or-hard-fail duplicate handling remain unchanged and correct. |
| PRC-5 — total deterministic layout/defaults | `REGRESSION` | Project key, actor priority, responsible-Advisor omission, selection, viewport, and time are now total, but the newly introduced `DEFAULT_CAMERA.mode='FIT_ALL'` is outside the actual `PixelCameraState.mode` vocabulary and has no typed mapping. Pod config also still accepts `advisorTeamId='UNASSIGNED'` as a valid lane. |
| PRC-6 — distinct complete raw/wrapper parsing | `PARTIAL__BLOCKING` | Raw and wrapper top-level shapes are now distinct and the wrapper's seven fields are literal, but the raw contract still omits exact nested actor/diagnostic keys and revision/time invariants while falsely pointing to §3.1 for them. |
| PRC-7 — literal structural DOM props/caller | `CLOSED` | The interface is literally `{ pods: readonly PixelPodInput[] }`; the production caller and overlay/mirror/HUD props are named; prototype structural compatibility and fixture/type exclusions remain explicit. |
| PRC-8 — Vite/Rolldown output-graph proof | `PARTIAL__BLOCKING` | Tool versions, `write:false`, returned types, chunk fields, and production dynamic-root method are correct; the specified eager `facadeModuleId` is not. The exact invocation returns `index.html`, not `src/ui/main.tsx`, as the eager facade. |

## 3. Closed findings

### PRC-1

Delta lines 69-72 now agree with actual source. `advisorTeam` is registry-owned
and merely transported in the frame (`projector.ts:181-183`).
`aiRuntimeState` is computed by `computeAiRuntimeState` from RT active-work /
waiting / `FAILED` plus (B) `sessionProcess`, `ai_ready`, and `ai_error`
(`projector.ts:128-150,185-202`). The documented result provenance also matches:

- B error record, else RT, for `AI_ERROR`;
- B ready record for `AI_READY`;
- RT for `AI_WORKING`/`AI_WAITING`; and
- fail-closed missing sentinel for `AI_RUNTIME_UNKNOWN`.

Identity/model/effort are correctly excluded as inputs.

### PRC-2, PRC-3, and PRC-4

- Delta lines 78-81 and contract line 200 retain all progress counts as literal
  `0`, `blockerSummary=null`, no completion assertion, and no operational-plan
  catalog.
- Delta lines 81 and 112 plus contract lines 209-217 require an explicit empty
  tuple `cues: readonly []`; diagnostics suppress/render diagnostics only.
- Delta lines 107-109 retain duplicate actor drop-all/deterministic hard failure
  and the correct field-owned sentinels.

### PRC-7

Delta lines 95-101 now define the literal fixture-free interface and match actual
component reads: overlay line 154 and semantic mirror lines 32-40 read only
`projection.pods`; HUD is already frame-based. The named production caller passes
`{pods}` and `frame`, while `PixelPrototypeProjection.pods` has the identical
field type. `prototype-entry.tsx` remains unedited, and the production chain still
forbids prototype types, projector, and fixtures.

## 4. Blocking findings

### FDR-1 / PRC-5 — the camera default is outside the actual contract

[enum/source regression]
The new companion-contract line 201 defines:

`DEFAULT_CAMERA = { mode: 'FIT_ALL', override: null }`.

Actual `PixelCameraState.mode` is exactly
`FULL_OFFICE | FOCUSED_POD | MANUAL | SCRIPTED`
(`src/ui/pixel/contracts.ts:249-255`); `FIT_ALL` is not a member. Actual
`fullOfficeCamera(...)` returns a complete `PixelCameraState` with
`mode: 'FULL_OFFICE'`, calculated center, zoom, and selected pod
(`src/ui/pixel/camera.ts:9-24`). The docs declare no separate typed camera-default
contract and no mapping from `FIT_ALL` to `fullOfficeCamera`.

A Worker either cannot assign the stated default to the actual camera type or
must invent a new enum/mapping. This was introduced by the closure patch, so
PRC-5 is `REGRESSION`, not a residual risk.

The same layout section also declares
`CommittedPodConfig.advisorTeamId: AdvisorTeamValue` and validates every member
of that union (contract lines 183,202), which includes actor sentinel
`UNASSIGNED`. The responsible-Advisor rule only requires a matching Team. It can
therefore treat an `ADVISOR` actor with `advisorTeam=UNASSIGNED` as a valid
presentation-pod responsible Advisor even though the organization contract says
that actor cannot receive work. Actor-level `UNASSIGNED` must remain valid as a
fail-closed actor state; it must not become a valid responsible pod lane.

Required correction: define the production default in actual source vocabulary,
for example `cameraOverride=null` plus
`fullOfficeCamera(layout, viewport.width, viewport.height, selectedPodId)` yielding
`mode='FULL_OFFICE'`, or declare an exact separately typed mapping. Require a
renderable pod's `advisorTeamId` to be a non-sentinel `AdvisorTeam`; preserve
`UNASSIGNED` only for actor-level failure state.

### FDR-2 / PRC-6 — raw parsing is separated but not complete

[untrusted-boundary contract]
Delta line 104 correctly restores the raw four-key object and removes the wrapper
from the first boundary. But it validates `projectionRevision` only as “a finite
number” and `evaluatedAt` only as “a string”; it does not require a non-negative
safe integer, equality with the enclosing projection revision, or a canonical
UTC timestamp. The actual presentation is built with the same
`services.projectionRevision` as the enclosing snapshot
(`src/runtime/projection.ts:94-108,203-216`), while current outer client parsing
already requires a non-negative safe-integer revision
(`src/ui/runtime/client.ts:519-549`).

The paragraph also says companion §3.1 “lists the nested frame/envelope keys and
defaults.” It does not. It gives layout/default and wrapper contracts, but no
literal raw `OrganizationFrameActor` key set and no validation contract for
`diagnostics: {code,roleInstanceId,detail}[]`. “actors[] shapes” is not an exact
runtime parser contract. A Worker can accept missing actor envelopes, unknown
actor/diagnostic keys, invalid diagnostic codes, fractional/negative revisions,
or a frame revision inconsistent with the enclosing snapshot while claiming the
four-key rule passed.

Required correction: define the raw parser's exact nested actor, envelope, frame,
and diagnostic keys/enums; require a non-negative safe-integer
`projectionRevision` equal to the enclosing snapshot revision; and validate
`evaluatedAt` as the repository's canonical UTC form. Keep this raw parser
separate from the already-complete seven-field wrapper parser.

### FDR-3 / PRC-8 — the eager facade is empirically wrong

[test-contract reproduction]
Delta line 237 specifies the eager root by exact `facadeModuleId` as
`src/ui/main.tsx`. Running the candidate's exact production invocation:

`build({ root, mode: 'production', build: { write: false } })`

returned one entry chunk whose actual values were:

```text
isEntry: true
facadeModuleId: /home/leo/Project/agent-office-batch-a-001/index.html
```

This follows current source: `index.html:15` is Vite's HTML entry and imports
`/src/ui/main.tsx`; `main.tsx` is a module inside that entry chunk, not its
facade. A second `test-demo` in-memory build reproduced the same `index.html`
eager facade and a correct dynamic facade at
`src/ui/pixel/prototype-entry.tsx`, confirming that dynamic-entry
`facadeModuleId` matching is usable while the eager expectation is wrong.

A fail-closed test following the design finds no eager root and fails before it
can prove isolation. Required correction: identify the eager facade as the exact
absolute `index.html` path (and optionally assert `src/ui/main.tsx` in that
chunk's `.modules`); retain the future Office dynamic facade as the exact
`production-pixel-office-chunk.tsx` path. Keep the remaining
`.modules`/`imports`/`dynamicImports`/`.code` rules unchanged.

## 5. Stale-text and boundary verification

The five stale phrases identified by Advisor validation 41 are absent:

- no five-field wrapper summary remains;
- no responsible-Advisor failure normalizes its role-instance ID to
  `UNASSIGNED`;
- no project identity reads `registryRow.project`;
- the contract comments use pod omission; and
- no B-only `aiRuntimeState` authority row remains.

Legitimate actor-level `advisorTeam=UNASSIGNED` remains in the organization fact
contract and first-boundary normalization; that actor sentinel is not itself a
regression. The remaining pod-lane issue above is a distinct config-validation
problem.

No cumulative-delta line expands product, accessibility, authentication,
security, delivery, transport/tmux, Hermes, authority, PWA, fallback, Channy,
rollback, database/schema/migration, secret/credential, remote/public/live,
protected-branch/main, Grok/excluded-session, or Batch B-E scope. WU-02/03/04,
U1-U3, S3, R2, T3, actor-overlay/detail-panel separation, secondary navigation,
semantic/static parity, and DOM-static → M1 fallback remain preserved.

## 6. Verdict rationale and routing

`NEEDS_PATCH` is required because PRC-5 has a new invalid camera enum/default,
PRC-6 still lacks a complete raw untrusted-boundary contract, and PRC-8's exact
eager facade fails empirical reproduction. All three are technical documentation
defects patchable within the already-approved canonical-doc scope; no new Founder
product, authority, security, or risk decision is required.

Excluded: Agent Office implementation or patches, source/test/config/package/
media changes, dependency installation, server/browser operation, DB/schema/
migration, credentials/secrets, remote/public/live access, tmux input, protected
branch/main, risk acceptance, final approval, and Worker resumption.

Advisor should return these exact corrections to the same Control session and
route the resulting exact docs delta back to this same independent Sentinel
session. Sentinel did not patch Agent Office, authorize implementation, accept
risk, grant final approval, or resume the Worker.

`RETURN_TO: Advisor`

`STOP`
