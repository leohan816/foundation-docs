# COSMILE Analytics Pipeline (MVP)

> **정본 · train: COSMILE-ANALYTICS-PIPELINE MVP.** 이 문서 하나가 analytics 리포트 기능의 정본이다.
> 관련 커밋: `77f0941` (최초 MVP) · 후속 확장(view→click warning · cron/n8n 템플릿 · feature index).
> 관련 train: CART-WRITE → cleanup batch(`fix(events)` PII hardening) → **COSMILE-ANALYTICS-PIPELINE MVP**.

## 1. 이 기능이 하는 일
`CommerceEvent`(AX Event Memory)를 **읽기 전용**으로 집계해 Foundation 추천/상품카드/view·click/cart 흐름의
daily report·alert를 만든다. Slack webhook env가 있으면 Slack으로, 없으면 console로만 출력한다.
- **write/migration 0** · 앱/route/checkout/cart 코드 **불변** · secret 하드코딩 **0**.
- 파일: `app/scripts/analytics-report.mjs` (순수 node ESM · `@prisma/client` read-only).

## 2. 실행 명령어
```bash
cd app
npm run analytics:cosmile               # 최근 24h, console (= analytics:report, 동일 스크립트)
npm run analytics:report                # 별칭
npm run analytics:cosmile -- --hours 6  # 최근 6시간
HOURS=48 npm run analytics:cosmile      # env로 기간
npm run analytics:cosmile -- --exclude-test  # isTest 이벤트 제외
```
기본 기간 = **24시간**. 잘못된 `--hours`(0/음수/문자)는 24로 fallback.

## 3. 필요한 env
| env | 용도 | 필수 |
|---|---|---|
| `DATABASE_URL` | CommerceEvent DB(SQLite dev). 스크립트가 `.env.local`/`.env`에서 자동 로드 | 예(자동) |
| `HOURS` | 집계 기간(시간). CLI `--hours`가 우선 | 아니오(기본 24) |
| `COSMILE_SLACK_WEBHOOK_URL` | Slack 전송 webhook (우선) | 아니오 |
| `SLACK_WEBHOOK_URL` | Slack 전송 webhook (대체) | 아니오 |

## 4. Slack webhook 설정법
webhook은 **env로만** 전달한다(코드 하드코딩 금지). 둘 중 하나가 있으면 자동 전송, **둘 다 없으면 skip(네트워크 호출 0)**.
```bash
COSMILE_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ npm run analytics:cosmile
# 또는
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ         npm run analytics:cosmile
```
Slack 메시지: 제목(`Cosmile Analytics Report`) · 기간 · 핵심지표 · funnel · top products · warnings · `generatedAt`.

## 5. 자동 실행 예시 (지금 등록하지 않음 — 참고용 템플릿)
> ★실제 cron/GitHub Actions는 등록하지 않는다. 필요 시 Leo가 아래를 복사해 셋업한다.

**crontab (매일 09:00 KST, Slack 전송):**
```cron
0 9 * * *  cd /home/leo/Project/Cosmile/app && COSMILE_SLACK_WEBHOOK_URL=https://hooks.slack.com/... HOURS=24 npm run analytics:cosmile >> /tmp/cosmile-analytics.log 2>&1
```

**n8n (Execute Command 노드):**
```
command: bash
arguments: -lc "cd /home/leo/Project/Cosmile/app && HOURS=24 COSMILE_SLACK_WEBHOOK_URL={{$env.COSMILE_SLACK_WEBHOOK_URL}} npm run analytics:cosmile"
```
(Schedule Trigger → Execute Command. webhook은 n8n credential/env로만 주입.)

**GitHub Actions (참고 예시만 — 실제 workflow 파일은 추가하지 않음):**
```yaml
# .github/workflows/analytics.yml (예시 — 미등록)
on:
  schedule: [{ cron: "0 0 * * *" }]   # 매일 00:00 UTC
jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: cd app && npm ci && HOURS=24 npm run analytics:cosmile
        env:
          COSMILE_SLACK_WEBHOOK_URL: ${{ secrets.COSMILE_SLACK_WEBHOOK_URL }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```
> ⚠ Actions는 DB 접근이 필요해 dev SQLite로는 부적합(원격 DB 필요). 프로덕션 DB 전환 후에만 실효.

## 6. 주요 지표 설명
- **총 이벤트 수** / **isTest 수**(내부·테스트 행동, 실고객 집계 오염 방지 표식).
- **eventType별 count** — `COMMERCE_EVENT_TYPES`(types/commerceEvent.ts) 기준.
- **foundation_source별 count** — `foundation_http`(실 Foundation) / `mock_fallback`(폴백) / `(none)`.
- **funnel** — recommendation_view · recommendation_click · product_card_view · product_card_click · cart_add.
- **CTR** = product_card_click / product_card_view (view=0이면 N/A).
- **CONV** = cart_add / product_card_click (click=0이면 N/A).
- **top product_id / sku_id by click** — product_card_click 기준.
- **top foundation_trace_id** — properties.foundation_trace_id(non-null) 조인 카운트.
- **mock_fallback 비율** = mock_fallback / (foundation_http + mock_fallback).
- **security health-scan** — 저장 이벤트 propertiesJson에 raw/PII 금지키가 남아있는지(기대 0 = 서버측 sanitize 정상).

## 7. Warning 조건
- 이벤트 총량 0
- `product_card_view > 0` 인데 `product_card_click = 0` (카드 클릭 전환 끊김)
- `product_card_click > 0` 인데 `cart_add = 0` (담기 전환 끊김)
- `mock_fallback` 비율 > 50%
- `foundation_http` 이벤트 0
- 저장 이벤트에 raw/PII 금지키 잔존(= sanitize hardening 점검)
- 계산 불가 항목은 crash 없이 `N/A`.

## 8. 관련 커밋 / train
- train: **COSMILE-ANALYTICS-PIPELINE MVP**
- `77f0941` feat(analytics): add Cosmile event report and Slack alert MVP (최초)
- 후속 확장: view→click warning · analytics:cosmile 별칭 · cron/n8n/Actions 템플릿 · FEATURE_INDEX.
- 정책 의존: `fix(events)` PII hardening(`commerceEventService.sanitizeProperties` + `src/lib/events/piiPolicy.ts`).

## 9. 다음 단계 backlog
- 시계열/추세(전일 대비 delta), 채널·locale·device 분해.
- 프로덕션 DB(Postgres) 전환 시 실 cron/Actions 활성화.
- 세그먼트별(회원/게스트/인플루언서/도매) funnel.
- Slack Block Kit(표/버튼) 리치 포맷, 임계값 env화(mock_fallback 경보선 등).
- isTest 기본 제외 정책 확정(운영 전환 시).
- 이상탐지 자동화(급감/급증 alert), Foundation signal outbox 연계.
