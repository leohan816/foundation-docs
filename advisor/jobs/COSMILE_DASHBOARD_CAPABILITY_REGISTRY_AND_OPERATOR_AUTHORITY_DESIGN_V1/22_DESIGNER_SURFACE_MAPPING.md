# COSMILE current-surface disposition map

- Mission: `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`
- Evidence base: product `3dc5129b573237a85f34bfa65a329a299d31fef2`
- Rule: every enumerated current item has exactly one disposition and one timing.
- Route disposition describes the permanent fate of the path slot; screen/card disposition describes the capability. A Main capability on a retiring `/console/*` path moves to Dashboard without redesign.
- `RETIRE_CANDIDATE` never authorizes deletion.

Legend: `MN=MAIN_NOW`, `ML=MAIN_LATER`, `L=LAB`, `RC=RETIRE_CANDIDATE`; `PB=PAID_BETA_BLOCKER`, `CL=CONTROLLED_LIVE_BLOCKER`, `SB=SOON_AFTER_BETA`, `OG=OPTIONAL_GROWTH`, `DP=DEFERRED_PROGRAM`.

## 1. Current routes — 12 direct-source page files

| ID | Current route / source | Current truth | Disposition | Timing | Permanent placement / treatment |
|---|---|---|---|---|---|
| R01 | `/console` · `app/src/app/console/page.tsx` | CURRENT_O1 operational overview in conversational path | ML | DP | retain path for truthful Console first-entry; move its current operational tile content to Dashboard |
| R02 | `/console/orders` · `console/orders/page.tsx` | CURRENT_O1 queue | RC | PB | supersede path after `/dashboard/requests` parity; preserve redirect/evidence only |
| R03 | `/console/orders/[orderId]` · `console/orders/[orderId]/page.tsx` | CURRENT_O1 detail/action host | RC | PB | supersede path after `/dashboard/requests/[orderId]` parity |
| R04 | `/console/fulfillment` · `console/fulfillment/page.tsx` | CURRENT_O1 order/status list | RC | SB | supersede path after `/dashboard/fulfillment` parity |
| R05 | `/console/finance` · `console/finance/page.tsx` | CURRENT_O1 reconciliation counts/action | RC | PB | supersede path after `/dashboard/finance` parity and authority closure |
| R06 | `/console/settings` · `console/settings/page.tsx` | CURRENT_O1 read-only boundary facts | RC | SB | candidate facts move to `/dashboard/settings`; wrong namespace retires |
| R07 | `/console/c/[id]` · `console/c/[id]/page.tsx` | PARTIAL_V0_MOCK conversation workspace | ML | DP | permanent Console workspace; retain mock/non-live label |
| R08 | `/console/jobs` · `console/jobs/page.tsx` | LEGACY/PARTIAL job-state placeholder | ML | DP | Console job record; execute/publish stay disabled |
| R09 | `/console/login` · `console/login/page.tsx` | CURRENT ConsoleUser login, not O1 authority | ML | CL | Console entry; Dashboard authority/entry waits for Control |
| R10 | `/console/commerce` · `console/commerce/page.tsx` | PARTIAL + MOCK + DRY_RUN observation | RC | OG | retire mixed screen; eligible read-only fragments become Lab evidence only |
| R11 | `/console/admin` · `console/admin/page.tsx` | LEGACY write surface plus mixed previews | RC | DP | no permanent competing admin console; retain evidence until separately retired |
| R12 | `/console/traffic` · `console/traffic/page.tsx` | DEFERRED/NOT_COLLECTED empty screen | RC | OG | current route retires; four honest gaps become Lab registry evidence |

Direct-source correction: R01–R12 are 12 distinct `page.tsx` files. The Worker result’s “11 route pages” is not reused as truth.

## 2. Current nine-row nav

Source: `app/src/lib/console/o1ConsoleView.ts:53-71`, rendered by `ConsoleNav.tsx:13-89`.

