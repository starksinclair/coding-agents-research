/**
 * RW-08 — Behavioral Tests
 * Extract duplicated modal markup into a single reusable template
 *
 * Core assertions:
 * - After page load, all three modals (login, register, forgot-password) exist in DOM
 * - Each modal opens and closes via its trigger
 * - Modal markup does not appear inline in individual HTML pages
 */

"use strict";

const fs = require("fs");
const path = require("path");
const {
  createDom,
  injectScript,
  injectScriptFile,
  loadJQuery,
  flush,
  click,
  hasError,
  listHtmlFiles,
  parseHtmlFile,
  codebasePath,
} = require("../../_helpers/harness");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Load the modals partial and inject into the DOM, simulating what the
 * agent's JS loader does at runtime.
 */
async function buildPageWithInjectedModals(window, document) {
  const partialsPath = codebasePath("partials", "modals.html");
  if (!fs.existsSync(partialsPath)) {
    // Also check root-level modals.html
    const rootPath = codebasePath("modals.html");
    if (!fs.existsSync(rootPath)) return false;
    const html = fs.readFileSync(rootPath, "utf8");
    document.body.insertAdjacentHTML("beforeend", html);
    return true;
  }
  const html = fs.readFileSync(partialsPath, "utf8");
  document.body.insertAdjacentHTML("beforeend", html);
  return true;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("RW-08 — all three modals exist and function after injection (behavioral)", () => {
  test("partials/modals.html (or modals.html) file exists in the codebase", () => {
    const partialsPath = codebasePath("partials", "modals.html");
    const rootPath = codebasePath("modals.html");
    const exists = fs.existsSync(partialsPath) || fs.existsSync(rootPath);
    expect(exists).toBe(true);
  });

  test("modals partial contains login modal markup (.loginbo)", () => {
    const partialsPath = codebasePath("partials", "modals.html");
    const rootPath = codebasePath("modals.html");
    const filePath = fs.existsSync(partialsPath) ? partialsPath : rootPath;

    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf8");
    expect(content).toMatch(/loginbo|class=".*login.*"/i);
  });

  test("modals partial contains register modal markup (.registerbo)", () => {
    const partialsPath = codebasePath("partials", "modals.html");
    const rootPath = codebasePath("modals.html");
    const filePath = fs.existsSync(partialsPath) ? partialsPath : rootPath;

    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf8");
    expect(content).toMatch(/registerbo|class=".*register.*"/i);
  });

  test("modals partial contains forgot-password markup (.forgotpas)", () => {
    const partialsPath = codebasePath("partials", "modals.html");
    const rootPath = codebasePath("modals.html");
    const filePath = fs.existsSync(partialsPath) ? partialsPath : rootPath;

    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf8");
    expect(content).toMatch(/forgotpas|forgot/i);
  });

  test("after modal injection, .loginbo exists in DOM", async () => {
    const { window, document, errors } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    await flush(window);

    const injected = await buildPageWithInjectedModals(window, document);
    if (!injected) {
      console.warn("RW-08: modals partial not found — skipping DOM injection tests");
      return;
    }
    await flush(window);

    expect(document.querySelector(".loginbo")).not.toBeNull();
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("after modal injection, .registerbo exists in DOM", async () => {
    const { window, document } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    await flush(window);

    const injected = await buildPageWithInjectedModals(window, document);
    if (!injected) return;
    await flush(window);

    expect(document.querySelector(".registerbo")).not.toBeNull();
  });

  test("after modal injection, .forgotpas exists in DOM", async () => {
    const { window, document } = createDom({ html: "", fragment: true });
    loadJQuery(window);
    await flush(window);

    const injected = await buildPageWithInjectedModals(window, document);
    if (!injected) return;
    await flush(window);

    expect(document.querySelector(".forgotpas")).not.toBeNull();
  });

  test("login modal opens via trigger click after injection", async () => {
    const { window, document, errors } = createDom({
      html: `<button class="login-trigger">Login</button>`,
      fragment: true,
    });
    loadJQuery(window);
    await flush(window);

    const injected = await buildPageWithInjectedModals(window, document);
    if (!injected) return;

    injectScript(
      window,
      `$('.login-trigger').on('click', function() { $('.loginbo').show(); });`
    );
    await flush(window);

    click(window, document.querySelector(".login-trigger"));
    await flush(window);

    expect(document.querySelector(".loginbo").style.display).not.toBe("none");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("no inline modal markup remains in individual HTML pages", () => {
    const htmlFiles = listHtmlFiles();
    // The distinctive class that only exists in the login modal
    const loginModalMarker = "loginbo";

    const pagesWithInlineModals = [];

    htmlFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      if (content.includes(loginModalMarker)) {
        pagesWithInlineModals.push(path.basename(filePath));
      }
    });

    if (pagesWithInlineModals.length > 0) {
      console.error(
        "RW-08: Modal markup still inline in these pages:",
        pagesWithInlineModals
      );
    }

    // After extraction, no HTML page should contain the modal markup inline
    expect(pagesWithInlineModals).toHaveLength(0);
  });
});
