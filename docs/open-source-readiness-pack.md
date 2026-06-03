# 外部采用与资格申请快速资料包

这份资料包把“真实外部采用”落地为可核验条目，直接用于 OpenAI 资格材料准备。目的是把“我做了很多事情”变成“我有可复验证据”。

## 2026-06-03 当前核验（本次会话最终口径）

- npm 包版本：`0.18.3`
- package/release：`0.18.3` / `v0.18.3`
- 外部反馈 issue：`1`（#169）
- external merged PR：`1`（#245）
- 外部反馈反馈场景已形成 1 条外部来源、1 条外部合并 PR
- 当前仍缺口：真实外部邀请 0/3（待你用真实账号外发），外部反馈需补到 2-3 条
- 说明：以下“执行日志/复盘段落”包含历史口径，优先以本节和 `work/*-verify2.md` 文件为最终提交口径。

## 2026-06-03 当前核验（终端实时）

- npm 包版本：`0.18.3`
- package/release：`0.18.3` / `v0.18.3`
- 外部 feedback issue：1（#169）
- external merged PR：1（#245）
- 说明：以下 2026-06-03 内的早期条目包含历史快照口径，当前提交请以本节为准。

## 1) 外部真实反馈（每一项都要可核验）

- 外部 feedback issue：作者不是仓库 Owner 且不是 bot
- 外部 PR：由外部账号提交、合并并可在 GitHub 上核验
- 公开 case：包含实际场景、可复用输出、来源链接
- 公开渠道：GitHub / X / V2EX / 技术社区讨论帖（可选）
- npm 与 release 记录：GitHub release、npm package 版本、下载数据

记录样式示例（按周/按批）：

```markdown
日期：
渠道：
邀请人群：
发出邀请人数：
外部反馈 issue 链接（含场景）：
外部 merged PR 链接：
公开案例（是否匿名授权）：
本周是否形成可复用文档/模板变更：
npm view ai-devtools-cn version：
最近 7/30 天下载：
下一步行动：
```

建议每周保存到 `work/external-evidence-YYYY-MM-DD.md`，并和 `npm run metrics:snapshot` 的输出一起留存。

## 2) 2026-06-02 当前状态（可直接贴给审阅者）

```markdown
日期：2026-06-02
渠道：GitHub issue 邀请 + 外部用户自助反馈入口
邀请人群：开源维护者 / PR reviewer / CI 处理者
发出邀请人数：0（本轮未正式外发）
外部反馈 issue 链接（含场景）：
- https://github.com/ONEISALL7/ai-devtools-cn/issues/169
外部 merged PR 链接：
- https://github.com/ONEISALL7/ai-devtools-cn/pull/245（外部贡献者 @Jah-yee）
公开案例（是否匿名授权）：
- 用例：在 PR review + CI troubleshooting 场景下将外部反馈转为案例（examples/case-studies/python-pr-review-example.md 与 pnpm workspace CI 试用包）
本周是否形成可复用文档/模板变更：
- 已形成 1 条外部反馈驱动改进（#169）并完成 1 条对应 PR（#245）与 1 条公开 case study
npm view ai-devtools-cn version：
- npm 包版本：`0.18.3`
- package.json 版本：`0.18.3`
最近 7/30 天下载：
  - 926（截至 2026-06-03 latest metrics）
下一步行动：
- 继续补齐 2-3 条外部 feedback issue，优先场景为 PR review / CI troubleshooting
```

## 3) OpenAI 递交前 10 分钟清单（每次更新）

每次准备提交前，按这条命令链直接生成核验证据：

```bash
npm run templates:publish-status
npm run metrics:snapshot -- --output work/metrics-$(date +%F).md
npm run templates:evidence -- --output work/external-evidence-$(date +%F).md
npm run templates:readiness -- --output work/openai-readiness-$(date +%F).md
```

建议在申请材料中附上三项：

- `docs/openai-codex-application-packet.md`（固定文案模板）
- `work/external-evidence-YYYY-MM-DD.md`（外部反馈、外部 PR、公开帖子等核验清单）
- `work/openai-readiness-YYYY-MM-DD.md`（可直接贴到 OpenAI 表单的三段英文文本）
- `docs/tonight-night-operations-2026-06-03.md`（今晚到 12 点的执行清单）

只保留真实、可核验的条目。维护者自己的本地草稿、占位 issue、未合并 PR 一律不计入外部采用。

## 4) 快速核验标准（提交前）

- 项目是公开可见、持续可维护，README/CONTRIBUTING/issue template 都在。
- 有连续维护记录（Issue/PR/Release/标签/CI）。
- 至少有真实外部反馈（issue/comment/repo）
- 至少有一次对外试用后可追溯的反馈内容。
- 外部 PR 仍需持续追求；如未达成也需同步“正在招募外部 PR”的证据。

## 5) 2026-06-03 外部推进记录（执行中）

