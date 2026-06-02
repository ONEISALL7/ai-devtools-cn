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
- 暂无
公开案例（是否匿名授权）：
- 暂无
本周是否形成可复用文档/模板变更：
- 已形成 1 条反馈驱动改进需求，已在项目维护活动中记录
npm view ai-devtools-cn version：
- npm 包版本：`0.18.1`
- package.json 版本：`0.18.3`
最近 7/30 天下载：
- unavailable（当前环境未打通 npm downloads API）
下一步行动：
- 补齐 1 条外部 merged PR（非 maintainer 账号提交并合并）
- 补齐 2-3 条外部 feedback issue，优先场景为 PR review / CI troubleshooting
```

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
- npm：v0.18.1（公开包），月下载 unavailable（当前未打通 API）。
```

## 5) 你可以直接发给外部用户的体验要求

- 说明你要的不是“写代码”，而是“节约维护时长”。
- 让对方只用一个场景，不要一次要求多个。
- 强制要求反馈里给出：使用场景、是否可直接提交 PR/issue/CI。

这个要求会显著提高反馈可核验性，也更容易形成可用于申请的真实采用证据。
