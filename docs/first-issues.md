# Good First Issues

这个页面记录适合外部贡献者参与的小任务。它们不要求访问私有代码，也不要求了解完整项目历史。

如果你想直接开始写 PR，请先看 [Good First PR Briefs](good-first-pr-briefs.md)。那里把每个任务拆成了建议标题、文件、步骤、验证命令和 PR 描述模板。

## 当前推荐任务

| Issue | 方向 | 适合贡献者 |
| --- | --- | --- |
| [#45 Node.js CI 排错示例](https://github.com/ONEISALL7/ai-devtools-cn/issues/45) | CI / 示例 | 熟悉 Node.js 或 GitHub Actions 的开发者 |
| [#46 依赖升级风险示例](https://github.com/ONEISALL7/ai-devtools-cn/issues/46) | 依赖 / 风险评估 | 做过依赖升级或安全修复的开发者 |
| [#47 用户反馈案例整理文档](https://github.com/ONEISALL7/ai-devtools-cn/issues/47) | 文档 / 反馈 | 擅长整理文档和用户反馈的人 |
| [#48 Python 项目 PR review 示例](https://github.com/ONEISALL7/ai-devtools-cn/issues/48) | PR review / 示例 | 熟悉 Python 项目的开发者 |
| [#49 前端 README 改进示例](https://github.com/ONEISALL7/ai-devtools-cn/issues/49) | README / 前端 | 熟悉前端项目文档的人 |

## 贡献步骤

1. 在对应 issue 下留言说明你想认领。
2. Fork 仓库并创建分支。
3. 本地安装依赖并先查看参考案例：

   ```bash
   npm install
   npm run templates:doctor
   npm run templates:examples
   ```

4. 用任务关键词推荐模板和案例。例如：

   ```bash
   npm run templates:recommend -- ci
   npm run templates:recommend -- review
   npm run templates:recommend -- pytest
   ```

5. 生成工作稿或试用包，整理你的示例输入和期望输出：

   ```bash
   npm run templates:new -- pr-review --output work/pr-review.md
   npm run templates:trial -- --template ci-troubleshooting --scenario "debug a failing CI job" --output work/trial-ci
   ```

6. 新增或修改文档、示例或模板。
7. 本地运行：

   ```bash
   npm run lint:md
   ```

8. 提交 PR，并在描述中关联 issue。

PR 描述建议包含：

- 关联 issue，例如 `Closes #45`
- 新增或修改的文件
- 使用了哪个模板或案例作为参考
- 本地验证结果，例如 `npm run lint:md`

更完整的可复制 PR brief 见 [Good First PR Briefs](good-first-pr-briefs.md)。

## 内容要求

新增示例时请包含：

- 使用场景
- 可复制输入
- 期望输出
- 维护者验收标准
- 不应该怎么用

如果你不确定示例应该放在哪里：

- 基础示例放在 `examples/`
- 来自真实维护流程的案例放在 `examples/case-studies/`
- 面向第一批用户试用的完整流程放在 `examples/trial-packs/`
- 通用方法论和流程说明放在 `docs/`

不要提交：

- 私有源码
- 客户数据
- token、API key、cookie
- 内部域名或内部日志
- 未经授权的真实项目信息

## 已完成的首批任务

早期 backlog 已经通过 issue 和 PR 完成，包括：

- FAQ
- CI 排错模板
- 依赖升级风险模板
- 团队 AI 工具导入指南
- README 改进模板
- CI 排错示例
- release note 示例
- 模板质量评分表

新的外部贡献任务会继续以 `good first issue` 和 `help wanted` 标签维护。
