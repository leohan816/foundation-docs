# Round 1 — Security Threat and Abuse

```text
MISSION_ID: FOUNDATION_INTERNAL_CAPABILITY_AND_RUNTIME_BASELINE_COUNCIL_PREFLIGHT_V1
SESSION: foundation-council-security-threat
ROLE: SECURITY_THREAT_AND_ABUSE_CHALLENGER
COMMON_BRIEF_SHA256: 293e26d04f0e5d1b76f9922f0c7c38c10b7c071dfec3a023485d41b5002d975b
REGISTER_SHA256: 8fd0fcb0bd25998731e07c3e32d572fa70af081f58f45e2a3e224f18de47e01c
ROUND: 1_BLIND
OUTPUT: ../14_SECURITY_THREAT_INITIAL.md
```

Apply only your specialist lens. Do not perform penetration testing or claim a security
audit.

In addition to the common questions, answer:

1. What threats arise from isolated builds, indexes, temporary databases, API/runtime
   probes, provider use, logs, and cleanup?
2. How should secrets, network access, synthetic identities, PII absence, process
   isolation, and artifact retention be verified?
3. How should the baseline distinguish security controls in source from deployed or
   runtime-effective controls?
4. What prompt-injection, data-poisoning, tool-authority, retrieval-manipulation, and
   canonical-promotion risks must be surfaced for future AI/learning work?
5. Which conditions require immediate stop rather than an `UNVERIFIED` result?

Use the common report schema with `CATEGORY: SPECIALIST`, output
`14_SECURITY_THREAT_INITIAL.md`, and end `STOP: YES`.

