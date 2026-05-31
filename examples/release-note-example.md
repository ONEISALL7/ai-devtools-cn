# Release Note 示例

这个示例展示如何把多个 PR 整理成面向用户的 release note。

## 输入示例

```text
版本：v0.2.0

合并的 PR：
- #6 Add template quality scorecard
- #13 Add FAQ
- #14 Add CI troubleshooting template
- #15 Add dependency upgrade risk template
- #16 Add team AI adoption guide

目标读者：
- 中文开源维护者
- 使用 AI 工具做工程协作的开发者
- 小团队技术负责人
```

## 输出示例

```markdown
# v0.2.0

这个版本补齐了项目早期维护流程中的关键文档和模板，重点帮助维护者更稳定地使用 AI 处理 PR review、CI 排错、依赖升级和团队试点。

## 新增

- 新增模板质量评分表，用于判断新增模板是否适合合并。
- 新增 FAQ，帮助新用户理解项目定位、适用场景和贡献方式。
- 新增 CI 排错模板，支持分析 GitHub Actions、依赖安装和测试失败。
- 新增依赖升级风险评估模板，用于判断升级 PR 的风险和回滚方案。
- 新增团队导入 AI 工具指南，覆盖权限、隐私、试点范围和验收指标。

## 适合谁升级

- 想把 AI 接入开源维护流程的 maintainer。
- 想建立团队 AI 使用规范的小团队。
- 想复制模板处理 CI 和依赖升级问题的开发者。

## 注意事项

这些模板不能替代人工 review。涉及生产配置、凭证、权限、依赖升级和安全修复时，仍然需要维护者确认。
```

## 维护者检查点

- 是否面向用户说明价值，而不是只列 commit。
- 是否把 breaking changes、迁移步骤和风险写清楚。
- 是否说明适合谁升级。
- 是否避免夸大 AI 的能力。
