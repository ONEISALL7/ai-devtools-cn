# 模板 CLI

本项目提供一个无运行时依赖的模板 CLI，帮助用户快速找到模板并生成可填写的工作稿。

## 使用前准备

安装依赖：

```bash
npm install
```

## 查看可用模板

```bash
npm run templates:list
```

如果通过 npm 或 npx 使用，也可以运行：

```bash
npx ai-devtools-cn list
```

输出会包含：

- `slug`：命令中使用的模板标识
- `title`：模板名称
- `use case`：适用场景
- `file`：模板文件路径

## 搜索模板

```bash
npm run templates:search -- ci
```

等价的 npx 用法：

```bash
npx ai-devtools-cn search ci
```

可以搜索 slug、标题、文件名、使用场景和输出位置。

## 查看单个模板

```bash
npm run templates:show -- pr-review
```

等价的 npx 用法：

```bash
npx ai-devtools-cn show pr-review
```

这个命令会显示模板路径、适用场景、输出位置和模板开头预览。

## 生成工作稿

```bash
npm run templates:new -- ci-troubleshooting --output work/ci-debug.md
```

等价的 npx 用法：

```bash
npx ai-devtools-cn new ci-troubleshooting --output work/ci-debug.md
```

生成的工作稿会包含：

- 来源模板
- 使用场景
- 建议沉淀位置
- 使用前需要填写的上下文
- 原始模板正文

默认输出位置是 `work/<slug>-draft.md`。`work/` 已加入 `.gitignore`，适合存放本地草稿。

如果文件已存在，命令会拒绝覆盖。确实需要覆盖时使用：

```bash
npm run templates:new -- ci-troubleshooting --output work/ci-debug.md --force
```

## 生成维护者工作包

如果你要给一个开源仓库建立一组基础维护工作流，可以运行：

```bash
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
```

等价的 npx 用法：

```bash
npx ai-devtools-cn kit oss-maintainer --output work/oss-maintainer-kit
```

工作包会生成一个目录，包含：

- `README.md`：工作包索引和推荐使用顺序
- `pr-review.md`
- `issue-triage.md`
- `ci-troubleshooting.md`
- `release-note.md`
- `maintainer-weekly-checklist.md`
- `ai-output-evaluation.md`

如果输出目录里的文件已存在，命令会拒绝覆盖。确实需要覆盖时使用：

```bash
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit --force
```

## 生成反馈 issue 草稿

邀请试用者反馈时，可以先生成一份公开安全的 issue 草稿：

```bash
npm run templates:feedback -- --template pr-review --scenario "review a documentation PR" --output work/feedback.md
```

等价的 npx 用法：

```bash
npx ai-devtools-cn feedback --template pr-review --scenario "review a documentation PR" --output work/feedback.md
```

生成的草稿会包含：

- GitHub 反馈 issue 入口
- 公开安全检查
- 使用模板或功能
- 使用场景
- 遇到的困难
- 希望补充的模板或案例

如果只想生成空白反馈草稿，也可以运行：

```bash
npm run templates:feedback -- --output work/feedback.md
```

## 校验模板注册表

维护者或贡献者新增模板后，可以运行：

```bash
npm run templates:validate
```

等价的 npx 用法：

```bash
npx ai-devtools-cn validate
```

这个命令会检查：

- CLI 注册的模板 slug 是否重复
- 注册字段是否为空
- 注册的模板文件是否存在
- `templates/` 下的模板文件是否已注册到 CLI
- 模板文件是否以一级标题开头

## 推荐流程

1. 运行 `npm run templates:list` 找到模板 slug。
2. 运行 `npm run templates:show -- <slug>` 确认是否适合当前任务。
3. 运行 `npm run templates:new -- <slug> --output work/<task>.md` 生成工作稿。
4. 补齐工作稿中的项目背景、技术栈、日志、约束条件和期望输出。
5. 把整理后的提示词复制到你的 AI 开发工具。

如果你是开源项目维护者，想先建立一整套基础流程，可以直接运行 `npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit`。

## 发布前检查

维护者发布 npm 包前应运行：

```bash
npm run test
npm run templates:validate
npm run pack:dry-run
```

`npm run pack:dry-run` 只检查发布内容，不会真正发布包。

## 注意事项

- CLI 不会调用任何 AI API。
- CLI 不会读取你的项目源码，除非你主动把内容写进工作稿。
- 不要把密钥、客户数据、账号或未公开代码提交到仓库。
- AI 输出仍需要人工 review，尤其是安全、依赖升级和生产变更。
