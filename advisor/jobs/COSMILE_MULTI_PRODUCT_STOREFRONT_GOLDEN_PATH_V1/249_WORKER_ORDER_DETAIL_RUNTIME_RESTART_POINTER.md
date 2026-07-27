# 249 — Order-detail runtime restart pointer

- Handoff: `248_WORKER_ORDER_DETAIL_RUNTIME_RESTART_HANDOFF.md`
- Candidate: `b652a8b2`
- Owned group to replace: `3144037`; port `127.0.0.1:3000`
- Start ceiling: existing wrapper exactly once
- Effects: runtime replacement only; no DB/provider/economic/browser action
- Return: uncommitted `250`/`251`, runtime left available
