/**
 * LCB-07 — Power of Heroes
 * @param {number[]} nums
 * @return {number}
 */
function sumOfPower(nums) {
  const MOD = 1_000_000_007n;
  nums.sort((a, b) => a - b);

  let ans = 0n;
  let g = 0n;

  for (const num of nums) {
    const x = BigInt(num) % MOD;
    const x2 = (x * x) % MOD;
    ans = (ans + x2 * ((g + x) % MOD)) % MOD;
    g = (g * 2n + x) % MOD;
  }

  return Number(ans);
}

module.exports = { sumOfPower };
