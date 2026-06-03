# 用 Issue Triage 引导真实维护闭环（含 PR + Release 追踪）

## 场景背景

仓库维护者每天都会收到：  

1. 提问类 issue，  
2. CI 失败提示，  
3. 提交文档修正的 PR。  

本案例演示如何用 `issue-triage-template.md` 让每条反馈都变成可追踪任务，并最终形成 release 口径。

## 输入示例

```text
Issue 标题：docs: README 没有说明新手命令顺序
Issue 内容：
- 新用户说 clone 后只看到模板列表，不知道从哪个命令开始
- PR 目前只有仓库内文档修改，尚未更新 examples
- CI 在 markdownlint 阶段偶发失败

维护目标：
把该 issue 拆成可执行任务，并给出公开可交付的 release note 要点。
```

## 你可以这样执行

1. 用 `templates:feedback` 生成外部反馈记录，确认场景是否真实。  
2. 用 `templates:adoption` 输出跟进步骤，把同类反馈拆解为可复用任务。  
3. 在 issue 中补充如下分流：

```text
- 分类：Documentation / CI
- 优先级：medium
- 响应时限：24h 内给出处理路径
- 下一步：
  - PR#A：补充 quickstart 与模板顺序
  - PR#B：补齐 examples 目录
  - PR#C：补充 CI 日志最小化输出说明
```

1. 把 PR 草稿分别发给不同维护动作（可并行）。  
2. PR 合并后更新 release note 草稿（新增/修订说明清单）。

## 预期产物

- issue 评论（triage 结论 + 分流计划）  
- 2~3 条 PR（可按优先级排序）  
- release note 草稿中的“本周修复要点”  
- 指向公开证据的链接（issue/PR/release）

## 维护者复核点

- triage 决策是否和真实影响一致  
- issue 是否在 24h 内收到公开反馈  
- PR 是否围绕同一个反馈闭环  
- Release note 是否反映了 triage 后的实际变更  

## 为什么这个案例对外部有价值

该案例证明工具不是“写模板”而是“连接反馈、任务、发布”的工作流资产。  
对于 OpenAI 的维护者支持申请，最关键的是展示：  

- 我们如何处理外部反馈  
- 我们如何把反馈变成可交付变更  
- 我们如何保留可核验链路（issue -> PR -> release）
