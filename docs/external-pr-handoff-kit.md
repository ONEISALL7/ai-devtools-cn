# 外部 PR 交接包

这个交接包用于把一个小而真实的贡献任务交给外部开发者。它适合发给朋友、社群成员、同事或第一次接触本项目的开发者，让对方用自己的 GitHub 账号提交 PR。

目标不是制造表面活跃度，而是降低第一个外部 PR 的门槛：任务要小、边界要清楚、验证要可复制、贡献记录要能公开核验。

## CLI 入口

如果你要快速生成一份可转发交接包，可以运行：

```bash
npx ai-devtools-cn handoff --output work/external-pr-handoff.md
```

如果对方已经选定一个 issue，可以生成定向交接包：

```bash
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
```

只想在终端查看内容时运行：

```bash
npx ai-devtools-cn handoff
```

在仓库内开发时也可以运行：

```bash
npm run templates:handoff -- --output work/external-pr-handoff.md
npm run templates:handoff -- --issue 45 --output work/handoff-45.md
```

这个命令只生成本地交接材料，不会创建 GitHub PR，也不会把维护者自己的草稿计入 external merged PR。

## 可以直接转发的邀请

```text
我在维护一个中文开源项目 AI DevTools CN，想邀请你帮忙提交一个很小的外部 PR。

项目地址：
https://github.com/ONEISALL7/ai-devtools-cn

你可以从这几个 good first issue 里任选一个：
https://github.com/ONEISALL7/ai-devtools-cn/issues/45
https://github.com/ONEISALL7/ai-devtools-cn/issues/46
https://github.com/ONEISALL7/ai-devtools-cn/issues/47
https://github.com/ONEISALL7/ai-devtools-cn/issues/48
https://github.com/ONEISALL7/ai-devtools-cn/issues/49

这里有每个 issue 的 PR brief：
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

如果你选定一个 issue，可以先运行：
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/starter-45.md

把 45 换成你认领的 issue 编号。生成的草稿只在你本地，方便你准备 issue 留言和 PR 描述。

提交前至少运行：
npm run lint:md

如果改动了 CLI、模板索引或示例索引，也运行：
npm run test
npm run templates:publish-check

请不要提交 token、客户信息、内部日志、未公开源码或个人隐私。
```

## 给外部贡献者的步骤

1. 选择一个 `good first issue`。
2. 在 issue 下留言说明你要认领，避免多人重复做同一个小任务。
3. Fork 仓库到自己的 GitHub 账号。
4. 在自己的 fork 中创建分支，例如 `add-node-ci-case-study`。
5. 按 [Good First PR Briefs](good-first-pr-briefs.md) 修改建议文件。
6. 本地运行验证命令。
7. 从自己的 fork 向 `ONEISALL7/ai-devtools-cn:main` 打开 PR。
8. 在 PR 描述里写 `Closes #issue-number`，并贴出验证命令。

外部贡献者可以使用 AI 工具辅助写文档、整理案例或生成初稿，但最终提交前必须自己检查内容是否准确、安全、可公开。

## 当前适合认领的 PR

| Issue | 适合做什么 | 建议输出 |
| --- | --- | --- |
| [#45](https://github.com/ONEISALL7/ai-devtools-cn/issues/45) | Node.js CI 排错案例 | 一个可复制的 CI troubleshooting case study |
| [#46](https://github.com/ONEISALL7/ai-devtools-cn/issues/46) | 依赖升级风险示例 | 一个 dependency upgrade risk example |
| [#47](https://github.com/ONEISALL7/ai-devtools-cn/issues/47) | 用户反馈案例整理 | 一个反馈到 PR 的公开记录流程 |
| [#48](https://github.com/ONEISALL7/ai-devtools-cn/issues/48) | Python PR review 示例 | 一个 Python review example |
| [#49](https://github.com/ONEISALL7/ai-devtools-cn/issues/49) | 前端 README 改进示例 | 一个 README improvement example |

如果你只是想先试用而不是提交 PR，可以按 [外部试用者快速指南](external-tester-guide.md) 提交一条公开安全反馈。

## PR 描述模板

```text
Closes #issue-number

Summary:
- Added ...
- Updated ...

Validation:
- npm run lint:md

Notes:
- The example uses anonymized/public-safe details.
- No tokens, private logs, customer data, or unpublished source code are included.
```

如果 PR 涉及 CLI、模板注册表、示例索引或 npm 包内容，再补充：

```text
Validation:
- npm run test
- npm run templates:publish-check
- npm run pack:dry-run
```

## 维护者可以帮什么

维护者可以做：

- 帮贡献者选择合适 issue。
- 解释仓库结构和验收标准。
- 在 issue 或 PR 中 review 内容。
- 指出 markdown、链接、安全边界或验证命令问题。
- 合并符合标准的 PR，并在 release note 中记录。

维护者不要做：

- 用自己的账号替外部贡献者提交 PR。
- 把维护者自己开的 issue 或 PR 记成 external contribution。
- 要求贡献者公开私有代码、内部日志、客户名称或敏感截图。
- 为了凑数量合并没有实际使用价值的改动。

## 什么能算真实外部 PR

可以记录为真实外部 PR 的条件：

- PR 由非维护者账号提交。
- PR 来源清楚，最好关联公开 issue。
- PR 有可审查的内容改动，而不是空提交。
- PR 通过项目要求的验证命令。
- PR 被维护者 review 并合并。

不能记录为真实外部 PR 的情况：

- 维护者自己创建的 PR。
- 维护者把本地补丁交给别人原样代发，但对方没有理解和维护内容。
- 机器人、测试账号或同一维护者控制的备用账号提交。
- 只有 star、fork、口头称赞，没有公开 PR 或反馈 issue。

## 合并后的证据记录

外部 PR 合并后，维护者可以在申请材料或证据文档中记录：

```text
External PR:
- Contributor: @username
- Issue: #issue-number
- PR: #pr-number
- Scope: one-sentence summary
- Validation: commands shown in PR
- Release: vX.Y.Z, if included in a release
```

如果贡献者只是提交反馈 issue，还不能算 external merged PR，但可以作为真实外部反馈记录。
