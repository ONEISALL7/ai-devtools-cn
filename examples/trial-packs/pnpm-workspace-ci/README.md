# pnpm workspace CI 排错试用包

> 模板：`ci-troubleshooting` - CI 排错模板  
> 试用场景：debug a failing pnpm workspace CI job  
> 来源：外部反馈 [#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169)

这个示例回应外部用户提出的 monorepo / pnpm workspace 场景缺口，展示如何用 CI 排错模板分析一次 GitHub Actions 中只跑 filtered package test 时暴露的 workspace 依赖构建问题。

## 文件

- [ci-troubleshooting.md](ci-troubleshooting.md)：已填入 pnpm workspace 示例上下文的 CI 排错工作稿
- [feedback.md](feedback.md)：可提交到 GitHub issue 的匿名化反馈草稿

## 如何复用

如果你已经克隆本仓库，可以在自己的项目目录运行：

```bash
npm install
npm run templates:doctor
npm run templates:trial -- --template ci-troubleshooting --scenario "debug a failing pnpm workspace CI job" --output work/trial-pnpm
```

如果通过 npm 使用，可以运行：

```bash
npx ai-devtools-cn doctor
npx ai-devtools-cn trial --template ci-troubleshooting --scenario "debug a failing pnpm workspace CI job" --output work/trial-pnpm
```

生成后：

1. 打开 `work/trial-pnpm/ci-troubleshooting.md`。
2. 把示例 workspace、workflow、filtered command 和失败日志替换成你的真实公开日志。
3. 将工作稿复制到 AI 开发工具。
4. 先验证依赖构建顺序或 filter 范围，再提交 PR。
5. 用 `work/trial-pnpm/feedback.md` 提交匿名化使用反馈。

## 验收重点

试用者提交反馈时，重点说明：

- 模板是否能区分 package test 失败和 workspace 依赖构建失败
- 输出是否能指出 `pnpm --filter` 范围、workspace link、构建产物和 lockfile 的关系
- 修复步骤是否能同时覆盖本地和 GitHub Actions
- 是否避免了删除 workspace 依赖、关闭测试或跳过 `--frozen-lockfile`
- 是否还需要补充 turborepo、changesets 或 pnpm deploy 场景

## 公开安全提醒

不要把 API key、token、客户信息、内部日志、未公开源码、生产事故敏感细节或个人隐私写入公开反馈。
