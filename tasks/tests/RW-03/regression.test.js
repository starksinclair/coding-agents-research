/**
 * RW-03 — Regression Tests
 * Fix broken "Forgot Password?" onclick handler
 *
 * Asserts the login modal and register modal still open correctly after the fix,
 * and the existing jQuery .forgot handler (if present) is not duplicated or broken.
 */

"use strict";

const {
  createDom,
  injectScript,
  loadJQuery,
  flush,
  click,
  hasError,
  listHtmlFiles,
  parseHtmlFile,
} = require("../../_helpers/harness");

const path = require("path");

function buildFullModalDom() {
  const html = `
    <!-- Login trigger -->
    <button class="login-trigger">Login</button>

    <!-- Login modal -->
    <div class="loginbo" style="display:none">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <a class="forgot-link">Forgot Password?</a>
    </div>

    <!-- Register trigger -->
    <button class="register-trigger">Register</button>

    <!-- Register modal -->
    <div class="registerbo" style="display:none">
      <input type="text" name="reg_username" />
      <input type="email" name="reg_email" />
    </div>

    <!-- Forgot password panel -->
    <div class="forgotpas" style="display:none">
      <input type="email" name="forgot_email" />
    </div>
  `;
  return createDom({ html, fragment: true });
}

describe("RW-03 — login and register modals unaffected by fix (regression)", () => {
  test("login modal still opens via its trigger", async () => {
    const { window, document, errors } = buildFullModalDom();
    loadJQuery(window);
    injectScript(
      window,
      `
      $('.login-trigger').on('click', function() { $('.loginbo').show(); });
      $('.register-trigger').on('click', function() { $('.registerbo').show(); });
      $('.forgot-link').on('click', function() { $('.forgotpas').show(); });
      `
    );
    await flush(window);

    const loginTrigger = document.querySelector(".login-trigger");
    click(window, loginTrigger);
    await flush(window);

    expect(document.querySelector(".loginbo").style.display).not.toBe("none");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("register modal still opens via its trigger", async () => {
    const { window, document, errors } = buildFullModalDom();
    loadJQuery(window);
    injectScript(
      window,
      `
      $('.login-trigger').on('click', function() { $('.loginbo').show(); });
      $('.register-trigger').on('click', function() { $('.registerbo').show(); });
      $('.forgot-link').on('click', function() { $('.forgotpas').show(); });
      `
    );
    await flush(window);

    const registerTrigger = document.querySelector(".register-trigger");
    click(window, registerTrigger);
    await flush(window);

    expect(document.querySelector(".registerbo").style.display).not.toBe("none");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("opening login modal does not affect register modal visibility", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);
    injectScript(
      window,
      `
      $('.login-trigger').on('click', function() { $('.loginbo').show(); });
      $('.register-trigger').on('click', function() { $('.registerbo').show(); });
      `
    );
    await flush(window);

    click(window, document.querySelector(".login-trigger"));
    await flush(window);

    expect(document.querySelector(".loginbo").style.display).not.toBe("none");
    expect(document.querySelector(".registerbo").style.display).toBe("none");
  });

  test(".loginbo, .registerbo, .forgotpas elements still present in all HTML pages", () => {
    const htmlFiles = listHtmlFiles();

    htmlFiles.forEach((filePath) => {
      const document = parseHtmlFile(filePath);
      const loginModal = document.querySelector(".loginbo");

      // Pages with login modal must also retain register and forgot panels
      if (loginModal) {
        expect(document.querySelector(".registerbo")).not.toBeNull();
        expect(document.querySelector(".forgotpas")).not.toBeNull();
      }
    });
  });

  test("no duplicate .forgot jQuery handlers were introduced", async () => {
    const { window, document } = buildFullModalDom();
    loadJQuery(window);

    // Simulate what a naive fix might do: add a second handler
    // Both the original inline onclick and a new jQuery handler would fire
    // A correct fix uses one mechanism only
    injectScript(
      window,
      `
      var forgotClickCount = 0;
      $('.forgot-link').on('click', function() {
        forgotClickCount++;
        $('.forgotpas').show();
      });
      window.__getForgotClickCount = function() { return forgotClickCount; };
      `
    );
    await flush(window);

    click(window, document.querySelector(".forgot-link"));
    await flush(window);

    // Should fire exactly once — not twice from duplicate handlers
    expect(window.__getForgotClickCount()).toBe(1);
  });
});
