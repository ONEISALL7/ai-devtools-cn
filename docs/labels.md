# Label 规范

统一 label 可以让 issue triage 和 PR review 更清晰。

## 默认标签

| Label | 用途 |
| --- | --- |
| `bug` | 功能、文档或模板中有错误 |
| `documentation` | 文档补充或修复 |
| `enhancement` | 新功能、新模板或现有能力增强 |
| `question` | 需要进一步确认的问题 |
| `good first issue` | 适合新贡献者 |
| `help wanted` | 希望社区协助 |
| `duplicate` | 重复 issue 或 PR |
| `invalid` | 不符合项目范围或信息无效 |
| `wontfix` | 不计划处理 |

## 维护标签

| Label | 用途 |
| --- | --- |
| `needs-triage` | 新 issue 需要维护者分流 |
| `feedback` | 用户对模板、CLI 或案例的使用反馈 |
| `template` | 模板新增或改进 |
| `case-study` | 真实维护案例或示例 |
| `cli` | 模板 CLI 功能或问题 |
| `release` | 发版计划、release note 或版本准备 |
| `npm` | npm 包、发布和下载量相关工作 |
| `community` | 社区推广、外部反馈和采用情况 |
| `security-review` | 安全审查模板或流程 |
| `external-pilot` | 通过 30 分钟外部试用任务包提交的结构化反馈 |

## 建议分流规则

- 新 issue 默认加 `needs-triage`。
- 模板问题加 `template`。
- CLI 问题加 `cli`。
- 用户使用反馈加 `feedback`。
- 真实工作流案例加 `case-study`。
- npm 发布、下载量和包结构加 `npm`。
- 社区推广和外部采用加 `community`。
- 通过 `pilot` 任务包提交的反馈加 `external-pilot`。
- 安全边界相关内容加 `security-review`，不要要求用户公开敏感信息。

## 推荐组合

| 场景 | 推荐 labels |
| --- | --- |
| 新模板建议 | `enhancement`, `template`, `needs-triage` |
| 模板使用反馈 | `feedback`, `needs-triage` |
| CLI bug | `bug`, `cli`, `needs-triage` |
| CLI 新功能 | `enhancement`, `cli`, `needs-triage` |
| 发版准备 | `release`, `needs-triage` |
| npm 发布 | `npm`, `release`, `needs-triage` |
| 真实案例 | `case-study`, `documentation` |
| 外部 pilot 反馈 | `feedback`, `external-pilot`, `needs-triage` |

## 维护建议

- 新 issue 默认加 `needs-triage`
- 文档和模板改进尽量加具体类型标签
- 安全相关问题不要要求用户公开敏感细节
- 每周清理一次 `needs-triage`
- 合并 PR 后确认相关 issue 是否关闭
