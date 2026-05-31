# Template usage feedback issue draft

> 提交入口：<https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml>  
> 这是匿名化示例。提交真实反馈前，请删除不适用内容。

## Safety check

- [x] 没有包含 API key、token、密码、cookie
- [x] 没有包含客户名称、内部域名、合同、订单或个人隐私
- [x] 没有包含未公开源码、私有日志或生产事故敏感细节
- [x] 如涉及敏感项目，已经改写成可公开的抽象描述

## Feedback

使用的模板或功能：
`ci-troubleshooting` - CI 排错模板，配合 `doctor` 和 `trial` 命令。

使用场景：
排查一次 Node.js 项目的 GitHub Actions markdown job 失败。

项目类型：
公开开源 Node.js CLI / Markdown 文档项目。

是否解决问题：
基本解决。模板能把失败位置、日志、最小修复和验证方式分开，避免直接让 AI 猜改法。

节省了什么工作：
少整理了一次 CI 排错说明，也更容易把结论复制进 PR description。

遇到的困难：
如果失败日志太长，需要更明确地提醒用户只粘贴关键失败 step 和前后 30 行。

希望补充的模板或案例：
希望补充 pnpm workspace、Python pytest、Playwright E2E 和 Docker build 失败的试用包示例。

是否愿意被匿名引用为使用案例：
是。
