# 用 PR Review 模板审查快速上手 PR

## 背景

这个案例基于本仓库的真实维护场景整理：PR #24 为 `v0.2.0` 增加了快速上手文档、README 模板索引、changelog 和依赖锁定文件。

它适合用来处理这类 PR：

- 文档入口改动较多
- 新增用户上手路径
- 同时修改 README、changelog、示例或版本信息
- 需要确认内容是否真的能帮助新用户使用项目

## 维护者目标

维护者不是只问“有没有错别字”，而是要判断：

- 新用户能不能从 README 找到第一步
- 表格链接是否指向真实文件
- 文档是否承诺了项目没有实现的能力
- changelog 是否和实际变更一致
- 版本号、release note 和 PR 内容是否一致

## 可复制输入

```text
请帮我 review 一个文档型 PR。

项目背景：
这是一个中文 AI 开发者工具模板库，目标是让维护者和开发者复制模板，用于 PR review、issue triage、CI 排错、发版说明和团队 AI 工具导入。

PR 目标：
准备 v0.2.0，新增快速上手入口，让陌生用户打开 README 后能马上找到模板并复制使用。

主要改动：
- 新增 docs/quickstart.md
- 更新 README.md 的模板索引、示例索引和文档入口
- 更新 CHANGELOG.md
- 更新 package.json version 到 0.2.0
- 新增 package-lock.json

请按下面维度 review：
1. 用户路径是否清楚
2. 链接和文件路径是否合理
3. changelog 是否真实对应改动
4. 是否有夸大项目能力的表述
5. 是否需要补充验证方式
6. 是否有必须阻塞合并的问题

输出格式：
- 结论：Approve / Request changes / Comment
- 必须修复
- 建议改进
- 可直接放进 PR review 的评论
```

## 期望输出示例

```text
结论：Comment

必须修复：
- 暂无阻塞项。

建议改进：
- README 的快速开始已经能指向 docs/quickstart.md，建议在示例区增加完整案例入口，帮助用户看到模板如何落到真实维护流程。
- changelog 中如果提到依赖锁定，应确保 package-lock.json 已提交。
- release note 中应避免只写“新增文档”，需要说明用户能获得什么价值。

可直接放进 PR review 的评论：
这个 PR 已经补齐 v0.2.0 的用户入口：README 能引导新用户进入快速上手，quickstart 提供了最小复制路径，changelog 与版本号保持一致。建议后续增加 2-3 个基于真实 PR/CI/release 的完整案例，让用户看到模板如何落地到维护流程。
```

## 维护者验收标准

AI 输出只能作为 review 草稿，维护者需要再检查：

- 链接是否能打开
- 文件名是否真实存在
- changelog 是否没有遗漏关键变更
- package 版本是否与 release 版本一致
- 是否把“建议改进”误写成“必须修复”

## 如何沉淀

可沉淀到这些位置：

- PR review comment
- PR 描述的验证方式
- 后续 issue，例如“补充完整案例”
- release note 的 highlights

## 不应该这样用

不要让 AI 直接决定是否合并。合并权属于维护者，AI 只能帮助发现遗漏、整理评论和检查一致性。
