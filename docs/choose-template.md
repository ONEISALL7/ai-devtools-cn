# 如何选择模板

如果你第一次使用本项目，可以先按身份或任务选择模板。不要从完整目录里盲选。

## 按身份选择

| 你是谁 | 建议先用 | 适合解决的问题 |
| --- | --- | --- |
| 个人开发者 | [PR Review 模板](../templates/pr-review-template.md) | 检查自己或同伴的代码改动 |
| 开源维护者 | [Issue Triage 模板](../templates/issue-triage-template.md) | 快速分流 bug、feature、docs 和 question |
| 开源维护者 | [CI 排错模板](../templates/ci-troubleshooting-template.md) | 从失败日志定位最小修复 |
| 技术负责人 | [AI 工具导入检查清单](../templates/ai-tool-onboarding-checklist.md) | 给团队设定 AI 使用边界 |
| 文档维护者 | [文档更新模板](../templates/documentation-update-template.md) | 把 AI 输出落到可维护文档 |
| 发版负责人 | [发布说明模板](../templates/release-note-template.md) | 写面向用户的 release note |
| 任何公开发布前 | [公开安全脱敏模板](../templates/public-safety-redaction-template.md) | 检查日志、反馈、案例或帖子是否能公开 |

## 按任务选择

| 我要做什么 | 推荐模板 | 建议一起看 |
| --- | --- | --- |
| review 一个 PR | [PR Review 模板](../templates/pr-review-template.md) | [PR review 案例](../examples/case-studies/pr-review-quickstart-release.md) |
| 判断 issue 怎么处理 | [Issue Triage 模板](../templates/issue-triage-template.md) | [Issue Triage 示例](../examples/issue-triage-example.md) |
| 修 CI 失败 | [CI 排错模板](../templates/ci-troubleshooting-template.md) | [CI 排错案例](../examples/case-studies/ci-markdownlint-md012.md) |
| 补测试 | [测试生成模板](../templates/test-generation-template.md) | [AI 工具接入工程流程](ai-engineering-workflow.md) |
| 改 README | [README 改进模板](../templates/readme-improvement-template.md) | [3 分钟快速上手](quickstart.md) |
| 写 release note | [发布说明模板](../templates/release-note-template.md) | [v0.2.0 发版案例](../examples/case-studies/release-v020.md) |
| 升级依赖 | [依赖升级风险模板](../templates/dependency-upgrade-risk-template.md) | [安全审查模板](../templates/security-review-template.md) |
| 评估 AI 输出是否可信 | [AI 输出质量评估模板](../templates/ai-output-evaluation-template.md) | [模板质量评分卡](template-quality-scorecard.md) |
| 给团队引入 AI 工具 | [AI 工具导入检查清单](../templates/ai-tool-onboarding-checklist.md) | [团队导入 AI 工具指南](team-ai-adoption-guide.md) |
| 公开日志、反馈或案例前脱敏 | [公开安全脱敏模板](../templates/public-safety-redaction-template.md) | [安全审查模板](../templates/security-review-template.md) |

## 使用前准备

每次使用模板前，至少准备这些信息：

```text
项目背景：
技术栈：
当前任务：
相关文件或日志：
约束条件：
期望输出格式：
```

如果你无法补齐这些信息，AI 输出通常会变成泛泛建议，难以直接用于工程维护。

## 使用后沉淀

| AI 输出类型 | 建议沉淀位置 |
| --- | --- |
| review 结论 | PR review comment |
| bug 根因分析 | issue 评论 |
| 修复步骤 | PR 描述 |
| 测试建议 | 测试 TODO 或新 issue |
| release note 草稿 | GitHub Release 或 `CHANGELOG.md` |
| 团队规则 | 团队文档或 ADR |

## 不适合使用模板的情况

这些情况不建议直接套模板：

- 你没有提供任何项目上下文
- 你希望 AI 绕过 CI、测试或 review
- 任务涉及密钥、客户数据、账号、隐私或未公开代码
- 你需要法律、医疗、财务等高风险判断
- 你想让 AI 代替维护者做最终合并决定

模板的作用是降低重复维护成本，不是替代维护责任。
