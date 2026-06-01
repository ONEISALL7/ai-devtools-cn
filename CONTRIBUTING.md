# 贡献指南

感谢你考虑为 AI DevTools CN 做贡献。这个项目接受文档、模板、示例和维护流程改进。

## 适合提交的内容

- 可复用的 AI 工程提示词模板
- 真实项目中的 AI 工作流案例
- 工具评估、PR review、issue triage、测试生成、文档维护模板
- 现有文档的纠错、补充和过期信息更新
- GitHub Actions、文档结构和贡献流程改进

如果你不确定该用哪个 issue 表单：

- 新模板或模板改进：Template request
- 匿名化真实案例：Case study contribution
- CLI 问题或建议：CLI issue
- 使用反馈：Template usage feedback

如果你只是想确认该去哪里提问或反馈，先看 [支持入口](SUPPORT.md)。

第一次贡献者可以先看 [Good First Issues](docs/first-issues.md) 和 [外部试用者快速指南](docs/external-tester-guide.md)。前者列出适合外部贡献者认领的小任务，后者说明如何用公开安全的方式试用模板并提交反馈。

## 不适合提交的内容

- 仅用于营销的工具介绍
- 无法复现的个人体验
- 没有适用范围说明的万能提示词
- 包含密钥、账号、客户代码或隐私数据的案例
- 夸大工具能力或绕过产品规则的内容

## 提交模板的标准

新增模板请尽量包含：

```text
用途
适用场景
输入信息
提示词正文
输出格式
验收标准
注意事项
```

## 本地检查

如果你安装了 Node.js，可以运行：

```bash
npm install
npm run lint:md
```

没有 Node.js 也可以直接提交小型文档修复，维护者会在 PR 中协助检查。

## Pull Request 流程

1. 创建 issue 或在已有 issue 下说明你准备做的修改。
2. Fork 仓库并创建分支。
3. 按模板补充文档或示例。
4. 提交 PR，并在说明中写清楚修改原因、影响范围和验证方式。
5. 根据 review 意见调整。

## 维护者职责

维护者会优先处理：

- 修复错误信息的 PR
- 补充真实维护工作流的 PR
- 能提升模板可复用性的 PR
- 能减少重复 issue 的文档改进

复杂或争议性修改可能会要求先开 issue 讨论。
