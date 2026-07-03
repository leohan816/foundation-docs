# Foundation LMR — v1.0 Final Fix List (2026-06-28)

> **[v1.0 UPDATE] must_fix(MF1·MF2·MF3) + MF0 모두 해결 → LMR v1.0 baseline PASS.** needs_human/blocked는 실 이전 단계 항목으로 v1.0 baseline 범위 밖(여전히 닫힘·human approval 필요).
>
> **해결됨**: MF0 문서정합·MF1 runtime adapter contract·MF2 Vault schema adapter·MF3 실 namespace import. **여전히 닫힘(별도 승인)**: NH1 이전 시점/범위·NH2 실승급 정책·BX1 Foundation 인프라·BX2 Vault write 거버넌스.

## must_fix_before_v1 (v1.0 확정 전 반드시)
| # | 항목 | 이유 |
|---|---|---|
| MF1 | retrieval/runtime 어댑터 인터페이스 정의(answer.py·evidence_mode·retrieval_evidence 결합 분리) | 순수 로직은 boundary clean이나 실 retrieval은 SIASIU 결합 — Foundation 측 인터페이스 없으면 이전 불가 |
| MF2 | 실 Vault 스키마 정합 어댑터(frontmatter 메타 부재 파일 → tier unknown 다수) | 실 정본 다수가 메타 부재 → 현재는 보수적 unknown. 실 운영 전 메타 보강/추론 규칙 필요 |
| MF3 | Foundation 실 namespace 빌드 후 import 검증(현재 simulate_import만) | simulate는 SIASIU 경로 import — 실 `foundation.lmr.*` 패키지 빌드 후 재검증 필요 |

## should_fix_before_migration (이전 전 권장)
| # | 항목 |
|---|---|
| SF1 | conflict 의미론 강화(키워드 polarity → 임베딩/규칙 하이브리드) — recall 한계 보완 |
| SF2 | 실 운영 데이터 분포로 tier→constraint·conflict precision/recall 재캘리브레이션 |
| SF3 | API 인증/scope 매트릭스를 실 actor 정책과 정합(현재 4 actor 고정) |
| SF4 | 대량 실 Vault read 성능 실측(현재 synthetic·샘플) |

## can_defer_after_v1 (v1.0 후 가능)
| # | 항목 |
|---|---|
| CD1 | API 레이트리밋·동시성·캐시 정책 |
| CD2 | M6 trace 시각화/대시보드 |
| CD3 | failure taxonomy 자동 분류 고도화 |

## needs_human_decision (사람 결정 필요)
| # | 항목 |
|---|---|
| NH1 | 실제 Foundation 이전 시점·범위(언제·무엇을 옮길지) |
| NH2 | learned/canonical 실승격 정책 개방 여부(현재 dry-run only) — 개방 시 승인 주체/절차 |

## blocked_by_external_dependency
| # | 항목 |
|---|---|
| BX1 | Foundation 측 패키지/배포 인프라(SIASIU 외부) |
| BX2 | 실 Vault canonical write 권한/거버넌스(현재 read-only만 허용) |

## 결론
- **자동 처리 가능(코드)**: SF1·SF2 일부는 SIASIU 내에서 추가 루프로 가능.
- **이전 전 필수(사람+인프라)**: MF1~MF3·NH1·NH2·BX1·BX2.
- **v1.0 확정 = must_fix 3 + needs_human 2 해소 후** human approval. 지금은 STOP.
