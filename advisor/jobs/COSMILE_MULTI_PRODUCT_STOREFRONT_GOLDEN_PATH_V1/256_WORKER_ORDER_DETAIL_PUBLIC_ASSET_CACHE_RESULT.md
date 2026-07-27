# WORKER RESULT — PUBLIC PREVIEW ASSET CACHE CORRECTION

Status: **PASS** — focused gate green, two-path delta committed and pushed.

- Handoff `254` at docs `b9468cf`; computed sha256
  `500ef42e6316fc75e5440d4079efcfd06bf5c573c1572e232e2c161d674b46a3` — matched before acting.
- Product base `b652a8b2ea6a8221a764d42190c318ac2a005d0e` → result commit `8d4a3272c6baced193be4f9ed88710c39c90d739`,
  pushed non-force; tree clean, upstream-equal.
- `/fable-builder` discipline: anchor first, mapping table before code, failing test before implementation, smallest
  safe diff, deviations declared, report split into proven / not proven.

## 1. Scope implemented

`254` in full: the development-only browser cache policy for mutable dev client chunks. Nothing deferred, nothing
widened. Your read-only diagnosis was taken as given — I re-verified none of it and touched no runtime.

## 2. Files changed — exactly two, no third path

| Path | Change |
|---|---|
| `app/next.config.ts` | new pure exported `previewAssetCacheHeaders(nodeEnv)`; `nextConfig.headers` delegates to it |
| `app/scripts/o1_nonprod_preview_asset_cache.vitest.ts` (new) | six pure cases pinning the rule, the closed default, the wiring and the untouched dev-origin policy |

**Not changed:** runtime, `.next`, DB, provider/Cloudflare config, order/detail UI, any product source, query,
schema or status copy. No build, typecheck, runtime restart or browser action.

## 3. Contract → code → oracle

| Contract clause (`254`) | Landing | Oracle |
|---|---|---|
| pure exported helper used by `nextConfig.headers` | `previewAssetCacheHeaders` + `headers: async () => previewAssetCacheHeaders(process.env.NODE_ENV)` | hook exists; source pins the delegation; rule string and source pattern each appear exactly once |
| only `development` returns one rule | `if (nodeEnv !== "development") return []` | exact single-rule deep equality |
| exact source `/_next/static/chunks/:path*` | rule `source` | exact equality, plus a scope assertion |
| exact header `Cache-Control: no-store, max-age=0, must-revalidate` | rule `headers[0]` | exact equality, plus `no-store` / `max-age=0` / `must-revalidate` and a **negative** `max-age=[1-9]` check |
| production, test, missing, unknown → `[]` | same default-deny guard | ten values: `production`, `test`, `undefined`, `""`, `"   "`, `Development`, `DEVELOPMENT`, `dev`, `preview`, `staging` |
| `allowedDevOrigins` byte-for-byte | untouched line | value deep-equality **and** the literal source line |

## 4. Deviations

**None.** One self-caught defect before the RED: my first draft contained a vacuous assertion
(`expect(configSource).toBe(configSource)`, always true). It was removed and replaced with the two count assertions
that prove the rule is declared exactly once. No expected value was ever lowered, and no case was skipped.

## 5. Test results

Command, identical for both runs:
`cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_nonprod_preview_asset_cache.vitest.ts`

| Run | Result |
|---|---|
| RED | `4 failed \| 2 passed (6)`, exit `1` — three on the missing helper, one on the missing `headers` hook |
| GREEN | **`1 passed (1)` file, `6 passed (6)`, exit `0`** |

Layer: **pure** — no network, DB, runtime, browser or build contact. db-touch: none required or run.
Regression: no existing case touched; this suite is additive.

## 6. What is proven

- In `development` the config emits exactly one rule, scoped to `/_next/static/chunks/:path*`, carrying exactly
  `no-store, max-age=0, must-revalidate` — and no positive `max-age` can survive that assertion.
- In every other environment the helper contributes **nothing**: production cannot inherit a preview cache policy
  through a blank, look-alike or unknown `NODE_ENV`.
- The rule is declared once, in the helper, and the config hook delegates to it rather than re-typing it.
- The existing dev-origin policy is byte-for-byte unchanged, by value and by source line.

## 7. What is NOT proven

- **Pure config-level only.** No server was started, no request was made, and no response header was observed under
  this handoff — so the *effective* public `Cache-Control` on a real chunk response is **not** demonstrated here.
- The four-hour public lifetime you diagnosed is unverified by me and unchanged by this commit at the edge: whether
  an intermediary (CDN/tunnel) also rewrites or caches that header is outside both this ceiling and this evidence.
- **The running preview still serves the pre-correction configuration** — `next.config.ts` is read at startup and I
  was instructed not to restart the runtime. A restart is required before this takes effect.
- Browsers that already hold a cached chunk from the earlier policy keep it until it expires; nothing here purges an
  already-issued cache entry.

## 8. Questions for review

1. Do you want an authorized runtime restart so the new header policy actually takes effect on the preview?
2. Should the edge/tunnel layer be checked for its own cache policy before this is considered resolved?
3. Is `no-store` on `/_next/static/chunks/:path*` the intended scope, or should other dev asset paths be included?

## 9. Rollback

`git -C <product> revert 8d4a3272c6baced193be4f9ed88710c39c90d739` — a single commit containing exactly the two
paths; reverting restores `b652a8b2`.

RETURN_TO: foundation-advisor
