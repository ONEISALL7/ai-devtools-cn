# Issue Triage 示例

## 原始 issue

```text
Title: 安装后运行报错

我按照 README 安装后运行命令失败，提示 module not found。
```

## 维护者 triage

```text
类型：bug / needs-reproduction
优先级：P2
信息是否足够：不足
Labels：bug, needs-reproduction
```

## 回复草稿

```text
感谢反馈。为了确认问题，请补充以下信息：

1. 使用的项目版本
2. Node.js 或 Python 版本
3. 操作系统
4. 完整安装命令
5. 完整错误日志

如果方便，请提供一个最小复现仓库或终端输出截图。拿到这些信息后我们会继续定位。
```

## 后续维护动作

- 如果确认是 README 缺少安装前置条件，提交文档修复。
- 如果确认是包发布缺文件，发布 patch 版本。
- 如果 14 天没有回复，标记 stale 后关闭。
