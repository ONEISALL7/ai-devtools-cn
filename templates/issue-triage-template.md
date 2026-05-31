# Issue Triage 模板

## 用途

帮助维护者把 issue 分为 bug、feature、question、documentation、duplicate、needs-reproduction 等类别，并生成下一步处理建议。

## 输入信息

```text
issue 标题：
issue 正文：
相关日志：
项目版本：
运行环境：
已有回复：
```

## 提示词

```text
你是开源项目维护者，请对下面的 issue 做 triage。

请输出：
1. Issue 类型：bug / feature / documentation / question / duplicate / invalid / needs-reproduction
2. 优先级：P0 / P1 / P2 / P3
3. 信息是否足够：足够 / 不足
4. 建议添加的 labels
5. 维护者回复草稿
6. 下一步动作

判断标准：
- 如果缺少复现步骤，请要求提供最小复现
- 如果是使用问题，请给出文档入口或建议转 discussion
- 如果可能是 bug，请指出需要确认的版本和环境
- 如果是 feature，请要求说明真实使用场景

请保持回复礼貌、简洁、可执行。
```

## 输出示例

```text
类型：bug
优先级：P2
信息是否足够：不足
Labels：bug, needs-reproduction
回复草稿：感谢反馈。为了确认问题，请补充最小复现仓库、当前版本、运行环境和完整错误日志。
下一步：等待复现信息；如果 14 天内无回复，可以关闭为 stale。
```
