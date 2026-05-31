# 用 release note 模板发布 v0.2.0

## 背景

这个案例基于本仓库 `v0.2.0` release 整理。该版本的主要目标不是增加更多模板数量，而是让用户更容易进入项目并复制使用模板。

相关维护记录：

- issue #23：准备 `v0.2.0` 快速上手入口
- PR #24：新增 quickstart、README 索引、changelog 和依赖锁定
- release：`v0.2.0 - Quickstart and template index`

## 维护者目标

release note 需要回答用户关心的问题：

- 这个版本解决了什么问题
- 用户升级或查看后能获得什么
- 有哪些主要入口
- 验证过什么
- 相关 issue 和 PR 在哪里

不要只把 commit 标题复制一遍。

## 可复制输入

```text
请帮我写一个 GitHub Release note。

项目背景：
这是一个中文 AI 开发者工具模板库，提供可复制的提示词模板、维护流程和案例。

版本：
v0.2.0

版本目标：
让新用户打开仓库后，能通过 README 和 quickstart 快速找到合适模板并复制使用。

已合并变更：
- 新增 docs/quickstart.md
- README 增加模板索引、示例索引和文档入口
- CHANGELOG.md 增加 0.2.0 记录
- package.json version 更新到 0.2.0
- 新增 package-lock.json
- 升级 markdownlint-cli2，npm audit 为 0 vulnerabilities

验证：
- npm run lint:md
- npm audit --strict-ssl=false
- GitHub Actions Markdown Check passed

相关链接：
- issue #23
- PR #24

输出要求：
1. Highlights
2. What changed
3. Verification
4. Related
5. 中文，简洁，面向用户
```

## 期望输出示例

```text
## Highlights

- Added a 3-minute quickstart for first-time users.
- Added README template index, example index, and documentation entry points.
- Locked markdown lint dependencies with package-lock.json.
- Upgraded markdownlint-cli2 and confirmed npm audit reports 0 vulnerabilities.

## What changed

This release improves the first-use path for developers and maintainers. Users can now open README, choose a scenario, copy the matching template, and follow docs/quickstart.md to apply it in a real issue, PR, CI, or release workflow.

## Verification

- npm run lint:md
- npm audit --strict-ssl=false
- GitHub Actions Markdown Check passed

## Related

- #23
- #24
```

## 维护者验收标准

发布前检查：

- release title 与 tag 一致
- changelog 中有同版本记录
- package version 与 tag 一致
- release note 说明用户价值，而不是只列文件名
- 验证项真实执行过

发布后检查：

- GitHub Release 页面能打开
- 最新 release 标记正确
- 对应 issue 已关闭
- 对应 PR 已合并

## 如何复用

把这个案例里的输入替换成你的项目数据即可：

- 版本号
- 版本目标
- 已合并 PR 列表
- 用户可见变化
- 验证命令
- issue 和 PR 链接

如果版本包含 breaking changes，应额外增加：

- Breaking changes
- Migration guide
- Known risks
