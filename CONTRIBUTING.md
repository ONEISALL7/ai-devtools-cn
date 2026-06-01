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

第一次贡献者可以先看 [Good First Issues](docs/first-issues.md)、[Good First PR Briefs](docs/good-first-pr-briefs.md) 和 [外部试用者快速指南](docs/external-tester-guide.md)。前两个页面列出适合外部贡献者认领的小任务和可复制 PR brief，后者说明如何用公开安全的方式试用模板并提交反馈。

## 第一个外部 PR 快速路径

如果你准备认领 `good first issue`，推荐先按这个顺序执行：

1. 在 issue 下留言说明你想认领。
2. Fork 仓库到自己的 GitHub 账号。
3. 创建一个小分支，只做对应 issue 的范围。
4. 按 [Good First PR Briefs](docs/good-first-pr-briefs.md) 中的建议文件和完成标准提交 PR。

如果你想先生成本地草稿，可以运行：

```bash
npm view ai-devtools-cn version
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/starter-45.md
```

把 `45` 替换成你认领的 issue 编号。`npx` 可用命令以 npm 当前已发布版本为准；如果提示未知命令，说明 npm 包还没有同步到 GitHub `main` 的最新 CLI。此时可以 clone 仓库后使用：

```bash
npm install
npm run templates:handoff -- --issue 45 --output work/handoff-45.md
npm run templates:claim -- 45 --output work/claim-45.md
npm run templates:starter -- 45 --output work/starter-45.md
```

这些草稿只帮助你准备 PR。只有你用自己的 GitHub 账号提交并被合并的 PR，才可能被维护者记录为 external merged PR。

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

如果你认领的是 `good first issue`，可以直接按 [Good First PR Briefs](docs/good-first-pr-briefs.md) 中的建议文件、完成标准和 PR 描述模板执行。

PR 合并前，维护者可能会用 `npx ai-devtools-cn review-pr --pr <number> --author <username> --issue <number>` 生成 review 清单，检查公开安全边界、验证命令和 external PR 记录条件。

提交 PR 时请尽量补齐 PR 模板里的“外部贡献信息”部分。它会帮助维护者判断 PR 是否来自真实外部贡献者、是否关联公开 issue，以及合并后能否进入 external merged PR 证据记录。

## 维护者职责

维护者会优先处理：

- 修复错误信息的 PR
- 补充真实维护工作流的 PR
- 能提升模板可复用性的 PR
- 能减少重复 issue 的文档改进

复杂或争议性修改可能会要求先开 issue 讨论。
