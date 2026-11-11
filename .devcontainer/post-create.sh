#!/bin/bash

# ================================
# ZSH Configuration Section
# ================================

sed -i 's/ZSH_THEME="devcontainers"/ZSH_THEME="robbyrussell"/' /$HOME/.zshrc

echo "📂 current dir: $(pwd)"

sudo chown node:node node_modules
pnpm install --ignore-scripts
