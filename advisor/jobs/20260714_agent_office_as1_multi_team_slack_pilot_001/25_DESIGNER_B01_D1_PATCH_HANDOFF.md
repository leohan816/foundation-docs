# Designer B01-D1 Documentation Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Designer

TARGET_SESSION: `agent-office-designer`

MODE: `SECURITY_TRANSPORT_DESIGN_DELTA_PATCH_ONLY`

MODEL_EFFORT: `GPT-5.6 SOL / max`

## Exact inputs

- Worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001_SDK_DESIGN_DELTA`
- Branch: `design/as1-sdk-pre-event-identity-delta-001`
- Exact clean/upstream-equal start: `c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e`
- Reviewed package commit: `f18ba7fa32917df544fc562b7778c0ab97e238ce`
- Independent review result commit:
  `a48e291b39b0a424a047a8b655cd53d90f205d3b`
- Independent review pointer commit:
  `9c9375c9fd018e40e7361aa22c1bb363267e2939`
- Finding: `B01-D1 — HIGH — strict ws structural bridge omits closeTimeout`

Read the exact independent result and pointer directly. The Reviewer proved
that the transport, identity, receiver, retry, logging, ACK, shutdown,
dependency, scope, and rollback design is otherwise coherent. Do not reopen or
rewrite those accepted parts.

## Required correction

Modify only:

`docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md`

1. Change every factual statement that `@types/ws@8.18.1` omits only two
   selected runtime options to state that it omits exactly three:
   `closeTimeout`, `maxBufferedChunks`, and `maxFragments`.
2. Change the local structural intersection to add exactly:

```ts
readonly closeTimeout: 5_000;
readonly maxBufferedChunks: 64;
readonly maxFragments: 64;
```

3. Preserve `as const satisfies`, package-root import, and the existing bans on
   `any`, casts, module augmentation, deep imports, suppressions, and
   `skipLibCheck` changes.
4. Require an exact package-root NodeNext compile probe using `ws@8.21.1`,
   `@types/ws@8.18.1`, TypeScript `6.0.3`, repository strict options, and
   `skipLibCheck:false`, including a direct `new WebSocket(..., options)` call
   and public `terminate()` call.
5. Keep all numeric/runtime limits and all B01/B02-B09 classifications
   unchanged. Do not change dependencies, implementation scope, authority, or
   activation status.

Create only these new evidence files:

- `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_D1_PATCH_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_D1_PATCH_RESULT_POINTER.txt`

## Validation and protocol

- Search the entire canonical delta for stale `two-field`, `two new`, or
  equivalent incomplete bridge claims.
- Run `git diff --check` and verify the exact three-path scope.
- Do not run product tests, install packages, connect Slack, access secrets, or
  touch the preserved dirty Worker worktree.
- Commit the canonical patch, patch result, and pointer in protocol order.
- Non-force push only the design branch; verify clean/upstream-equal.
- Return the exact pointer to `agent-office-advisor` and STOP.

No implementation, self-review, risk acceptance, owner setup, live transport,
Worker dispatch, or next mission is authorized.

