const { minExtraChar } = require("../solution");

describe("LCB-05 — minExtraChar", () => {
  // --- provided test cases ---
  test('provided: "leetscode" with [leet,code,leetcode] → 1', () => {
    expect(minExtraChar("leetscode", ["leet", "code", "leetcode"])).toBe(1);
  });

  test('provided: "sayhelloworld" with [hello,world] → 3', () => {
    expect(minExtraChar("sayhelloworld", ["hello", "world"])).toBe(3);
  });

  // --- edge cases ---
  test("entire string is one dictionary word → 0 extra", () => {
    expect(minExtraChar("hello", ["hello"])).toBe(0);
  });

  test("no dictionary word matches any part → all chars are extra", () => {
    expect(minExtraChar("abc", ["xyz", "def"])).toBe(3);
  });

  test("empty-ish: single char in dictionary → 0", () => {
    expect(minExtraChar("a", ["a"])).toBe(0);
  });

  test("single char not in dictionary → 1", () => {
    expect(minExtraChar("a", ["b"])).toBe(1);
  });

  test("overlapping dictionary words: pick the better split", () => {
    // "leetcode": can match "leetcode" (0 extra) or "leet"+"code" (0 extra)
    expect(minExtraChar("leetcode", ["leet", "code", "leetcode"])).toBe(0);
  });

  test("greedy fails: longer word is not always better", () => {
    // "abcde": dictionary has "ab", "cde" → 0 extra
    // A greedy approach taking "abcd" first would leave "e" unmatched
    expect(minExtraChar("abcde", ["ab", "cde", "abcd"])).toBe(0);
  });

  test("repeated segments", () => {
    // "aaa" with ["a"] → 0 extra (three matches)
    expect(minExtraChar("aaa", ["a"])).toBe(0);
  });

  test("dictionary word longer than s → cannot use it", () => {
    expect(minExtraChar("ab", ["abc"])).toBe(2);
  });
});
