/**
 * RW-02 — Regression
 * Reordering / de-duplicating script tags must not disturb the Bootstrap component
 * markup on the affected pages. For every page that contains the login modal, the
 * modal containers and their trigger elements must still be present and intact.
 */
const path = require("path");
const { listHtmlFiles, parseHtmlFile } = require("../../_helpers/harness");

// Pages that carry the login/register modal markup.
const modalPages = listHtmlFiles().filter((file) => {
  const doc = parseHtmlFile(file);
  return doc.querySelector("#id01") && doc.querySelector(".loginbox");
});

describe("RW-02 regression: modal markup remains intact", () => {
  test("there is at least one page with modal markup to check", () => {
    expect(modalPages.length).toBeGreaterThan(0);
  });

  describe.each(modalPages)("%s", (file) => {
    const label = path.basename(file);
    const doc = parseHtmlFile(file);

    test(`${label} still has the sign-in and join modal containers`, () => {
      expect(doc.querySelector("#id01")).not.toBeNull();
      expect(doc.querySelector("#id02")).not.toBeNull();
    });

    test(`${label} still has login and register modal bodies`, () => {
      expect(doc.querySelector(".loginbox")).not.toBeNull();
      expect(doc.querySelector(".registerbox")).not.toBeNull();
    });

    test(`${label} still has the modal trigger elements`, () => {
      const triggers = doc.querySelectorAll('[onclick*="id01"], [onclick*="id02"]');
      expect(triggers.length).toBeGreaterThan(0);
    });
  });
});
