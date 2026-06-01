# 外部反馈 issue 草稿

> 来源模板：`templates/issue-triage-template.md`  
> 反馈场景：debug a failing pnpm workspace CI job  
> 提交位置：GitHub issue，建议使用 `feedback` label

## 可直接提交的反馈

```markdown
### 使用的模板或功能

CI 排错模板 / pnpm workspace CI 试用包

### 使用场景

我用这个试用包分析了一个 pnpm workspace 中 filtered package test 失败的问题。CI 只运行 `pnpm --filter @acme/api test`，但 API 包依赖 shared 包的构建产物，导致干净 GitHub Actions 环境找不到 `@acme/shared/config`。

### 是否解决问题

部分解决。模板帮我把失败定位到 workspace 依赖构建顺序，而不是误判成 pnpm install 或 lockfile 问题。

### 它帮你节省了什么工作？

它强制我同时检查 workflow、filtered command、workspace link、构建产物和本地残留 dist，减少了直接改 lockfile 或跳过测试的误判。

### 哪些地方不好用？

pnpm filter 语法和 monorepo 任务编排还可以补更多例子，例如 `--filter package...`、turborepo、changesets 和 publish 前构建。

### 你希望补充什么？

希望补一个真实 PR 案例，展示如何把 CI workflow 从只跑 package test 改成先 build 依赖包再 test。

### 提交前确认

- [x] 我确认没有提交密钥、账号、客户信息、未公开源码或隐私数据
- [x] 我的反馈可以被维护者匿名整理成项目使用案例
```
