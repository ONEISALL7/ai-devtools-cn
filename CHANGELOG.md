# Changelog

本项目遵循语义化版本思路记录主要变化。

## Unreleased

- 更新 README 和 npm 发布清单，记录 `ai-devtools-cn@0.16.1` 已发布并通过 `npx` 验证
- 刷新 OpenAI Codex for Open Source 申请材料和 CLI 申请包，纳入 npm 发布、`npx` 验证和外部反馈 #169 证据
- 基于外部反馈 #169 新增 pnpm workspace CI 排错试用包，覆盖 monorepo filtered test 和 workspace 依赖构建场景

## 0.16.1 - 2026-06-01

- 新增外部试用者快速指南，帮助第一次接触项目的用户完成公开安全的 10-15 分钟试用并提交反馈
- 补充 npm 首次发布交接清单，记录 v0.16.0 publish dry-run 结果和账号所有者发布步骤

## 0.16.0 - 2026-06-01

- 新增 CLI `adoption` 命令，生成一周外部试用冲刺包，帮助维护者邀请真实用户并记录反馈证据

## 0.15.0 - 2026-06-01

- 新增 CLI `application` 命令，生成 OpenAI Codex for Open Source 申请包草稿

## 0.14.0 - 2026-06-01

- 新增 CLI `evidence` 命令，生成外部采用证据台账，帮助区分维护者活动和真实外部采用信号

## 0.13.0 - 2026-06-01

- 新增外部贡献者引导模板，帮助维护者把 good first issue 整理成新贡献者可执行的 PR 引导

## 0.12.0 - 2026-06-01

- 新增 CLI `outreach` 命令，可生成面向 GitHub、X、V2EX、微信和私信渠道的外部试用邀请包

## 0.11.0 - 2026-06-01

- 修正 `metrics:snapshot` 快照日期，使用本地日期而不是 UTC 日期
- 新增 CLI `publish-check` 命令，聚合检查 npm 发布前的包元数据、bin 入口、files 白名单和模板/案例注册

## 0.10.0 - 2026-05-31

- 新增 CLI `examples` 命令，展示基础示例、真实维护案例和第一批用户试用包
- 新增 CLI `recommend` 命令，按关键词联合推荐模板、案例和试用包

## 0.9.0 - 2026-05-31

- 新增第一批用户试用包示例，展示 PR review 工作稿和 feedback 草稿
- 新增 Node.js CI 排错试用包示例，展示失败日志分析和最小修复验证流程
- 新增 Python pytest 失败试用包示例，展示测试失败和依赖版本差异排查流程

## 0.8.0 - 2026-05-31

- 新增 CLI `doctor` 命令，诊断 Node 版本、当前目录写入能力和模板注册状态

## 0.7.0 - 2026-05-31

- 新增 CLI `trial` 命令，一次生成第一批用户试用包和反馈草稿

## 0.6.1 - 2026-05-31

- 规范 npm `bin` 路径并补充 npm 发布 dry-run 与 cache 排错说明

## 0.6.0 - 2026-05-31

- 增强指标快照，区分外部 feedback issue 和维护者自建反馈任务
- 新增第一批用户试用计划，帮助收集真实外部反馈
- 新增 CLI `feedback` 命令，生成公开安全的反馈 issue 草稿
- 修正 CLI 相对输出路径，使 `npx` 场景默认写入调用者当前目录

## 0.5.0 - 2026-05-31

- 更新社区推广文案和发布前检查清单
- 在 README 增加 CI、release 和 license 状态徽章
- 新增 CLI `kit` 命令，可生成开源维护者工作包
- 更新 npm 发布清单到 `v0.5.0` 和 `kit` 命令

## 0.4.0 - 2026-05-31

- 新增用户反馈文档和模板使用反馈 issue 表单
- 新增 OpenAI Codex for Open Source 申请证据和表单草稿文档
- 新增 npm 发布清单和社区推广反馈收集 playbook
- 同步 GitHub label 规范文档
- 新增项目指标快照脚本和指标追踪文档
- 更新 Good First Issues 文档，增加外部贡献入口
- 新增模板请求、案例贡献和 CLI 问题 issue 表单
- 新增模板注册表校验命令，帮助贡献者检查模板文件和 CLI 索引一致性
- 新增模板注册校验 CLI 维护案例
- 新增 `SUPPORT.md`，整理模板、案例、CLI 和安全问题的支持入口

## 0.3.0 - 2026-05-31

- 新增真实维护案例目录 `examples/case-studies/`
- 新增 PR review、CI 排错和 v0.2.0 发版说明案例
- 新增模板选择指南 `docs/choose-template.md`
- 新增 `templates/README.md` 和 `examples/README.md`，优化新用户目录导航
- 新增无依赖模板 CLI，支持列出、搜索、查看模板并生成本地工作稿
- 增加 npm CLI 发布结构、`bin` 入口和 CLI 自动测试

## 0.2.0 - 2026-05-31

- 新增 3 分钟快速上手文档
- 在 README 增加模板索引、示例索引和文档入口
- 新增 CI 排错、依赖升级、安全审查、README 改进等模板
- 新增 CI 排错和 release note 示例
- 新增 AI 工具导入检查清单和 AI 输出质量评估模板
- 提交 `package-lock.json`，锁定本地 Markdown 检查依赖
- 升级 `markdownlint-cli2`，消除 dev 依赖 audit 漏洞

## 0.1.0

- 初始化项目结构
- 添加基础文档和模板
- 添加 GitHub issue/PR 模板
- 添加 Markdown lint 工作流
