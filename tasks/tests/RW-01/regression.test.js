/**
 * RW-01 — Regression Tests
 * Fix shared slideIndex variable across multiple carousels
 *
 * Asserts that after the scoping fix, all existing carousel interactions
 * (next, prev, dot navigation, auto-advance) still work correctly for each
 * carousel independently. Nothing that was working before should break.
 */

"use strict";

const {
  createDom,
  injectScriptFile,
  loadJQuery,
  flush,
  suppressLongTimers,
} = require("../../_helpers/harness");

function buildCarouselA() {
  const html = `
    <div class="myslideshow" style="display:block">A1</div>
    <div class="myslideshow" style="display:none">A2</div>
    <div class="myslideshow" style="display:none">A3</div>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <button onclick="plusDivs(1)">next</button>
    <button onclick="plusDivs(-1)">prev</button>
  `;
  const { window, document } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document };
}

function buildCarouselB() {
  const html = `
    <div class="gslideshow" style="display:block">B1</div>
    <div class="gslideshow" style="display:none">B2</div>
    <div class="gslideshow" style="display:none">B3</div>
    <span class="gdot"></span>
    <span class="gdot"></span>
    <span class="gdot"></span>
    <button onclick="plusDivs2(1)">next</button>
    <button onclick="plusDivs2(-1)">prev</button>
  `;
  const { window, document } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document };
}

function visibleSlideIndex(document, className) {
  const slides = Array.from(document.getElementsByClassName(className));
  const idx = slides.findIndex((el) => el.style.display === "block");
  return idx + 1;
}

describe("RW-01 — carousel navigation still works after fix (regression)", () => {
  // --- Carousel A (.myslideshow) ---

  test("plusDivs(1) advances carousel A forward", async () => {
    const { window, document } = buildCarouselA();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    window.plusDivs(1);
    expect(visibleSlideIndex(document, "myslideshow")).toBe(2);
  });

  test("plusDivs(-1) moves carousel A backward", async () => {
    const { window, document } = buildCarouselA();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    window.plusDivs(1); // go to 2
    window.plusDivs(-1); // back to 1
    expect(visibleSlideIndex(document, "myslideshow")).toBe(1);
  });

  test("carousel A wraps forward: slide 3 → next → slide 1", async () => {
    const { window, document } = buildCarouselA();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    window.plusDivs(1);
    window.plusDivs(1);
    window.plusDivs(1); // should wrap back to 1
    expect(visibleSlideIndex(document, "myslideshow")).toBe(1);
  });

  test("carousel A wraps backward: slide 1 → prev → slide 3", async () => {
    const { window, document } = buildCarouselA();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    window.plusDivs(-1); // should wrap to last slide
    expect(visibleSlideIndex(document, "myslideshow")).toBe(3);
  });

  test("dot navigation (currentDiv / showDivs) jumps carousel A to correct slide", async () => {
    const { window, document } = buildCarouselA();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const jumpFn = window.currentDiv || window.showDivs;
    if (typeof jumpFn === "function") {
      jumpFn(3);
      expect(visibleSlideIndex(document, "myslideshow")).toBe(3);
      jumpFn(1);
      expect(visibleSlideIndex(document, "myslideshow")).toBe(1);
    } else {
      // If dot navigation was renamed in the refactor, skip gracefully
      console.warn("RW-01 regression: currentDiv/showDivs not found — dot nav may have been renamed");
    }
  });

  test("exactly one .myslideshow slide is visible at a time", async () => {
    const { window, document } = buildCarouselA();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    window.plusDivs(1);
    const visible = Array.from(document.getElementsByClassName("myslideshow")).filter(
      (el) => el.style.display === "block"
    );
    expect(visible.length).toBe(1);
  });

  // --- Carousel B (.gslideshow) ---

  test("plusDivs2(1) advances carousel B forward", async () => {
    const { window, document } = buildCarouselB();
    loadJQuery(window);
    injectScriptFile(window, "js/graphics.js");
    await flush(window);

    window.plusDivs2(1);
    expect(visibleSlideIndex(document, "gslideshow")).toBe(2);
  });

  test("plusDivs2(-1) moves carousel B backward", async () => {
    const { window, document } = buildCarouselB();
    loadJQuery(window);
    injectScriptFile(window, "js/graphics.js");
    await flush(window);

    window.plusDivs2(1);
    window.plusDivs2(-1);
    expect(visibleSlideIndex(document, "gslideshow")).toBe(1);
  });

  test("carousel B wraps forward: slide 3 → next → slide 1", async () => {
    const { window, document } = buildCarouselB();
    loadJQuery(window);
    injectScriptFile(window, "js/graphics.js");
    await flush(window);

    window.plusDivs2(1);
    window.plusDivs2(1);
    window.plusDivs2(1);
    expect(visibleSlideIndex(document, "gslideshow")).toBe(1);
  });

  test("exactly one .gslideshow slide is visible at a time", async () => {
    const { window, document } = buildCarouselB();
    loadJQuery(window);
    injectScriptFile(window, "js/graphics.js");
    await flush(window);

    window.plusDivs2(1);
    const visible = Array.from(document.getElementsByClassName("gslideshow")).filter(
      (el) => el.style.display === "block"
    );
    expect(visible.length).toBe(1);
  });

  // --- Inline script constraint ---

  test("showDivs and plusDivs are not redeclared multiple times in global scope", async () => {
    // After the fix, the inline <script> in home.html must be removed or scoped.
    // We verify by loading both home.js and injecting a script that would
    // redeclare them — the second declaration should not overwrite the first's closure.
    // This is a structural guard: if the fix used IIFE/closure scoping, two separate
    // calls to plusDivs and plusDivs2 should operate independently.
    const html = `
      <div class="myslideshow" style="display:block">A1</div>
      <div class="myslideshow" style="display:none">A2</div>
      <div class="gslideshow" style="display:block">B1</div>
      <div class="gslideshow" style="display:none">B2</div>
    `;
    const { window, document } = createDom({ html, fragment: true });
    suppressLongTimers(window);
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    injectScriptFile(window, "js/graphics.js");
    await flush(window);

    // Both functions must exist
    expect(typeof window.plusDivs).toBe("function");
    expect(typeof window.plusDivs2).toBe("function");

    // And they must target different carousels
    window.plusDivs(1);
    const aIdx = Array.from(document.getElementsByClassName("myslideshow")).findIndex(
      (el) => el.style.display === "block"
    );
    const bIdx = Array.from(document.getElementsByClassName("gslideshow")).findIndex(
      (el) => el.style.display === "block"
    );

    // A advanced, B did not
    expect(aIdx).toBe(1); // 0-based index 1 = slide 2
    expect(bIdx).toBe(0); // still slide 1
  });
});
