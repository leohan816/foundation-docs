# Review Tier Policy and Current Classification

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
SOURCE: Leo via foundation-strategy-sol
FULL_REPOSITORY_OR_FULL_SUITE_EXECUTION: PROHIBITED_WITHOUT_SEPARATE_LEO_DIRECTION
DELTA_ONLY_VERIFICATION: REQUIRED
```

## Standing review tiers

```text
SMALL:
- no separate Reviewer;
- focused Worker delta evidence + Advisor validation + applicable human acceptance.

NORMAL:
- independent Reviewer model: Opus 4.8;
- effort: max;
- distinct independent context/session, never the authoring actor/context;
- delta-only review.

HARD_IMPORTANT_SAFETY:
- independent Reviewer model: Fable 5;
- effort: max;
- only for a materially difficult, important, or safety/security/payment/PII/
  authorization/state-integrity-critical exact subject;
- delta-only review unless Leo separately authorizes a full suite.
```

Before every Reviewer dispatch, the Advisor must record `REVIEW_TIER`, the exact subject,
changed paths/contracts, and tier rationale. “Final review” alone is not a
`HARD_IMPORTANT_SAFETY` rationale. The Advisor must not overclassify from habit or generic
caution, and must preserve independent authorship separation.

## Current correction

```text
SUBJECT: second preview success-transition client delta
REVIEW_TIER: SMALL
RATIONALE:
- exact client-only preview transition/reset/navigation/error behavior;
- changed paths limited to app/src/app/preview/page.tsx and its focused contract test;
- API route, cookie/token library, and middleware must remain byte-identical;
- no security, data, identity, payment, or state-integrity contract change is permitted.
INDEPENDENT_REVIEWER: NONE
ACCEPTANCE: focused Worker evidence + Advisor validation + Leo browser checkpoint
```

No reviewer context is created, renamed, repurposed, or dispatched by this classification.
Google and Toss remain blocked pending `PREVIEW_UNLOCK_CONFIRMED`.