| ID | Current row | Current behavior | Disposition | Timing | Target treatment |
|---|---|---|---|---|---|
| N01 | 실시간 운영 `/console` | active | RC | PB | replace with global Dashboard entry; `/console` label becomes `대화·검토` |
| N02 | 주문·고객 지원 `/console/orders` | active | RC | PB | Dashboard `요청` |
| N03 | 재고·구매·출고 `/console/fulfillment` | active but screen only shows order/status facts | RC | SB | Dashboard `출고 대기`; “구매” removed from active promise |
| N04 | 카탈로그·상품 운영 | inert, `aria-disabled` | L | DP | Lab candidate row only; no function |
| N05 | 재무·정합성 `/console/finance` | active | RC | PB | Dashboard `재무·정합성` |
| N06 | 분석·전략 | inert, `aria-disabled` | L | DP | Lab candidate row only |
| N07 | 마케팅·리뷰 | inert, `aria-disabled` | L | DP | Lab candidate row only |
| N08 | Agent Control Center | inert, `aria-disabled` | ML | DP | Console placement seam, persistent nonfunctional/deferred badge |
| N09 | 운영 설정 `/console/settings` | active read-only | ML | SB | Dashboard secondary settings after authority contract |

The current mobile nav exposes only N01/N02 (`ConsoleNav.tsx:21-24`). Target mobile navigation must not imply the other current rows are available.

## 3. Current Main-capability screens, cards and actions

| ID | Current screen/card/action | Direct evidence | Disposition | Timing | Target truth/action |
|---|---|---|---|---|---|
| M01 | operational overview heading/description | `console/page.tsx:20-27` | MN | PB | Dashboard overview; Console must not retain this copy |
| M02 | overview active tiles: 실시간 운영, 주문·고객 지원, 재고·구매·출고, 재무·정합성, 운영 설정 | `console/page.tsx:28-49` | MN | PB | split into target Dashboard nav; settings carries SB timing |
| M03 | overview inert tiles: 카탈로그, 분석, 마케팅, Agent Control Center | `console/page.tsx:28-49` | L | DP | Lab registry evidence; Agent Control Center itself is ML, nonfunctional |
| M04 | request queue list | `console/orders/page.tsx:28-47`; `O1ConsoleQueue.tsx:35-55` | MN | PB | category-safe rows; successful empty only is `확인된 0건` |
| M05 | queue row: safe orderNo, kind/status, request time, category badge, detail link | `O1ConsoleQueue.tsx:5-32,41-51` | MN | PB | preserve; href changes to Dashboard; never display internal orderId/PII |
| M06 | queue denied / repository error / empty | `console/orders/page.tsx:20-40` | MN | PB | denied, unavailable and confirmed-zero remain separate |
| M07 | order detail fact card: order/status/payment/inventory/refund/shipment/request projection | `O1OperatorPanel.tsx:213-233` | MN | PB | closed facts only; unknown is HOLD |
| M08 | paid-unshipped full TEST refund + secret/nonce | `O1OperatorPanel.tsx:194-208` | MN | CL | only exact refund mode after canonical authority; otherwise absent |
| M09 | shipped-support acknowledgement | `O1OperatorPanel.tsx:245-255` | MN | CL | non-economic exact support mode only |
| M10 | record-only shipment `preparing/shipped/delivered` + carrier/tracking | `O1OperatorPanel.tsx:172-191,243` | MN | SB | exact existing detail gate only; never courier execution |
| M11 | HOLD / settled surfaces | `O1OperatorPanel.tsx:257-271` | MN | PB | zero controls in HOLD; terminal facts read-only |
| M12 | detail mobile action omission notice / live status | `O1OperatorPanel.tsx:235-278` | MN | PB | retain mobile no-action and polite status behavior |
| M13 | fulfillment list and per-order status/detail link | `O1ConsoleFulfillment.tsx:26-55` | MN | SB | label `출고 대기`; unknown=`검증되지 않음`; no purchasing promise |
| M14 | fulfillment successful empty | `O1ConsoleFulfillment.tsx:36-38` | MN | SB | `확인된 0건`, only after successful list read |
| M15 | finance cards: 한도 초과·확인 필요, 검증 대기, 진행 중인 정합 작업 | `O1ConsoleFinance.tsx:66-109,221-228` | MN | PB | count-only; invalid/null is unavailable |
| M16 | protected recovery: refresh/nonce, step-up input, execute | `O1ConsoleFinance.tsx:234-263` | MN | CL | disabled/hidden pending authority; desktop-only remains explicit |
| M17 | recovery outcome status | `O1ConsoleFinance.tsx:86-103,265-269` | MN | CL | denied/unavailable/invalid/stale/step-up denied/disabled/success |
| M18 | recovery result cards: claimed, captureConverged, refundConverged, nonCaptureSettled, quarantined, rescheduled, exhausted, fencedOut | `O1ConsoleFinance.tsx:72-82,111-120,271-280` | MN | CL | count-only after valid closed response |
| M19 | finance read failure | `console/finance/page.tsx:27-35` | MN | PB | unavailable, never zero |
| M20 | six settings fact cards: execution, identity, payment, protection, shipment, inventory boundaries | `console/settings/page.tsx:10-61` | ML | SB | read-only Dashboard settings; identity copy subject to Control |
| M21 | recent sensitive operator action source, no current list card | `order/repository.ts:229-276`; `serviceRequestRepository.ts:517-624` | MN | CL | Dashboard activity shows unavailable until closed allowlisted projection exists |

