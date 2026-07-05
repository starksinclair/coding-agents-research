# RW-07 — Refactor carousel JS into a reusable factory function

## Metadata
- **Type:** Refactoring
- **Difficulty score:** 8/9 (Hard)
- **File scope:** 2–10 files (`home.js`, `graphics.js`, `writing.js`, `marketing.js`, `web.js`)
- **Ambiguity:** High
- **Dependencies:** Deep

## Description
There are 20+ near-identical slideshow implementations spread across JS files. Each copy-pastes `showDivs` / `plusDivs` / `currentDiv` with only the class names and function name suffixes changed (`showDi4`, `showDi5`, `showD1`, `showDi0`, `showDi11`, etc.).

The goal is to refactor these into a single `createCarousel(slideClass, dotClass)` factory function that returns `{ next, prev, goTo }` — eliminating the duplication while preserving identical external behaviour for every carousel instance.

## Constraints
- All existing carousels must behave identically after the refactor — no visual or functional regressions
- Must not change any HTML markup or CSS class names that the carousels rely on
- The factory must be plain browser JS — no bundler, no ES modules (unless already in use), no third-party libraries
- Individual suffixed function names (`showDi4`, `plusDivs2`, etc.) may be removed — they are internal implementation details — but any globally-called functions referenced from HTML `onclick` attributes must remain accessible or be replaced in the HTML too
- RW-01 (slideIndex scoping) should be considered already fixed — the factory must not reintroduce a shared global index

## What a correct solution looks like
- A single `createCarousel(slideClass, dotClass)` function exists in one place
- All carousel instances across all JS files are initialized by calling this factory
- Each carousel instance is independently operable — advancing one has no effect on another
- The 20+ copy-pasted function variants no longer exist
- All carousels on all pages still auto-advance, respond to next/prev buttons, and respond to dot navigation

## Test coverage
- Behavioral: `tests/behavioral.test.js` — instantiates two carousels via the factory with different class names, asserts each advances independently, asserts `next`, `prev`, and `goTo` work correctly for each instance
- Regression: `tests/regression.test.js` — asserts that all carousel class selectors that existed before the refactor still function; asserts no globally-scoped suffix functions remain (`showDi4`, `showDi5`, etc.)

## Prompt (minimum context)
```
The codebase has carousel/slideshow code copy-pasted 20+ times across multiple JS files,
with only minor differences in class names. Refactor this into a single reusable
createCarousel(slideClass, dotClass) factory function that all carousels use.
```
