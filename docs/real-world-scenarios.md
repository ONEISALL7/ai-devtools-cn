# 真实场景模板（可直接复用）

这份文档把“项目价值”落实到可以复刻的场景。每个场景都给出：

1. 目标  
2. 输入内容清单  
3. 推荐命令  
4. AI 输出预期形态  
5. 维护者复核点  

目的是让外部用户一上手就能提交可核验的 feedback issue，避免出现“没实际场景”的问题。

## 场景 1：外部 PR Review（15 分钟）

### 场景目标 A

快速判断一个文档 / 说明类 PR 是否“可合并”。

### 场景输入 A

- PR 链接（或变更摘要）
- PR 主要文件清单
- 变更意图：本次 PR 解决的真实问题

### 推荐命令 A

```bash
npm run templates:review-pr -- --pr 245 --author external-dev --issue 169 --output work/review-pr-<pr-number>.md
```

### 复用方式 A

把这个流程发给外部 reviewer：

1. 打开 PR，复制变更范围。  
2. 用 `review-pr` 模板生成评审草稿。  
3. 在 `issue triage` 阶段同步 comment。  
4. 把“建议修复 + 风险点 + 验证项”贴到 review 结论。

### 复核清单 A

- 是否有阻塞项（安全、兼容、版本一致性）  
- 是否有误导性承诺  
- changelog 与 PR 目标是否一致  
- 是否给出最小复现步骤

## 场景 2：CI 失败排错（20 分钟）

### 场景目标 B

将日志中的失败点转成最小修复任务或说明无法复现的原因。

### 场景输入 B

- 失败日志片段（建议包含 30~80 行）  
- 失败出现的 workflow 和触发事件  
- 最近一次可正常构建 commit 的对比信息  

### 推荐命令 B

```bash
npm run templates:new -- ci-troubleshooting --output work/ci-debug-checklist.md
npm run templates:review-pr -- --pr <pr-id> --author <github-user> --issue <issue-id> --output work/ci-review-pr.md
```

### 复用方式 B

1. 把日志粘进 `ci-troubleshooting-template.md` 的输入区。  
2. 要求先给出“根因假设 + 最小修复建议”。  
3. 由 maintainer 把建议按是否影响发布路径进行标注。  
4. 把结果同步到 `issue` 的复盘结论并闭环。

### 复核清单 B

- 根因是否覆盖失败栈的第一条关键报错  
- 是否给出验证命令或回退路径  
- 是否避开了主观猜测  
- 是否有可执行的小改动建议

## 场景 3：Release note 与发布后复盘（10 分钟）

### 场景目标 C

把零散 commit 汇总成稳定、透明的发布说明，并保留可追溯证据。

### 场景输入 C

- tag / 版本号  
- 本次 merged PR 列表  
- 影响范围（文档、模板、CLI、CI）

### 推荐命令 C

```bash
npm run templates:new -- release-note --output work/release-note-draft.md
```

### 复用方式 C

1. 维护者或试用者提供 merged PR + issue 证据。  
2. 用模板生成 release note 草稿。  
3. 保留“变更摘要 + 影响面 + 回归边界 + 验证方式”四段。  
4. 与 `CHANGELOG.md` 做版本一致性核对后发布。

### 复核清单 C

- 版本号是否与 tag 一致  
- 是否遗漏关键变更  
- 是否给出验证方式  
- 是否声明了边界与已知限制

## 外部反馈最小闭环（强烈建议）

外部用户提交 issue 时，建议同时包含：

- 选择场景（对应上面的 1/2/3）  
- 本地复现步骤（或日志摘要）  
- 输出是否可直接用于 PR/issue/CI/release  
- 你愿不愿意授权匿名公开为案例（可选）

**这 3 个场景是申请材料里最容易核验真实价值的部分**：  
场景 1 证明“可帮助审查”；  
场景 2 证明“能落地排障”；  
场景 3 证明“能支撑发布治理”。
