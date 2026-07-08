# LCB-05 — Extra Characters in a String

## Metadata
- **Difficulty:** Medium
- **LeetCode ID:** 2755
- **Function:** `minExtraChar(s, dictionary)`
- **Contest:** Biweekly Contest 105 (2023-05-27)

## Problem
You are given a 0-indexed string `s` and a dictionary of words `dictionary`. You have to break `s` into one or more non-overlapping substrings such that each substring is present in `dictionary`. There may be some extra characters in `s` which are not present in any of the substrings.

Return the **minimum number of extra characters** left over if you break up `s` optimally.

## Examples
```
Input:  s = "leetscode", dictionary = ["leet","code","leetcode"]
Output: 1
(Break as "leet" + "s" + "code", 1 extra character "s")

Input:  s = "sayhelloworld", dictionary = ["hello","world"]
Output: 3
(Break as "say" + "hello" + "world", 3 extra characters "say")
```

## Constraints
- `1 <= s.length <= 50`
- `1 <= dictionary.length <= 50`
- `1 <= dictionary[i].length <= 50`
- `dictionary[i]` and `s` consist of only lowercase English letters
- `dictionary` contains distinct words

## Prompt (minimum context)
```
Given a string s and a word dictionary, split s into substrings that appear in
the dictionary. Return the minimum number of characters that cannot be covered
by any dictionary word.
```
