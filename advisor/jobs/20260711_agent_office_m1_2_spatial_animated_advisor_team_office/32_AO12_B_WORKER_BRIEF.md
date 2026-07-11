# AO12-B Worker Brief

Status: `READY_FOR_EXISTING_AGENT_OFFICE_WORKER`

Actor/model: **Agent Office Worker - GPT-5.6 SOL Ultra**

Target:

- repo: `/home/leo/Project/agent-office`
- branch: `shadow/agent-office-m1-2-spatial-office`
- exact base: `ecd2652501df55aba0aa0f55c236b1933c6dc1e3`
- batch: `AO12-B`
- WorkUnits: `AO12-IWU-05..08`

## Objective

Implement the frozen static shared-floor and identity batch using only the
accepted AO12-A projection. Keep it test/demo-fixture-only and non-operational.
Every project Team Pod must remain spatially visible on wide desktop; selecting
one expands detail without turning the others into ordinary cards or hiding
their required evidence-backed summary.

## Allowed Agent Office Paths

New implementation and documentation:

- `src/ui/spatial/project-identity.ts`
- `src/ui/spatial/project-identity.css`
- `src/ui/spatial/character.tsx`
- `src/ui/spatial/assets/placeholder-characters.tsx`
- `src/ui/spatial/assets/ASSET_INVENTORY.md`
- `src/ui/spatial/asset-registry.ts`
- `src/ui/spatial/fixtures.ts`
- `src/ui/spatial/spatial-office.tsx`
- `src/ui/spatial/team-pod.tsx`
- `src/ui/spatial/mission-board.tsx`
- `src/ui/spatial/spatial-office.css`
- `tests/ui/project-identity.test.ts`
- `tests/ui/spatial-asset-contract.test.ts`
- `tests/ui/spatial-office.component.test.tsx`
- `tests/ui/spatial-accessibility.test.tsx`
- `tests/e2e/spatial-office-static.spec.ts`
- new files only under
  `tests/e2e/baselines/spatial-office-static.spec.ts/`

Exact narrow test-fixture integration only:

- `src/ui/demo-entry.tsx`: select the spatial fixture only from an explicit
  test-demo URL parameter; default M1 demo and production entry must remain
  byte/behavior compatible.
- `src/ui/i18n/ko.ts`: only required approved Korean static-office vocabulary;
  no naming, authority, mission, blocker, or state reinterpretation.

Mechanical as-built status/traceability only:

- `docs/FEATURE_INDEX.md`
- `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
- `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
- `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`
- `docs/ui/AGENT_OFFICE_M1_2_CHARACTER_PROJECT_IDENTITY_SYSTEM.md`

No other path is allowed. If another path is required, STOP and return it to
Advisor instead of broadening scope.

## AO12-IWU-05 Project Identity

- Implement exact fixed palettes: Cosmile coral/pink, SIASIU mint/emerald,
  Foundation navy/blue, VibeNews purple, Agent Office orange/amber, Control
  slate/charcoal with blue accent.
- Team assignment remains primary; project identity is supplemental text,
  glyph, pattern, edge, and accent only.
- Implement catalog v1 deterministic SHA-256 fallback for unknown future
  projects exactly as the frozen Identity System specifies, independent of
  registry order and without mutable storage.
- Display full name/project ID and deterministic collision marker; identity must
  survive color/SVG removal and forced colors.
- Severity, freshness, focus, alert, and authority styling override decorative
  project identity.
- Retain the AO12-A current-name gate and output only `SIASIU`.
- Measure and test required light/dark/monochrome/forced-color contrast; do not
  claim compliance from palette intent alone.

## AO12-IWU-06 Character and Channy Placeholders

- Use original locally authored React/CSS/DOM/SVG/simple sprite-like shapes only.
- No external fetch, image, font, sound, script, package, generated asset,
  protected-style copy, vendor, license purchase, or real-person likeness.
- Stable slots, dimensions, role categories, ownership, internal license, source
  path, and actual SHA-256 must be recorded and mechanically verified.
- Actor role text/icon/shape and project assignment remain separate layers.
- Missing/invalid placeholders fall back without layout shift.
- Channy is one cute Bedlington Terrier static placeholder with bed, food bowl,
  and water bowl. It has no actor role, authority, assignment, notification,
  terminal/session inspection, command, approval, repair, or inferred state.
- AO12-B adds no Channy behavior or status reaction; those remain AO12-C.

