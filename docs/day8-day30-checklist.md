# Day 8-30 实际使用价值提升执行清单

> 目标：把项目从“可核验的维护基础”升级到“真实可用场景资产”，并持续形成外部可见证据。

## 8-14 天：把体验变成可复用动作

- [ ] 完成公开渠道邀约：至少触发 3 条一对一邀请（GitHub / X / 社区 / 邮件 / 私域群）。
- [ ] 每条邀约对应 1 个场景：
  - PR review
  - CI 排错
  - issue triage
  - release note
- [ ] 每位被邀用户都生成独立任务包：`npm run templates:pilot -- <recipe> --output work/<name>`。
- [ ] 每次邀约后 24 小时内跟进：是否已运行 `trial`、是否卡在命令/隐私边界。
- [ ] 形成至少 1 条来自非 maintainer 账号的反馈 issue。

## 15-22 天：把反馈沉淀为可复用资产

- [ ] 把有效反馈做一次“最小改进 PR”或发布说明更新。
- [ ] 补齐 1-2 个高频场景案例文档（如 PR Review、CI 排错）。
- [ ] 每个案例都补齐：
  - 可复制输入
  - 期望输出
  - 验收标准
  - 常见错误（反模式）
- [ ] 在 README 与 `examples/README.md` 中可直接查到新的案例入口。

## 23-30 天：形成外部采用闭环

- [ ] 继续至少 2 次反馈跟进，给每次外部反馈更新证据台账。
- [ ] 引导至少 1 位外部贡献者认领 `good first issue`。
- [ ] 若有外部 PR：完成 review 并确认是否可计为 external merged PR。
- [ ] 再次运行指标快照：

  ```bash
  npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md
  ```

- [ ] 再跑一次 `npm run templates:evidence -- --output work/external-evidence.md` 并更新公开清单。

## 可交付结果（Day 30）

- 外部反馈链路稳定可复核。
- 1-3 条外部反馈 issue 或公域讨论可公开核验。
- 至少新增 1-2 个真实场景案例资产。
- `good first issue`、`feedback issue`、`pilot` 任务在文档中有清晰指引。

## 不能计入外部指标的内容（避免写错）

- maintainer 自测 issue、占位 issue。
- 维护者草稿（`claim`/`starter`/`hand off`）本地文件。
- 没有公开链接、无法验证的“看起来很忙”口头描述。

以上每一条都应写进周报并留痕。
