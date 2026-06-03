# 外部采用与试用证据日志（2026-06-03）

## 2026-06-03 23:26（复核更新）

- 已完成核验：
  - `npm run templates:publish-status -- --json`
  - `npm run test`
  - `npm run lint:md`
  - `npm run metrics:snapshot -- --output work/metrics-20260603-now.md`
  - `npm run templates:evidence -- --output work/external-evidence-20260603-now.md --force`
  - `npm run templates:readiness -- --output work/openai-readiness-20260603-now.md --force`
- 核验结果（快照口径）：
  - 外部反馈 issue：`1`（#169）
  - External merged PR：`1`（#245）
  - 外部邀请落地：`0/3`（本地仅准备模板，真实邀请仍待你账号实际发送）
  - Stars/Forks：`3 / 2`
  - Merged PRs：`131`
  - Releases：`31`
  - npm：`0.18.3`
  - npm downloads（last month）：`926`

说明：当前卡点仍是“外部真实反馈缺口”，需要真实账号发出 3 条外部邀请后追踪反馈和 PR 转化；本地材料已连续复核成功。

## 2026-06-03 22:19（本地核验更新）

- 已完成核验：`npm run metrics:snapshot -- --output work/metrics-20260603-2218.md`、
  `npm run templates:evidence -- --output work/external-evidence-20260603-2219.md --force`、
  `npm run templates:readiness -- --output work/openai-readiness-20260603-2219.md --force`
- 外部反馈口径：`external feedback issue = 1`（#169）
- External merged PR：`1`（#245）
- Stars/Forks/Merged PRs：`3 / 2 / 131`
- 外部邀请落地：`0/3`（本地仅准备模板，真实邀请待你账号发送）
- 说明：本日志仍以“新增真实外部反馈”作为最关键缺口，当前无新增外部 issue/PR。

## 2026-06-03 22:12（实时核验更新）

- 已复盘最新口径：
  - `Stars / Forks`：3 / 2
  - `Merged PRs`：131（其中 external merged PR：1，作者非 maintainer 为 @Jah-yee）
  - `External feedback issues`：1（#169，作者 @oneshots）
  - `Releases`：31（最新 `v0.18.3`）
  - `npm`：0.18.3（与 `package.json` 对齐）
  - `npm monthly downloads`：926（上次快照）
- 已执行的验证命令：
  - `npm run test`
  - `npm run lint:md`
  - `npm run templates:publish-check`
  - `npm run templates:publish-status`
  - `npm run pack:dry-run`
  - `npm run templates:evidence -- --output work/external-evidence-2026-06-03-now-latest.md --force`
  - `npm run metrics:snapshot -- --output work/metrics-2026-06-03-now-latest.md`
- 对外状态：
  - 真实对外邀请：`0/3`（可用模板已准备：`work/outreach-*.md`）
  - 尚未收到新的外部反馈（未收到新 issue/PR 关闭前提下无法“伪造”新增项）
- 下一步：
  - 按 `docs/external-tester-guide.md` 用你的真实账号发送 3 条邀约；
  - 每条反馈回流后，24 小时内补一条可复用的公开问题解决案例；
  - 外部反馈形成后立即更新本日志和 `work/metrics-...` / `work/external-evidence-...`。

## 2026-06-03 20:41（当前核验口径）

- `npm view ai-devtools-cn version`、`package.json`、GitHub release 均为 `0.18.3`（已对齐）。
- 本地自检通过：`npm run test`、`npm run lint:md`、`npm run templates:publish-check`、`npm run templates:publish-status`、`npm pack --dry-run`。
- 外部反馈当前可核验口径：  
  - 外部 feedback issue：`1`（#169）  
  - external merged PR：`1`（#245）  
- 对外行动状态（你的账号）：
  - 真实对外邀请：`0/3`（尚未实际发出）
  - 已准备邀请模板：`work/next-outreach-2026-06-03.md`、`work/outreach-pr-review-github-2026-06-03.md`、`work/outreach-ci-v2ex-2026-06-03.md`、`work/outreach-pr-review-x-2026-06-03.md`
- 结论：项目“内核链路与材料”已足够接近申请前口径；核心短板仍是“真实外部反馈回流 + 外部 PR 转化闭环”。

