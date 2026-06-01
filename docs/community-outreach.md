# 社区推广和反馈收集

这个文档用于帮助维护者把 `ai-devtools-cn` 推给真实用户，并收集可公开的使用反馈。

目标不是刷数据，而是找到真正需要 AI 维护模板的开发者，收集反馈并改进项目。

## 当前推荐主张

推荐把项目介绍成：

```text
一个面向中文开发者和开源维护者的 AI 工程维护模板库，提供 PR review、issue triage、CI 排错、release note、安全审查、输出验收等可复制模板，并带有本地 CLI、真实维护案例和反馈入口。
```

不要把项目介绍成“已经被很多人使用”或“生态级基础设施”。当前更准确的说法是：

```text
早期但持续维护，已经有模板、案例、CLI、release、issue/PR 维护记录，正在收集第一批真实用户反馈。
```

## 推广目标

优先收集这些信号：

- GitHub stars 和 forks
- npm 下载量
- template usage feedback issue
- 外部用户提出的问题
- 外部贡献者 PR
- 真实案例补充

如果是第一次对外发布，建议先按 [第一批用户试用计划](first-user-test-plan.md) 邀请 5-10 位开发者完成固定试用任务，并把 [外部试用者快速指南](external-tester-guide.md) 发给对方，再收集反馈。

如果要直接复制发布文案、私信邀请和外部 PR 邀请，使用 [社区发布包](community-launch-pack.md)。它会汇总当前可公开状态、npm 发布边界、clone 试用路径、feedback issue 入口和 Good First PR Briefs 入口。

如果你想把这件事压缩成一周执行，可以先生成外部试用冲刺包：

```bash
npm run templates:adoption -- --template pr-review --scenario "review a documentation PR" --output work/adoption-sprint
```

冲刺包会包含多渠道邀请文案、反馈记录表和外部贡献者邀请文案，适合记录 issue #51 这类真实推广任务。

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

现在还支持 CLI 生成工作稿、列出案例和按任务推荐模板。

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

v0.17.x 当前包含：
- 开源维护者工作包
- 反馈 issue 草稿生成命令
- 模板注册校验命令
- examples 命令：列出基础示例、真实维护案例和试用包
- recommend 命令：按任务关键词推荐模板和案例
- recipes 命令：按真实维护场景给出 10-20 分钟试用步骤
- pr-pack / claim / starter：帮助外部贡献者从 good first issue 开始提交 PR
- 真实维护案例
- 用户反馈入口

https://github.com/ONEISALL7/ai-devtools-cn
```

反馈版：

```text
我在维护一个早期中文开源项目：AI DevTools CN。

它不是提示词收藏夹，而是把 AI 放进真实维护流程：
- PR review
- issue triage
- CI debugging
- release note
- security review
- output evaluation

现在有模板、CLI、真实案例和 GitHub v0.17.1 release；npm 0.17.1 同步中。

想请 5-10 位开发者试用一个模板，给我一个 issue 反馈：
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
- examples / recommend / trial commands
- recipes / pr-pack / review-pr commands

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

## 发布前检查

发布前确认：

- README 顶部能说明项目用途
- `v0.17.1` release 已存在
- npm 是否已经同步到 `0.17.1`；未同步时，对外文案优先使用 clone + `npm run templates:*`
- issue 模板可用
- [第一批用户试用计划](first-user-test-plan.md) 和 [外部试用者快速指南](external-tester-guide.md) 可直接发给试用者
- [用户反馈](feedback.md) 和 [支持入口](../SUPPORT.md) 可访问
- README 中展示 examples、recommend 和 trial 的最短路径
- 不在文案中夸大 stars、下载量或用户数
- 不承诺 AI 能替代维护者判断

发布后建议在 issue #51 记录：

```text
发布日期：
发布渠道：
链接：
收到的 stars/forks：
收到的反馈 issue：
下一步要改的模板或文档：
```

如果已经有外部反馈、外部 PR 或公开提及，建议同步生成外部采用证据台账：

```bash
npm run templates:adoption -- --output work/adoption-sprint
npm run templates:evidence -- --output work/external-evidence.md
```

台账只记录可核验链接和经允许整理的匿名案例，不记录私聊敏感内容，也不把维护者自己的维护记录写成外部采用。

## 反馈收集方式

引导用户使用：

- [用户反馈](feedback.md)
- [外部试用者快速指南](external-tester-guide.md)
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
