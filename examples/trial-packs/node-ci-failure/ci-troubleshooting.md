# CI 排错模板工作稿

> 来源模板：`templates/ci-troubleshooting-template.md`  
> 使用场景：debug a failing Node.js CI job  
> 建议沉淀位置：PR description 或 maintainer comment

## 使用前填写

````text
仓库背景：

- 项目类型：中文 AI 工程维护模板库
- 主要语言/框架：Node.js CLI + Markdown 文档
- 包管理器：npm
- CI 平台：GitHub Actions
- 本地是否能复现：可以，本地运行 npm run lint:md 复现

失败位置：

- workflow 文件：.github/workflows/markdown-check.yml
- job 名称：markdown
- step 名称：Run markdown lint
- 最近相关改动：新增 docs/first-user-test-plan.md 和 examples/trial-packs/README.md

失败日志：

```log
> ai-devtools-cn@0.8.0 lint:md
> markdownlint-cli2 "**/*.md" "!node_modules/**" "!work/**"

examples/trial-packs/README.md:13 MD032/blanks-around-lists Lists should be surrounded by blank lines
docs/first-user-test-plan.md:42 MD031/blanks-around-fences Fenced code blocks should be surrounded by blank lines
Error: Process completed with exit code 1.
```

需要你输出：

1. 失败摘要：用 3 句话以内说明失败发生在哪里。
2. 最可能原因：按概率从高到低列出 3 个原因。
3. 需要确认的信息：列出还缺哪些上下文。
4. 修复方案：给出最小改动优先的修复步骤。
5. 验证方式：说明如何在本地和 CI 中验证。
6. 风险提示：说明哪些改动可能影响生产或 release。

限制：

- 不要编造不存在的文件。
- 不要建议跳过 markdown lint 作为最终修复。
- 如果日志不足，请明确说“不足以判断”。
- 涉及依赖升级时，必须说明回滚方式。
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

GitHub Actions 的 markdown job 在 Run markdown lint step 失败。失败日志指向两个 Markdown 格式规则：列表前后缺空行，以及 fenced code block 前后缺空行。

2. 最可能原因

- 新增文档时列表或代码块周围没有保留空行。
- 本地编辑时没有运行 npm run lint:md。
- 新增示例跨越多个文档，导致同一类格式问题在多个文件里同时出现。

3. 需要确认的信息

- 失败行附近是否确实缺少空行。
- 本地 markdownlint 版本是否和 CI 使用的 package-lock.json 一致。
- 修改是否只影响 Markdown 格式，不改变文档语义。

4. 修复方案

- 打开 examples/trial-packs/README.md 第 13 行附近，在列表前后补空行。
- 打开 docs/first-user-test-plan.md 第 42 行附近，在代码块前后补空行。
- 本地运行 npm run lint:md。
- 如果通过，再提交修复 PR。

5. 验证方式

- 本地运行 npm install。
- 本地运行 npm run lint:md。
- 推送后确认 GitHub Actions markdown job 通过。

6. 风险提示

不要通过关闭 MD031、MD032 或删除文档内容来绕过 CI。这个问题应优先用最小格式修复解决。
```
