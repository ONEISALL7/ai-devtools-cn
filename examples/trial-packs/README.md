# 试用包示例

这里展示 `ai-devtools-cn trial` 生成的试用包应该如何使用。试用包适合发给第一批外部用户，让他们用 15 分钟完成一次可反馈的真实试用。

## 示例列表

| 示例 | 适合场景 | 包含内容 |
| --- | --- | --- |
| [PR Review 文档改动试用包](pr-review-docs/README.md) | 审查 README 或 docs 改动 | 试用说明、PR review 工作稿、feedback 草稿 |
| [Node.js CI 排错试用包](node-ci-failure/README.md) | 排查 GitHub Actions 失败日志 | 试用说明、CI 排错工作稿、feedback 草稿 |
| [Python pytest 失败试用包](python-pytest-failure/README.md) | 排查 pytest 失败和版本差异 | 试用说明、CI 排错工作稿、feedback 草稿 |

## 推荐使用方式

1. 先浏览一个试用包示例，确认输出结构。
2. 在自己的项目目录运行 `npm run templates:doctor` 或 `npx ai-devtools-cn doctor`。
3. 运行 `trial` 命令生成自己的本地试用包。
4. 填写工作稿并提交匿名化 feedback issue。

不要在公开 issue 中提交 token、客户信息、内部日志、未公开源码或个人隐私。
