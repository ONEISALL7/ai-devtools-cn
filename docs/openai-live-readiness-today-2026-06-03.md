# OpenAI 申请实时看板（2026-06-03）

## 目标

在可公开材料中保留一份“可直接提交 OpenAI Codex for Open Source”时使用的最新口径：版本、外部反馈、外部 PR、发布链路与待补缺口。

## 当前口径（已核验）

- 仓库：`https://github.com/ONEISALL7/ai-devtools-cn`
- 可见性：`PUBLIC`
- package/release：`0.18.3`
- npm：`0.18.3`
- GitHub latest release：`v0.18.3`
- Stars/Forks：`3` / `2`
- PR：`131`
- External merged PR：`1`（PR #245，作者 @Jah-yee）
- 外部反馈 issue（external label）：`1`（Issue #169，作者 @oneshots）

快照命令：

- `npm run templates:publish-status`
- `npm run metrics:snapshot -- --output work/metrics-2026-06-03-now-live.md`
- `npm run templates:evidence -- --output work/external-evidence-2026-06-03-now-live.md`
- `npm run templates:readiness -- --output work/openai-readiness-2026-06-03-now-live.md`

## 关键判断

- ✅ 仓库公开、维护文档齐全（README/CONTRIBUTING/SECURITY/MAINTAINERS/LICENSE）
- ✅ 发布链路已对齐（npm / package.json / GitHub release）
- ⚠️ 仍需补齐真实外部反馈量（目前为 1 条）

## 真实外部反馈缺口

- 目标：新增 2~3 条外部反馈 issue（非 maintainer）
- 目标：新增至少 1 条外部 merged PR（非 maintainer）
- 当前状态：邀请文本已就绪（`docs/community-outreach.md` 和 `work/outreach-*.md`），邀约落地仍需你的真实账号发起

## 下一步（用户侧执行）

1. 在 GitHub / X / V2EX / 微信社群发出至少 3 条外部邀请。
2. 任意反馈落地后，24 小时内补一次反馈驱动产物（Issue 更新、案例文档或模板修订）。
3. 外部反馈转 PR 后 24 小时内完成 review 并合并。
4. 每次新增后，执行上述 4 条快照命令并留痕。

## 证据更新要求

- 只记录真实可核验链接（公开 issue、PR、release、帖子、案例）。
- 不计入 maintainer 自建草稿、占位 issue 或未合并 PR。
- 外部反馈补充请同步到 `docs/external-adoption-log-2026-06-03.md`，保留时间、渠道、链接、核验结果。
