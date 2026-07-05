/**
 * RW-06 — Regression
 * Adding validation must not disturb the existing modal show/hide jQuery logic.
 * The login<->register toggles and the modal open triggers must still work, and the
 * existing handlers must not be removed.
 */
const {
  createDom,
  loadJQuery,
  injectPageScripts,
  flush,
  hasError,
  parseHtmlFile,
  codebasePath,
  click,
  suppressLongTimers,
} = require("../../_helpers/harness");

function pageHtml() {
  const doc = parseHtmlFile(codebasePath("home.html"));
  const id01 = doc.querySelector("#id01");
  const id02 = doc.querySelector("#id02");
  return `
    <div class="myslideshow"></div>
    <a id="sign-in" href="#" onclick="document.getElementById('id01').style.display='block'">Sign in</a>
    <button id="join" onclick="document.getElementById('id02').style.display='block'">Join</button>
    ${id01.outerHTML}
    ${id02.outerHTML}
  `;
}

async function setup() {
  const ctx = createDom({ html: pageHtml() });
  loadJQuery(ctx.window);
  suppressLongTimers(ctx.window);
  injectPageScripts(ctx.window, "home.html");
  await flush(ctx.window);
  ctx.errors.length = 0;
  return ctx;
}

describe("RW-06 regression: modal behaviour unaffected", () => {
  test("the login->register toggle (.log) still swaps the boxes", async () => {
    const { window, document } = await setup();

    click(window, document.querySelector(".log"));
    await flush(window);

    expect(document.querySelector("#id01 .loginbox").style.display).toBe("none");
    expect(document.querySelector("#id01 .registerbox").style.display).toBe("block");
  });

  test("the register->login toggle (.reg) still swaps the boxes back", async () => {
    const { window, document } = await setup();

    click(window, document.querySelector(".reg"));
    await flush(window);

    expect(document.querySelector("#id01 .loginbox").style.display).toBe("block");
    expect(document.querySelector("#id01 .registerbox").style.display).toBe("none");
  });

  test("the modal open triggers still work with no error", async () => {
    const { window, document, errors } = await setup();

    click(window, document.querySelector("#sign-in"));
    click(window, document.querySelector("#join"));
    await flush(window);

    expect(document.querySelector("#id01").style.display).toBe("block");
    expect(document.querySelector("#id02").style.display).toBe("block");
    expect(hasError(errors, /TypeError/)).toBe(false);
  });
});
