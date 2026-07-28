# ADVISOR HOLD — LOCAL CAPTURE FONT COVERAGE

STATUS: **HOLD — evidence environment only**
MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1

- Candidate and source gate remain PASS at
  `82fb922b64a38d563db91cc87736a229fa5558dc`.
- The first isolated run satisfied every categorical runtime check: desktop and
  mobile HTTP 200, seven cards, seven distinct product links, all seven detail
  GETs 2xx, six tabs, six inline SVGs, visible Cart, operator route unwrapped,
  and zero console/page errors.
- Advisor original-size inspection rejected both PNGs because Korean text
  rendered as missing-glyph boxes. The six SVG icons themselves rendered
  correctly. Host `fc-list :lang=ko` was empty and `fc-match "Noto Sans CJK
  KR"` resolved to DejaVu Sans, proving a capture-host font coverage defect
  rather than a product or icon defect.
- The exact process group was stopped, port 31082 and generated `.next` removed,
  and public port 3000 remained untouched. The failed PNGs/JSON are preserved
  with `HOLD-font-` prefixes.

No product correction or public cutover is admitted from this evidence.

