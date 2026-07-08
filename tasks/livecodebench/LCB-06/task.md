# LCB-06 — Continuous Subarrays

## Metadata
- **Difficulty:** Medium
- **LeetCode ID:** 2868
- **Function:** `continuousSubarrays(nums)`
- **Contest:** Biweekly Contest 112 (2023-09-09)

## Problem
You are given a 0-indexed integer array `nums`. A subarray of `nums` is called **continuous** if:

- For any two elements `nums[i]` and `nums[j]` in the subarray where `i <= j`, it holds that `0 <= nums[j] - nums[i] <= 2`.

In other words, the difference between any two elements in the subarray is at most `2`.

Return the **total number of continuous subarrays**.

## Examples
```
Input:  [5, 4, 2, 4]
Output: 8

Input:  [1, 2, 3]
Output: 6
```

## Constraints
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Prompt (minimum context)
```
Given an integer array nums, count the number of subarrays where the difference
between the maximum and minimum element is at most 2.
```
