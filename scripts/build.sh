#!/usr/bin/env bash

set -euo pipefail

ENV=$1
PROD="prod"
STAGE="stage"
DEV="dev"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
RED='\033[0;31m'
NC='\033[0m' # No Color


if [ "$ENV" != "$PROD" ] && [ "$ENV" != "$DEV" ] && [ "$ENV" != "$STAGE" ]
then
    echo "$ENV is not a valid environment, must be either $DEV, $STAGE, or $PROD"
    exit 1
else 
    echo -e "${RED}Warning:${NC} Running this command replaces the entire .env, if you have information to keep there it must also be in the $ENV.env"
    echo "Building app for $ENV..."
fi

cp "${PROJECT_DIR}/environment/${ENV}.env" "${PROJECT_DIR}/.env" 
