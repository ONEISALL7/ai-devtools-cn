# 社区推广和反馈收集

这个文档用于帮助维护者把 `ai-devtools-cn` 推给真实用户，并收集可公开的使用反馈。

目标不是刷数据，而是找到真正需要 AI 维护模板的开发者，收集反馈并改进项目。

## 推广目标

优先收集这些信号：

- GitHub stars 和 forks
- npm 下载量
- template usage feedback issue
- 外部用户提出的问题
- 外部贡献者 PR
- 真实案例补充

## 推荐发布渠道

| 渠道 | 目标 |
| --- | --- |
| X/Twitter | 触达 AI/开源/开发者工具用户 |
| V2EX | 找中文开发者反馈 |
| 掘金 | 展示中文教程和项目用途 |
| GitHub README | 承接搜索和转发流量 |
| 开发者微信群/社群 | 获取早期使用反馈 |
| 个人博客 | 说明项目设计思路 |

## X/Twitter 文案

短版：

```text
很多人会用 AI 写代码。

但真正难的是：怎么把 AI 接进真实工程维护流程。

我做了一个中文开源模板库：
PR Review、Issue 分流、CI 排错、Release Note、安全审查，全都能直接复制使用。

现在还支持 CLI 生成工作稿。

https://github.com/ONEISALL7/ai-devtools-cn
```

功能版：

```text
我做了一个给中文开发者的 AI 工程维护工具库：AI DevTools CN。

不是又一个“提示词合集”。

它能直接用于：
- PR Review
- Issue 分流
- CI 排错
- Release Note
- 安全审查
- AI 输出质量评估

还加了 CLI，一条命令生成可填写的模板工作稿。

https://github.com/ONEISALL7/ai-devtools-cn
```

## V2EX/掘金标题

可以使用这些标题：

```text
我做了一个中文 AI 工程维护模板库，想请大家试用和拍砖
```

```text
把 AI 接入 PR Review、Issue 分流和 CI 排错：一个中文开源模板库
```

```text
不是提示词合集：我整理了一套面向开源维护者的 AI 工作流模板
```

## 帖子正文结构

```text
大家好，我做了一个开源项目 ai-devtools-cn。

项目目标：
帮助中文开发者把 AI 工具接入真实工程维护流程，而不是只停留在“帮我写代码”。

目前支持：
- PR review
- issue triage
- CI debugging
- release notes
- security review
- dependency upgrade review
- AI output evaluation
- template CLI

为什么做：
我发现很多人会用 AI 写代码，但不知道怎么稳定用于 review、排错、发版和维护。这个项目把这些流程整理成可复制模板和案例。

欢迎大家试用：
https://github.com/ONEISALL7/ai-devtools-cn

如果你愿意反馈，最想知道：
1. 哪个模板对你最有用？
2. 哪个场景还缺？
3. CLI 是否方便？
4. 输出能不能直接放进 issue、PR 或 release？
```

## 反馈收集方式

引导用户使用：

- [用户反馈](feedback.md)
- GitHub issue template: Template usage feedback

建议维护者定期整理反馈：

| 反馈数量 | 动作 |
| --- | --- |
| 1-3 条 | 修正文档和模板描述 |
| 4-10 条 | 增加真实案例 |
| 10 条以上 | 发布反馈驱动版本 |

## 维护者回复模板

```text
感谢反馈。这个场景很适合沉淀成模板/案例。

我会先确认：
1. 这个问题是否已有模板覆盖；
2. 当前模板哪里不清楚；
3. 是否需要新增案例或 CLI 功能。

如果你愿意，我会把你的反馈匿名整理进项目案例中，不包含任何私有代码或敏感信息。
```

## 衡量指标

每周记录一次：

- stars
- forks
- npm downloads
- opened feedback issues
- merged external PRs
- new case studies
- release count

这些指标可以帮助判断项目是否真正被使用，也能辅助后续申请开源维护者支持。
