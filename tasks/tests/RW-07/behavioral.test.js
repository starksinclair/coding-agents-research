/**
 * RW-07 — Behavioral Tests
 * Refactor carousel JS into a reusable createCarousel(slideClass, dotClass) factory
 *
 * Core assertions:
 * - createCarousel() function exists
 * - Two instances created with different class names operate independently
 * - next, prev, goTo work correctly on each instance
 */

"use strict";

const {
  createDom,
  injectScriptFile,
  loadJQuery,
  flush,
  suppressLongTimers,
} = require("../../_helpers/harness");

function buildTwoCarouselDom() {
  const html = `
    <!-- Instance A -->
    <div class="myslideshow" style="display:block">A1</div>
    <div class="myslideshow" style="display:none">A2</div>
    <div class="myslideshow" style="display:none">A3</div>
    <span class="dot"></span><span class="dot"></span><span class="dot"></span>

    <!-- Instance B -->
    <div class="gslideshow" style="display:block">B1</div>
    <div class="gslideshow" style="display:none">B2</div>
    <div class="gslideshow" style="display:none">B3</div>
    <span class="gdot"></span><span class="gdot"></span><span class="gdot"></span>
  `;
  const { window, document } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document };
}

function visibleIdx(document, className) {
  const slides = Array.from(document.getElementsByClassName(className));
  return slides.findIndex((el) => el.style.display === "block") + 1;
}

describe("RW-07 — createCarousel factory produces independent instances (behavioral)", () => {
  test("createCarousel function exists on window after loading JS files", async () => {
    const { window } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    expect(typeof window.createCarousel).toBe("function");
  });

  test("two instances created with different classes operate independently", async () => {
    const { window, document } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const carouselA = window.createCarousel("myslideshow", "dot");
    const carouselB = window.createCarousel("gslideshow", "gdot");

    carouselA.next();

    expect(visibleIdx(document, "myslideshow")).toBe(2);
    expect(visibleIdx(document, "gslideshow")).toBe(1); // B untouched
  });

  test("instance.next() advances the carousel forward", async () => {
    const { window, document } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const carouselA = window.createCarousel("myslideshow", "dot");
    carouselA.next();
    expect(visibleIdx(document, "myslideshow")).toBe(2);
    carouselA.next();
    expect(visibleIdx(document, "myslideshow")).toBe(3);
  });

  test("instance.prev() moves the carousel backward", async () => {
    const { window, document } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const carouselA = window.createCarousel("myslideshow", "dot");
    carouselA.next(); // → 2
    carouselA.prev(); // → 1
    expect(visibleIdx(document, "myslideshow")).toBe(1);
  });

  test("instance.goTo(n) jumps directly to the specified slide", async () => {
    const { window, document } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const carouselA = window.createCarousel("myslideshow", "dot");
    carouselA.goTo(3);
    expect(visibleIdx(document, "myslideshow")).toBe(3);
    carouselA.goTo(1);
    expect(visibleIdx(document, "myslideshow")).toBe(1);
  });

  test("next() wraps from last slide back to first", async () => {
    const { window, document } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const carouselA = window.createCarousel("myslideshow", "dot");
    carouselA.next(); carouselA.next(); carouselA.next(); // 2, 3, wrap to 1
    expect(visibleIdx(document, "myslideshow")).toBe(1);
  });

  test("prev() wraps from first slide back to last", async () => {
    const { window, document } = buildTwoCarouselDom();
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    const carouselA = window.createCarousel("myslideshow", "dot");
    carouselA.prev(); // wrap to 3
    expect(visibleIdx(document, "myslideshow")).toBe(3);
  });
});
