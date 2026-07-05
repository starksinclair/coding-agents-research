/**
 * RW-07 — Regression
 * The refactor must (a) eliminate the copy-pasted, globally-scoped suffix functions
 * (`showDi4`, `showDi5`, `showDivs1`, `showDiv1`, ...) and (b) keep the real carousel
 * class selectors working — i.e. the factory can drive a carousel built with the
 * site's existing class names.
 *
 * Fails on the un-refactored baseline (the suffix functions still live in global scope).
 */
const {
  createDom,
  loadJQuery,
  injectPageScripts,
  suppressLongTimers,
} = require("../../_helpers/harness");

// A representative sample of the duplicated per-carousel functions across the JS files.
const LEGACY_SUFFIX_FUNCTIONS = [
  "showDivs1",
  "showDivs2",
  "showDivs3",
  "showDi4",
  "showDi5",
  "showDi6",
  "showDi7",
  "showDiv1",
  "showDiv2",
  "showDiv3",
  "showDi1",
  "showDi2",
  "showDi3",
];

function carousel(slideClass, dotClass, n = 3) {
  const slides = Array.from({ length: n }, () => `<div class="${slideClass}"></div>`).join("");
  const dots = Array.from({ length: n }, () => `<span class="${dotClass}"></span>`).join("");
  return slides + dots;
}

function visibleIndex(document, slideClass) {
  const slides = Array.from(document.getElementsByClassName(slideClass));
  return slides.findIndex((s) => s.style.display === "block");
}

function setup() {
  // Include a real carousel class pair (mySlides1 / demo) that existed before the refactor.
  const html = carousel("mySlides1", "demo") + `<div class="myslideshow"></div>`;
  const ctx = createDom({ html });
  loadJQuery(ctx.window);
  suppressLongTimers(ctx.window);
  injectPageScripts(ctx.window, "home.html");
  return ctx;
}

describe("RW-07 regression: duplication removed, selectors preserved", () => {
  test("the copy-pasted suffix functions no longer exist in global scope", () => {
    const { window } = setup();
    const leftover = LEGACY_SUFFIX_FUNCTIONS.filter(
      (name) => typeof window[name] === "function"
    );
    expect(leftover).toEqual([]);
  });

  test("an existing carousel class selector still works through the factory", () => {
    const { window, document } = setup();
    expect(typeof window.createCarousel).toBe("function");

    const c = window.createCarousel("mySlides1", "demo");
    c.next();
    const first = visibleIndex(document, "mySlides1");
    expect(first).toBeGreaterThanOrEqual(0);

    c.next();
    const second = visibleIndex(document, "mySlides1");
    expect(second).toBe((first + 1) % 3);
  });
});
