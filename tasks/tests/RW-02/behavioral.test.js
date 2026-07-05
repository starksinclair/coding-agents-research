/**
 * RW-02 — Behavioral Tests
 * Fix Bootstrap scripts loaded before jQuery
 *
 * Asserts: jQuery appears before Bootstrap in <script> tags on every HTML page,
 * and no page loads both bootstrap.js and bootstrap.bundle.js simultaneously.
 */

"use strict";

const path = require("path");
const { listHtmlFiles, parseHtmlFile } = require("../../_helpers/harness");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getScriptSrcs(document) {
  return Array.from(document.querySelectorAll("script[src]")).map(
    (s) => s.getAttribute("src") || ""
  );
}

function srcBasename(src) {
  return path.basename(src.split("?")[0]);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("RW-02 — jQuery loads before Bootstrap on every HTML page (behavioral)", () => {
  const htmlFiles = listHtmlFiles();

  test("at least one HTML file is found in the codebase", () => {
    expect(htmlFiles.length).toBeGreaterThan(0);
  });

  htmlFiles.forEach((filePath) => {
    const filename = path.basename(filePath);

    test(`${filename}: jQuery appears before any Bootstrap script`, () => {
      const document = parseHtmlFile(filePath);
      const srcs = getScriptSrcs(document);
      const names = srcs.map(srcBasename);

      const jqueryIdx = names.findIndex((n) => n.startsWith("jquery"));
      const bootstrapIdx = names.findIndex(
        (n) => n.startsWith("bootstrap")
      );

      // If this page has no Bootstrap at all, skip
      if (bootstrapIdx === -1) return;

      // jQuery must exist on pages that use Bootstrap
      expect(jqueryIdx).toBeGreaterThanOrEqual(0);

      // jQuery must come before Bootstrap
      expect(jqueryIdx).toBeLessThan(bootstrapIdx);
    });

    test(`${filename}: does not load both bootstrap.js and bootstrap.bundle.js`, () => {
      const document = parseHtmlFile(filePath);
      const srcs = getScriptSrcs(document);
      const names = srcs.map(srcBasename);

      const hasBootstrapJs = names.some((n) => n === "bootstrap.js");
      const hasBootstrapBundle = names.some((n) => n === "bootstrap.bundle.js");

      // Must not have both simultaneously
      expect(hasBootstrapJs && hasBootstrapBundle).toBe(false);
    });
  });
});
