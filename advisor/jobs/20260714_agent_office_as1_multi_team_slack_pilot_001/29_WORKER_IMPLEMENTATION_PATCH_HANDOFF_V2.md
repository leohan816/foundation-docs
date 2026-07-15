# Worker Implementation Patch Handoff V2

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

REQUIRED_SKILL_SHA256:
`9a5afeefd34775a918b83900aa19859278f4e151a067cf6ab82cb6a25757091b`

MODEL_EFFORT: `Opus 4.8 / Ultracode` (verify directly before continuing)

## 1. Exact authority and review inputs

This handoff amends and supersedes only the B01 SDK portion and clean-worktree
preflight of `21_ADVISOR_IMPLEMENTATION_PATCH_HANDOFF.md`. All B02-B09 findings,
security boundaries, result protocol, and forbidden behavior in that handoff
remain controlling.

Read directly:

1. initial implementation/security review:
   `20_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`, result commit
   `3100a717418d8a4dc17d0114aaa3daa8b14ac083`, SHA256
   `c06bbad3ce948829b6e192b30f07f2144e57efec9fa441e21b87580e4dcccf6b`;
2. original patch handoff: `21_ADVISOR_IMPLEMENTATION_PATCH_HANDOFF.md`;
3. frozen SDK design at
   `a17126125a087d178367d4a4c47bd5100e7d077c`, canonical commit
   `4826cd11a23dbbe1a6dbd2d4983b919a6a94e7a7`;
4. independent B01-D1 PASS:
   `27_B01_D1_DELTA_REREVIEW_RESULT.md`, result commit
   `4e62e865061d76768ce918ffc891bdc6ad4681c5`, SHA256
   `c6e0735dbcd1036aa64072e985b889b293c96f5760361855c7ccbc59e5aea703`;
5. Advisor acceptance: `28_ADVISOR_B01_D1_DESIGN_ACCEPTANCE.md`.

Do not reinterpret, omit, downgrade, or accept risk for B01-B09.

## 2. Exact candidate and preserved dirty-state coordinates

- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- branch: `feature/as1-multi-team-slack-pilot-001`
- current committed HEAD/upstream:
  `16e3720318239e1466f16a526e23819ba1bd0702`
- initial rejected source candidate:
  `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- frozen original design parent:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`

The worktree is intentionally dirty from the same Worker's interrupted patch.
Do not reset, clean, stash, discard, or overwrite it. Before editing, require
exactly these six modified paths and no others:

- `src/adapters/gateways/slack-pilot/exact-authority.ts`
- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `src/adapters/gateways/slack-pilot/web-client.ts`
- `src/application/slack-pilot/contracts.ts`
- `src/application/slack-pilot/outbox.ts`
- `tests/integration/as1-slack-outbound.test.ts`

The exact pre-resume binary diff SHA256 is:

`e111e427da801ef55e5a67967963dae8bf7e05f2780a8f4da77245ad895dce8e`

Inspect every preserved hunk. Retain only correct B02-B09 work. Remove the
superseded first-callback App-ID approach and implement the accepted pre-event
raw-hello boundary. A dirty-state mismatch or another writer is a stop; the
expected six-path state is not.

## 3. Serial WorkUnits

1. `AS1-PATCH-01_SDK_SEAM_V2`
   - add the accepted canonical design blob byte-for-byte;
   - remove direct production dependency/import/use of
     `@slack/socket-mode@3.0.0`;
   - retain exact `@slack/web-api@8.0.0`;
   - add exact runtime `ws@8.21.1` and exact dev `@types/ws@8.18.1`;
   - implement the complete reviewed public-root raw Socket Mode adapter,
     bounded fetch/URL gate, exact `ws` options, hello-only quarantine parser,
     App-ID proof, event parser gate, one-use ACK, lifecycle, logging, disposal,
     two-profile isolation, and no reconnect/fallback contract;
   - use exactly the three-field local type intersection and strict
     package-root compile contract from the reviewed design.
