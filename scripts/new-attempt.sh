#!/bin/bash
# usage: ./scripts/new-attempt.sh cursor RW-01 1
TOOL=$1 TASK=$2 ATTEMPT=$3
git checkout main
git checkout -b "experiments/$TOOL/$TASK-attempt-$ATTEMPT"
echo "Branched: experiments/$TOOL/$TASK-attempt-$ATTEMPT"