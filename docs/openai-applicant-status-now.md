# OpenAI Codex for Open Source（今日实时状态）

更新时间：2026-06-03

## 1) 当前核验口径（可直接用于申请截图说明）

- 仓库：`https://github.com/ONEISALL7/ai-devtools-cn`
- 发布版本：`ai-devtools-cn@0.18.3`
- 公开 npm 包：`0.18.3`（`npm view ai-devtools-cn version`）
- GitHub latest release：`v0.18.3`
- `npm run test`：通过
- `npm run templates:publish-check`：通过
- `npm run pack:dry-run`：通过
- `npm run lint:md`：通过
- 可核验指标（`npm run metrics:snapshot`）：
  - 外部 feedback issue：`1`（[#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169)）
  - external merged PR：`1`（[#245](https://github.com/ONEISALL7/ai-devtools-cn/pull/245)）
  - Stars/Forks：`3 / 2`
  - Merged PRs：`131`

## 2) 已达到的 OpenAI 资格前置

- 公开仓库、`README`、`CONTRIBUTING`、`SECURITY`、`MAINTAINERS`、`LICENSE`、`CHANGELOG` 已具备
- 反馈入口已具备（`template_feedback.yml` / `external_pilot_feedback.yml`）
- 有真实案例与可复用场景（PR Review、CI troubleshooting、issue triage、release）
- 已有稳定的证据输出链路（`work/metrics-*.md`、`work/external-evidence-*.md`、`work/openai-readiness-*.md`）

## 3) 当前仍缺口（按官方口径）

- 外部反馈信号偏少（建议补齐到 2–3 条）
- 外部 merged PR 仍需持续补充（建议再争取 1–2 条）

## 4) 直接执行（下一步）

1. 先发三类真实邀请（同一周内跟进）：
   - [work/outreach-now.md](/Users/mingliang/Documents/Codex/2026-05-31/chatgpt-github-primary-maintainer-core-maintainer/outputs/ai-devtools-cn/work/outreach-now.md)
   - [work/adoption-now.md](/Users/mingliang/Documents/Codex/2026-05-31/chatgpt-github-primary-maintainer-core-maintainer/outputs/ai-devtools-cn/work/adoption-now.md)（含 7 天推进节奏）
2. 任何反馈都在公开 issue 留下可核验链接，按 `docs/external-pr-handoff-kit.md` 引导到处理闭环
3. 外部用户提交可认领 issue 后，给 `good first issue` / 简短任务，促成外部 PR
4. 收到每条新反馈后，立刻再跑一次：
   - `npm run metrics:snapshot -- --output work/metrics-<timestamp>.md`
   - `npm run templates:evidence -- --output work/external-evidence-<timestamp>.md`
   - `npm run templates:readiness -- --output work/openai-readiness-<timestamp>.md`
