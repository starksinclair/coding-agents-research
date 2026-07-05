/**
 * RW-03 — Regression
 * The login (#id01) and register (#id02) modals, plus the login<->register toggle,
 * must keep opening correctly and must be unaffected by the forgot-password fix.
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

function modalsHtml() {
  const doc = parseHtmlFile(codebasePath("home.html"));
  const id01 = doc.querySelector("#id01");
  const id02 = doc.querySelector("#id02");
  if (!id01 || !id02) throw new Error("Could not find modal markup in home.html");
  return `
    <div class="myslideshow"></div>
    <a id="sign-in" href="#" onclick="document.getElementById('id01').style.display='block'">Sign in</a>
    <button id="join" onclick="document.getElementById('id02').style.display='block'">Join</button>
    ${id01.outerHTML}
    ${id02.outerHTML}
  `;
}

async function setup() {
  const ctx = createDom({ html: modalsHtml() });
  loadJQuery(ctx.window);
  suppressLongTimers(ctx.window);
  injectScriptFile(ctx.window, "js/home.js");
  await flush(ctx.window);
  ctx.errors.length = 0;
  return ctx;
}

describe("RW-03 regression: login/register modals still open", () => {
  test("the sign-in trigger opens the login modal (#id01) with no error", async () => {
    const { window, document, errors } = await setup();

    click(window, document.querySelector("#sign-in"));
    await flush(window);

    expect(document.querySelector("#id01").style.display).toBe("block");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("the join trigger opens the register modal (#id02) with no error", async () => {
    const { window, document, errors } = await setup();

    click(window, document.querySelector("#join"));
    await flush(window);

    expect(document.querySelector("#id02").style.display).toBe("block");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });

  test("the login->register toggle (.log) still swaps the boxes", async () => {
    const { window, document } = await setup();

    const log = document.querySelector(".log");
    expect(log).not.toBeNull();

    click(window, log);
    await flush(window);

    expect(document.querySelector("#id01 .loginbox").style.display).toBe("none");
    expect(document.querySelector("#id01 .registerbox").style.display).toBe("block");
  });
});
