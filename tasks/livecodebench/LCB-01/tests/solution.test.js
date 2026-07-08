const { countSeniors } = require("../solution");

describe("LCB-01 — countSeniors", () => {
  // --- provided test cases ---
  test("provided: mixed ages, 2 seniors", () => {
    expect(countSeniors(["7868190130M7522", "5303914400F9211", "9273338290F4010"])).toBe(2);
  });

  test("provided: no seniors", () => {
    expect(countSeniors(["1313579440F2036", "2921522980M5644"])).toBe(0);
  });

  // --- edge cases ---
  test("exactly 60 is NOT a senior (strictly greater than 60)", () => {
    // age = 60 at index 11-12
    expect(countSeniors(["1234567890M6000"])).toBe(0);
  });

  test("age 61 is a senior", () => {
    expect(countSeniors(["1234567890M6100"])).toBe(1);
  });

  test("age 99 is a senior", () => {
    expect(countSeniors(["1234567890F9900"])).toBe(1);
  });

  test("single passenger under 60", () => {
    expect(countSeniors(["1234567890M3000"])).toBe(0);
  });

  test("all passengers are seniors", () => {
    expect(countSeniors([
      "1234567890M6100",
      "0987654321F7500",
      "1111111111M9900",
    ])).toBe(3);
  });

  test("age parsing: zero-padded age 05 is not senior", () => {
    expect(countSeniors(["1234567890F0500"])).toBe(0);
  });

  test("gender character at index 10 does not affect age parsing", () => {
    // Both M and F with same age 65 should both count
    expect(countSeniors(["1234567890M6500", "9876543210F6500"])).toBe(2);
  });
});
