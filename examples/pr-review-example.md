# PR Review 示例

## PR 背景

贡献者提交了一个文档更新 PR，新增 AI 工具评估清单，但没有说明适用场景，也没有安全维度。

## Review 输出

```text
Summary:
这个 PR 增加了工具评估清单，对项目方向是有价值的。

Blocking issues:
- 当前清单缺少安全和隐私维度。AI 工具评估必须覆盖敏感代码、账号权限和数据上传风险，否则容易误导团队直接采用。
- 模板缺少“适用场景”和“不适合场景”，用户无法判断是否该使用这个模板。

Non-blocking suggestions:
- 可以增加一个结论区：采用 / 试点 / 暂不采用。
- 建议补充评估日期，因为工具能力变化很快。

Tests:
- 文档 PR 不需要自动化测试，但需要 Markdown lint 通过。

Maintainer decision:
Request changes.
```

## 可复用经验

- 文档 PR 也需要质量门槛。
- AI 工具相关内容必须明确安全边界。
- 模板类贡献应包含输入、输出和验收标准。
