/**
 * RW-07 — Behavioral
 * A single `createCarousel(slideClass, dotClass)` factory must exist and return an
 * object with `{ next, prev, goTo }`. Two instances created with different class names
 * must operate independently, and next / prev / goTo must each work.
 *
 * The page's carousel scripts are loaded; `createCarousel` is expected as a global (the
 * factory that all carousels are built from). Baseline fails: no such factory exists.
 */
const {
  createDom,
  loadJQuery,
  injectPageScripts,
  suppressLongTimers,
} = require("../../_helpers/harness");

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
  const html =
    carousel("tSlidesA", "tDotsA") +
    carousel("tSlidesB", "tDotsB") +
    `<div class="myslideshow"></div>`;
  const ctx = createDom({ html });
  loadJQuery(ctx.window);
  suppressLongTimers(ctx.window);
  injectPageScripts(ctx.window, "home.html");
  return ctx;
}

describe("RW-07 behavioral: createCarousel factory", () => {
  test("a global createCarousel factory exists and returns { next, prev, goTo }", () => {
    const { window } = setup();
    expect(typeof window.createCarousel).toBe("function");

    const a = window.createCarousel("tSlidesA", "tDotsA");
    expect(typeof a.next).toBe("function");
    expect(typeof a.prev).toBe("function");
    expect(typeof a.goTo).toBe("function");
  });

  test("two instances advance independently with next()", () => {
    const { window, document } = setup();
    const a = window.createCarousel("tSlidesA", "tDotsA");
    const b = window.createCarousel("tSlidesB", "tDotsB");

    b.next();
    const i1 = visibleIndex(document, "tSlidesB");
    expect(i1).toBeGreaterThanOrEqual(0);

    // Operate carousel A in between — must not affect B.
    a.next();
    a.next();

    b.next();
    const i2 = visibleIndex(document, "tSlidesB");
    expect(i2).toBe((i1 + 1) % 3);
  });

  test("prev() moves an instance back by one", () => {
    const { window, document } = setup();
    const b = window.createCarousel("tSlidesB", "tDotsB");

    b.next();
    b.next();
    const j1 = visibleIndex(document, "tSlidesB");
    b.prev();
    const j2 = visibleIndex(document, "tSlidesB");
    expect(j2).toBe((j1 - 1 + 3) % 3);
  });

  test("goTo() jumps to the chosen (1-based) slide, independently per instance", () => {
    const { window, document } = setup();
    const a = window.createCarousel("tSlidesA", "tDotsA");
    const b = window.createCarousel("tSlidesB", "tDotsB");

    b.goTo(2);
    expect(visibleIndex(document, "tSlidesB")).toBe(1);

    // Jumping A around must not move B.
    a.goTo(1);
    a.goTo(3);
    expect(visibleIndex(document, "tSlidesB")).toBe(1);
  });
});
