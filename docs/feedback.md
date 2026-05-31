# 用户反馈

如果你使用了本项目的模板、CLI 或案例，欢迎提交反馈。反馈不需要包含私有代码，也不需要暴露公司、客户或内部项目名称。

如果你是第一批试用者，可以先按 [第一批用户试用计划](first-user-test-plan.md) 完成 15 分钟试用，再按本文格式提交反馈。第一次接触项目的外部用户也可以先看 [外部试用者快速指南](external-tester-guide.md)。

也可以用 CLI 生成一份可复制到 GitHub issue 的反馈草稿：

```bash
npm run templates:feedback -- --template pr-review --output work/feedback.md
```

## 可以反馈什么

- 你使用了哪个模板
- 用在什么场景，例如 PR review、CI 排错、release note、issue 分流
- 模板是否节省了维护时间
- 输出是否能直接放进 issue、PR 或 release
- 哪些字段不清楚
- 还缺哪些模板或案例
- CLI 是否方便使用

## 不要提交什么

请不要在公开 issue 中提交：

- API key、token、密码、cookie
- 客户名称、合同、订单、内部域名
- 未公开源码或私有日志
- 生产事故细节中无法公开的部分
- 任何个人隐私信息

如果你需要说明敏感场景，请改写成抽象描述。

## 推荐反馈格式

```text
使用的模板或功能：

使用场景：

项目类型：

是否解决问题：

节省了什么工作：

遇到的困难：

希望补充的模板或案例：

是否愿意被匿名引用为使用案例：
```

## 提交方式

优先使用 GitHub issue 模板：

- 打开 Issues
- 选择 Template usage feedback
- 按表单填写

如果你的反馈更具体，可以选择：

- Template request：请求新增或改进模板
- Case study contribution：贡献匿名化真实案例
- CLI issue：反馈 CLI bug 或功能建议

也可以直接在相关 PR、issue 或讨论中反馈。

## 维护者如何处理反馈

维护者会把反馈分成几类：

| 反馈类型 | 后续动作 |
| --- | --- |
| 模板可用 | 记录为使用案例 |
| 模板不清楚 | 修改模板说明或 quickstart |
| 缺少场景 | 创建新模板 issue |
| CLI 不方便 | 创建 CLI 改进 issue |
| 涉及安全边界 | 更新安全审查或注意事项 |

真实反馈会帮助项目判断哪些模板值得继续维护，也会帮助新用户更快找到适合自己的使用路径。
