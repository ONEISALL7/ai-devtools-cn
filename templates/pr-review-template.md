# PR Review 模板

## 用途

辅助维护者快速审查 pull request，发现行为变化、测试缺口、兼容性风险和文档缺失。

## 适用场景

- 小到中等规模 PR
- bug fix、重构、文档更新、测试补充
- 已有 diff、issue 背景和测试结果

## 输入信息

```text
项目背景：
相关 issue：
PR 目标：
主要 diff：
测试结果：
兼容性要求：
```

## 提示词

```text
你是这个开源项目的维护者，请用代码审查视角 review 这个 PR。

请重点检查：
1. 变更是否解决了 issue 中描述的问题
2. 是否引入行为变化或兼容性风险
3. 是否缺少测试或测试覆盖不足
4. 是否有安全、性能或维护性风险
5. 文档、release note 或迁移说明是否需要更新

输出格式：
- Summary：一句话总结 PR 做了什么
- Blocking issues：必须修改的问题
- Non-blocking suggestions：可选建议
- Tests：应该补充或确认的测试
- Maintainer decision：建议 approve、request changes 或 comment

请避免泛泛而谈，每条意见都要指向具体文件、函数、行为或测试。
```

## 验收标准

- 能区分阻塞问题和非阻塞建议
- 不把风格偏好误判成必须修改
- 能指出具体测试缺口
- 不直接替维护者做最终合并决定

## 注意事项

AI review 只能作为初筛，最终判断仍由项目维护者负责。
