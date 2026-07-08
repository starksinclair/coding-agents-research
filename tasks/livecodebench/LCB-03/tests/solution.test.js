const { incremovableSubarrayCount } = require("../solution");

describe("LCB-03 — incremovableSubarrayCount", () => {
  // --- provided test cases ---
  test("provided: [1,2,3,4] → 10", () => {
    expect(incremovableSubarrayCount([1, 2, 3, 4])).toBe(10);
  });

  test("provided: [6,5,7,8] → 7", () => {
    expect(incremovableSubarrayCount([6, 5, 7, 8])).toBe(7);
  });

  test("provided: [8,7,6,6] → 3", () => {
    expect(incremovableSubarrayCount([8, 7, 6, 6])).toBe(3);
  });

  // --- edge cases ---
  test("single element → always incremovable (remove it or keep it)", () => {
    // Removing [5] → empty (valid), removing nothing → [5] (valid)
    // Subarrays: just [5] itself → 1
    expect(incremovableSubarrayCount([5])).toBe(1);
  });

  test("already strictly increasing: all subarrays are incremovable", () => {
    // n=3 → n*(n+1)/2 = 6 subarrays, all valid since prefix/suffix of strictly
    // increasing array is still strictly increasing
    expect(incremovableSubarrayCount([1, 2, 3])).toBe(6);
  });

  test("strictly decreasing: only full-array removal works", () => {
    // [3, 2, 1] — only removing the whole array leaves [] which is valid
    expect(incremovableSubarrayCount([3, 2, 1])).toBe(1);
  });

  test("duplicate adjacent values: not strictly increasing", () => {
    // [1, 1] — removing [1,1] → empty (valid), removing first [1] → [1] (valid),
    // removing second [1] → [1] (valid) = 3
    expect(incremovableSubarrayCount([1, 1])).toBe(3);
  });

  test("two elements strictly increasing", () => {
    // [1, 2]: remove [1]→[2]✓, remove [2]→[1]✓, remove [1,2]→[]✓ = 3
    expect(incremovableSubarrayCount([1, 2])).toBe(3);
  });

  test("two elements strictly decreasing", () => {
    // [2, 1]: only remove [2,1]→[] valid = 1
    expect(incremovableSubarrayCount([2, 1])).toBe(1);
  });
});
