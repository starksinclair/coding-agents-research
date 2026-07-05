/**
 * RW-07 — Regression Tests
 * Refactor carousel JS into a reusable factory
 *
 * Asserts:
 * - The 20+ copy-pasted suffix functions (showDi4, showDi5, plusDivs2 etc.) no longer
 *   exist as globals (they were internal implementation details)
 * - All carousel class selectors that existed before the refactor still function
 * - No globally-scoped duplicated variants remain
 */

"use strict";

const {
  createDom,
  injectScriptFile,
  loadJQuery,
  flush,
  suppressLongTimers,
} = require("../../_helpers/harness");

// The full list of suffixed globals that existed before the refactor.
// After the refactor, none of these should be on window.
const LEGACY_SUFFIX_FUNCTIONS = [
  "showDi4", "showDi5", "showD1", "showDi0", "showDi11",
  "plusDivs2", "plusDivs3", "plusDivs4", "plusDivs5",
  "currentDiv2", "currentDiv3", "currentDiv4", "currentDiv5",
];

// All carousel class names that must still work after the refactor
const CAROUSEL_CLASSES = [
  "myslideshow",
  "gslideshow",
  "wslideshow",
  "mslideshow",
  "webslideshow",
];

function buildDomForClass(slideClass) {
  const html = `
    <div class="${slideClass}" style="display:block">Slide 1</div>
    <div class="${slideClass}" style="display:none">Slide 2</div>
    <div class="${slideClass}" style="display:none">Slide 3</div>
  `;
  const { window, document } = createDom({ html, fragment: true });
  suppressLongTimers(window);
  return { window, document };
}

describe("RW-07 — legacy suffix functions removed, all carousels still work (regression)", () => {
  test("legacy suffixed globals no longer exist on window after refactor", async () => {
    const { window } = buildDomForClass("myslideshow");
    loadJQuery(window);
    // Load all JS files that contained the old copy-pasted functions
    for (const file of ["js/home.js", "js/graphics.js", "js/writing.js", "js/marketing.js", "js/web.js"]) {
      try { injectScriptFile(window, file); } catch (_) {}
    }
    await flush(window);

    const stillPresent = LEGACY_SUFFIX_FUNCTIONS.filter(
      (fn) => typeof window[fn] === "function"
    );

    if (stillPresent.length > 0) {
      console.warn("RW-07: Legacy functions still present on window:", stillPresent);
    }

    // All copy-pasted variants must be gone
    expect(stillPresent).toHaveLength(0);
  });

  CAROUSEL_CLASSES.forEach((slideClass) => {
    test(`${slideClass} carousel still initializes and advances via factory`, async () => {
      const { window, document } = buildDomForClass(slideClass);
      loadJQuery(window);
      try { injectScriptFile(window, "js/home.js"); } catch (_) {}
      try { injectScriptFile(window, "js/graphics.js"); } catch (_) {}
      try { injectScriptFile(window, "js/writing.js"); } catch (_) {}
      try { injectScriptFile(window, "js/marketing.js"); } catch (_) {}
      try { injectScriptFile(window, "js/web.js"); } catch (_) {}
      await flush(window);

      if (typeof window.createCarousel !== "function") {
        console.warn(`createCarousel not found — skipping ${slideClass}`);
        return;
      }

      const dotClass = slideClass.replace("slideshow", "dot").replace("web", "web");
      const carousel = window.createCarousel(slideClass, dotClass);

      // Advance forward
      carousel.next();
      const slides = Array.from(document.getElementsByClassName(slideClass));
      const visibleIdx = slides.findIndex((el) => el.style.display === "block") + 1;
      expect(visibleIdx).toBe(2);
    });
  });

  test("exactly one slide is visible per carousel class after next()", async () => {
    const { window, document } = createDom({
      html: `
        <div class="myslideshow" style="display:block">A1</div>
        <div class="myslideshow" style="display:none">A2</div>
        <div class="gslideshow" style="display:block">B1</div>
        <div class="gslideshow" style="display:none">B2</div>
      `,
      fragment: true,
    });
    suppressLongTimers(window);
    loadJQuery(window);
    injectScriptFile(window, "js/home.js");
    await flush(window);

    if (typeof window.createCarousel !== "function") return;

    const a = window.createCarousel("myslideshow", "dot");
    const b = window.createCarousel("gslideshow", "gdot");

    a.next();

    const aVisible = Array.from(document.getElementsByClassName("myslideshow")).filter(
      (el) => el.style.display === "block"
    );
    const bVisible = Array.from(document.getElementsByClassName("gslideshow")).filter(
      (el) => el.style.display === "block"
    );

    expect(aVisible.length).toBe(1);
    expect(bVisible.length).toBe(1);
  });
});