## 4. Current Console conversational workspace

| ID | Surface/action | Direct evidence | Disposition | Timing | Treatment |
|---|---|---|---|---|---|
| C01 | conversation ownership/list/message history | `console/c/[id]/page.tsx:8-42` | ML | DP | permanent Console; user-owned conversations only |
| C02 | conversation list/sidebar, message pane, Artifact/Preview pane | `ConsoleWorkspace.tsx:108-226` | ML | DP | retain layout; add persistent mock/non-live truth |
| C03 | empty conversation message | `ConsoleWorkspace.tsx:151-155` | ML | DP | say no real modification/deploy occurred |
| C04 | send request | `ConsoleWorkspace.tsx:34-58,194-210` | ML | DP | creates mock plan/job; label `요청 기록`, not AI execution |
| C05 | file attachment/upload | `ConsoleWorkspace.tsx:66-82,112-130` | ML | DP | Console-only; never Dashboard evidence/authority |
| C06 | artifact cards: 작업 계획, 검증 결과, 페이지 프리뷰, 음성 대본 프리뷰, 변경 미리보기, 승인 요청 | `ConsoleWorkspace.tsx:234-312` | ML | DP | review-only mock artifacts |
| C07 | approve / reject transition | `ConsoleWorkspace.tsx:272-289` | ML | DP | mock job-state transition only |
| C08 | execute / publish | `ConsoleWorkspace.tsx:290-292`; `permission.ts:33-35` | ML | DP | always disabled/nonfunctional in this design |
| C09 | jobs list and status badges | `console/jobs/page.tsx:13-49` | ML | DP | Console record; explicit v0 mock |
| C10 | ConsoleUser login/logout | `console/login/page.tsx`; `api/console/auth/{login,logout}/route.ts` | ML | CL | Console authority only; no O1 grant implication |

## 5. Legacy commerce monitor — every named card/group

All items in this section are `LAB · OPTIONAL_GROWTH` unless stated otherwise. They may appear only as registry evidence, never on minimum Dashboard.

