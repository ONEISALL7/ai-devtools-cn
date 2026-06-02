# 用户反馈到公开案例：可执行指南

目标：把反馈变成对外可复核的项目资产，不把 maintainer 自测或不当内容写成外部证据。

## 适用范围

本指南适用于以下来源：

- 外部 feedback issue
- 外部 pilot feedback issue
- 公开讨论中的有效使用场景

不适用：

- 私聊内容未授权公开
- maintainer 自测占位 issue
- 缺少上下文的泛泛夸奖

## 处理流程（3 步）

### 1）判定来源和可信度

- 是否来自 maintainer 账号（不是则通常可计入外部反馈）。
- 是否有可核验链接（issue、PR、comment、release）。
- 是否明确使用场景。

### 2）决定可转化类型

- **外部反馈 issue**：可直接计入 evidence ledger。
- **匿名案例**：来自私聊或不便公开时，先征得授权后匿名化再整理。
- **反馈驱动维护**：维护者提交的新 PR/issue/案例要注明“来自外部反馈”，但不计作 external PR。

### 3）写入复盘与公开资产

- 写入 `work/external-evidence.md`：日期、类型、链接、作者、可核验性。
- 与 PR/Issue 的关系闭环（如：来源 issue #xxx -> PR #xxx -> release）。
- 在公开模板案例中补齐输入、输出、验收标准。

## 隐私与安全边界（强制）

- 不上传 token、客户信息、公司专有代码片段。
- 发布前匿名化项目名、服务名、账号信息。
- 不公开 internal 环境 URL、私有仓库地址。

## 可复用输出样式

```text
日期：
来源：
场景：
外部/匿名：
可核验链接：
反馈结论：
是否进入案例：
后续动作：
```

## 与 OpenAI 申请口径联动

只有以下条目可写入“公开采用证据”：

- 外部反馈 issue 数量与示例链接。
- 外部 PR 提交与合并记录。
- 公开案例（去敏后）是否可复制使用。
- 真实用户场景是否用于 PR review / issue triage / CI / release。

## 快速入口

- Feedback 草稿：
  - `npm run templates:feedback`
  - `npm run templates:outreach`
- 证据账本：
  - `npm run metrics:snapshot -- --output work/metrics-YYYY-MM-DD.md`
  - `npm run templates:evidence -- --output work/external-evidence.md`
