# Changelog

本项目遵循语义化版本思路记录主要变化。

## Unreleased

- 暂无

## 0.18.0 - 2026-06-01

- 新增 `pilot` 命令，生成 30 分钟外部试用任务包，帮助维护者邀请真实外部用户并记录可核验证据
- 更新 README、CLI 文档和试用配方文档，补充 `pilot` 外部试用入口

## 0.17.7 - 2026-06-01

- 同步 npm 发布状态，记录 `ai-devtools-cn@0.17.6` 已完成发布和 `0.17.7` 文档同步发布边界
- 更新申请准备、社区发布包和 npm 发布清单，移除 `0.17.6` 待 2FA 发布提示
- 刷新 OpenAI 申请材料中的 npm、release 和 CLI 状态，避免对外材料继续引用旧发布状态

## 0.17.6 - 2026-06-01

- 新增 GitHub Actions Node/CLI CI，在 Node.js 20 和 22 上运行测试、发布准备检查和打包预检
- 在 README 和申请准备材料中补充 CI badge 与 CLI 自动化验证证据

## 0.17.5 - 2026-06-01

- 同步 npm 已发布状态，更新 README、社区发布包和申请材料中的 `npx` 使用边界
- 记录 `ai-devtools-cn@0.17.4` 已完成 npm 发布和 smoke check，避免公开材料继续引用旧版 npm 状态
- 刷新申请准备文档中的 issue、PR、release 和 npm package 快照

## 0.17.4 - 2026-06-01

- 调整贡献指南的第一个外部 PR 快速路径，npm 未同步时优先推荐 clone + `npm run templates:*`
- 扩展 feedback issue 表单，收集反馈者关系、试用途径和可公开核验上下文链接
- 更新外部试用者指南和反馈文档，让真实外部反馈更容易被安全记录和人工核验

## 0.17.3 - 2026-06-01

- 调整外部贡献者 CLI 输出和文档，npm 未同步时默认推荐 clone + `npm run templates:*` 路径
- 修正 Good First PR、handoff 和 README 中的外部 PR 起步命令，避免外部贡献者因 npm 公开包落后而试用失败

## 0.17.2 - 2026-06-01

- 修复 `metrics:snapshot` release 统计只读取 20 条的问题，避免 release 数超过 20 后申请指标被低估
- 增加 release 计数回归测试，确保 GitHub release 列表按更高上限读取

## 0.17.1 - 2026-06-01

- 更新 README、社区发布包和 OpenAI 申请准备文档，明确 npm 公开包仍落后时应优先使用 clone + `npm run templates:*` 路径
- 将当前 source/release 边界整理为 `v0.17.1` patch release，避免把领先 release tag 的 `main` 当作旧版本直接发布到 npm
- 刷新申请材料中的 PR、release 和 npm 同步目标，继续诚实区分维护者活动、外部反馈和外部 PR

## 0.17.0 - 2026-06-01

- 更新 `evidence` 台账输出，预填 #169 外部反馈到 #173/v0.16.2 反馈驱动改进的可核验链路
- 优化 PR 模板和 issue 新建页入口，帮助第一次外部贡献者找到试用指南、Good First Issues 和支持入口
- 新增 Good First PR Briefs，把 #45-#49 拆成外部贡献者可直接认领的小型 PR brief
- 新增社区发布包，提供 X/V2EX/私信/外部 PR 邀请文案和 #51 发布后记录格式
- 新增 CLI `contribute` 命令，帮助外部贡献者通过 `npx` 找到 Good First PR Briefs 和可认领任务
- 新增 CLI `launch` 命令，帮助维护者通过 `npx` 找到社区发布包、反馈入口和外部 PR 邀请入口
- 新增 CLI `claim` 命令，为 #45-#49 good first issue 生成外部贡献者认领和 PR 描述草稿
- 新增 CLI `starter` 命令，为 #45-#49 good first issue 生成可填写的案例或文档起稿
- 新增 CLI `handoff`、`pr-pack` 和 `review-pr` 命令，帮助维护者邀请真实外部贡献者并审查外部 PR 证据边界
- 新增 CLI `publish-status` 命令，检查 npm 公开版本、GitHub release、`package.json` 和 source/release 边界
- 新增 CLI `recipes` 命令和真实试用配方文档，帮助外部用户用 10-20 分钟完成 PR review、CI 排错、issue triage 或 release note 试用
- 刷新 OpenAI 申请包、证据台账和社区发布包，纳入 `claim`/`starter` 外部贡献转化管线
- 刷新 OpenAI 申请准备静态指标，更新 PR、issue、release、tracked files 和 CLI 能力概览
- 刷新 Codex for Open Source 准备文档，移除旧 PR/issue/release 快照并补充外部贡献转化入口
- 更新 npm 发布清单，明确当前 source 领先最新 release tag 时需要先创建新 release 或切回已验证 tag

## 0.16.2 - 2026-06-01

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
