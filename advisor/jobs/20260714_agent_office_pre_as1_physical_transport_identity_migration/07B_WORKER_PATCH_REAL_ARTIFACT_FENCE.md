# Worker Patch Real-Artifact Fence

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

Apply this in the current patch run before completion.

The real committed `01A_ACTIVE_REFERENCE_SCOPE_CLARIFICATION.md` wraps stable
clauses across Markdown line breaks. A direct `text.includes()` check with one
space would reject the valid canonical artifact even though a synthetic fixture
passes.

Required correction:

1. Normalize only Unicode whitespace for migration-decision semantic checks
   (for example, collapse whitespace runs to one ASCII space). Do not normalize
   or weaken destination tokens, punctuation, path identity, Git hash, or exact
   SourceArtifactRef checks.

2. Add a test using the actual committed 01A artifact bytes or an exact fixture
   preserving its real line wrapping. It must pass.

3. Keep negatives proving opposite/partial wording, wrong path, dirty/tampered
   hash, and missing clauses fail closed.

No new files outside the existing allowlist and mission result are authorized.
