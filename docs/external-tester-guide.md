# 外部试用者快速指南

这份指南给第一次看到 `ai-devtools-cn` 的外部用户使用。目标是在 10-15 分钟内完成一次公开安全的试用，并把具体反馈提交到 GitHub issue。

你不需要公开私有代码、客户日志或内部事故细节。只要选择一个可以公开描述的小场景，判断模板或 CLI 是否真的能帮你完成维护工作。

## 适合试用的场景

优先选择你最近真实遇到过的小任务：

| 场景 | 推荐入口 |
| --- | --- |
| 审查一个文档或代码 PR | [PR Review 模板](../templates/pr-review-template.md) |
| 分流一个 bug、feature 或 question issue | [Issue Triage 模板](../templates/issue-triage-template.md) |
| 排查一次 CI 失败 | [CI 排错模板](../templates/ci-troubleshooting-template.md) |
| 写一版 release note | [发布说明模板](../templates/release-note-template.md) |
| 判断 AI 输出能否进入工程流程 | [AI 输出质量评估模板](../templates/ai-output-evaluation-template.md) |
| 给新贡献者写第一个 PR 指引 | [外部贡献者引导模板](../templates/contributor-onboarding-template.md) |

如果你不知道选哪个，先用 `ci`、`review`、`release`、`pytest` 这类关键词搜索或推荐。

如果你想直接照着完整步骤试用，可以先看 [真实试用配方](usage-recipes.md)。配方会把模板、命令、步骤和可记录证据放在一起。

## 不安装依赖的试用方式

如果你只想快速判断模板是否有用：

1. 打开一个上表里的模板。
2. 复制模板正文到你正在使用的 AI 开发工具。
3. 把项目背景、技术栈、相关日志和期望输出换成你的公开安全描述。
4. 看输出是否能直接变成 review comment、issue 回复、修复计划、测试 TODO 或 release note。
5. 提交一条 feedback issue，说明哪里有用、哪里不清楚。

反馈入口：

```text
https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml
```

## 使用 CLI 的试用方式

如果你愿意跑本地命令，可以先克隆仓库：

```bash
git clone https://github.com/ONEISALL7/ai-devtools-cn.git
cd ai-devtools-cn
npm install
npm run templates:doctor
```

查看示例和推荐：

```bash
npm run templates:examples
npm run templates:recipes
npm run templates:recommend -- ci
```

展开一个具体试用配方：

```bash
npm run templates:recipes -- ci-failure
```

生成一个 15 分钟试用包：

```bash
npm run templates:trial -- --template pr-review --scenario "review a documentation PR" --output work/trial
```

如果你要排查 CI，可以改成：

```bash
npm run templates:trial -- --template ci-troubleshooting --scenario "debug a failing CI job" --output work/trial-ci
```

试用包会生成：

- `README.md`：试用步骤
- `<template>.md`：可填写的模板工作稿
- `feedback.md`：可复制到 GitHub issue 的反馈草稿

## 反馈时请写清楚

提交 feedback issue 时，尽量回答：

- 你试用了哪个模板、示例或 CLI 命令？
- 你的场景是什么？可以用公开安全的抽象描述。
- 输出是否能直接用于 PR、issue、CI、release 或文档维护？
- 哪个字段最有用？
- 哪个步骤不清楚？
- 还缺哪个技术栈、模板、案例或 CLI 能力？
- 是否允许维护者把你的反馈匿名整理成案例？

## 公开安全边界

不要提交这些内容：

- API key、token、密码、cookie
- 客户名称、订单、合同、内部域名
- 未公开源码、私有仓库链接、内部日志
- 生产事故敏感细节
- 个人隐私或未授权截图

如果你的真实场景敏感，请改写成抽象描述，例如：

```text
一个 Node.js 服务在 CI 中出现依赖安装失败。
一个 Python 包在 pytest 中出现版本差异导致的断言失败。
一个 README 改动需要 reviewer 检查是否清楚。
```

## 想贡献一个小 PR

如果你愿意贡献，优先看这些入口：

- [Good First Issues](first-issues.md)
- [贡献指南](../CONTRIBUTING.md)
- [外部贡献者引导模板](../templates/contributor-onboarding-template.md)

适合第一次贡献的小 PR：

- 修正一个不清楚的文档步骤
- 给模板增加边界条件
- 补充一个技术栈示例
- 把你的试用反馈匿名整理成案例
- 修复 CLI 文档和实际输出不一致的地方

小 PR 也可以，只要它能帮助下一个真实用户更快试用项目。
