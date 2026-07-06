// COSMILE MEMORY V3-06 — MemoryFactCandidate 생성 규칙 (R-C1 tombstone/must_not_reappear·P3)
// + consent gate (D2) + demotion 예외 (P1·INV-DB-2). ★provider-independent(순수 로직·DB 무접촉).
export interface FactState {
  subject_key: string;
  fact_type: string;
  fact_target: string;
  deleted?: boolean;
  blocked?: boolean;
  expired?: boolean;
  must_not_reappear?: boolean;
  direction?: string;               // positive|negative|safety (사전 §2.1)
  safety_flag?: string | null;      // 사전 §2.13
}

// R-C1: candidate 생성/승격 전 tombstone/must_not_reappear 선행 조회 (M2 규율·P3)
export function canCreateCandidate(
  existing: FactState[],
  key: { subject_key: string; fact_type: string; fact_target: string },
): { ok: boolean; reason?: string } {
  // F3/R-K3: anonymous_ref(anon_v3_)는 memory 계층 subject_key로 직접 유입 금지(stitching §2.10 경유만).
  if (!isMemorySubjectKeyAllowed(key.subject_key)) return { ok: false, reason: "anon_ref_not_in_memory_layer" };
  const match = existing.find(
    (f) => f.subject_key === key.subject_key && f.fact_type === key.fact_type && f.fact_target === key.fact_target,
  );
  if (match?.must_not_reappear) return { ok: false, reason: "must_not_reappear" };
  if (match && (match.deleted || match.blocked || match.expired)) return { ok: false, reason: "tombstone" };
  return { ok: true };
}

// F3/R-K3: memory 계층 subject_key 허용 여부. anon_v3_(commerce 계층 전용)는 memory 직접 유입 금지.
export function isMemorySubjectKeyAllowed(subjectKey: string): boolean {
  return !subjectKey.startsWith("anon_v3_");
}

// D2: consent 전 memory promotion 금지 · anonymous promotion 금지
export function canPromote(ctx: { consentGranted: boolean; isAnonymous: boolean }): { ok: boolean; reason?: string } {
  if (ctx.isAnonymous) return { ok: false, reason: "anonymous_no_promotion" };
  if (!ctx.consentGranted) return { ok: false, reason: "consent_required" };
  return { ok: true };
}

// P1: INV-DB-2 demotion 대상 = direction≠safety AND safety_flag IS NULL 만. safety fact는 예외.
export function demotionEligible(f: FactState): boolean {
  return f.direction !== "safety" && f.safety_flag == null;
}
