# LCB-04 — Sum in a Matrix

## Metadata
- **Difficulty:** Medium
- **LeetCode ID:** 2728
- **Function:** `matrixSum(nums)`
- **Contest:** Biweekly Contest 104 (2023-05-13)

## Problem
You are given a 0-indexed 2D integer array `nums`. Initially, your score is `0`. Perform the following operations until the matrix becomes empty:

1. From each row in the matrix, **select the largest number and remove it**. If there is a tie, any of the tied values may be chosen.
2. Identify the **highest number** among all those removed in step 1.
3. **Add that number to your score.**

Return the final score.

## Examples
```
Input:  [[7,2,1],[6,4,2],[6,5,3],[3,2,1]]
Output: 15

Input:  [[1]]
Output: 1
```

## Constraints
- `1 <= nums.length <= 100`
- `1 <= nums[i].length <= 100`
- `1 <= nums[i][j] <= 100`

## Prompt (minimum context)
```
Given a 2D integer array, repeatedly remove the largest element from each row
simultaneously, then add the maximum of all removed elements to your score.
Return the total score after the matrix is empty.
```
