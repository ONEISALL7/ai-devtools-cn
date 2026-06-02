# 真实维护案例

这个目录收集基于本仓库真实维护记录整理出的案例。每个案例都包含：

- 适用场景
- 可复制输入
- AI 期望输出
- 维护者验收标准
- 如何沉淀到 issue、PR、CI 或 release

## 案例列表

| 场景 | 案例 |
| --- | --- |
| PR review | [用 PR Review 模板审查快速上手 PR](pr-review-quickstart-release.md) |
| CI 排错 | [用 CI 排错模板修复 markdownlint MD012](ci-markdownlint-md012.md) |
| 发版说明 | [用 release note 模板发布 v0.2.0](release-v020.md) |
| CLI 维护 | [为模板库增加 CLI 注册校验](template-registry-validation.md) |
| CI 排错 | [Node.js CI 依赖安装失败排查](node-ci-troubleshooting.md) |
| PR review | [Python PR Review：签名变更与兼容性验证](python-pr-review-example.md) |
| 依赖管理 | [依赖升级风险评估](dependency-upgrade-risk-example.md) |
| 文档维护 | [前端 README 改进：从“看得懂”到“能跑起来”](frontend-readme-improvement-example.md) |

## 使用方式

1. 先打开和你当前任务最接近的案例。
2. 复制案例中的提示词。
3. 替换项目背景、日志、变更列表和验证方式。
4. 把 AI 输出整理成 issue 评论、PR review、修复 commit 或 release note。

这些案例不是为了证明 AI 可以替代维护者，而是帮助维护者更快完成重复性整理、检查和说明工作。
