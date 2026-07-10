# Agent Office Worker Canonical Design Result

Status: `DESIGN_CANDIDATE_PUBLISHED__PENDING_INDEPENDENT_FABLE5_REVIEW__RETURN_TO_ADVISOR`

This is an evidence-bearing Worker report, not an independent review verdict,
risk acceptance, implementation authorization, or final approval.

## 1. Identity and Scope

- MISSION_ID: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- WORK_UNIT: `AO-WU-04`
- ACTOR: `Agent Office Worker`
- WORK_MODE: `DESIGN_ONLY__NO_PRODUCT_IMPLEMENTATION`
- TARGET_PROJECT: `Agent Office`
- TARGET_REPO: `/home/leo/Project/agent-office`
- TARGET_BRANCH: `shadow/agent-office-m01`
- BASE_COMMIT: `937f0c5f92cd3b39d81796c13bc00b4afe3407fb`
- RESULTING_HEAD: `fedf716e780c760641d157cc9f4c08f698f41409`
- ORIGIN: `https://github.com/leohan816/agent-office`
- EXISTING_SESSION: `agent-office/$13`, window `0`, pane `%13`
- SESSION_COMMAND_AND_PATH: `codex` at `/home/leo/Project/agent-office`
- ASSIGNED_MODEL_EFFORT: `gpt-5.6-sol / ultra`
- AGENT_SUBAGENT_DELEGATION_STATUS: `NONE`
- RESULT_FILE:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_DESIGN_RESULT.md`
- POINTER_FILE:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/13_WORKER_DESIGN_RESULT_POINTER.md`

Authorized scope was exactly seven canonical candidate Markdown files. No product
implementation, bootstrap-instruction change, canonical foundation-docs mirror,
or unrelated repository work was authorized or performed.

## 2. Required Authority Reads and Preflight

Read directly from current files/committed blobs before authoring:

- all active Agent Office root and `docs/agent/` instructions;
- every committed file in the source Advisor job, including intake, entry gate,
  unknown gate, design brief, Fable5 brief, addendum, handoff, manifest, loop state,
  bootstrap pointer, and index;
- canonical role V2;
- active tmux transport README, protocol, activation state, active override,
  session registry, kill-switch/manual-fallback file, and final activation record;
- committed bootstrap result and pointer; and
- actual target branch, tree, origin, upstream, status, and live tmux locator.

Preflight evidence:

- branch and upstream were both at bootstrap commit
  `937f0c5f92cd3b39d81796c13bc00b4afe3407fb`;
- target worktree was clean and contained only the six bootstrap files;
- live pane was exactly `agent-office/$13/%13`, window/pane index `0/0`, command
  `codex`, path `/home/leo/Project/agent-office`;
- transport authority reported active, kill switch disengaged, and manual fallback
  active; it was read as authority only and not modified or exercised by Worker;
- current manifest version is 1, denominator 15, AO-WU-01 through AO-WU-03 are
  `COMPLETED`, and AO-WU-04 is `READY`; and
- no agent, sub-agent, delegated context, temporary session, second Worker, or
  Reviewer context was created or used.

The new exact design handoff, canonical V2 precedence, and manifest AO-WU-04
authorization govern this design pass. The stale bootstrap-only paragraph in the
unchanged root instructions was not edited or used to broaden scope.

## 3. Exact Changed Files

Commit `fedf716e780c760641d157cc9f4c08f698f41409` adds exactly:

