# FABLE5 IMPLEMENTATION/SECURITY REVIEW — Exact Advisor Delivery Bridge (AO-WU-20)

- Mission: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION` · Actor: **Fable5 Reviewer** (`reviewer-fable5`) · Pass: `IMPLEMENTATION_SECURITY_REVIEW__AGENT_OFFICE_EXACT_ADVISOR_DELIVERY` · Level 3 · Skill: `/fable-sentinel` · Date: 2026-07-11
- Target: implementation `889a29b3` (design base `d1708809`) on `shadow/agent-office-m01` — verified `889a29b = HEAD = origin` from git directly; delta 47 files, +5947/-244 (source + tests + docs; no forbidden file class).
- **VERDICT: `PASS`** — closes AO-WU-20 only; AO-WU-21 synthetic rehearsal remains separately Advisor-owned and is neither performed nor authorized by this review.

## 1. Independent verification
- **Full Vitest suite re-run by this reviewer at 889a29b: passed, exit 0** (includes the new exact-delivery suites; synthetic adapters and disposable loopback fixtures only — no real pane, server, credential, or tmux input touched by this review). Lint/typecheck/build/browser/smoke/audit aggregates: REPORTED (Worker result + Advisor validation), consistent with my run; Playwright not re-run this round (labeled).
- **Design conformance reproduced at source (sampled at every security-critical control; files `exact-authority.ts` 797 lines / `exact-transport.ts` 1035 lines / `exact-config.ts` read at targeted regions):**
  - Item 7 transport closure: fixed 3-operation argv exactly as designed — `load-buffer -b <buf> <pointerFile>` / `paste-buffer -p -b <buf> -t %9 -d` / `send-keys -t %9 Enter` (`exact-transport.ts:84-89`), literal `%9`, `spawn('/usr/bin/tmux', [...argv])` (`:163`) with `shell:false`; executable pinned by schema (`exact-config.ts:62,138,180`). No general command, eval, interpolation, wildcard, broadcast, sync, capture, session-creation, Worker, or Reviewer path exists in the adapter.
  - Item 8 journal/no-blind-resend: `PASTE_STARTED`/`SUBMIT_STARTED` phases durably journaled (`exact-transport.ts:212-214,512,532`); any journaled `PASTE_STARTED` forces ambiguous status/failure and blocks resend (`:565-568`); replay/restart/changed-content rules covered by the passing suites.
  - Item 5 lease: one-use with durable consumption — reuse throws `IDEMPOTENCY_KEY_REUSED`, `consumeLease` persists `consumedAt` (`exact-authority.ts:89,278-316`).
  - Item 4 authority snapshots: the activation's `snapshotRefs` set is iterated and validated with dirty-path rejection and named refs incl. roleProtocol/optionADecision/parentMissionManifest (`exact-authority.ts:144,192-197`); revalidation-before-input is the transport preflight path exercised by the suites.
  - Items 2/3 production defaults: **production composition throws on any caller-supplied delivery port or legacy capability** (`composition.ts:63-68` — "production composition rejects caller-supplied delivery capabilities and ports") and enforces the two-key match (v3 deployment schema must pair with the exact operational activation, mismatch throws, `:69-73`); synthetic seams live only in `test-composition.ts`.
  - Item 9 delivery control: default remains manual/disabled with durable latching (rollback-disable suite updated and passing in my run); no auto-enable path found.
  - Item 13 naming: legacy `Shashu Worker`/`shashu` normalized to `SIASIU Worker`/`siasiu` at ingest (`operational-config.ts:451,473`); registry row renders `SIASIU Worker`; legacy replay preserved.
  - Item 17 prerequisites: P-A registry now carries an "Observed window ID" column with `@` IDs; P-B/P-A evidence recorded in `08_ADVISOR_PREREQUISITE_RECORD.md`; consistent with DQ-02.
  - Item 18: `docs/operations/EXACT_ADVISOR_DELIVERY_PREPARATION.md` explicitly ships no descriptor/grant/lease/capability/credential material.
  - Items 10-12/14-16: ingress fixed-path Git-blob/ancestry verification, stage separation (receipt/ACK/intake/decision/resume), routine-vs-Leo/GPT authority bounds, bounded UI exposure, closed browser routes, and Hermes-uncomposed/DB-remote-prod absence are enforced by the dedicated suites in my passing run plus the previously verified unchanged surfaces; targeted greps found no counter-evidence and no new route/port/field.
- Item 20: no real server/tmux invocation/activation material/credential/state root created by the Worker per diff + my OS-level checks (no listener, no new authority files); this review likewise created none.

## 2. Findings
None blocking. Disclosed limitations: Playwright/browser aggregate reported-only this round; `exact-authority.ts`/`exact-transport.ts` were verified by targeted region reads plus the passing dedicated suites rather than exhaustive line-by-line reads — every handoff-named control was individually located and confirmed at source.

## 3. Verdict rationale
Every mandated control was located at exact file:line or reproduced through my own full-suite run; the implementation matches the PASSed design (no divergence found to classify), production is fail-closed against injected authority, the no-blind-resend boundary is durable, and the two named prerequisites carry recorded evidence. Per V2: **PASS** — AO-WU-21 remains gated to Advisor with Leo/GPT-approved Option A boundaries.

## 4. Self-review (Sentinel 6 rules)
Claims are grounded in my own git/grep/test outputs; Worker/Advisor reports cross-checked, not trusted; limitations stated. Read-only: no patch, no authority material, no server, no real tmux call, no rehearsal; only this result + pointer written.

Return to: **Advisor**.
