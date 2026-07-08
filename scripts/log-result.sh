#!/usr/bin/env bash
# log-result.sh — interactively log one experiment run to results.csv
# Usage: ./log-result.sh   (answers prompts, validates as you go)

set -euo pipefail

RESULTS_FILE="results.csv"

VALID_TOOLS=("claude-code" "cursor" "codex" "opencode" "copilot")
VALID_CONTEXT=("minimum" "full" "structured" "n/a")
VALID_RESULT=("pass" "fail" "n/a")
VALID_FAILURES=("wrong-fix" "partial-fix" "broke-regression" "ignored-constraint" "gave-up" "iteration-cap")

# ---- helpers ---------------------------------------------------------------

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

esc() { printf '"%s"' "$(echo "$1" | sed 's/"/""/g')"; }

# ---- interactive prompts ---------------------------------------------------

echo "── Log experiment run ─────────────────────────────"

ask        "Task ID (e.g. RW-03, LCB-07)" TASK_ID
ask        "Tool" TOOL "${VALID_TOOLS[@]}"
ask        "Context level" CONTEXT "${VALID_CONTEXT[@]}"
ask_number "Attempt number" ATTEMPT
ask_number "Iterations used" ITERATIONS
ask        "Functional correctness" FUNCTIONAL "${VALID_RESULT[@]}"
ask        "No regressions" REGRESSIONS "${VALID_RESULT[@]}"
ask        "Constraints met" CONSTRAINTS "${VALID_RESULT[@]}"

FAILURE_TYPE=""
if [ "$FUNCTIONAL" = "fail" ] || [ "$REGRESSIONS" = "fail" ] || [ "$CONSTRAINTS" = "fail" ]; then
  ask "Failure type" FAILURE_TYPE "${VALID_FAILURES[@]}"
fi

read -r -p "Notes (optional): " NOTES

# ---- derived fields --------------------------------------------------------

TIMESTAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"

OVERALL="pass"
for axis in "$FUNCTIONAL" "$REGRESSIONS" "$CONSTRAINTS"; do
  [ "$axis" = "fail" ] && OVERALL="fail"
done

# ---- confirm before writing ------------------------------------------------

echo ""
echo "── Review ─────────────────────────────────────────"
echo "  Task:         $TASK_ID"
echo "  Tool:         $TOOL"
echo "  Context:      $CONTEXT"
echo "  Attempt:      $ATTEMPT"
echo "  Iterations:   $ITERATIONS"
echo "  Functional:   $FUNCTIONAL"
echo "  Regressions:  $REGRESSIONS"
echo "  Constraints:  $CONSTRAINTS"
echo "  Overall:      $OVERALL"
echo "  Failure type: ${FAILURE_TYPE:-—}"
echo "  Branch:       $BRANCH ($COMMIT)"
echo "  Notes:        ${NOTES:-—}"
echo "───────────────────────────────────────────────────"
read -r -p "Write this row? [Y/n] " confirm
if [ "$confirm" = "n" ] || [ "$confirm" = "N" ]; then
  echo "Aborted — nothing written."
  exit 0
fi

# ---- header if file doesn't exist ------------------------------------------

if [ ! -f "$RESULTS_FILE" ]; then
  echo "timestamp,task_id,tool,context_level,attempt,iterations,functional,no_regressions,constraints_met,overall,failure_type,branch,commit,notes" > "$RESULTS_FILE"
fi

# ---- duplicate guard -------------------------------------------------------

if grep -q ",${TASK_ID},${TOOL},${CONTEXT},${ATTEMPT}," "$RESULTS_FILE"; then
  echo "⚠ A row for ${TASK_ID}/${TOOL}/${CONTEXT}/attempt-${ATTEMPT} already exists." >&2
  read -r -p "Append anyway? [y/N] " ans
  [ "$ans" = "y" ] || { echo "Aborted."; exit 1; }
fi

# ---- append ----------------------------------------------------------------

echo "${TIMESTAMP},${TASK_ID},${TOOL},${CONTEXT},${ATTEMPT},${ITERATIONS},${FUNCTIONAL},${REGRESSIONS},${CONSTRAINTS},${OVERALL},${FAILURE_TYPE},${BRANCH},${COMMIT},$(esc "$NOTES")" >> "$RESULTS_FILE"

echo "✔ Logged: ${TASK_ID} | ${TOOL} | ${CONTEXT} | attempt ${ATTEMPT} | ${ITERATIONS} iter | overall: ${OVERALL}"