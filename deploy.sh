#!/usr/bin/env bash

# config:
SERVER='username@changeme.myserver'
SERVER_DIR=/var/www/html/

set -x # print everything
set -e # exit on error

# build
npm run build:prod

#DRY_RUN='--dry-run'

# example deployment script
# change as you need
# shellcheck disable=SC2086
rsync -vvritn $DRY_RUN \
  --exclude='_*' \
  --exclude='.*' \
  --exclude='*.svelte' \
  --exclude='*.sh' \
  --exclude='*.md' \
  --exclude='package*.json' \
  --exclude='tsconfig.json' \
  --exclude='svelte.config.js' \
  --exclude='build.js' \
  --exclude='node_modules' \
  --include='*.ico' \
  --include='*.png' \
  --include='*.jpg' \
  --include='*.svg' \
  --include='*.js' \
  --include='*.html' \
  --include='*.css' \
 . $SERVER:$SERVER_DIR
