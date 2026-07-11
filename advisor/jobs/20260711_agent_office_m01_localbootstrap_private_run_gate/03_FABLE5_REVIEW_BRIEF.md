# Fable5 Review Brief - LocalBootstrap Private-Run Gate

Use the same existing independent `reviewer-fable5` session at Fable5 Max.

Required separate passes after Worker result and Advisor validation:

1. `DESIGN_REVIEW__AGENT_OFFICE_LOCALBOOTSTRAP_DELTA`
2. `IMPLEMENTATION_SECURITY_REVIEW__AGENT_OFFICE_LOCALBOOTSTRAP`

Both are Level 3, read-only, `/fable-sentinel`, and must produce separate
artifacts and verdicts.

Review the actual diff, full source, tests, generated static assets, canonical
docs, preparation/runbook, commits, pushes, and upstream state. Distrust Worker
and Advisor summaries until reproduced.

Mandatory focus:

- high-entropy, verifier-only, single-use, bounded, expiring proof;
- no credential in Git, logs, stdout/stderr, argv, URL, env, browser storage,
  service worker, state/audit artifacts, screenshots, or result files;
- owner-only/no-follow/regular/bounded proof channel and trusted config;
- group/other writable config rejection;
- loopback-only exact Host/Origin/Fetch Metadata/CSRF/rate/body rules;
- secure session cookie, rotation, expiry, revocation, logout, SSE close;
- trusted startup selection only; no hidden flag/test/provider fallback;
- actual canonical manifest projection and no fixtures;
- real tmux delivery remains inactive/manual fallback;
- desktop/mobile/PWA/recovery testability;
- canonical documentation exactly matches implementation;
- no public/Tailscale/remote/prod/DB/Hermes/browser-terminal scope.

Verdicts: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, `FAIL`.

`PASS_WITH_RISK` returns to Leo/GPT. `NEEDS_PATCH` returns to the same Worker and
same Reviewer loop. Fable5 must not create a credential, run the real private
operation, patch code, or grant final approval.
