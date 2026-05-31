# AI DevTools CN

面向中文开发者的 AI 开发工具实践模板库，收集可复用的工作流、提示词模板、代码审查模板、issue 分流模板、发布说明模板和工具评估清单。

这个项目的目标不是追逐工具榜单，而是帮助开发者把 AI 工具稳定地接入真实工程流程：需求澄清、代码生成、PR review、测试补全、文档维护、CI 排错和 release 管理。

## 项目适合谁

- 正在使用 AI 编程工具的个人开发者
- 需要建立团队 AI 工程规范的技术负责人
- 维护开源项目、需要降低 triage/review/docs 负担的 maintainer
- 想系统整理 AI 工具实践经验的中文技术社区成员

## 仓库内容

```text
docs/        中文实践文档
templates/   可复制的提示词和维护模板
examples/    示例工作流
.github/     issue、PR 和 CI 配置
```

## 快速开始

1. 从 `templates/` 选择一个模板。
2. 把项目背景、技术栈、约束条件和期望输出补完整。
3. 在 AI 工具中执行模板，并保留关键决策记录。
4. 如果模板有效，欢迎提交 PR 补充适用场景和注意事项。

推荐先看：

- [AI 工具接入工程流程](docs/ai-engineering-workflow.md)
- [工具评估清单](templates/tool-evaluation-template.md)
- [PR Review 模板](templates/pr-review-template.md)
- [Issue Triage 模板](templates/issue-triage-template.md)

## 设计原则

- **工程优先**：模板必须能用于真实项目，不收录只有演示价值的提示词。
- **可复现**：每个模板尽量包含输入、约束、输出格式和验收标准。
- **可维护**：文档需要标注适用范围，避免把阶段性经验写成永久结论。
- **中文友好**：默认用中文解释概念，同时保留必要英文术语。
- **工具中立**：不绑定单一产品，除非文档明确说明适用工具和版本。

## 贡献方式

欢迎提交以下内容：

- 新的 AI 工程工作流模板
- 真实项目中的使用案例
- 对现有模板的修订和边界条件补充
- 文档错别字、过期信息或链接修复
- 面向特定技术栈的模板，例如 Python、Node.js、Rust、前端、数据工程等

开始前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 维护路线

当前优先级：

- 建立核心模板库
- 补充真实使用案例
- 增加工具评估维度
- 建立 issue/PR 分流机制
- 发布稳定版本

详细计划见 [ROADMAP.md](ROADMAP.md)。

## 许可协议

本项目使用 [MIT License](LICENSE)。
