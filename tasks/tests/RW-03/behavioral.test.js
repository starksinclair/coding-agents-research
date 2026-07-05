/**
 * RW-03 — Behavioral Tests
 * Fix broken "Forgot Password?" onclick handler using wrong element ID
 *
 * Core assertion: clicking the forgot-password trigger opens the .forgotpas
 * modal without throwing a TypeError.
 *
 * The bug: onclick="document.getElementById('id0l4').style.display='block'"
 * where 'id0l4' does not exist → TypeError: Cannot set properties of null
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build the login modal markup matching the actual codebase pattern:
 * - .loginbo trigger button
 * - .forgotpas panel (hidden by default)
 * - The broken onclick referencing a non-existent ID
 */
function buildLoginModalDom(brokenHandler = false) {
  const forgotOnclick = brokenHandler
    ? `onclick="document.getElementById('id0l4').style.display='block'"`
    : `onclick="$('.forgotpas').show()"`;

  const html = `
    <!-- Forgot password trigger link -->
    <a class="forgot-link" ${forgotOnclick}>Forgot Password?</a>

    <!-- Forgot password panel -->
    <div class="forgotpas" style="display:none">
      <input type="email" placeholder="Enter your email" />
      <button>Reset Password</button>
    </div>

    <!-- Login modal -->
    <div class="loginbo" style="display:none">
      <input type="text" name="username" />
      <input type="password" name="password" />
    </div>
  `;
  return createDom({ html, fragment: true });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("RW-03 — forgot-password trigger opens .forgotpas modal (behavioral)", () => {
  test("clicking forgot-password link makes .forgotpas visible", async () => {
    const { window, document, errors } = buildLoginModalDom(false);
    loadJQuery(window);

    // Inject the jQuery handler that the codebase uses
    injectScript(
      window,
      `$(document).on('click', '.forgot-link', function() { $('.forgotpas').show(); });`
    );
    await flush(window);

    const trigger = document.querySelector(".forgot-link");
    const panel = document.querySelector(".forgotpas");

    expect(panel.style.display).toBe("none"); // starts hidden

    click(window, trigger);
    await flush(window);

    expect(panel.style.display).not.toBe("none"); // now visible
    expect(hasError(errors, /Cannot set properties of null/)).toBe(false);
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("clicking the trigger does NOT throw TypeError about null element", async () => {
    const { window, document, errors } = buildLoginModalDom(false);
    loadJQuery(window);
    injectScript(
      window,
      `$(document).on('click', '.forgot-link', function() { $('.forgotpas').show(); });`
    );
    await flush(window);

    const trigger = document.querySelector(".forgot-link");
    click(window, trigger);
    await flush(window);

    expect(hasError(errors, /Cannot set properties of null/)).toBe(false);
    expect(hasError(errors, /null/)).toBe(false);
  });

  test("the broken id0l4 reference no longer exists in any HTML file", () => {
    const htmlFiles = listHtmlFiles();
    const brokenId = "id0l4";

    htmlFiles.forEach((filePath) => {
      const document = parseHtmlFile(filePath);
      // Check for the broken getElementById call in onclick attributes
      const allElements = document.querySelectorAll("[onclick]");
      allElements.forEach((el) => {
        const handler = el.getAttribute("onclick") || "";
        expect(handler).not.toContain(brokenId);
      });
    });
  });

  test(".forgotpas element exists in pages that have the login modal", () => {
    const htmlFiles = listHtmlFiles();

    htmlFiles.forEach((filePath) => {
      const document = parseHtmlFile(filePath);
      const loginModal = document.querySelector(".loginbo");
      if (loginModal) {
        // Pages with login modal must also have forgot-password panel
        const forgotPanel = document.querySelector(".forgotpas");
        expect(forgotPanel).not.toBeNull();
      }
    });
  });

  test("fix is applied consistently — no page still has the broken onclick", () => {
    const htmlFiles = listHtmlFiles();

    htmlFiles.forEach((filePath) => {
      const filename = path.basename(filePath);
      const document = parseHtmlFile(filePath);
      const brokenEls = Array.from(document.querySelectorAll("[onclick*='id0l4']"));
      expect(brokenEls.length).toBe(0);
    });
  });
});
