# Template usage feedback issue draft

> 提交入口：<https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml>  
> 这是匿名化示例。提交真实反馈前，请删除不适用内容。

## Safety check

- [x] 没有包含 API key、token、密码、cookie
- [x] 没有包含客户名称、内部域名、合同、订单或个人隐私
- [x] 没有包含未公开源码、私有日志或生产事故敏感细节
- [x] 如涉及敏感项目，已经改写成可公开的抽象描述

## Feedback

使用的模板或功能：
`ci-troubleshooting` - CI 排错模板，配合 `doctor` 和 `trial` 命令。

使用场景：
排查一次 Python 项目的 pytest 失败，重点看依赖升级后测试假设是否仍然成立。

项目类型：
公开开源 Python 数据处理工具。

是否解决问题：
基本解决。模板能迫使我先说明 Python 版本、依赖版本、失败测试和最近改动，减少了无根据猜测。

节省了什么工作：
少写了一次排错提纲，也更容易把 AI 输出转成 issue comment 或 PR description。

遇到的困难：
希望模板进一步提醒用户提供 lock file、matrix 版本和本地复现命令。

希望补充的模板或案例：
希望补充 Django migration、FastAPI test client、ruff/mypy 和 Python packaging 发布失败案例。

是否愿意被匿名引用为使用案例：
是。
