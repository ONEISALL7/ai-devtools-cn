# FAQ

这份 FAQ 面向第一次进入本项目的中文开发者、开源维护者和团队技术负责人。

## 这个项目和普通提示词合集有什么区别？

普通提示词合集通常只提供一句或一段提示词。本项目更关注真实工程流程，模板会尽量包含：

- 适用场景
- 输入信息
- 输出格式
- 验收标准
- 安全边界
- 维护者如何判断结果是否可信

项目目标不是让 AI 替代维护者，而是帮助维护者更快完成 PR review、issue triage、CI 排错、测试补全、文档维护和 release 管理。

## 模板是否绑定某个 AI 工具？

默认不绑定。大多数模板可以用于 ChatGPT、Codex、Claude、Gemini、Copilot Chat 或其他支持上下文输入的 AI 工具。

如果某个模板依赖特定能力，例如读取仓库、生成补丁、运行测试或访问 CI 日志，模板会在适用范围里说明。

## 我应该从哪个模板开始？

如果你维护开源项目，建议按这个顺序尝试：

1. `templates/issue-triage-template.md`
2. `templates/pr-review-template.md`
3. `templates/ci-troubleshooting-template.md`
4. `templates/release-note-template.md`
5. `templates/documentation-update-template.md`

如果你是团队负责人，建议先看：

1. `docs/team-ai-adoption-guide.md`
2. `templates/ai-tool-onboarding-checklist.md`
3. `templates/tool-evaluation-template.md`

## 如何提交自己的模板？

推荐流程：

1. 先开 issue 描述场景。
2. 说明模板要解决什么维护问题。
3. 新建 PR 添加模板或示例。
4. 按 `docs/template-quality-scorecard.md` 自查。
5. 在 PR 描述里写清楚验证方式。

模板应该尽量可以被别人复制使用，而不是只适合你自己的项目。

## 一个模板怎样才适合收录？

最低要求：

- 能解决真实工程任务。
- 输入信息和输出格式清楚。
- 有安全边界。
- 有可验证的验收标准。
- 不要求用户粘贴密钥、私有客户数据或不可公开日志。

如果模板只能用于一个非常私有的项目，建议改写成通用版本后再提交。

## AI 输出可以直接用于生产环境吗？

不建议。AI 输出应该作为候选方案，由维护者复核。

尤其是这些场景必须人工确认：

- 删除数据或文件
- 修改权限
- 更新依赖
- 处理安全漏洞
- 变更 CI/CD
- 修改生产配置
- 生成 release 或迁移脚本

## 项目现在处于什么阶段？

项目目前处于早期维护阶段，重点是沉淀可复制的中文 AI 工程模板和示例。

欢迎通过 issue 反馈：

- 哪个模板最有用
- 哪个场景还缺模板
- 哪些输出格式不够清楚
- 哪些安全边界需要补充

