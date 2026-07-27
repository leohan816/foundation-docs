# WORKER RESULT — ORDER-DETAIL CANDIDATE RUNTIME RESTART

Status: **PASS** — one owned replacement, candidate serving, public dashboard categorically reachable.

- Handoff `248` at docs `0bc8796`; computed sha256
  `7d26b725ba185536ca8d46c170fafd3badc08d09204f6a043644974e6e78deb2` — matched before acting.
- Product candidate `b652a8b2ea6a8221a764d42190c318ac2a005d0e`, clean and upstream-equal before and after.
- No product or docs edit, test, build, typecheck, DB, browser, provider, refund, checkout or Golden Reversal.
  These two files are written **uncommitted**, per the handoff.

## 1. Preflight (read-only, all pins matched)

| Check | Result |
|---|---|
| Product HEAD / clean / upstream-equal | exact pin · 0 changed paths · equal |
| Runtime root and `start-candidate.sh` | `leo:leo` · `0700` |
| `candidate.pid` / `candidate-dev.log` | `leo:leo` · `0600` |
| Recorded pid vs pinned group | recorded value equalled the pinned group leader |
| Owned group membership | leader + dev server + one worker, all `leo` |
| Listener child on `127.0.0.1:3000` | present, matching the pinned child |
| Listener process CWD | the exact mission `app` |
| Toss mode | exactly `test` |
| One-shot | exactly `0` (OFF) |
| Local substitute | **absent** (0 occurrences) |
| My own shell process group | different from the owned group — self-signalling impossible |

No environment value was printed, persisted, hashed, placed in argv or copied; only name presence and exact-match
booleans were read.

## 2. Stop (single TERM, owned group only)

- One `TERM` to the pinned process group alone. No tmux, Claude, Reviewer, DB or other service was signalled.
- Waited on authoritative conditions: port `3000` closed **and** the group absent.
- All three former members confirmed gone from `/proc` — no survivor, no zombie.

## 3. Start (exactly once)

- The existing owner-only `start-candidate.sh` executed **once**, detached, on port `3000`, only after the old group
  and port were absent.
- New init-parented session/process group, distinct from every agent shell.
- Only the two existing owner-safe artifacts were used: `candidate.pid` and `candidate-dev.log`.
- `candidate.pid` records the true new group leader — the launcher's immediate child exits into the wrapper's own
  session, so the leader is resolved from the live listener rather than from the launcher's pid.
- No second start was issued.

## 4. Post-start verification (booleans / categories only)

| Check | Result |
|---|---|
| TCP readiness on `127.0.0.1:3000` | reached within the wait bound |
| New group shape | leader + dev server, both `leo` |
| Listener CWD | the exact mission `app` |
| Served product HEAD | `b652a8b2…` — the pinned candidate |
| Toss mode | exactly `test` |
| One-shot | exactly `0` (OFF) |
| Local substitute | **absent** |
| `COSMILE_O1_RUNTIME_ENABLED` | exactly `true` |
| Public `https://cosmile.leohan.net/dashboard` | **`2xx`** |

The public check was a single GET with the body discarded and redirect following **disabled**, so no onward hop could
occur. No authentication, browser, credential, provider call, mutation or economic action of any kind.

## 5. Final state

- The healthy candidate runtime is **left running** on `127.0.0.1:3000`, serving `b652a8b2…`.
- Product clean and upstream-equal. Schema 0, DB writes 0, product delta 0, docs delta 0 (beyond these two
  uncommitted files).

## Not proven

- Categorical reachability only: no response body, DOM, rendered value or screenshot was inspected, so the public
  dashboard is proven to **serve**, not to display any particular content or the new order-detail presentation.
- No authenticated operator view was exercised; whichever surface an unauthenticated request reaches is what returned
  `2xx`. The order-detail changes themselves remain proven only by the pure focused suite in `242`.
- No build, typecheck, test, DB or provider verification ran under this handoff.

RETURN_TO: foundation-advisor
