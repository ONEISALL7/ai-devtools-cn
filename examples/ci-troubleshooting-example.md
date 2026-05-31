# CI 排错示例

这个示例展示如何使用 `templates/ci-troubleshooting-template.md` 分析一次 GitHub Actions 失败。

## 输入示例

```text
项目类型：Node.js 文档模板库
包管理器：npm
CI 平台：GitHub Actions
本地是否能复现：本地没有安装依赖，暂未复现

失败位置：
- workflow 文件：.github/workflows/markdown-check.yml
- job 名称：markdown
- step 名称：Lint Markdown
- 最近相关改动：新增 docs/faq.md

失败日志：

> ai-devtools-cn@0.1.0 lint:md
> markdownlint-cli2 "**/*.md" "!node_modules/**"

docs/faq.md:12:81 MD013/line-length Line length [Expected: 80; Actual: 126]
Error: Process completed with exit code 1.
```

## AI 输出示例

```text
1. 失败摘要

CI 在 Lint Markdown 步骤失败。失败原因是 docs/faq.md 第 12 行触发了 markdownlint 的 MD013 行长度规则。

2. 最可能原因

- 新增 FAQ 文档中存在过长单行。
- 项目当前 markdownlint 配置可能没有关闭 MD013。
- 本地没有运行 lint，导致问题只在 CI 中暴露。

3. 需要确认的信息

- 仓库是否有 .markdownlint.json。
- 项目是否允许中文文档关闭行长度限制。
- docs/faq.md 第 12 行是否可以自然换行。

4. 修复方案

- 优先查看 .markdownlint.json。
- 如果项目已经关闭 MD013，确认 CI 是否读取到了配置。
- 如果项目没有关闭 MD013，把长句拆成多行。

5. 验证方式

- 本地运行 npm install。
- 本地运行 npm run lint:md。
- 推送后确认 GitHub Actions 通过。

6. 风险提示

不要为了通过 CI 删除 FAQ 内容。应优先调整格式或配置。
```

## 维护者判断

这个输出可用，因为它：

- 指向了具体文件和规则。
- 没有建议跳过 CI。
- 给出了本地和远程验证步骤。
- 提醒不要删除有效内容来绕过检查。

