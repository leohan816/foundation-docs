// COSMILE MEMORY V3 — identity XOR 규칙 (사전 §1.3)
// subject_ref XOR anonymous_ref: 정확히 하나만 존재해야 한다.
export function assertXor(subjectRef: string | null, anonymousRef: string | null): boolean {
  return (subjectRef != null) !== (anonymousRef != null);
}
