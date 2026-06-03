# OpenAI Codex for Open Source 申请当前核验索引（2026-06-03）

**生成时间（本地）**：2026-06-03 22:15  
**目标仓库**：[ONEISALL7/ai-devtools-cn](https://github.com/ONEISALL7/ai-devtools-cn)

## 一、公开可核验材料（建议用于提交前自检）

- `work/metrics-20260603-2215.md`
- `work/external-evidence-20260603-2215.md`
- `work/openai-readiness-20260603-2215.md`
- `docs/external-adoption-log-2026-06-03.md`（对外动作与缺口追踪）
- `docs/external-tester-guide.md`（试用反馈入口）
- `.github/ISSUE_TEMPLATE/template_feedback.yml`
- `.github/ISSUE_TEMPLATE/external_pilot_feedback.yml`

## 二、最近一次核验结果（命令输出）

执行命令：

```bash
npm run test
npm run templates:publish-check
npm run pack:dry-run
npm run templates:publish-status
npm run templates:evidence -- --output work/external-evidence-20260603-2215.md --force
npm run metrics:snapshot -- --output work/metrics-20260603-2215.md --force
npm run templates:readiness -- --output work/openai-readiness-20260603-2215.md --force
```

核验结果摘要：

- 仓库状态：对齐（`package.json`、`npm`、`GitHub latest release` 均为 `0.18.3`）  
- 发布检验：`npm run templates:publish-check`、`npm run pack:dry-run`、`npm run templates:publish-status` 均通过  
- 质量检验：`npm run test`、`npm run lint:md`（在日志中通过）  
- 外部反馈口径：外部 feedback issue 为 1（#169）  
- 外部采纳口径：external merged PR 为 1（#245）  
- 仓库指标：Stars 3 / Forks 2 / merged PRs 131 / releases 31
- npm：月下载 926（last-month）
- 当前差距：真实外部反馈入口已就绪，但需继续增加真实反馈（目标 2-3 条）与其外部 PR 转化。

## 三、可复用证据文本（可直接贴申请表）

- Describe your role：
  > I am the primary maintainer of this public repository ai-devtools-cn. I review and merge PRs, triage issues, maintain releases, and curate templates and case studies used by Chinese OSS maintainers for real maintenance workflows such as PR review, issue triage, CI troubleshooting, and release documentation.

- Why does this repository qualify?：
  > This repository is a public OSS project that provides reusable maintenance templates and CLI workflows for real maintainer tasks. It includes PR review, issue triage, CI troubleshooting, release note drafting, and quality evaluation content with concrete examples. The project is actively maintained with releases, issue/PR history, and feedback pathways for external users.

- How will you use API credits?：
  > I will use API credits to speed up maintainer workloads: review note drafting, issue triage, CI failure triage, dependency risk analysis, release note preparation, and external feedback conversion into reviewable, high-quality maintainer artifacts.

## 四、下一步（下一次迭代必须执行）

1. 用真实账号向 3 位真实外部使用者发出邀请（PR review/CI/issue triage 之一场景即可）  
2. 每次反馈落地后 24 小时内补一条公开案例记录到 `docs/external-adoption-log-2026-06-03.md`  
3. 形成 2-3 条真实外部反馈后，优先推动 1 个外部 good-first 认领并追踪到 merged 外部 PR  
4. 任何新动作后立即重跑本页“最近一次核验结果”三条命令  
   （`metrics:snapshot` / `templates:evidence` / `templates:readiness`）  
