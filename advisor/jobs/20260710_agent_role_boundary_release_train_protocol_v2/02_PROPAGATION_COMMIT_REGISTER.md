# Propagation Commit Register

Status: `PROPAGATED_PENDING_FABLE5_REVIEW`

## Canonical and Active Instruction Commits

| Workspace | Branch | Commit | Pushed | In-scope files |
|---|---|---|---|---|
| foundation-docs | `main` | `924611bb79ef9894c9eac6aa13a7e7d356b0b966` | yes | canonical V2, `README.md`, `docs/agent/RUN_PROTOCOL.md`, intake, Advisor brief |
| Cosmile | `shadow/m4-cosmile-memory` | `029d489728e27abb3a6ea3d1a6831eefe7434d14` | yes | `CLAUDE.md`, `app/AGENTS.md`, `app/CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md` |
| SIASIU | `shadow/m4-siasiu-memory` | `0b59434dba43741f56d4497f8d5d723f2f0227c2` | yes | `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md` |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | yes | `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/OPERATING_MODEL_20260629.md` |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `f240867dd83312e644b1ba520648da791c7733da` | yes | `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` |
| skill / Fable5 | `main` | `d3a9342f45ed95f9d9a7d37396f026a8560558dc` | yes | `fable-sentinel/SKILL.md`, `fable-sentinel/references/review-classification.md` |

All pushed branch heads were `0 ahead / 0 behind` their upstream after publish.
No force push was used.

## Advisor Local Active Files

`foundation-advisor` is not a Git repository. The actual local active files were
updated and must be reviewed directly:

| File | SHA-256 after propagation |
|---|---|
| `../foundation-advisor/AGENTS.md` | `aa45bdf10c0f2683432973749b53ccc7d4ea50b455eed75e36986c51a01e1042` |
| `../foundation-advisor/CLAUDE.md` | `895795978b879fb4e8c9f3801b99f9b708933340e8d8585d0340b85ce405e349` |
| `../foundation-advisor/README.md` | `4d8c4f9bd8bca6bb184faf529df9f4a94b065bf6b0eb93426d6181aadb6ffc9b` |

## Deliberately Excluded Existing Changes

The following pre-existing files were not staged or committed by this mission:

- foundation-docs:
  - `advisor/_system/AGENTS.md`
  - `advisor/_system/README.md`
  - `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`
  - `advisor/jobs/20260709_reviewer_selection_protocol/`
  - `advisor/jobs/20260709_role_result_storage_protocol/`
- Cosmile: six pre-existing untracked `app/docs/*.md` files.
- SIASIU: three pre-existing untracked `docs/*.md` files.
- foundation-control: pre-existing untracked docs, design files, and security docs.
- FOUNDATION:
  - `docs/FOUNDATION_DOCS_SYNC_POLICY.md`
  - `설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html`

No excluded file was staged or committed.

## Runtime Evidence

Every committed file has a `.md` extension and is an instruction, protocol,
historical authority marker, or Advisor artifact. No runtime source, schema,
migration, test, DB, env, flag, production/live, or secret file was changed.

