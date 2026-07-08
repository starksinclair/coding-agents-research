# LCB-01 — Number of Senior Citizens

## Metadata
- **Difficulty:** Easy
- **LeetCode ID:** 2727
- **Function:** `countSeniors(details)`
- **Contest:** Biweekly Contest 104 (2023-05-13)

## Problem
You are given a 0-indexed array of strings `details`. Each element is a string of exactly 15 characters encoding a passenger record:

- Characters 0–9: phone number
- Character 10: gender (`M` or `F`)
- Characters 11–12: age (two-digit, zero-padded)
- Characters 13–14: seat number

Return the number of passengers who are **strictly more than 60 years old**.

## Examples
```
Input:  ["7868190130M7522", "5303914400F9211", "9273338290F4010"]
Output: 2

Input:  ["1313579440F2036", "2921522980M5644"]
Output: 0
```

## Constraints
- `1 <= details.length <= 100`
- `details[i].length == 15`
- `details[i][0..9]` are digits
- `details[i][10]` is `'M'` or `'F'`
- `details[i][11..12]` are digits representing age `00–99`
- `details[i][13..14]` are digits

## Prompt (minimum context)
```
Given an array of passenger detail strings, each of length 15, where characters at
index 11–12 represent the passenger's age, return the count of passengers strictly
older than 60.
```
