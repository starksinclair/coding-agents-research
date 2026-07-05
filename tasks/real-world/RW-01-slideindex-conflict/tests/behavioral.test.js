/**
 * RW-01 — Behavioral
 * Two carousels share a single global `slideIndex`, so advancing one corrupts the
 * other. `web.js` alone demonstrates this: `showDivs`/`plusDivs` (mySlides1) and
 * `showDivs1`/`plusDivs1` (mySlides3) both mutate the same top-level `slideIndex`.
 *
 * The test advances carousel A a few times, then clicks "next"/"prev" on carousel B
 * and asserts B moves by exactly one relative to its OWN position. On the shared-state
 * baseline, B jumps to whatever index A left behind. Passes once each carousel keeps
 * its own independent index.
 *
 * Relies only on the globally-exposed handlers the HTML `onclick`s already call
 * (`plusDivs`, `currentDiv`, `plusDivs1`, ...), which the fix must keep working.
 */
const {
  createDom,
  loadJQuery,
  injectScriptFile,
} = require("../../_helpers/harness");

// web.js expects these four carousels present at load time (it initializes each).
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
    carousel("mySlides1", "demo"), // controlled by showDivs / plusDivs / currentDiv
    carousel("mySlides3", "demo1"), // controlled by showDivs1 / plusDivs1 / currentDiv1
    carousel("mySlides4", "demo2"), // showDivs2
    carousel("mySlides5", "demo3"), // showDivs3
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

describe("RW-01 behavioral: independent carousel indices", () => {
  test('clicking "next" on carousel B advances B by one, regardless of carousel A', () => {
    const { window, document } = loadWeb();

    // Put carousel B (mySlides1) on slide 1.
    window.currentDiv(1);
    expect(visibleIndex(document, "mySlides1")).toBe(0);

    // Advance carousel A (mySlides3) twice.
    window.plusDivs1(1);
    window.plusDivs1(1);

    // Now click "next" once on carousel B: it should move from slide 1 -> slide 2.
    window.plusDivs(1);

    expect(visibleIndex(document, "mySlides1")).toBe(1);
  });

  test('clicking "prev" on carousel B moves B back by one, regardless of carousel A', () => {
    const { window, document } = loadWeb();

    // Put carousel B (mySlides1) on slide 2.
    window.currentDiv(2);
    expect(visibleIndex(document, "mySlides1")).toBe(1);

    // Advance carousel A (mySlides3) twice.
    window.plusDivs1(1);
    window.plusDivs1(1);

    // Click "prev" once on carousel B: it should move from slide 2 -> slide 1.
    window.plusDivs(-1);

    expect(visibleIndex(document, "mySlides1")).toBe(0);
  });

  test("advancing carousel A does not change which slide carousel B has visible", () => {
    const { window, document } = loadWeb();

    window.currentDiv(1); // B -> slide 1
    window.currentDiv1(1); // A -> slide 1
    const before = visibleIndex(document, "mySlides1");

    window.plusDivs1(1); // advance A only
    window.plusDivs1(1);

    // B has not been re-navigated, so its own next click must still land on slide 2.
    window.plusDivs(1);
    expect(visibleIndex(document, "mySlides1")).toBe(before + 1);
  });
});
