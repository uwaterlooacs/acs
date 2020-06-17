#!/bin/sh

# Exit when any command fails
set -e

# Terminal colors ANSI escape codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Display warning if not on Master branch
branch=$(git symbolic-ref --short -q HEAD)
if [ branch != "master" ]; then
  echo "${RED}Warning: Deploying a branch other than master${NC}"
  sleep 3
fi

# Pull fresh changes
git pull

# Build app
yarn build

# Restart app in pm2
pm2 restart app

echo "${GREEN}Successfully deployed${NC}"
