// COSMILE MEMORY V3-09 — analytics read-only (margin_band = analytics/reporting only·D3)
// ★ranking/promotion 입력 아님. read-only 집계.
export type MarginBand = "low" | "medium" | "high"; // 사전 §2.14
export function marginBandDistribution(rows: { margin_band: MarginBand }[]): Record<MarginBand, number> {
  const d: Record<MarginBand, number> = { low: 0, medium: 0, high: 0 };
  for (const r of rows) d[r.margin_band] = (d[r.margin_band] ?? 0) + 1;
  return d;
}
