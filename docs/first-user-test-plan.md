# 第一批用户试用计划

这份计划用于邀请 5-10 位真实开发者试用 `ai-devtools-cn`，并把反馈沉淀成 GitHub issue。

目标不是刷 star 或制造活跃度，而是确认模板、CLI 和案例是否能帮助真实维护工作。

如果对方第一次接触项目，可以先把 [外部试用者快速指南](external-tester-guide.md) 发给对方。那份指南是试用者视角，包含不安装依赖的试用方式、CLI 试用方式和公开安全边界。

## 适合邀请谁

优先邀请这些用户：

- 正在维护开源仓库的人
- 经常 review PR、处理 issue 或修 CI 的开发者
- 想把 AI 工具接入团队研发流程的人
- 愿意给出具体反馈的中文开发者

暂时不适合邀请：

- 只想收藏提示词、不打算试用的人
- 不能公开描述使用场景的人
- 需要把私有代码、客户日志或敏感信息发到公开 issue 的场景

## 15 分钟试用路径

把下面这段发给试用者即可。

```text
我在维护一个中文 AI 工程维护模板库，想请你用 15 分钟试一下。

仓库：
https://github.com/ONEISALL7/ai-devtools-cn

请完成这 4 步：

1. 打开 README，判断你能不能在 1 分钟内理解项目是做什么的。
2. 先看示例和试用包，再用任务关键词推荐模板：

   npm install
   npm run templates:doctor
   npm run templates:examples
   npm run templates:recommend -- ci

3. 如果你愿意跑 CLI，可以优先执行一条试用包命令：

   npm run templates:trial -- --template pr-review --scenario "review a documentation PR" --output work/trial

   如果你在排查 CI，可以改成：

   npm run templates:trial -- --template ci-troubleshooting --scenario "debug a failing CI job" --output work/trial-ci

   如果你想分别体验命令，也可以执行：

   npm run templates:list
   npm run templates:new -- pr-review --output work/pr-review.md
   npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
   npm run templates:feedback -- --template pr-review --output work/feedback.md

4. 提交一个 GitHub issue 反馈：
   - 你试了哪个模板或命令
   - 用在什么场景
   - 哪里有用
   - 哪里不清楚
   - 还缺什么模板或案例

请不要提交 token、客户信息、内部日志、未公开源码或个人隐私。

如果你第一次看到这个项目，可以先看：
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/external-tester-guide.md
```

## 试用任务选项

维护者可以按用户类型分配任务：

| 用户类型 | 试用任务 | 反馈重点 |
| --- | --- | --- |
| 开源维护者 | 生成 `oss-maintainer` 工作包 | 工作包是否覆盖日常维护流程 |
| PR reviewer | 使用 PR Review 模板 | 输出是否能变成 review comment |
| 修 CI 的开发者 | 使用 CI 排错模板 | 是否能定位根因和最小修复 |
| 发版负责人 | 使用 release note 模板 | 输出是否能放进 GitHub Release |
| 团队负责人 | 使用 AI 工具导入清单 | 是否能形成团队规则 |

如果用户不知道该选哪一类，先让对方运行：

```bash
npm run templates:recommend -- <任务关键词>
```

例如 `ci`、`review`、`pytest`、`release`。

如果维护者想集中一周推进外部反馈，可以生成冲刺包：

```bash
npm run templates:adoption -- --template pr-review --scenario "review a documentation PR" --output work/adoption-sprint
```

这个目录会包含多渠道邀请文案、反馈记录表和外部贡献者邀请文案，方便把每一次真实反馈记录到 issue #51 和外部采用证据台账。

## 反馈 issue 建议格式

```text
使用的模板或命令：

试用场景：

项目类型：

是否能直接用于真实工作：

最有用的部分：

最不清楚的部分：

还缺什么模板、示例或 CLI 能力：

是否愿意被匿名整理为案例：
```

## 维护者处理流程

收到反馈后：

1. 判断反馈是否来自真实试用，而不是泛泛建议。
2. 确认 issue 中没有敏感信息。
3. 给 issue 加上 `feedback`、`template`、`cli` 或 `case-study` 标签。
4. 如果能立即修正文档或模板，开小 PR。
5. 如果反馈能沉淀成案例，询问是否允许匿名整理。
6. 每周运行 `npm run metrics:snapshot` 记录反馈数量和外部采用信号。

## 记录方式

在 issue #51 下记录每次推广：

```text
日期：
渠道：
链接：
邀请人数：
实际反馈 issue：
外部 PR：
下一步改动：
```

## 判断是否达到下一阶段

满足以下任意两项，就可以准备一个反馈驱动版本：

- 至少 5 条外部 feedback issue
- 至少 1 个外部 PR
- 至少 1 个匿名案例来自外部用户
- npm 包已发布并有下载量
- 有用户明确表示模板进入了真实 PR、issue、CI 或 release 流程
