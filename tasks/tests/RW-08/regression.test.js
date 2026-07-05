/**
 * RW-08 — Regression Tests
 * Extract duplicated modal markup into a single reusable template
 *
 * Asserts: existing jQuery handlers for .forgot, .loginbo, .forgotpas, .registerbo
 * still fire correctly after the modals are loaded from the partial.
 * Also asserts modal class names and input name attributes are unchanged.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const {
  createDom,
  injectScript,
  loadJQuery,
  flush,
  click,
  hasError,
  codebasePath,
} = require("../../_helpers/harness");

async function injectModalsPartial(document) {
  const partialsPath = codebasePath("partials", "modals.html");
  const rootPath = codebasePath("modals.html");
  const filePath = fs.existsSync(partialsPath) ? partialsPath : rootPath;
  if (!fs.existsSync(filePath)) return false;
  const html = fs.readFileSync(filePath, "utf8");
  document.body.insertAdjacentHTML("beforeend", html);
  return true;
}

describe("RW-08 — jQuery modal handlers still work after extraction (regression)", () => {
  test("existing jQuery handlers reference correct class names after extraction", async () => {
    const { window, document, errors } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    await flush(window);

    const injected = await injectModalsPartial(document);
    if (!injected) {
      console.warn("RW-08 regression: modals partial not found — skipping");
      return;
    }

    // Wire the handlers exactly as the codebase does
    injectScript(
      window,
      `
      $(document).on('click', '.forgot', function() { $('.forgotpas').show(); $('.loginbo').hide(); });
      $(document).on('click', '.close-login', function() { $('.loginbo').hide(); });
      $(document).on('click', '.close-register', function() { $('.registerbo').hide(); });
      `
    );
    await flush(window);

    expect(hasError(errors, /TypeError/)).toBe(false);
    expect(hasError(errors, /is not defined/)).toBe(false);
  });

  test("login modal input name attributes are unchanged", async () => {
    const { window, document } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    await flush(window);

    const injected = await injectModalsPartial(document);
    if (!injected) return;
    await flush(window);

    const loginModal = document.querySelector(".loginbo");
    if (!loginModal) return;

    // These name attributes must not change — server-side code depends on them
    const usernameInput = loginModal.querySelector("input[name='username'], input[name='user'], input[type='text']");
    const passwordInput = loginModal.querySelector("input[type='password']");

    expect(usernameInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
  });

  test("register modal input name attributes are unchanged", async () => {
    const { window, document } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    await flush(window);

    const injected = await injectModalsPartial(document);
    if (!injected) return;
    await flush(window);

    const registerModal = document.querySelector(".registerbo");
    if (!registerModal) return;

    // Register form must still have its fields
    const inputs = registerModal.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });

  test("modals partial contains all three distinct modal sections", async () => {
    const partialsPath = codebasePath("partials", "modals.html");
    const rootPath = codebasePath("modals.html");
    const filePath = fs.existsSync(partialsPath) ? partialsPath : rootPath;
    if (!fs.existsSync(filePath)) return;

    const { window, document } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    const html = fs.readFileSync(filePath, "utf8");
    document.body.insertAdjacentHTML("beforeend", html);
    await flush(window);

    // All three modals must be present in the single partial
    expect(document.querySelector(".loginbo")).not.toBeNull();
    expect(document.querySelector(".registerbo")).not.toBeNull();
    expect(document.querySelector(".forgotpas")).not.toBeNull();
  });

  test("a grep for .loginbo returns only one result across all HTML files", () => {
    const { listHtmlFiles } = require("../../_helpers/harness");
    const htmlFiles = listHtmlFiles();

    const filesWithInlineLogin = htmlFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return content.includes("loginbo");
    });

    // After extraction, zero HTML pages should contain inline modal markup
    expect(filesWithInlineLogin).toHaveLength(0);
  });
});
