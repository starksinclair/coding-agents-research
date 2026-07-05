/**
 * RW-06 — Behavioral
 * Client-side validation must be added to the login/register modal forms:
 *   - invalid email / empty password / empty register field  -> submission is
 *     prevented AND an inline error message becomes visible
 *   - a valid submission -> no error messages are shown (form proceeds)
 *
 * The page's own `<script src="js/...">` tags are loaded, so validation added to
 * home.js OR to a new file wired into the page is exercised either way. An "error
 * message" is detected via the common conventions (a visible, non-empty element whose
 * class/id/role marks it as an error/invalid/danger message).
 *
 * Baseline fails: the forms have no validation, so nothing is prevented and no error
 * elements appear.
 */
const {
  createDom,
  loadJQuery,
  injectScriptFile,
  injectPageScripts,
  flush,
  parseHtmlFile,
  codebasePath,
} = require("../../_helpers/harness");

const ERROR_SELECTOR =
  '[class*="error" i],[class*="invalid" i],[class*="danger" i],[class*="warn" i],[id*="error" i],[role="alert"]';

function isVisible(window, el) {
  let node = el;
  while (node && node.nodeType === 1) {
    const style = window.getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return false;
    if (node.getAttribute && node.getAttribute("hidden") !== null) return false;
    node = node.parentElement;
  }
  return true;
}

function shownErrors(window, root) {
  return Array.from(root.querySelectorAll(ERROR_SELECTOR))
    .filter((el) => isVisible(window, el) && el.textContent.trim().length > 0)
    .map((el) => el.textContent.trim());
}

function submit(window, form) {
  const ev = new window.Event("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(ev);
  return ev;
}

function modalsHtml() {
  const doc = parseHtmlFile(codebasePath("home.html"));
  const id01 = doc.querySelector("#id01");
  const id02 = doc.querySelector("#id02");
  return `<div class="myslideshow"></div>${id01.outerHTML}${id02.outerHTML}`;
}

async function setup() {
  const ctx = createDom({ html: modalsHtml() });
  loadJQuery(ctx.window);
  // suppress home.js's 4000ms carousel loop but let jQuery ready fire
  const real = ctx.window.setTimeout.bind(ctx.window);
  ctx.window.setTimeout = (fn, delay, ...a) =>
    typeof delay === "number" && delay >= 1000 ? 0 : real(fn, delay, ...a);
  injectPageScripts(ctx.window, "home.html");
  await flush(ctx.window);
  ctx.errors.length = 0;
  return ctx;
}

describe("RW-06 behavioral: login form validation", () => {
  test("invalid email + empty password prevents submit and shows inline errors", async () => {
    const { window, document } = await setup();
    const form = document.querySelector(".loginbox form");
    expect(form).not.toBeNull();

    form.querySelector('input[name="text"]').value = "not-an-email";
    form.querySelector('input[name="password"]').value = "";

    const ev = submit(window, form);
    await flush(window);

    expect(ev.defaultPrevented).toBe(true);
    expect(shownErrors(window, form.closest(".loginbox") || document).length)
      .toBeGreaterThan(0);
  });

  test("a valid email + non-empty password shows no error messages", async () => {
    const { window, document } = await setup();
    const form = document.querySelector(".loginbox form");

    form.querySelector('input[name="text"]').value = "user@example.com";
    form.querySelector('input[name="password"]').value = "s3cret!";

    submit(window, form);
    await flush(window);

    expect(shownErrors(window, form.closest(".loginbox") || document)).toEqual([]);
  });
});

describe("RW-06 behavioral: register form validation", () => {
  test("empty email/username on the register form shows an inline error", async () => {
    const { window, document } = await setup();
    const form =
      document.querySelector(".registerbo form") ||
      document.querySelector(".registerbox form");
    expect(form).not.toBeNull();

    form.querySelector('input[name="text"]').value = "";

    const ev = submit(window, form);
    await flush(window);

    const scope = form.closest(".registerbo") || form.closest(".registerbox") || document;
    expect(ev.defaultPrevented).toBe(true);
    expect(shownErrors(window, scope).length).toBeGreaterThan(0);
  });
});
