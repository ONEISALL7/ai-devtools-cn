# 外部采用与资格申请快速资料包

这份资料包用于把“真实外部采用”落地成可直接提交的文本，避免临时拼凑。适用于你后续准备 OpenAI 维护者支持申请。

## 1) 外部真实反馈（每一项都要可核验）

- 外部 feedback issue：作者不是仓库 Owner 且不是 bot
- 外部 PR：由外部账号提交、合并并可在 GitHub 上核验
- 公开 case：包含实际场景、可复用输出、来源链接
- 公开渠道：X/V2EX/掘金 等平台的试用反馈帖（可选）
- npm 与 release 记录：GitHub release、npm package 版本、下载数据

记录样式示例（按周/按批）:

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

## 1.5) 2026-06-02 当前状态（可直接贴给审阅者）

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
- npm 包版本：`0.18.1`
- package.json 版本：`0.18.3`
最近 7/30 天下载：
  - 116（截至 2026-05-02~2026-05-31）
下一步行动：
- 继续补齐 2-3 条外部 feedback issue，优先场景为 PR review / CI troubleshooting
```

## 1.6) OpenAI 递交前 10 分钟清单（每次更新）

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

只保留真实、可核验的条目。维护者自己的本地草稿、占位 issue、未合并 PR 一律不计入外部采用。

## 2) 快速核验标准（提交前）

- 项目是公开可见、持续可维护，README/CONTRIBUTING/issue template 都在。
- 有连续维护记录（Issue/PR/Release/标签/CI）。
- 至少有真实外部反馈（issue/comment/repo）
- 至少有一次对外试用后可追溯的反馈内容。
- 外部 PR 仍建议持续追求，但即便当前未达成也可同步“正在招募外部 PR”的证据。

## 3) 申请文案草稿（可直接复制改动）

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

## 4) 一页式发布记录清单（对外时可直接发给协作者）

```text
- 本周目标：招募 3 位外部用户完成 1 个 trial。
- 主要入口：外部试用者快速指南 + pilot invite。
- 外部反馈汇总：
  - issue #A：外部反馈，场景为 PR review。
  - issue #B：外部反馈，场景为 CI 排错。
- 外部 PR：
  - PR #X：由 @username 提交，已合并。
  - npm：v0.18.1（公开包），月下载 116（截至 2026-05-02~2026-05-31）。
```

## 5) 你可以直接发给外部用户的体验要求

- 说明你要的不是“写代码”，而是“节约维护时长”。
- 让对方只用一个场景，不要一次要求多个。
- 强制要求反馈里给出：使用场景、是否可直接提交 PR/issue/CI。

这个要求会显著提高反馈可核验性，也更容易形成可用于申请的真实采用证据。

## 6) 申请最终材料入口

- `docs/openai-codex-application-packet.md`：可以直接贴申请文本（角色、资格、用途、Credits 用法）和周更核验清单。
- `docs/external-adoption-log-2026-06-02.md`：本项目当前一期对外证据记录。
- `docs/day8-day30-execution-log.md`：用于持续记录外部 trial / feedback / external PR 的周更进度。
