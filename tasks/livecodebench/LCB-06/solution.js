/**
 * LCB-06 — Continuous Subarrays
 * @param {number[]} nums
 * @return {number}
 */
function continuousSubarrays(nums) {
  const maxDeque = [];
  const minDeque = [];
  let left = 0;
  let count = 0;

  for (let right = 0; right < nums.length; right++) {
    while (maxDeque.length && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
      maxDeque.pop();
    }
    maxDeque.push(right);

    while (minDeque.length && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
      minDeque.pop();
    }
    minDeque.push(right);

    while (nums[maxDeque[0]] - nums[minDeque[0]] > 2) {
      left++;
      if (maxDeque[0] < left) maxDeque.shift();
      if (minDeque[0] < left) minDeque.shift();
    }

    count += right - left + 1;
  }

  return count;
}

module.exports = { continuousSubarrays };
