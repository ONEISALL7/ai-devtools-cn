# OpenAI Codex for Open Source 申请准备

这个文档用于整理 `ai-devtools-cn` 申请 OpenAI Codex for Open Source 时可引用的项目证据、表单草稿和后续补强事项。

官方申请入口：[Codex for Open Source](https://openai.com/form/codex-for-oss/)

## 当前项目状态

截至 2026-06-01，基于 `v0.13.0` release 后的 `npm run metrics:snapshot` 和本地 `git ls-files` 的一次快照：

| 项目 | 当前状态 |
| --- | --- |
| GitHub 仓库 | <https://github.com/ONEISALL7/ai-devtools-cn> |
| 可见性 | Public |
| GitHub stars | 2 |
| Forks | 1 |
| Releases | 14 个：`v0.1.0` 到 `v0.13.0` |
| Merged PRs | 70 个，最近一次完整快照统计到 PR #145 |
| Closed issues | 68 个，最近一次完整快照统计到 issue #144 |
| External merged PRs | 0 |
| External feedback issues | 0 |
| npm package | not published or unavailable |
| 项目文件 | 84 个 tracked files |
| CI | GitHub Actions Markdown Check |
| CLI | `ai-devtools-cn` template CLI，支持 list、examples、recommend、search、show、new、kit、trial、feedback、outreach、doctor、publish-check、validate |

这些数字是日期快照，不是实时指标；后续维护 PR 会继续增加这些数字。提交申请前应重新运行 `npm run metrics:snapshot` 更新数据。

这些数字不能替代真实用户采用证据。后续仍需要继续积累外部 issue、反馈、stars、forks、npm 下载量或使用案例。

申请前可以生成本地申请包草稿：

```bash
npm run templates:application -- --output work/openai-application.md
```

这份草稿用于整理表单字段、证据清单和短板提醒，不会自动提交申请，也不会替代真实外部采用证据。

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
ai-devtools-cn is a public Chinese AI developer tooling project focused on OSS maintenance workflows: PR review, issue triage, CI debugging, release notes, security review, and maintainer automation. It has active maintenance records, 70 merged PRs, 68 closed issues, 14 releases, CI, a template CLI, and feedback channels. It serves Chinese developers who need reusable AI maintenance templates.
```

更保守版本：

```text
ai-devtools-cn is an early but actively maintained public OSS project for Chinese developers. It provides reusable AI maintenance templates and a CLI for PR review, issue triage, CI debugging, release notes, security review, and AI output evaluation. The repo has 70 merged PRs, 68 closed issues, 14 releases, CI, and feedback channels. We are now collecting external usage and feedback.
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
This project is early, so we do not want to overstate adoption. The current strength is active maintenance and clear OSS maintainer workflows: issues, PRs, releases, CI, CLI tooling, case studies, and feedback templates are already in place. Our next milestone is external usage: npm publishing, collecting feedback issues, and adding more real-world case studies.
```

## 已有维护证据

### Issue 和 PR

- 70 个 merged PR，最近一次完整快照统计到 PR #145
- 68 个 closed issues，最近一次完整快照统计到 issue #144
- 每轮功能通过 issue 追踪，再通过 PR 合并
- 已覆盖模板、案例、quickstart、CLI、npm 发布结构、用户反馈入口、issue 表单、第一批试用计划和试用包案例

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
npm run templates:evidence -- --output work/external-evidence.md
npm run templates:application -- --output work/openai-application.md
npm run templates:publish-check
npm run templates:validate
```

发布到 npm 后计划支持：

```bash
npx ai-devtools-cn list
npx ai-devtools-cn examples
npx ai-devtools-cn recommend ci
npx ai-devtools-cn doctor
npx ai-devtools-cn new pr-review --output work/pr-review.md
npx ai-devtools-cn new contributor-onboarding --output work/contributor-onboarding.md
npx ai-devtools-cn kit oss-maintainer --output work/oss-maintainer-kit
npx ai-devtools-cn trial --template pr-review --output work/trial
npx ai-devtools-cn feedback --template pr-review --output work/feedback.md
npx ai-devtools-cn outreach --template pr-review --channel x --output work/outreach.md
npx ai-devtools-cn evidence --output work/external-evidence.md
npx ai-devtools-cn application --output work/openai-application.md
npx ai-devtools-cn publish-check
npx ai-devtools-cn validate
```

## 当前短板

申请前需要诚实承认这些短板：

- stars 和 forks 还少
- 暂无 npm 下载量
- 暂无足够外部用户反馈
- 暂无来自其他维护者的 PR
- 项目仍处于早期阶段

这些不是不能申请的理由，但需要用清晰路线解释项目价值和后续计划。

## 下一步补强清单

优先级从高到低：

1. 按 [npm 发布清单](npm-publish.md) 发布 npm 包，开始积累下载量。
2. 使用 `npm run templates:outreach` 生成对外试用邀请文案，按 [第一批用户试用计划](first-user-test-plan.md) 和 [社区推广和反馈收集](community-outreach.md) 邀请开发者试用模板和 CLI。
3. 收集 5-10 条真实反馈 issue。
4. 根据反馈新增或修正模板。
5. 邀请 1-2 位外部贡献者提交文档或案例 PR。
6. 按 [项目指标追踪](metrics.md) 每周生成一次指标快照。
7. 增加 CLI 测试到 GitHub Actions。
8. 发布 npm `v0.13.0`，让 CLI 可以通过 `npx ai-devtools-cn` 直接使用。

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

- npm 包已发布
- 有至少几十个 stars 或一些下载量
- 有 5 条以上外部反馈 issue
- 有至少 1 个外部贡献 PR
- 有一版基于反馈改进的 release

如果提前申请，建议强调“early but actively maintained”，不要把项目包装成已经广泛使用的生态基础设施。
