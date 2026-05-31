# 项目指标追踪

这个文档说明如何定期记录 `ai-devtools-cn` 的公开项目指标，用于维护复盘、社区采用判断和 OpenAI OSS 申请材料准备。

## 为什么要记录指标

Open-source 申请材料不能只写“项目有价值”，还需要逐步积累可验证信号：

- stars
- forks
- merged PRs
- closed issues
- releases
- npm 发布状态
- feedback issues
- external PRs

指标不需要夸大，但需要持续、可追踪。

## 生成快照

```bash
npm run metrics:snapshot
```

写入本地文件：

```bash
npm run metrics:snapshot -- --output work/metrics.md
```

`work/` 已加入 `.gitignore`，适合保存本地草稿。

## 记录外部采用证据

指标快照只能告诉你“数量是多少”，不能替代人工判断证据是否真实、可公开、可核验。收到外部反馈或外部 PR 后，可以生成证据台账：

```bash
npm run templates:evidence -- --output work/external-evidence.md
```

台账用于记录：

- npm 包发布链接和版本
- 外部 feedback issue
- 外部贡献者 PR
- 公开帖子、博客、讨论或引用
- 经允许匿名化整理的真实案例

不要把维护者自己创建的 issue、测试 issue、占位 issue 或无法核验的说法写成外部采用证据。

## 依赖

脚本依赖本机已有：

- GitHub CLI：`gh`
- npm

如果 `gh` 未登录，部分指标会显示 `unknown` 或 `unavailable`。

## 建议频率

每周记录一次：

```bash
npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md
```

推荐观察：

| 指标 | 为什么重要 |
| --- | --- |
| Stars | 初步兴趣信号 |
| Forks | 潜在复用和二次开发信号 |
| npm downloads | CLI 实际使用信号 |
| Feedback issues | 真实用户反馈 |
| External PRs | 外部贡献证据 |
| Releases | 持续维护记录 |

脚本会在快照中区分：

- `Merged PRs`：所有已合并 PR，包括维护者自己的维护 PR。
- `External merged PRs`：作者不是仓库 owner 且不是 bot 的已合并 PR。
- `Feedback-labeled issues`：带 `feedback` label 的 open 和 closed issue，不一定等同于外部用户反馈。
- `External feedback-labeled issues`：作者不是仓库 owner 且不是 bot 的 feedback-labeled issue。

这些字段只是初筛。申请材料中仍应人工确认来源，不要把维护者自己创建的反馈入口、测试 issue 或占位 issue 写成外部用户反馈。

## 使用原则

- 不手动夸大指标。
- 不把自己创建的维护 issue 包装成外部用户反馈。
- 区分“维护记录”和“采用证据”。
- 申请时注明日期和统计来源。
