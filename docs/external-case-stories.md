# 外部真实案例：可复用的使用价值清单

你不是只在“写模板”，你在用它**验证真实维护流程**。  
下面这 3 个案例都能直接被外部用户复刻、产生反馈并转成外部证据。

## 案例 1：PR Review（最典型）

目标：评审一个真实 PR，输出可提交 review 的结论文本。

执行步骤：

1. 按 PR 编号准备 review 输入（标题/变更范围/关联 issue）。
1. 用模板工具产出 review 草稿：

```bash
npx ai-devtools-cn review-pr --pr <pr-number> --author <github-user> --issue <issue-number> --output work/review-pr-<pr-number>.md
```

1. 按 `examples/case-studies/pr-review-quickstart-release.md` 校对：
   - 是否存在阻塞项
   - 是否与 changelog 一致
   - 是否给出验证命令
1. 以公开 comment 或 maintainer 结论回写到 PR，形成可核验闭环。

已有实据：

- 反馈入口：[#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169)（外部反馈）
- 反馈转化 PR：[#245](https://github.com/ONEISALL7/ai-devtools-cn/pull/245)（外部合并 PR，非 maintainer）

## 案例 2：CI 失败排错（可落地维护任务）

目标：把 CI 日志转成最小修复计划，避免泛泛“猜测”。

执行步骤：

1. 准备 30–80 行失败日志、工作流名称、最近一版可用 commit。
1. 生成排错输入模板并让 AI 输出根因假设 + 验证命令：

```bash
npx ai-devtools-cn templates:new -- ci-troubleshooting --output work/ci-debug-checklist.md
```

1. 维护者按清单核对：
   - 根因是否命中第一条关键报错
   - 是否给出最小回退和修复步骤
   - 是否有可复现/可验证命令

参考案例：

- `examples/case-studies/ci-markdownlint-md012.md`
- `examples/case-studies/node-ci-troubleshooting.md`

## 案例 3：release note 与发布复盘

目标：把分散变更整理成可发布、可追溯的 release note。

执行步骤：

1. 生成 release 草稿：

```bash
npx ai-devtools-cn templates:new -- release-note --output work/release-note-draft.md
```

1. 将 draft 与 `CHANGELOG` / tag 对齐，补齐：
   - 变更范围
   - 验证命令
   - 回归边界
1. 发布后回写到 `CHANGELOG` 与 evidence 台账（`work/external-evidence-YYYY-MM-DD.md`）。

参考案例：

- `examples/case-studies/release-v020.md`

## 外部反馈闭环（你要保留的证据）

每个外部反馈必须留 3 条链：

- `issue`（或 discussion）公开链接
- 对应 PR（如有）与处理结果
- 公共案例文件（脱敏后可复用）或更新日志链接

你可以直接把本页面作为外部用户试用后的最小提交清单，  
避免把 maintainer 的自测稿误算成 external 证据。
