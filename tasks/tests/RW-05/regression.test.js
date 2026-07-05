/**
 * RW-05 — Regression Tests
 * Fix home.js auto-carousel crash
 *
 * Asserts that on pages WITH .myslideshow elements, the carousel still
 * auto-advances, and next/prev navigation still works after adding the guard.
 */

"use strict";

const {
  createDom,
  injectScriptFile,
  loadJQuery,
  flush,
  suppressLongTimers,
} = require("../../_helpers/harness");

function buildSlideDom() {
  const html = `
    <div class="myslideshow" style="display:block">Slide 1</div>
    <div class="myslideshow" style="display:none">Slide 2</div>
    <div class="myslideshow" style="display:none">Slide 3</div>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `;
  const { window, document, errors } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document, errors };
}

function visibleIdx(document) {
  const slides = Array.from(document.getElementsByClassName("myslideshow"));
  return slides.findIndex((el) => el.style.display === "block") + 1;
}

describe("RW-05 — carousel still works on pages with slides (regression)", () => {
  test("carousel initializes and shows slide 1 on load", async () => {
    const { window, document, errors } = buildSlideDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    expect(visibleIdx(document)).toBe(1);
  });

  test("setTimeout IS scheduled when slides exist (auto-advance loop)", async () => {
    const { window } = buildSlideDom();

    let longTimerScheduled = false;
    const real = window.setTimeout.bind(window);
    window.setTimeout = (fn, delay, ...args) => {
      if (typeof delay === "number" && delay >= 3000) {
        longTimerScheduled = true;
        return 0; // capture but suppress to avoid infinite loop
      }
      return real(fn, delay, ...args);
    };

    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    expect(longTimerScheduled).toBe(true);
  });

  test("plusDivs(1) still advances the carousel forward", async () => {
    const { window, document } = buildSlideDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    if (typeof window.plusDivs === "function") {
      window.plusDivs(1);
      expect(visibleIdx(document)).toBe(2);
    }
  });

  test("plusDivs(-1) still moves the carousel backward", async () => {
    const { window, document } = buildSlideDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    if (typeof window.plusDivs === "function") {
      window.plusDivs(1);
      window.plusDivs(-1);
      expect(visibleIdx(document)).toBe(1);
    }
  });

  test("exactly one slide is visible at a time after guard is added", async () => {
    const { window, document } = buildSlideDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    if (typeof window.plusDivs === "function") {
      window.plusDivs(1);
    }

    const visibleSlides = Array.from(
      document.getElementsByClassName("myslideshow")
    ).filter((el) => el.style.display === "block");

    expect(visibleSlides.length).toBe(1);
  });
});
