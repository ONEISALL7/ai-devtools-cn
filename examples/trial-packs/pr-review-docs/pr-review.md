# PR Review 模板工作稿

> 来源模板：`templates/pr-review-template.md`  
> 使用场景：review a documentation PR  
> 建议沉淀位置：PR review comment

## 使用前填写

```text
项目背景：
一个中文 AI 工程维护模板库，维护者希望新用户能在 3 分钟内理解项目用途，并快速找到 CLI 和试用入口。

技术栈：
Markdown 文档、Node.js CLI、GitHub Actions markdown check。

当前任务：
审查一个文档 PR。该 PR 给 README 增加 doctor 和 trial 命令，并链接第一批用户试用计划。

相关文件或日志：
- README.md
- docs/template-cli.md
- docs/first-user-test-plan.md
- npm run lint:md 已通过

约束条件：
- 不要夸大项目已有用户数、下载量或外部反馈
- 不要把维护者自己创建的 issue 当作外部用户反馈
- 文档必须能被第一次进入仓库的开发者理解
- 需要检查命令是否能直接复制执行

期望输出格式：
- Review 结论：approve / request changes / comment
- 必须修改的问题
- 可选建议
- 可以直接粘贴到 PR 的 review comment
```

## 模板正文

请帮我 review 这个 PR。你需要从维护者角度检查：

1. 这个改动是否解决了 PR 描述中的目标？
2. 是否引入新的维护成本或误导用户的表述？
3. README 或文档入口是否清楚？
4. 示例命令是否能直接复制执行？
5. 是否缺少测试、验证步骤或安全注意事项？

请按下面格式输出：

```text
Review 结论：

必须修改：

建议修改：

可以直接作为 PR comment 的版本：
```

## 示例期望输出

```text
Review 结论：
comment

必须修改：
- README 中新增命令需要和 docs/template-cli.md 保持一致。
- 如果提到外部反馈，必须继续说明当前 external feedback issue 仍为 0。

建议修改：
- 在第一批用户试用计划中优先给出 doctor + trial 的最短路径。
- 在 PR 描述中写明 npm run lint:md 或 npm run test 的结果。

可以直接作为 PR comment 的版本：
这个 PR 的方向是对的，doctor + trial 能降低第一批用户试用门槛。建议合并前确认 README、CLI 文档和 first-user-test-plan 中的命令完全一致，并保留“不要夸大外部采用信号”的提醒。
```
