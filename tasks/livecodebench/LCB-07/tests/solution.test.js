const { sumOfPower } = require("../solution");

const MOD = 1_000_000_007n;

describe("LCB-07 — sumOfPower", () => {
  // --- provided test cases ---
  test("provided: [2,1,4] → 141", () => {
    expect(sumOfPower([2, 1, 4])).toBe(141);
  });

  test("provided: [1,1,1] → 7", () => {
    // 3 singletons: 1^2*1=1 each → 3
    // 3 pairs: 1^2*1=1 each → 3
    // 1 triple: 1^2*1=1 → 1
    // total = 7
    expect(sumOfPower([1, 1, 1])).toBe(7);
  });

  // --- edge cases ---
  test("single element: power = val^2 * val = val^3", () => {
    expect(sumOfPower([3])).toBe(27); // 3^2 * 3 = 27
  });

  test("two elements: [a, b] where a < b", () => {
    // singletons: a^3 + b^3
    // pair: b^2 * a
    // [1, 2]: 1 + 8 + 4*1 = 13
    expect(sumOfPower([1, 2])).toBe(13);
  });

  test("result is taken modulo 10^9+7", () => {
    // Large values should not overflow; result must be < 10^9+7
    const result = sumOfPower([1000000000]);
    expect(result).toBeLessThan(1_000_000_007);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test("all same values: [v,v,v,...] — every subset has max=min=v", () => {
    // [2,2]: singletons: 2*2^2=8 each → 16; pair: 2^2*2=8 → total 24
    expect(sumOfPower([2, 2])).toBe(24);
  });

  test("sorted vs unsorted gives same answer", () => {
    expect(sumOfPower([4, 1, 2])).toBe(sumOfPower([2, 1, 4]));
  });

  test("returns an integer (number type)", () => {
    expect(typeof sumOfPower([2, 1, 4])).toBe("number");
  });
});
