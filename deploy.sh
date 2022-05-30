#!/usr/bin/env bash

# config:
SERVER='username@changeme.myserver'

set -x # print everything
set -e # exit on error

# build
npm run build:prod

#DRY_RUN='--dry-run'

# example deployment script
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
  --include='*.js' \
  --include='*.html' \
  --include='*.css' \
 . $SERVER:/var/www/html/
