# CI 排错模板工作稿

> 来源模板：`templates/ci-troubleshooting-template.md`  
> 使用场景：debug a failing pnpm workspace CI job  
> 建议沉淀位置：PR description 或 maintainer comment

## 使用前填写

````text
仓库背景：

- 项目类型：Node.js monorepo
- workspace：apps/web、packages/api、packages/shared
- 包管理器：pnpm 9
- Node.js：20.x
- CI 平台：GitHub Actions
- 本地是否能复现：干净 clone 后可以复现；维护者本机因为残留 dist 目录不一定复现

失败位置：

- workflow 文件：.github/workflows/ci.yml
- job 名称：test
- step 名称：Run API package tests
- 最近相关改动：packages/api 开始从 @acme/shared/config 导入配置 helper

CI 配置片段：

```yaml
name: ci

on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - name: Run API package tests
        run: pnpm --filter @acme/api test
```

失败日志：

```log
Scope: all 3 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +612

> @acme/api@0.8.0 test /home/runner/work/acme/acme/packages/api
> vitest run

 FAIL  src/config.test.ts [ src/config.test.ts ]
Error: Cannot find module '@acme/shared/config' imported from /home/runner/work/acme/acme/packages/api/src/config.ts
Caused by: package @acme/shared is linked from the workspace, but dist/config.js does not exist.

packages/api:
 ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  @acme/api@0.8.0 test: `vitest run`
Exit status 1
Error: Process completed with exit code 1.
```

相关 package 片段：

```json
{
  "name": "@acme/shared",
  "main": "dist/index.js",
  "exports": {
    ".": "./dist/index.js",
    "./config": "./dist/config.js"
  },
  "scripts": {
    "build": "tsc -p tsconfig.build.json"
  }
}
```

需要你输出：

1. 失败摘要：用 3 句话以内说明失败发生在哪里。
2. 最可能原因：按概率从高到低列出 3 个原因。
3. 需要确认的信息：列出还缺哪些上下文。
4. 修复方案：给出最小改动优先的修复步骤。
5. 验证方式：说明如何在本地和 CI 中验证。
6. 风险提示：说明哪些改动可能影响生产或 release。

限制：

- 不要建议删除 workspace 依赖来绕过问题。
- 不要建议关闭 `--frozen-lockfile` 作为最终修复。
- 不要把本机残留 `dist/` 当成可靠验证。
- 如果日志不足，请明确说“不足以判断”。
````

## 模板正文

你是一个 CI 排错助手。请根据我提供的仓库背景、CI 配置片段和失败日志，判断最可能的失败原因，并给出可验证的修复步骤。

请按以下结构输出：

1. 失败摘要
2. 最可能原因
3. 需要确认的信息
4. 修复方案
5. 验证方式
6. 风险提示

## 示例期望输出

```text
1. 失败摘要

GitHub Actions 的 test job 在 Run API package tests step 失败。失败点不是 pnpm install，而是 @acme/api 的 vitest 在导入 @acme/shared/config 时找不到 dist/config.js。

2. 最可能原因

- CI 只执行 pnpm --filter @acme/api test，没有先构建 @acme/shared，导致 workspace link 指向的包缺少 dist/config.js。
- 本地能通过可能是因为维护者机器上残留了 packages/shared/dist，掩盖了干净环境问题。
- packages/shared 的 exports 新增了 ./config，但 workflow 或 package scripts 没有把 shared build 纳入 api test 前置步骤。

3. 需要确认的信息

- @acme/api 的测试是否依赖 @acme/shared 的构建产物，而不是直接读取 TypeScript 源码。
- 根目录是否已有 build、test:ci 或 turbo/pnpm recursive 脚本可以复用。
- packages/api/package.json 是否有 pretest 或 test:ci 脚本。
- lockfile 是否包含 @acme/shared 的 workspace 依赖关系。

4. 修复方案

- 最小修复：在 CI 的 API 测试前增加 pnpm --filter @acme/shared build。
- 如果希望按依赖图执行，新增根脚本 test:api:ci，先构建 @acme/shared，再运行 pnpm --filter @acme/api test。
- 如果 monorepo 已使用任务编排工具，改用现有 build graph，例如 pnpm --filter @acme/api... build 后再测试。
- 在 PR 说明里解释本机残留 dist 会掩盖问题，避免只靠本机已有产物验证。

5. 验证方式

- 删除本地 packages/shared/dist。
- 运行 pnpm install --frozen-lockfile。
- 运行 pnpm --filter @acme/shared build。
- 运行 pnpm --filter @acme/api test。
- 推送后确认 GitHub Actions test job 通过。

6. 风险提示

不要通过关闭 frozen lockfile、删除 @acme/shared/config 导入或跳过 API 测试来绕过失败。修复应保证干净 CI 环境也能按 workspace 依赖顺序生成所需构建产物。
```
