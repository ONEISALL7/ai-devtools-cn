# 社区发布包

这个发布包用于 issue [#51](https://github.com/ONEISALL7/ai-devtools-cn/issues/51)：对外介绍 `ai-devtools-cn`，邀请真实开发者试用，并收集公开安全的反馈 issue 或外部 PR。

目标不是刷 star，也不是制造虚假活跃度。目标是找到真的会做 PR review、issue triage、CI 排错、release note 或文档维护的人，让他们用一个小场景试用模板或 CLI，再留下可核验反馈。

## CLI 入口

如果你要快速查看本发布包、反馈入口和外部 PR 邀请入口，可以运行：

```bash
npx ai-devtools-cn launch
```

在仓库本地开发时也可以运行：

```bash
npm run templates:launch
```

这个命令只打印公开链接、试用命令和记录原则，不会自动发布帖子，也不会把维护者自己的 issue 或 PR 计入外部采用证据。

## 当前可公开状态

发布时可以如实写：

- 仓库：<https://github.com/ONEISALL7/ai-devtools-cn>
- npm 包：<https://www.npmjs.com/package/ai-devtools-cn>
- npm 当前发布版本：`0.16.1`
- GitHub 最新 release：`v0.16.2`
- 外部反馈：已有 1 条公开 feedback issue，并已转化为 pnpm workspace CI 试用包
- 外部 merged PR：目前仍为 0

不要写：

- 已经被很多人使用
- 已经有很多外部贡献者
- npm 下载量很高
- 生态级基础设施

## 对外主张

推荐一句话：

```text
AI DevTools CN 是一个面向中文开发者和开源维护者的 AI 工程维护模板库，提供 PR review、issue triage、CI 排错、release note、安全审查、输出验收等可复制模板，并带有 CLI、真实维护案例和反馈入口。
```

更保守的说法：

```text
这是一个早期但持续维护的开源项目，正在收集第一批真实开发者反馈，重点验证这些模板和 CLI 是否能进入真实 PR、issue、CI、release 或文档维护流程。
```

## 最短试用路径

给外部试用者发这段即可：

```text
不用 clone 仓库，可以直接试：

npx ai-devtools-cn doctor
npx ai-devtools-cn launch
npx ai-devtools-cn contribute
npx ai-devtools-cn examples
npx ai-devtools-cn recommend ci
npx ai-devtools-cn trial --template pr-review --output work/trial

如果你在排查 CI，可以改成：

npx ai-devtools-cn trial --template ci-troubleshooting --scenario "debug a failing CI job" --output work/trial-ci

试完后请提交一条公开安全反馈：
https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml

不要提交 token、客户信息、内部日志、未公开源码或个人隐私。
```

如果对方想贡献 PR，发这个入口：

```text
先确认 npm 当前已发布版本：
npm view ai-devtools-cn version

如果 npx 提示未知命令，说明 npm 包还没有同步到 GitHub main 的最新 CLI；可以先让对方看文档，或你在仓库内用 npm run templates:* 生成材料。

不用打开文档，也可以先生成一份本地交接包：
npx ai-devtools-cn handoff --output work/external-pr-handoff.md

如果已经选定某个 issue，可以直接生成定向交接包：
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md

外部 PR 交接包：
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/external-pr-handoff-kit.md

Good First PR Briefs:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

可以从 #45-#49 中选一个小任务，brief 里已经写好建议标题、建议文件、验证方式和 PR 描述模板。

如果对方已经选定一个 issue，可以直接发：

npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md

把 `45` 替换成 #45-#49 中对方认领的 issue 编号。生成的本地草稿不算 external merged PR，只有对方用自己的 GitHub 账号提交并合并的 PR 才能记录。
```

## X / Twitter 文案

短版：

```text
我在维护一个中文开源项目：AI DevTools CN。

它不是提示词收藏夹，而是把 AI 放进真实工程维护流程：
- PR review
- issue triage
- CI debugging
- release note
- security review

现在有模板、CLI、真实案例和 npm 包。

想请 5-10 位开发者试用 15 分钟，给一个公开安全反馈：
https://github.com/ONEISALL7/ai-devtools-cn
```

带命令版：

```text
想找几位开源维护者试用 AI DevTools CN。

不用 clone，直接跑：

npx ai-devtools-cn doctor
npx ai-devtools-cn launch
npx ai-devtools-cn contribute
npx ai-devtools-cn examples
npx ai-devtools-cn trial --template pr-review --output work/trial

如果你经常 review PR、分流 issue、修 CI 或写 release note，欢迎给一个反馈 issue。

https://github.com/ONEISALL7/ai-devtools-cn
```

## V2EX / 掘金标题

```text
我做了一个中文 AI 工程维护模板库，想请大家试用和拍砖
```

```text
把 AI 接入 PR Review、Issue 分流和 CI 排错：一个中文开源模板库
```

```text
不是提示词合集：我整理了一套面向开源维护者的 AI 工作流模板
```

## 长帖正文

```text
大家好，我在维护一个开源项目 ai-devtools-cn。

项目地址：
https://github.com/ONEISALL7/ai-devtools-cn

它不是泛泛的提示词合集，而是把 AI 工具接入真实工程维护流程：

- PR review
- issue triage
- CI debugging
- release notes
- security review
- dependency upgrade review
- AI output evaluation

现在项目已经有：

- 可复制模板
- CLI
- npm 包
- 真实维护案例
- 外部试用者指南
- Good First PR Briefs

我现在最需要的不是 star，而是真实反馈：

1. 哪个模板对你最有用？
2. 哪个场景还缺？
3. CLI 是否方便？
4. 输出能不能直接放进 issue、PR、CI 或 release？

不用 clone 也能试：

npx ai-devtools-cn doctor
npx ai-devtools-cn launch
npx ai-devtools-cn examples
npx ai-devtools-cn recommend ci
npx ai-devtools-cn trial --template pr-review --output work/trial

反馈入口：
https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml

如果你愿意贡献一个小 PR，可以看：
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

选定任务后可以生成认领草稿和内容起稿：
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md

请不要在公开 issue 里提交 token、客户信息、内部日志、未公开源码或个人隐私。
```

## 私信邀请文案

```text
我在维护一个中文开源项目 AI DevTools CN，想请你帮忙做一次 15 分钟试用。

它主要服务开源维护场景：PR review、issue triage、CI 排错、release note、文档维护。

如果你愿意，可以不用 clone，直接跑：

npx ai-devtools-cn doctor
npx ai-devtools-cn launch
npx ai-devtools-cn examples
npx ai-devtools-cn trial --template pr-review --output work/trial

试完后给一条公开安全反馈即可：
https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml

如果你的真实场景包含私有代码或内部日志，请匿名化描述，不要发敏感信息。
```

## 外部 PR 邀请文案

```text
如果你愿意贡献一个很小的 PR，可以看这个 Good First PR Briefs：

https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

里面把 #45-#49 拆成了可直接认领的小任务，每个都有建议 PR 标题、建议文件、验证方式和 PR 描述模板。

认领前可以先生成本地草稿：

npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md

把 45 换成你想认领的 issue 编号。本地草稿不算外部 PR；只有你用自己的 GitHub 账号提交并合并的 PR 才算 external merged PR。

最适合第一次贡献的方向：

- Node.js CI 排错示例
- Python PR review 示例
- 前端 README 改进示例
- 依赖升级风险示例
- 用户反馈案例整理文档
```

## 发布后记录到 #51

发布后，把下面这段填到 issue [#51](https://github.com/ONEISALL7/ai-devtools-cn/issues/51)：

```text
日期：
渠道：
发布链接：
邀请人数：
收到的公开反馈 issue：
收到的外部 PR：
新增 stars/forks：
下一步改进：
```

## 收到反馈后的处理

1. 确认反馈是否来自真实试用。
2. 检查是否包含敏感信息；如果有，先请对方删除或改写。
3. 给 issue 加上 `feedback`、`template`、`cli` 或 `case-study` 标签。
4. 如果能立刻改文档或案例，开一个小 PR。
5. 如果反馈能沉淀为案例，询问是否允许匿名整理。
6. 运行证据台账：

   ```bash
   npm run templates:evidence -- --output work/external-evidence.md
   ```

## 申请材料边界

可以写进申请材料：

- 公开 feedback issue 链接
- 公开外部 PR 链接
- npm 包链接和可核验版本
- 公开帖子、博客、讨论链接
- 经允许匿名化的真实使用案例

不能写进申请材料：

- 维护者自己创建的 issue 伪装成外部反馈
- 维护者自己提交的 PR 伪装成外部 PR
- 没有公开链接的口头反馈
- 未经允许的私聊截图
- 夸大的 stars、下载量、用户数
