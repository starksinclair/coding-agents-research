# RW-06 — Add client-side form validation to login/register modals

## Metadata
- **Type:** New Feature
- **Difficulty score:** 6/9 (Medium)
- **File scope:** 2–10 files (login/register modal HTML + associated JS files)
- **Ambiguity:** Medium
- **Dependencies:** Moderate

## Description
The login form has `action="home.html"` — on submit it simply navigates to `home.html` with no validation. The register form similarly has no client-side validation before submission.

There is no validation for:
1. Email format (must match a valid email pattern)
2. Non-empty password (must not be blank)
3. Inline error messages (user gets no feedback about what went wrong)
4. Submission prevention (invalid forms still navigate on submit)

For the register form, at minimum the email/username field must be validated as non-empty.

## Constraints
- Validation must be client-side JS only — do not add a backend or change `action` attributes to point to a server
- Error messages must be inline (next to the relevant field) — not alert dialogs or console logs
- Must not alter the existing modal markup structure — add error message elements adjacent to existing inputs
- Must use vanilla JS or jQuery (already loaded) — no additional validation libraries
- Must not interfere with the existing modal show/hide jQuery logic
- Error messages must clear when the user corrects the field and re-submits

## What a correct solution looks like
- Submitting the login form with an invalid email shows an inline error message below the email field
- Submitting with an empty password shows an inline error message below the password field
- A valid submission (correct email format + non-empty password) proceeds normally
- Submitting the register form with an empty email/username field shows an inline error
- All error messages disappear when the form is resubmitted with correct values
- No alert() dialogs are used

## Test coverage
- Behavioral: `tests/behavioral.test.js` — simulates form submission with invalid inputs and asserts error message elements are visible with correct text; simulates valid submission and asserts no error messages appear and form proceeds
- Regression: `tests/regression.test.js` — asserts existing modal open/close behaviour is unaffected; asserts no existing jQuery handlers have been removed or broken

## Prompt (minimum context)
```
The login and register modals have no form validation. Add client-side validation:
email format check, non-empty password, and inline error messages.
Prevent form submission if validation fails.
```
