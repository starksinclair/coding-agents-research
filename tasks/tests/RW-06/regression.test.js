/**
 * RW-06 — Regression Tests
 * Add client-side form validation to login/register modals
 *
 * Asserts that adding validation did not break:
 * - Modal open/close behaviour via existing jQuery handlers
 * - Existing modal class names and input name attributes
 * - The .forgot click handler that switches to the forgot-password panel
 * - No existing jQuery event handlers were removed or overwritten
 */

"use strict";

const {
  createDom,
  injectScript,
  injectScriptFile,
  loadJQuery,
  flush,
  click,
  hasError,
  suppressLongTimers,
} = require("../../_helpers/harness");

function buildFullModalDom() {
  const html = `
    <!-- Login trigger -->
    <button class="open-login">Login</button>

    <!-- Login modal -->
    <div class="loginbo" style="display:none">
      <form class="login-form" action="home.html">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <a class="forgot">Forgot Password?</a>
        <button type="submit">Login</button>
      </form>
      <button class="close-login">×</button>
    </div>

    <!-- Register trigger -->
    <button class="open-register">Register</button>

    <!-- Register modal -->
    <div class="registerbo" style="display:none">
      <form class="register-form" action="home.html">
        <input type="text" name="reg_email" placeholder="Email" />
        <input type="password" name="reg_password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <button class="close-register">×</button>
    </div>

    <!-- Forgot password panel -->
    <div class="forgotpas" style="display:none">
      <input type="email" name="forgot_email" />
      <button>Reset</button>
    </div>
  `;
  const { window, document, errors } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document, errors };
}

function wireExistingHandlers(window) {
  injectScript(
    window,
    `
    $('.open-login').on('click', function() { $('.loginbo').show(); });
    $('.close-login').on('click', function() { $('.loginbo').hide(); });
    $('.open-register').on('click', function() { $('.registerbo').show(); });
    $('.close-register').on('click', function() { $('.registerbo').hide(); });
    $('.forgot').on('click', function() { $('.loginbo').hide(); $('.forgotpas').show(); });
    `
  );
}

describe("RW-06 — existing modal behaviour unaffected by validation (regression)", () => {
  test("login modal still opens via its trigger after validation added", async () => {
    const { window, document, errors } = buildFullModalDom();
    loadJQuery(window);
    wireExistingHandlers(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    click(window, document.querySelector(".open-login"));
    await flush(window);

    expect(document.querySelector(".loginbo").style.display).not.toBe("none");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("login modal still closes via its close button", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);
    wireExistingHandlers(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    // Open then close
    click(window, document.querySelector(".open-login"));
    await flush(window);
    click(window, document.querySelector(".close-login"));
    await flush(window);

    expect(document.querySelector(".loginbo").style.display).toBe("none");
  });

  test("register modal still opens and closes correctly", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);
    wireExistingHandlers(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    click(window, document.querySelector(".open-register"));
    await flush(window);
    expect(document.querySelector(".registerbo").style.display).not.toBe("none");

    click(window, document.querySelector(".close-register"));
    await flush(window);
    expect(document.querySelector(".registerbo").style.display).toBe("none");
  });

  test(".forgot click handler still switches to .forgotpas panel", async () => {
    const { window, document, errors } = buildFullModalDom();
    loadJQuery(window);
    wireExistingHandlers(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    // Open login modal first
    document.querySelector(".loginbo").style.display = "block";

    click(window, document.querySelector(".forgot"));
    await flush(window);

    expect(document.querySelector(".forgotpas").style.display).not.toBe("none");
    expect(document.querySelector(".loginbo").style.display).toBe("none");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("existing input name attributes are unchanged", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    // These name attributes must not be altered — server-side or other JS may depend on them
    expect(document.querySelector("input[name='email']")).not.toBeNull();
    expect(document.querySelector("input[name='password']")).not.toBeNull();
    expect(document.querySelector("input[name='reg_email']")).not.toBeNull();
    expect(document.querySelector("input[name='reg_password']")).not.toBeNull();
  });

  test("existing modal class names are unchanged", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    expect(document.querySelector(".loginbo")).not.toBeNull();
    expect(document.querySelector(".registerbo")).not.toBeNull();
    expect(document.querySelector(".forgotpas")).not.toBeNull();
    expect(document.querySelector(".forgot")).not.toBeNull();
  });

  test("opening login modal does not trigger validation errors unprompted", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);
    wireExistingHandlers(window);
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    // Just opening the modal should not show any error messages
    click(window, document.querySelector(".open-login"));
    await flush(window);

    const errorEls = Array.from(
      document.querySelectorAll("[class*='error'], [class*='invalid']")
    ).filter((el) => el.style.display !== "none" && el.textContent.trim().length > 0);

    expect(errorEls).toHaveLength(0);
  });

  test("validation script does not overwrite or remove existing jQuery handlers", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);

    let openLoginFired = false;
    injectScript(
      window,
      `$('.open-login').on('click', function() { window.__openLoginFired = true; $('.loginbo').show(); });`
    );

    // Load validation AFTER wiring original handlers
    try { injectScriptFile(window, "js/validation.js"); } catch (_) {}
    await flush(window);

    click(window, document.querySelector(".open-login"));
    await flush(window);

    // Original handler must still have fired
    expect(window.__openLoginFired).toBe(true);
  });
});
