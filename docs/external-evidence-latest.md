# AI DevTools CN 外部采用证据台账

生成日期：2026-06-04

这个台账用于记录**可公开核验**的外部采用信号，辅助 OpenAI 申请材料与项目运营复盘。它不是宣传稿，也不能把维护者自建行为当外部采用。

## 记录原则

- 只记录可核验链接（issue、PR、release、npm、公开帖子）。
- 区分 maintainer 活动与 external 采集信号。
- 外部 feedback issue 要是非 maintainer 公开账号提交。
- External merged PR 只计入非 maintainer 作者提交并合并的 PR。
- 外部反馈驱动的 maintainer PR / release 要明确标记为 feedback-driven，不计 external merged PR。
- claim/starter/feedback 模板是内部准备稿，可用于外部协作流程，不应计为 external merged PR。
- 不记录 API key、token、客户信息、敏感日志、未公开源码和个人隐私。

## 关键快照

| 指标 | 值 |
| --- | --- |
| GitHub Stars | 3 |
| Forks | 2 |
| Merged PRs | 131 |
| External merged PRs（非 maintainer） | 1 |
| Open issues | 5 |
| Closed issues | 110 |
| Feedback-labeled issues（全部） | 22 |
| External feedback issues（非 maintainer） | 1 |
| Releases | 31 |
| Latest release | v0.18.3 (2026-06-02) |
| npm package | <https://www.npmjs.com/package/ai-devtools-cn> |
| npm version | 0.18.3 |
| npm last-month downloads | 926 |

## 证据记录（可直接复制到提交说明）

### 外部反馈（external feedback issue）

- 2026-06-01 | external feedback issue | [#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169) - [Feedback]: | @oneshots | <https://github.com/ONEISALL7/ai-devtools-cn/issues/169>

### 外部采纳（external merged PR）

- 2026-06-02 | external merged PR | [#245](https://github.com/ONEISALL7/ai-devtools-cn/pull/245) - docs(examples): add Python bug fix PR review example | @Jah-yee | <https://github.com/ONEISALL7/ai-devtools-cn/pull/245>

### 其他可核验链路

- npm publish： <https://www.npmjs.com/package/ai-devtools-cn>
- GitHub release： <https://github.com/ONEISALL7/ai-devtools-cn/releases>
- 仓库主页： <https://github.com/ONEISALL7/ai-devtools-cn>
- feedback entry template： <https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml>
- external pilot template： <https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=external_pilot_feedback.yml>

### 申请场景可复制文本

The project is a public OSS repository with reusable maintenance templates for PR review, issue triage, CI troubleshooting, and release workflows. Recent external signals include external feedback issues and external merged PRs shown above, plus a published npm package and public release history. We separate external feedback-driven maintainer work from true external adoption signals in this evidence ledger.

## 可计入公开证据台账的内容

- npm package 已发布，可通过 npx / doctor 与 release 链接核验。
- 外部用户提交的 feedback issue（非 maintainer）。
- 外部贡献者提交并合并的 PR（external merged PR）。
- 基于外部 feedback issue 完成的维护者 PR/release，但需在 notes 中标注 feedback-driven。
- 公开帖子、文章、课程、社区讨论中可核验的提及。
- 经对方授权后可匿名化沉淀的真实案例。

## 不应计入外部采用的内容

- 维护者自己创建/关闭的 issue。
- 维护者自己提交的 PR 与 maintainer 自建测试 PR。
- maintainer 的 claim / starter / feedback 本地草稿：generated local drafts are not external merged PRs。
- 仅内部讨论、截图/口头说法、无链接内容。

## 下次执行动作

1. 每次新增外部反馈后，立即追加一条日志行到本台账。
2. 继续做真实外部试用邀约（5-10 位/周）并引导提交 feedback issue。
3. 邀请至少 1 位外部贡献者认领 good first issue，并追踪其 PR 合并情况。
4. 每日/每次发布后跑一次：

```bash
npm run metrics:snapshot -- --output work/metrics-$(date +%F).md
npm run templates:evidence -- --output work/external-evidence-$(date +%F).md --force
npm run templates:readiness -- --output work/openai-readiness-$(date +%F).md --force
```
