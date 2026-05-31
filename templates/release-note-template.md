# Release Note 模板

## 用途

帮助维护者把 commit、PR 和 issue 整理成清晰的发布说明。

## 输入信息

```text
版本号：
发布日期：
合并的 PR：
修复的 issue：
breaking changes：
迁移说明：
贡献者：
```

## 提示词

```text
请把以下 PR、issue 和 commit 整理成 release notes。

要求：
1. 面向用户说明变化，不要只复述 commit message
2. 区分 Added、Changed、Fixed、Deprecated、Removed、Security
3. 如果有 breaking changes，必须放在开头
4. 如果需要迁移步骤，请给出简短 checklist
5. 保留 PR 或 issue 编号

输出格式：
# vX.Y.Z

## Breaking Changes
## Added
## Changed
## Fixed
## Security
## Migration Notes
## Contributors
```

## 注意事项

不要把内部重构写成用户可见功能，除非它改变了性能、稳定性或公开行为。
