# Advisor Direction — Preview Input/Hydration Correction

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
AUTHORITY_BASIS: committed handoff 38 correction boundary
FROM: foundation-advisor
TO: Cosmile repository-owner Worker
CORRECTION_TYPE: SMALLEST_BOUNDED_RUNTIME_UI_CORRECTION
```

The correction is limited to:

- submit the actual form field value using `FormData` and an explicit input `name`;
- do not disable Continue based on potentially stale React secret state;
- keep the checking/in-flight disabled state;
- clear/reset the field after success;
- add only the smallest focused regression evidence within the existing allowlist.

No popup redesign, storefront redesign, layout change, API semantic change, secret handling
change, schema/migration/dependency change, or unrelated cleanup is authorized. The Worker
must create an additive candidate commit, not push it, run focused verification plus
typecheck/build as necessary, and return the exact delta to the Advisor for independent
review before Google login resumes.

```text
GOOGLE_LOGIN: BLOCKED
TOSS: BLOCKED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
