# Independent Sentinel SDK Identity Design Delta Review Result

## Verdict

`NEEDS_PATCH`

The frozen B01 SDK identity/transport design delta must not advance to a Worker
handoff. Its raw Socket Mode boundary, pre-event App proof, receiver limits,
retry/logging controls, parser quarantine, manual ACK ownership, shutdown model,
dependency pins, manifest scopes, and rollback gates are supportable by the
exact public contracts inspected. The design nevertheless fails its own
mandatory strict-TypeScript gate: the exact `@types/ws@8.18.1` declaration also
omits the public runtime option `closeTimeout`, while the proposed structural
extension adds only `maxBufferedChunks` and `maxFragments`.

This is `NEEDS_PATCH`, not `PASS`, because the immutable options literal cannot
compile with TypeScript `6.0.3`, `strict:true`, and `skipLibCheck:false` under the
design's required `satisfies` expression. It is not `PASS_WITH_RISK`: a mandatory
build/contract failure cannot be accepted as residual risk. It is not `FAIL`:
the defect has one narrow documentation-level correction inside the already
authorized B01 design surface and does not require a new product or security
model decision.

No owner setup, live Slack, real tmux delivery, implementation, activation,
risk acceptance, final approval, or B02-B09 reopening is authorized by this
result.

## Blocking delta finding

### B01-D1 — HIGH — the strict `ws` structural bridge omits `closeTimeout`

The frozen design requires the immutable client options literal to contain
`closeTimeout: 5_000`, then says `@types/ws@8.18.1` omits only the two options
introduced in `ws` 8.21.0 and permits only this extension:

```text
WebSocket.ClientOptions & {
  readonly maxBufferedChunks: 64;
  readonly maxFragments: 64;
}
```

It requires that literal to `satisfies` the intersection and forbids casts,
`any`, module augmentation, suppressions, deep imports, and `skipLibCheck`
changes
(`c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e:docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md:327-366`).

Direct inspection of both declaration branches in the exact published
`@types/ws@8.18.1` tarball found:

- `followRedirects`, `handshakeTimeout`, `maxRedirects`,
  `perMessageDeflate`, `protocolVersion`, `allowSynchronousEvents`, `autoPong`,
  `maxPayload`, and `skipUTF8Validation` are declared;
- `maxBufferedChunks` and `maxFragments` are absent, as the design records; and
- `closeTimeout` is also absent
  (`index.d.mts:242-264`; `index.d.ts:245-267`).

The exact `ws@8.21.1` public client documentation and runtime do support
`closeTimeout`: the package documents it for `new WebSocket(...)`, initializes
the option, assigns it to the client, and uses it to destroy a socket whose
closing handshake stalls (`doc/ws.md:310-349`;
`lib/websocket.js:633-692,1309-1313`). The mismatch is therefore a declaration
gap, not an unsupported runtime option.

An independent package-root NodeNext probe using the exact published
`ws@8.21.1`, exact `@types/ws@8.18.1`, TypeScript `6.0.3`, the repository's
strict options, and `skipLibCheck:false` reproduced:

```text
probe.ts(11,3): error TS2353: Object literal may only specify known properties,
and 'closeTimeout' does not exist in type 'StrictWsClientOptions'.
```

Adding only `readonly closeTimeout: 5_000` to the local intersection made the
same literal and direct public constructor call compile with zero diagnostics.
The proposed bridge is therefore almost correct but not implementable exactly
as frozen.

Required correction:

1. Amend the local structural extension to declare exact literal
   `readonly closeTimeout: 5_000` in addition to the two receiver-limit fields.
2. Correct the surrounding evidence to say that the exact declaration omits
   all three runtime options used by the literal.
3. Preserve the current no-cast/no-`any`/no-augmentation/no-suppression rules and
   require the package-root NodeNext strict compile probe in the acceptance
   evidence.
4. Return the exact documentation/result/pointer delta to this same independent
   Reviewer. No implementation handoff may precede closure.

## Mandatory-question disposition

1. **Exact `ws@8.21.1` pre-emission limits — PASS.** Published source passes
   `maxBufferedChunks`, `maxFragments`, `maxPayload`, synchronous-event policy,
   and UTF-8 policy from the client constructor into `Receiver`. Source rejects
   an already-full retained-chunk array before pushing another chunk, rejects
   fragment 65 after counting every data fragment (including an empty one), and
   rejects single or cumulative fragmented payload overflow before `message`.
   With no negotiated permessage-deflate extension, RSV1/compressed input is
   rejected before delivery. Independent synthetic receiver traces reproduced
   all five paths with zero message emissions.
