# 模板 CLI

本项目提供一个无运行时依赖的模板 CLI，帮助用户快速找到模板并生成可填写的工作稿。

## 使用前准备

安装依赖：

```bash
npm install
```

CLI 会从本包读取模板，但把生成文件写入你运行命令时所在的当前目录。相对输出路径如 `work/ci-debug.md` 会落在当前项目下；绝对路径会按原路径写入。

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

## 查看示例和试用包

```bash
npm run templates:examples
```

等价的 npx 用法：

```bash
npx ai-devtools-cn examples
```

输出会按分组展示：

- 基础示例
- 真实维护案例
- 第一批用户试用包

每条记录包含 slug、标题、适用场景、关联模板和文件路径，适合第一次进入项目时快速找到可复制案例。

## 查看外部贡献任务

```bash
npm run templates:contribute
```

等价的 npx 用法：

```bash
npx ai-devtools-cn contribute
```

这个命令会列出：

- Good First PR Briefs 链接
- 当前 #45-#49 可认领任务
- 每个任务的 issue、brief 和建议 PR 标题
- 最小验证命令
- 公开安全边界

这个命令面向真实外部贡献者。维护者自己完成的 PR 不能写成 external merged PR。

## 查看社区发布入口

```bash
npm run templates:launch
```

等价的 npx 用法：

```bash
npx ai-devtools-cn launch
```

这个命令会列出：

- 社区发布包链接
- 当前可公开状态
- 不用 clone 的试用命令
- 反馈 issue 入口
- Good First PR Briefs 链接
- issue #51 发布后记录入口

这个命令面向准备发布项目、邀请真实试用者或邀请外部 PR 的维护者。它不会自动发布内容，也不会把维护者自己的 issue 或 PR 计入外部采用证据。

## 按任务推荐模板和案例

```bash
npm run templates:recommend -- ci
```

等价的 npx 用法：

```bash
npx ai-devtools-cn recommend ci
```

这个命令会同时搜索模板和示例，并输出：

- 推荐模板
- 推荐案例或试用包
- 查看模板的下一步命令
- 生成工作稿的下一步命令
- 生成试用包的推荐命令

适合不确定该用哪个模板时先输入任务关键词，例如 `ci`、`review`、`pytest`、`release`。

## 搜索模板

```bash
npm run templates:search -- ci
```

等价的 npx 用法：

```bash
npx ai-devtools-cn search ci
```

可以搜索 slug、标题、文件名、使用场景和输出位置。

## 诊断本地环境

如果 CLI 无法生成文件，或者你想确认当前目录是否适合试用，可以运行：

```bash
npm run templates:doctor
```

等价的 npx 用法：

```bash
npx ai-devtools-cn doctor
```

这个命令会检查：

- 当前 `ai-devtools-cn` 包版本
- Node.js 版本是否满足 `>=18`
- 当前目录是否可写
- 模板注册和模板文件是否一致
- 当前可用模板和工作包数量

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
- `contributor-onboarding.md`
- `ai-output-evaluation.md`

如果输出目录里的文件已存在，命令会拒绝覆盖。确实需要覆盖时使用：

```bash
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit --force
```

## 生成 15 分钟试用包

邀请第一批用户试用时，可以生成一个包含模板工作稿和反馈草稿的目录：

```bash
npm run templates:trial -- --template pr-review --scenario "review a documentation PR" --output work/trial
```

等价的 npx 用法：

```bash
npx ai-devtools-cn trial --template pr-review --scenario "review a documentation PR" --output work/trial
```

试用包会包含：

- `README.md`：15 分钟试用步骤和公开安全提醒
- `<template>.md`：可填写的模板工作稿
- `feedback.md`：可复制到 GitHub issue 的反馈草稿

如果不指定 `--template`，默认使用 `pr-review`。如果输出目录里的文件已存在，命令会拒绝覆盖；确实需要覆盖时使用 `--force`。

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

## 生成外部试用邀请包

如果你准备邀请真实开发者试用模板，可以生成一份可直接发送的邀请包：

```bash
npm run templates:outreach -- --template pr-review --channel x --scenario "review a documentation PR" --output work/outreach.md
```

等价的 npx 用法：

```bash
npx ai-devtools-cn outreach --template pr-review --channel x --scenario "review a documentation PR" --output work/outreach.md
```

支持的 `--channel` 包括：

- `github`
- `x`
- `v2ex`
- `wechat`
- `email`

生成的邀请包会包含：

- 面向所选渠道的试用邀请文案
- 试用前检查清单
- 推荐试用命令和反馈草稿命令
- GitHub feedback issue 入口
- 维护者记录真实反馈的字段

这个命令适合收集第一批真实用户反馈。不要把维护者自己创建的测试 issue、占位 issue 或泛泛建议包装成外部用户反馈。

## 生成一周外部试用冲刺包

