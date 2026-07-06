// COSMILE MEMORY V3-04 — rec_outcome_event / rec_outcome_feedback 계약 (사전 §1.2·§2.9·§2.4/§2.5·§2.12)
// ★소유 경계(R-K7): V3-04 = checkout 이후 결과(stage≥order)만. 얕은 상호작용은 V3-03(RecommendationEvent).
// ★F2 단일화: adverse enum은 adverse.ts 정본을 import(inline 재선언 금지·split-brain 방지).
import type { AdverseSeverity, AdverseCertainty } from "../lib/adverse";

export const ATTRIBUTION_MODES = ["direct", "session", "organic", "unattributed", "unknown"] as const; // §2.9
export type AttributionMode = (typeof ATTRIBUTION_MODES)[number];

export interface RecOutcomeEvent {
  recommendation_id: string | null;   // ★NULLABLE (R-K1) — 추천 없는 주문 기록 가능
  attribution_mode: AttributionMode;  // organic/unattributed/unknown → recommendation_id=null (R-K2)
  subject_ref: string | null;         // subject_ref XOR anonymous_ref (R-K3·downstream 유지)
  anonymous_ref: string | null;
  order_id: string;
  order_item_id: string;              // ★attribution = order_item 단위 (R-K4/6)
  product_id: string;
  sku_id: string | null;
  refund_qty?: number;                // 부분 환불 = 라인 단위 (R-K4)
  refund_amount_band?: string;        // 금액 밴드(원가 저장 금지)
}

// ★F1 정정: 사전 §2.12 전체 집합과 일치(usage_question_safety 복원·adverse skin/other 분리·unclear).
// 만족/불만: satisfied|dissatisfied|neutral · 안전: adverse_skin_reaction|adverse_other|usage_question_safety("계속 써도 돼?"·safety-first 분리)|usage_question_general · 기타: repurchase_intent|avoid_intent|unclear.
export const SEMANTIC_LABELS = [
  "satisfied", "dissatisfied", "neutral",
  "adverse_skin_reaction", "adverse_other", "usage_question_safety", "usage_question_general",
  "repurchase_intent", "avoid_intent", "unclear",
] as const; // 사전 §2.12 (V3-04 §9.5 소유·값 대조 완료)
export type SemanticLabel = (typeof SEMANTIC_LABELS)[number];

export interface RecOutcomeFeedback {
  feedback_id: string;
  order_item_id: string;
  recommendation_id: string | null;
  semantic_label: SemanticLabel;
  adverse_severity: AdverseSeverity | null;   // §2.4 (adverse.ts 정본 import·F2)
  adverse_certainty: AdverseCertainty | null; // §2.5 (adverse.ts 정본 import·F2)
}
