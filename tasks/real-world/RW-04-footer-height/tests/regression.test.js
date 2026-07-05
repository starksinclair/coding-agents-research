/**
 * RW-04 — Regression
 * The footer's cosmetic styling must be preserved by the height fix. The primary
 * `.footer` rule (home.css) defines the footer background colour; it must remain, so
 * that swapping height -> min-height does not accidentally strip other declarations.
 */
const fs = require("fs");
const { codebasePath } = require("../../_helpers/harness");

function footerRuleBodies(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, " ");
  const bodies = [];
  const re = /(?:^|[\s,{}>;])\.footer\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(stripped)) !== null) bodies.push(m[1]);
  return bodies;
}

describe("RW-04 regression: footer cosmetics preserved", () => {
  const homeCss = fs.readFileSync(codebasePath("css", "home.css"), "utf8");
  const bodies = footerRuleBodies(homeCss);

  test("home.css still defines a .footer rule", () => {
    expect(bodies.length).toBeGreaterThan(0);
  });

  test("the .footer background colour (#007180) is preserved", () => {
    const preserved = bodies.some((b) => /background-color\s*:\s*#007180/i.test(b));
    expect(preserved).toBe(true);
  });
});
