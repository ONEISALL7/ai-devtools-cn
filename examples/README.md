# 示例目录

这里收集模板的使用示例和真实维护案例。模板告诉你“怎么问”，示例告诉你“问完以后应该得到什么样的结果”。

## 基础示例

| 示例 | 适合场景 | 对应模板 |
| --- | --- | --- |
| [PR Review 示例](pr-review-example.md) | 学习如何输出 review 结论 | [PR Review 模板](../templates/pr-review-template.md) |
| [Issue Triage 示例](issue-triage-example.md) | 学习如何分流 issue | [Issue Triage 模板](../templates/issue-triage-template.md) |
| [CI 排错示例](ci-troubleshooting-example.md) | 学习如何处理失败日志 | [CI 排错模板](../templates/ci-troubleshooting-template.md) |
| [Release note 示例](release-note-example.md) | 学习如何写发版说明 | [发布说明模板](../templates/release-note-template.md) |

## 真实维护案例

这些案例来自本仓库真实维护记录，包含可复制输入、期望输出和维护者验收标准。

| 案例 | 你能学到什么 |
| --- | --- |
| [用 PR Review 模板审查快速上手 PR](case-studies/pr-review-quickstart-release.md) | 如何审查文档入口型 PR |
| [用 CI 排错模板修复 markdownlint MD012](case-studies/ci-markdownlint-md012.md) | 如何从 CI 日志定位最小修复 |
| [用 release note 模板发布 v0.2.0](case-studies/release-v020.md) | 如何把 PR 和 changelog 整理成 release note |
| [Node.js CI 依赖安装失败场景](case-studies/node-ci-troubleshooting.md) | 如何处理 npm ci lockfile 不一致并给出可复用 review comment |
| [Python PR Review：函数签名变更](case-studies/python-pr-review-example.md) | 如何区分阻塞项、回归风险与验证边界 |
| [依赖升级风险评估场景](case-studies/dependency-upgrade-risk-example.md) | 如何给升级 PR 做风险分层与回滚准备 |
| [前端 README 改进案例](case-studies/frontend-readme-improvement-example.md) | 如何把 README 从“看得懂”变成“能跑起来” |

## 第一批用户试用包

试用包示例展示 `doctor`、`trial`、模板工作稿和 feedback 草稿如何组成一次 15 分钟外部试用。

| 示例 | 你能学到什么 |
| --- | --- |
| [PR Review 文档改动试用包](trial-packs/pr-review-docs/README.md) | 如何邀请外部 reviewer 试用模板并提交匿名化反馈 |
| [Node.js CI 排错试用包](trial-packs/node-ci-failure/README.md) | 如何邀请维护者用失败日志试用 CI 排错模板 |
| [Python pytest 失败试用包](trial-packs/python-pytest-failure/README.md) | 如何邀请 Python 维护者排查 pytest 和依赖差异 |
| [pnpm workspace CI 排错试用包](trial-packs/pnpm-workspace-ci/README.md) | 如何回应外部反馈并排查 monorepo workspace 依赖构建问题 |

## 怎么复用示例

1. 找到和你任务最接近的示例。
2. 复制示例中的输入结构。
3. 替换成你的项目背景、日志、PR 或 release 信息。
4. 对照示例里的验收标准检查 AI 输出。

不要直接照搬示例中的结论。示例里的文件名、版本号和日志只适用于本仓库。
