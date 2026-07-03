# COSMILE Feature Index

> Cosmile app 기능·운영 스크립트의 빠른 색인. "이 기능 어디 있더라?" 방지용. 새 기능 추가 시 여기 한 줄 남긴다.

## Analytics / 운영
| 기능 | 실행 | 정본 문서 |
|---|---|---|
| **이벤트 리포트 + Slack 알림 (MVP)** | `npm run analytics:cosmile` (별칭 `analytics:report`) · `HOURS`/`--hours`/`--exclude-test` · Slack= `COSMILE_SLACK_WEBHOOK_URL`\|`SLACK_WEBHOOK_URL` | [COSMILE_ANALYTICS_PIPELINE_MVP.md](./COSMILE_ANALYTICS_PIPELINE_MVP.md) |
| 커머스 smoke 회귀 | `npm run smoke:commerce` (dev 서버 필요) | scripts/smoke-commerce.mjs |
| 커머스 시나리오 100 | `npm run scenario:commerce` | scripts/mock-commerce-scenario-100.mjs |
| SKU/Offer seed | `npm run seed:skus` (dev 서버 필요) | scripts/seed-skus.mjs |
| 콘솔 seed | `npm run console:seed` | scripts/console-seed.mjs |
| 공동구매 만료 처리 | `npm run group-deal:expire` | scripts/group-deal-expire.mjs |
| Foundation signal dry-run | `npm run foundation:signal-dry-run` | scripts/foundation-signal-dry-run.mjs |

## 상담 / Foundation
| 정책 | 요약 | 정본 문서 |
|---|---|---|
| **Foundation-only 상담(runtime)** | Cosmile runtime 상담/추천 = Foundation HTTP only. mock/legacy/mock_fallback 0. 실패 시 친절한 연결실패 메시지(mock 대체 ❌). Foundation 서버 필수(`foundation-control`). | [COSMILE_FOUNDATION_ONLY_CONSULTATION.md](./COSMILE_FOUNDATION_ONLY_CONSULTATION.md) |

## 이벤트 트래킹 / 보안
| 기능 | 위치 | 문서 |
|---|---|---|
| CommerceEvent 표준(cev-1.0) | src/types/commerceEvent.ts · src/types/canonicalEvent.ts | docs/COMMERCE_AX_ONTOLOGY.md |
| 이벤트 write choke point + PII sanitize | src/lib/commerceEventService.ts | (fix(events) hardening) |
| PII/raw-text 정책(정본) | src/lib/events/piiPolicy.ts | docs/SECURITY_RULES.md |
| Phase 3 view/click 빌더 | src/lib/events/viewClickEvent.ts | — |
| 이벤트 eval(회귀) | `node scripts/phase3-view-click-eval.mjs` · `event-schema-eval.mjs` · `foundation-decision-event-eval.mjs`* | — |

\* `foundation-decision-event-eval.mjs`는 dev 서버 + `DATABASE_URL` env 필요(자체 .env 로드 안 함).

## 커머스 경계 / 온톨로지
| 주제 | 문서 |
|---|---|
| Foundation/SIASIU/Cosmile 경계 | docs/FOUNDATION_SIASIU_COSMILE_BOUNDARY.md |
| 커머스 AX 온톨로지 | docs/COMMERCE_AX_ONTOLOGY.md · docs/KBEAUTY_AI_COMMERCE_ONTOLOGY.md |
| 보안 규칙 | docs/SECURITY_RULES.md |
