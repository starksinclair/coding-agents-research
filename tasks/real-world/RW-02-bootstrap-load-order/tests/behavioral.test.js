/**
 * RW-02 — Behavioral
 * For every HTML page that loads a Bootstrap script, asserts:
 *   - jQuery is loaded BEFORE any Bootstrap script (Bootstrap depends on global jQuery)
 *   - a page does not load both a plain Bootstrap build AND the bundle build
 *     (the fix keeps exactly one — `bootstrap.bundle.js`)
 *
 * Baseline fails: pages load `bootstrap.js` first, then jQuery, and also load both
 * `bootstrap.js` and `bootstrap.bundle.js`.
 */
const path = require("path");
const { listHtmlFiles, parseHtmlFile } = require("../../_helpers/harness");

function scriptBasenames(document) {
  return Array.from(document.querySelectorAll("script[src]")).map((s) => {
    const src = s.getAttribute("src") || "";
    return src.split("/").pop().toLowerCase();
  });
}

const isJquery = (name) => name.includes("jquery");
const isPlainBootstrap = (name) =>
  name === "bootstrap.js" || name === "bootstrap.min.js";
const isBundleBootstrap = (name) =>
  name === "bootstrap.bundle.js" || name === "bootstrap.bundle.min.js";
const isAnyBootstrap = (name) => isPlainBootstrap(name) || isBundleBootstrap(name);

// Only pages that actually load a Bootstrap script are in scope for this task.
const pages = listHtmlFiles().filter((file) => {
  const doc = parseHtmlFile(file);
  return scriptBasenames(doc).some(isAnyBootstrap);
});

describe("RW-02 behavioral: Bootstrap script load order", () => {
  test("there is at least one page that loads Bootstrap to check", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  describe.each(pages)("%s", (file) => {
    const label = path.basename(file);
    const names = scriptBasenames(parseHtmlFile(file));

    test(`jQuery loads before Bootstrap in ${label}`, () => {
      const jqueryIndex = names.findIndex(isJquery);
      const firstBootstrapIndex = names.findIndex(isAnyBootstrap);

      // Only meaningful when the page loads jQuery at all.
      if (jqueryIndex === -1) return;

      expect(jqueryIndex).toBeGreaterThanOrEqual(0);
      expect(jqueryIndex).toBeLessThan(firstBootstrapIndex);
    });

    test(`${label} does not load both plain and bundled Bootstrap`, () => {
      const hasPlain = names.some(isPlainBootstrap);
      const hasBundle = names.some(isBundleBootstrap);
      expect(hasPlain && hasBundle).toBe(false);
    });
  });
});
