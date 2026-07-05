/**
 * RW-05 — Regression
 * Loads `home.js` on a page that DOES have `.myslideshow` elements and asserts the
 * auto-carousel still initializes (first slide shown), still schedules its 4000ms
 * timer, and still advances to the next slide when that timer fires.
 *
 * Must pass on the buggy baseline as well as after the fix (unaffected behaviour).
 */
const {
  createDom,
  loadJQuery,
  injectScriptFile,
  hasError,
} = require("../../_helpers/harness");

function slidesMarkup(n) {
  return Array.from({ length: n }, () => `<div class="myslideshow"></div>`).join("");
}

describe("RW-05 regression: home.js with .myslideshow present", () => {
  test("initializes the carousel, shows the first slide and schedules the timer", () => {
    const { window, document, errors } = createDom({ html: slidesMarkup(3) });
    loadJQuery(window);

    const scheduled = [];
    window.setTimeout = (fn, delay) => {
      scheduled.push({ fn, delay });
      return 0;
    };

    injectScriptFile(window, "js/home.js");

    const slides = document.getElementsByClassName("myslideshow");
    expect(hasError(errors, /TypeError/)).toBe(false);
    expect(slides[0].style.display).toBe("block");
    expect(slides[1].style.display).toBe("none");
    expect(slides[2].style.display).toBe("none");

    const carouselTimer = scheduled.find((s) => s.delay === 4000);
    expect(carouselTimer).toBeDefined();
  });

  test("advances to the next slide when the auto-advance timer fires", () => {
    const { window, document } = createDom({ html: slidesMarkup(3) });
    loadJQuery(window);

    const scheduled = [];
    window.setTimeout = (fn, delay) => {
      scheduled.push({ fn, delay });
      return 0;
    };

    injectScriptFile(window, "js/home.js");

    const slides = document.getElementsByClassName("myslideshow");
    expect(slides[0].style.display).toBe("block");

    // Fire the captured auto-advance callback once.
    const carouselTimer = scheduled.find((s) => s.delay === 4000);
    expect(carouselTimer).toBeDefined();
    carouselTimer.fn();

    expect(slides[0].style.display).toBe("none");
    expect(slides[1].style.display).toBe("block");
  });
});
