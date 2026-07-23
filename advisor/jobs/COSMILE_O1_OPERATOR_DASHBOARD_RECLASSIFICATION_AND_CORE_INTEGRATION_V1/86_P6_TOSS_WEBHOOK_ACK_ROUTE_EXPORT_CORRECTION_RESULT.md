# P6 Toss Webhook ACK Route Export Correction — Worker Result

MISSION: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1` · WU `P6_TOSS_WEBHOOK_ACK_ROUTE_EXPORT_CORRECTION`.
ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoff 85 verified SHA256 `396fec79…` ✓ blob `d6cde224…` ✓ (docs HEAD `569d83f8`). BASE `9ab1716` → HEAD **`ce2b8d0`** clean/upstream-equal (non-force push `9ab1716..ce2b8d0`). Result uncommitted. Only the result-84 first build failure was in scope; no sweep/other defect used. Codex idle.

## Exact 3 paths (nothing else)

1. NEW `app/src/lib/payment/webhookAck.ts` — pure non-route module holding, moved **byte-for-byte and without reinterpretation**: the `ACK_DECIDED_200` allowlist constant, its **full ACK-contract comment blocks** (the "Outcomes that are durably recorded…" allowlist note and the complete "Acknowledgment matrix… FAIL-CLOSED (503)… share ONE definition" contract), and `webhookAckHttpStatus`. Verified: the base route block `diff`s identically to the new module block (`BLOCK_BYTE_FOR_BYTE=yes`). A 2-line module header was added above the moved block (new, not part of the byte-for-byte content).
2. `app/src/app/api/o1/webhooks/toss/route.ts` — added `import { webhookAckHttpStatus } from "@/lib/payment/webhookAck";`; removed the non-handler `export function webhookAckHttpStatus` and the `ACK_DECIDED_200` const + their comments (grep count now 0). The `POST` handler, the pre-parse `MAX_WEBHOOK_BODY_BYTES` bound, `handleO1Webhook` call, the `see webhookAckHttpStatus` comment, and the response `NextResponse.json({ status: out.kind, verified: out.verified ?? null }, { status: webhookAckHttpStatus(out.kind) })` are unchanged.
3. `app/scripts/o1_browser_runtime_contract.vitest.ts` — repointed the `webhookAckHttpStatus` import from the route to `@/lib/payment/webhookAck` (one line).

Preserved fail-closed ACK semantics: `not_enabled`→404, `body_too_large`→413, allowlisted outcomes→200, everything else (unknown/repository_error/transport_unavailable)→**503 resend** — identical mapping, identical allowlist, provider retry behavior and bounded response body untouched. No payment/security/economic boundary changed.

## Tests first — named RED → identical GREEN

Exact command (`--cache=false`, temp symlink), once for RED then identically for GREEN, `-t 'maps every reachable outcome kind to exactly its frozen status'`:

- RED (exit 1): `Error: Cannot find package '@/lib/payment/webhookAck'` (`ERR_MODULE_NOT_FOUND`) — the pure module did not yet exist. Preserved.
- GREEN (identical): **1 passed | 98 skipped**, exit 0. Byte-for-byte move verified; route export/const count 0; POST handler + usage intact.
- No other path/test, no P6, build, typecheck, lint, install, generate, DB, provider, runtime, browser, sweep, or economic command run.

## Effects / cleanup / rollback

POST/outcome-mapping/fail-closed-503/provider-retry/response-body/payment/security/economic behavior change: **0** — a pure ACK helper (+ its constant and full contract comments) relocated to a lib module (identical), plus the two import wirings. Three-path containment proven (`git diff --cached --name-only` = exactly the three paths; `create mode` for the new module). Dependency: worktree `node_modules` absent pre-run; temp symlink → canonical, removed after each run; canonical `package.json`=`a486716…`/`package-lock.json`=`36dfa1a…` byte-identical pre/post; no symlink/cache/process residue. Git: one additive commit, non-force push only, no main/force. Rollback: `git revert ce2b8d0` (the new file is removed by the revert).

RETURN_TO: `foundation-advisor` · STOP before P6. This is the third invalid-route-export correction (after `account/orders` page `f48a30e` and `google/callback` route `9ab1716`); per result 79's earlier enumeration it was the last file of this class. The full P6 gate (9-file cumulative Vitest → conditional Next `--webpack` build) is the authoritative next step; not run here per scope.
