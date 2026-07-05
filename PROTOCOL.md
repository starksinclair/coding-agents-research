# PROTOCOL.md — Experiment Runbook

This document defines the exact steps for running every experiment in this study.
Follow it precisely and in order. Do not improvise prompts, skip steps, or run
experiments on branches that were not freshly cut from `main`.

---

## 0. Before You Start Any Experiments

These steps are done once, before the first experiment runs. Do not repeat them
mid-study.

- [ ] All `task.md` files are finalized and committed to `main`
- [ ] All test files (`behavioral.test.js`, `regression.test.js`) are written and committed to `main`
- [ ] All three prompt templates are finalized and committed to `prompts/`
- [ ] `results/results.csv` exists with the correct header row on `main`
- [ ] Notion experiment table is set up with matching columns
- [ ] Both scripts (`new-attempt.sh`, `log-result.sh`) are executable and tested

---

## 1. Starting an Experiment

### 1.1 Pick the task and tool

Decide which task ID (e.g. `RW-01`) and which tool (e.g. `cursor`) you are running.
Decide which context level: `minimum`, `full`, or `structured`.

> Always start a new task with `minimum` context. Only run `full` or `structured`
> after `minimum` is complete for that task + tool combination.

### 1.2 Cut a fresh branch from main

```bash
./scripts/new-attempt.sh <tool> <task-id> <attempt-number>

# Example:
./scripts/new-attempt.sh cursor RW-01 1
```

This checks out `main` and creates `experiments/cursor/RW-01-attempt-1`.
Confirm you are on the new branch before proceeding:

```bash
git branch --show-current
```

### 1.3 Open the task file

```bash
cat tasks/real-world/<task-id>/task.md
# or for LiveCodeBench:
cat tasks/livecodebench/<difficulty>/<task-id>/task.md
```

Read the entire file. Do not proceed until you have read:

- Description
- Constraints
- What a correct solution looks like

---

## 2. Running the Tool

### 2.1 Construct the prompt

Based on the context level chosen in step 1.1:

| Context Level | What to give the tool                                     |
| ------------- | --------------------------------------------------------- |
| `minimum`     | Only the prompt at the bottom of `task.md` — nothing else |
| `full`        | Description + Constraints + the prompt                    |
| `structured`  | The entire `task.md` excluding the Test Coverage section  |

Copy the prompt text exactly. Do not paraphrase or add context not specified
in the template.

### 2.2 Start the tool session

- **Claude Code:** open a new session in the repo root on the experiment branch
- **Cursor:** open a new Composer session with the repo root as context

Do not reuse a tool session from a previous experiment. Always start fresh.

### 2.3 Track iterations

An iteration is defined as: **one prompt sent → one tool response received**.

Keep a running count. Record the final count in step 4.

> If the tool asks a clarifying question, that counts as an iteration.
> Your answer back does not count — only the tool's responses count.

### 2.4 Know when to stop

Stop the experiment when one of the following is true:

- **Success:** the tool produces a solution and the tests pass (go to step 3)
- **Failure — gave up:** the tool explicitly says it cannot complete the task
- **Failure — iteration cap hit:** you have reached **10 iterations** with no passing solution
- **Failure — broke codebase:** the tool's changes cause unrelated parts of the site to break

Do not exceed 10 iterations. If the cap is hit, record the attempt as failed
and note the failure type.

---

## 3. Evaluating the Solution

### 3.1 Manual check first

Before running tests, open `task.md` and go through "What a correct solution looks like"
line by line. Check each condition manually. This catches constraint violations
that automated tests may not cover.

Note any violations. A solution that passes tests but violates a constraint
is recorded as **Constraints Met: No** and **Success: No**.

### 3.2 Run the automated tests

```bash
# For real-world tasks:
npx jest tasks/real-world/<task-id>/tests/

# For LiveCodeBench tasks:
npx jest tasks/livecodebench/<difficulty>/<task-id>/tests/
```

Record:

- `Functional Correctness`: did behavioral tests pass? (Yes / No)
- `No Regression`: did regression tests pass? (Yes / No)

### 3.3 Determine overall success

`Success = Yes` only if ALL THREE are true:

- Functional Correctness: Yes
- No Regression: Yes
- Constraints Met: Yes

---

## 4. Recording Results

### 4.1 Fill in Notion first

