/**
 * LCB-08 — Greatest Common Divisor Traversal
 * @param {number[]} nums
 * @return {boolean}
 */
function canTraverseAllPairs(nums) {
  if (nums.length === 1) return true;
  if (nums.some((n) => n === 1)) return false;

  const parent = new Map();

  function find(x) {
    if (!parent.has(x)) parent.set(x, x);
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));
    return parent.get(x);
  }

  function union(a, b) {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  }

  function primeFactors(n) {
    const factors = new Set();
    let d = 2;
    while (d * d <= n) {
      if (n % d === 0) {
        factors.add(d);
        while (n % d === 0) n = Math.floor(n / d);
      }
      d++;
    }
    if (n > 1) factors.add(n);
    return factors;
  }

  const primeToIndex = new Map();
  for (let i = 0; i < nums.length; i++) {
    for (const p of primeFactors(nums[i])) {
      if (primeToIndex.has(p)) {
        union(i, primeToIndex.get(p));
      } else {
        primeToIndex.set(p, i);
      }
    }
  }

  const root = find(0);
  for (let i = 1; i < nums.length; i++) {
    if (find(i) !== root) return false;
  }
  return true;
}

module.exports = { canTraverseAllPairs };
