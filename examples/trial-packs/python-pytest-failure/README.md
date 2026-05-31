# Python pytest 失败试用包

> 模板：`ci-troubleshooting` - CI 排错模板  
> 试用场景：debug a failing Python pytest job  
> 目标用户：Python 开源维护者、测试维护者、需要排查 CI 和本地版本差异的开发者

这个示例展示第一批用户如何用 `trial` 生成的试用包排查一次 pytest 失败，并把排查过程整理成公开安全的反馈 issue。

## 文件

- [ci-troubleshooting.md](ci-troubleshooting.md)：已填入示例上下文的 pytest 排错工作稿
- [feedback.md](feedback.md)：可提交到 GitHub issue 的匿名化反馈草稿

## 如何复用

如果你已经克隆本仓库，可以在自己的项目目录运行：

```bash
npm install
npm run templates:doctor
npm run templates:trial -- --template ci-troubleshooting --scenario "debug a failing Python pytest job" --output work/trial-pytest
```

如果未来通过 npm 使用，可以运行：

```bash
npx ai-devtools-cn doctor
npx ai-devtools-cn trial --template ci-troubleshooting --scenario "debug a failing Python pytest job" --output work/trial-pytest
```

生成后：

1. 打开 `work/trial-pytest/ci-troubleshooting.md`。
2. 替换成你的 Python 版本、依赖管理方式、失败测试和公开安全日志。
3. 将工作稿复制到 AI 开发工具。
4. 先确认本地能否复现，再决定是否改测试、改实现或固定依赖版本。
5. 用 `work/trial-pytest/feedback.md` 提交匿名化使用反馈。

## 验收重点

试用者提交反馈时，重点说明：

- 模板是否能帮助你区分代码缺陷、测试假设和依赖版本差异
- 输出是否指出需要补充的环境信息
- 修复建议是否优先选择最小改动
- 是否提醒了依赖升级的回滚方式
- 是否需要更细分的 Python、Django、FastAPI 或数据工程案例

## 公开安全提醒

不要把 API key、token、客户信息、内部日志、未公开源码、生产事故敏感细节或个人隐私写入公开反馈。
