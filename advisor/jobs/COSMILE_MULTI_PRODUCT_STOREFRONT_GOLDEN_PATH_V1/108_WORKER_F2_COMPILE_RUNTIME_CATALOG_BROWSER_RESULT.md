# F2 COMPILE / RUNTIME / CATALOG BROWSER GATE — WORKER RESULT

Status: **HOLD** — the typecheck failed. Stopped immediately at step 3 with no retry, no fix and no alternative, per handoff 107.

- Handoff `107` verified: docs `0d7d84b651ade353f89087dbe5c914d77434fbae`, sha256 `ad5d0cd8f10ee7ed5b45211480ec8ba5d3aca3ff375a124104996c7cc0be23fa`.
- Product `8a1a5b70c8b6df1f9aaf75cf40821d761a089ae7`, clean/upstream-equal before and after.

## Step 1–2 preconditions: all verified

Worktree-local real `node_modules` with executable `prisma`, `tsc` and `next`. Bundle intact (9 files, `0700`). DB state reconfirmed: **7** candidate `missing_initial` snapshots, **7** `o1tc_` bindings, **7** active non-hidden candidate SKUs. Exactly one listener on `127.0.0.1:3000`, owner `leo`, CWD the mission app, PGID `1665987`. Rollback quarantine path did not preexist. Environment loaded into process memory only, with the single authorized override of the F2 bundle root; non-production, O1 runtime and Google flags ready, Toss `test`, sandbox one-shot off, local substitute off. No env value printed, hashed, copied, logged or placed in argv.

## Step 3 results

| Command | Exit |
|---|---|
| `./node_modules/.bin/prisma generate --schema prisma/schema.prisma` | **0** — client v6.19.3 generated to `node_modules/@prisma/client` |
| `./node_modules/.bin/tsc --noEmit --incremental false` | **2 — FAILED** |

Two type errors, both in code I authored in earlier F2/M2 WorkUnits and both surfaced by the first typecheck ever run over this code (every prior handoff explicitly forbade typecheck, and each of my results declared "no typecheck was run"):

1. `src/lib/foundation/snapshotRepository.ts(288,105)` — `TS7006`: parameter `h` implicitly `any`. This is the `heads.map(...)` argument of the predecessor call inside `importTestCandidateBundle`. The transaction client is typed `Tx = any`, so the `$queryRaw` row generic is erased and the callback parameter has no inferred type. Introduced with F2 (`bd265a7`).
2. `src/lib/runtime/o1CommerceRuntime.ts(539,52)` — `TS2345`: the checkout collaborator seam declares `currency: string` on its `createIntent` input, but the reviewed `CreateIntentInput` requires the literal type `"KRW"`. Introduced with the M2-E6 idempotency seam (`da0f5da`).

Neither is a runtime defect discovered by execution: both one-shots and the whole corrected DB gate passed, because vitest transpiles without type checking. They are real contract-typing defects nonetheless, and the second one weakens a currency literal the payment lane relies on.

## Steps 4–9: not executed

No runtime stop, no `.next` quarantine, no `next build`, no runtime start, no browser, no screenshots. Verified after the failure:

- `listeners = 1`, original PID alive, uptime `86507 s`, PGID `1665987` — the runtime was never touched.
- `.next` still in place; quarantine `f2-prebuild-next-8a1a5b7` **not** created; `candidate.pid` **not** created; `f2-browser-tmp` **not** created; screenshots created: **0**.
- Product Git clean/upstream-equal, zero modified or untracked paths; wrapper unmodified; bundle intact at 9 files.
- No Google, Toss, provider, browser, favorite, cart, checkout, order, payment or refund action. Economic effects zero.

## Declared: Playwright library is absent

Before the failure I established that step 8 could not have used Playwright as written: neither `playwright` nor `playwright-core` is installed in the app, the user home, or the system module paths, and there is no `playwright` CLI. Only the browser binaries exist (`~/.cache/ms-playwright/chromium-1228`, `chromium-1234`, plus headless shells). Installing the package would breach the no-package/lock ceiling, so my plan was to drive the **already installed Chromium directly over CDP** with an owner-only profile under the authorized `runtime/f2-browser-tmp/`. That plan was never executed. The Advisor should confirm this mechanism before any resumed browser gate.

## Smallest correction candidates (NOT executed — outside this handoff's ceiling)

1. `snapshotRepository.ts`: annotate the callback — `heads.map((h: { id: string; sha: string }) => ({ snapshotContentSha256: h.sha }))`, or type the local `heads` binding. No behaviour change.
2. `o1CommerceRuntime.ts`: narrow the seam's `createIntent` input `currency` from `string` to the same `"KRW"` literal the reviewed input uses, so the seam cannot describe a non-KRW intent. This tightens, not relaxes, the money contract.

Both are type-only and touch no SQL, lifecycle, overlay, candidate or economic semantic — but they are product source edits and require an explicit handoff.

## Not proven

Compile-time build evidence, the production-guard fail-closed claim, the restarted dev runtime and every browser/catalog assertion in steps 6–9 are entirely unproven: the gate stopped before them.
