# Label 规范

统一 label 可以让 issue triage 和 PR review 更清晰。

## 类型

```text
bug
documentation
enhancement
question
template
example
maintenance
security
```

## 状态

```text
needs-triage
needs-reproduction
needs-review
blocked
stale
accepted
```

## 优先级

```text
priority/P0
priority/P1
priority/P2
priority/P3
```

## 难度

```text
good first issue
help wanted
advanced
```

## 维护建议

- 新 issue 默认加 `needs-triage`
- 缺少复现信息加 `needs-reproduction`
- 文档和模板改进尽量加具体类型
- 安全相关问题不要要求用户公开敏感细节
- 每周清理一次 `needs-triage`
