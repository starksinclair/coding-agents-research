# LCB-02 — Check If Array Is Good

## Metadata
- **Difficulty:** Easy
- **LeetCode ID:** 2892
- **Function:** `isGood(nums)`
- **Contest:** Biweekly Contest 107 (2023-07-08)

## Problem
You are given an integer array `nums`. We call `nums` a **good array** if it is a permutation of the array `base[n]`, where:

- `base[n] = [1, 2, 3, ..., n - 1, n, n]`

In other words, a good array contains every integer from `1` to `n - 1` exactly once, and `n` exactly **twice**.

Return `true` if `nums` is a good array, `false` otherwise.

Note: a permutation means the elements can be in any order.

## Examples
```
Input:  [2, 1, 3]
Output: false   (missing a second 3)

Input:  [1, 3, 3, 2]
Output: true    (permutation of [1, 2, 3, 3])

Input:  [1, 1]
Output: true    (permutation of [1, 1], n=1)

Input:  [3, 4, 4, 1, 2, 1]
Output: false   (1 appears twice, not just 4)
```

## Constraints
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 200`

## Prompt (minimum context)
```
Given an integer array nums, return true if it is a permutation of
[1, 2, 3, ..., n-1, n, n] for some n — meaning every integer from 1 to n-1
appears exactly once and n appears exactly twice. Return false otherwise.
```
