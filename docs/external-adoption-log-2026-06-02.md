# 外部采用与试用证据日志（2026-06-02）

- 版本快照：`package.json` `0.18.3`，`npm` `0.18.1`（未对齐）
- 公开仓库：<https://github.com/ONEISALL7/ai-devtools-cn>
- 公开性：仓库公开（`npm run metrics:snapshot` 及 `npm run templates:publish-status` 核验通过）

## 本轮目标

- 建立可核验的外部反馈入口
- 形成可公开的反馈记录
- 为后续 External merged PR 准备清晰的交接链路

## 已完成项（证据）

- 公开反馈入口已固定：
  - `template_feedback.yml`
  - `external_pilot_feedback.yml`
- 外部反馈链接：
  - <https://github.com/ONEISALL7/ai-devtools-cn/issues/169>
- Issue 模板与 Good First PR 引导已补齐（docs/community-launch-pack、docs/community-outreach、docs/first-user-test-plan、docs/external-tester-guide）
- 关键执行文档已在本地打点：
  - `docs/day1-day7-checklist.md`
  - `docs/day1-day7-execution-log.md`
  - `docs/open-source-readiness-pack.md`
- 本轮还在本地生成了外部试用和证据模板：
  - `work/pilot-invites-2026-06-02.md`（pilot 邀请包）
  - `work/external-evidence-2026-06-02.md`（外部采用证据台账草稿）

## 未完成项（继续进行）

- External merged PR：`0`
- 外部 feedback issue：目标 2-3 条，本轮先期采集 `1`
- 真实试用反馈需继续补齐（特别是 PR review / CI troubleshooting 场景）

## 下一步计划（无对外承诺）

- 先把上述入口发送给 3 位真实使用者，要求只提交 1-2 个高质量反馈场景
- 每条外部反馈后 24 小时内补齐一个可复用文档或模板变更
- 外部反馈有效后，转入一个短任务并生成外部 PR（`Good First PR` 路径）

## 版本与发布说明

- 本文件用于内部执行记录，不对外发布
- 对外材料中仅声明“在收集第一批真实反馈”，不夸大已形成的外部使用量

## 2026-06-02 当日执行记录

- 公开性与发布口径：
  - 仓库公开：是（本地核对）
  - `package.json` 版本：0.18.3
  - 发布标签：v0.18.3（本地仓库记录）
- 证据链路：
  - 反馈入口已定稿并可复用
  - issue #169 记入 external feedback 观察清单
  - Day1~Day7 文档清单已提交到本地仓库待发布
- 发布与 npm 状态：
  - `npm view ai-devtools-cn version`：0.18.1
  - `package.json`：0.18.3
  - `GitHub release`：v0.18.3
  - `npm run templates:publish-status`：npm 落后于 package/release
- 缺口：
  - external PR 仍为 0
  - 外部反馈 issue 仍为 1 条（待补齐到 2-3 条）
- 本地核验日志：
  - `npm run metrics:snapshot` 已执行（外部 merged PR：0，external feedback-labeled：1）
  - `npm run test` 已执行（通过）
  - `work/pilot-invites-2026-06-02.md` 已生成并留痕
  - `work/external-evidence-auto-2026-06-02.md` 已生成（含指标与可复用字段模板）
- 下一步：
  - 外部试用邀请 2 位真实维护者（PR review / CI）并留痕
  - 完成 1 条 external merged PR 后更新本节