2. **Strict TypeScript bridge — FAIL AS WRITTEN.** The two new receiver options
   are expressible without unsafe escapes, but the complete required literal is
   not: `closeTimeout` is a third undeclared runtime option. B01-D1 is the sole
   blocking finding.
3. **Swapped app-token pre-event isolation — PASS at design level.** The first
   transport-bounded text message is accepted only by the hello-specific lexer;
   exact `connection_info.app_id` equality and the immutable readiness seal are
   completed synchronously before general JSON parsing or delivery is enabled.
   A first event, wrong-App hello, event-before-type, payload-before-type, binary
   frame, malformed hello, or wrong hello followed by an event fails closed
   without parsing or exposing the event body and without ACK.
4. **URL/retry/logging/parser/ACK/shutdown coherence — PASS.** The typed fixed
   `apps.connections.open()` call has a 65,536-byte response cap, one non-reset
   startup deadline, no SDK or surrounding retry, rate-limit rejection, fixed
   Slack endpoint, suppressing logger, opaque secret URL, exact host/path/TLS
   validation, no redirect, no compression, exact post-proof parser, one-use
   payload-free ACK closure, no send retry, no reconnect, and bounded close plus
   existing drain/latch behavior. No contradictory transition was found.
5. **Bot/App proof and least privilege — PASS.** Official `auth.test` returns
   bot-token workspace/user/bot identity without App ID. Official `bots.info`
   supports the bot ID lookup and defines `bot.app_id` as the owning App; its
   bot-token scope is `users:read`. Both committed manifests contain exactly
   `groups:history`, `chat:write`, and `users:read`, subscribe only to
   `message.groups`, disable interactivity, and enable Socket Mode. The separate
   owner-created app-level token is constrained to `connections:write`, the
   official scope for `apps.connections.open`.
6. **Residual risk — NONE ACCEPTED.** B01-D1 is a mandatory patch, not a risk.
   Future exact lockfile, full dependency audit, implementation, synthetic
   acceptance suite, and independent implementation/security review remain
   gates; they are not unrecorded residuals or approvals here.

## Primary and exact published contract evidence

### Slack platform

The following current official contracts were read directly:

