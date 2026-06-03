# OpenAI Codex for Open Source：今日执行看板（2026-06-03）

## 结论（先看这）

- 仓库与发布链路在关键口径可核验，但本地已超前 release：
  - 仓库：`https://github.com/ONEISALL7/ai-devtools-cn`
  - `package.json`：`0.18.3`
  - npm：`0.18.3`
  - 最新 release：`v0.18.3`
  - 本地 main 比 release 领先：`26` 个提交（建议下个版本打 tag 并按 `npm publish` 同步）
- 核心质量自检全部通过（`npm run test`、`npm run lint:md`、`npm run templates:publish-check`）。
- 当前真实外部采用口径仍缺口：
  - 外部 feedback issue：`1`（#169）
  - external merged PR：`1`（#245）
  - 目标：再补齐 `2~3` 条外部反馈 + `>=1` 条新增 external PR 闭环

## 本会话已完成

- `docs/openai-codex-application-packet.md`：申请文案与定义边界已可复用
- `work/openai-readiness-20260603-now.md`：已生成（当前口径）
- `work/external-evidence-20260603-now.md`：已生成（当前口径）
- `work/metrics-20260603-now.md`：已生成（当前口径）
- `npm`, GitHub 发布口径验证通过
- `work/outreach-next-steps.md`：已生成，可直接发送给外部用户

## 下一步（真实用户动作，且不占时间的版本）

1. 先发 3 条外部邀请（任意组合）：
   - `work/outreach-pr-review-github-2026-06-03.md`
   - `work/outreach-ci-v2ex-2026-06-03.md`
   - `work/outreach-pr-review-x-2026-06-03.md`
2. 每发一条在 `docs/external-adoption-log-2026-06-03.md` 追加：
   - 日期、渠道、联系人类型、预计反馈场景、后续 Issue/PR 链接
3. 任何反馈落地后 24 小时内补一个复用产物：
   - 新 case study / 模板补充 / CLI 更新
4. 有新反馈后立即重跑：
   - `npm run metrics:snapshot -- --output work/metrics-$(date +%F).md`
   - `npm run templates:evidence -- --output work/external-evidence-$(date +%F).md --force`
   - `npm run templates:readiness -- --output work/openai-readiness-$(date +%F).md --force`

## 申报前直接贴到表单的 3 段文案

- Describe your role
  - `I am the primary maintainer of ai-devtools-cn ...`
- Why does this repository qualify?
  - `This public OSS project provides reusable maintenance templates ...`
- How will you use API credits?
  - `I will use API credits for PR review, issue triage, CI failure triage ...`

（完整英文文案见 `docs/openai-codex-application-packet.md`）
