# RW-02 — Fix Bootstrap scripts loaded before jQuery

## Metadata
- **Type:** Component Logic
- **Difficulty score:** 8/9 (Hard)
- **File scope:** 10+ files (all HTML pages that load scripts)
- **Ambiguity:** Medium
- **Dependencies:** Deep

## Description
`bootstrap.js` is loaded before `jquery-3.2.1.min.js` across multiple HTML pages. Bootstrap 4 depends on jQuery being available in the global scope at the time Bootstrap initializes — loading it first causes Bootstrap components (modals, dropdowns, tooltips) to silently fail or throw errors.

Additionally, both `bootstrap.js` and `bootstrap.bundle.js` are loaded on the same pages. `bootstrap.bundle.js` already includes Popper.js internally — loading both creates duplicate Popper registrations and can cause conflicts with tooltip/popover positioning.

## Constraints
- Must fix the load order across all affected HTML pages, not just one
- Must remove the redundant script tag (keep `bootstrap.bundle.js`, remove `bootstrap.js`) or vice versa — not both
- Must not change any Bootstrap component markup or CSS class names
- jQuery version must remain `jquery-3.2.1.min.js` — do not upgrade or swap
- Fix must be applied consistently — no page should be left with the old broken order

## What a correct solution looks like
- jQuery is loaded before Bootstrap on every affected HTML page
- Only one Bootstrap JS file is loaded per page (either `bootstrap.js` or `bootstrap.bundle.js`, not both)
- Bootstrap modals and dropdowns initialize correctly on page load without console errors
- No `$ is not defined` or `Bootstrap's JavaScript requires jQuery` errors appear in the console

## Test coverage
- Behavioral: `tests/behavioral.test.js` — asserts correct script load order in each HTML file's DOM, asserts no duplicate Bootstrap script tags
- Regression: `tests/regression.test.js` — asserts that modal trigger elements still exist and Bootstrap modal markup is intact after the fix

## Prompt (minimum context)
```
Bootstrap components like modals and dropdowns are not working correctly across the site.
There may be a script loading issue. Investigate and fix it.
```