1. `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`
2. `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
3. `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`
4. `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
5. `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
6. `docs/operations/AGENT_OFFICE_OPERATIONS_RECOVERY.md`
7. `docs/FEATURE_INDEX.md`

Commit summary: `7 files changed, 2686 insertions`; all files mode `100644`.

All seven identify themselves as
`CANDIDATE__NOT_IMPLEMENTED__PENDING_FABLE5_DESIGN_REVIEW`. Agent Office is the
sole canonical design owner; no design mirror was created under foundation-docs.

## 4. Candidate Design Decisions

The package makes reversible technical decisions without changing product policy:

- strict TypeScript/Node/React module boundaries with exact versions deferred to
  a separately authorized implementation batch;
- Initiative -> Package -> Mission -> Phase -> WorkUnit hierarchy with immutable
  IDs, manifest version 1 denominator 15, and explicit authority-backed scope
  accounting;
- one local writer, append-only hash-chained JSONL events, immutable content-
  addressed artifacts, atomic projections/checkpoints, and no DB;
- typed complete WorkUnit/message/blocker/alert/decision/notification state
  machines with optimistic concurrency, stable rejection codes, idempotency,
  causal links, UTC timestamps, and sequence-based ordering;
- evidence-backed completion and deterministic replay/projection rules;
- immutable browser-to-Advisor message artifact with request ID/hash/receipt,
  separate delivery, acknowledgement, intake, decision, deterministic GPT package,
  and resume proof;
- no browser target for Worker/Reviewer and no arbitrary terminal/command surface;
- TmuxAdvisorGateway as a fixed Advisor-only pointer-notification boundary under
  existing transport authority, with static committed launcher/profile gate and
  manual fallback; HermesAdvisorGateway is a no-side-effect stub only;
- read-only manifest/Git/artifact/tmux observation adapters with no terminal-prose
  inference and no transport-authority duplication;
- loopback-private fail-closed default, provider-based auth without embedded real
  secrets, same-origin/CSRF/rate/audit/content/PWA controls, and separately gated
  Tailscale/private-network design;
- multi-project and future Linux/Mac host observation contracts with stable host
  identity, trust/quarantine/revocation, sequence, skew, offline/reconnect/gap, and
  stale-evidence rules;
- SSE plus HTTP POST instead of WebSocket because live traffic is one-way and a
  bidirectional generic channel is unnecessary and riskier;
- structured-event-only visual mapping for idle, delivery, reading, working,
  testing, review, blocked, WAITING_LEO, result return, and recovery;
- quiet desktop/mobile PWA layout, local reviewed SVG/icon licensing strategy,
  WCAG 2.2 AA target, reduced motion, stable dimensions, and overflow rules; and
- crash matrices, quarantine, deterministic restart, backup/isolated restore,
  rollback compatibility, disable controls, kill-switch/manual fallback, and
  evidence-bearing recovery proof.

## 5. Requirement and Review Coverage

- `docs/FEATURE_INDEX.md` contains 50 material requirement rows in the exact form:
  `DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH -> CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE`.
- Every candidate document also has a local traceability table with that schema.
- All future implementation/test paths are explicit but are honestly marked
  `NOT_IMPLEMENTED` where applicable.
- Batch A-E are strictly sequential and match the mission manifest dependencies:
  A domain/store/projection, B read-only adapters/dashboard, C structured scene,
  D Advisor Inbox/gateway/decision flow, E PWA/security/recovery/E2E.
- Implementation cannot start until independent Fable5 Level 3
  `DESIGN_REVIEW: PASS` over the exact design commit.
- `NEEDS_PATCH` returns to the same Worker/reviewer loop; `PASS_WITH_RISK` returns
  to Leo/GPT; `FAIL` stops. No Worker/UI automatic progression exists.
- Later implementation review must classify divergence exactly as `CODE_DEFECT`,
  `DESIGN_DEFECT`, `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or
  `NEEDS_LEO_GPT_DECISION` and update canonical docs from actual evidence rather
  than rewriting design to excuse defects.

## 6. Checks and Outcomes

| Check | Factual outcome |
|---|---|
| Exact allowed untracked/staged set | Seven expected design paths only |
| Candidate status header | Present in all seven files |
| Traceability schema | Present in all seven files; 50 master rows |
| Required WorkUnit/message/blocker/alert/decision terms | Present in domain contract |
| Ten required structured animation activities | Present in UI mapping |
| Security/gateway/multi-host/recovery boundary term checks | Complete |
| Local Markdown target existence | No broken local file target found |
| ASCII terminal/content safety check | All seven files ASCII-compatible UTF-8; terminal output ASCII-only |
| Staged whitespace check | `git diff --cached --check` returned no findings |
| Staged count before commit | 7; unstaged 0; untracked 0 |
| Commit changed-file list | Exactly seven additions |
| Runtime/product tests | Not applicable and not run: no runtime/package/test files exist |

The word "complete" above describes factual coverage checks, not a Fable5 review
verdict or final approval.

## 7. Git, Push, and Ancestry Evidence