如果你准备集中一周邀请真实开发者试用，可以生成一份执行包：

```bash
npm run templates:adoption -- --template pr-review --scenario "review a documentation PR" --output work/adoption-sprint
```

等价的 npx 用法：

```bash
npx ai-devtools-cn adoption --template pr-review --scenario "review a documentation PR" --output work/adoption-sprint
```

冲刺包会生成一个目录，包含：

- `README.md`：7 天试用节奏、目标和安全边界
- `outreach.md`：GitHub、X、V2EX、微信和私信渠道邀请文案
- `feedback-log.md`：外部 feedback issue、公开提及和外部 PR 记录表
- `contributor-invite.md`：邀请外部贡献者认领 good first issue 的文案

这个命令用于把“找真实用户试用”变成可执行流程。它不会自动生成真实反馈，也不能把维护者自己的 issue 或 PR 计入外部采用证据。

## 生成外部采用证据台账

当你开始发布 npm、邀请外部用户试用、收到 feedback issue 或合并外部 PR 后，可以生成一份证据台账：

```bash
npm run templates:evidence -- --output work/external-evidence.md
```

等价的 npx 用法：

```bash
npx ai-devtools-cn evidence --output work/external-evidence.md
```

证据台账会包含：

- 外部采用记录原则
- 当前指标快照填写区
- npm 发布、外部 feedback issue、反馈驱动 PR/release、外部 PR、公开提及和匿名案例记录表
- 可计入申请材料的证据类型
- 不应计入外部采用的内容
- OpenAI Codex for Open Source 申请表述草稿

这个命令不会自动抓取外部数据，也不会把维护者自己的 issue 包装成外部反馈。它的用途是帮助维护者在真实外部信号出现后，用可核验链接记录下来。维护者基于外部反馈完成的 PR/release 可以作为反馈驱动改进证据，但不能写成 external merged PR。

## 生成 OpenAI 申请包草稿

准备申请 OpenAI Codex for Open Source 前，可以生成一份本地申请包草稿：

```bash
npm run templates:application -- --output work/openai-application.md
```

等价的 npx 用法：

```bash
npx ai-devtools-cn application --output work/openai-application.md
```

申请包会包含：

- 提交前需要刷新的命令
- 表单字段草稿
- 项目资格说明的如实版本和保守版本
- API credits 使用计划
- 证据清单
- npm package 链接和 `npx ai-devtools-cn doctor` 验证提醒
- 当前必须如实承认的短板
- 推荐申请判断
- 不要提交的夸大表述

这个命令不会提交表单，也不会自动生成外部采用证据。提交前仍需要运行 `npm run metrics:snapshot`，并用 `npm run templates:evidence` 记录真实外部证据；外部反馈和外部 PR 不足时要如实说明。

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

## 检查 npm 发布准备状态

维护者准备发布 npm 包前，可以运行：

```bash
npm run templates:publish-check
```

等价的 npx 用法：

```bash
npx ai-devtools-cn publish-check
```

这个命令会检查：

- package name、version、license、repository、bugs 和 engines
- `bin.ai-devtools-cn` 是否指向 `scripts/template-cli.mjs`
- `files` 白名单是否包含 README、LICENSE、CHANGELOG、docs、examples、templates 和 CLI 入口
- 模板注册和模板文件是否一致
- 案例注册和案例文件是否一致
- 发布相关 npm scripts 是否存在

这个命令不会登录 npm，也不会发布包。真正发布前仍需要继续运行 `npm run pack:dry-run` 和 `npm publish --dry-run --access public`。

## 推荐流程

1. 运行 `npm run templates:list` 找到模板 slug。
2. 运行 `npm run templates:examples` 找到可复制案例或试用包。
3. 不确定时运行 `npm run templates:recommend -- <keyword>` 获取推荐。
4. 运行 `npm run templates:show -- <slug>` 确认是否适合当前任务。
5. 运行 `npm run templates:new -- <slug> --output work/<task>.md` 生成工作稿。
6. 补齐工作稿中的项目背景、技术栈、日志、约束条件和期望输出。
7. 把整理后的提示词复制到你的 AI 开发工具。

如果你是开源项目维护者，想先建立一整套基础流程，可以直接运行 `npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit`。

## 发布前检查

维护者发布 npm 包前应运行：

```bash
npm run test
npm run templates:validate
npm run templates:publish-check
npm run pack:dry-run
```

`npm run templates:publish-check` 只检查本地包结构；`npm run pack:dry-run` 只检查发布内容。两者都不会真正发布包。

## 注意事项

- CLI 不会调用任何 AI API。
- CLI 不会读取你的项目源码，除非你主动把内容写进工作稿。
- 不要把密钥、客户数据、账号或未公开代码提交到仓库。
- AI 输出仍需要人工 review，尤其是安全、依赖升级和生产变更。
