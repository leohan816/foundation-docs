-- V3-11B Learning Commerce Memory — ADDITIVE migration (non-prod rehearsal)
-- D-1 신규 model 3종 · D-2 LongTermMemoryFact additive 6 · D-3 secretVersion readiness · raw SQL CHECK/partial-unique(prisma 미지원)
-- ★additive only(기존 컬럼 drop/rename 0). semantic_label = patched 사전 §2.12 10값(구 adverse_reaction/unknown 금지). created_at = timestamptz(문자열 정렬 금지).

-- 1) RecommendationEvent (D-1 신규·commerce 계층·anon 허용·subject_ref XOR anonymous_ref)
CREATE TABLE "RecommendationEvent" (
    "recommendationId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "subjectRef" TEXT,
    "anonymousRef" TEXT,
    "sessionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "skuId" TEXT,
    "reasonCodes" JSONB NOT NULL DEFAULT '[]',
    "secretVersion" SMALLINT NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "RecommendationEvent_pkey" PRIMARY KEY ("recommendationId"),
    CONSTRAINT "RecommendationEvent_eventType_chk" CHECK ("eventType" IN ('recommendation_shown','recommendation_clicked','recommendation_dismissed','recommendation_saved','recommendation_added_to_cart')),
    CONSTRAINT "RecommendationEvent_recId_fmt_chk" CHECK ("recommendationId" ~ '^rec_v3_[0-9A-HJKMNP-TV-Z]{26}$'),
    CONSTRAINT "RecommendationEvent_xor_chk" CHECK (("subjectRef" IS NULL) <> ("anonymousRef" IS NULL))
);
CREATE INDEX "RecommendationEvent_subjectRef_idx" ON "RecommendationEvent"("subjectRef");
CREATE INDEX "RecommendationEvent_anonymousRef_idx" ON "RecommendationEvent"("anonymousRef");

-- 2) RecOutcomeEvent (order_item 단위 attribution·rec_id nullable·R-K2)
CREATE TABLE "RecOutcomeEvent" (
    "id" TEXT NOT NULL,
    "recommendationId" TEXT,
    "attributionMode" TEXT NOT NULL,
    "subjectRef" TEXT,
    "anonymousRef" TEXT,
    "orderId" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "skuId" TEXT,
    "refundQty" INTEGER,
    "refundAmountBand" TEXT,
    "secretVersion" SMALLINT NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "RecOutcomeEvent_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "RecOutcomeEvent_attrMode_chk" CHECK ("attributionMode" IN ('direct','session','organic','unattributed','unknown')),
    CONSTRAINT "RecOutcomeEvent_xor_chk" CHECK (("subjectRef" IS NULL) <> ("anonymousRef" IS NULL)),
    CONSTRAINT "RecOutcomeEvent_rk2_chk" CHECK (NOT ("attributionMode" IN ('organic','unattributed','unknown') AND "recommendationId" IS NOT NULL)),
    CONSTRAINT "RecOutcomeEvent_orderItem_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "RecOutcomeEvent_orderItemId_idx" ON "RecOutcomeEvent"("orderItemId");
CREATE INDEX "RecOutcomeEvent_recommendationId_idx" ON "RecOutcomeEvent"("recommendationId");

-- 3) RecOutcomeFeedback (semantic_label §2.12 10값·adverse 사전 정합)
CREATE TABLE "RecOutcomeFeedback" (
    "feedbackId" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "recommendationId" TEXT,
    "semanticLabel" TEXT NOT NULL,
    "adverseSeverity" TEXT,
    "adverseCertainty" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "RecOutcomeFeedback_pkey" PRIMARY KEY ("feedbackId"),
    CONSTRAINT "RecOutcomeFeedback_semantic_chk" CHECK ("semanticLabel" IN ('satisfied','dissatisfied','neutral','adverse_skin_reaction','adverse_other','usage_question_safety','usage_question_general','repurchase_intent','avoid_intent','unclear')),
    CONSTRAINT "RecOutcomeFeedback_severity_chk" CHECK ("adverseSeverity" IS NULL OR "adverseSeverity" IN ('low','moderate','severe')),
    CONSTRAINT "RecOutcomeFeedback_certainty_chk" CHECK ("adverseCertainty" IS NULL OR "adverseCertainty" IN ('reported','repeated','verified','contradicted')),
    CONSTRAINT "RecOutcomeFeedback_orderItem_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 4) LongTermMemoryFact additive (D-2 6종 + D-3 secretVersion) — INV-DB-2/3 집행 컬럼
ALTER TABLE "LongTermMemoryFact"
    ADD COLUMN "direction" TEXT,
    ADD COLUMN "safetyFlag" TEXT,
    ADD COLUMN "evidenceCount" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN "distinctSignalSourceCount" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN "status" TEXT NOT NULL DEFAULT 'candidate',
    ADD COLUMN "lifecycleState" TEXT NOT NULL DEFAULT 'pending_evidence',
    ADD COLUMN "secretVersion" SMALLINT NOT NULL DEFAULT 1;
ALTER TABLE "LongTermMemoryFact"
    -- P-A(사전 §2.1): direction 정본 5값(behavioral=repurchase/seasonal·context=skin_condition). active/superseded는 factState 값이지 direction 아님.
    ADD CONSTRAINT "LongTermMemoryFact_direction_chk" CHECK ("direction" IS NULL OR "direction" IN ('positive','negative','safety','behavioral','context')),
    ADD CONSTRAINT "LongTermMemoryFact_safetyFlag_chk" CHECK ("safetyFlag" IS NULL OR "safetyFlag" IN ('safety_frozen','safety_caution','safety_block','safety_resolved','pregnancy_nursing_context')),
    ADD CONSTRAINT "LongTermMemoryFact_status_chk" CHECK ("status" IN ('candidate','approved','rejected')),
    -- P-B(사전 §2.2): lifecycle_state 정본 7값(status/factState와 별개 직교 컬럼). active/superseded는 lifecycleState 값 아님.
    ADD CONSTRAINT "LongTermMemoryFact_lifecycle_chk" CHECK ("lifecycleState" IN ('pending_evidence','safety_frozen','human_review_required','demoted','stale','expired','merged'));

-- 5) secretVersion (D-3 readiness): 신규 rec model 3종·LongTermMemoryFact(위)에 포함.
--    ★SubjectRefMap."secretVersion"는 base init에 이미 존재(20260705 subjectrefmap_secret_version) → 재추가 안 함(D-3 pre-satisfied).
--    MemoryFactCandidate secretVersion = 후속(스코프 최소·LIMIT).

-- 6) INV-DB-1 partial-unique (memory 계층 identity·subject_key=COALESCE(subjectRef,guestRef)) — prisma partial 미지원→raw SQL
CREATE UNIQUE INDEX "LongTermMemoryFact_identity_uq" ON "LongTermMemoryFact" (COALESCE("subjectRef","guestRef"), "type", "normValue")
    WHERE "factState"='active' AND "deleted"=false AND "blocked"=false;
