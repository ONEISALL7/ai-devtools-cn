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

第一次使用建议从 [3 分钟快速上手](docs/quickstart.md) 开始。

如果你不知道该选哪个模板，先看 [如何选择模板](docs/choose-template.md)。

最短路径一：直接复制模板

1. 按场景从下面选择一个模板。
2. 复制模板内容到你的 AI 开发工具。
3. 替换项目背景、技术栈、约束条件和期望输出。
4. 把有效结果沉淀到 issue、PR、文档或 release note。

最短路径二：用 CLI 生成工作稿

```bash
npm install
npm run templates:list
npm run templates:new -- ci-troubleshooting --output work/ci-debug.md
```

如果通过 npm 使用，发布后也可以运行：

```bash
npx ai-devtools-cn list
npx ai-devtools-cn new pr-review --output work/pr-review.md
```

更多命令见 [模板 CLI](docs/template-cli.md)。

## 按身份开始

| 你是谁 | 第一步 |
| --- | --- |
| 个人开发者 | 用 [PR Review 模板](templates/pr-review-template.md) 检查一次改动 |
| 开源维护者 | 用 [Issue Triage 模板](templates/issue-triage-template.md) 分流一个 issue |
| 正在修 CI 的维护者 | 用 [CI 排错模板](templates/ci-troubleshooting-template.md) 分析失败日志 |
| 技术负责人 | 用 [AI 工具导入检查清单](templates/ai-tool-onboarding-checklist.md) 设计团队试点规则 |
| 发版负责人 | 用 [发布说明模板](templates/release-note-template.md) 生成 release note 草稿 |

## 模板索引

完整说明见 [模板目录](templates/README.md)。

| 场景 | 直接复制 |
| --- | --- |
| PR review | [PR Review 模板](templates/pr-review-template.md) |
| issue 分流 | [Issue Triage 模板](templates/issue-triage-template.md) |
| CI 排错 | [CI 排错模板](templates/ci-troubleshooting-template.md) |
| 测试补全 | [测试生成模板](templates/test-generation-template.md) |
| 文档维护 | [文档更新模板](templates/documentation-update-template.md) |
| README 改进 | [README 改进模板](templates/readme-improvement-template.md) |
| release note | [发布说明模板](templates/release-note-template.md) |
| 依赖升级评估 | [依赖升级风险模板](templates/dependency-upgrade-risk-template.md) |
| 安全审查 | [安全审查模板](templates/security-review-template.md) |
| 工具选型 | [工具评估清单](templates/tool-evaluation-template.md) |
| 团队导入 | [AI 工具导入检查清单](templates/ai-tool-onboarding-checklist.md) |
| 输出验收 | [AI 输出质量评估模板](templates/ai-output-evaluation-template.md) |

## 示例

完整说明见 [示例目录](examples/README.md)。

| 场景 | 示例 |
| --- | --- |
| PR review | [PR Review 示例](examples/pr-review-example.md) |
| issue 分流 | [Issue Triage 示例](examples/issue-triage-example.md) |
| CI 排错 | [CI 排错示例](examples/ci-troubleshooting-example.md) |
| release note | [Release note 示例](examples/release-note-example.md) |

## 真实维护案例

这些案例基于本仓库真实 issue、PR、CI 和 release 记录整理，适合照着复制到自己的项目中：

- [用 PR Review 模板审查快速上手 PR](examples/case-studies/pr-review-quickstart-release.md)
- [用 CI 排错模板修复 markdownlint MD012](examples/case-studies/ci-markdownlint-md012.md)
- [用 release note 模板发布 v0.2.0](examples/case-studies/release-v020.md)

## 文档入口

- [如何选择模板](docs/choose-template.md)
- [模板 CLI](docs/template-cli.md)
- [OpenAI Codex for Open Source 申请准备](docs/openai-codex-oss-application.md)
- [AI 工具接入工程流程](docs/ai-engineering-workflow.md)
- [团队导入 AI 工具指南](docs/team-ai-adoption-guide.md)
- [模板质量评分卡](docs/template-quality-scorecard.md)
- [FAQ](docs/faq.md)
- [维护者成长计划](docs/maintainer-growth-plan.md)
- [仓库检查清单](docs/repository-checklist.md)

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

如果你已经使用过某个模板或 CLI，请阅读 [用户反馈](docs/feedback.md)，并通过 issue 反馈真实使用场景。反馈可以匿名化，不需要公开私有代码或敏感日志。

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
