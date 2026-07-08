/**
 * LCB-02 — Check If Array Is Good
 * @param {number[]} nums
 * @return {boolean}
 */
function isGood(nums) {
  const n = Math.max(...nums);
  if (nums.length !== n + 1) return false;

  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  for (let i = 1; i < n; i++) {
    if (freq.get(i) !== 1) return false;
  }

  return freq.get(n) === 2;
}

module.exports = { isGood };
