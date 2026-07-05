# RW-04 — Fix footer fixed height clipping content on small screens

## Metadata
- **Type:** UI / Styling
- **Difficulty score:** 6/9 (Medium)
- **File scope:** 2–10 files (footer CSS definition + affected HTML pages)
- **Ambiguity:** Medium
- **Dependencies:** Moderate

## Description
The footer element uses a fixed `height` value in CSS. When the viewport is narrowed (e.g. mid-size screens around 600–900px wide) or when footer content wraps to additional lines, the content overflows the fixed height and gets visually clipped — links, copyright text, or social icons may be hidden or cut off.

The correct fix is to replace `height` with `min-height` so the footer can grow to fit its content, or to remove the fixed height entirely and rely on padding for spacing.

## Constraints
- Must not change the footer's visual appearance on desktop (large screens) — spacing and layout must remain the same
- Must not alter the footer's HTML structure or existing class names
- If the footer has a background color or border, those must be preserved
- The fix should be in CSS only — no JS height calculation
- Must check all CSS files that define footer height (there may be multiple — main stylesheet and responsive stylesheet)

## What a correct solution looks like
- On screens where footer content wraps, all content is visible and not clipped
- On desktop, the footer looks identical to before the fix
- No `height` property with a fixed pixel value remains on the footer element (replaced by `min-height` or removed)
- The footer does not collapse to zero height when empty

## Test coverage
- Behavioral: `tests/behavioral.test.js` — sets a narrow viewport width, renders the footer with multi-line content, and asserts the computed height is greater than or equal to the content's scroll height
- Regression: `tests/regression.test.js` — asserts footer background, padding, and border styles are unchanged after the fix

## Prompt (minimum context)
```
On smaller screen sizes, the footer is clipping its content — some links or text get cut off.
Fix the footer so it always shows all its content regardless of screen size.
```
