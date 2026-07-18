# Independent Delta Review — Preview Input/Hydration Fix

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_DELTA_REVIEW
REVIEWER: foundation-reviewer-fable5
RETURN_TO: foundation-advisor
RESULT_RECORDED_AT_UTC: 2026-07-18T19:54:58Z
VERDICT: PASS
```

## 1. Live binding and independence (actual, introspected)

- tmux session `foundation-reviewer-fable5` (live-verified) · pane synchronization OFF (window + global) · CLI session `4d976816-aff1-480b-824f-2ae8f382c759` · model `claude-fable-5` (Fable 5 family; 1M tier not introspectable from inside, nothing contradicts) · effort `max` (env `CLAUDE_EFFORT=max`) · `/fable-sentinel` loaded first (delta-review reference loaded) · Agent Office Reviewer authority re-read (`docs/agent` @ `c837af5`).
- Independence: this session authored neither the correction (Cosmile Worker session, Opus 4.8 per its result) nor the Advisor artifacts; no overlapping review was in flight; read-only for the reviewed work; PATCH_AUTHORITY: NONE respected — no patch, stage, commit, push, dispatch, or risk acceptance.

## 2. Handoff and subject integrity (direct Git-object evidence — all PASS)

- Review handoff `41_…DELTA_REVIEW_HANDOFF.md` at foundation-docs commit `b56eaf06ba6c554f5dd9baacc06e77dc03ca86ec` (= worktree HEAD, clean): blob `a79d9b0322d7298f33dff72edb665d45eccba086` and SHA-256 `9d12bf59b3c0fa3b3fdc85ab1ff57a6511c8e028adf0ca7cc428ffe7c764da07` both match; working-tree copy byte-identical.
- Context read from the same committed snapshot: `37_`, `38_`, `39_`, `40_` job docs and `runs/shared/.../33_PREVIEW_UNLOCK_DIAGNOSIS_RESULT.md` + `33_…_POINTER.md`.
- Product subject: worktree `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1`, branch `implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718`, HEAD = candidate `62c468e9906acac0a6f61a9ca4f7108e790c4d06`, working tree clean (zero tracked changes, zero untracked). `d5c762f…` verified as the candidate's direct parent (`merge-base --is-ancestor` + one-commit log). `PUSHED: NO` re-verified: no remote branch contains the candidate.

## 3. Required checks — criterion by criterion

**(1) Delta additive and allowlisted — PASS.** `git diff d5c762f..62c468e` = exactly one additive commit touching exactly the two declared paths (`app/src/app/preview/page.tsx` +39/−8; `app/scripts/o1_browser_runtime_contract.vitest.ts` +25/−0). Therefore no schema, migration, dependency (`package.json`/lockfile untouched), configuration (`next.config.ts` untouched), layout (`layout.tsx` untouched), popup (`ShippingPopup.tsx` untouched), or endpoint change of any kind.

**(2) Exact defect addressed — PASS.** Old code gated and serialized from a React mirror (`disabled={state === "checking" || secret.length === 0}`, `body: JSON.stringify({ secret })`). Candidate removes both dependencies: the enable decision is `isSubmitDisabled(state)` with `GateState`-only input (`checking`-only disable, page.tsx:19–21,73), and the payload is read live at submit (`new FormData(form).get("secret")`, page.tsx:30). A DOM-populated field with no React event can no longer disable Continue (state stays `idle` → enabled) and can no longer be replaced by a stale empty copy (the DOM value itself is serialized). Both observed failure modes are eliminated at the mechanism level.

**(3) Single data path — PASS.** `submitted` is function-local; its only sink is the one `fetch("/api/preview/access")` body. React state now holds only the `GateState` enum. Sink scan of the candidate file: zero `localStorage`/`sessionStorage`/`console.*`/`document.cookie`/`history`/URL-write hits (the lone grep match is the boundary comment). Navigation is a fixed `"/shop"` string. The value is never rendered back.

**(4) Disable semantics — PASS.** Disabled ⇔ `state === "checking"` only; duplicate-submission protection unchanged in mechanism (in-flight disabled submit button; implicit Enter submission is likewise inert while the default button is disabled). Empty input fails closed at submit time (page.tsx:31–34: length 0 → `denied`, zero network).

**(5) Success clears; server side unchanged — PASS.** `form.reset()` on `res.ok` before navigation (page.tsx:43). Server-side files blob-identical old↔candidate (`route.ts` `5e722eab`, `o1PreviewAccess.ts` `c330c9e9`, `middleware.ts` `80c56adb` at both commits), and the four properties are present at the candidate: constant-time comparison (`constantTimeEquals`, compare-in-constant-time notes), httpOnly derived-token cookie (never the secret), production refusal (`NODE_ENV === "production"` → 404), middleware preview restriction with exempt paths, and never-logged/echoed non-disclosure.

**(6) Regression tests meaningful and reintroduction-binding — PASS with one recorded limitation.** The three new tests ran by name in my verbose rerun: enabled in every non-checking state (`idle`/`denied`/`error`), disabled only while `checking`, and the structural oracle `isSubmitDisabled.length === 1`. The natural regression path — reintroducing any secret/field parameter into the predicate that owns the enable decision — cannot pass (arity + state assertions, JS-certain). Recorded limitation (non-blocking): a deliberate JSX-side bypass (recreating a state mirror and an inline `disabled` that stops calling `isSubmitDisabled`) is beyond any non-render unit test; the suite has no render infrastructure and no source-text-assertion idiom, and adding a render dependency is prohibited in this correction. Optional future strengthening under a separate authorization: an fs-based source oracle asserting the `disabled` prop calls `isSubmitDisabled` and that no `secret.length` appears in the page source.

**(7) Independent reruns — PASS, Worker evidence reproduced exactly.**

```text
focused contract suite   npx vitest run scripts/o1_browser_runtime_contract.vitest.ts
                         → 1 file · 45 passed          (Worker claim: 45 = 42+3)   MATCH
