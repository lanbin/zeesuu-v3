#!/usr/bin/env sh

set -e

# 构建
npm run docs:build

# 进入待发布的目录
cd docs/.vitepress/dist



git init
git add -A
git commit -m 'deploy'

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:lanbin/zeesuu-v3.git master:gh-pages

cd -