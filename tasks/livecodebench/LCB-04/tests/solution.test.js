const { matrixSum } = require("../solution");

describe("LCB-04 — matrixSum", () => {
  // --- provided test cases ---
  test("provided: 4-row matrix → 15", () => {
    expect(matrixSum([[7, 2, 1], [6, 4, 2], [6, 5, 3], [3, 2, 1]])).toBe(15);
  });

  test("provided: single cell → 1", () => {
    expect(matrixSum([[1]])).toBe(1);
  });

  // --- additional cases ---
  test("single row: sum equals max of each removal round", () => {
    // Row [3, 1, 2]: rounds remove 3, 2, 1 → score = 3+2+1 = 6
    expect(matrixSum([[3, 1, 2]])).toBe(6);
  });

  test("single column: each round removes the only element per row", () => {
    // [[5],[3],[1]]: round 1 removes 5,3,1 → max=5; done. score=5
    expect(matrixSum([[5], [3], [1]])).toBe(5);
  });

  test("all elements equal", () => {
    // [[2,2],[2,2]]: round1 removes 2,2 → max=2; round2 removes 2,2 → max=2; score=4
    expect(matrixSum([[2, 2], [2, 2]])).toBe(4);
  });

  test("two rows, dominated by one row each round", () => {
    // [[10,1],[2,2]]:
    // round1: remove 10, 2 → max=10
    // round2: remove 1, 2 → max=2
    // score=12
    expect(matrixSum([[10, 1], [2, 2]])).toBe(12);
  });

  test("3x3 matrix with distinct values", () => {
    // [[9,3,1],[8,4,2],[7,5,6]]:
    // round1: remove 9,8,7 → max=9
    // round2: remove 3,4,6 → max=6
    // round3: remove 1,2,5 → max=5
    // score = 20
    expect(matrixSum([[9, 3, 1], [8, 4, 2], [7, 5, 6]])).toBe(20);
  });
});