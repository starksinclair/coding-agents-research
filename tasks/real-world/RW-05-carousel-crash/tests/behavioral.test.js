/**
 * RW-05 — Behavioral
 * Loads `home.js` in a DOM with NO `.myslideshow` elements and asserts:
 *   - no TypeError is thrown ("Cannot read properties of undefined (reading 'style')")
 *   - the 4000ms auto-carousel timer is NOT scheduled when there are no slides
 *
 * Fails on the buggy baseline (carousel() dereferences x[slideIndex-1] on an empty
 * collection); passes once a guard clause halts carousel() when no slides exist.
 */
const {
  createDom,
  loadJQuery,
  injectScriptFile,
  hasError,
} = require("../../_helpers/harness");

describe("RW-05 behavioral: home.js on a page with no carousel", () => {
  test("does not throw a TypeError when no .myslideshow elements exist", () => {
    const { window, errors } = createDom({ html: `<div id="main"></div>` });
    loadJQuery(window);

    injectScriptFile(window, "js/home.js");

    expect(hasError(errors, /TypeError/)).toBe(false);
    expect(
      hasError(errors, /Cannot read propert.*of undefined/i)
    ).toBe(false);
  });

  test("does not schedule the 4000ms auto-advance timer when there are no slides", () => {
    const { window } = createDom({ html: `<div id="main"></div>` });
    loadJQuery(window);

    const timeoutDelays = [];
    window.setTimeout = (fn, delay) => {
      timeoutDelays.push(delay);
      return 0;
    };

    injectScriptFile(window, "js/home.js");

    expect(timeoutDelays).not.toContain(4000);
  });
});
