# Advisor Living Pixel-Office Design Validation

Status: `VALIDATED_FOR_FABLE5_LEVEL3_DESIGN_REVIEW__PROTOTYPE_NOT_STARTED_NOT_AUTHORIZED`

## Decision

`PROCEED_WITH_LIMITS`

The Agent Office Worker design commit
`9611d0da1479ca5e7a9677641fe767a6b39b4a38` is eligible for independent
Fable5 Level-3 design review. This validation is not a review verdict and does
not authorize the prototype, full integration, or product acceptance.

## Direct Git Validation

- Repository: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Base: `48c8dbd9f2c5ecea68c28e85137d75db595ef5f9`
- Candidate: `9611d0da1479ca5e7a9677641fe767a6b39b4a38`
- Candidate equals upstream: yes
- Worktree clean: yes
- Delta: exactly five authorized Markdown files, `+2002/-25`
- Runtime/source/test/config/asset/package/lockfile changes: zero
- Foundation Docs result commit: `81073ae7b8889a1115e197f4c6db5dc87e72c510`
- Foundation Docs pointer commit: `3e5d85dcb108731198c6740ad533292da1e72b5d`

The Worker result and pointer were read directly. Their target commit, scope,
hash, push, and gate claims match the repository evidence.

## Design Coverage Reproduced

The actual candidate documents contain:

1. a lazy React 19 plus `@pixi/react` 8 and PixiJS 8 primary renderer
   candidate, with direct Pixi and DOM-only alternatives explicitly evaluated;
2. one shared pixel-office world with all registered Advisor Teams visible,
   deterministic zones, paths, camera pan/zoom/focus/full return, and mobile Pod
   navigation;
3. original code-native actor and Channy atlas contracts, required animation
   cycles, role/project identity beyond color, asset ownership/license/hash
   evidence, and protected-style rejection;
4. accepted-structured-event-only cue mapping, precedence, deduplication,
   stale/conflict suppression, no delayed replay, no actor cloning, and neutral
   ambient behavior;
5. concise office HUD plus an always-mounted DOM semantic mirror and detail
   drawer, reduced-motion/static/forced-color/200-percent-text behavior, and the
   unchanged M1 fallback;
6. exact startup, ticker, resize, context-loss, StrictMode, teardown, PWA,
   bundle, frame, camera, object, texture, heap, security, rollback, and fixture
   isolation gates;
7. thirteen explicit visual acceptance scenes covering the full office, both
   Teams, handoff, review, lounge, Channy roam/eat/sleep, WAITING_LEO, BLOCKED,
   mobile, and reduced-motion/static behavior; and
8. the exact ignored media contract: one live 20-to-30-second Playwright WebM,
   MP4 and GIF converted from that WebM, five PNGs, absolute paths, bytes,
   SHA-256, source commit, scenario, and reproduction commands.

## Preserved Boundaries

- The existing evidence projection, Single Advisor Team invariant, M1
  authentication, Advisor-only delivery, security, accessibility, and rollback
  semantics remain unchanged.
- The current DOM/SVG/CSS implementation remains the complete semantic/static
  fallback and is not misrepresented as the accepted visual product.
- `AO12-PWU-07..10` may be considered only after a clean Fable5 design `PASS`
  and a new exact Advisor handoff.
- `AO12-PWU-12..13` remains blocked until Leo/GPT explicitly approves the exact
  reviewed prototype at `AO12-PWU-11`.
- No public/remote/production/DB/Hermes/external-asset authority exists.

## Open Execution Prerequisite

`ffmpeg` and `ffprobe` are not currently available on the host PATH. The design
records this truthfully as a fail-closed prototype preflight prerequisite. The
Reviewer must determine whether the proposed tool gate and no-substitution rule
are sufficient at design level. No package installation or alternative media
path is authorized by this validation.

## Reviewer Routing Decision

- Target actor: Fable5 Sentinel
- Selected reviewer: existing `reviewer-fable5` session
- Model/effort: Fable5 / MAX
- Review level: Level 3
- Reason: product-intent, rendering lifecycle, accessibility, security,
  evidence-truth, performance, media provenance, and authority gates are coupled
  and require independent adversarial inspection.
- Not selected: Worker self-review is forbidden; Advisor validation is not an
  independent verdict; another session would violate existing-session policy.
- Verdict: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`
- Return result to: Advisor

## Gate

Only a clean `PASS` may permit Advisor to issue a bounded prototype handoff.
`PASS_WITH_RISK` returns to Leo/GPT. `NEEDS_PATCH` returns through the same
Worker and same Reviewer. `FAIL` stops. Full integration remains blocked in all
cases until Leo/GPT accepts the reviewed prototype direction.
