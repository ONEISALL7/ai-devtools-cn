# 3 分钟快速上手

这个文档帮助你从 `ai-devtools-cn` 里快速选一个模板，复制到 AI 开发工具中使用，并把结果沉淀回真实工程流程。

## 第 1 分钟：选择场景

先判断你现在要解决的问题。

| 你现在要做什么 | 使用这个模板 |
| --- | --- |
| review 一个 PR | [PR Review 模板](../templates/pr-review-template.md) |
| 分流 issue | [Issue Triage 模板](../templates/issue-triage-template.md) |
| 修 CI | [CI 排错模板](../templates/ci-troubleshooting-template.md) |
| 补测试 | [测试生成模板](../templates/test-generation-template.md) |
| 写 release note | [发布说明模板](../templates/release-note-template.md) |
| 判断 AI 输出是否可用 | [AI 输出质量评估模板](../templates/ai-output-evaluation-template.md) |

## 第 2 分钟：复制并替换变量

复制模板后，至少补齐这 5 类信息：

```text
项目背景：
技术栈：
当前问题：
约束条件：
期望输出格式：
```

不要只给 AI 一句“帮我优化”。真实工程任务需要上下文、边界和验收标准。

## 第 3 分钟：把结果落到工程记录

根据场景选择沉淀方式：

| 输出类型 | 建议记录位置 |
| --- | --- |
| bug 分析 | issue 评论 |
| 修复方案 | PR 描述 |
| review 结论 | PR review comment |
| 测试建议 | 测试文件或 TODO issue |
| 发布说明 | `CHANGELOG.md` 或 GitHub Release |
| 工具评估 | team doc 或 ADR |

## 可直接复制的基础提示词

```text
请基于下面的项目上下文完成任务。

项目背景：
[补充你的项目目标和使用者]

技术栈：
[补充语言、框架、运行环境]

当前任务：
[说明要 review、排错、补测试、写文档还是发版]

约束条件：
- 不要跳过测试或 CI
- 不要删除已有功能来绕过问题
- 不确定的地方必须标注为假设
- 输出需要能直接放进 issue、PR 或 release note

期望输出：
1. 关键结论
2. 建议操作
3. 风险和假设
4. 下一步验证方式
```

## 使用建议

- 先用小任务验证模板，不要一次让 AI 接管完整发布流程。
- 对安全、权限、依赖升级和生产变更保持人工 review。
- 把成功案例补充到 `examples/`，把通用流程补充到 `templates/`。
- 如果模板不适合你的场景，请提交 issue 说明缺口。
