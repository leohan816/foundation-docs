// COSMILE MEMORY V3-04 — rec_outcome_event / rec_outcome_feedback 계약 (사전 §1.2·§2.9·§2.4/§2.5)
// ★소유 경계(R-K7): V3-04 = checkout 이후 결과(stage≥order)만. 얕은 상호작용은 V3-03(RecommendationEvent).

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

export const SEMANTIC_LABELS = [
  "satisfied", "dissatisfied", "adverse_reaction", "repurchase_intent", "neutral", "unknown",
] as const; // 사전 §2.12 (V3-04 §9.5 소유)
export type SemanticLabel = (typeof SEMANTIC_LABELS)[number];

export interface RecOutcomeFeedback {
  feedback_id: string;
  order_item_id: string;
  recommendation_id: string | null;
  semantic_label: SemanticLabel;
  adverse_severity: "low" | "moderate" | "severe" | null; // §2.4
  adverse_certainty: "reported" | "repeated" | "verified" | "contradicted" | null; // §2.5
}
