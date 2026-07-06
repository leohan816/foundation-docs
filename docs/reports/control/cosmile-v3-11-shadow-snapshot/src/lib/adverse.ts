// COSMILE MEMORY V3-07 — adverse severity (D4) + AdverseSignalActionMatrix effect (§5.3·P2)
// ★safety > commerce. matrix 밖 조합 = fail-closed(상위 severity). effect는 단방향(commerce가 하향 재대입 불가).
export const ADVERSE_SEVERITY = ["low", "moderate", "severe"] as const; // 사전 §2.4 (mild≡low superseded)
export type AdverseSeverity = (typeof ADVERSE_SEVERITY)[number];
export const ADVERSE_CERTAINTY = ["reported", "repeated", "verified", "contradicted"] as const; // §2.5
export type AdverseCertainty = (typeof ADVERSE_CERTAINTY)[number];

// D4 raw signal → base severity (사전 §2.4·Leo 확정 2026-07-06)
export const SIGNAL_SEVERITY: Record<string, AdverseSeverity> = {
  irritation: "low", stinging: "low",                 // 단독 자극/따가움 = low (반복→certainty로 escalate)
  discontinuation: "moderate", worsening: "moderate", // 사용 중단/악화 = moderate
  swelling: "severe", rash: "severe",                 // 강한 붓기/발진 = severe
  medical_reference: "severe", allergy_reference: "severe", // 의료/알러지 = severe
};
export function severityOf(signal: string): AdverseSeverity {
  const s = SIGNAL_SEVERITY[signal];
  return s ?? "severe"; // ★unknown signal = fail-closed severe
}

// §5.3 matrix (severity × certainty) → deterministic effect
export function matrixEffect(severity: AdverseSeverity, certainty: AdverseCertainty): string {
  if (certainty === "verified") return "active_safety_fact";
  if (certainty === "contradicted") return "safety_resolution_path"; // 자동 해제 아님
  if (severity === "low" && certainty === "repeated") return "safety_caution"; // escalate → moderate-equiv
  if (severity === "severe") return "immediate_safety_block";
  if (severity === "moderate") return "safety_caution";
  if (severity === "low") return "caution_memory_candidate"; // low × reported (전 affinity 동결 아님)
  return "immediate_safety_block"; // fail-closed
}
