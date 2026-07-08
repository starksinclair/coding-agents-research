/**
 * LCB-05 — Extra Characters in a String
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
function minExtraChar(s, dictionary) {
  const words = new Set(dictionary);
  const n = s.length;
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    for (let j = 0; j < i; j++) {
      if (words.has(s.slice(j, i))) {
        dp[i] = Math.min(dp[i], dp[j]);
      }
    }
  }

  return dp[n];
}

module.exports = { minExtraChar };
