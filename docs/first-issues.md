# 首批 Issue Backlog

公开仓库后，可以把这些条目拆成 GitHub issues。它们应该作为真实维护任务推进，不建议一次性全部完成。

## Documentation

### 1. 补充 FAQ

Labels: `documentation`, `good first issue`

内容：

```text
整理用户可能关心的问题，例如：
- 这个项目和普通提示词合集有什么区别？
- 模板是否绑定某个 AI 工具？
- 如何提交自己的模板？
- 如何判断一个模板是否适合收录？
```

### 2. 增加团队导入 AI 工具指南

Labels: `documentation`, `enhancement`

内容：

```text
写一份面向小团队的导入指南，覆盖权限、代码隐私、review 责任、试点范围和验收指标。
```

## Templates

### 3. 增加 CI 排错模板

Labels: `template`, `enhancement`

内容：

```text
用于让 AI 分析 GitHub Actions、测试失败、依赖安装失败和环境差异。
```

### 4. 增加依赖升级评估模板

Labels: `template`, `security`

内容：

```text
用于评估依赖升级风险，包括 breaking changes、安全修复、锁文件变化和回滚策略。
```

### 5. 增加 README 改进模板

Labels: `template`, `documentation`

内容：

```text
用于检查 README 是否说明项目价值、安装方式、快速开始、贡献方式和限制。
```

## Examples

### 6. 增加 CI 排错示例

Labels: `example`, `good first issue`

内容：

```text
使用一个虚构但真实结构的 CI 失败日志，演示如何定位问题、生成修复建议和补充验证步骤。
```

### 7. 增加 release note 示例

Labels: `example`, `documentation`

内容：

```text
展示如何把多个 PR 整理成面向用户的 release notes。
```

## Maintenance

### 8. 建立 v0.1.0 milestone

Labels: `maintenance`

内容：

```text
把第一批文档、模板、示例和仓库配置任务归到 v0.1.0。
```

### 9. 添加 branch protection 说明

Labels: `maintenance`, `documentation`

内容：

```text
说明 main 分支保护规则：要求 PR、要求 CI 通过、避免直接 push。
```

### 10. 建立模板质量评分表

Labels: `maintenance`, `template`

内容：

```text
给模板打分：适用场景、输入完整性、输出格式、验收标准、安全边界、可复用性。
```