| ID | Current card/group | Direct evidence | Disposition | Timing | Truth treatment |
|---|---|---|---|---|---|
| L01 | env/test/day filters and test/development warning | `console/commerce/page.tsx:10-20,31-42,78-92` | L | OG | evidence filter only; no production validation claim |
| L02 | top cards: 주문 수, mock 매출, 찜, 장바구니 담기, 구매 완료, checkout 시작, 쿠폰 적용, 쿠폰 사용, 알림 신청, 공구 참여, 공구 구매, 진행 중/성공/결제대기/실패·만료 공구, 상담 시작 | `console/commerce/page.tsx:94-112` | L | OG | retain explicit mock/mixed-data badge |
| L03 | 처리 필요 chips: 대기 주문, 검수 대기 콘텐츠, 실패/취소 공구, 비활성/만료 프로모션 | `console/commerce/page.tsx:114-124` | RC | DP | links to legacy writes are not Lab actions |
| L04 | data sufficiency and insight candidates | `console/commerce/page.tsx:126-143` | L | OG | `UNVERIFIED`; no Foundation/final judgment |
| L05 | sales cards: mock 매출, 결제 주문, 평균 주문액, 쿠폰 할인 합계 | `console/commerce/page.tsx:145-151` | L | OG | mock/mixed; never Main |
| L06 | guest merge cards: 장바구니 병합, 찜 병합, 병합된 카트, 병합된 찜, 중복 스킵 | `console/commerce/page.tsx:174-180` | L | OG | observational only |
| L07 | coupon/alert cards: 적용, 사용, 거절, 발급, 가격인하, 재입고, 공동구매, mock 발송 | `console/commerce/page.tsx:184-194` | L | OG | alert send remains mock |
| L08 | product interest-to-purchase tables | `console/commerce/page.tsx:212-246` | L | OG | aggregate evidence candidate |
| L09 | campaign/promotion tables | `console/commerce/page.tsx:247-263` | L | OG | read-only evidence; management links retired |
| L10 | customer behavior/basic funnel | `console/commerce/page.tsx:264-291` | L | OG | aggregate only; no PII |
| L11 | group-buy funnel and monitor | `console/commerce/page.tsx:292-326` | L | OG | deferred commerce program |
| L12 | consultation metadata/product/ingredient mentions | `console/commerce/page.tsx:327-353` | L | OG | no transcript; no suitability claim |
| L13 | Foundation product-demand evidence cards | `console/commerce/page.tsx:354-385` | L | OG | DRY_RUN; no live Foundation write |
| L14 | ingredient/category interest chips | `console/commerce/page.tsx:387-402` | L | OG | reference only; no risk judgment |
| L15 | pricing/conversion candidates | `console/commerce/page.tsx:404-408` | L | DP | deferred, nonfunctional; no price action |
| L16 | recommendation-reason candidates | `console/commerce/page.tsx:410-414` | L | DP | deferred; no customer exposure |
| L17 | dry-run empty-state cards and decision-boundary box | `console/commerce/page.tsx:416-433` | L | OG | preserve required-data gaps and no-auto-action copy |
| L18 | recent commerce event table | `console/commerce/page.tsx:435-459` | L | OG | not a substitute for sensitive operator audit |

## 6. Legacy admin and traffic surfaces

| ID | Current screen/card/action | Direct evidence | Disposition | Timing | Treatment |
|---|---|---|---|---|---|
| A01 | admin order status cards + PATCH transitions | `console/admin/page.tsx:45-51`; `AdminControls.tsx:9-38` | RC | DP | no competing permanent console; not callable from Lab |
| A02 | SKU price cards + PATCH save | `console/admin/page.tsx:54-59`; `AdminControls.tsx:43-59` | RC | DP | pricing deferred/nonfunctional |
| A03 | Offer status cards + PATCH | `console/admin/page.tsx:61-66`; `AdminControls.tsx:63-81` | RC | DP | legacy mutation retained only as evidence |
| A04 | Foundation Bridge evidence/context preview input/buttons | `console/admin/page.tsx:68-70`; `FoundationBridgePreview.tsx:18-61` | L | OG | Lab cites contract/output; no POST/try button |
| A05 | product listing visibility/featured toggles | `console/admin/page.tsx:75-81`; `AdminOpsV2.tsx:64-89` | RC | DP | listing deferred/nonfunctional |
| A06 | group-buy campaign rows | `console/admin/page.tsx:84-94` | L | OG | read-only registry evidence |
| A07 | event/promotion rows | `console/admin/page.tsx:96-106` | L | OG | read-only registry evidence |
| A08 | content-block create/status controls | `console/admin/page.tsx:108-116`; `AdminOpsV2.tsx:13-60` | RC | DP | legacy mutation; no Lab control |
| A09 | recent `admin_*` audit rows/detail and rollback-risk display | `console/admin/page.tsx:118-125`; `AdminOpsV2.tsx:100-127` | RC | DP | not the Main O1 activity projection; rollback remains display-only |
| T01 | Traffic Source/Referrer empty card | `console/traffic/page.tsx:24-29` | L | OG | `NOT_COLLECTED` |
| T02 | Traffic UTM/Campaign empty card | same | L | OG | `NOT_COLLECTED` |
| T03 | Traffic Channel empty card | same | L | OG | `NOT_COLLECTED` |
| T04 | Traffic Ad Campaign/ROI empty card | same | L | OG | `NOT_COLLECTED`; no ROI promise |
| T05 | future field chips/source collection note | `console/traffic/page.tsx:30-37` | L | OG | registry requirement evidence only |

