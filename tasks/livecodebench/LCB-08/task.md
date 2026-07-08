# LCB-08 — Greatest Common Divisor Traversal

## Metadata
- **Difficulty:** Hard
- **LeetCode ID:** 2827
- **Function:** `canTraverseAllPairs(nums)`
- **Contest:** Biweekly Contest 110 (2023-08-12)

## Problem
You are given a 0-indexed integer array `nums`. There is an edge between two indices `i` and `j` if and only if `gcd(nums[i], nums[j]) > 1`.

Return `true` if all indices `i` and `j` can be **reached from each other** — i.e., the graph is connected. Otherwise return `false`.

**Note:** `gcd(x, y)` is the greatest common divisor of `x` and `y`.

## Examples
```
Input:  [2, 3, 6]
Output: true
(gcd(2,6)=2>1, gcd(3,6)=3>1, so all three are connected)

Input:  [3, 9, 5]
Output: false
(gcd(3,5)=1, gcd(9,5)=1, so 5 is isolated)

Input:  [4, 3, 12, 8]
Output: true
```

## Constraints
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Hint
Brute-force O(n²) gcd checks will be too slow for n=10^5.
Think about connecting elements via their **shared prime factors** using Union-Find.
Each number can be decomposed into primes; two numbers sharing a prime factor share an edge.

## Prompt (minimum context)
```
Given an integer array nums, return true if you can traverse between any two
indices i and j where gcd(nums[i], nums[j]) > 1 forms a connected graph across
all elements. Return false if any element is unreachable from the others.
```
