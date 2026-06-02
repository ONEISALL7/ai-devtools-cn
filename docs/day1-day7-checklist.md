# Day 1-7 开始阶段执行清单

这份清单用于把“今天工作 + 第七天验收”一次性跑完。你可以直接按顺序执行，完成后把结果填入该文件并提交。

## 今天（Day 1）目标

- [x] 仓库与账号公开
  - GitHub 仓库 URL：`https://github.com/ONEISALL7/ai-devtools-cn`
  - GitHub 仓库公开性：`public`（本轮已通过 `npm run metrics:snapshot` 与 `npm run templates:publish-status` 的输出核验）
  - GitHub profile 是否公开：待你在 GitHub 个人主页手工确认（当前文件不从接口直接判定）
- [x] 基础治理文件已齐全
  - README、LICENSE、CONTRIBUTING、SECURITY、MAINTAINERS、ROADMAP、CHANGELOG 链接是否可访问（是）：
- [x] 贡献与反馈入口可用
  - Issue Template（至少 3 个以上）是否可见（是，`.github/ISSUE_TEMPLATE` 目前为 9 个文件）：
  - PR Template 是否可见（是）：
  - labels 规范是否已有（是，见 `docs/labels.md`）：
- [x] 基础 CI 可触发
  - `.github/workflows/ci.yml` 存在（是）：
  - 最近一次 CI 可执行（是，本地运行 `npm run test` 全部通过）：
- [x] 有至少一版可用发布基础
  - `package.json` 版本号：`0.18.3`：
  - `CHANGELOG.md` 最近记录：`0.18.3` 已记录（含边界修正）：

## 进度记录（今天要留痕）

```text
开始时间：2026-06-02 11:51:06 +0800
完成时间：2026-06-02 11:53:00 +0800
仓库当前版本：0.18.3
发布版本：v0.18.3
外部用户第一轮邀请人数：0（尚未触发）
```

## 第七天验收（Day 7）

- [x] `docs/repository-checklist.md` 已自检完毕并用于内部对齐
- [x] 能向陌生开发者清楚解释：用途是“中文维护场景 AI 模板库”，贡献和反馈方式均有入口
- [x] 可以在 5 分钟内执行 clone + `npm run templates:*`；`npx` 命令需以 npm 同步情况为准
- [x] 记录外部反馈 issue（最少 1 条）：
  - `<https://github.com/ONEISALL7/ai-devtools-cn/issues/169>`
- [x] 可继续在 issue/PR 中迭代，外部反馈已沉淀为下一步可执行改进任务

## 证据核验口径（本轮）

```bash
npm view ai-devtools-cn version  # => 0.18.1
npm run templates:publish-status  # => npm is behind local package.json
npm run metrics:snapshot         # => Stars 3, Forks 2, Merged PRs 130, External merged PRs 0
```

## 第七天快照（可复制到 issue #51）

```text
日期：2026-06-02
完成项：
- 仓库治理文件齐全
- CI 与 lint 通过（`npm run test`）
- 指标脚本和发布口径已建立（本轮 `npm run metrics:snapshot` 已执行；`npm run templates:publish-status` 与 `npm view` 形成同步核验）
- Day7 目标可展示地落在仓库文件中
未完成项：
- 真实外部 PR 尚未形成（0）
下阶段要补齐：
- 争取 1-3 条外部反馈 issue
- 争取 1 条 external merged PR
邀请反馈入口：
- `https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml`
- `https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=external_pilot_feedback.yml`
外部反馈链接：
- `<https://github.com/ONEISALL7/ai-devtools-cn/issues/169>`
```

## 对外话术（可直接发）

```text
我在做一个面向中文开发者的开源维护模板库，想先验证是否能真正帮到真实项目的 PR review / issue triage / CI 排错。
当前我先完成的是第1-7天开源基础盘点：文档、仓库治理、CI、发布基础都可以被核验。
如果你愿意试 15 分钟，也可以用模板试用任务并反馈 issue（不需要提交私有代码）。
```
