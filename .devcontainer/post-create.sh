#!/bin/bash

# ================================
# ZSH Configuration Section
# ================================

sed -i 's/ZSH_THEME="devcontainers"/ZSH_THEME="robbyrussell"/' /$HOME/.zshrc

echo "📂 current dir: $(pwd)"
corepack enable
pnpm install --ignore-scripts
