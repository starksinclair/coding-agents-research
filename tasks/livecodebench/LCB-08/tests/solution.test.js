const { canTraverseAllPairs } = require("../solution");

describe("LCB-08 — canTraverseAllPairs", () => {
  // --- provided test cases ---
  test("provided: [2,3,6] → true", () => {
    expect(canTraverseAllPairs([2, 3, 6])).toBe(true);
  });

  test("provided: [3,9,5] → false (5 is isolated)", () => {
    expect(canTraverseAllPairs([3, 9, 5])).toBe(false);
  });

  test("provided: [4,3,12,8] → true", () => {
    expect(canTraverseAllPairs([4, 3, 12, 8])).toBe(true);
  });

  // --- edge cases ---
  test("single element → true (trivially connected)", () => {
    expect(canTraverseAllPairs([6])).toBe(true);
  });

  test("two coprime elements → false", () => {
    expect(canTraverseAllPairs([3, 5])).toBe(false);
  });

  test("two elements sharing a factor → true", () => {
    expect(canTraverseAllPairs([4, 6])).toBe(true); // gcd=2
  });

  test("element 1 is always isolated (gcd(1, x) = 1 for all x)", () => {
    // [1, 2]: gcd(1,2)=1, so 1 has no edges → disconnected
    expect(canTraverseAllPairs([1, 2])).toBe(false);
  });

  test("all primes with no shared factor → disconnected", () => {
    expect(canTraverseAllPairs([2, 3, 5, 7])).toBe(false);
  });

  test("chain connection via shared primes → true", () => {
    // 6=2*3, 10=2*5, 15=3*5 — all connected via shared factors
    expect(canTraverseAllPairs([6, 10, 15])).toBe(true);
  });

  test("all even numbers → true (all share factor 2)", () => {
    expect(canTraverseAllPairs([2, 4, 6, 8, 10])).toBe(true);
  });

  test("large prime isolated among composites → false", () => {
    // 97 is prime, shares no factor with 4, 6, 8
    expect(canTraverseAllPairs([4, 6, 8, 97])).toBe(false);
  });

  test("returns boolean (not truthy/falsy value)", () => {
    const result = canTraverseAllPairs([2, 3, 6]);
    expect(typeof result).toBe("boolean");
  });
});
