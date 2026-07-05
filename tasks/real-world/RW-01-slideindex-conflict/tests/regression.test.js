/**
 * RW-01 — Regression
 * Each carousel's own next / prev / dot navigation must keep working correctly when
 * that carousel is operated in isolation. This holds on the baseline and must keep
 * holding after the scoping fix (no functional regression to a single carousel).
 */
const {
  createDom,
  loadJQuery,
  injectScriptFile,
} = require("../../_helpers/harness");

function carousel(slideClass, dotClass, n = 3) {
  const slides = Array.from(
    { length: n },
    () => `<div class="${slideClass}"></div>`
  ).join("");
  const dots = Array.from(
    { length: n },
    () => `<span class="${dotClass}"></span>`
  ).join("");
  return slides + dots;
}

function pageMarkup() {
  return [
    carousel("mySlides1", "demo"),
    carousel("mySlides3", "demo1"),
    carousel("mySlides4", "demo2"),
    carousel("mySlides5", "demo3"),
  ].join("");
}

function visibleIndex(document, slideClass) {
  const slides = Array.from(document.getElementsByClassName(slideClass));
  return slides.findIndex((s) => s.style.display === "block");
}

function loadWeb() {
  const ctx = createDom({ html: pageMarkup() });
  loadJQuery(ctx.window);
  injectScriptFile(ctx.window, "js/web.js");
  return ctx;
}

describe("RW-01 regression: single-carousel navigation still works", () => {
  test("next / prev / wrap-around work for the mySlides1 carousel", () => {
    const { window, document } = loadWeb();

    window.currentDiv(1);
    expect(visibleIndex(document, "mySlides1")).toBe(0);

    window.plusDivs(1);
    expect(visibleIndex(document, "mySlides1")).toBe(1);

    window.plusDivs(1);
    expect(visibleIndex(document, "mySlides1")).toBe(2);

    window.plusDivs(1); // wrap forward -> slide 1
    expect(visibleIndex(document, "mySlides1")).toBe(0);

    window.plusDivs(-1); // wrap backward -> slide 3
    expect(visibleIndex(document, "mySlides1")).toBe(2);
  });

  test("dot navigation jumps directly to the chosen slide and marks the active dot", () => {
    const { window, document } = loadWeb();

    window.currentDiv(3);
    expect(visibleIndex(document, "mySlides1")).toBe(2);

    const dots = document.getElementsByClassName("demo");
    expect(dots[2].className).toMatch(/w3-white/);

    window.currentDiv(1);
    expect(visibleIndex(document, "mySlides1")).toBe(0);
    expect(dots[0].className).toMatch(/w3-white/);
    expect(dots[2].className).not.toMatch(/w3-white/);
  });

  test("a second carousel (mySlides3) also navigates correctly on its own", () => {
    const { window, document } = loadWeb();

    window.currentDiv1(1);
    expect(visibleIndex(document, "mySlides3")).toBe(0);

    window.plusDivs1(1);
    expect(visibleIndex(document, "mySlides3")).toBe(1);

    window.plusDivs1(-1);
    expect(visibleIndex(document, "mySlides3")).toBe(0);
  });
});
