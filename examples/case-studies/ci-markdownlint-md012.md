# 用 CI 排错模板修复 markdownlint MD012

## 背景

这个案例基于本仓库真实遇到的 CI 失败整理：多个文档 PR 因文件末尾多出连续空行，触发 `MD012/no-multiple-blanks`。

典型日志如下：

```text
Summary: 1 error(s)
docs/faq.md:89 MD012/no-multiple-blanks Multiple consecutive blank lines [Expected: 1; Actual: 2]
```

这类问题适合使用 [CI 排错模板](../../templates/ci-troubleshooting-template.md)，因为它有明确日志、明确文件和明确修复方式。

## 维护者目标

维护者要让 AI 帮忙做的是：

- 从日志里定位失败文件和规则
- 判断根因是不是格式问题
- 给出最小修复方式
- 明确不要关闭 CI、跳过 lint 或删除有效内容
- 给出本地和远程验证步骤

## 可复制输入

```text
请帮我分析一次 GitHub Actions Markdown lint 失败。

项目背景：
这是一个中文 AI 开发者工具模板库，所有 Markdown 文档都需要通过 markdownlint。

失败日志：
Summary: 1 error(s)
docs/faq.md:89 MD012/no-multiple-blanks Multiple consecutive blank lines [Expected: 1; Actual: 2]

相关文件：
docs/faq.md

约束条件：
- 不要建议关闭 markdownlint
- 不要建议跳过 CI
- 不要删除有效内容来绕过检查
- 只做最小修复

请输出：
1. 根因判断
2. 最小修复步骤
3. 本地验证命令
4. PR 评论草稿
```

## 期望输出示例

```text
根因判断：
CI 失败来自 markdownlint 规则 MD012，表示 docs/faq.md 第 89 行附近存在连续空行。它不是内容错误，而是 Markdown 格式问题。

最小修复步骤：
1. 打开 docs/faq.md 第 89 行附近。
2. 删除多余空行，只保留一个段落间空行。
3. 不修改其他 FAQ 内容。

本地验证命令：
npm run lint:md

PR 评论草稿：
已根据 markdownlint 日志修复 MD012/no-multiple-blanks。修复范围仅限删除文件末尾附近的多余空行，没有改变文档内容。验证方式：npm run lint:md。
```

## 维护者验收标准

修复前先确认：

- 日志里的文件路径和本地文件一致
- 错误规则是格式规则，不是链接、标题或代码块错误
- 删除的是空行，不是正文

修复后确认：

- `npm run lint:md` 本地通过
- GitHub Actions 重新运行并通过
- PR diff 只包含必要格式修复

## 常见错误

不要这样处理：

```text
可以临时关闭 MD012。
可以删除整段 FAQ 来减少错误。
可以跳过 lint 先合并。
```

这些做法会破坏维护质量。正确做法是保留内容，只修格式。

## 如何沉淀

这个案例可以沉淀为：

- PR 修复说明
- CONTRIBUTING 中的格式排错说明
- CI 排错知识库
- 新贡献者 onboarding 示例
