#!/bin/bash
# usage: ./scripts/new-attempt.sh cursor RW-01 1
#!/usr/bin/env bash
# new-attempt.sh — interactively create a new experiment attempt branch
#
# Flow:
#   1. Prompt for tool + task + attempt number
#   2. Commit any uncommitted changes on the current experiment branch
#   3. Merge those changes into dev/<tool>  (cumulative codebase per tool)
#   4. Branch off dev/<tool> into experiments/<tool>/<task>-attempt-<n>
#
# Branch model:
#   master                      — clean baseline, never touched during experiments
#   dev/<tool>                — cumulative merges of all passing fixes for that tool
#   experiments/<tool>/<task>-attempt-<n>  — individual run, branches off dev/<tool>

set -euo pipefail

VALID_TOOLS=("claude-code" "cursor" "codex" "opencode" "copilot")

in_list() {
  local needle="$1"; shift
  for item in "$@"; do [ "$item" = "$needle" ] && return 0; done
  return 1
}

ask() {
  local prompt="$1"; local __var="$2"; shift 2
  local options=("$@")
  local input
  while true; do
    if [ "${#options[@]}" -gt 0 ]; then
      read -r -p "$prompt [${options[*]}]: " input
      if in_list "$input" "${options[@]}"; then break; fi
      echo "  ✗ invalid — must be one of: ${options[*]}" >&2
    else
      read -r -p "$prompt: " input
      [ -n "$input" ] && break
      echo "  ✗ cannot be empty" >&2
    fi
  done
  printf -v "$__var" '%s' "$input"
}

ask_number() {
  local prompt="$1"; local __var="$2"
  local input
  while true; do
    read -r -p "$prompt: " input
    if [[ "$input" =~ ^[0-9]+$ ]]; then break; fi
    echo "  ✗ must be a whole number" >&2
  done
  printf -v "$__var" '%s' "$input"
}

# ---- prompts ---------------------------------------------------------------

echo "── New experiment attempt ──────────────────────────"

ask        "Tool" TOOL "${VALID_TOOLS[@]}"
ask        "Task ID (e.g. RW-03, LCB-07)" TASK_ID
ask_number "Attempt number" ATTEMPT

DEV_BRANCH="dev/${TOOL}"
EXP_BRANCH="experiments/${TOOL}/${TASK_ID}-attempt-${ATTEMPT}"

echo ""
echo "── Plan ────────────────────────────────────────────"
echo "  Dev branch:  $DEV_BRANCH"
echo "  New branch:  $EXP_BRANCH"
echo "───────────────────────────────────────────────────"
read -r -p "Proceed? [Y/n] " confirm
if [ "$confirm" = "n" ] || [ "$confirm" = "N" ]; then
  echo "Aborted."
  exit 0
fi

# ---- step 1: commit any uncommitted changes --------------------------------

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo ""
  echo "── Uncommitted changes detected ────────────────────"
  git status --short
  echo ""
  read -r -p "Commit message: " COMMIT_MSG
  [ -z "$COMMIT_MSG" ] && COMMIT_MSG="experiment: ${TASK_ID} attempt ${ATTEMPT} changes"
  git add -A
  git commit -m "$COMMIT_MSG"
  echo "✔ Committed on $CURRENT_BRANCH"
else
  echo "✔ No uncommitted changes"
fi

# ---- step 2: ensure dev/<tool> exists --------------------------------------

if ! git show-ref --quiet "refs/heads/${DEV_BRANCH}"; then
  echo ""
  echo "── Creating $DEV_BRANCH (branching from master) ──────"
  git checkout master
  git checkout -b "$DEV_BRANCH"
  echo "✔ Created $DEV_BRANCH"
fi

# ---- step 3: merge current experiment branch into dev/<tool> ---------------

# Only merge if we're coming from an experiment branch (not master/dev)
if [[ "$CURRENT_BRANCH" == experiments/* ]]; then
  echo ""
  echo "── Merging $CURRENT_BRANCH → $DEV_BRANCH ───────────"
  git checkout "$DEV_BRANCH"
  git merge "$CURRENT_BRANCH" --no-ff -m "merge: ${TASK_ID} attempt ${ATTEMPT} into ${DEV_BRANCH}"
  echo "✔ Merged into $DEV_BRANCH"
else
  echo "ℹ Skipping merge — not on an experiment branch (current: $CURRENT_BRANCH)"
  git checkout "$DEV_BRANCH" 2>/dev/null || git checkout master
fi

# ---- step 4: create new experiment branch off dev/<tool> -------------------

echo ""
echo "── Creating experiment branch ──────────────────────"

if git show-ref --quiet "refs/heads/${EXP_BRANCH}"; then
  echo "⚠ Branch $EXP_BRANCH already exists." >&2
  read -r -p "Delete and recreate it? [y/N] " ans
  if [ "$ans" = "y" ]; then
    git branch -D "$EXP_BRANCH"
  else
    echo "Aborted."
    exit 1
  fi
fi

git checkout -b "$EXP_BRANCH"

echo ""
echo "✔ Ready: $EXP_BRANCH"
echo "  Base: $(git rev-parse --short HEAD) (from $DEV_BRANCH)"
echo ""
echo "  Run your tool, then log the result:"
echo "  ./log-result.sh"