## AO12-IWU-07 Static Shared Floor and Mission Boards

- Render one shared American-style open-office floor with wood desks, glass
  meeting room, coffee lounge, shared paths, project signs, mission boards,
  Reviewer booth, Advisor Hub, and Channy facilities as code-native static
  placeholders.
- Wide desktop shows every registered Team Pod as an office area at once.
- Non-selected Pods remain recognizable and show Team name, responsible
  Advisor, main mission, current actor/state, and gate/blocker summary.
- Selected Pod expands its evidence-backed board with every frozen field.
- Display only redacted registered model/session identities and accepted
  evidence pointers. Never expose pane IDs, paths, credentials, private targets,
  terminal prose, or inferred facts.
- Keep one character per roleInstanceId and a spatially separate independent
  Reviewer booth. Visual proximity never creates Team membership or authority.
- Zones are static and labelled. No task motion, routing, dispatch control,
  direct adapter import, fake live state, or operational Channy behavior.

## AO12-IWU-08 Responsive and Accessible Static Architecture

- Desktop, 1024 tablet, 390 mobile, 320 mobile, 200% text, and short landscape
  must not overlap or overflow.
- Mobile uses focused Team navigation/detail, not an unreadable miniature floor,
  and shows at most two full actor tiles while preserving all Team meaning.
- Provide skip links, semantic headings/lists/regions, roving focus for Pod and
  actor controls, 44px targets, visible focus, state text, and appropriately
  scoped live regions.
- If an inspector is used, focus trap/restore and escape behavior are required.
- Reduced-motion and static modes preserve identical meaning and introduce no
  movement. High-contrast/forced-color and color/SVG removal preserve identity.
- Automated axe A/AA and keyboard/screen-reader-oriented assertions are
  required. Do not claim manual screen-reader certification.

## Test-Demo and Visual Evidence Rules

- The spatial surface may be mounted only in `test-demo` from an explicit URL
  parameter. Production runtime and default M1 demo stay unchanged.
- Add deterministic AO12-B fixtures; label them synthetic and non-operational.
- Create only new M1.2 static baseline PNGs under the exact new baseline folder.
- Never update the six existing M1 baseline PNGs. Their SHA-256 values must stay
  byte-identical to `ecd2652` and `b7d8cdb`.
- Directly inspect every new baseline at desktop, tablet, mobile, reduced/static,
  high-contrast, and 200%-text coverage. Record viewport/runtime/font limits.
- Playwright uses only existing loopback private test servers and must terminate
  them; no persistent or remotely reachable server.

## Forbidden

- No AO12-C/D cue reducer, animation, route choreography, operational pose,
  ambient behavior, Channy reaction, performance animation, production
  projection mount, runtime composition, auth, exact delivery, gateway,
  transport, DB, schema, migration, secret, remote/public/prod/live, Hermes,
  browser role dispatch, arbitrary shell, dependency/lockfile/package change.
- No external/generated/purchased/imported assets or production-art claim.
- No existing baseline update, snapshot laundering, hidden overflow, forced
  completion, self-review, risk acceptance, final approval, main merge, force
  push, new session/agent/sub-agent/delegated context, or next batch.

## Required Checks

1. focused identity, asset, component, accessibility, and static E2E suites;
2. `node scripts/check-current-product-name.mjs`;
3. `npm run lint` and `npm run typecheck`;
4. full `npm test` and `npm run build`;
5. `npm run test:e2e` with default M1 baselines unchanged;
6. exact spatial static Playwright coverage and direct new-image inspection;
7. `npm run audit:dependencies`;
8. axe, keyboard, focus, 44px, overflow, color/SVG-removal, forced-color,
   reduced/static, 320px, 200% text, tablet/mobile/landscape evidence;
9. asset source/hash/license/no-external-reference scan;
10. source-boundary scan proving no adapter/process/network/write/dispatch
    capability in `src/ui/spatial/`;
11. SHA-256 equality of all six existing M1 baselines;
12. exact changed/staged path allowlist, package/lockfile equality, and
    `git diff --check`.

## Completion and Evidence

- Commit and non-force push the exact batch to the current branch.
- Target result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_B_RESULT.md`
- Pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/33_WORKER_AO12_B_RESULT_POINTER.md`
- Commit/push only those exact Foundation Docs result/pointer files.
- Return ASCII-only pointer to Advisor and STOP. Do not invoke Fable5 or AO12-C.
