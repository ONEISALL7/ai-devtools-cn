# Codex for Open Source 申请准备

最后核验日期：2026-06-01

官方入口：[Codex for Open Source](https://openai.com/form/codex-for-oss/)

这个项目如果要用于申请开源维护支持，关键不是“项目刚创建”，而是持续证明它有真实维护价值。

## 官方关注点

根据官方申请页，申请人需要提供：

- ChatGPT 账号邮箱
- GitHub username
- 公开仓库 URL
- 你在项目中的角色
- 项目为什么符合资格
- OpenAI Organization ID
- API credits 的项目用途

官方说明强调 active open-source projects、meaningful usage、broad adoption、ecosystem importance，以及 primary/core maintainer 的真实维护责任。

## 本项目需要积累的证据

### 维护者证据

- commit 记录
- PR review 记录
- issue triage 记录
- release 记录
- 文档更新记录
- 安全或依赖问题处理记录

### 项目价值证据

- GitHub stars
- forks
- external mentions
- 真实用户反馈
- 被其他项目、文章或团队引用
- issue 和 PR 活跃度

### 项目成熟度证据

- README
- LICENSE
- CONTRIBUTING
- SECURITY
- MAINTAINERS
- ROADMAP
- CHANGELOG
- CI
- release tags

## 申请前建议门槛

建议至少达到：

```text
维护时间：30-90 天
release：2 个以上
模板：10 个以上
真实 issue：5 个以上
真实 PR：2 个以上
stars：20 个以上更有说服力
用户反馈：至少 3 条
```

这些不是官方硬性门槛，而是让申请材料更可信的实践目标。

## 当前真实快照

截至 2026-06-01，`ai-devtools-cn` 最新版本是 `v0.10.0`：

- GitHub stars：2
- Forks：1
- Merged PRs：61
- Closed issues：60
- Releases：11
- External merged PRs：0
- External feedback issues：0
- npm package：not published or unavailable

这些数字能证明维护活动，但还不能证明广泛采用。申请时必须把“活跃维护记录”和“外部采用证据”分开写。

## Describe your role 草稿

```text
I am the primary maintainer of this repository. I maintain the documentation and templates, review pull requests, triage issues, manage releases, update project workflows, and ensure the templates stay safe, practical, and useful for Chinese AI developers.
```

## Why does this repository qualify 草稿

```text
This public OSS project provides Chinese AI developer workflow templates for PR review, issue triage, test generation, documentation, releases, and tool evaluation. It helps developers and maintainers adopt AI tools safely and consistently. The project has 61 merged PRs, 60 closed issues, 11 releases, CI, a CLI, and public feedback channels.
```

提交前请把最后一句改成真实数据，例如：

```text
The project has X stars, Y issues, Z PRs, N releases, and feedback from Chinese developers using the templates in real projects.
```

## How will you use API credits 草稿

```text
We will use API credits to support open-source maintenance workflows: PR review assistance, issue triage, template quality checks, test generation, documentation updates, release note drafting, and automation that helps maintainers keep the project accurate, safe, and useful.
```

## 不要写

```text
I want free ChatGPT Pro.
I want to try Codex.
This is a new project but may become popular.
I can promote OpenAI.
```

申请材料必须和公开仓库记录一致。