## 7. Current UI-backed read/action endpoints

| ID | Endpoint/action | Current surface | Disposition | Timing | Target rule |
|---|---|---|---|---|---|
| E01 | `POST /api/console/auth/login` | login | ML | CL | Console session only |
| E02 | `POST /api/console/auth/logout` | Console workspace | ML | CL | Console session only |
| E03 | `GET /api/console/conversations` | conversation list | ML | DP | Console only |
| E04 | `POST /api/console/conversations` | new conversation | ML | DP | Console only; current first-entry gap remains |
| E05 | `GET /api/console/conversations/[id]/messages` | message history | ML | DP | Console only |
| E06 | `POST /api/console/conversations/[id]/messages` | request/mock plan/job/artifacts | ML | DP | persistent `V0 MOCK`; no live AI control |
| E07 | `GET /api/console/jobs` | jobs | ML | DP | Console only |
| E08 | job transitions `approval_requested`, `approved`, `rejected` | artifact approval | ML | DP | mock state/audit only |
| E09 | job transitions `executed`, `published` | disabled control | ML | DP | remain blocked; never promoted by this design |
| E10 | `POST /api/console/upload` | attachment | ML | DP | Console conversation only |
| E11 | `POST /api/console/foundation/evidence` | Bridge Preview | L | OG | cited evidence only; Lab has no invocation |
| E12 | `POST /api/console/foundation/context-preview` | Bridge Preview | L | OG | DRY_RUN evidence only; no Lab invocation |
| E13 | `POST /api/console/foundation/claim-check` | legacy content flow | RC | DP | no current Lab action |
| E14 | O1 queue/order-list server reads | requests/fulfillment | MN | PB | Dashboard read after canonical authority |
| E15 | `GET /api/o1/operator/orders/[orderId]` | request detail | MN | PB | closed projection; fresh nonce only when exact sensitive action offered |
| E16 | `POST .../support` | support acknowledgement | MN | CL | exact support mode, non-economic |
| E17 | `POST .../refund` | full TEST refund | MN | CL | exact refund mode, step-up/nonce, no inventory restoration |
| E18 | `POST .../shipment` | record-only shipment | MN | SB | no courier/provider execution claim |
| E19 | `GET /api/o1/operator/reconciliation` | counts/nonce refresh | MN | PB | count-only; invalid/error is unavailable |
| E20 | `POST /api/o1/operator/reconciliation` | bounded protected recovery | MN | CL | authority-pending; exact closed body and result counts |
| E21 | legacy admin order/SKU/offer/content/listing mutations | admin cards | RC | DP | never exposed by Dashboard or Lab |
| E22 | `GET /api/admin/audit/[id]` | admin rollback evidence | RC | DP | not reused as generic O1 activity read |

## 8. Promotion/retirement decisions carried forward

- Main now: M01–M19, M21 and E14–E20 only, subject to their individual timing and authority STOP.
- Main later: settings and the truthful Console workspace/auth skeleton; “later” does not make mock AI live.
- Lab: legacy observational, dry-run, not-collected and future capability evidence only.
- Retire candidates: wrong-namespace O1 paths, mixed commerce screen, legacy admin mutations and their cross-links.
- No item grants implementation, deletion, live authority, production data, schema work or a second permanent console.