- Base: `937f0c5f92cd3b39d81796c13bc00b4afe3407fb`.
- Commit: `fedf716e780c760641d157cc9f4c08f698f41409`
  (`docs: add Agent Office M01 canonical design candidate`).
- Explicit staging: only the seven paths listed in Section 3.
- Push: non-force update of `shadow/agent-office-m01`,
  `937f0c5..fedf716`.
- Local HEAD: `fedf716e780c760641d157cc9f4c08f698f41409`.
- Upstream: `fedf716e780c760641d157cc9f4c08f698f41409`.
- Remote ref: `fedf716e780c760641d157cc9f4c08f698f41409`.
- Local HEAD and upstream are ancestors of each other and therefore equal.
- Target status count after push: `0`.
- Target tree count: `13` total files (six bootstrap plus seven candidates).
- GitHub repository remained private, not archived, and not disabled.

## 8. Forbidden and Excluded Scope Evidence

- APPLICATION_OR_RUNTIME_SOURCE: `NONE`
- PACKAGE_MANIFEST_OR_APP_SCAFFOLD: `NONE`
- TEST_OR_ASSET_FILES: `NONE`
- DATABASE_SCHEMA_MIGRATION_OR_QUERY: `NONE`
- SECRET_CREDENTIAL_ENV_VALUE_AUTH_ACTION_OR_PII_ACCESS: `NONE`
- PUBLIC_PRIVATE_NETWORK_PRODUCTION_OR_LIVE_ACTION: `NONE`
- DIRECT_BROWSER_WORKER_OR_REVIEWER_DISPATCH: `NONE`
- ARBITRARY_TERMINAL_EXECUTION_SURFACE: `NONE`
- TMUX_INPUT_OR_TRANSPORT_AUTHORITY_CHANGE: `NONE`
- HERMES_IMPLEMENTATION_OR_CONNECTION: `NONE`
- BOOTSTRAP_INSTRUCTION_CHANGE: `NONE`
- FOUNDATION_DOCS_CANONICAL_DESIGN_MIRROR: `NONE`
- REVIEWER_WORK_SELF_REVIEW_RISK_ACCEPTANCE_OR_FINAL_APPROVAL: `NONE`
- MAIN_PUSH_MAIN_MERGE_PROTECTED_BRANCH_OR_FORCE_PUSH: `NONE`
- AUTOMATIC_IMPLEMENTATION_OR_NEXT_MISSION: `NONE`
- NEW_SESSION_AGENT_SUBAGENT_OR_DELEGATION: `NONE`

Terminal commands were limited to required reads, repository/session inspection,
documentation checks, exact-path staging, commit, non-force push, and evidence
verification.

## 9. Foundation-Docs Publication Discipline

- Foundation-docs starting branch: `main`.
- Starting HEAD and upstream:
  `77e291e9c8f247eed2fd0fab8559ed5835ed42f9` (equal).
- Pre-existing unrelated dirt was present and preserved:
  - modified `advisor/_system/AGENTS.md`;
  - modified `advisor/_system/README.md`;
  - modified
    `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
  - untracked `advisor/jobs/20260709_reviewer_selection_protocol/`;
  - untracked `advisor/jobs/20260709_role_result_storage_protocol/`.
- Only this result path and the exact design pointer path are authorized for
  publication. This result is committed first so the pointer can carry its exact
  foundation-docs result commit SHA.

## 10. Limitations, Deferred Gates, and Routing

- Candidate has not been independently reviewed. Review status is
  `NOT_PERFORMED_BY_WORKER__PENDING_ADVISOR_ROUTING`.
- Nothing in the package is as-built beyond bootstrap documentation.
- Real auth credentials, Tailscale/private-network exposure, remote Linux/Mac
  collectors, Hermes, DB/multi-user storage, public exposure, and production/live
  remain explicitly gated or out of scope.
- Exact dependency versions and implementation constants require later reviewed
  implementation handoffs.
- No STOP condition was encountered during this design pass.
- Advisor must verify the actual commit/result and route the independent Fable5
  design review. Worker does not contact or dispatch the Reviewer.

RETURN_TO: `Advisor`

PROPOSED_NEXT_ACTOR: `Advisor`

STOP
