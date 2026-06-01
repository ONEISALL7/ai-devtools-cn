# AI DevTools CN

[![Markdown Check](https://github.com/ONEISALL7/ai-devtools-cn/actions/workflows/markdown-check.yml/badge.svg)](https://github.com/ONEISALL7/ai-devtools-cn/actions/workflows/markdown-check.yml)
[![Latest Release](https://img.shields.io/github/v/release/ONEISALL7/ai-devtools-cn?label=release)](https://github.com/ONEISALL7/ai-devtools-cn/releases)
[![npm version](https://img.shields.io/npm/v/ai-devtools-cn?label=npm)](https://www.npmjs.com/package/ai-devtools-cn)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

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

最短路径二：用 npm CLI 或仓库内 CLI 生成工作稿

运行 `npx` 前建议先确认 npm 当前已发布版本：

```bash
npm view ai-devtools-cn version
```

如果 `npx` 提示未知命令，说明 npm 包还没有同步到 GitHub `main` 的最新 CLI；可以先在仓库内使用对应的 `npm run templates:*` 命令，或等待下一次 npm 发布。

无需克隆仓库，可以直接运行：

```bash
npx ai-devtools-cn doctor
npx ai-devtools-cn launch
npx ai-devtools-cn contribute
npx ai-devtools-cn handoff
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
npx ai-devtools-cn pr-pack 45 --output work/pr-pack-45.md
npx ai-devtools-cn review-pr --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md
npx ai-devtools-cn recommend ci
npx ai-devtools-cn trial --template pr-review --output work/trial
npx ai-devtools-cn adoption --template pr-review --output work/adoption-sprint
```

如果你在本仓库内开发或贡献，再使用 npm scripts：

```bash
npm install
npm run templates:list
npm run templates:examples
npm run templates:launch
npm run templates:contribute
npm run templates:handoff
npm run templates:pr-pack -- 45 --output work/pr-pack-45.md
npm run templates:review-pr -- --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
npm run templates:claim -- 45 --output work/claim-45.md
npm run templates:starter -- 45 --output work/node-ci-starter.md
npm run templates:recommend -- ci
npm run templates:validate
npm run templates:doctor
npm run templates:publish-check
npm run templates:trial -- --template pr-review --output work/trial
npm run templates:new -- ci-troubleshooting --output work/ci-debug.md
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
npm run templates:feedback -- --template pr-review --output work/feedback.md
npm run templates:outreach -- --template pr-review --channel x --output work/outreach.md
npm run templates:adoption -- --template pr-review --output work/adoption-sprint
npm run templates:evidence -- --output work/external-evidence.md
npm run templates:application -- --output work/openai-application.md
```

本仓库当前 CLI 命令：

```bash
npx ai-devtools-cn list
npx ai-devtools-cn examples
npx ai-devtools-cn launch
npx ai-devtools-cn contribute
npx ai-devtools-cn handoff --output work/external-pr-handoff.md
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
npx ai-devtools-cn pr-pack 45 --output work/pr-pack-45.md
npx ai-devtools-cn review-pr --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md
npx ai-devtools-cn recommend ci
npx ai-devtools-cn doctor
npx ai-devtools-cn publish-check
npx ai-devtools-cn trial --template pr-review --output work/trial
npx ai-devtools-cn new pr-review --output work/pr-review.md
npx ai-devtools-cn outreach --template pr-review --channel x --output work/outreach.md
npx ai-devtools-cn adoption --template pr-review --output work/adoption-sprint
npx ai-devtools-cn evidence --output work/external-evidence.md
npx ai-devtools-cn application --output work/openai-application.md
```

更多命令见 [模板 CLI](docs/template-cli.md)。

CLI 生成的相对路径会写入你运行命令时所在的当前目录，适合在自己的项目里生成 `work/` 草稿。

## 第一次外部 PR

如果你想提交第一个小 PR，可以从下面这些 `good first issue` 开始：

| Issue | 任务 | 建议 PR 标题 |
| --- | --- | --- |
| [#45](https://github.com/ONEISALL7/ai-devtools-cn/issues/45) | Node.js CI 排错示例 | Add Node.js CI troubleshooting case study |
| [#46](https://github.com/ONEISALL7/ai-devtools-cn/issues/46) | 依赖升级风险示例 | Add dependency upgrade risk example |
| [#47](https://github.com/ONEISALL7/ai-devtools-cn/issues/47) | 用户反馈案例整理文档 | Add user feedback case documentation guide |
| [#48](https://github.com/ONEISALL7/ai-devtools-cn/issues/48) | Python 项目 PR review 示例 | Add Python PR review example |
| [#49](https://github.com/ONEISALL7/ai-devtools-cn/issues/49) | 前端 README 改进示例 | Add frontend README improvement example |

建议流程：

1. 在对应 issue 下留言说明你想认领。
2. Fork 仓库到自己的 GitHub 账号。
3. 运行 `npx ai-devtools-cn contribute` 查看任务和起步命令。
4. 以 #45 为例，生成本地草稿：

```bash
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
npx ai-devtools-cn pr-pack 45 --output work/pr-pack-45.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/starter-45.md
```

如果 `npx` 版本还没有同步这些命令，可以 clone 本仓库后运行：

```bash
npm install
npm run templates:contribute
npm run templates:handoff -- --issue 45 --output work/handoff-45.md
npm run templates:pr-pack -- 45 --output work/pr-pack-45.md
npm run templates:claim -- 45 --output work/claim-45.md
npm run templates:starter -- 45 --output work/starter-45.md
```

这些本地草稿只帮助你准备 PR。只有外部贡献者用自己的 GitHub 账号提交并合并的 PR，才可能被记录为 external merged PR。

## 按身份开始

| 你是谁 | 第一步 |
| --- | --- |
| 第一次试用的外部用户 | 看 [外部试用者快速指南](docs/external-tester-guide.md)，完成一次 10-15 分钟试用 |
| 个人开发者 | 用 [PR Review 模板](templates/pr-review-template.md) 检查一次改动 |
| 开源维护者 | 用 [Issue Triage 模板](templates/issue-triage-template.md) 分流一个 issue |
| 想邀请外部贡献者的维护者 | 用 [外部贡献者引导模板](templates/contributor-onboarding-template.md) 写清楚第一个 PR |
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
| 外部贡献者引导 | [外部贡献者引导模板](templates/contributor-onboarding-template.md) |

## 示例

完整说明见 [示例目录](examples/README.md)。

| 场景 | 示例 |
| --- | --- |
| PR review | [PR Review 示例](examples/pr-review-example.md) |
| issue 分流 | [Issue Triage 示例](examples/issue-triage-example.md) |
| CI 排错 | [CI 排错示例](examples/ci-troubleshooting-example.md) |
| release note | [Release note 示例](examples/release-note-example.md) |
| 第一批用户试用 | [PR Review 文档改动试用包](examples/trial-packs/pr-review-docs/README.md) |
| Node.js CI 试用 | [Node.js CI 排错试用包](examples/trial-packs/node-ci-failure/README.md) |
| Python pytest 试用 | [Python pytest 失败试用包](examples/trial-packs/python-pytest-failure/README.md) |
| pnpm workspace CI 试用 | [pnpm workspace CI 排错试用包](examples/trial-packs/pnpm-workspace-ci/README.md) |

## 真实维护案例

这些案例基于本仓库真实 issue、PR、CI 和 release 记录整理，适合照着复制到自己的项目中：

- [用 PR Review 模板审查快速上手 PR](examples/case-studies/pr-review-quickstart-release.md)
- [用 CI 排错模板修复 markdownlint MD012](examples/case-studies/ci-markdownlint-md012.md)
- [用 release note 模板发布 v0.2.0](examples/case-studies/release-v020.md)
- [为模板库增加 CLI 注册校验](examples/case-studies/template-registry-validation.md)

## 文档入口

- [如何选择模板](docs/choose-template.md)
- [模板 CLI](docs/template-cli.md)
- [OpenAI Codex for Open Source 申请准备](docs/openai-codex-oss-application.md)
- [npm 发布清单](docs/npm-publish.md)
- [社区推广和反馈收集](docs/community-outreach.md)
- [社区发布包](docs/community-launch-pack.md)
- [外部试用者快速指南](docs/external-tester-guide.md)
- [第一批用户试用计划](docs/first-user-test-plan.md)
- [外部 PR 交接包](docs/external-pr-handoff-kit.md)
- [支持入口](SUPPORT.md)
- [项目指标追踪](docs/metrics.md)
- [Good First Issues](docs/first-issues.md)
- [Good First PR Briefs](docs/good-first-pr-briefs.md)
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

开始前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。如果你想认领一个小任务，可以从 [Good First Issues](docs/first-issues.md)、[Good First PR Briefs](docs/good-first-pr-briefs.md) 和 [外部 PR 交接包](docs/external-pr-handoff-kit.md) 开始。

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
