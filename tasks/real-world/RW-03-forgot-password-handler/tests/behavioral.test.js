/**
 * RW-03 — Behavioral
 * Clicking the "Forgot Password?" trigger must open the `.forgotpas` modal without
 * throwing. The markup is extracted from the ACTUAL page file, so whatever the agent
 * changes the broken inline `onclick="...id0l4..."` into is what gets exercised.
 *
 * Baseline: the inline handler dereferences `getElementById('id0l4')` (which is null)
 * and throws a TypeError during the click. Passes once the dead inline handler is
 * removed/repointed so the existing `.forgotpas` jQuery pattern shows the modal.
 */
const {
  createDom,
  loadJQuery,
  injectScriptFile,
  flush,
  hasError,
  parseHtmlFile,
  codebasePath,
  click,
  suppressLongTimers,
} = require("../../_helpers/harness");

function loginModalHtml() {
  const doc = parseHtmlFile(codebasePath("home.html"));
  const modal = doc.querySelector("#id01");
  if (!modal) throw new Error("Could not find #id01 login modal in home.html");
  // A .myslideshow keeps home.js from crashing at load so its jQuery handlers attach.
  return `<div class="myslideshow"></div>${modal.outerHTML}`;
}

async function setup() {
  const ctx = createDom({ html: loginModalHtml() });
  loadJQuery(ctx.window);
  suppressLongTimers(ctx.window);
  injectScriptFile(ctx.window, "js/home.js");
  await flush(ctx.window); // let jQuery attach the $(fn) ready handlers
  ctx.errors.length = 0; // ignore unrelated load-time noise; only judge the click
  return ctx;
}

describe("RW-03 behavioral: forgot-password trigger", () => {
  test("clicking Forgot Password? throws no null-reference error", async () => {
    const { window, document, errors } = await setup();

    const trigger = document.querySelector(".forgot");
    expect(trigger).not.toBeNull();

    click(window, trigger);
    await flush(window);

    expect(hasError(errors, /TypeError/)).toBe(false);
    expect(hasError(errors, /Cannot set propert.*of null/i)).toBe(false);
    expect(hasError(errors, /id0l4|id0l3/)).toBe(false);
  });

  test("clicking Forgot Password? makes the .forgotpas modal visible", async () => {
    const { window, document } = await setup();

    const trigger = document.querySelector(".forgot");
    click(window, trigger);
    await flush(window);

    const forgot = document.querySelector(".forgotpas");
    expect(forgot).not.toBeNull();
    expect(forgot.style.display).toBe("block");
  });
});
