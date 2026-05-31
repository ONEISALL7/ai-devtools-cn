# 为模板库增加 CLI 注册校验

## 背景

这个案例基于本仓库 issue #55 和 PR #56 整理：模板数量增加后，维护者需要保证 `scripts/template-cli.mjs` 中的模板注册表和 `templates/` 目录保持一致。

如果没有校验命令，常见问题包括：

- 新增模板文件后忘记注册到 CLI
- 删除或重命名模板后 CLI 仍指向旧路径
- slug 重复，导致用户无法确定该用哪个模板
- 模板元信息缺失，影响 `list`、`search` 和 `new` 命令输出

这类问题适合整理成可重复的维护流程，因为它能帮助后续贡献者在提交 PR 前自检。

## 维护者目标

维护者要让 AI 帮忙做的是：

- 把“模板注册表一致性”拆成可验证规则
- 设计一个不依赖外部服务的本地 CLI 命令
- 明确失败时的错误输出
- 补充自动测试，避免后续改动破坏命令
- 更新文档，让贡献者知道何时运行校验

## 可复制输入

```text
请帮我为一个模板 CLI 设计本地校验命令。

项目背景：
这是一个中文 AI 开发者工具模板库，templates/ 下每个模板都应该注册到 CLI。
CLI 当前支持 list、search、show、new。

目标：
增加 validate 命令，帮助维护者和贡献者检查模板注册表是否和文件系统一致。

需要校验：
- slug 不能重复
- title、file、useCase、output 字段不能为空
- 注册的文件必须存在
- templates/ 下的模板文件必须注册到 CLI
- 模板文件应该以一级标题开头

约束条件：
- 不引入运行时依赖
- 不调用任何 AI API
- 失败时输出具体错误并以非 0 状态退出
- 成功时输出注册模板数量和检查文件数量
- 需要补充 CLI 测试和文档

请输出：
1. 命令行为设计
2. 实现步骤
3. 测试点
4. 文档需要更新的位置
5. 维护者验收标准
```

## 期望输出示例

```text
命令行为：
新增 validate 命令。成功时输出 Template registry validation passed，并列出模板数量和文件数量。失败时输出 Template registry validation failed，然后逐条列出错误。

实现步骤：
1. 在 CLI 中读取 templates 注册表。
2. 用 Set 检查 slug 和 file 是否重复。
3. 校验必填字段是否为空。
4. 校验注册文件是否存在。
5. 读取 templates/ 下除 README.md 外的 Markdown 文件，确认都已注册。
6. 将 validate 加入命令分支和 help 文案。

测试点：
- validate 命令成功输出。
- templates:validate 别名可用。
- test:cli 覆盖该命令。
- lint:md 仍然通过。

文档更新：
- docs/template-cli.md
- templates/README.md
- README.md 快速开始
- CHANGELOG.md
```

## 维护者验收标准

合并前确认：

- `npm run templates:validate` 本地通过
- `npm run test:cli` 覆盖 validate 命令
- `npm run lint:md` 通过
- `npm run pack:dry-run` 能看到更新后的 CLI 文件
- 文档没有把 validate 描述成会检查模板内容质量或调用 AI

## 常见错误

不要把校验命令做得过重：

```text
每个模板都必须包含完全相同的标题结构。
校验命令应该调用模型判断模板质量。
发现问题时自动修改模板文件。
```

这些做法会增加误伤和维护成本。更合适的边界是检查“注册表和文件系统是否一致”，把主观质量判断留给 review。

## 如何沉淀

这个案例可以沉淀为：

- CLI 功能设计 issue
- PR 描述中的验证清单
- 新贡献者新增模板前的本地检查步骤
- release note 中的维护能力改进说明
