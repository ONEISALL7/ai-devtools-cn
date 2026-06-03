# 外部反馈链路证据快照（2026-06-03）

## 运行环境

- 日期：2026-06-03
- 本地路径：`/Users/mingliang/Documents/Codex/2026-05-31/chatgpt-github-primary-maintainer-core-maintainer/outputs/ai-devtools-cn`
- 网络依赖：需要访问 GitHub API 与 npm Registry（本轮 `npm run metrics:snapshot`、`npm view`、`gh`/发布口径命令可复核）

## 已完成且可核验的项

- 仓库治理与文档入口存在：README/CONTRIBUTING/SECURITY/MAINTAINERS/ROADMAP/CHANGELOG
- 贡献与反馈入口存在：`template_feedback`、`external_pilot_feedback`、`issue template`
- `npm run metrics:snapshot` 已执行并产出：
- Stars/Forks/Merged PRs：3 / 2 / 131
- External merged PRs：1
- External feedback-labeled issues：1
  - npm 版本：0.18.3（public）
  - package.json：0.18.3；GitHub release：v0.18.3
- `npm run templates:evidence` 快照已补齐：
  - `work/metrics-2026-06-03-1900.md`
  - `work/metrics-2026-06-03-late.md`
  - `work/metrics-2026-06-03-2350.md`
  - `work/external-evidence-2026-06-03.md`
  - `work/external-evidence-2026-06-03-late.md`
  - `work/external-evidence-2026-06-03-2350.md`
  - `work/openai-readiness-2026-06-03.md`
  - `work/openai-readiness-2026-06-03-late.md`
  - `work/openai-readiness-2026-06-03-2350.md`
- 今日新增对外发送与冲刺包：
  - `work/outreach-pr-review-github-2026-06-03.md`
  - `work/outreach-ci-v2ex-2026-06-03.md`
  - `work/outreach-issue-x-2026-06-03.md`
  - `work/adoption-pr-review-closure-2026-06-03/`
  - `work/adoption-ci-closure-2026-06-03/`
  - `work/adoption-release-checklist-2026-06-03/`
- 本地自检链路通过：
  - `npm test`
  - `npm run test:cli`
  - `npm run test:date`
  - `npm run test:metrics`
  - `npm run lint:md`
- 目标清单文件已落地并打勾：
  - `docs/day1-day7-checklist.md`
  - `docs/day1-day7-execution-log.md`
  - `docs/open-source-readiness-pack.md`
  - `docs/external-adoption-log-2026-06-03.md`

## 外部反馈采集入口（对外可复用）

- `https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml`
- `https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=external_pilot_feedback.yml`

## 当前外部采用现状

- 已记录 external feedback issue：1 条（
  <https://github.com/ONEISALL7/ai-devtools-cn/issues/169>
  ）
- 已记录 external merged PR：1 条（#245）

## 网络失败记录（用于审计）

暂无新网络失败。历史上曾有 `api.github.com` 访问失败记录，若后续出现不一致，可保留旧审计条目。

## 下一步动作（7 日内）

1. 保持 `npm run metrics:snapshot` 与 `npm run templates:publish-status` 的每周截图，用于申请前后续核验
2. 发送试用任务给 2-3 位真实维护者（15 分钟试用）
3. 形成 2-3 条外部反馈 issue 后，按 `docs/external-pr-handoff-kit.md` 引导 1 条 external merged PR
4. 每条反馈和每条 external PR 入库到 `docs/external-adoption-log-2026-06-03.md` 的更新记录区
