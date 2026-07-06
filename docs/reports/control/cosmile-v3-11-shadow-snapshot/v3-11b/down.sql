-- V3-11B rollback (rehearsal only·additive 역순)
DROP INDEX IF EXISTS "LongTermMemoryFact_identity_uq";
-- ★SubjectRefMap."secretVersion"는 base 소유(내 migration이 만들지 않음) → rollback에서 건드리지 않음.
ALTER TABLE "LongTermMemoryFact"
    DROP CONSTRAINT IF EXISTS "LongTermMemoryFact_direction_chk",
    DROP CONSTRAINT IF EXISTS "LongTermMemoryFact_safetyFlag_chk",
    DROP CONSTRAINT IF EXISTS "LongTermMemoryFact_status_chk",
    DROP CONSTRAINT IF EXISTS "LongTermMemoryFact_lifecycle_chk";
ALTER TABLE "LongTermMemoryFact"
    DROP COLUMN IF EXISTS "direction", DROP COLUMN IF EXISTS "safetyFlag",
    DROP COLUMN IF EXISTS "evidenceCount", DROP COLUMN IF EXISTS "distinctSignalSourceCount",
    DROP COLUMN IF EXISTS "status", DROP COLUMN IF EXISTS "lifecycleState", DROP COLUMN IF EXISTS "secretVersion";
DROP TABLE IF EXISTS "RecOutcomeFeedback";
DROP TABLE IF EXISTS "RecOutcomeEvent";
DROP TABLE IF EXISTS "RecommendationEvent";
