# OpenAI Codex for Open Source（今日实时状态）

更新时间：2026-06-03 23:59（本地终端核验）

## 1) 当前核验口径（可直接用于提交说明）

- 仓库：`https://github.com/ONEISALL7/ai-devtools-cn`
- 版本：`ai-devtools-cn@0.18.3`（`npm view ai-devtools-cn version`）
- GitHub latest release：`v0.18.3`
- 发布对齐：`package.json`、`npm`、`release` 均为 `0.18.3`
- 本地状态：`templates:publish-status` 显示源码比最新 release 多 21 个提交，待下一次发版
- 核验命令：`npm run test`、`npm run templates:publish-check`、`npm run pack:dry-run`、`npm run lint:md` 全部通过
- 公开可核验指标（最新快照文件）：
  - Stars/Forks：`3 / 2`
  - Merged PRs：`131`
  - External merged PRs（非 maintainer）：`1`（[#245](https://github.com/ONEISALL7/ai-devtools-cn/pull/245)）
  - 外部 feedback issue：`1`（[#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169)）
  - Releases：`31`
  - npm 月下载：`926`
- 本轮核验文件：`work/metrics-20260603-final-now.md`、`work/external-evidence-20260603-final-now.md`、`work/openai-readiness-20260603-final-now.md`

## 2) 已满足的基础条件

- 仓库公开（public）+ 项目入口完整（README / CONTRIBUTING / SECURITY / MAINTAINERS / CHANGELOG / LICENSE）
- feedback 与外部试用入口已公开：
  - `https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml`
  - `https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=external_pilot_feedback.yml`
- 真实场景模板与试用入口已可复用：`docs/real-world-scenarios.md`、`docs/usage-recipes.md`
- 证据链路稳定：`work/*metrics*`、`work/*external-evidence*`、`work/*openai-readiness*`

## 3) 仍缺口（官方重点）

- 还缺 2~3 条真实外部 feedback issue（非 maintainer）与场景复核闭环
- 目标是再转化至少 1 个外部问题到 merged 外部 PR

## 4) 下一步（必须由真实外部账号）

1. 立刻发 3 条邀请（任意渠道组合）：
   - `work/outreach-pr-review-github-2026-06-03.md`
   - `work/outreach-ci-v2ex-2026-06-03.md`
   - `work/outreach-pr-review-x-2026-06-03.md`
2. 任何反馈都要求公开 issue 链接，按 `docs/external-pr-handoff-kit.md` 追踪；
3. 每个反馈都在 24 小时内补一条反馈日志到：
   - `docs/external-adoption-log-2026-06-03.md`
4. 收到新反馈后立即重跑并替换快照文件：
   - `npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md`
   - `npm run templates:evidence -- --output work/external-evidence-YYYY-MM-DD.md --force`
   - `npm run templates:readiness -- --output work/openai-readiness-YYYY-MM-DD.md --force`

## 5) 本次提交可直接引用文本

- 角色与用途（见：`docs/openai-codex-application-packet.md`）  
- 一页式申请文案（见：`work/openai-readiness-20260603-final-now.md`）  
