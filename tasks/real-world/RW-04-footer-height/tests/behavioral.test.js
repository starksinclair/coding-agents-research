/**
 * RW-04 — Behavioral
 * jsdom performs no real layout, so a true "computed height >= content height" check
 * is not possible. This asserts the equivalent verifiable condition from the task's
 * definition of a correct solution: the `.footer` rule must no longer pin a fixed
 * pixel `height` (which is what clips wrapped content) — it must be removed or replaced
 * by `min-height`.
 *
 * Baseline fails: `.footer { height: 440px }` (home.css) and `.footer { height: 290px }`
 * (responsive.css, web.css, ...). Passes once fixed heights become min-height/removed.
 */
const fs = require("fs");
const path = require("path");
const { codebasePath } = require("../../_helpers/harness");

const CSS_DIR = codebasePath("css");

// Extract the bodies of standalone `.footer { ... }` rules (not `.footer a`, `.foote`,
// `.card-footer`, etc.).
function footerRuleBodies(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, " ");
  const bodies = [];
  const re = /(?:^|[\s,{}>;])\.footer\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(stripped)) !== null) bodies.push(m[1]);
  return bodies;
}

// A fixed pixel height declaration (excludes min-height / max-height / line-height).
function hasFixedPxHeight(body) {
  return /(?:^|[;{\s])height\s*:\s*[\d.]+px/i.test(body);
}

const cssFilesWithFooter = fs
  .readdirSync(CSS_DIR)
  .filter((n) => n.endsWith(".css"))
  .map((n) => path.join(CSS_DIR, n))
  .filter((file) => footerRuleBodies(fs.readFileSync(file, "utf8")).length > 0);

describe("RW-04 behavioral: footer no longer uses a fixed height", () => {
  test("there is at least one stylesheet defining a .footer rule", () => {
    expect(cssFilesWithFooter.length).toBeGreaterThan(0);
  });

  describe.each(cssFilesWithFooter)("%s", (file) => {
    const label = path.basename(file);
    const bodies = footerRuleBodies(fs.readFileSync(file, "utf8"));

    test(`${label} has no fixed pixel height on the .footer rule`, () => {
      const offending = bodies.filter(hasFixedPxHeight);
      expect(offending).toEqual([]);
    });
  });
});
