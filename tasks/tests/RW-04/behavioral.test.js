/**
 * RW-04 — Behavioral Tests
 * Fix footer fixed height clipping content on small screens
 *
 * Core assertion: footer uses min-height or no fixed height — never a hard `height`
 * value that clips content when it wraps.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { CODEBASE, codebasePath } = require("../../_helpers/harness");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return all CSS files in the codebase (relative paths from codebase root). */
function listCssFiles() {
  const cssDir = codebasePath("dist", "css");
  if (!fs.existsSync(cssDir)) return [];
  return fs
    .readdirSync(cssDir)
    .filter((f) => f.endsWith(".css"))
    .map((f) => path.join(cssDir, f));
}

/** Read a CSS file and extract all rules that target `footer`. */
function extractFooterRules(cssContent) {
  // Simple regex-based extraction: find blocks containing footer selectors
  const footerRulePattern = /footer[^{]*\{([^}]*)\}/gi;
  const matches = [];
  let m;
  while ((m = footerRulePattern.exec(cssContent)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("RW-04 — footer height is not fixed (behavioral)", () => {
  test("no CSS file sets a fixed pixel height on the footer element", () => {
    const cssFiles = listCssFiles();
    expect(cssFiles.length).toBeGreaterThan(0);

    const violations = [];

    cssFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      const footerBlocks = extractFooterRules(content);

      footerBlocks.forEach((block) => {
        // Match `height: <number>px` but NOT `min-height` or `max-height`
        const fixedHeightMatch = block.match(/(?<!min-|max-)height\s*:\s*\d+px/i);
        if (fixedHeightMatch) {
          violations.push({ file: path.basename(filePath), match: fixedHeightMatch[0] });
        }
      });
    });

    if (violations.length > 0) {
      console.error("Fixed footer height still present:", violations);
    }
    expect(violations).toHaveLength(0);
  });

  test("footer uses min-height or has no explicit height (allowing content to grow)", () => {
    const cssFiles = listCssFiles();

    let footerRulesFound = false;
    let hasMinHeight = false;
    let hasNoFixedHeight = true;

    cssFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      const footerBlocks = extractFooterRules(content);

      if (footerBlocks.length > 0) {
        footerRulesFound = true;
        footerBlocks.forEach((block) => {
          if (/min-height\s*:/i.test(block)) hasMinHeight = true;
          if (/(?<!min-|max-)height\s*:\s*\d+px/i.test(block)) hasNoFixedHeight = false;
        });
      }
    });

    // Either min-height is explicitly set, or height is simply absent (both are correct)
    expect(hasMinHeight || hasNoFixedHeight).toBe(true);
  });

  test("fix is applied in all CSS files that define footer rules (not just one)", () => {
    const cssFiles = listCssFiles();
    const filesWithFooterAndFixedHeight = [];

    cssFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      const footerBlocks = extractFooterRules(content);
      footerBlocks.forEach((block) => {
        if (/(?<!min-|max-)height\s*:\s*\d+px/i.test(block)) {
          filesWithFooterAndFixedHeight.push(path.basename(filePath));
        }
      });
    });

    expect(filesWithFooterAndFixedHeight).toHaveLength(0);
  });
});
