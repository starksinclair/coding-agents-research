# RW-03 — Fix broken "Forgot Password?" onclick handler using wrong element ID

## Metadata
- **Type:** Component Logic
- **Difficulty score:** 6/9 (Medium)
- **File scope:** 10+ files (all pages containing the login modal)
- **Ambiguity:** Low
- **Dependencies:** Moderate

## Description
The "Forgot Password?" link uses an inline `onclick` handler:

```html
onclick="document.getElementById('id0l4').style.display='block'"
```

The ID `id0l4` is `id0` + lowercase letter `l` + `4` — but no element with this ID exists anywhere in the codebase. The actual forgot-password modal uses the class `.forgotpas` and is shown/hidden via jQuery (`.show()` / `.hide()` or direct style manipulation).

The inline `onclick` is dead code. When clicked, `getElementById('id0l4')` returns `null` and the subsequent `.style.display` call throws `TypeError: Cannot set properties of null`. The forgot-password modal never opens.

## Constraints
- The fix must use the existing `.forgotpas` jQuery pattern — do not introduce a new modal ID or restructure the modal markup
- Must not break the existing jQuery `.forgot` click handler that may also reference the modal
- The fix must be applied to all pages that contain the broken `onclick` — not just the first one found
- Do not remove the forgot-password modal markup itself

## What a correct solution looks like
- Clicking "Forgot Password?" opens the `.forgotpas` modal without a console error
- No `TypeError: Cannot set properties of null` is thrown on click
- The existing jQuery handler (if present) is not duplicated or broken
- The fix is consistent across all pages containing the login modal

## Test coverage
- Behavioral: `tests/behavioral.test.js` — simulates a click on the forgot password trigger and asserts `.forgotpas` becomes visible; asserts no null reference error is thrown
- Regression: `tests/regression.test.js` — asserts the login modal and register modal still open correctly and are unaffected by the fix

## Prompt (minimum context)
```
The "Forgot Password?" link in the login modal does nothing when clicked.
It should open the forgot password section. Fix it.
```