While observations are fresh, fill in the Notion experiment row:

| Field                  | Value                                                           |
| ---------------------- | --------------------------------------------------------------- |
| Task ID                | e.g. `RW-01`                                                    |
| Tool                   | e.g. `Cursor`                                                   |
| Attempt                | e.g. `1`                                                        |
| Context Level          | `minimum` / `full` / `structured`                               |
| Iterations             | Count from step 2.3                                             |
| Functional Correctness | Yes / No                                                        |
| No Regression          | Yes / No                                                        |
| Constraints Met        | Yes / No                                                        |
| Success                | Yes / No                                                        |
| Failure Type           | See types below                                                 |
| Branch                 | e.g. `experiments/cursor/RW-01-attempt-1`                       |
| Notes                  | Qualitative observations about how the tool approached the task |

**Failure types:**

- `wrong-fix` — tool fixed the wrong thing or misidentified the bug
- `partial-fix` — tool made progress but did not fully solve the task
- `broke-regression` — solution worked but broke existing functionality
- `ignored-constraint` — solution was correct but violated a stated constraint
- `gave-up` — tool said it could not complete the task
- `iteration-cap` — 10 iterations reached with no passing solution

### 4.2 Append to results.csv

```bash
./scripts/log-result.sh \
  <task-id> <tool> <attempt> <context-level> \
  <iterations> <functional-correctness> <no-regression> \
  <constraints-met> <success> "<failure-type>" "<notes>"

# Example:
./scripts/log-result.sh \
  RW-01 cursor 1 minimum \
  7 No Yes No No ignored-constraint "Fixed scoping but left global showDivs redeclaration"
```

### 4.3 Commit and push the branch

```bash
git add .
git commit -m "experiment: cursor / RW-01 / attempt-1 / minimum / FAIL"
git push origin experiments/cursor/RW-01-attempt-1
```

Commit message format: `experiment: <tool> / <task-id> / attempt-<n> / <context-level> / PASS|FAIL`

---

## 5. Running a Retry

If a task failed and you want to retry with a higher context level:

1. Go back to step 1.2 — cut a new branch (increment attempt number)
2. Use the next context level (`minimum` → `full` → `structured`)
3. Repeat steps 2–4 exactly

Do not retry on the same branch. Each attempt is a separate branch.

---

## 6. Between Experiments

After every completed experiment (pass or fail):

- [ ] Results logged in Notion
- [ ] Results logged in `results.csv` on `main`
- [ ] Attempt branch pushed to remote
- [ ] You are back on `main` before starting the next experiment

```bash
git checkout main
git pull origin main  # pick up any results.csv updates
```

---

## 7. LiveCodeBench Experiments

LiveCodeBench tasks follow the same protocol with two differences:

**Prompt construction:** use the problem statement from the official LiveCodeBench repo as the `minimum` context prompt. Do not add or remove any wording from the official statement.

**Evaluation:** use LiveCodeBench's own test harness for `Functional Correctness`. The `No Regression` column is not applicable for LCB tasks — record it as `N/A`. `Constraints Met` is also `N/A` — record `Success` as equal to `Functional Correctness`.

```bash
# LCB evaluation uses their harness, not Jest:
python evaluate.py --task <LCB-task-id> --solution tasks/livecodebench/<difficulty>/<task-id>/solution.py
```

---

## 8. Data Integrity Rules

- Never edit a past row in `results.csv` — append only
- Never modify a pushed experiment branch after the fact
- Never run two experiments in the same tool session
- If you make a mistake mid-experiment, abandon the branch, note it as void, and start fresh
- The prompt given to the tool must match the template exactly — no ad-hoc additions

---

## Appendix: Quick Reference

```bash
# Start experiment
./scripts/new-attempt.sh <tool> <task-id> <attempt>

# Run tests
npx jest tasks/real-world/<task-id>/tests/

# Log result
./scripts/log-result.sh <task-id> <tool> <attempt> <context> <iterations> <fc> <nr> <cm> <success> "<failure>" "<notes>"

# Return to main
git checkout main && git pull origin main
```

**Tools:** `claude-code` | `cursor` | `codex` | `opencode`
**Context levels:** `minimum` | `full` | `structured`
**Failure types:** `wrong-fix` | `partial-fix` | `broke-regression` | `ignored-constraint` | `gave-up` | `iteration-cap`
