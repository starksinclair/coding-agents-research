# LCB-03 — Count the Number of Incremovable Subarrays I

## Metadata
- **Difficulty:** Easy
- **LeetCode ID:** 3252
- **Function:** `incremovableSubarrayCount(nums)`
- **Contest:** Biweekly Contest 133 (2024-06-01)

## Problem
You are given a 0-indexed array of **positive integers** `nums`.

A subarray of `nums` is called **incremovable** if, after removing the subarray, the remaining elements of `nums` form a **strictly increasing** sequence.

**Note:** An empty array is considered strictly increasing. If the whole array is removed, the remaining sequence is empty (strictly increasing).

Return the number of incremovable subarrays of `nums`.

## Examples
```
Input:  [1, 2, 3, 4]
Output: 10
(Every subarray can be removed while keeping the rest strictly increasing)

Input:  [6, 5, 7, 8]
Output: 7

Input:  [8, 7, 6, 6]
Output: 3
```

## Constraints
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

## Prompt (minimum context)
```
Given a positive integer array nums, count the number of subarrays whose removal
leaves the remaining elements in strictly increasing order. An empty remaining
array also counts as strictly increasing.
```
