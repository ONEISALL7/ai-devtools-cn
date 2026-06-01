# Good First PR Briefs

这个页面把当前适合外部贡献者认领的 `good first issue` 拆成更具体的 PR brief。目标是让贡献者不用理解完整项目历史，也能提交一个小而真实、可 review、可合并的 PR。

这些 brief 面向真实外部贡献者。维护者自己完成的 PR 不能写成 external merged PR，也不能包装成外部贡献。

## 使用方式

1. 在对应 issue 下留言说明你想认领。
2. Fork 仓库并创建分支。
3. 按 brief 中的建议文件和验收标准完成改动。
4. 本地运行验证命令。
5. 提交 PR，并在 PR 描述中写 `Closes #issue-number`。

本地验证的最小命令：

```bash
npm install
npm run lint:md
```

如果你改动了 CLI 注册表、示例索引或模板目录，也运行：

```bash
npm run test
npm run templates:publish-check
```

如果你通过 npm/npx 第一次发现本项目，也可以先运行：

```bash
npx ai-devtools-cn contribute
```

这个命令会列出当前可认领任务、brief 链接、最小验证命令和公开安全边界。

## 公开安全边界

不要提交：

- token、API key、cookie、密码
- 客户名称、内部域名、私有仓库链接
- 未公开源码、内部事故日志、生产环境截图
- 个人隐私或未经授权的第三方内容

真实经验可以匿名化，例如把公司名改成“一个 Node.js monorepo”，把内部服务名改成“API package”。

## #45 Node.js CI 排错示例

Issue：[Good First Issue #45](https://github.com/ONEISALL7/ai-devtools-cn/issues/45)

建议 PR 标题：

```text
Add Node.js CI troubleshooting case study
```

建议文件：

- `examples/case-studies/node-ci-troubleshooting.md`
- `examples/case-studies/README.md`
- `examples/README.md`

建议改动：

- 写一个 Node.js CI 失败案例，优先选择公开安全的 npm/pnpm/test/lint 场景。
- 包含失败日志片段、使用的模板、期望 AI 输出、维护者验收标准。
- 说明不应该用关闭 CI、跳过测试或删除检查来绕过失败。

完成标准：

- 案例能让读者复制输入结构到自己的 CI 排错任务。
- 示例不包含任何真实 token、私有仓库名或内部日志。
- `npm run lint:md` 通过。

PR 描述建议：

```text
Closes #45

Summary:
- Added a Node.js CI troubleshooting case study.
- Documented failure log, expected output, and validation steps.

Validation:
- npm run lint:md
```

## #46 依赖升级风险示例

Issue：[Good First Issue #46](https://github.com/ONEISALL7/ai-devtools-cn/issues/46)

建议 PR 标题：

```text
Add dependency upgrade risk example
```

建议文件：

- `examples/dependency-upgrade-risk-example.md`
- `examples/README.md`

建议改动：

- 写一个依赖升级风险评估示例，例如 major version upgrade、security patch 或 lockfile update。
- 使用 [依赖升级风险模板](../templates/dependency-upgrade-risk-template.md) 的结构。
- 包含升级背景、风险点、验证计划、回滚方式和 release 注意事项。

完成标准：

- 示例能帮助维护者判断依赖升级是否可以合并。
- 风险分析覆盖 API 兼容性、测试范围、CI、回滚方案。
- `npm run lint:md` 通过。

PR 描述建议：

```text
Closes #46

Summary:
- Added a dependency upgrade risk example.
- Included validation and rollback planning.

Validation:
- npm run lint:md
```

## #47 用户反馈案例整理文档

Issue：[Good First Issue #47](https://github.com/ONEISALL7/ai-devtools-cn/issues/47)

建议 PR 标题：

```text
Add user feedback case documentation guide
```

建议文件：

- `docs/feedback-case-guide.md`
- `docs/feedback.md`
- `README.md`

建议改动：

- 写一个把用户反馈整理成公开案例的流程。
- 区分 external feedback issue、匿名化私聊反馈、维护者自建 issue。
- 说明哪些反馈可以进入申请材料，哪些只能作为内部改进线索。
- 给出一份可复制的“反馈 -> 改进 issue -> PR -> release”记录模板。

完成标准：

- 文档能防止把维护者自己的 issue 包装成外部反馈。
- 文档包含隐私和授权边界。
- `npm run lint:md` 通过。

PR 描述建议：

```text
Closes #47

Summary:
- Added a guide for turning user feedback into public case evidence.
- Clarified privacy, attribution, and evidence boundaries.

Validation:
- npm run lint:md
```

## #48 Python 项目 PR review 示例

Issue：[Good First Issue #48](https://github.com/ONEISALL7/ai-devtools-cn/issues/48)

建议 PR 标题：

```text
Add Python PR review example
```

建议文件：

- `examples/python-pr-review-example.md`
- `examples/README.md`

建议改动：

- 写一个 Python 项目 PR review 示例，优先选择 pytest、typing、packaging 或 dependency change 场景。
- 使用 [PR Review 模板](../templates/pr-review-template.md) 的结构。
- 包含 review 重点、风险判断、建议评论和验收标准。

完成标准：

- 示例能帮助 reviewer 区分 blocking issue、suggestion 和 question。
- 不需要访问真实私有 Python 项目。
- `npm run lint:md` 通过。

PR 描述建议：

```text
Closes #48

Summary:
- Added a Python PR review example.
- Covered risk, test, and review comment structure.

Validation:
- npm run lint:md
```

## #49 前端 README 改进示例

Issue：[Good First Issue #49](https://github.com/ONEISALL7/ai-devtools-cn/issues/49)

建议 PR 标题：

```text
Add frontend README improvement example
```

建议文件：

- `examples/frontend-readme-improvement-example.md`
- `examples/README.md`

建议改动：

- 写一个前端项目 README 改进示例，覆盖安装、启动、测试、构建、环境变量和常见问题。
- 使用 [README 改进模板](../templates/readme-improvement-template.md) 的结构。
- 给出改进前问题、改进后结构、维护者验收标准。

完成标准：

- 示例能帮助前端项目把 README 从“能看”改成“能跟着跑”。
- 不提交真实项目的私有配置或 token。
- `npm run lint:md` 通过。

PR 描述建议：

```text
Closes #49

Summary:
- Added a frontend README improvement example.
- Included setup, test, build, env, and troubleshooting sections.

Validation:
- npm run lint:md
```
