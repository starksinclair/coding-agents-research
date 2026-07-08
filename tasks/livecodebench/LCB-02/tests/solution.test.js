const { isGood } = require("../solution");

describe("LCB-02 — isGood", () => {
  // --- provided test cases ---
  test("provided: [2,1,3] → false (3 appears once, not twice)", () => {
    expect(isGood([2, 1, 3])).toBe(false);
  });

  test("provided: [1,3,3,2] → true", () => {
    expect(isGood([1, 3, 3, 2])).toBe(true);
  });

  test("provided: [1,1] → true (n=1, base=[1,1])", () => {
    expect(isGood([1, 1])).toBe(true);
  });

  test("provided: [3,4,4,1,2,1] → false (1 appears twice)", () => {
    expect(isGood([3, 4, 4, 1, 2, 1])).toBe(false);
  });

  // --- edge cases ---
  test("n appears once only → false", () => {
    expect(isGood([1, 2, 3])).toBe(false);
  });

  test("wrong element duplicated (not n) → false", () => {
    expect(isGood([1, 2, 2, 3])).toBe(false);
  });

  test("missing element from 1..n-1 → false", () => {
    // Missing 2: [1, 3, 3] — should be [1, 2, 3, 3]
    expect(isGood([1, 3, 3])).toBe(false);
  });

  test("correct large n → true", () => {
    // base[5] = [1, 2, 3, 4, 5, 5]
    expect(isGood([5, 1, 4, 3, 2, 5])).toBe(true);
  });

  test("extra element beyond n → false", () => {
    expect(isGood([1, 2, 3, 3, 4])).toBe(false);
  });

  test("all same values → false unless n=1", () => {
    expect(isGood([2, 2])).toBe(false); // missing 1
  });
});
