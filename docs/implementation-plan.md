# Portal implementation plan

Goal: deliver the approved personal React portal locally.
Architecture: source-backed static data, pure schedule helpers, small presentation components, persisted preferences.
Tech: React, Vite, CSS; node:test for domain logic.
Spec: docs/design.md

## Review focus
Wrong week variants; Kyiv time independent of device timezone; finished/weekend classes; corrupt/blocked storage; unavailable images and missing meeting links.

## Tasks
- [x] Verify five staff emails, portraits, admin contact and schedule against official HTML. Store provenance in src/data.js and docs/sources.md.
- [x] Write failing tests for getLessons(cycle, language), getTodayStatus(now, cycle, language), and safe preference reading. Implement src/schedule.js and src/preferences.js. Run npm test.
- [x] Build src/App.jsx, components for schedule and contacts, and responsive src/styles.css. Expose Zoom, VNS, email, copy, source links and day filters.
- [x] Build; inspect in a browser at desktop/mobile sizes, exercise cycle/language/day controls and persistence, verify all portraits and no console errors. Run final review and fix material issues.

The user explicitly requested implementation after approving the proposed structure. Work continues in the empty supplied workspace; no checkout isolation is necessary.

## Verification
- npm test: 5/5 passed; npm run build passed.
- Browser: week variants, language filtering, refresh persistence, Friday-only filter, admin email copy success.
- Five teacher portraits visibly loaded. No browser error logs.
- Desktop 1280px and mobile 390px inspected; document width equals mobile viewport (390px).
- Independent read-only reviewer found low supporting-text contrast. Darkened text and icons; no further functional findings.