- 版本快照：`package.json` `0.18.3`，`npm` `0.18.3`（已对齐）
- 公开仓库：<https://github.com/ONEISALL7/ai-devtools-cn>
- 公开性：仓库公开（`npm run metrics:snapshot` 及 `npm run templates:publish-status` 核验通过）
- 说明：本日志包含 6/3 当日与当晚多时段记录，历史条目可能保留旧口径；以本节开头和 `work/*-verify2.md` 为当前提交口径。

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
  - `work/metrics-2026-06-03-1900.md`（指标快照）
  - `work/external-evidence-2026-06-03.md`（外部采用证据台账）
  - `work/metrics-2026-06-03-late.md`（晚间复核快照）
  - `work/external-evidence-2026-06-03-late.md`（当日最新证据）
  - `work/openai-readiness-2026-06-03-late.md`（当日最新就绪材料）
  - `work/outreach-2026-06-03.md`（对外邀请模板）
  - `work/review-pr-trial-2026-06-03.md`（PR review 公开试用包）
  - `work/adoption-sprint-2026-06-03/`（7 天外部试用冲刺包）

## 未完成项（继续进行）

- External merged PR：`1`（[#245](https://github.com/ONEISALL7/ai-devtools-cn/pull/245)）
- 外部 feedback issue：目标 2-3 条，本轮先期采集 `1`
- 真实试用反馈需继续补齐（特别是 PR review / CI troubleshooting 场景）

## 下一步计划（无对外承诺）

- 先把上述入口发送给 3 位真实使用者，要求只提交 1-2 个高质量反馈场景
- 每条外部反馈后 24 小时内补齐一个可复用文档或模板变更
- 外部反馈有效后，转入一个短任务并生成外部 PR（`Good First PR` 路径）

## 版本与发布说明

- 本文件用于内部执行记录，不对外发布
- 对外材料中仅声明“在收集第一批真实反馈”，不夸大已形成的外部使用量

## 2026-06-03 当日执行记录

- 公开性与发布口径：
  - 仓库公开：是（本地核对）
  - `package.json` 版本：0.18.3
  - 发布标签：v0.18.3（本地仓库记录）
- 文档价值补强：
  - 新增 `docs/real-world-scenarios.md`，补齐了可复用的 PR Review / CI 排错 / Release 场景闭环
  - 新增 `examples/case-studies/issue-triage-release-cycle.md`，用于展示 issue -> triage -> PR -> release 的真实链路
- 证据链路：
  - 反馈入口已定稿并可复用
  - issue #169 记入 external feedback 观察清单
  - Day1~Day7 文档清单已提交到本地仓库待发布
- 发布与 npm 状态：
  - `npm view ai-devtools-cn version`：0.18.1
  - `package.json`：0.18.3
  - `GitHub release`：v0.18.3
  - `npm run templates:publish-status`：npm 落后于 package/release
  - `work/metrics-2026-06-03-2350.md`：最新快照已生成（与晚间版本对齐）
- 缺口：
  - external PR 缺口：当前目标是稳定形成持续外部反馈，而不是只计 1 条 PR。
  - 外部反馈 issue 仍为 1 条（待补齐到 2-3 条）
- 本地核验日志：
  - `npm run metrics:snapshot` 已执行（外部 merged PR：1，external feedback-labeled：1）
  - `npm run test` 已执行（通过）
  - `npm_config_cache=/tmp/ai-devtools-npm-cache npm publish --dry-run --access public` 已执行，通过（未到正式发布）
  - `npm_config_cache=/private/tmp/ai-devtools-npm-cache npm pack --dry-run` 已执行（通过）
  - `work/metrics-2026-06-03-1900.md` 已生成并留痕
  - `work/external-evidence-2026-06-03.md` 已生成（含指标与可复用字段模板）
  - `work/metrics-2026-06-03-late.md` 已生成并留痕
  - `work/external-evidence-2026-06-03-late.md` 已生成（含外部证据模板）
  - `work/openai-readiness-2026-06-03-late.md` 已生成（含提交前材料）
  - `work/metrics-2026-06-03-2350.md` 已生成（最新快照）
  - `work/external-evidence-2026-06-03-2350.md` 已生成（新增邀约与采集清单）
  - `work/openai-readiness-2026-06-03-2350.md` 已生成（最新版就绪材料）
  - `work/outreach-pr-review-github-2026-06-03.md`、`work/outreach-ci-v2ex-2026-06-03.md`、`work/outreach-pr-review-x-2026-06-03.md` 已生成（对外发送包）
  - `work/adoption-pr-review-closure-2026-06-03/`、`work/adoption-ci-closure-2026-06-03/`、`work/adoption-release-checklist-2026-06-03/` 已生成（场景化冲刺包）
- `23:00` 进展：
  - 重新生成 2026-06-03 快照与证据：
    - `work/metrics-2026-06-03-2300.md`
    - `work/external-evidence-2026-06-03-2300.md`
    - `work/openai-readiness-2026-06-03-2300.md`
  - 新增对外邀请文本：
    - `work/outreach-pr-review-github-2026-06-03.md`
    - `work/outreach-pr-review-x-2026-06-03.md`
    - `work/outreach-ci-v2ex-2026-06-03.md`
  - 本轮约束：
    - `npm` 与 `release` 实时查询被环境 DNS 影响，出现 `npm`/`GitHub` unavailable；请在你本地网络环境再跑一遍 `npm view` 与公开查询以确认最终版本。
- 下一步：
  - 外部试用邀请 2 位真实维护者（PR review / CI）并留痕
  - 完成 1 条 external merged PR 后更新本节

### 2026-06-03 再次复盘（当前）

- `npm view ai-devtools-cn version` 本地执行受环境 DNS 限制（ENOTFOUND），短期内无法在当前终端确认正式发布版本；  
  需在可访问 `registry.npmjs.org` 的环境中执行确认。
- `npm pack --dry-run` 已使用私有缓存目录复核通过，当前阻塞仅在正式 `npm publish` 与外部联网核验。
  - 外部反馈与 external PR 现状未变化：
    - 外部反馈 issue：`#169`（外部用户 `@oneshots`）
    - External merged PR：`#245`（外部用户 `@Jah-yee`）
  - 本轮不新增任何“伪外部”证据，外部反馈动作完全依赖真实对外触达与真实回流。

### 2026-06-03 17:54（今晚继续推进）

- 本轮新增记录项：
  - 生成并固化：
    - `work/metrics-tonight-2359-final.md`
    - `work/openai-readiness-tonight-2359-final.md`
    - `work/external-evidence-tonight-2359-final.md`
    - `work/outreach-tonight-23-59.md`
  - 这四个文件已提交到执行盘点；可直接用于今晚最后一轮申请材料快照。
- 当前公开外部信号（仍是截止当前值）：
  - 外部反馈 issue：`1`（#169，由 @oneshots）
  - External merged PR：`1`（#245，由 @Jah-yee）
  - `npm` 与 release 版本口径：`npm=0.18.1` vs `release=0.18.3`
- 下一步（不可被本地补齐的部分）：
  - 你在真实外网账号下发送至少 3 条真实邀请，并在此日志追加时间戳/渠道/联系人类型；
  - 任一反馈落地后，按“反馈驱动改进”链路补案例并重新打点；
  - `npm publish --access public` 成功后立即复跑快照并重贴本文件到最新版本。

## 2026-06-03 23:59 更新（当下状态）

- 本地执行结论：
  - `npm run test`：通过
  - `npm run templates:publish-check`：通过
  - `npm run pack:dry-run`：通过
  - `npm run templates:evidence -- --output work/external-evidence-2026-06-03-night-final.md`：已生成
  - `npm run templates:readiness -- --output work/openai-readiness-2026-06-03-night-final.md`：已生成
  - `npm run metrics:snapshot -- --output work/metrics-2026-06-03-2359.md`：已生成（当前环境下库指标显示 unknown）
- 公开状态（仍为核心）
  - 真实外部邀请：0/3（暂未开始）
  - 外部反馈 issue：1（#169）
  - External merged PR：1（#245）
- 下一步：
  - 以你的真实账号从当前邀请模板发出至少 3 条外部邀请；
  - 任意反馈返回后 24 小时内补一条对应复用产物，并回填本文与 `docs/tonight-night-operations-2026-06-03.md`；
  - 稳定联网后完成 `npm publish --access public` 并做最终快照。

## 16:56 更新（当前状态）

- 公开证据核验重跑：
  - Stars/Forks/Merged PRs：3 / 2 / 131
  - External merged PR：1（#245）
  - Open/Closed issues：5 / 110
  - Feedback 标注 issue：22，外部 feedback：1
  - Releases：31
  - npm 版本：0.18.1，package.json：0.18.3（待发布）
  - 下载量（last-month）：116
- 说明：`work/metrics-20260603-1656.md` 与 `work/openai-readiness-20260603-1656.md` 已按以上数字修正，用于 6/3 晚间汇总。

## 23:55 更新（本次今晚执行进度）

- 本地核验链路补齐：
  - `npm run templates:publish-check` 通过；
  - `npm run test` 通过；
  - `npm run pack:dry-run` 通过；
  - `work/metrics-check-tonight2.md`、`work/external-evidence-tonight2.md`、`work/openai-readiness-tonight2.md` 已生成；
  - `npm run templates:publish-status` 再确认：npm `0.18.1`，`package.json` 与 release `0.18.3`。
- 外部反馈口径：
  - external feedback issue：1 条（#169）
  - external merged PR：1 条（#245）
- 下一步（今晚目标，至 23:59）：
  - 发送至少 3 条真实邀请（待你实际外发）并逐条留痕；
  - 任何反馈落地后 24 小时内补充对应可复用案例/模板变更；
  - npm 同步到 `0.18.3` 后，再执行一轮 `metrics + evidence + readiness` 的终版快照。

## 2026-06-03 现在（发布口径终版确认）

- 里程碑：本地发布环境已恢复，已执行 `npm publish --access public`。
- npm 与仓库同步：
  - `npm view ai-devtools-cn version` = `0.18.3`
  - `package.json` = `0.18.3`
  - GitHub latest release = `v0.18.3`
- 外部信号（当前真实可核验值）：
  - 外部 feedback issue：`1`（#169）
  - External merged PR：`1`（#245）
  - Merged PR 总数：`131`
  - Feedback-labeled issues：`22`
- 最终快照文件（已更新）：
  - `work/metrics-2026-06-03-final.md`
  - `work/external-evidence-2026-06-03-final2.md`
  - `work/openai-readiness-2026-06-03-final2.md`
- 已通过验收：`npm run test`、`npm run lint:md`、`npm run templates:publish-check`、`npm run pack:dry-run`
- 说明：当前仍需补齐 **2-3 条真实外部反馈 issue** 与持续外部邀请落地记录；保持“真实外部反馈优先”与“真实外部 PR 认领”不做空口径包装。

### 2026-06-03 17:50（重启今晚目标）

- 今晚目标重申：把外部反馈与发布对齐做成可审计闭环，直达 23:59 截止线。
- 当前状态（本地）：
  - external feedback issue：1（`#169`）
  - external merged PR：1（`#245`）
  - npm 版本：`0.18.1`（仍低于 `package.json/release` 的 `0.18.3`）
- 当晚执行动作（待执行于你的账号环境）：
  - 发送 3 条真实邀请；
  - 跟进 1~2 条反馈并在 24 小时内形成对应复用产物；
  - 完成 `npm publish --access public` 后再补 `work/metrics-tonight-final.md`（必要时）与 `work/openai-readiness-` 最新版文件。

## 6.2 2026-06-03 实时更新（当前终端复核）

- npm view ai-devtools-cn version: 0.18.3
- package.json version: 0.18.3
- latest release: v0.18.3
- 外部 feedback issue: 1（#169）
- External merged PR: 1（#245）
- 说明：历史条目中的 0.18.1 为历史快照口径，请以本条为当前核验口径。

## 2026-06-03 20:17 实时补充（继续执行）

- 复核动作（本地通过）：
  - `npm run test`
  - `npm run lint:md`
  - `npm run templates:publish-check`
  - `npm run pack:dry-run`
  - `npm run metrics:snapshot -- --output work/metrics-check-now.md`
  - `npm run templates:evidence -- --output work/external-evidence-check-now.md`
  - `npm run templates:readiness -- --output work/openai-readiness-check-now.md`
- 说明：以上命令用于公开口径核验，不涉及任何外部反馈制造；仅补强可复核链路。
- 对外动作：
  - 已新生成发送包：`work/next-outreach-2026-06-03.md`
  - 下一步仍需你在真实账号下发出至少 3 条外部邀请，并回写每条渠道/时间到本日志。
