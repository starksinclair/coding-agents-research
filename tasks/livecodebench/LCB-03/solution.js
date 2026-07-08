/**
 * LCB-03 — Count the Number of Incremovable Subarrays I
 * @param {number[]} nums
 * @return {number}
 */
function incremovableSubarrayCount(nums) {
  const n = nums.length;

  const incLeft = new Array(n + 1).fill(true);
  for (let l = 2; l <= n; l++) {
    incLeft[l] = incLeft[l - 1] && nums[l - 2] < nums[l - 1];
  }

  const incRight = new Array(n).fill(true);
  for (let r = n - 3; r >= 0; r--) {
    incRight[r] = nums[r + 1] < nums[r + 2] && incRight[r + 1];
  }

  let count = 0;
  for (let l = 0; l < n; l++) {
    for (let r = l; r < n; r++) {
      if (!incLeft[l] || !incRight[r]) continue;
      if (l > 0 && r < n - 1 && nums[l - 1] >= nums[r + 1]) continue;
      count++;
    }
  }
  return count;
}

module.exports = { incremovableSubarrayCount };