2. `AS1-PATCH-02` through `AS1-PATCH-09`
   - complete the exact B02-B09 WorkUnits in section 3 of the original handoff;
   - preserve all ordering, durability, authority, provenance, lifecycle,
     outbox, bounds, recovery, documentation, and evidence requirements.
3. `AS1-PATCH-INTEGRATION`
   - compose B01-B09 without widening any port or caller-controlled input;
   - keep Phase A disconnected, fake-only, and owner-setup-incomplete;
   - regenerate truthful Worker evidence from actual commands and commits.

## 4. Amended allowed paths

All paths authorized by section 4 of the original patch handoff remain allowed.
Add only these exact paths for the reviewed B01 delta:

- `docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md`
- `src/adapters/gateways/slack-pilot/socket-frame.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/adapters/as1-slack-socket-client.test.ts`
- `package.json`
- `package-lock.json`

`tests/helpers/as1-slack-fakes.ts` was already authorized by the original
handoff. No Designer result/pointer, governance file, unrelated dependency,
runtime config, manifest, environment template, registry, Exact Delivery v2
file, or external system is in scope.

Dependency installation is limited to the exact reviewed package change. Do
not float versions, add transitive choices manually, change package-manager
configuration, weaken audit policy, or retain a production import of the
rejected Socket SDK. A transitive package may remain only if required by an
unchanged dependency and must not be imported or treated as authority.

## 5. Exact evidence gates

All evidence is synthetic and no-network at test/runtime execution. Package
retrieval for the exact reviewed dependencies is allowed; real Slack, DNS,
WebSocket, token, app, owner setup, and tmux mutation remain forbidden.

While patching, run the changed tests directly. Before freezing the candidate,
run:

1. exact package-root NodeNext no-emit compile probe for `ws@8.21.1`,
   `@types/ws@8.18.1`, TypeScript `6.0.3`, repository strict options,
   `skipLibCheck:false`, direct construction, and public `terminate()`;
2. every B01 acceptance case in section 9 of the reviewed design;
3. a regression for every exact B01-B09 review finding and crash boundary;
4. all AS1-focused test files, including newly authorized files;
5. the four protected regressions named by the original implementation handoff;
6. `npm run typecheck`;
7. changed-file ESLint only;
8. `npm run build:core`;
9. `npm audit --audit-level=high`;
10. `git diff --check 81a8c3474380a7e427516d6f5e57c97ad88c6c9b..HEAD`;
11. targeted scans for suppressions, deep imports, secrets, unsafe casts,
    caller-selected profile/target/path/buffer/time/capability, reset paths,
    generic Slack/tmux execution, stale live-readiness claims, and historical
    destination fallback.

Here, the reviewed design's “full tests” gate means the complete AS1-focused
and named protected regression set above. Do not run Living Office, visual,
browser, broad unrelated E2E, real Slack, real credentials, or real tmux
mutation. Record every failed command, correction, and skipped gate honestly.

## 6. Completion protocol

Keep Phase A default-disconnected. Do not create Slack apps, secret files,
credentials, grants, leases, capabilities, owner setup, or a live round trip.

After B01-B09 are repaired:

1. stage only explicit authorized source/test/package/doc paths;
2. commit and non-force push a frozen source-candidate commit;
3. write `WORKER_RESULT.md` in a result-only commit with exact identity,
   dirty-state reconciliation, B01-B09 closure matrix, dependency/probe facts,
   commands and every failure, test totals, deferred live gates, rollback, and
   no-live/no-secret attestations;
4. write `WORKER_RESULT_POINTER.txt` in a pointer-only commit with exact hashes;
5. prove clean/upstream-equal state;
6. return the exact pointer to `agent-office-advisor` and STOP.

The same `agent-office-reviewer` must perform the independent Level 3
implementation/security delta re-review. The Worker must not self-review,
approve, accept risk, dispatch another actor, start owner setup, or begin
another mission.