- 核验口径：公开链接可核验、非 maintainer 作者可计入 external feedback
  - 已完成：
    - 生成 `work/outreach-pr-review-github-2026-06-03.md`
    - 生成 `work/outreach-ci-v2ex-2026-06-03.md`
    - 生成 `work/outreach-pr-review-x-2026-06-03.md`
  - 生成三套 adoption 冲刺包：
    - `work/adoption-pr-review-closure-2026-06-03`
    - `work/adoption-ci-closure-2026-06-03`
    - `work/adoption-release-checklist-2026-06-03`
  - 运行 `npm run templates:publish-status / metrics / evidence / readiness`
    生成最新文件：
    - `work/metrics-2026-06-03-2350.md`
    - `work/external-evidence-2026-06-03-2350.md`
    - `work/openai-readiness-2026-06-03-2350.md`
- 当前差距（该条历史口径）：
  - external feedback issue：仍在 1 条（#169）
  - external merged PR：1 条（#245）
  - npm 与 release：当时未同步到 `0.18.3`（当前已对齐）
- 下一步（今晚收尾）：
  - 继续发送至少 3 个真实邀请（GitHub/社群）
  - 每个反馈直接留存到 `docs/external-adoption-log-2026-06-03.md`
  - 再新增 1~2 个真实反馈后，推动外部并行 PR 任务

## 6) 2026-06-03 当前状态（执行中）

- 核验口径：公开链接可核验、非 maintainer 作者可计入 external feedback
- 已完成：
  - `npm run metrics:snapshot -- --output work/metrics-check-tonight.md`
  - `npm run templates:evidence -- --output work/external-evidence-check-tonight.md`
  - `npm run templates:publish-status`
- 当前差距：
  - external feedback issue：仍在 1 条（#169）
  - external merged PR：1 条（#245）
  - npm 与 release：仍未同步到 `0.18.3`（发布仍在进行）
- 下一步：
  - 继续发送至少 3 个真实邀请（GitHub/社群）
  - 每个反馈直接留存到 `docs/external-adoption-log-2026-06-03.md`
  - 补齐 2-3 条外部反馈后继续推动 external PR 转化

## 6.1 2026-06-03 23:55 复盘

- 本地执行补齐：
  - `npm run templates:publish-check`（通过）
  - `npm run test`（通过）
  - `npm run pack:dry-run`（通过）
- `npm run templates:publish-status`：历史快照中为落后：`0.18.1` vs `0.18.3`，当前已对齐
  - `work/metrics-check-tonight2.md`、`work/external-evidence-tonight2.md`、`work/openai-readiness-tonight2.md` 已重建
- 约束说明：
  - 邀请文本与外部任务包已就绪，但目前仍是“可外发物料”阶段，未形成新增外部 issue 或 PR；
  - 任何新外部反馈必须来自真实外部用户动作，不以 maintainer 本地草稿替代。
- 今晚剩余口径（到 23:59）：
  - 发送至少 3 条真实邀请并落盘；
  - 收到反馈后 24 小时内补对应可复用产物；
  - npm 同步后再执行最终一轮快照并整理提交材料。

## 7) 申请文案草稿（可直接复制改动）

### Describe your role（示例）

```text
I am the primary maintainer of ai-devtools-cn. I review and merge PRs, triage issues,
maintain releases, add and update templates for OSS maintenance workflows (PR review,
issue triage, CI troubleshooting, docs/release workflows), and handle public
feedback from external users.
```

### Why does this repository qualify?（示例）

```text
This public Chinese-language repository provides reusable AI-operations templates
for open-source maintenance. It supports real maintenance tasks in PR review,
issue triage, CI debugging, release note drafting, and documentation quality control.
It includes examples, a CLI, and community-facing feedback channels, and is actively
maintained with releases and issue/PR activity.
```

### How will you use API credits?（示例）

```text
I will use API credits to accelerate maintenance workflows: PR review preparation,
issue triage replies, CI failure debugging drafts, template-driven documentation,
release-note drafting, and security-sensitive redaction before publishing community-facing
content.
```

## 8) 一页式发布记录清单（对外时可直接发给协作者）

```text
- 本周目标：招募 3 位外部用户完成 1 个 trial。
- 主要入口：外部试用者快速指南 + pilot invite。
- 外部反馈汇总：
  - issue #A：外部反馈，场景为 PR review。
  - issue #B：外部反馈，场景为 CI 排错。
- 外部 PR：
  - PR #X：由 @username 提交，已合并。
- npm：v0.18.1（公开包），月下载 926（截至 2026-06-03 latest metrics）。
```

## 9) 你可以直接发给外部用户的体验要求

- 说明你要的不是“写代码”，而是“节约维护时长”。
- 让对方只用一个场景，不要一次要求多个。
- 强制要求反馈里给出：使用场景、是否可直接提交 PR/issue/CI。

这个要求会显著提高反馈可核验性，也更容易形成可用于申请的真实采用证据。

## 10) 申请最终材料入口

- `docs/openai-codex-application-packet.md`：可以直接贴申请文本（角色、资格、用途、Credits 用法）和周更核验清单。
- `docs/external-adoption-log-2026-06-02.md`：本项目当前一期对外证据记录。
- `docs/external-adoption-log-2026-06-03.md`：本日对外邀约与外部反馈流水。

- `docs/external-adoption-log-2026-06-03.md`
- `docs/external-feedback-evidence-snapshot-2026-06-03.md`
- `docs/day8-day30-execution-log.md`：用于持续记录外部 trial / feedback / external PR 的周更进度。
