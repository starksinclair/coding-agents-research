/**
 * RW-08 — Behavioral
 * After extraction, the three modals (login, register, forgot-password) must come from
 * a single shared partial and must still open/close via their triggers.
 *
 * jsdom does not implement `window.fetch`, so the runtime `fetch()+insertAdjacentHTML`
 * loader cannot be executed here. Instead this test locates the single modal partial the
 * refactor introduced, assembles it into a page (the end-state of "after page load"),
 * loads the page's jQuery handlers, and asserts the modals exist and open/close.
 *
 * Baseline fails: there is no extracted partial to find.
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
      if (entry.name === "img") continue; // skip the stray copy under img/janma
      out.push(...allHtmlFiles(full));
    } else if (entry.name.toLowerCase().endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

const isFullPage = (html) => /<footer[^>]*\bfooter\b/i.test(html) || /<header\s+class="header"/i.test(html);
const hasAllModals = (html) =>
  /loginbox|loginbo\b/.test(html) &&
  /registerbo/.test(html) &&
  /forgotpas/.test(html);

function findModalPartial() {
  return allHtmlFiles(CODEBASE).find((file) => {
    const html = fs.readFileSync(file, "utf8");
    return hasAllModals(html) && !isFullPage(html);
  });
}

async function setupWithPartial(partialFile) {
  const partialHtml = fs.readFileSync(partialFile, "utf8");
  const html = `
    <div class="myslideshow"></div>
    <a id="sign-in" href="#" onclick="document.getElementById('id01').style.display='block'">Sign in</a>
    <button id="join" onclick="document.getElementById('id02').style.display='block'">Join</button>
    ${partialHtml}
  `;
  const ctx = createDom({ html });
  loadJQuery(ctx.window);
  suppressLongTimers(ctx.window);
  injectScriptFile(ctx.window, "js/home.js");
  await flush(ctx.window);
  ctx.errors.length = 0;
  return ctx;
}

describe("RW-08 behavioral: modals load from a single partial", () => {
  test("a single shared modal partial exists (not an inline page)", () => {
    expect(findModalPartial()).toBeDefined();
  });

  test("all three modals are present once assembled from the partial", async () => {
    const partial = findModalPartial();
    expect(partial).toBeDefined();
    const { document } = await setupWithPartial(partial);

    expect(document.querySelector(".loginbox, .loginbo")).not.toBeNull();
    expect(document.querySelector(".registerbox, .registerbo")).not.toBeNull();
    expect(document.querySelector(".forgotpas")).not.toBeNull();
  });

  test("the login modal opens and closes via its trigger and close button", async () => {
    const partial = findModalPartial();
    expect(partial).toBeDefined();
    const { window, document } = await setupWithPartial(partial);

    const modal = document.querySelector("#id01");
    expect(modal).not.toBeNull();

    click(window, document.querySelector("#sign-in"));
    expect(modal.style.display).toBe("block");

    const closeBtn = modal.querySelector(".w3-display-topright");
    click(window, closeBtn);
    expect(modal.style.display).toBe("none");
  });

  test("the register modal opens via its trigger", async () => {
    const partial = findModalPartial();
    expect(partial).toBeDefined();
    const { window, document } = await setupWithPartial(partial);

    click(window, document.querySelector("#join"));
    expect(document.querySelector("#id02").style.display).toBe("block");
  });
});
