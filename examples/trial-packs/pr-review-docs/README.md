# PR Review 文档改动试用包

> 模板：`pr-review` - PR Review 模板  
> 试用场景：review a documentation PR  
> 目标用户：开源维护者、文档维护者、PR reviewer

这个示例展示第一批用户如何使用 `trial` 生成的试用包完成一次 PR review 试用，并把反馈沉淀成 GitHub issue。

## 文件

- [pr-review.md](pr-review.md)：已填入示例上下文的 PR review 工作稿
- [feedback.md](feedback.md)：可提交到 GitHub issue 的匿名化反馈草稿

## 如何复用

如果你已经克隆本仓库，可以在自己的项目目录运行：

```bash
npm install
npm run templates:doctor
npm run templates:trial -- --template pr-review --scenario "review a documentation PR" --output work/trial
```

如果未来通过 npm 使用，可以运行：

```bash
npx ai-devtools-cn doctor
npx ai-devtools-cn trial --template pr-review --scenario "review a documentation PR" --output work/trial
```

生成后：

1. 打开 `work/trial/pr-review.md`。
2. 把示例上下文替换成你的真实 PR 信息。
3. 将工作稿复制到 AI 开发工具。
4. 只采纳能被你人工确认的 review 结论。
5. 用 `work/trial/feedback.md` 提交匿名化使用反馈。

## 验收重点

试用者提交反馈时，重点说明：

- 模板是否能帮助你更快读懂 PR
- 输出是否能直接转成 review comment
- 哪些字段不清楚
- 是否缺少你所在技术栈的示例
- 是否愿意把使用过程匿名整理成案例

## 公开安全提醒

不要把 API key、token、客户信息、内部日志、未公开源码、生产事故敏感细节或个人隐私写入公开反馈。
