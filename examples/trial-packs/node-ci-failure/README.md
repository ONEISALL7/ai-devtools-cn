# Node.js CI 排错试用包

> 模板：`ci-troubleshooting` - CI 排错模板  
> 试用场景：debug a failing Node.js CI job  
> 目标用户：开源维护者、CI 维护者、第一次接触本项目的 Node.js 开发者

这个示例展示第一批用户如何用 `trial` 生成的试用包排查一次 GitHub Actions 失败，并把试用结果整理成公开安全的反馈 issue。

## 文件

- [ci-troubleshooting.md](ci-troubleshooting.md)：已填入示例上下文的 CI 排错工作稿
- [feedback.md](feedback.md)：可提交到 GitHub issue 的匿名化反馈草稿

## 如何复用

如果你已经克隆本仓库，可以在自己的项目目录运行：

```bash
npm install
npm run templates:doctor
npm run templates:trial -- --template ci-troubleshooting --scenario "debug a failing Node.js CI job" --output work/trial-ci
```

如果未来通过 npm 使用，可以运行：

```bash
npx ai-devtools-cn doctor
npx ai-devtools-cn trial --template ci-troubleshooting --scenario "debug a failing Node.js CI job" --output work/trial-ci
```

生成后：

1. 打开 `work/trial-ci/ci-troubleshooting.md`。
2. 把示例 workflow、job、step 和日志替换成你的真实公开日志。
3. 将工作稿复制到 AI 开发工具。
4. 先验证最小修复，再提交 PR。
5. 用 `work/trial-ci/feedback.md` 提交匿名化使用反馈。

## 验收重点

试用者提交反馈时，重点说明：

- 模板是否能帮助你定位失败 step
- 输出是否能区分直接原因和根因
- 修复步骤是否能本地验证
- 是否避免了跳过测试、关闭 CI 或删除有效检查
- 是否需要增加你所在语言或框架的专门示例

## 公开安全提醒

不要把 API key、token、客户信息、内部日志、未公开源码、生产事故敏感细节或个人隐私写入公开反馈。