typecheck                npx tsc --noEmit --incremental false → exit 0             MATCH
lint (changed paths)     npx eslint src/app/preview/page.tsx scripts/o1_browser_runtime_contract.vitest.ts → exit 0   MATCH
full suite               npx vitest run → 25 files · 597 passed · 7 skipped        MATCH (identical to claim)
non-production build     npx next build (NEXT_TELEMETRY_DISABLED=1) → exit 0, ƒ /preview present   MATCH
```

Build isolation note: the mission app is a LIVE `next dev` server (loopback :37083, tunnel-fronted) serving from this worktree's `.next`. An in-place `next build` could disturb it, so the build ran on a full copy of the candidate app (including `node_modules`, excluding `.next`) in the session scratchpad; a first symlinked-`node_modules` attempt was rejected by Turbopack and discarded; the passing build used the full copy, which was deleted after verification (zero residue). Environment hygiene: no `O1_*`/`DATABASE*`/`COSMILE*` variables set; the one-shot fixture suite stayed env-gated OFF (among the 7 skipped); no real identity, Google/Toss call, secret value, PII, trace, video, HAR, or screenshot was used or created.

**(8) Optional DOM-only reproduction — SKIPPED with reason.** The Playwright JS library resolves only inside the mission's private runtime area (`.mission-tmp/.../runtime`, mode 700) and is not installed in any reviewer-accessible package root; installing dependencies is prohibited, and driving the live tunnel-backed runtime would add perturbation risk without decision value: the fixed behavior is already established at three independent levels (code semantics of an uncontrolled field + FormData; the structural/state oracles rerun above; the Worker's recorded clean-context browser booleans, including "Continue REMAINS ENABLED after DOM-only populate = TRUE"). The separately open denied-message render-timing observation was not pursued per the handoff; note that the denied code path exists (page.tsx:79) and its state transition is unit-covered, and the server 401 path was proven in an earlier phase.

**(9) Containment — PASS.** Product worktree porcelain empty before, during, and after review (zero untracked = zero diagnostic residue; `tsconfig.tsbuildinfo` mtime still the Worker-era `19:38:05`). Mission runtime preserved and alive at review end: cloudflared tunnel PID 2838728 up since 18:31:08 — its lifetime spans the fix and this review, and quick-tunnel hostnames are fixed for process lifetime, so the hostname Leo registered is unchanged (also: no tunnel/config path in the delta); `next dev` (:37083) up since 19:38 from this worktree; `o1mission_db_2834183` Up. Unrelated pre-existing processes (main-repo Cosmile dev server, others) untouched. Google/Toss: the delta touches no Google/Toss path, this review made no Google/Toss/network-identity call, and both remain BLOCKED.

## 4. Worker-report cross-check (reported vs actual)

Every load-bearing claim in `33_PREVIEW_UNLOCK_DIAGNOSIS_RESULT.md` §2/§5/§6/§8 that is statically or executably verifiable was independently reproduced: candidate chain and changed paths (exact), correction mechanics (line-level), all five evidence numbers (exact), containment booleans (worktree clean, no trace/video/HAR artifacts present, tunnel/db/app liveness, PUSHED: NO). The Worker's self-disclosed earlier misdiagnosis (popup-only) and its NOT-CONFIRMED denied-render observation are honestly stated in the result and do not contradict any verified fact.

## 5. Excluded scope

Popup/layout behavior (outside the correction boundary; separately recorded), the open denied-message render-timing observation (per handoff instruction), Google login/operator bootstrap/customer login/Toss/Golden Order/Golden Reversal (blocked), any re-audit of axes already PASSed at `d5c762f` (delta-review principle), and any live-runtime mutation or restart (no authority).

## 6. Verdict rationale

`PASS` — the delta is exactly the smallest directed correction, on the exact declared paths, with the defect eliminated at mechanism level, no second data path for the secret, server-side security surface byte-identical, meaningful regression oracles that bind the natural regression path, and all five Worker evidence claims reproduced exactly by independent execution. The two recorded notes (JSX-bypass test-binding limitation; skipped optional browser reproduction) are non-blocking observations that do not require patch or risk acceptance. This PASS validates only this delta; it does not authorize Google login, Toss, any economic flow, push, or controlled-live progression.

```text
GOOGLE_LOGIN: BLOCKED
TOSS: BLOCKED
PUSHED: NO (unchanged by this review)
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
