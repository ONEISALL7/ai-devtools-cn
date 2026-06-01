# 模板目录

这里收集可以直接复制到 AI 开发工具中的维护模板。建议先看 [如何选择模板](../docs/choose-template.md)，再复制具体模板。

## 使用步骤

1. 选择和当前任务最接近的模板。
2. 复制模板正文。
3. 补齐项目背景、相关文件、日志、约束条件和期望输出。
4. 把 AI 输出整理到 issue、PR、文档或 release note。
5. 人工检查关键结论后再执行。

也可以使用 CLI 生成本地工作稿：

```bash
npm run templates:list
npm run templates:new -- pr-review --output work/pr-review.md
```

如果你想一次生成一组开源维护者工作稿：

```bash
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
```

新增或调整模板后，可以运行：

```bash
npm run templates:validate
```

更多命令见 [模板 CLI](../docs/template-cli.md)。

## 模板总览

| 模板 | 什么时候用 | 准备材料 | 输出沉淀位置 |
| --- | --- | --- | --- |
| [PR Review 模板](pr-review-template.md) | 检查代码或文档 PR | PR diff、目标、风险点 | PR review comment |
| [Issue Triage 模板](issue-triage-template.md) | 分流用户反馈 | issue 描述、复现信息 | issue 评论、label |
| [CI 排错模板](ci-troubleshooting-template.md) | 分析失败日志 | CI 日志、失败命令、相关文件 | PR 描述、修复 commit |
| [测试生成模板](test-generation-template.md) | 补充测试场景 | 代码路径、边界条件、现有测试 | 测试文件、TODO issue |
| [文档更新模板](documentation-update-template.md) | 改文档或说明 | 目标读者、旧文档、变更点 | docs、README |
| [README 改进模板](readme-improvement-template.md) | 优化项目首页 | 项目定位、用户路径、现有 README | README |
| [发布说明模板](release-note-template.md) | 发布新版本 | PR 列表、changelog、验证结果 | GitHub Release |
| [Release Checklist](release-checklist.md) | 发版前检查 | 版本号、tag、CI 状态 | release issue |
| [依赖升级风险模板](dependency-upgrade-risk-template.md) | 升级依赖前评估 | 依赖名、版本差异、测试范围 | PR 描述 |
| [安全审查模板](security-review-template.md) | 检查安全风险 | diff、权限变化、敏感数据路径 | PR review |
| [公开安全脱敏模板](public-safety-redaction-template.md) | 公开日志、反馈或案例前脱敏 | 准备公开的文本、发布位置、敏感边界 | 脱敏后的公开文本、安全检查清单 |
| [工具评估清单](tool-evaluation-template.md) | 选择 AI 工具 | 使用场景、成本、风险 | 团队文档 |
| [AI 工具导入检查清单](ai-tool-onboarding-checklist.md) | 团队引入 AI 工具 | 团队规则、试点范围 | onboarding 文档 |
| [AI 输出质量评估模板](ai-output-evaluation-template.md) | 判断 AI 输出能否采用 | AI 输出、事实来源、验收标准 | review 记录 |
| [维护者周检查清单](maintainer-weekly-checklist.md) | 周期性维护项目 | issue、PR、CI、release 状态 | maintainer log |
| [外部贡献者引导模板](contributor-onboarding-template.md) | 邀请新贡献者提交第一个 PR | good first issue、验证命令、验收标准 | contributor guide、issue comment |

## 推荐起步组合

### 个人开发者

1. [PR Review 模板](pr-review-template.md)
2. [测试生成模板](test-generation-template.md)
3. [AI 输出质量评估模板](ai-output-evaluation-template.md)

### 开源维护者

1. [Issue Triage 模板](issue-triage-template.md)
2. [CI 排错模板](ci-troubleshooting-template.md)
3. [发布说明模板](release-note-template.md)
4. [维护者周检查清单](maintainer-weekly-checklist.md)
5. [外部贡献者引导模板](contributor-onboarding-template.md)
6. [公开安全脱敏模板](public-safety-redaction-template.md)

### 团队负责人

1. [工具评估清单](tool-evaluation-template.md)
2. [AI 工具导入检查清单](ai-tool-onboarding-checklist.md)
3. [安全审查模板](security-review-template.md)
4. [公开安全脱敏模板](public-safety-redaction-template.md)

## 贡献新模板

新增模板请尽量包含：

```text
用途：
适用场景：
输入信息：
提示词正文：
输出格式：
验收标准：
注意事项：
```

更多要求见 [CONTRIBUTING.md](../CONTRIBUTING.md)。

如果你已经在真实项目中使用过某个模板，请通过 [用户反馈](../docs/feedback.md) 告诉维护者它是否有用、哪里不好用、还缺什么场景。
