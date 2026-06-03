# 外部价值总览（可提交证据用）

> 目标：把“项目是否有真实价值”转为外部可核验条目。

## 1. 项目能解决的真实维护问题

- PR review 的结构化复核（阻塞项、变更范围、验证命令）
- Issue triage 的分流与回复草稿（优先级、缺失信息、下一步动作）
- CI 排错的最小修复路径（关键报错、根因假设、最小回退）
- release note 与变更说明的可发布草稿
- 输出可复用到真实仓库的安全脱敏和 AI 结果验收清单

每个问题都以模板为入口，可直接复制到自己仓库里使用。

## 2. 已形成的外部证据（当前可核验）

| 场景 | 外部来源 | 可核验链接 | 价值说明 |
| --- | --- | --- | --- |
| PR review 闭环 | 外部反馈转化 | [issues/169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169) | 提供了真实使用反馈并用于后续反馈驱动改进 |
| 外部 PR | 外部 PR | [pull/245](https://github.com/ONEISALL7/ai-devtools-cn/pull/245) | 非 maintainer 账号提交并合并，验证了可被真实贡献者理解并落库 |
| 案例化资产 | 仓库内案例 | [python-pr-review-example.md](https://github.com/ONEISALL7/ai-devtools-cn/blob/main/examples/python-pr-review-example.md) | PR review 场景模板已形成公开可复用资产 |
| CI 试用包 | 仓库内资产 | [node-ci-failure/README.md](https://github.com/ONEISALL7/ai-devtools-cn/blob/main/examples/trial-packs/node-ci-failure/README.md) | CI 排错型真实用户场景可直接复用 |

## 3. 外部价值的使用闭环（当前进展）

- 已有公开反馈入口：
  - `template_feedback.yml`
  - `external_pilot_feedback.yml`
  - `issue templates` 联系入口已配置（见 `.github/ISSUE_TEMPLATE/config.yml`）
- 已有外部任务入口：
  - PR review、CI 排错、release 的试用任务包
  - Good First Issue 引导与外部贡献交接文档
- 当前缺口（按今天核验）：
  - 外部 feedback issue：1 条（符合“有真实反馈”，但仍建议补到 2~3 条）
  - 外部 merged PR：1 条（可证明真实外部维护参与）

## 4. 你现在可以直接提交给 OpenAI 的“真实价值”材料

- `docs/external-case-stories.md`
- `docs/real-world-scenarios.md`
- `docs/feedback-case-guide.md`
- `docs/open-source-readiness-pack.md`
- `docs/openai-codex-application-packet.md`
- 运行命令产物：
  - `npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md`
  - `npm run templates:evidence -- --output work/external-evidence-YYYY-MM-DD.md`

## 5. 7 天内建议动作（继续对齐申请）

1. 公开邀请 2~3 位外部维护者完成一次 30 分钟 pilot
2. 每位完成后 24 小时内补一条 feedback issue（用 `external_pilot_feedback.yml`）
3. 至少推进 1 条 feedback issue 转化为可复用文档/模板变更
4. 形成新增 external merged PR 或说明当前阻塞点
