# RW-01 — Fix shared slideIndex variable across multiple carousels

## Metadata
- **Type:** Component Logic
- **Difficulty score:** 8/9 (Hard)
- **File scope:** 2–10 files (`home.html`, `home.js`, `graphics.js`, `writing.js`, `marketing.js`, `web.js`)
- **Ambiguity:** High
- **Dependencies:** Deep

## Description
`home.html` loads all JS files (`home.js`, `graphics.js`, `writing.js`, `marketing.js`, `web.js`) plus contains inline carousel code. Every file declares `var slideIndex = 1` at the top level — they all share a single global `slideIndex` because `var` in browser JS has global scope when declared outside a function. Advancing any one carousel corrupts the index for all others.

Additionally, the inline `<script>` block inside `home.html` redeclares `showDivs()` and `plusDivs()`, which clobber the versions defined in `js/web.js`, making the web carousel behave unpredictably.

## Constraints
- Must not change existing HTML structure or CSS class names
- Each carousel must remain triggered by its existing class selector (`.myslideshow`, `.gslideshow`, etc.)
- No third-party carousel libraries may be introduced
- Fix must work without a build tool or bundler — plain browser JS only
- The inline `<script>` block in `home.html` must either be removed or scoped — it cannot remain as-is

## What a correct solution looks like
- Advancing carousel A does not change the visible slide of carousel B, C, or any other
- Each carousel maintains its own independent index state
- `showDivs()` and `plusDivs()` are no longer redeclared in global scope across multiple files
- All carousels still function correctly (next, prev, dot navigation) after the fix

## Test coverage
- Behavioral: `tests/behavioral.test.js` — instantiates two carousels, advances one, asserts the other's index is unchanged
- Regression: `tests/regression.test.js` — asserts next/prev/dot navigation still works for each carousel independently

## Prompt (minimum context)
```
There is a bug on home.html where multiple carousels are interfering with each other.
Advancing one carousel causes the others to jump to the wrong slide. Fix it.
```
