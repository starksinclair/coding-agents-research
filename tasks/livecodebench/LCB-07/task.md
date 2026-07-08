# LCB-07 — Power of Heroes

## Metadata
- **Difficulty:** Hard
- **LeetCode ID:** 2784
- **Function:** `sumOfPower(nums)`
- **Contest:** Biweekly Contest 106 (2023-06-10)

## Problem
You are given a 0-indexed integer array `nums` representing the strength of some heroes. The **power** of a group of heroes is defined as follows:

- Let `i_0, i_1, ..., i_k` be the indices of the heroes in a group.
- The power of this group is `max(nums[i_0], nums[i_1], ..., nums[i_k])^2 * min(nums[i_0], nums[i_1], ..., nums[i_k])`.

Return the **sum of the power** of all **non-empty** groups of heroes possible. Since the sum could be very large, return it modulo `10^9 + 7`.

## Examples
```
Input:  [2, 1, 4]
Output: 141

Input:  [1, 1, 1]
Output: 7
```

## Constraints
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Hint
After sorting, for a group where `nums[i]` is the maximum, the contribution
is `nums[i]^2 * (sum of possible minimums)`. Think about what each element
can contribute as a minimum across all valid groups.

## Prompt (minimum context)
```
Given an integer array nums, for every non-empty subset compute
max^2 * min, then return the total sum modulo 10^9 + 7.
```
