/**
 * RW-05 — Behavioral Tests
 * Fix home.js auto-carousel crash when zero .myslideshow elements exist
 *
 * Core assertion: loading home.js on a page with no .myslideshow elements
 * produces zero TypeErrors and does NOT schedule repeated setTimeout calls.
 */

"use strict";

const {
  createDom,
  injectScriptFile,
  loadJQuery,
  flush,
  hasError,
  suppressLongTimers,
} = require("../../_helpers/harness");

describe("RW-05 — carousel() guard when no slides present (behavioral)", () => {
  test("home.js does not throw TypeError when no .myslideshow elements exist", async () => {
    // DOM with NO .myslideshow elements
    const { window, errors } = createDom({
      html: `<div id="nav"></div><a class="top-link"></a>`,
      fragment: true,
    });
    suppressLongTimers(window);
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    expect(hasError(errors, /Cannot read properties of undefined/)).toBe(false);
    expect(hasError(errors, /TypeError/)).toBe(false);
    expect(hasError(errors, /style/)).toBe(false);
  });

  test("setTimeout is not called repeatedly when no slides exist", async () => {
    const { window, errors } = createDom({
      html: `<div></div>`,
      fragment: true,
    });

    let longTimerCount = 0;
    const real = window.setTimeout.bind(window);
    window.setTimeout = (fn, delay, ...args) => {
      if (typeof delay === "number" && delay >= 1000) {
        longTimerCount++;
        return 0; // suppress — don't actually schedule
      }
      return real(fn, delay, ...args);
    };

    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    // The 4000ms carousel loop must not fire when there are no slides
    expect(longTimerCount).toBe(0);
  });

  test("no console errors of any kind when loaded on a slide-free page", async () => {
    const { window, errors } = createDom({ html: "", fragment: true });
    suppressLongTimers(window);
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    // Filter to only script-execution errors (not resource-load warnings)
    const scriptErrors = errors.filter((e) => {
      const msg = (e && e.message) || (e && e.detail && e.detail.message) || "";
      return /TypeError|ReferenceError|Cannot read/.test(msg);
    });

    expect(scriptErrors).toHaveLength(0);
  });
});
