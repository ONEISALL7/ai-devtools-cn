# OpenAI Codex for Open Source 申请准备

这个文档用于整理 `ai-devtools-cn` 申请 OpenAI Codex for Open Source 时可引用的项目证据、表单草稿和后续补强事项。

官方申请入口：[Codex for Open Source](https://openai.com/form/codex-for-oss/)

## 当前项目状态

截至 2026-06-01，基于 `v0.16.2` GitHub release、`ai-devtools-cn@0.16.1` npm 发布验证和 `npm run metrics:snapshot` 的一次快照：

| 项目 | 当前状态 |
| --- | --- |
| GitHub 仓库 | <https://github.com/ONEISALL7/ai-devtools-cn> |
| 可见性 | Public |
| GitHub stars | 3 |
| Forks | 1 |
| Releases | 19 个：`v0.1.0` 到 `v0.16.2` |
| Merged PRs | 106 个，最近一次完整快照统计到 PR #218 |
| Closed issues | 106 个，最近一次完整快照统计到 issue #217 |
| External merged PRs | 0 |
| External feedback issues | 1 个：[#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169) |
| npm package | [`ai-devtools-cn@0.16.1`](https://www.npmjs.com/package/ai-devtools-cn) |
| npm monthly downloads | 当前 npm API `last-month` 返回 0；周期为 2026-04-30 到 2026-05-29，提交申请前应重新核验 |
| 项目文件 | 92 个 tracked files |
| CI | GitHub Actions Markdown Check |
| CLI | `ai-devtools-cn` template CLI，支持 list、examples、launch、contribute、handoff、claim、starter、recommend、search、show、new、kit、trial、feedback、outreach、adoption、evidence、application、doctor、publish-check、validate，可通过 `npx ai-devtools-cn` 使用 |

这些数字是日期快照，不是实时指标；后续维护 PR、npm 发布和下载量会继续变化。提交申请前应重新运行 `npm run metrics:snapshot` 更新数据，并在网络可用时核验 npm downloads API。

这些数字不能替代真实用户采用证据。后续仍需要继续积累更多外部 issue、外部 PR、stars、forks、npm 下载量或使用案例。

申请前可以生成本地申请包草稿：

```bash
npm run templates:application -- --output work/openai-application.md
```

这份草稿用于整理表单字段、证据清单和短板提醒，不会自动提交申请，也不会替代真实外部采用证据。

如果你要邀请外部贡献者提交第一个真实 PR，可以先让对方看 README 的“第一次外部 PR”章节，那里已经列出 #45-#49、建议 PR 标题和起步命令。也可以把下面命令直接发给对方：

```bash
npx ai-devtools-cn launch
npx ai-devtools-cn contribute
npx ai-devtools-cn handoff --output work/external-pr-handoff.md
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md
```

`handoff`、`claim` 和 `starter` 只生成本地交接、认领草稿和内容起稿。只有外部贡献者用自己的 GitHub 账号提交并合并的 PR，才能写成 external merged PR。

## 项目定位

`ai-devtools-cn` 是面向中文开发者和开源维护者的 AI 工程维护模板库与 CLI 工具。

项目覆盖：

- PR review
- issue triage
- CI debugging
- test generation
- documentation maintenance
- release notes
- security review
- dependency upgrade review
- AI output evaluation
- team AI tool onboarding

项目目标不是收集泛泛提示词，而是把 AI 工具接入真实开源维护流程，帮助维护者减少重复整理、检查、排错和发布说明工作。

## 维护者角色说明

表单字段：Describe your role: are you a primary or core maintainer?

可填写草稿：

```text
I am the primary maintainer of this public repository. I created and maintain the project, review and merge PRs, triage issues, manage releases, maintain CI, write documentation, add templates, and handle CLI improvements for AI-assisted open-source maintenance workflows.
```

## 项目为什么符合资格

表单字段：Why does this repository qualify?  
限制：500 characters。

如实版本：

```text
ai-devtools-cn is a public Chinese AI developer tooling project focused on OSS maintenance workflows: PR review, issue triage, CI debugging, release notes, security review, and maintainer automation. It has active maintenance records, 106 merged PRs, 106 closed issues, 19 releases, CI, a published npm CLI, and one external feedback issue. It serves Chinese developers who need reusable AI maintenance templates.
```

更保守版本：

```text
ai-devtools-cn is an early but actively maintained public OSS project for Chinese developers. It provides reusable AI maintenance templates and a published npm CLI for PR review, issue triage, CI debugging, release notes, security review, and AI output evaluation. The repo has 106 merged PRs, 106 closed issues, 19 releases, CI, and feedback channels. We are now collecting more external usage and feedback.
```

## API credits 使用计划

表单字段：How will you use API credits for your project?  
限制：500 characters。

可填写草稿：

```text
We will use API credits to build maintainer automation around this template library: PR review draft generation, issue triage suggestions, CI log summarization, release note drafting, template quality checks, and user feedback summarization. Credits would help test real workflows, improve the CLI, and publish reusable examples for Chinese open-source maintainers.
```

## Anything else we should know

限制：500 characters。

可填写草稿：

```text
This project is early, so we do not want to overstate adoption. The current strength is active maintenance and clear OSS maintainer workflows: issues, PRs, releases, CI, published npm CLI, case studies, feedback templates, and one external feedback issue are already in place. Our next milestone is more external feedback, external PRs, and feedback-driven releases.
```

## 已有维护证据

### Issue 和 PR

- 106 个 merged PR，最近一次完整快照统计到 PR #218
- 106 个 closed issues，最近一次完整快照统计到 issue #217
- 1 个外部 feedback issue：[#169](https://github.com/ONEISALL7/ai-devtools-cn/issues/169)
- 每轮功能通过 issue 追踪，再通过 PR 合并
- 已覆盖模板、案例、quickstart、CLI、npm 发布结构、用户反馈入口、issue 表单、第一批试用计划、试用包案例、外部试用邀请、证据台账和申请包草稿
- 已基于外部反馈 #169 补充 pnpm workspace / monorepo CI 排错试用包

### Release

- `v0.1.0`：初始项目结构
- `v0.2.0`：quickstart 和模板索引
- `v0.3.0`：npm-ready template CLI
- `v0.4.0`：维护工作流支持、反馈入口、issue 表单、指标快照和 CLI 校验
- `v0.5.0`：维护者工作包 CLI、README 状态徽章和 npm 发布清单更新
- `v0.6.0`：反馈 issue 草稿 CLI、第一批用户试用计划和 `npx` 输出路径修复
- `v0.6.1`：npm 发布准备，规范 bin 路径并补充 publish dry-run/cache 排错
- `v0.7.0`：第一批用户试用包 CLI，生成模板工作稿和反馈草稿
- `v0.8.0`：本地诊断 `doctor` 命令，检查 Node 版本、目录写入能力和模板注册状态
- `v0.9.0`：试用包案例集，新增 PR review、Node.js CI 和 Python pytest 三个可浏览示例
- `v0.10.0`：CLI 发现能力，新增 `examples` 和 `recommend` 命令，帮助用户发现模板、案例和试用包
- `v0.11.0`：npm 发布准备检查，新增 `publish-check` 命令并修正指标快照本地日期
- `v0.12.0`：外部试用邀请能力，新增 `outreach` 命令，帮助维护者邀请真实开发者试用并收集反馈
- `v0.13.0`：外部贡献者引导模板，帮助维护者把 good first issue 整理成新贡献者可执行的 PR 引导
- `v0.14.0`：外部采用证据台账，帮助区分维护者活动和真实外部采用信号
- `v0.15.0`：OpenAI Codex for Open Source 申请包草稿生成命令
- `v0.16.0`：一周外部试用冲刺包，帮助维护者邀请真实用户并记录反馈证据
- `v0.16.1`：外部试用者快速指南和 npm 首次发布交接清单
- `v0.16.2`：基于外部反馈 #169 的 pnpm workspace CI 排错试用包
- `main`：新增 README“第一次外部 PR”路径，以及 `launch`、`contribute`、`handoff`、`claim`、`starter` 外部贡献转化入口，帮助外部贡献者从 good first issue 进入真实 PR

### CI 和质量控制

- GitHub Actions Markdown Check
- `npm run lint:md`
- `npm run test:cli`
- `npm run test`
- `npm run templates:validate`
- `npm run templates:publish-check`
- `npm pack --dry-run` 发布内容预检

### CLI

当前 CLI 支持：

```bash
npm run templates:list
npm run templates:examples
npm run templates:launch
npm run templates:recommend -- ci
npm run templates:search -- ci
npm run templates:show -- pr-review
npm run templates:doctor
npm run templates:new -- ci-troubleshooting --output work/ci-debug.md
npm run templates:new -- contributor-onboarding --output work/contributor-onboarding.md
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
npm run templates:trial -- --template pr-review --output work/trial
npm run templates:feedback -- --template pr-review --output work/feedback.md
npm run templates:outreach -- --template pr-review --channel x --output work/outreach.md
npm run templates:adoption -- --template pr-review --output work/adoption-sprint
npm run templates:contribute
npm run templates:claim -- 45 --output work/claim-45.md
npm run templates:starter -- 45 --output work/node-ci-starter.md
npm run templates:evidence -- --output work/external-evidence.md
npm run templates:application -- --output work/openai-application.md
npm run templates:publish-check
npm run templates:validate
```

GitHub `main` 当前 CLI 支持；通过 `npx` 使用前必须以 `npm view ai-devtools-cn version` 确认 npm 已发布版本是否已经同步：

```bash
npm view ai-devtools-cn version
npx ai-devtools-cn list
npx ai-devtools-cn examples
npx ai-devtools-cn launch
npx ai-devtools-cn recommend ci
npx ai-devtools-cn doctor
npx ai-devtools-cn new pr-review --output work/pr-review.md
npx ai-devtools-cn new contributor-onboarding --output work/contributor-onboarding.md
npx ai-devtools-cn kit oss-maintainer --output work/oss-maintainer-kit
npx ai-devtools-cn trial --template pr-review --output work/trial
npx ai-devtools-cn feedback --template pr-review --output work/feedback.md
npx ai-devtools-cn outreach --template pr-review --channel x --output work/outreach.md
npx ai-devtools-cn adoption --template pr-review --output work/adoption-sprint
npx ai-devtools-cn contribute
npx ai-devtools-cn handoff --output work/external-pr-handoff.md
npx ai-devtools-cn review-pr --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md
npx ai-devtools-cn evidence --output work/external-evidence.md
npx ai-devtools-cn application --output work/openai-application.md
npx ai-devtools-cn publish-check
npx ai-devtools-cn validate
```

如果 `npx` 提示未知命令，说明 npm 包仍落后于 GitHub `main`；申请材料中应如实写 npm 当前版本，不要把 source-only 命令写成已发布 npm 能力。

## 当前短板

申请前需要诚实承认这些短板：

- stars 和 forks 还少
- npm 已发布，但还没有可引用的下载量趋势
- 外部用户反馈目前只有 1 条，还不足以证明稳定采用
- 暂无来自其他维护者的 PR
- 项目仍处于早期阶段

这些不是不能申请的理由，但需要用清晰路线解释项目价值和后续计划。

## 下一步补强清单

优先级从高到低：

1. 用 `npx ai-devtools-cn doctor`、`npx ai-devtools-cn launch` 和 `npx ai-devtools-cn adoption` 邀请真实开发者完成一次无 clone 试用。
2. 使用 `npm run templates:outreach` 生成对外试用邀请文案，按 [第一批用户试用计划](first-user-test-plan.md) 和 [社区推广和反馈收集](community-outreach.md) 邀请开发者试用模板和 CLI。
3. 收集 5-10 条真实反馈 issue，并把公开链接记录到证据台账。
4. 邀请 1-2 位外部贡献者用 `claim` 和 `starter` 提交文档或案例 PR。
5. 按 [项目指标追踪](metrics.md) 每周生成一次指标快照。
6. 增加 CLI 测试到 GitHub Actions。
7. 发布一版基于真实反馈改进的 release。

## 申请前自查

- [ ] GitHub profile 是 public
- [ ] 仓库是 public
- [ ] README 能说明项目用途
- [ ] 有 releases
- [ ] 有 issue/PR 维护记录
- [ ] 有 CI
- [ ] 有 LICENSE
- [ ] 有贡献指南
- [ ] 有用户反馈入口
- [ ] 准备好 ChatGPT 账号邮箱
- [ ] 准备好 OpenAI Organization ID
- [ ] 不夸大 stars、downloads、用户数或生态影响

## 推荐申请时机

现在可以作为早期项目申请，但通过率不一定高。更稳妥的申请时机是：

- npm 包已发布，并能通过 `npx ai-devtools-cn doctor` 验证
- 有至少几十个 stars 或一些下载量
- 有 5 条以上外部反馈 issue
- 有至少 1 个外部贡献 PR
- 有一版基于反馈改进的 release

如果提前申请，建议强调“early but actively maintained”，不要把项目包装成已经广泛使用的生态基础设施。
