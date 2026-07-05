/**
 * RW-08 — Regression
 * Structural: no full HTML page may still contain the modal markup inline — it must
 * live in exactly one shared source. And the existing jQuery modal handlers (e.g. the
 * login<->register toggle) must keep working once the modals are present in the DOM.
 *
 * Fails on the un-extracted baseline (every page embeds the modal markup).
 */
const fs = require("fs");
const path = require("path");
const {
  CODEBASE,
  createDom,
  loadJQuery,
  injectScriptFile,
  flush,
  click,
  suppressLongTimers,
} = require("../../_helpers/harness");

function allHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "img") continue;
      out.push(...allHtmlFiles(full));
    } else if (entry.name.toLowerCase().endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

const isFullPage = (html) => /<footer[^>]*\bfooter\b/i.test(html) || /<header\s+class="header"/i.test(html);
// Signature unique to the inline login modal markup.
const hasInlineLoginModal = (html) => /class="[^"]*\bloginbox\b/.test(html);

describe("RW-08 regression: modal markup no longer inlined per page", () => {
  test("no full HTML page still contains the inline login modal markup", () => {
    const offenders = allHtmlFiles(CODEBASE)
      .filter((file) => {
        const html = fs.readFileSync(file, "utf8");
        return isFullPage(html) && hasInlineLoginModal(html);
      })
      .map((f) => path.relative(CODEBASE, f));

    expect(offenders).toEqual([]);
  });

  test("exactly one shared source contains the login modal markup", () => {
    const sources = allHtmlFiles(CODEBASE).filter((file) =>
      hasInlineLoginModal(fs.readFileSync(file, "utf8"))
    );
    expect(sources.length).toBe(1);
  });

  test("existing jQuery modal toggle (.log) still works with the shared modals", async () => {
    // Find the single modal partial and drive its handlers.
    const partial = allHtmlFiles(CODEBASE).find((file) => {
      const html = fs.readFileSync(file, "utf8");
      return hasInlineLoginModal(html) && !isFullPage(html);
    });
    expect(partial).toBeDefined();

    const ctx = createDom({
      html: `<div class="myslideshow"></div>${fs.readFileSync(partial, "utf8")}`,
    });
    loadJQuery(ctx.window);
    suppressLongTimers(ctx.window);
    injectScriptFile(ctx.window, "js/home.js");
    await flush(ctx.window);

    const log = ctx.document.querySelector(".log");
    expect(log).not.toBeNull();
    click(ctx.window, log);
    await flush(ctx.window);

    expect(ctx.document.querySelector("#id01 .loginbox").style.display).toBe("none");
    expect(ctx.document.querySelector("#id01 .registerbox").style.display).toBe("block");
  });
});
