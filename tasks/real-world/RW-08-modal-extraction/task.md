# RW-08 — Extract duplicated modal markup into a single reusable template

## Metadata
- **Type:** Refactoring
- **Difficulty score:** 9/9 (Hard)
- **File scope:** 10+ files (every HTML page containing modal markup)
- **Ambiguity:** High
- **Dependencies:** Deep

## Description
The login modal (~80 lines), register modal (~40 lines), and forgot-password modal (~20 lines) are copy-pasted into every HTML page across the site. There is no single source of truth — any change to modal markup must be applied manually to every page, and they have likely already drifted out of sync.

The fix is to extract these three modals into a single HTML partial (e.g. `partials/modals.html`) and load it dynamically via JS (`fetch` + `insertAdjacentHTML`) on every page, or alternatively via a build-time include if a simple build step is acceptable.

## Constraints
- The extracted partial must contain all three modals: login, register, and forgot-password
- The loading mechanism must work without a backend server — either `fetch` from a local file (noting CORS restrictions for `file://` protocol) or a JS template string approach that avoids duplication
- Must not change any modal class names, IDs, or input `name` attributes — existing jQuery handlers must continue to work without modification
- After the refactor, no individual HTML page should contain inline modal markup — it must all come from the single partial
- The modals must be injected into the DOM before any jQuery handlers that reference them run — load order matters

## What a correct solution looks like
- A single `partials/modals.html` (or equivalent) is the only place modal markup exists
- Every HTML page loads the modals from this single source
- All three modals (login, register, forgot-password) open and close correctly on all pages
- Existing jQuery handlers for `.forgot`, `.loginbo`, `.forgotpas`, etc. work without any changes
- A grep for the login modal's unique markup (e.g. a distinctive class or input name) returns only one result across the entire codebase

## Test coverage
- Behavioral: `tests/behavioral.test.js` — after page load, asserts login, register, and forgot-password modal elements exist in the DOM; asserts each modal opens and closes correctly via its trigger
- Regression: `tests/regression.test.js` — asserts that modal markup does not appear inline in any HTML page file (structural check); asserts existing jQuery event handlers for modal triggers still fire correctly

## Prompt (minimum context)
```
The login, register, and forgot-password modals are copy-pasted into every HTML page.
Extract them into a single shared partial that gets loaded once and reused across all pages.
```
