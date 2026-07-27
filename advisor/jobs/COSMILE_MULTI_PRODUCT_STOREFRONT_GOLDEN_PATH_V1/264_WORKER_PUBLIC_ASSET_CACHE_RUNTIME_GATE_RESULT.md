# WORKER RESULT — PUBLIC ASSET CACHE RUNTIME GATE

Status: **PASS** — one owned replacement; local and public chunk byte-identical; **both** header sets now
`no-store, max-age=0, must-revalidate`. `PUBLIC_HEADER_OVERRIDE_PERSISTS` does **not** apply.

- Handoff `262` at docs `fe5699a`; computed sha256
  `1b32878b8d5772f16c0d7ff6c390ed46e9be0e2c6f06348e62ef760dc486ab25` — matched before acting.
- Candidate `8d4a3272c6baced193be4f9ed88710c39c90d739`, clean and upstream-equal before and after.
- No product or docs edit, build, typecheck, `.next` cleanup, DB, provider, refund, shipment, checkout, economic
  action, browser or authentication. These two files are written **uncommitted**.

## 1. Preflight (read-only, names/booleans only)

| Check | Result |
|---|---|
| Product HEAD / clean / upstream-equal | exact pin · 0 changed paths · equal |
| Runtime root, wrapper | `leo:leo` · `0700` |
| `candidate.pid`, `candidate-dev.log` | `leo:leo` · `0600` |
| Recorded pid vs pinned group | equal to the pinned leader `3216106` |
| Owned group membership | leader + dev server + one worker, all `leo` |
| Listener CWD | the exact mission `app` |
| Toss mode / one-shot / local substitute | exactly `test` · exactly `0` (OFF) · **absent** |
| My shell process group | different from the owned group |

One benign observation: the dev server's worker child had respawned since `250` (a different child pid under the
**same** pinned leader). The pinned leader, port and CWD were unchanged, so the group remained the pinned one.

No environment value was printed, persisted, hashed, placed in argv or copied.

## 2. Stop and single start

- One `TERM` to group `3216106` alone; waited for port `3000` closed **and** the group absent; all three former
  members confirmed gone from `/proc`. Nothing else was signalled.
- The existing owner-only wrapper executed **exactly once**, detached, into a new init-parented group, using only
  `candidate.pid` and `candidate-dev.log`. No second start.
- Post-start: TCP ready; CWD the exact mission `app`; served HEAD `8d4a3272…`; Toss mode `test`; one-shot `0`;
  local substitute **absent**; runtime enabled `true`; **`NODE_ENV` exactly `development`**, which is the condition
  the new header rule requires.

## 3. Chunk identification (step 5)

- The public detail route's HTML referenced 19 distinct client chunks. Exactly **one** carries all three markers:
  `/_next/static/chunks/src_0480wn2._.js` — `op-created-at` ×1, `저장된 상품 이미지 없음` ×1, `선택 옵션 정보 없음` ×1.
- The same chunk also carries `KST (UTC+9)` ×1.
- Chunk bodies were fetched and searched **in-process** only; nothing was written to disk. Discovery used one
  unauthenticated GET of the detail route to read its script manifest — no credentials, cookies, browser profile or
  mutation of any kind.

## 4. Byte identity and staleness (step 6)

| Check | Result |
|---|---|
| Public chunk SHA-256 | `061ed1fa6b2609ab049a2a8cb6fd8424cc5e1ffcbb578b47ef8d6643f71def5e` |
| Local chunk SHA-256 | identical to the above |
| Byte identity | **identical** |
| Old flat-table markers (`주문 라인</h2>`, `<thead`, `단가</th>`, `>상품<`) | **0 occurrences each** |

The SHA equals the one recorded in your `254` diagnosis, which confirms the bundle content was never the defect —
only the browser cache policy was.

## 5. Header verification (step 7)

| Surface | `Cache-Control` |
|---|---|
| Local `http://127.0.0.1:3000` | `no-store, max-age=0, must-revalidate` |
| Public `https://cosmile.leohan.net` | `no-store, max-age=0, must-revalidate` |

Category-equivalent and exact on both. The previous positive multi-hour lifetime is gone; no intermediary rewrote
it back. Header checks were bodyless (`HEAD`).

## 6. Reachability and final state (step 8)

- Public `/dashboard` → **`2xx`** (single GET, body discarded, redirects not followed, unauthenticated).
- The healthy candidate runtime is **left running** on `127.0.0.1:3000`, serving `8d4a3272…`.
- Product clean and upstream-equal. Schema 0, DB writes 0, product delta 0.

## Not proven

- Header and byte-level evidence only: no response body, DOM, rendered value or screenshot of the operator surface
  was inspected, so the order-detail presentation is proven to be **present in the served chunk**, not proven to
  render correctly for an operator.
- No authenticated operator view was exercised; the detail route was fetched unauthenticated purely to read its
  script manifest.
- Browser copies cached under the earlier positive-lifetime policy are not purged by this change; a client that
  still holds one keeps it until it expires or is revalidated.
- Only the one marker-bearing chunk was header-verified; the other 18 chunks were not individually checked.
- No build, typecheck, test, DB or provider verification ran under this handoff.

RETURN_TO: foundation-advisor
