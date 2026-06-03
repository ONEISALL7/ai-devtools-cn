# AI DevTools CN 外部试用邀请包

> 邀请渠道：github - GitHub issue / discussion
> 适合对象：已经在维护开源项目、愿意提交公开反馈的开发者
> 推荐模板：pr-review - PR Review 模板
> 试用场景：检查代码或文档 PR

这个邀请包用于找真实开发者完成一次 15 分钟试用，并把反馈沉淀到公开 issue。目标是获得可验证的产品反馈，不是刷 star、刷 issue 或制造虚假采用信号。

## 发送前检查

- [ ] 仓库 README 能说明项目用途和快速开始
- [ ] 已确认反馈入口可访问
- [ ] 邀请对象确实有 PR review、CI、issue、release 或文档维护场景
- [ ] 文案没有夸大 stars、下载量、用户数或任何外部项目结果
- [ ] 已说明不要公开 API key、token、客户信息、内部日志或未公开源码

## 可直接发送的邀请文案

我在维护一个中文 AI 开发者工具模板库 ai-devtools-cn，想找真实开发者试用 PR Review 模板。

这次只需要 15 分钟，用它跑一个可公开描述的场景：检查代码或文档 PR。

如果模板对你的 PR review、CI 排错、issue 分流、release 或文档维护有帮助，请提交一条匿名化反馈 issue。

请不要提交 API key、token、客户信息、内部日志、未公开源码或生产事故敏感细节。

仓库：<https://github.com/ONEISALL7/ai-devtools-cn>

反馈入口：<https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml>

## 推荐试用命令

```bash
npx ai-devtools-cn trial --template pr-review --scenario '检查代码或文档 PR' --output work/ai-devtools-cn-trial
```

如果只想生成反馈草稿：

```bash
npx ai-devtools-cn feedback --template pr-review --scenario '检查代码或文档 PR' --output work/feedback.md
```

## 反馈入口

- GitHub issue：<https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml>
- 快速上手：<https://github.com/ONEISALL7/ai-devtools-cn#readme>
- 第一批用户试用计划：<https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/first-user-test-plan.md>

## 维护者记录

收到反馈后，维护者应该记录：

- 反馈 issue 链接
- 试用者角色，例如个人开发者、开源维护者、团队技术负责人
- 使用的模板或 CLI 命令
- 是否进入真实 PR、issue、CI、release 或文档维护流程
- 后续改进 PR 或 issue

不要把维护者自己写的测试 issue、占位 issue 或泛泛建议包装成外部用户反馈。
