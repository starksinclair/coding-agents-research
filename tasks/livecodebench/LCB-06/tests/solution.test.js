const { continuousSubarrays } = require("../solution");

describe("LCB-06 — continuousSubarrays", () => {
  // --- provided test cases ---
  test("provided: [5,4,2,4] → 8", () => {
    expect(continuousSubarrays([5, 4, 2, 4])).toBe(8);
  });

  test("provided: [1,2,3] → 6", () => {
    expect(continuousSubarrays([1, 2, 3])).toBe(6);
  });

  // --- edge cases ---
  test("single element → 1", () => {
    expect(continuousSubarrays([7])).toBe(1);
  });

  test("two equal elements → 3 (each singleton + the pair)", () => {
    expect(continuousSubarrays([4, 4])).toBe(3);
  });

  test("two elements differing by 2 → 3", () => {
    expect(continuousSubarrays([1, 3])).toBe(3);
  });

  test("two elements differing by 3 → 2 (only singletons)", () => {
    expect(continuousSubarrays([1, 4])).toBe(2);
  });

  test("all same values → n*(n+1)/2", () => {
    // [5,5,5,5]: every subarray valid → 4*5/2 = 10
    expect(continuousSubarrays([5, 5, 5, 5])).toBe(10);
  });

  test("large spread: only singletons count", () => {
    // [1, 100, 200]: each adjacent pair has diff > 2
    expect(continuousSubarrays([1, 100, 200])).toBe(3);
  });

  test("window shrinks when spread exceeds 2", () => {
    // [1, 2, 3, 4]: (1,2,3) valid (max-min=2), (2,3,4) valid, (1,2,3,4) not
    // subarrays: [1],[2],[3],[4] = 4
    //            [1,2],[2,3],[3,4] = 3
    //            [1,2,3],[2,3,4] = 2
    //            total = 9
    expect(continuousSubarrays([1, 2, 3, 4])).toBe(9);
  });

  test("returns a number (not BigInt) even for longer arrays", () => {
    const nums = Array.from({ length: 100 }, (_, i) => i % 3);
    const result = continuousSubarrays(nums);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });
});
