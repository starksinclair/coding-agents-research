/**
 * RW-06 — Behavioral Tests
 * Add client-side form validation to login/register modals
 *
 * Core assertions:
 * - Invalid email shows inline error message (not alert)
 * - Empty password shows inline error message
 * - Valid submission produces no error messages
 * - Register form with empty email/username shows inline error
 * - Error messages clear on valid resubmission
 * - No alert() dialogs are used
 */

"use strict";

const {
  createDom,
  injectScript,
  injectScriptFile,
  loadJQuery,
  flush,
  hasError,
  suppressLongTimers,
} = require("../../_helpers/harness");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a login modal DOM matching the codebase structure.
 * Includes an email field, password field, and submit button.
 */
function buildLoginModalDom() {
  const html = `
    <div class="loginbo" style="display:block">
      <form class="login-form" action="home.html">
        <input type="text" class="login-email" name="email" placeholder="Email" />
        <span class="login-email-error" style="display:none"></span>

        <input type="password" class="login-password" name="password" placeholder="Password" />
        <span class="login-password-error" style="display:none"></span>

        <button type="submit" class="login-submit">Login</button>
      </form>
    </div>
  `;
  const { window, document, errors } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document, errors };
}

/**
 * Build a register modal DOM.
 */
function buildRegisterModalDom() {
  const html = `
    <div class="registerbo" style="display:block">
      <form class="register-form" action="home.html">
        <input type="text" class="register-email" name="reg_email" placeholder="Email or Username" />
        <span class="register-email-error" style="display:none"></span>

        <input type="password" class="register-password" name="reg_password" placeholder="Password" />
        <span class="register-password-error" style="display:none"></span>

        <button type="submit" class="register-submit">Register</button>
      </form>
    </div>
  `;
  const { window, document, errors } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document, errors };
}

/** Trigger a form submit event. */
function submitForm(window, form) {
  const event = new window.Event("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(event);
  return event;
}

/** Set an input's value and fire input/change events so validators see it. */
function fillInput(window, input, value) {
  input.value = value;
  input.dispatchEvent(new window.Event("input", { bubbles: true }));
  input.dispatchEvent(new window.Event("change", { bubbles: true }));
}

/** True if any visible element contains error-like text. */
function hasVisibleError(document) {
  const candidates = document.querySelectorAll(
    "[class*='error'], [class*='invalid'], [class*='warning'], [class*='msg']"
  );
  return Array.from(candidates).some(
    (el) =>
      el.style.display !== "none" &&
      el.textContent.trim().length > 0
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("RW-06 — login form validation (behavioral)", () => {
  test("submitting login form with invalid email shows inline error", async () => {
    const { window, document, errors } = buildLoginModalDom();
    loadJQuery(window);
    // Load whatever validation JS the agent produced
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const emailInput = document.querySelector(".login-email, input[name='email'], input[type='email']");
    const form = document.querySelector(".login-form, form");

    if (!emailInput || !form) {
      console.warn("RW-06: login form elements not found in DOM — check selector alignment");
      return;
    }

    fillInput(window, emailInput, "not-an-email");
    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(true);
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("submitting login form with empty email shows inline error", async () => {
    const { window, document } = buildLoginModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const form = document.querySelector(".login-form, form");
    if (!form) return;

    // Leave email empty
    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(true);
  });

  test("submitting login form with empty password shows inline error", async () => {
    const { window, document } = buildLoginModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const emailInput = document.querySelector(".login-email, input[name='email']");
    const passwordInput = document.querySelector(".login-password, input[type='password']");
    const form = document.querySelector(".login-form, form");
    if (!form || !emailInput || !passwordInput) return;

    fillInput(window, emailInput, "valid@example.com");
    fillInput(window, passwordInput, ""); // empty password
    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(true);
  });

  test("valid login submission (correct email + non-empty password) shows no error", async () => {
    const { window, document } = buildLoginModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const emailInput = document.querySelector(".login-email, input[name='email']");
    const passwordInput = document.querySelector(".login-password, input[type='password']");
    const form = document.querySelector(".login-form, form");
    if (!form || !emailInput || !passwordInput) return;

    fillInput(window, emailInput, "user@example.com");
    fillInput(window, passwordInput, "password123");
    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(false);
  });

  test("error messages clear when user corrects fields and resubmits", async () => {
    const { window, document } = buildLoginModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const emailInput = document.querySelector(".login-email, input[name='email']");
    const passwordInput = document.querySelector(".login-password, input[type='password']");
    const form = document.querySelector(".login-form, form");
    if (!form || !emailInput || !passwordInput) return;

    // First: invalid submission
    fillInput(window, emailInput, "bad-email");
    submitForm(window, form);
    await flush(window);
    expect(hasVisibleError(document)).toBe(true);

    // Then: valid resubmission
    fillInput(window, emailInput, "user@example.com");
    fillInput(window, passwordInput, "password123");
    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(false);
  });

  test("validation does NOT use alert() dialogs", async () => {
    const { window, document } = buildLoginModalDom();
    loadJQuery(window);

    let alertCalled = false;
    window.alert = () => { alertCalled = true; };

    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const form = document.querySelector(".login-form, form");
    if (!form) return;

    submitForm(window, form);
    await flush(window);

    expect(alertCalled).toBe(false);
  });

  test("invalid submission is prevented (form does not navigate)", async () => {
    const { window, document } = buildLoginModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    try { injectScriptFile(window, "js/home.js"); } catch (_) {}
    await flush(window);

    const form = document.querySelector(".login-form, form");
    if (!form) return;

    const submitEvent = submitForm(window, form);
    await flush(window);

    // The submit event must have been cancelled via preventDefault()
    // when validation fails — jsdom tracks this via defaultPrevented
    if (hasVisibleError(document)) {
      expect(submitEvent.defaultPrevented).toBe(true);
    }
  });
});

describe("RW-06 — register form validation (behavioral)", () => {
  test("submitting register form with empty email/username shows inline error", async () => {
    const { window, document } = buildRegisterModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    const form = document.querySelector(".register-form, form");
    if (!form) return;

    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(true);
  });

  test("submitting register form with valid fields shows no error", async () => {
    const { window, document } = buildRegisterModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    const emailInput = document.querySelector(".register-email, input[name='reg_email']");
    const passwordInput = document.querySelector(".register-password, input[name='reg_password']");
    const form = document.querySelector(".register-form, form");
    if (!form || !emailInput) return;

    fillInput(window, emailInput, "user@example.com");
    if (passwordInput) fillInput(window, passwordInput, "password123");
    submitForm(window, form);
    await flush(window);

    expect(hasVisibleError(document)).toBe(false);
  });

  test("register validation does NOT use alert() dialogs", async () => {
    const { window, document } = buildRegisterModalDom();
    loadJQuery(window);

    let alertCalled = false;
    window.alert = () => { alertCalled = true; };

    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    const form = document.querySelector(".register-form, form");
    if (!form) return;

    submitForm(window, form);
    await flush(window);

    expect(alertCalled).toBe(false);
  });
});
