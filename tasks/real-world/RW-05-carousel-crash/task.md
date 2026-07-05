# RW-05 — Fix home.js auto-carousel crash when zero .myslideshow elements exist

## Metadata
- **Type:** Component Logic
- **Difficulty score:** 3/9 (Easy)
- **File scope:** 1 file (`home.js`)
- **Ambiguity:** Low
- **Dependencies:** None

## Description
The `carousel()` function in `home.js` runs immediately on script load. It selects all `.myslideshow` elements via `document.getElementsByClassName('myslideshow')` and then accesses `x[slideIndex - 1]`. 

If a page loads `home.js` but has no `.myslideshow` elements in the DOM, `x.length === 0` and `x[slideIndex - 1]` is `undefined`. The subsequent `.style` access throws:

```
TypeError: Cannot read properties of undefined (reading 'style')
```

Furthermore, `setTimeout(carousel, 4000)` at the end of the function causes `carousel()` to re-call itself every 4 seconds regardless of whether slides exist — producing a continuous stream of the same error in the console.

## Constraints
- Fix must be contained to `home.js` only — do not modify any HTML files
- Must not break carousel behaviour on pages that do have `.myslideshow` elements
- The `setTimeout` loop should still run normally when slides are present
- Do not refactor the carousel into a factory or restructure beyond the guard clause — that is a separate task (RW-07)

## What a correct solution looks like
- Loading `home.js` on a page with no `.myslideshow` elements produces zero console errors
- The `carousel()` function returns early (or otherwise halts) when no slides are found
- The `setTimeout` does not keep firing on pages with no slides
- On pages with `.myslideshow` elements, the carousel still auto-advances every 4 seconds as before

## Test coverage
- Behavioral: `tests/behavioral.test.js` — loads `home.js` in a DOM with no `.myslideshow` elements and asserts no TypeError is thrown; asserts `setTimeout` is not called when slides are absent
- Regression: `tests/regression.test.js` — loads `home.js` with `.myslideshow` elements present and asserts the carousel still initializes and advances correctly

## Prompt (minimum context)
```
home.js is throwing a TypeError on pages that don't have a carousel.
The error is: "Cannot read properties of undefined (reading 'style')". Fix it.
```
