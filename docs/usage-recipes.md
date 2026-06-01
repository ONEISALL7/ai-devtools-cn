# 真实试用配方

这个文档给第一次试用 `ai-devtools-cn` 的外部用户使用。配方把模板、CLI 命令、试用步骤和可记录证据放在一起，目标是在 10-20 分钟内完成一个公开安全的小场景。

配方不是外部采用证明。只有真实用户提交的反馈 issue、公开案例、review comment 或外部 PR，才可以作为后续证据。

## 查看配方

```bash
npx ai-devtools-cn recipes
```

如果 npm 版本还没有同步最新命令，先 clone 仓库后运行：

```bash
npm install
npm run templates:recipes
```

展开某个配方：

```bash
npx ai-devtools-cn recipes ci-failure
```

仓库内等价命令：

```bash
npm run templates:recipes -- ci-failure
```

如果你是维护者，想邀请一个外部用户按同一配方试用，可以生成 30 分钟任务包：

```bash
npx ai-devtools-cn pilot ci-failure --output work/pilot-ci
```

这个任务包会生成可直接转发给外部用户的 `tester-task.md`，以及维护者记录公开反馈链接的 `maintainer-evidence.md`。只有真实外部用户提交的反馈 issue 或 PR 才能计入外部采用证据。

通过 `pilot` 任务包完成试用后，优先使用结构化反馈表单：

```text
https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=external_pilot_feedback.yml
```

## 推荐从这四个场景开始

| 配方 | 适合场景 | 输出证据 |
| --- | --- | --- |
| `pr-review-docs` | review 一个 README 或文档 PR | PR comment 或 feedback issue |
| `ci-failure` | 排查一次 CI 失败 | 修复计划、PR 描述或 feedback issue |
| `issue-triage` | 分流一个 bug、feature 或 question issue | issue 回复或 label 建议 |
| `release-note` | 整理一个小版本 release note | GitHub release 或 CHANGELOG PR |

## 试用后怎么反馈

优先提交 GitHub feedback issue：

```text
https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml
```

反馈里写清楚：

- 使用了哪个配方和模板
- 场景是否是真实维护任务
- 输出能否直接用于 PR、issue、CI、release 或文档
- 哪个步骤最有用
- 哪个步骤不清楚
- 是否允许维护者匿名整理成案例

## 公开安全边界

不要提交这些内容：

- API key、token、cookie、密码
- 客户信息、订单、合同、内部域名
- 未公开源码、私有仓库链接、内部日志
- 生产事故敏感细节
- 个人隐私或未授权截图

如果真实场景敏感，请改写成公开安全的抽象描述。