- [Using Socket Mode](https://docs.slack.dev/apis/events-api/using-socket-mode/):
  `apps.connections.open` produces a temporary URL; direct protocol
  implementation is supported; Slack sends `hello` containing
  `connection_info.app_id`; outer events contain payload, envelope ID, type, and
  response-payload capability; exact envelope-ID ACK and disconnect/refresh
  handling are required.
- [`apps.connections.open`](https://docs.slack.dev/reference/methods/apps.connections.open/)
  and [`connections:write`](https://docs.slack.dev/reference/scopes/connections.write/):
  the app-level token is sent in the Authorization header and the scope grants
  generation of the temporary Socket Mode URI.
- [`auth.test`](https://docs.slack.dev/reference/methods/auth.test/) and
  [`bots.info`](https://docs.slack.dev/reference/methods/bots.info/): bot-token
  identity fields and the bot-to-App `app_id` link remain supported. Direct page
  source identifies `users:read` for bot and user tokens.
- [`message.groups`](https://docs.slack.dev/reference/events/message.groups/),
  [`groups:history`](https://docs.slack.dev/reference/scopes/groups.history/),
  [`chat:write`](https://docs.slack.dev/reference/scopes/chat.write/), and
  [`users:read`](https://docs.slack.dev/reference/scopes/users.read/): the three
  committed bot scopes correspond to private-channel receive, reply, and the
  startup bot/App lookup, with no extra manifest scope.
- [Token types](https://docs.slack.dev/authentication/tokens/): an `xapp-` token
  represents the App across organizations and is distinct from the workspace
  bot token. No documented pre-open method maps it to the configured App ID;
  hello remains the required app-token pairing fact.

### Exact package artifacts

- `@slack/web-api@8.0.0` npm tarball SHA-256:
  `6044ac0b7bae06bce3c4d10a124f4f51bb72b9afa2c0f655e46f9433e9efa054`;
  lock integrity:
  `sha512-ORx3XQryQPq2Jnxv5giSKXVoQRUeylrrymIR2S9fPzLjPcCts8RayMeBSZMcpfpAqp6fnBRuPW2UB6dUPUTEZA==`.
  Package-root types and runtime expose `WebClient`, typed
  `apps.connections.open`, `retryConfig`, `rejectRateLimitedCalls`,
  `maxRequestConcurrency`, `timeout`, custom `fetch`, custom `logger`, and
  `allowAbsoluteUrls`. A no-network runtime probe confirmed the fixed endpoint,
  Authorization header, redirect-error mode, exactly one success call, one
  network-failure call, and one immediately rejected 429 call.
- `ws@8.21.1` npm tarball SHA-256:
  `bb0f7e58ba1f64746672734d36175fe185f226491e336abc0743e2a8f4472ec1`;
  integrity exactly matches the design:
  `sha512-+0NTnW77fFN/DjQi6k/Sq/Yvk4Sgajw7urW8V+asjXnRgDs9gyGkdb7EzgfhA4goXsRIZKE28fzIXBHEzhuiWw==`.
  The [8.21.0 release](https://github.com/websockets/ws/releases/tag/8.21.0)
  introduced the two receiver-part limits for the remote memory-exhaustion
  issue; the [8.21.1 release](https://github.com/websockets/ws/releases/tag/8.21.1)
  counts empty fragments and reduces defaults. The package root exports the
  public client and Receiver. No native module is bundled.
- `@types/ws@8.18.1` npm tarball SHA-256:
  `dc2763952a24bf15dc920830a2d2884c23bccc08a853e8556e34771401254fa5`;
  integrity exactly matches the design:
  `sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==`.
  Both CommonJS and ESM declaration branches were inspected, producing B01-D1.
- Node 24's [global WebSocket](https://nodejs.org/docs/latest-v24.x/api/globals.html#class-websocket)
  is a stable browser-compatible surface but exposes none of the required
  pre-callback receiver-part/payload controls. Rejecting it in favor of exact
  `ws` is justified.

The exact `ws` package declares `bufferutil` and `utf-8-validate` only as
optional peers. A clean local lock probe using the exact tarball created no
`node_modules/bufferutil` or `node_modules/utf-8-validate` package entry; only
the expected optional-peer metadata remained. Node 24 supplies the selected
UTF-8 primitive. The design correctly requires both optional native packages to
remain absent from the later implementation lock.

## Frozen delta and provenance

The actual design file was read before the Designer result. The immutable range
`16e3720318239e1466f16a526e23819ba1bd0702..c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e`
contains exactly three added paths and 1,059 added lines:

1. `docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md`
   — 721 lines;
2. `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_DELTA_RESULT.md`
   — 315 lines; and
3. `artifacts/as1-multi-team-slack-pilot/DESIGNER_SDK_IDENTITY_DELTA_RESULT_POINTER.txt`
   — 23 lines.

Commit `f18ba7fa32917df544fc562b7778c0ab97e238ce` is the direct child of the
start base and adds only the design. Commit
`d3984e7aae39018a0f8707511dc166c6ae204fe0` is its direct child and adds only
the Designer result. Frozen head
`c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e` is the direct child and adds only
the pointer. The target branch was clean and
`HEAD == upstream == c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e`.

Content hashes reproduce:

- design:
  `104c4044aee518e8a536ead6b4a2f11638554850b48d8c7c4014f7820d460742`;
- Designer result:
  `883c7d368f469eff11c21d8f3b978d7e609d340209cfacec7066db0a8075f0ce`;
- Designer pointer:
  `06d10777a53a4927109eac155ce3ca3da8e2a240d555ff2fb9f6401805bab691`.

The original B01 finding was read at governance commit
`3100a717418d8a4dc17d0114aaa3daa8b14ac083`, the accepted primary design at
`81a8c3474380a7e427516d6f5e57c97ad88c6c9b`, and the exact Designer authority at
governance commit `f9d6ad1a0a7ce3b7a5f9bfb71bf043bdbad7c13c`. The frozen integration design,
security model, setup document, and both manifest blobs are byte-identical
between `81a8c347...` and the reviewed head. The Designer's coordinates, scope,
commit sequence, exclusions, and dependency decision reproduce; its strict-type
compatibility claim is incomplete exactly as B01-D1 records.

## Independent targeted reproduction

- Live actor/runtime binding: PASS. Read-only tmux metadata identifies
  `agent-office-reviewer`, `$28/@28/%28`, indexes `0/0`, pane PID `2381134`,
  workspace `/home/leo/Project/agent-office`, `codex`, live/input-on,
  synchronization off. The pane shell's direct child is
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`. Separate Advisor,
  Designer, and Worker sessions remain distinct.
- Candidate provenance, direct ancestry, exact three-path range, clean target,
  and upstream equality: PASS.
- `git diff --check` over the full frozen delta: PASS.
- Added-content Slack-token/private-key scan: PASS, zero token-shaped value.
- Exact design and evidence SHA-256 checks: PASS.
- Exact `ws` synthetic receiver gates under Node `v24.18.0`: PASS. The 65th
  retained chunk and 65th empty fragment returned
  `WS_ERR_TOO_MANY_BUFFERED_PARTS`; single-frame and cumulative fragmented
  payload overflow returned `WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`; an
  unnegotiated compressed frame returned `WS_ERR_UNEXPECTED_RSV_1`; every case
  emitted zero messages.
- Exact `@slack/web-api@8.0.0` package-root strict compile: PASS. Exact no-network
  fixed-endpoint/single-attempt success, network failure, and rate-limit runtime
  probes: PASS.
- Frozen proposed `ws` structural bridge under package-root NodeNext strict
  compile: FAIL with exact TS2353 on `closeTimeout` (B01-D1).
- Corrected three-field structural bridge under the same compiler/options and
  direct public constructor: PASS, zero diagnostics.
- Frozen full lock `npm audit --audit-level=high --package-lock-only`: PASS,
  zero vulnerabilities on 2026-07-15. Isolated exact-`ws` lock audit at the same
  level: PASS, zero vulnerabilities. The later changed full lockfile remains a
  mandatory implementation-review gate.

All transport and Web API probes were synthetic and no-network. Public source
and documentation retrieval and npm package/audit reads were the only external
reads. No Slack API or Socket Mode endpoint, bearer-authenticated request,
WebSocket connection to Slack, token, secret, environment file, owner setup,
real tmux input, database, production system, candidate write, or broad
unrelated test was used.

## Review coordinates, authority, and classification

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Pass: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_DELTA`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Start base: `16e3720318239e1466f16a526e23819ba1bd0702`
- Design package commit: `f18ba7fa32917df544fc562b7778c0ab97e238ce`
- Designer result commit: `d3984e7aae39018a0f8707511dc166c6ae204fe0`
- Frozen reviewed head: `c5140fcf6ba4a626bd9c28f02f6bc8afae54b41e`
- Governance branch/head before this result:
  `advisor/as1-multi-team-slack-pilot-001` /
  `4fccfd8101e154eff0e50b7ec543fc78044fc7b0`, clean and upstream-equal
- Review run prompt SHA-256:
  `3530d04eff5966be87a4ebd142c448783f310edd53df49a95da04d3c16cd4580`
- Review handoff SHA-256:
  `663ba1622cfa76c0e3fa64e2cdd63ac0960929f9b3a13708b4ce263bec9db610`
- Required Sentinel skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Skill references read directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
  - `delta-review.md`:
    `31965d290395f16ca64939d1d755d587ed460ff828586538eafa58fa8de70749`

The skill-linked V2 role protocol was read directly and identifies itself as
superseded historical evidence. Current Agent Office `AGENTS.md`, `CLAUDE.md`,
Team operating model, Reviewer role, and exact committed handoff controlled.
The handoff authorizes only this result and its pointer in governance; it grants
no candidate write.

Replacing the rejected `@slack/socket-mode@3.0.0` seam with the bounded
package-root Web API plus exact `ws` transport is classified as:

`BOUNDED_SECURITY_TRANSPORT_DEPENDENCY_DELTA__FULL_INDEPENDENT_REVIEW_REQUIRED`

It is a narrow reviewed transport/dependency delta, not a material security-
model redesign. The frozen model already requires raw hello App proof,
application-owned parsing/ACK, bounded input, no provider retry/reconnect, and
closed profile identity. This delta selects public mechanisms capable of
enforcing those existing invariants; it does not change authority, product
behavior, activation, or risk ownership.

`B02` through `B09` remain exactly open and unchanged. The nine-file later B01
scope is sufficient and does not include their source, state, evidence,
operations, or Exact Delivery v2 repair surfaces. B01 itself remains open until
this design finding is patched and a later exact implementation independently
passes.

## Routing and stop

RETURN_TO: `agent-office-advisor`

VERDICT: `NEEDS_PATCH`

NEXT_REQUIRED_ACTION: Advisor-routed narrow same-Designer B01-D1 documentation
correction, followed by an exact frozen delta re-review by this same independent
Reviewer. No Worker handoff, owner setup, Slack connection, tmux input, risk
acceptance, activation, final approval, or next mission is authorized.

STOP
