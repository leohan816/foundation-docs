# Advisor Handoff — Bounded Preview-Unlock Diagnosis

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_PHASE: PREVIEW_UNLOCK_BOUNDED_DIAGNOSIS
FROM: foundation-advisor
TO: Cosmile repository-owner Worker
RETURN_TO: foundation-advisor
GOOGLE_LOGIN_AUTHORIZED: NO
TOSS_AUTHORIZED: NO
```

## Exact pins

```text
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
REQUIRED_HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab
REQUIRED_UPSTREAM: ahead 0 / behind 0
REQUIRED_STATE: clean

FOUNDATION_DOCS_BRANCH: advisor/cosmile-o1-browser-nonprod-runtime-v1-20260718
PRIOR_CHECKPOINT_COMMIT: 2e6944e621fedba1d217b730ade2237a0eba666d
```

Read this handoff and `37_LEO_PREVIEW_UNLOCK_FAILURE.md` from this handoff's exact committed
snapshot. Re-read the current Worker authority and Cosmile rules; use the same Opus 4.8
(1M) family, Leo-configured max effort, exact worktree, role, and `/fable-builder`. Verify
the live binding, clean pin, and existing mission runtime before acting.

## Required diagnosis

Use the installed local Playwright/Chromium and the current restricted HTTPS runtime. Do not
install dependencies, pull an image, or use a real identity. Diagnose using synthetic or
non-secret placeholder input first, then the exact protected secret only through no-echo
environment injection when required to prove success.

Verify and record only booleans, categories, statuses, and non-sensitive UI text:

1. `/preview` loads and its client JavaScript hydrates.
2. The password input accepts characters without trimming, transformation, or unintended
   formatting; never record its value, length, hash, screenshot contents, or request body.
3. The submit button is disabled when the input is empty and enabled when non-empty.
4. Mouse click and Enter-key submission behavior.
5. A known-wrong placeholder produces the expected `401` and visible denied state.
6. The exact protected secret, injected without printing/logging/tracing, produces `200`, an
   httpOnly cookie, and navigation to the eligible catalog.
7. Browser console/page errors, failed client assets, CSP/CORS/mixed-content issues, and
   network status categories. Never capture request bodies, cookies, headers, tokens, or the
   secret.
8. Current runtime/container/tunnel health and exact hostname stability.
9. Whether Leo's symptom is reproducible in clean Chromium context and the smallest likely
   browser-side instruction if it is not reproducible.

Do not create Playwright trace/video/HAR. A screenshot is allowed only if it contains no
entered value, identifier, cookie, token, provider content, or PII; prefer DOM booleans and
status evidence instead.

## Correction boundary

Start read-only. If and only if a product defect is directly reproduced, the same Worker may
make the smallest correction limited to these already-authorized paths:

- `app/src/app/preview/page.tsx`
- `app/src/app/api/preview/access/route.ts`
- `app/src/lib/auth/o1PreviewAccess.ts`
- `app/src/middleware.ts`
- `app/scripts/o1_browser_runtime_contract.vitest.ts`
- `app/scripts/o1_browser_runtime_property.vitest.ts`

No other product path, schema, migration, dependency, configuration, redesign, or behavior
is authorized. Any correction must be an additive candidate commit, not pushed, with exact
focused tests, typecheck/build as applicable, and a declared delta for independent review
before Google login resumes.

If the implementation is correct and the symptom is browser-state or interaction-specific,
do not patch. Return the smallest exact safe user instruction, including browser refresh/
clean-context guidance only when evidence supports it.

## Result paths

```text
TEMP_RESULT: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/33_PREVIEW_UNLOCK_DIAGNOSIS_RESULT.md
TEMP_POINTER: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/cosmile/33_PREVIEW_UNLOCK_DIAGNOSIS_POINTER.md
```

Return only to the Advisor and stop. Keep Google login blocked until the Advisor validates
the result and any required review gate passes.

```text
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
