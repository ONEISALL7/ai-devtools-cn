# OpenAI Codex for Open Source 申请材料包

这个文档是你在提交 OpenAI 资格申请前的“最后打包页”。目标是：把“我做了很多事情”变成“我有可核验证据”。

## 1. 一页版项目定位（可直接放到申请表）

**项目：** AI DevTools CN（`https://github.com/ONEISALL7/ai-devtools-cn`）  
**类型：** 中文开源维护工具库（模板、CLI、案例、反馈入口）  
**维护角色：** Primary Maintainer / Core Maintainer（仓库公共维护者）  
**作用：** 把 AI 真实接入到开源维护流程，而不是提示词展示：PR review、issue triage、CI 排错、release note、文档维护、依赖风险判断、输出验收。

### 该放入 `Describe your role` 的简版

```text
I am the primary maintainer of this public repository ai-devtools-cn. I review and merge PRs, triage issues, maintain releases, and curate templates and case studies used by Chinese OSS maintainers for real maintenance workflows such as PR review, issue triage, CI troubleshooting, and release documentation.
```

### 该放入 `Why does this repository qualify?` 的简版

```text
This repository is a public OSS project that provides reusable maintenance templates and CLI workflows for real maintainer tasks. It includes PR review, issue triage, CI troubleshooting, release note drafting, and quality evaluation content with concrete examples. The project is actively maintained with releases, issue/PR history, and feedback pathways for external users.
```

### 该放入 `How will you use API credits?` 的简版

```text
I will use API credits to speed up maintainer workloads: review note drafting, issue triage, CI failure triage, dependency risk analysis, release note preparation, and external feedback conversion into reviewable, high-quality maintainer artifacts.
```

## 2. 可核验证据清单（每周更新）

> 这些项必须与可公开链接绑定，避免“自测=外部采用”这类问题。

### 代码与仓库健康

- `Repository`：`https://github.com/ONEISALL7/ai-devtools-cn`
- `README`、`CONTRIBUTING`、`SECURITY`、`MAINTAINERS`、`CHANGELOG`、`.github` 配置已公开可用
- CI 与测试可复现（`npm run test` / `npm run lint:md`）
- 发布记录与 tag 可核验

### 外部采用（最关键）

- 外部 feedback issue 数量（需有公开链接）
- 外部反馈 issue 中是否包含可复核上下文（场景、试用途径、是否用于 PR/issue/CI/release）
- 外部 PR（由非 maintainer 账号提交并已合并）

### 当前可核验外部采用快照（可直接粘贴）

- 外部 feedback issue（含场景）：1（`https://github.com/ONEISALL7/ai-devtools-cn/issues/169`）
- 外部 merged PR：1（`https://github.com/ONEISALL7/ai-devtools-cn/pull/245`）
- GitHub stars/forks：3 / 2
- merged PRs：131（`npm run metrics:snapshot`）
- External feedback-labeled issue：1
- npm：0.18.1（`npm view ai-devtools-cn version`）
- npm 月下载：116（`2026-05-02 ~ 2026-05-31`）
- GitHub release：`v0.18.3`

### npm 与使用指标

- GitHub: Stars / Forks / merged PRs / external merged PRs（`npm run metrics:snapshot`）
- npm: `npm view ai-devtools-cn version`
- npm 月下载：`curl -L https://api.npmjs.org/downloads/point/last-month/ai-devtools-cn`

### 证据命令（建议每周留痕一次）

```bash
npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md
npm run templates:evidence -- --output work/external-evidence-YYYY-MM-DD.md
```

## 3. “真实采用”定义边界（提交前必须统一）

可算外部反馈证据：

- 作者非 maintainer，且非 bot
- issue / PR / 评论含可公开链接
- 来源是真实使用或试用，而不是维护者自测演练

不可算外部采用：

- 维护者本地 `claim`/`starter`/`hand off` 文稿
- 维护者自己提交的 PR（哪怕内容再完整）
- 没有场景与公开核验链接的“口头反馈”

## 4. 现在就能提交的周报模板（可复制）

```text
日期：
周期：
本周核验：
- metrics snapshot: work/metrics-YYYY-MM-DD.md
- external evidence: work/external-evidence-YYYY-MM-DD.md

外部反馈：
- issue:
- 公开场景:
- 是否 external:

外部 PR：
- PR:
- 作者:
- 关联 issue:
- 是否已合并:
- 外部审核结论:

公开案例沉淀：
- 文档/案例文件:
- 复用价值:

下一步：
```

## 5. 一键自检（提交前 2 分钟核对）

```text
- [ ] README/CONTRIBUTING/SECURITY/MAINTAINERS/CHANGELOG 可公开访问
- [ ] 至少 1 条真实外部反馈 issue（外部账号）
- [ ] 正在持续邀请外部试用者并有跟进记录
- [ ] 至少 1 个真实案例可复用（非内部演示）
- [ ] external merged PR 进展有记录（0 也可写，但需解释追踪动作）
```

推荐提交前先运行：

```bash
npm run templates:publish-status
npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md
npm run templates:evidence -- --output work/external-evidence-YYYY-MM-DD.md
npm run templates:readiness -- --output work/openai-readiness-YYYY-MM-DD.md
```

## 6. 关联文档入口

- `docs/open-source-readiness-pack.md`
- `docs/feedback-case-guide.md`
- `docs/external-pr-handoff-kit.md`
- `docs/community-launch-pack.md`
- `docs/day8-day30-checklist.md` / `docs/day8-day30-execution-log.md`

## 7. 可直接贴到申请表的英文版简述（< 500 字）

AI DevTools CN is a public Chinese-first toolkit for open-source maintenance, not a generic prompt collection. It provides reusable templates and workflows for PR review, issue triage, CI troubleshooting, release note drafting, and repository maintenance documentation. The project is actively maintained and has released versions with transparent CI and publishing records. It has external user feedback from GitHub issue #169 and one external merged PR (#245) that converted feedback into a concrete case study, which is now publicly documented. I use Codex/API credits for high-frequency maintainer tasks: review-note drafting, issue triage, CI failure analysis, dependency risk assessment, and feedback-to-doc workflow improvements, so one maintainer can keep up with response quality and review speed without replacing human judgment.
