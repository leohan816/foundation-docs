# 81 Advisor ESLint Path Clarification

## Decision

`PROCEED_WITH_LIMITS`

The Worker correctly stopped because the approved JavaScript compatibility
bridge cannot enter the repository's current typed-ESLint graph and
`eslint.config.mjs` was not in the exact mutation allowlist. Direct inspection
confirms this is a repository tooling-path omission, not a new product,
security, dependency, compiler, or runtime-design decision.

The same implementation pass may resume with one additional repository path:

```text
eslint.config.mjs
```

## Exact Authorized Configuration Change

Add one path-specific configuration block using the repository's existing
`tseslint.configs.disableTypeChecked` pattern for exactly:

```text
src/ui/pixel/pixi-public-export-bridge.js
```

The block must disable only type-information-dependent ESLint rules that cannot
run for this intentionally untyped JavaScript runtime boundary. The global
JavaScript recommended rules, complete `npm run lint`, strict TypeScript
compiler configuration, adjacent bounded `.d.ts` contract, focused bridge
contract test, Vite/browser runtime checks, and full regression train remain
mandatory.

## Invariants

- No source-file ESLint suppression comment.
- No lint-script exclusion or filtered lint command.
- No change to TypeScript `6.0.3`, `skipLibCheck: false`, strictness, package
  versions, dependency graph, tsconfig, or compiler behavior.
- No broader `src/**/*.js` override.
- No deep package import, vendor type declaration, broad/global declaration,
  `@ts-expect-error`, or `@ts-ignore`.
- No product behavior, authority, authentication, delivery, transport,
  persistence, network, or exposure change.
- Fable5 must independently review the configuration delta and the complete
  implementation after the Worker candidate is committed and pushed.

## Evidence

- Worker reproduced the first failing typed rule as
  `@typescript-eslint/await-thenable` and the next as
  `@typescript-eslint/no-array-delete`, proving a parser-service/configuration
  mismatch rather than a source lint finding.
- The repository already uses `tseslint.configs.disableTypeChecked` for
  intentionally untyped JavaScript and MJS paths.
- The Worker restored all attempted implementation bytes and the prepared
  prototype to the validated entry state before returning the blocker.

## Authority Boundary

This clarification is a bounded technical implementation correction inside the
already approved prototype-only compatibility bridge. It does not approve the
prototype visually, authorize authenticated/full integration, accept risk, or
grant final product approval.
