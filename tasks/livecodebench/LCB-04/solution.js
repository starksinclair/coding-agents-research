/**
 * LCB-04 — Sum in a Matrix
 * @param {number[][]} nums
 * @return {number}
 */
function matrixSum(nums) {
  for (const row of nums) {
    row.sort((a, b) => a - b);
  }

  let score = 0;
  const cols = nums[0].length;
  for (let col = cols - 1; col >= 0; col--) {
    let roundMax = 0;
    for (const row of nums) {
      roundMax = Math.max(roundMax, row[col]);
    }
    score += roundMax;
  }

  return score;
}

module.exports = { matrixSum };
