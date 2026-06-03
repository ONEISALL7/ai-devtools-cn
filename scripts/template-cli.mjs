#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { constants, existsSync, accessSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { formatSnapshotDate } from "./date-utils.mjs";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const invocationRoot = process.cwd();
const repo = "ONEISALL7/ai-devtools-cn";
const repoOwner = "ONEISALL7";
const templateFeedbackUrl = "https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml";
const externalPilotFeedbackUrl = "https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=external_pilot_feedback.yml";

const templates = [
  {
    slug: "pr-review",
    title: "PR Review 模板",
    file: "templates/pr-review-template.md",
    useCase: "检查代码或文档 PR",
    output: "PR review comment",
  },
  {
    slug: "issue-triage",
    title: "Issue Triage 模板",
    file: "templates/issue-triage-template.md",
    useCase: "分流 bug、feature、docs 和 question",
    output: "issue 评论、label",
  },
  {
    slug: "ci-troubleshooting",
    title: "CI 排错模板",
    file: "templates/ci-troubleshooting-template.md",
    useCase: "分析失败日志并给出最小修复",
    output: "PR 描述、修复 commit",
  },
  {
    slug: "test-generation",
    title: "测试生成模板",
    file: "templates/test-generation-template.md",
    useCase: "补充测试场景和边界条件",
    output: "测试文件、TODO issue",
  },
  {
    slug: "documentation-update",
    title: "文档更新模板",
    file: "templates/documentation-update-template.md",
    useCase: "维护 README、docs 或使用说明",
    output: "docs、README",
  },
  {
    slug: "readme-improvement",
    title: "README 改进模板",
    file: "templates/readme-improvement-template.md",
    useCase: "优化项目首页和新用户入口",
    output: "README",
  },
  {
    slug: "release-note",
    title: "发布说明模板",
    file: "templates/release-note-template.md",
    useCase: "根据 PR 和 changelog 生成 release note",
    output: "GitHub Release、CHANGELOG",
  },
  {
    slug: "release-checklist",
    title: "Release Checklist",
    file: "templates/release-checklist.md",
    useCase: "发版前检查版本、CI、tag 和说明",
    output: "release issue",
  },
  {
    slug: "dependency-upgrade-risk",
    title: "依赖升级风险模板",
    file: "templates/dependency-upgrade-risk-template.md",
    useCase: "评估依赖升级风险和验证范围",
    output: "PR 描述",
  },
  {
    slug: "security-review",
    title: "安全审查模板",
    file: "templates/security-review-template.md",
    useCase: "检查权限、密钥、敏感信息和危险改动",
    output: "PR review",
  },
  {
    slug: "public-safety-redaction",
    title: "公开安全脱敏模板",
    file: "templates/public-safety-redaction-template.md",
    useCase: "公开 issue、PR、日志、反馈或案例前检查敏感信息",
    output: "脱敏后的公开文本、安全检查清单",
  },
  {
    slug: "tool-evaluation",
    title: "工具评估清单",
    file: "templates/tool-evaluation-template.md",
    useCase: "评估 AI 工具是否适合团队或项目",
    output: "团队文档",
  },
  {
    slug: "ai-tool-onboarding",
    title: "AI 工具导入检查清单",
    file: "templates/ai-tool-onboarding-checklist.md",
    useCase: "设计团队 AI 工具试点和边界",
    output: "onboarding 文档",
  },
  {
    slug: "ai-output-evaluation",
    title: "AI 输出质量评估模板",
    file: "templates/ai-output-evaluation-template.md",
    useCase: "判断 AI 输出能否进入工程流程",
    output: "review 记录",
  },
  {
    slug: "maintainer-weekly-checklist",
    title: "维护者周检查清单",
    file: "templates/maintainer-weekly-checklist.md",
    useCase: "周期性检查 issue、PR、CI 和 release",
    output: "maintainer log",
  },
  {
    slug: "contributor-onboarding",
    title: "外部贡献者引导模板",
    file: "templates/contributor-onboarding-template.md",
    useCase: "把 good first issue 整理成外部贡献者可执行的 PR 引导",
    output: "contributor guide、issue comment、PR checklist",
  },
];

const openaiReadinessRequiredFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "MAINTAINERS.md",
  "CHANGELOG.md",
  "LICENSE",
  "docs/open-source-readiness-pack.md",
  "docs/openai-codex-application-packet.md",
];

const readinessTemplate = {
  roleText:
    "I am the primary maintainer of this public repository ai-devtools-cn. I review and merge PRs, triage issues, maintain releases, and curate templates and case studies used by Chinese OSS maintainers for real maintenance workflows such as PR review, issue triage, CI troubleshooting, and release documentation.",
  qualifyText:
    "This repository is a public OSS project that provides reusable maintenance templates and CLI workflows for real maintainer tasks. It includes PR review, issue triage, CI troubleshooting, release note drafting, and quality evaluation content with concrete examples. The project is actively maintained with releases, issue/PR history, and feedback pathways for external users.",
  creditsText:
    "I will use API credits to speed up maintainer workloads: review note drafting, issue triage, CI failure triage, dependency risk analysis, release note preparation, and external feedback conversion into reviewable, high-quality maintainer artifacts.",
};

const kits = [
  {
    slug: "oss-maintainer",
    title: "开源维护者工作包",
    description: "面向公开开源仓库的日常维护流程，覆盖 review、triage、CI、release 和周期检查。",
    templateSlugs: [
      "pr-review",
      "issue-triage",
      "ci-troubleshooting",
      "release-note",
      "maintainer-weekly-checklist",
      "contributor-onboarding",
      "public-safety-redaction",
      "ai-output-evaluation",
    ],
  },
];

const examples = [
  {
    group: "基础示例",
    items: [
      {
        slug: "pr-review-example",
        title: "PR Review 示例",
        file: "examples/pr-review-example.md",
        useCase: "学习如何输出 review 结论",
        templateSlug: "pr-review",
      },
      {
        slug: "issue-triage-example",
        title: "Issue Triage 示例",
        file: "examples/issue-triage-example.md",
        useCase: "学习如何分流 issue",
        templateSlug: "issue-triage",
      },
      {
        slug: "ci-troubleshooting-example",
        title: "CI 排错示例",
        file: "examples/ci-troubleshooting-example.md",
        useCase: "学习如何处理失败日志",
        templateSlug: "ci-troubleshooting",
      },
      {
        slug: "release-note-example",
        title: "Release note 示例",
        file: "examples/release-note-example.md",
        useCase: "学习如何写发版说明",
        templateSlug: "release-note",
      },
    ],
  },
  {
    group: "真实维护案例",
    items: [
      {
        slug: "pr-review-quickstart-release",
        title: "审查快速上手 PR",
        file: "examples/case-studies/pr-review-quickstart-release.md",
        useCase: "审查文档入口型 PR",
        templateSlug: "pr-review",
      },
      {
        slug: "ci-markdownlint-md012",
        title: "修复 markdownlint MD012",
        file: "examples/case-studies/ci-markdownlint-md012.md",
        useCase: "从 CI 日志定位最小修复",
        templateSlug: "ci-troubleshooting",
      },
      {
        slug: "release-v020",
        title: "发布 v0.2.0",
        file: "examples/case-studies/release-v020.md",
        useCase: "把 PR 和 changelog 整理成 release note",
        templateSlug: "release-note",
      },
      {
        slug: "template-registry-validation",
        title: "模板注册校验",
        file: "examples/case-studies/template-registry-validation.md",
        useCase: "为模板库增加 CLI 注册校验",
      },
      {
        slug: "node-ci-troubleshooting",
        title: "Node.js CI 依赖安装失败",
        file: "examples/case-studies/node-ci-troubleshooting.md",
        useCase: "快速复现并修复 npm ci lockfile 不一致场景",
        templateSlug: "ci-troubleshooting",
      },
      {
        slug: "dependency-upgrade-risk-example",
        title: "依赖升级风险评估",
        file: "examples/dependency-upgrade-risk-example.md",
        useCase: "判断 major 更新、兼容性风险与回滚方案",
        templateSlug: "dependency-upgrade-risk",
      },
      {
        slug: "python-pr-review-example",
        title: "Python PR Review 示例",
        file: "examples/python-pr-review-example.md",
        useCase: "识别 API 变更阻塞项和验证边界",
        templateSlug: "pr-review",
      },
      {
        slug: "frontend-readme-improvement-example",
        title: "前端 README 改进",
        file: "examples/frontend-readme-improvement-example.md",
        useCase: "从介绍页到可运行步骤的快速可用改进",
        templateSlug: "readme-improvement",
      },
    ],
  },
  {
    group: "第一批用户试用包",
    items: [
      {
        slug: "pr-review-docs",
        title: "PR Review 文档改动试用包",
        file: "examples/trial-packs/pr-review-docs/README.md",
        useCase: "邀请外部 reviewer 试用模板并提交匿名化反馈",
        templateSlug: "pr-review",
      },
      {
        slug: "node-ci-failure",
        title: "Node.js CI 排错试用包",
        file: "examples/trial-packs/node-ci-failure/README.md",
        useCase: "邀请维护者用失败日志试用 CI 排错模板",
        templateSlug: "ci-troubleshooting",
      },
      {
        slug: "python-pytest-failure",
        title: "Python pytest 失败试用包",
        file: "examples/trial-packs/python-pytest-failure/README.md",
        useCase: "邀请 Python 维护者排查 pytest 和依赖差异",
        templateSlug: "ci-troubleshooting",
      },
      {
        slug: "pnpm-workspace-ci",
        title: "pnpm workspace CI 排错试用包",
        file: "examples/trial-packs/pnpm-workspace-ci/README.md",
        useCase: "回应外部反馈，排查 monorepo workspace 依赖构建问题",
        templateSlug: "ci-troubleshooting",
      },
    ],
  },
];

const recipes = [
  {
    slug: "pr-review-docs",
    title: "文档 PR review",
    templateSlug: "pr-review",
    scenario: "review a README or docs PR",
    goal: "把一次文档或 README 改动转成可提交的 review comment。",
    commands: [
      "npx ai-devtools-cn new pr-review --output work/pr-review.md",
      "npx ai-devtools-cn feedback --template pr-review --scenario \"review a documentation PR\" --output work/pr-review-feedback.md",
    ],
    steps: [
      "选择一个公开仓库中的文档或 README PR。",
      "把 PR 背景、改动摘要和需要重点检查的风险填进工作稿。",
      "让 AI 输出 review 结论，再人工删掉不准确或无法验证的内容。",
      "把有用结论整理成 PR comment 或 feedback issue。",
    ],
    evidence: "PR comment、review 截图摘要或公开 feedback issue。",
  },
  {
    slug: "ci-failure",
    title: "CI 失败排查",
    templateSlug: "ci-troubleshooting",
    scenario: "debug a failing CI job",
    goal: "把一次 CI 失败日志转成最小修复计划和验证清单。",
    commands: [
      "npx ai-devtools-cn trial --template ci-troubleshooting --scenario \"debug a failing CI job\" --output work/trial-ci",
      "npx ai-devtools-cn feedback --template ci-troubleshooting --scenario \"debug a failing CI job\" --output work/ci-feedback.md",
    ],
    steps: [
      "复制可公开的失败命令、关键报错和环境信息。",
      "填入试用包里的 CI 排错工作稿。",
      "要求 AI 区分直接原因、可能原因、最小修复和验证命令。",
      "把结果用于 issue 评论、PR 描述或反馈 issue。",
    ],
    evidence: "CI 修复 PR、issue 评论或反馈 issue。",
  },
  {
    slug: "issue-triage",
    title: "分流一个 issue",
    templateSlug: "issue-triage",
    scenario: "triage a bug or feature issue",
    goal: "把一个模糊 issue 分成类型、优先级、缺失信息和下一步回复。",
    commands: [
      "npx ai-devtools-cn new issue-triage --output work/issue-triage.md",
      "npx ai-devtools-cn feedback --template issue-triage --scenario \"triage a bug or feature issue\" --output work/triage-feedback.md",
    ],
    steps: [
      "选择一个可以公开描述的 bug、feature 或 question issue。",
      "填入用户描述、复现信息、相关版本和维护约束。",
      "让 AI 生成 label 建议、追问列表和下一步动作。",
      "人工确认后，把结果整理成 issue 回复或反馈 issue。",
    ],
    evidence: "issue 回复、label 变更记录或反馈 issue。",
  },
  {
    slug: "release-note",
    title: "整理 release note",
    templateSlug: "release-note",
    scenario: "draft release notes from merged PRs",
    goal: "把一组 merged PR 或 changelog 摘要转成可发布的 release note。",
    commands: [
      "npx ai-devtools-cn new release-note --output work/release-note.md",
      "npx ai-devtools-cn feedback --template release-note --scenario \"draft release notes\" --output work/release-feedback.md",
    ],
    steps: [
      "收集一个小版本的 PR 标题、issue 链接和用户可见变化。",
      "填入 breaking changes、migration notes 和验证结果。",
      "让 AI 生成面向用户的 release note 草稿。",
      "人工核对每条变更，删除无法公开或无法验证的内容。",
    ],
    evidence: "GitHub release、CHANGELOG PR 或反馈 issue。",
  },
];

const pilotInviteRecipeSlugs = [
  "ci-failure",
  "pr-review-docs",
  "issue-triage",
];

const outreachChannels = [
  {
    slug: "github",
    title: "GitHub issue / discussion",
    audience: "已经在维护开源项目、愿意提交公开反馈的开发者",
  },
  {
    slug: "x",
    title: "X / Twitter",
    audience: "关注 AI 开发工具、开源维护和工程效率的开发者",
  },
  {
    slug: "v2ex",
    title: "V2EX / 中文开发者社区",
    audience: "愿意试用工具并给出具体意见的中文开发者",
  },
  {
    slug: "wechat",
    title: "微信群 / 私域社群",
    audience: "熟人开发者、开源维护者和团队技术负责人",
  },
  {
    slug: "email",
    title: "Email / 私信",
    audience: "已知有维护场景、适合一对一邀请的开发者",
  },
];

const goodFirstPrBriefs = [
  {
    issue: "#45",
    title: "Node.js CI 排错示例",
    url: "https://github.com/ONEISALL7/ai-devtools-cn/issues/45",
    brief: "docs/good-first-pr-briefs.md#45-nodejs-ci-排错示例",
    suggestedTitle: "Add Node.js CI troubleshooting case study",
    files: [
      "examples/case-studies/node-ci-troubleshooting.md",
      "examples/case-studies/README.md",
      "examples/README.md",
    ],
  },
  {
    issue: "#46",
    title: "依赖升级风险示例",
    url: "https://github.com/ONEISALL7/ai-devtools-cn/issues/46",
    brief: "docs/good-first-pr-briefs.md#46-依赖升级风险示例",
    suggestedTitle: "Add dependency upgrade risk example",
    files: [
      "examples/dependency-upgrade-risk-example.md",
      "examples/README.md",
    ],
  },
  {
    issue: "#47",
    title: "用户反馈案例整理文档",
    url: "https://github.com/ONEISALL7/ai-devtools-cn/issues/47",
    brief: "docs/good-first-pr-briefs.md#47-用户反馈案例整理文档",
    suggestedTitle: "Add user feedback case documentation guide",
    files: [
      "docs/feedback-case-guide.md",
      "docs/feedback.md",
      "README.md",
    ],
  },
  {
    issue: "#48",
    title: "Python 项目 PR review 示例",
    url: "https://github.com/ONEISALL7/ai-devtools-cn/issues/48",
    brief: "docs/good-first-pr-briefs.md#48-python-项目-pr-review-示例",
    suggestedTitle: "Add Python PR review example",
    files: [
      "examples/python-pr-review-example.md",
      "examples/README.md",
    ],
  },
  {
    issue: "#49",
    title: "前端 README 改进示例",
    url: "https://github.com/ONEISALL7/ai-devtools-cn/issues/49",
    brief: "docs/good-first-pr-briefs.md#49-前端-readme-改进示例",
    suggestedTitle: "Add frontend README improvement example",
    files: [
      "examples/frontend-readme-improvement-example.md",
      "examples/README.md",
    ],
  },
];

const rawCommand = process.argv[2] ?? "help";
const command = rawCommand.startsWith("templates:")
  ? rawCommand.slice("templates:".length)
  : rawCommand;
const args = process.argv.slice(3);

function printHelp() {
  console.log(`AI DevTools CN template CLI

Usage:
  ai-devtools-cn list
  ai-devtools-cn examples
  ai-devtools-cn recipes
  ai-devtools-cn recipes <slug>
  ai-devtools-cn pilot <recipe-slug>
  ai-devtools-cn pilot-invite
  ai-devtools-cn contribute
  ai-devtools-cn launch
  ai-devtools-cn handoff
  ai-devtools-cn handoff --issue <issue-number>
  ai-devtools-cn pr-pack <issue-number>
  ai-devtools-cn review-pr --pr <number-or-url>
  ai-devtools-cn claim <issue-number> --output <path>
  ai-devtools-cn starter <issue-number> --output <path>
  ai-devtools-cn recommend <keyword>
  ai-devtools-cn search <keyword>
  ai-devtools-cn show <slug>
  ai-devtools-cn new <slug> --output <path>
  ai-devtools-cn kit <slug> --output <dir>
  ai-devtools-cn trial --output <dir>
  ai-devtools-cn feedback --output <path>
  ai-devtools-cn outreach --output <path>
  ai-devtools-cn adoption --output <dir>
  ai-devtools-cn evidence --output <path>
  ai-devtools-cn readiness --output <path>
  ai-devtools-cn publish-status
  ai-devtools-cn doctor
  ai-devtools-cn validate
  ai-devtools-cn publish-check

NPM scripts:
  npm run templates:list
  npm run templates:examples
  npm run templates:recipes
  npm run templates:recipes -- <slug>
  npm run templates:pilot -- <recipe-slug>
  npm run templates:pilot-invite
  npm run templates:contribute
  npm run templates:launch
  npm run templates:handoff
  npm run templates:pr-pack -- <issue-number>
  npm run templates:review-pr -- --pr <number-or-url>
  npm run templates:claim -- <issue-number> --output <path>
  npm run templates:starter -- <issue-number> --output <path>
  npm run templates:recommend -- <keyword>
  npm run templates:search -- <keyword>
  npm run templates:show -- <slug>
  npm run templates:new -- <slug> --output <path>
  npm run templates:kit -- <slug> --output <dir>
  npm run templates:trial -- --template <slug> --output <dir>
  npm run templates:feedback -- --template <slug> --output <path>
  npm run templates:outreach -- --template <slug> --channel <channel> --output <path>
  npm run templates:adoption -- --template <slug> --output <dir>
  npm run templates:evidence -- --output <path>
  npm run templates:readiness -- --output <path>
  npm run templates:publish-status
  npm run templates:doctor
  npm run templates:validate
  npm run templates:publish-check

Examples:
  npx ai-devtools-cn list
  npx ai-devtools-cn examples
  npx ai-devtools-cn recipes
  npx ai-devtools-cn recipes pr-review-docs
  npx ai-devtools-cn pilot ci-failure --output work/pilot-ci
  npx ai-devtools-cn pilot-invite --output work/pilot-invites.md
  npx ai-devtools-cn contribute
  npx ai-devtools-cn launch
  npx ai-devtools-cn handoff
  npx ai-devtools-cn handoff --output work/external-pr-handoff.md
  npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
  npx ai-devtools-cn pr-pack 45 --output work/pr-pack-45.md
  npx ai-devtools-cn readiness --output work/openai-readiness-2026-06-02.md
  npx ai-devtools-cn review-pr --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
  npx ai-devtools-cn review-pr --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
  npx ai-devtools-cn claim 45 --output work/claim-45.md
  npx ai-devtools-cn starter 45 --output work/node-ci-starter.md
  npx ai-devtools-cn recommend ci
  npx ai-devtools-cn search ci
  npx ai-devtools-cn show pr-review
  npx ai-devtools-cn new ci-troubleshooting --output work/ci-debug.md
  npx ai-devtools-cn kit oss-maintainer --output work/oss-maintainer-kit
  npx ai-devtools-cn trial --template pr-review --scenario "review a documentation PR" --output work/trial
  npx ai-devtools-cn feedback --template pr-review --output work/feedback.md
  npx ai-devtools-cn outreach --template pr-review --channel x --output work/outreach.md
  npx ai-devtools-cn adoption --template pr-review --scenario "review a documentation PR" --output work/adoption-sprint
  npx ai-devtools-cn evidence --output work/external-evidence.md
  npx ai-devtools-cn readiness --output work/openai-readiness-2026-06-02.md
  npx ai-devtools-cn publish-status
  npx ai-devtools-cn doctor
  npx ai-devtools-cn validate
  npx ai-devtools-cn publish-check

  npm run templates:list
  npm run templates:examples
  npm run templates:recipes
  npm run templates:recipes -- ci-failure
  npm run templates:pilot -- ci-failure --output work/pilot-ci
  npm run templates:pilot-invite -- --output work/pilot-invites.md
  npm run templates:contribute
  npm run templates:launch
  npm run templates:handoff
  npm run templates:handoff -- --output work/external-pr-handoff.md
  npm run templates:handoff -- --issue 45 --output work/handoff-45.md
  npm run templates:pr-pack -- 45 --output work/pr-pack-45.md
  npm run templates:review-pr -- --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
  npm run templates:claim -- 45 --output work/claim-45.md
  npm run templates:starter -- 45 --output work/node-ci-starter.md
  npm run templates:recommend -- ci
  npm run templates:search -- ci
  npm run templates:show -- pr-review
  npm run templates:new -- ci-troubleshooting --output work/ci-debug.md
  npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
  npm run templates:trial -- --template pr-review --scenario "review a documentation PR" --output work/trial
  npm run templates:feedback -- --template pr-review --output work/feedback.md
  npm run templates:outreach -- --template pr-review --channel x --output work/outreach.md
  npm run templates:adoption -- --template pr-review --scenario "review a documentation PR" --output work/adoption-sprint
  npm run templates:evidence -- --output work/external-evidence.md
  npm run templates:readiness -- --output work/openai-readiness-2026-06-02.md
  npm run templates:publish-status
  npm run templates:doctor
  npm run templates:validate
  npm run templates:publish-check

Options:
  --output <path>  Output path for the generated working draft or kit directory
  --template <slug> Template slug to prefill feedback context
  --scenario <text> Public-safe usage scenario to prefill feedback context
  --channel <slug> Outreach channel: github, x, v2ex, wechat, email
  --issue <number> Good first issue number for a targeted handoff
  --pr <number-or-url> Pull request number or URL for review-pr
  --author <username> Pull request author for review-pr
  --force          Overwrite output file if it already exists
`);
}

function findTemplate(slug) {
  return templates.find((template) => template.slug === slug);
}

function findKit(slug) {
  return kits.find((kit) => kit.slug === slug);
}

function findRecipe(slug) {
  return recipes.find((recipe) => recipe.slug === slug);
}

function listTemplates(items = templates) {
  for (const template of items) {
    console.log(`- ${template.slug}: ${template.title}
  用途：${template.useCase}
  输出：${template.output}
  文件：${template.file}
`);
  }
}

function listKits() {
  for (const kit of kits) {
    console.log(`- ${kit.slug}: ${kit.title}
  用途：${kit.description}
  模板：${kit.templateSlugs.join(", ")}
`);
  }
}

function listExamples() {
  for (const group of examples) {
    console.log(`${group.group}:`);
    for (const item of group.items) {
      console.log(`- ${item.slug}: ${item.title}
  用途：${item.useCase}
  关联模板：${item.templateSlug ?? "none"}
  文件：${item.file}
`);
    }
  }
}

function listRecipes() {
  console.log(`真实试用配方

这些配方把模板、CLI 命令、试用步骤和反馈证据连在一起，适合第一次外部试用者在 10-20 分钟内完成一个公开安全的小场景。
`);

  for (const recipe of recipes) {
    const template = findTemplate(recipe.templateSlug);
    console.log(`- ${recipe.slug}: ${recipe.title}
  场景：${recipe.scenario}
  目标：${recipe.goal}
  模板：${template?.title ?? recipe.templateSlug}
  展开：npx ai-devtools-cn recipes ${recipe.slug}
`);
  }
}

function showRecipe(slug) {
  const recipe = requireRecipe(slug);
  const template = requireTemplate(recipe.templateSlug);

  console.log(`# ${recipe.title}

Slug:
${recipe.slug}

Scenario:
${recipe.scenario}

Goal:
${recipe.goal}

Template:
- ${template.title}: ${template.file}

Commands:
${recipe.commands.map((command) => `- ${command}`).join("\n")}

Steps:
${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

Evidence to collect:
${recipe.evidence}

反馈 issue:
${templateFeedbackUrl}

Safety:
- 不提交 token、API key、cookie、密码。
- 不提交客户信息、内部日志、未公开源码或个人隐私。
- 敏感场景请改写成公开安全的抽象描述。
`);
}

function listContributionBriefs() {
  console.log(`外部贡献者入口

Good First PR Briefs:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

这些任务面向真实外部贡献者。维护者自己完成的 PR 不能写成 external merged PR。
`);

  for (const item of goodFirstPrBriefs) {
    const issueNumber = item.issue.replace("#", "");
    console.log(`${item.issue} ${item.title}
  Issue: ${item.url}
  Brief: ${item.brief}
  Suggested PR title: ${item.suggestedTitle}
  Start commands:
    git clone https://github.com/ONEISALL7/ai-devtools-cn.git
    cd ai-devtools-cn
    npm install
    npm run templates:handoff -- --issue ${issueNumber} --output work/handoff-${issueNumber}.md
    npm run templates:pr-pack -- ${issueNumber} --output work/pr-pack-${issueNumber}.md
    npm run templates:claim -- ${issueNumber} --output work/claim-${issueNumber}.md
    npm run templates:starter -- ${issueNumber} --output work/starter-${issueNumber}.md
`);
  }

  console.log(`最小验证命令:
  npm install
  npm run lint:md

如果改动 CLI 注册表、示例索引或模板目录，也运行:
  npm run test
  npm run templates:publish-check

公开安全边界:
- 不提交 token、API key、cookie、密码
- 不提交客户信息、内部日志、未公开源码或个人隐私
- 真实经验请匿名化后再写进示例或文档
`);
}

function listLaunchChecklist() {
  const metrics = collectOpenSourceMetrics();
  const externalMergedPrs = metrics.externalMergedPrsKnown
    ? String(metrics.externalMergedPrs)
    : "unknown";
  const packageVersion = metrics.npmVersion;
  const externalFeedback = metrics.feedbackIssuesKnown
    ? String(metrics.externalFeedbackIssues)
    : "unknown";
  console.log(`社区发布入口

Community Launch Pack:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/community-launch-pack.md

当前可公开状态:
- npm package: https://www.npmjs.com/package/ai-devtools-cn (version ${packageVersion})
- GitHub latest release: https://github.com/ONEISALL7/ai-devtools-cn/releases
- 外部反馈: 已有 ${externalFeedback} 条公开 feedback issue（已按非 maintainer 作者过滤）
- external merged PR: 当前为 ${externalMergedPrs}（仅计入非 maintainer 外部贡献者 PR）

当前 npm 包未同步时，先用 clone 路径:
  git clone https://github.com/ONEISALL7/ai-devtools-cn.git
  cd ai-devtools-cn
  npm install
  npm run templates:doctor
  npm run templates:examples
  npm run templates:recommend -- ci
  npm run templates:trial -- --template pr-review --output work/trial

npm 同步后可改用 npx:
  npx ai-devtools-cn doctor
  npx ai-devtools-cn examples
  npx ai-devtools-cn recommend ci
  npx ai-devtools-cn trial --template pr-review --output work/trial

外部反馈入口:
${templateFeedbackUrl}

Good First PR Briefs:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

#51 发布后记录:
https://github.com/ONEISALL7/ai-devtools-cn/issues/51

记录原则:
- 真实试用者提交的 feedback issue 可以计入外部反馈
- 外部贡献者提交并合并的 PR 才能计入 external merged PR
- 维护者基于外部反馈完成的 PR 可以写成 feedback-driven PR，但不能写成外部 PR
- 不记录 token、API key、客户信息、内部日志、未公开源码或个人隐私
`);
}

function showPublishStatus() {
  const manifest = readPackageManifest();
  const localVersion = manifest.version;
  const packageName = manifest.name;
  const npmVersion = getVersionFromEnvOrCommand(
    "AI_DEVTOOLS_CN_NPM_VERSION",
    "npm",
    ["view", packageName, "version", "--strict-ssl=false"],
  );
  const releaseVersion = getVersionFromEnvOrCommand(
    "AI_DEVTOOLS_CN_RELEASE_VERSION",
    "gh",
    ["release", "view", "--repo", repo, "--json", "tagName", "-q", ".tagName"],
  );
  const npmValue = npmVersion.ok ? npmVersion.value : "unavailable";
  const releaseValue = releaseVersion.ok ? releaseVersion.value : "unavailable";
  const commitsAfterRelease = getCommitsAfterRelease(releaseValue);
  const commitsAfterReleaseValue = commitsAfterRelease.ok ? commitsAfterRelease.value : "unavailable";
  const sourceAheadOfRelease = commitsAfterRelease.ok && Number.parseInt(commitsAfterRelease.value, 10) > 0;
  const npmMatchesLocal = npmVersion.ok && npmValue === localVersion;
  const releaseMatchesLocal = releaseVersion.ok && releaseValue.replace(/^v/, "") === localVersion;
  const status = npmMatchesLocal
    ? "npm matches local package.json"
    : "npm is behind local package.json";

  console.log(`AI DevTools CN publish status

Local package.json: ${localVersion}
npm package: ${npmValue}
GitHub latest release: ${releaseValue}
Commits after latest release: ${commitsAfterReleaseValue}

Status: ${status}

Release alignment:
- npm ${npmMatchesLocal ? "matches" : "does not match"} local package.json
- GitHub latest release ${releaseMatchesLocal ? "matches" : "does not match"} local package.json
- source ${sourceAheadOfRelease ? "is ahead of latest release tag" : "is not ahead of latest release tag"}

Before sending npx commands to external users, npm package should match local package.json.
If source is ahead of the latest release tag, create a new release before publishing current main to npm.

Next commands if npm is behind:
  npm run test
  npm run templates:publish-check
  npm run pack:dry-run
  npm publish --dry-run --access public
  npm publish --access public
  npm view ${packageName} version

Post-publish smoke checks:
  npx ai-devtools-cn doctor
  npx ai-devtools-cn contribute
  npx ai-devtools-cn pr-pack 45
  npx ai-devtools-cn recipes ci-failure

Evidence note:
- Record the final npm version, publish time, and smoke-check commands in the release or npm publish issue.
- Do not claim new npx commands are publicly available until npm package matches local package.json.
`);
}

function getCommitsAfterRelease(releaseValue) {
  const envValue = process.env.AI_DEVTOOLS_CN_COMMITS_AFTER_RELEASE;
  if (envValue) {
    return { ok: true, value: envValue.trim() };
  }
  if (!releaseValue || releaseValue === "unavailable") {
    return { ok: false };
  }

  try {
    const value = execFileSync("git", ["-C", packageRoot, "rev-list", "--count", `${releaseValue}..HEAD`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}

function showHandoffKit(options = {}) {
  const brief = options.issue ? requireGoodFirstPrBrief(options.issue) : null;
  const content = brief ? formatIssueHandoffKit(brief) : formatHandoffKit();

  if (options.output) {
    const resolvedOutput = resolveOutputPath(options.output);
    if (existsSync(resolvedOutput) && !options.force) {
      fail(`输出文件已存在：${options.output}\n如需覆盖，请加 --force。`);
    }

    mkdirSync(path.dirname(resolvedOutput), { recursive: true });
    writeFileSync(resolvedOutput, content, "utf8");
    console.log(`已生成外部 PR 交接包：${formatDisplayPath(resolvedOutput)}`);
    return;
  }

  console.log(content);
}

function createPrPackDraft(issueNumber, options = {}) {
  const brief = requireGoodFirstPrBrief(options.issue ?? issueNumber);
  const content = formatPrPackDraft(brief);

  if (options.output) {
    const resolvedOutput = resolveOutputPath(options.output);
    if (existsSync(resolvedOutput) && !options.force) {
      fail(`输出文件已存在：${options.output}\n如需覆盖，请加 --force。`);
    }

    mkdirSync(path.dirname(resolvedOutput), { recursive: true });
    writeFileSync(resolvedOutput, content, "utf8");
    console.log(`已生成外部贡献者 PR 包：${formatDisplayPath(resolvedOutput)}`);
    return;
  }

  console.log(content);
}

function formatPrPackDraft(brief) {
  const issueNumber = brief.issue.replace("#", "");
  const branchName = formatBranchSlug(brief.suggestedTitle);
  const files = brief.files.map((file) => `- ${file}`).join("\n");

  return `# 外部贡献者 PR 包：${brief.issue} ${brief.title}

这个包用于发给一位真实外部贡献者，让对方用自己的 GitHub 账号理解任务、修改内容、运行验证并提交 PR。它不是代发补丁，也不能把维护者自己的草稿算成 external merged PR。

Issue:
${brief.url}

Brief:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/${brief.brief}

Suggested PR title:
${brief.suggestedTitle}

Branch: ${branchName}

## Files to change

${files}

## Message to send

\`\`\`text
我想邀请你帮 AI DevTools CN 提交一个很小的外部 PR。

任务：${brief.issue} ${brief.title}
Issue: ${brief.url}
Brief: https://github.com/ONEISALL7/ai-devtools-cn/blob/main/${brief.brief}

建议 PR 标题：
${brief.suggestedTitle}

建议分支名：
${branchName}

建议修改文件：
${brief.files.map((file) => `- ${file}`).join("\n")}

你可以先运行：
git clone https://github.com/ONEISALL7/ai-devtools-cn.git
cd ai-devtools-cn
npm install
npm run templates:claim -- ${issueNumber} --output work/claim-${issueNumber}.md
npm run templates:starter -- ${issueNumber} --output work/starter-${issueNumber}.md

提交前至少运行：
npm run lint:md

请不要提交 token、客户信息、内部日志、未公开源码或个人隐私。内容请用你理解后的版本提交，不要把别人写好的补丁原样代发。
\`\`\`

## Contributor steps

1. 在 ${brief.issue} 下留言认领。
2. Fork 仓库到自己的 GitHub 账号。
3. 创建分支：\`${branchName}\`。
4. 按 brief 和建议文件完成一个小而真实的改动。
5. 运行验证命令。
6. 从自己的 fork 向 \`ONEISALL7/ai-devtools-cn:main\` 打开 PR。
7. 在 PR 描述里写 \`Closes ${brief.issue}\`，并贴出验证命令结果。

## PR description to copy

\`\`\`text
Closes ${brief.issue}

Summary:
- Added ...
- Updated ...

Why this helps:
- This makes ${brief.title} easier for real users to copy, review, or validate.

Validation:
- npm run lint:md

Safety:
- No tokens, private logs, customer data, or unpublished source code are included.
\`\`\`

## Maintainer review checklist

- [ ] PR 作者不是维护者本人、备用账号或机器人。
- [ ] PR 关联了 ${brief.issue}，并且改动内容与 issue 一致。
- [ ] 贡献者能解释自己的改动，不是原样代发维护者补丁。
- [ ] 内容没有 token、客户信息、内部日志、未公开源码或个人隐私。
- [ ] PR 描述包含验证命令。
- [ ] 合并后再记录为 External merged PRs。

只能由外部贡献者用自己的 GitHub 账号提交、通过 review 并合并的 PR，才能记录为 External merged PRs。
`;
}

function formatIssueHandoffKit(brief) {
  const issueNumber = brief.issue.replace("#", "");

  return `# 针对 ${brief.issue} 的外部 PR 交接包

Issue:
${brief.url}

Brief:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/${brief.brief}

Suggested PR title:
${brief.suggestedTitle}

## 可直接发送的邀请

\`\`\`text
我在维护中文开源项目 AI DevTools CN，想邀请你帮忙提交一个很小的外部 PR。

这次建议认领：${brief.issue} ${brief.title}
Issue: ${brief.url}
Brief: https://github.com/ONEISALL7/ai-devtools-cn/blob/main/${brief.brief}

你可以先运行：
git clone https://github.com/ONEISALL7/ai-devtools-cn.git
cd ai-devtools-cn
npm install
npm run templates:claim -- ${issueNumber} --output work/claim-${issueNumber}.md
npm run templates:starter -- ${issueNumber} --output work/starter-${issueNumber}.md

提交前至少运行：
npm run lint:md

如果改动 CLI、模板索引或示例索引，也运行：
npm run test
npm run templates:publish-check

请不要提交 token、客户信息、内部日志、未公开源码或个人隐私。
\`\`\`

## 贡献者步骤

1. 在 ${brief.issue} 下留言说明想认领。
2. Fork 仓库到自己的 GitHub 账号。
3. 创建分支，例如 \`${formatBranchSlug(brief.suggestedTitle)}\`。
4. 按 brief 完成一个小而可 review 的改动。
5. 本地运行验证命令。
6. 从自己的 fork 向 ONEISALL7/ai-devtools-cn:main 打开 PR。
7. PR 描述写 \`Closes ${brief.issue}\`，并贴出验证命令。

## PR 描述模板

\`\`\`text
Closes ${brief.issue}

Summary:
- Added ...

Why this helps:
- This makes ${brief.title} easier for real users to copy or validate.

Validation:
- npm run lint:md

Safety:
- No tokens, private logs, customer data, or unpublished source code are included.
\`\`\`

## Evidence boundary

- 只有这个外部贡献者用自己的 GitHub 账号提交并合并的 PR，才能记录为 External merged PRs。
- 维护者本地生成的 claim、starter 或 handoff 草稿不能计入 external merged PR。
- 如果对方只提交反馈 issue，可以记录为 external feedback issue，但不能写成外部 PR。
`;
}

function formatHandoffKit() {
  return `# 外部 PR 交接包

Document:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/external-pr-handoff-kit.md

Good First PR Briefs:
https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/good-first-pr-briefs.md

## 可直接发送的邀请

\`\`\`text
我在维护一个中文开源项目 AI DevTools CN，想邀请你帮忙提交一个很小的外部 PR。

项目地址：
https://github.com/ONEISALL7/ai-devtools-cn

你可以从 #45-#49 中任选一个 good first issue：
https://github.com/ONEISALL7/ai-devtools-cn/issues/45
https://github.com/ONEISALL7/ai-devtools-cn/issues/46
https://github.com/ONEISALL7/ai-devtools-cn/issues/47
https://github.com/ONEISALL7/ai-devtools-cn/issues/48
https://github.com/ONEISALL7/ai-devtools-cn/issues/49

选定 issue 后可以先运行：
git clone https://github.com/ONEISALL7/ai-devtools-cn.git
cd ai-devtools-cn
npm install
npm run templates:claim -- 45 --output work/claim-45.md
npm run templates:starter -- 45 --output work/starter-45.md

把 45 换成你认领的 issue 编号。提交前至少运行：
npm run lint:md
\`\`\`

## 外部贡献者步骤

1. 选择一个 good first issue。
2. 在 issue 下留言说明想认领。
3. Fork 仓库到自己的 GitHub 账号。
4. 创建分支并按 brief 修改建议文件。
5. 本地运行验证命令。
6. 从自己的 fork 向 ONEISALL7/ai-devtools-cn:main 打开 PR。
7. 在 PR 描述里写 Closes #issue-number，并贴出验证命令。

## 验证命令

\`\`\`bash
npm install
npm run lint:md
\`\`\`

如果改动 CLI、模板索引或示例索引，也运行：

\`\`\`bash
npm run test
npm run templates:publish-check
\`\`\`

## Evidence boundary

- External merged PRs 只能来自非维护者账号提交、review 后合并的真实 PR。
- 不能把维护者自己的 PR、维护者生成的本地草稿、测试账号或代发补丁写成 external merged PR。
- 反馈 issue 可以作为外部反馈，但不能自动算作外部 PR。
- 不提交 token、API key、cookie、密码、客户信息、内部日志、未公开源码或个人隐私。

## PR 描述模板

\`\`\`text
Closes #issue-number

Summary:
- Added ...
- Updated ...

Validation:
- npm run lint:md

Notes:
- The example uses anonymized/public-safe details.
- No tokens, private logs, customer data, or unpublished source code are included.
\`\`\`

## External PR 记录字段

\`\`\`text
External PR:
- Contributor:
- Issue:
- PR:
- Scope:
- Validation:
- Release:
\`\`\`
`;
}

function createExternalPrReviewChecklist(options) {
  const content = formatExternalPrReviewChecklist(options);

  if (options.output) {
    const resolvedOutput = resolveOutputPath(options.output);
    if (existsSync(resolvedOutput) && !options.force) {
      fail(`输出文件已存在：${options.output}\n如需覆盖，请加 --force。`);
    }

    mkdirSync(path.dirname(resolvedOutput), { recursive: true });
    writeFileSync(resolvedOutput, content, "utf8");
    console.log(`已生成外部 PR review 清单：${formatDisplayPath(resolvedOutput)}`);
    return;
  }

  console.log(content);
}

function formatExternalPrReviewChecklist(options) {
  const prValue = options.pr ?? "请填写 PR 编号或链接";
  const authorValue = options.author ?? "请填写贡献者 GitHub 用户名";
  const issueValue = options.issue
    ? (options.issue.startsWith("#") ? options.issue : `#${options.issue}`)
    : "请填写关联 issue";

  return `# 外部 PR review 清单

PR: ${prValue}
Author: ${authorValue}
Related issue: ${issueValue}

这个清单用于 review 真实外部贡献者提交的 PR，并判断它能否记录为 External merged PRs。它不会自动调用 GitHub API，也不会把维护者自己的 PR 变成外部贡献。

## 真实性检查

- [ ] PR 作者不是本仓库维护者本人或维护者控制的备用账号。
- [ ] PR 有明确改动内容，不是空提交、格式噪音或代发补丁。
- [ ] PR 关联公开 issue、brief、反馈 issue 或清楚的贡献背景。
- [ ] 贡献者理解改动内容，能回应 review 反馈。
- [ ] 如果 PR 来自私聊协助，已确认没有把维护者本地补丁原样代发。

## 公开安全检查

- [ ] 没有 token、API key、cookie、密码或登录信息。
- [ ] 没有客户名称、内部域名、私有仓库链接或未公开源码。
- [ ] 日志、路径、服务名和人员信息已经匿名化。
- [ ] 示例或文档能帮助其他开发者复制到自己的维护场景。

## 验证命令

\`\`\`bash
npm install
npm run lint:md
\`\`\`

如果改动 CLI、模板索引、示例索引或 npm 包内容，也运行：

\`\`\`bash
npm run test
npm run templates:publish-check
npm run pack:dry-run
\`\`\`

## Review 决策

- [ ] Request changes：需要修正准确性、安全边界、链接或验证。
- [ ] Comment：只需要非阻塞建议。
- [ ] Approve：内容可公开、验证通过、对用户有实际帮助。
- [ ] Merge：合并后关闭关联 issue，并在必要时加入 release note。

## 可复制 review 评论

\`\`\`text
Thanks for the contribution. I checked the scope, public safety boundary, and validation commands.

Please confirm:
- The example does not include tokens, private logs, customer data, or unpublished source code.
- The validation commands listed in the PR were run locally.
- The PR is based on your own contribution, not a maintainer-authored patch.
\`\`\`

## evidence ledger 记录

\`\`\`text
External PR:
- Contributor: ${authorValue}
- Issue: ${issueValue}
- PR: ${prValue}
- Scope:
- Validation:
- Release:
\`\`\`

只有合并后的真实外部 PR 才能记录为 External merged PRs。不能把维护者自己的 PR、未合并 PR、反馈 issue、claim/starter/handoff 草稿写成 external merged PR。
`;
}

function createClaimDraft(issueNumber, options) {
  const brief = requireGoodFirstPrBrief(issueNumber);
  const issueLabel = brief.issue.replace("#", "");
  const outputPath = options.output ?? path.join("work", `claim-${issueLabel}.md`);
  const resolvedOutput = resolveOutputPath(outputPath);

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${outputPath}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(resolvedOutput, formatClaimDraft(brief), "utf8");
  console.log(`已生成认领草稿：${formatDisplayPath(resolvedOutput)}`);
}

function createStarterDraft(issueNumber, options) {
  const brief = requireGoodFirstPrBrief(issueNumber);
  const issueLabel = brief.issue.replace("#", "");
  const outputPath = options.output ?? path.join("work", `starter-${issueLabel}.md`);
  const resolvedOutput = resolveOutputPath(outputPath);

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${outputPath}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(resolvedOutput, formatStarterDraft(brief), "utf8");
  console.log(`已生成贡献起稿：${formatDisplayPath(resolvedOutput)}`);
}

function formatClaimDraft(brief) {
  return `# ${brief.title} 认领草稿

> Good First Issue ${brief.issue}
> Issue: ${brief.url}
> Brief: https://github.com/ONEISALL7/ai-devtools-cn/blob/main/${brief.brief}

这个草稿用于外部贡献者准备一个小而真实的 PR。它不会自动创建 issue、branch 或 PR，也不能把这个草稿计入 external merged PR。

## 建议 PR 标题

\`\`\`text
${brief.suggestedTitle}
\`\`\`

## 开始前检查

- [ ] 我不是本仓库维护者本人，或者不会把这个维护者草稿计入 external merged PR。
- [ ] 我会在 issue ${brief.issue} 下留言说明想认领。
- [ ] 我不会提交 token、API key、cookie、客户信息、内部日志、未公开源码或个人隐私。
- [ ] 如果使用真实经验，我会先匿名化项目名、服务名、日志和人员信息。

## 推荐验证命令

\`\`\`bash
npm install
npm run lint:md
\`\`\`

如果改动 CLI 注册表、示例索引或模板目录，也运行：

\`\`\`bash
npm run test
npm run templates:publish-check
\`\`\`

## PR 描述草稿

\`\`\`text
Closes ${brief.issue}

Summary:
- [填写本次改动]

Why this helps:
- [填写对外部用户或维护者的帮助]

Validation:
- npm run lint:md
\`\`\`

## 提交后维护者记录

- PR 作者是否为外部贡献者：
- PR 链接：
- 是否合并：
- 是否可以记录为 external merged PR：
`;
}

function formatStarterDraft(brief) {
  const profile = getStarterProfile(brief.issue);

  return `# ${brief.title}

> Good First Issue ${brief.issue}
> Issue: ${brief.url}
> Brief: https://github.com/ONEISALL7/ai-devtools-cn/blob/main/${brief.brief}
> Suggested PR title: ${brief.suggestedTitle}

这个文件是给外部贡献者的本地起稿骨架。它不是 external merged PR；只有真实外部贡献者提交并合并的 GitHub PR 才能计入 external merged PR。

## 使用模板

- 推荐模板：${profile.templateName}
- 模板路径：${profile.templatePath}
- 目标产物：${profile.outputTarget}

## 场景背景

${profile.contextPrompt}

## 输入材料

${profile.inputPrompt}

## 建议输出结构

${profile.outputPrompt}

## 公开安全检查

- [ ] 没有 token、API key、cookie、密码或登录信息。
- [ ] 没有客户名称、内部域名、私有仓库链接或未公开源码。
- [ ] 日志、路径、服务名和人员信息已经匿名化。
- [ ] 示例能帮助其他开发者复制到自己的维护场景。

## 本地验证

\`\`\`bash
npm install
npm run lint:md
\`\`\`

如果改动 CLI 注册表、示例索引或模板目录，也运行：

\`\`\`bash
npm run test
npm run templates:publish-check
\`\`\`

## PR checklist

- [ ] 在 ${brief.issue} 下留言说明认领。
- [ ] PR 标题使用或接近：${brief.suggestedTitle}
- [ ] PR 描述写明 \`Closes ${brief.issue}\`。
- [ ] PR 描述列出实际验证命令。
- [ ] 如果使用真实经验，已完成匿名化。
`;
}

function getStarterProfile(issue) {
  const profiles = {
    "#45": {
      templateName: "CI 排错模板",
      templatePath: "templates/ci-troubleshooting-template.md",
      outputTarget: "examples/case-studies/node-ci-troubleshooting.md",
      contextPrompt: "写清楚项目类型、Node.js/npm/pnpm 版本、CI 平台、失败发生在 install、lint、test、build 还是 release 阶段。",
      inputPrompt: "粘贴公开安全的失败日志片段，至少包含错误行、相关命令和本地复现结果。不要粘贴 token、内部仓库地址或客户日志。",
      outputPrompt: "建议包含：失败日志片段、初步判断、最小修复方案、验证命令、为什么不能用跳过 CI 或删除检查绕过问题。",
    },
    "#46": {
      templateName: "依赖升级风险模板",
      templatePath: "templates/dependency-upgrade-risk-template.md",
      outputTarget: "examples/dependency-upgrade-risk-example.md",
      contextPrompt: "写清楚依赖名称、当前版本、目标版本、升级原因，以及它影响运行时依赖还是开发依赖。",
      inputPrompt: "列出 changelog、breaking changes、lockfile 变化、测试范围和回滚方式。不要包含私有包名或内部 registry token。",
      outputPrompt: "建议包含：升级背景、风险点、验证计划、回滚方案、release 注意事项和是否建议合并。",
    },
    "#47": {
      templateName: "用户反馈整理模板",
      templatePath: "docs/feedback.md",
      outputTarget: "docs/feedback-case-guide.md",
      contextPrompt: "写清楚反馈来源、使用的模板或 CLI 命令、用户角色，以及反馈是否公开可核验。",
      inputPrompt: "整理匿名化后的反馈摘要、对应 issue/PR 链接、后续改进动作和不能公开的信息边界。",
      outputPrompt: "建议包含：反馈记录格式、可计入外部反馈的条件、不能计入的内容、维护者 triage checklist。",
    },
    "#48": {
      templateName: "PR Review 模板",
      templatePath: "templates/pr-review-template.md",
      outputTarget: "examples/python-pr-review-example.md",
      contextPrompt: "写清楚 Python 项目类型、改动范围、测试工具、目标 review 重点，例如 API 兼容性、异常处理或测试覆盖。",
      inputPrompt: "提供公开安全的 diff 摘要、文件类型、测试结果和约束。不要包含私有源码或真实客户数据。",
      outputPrompt: "建议包含：review 关注点、必须修改项、建议修改项、验证命令和可直接放进 PR 的 review 评论。",
    },
    "#49": {
      templateName: "README 改进模板",
      templatePath: "templates/readme-improvement-template.md",
      outputTarget: "examples/frontend-readme-improvement-example.md",
      contextPrompt: "写清楚前端项目类型、安装方式、启动命令、目标用户和当前 README 的主要缺口。",
      inputPrompt: "列出现有 README 片段、缺失步骤、常见失败点和期望新用户完成的第一个动作。",
      outputPrompt: "建议包含：新的快速开始结构、环境要求、常见问题、验证方式和 README 改进前后对比。",
    },
  };

  return profiles[issue];
}

function showTemplate(slug) {
  const template = requireTemplate(slug);
  console.log(`${template.title}

slug: ${template.slug}
file: ${template.file}
use case: ${template.useCase}
output: ${template.output}

Preview:
${readTemplate(template).slice(0, 1200).trim()}
`);
}

function searchTemplates(keyword) {
  if (!keyword) {
    fail("请提供搜索关键词，例如：npm run templates:search -- ci");
  }

  const matches = getMatchingTemplates(keyword);

  if (matches.length === 0) {
    fail(`没有找到匹配模板：${keyword}`);
  }

  listTemplates(matches);
}

function recommend(keyword) {
  if (!keyword) {
    fail("请提供任务关键词，例如：npm run templates:recommend -- ci");
  }

  const templateMatches = getMatchingTemplates(keyword);
  const exampleMatches = getMatchingExamples(keyword);
  const recommendedTemplates = [...templateMatches];

  for (const match of exampleMatches) {
    if (!match.item.templateSlug) {
      continue;
    }
    const template = findTemplate(match.item.templateSlug);
    if (template && !recommendedTemplates.some((item) => item.slug === template.slug)) {
      recommendedTemplates.push(template);
    }
  }

  if (recommendedTemplates.length === 0 && exampleMatches.length === 0) {
    fail(`没有找到匹配模板或案例：${keyword}`);
  }

  console.log(`推荐结果：${keyword}`);
  console.log("");

  if (recommendedTemplates.length > 0) {
    console.log("Recommended templates:");
    for (const template of recommendedTemplates) {
      console.log(`- ${template.slug}: ${template.title}
  用途：${template.useCase}
  下一步：npm run templates:show -- ${template.slug}
  生成：npm run templates:new -- ${template.slug} --output work/${template.slug}.md
`);
    }
  }

  if (exampleMatches.length > 0) {
    console.log("Recommended examples:");
    for (const match of exampleMatches) {
      console.log(`- ${match.item.slug}: ${match.item.title}
  分组：${match.group}
  用途：${match.item.useCase}
  文件：${match.item.file}
`);
    }
  }

  console.log("Recommended trial command:");
  const trialTemplate = recommendedTemplates[0]?.slug ?? "pr-review";
  console.log(`  npm run templates:trial -- --template ${trialTemplate} --scenario "${keyword}" --output work/trial`);
}

function createWorkingDraft(slug, options) {
  const template = requireTemplate(slug);
  const outputPath = options.output ?? path.join("work", `${template.slug}-draft.md`);
  const resolvedOutput = resolveOutputPath(outputPath);

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${outputPath}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(resolvedOutput, formatWorkingDraft(template), "utf8");
  console.log(`已生成工作稿：${formatDisplayPath(resolvedOutput)}`);
}

function createKit(slug, options) {
  const kit = requireKit(slug);
  const outputPath = options.output ?? path.join("work", `${kit.slug}-kit`);
  const resolvedOutput = resolveOutputPath(outputPath);
  const kitTemplates = kit.templateSlugs.map((templateSlug) => requireTemplate(templateSlug));
  const files = [
    {
      name: "README.md",
      content: formatKitReadme(kit, kitTemplates),
    },
    ...kitTemplates.map((template) => ({
      name: `${template.slug}.md`,
      content: formatWorkingDraft(template),
    })),
  ];

  const conflicts = files
    .map((file) => path.join(resolvedOutput, file.name))
    .filter((filePath) => existsSync(filePath));

  if (conflicts.length > 0 && !options.force) {
    fail(`输出文件已存在：\n${conflicts.map((filePath) => `- ${formatDisplayPath(filePath)}`).join("\n")}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(resolvedOutput, { recursive: true });
  for (const file of files) {
    writeFileSync(path.join(resolvedOutput, file.name), file.content, "utf8");
  }

  console.log(`已生成工作包：${formatDisplayPath(resolvedOutput)}`);
  for (const file of files) {
    console.log(`- ${path.join(formatDisplayPath(resolvedOutput), file.name)}`);
  }
}

function createTrialPack(options) {
  const template = options.template ? requireTemplate(options.template) : requireTemplate("pr-review");
  const outputPath = options.output ?? path.join("work", "ai-devtools-cn-trial");
  const resolvedOutput = resolveOutputPath(outputPath);
  const files = [
    {
      name: "README.md",
      content: formatTrialReadme(template, options),
    },
    {
      name: `${template.slug}.md`,
      content: formatWorkingDraft(template),
    },
    {
      name: "feedback.md",
      content: formatFeedbackDraft(template, options),
    },
  ];

  const conflicts = files
    .map((file) => path.join(resolvedOutput, file.name))
    .filter((filePath) => existsSync(filePath));

  if (conflicts.length > 0 && !options.force) {
    fail(`输出文件已存在：\n${conflicts.map((filePath) => `- ${formatDisplayPath(filePath)}`).join("\n")}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(resolvedOutput, { recursive: true });
  for (const file of files) {
    writeFileSync(path.join(resolvedOutput, file.name), file.content, "utf8");
  }

  console.log(`已生成试用包：${formatDisplayPath(resolvedOutput)}`);
  for (const file of files) {
    console.log(`- ${path.join(formatDisplayPath(resolvedOutput), file.name)}`);
  }
}

function createOpenAICodexReadiness(options = {}) {
  const outputPath = options.output ?? path.join("work", `openai-readiness-${formatSnapshotDate()}.md`);
  const resolvedOutput = resolveOutputPath(outputPath);

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${formatDisplayPath(resolvedOutput)}\n如需覆盖，请加 --force。`);
  }

  const packageJson = readPackageManifest();
  const metricSnapshot = collectOpenSourceMetrics();
  const requiredFileReport = collectRequiredFileReport(openaiReadinessRequiredFiles);

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(
    resolvedOutput,
    formatOpenAICodexReadiness({
      packageName: packageJson.name,
      packageVersion: packageJson.version,
      metricSnapshot,
      requiredFileReport,
      date: formatSnapshotDate(),
    }),
    "utf8",
  );

  console.log(`已生成 OpenAI Codex for Open Source 资格申请材料：${formatDisplayPath(resolvedOutput)}`);
}

function formatOpenAICodexReadiness({
  packageName,
  packageVersion,
  metricSnapshot,
  requiredFileReport,
  date,
}) {
  const requiredRows = requiredFileReport
    .map((item) => `- ${item.file}：${item.exists ? "✅" : "❌"}`)
    .join("\n");
  const allFilesPresent = requiredFileReport.every((item) => item.exists);
  const isPublic = String(metricSnapshot.repoVisibility ?? "").toLowerCase() === "public";
  const readinessTip = allFilesPresent && isPublic
    ? "✅ 可满足申请材料基础条件（文件与公开状态）"
    : "⚠️ 基础条件仍需补齐（请确认缺失项后再提交）";

  return `# OpenAI Codex for Open Source 资格申请材料（AI DevTools CN）

生成日期：${date}

## 一、项目定位（可直接放进申请）

- 项目：\`ai-devtools-cn\`
- 仓库：${metricSnapshot.repoUrl}
- 发布：\`${packageName}@${packageVersion}\`
- 公开仓库状态：${metricSnapshot.repoVisibility}

## 二、资格自检

${readinessTip}

### 必备文件

${requiredRows}

### 当前可核验指标（用于周更和申请核对）

| 指标 | 值 |
| --- | --- |
| Stars | ${metricSnapshot.stars} |
| Forks | ${metricSnapshot.forks} |
| Merged PRs | ${metricSnapshot.mergedPrsKnown ? metricSnapshot.mergedPrs : "unknown"} |
| External merged PRs（非 maintainer） | ${metricSnapshot.externalMergedPrsKnown ? metricSnapshot.externalMergedPrs : "unknown"} |
| Open issues | ${metricSnapshot.openIssues} |
| Closed issues | ${metricSnapshot.closedIssues} |
| Feedback-labeled issues（全部） | ${metricSnapshot.feedbackIssuesKnown ? metricSnapshot.feedbackIssues : "unknown"} |
| External feedback issues（非 maintainer） | ${metricSnapshot.feedbackIssuesKnown ? metricSnapshot.externalFeedbackIssues : "unknown"} |
| Releases（已发布） | ${metricSnapshot.releasesKnown ? metricSnapshot.releases : "unknown"} |
| npm package | ${metricSnapshot.npmVersion} |
| npm monthly downloads | ${metricSnapshot.npmDownloads} |

> 说明：若某项显示 unknown，请重跑并在网络可用时补齐。

## 三、申请文本（可直接复制）

### Describe your role

\`\`\`text
${readinessTemplate.roleText}
\`\`\`

### Why does this repository qualify?

\`\`\`text
${readinessTemplate.qualifyText}
\`\`\`

### How will you use API credits?

\`\`\`text
${readinessTemplate.creditsText}
\`\`\`

## 四、外部证据边界（请勿把 maintainer 自测当作外部采用）

- 外部反馈需为非 maintainer 账号在公开场景提交的 issue/comment/PR。
- external merged PR 只算非 maintainer 作者提交并合并的 PR。
- 外部反馈驱动的 maintainer 维护行动可计入反馈驱动改进，但不能替代 external merged PR。
- 本地草稿（claim/starter/new/trial/feedback/outreach）仅用于准备，不应直接计入外部 PR。

## 五、下一步

1. 运行 \`npm run metrics:snapshot -- --output work/metrics-${date}.md\`。
2. 运行 \`npm run templates:evidence -- --output work/external-evidence-${date}.md\`。
3. 邀请真实用户提交至少 2 条外部 feedback issue 并记录来源链接。
4. 邀请真实用户认领 good first issue，争取 ≥1 条 external merged PR。`;
}

function collectOpenSourceMetrics() {
  const repoInfo = getJsonFromEnvOrCommand(
    "AI_DEVTOOLS_CN_REPO_INFO_JSON",
    "gh",
    ["repo", "view", repo, "--json", "stargazerCount,forkCount,isPrivate,visibility,url,description"],
  );
  const mergedPrs = getJsonFromEnvOrCommand(
    "AI_DEVTOOLS_CN_MERGED_PRS_JSON",
    "gh",
    ["pr", "list", "--repo", repo, "--state", "merged", "--limit", "1000", "--json", "number,title,author,mergedAt"],
  );
  const closedIssues = getJsonFromEnvOrCommand(
    "AI_DEVTOOLS_CN_CLOSED_ISSUES_JSON",
    "gh",
    ["issue", "list", "--repo", repo, "--state", "closed", "--limit", "1000", "--json", "number,title,labels,author,closedAt"],
  );
  const openIssues = getJsonFromEnvOrCommand(
    "AI_DEVTOOLS_CN_OPEN_ISSUES_JSON",
    "gh",
    ["issue", "list", "--repo", repo, "--state", "open", "--limit", "1000", "--json", "number,title,labels,author,createdAt"],
  );
  const releases = getJsonFromEnvOrCommand(
    "AI_DEVTOOLS_CN_RELEASES_JSON",
    "gh",
    ["release", "list", "--repo", repo, "--limit", "1000", "--json", "tagName,name,publishedAt"],
  );
  const npmVersion = getVersionFromEnvOrCommand(
    "AI_DEVTOOLS_CN_NPM_VERSION",
    "npm",
    ["view", "ai-devtools-cn", "version", "--strict-ssl=false"],
  );
  const npmDownloads = getNpmDownloadsForReadiness();

  const mergedPrItems = mergedPrs.ok ? mergedPrs.value : [];
  const closedIssueItems = closedIssues.ok ? closedIssues.value : [];
  const openIssueItems = openIssues.ok ? openIssues.value : [];
  const allIssues = [...closedIssueItems, ...openIssueItems];
  const feedbackIssues = allIssues.filter((issue) => hasLabel(issue, "feedback"));
  const externalFeedbackIssues = feedbackIssues.filter((issue) => isExternalHumanAuthor(issue.author));
  const externalMergedPrs = mergedPrItems.filter((pr) => isExternalHumanAuthor(pr.author));
  const sortedExternalFeedbackIssues = [...externalFeedbackIssues].sort((a, b) => {
    const aTime = Date.parse(a.createdAt ?? 0);
    const bTime = Date.parse(b.createdAt ?? 0);
    return Number.isFinite(bTime) && Number.isFinite(aTime) ? bTime - aTime : 0;
  });
  const sortedExternalMergedPrs = [...externalMergedPrs].sort((a, b) => {
    const aTime = Date.parse(a.mergedAt ?? 0);
    const bTime = Date.parse(b.mergedAt ?? 0);
    return Number.isFinite(bTime) && Number.isFinite(aTime) ? bTime - aTime : 0;
  });
  const recentExternalFeedbackIssues = sortedExternalFeedbackIssues.slice(0, 6).map((issue) => ({
    number: issue.number,
    title: issue.title,
    author: issue.author?.login || "unknown",
    date: (issue.createdAt || issue.closedAt || issue.updatedAt || "unknown").slice(0, 10),
  }));
  const recentExternalMergedPrs = sortedExternalMergedPrs.slice(0, 6).map((pr) => ({
    number: pr.number,
    title: pr.title,
    author: pr.author?.login || "unknown",
    date: pr.mergedAt ? pr.mergedAt.slice(0, 10) : "unknown",
  }));
  const latestRelease = releases.ok ? releases.value[0] : null;
  const normalizedVisibility = toSafeValue(repoInfo.ok ? repoInfo.value?.visibility : "", "private").toLowerCase();
  const feedbackIssuesKnown = mergedIssueEvidenceKnown(closedIssues, openIssues);

  return {
    stars: repoInfo.ok ? toSafeValue(repoInfo.value?.stargazerCount) : "unknown",
    forks: repoInfo.ok ? toSafeValue(repoInfo.value?.forkCount) : "unknown",
    repoVisibility: normalizedVisibility || (repoInfo.ok ? toSafeValue(repoInfo.value?.visibility, "unknown") : "unknown"),
    repoUrl: repoInfo.ok ? toSafeValue(repoInfo.value?.url, `https://github.com/${repo}`) : `https://github.com/${repo}`,
    mergedPrs: mergedPrItems.length,
    mergedPrsKnown: mergedPrs.ok,
    externalMergedPrs: externalMergedPrs.length,
    externalMergedPrsKnown: mergedPrs.ok,
    openIssues: openIssues.ok ? openIssueItems.length : "unknown",
    closedIssues: closedIssues.ok ? closedIssueItems.length : "unknown",
    feedbackIssues: feedbackIssues.length,
    recentExternalFeedbackIssues,
    feedbackIssuesKnown: feedbackIssuesKnown,
    externalFeedbackIssues: externalFeedbackIssues.length,
    recentExternalMergedPrs,
    latestReleaseTag: latestRelease?.tagName ?? null,
    latestReleaseDate: latestRelease?.publishedAt ? latestRelease.publishedAt.slice(0, 10) : null,
    releases: releases.ok ? toSafeValue(releases.value.length, 0) : "unknown",
    releasesKnown: releases.ok,
    npmVersion: npmVersion.ok ? npmVersion.value : "unavailable",
    npmDownloads: npmDownloads.ok ? npmDownloads.value : "unavailable",
  };
}

function mergedIssueEvidenceKnown(closedIssuesResult, openIssuesResult) {
  return closedIssuesResult.ok && openIssuesResult.ok;
}

function collectRequiredFileReport(files) {
  return files.map((filePath) => ({
    file: filePath,
    exists: existsSync(path.resolve(packageRoot, filePath)),
  }));
}

function getNpmDownloadsForReadiness() {
  const override = process.env.AI_DEVTOOLS_CN_NPM_DOWNLOADS_JSON;
  if (!override) {
    try {
      const value = execFileSync("curl", [
        "-L",
        "--max-time",
        "8",
        "https://api.npmjs.org/downloads/point/last-month/ai-devtools-cn",
      ], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }).trim();
      const parsed = JSON.parse(value);
      if (Number.isFinite(parsed.downloads)) {
        return { ok: true, value: `${parsed.downloads}` };
      }
      return { ok: false };
    } catch {
      return { ok: false };
    }
  }

  try {
    const parsed = JSON.parse(override);
    if (Number.isFinite(parsed.downloads)) {
      return { ok: true, value: `${parsed.downloads}` };
    }
    return { ok: false };
  } catch (error) {
    return { ok: false, error };
  }
}

function toSafeValue(value, fallback = "unknown") {
  return value === null || value === undefined ? fallback : value;
}

function hasLabel(item, labelName) {
  return Array.isArray(item.labels) && item.labels.some((label) => label.name === labelName);
}

function isExternalHumanAuthor(author) {
  return Boolean(author?.login)
    && author.login !== repoOwner
    && author.is_bot !== true;
}

function getJsonFromEnvOrCommand(envName, command, commandArgs) {
  const envValue = process.env[envName];
  if (envValue) {
    try {
      return { ok: true, value: JSON.parse(envValue) };
    } catch (error) {
      return { ok: false, error };
    }
  }

  try {
    const value = execFileSync(command, commandArgs, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return { ok: false, error };
  }
}

function createPilotPack(recipeSlug, options) {
  const recipe = recipeSlug ? requireRecipe(recipeSlug) : requireRecipe("ci-failure");
  const template = requireTemplate(recipe.templateSlug);
  const outputPath = options.output ?? path.join("work", `${recipe.slug}-external-pilot`);
  const resolvedOutput = resolveOutputPath(outputPath);
  const files = [
    {
      name: "README.md",
      content: formatPilotReadme(recipe, template),
    },
    {
      name: "tester-task.md",
      content: formatPilotTesterTask(recipe, template),
    },
    {
      name: "maintainer-evidence.md",
      content: formatPilotMaintainerEvidence(recipe, template),
    },
  ];

  const conflicts = files
    .map((file) => path.join(resolvedOutput, file.name))
    .filter((filePath) => existsSync(filePath));

  if (conflicts.length > 0 && !options.force) {
    fail(`输出文件已存在：\n${conflicts.map((filePath) => `- ${formatDisplayPath(filePath)}`).join("\n")}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(resolvedOutput, { recursive: true });
  for (const file of files) {
    writeFileSync(path.join(resolvedOutput, file.name), file.content, "utf8");
  }

  console.log(`已生成 30 分钟外部试用任务包：${formatDisplayPath(resolvedOutput)}`);
  for (const file of files) {
    console.log(`- ${path.join(formatDisplayPath(resolvedOutput), file.name)}`);
  }
}

function createPilotInvitePack(options = {}) {
  const inviteRecipes = pilotInviteRecipeSlugs.map((slug) => requireRecipe(slug));
  const content = formatPilotInvitePack(inviteRecipes);

  if (options.output) {
    const resolvedOutput = resolveOutputPath(options.output);
    if (existsSync(resolvedOutput) && !options.force) {
      fail(`输出文件已存在：${options.output}\n如需覆盖，请加 --force。`);
    }

    mkdirSync(path.dirname(resolvedOutput), { recursive: true });
    writeFileSync(resolvedOutput, content, "utf8");
    console.log(`已生成外部试用邀请包：${formatDisplayPath(resolvedOutput)}`);
    return;
  }

  console.log(content);
}

function createFeedbackDraft(options) {
  const template = options.template ? requireTemplate(options.template) : null;
  const outputPath = options.output ?? path.join(
    "work",
    template ? `${template.slug}-feedback.md` : "template-feedback.md",
  );
  const resolvedOutput = resolveOutputPath(outputPath);

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${outputPath}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(resolvedOutput, formatFeedbackDraft(template, options), "utf8");
  console.log(`已生成反馈 issue 草稿：${formatDisplayPath(resolvedOutput)}`);
}

function createOutreachPack(options) {
  const template = options.template ? requireTemplate(options.template) : requireTemplate("pr-review");
  const channel = requireOutreachChannel(options.channel ?? "github");
  const outputPath = options.output ?? path.join("work", `${template.slug}-${channel.slug}-outreach.md`);
  const resolvedOutput = resolveOutputPath(outputPath);

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${outputPath}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(resolvedOutput, formatOutreachPack(template, channel, options), "utf8");
  console.log(`已生成外部试用邀请包：${formatDisplayPath(resolvedOutput)}`);
}

function createAdoptionSprint(options) {
  const template = options.template ? requireTemplate(options.template) : requireTemplate("pr-review");
  const outputPath = options.output ?? path.join("work", "ai-devtools-cn-adoption-sprint");
  const resolvedOutput = resolveOutputPath(outputPath);
  const files = [
    {
      name: "README.md",
      content: formatAdoptionReadme(template, options),
    },
    {
      name: "outreach.md",
      content: formatAdoptionOutreach(template, options),
    },
    {
      name: "feedback-log.md",
      content: formatAdoptionFeedbackLog(template, options),
    },
    {
      name: "contributor-invite.md",
      content: formatContributorInvite(template, options),
    },
  ];

  const conflicts = files
    .map((file) => path.join(resolvedOutput, file.name))
    .filter((filePath) => existsSync(filePath));

  if (conflicts.length > 0 && !options.force) {
    fail(`输出文件已存在：\n${conflicts.map((filePath) => `- ${formatDisplayPath(filePath)}`).join("\n")}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(resolvedOutput, { recursive: true });
  for (const file of files) {
    writeFileSync(path.join(resolvedOutput, file.name), file.content, "utf8");
  }

  console.log(`已生成外部试用冲刺包：${formatDisplayPath(resolvedOutput)}`);
  for (const file of files) {
    console.log(`- ${path.join(formatDisplayPath(resolvedOutput), file.name)}`);
  }
}

function createEvidenceLedger(options) {
  const outputPath = options.output ?? path.join("work", "external-evidence.md");
  const resolvedOutput = resolveOutputPath(outputPath);
  const metricSnapshot = collectOpenSourceMetrics();

  if (existsSync(resolvedOutput) && !options.force) {
    fail(`输出文件已存在：${outputPath}\n如需覆盖，请加 --force。`);
  }

  mkdirSync(path.dirname(resolvedOutput), { recursive: true });
  writeFileSync(resolvedOutput, formatEvidenceLedger(metricSnapshot), "utf8");
  console.log(`已生成外部采用证据台账：${formatDisplayPath(resolvedOutput)}`);
}

function formatWorkingDraft(template) {
  return `# ${template.title}工作稿

> 来源模板：${template.file}
> 使用场景：${template.useCase}
> 建议沉淀位置：${template.output}

## 使用前填写

\`\`\`text
项目背景：
技术栈：
当前任务：
相关文件或日志：
约束条件：
期望输出格式：
\`\`\`

## 模板正文

${readTemplate(template).trim()}
`;
}

function formatEvidenceLedger(metricSnapshot) {
  const externalFeedbackRows = metricSnapshot.recentExternalFeedbackIssues.length > 0
    ? metricSnapshot.recentExternalFeedbackIssues
      .map((issue) => `- ${issue.date} | external feedback issue | #${issue.number} - ${issue.title} | @${issue.author} | https://github.com/${repo}/issues/${issue.number}`)
      .join("\n")
    : "- 暂无外部反馈 issue";

  const externalMergedPrRows = metricSnapshot.recentExternalMergedPrs.length > 0
    ? metricSnapshot.recentExternalMergedPrs
      .map((pr) => `- ${pr.date} | external merged PR | #${pr.number} - ${pr.title} | @${pr.author} | https://github.com/${repo}/pull/${pr.number}`)
      .join("\n")
    : "- 暂无外部 merged PR";

  return `# AI DevTools CN 外部采用证据台账

生成日期：${formatSnapshotDate()}

这个台账用于记录**可公开核验**的外部采用信号，辅助 OpenAI 申请材料与项目运营复盘。它不是宣传稿，也不能把维护者自建行为当外部采用。

## 记录原则

- 只记录可核验链接（issue、PR、release、npm、公开帖子）。
- 区分 maintainer 活动与 external 采集信号。
- 外部 feedback issue 要是非 maintainer 公开账号提交。
- External merged PR 只计入非 maintainer 作者提交并合并的 PR。
- 外部反馈驱动的 maintainer PR / release 要明确标记为 feedback-driven，不计 external merged PR。
- claim/starter/feedback 模板是内部准备稿，可用于外部协作流程，不应计为 external merged PR。
- 不记录 API key、token、客户信息、敏感日志、未公开源码和个人隐私。

## 关键快照

| 指标 | 值 |
| --- | --- |
| GitHub Stars | ${metricSnapshot.stars} |
| Forks | ${metricSnapshot.forks} |
| Merged PRs | ${metricSnapshot.mergedPrsKnown ? metricSnapshot.mergedPrs : "unknown"} |
| External merged PRs（非 maintainer） | ${metricSnapshot.externalMergedPrsKnown ? metricSnapshot.externalMergedPrs : "unknown"} |
| Open issues | ${metricSnapshot.openIssues} |
| Closed issues | ${metricSnapshot.closedIssues} |
| Feedback-labeled issues（全部） | ${metricSnapshot.feedbackIssuesKnown ? metricSnapshot.feedbackIssues : "unknown"} |
| External feedback issues（非 maintainer） | ${metricSnapshot.feedbackIssuesKnown ? metricSnapshot.externalFeedbackIssues : "unknown"} |
| Releases | ${metricSnapshot.releasesKnown ? metricSnapshot.releases : "unknown"} |
| Latest release | ${metricSnapshot.latestReleaseTag ?? "unknown"} (${metricSnapshot.latestReleaseDate ?? "unknown"}) |
| npm package | https://www.npmjs.com/package/ai-devtools-cn |
| npm version | ${metricSnapshot.npmVersion} |
| npm last-month downloads | ${metricSnapshot.npmDownloads} |

## 证据记录（可直接复制到提交说明）

### 外部反馈（external feedback issue）
\n${externalFeedbackRows}

### 外部采纳（external merged PR）
\n${externalMergedPrRows}

### 其他可核验链路
- npm publish： https://www.npmjs.com/package/ai-devtools-cn
- GitHub release： https://github.com/${repo}/releases
- 仓库主页： ${metricSnapshot.repoUrl}
- feedback entry template： ${templateFeedbackUrl}
- external pilot template： ${externalPilotFeedbackUrl}

### 申请场景可复制文本

The project is a public OSS repository with reusable maintenance templates for PR review, issue triage, CI troubleshooting, and release workflows. Recent external signals include external feedback issues and external merged PRs shown above, plus a published npm package and public release history. We separate external feedback-driven maintainer work from true external adoption signals in this evidence ledger.

## 可计入公开证据台账的内容

- npm package 已发布，可通过 npx / doctor 与 release 链接核验。
- 外部用户提交的 feedback issue（非 maintainer）。
- 外部贡献者提交并合并的 PR（external merged PR）。
- 基于外部 feedback issue 完成的维护者 PR/release，但需在 notes 中标注 feedback-driven。
- 公开帖子、文章、课程、社区讨论中可核验的提及。
- 经对方授权后可匿名化沉淀的真实案例。

## 不应计入外部采用的内容

- 维护者自己创建/关闭的 issue。
- 维护者自己提交的 PR 与 maintainer 自建测试 PR。
- maintainer 的 claim / starter / feedback 本地草稿：generated local drafts are not external merged PRs。
- 仅内部讨论、截图/口头说法、无链接内容。

## 下次执行动作

1. 每次新增外部反馈后，立即追加一条日志行到本台账。
2. 继续做真实外部试用邀约（5-10 位/周）并引导提交 feedback issue。
3. 邀请至少 1 位外部贡献者认领 good first issue，并追踪其 PR 合并情况。
4. 每日/每次发布后跑一次：
\`\`\`bash
npm run metrics:snapshot -- --output work/metrics-$(date +%F).md
npm run templates:evidence -- --output work/external-evidence-$(date +%F).md --force
npm run templates:readiness -- --output work/openai-readiness-$(date +%F).md --force
\`\`\`
`;
}

function formatAdoptionReadme(template, options) {
  const scenarioLine = options.scenario ?? template.useCase;
  const scenarioArg = formatShellArg(scenarioLine);

  return `# AI DevTools CN 一周外部试用冲刺包

> 推荐模板：${template.slug} - ${template.title}
> 试用场景：${scenarioLine}

这个目录用于组织一次 7 天外部试用冲刺。目标是邀请真实开发者完成一次可公开描述的试用，并把反馈、外部 PR 或公开提及记录成可核验证据。

## 本周目标

- 邀请 5-10 位有真实维护场景的开发者。
- 获得 2-5 条外部 feedback issue。
- 邀请至少 1 位外部贡献者认领 good first issue。
- 把每条公开反馈记录到 \`feedback-log.md\`，不要把维护者自建 issue 写成外部采用。

## 推荐命令

\`\`\`bash
npx ai-devtools-cn doctor
npx ai-devtools-cn trial --template ${template.slug} --scenario ${scenarioArg} --output work/ai-devtools-cn-trial
npx ai-devtools-cn feedback --template ${template.slug} --scenario ${scenarioArg} --output work/feedback.md
npx ai-devtools-cn evidence --output work/external-evidence.md
\`\`\`

如果 npm 包尚未发布，可以在仓库内用对应 npm script 试跑：

\`\`\`bash
npm run templates:doctor
npm run templates:trial -- --template ${template.slug} --scenario ${scenarioArg} --output work/ai-devtools-cn-trial
npm run templates:feedback -- --template ${template.slug} --scenario ${scenarioArg} --output work/feedback.md
\`\`\`

## 7 天执行节奏

| 日期 | 动作 | 产物 |
| --- | --- | --- |
| Day 0 | 检查 README、反馈入口、good first issue 和 npm 状态 | 可公开发送的仓库链接 |
| Day 1 | 向熟悉的开源维护者或开发者发送 3 条一对一邀请 | 试用邀请记录 |
| Day 2 | 在 X、V2EX、掘金或社群发布一条试用邀请 | 公开链接 |
| Day 3 | 跟进已回复用户，帮助他们选择模板和试用命令 | 反馈 issue 草稿 |
| Day 4 | 分流第一批反馈，创建修正文档或模板的 issue | triage 记录 |
| Day 5 | 邀请 1 位外部贡献者认领 good first issue | 外部 PR 候选 |
| Day 6 | 合并可验证改进，或记录为什么暂缓 | PR / issue 链接 |
| Day 7 | 运行指标快照和证据台账，判断是否能做反馈驱动 release | metrics / evidence |

## 文件说明

- [outreach.md](outreach.md)：面向不同渠道的邀请文案。
- [feedback-log.md](feedback-log.md)：记录外部反馈、公开提及和外部 PR。
- [contributor-invite.md](contributor-invite.md)：邀请外部贡献者认领 good first issue 的文案和边界。

## 不要做的事

- 不要承诺任何外部项目、权益或合作结果。
- 不要把维护者自己的 issue、PR、测试反馈写成外部采用。
- 不要要求用户公开私有代码、token、客户日志或敏感事故细节。
- 不要购买 star、反馈或 PR。
`;
}

function formatAdoptionOutreach(template, options) {
  const scenarioLine = options.scenario ?? template.useCase;
  const trialCommand = `npx ai-devtools-cn trial --template ${template.slug} --scenario ${formatShellArg(scenarioLine)} --output work/ai-devtools-cn-trial`;

  return `# 外部试用邀请文案

> 推荐模板：${template.slug} - ${template.title}
> 试用场景：${scenarioLine}

这些文案用于邀请真实开发者试用。发送前请按渠道删改，不要夸大 stars、下载量、用户数或外部采用情况。

## 推荐试用命令

\`\`\`bash
${trialCommand}
\`\`\`

## GitHub / Discussion

${formatOutreachMessage(template, requireOutreachChannel("github"), scenarioLine)}

## X / Twitter

${formatOutreachMessage(template, requireOutreachChannel("x"), scenarioLine)}

## V2EX / 中文社区

${formatOutreachMessage(template, requireOutreachChannel("v2ex"), scenarioLine)}

## 微信 / 私域社群

${formatOutreachMessage(template, requireOutreachChannel("wechat"), scenarioLine)}

## Email / 私信

${formatOutreachMessage(template, requireOutreachChannel("email"), scenarioLine)}

## 反馈入口

- Feedback issue: ${templateFeedbackUrl}
- Good first issues: https://github.com/ONEISALL7/ai-devtools-cn/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22
- Repository: https://github.com/ONEISALL7/ai-devtools-cn
`;
}

function formatAdoptionFeedbackLog(template, options) {
  const scenarioLine = options.scenario ?? template.useCase;

  return `# 外部反馈记录表

> 推荐模板：${template.slug} - ${template.title}
> 试用场景：${scenarioLine}

这个文件用于记录真实外部采用信号。只有可核验链接、经允许匿名整理的案例，或公开 issue / PR 才能进入公开证据台账。

## 反馈记录

| 日期 | 来源 | 链接 | 外部作者 | 试用模板/命令 | 是否公开可核验 | 后续动作 |
| --- | --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | feedback issue |  |  | ${template.slug} | yes | 创建改进 issue |
| YYYY-MM-DD | external PR |  |  |  | yes | review 并合并 |
| YYYY-MM-DD | public mention |  |  |  | yes | 回复并邀请 issue 反馈 |
| YYYY-MM-DD | private feedback |  | anonymous | ${template.slug} | partial | 经允许后匿名整理 |

## Triage checklist

- [ ] 反馈来自真实试用，而不是维护者自建测试。
- [ ] 反馈没有包含 token、客户信息、内部日志、未公开源码或个人隐私。
- [ ] 已给 GitHub issue 加上合适标签，例如 \`feedback\`、\`template\`、\`cli\`、\`case-study\`。
- [ ] 如果反馈能立即修复，已创建小 PR。
- [ ] 如果反馈能沉淀成案例，已确认是否允许匿名整理。
- [ ] 已把公开链接同步到 \`npm run templates:evidence\` 生成的证据台账。

## 可进入公开复盘的说法

\`\`\`text
We collected public feedback issues and external PRs through a documented one-week adoption sprint. Each signal is linked in the evidence ledger and separated from maintainer-created issues.
\`\`\`

只有当上面的记录确实存在时，才能使用这段话。
`;
}

function formatContributorInvite(template, options) {
  const scenarioLine = options.scenario ?? template.useCase;

  return `# 外部贡献者邀请

> 推荐模板：${template.slug} - ${template.title}
> 试用场景：${scenarioLine}

这个文档用于邀请外部贡献者提交一个小而真实的 PR。目标是获得真实改进，不是制造空 PR 或无意义改动。

## 可直接发送的邀请

\`\`\`text
我在维护 ai-devtools-cn，一个面向中文开发者的 AI 工程维护模板库。

现在想找外部贡献者认领一个小任务：补充真实模板使用案例、修正文档不清楚的地方，或者改进某个 good first issue。

Good first issues:
https://github.com/ONEISALL7/ai-devtools-cn/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22

你可以优先看这个场景：
${scenarioLine}

要求：
- 不提交私有代码、token、客户日志或敏感信息。
- PR 要说明使用了哪个模板、改了什么、为什么有用。
- 小改动也可以，但必须能帮助真实开发者理解或使用项目。
\`\`\`

## 推荐 PR 范围

- 给一个模板补充边界条件。
- 给某个技术栈补充最小案例。
- 改进 README 或 quickstart 中不清楚的步骤。
- 把真实使用反馈整理成匿名案例。
- 修复 CLI 文档和实际输出不一致的地方。

## Review checklist

- [ ] PR 作者不是维护者本人。
- [ ] PR 有明确使用场景。
- [ ] 改动没有包含敏感信息。
- [ ] 改动能帮助新用户复制、试用或反馈。
- [ ] 合并后记录到外部采用证据台账。
`;
}

function formatPilotInvitePack(inviteRecipes) {
  const recipeRows = inviteRecipes
    .map((recipe) => {
      const outputDir = `work/pilot-${recipe.slug}`;
      return `| ${recipe.slug} | ${recipe.title} | ${recipe.scenario} | \`npx ai-devtools-cn pilot ${recipe.slug} --output ${outputDir} --force\` |`;
    })
    .join("\n");
  const commandList = inviteRecipes
    .map((recipe) => `npx ai-devtools-cn pilot ${recipe.slug} --output work/pilot-${recipe.slug} --force`)
    .join("\n");
  const selectedRecipe = inviteRecipes[0];

  return `# AI DevTools CN 外部试用邀请包

这个文件用于维护者邀请 2-3 位真实外部开发者完成 30 分钟 pilot 试用，并把反馈沉淀成可公开核验的 GitHub issue。它不是宣传稿，也不能把维护者自测写成外部采用。

## 适合邀请的人

- 近期处理过 PR review、issue triage、CI 排错、release note 或文档维护的人。
- 愿意用公开安全的小场景试用模板，并提交 GitHub feedback issue 的开发者。
- 可以说清楚哪里有用、哪里不清楚、是否能进入真实维护流程的人。

## 推荐先生成的 pilot 包

| Recipe | 用途 | 场景 | 生成命令 |
| --- | --- | --- | --- |
${recipeRows}

一次只发给一个人一个 recipe，不要让外部试用者同时跑太多任务。维护者可以先在本地生成任务包，检查里面的 \`tester-task.md\`，再复制给对方。

\`\`\`bash
${commandList}
\`\`\`

## 一对一邀请文案

\`\`\`text
我在维护一个中文开源项目 AI DevTools CN，想请你帮忙做一次 30 分钟外部试用。

项目地址：
https://github.com/ONEISALL7/ai-devtools-cn

这次建议试用：${selectedRecipe.slug} - ${selectedRecipe.title}
目标：${selectedRecipe.goal}

你可以运行：
npx ai-devtools-cn doctor
npx ai-devtools-cn pilot ${selectedRecipe.slug} --output work/pilot-${selectedRecipe.slug} --force

然后打开：
work/pilot-${selectedRecipe.slug}/tester-task.md

请用一个可以公开描述的小场景试用，不要提交 token、客户信息、内部日志、未公开源码或个人隐私。试完后请通过任务包里的 GitHub issue 链接提交反馈。
\`\`\`

## 公开渠道邀请文案

\`\`\`text
我在维护 AI DevTools CN，一个面向中文开发者和开源维护者的 AI 工程维护模板库。

现在想找 2-3 位真实开发者做 30 分钟 pilot：
- PR review
- CI failure debugging
- issue triage
- release note drafting

不是刷 star，也不是抽奖。只想验证这些模板和 CLI 能不能进入真实维护流程。

试用命令：
npx ai-devtools-cn pilot ci-failure --output work/pilot-ci-failure --force

反馈入口会在生成的 tester-task.md 里。请不要提交 token、客户信息、内部日志、未公开源码或个人隐私。

https://github.com/ONEISALL7/ai-devtools-cn
\`\`\`

## 维护者跟进表

| 日期 | 邀请对象 | Recipe | 是否回复 | Feedback issue | 后续动作 |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | @username | ci-failure | yes/no |  | triage |
| YYYY-MM-DD | @username | pr-review-docs | yes/no |  | triage |
| YYYY-MM-DD | @username | issue-triage | yes/no |  | triage |

## 反馈入口

外部 pilot 任务包会指向这个结构化表单：

${externalPilotFeedbackUrl}

如果对方只是快速复制模板试用，没有使用 pilot 包，也可以走通用反馈表单：

${templateFeedbackUrl}

## 证据边界

- 外部用户自己提交的 feedback issue 可以记录为 external feedback。
- 外部用户用自己的 GitHub 账号提交并合并的 PR 才能记录为 external merged PR。
- 维护者根据外部反馈完成的 PR 是 feedback-driven PR，不能写成外部 PR。
- 私聊反馈只有在对方允许匿名整理后，才能作为匿名案例。
- 不要购买 star、反馈或 PR，不要让别人原样代发维护者写好的补丁。

## 收到反馈后的维护动作

1. 给 feedback issue 加上 \`feedback\`、\`external-pilot\` 和相关场景 label。
2. 判断反馈是否能转成小 issue、文档修正、模板补充或 CLI 改进。
3. 如果改进进入 PR，在 PR 描述里引用 feedback issue。
4. 合并后在 release note 或 changelog 中标明 feedback-driven。
5. 更新 #51 或 \`npm run templates:evidence\` 生成的证据台账。
`;
}

function formatPilotReadme(recipe, template) {
  const trialCommand = `npx ai-devtools-cn trial --template ${template.slug} --scenario ${formatShellArg(recipe.scenario)} --output work/ai-devtools-cn-trial`;
  const feedbackCommand = `npx ai-devtools-cn feedback --template ${template.slug} --scenario ${formatShellArg(recipe.scenario)} --output work/feedback.md`;

  return `# AI DevTools CN 30 分钟外部试用任务

> 配方：${recipe.slug} - ${recipe.title}
> 模板：${template.slug} - ${template.title}
> 场景：${recipe.scenario}

这个任务包用于邀请一个真实外部用户完成一次短试用。目标是获得可核验反馈，而不是刷 star、刷 issue 或制造虚假外部贡献。

## 适合邀请谁

- 正在维护开源项目的人。
- 最近处理过 PR review、CI 失败、issue triage、release note 或文档维护的人。
- 愿意把反馈写成公开安全 GitHub issue 的开发者。

## 30 分钟流程

| 时间 | 外部试用者动作 | 产物 |
| --- | --- | --- |
| 0-5 分钟 | 运行 doctor，确认 CLI 可用 | \`npx ai-devtools-cn doctor\` 输出 |
| 5-10 分钟 | 生成试用包 | 本地 \`work/ai-devtools-cn-trial\` |
| 10-25 分钟 | 用一个公开安全场景填模板 | 试用工作稿 |
| 25-30 分钟 | 提交 feedback issue 或把反馈发给维护者整理 | 公开反馈链接 |

## 给外部试用者的命令

\`\`\`bash
npx ai-devtools-cn doctor
${trialCommand}
${feedbackCommand}
\`\`\`

## 推荐反馈入口

${externalPilotFeedbackUrl}

## 本目录文件

- [tester-task.md](tester-task.md)：可以直接发给外部试用者的任务说明。
- [maintainer-evidence.md](maintainer-evidence.md)：维护者记录反馈证据和边界的表格。

## 证据边界

- 外部用户自己提交的 feedback issue 可以计为外部反馈。
- 外部用户自己提交并合并的 PR 可以计为 external merged PR。
- 维护者根据外部反馈完成的 PR 只能计为 feedback-driven PR。
- 本地生成的试用包、claim、starter 或 pr-pack 不能计为外部 PR。
- 不记录 token、API key、客户信息、内部日志、未公开源码或个人隐私。
`;
}

function formatPilotTesterTask(recipe, template) {
  const trialCommand = `npx ai-devtools-cn trial --template ${template.slug} --scenario ${formatShellArg(recipe.scenario)} --output work/ai-devtools-cn-trial`;

  return `# 外部试用任务

我在维护 ai-devtools-cn，一个面向中文开发者和开源维护者的 AI 工程维护模板库。

想请你用 30 分钟试一下这个场景：

> ${recipe.goal}

## 你需要做什么

1. 选择一个可以公开描述的小场景，例如公开 PR、公开 CI 失败日志、公开 issue 或匿名化后的维护场景。
2. 运行下面命令生成试用包。
3. 按试用包 README 填一份工作稿。
4. 提交一条公开安全反馈 issue，说明哪里有用、哪里不清楚、是否能放进你的维护流程。

## 命令

\`\`\`bash
npx ai-devtools-cn doctor
${trialCommand}
\`\`\`

## 反馈 issue

${externalPilotFeedbackUrl}

## 反馈时请写

- 你试用的是哪个场景：${recipe.scenario}
- 你是否真的把输出用于 PR、issue、CI、release 或文档维护。
- 哪一步最有用。
- 哪一步不清楚或不能直接使用。
- 你希望补充哪种模板、案例或命令。

## 安全边界

- 不要提交 token、API key、cookie、密码。
- 不要提交客户信息、内部日志、未公开源码或个人隐私。
- 敏感场景请改写成公开安全的抽象描述。
`;
}

function formatPilotMaintainerEvidence(recipe, template) {
  return `# 维护者证据记录

> 配方：${recipe.slug} - ${recipe.title}
> 模板：${template.slug} - ${template.title}
> 场景：${recipe.scenario}

这个文件只记录真实外部采用证据。没有公开链接、无法核验或未经允许的私聊反馈，不要写进公开证据台账。

## 反馈记录

| 日期 | 外部用户 | 链接 | 证据类型 | 可计入什么 | 后续动作 |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | @username |  | feedback issue | external feedback | triage |
| YYYY-MM-DD | @username |  | PR | external merged PR if merged | review |
| YYYY-MM-DD | anonymous |  | private feedback | internal learning only | ask permission to anonymize |

## 证据分类

- \`external feedback\`：真实外部用户提交的公开反馈 issue。
- \`external merged PR\`：外部用户用自己的 GitHub 账号提交并合并的 PR。
- \`feedback-driven PR\`：维护者根据外部反馈完成的修复 PR，不能写成外部 PR。
- \`private feedback\`：只能内部参考，除非对方允许匿名整理。

## Review checklist

- [ ] 反馈来自真实外部用户，不是维护者自测。
- [ ] 链接公开可访问，或已明确标注为 private feedback。
- [ ] 没有 token、客户信息、内部日志、未公开源码或个人隐私。
- [ ] 如果反馈可执行，已创建 issue 或 PR。
- [ ] 如果产生改进，已在 release note 或 changelog 里标明 feedback-driven。

## 可复制到 #51 的记录

\`\`\`text
External pilot: ${recipe.slug}
Tester:
Feedback link:
Used template: ${template.slug}
Evidence type:
Follow-up issue/PR:
Safety checked: yes/no
\`\`\`
`;
}

function formatOutreachPack(template, channel, options) {
  const scenarioLine = options.scenario ?? template.useCase;
  const scenarioArg = formatShellArg(scenarioLine);
  const trialCommand = `npx ai-devtools-cn trial --template ${template.slug} --scenario ${scenarioArg} --output work/ai-devtools-cn-trial`;
  const feedbackCommand = `npx ai-devtools-cn feedback --template ${template.slug} --scenario ${scenarioArg} --output work/feedback.md`;

  return `# AI DevTools CN 外部试用邀请包

> 邀请渠道：${channel.slug} - ${channel.title}
> 适合对象：${channel.audience}
> 推荐模板：${template.slug} - ${template.title}
> 试用场景：${scenarioLine}

这个邀请包用于找真实开发者完成一次 15 分钟试用，并把反馈沉淀到公开 issue。目标是获得可验证的产品反馈，不是刷 star、刷 issue 或制造虚假采用信号。

## 发送前检查

- [ ] 仓库 README 能说明项目用途和快速开始
- [ ] 已确认反馈入口可访问
- [ ] 邀请对象确实有 PR review、CI、issue、release 或文档维护场景
- [ ] 文案没有夸大 stars、下载量、用户数或任何外部项目结果
- [ ] 已说明不要公开 API key、token、客户信息、内部日志或未公开源码

## 可直接发送的邀请文案

${formatOutreachMessage(template, channel, scenarioLine)}

## 推荐试用命令

\`\`\`bash
${trialCommand}
\`\`\`

如果只想生成反馈草稿：

\`\`\`bash
${feedbackCommand}
\`\`\`

## 反馈入口

- GitHub issue: ${templateFeedbackUrl}
- 快速上手：https://github.com/ONEISALL7/ai-devtools-cn#readme
- 第一批用户试用计划：https://github.com/ONEISALL7/ai-devtools-cn/blob/main/docs/first-user-test-plan.md

## 维护者记录

收到反馈后，维护者应该记录：

- 反馈 issue 链接
- 试用者角色，例如个人开发者、开源维护者、团队技术负责人
- 使用的模板或 CLI 命令
- 是否进入真实 PR、issue、CI、release 或文档维护流程
- 后续改进 PR 或 issue

不要把维护者自己写的测试 issue、占位 issue 或泛泛建议包装成外部用户反馈。
`;
}

function formatOutreachMessage(template, channel, scenarioLine) {
  const baseLines = [
    `我在维护一个中文 AI 开发者工具模板库 ai-devtools-cn，想找真实开发者试用 ${template.title}。`,
    `这次只需要 15 分钟，用它跑一个可公开描述的场景：${scenarioLine}。`,
    "如果模板对你的 PR review、CI 排错、issue 分流、release 或文档维护有帮助，请提交一条匿名化反馈 issue。",
    "请不要提交 API key、token、客户信息、内部日志、未公开源码或生产事故敏感细节。",
    "仓库：https://github.com/ONEISALL7/ai-devtools-cn",
  ];

  if (channel.slug === "x") {
    return `${baseLines[0]}

想请 5-10 位开发者试用一次：

- 场景：${scenarioLine}
- 时间：15 分钟
- 反馈：提交匿名化 GitHub issue

我最想知道：这个模板能不能进入你的真实维护流程，哪里不够具体。

${baseLines[4]}`;
  }

  if (channel.slug === "v2ex") {
    return `我做了一个中文 AI 工程维护模板库，想请大家试用和拍砖。

目前重点不是宣传，而是验证模板能不能进入真实维护流程。推荐先试用：${template.title}。

试用任务：${scenarioLine}

如果你愿意反馈，请重点说：

1. 模板有没有帮你更快完成维护任务。
2. 哪些字段不清楚或太啰嗦。
3. 缺少哪个技术栈或场景案例。

仓库：https://github.com/ONEISALL7/ai-devtools-cn`;
  }

  if (channel.slug === "wechat") {
    return `我最近在维护一个中文 AI 开发者工具模板库，想请你帮忙试用一次。

不用提供私有代码，只要选一个可公开描述的场景：${scenarioLine}。

推荐用 ${template.title} 跑一遍，看看能不能帮你完成 PR review、CI 排错、issue 分流、release 或文档维护中的一个小任务。

如果愿意反馈，提交一个匿名化 GitHub issue 就可以。仓库：
https://github.com/ONEISALL7/ai-devtools-cn`;
  }

  if (channel.slug === "email") {
    return `你好，

我在维护一个中文 AI 开发者工具模板库 ai-devtools-cn，想邀请你做一次 15 分钟试用。

推荐试用：${template.title}
建议场景：${scenarioLine}

你不需要公开任何私有代码或敏感日志。只需要用一个可公开描述的维护任务跑一遍模板，然后反馈它是否真的帮你完成了 review、triage、CI、release 或文档维护。

仓库：https://github.com/ONEISALL7/ai-devtools-cn
反馈入口：${templateFeedbackUrl}

谢谢。`;
  }

  return `${baseLines.join("\n\n")}

反馈入口：${templateFeedbackUrl}`;
}

function formatFeedbackDraft(template, options) {
  const templateLine = template
    ? `${template.slug} - ${template.title} (${template.file})`
    : "请填写使用的模板、CLI 命令或案例链接";
  const scenarioLine = options.scenario ?? "请填写公开安全的使用场景";

  return `# Template usage feedback issue draft

> 提交入口：${templateFeedbackUrl}
> 你可以把下面内容复制到 GitHub issue 中，再按实际情况删改。

## Safety check

- [ ] 没有包含 API key、token、密码、cookie
- [ ] 没有包含客户名称、内部域名、合同、订单或个人隐私
- [ ] 没有包含未公开源码、私有日志或生产事故敏感细节
- [ ] 如涉及敏感项目，已经改写成可公开的抽象描述

## Feedback

使用的模板或功能：
${templateLine}

使用场景：
${scenarioLine}

项目类型：
例如：开源库、团队内部工具、前端应用、Node.js 服务、Python 包、数据脚本

是否解决问题：
请说明这个模板或命令是否帮你完成了 review、triage、CI 排错、release 或文档维护。

节省了什么工作：
例如：少写 review checklist、少整理日志、减少 release note 草稿时间。

遇到的困难：
例如：字段不清楚、输出不够具体、缺少某个技术栈示例、CLI 命令难记。

希望补充的模板或案例：
请写具体场景，越具体越容易变成 issue 或 PR。

是否愿意被匿名引用为使用案例：
是 / 否
`;
}

function formatTrialReadme(template, options) {
  const scenarioLine = options.scenario ?? "请填写公开安全的试用场景";

  return `# AI DevTools CN 15 分钟试用包

> 模板：${template.slug} - ${template.title}
> 试用场景：${scenarioLine}

这个目录用于完成一次可公开反馈的短试用。目标不是测试 AI 是否能替代维护者，而是判断模板是否能帮助真实工程维护工作。

## 文件

- [${template.slug}.md](${template.slug}.md)：可填写的模板工作稿
- [feedback.md](feedback.md)：可复制到 GitHub issue 的反馈草稿

## 试用步骤

1. 打开 \`${template.slug}.md\`。
2. 填写项目背景、技术栈、当前任务、相关文件或日志、约束条件和期望输出格式。
3. 把整理后的工作稿复制到你正在使用的 AI 开发工具。
4. 判断输出是否能进入真实 PR、issue、CI、release 或文档流程。
5. 打开 \`feedback.md\`，删除不适用内容后提交到 GitHub issue。

## 公开安全提醒

不要把 API key、token、客户信息、内部日志、未公开源码、生产事故敏感细节或个人隐私写入试用包或公开 issue。

如果场景敏感，请改写成可公开的抽象描述。
`;
}

function formatKitReadme(kit, kitTemplates) {
  return `# ${kit.title}

> ${kit.description}

## 包含文件

${kitTemplates.map((template) => `- [${template.slug}.md](${template.slug}.md)：${template.title}，用于${template.useCase}`).join("\n")}

## 推荐使用顺序

1. 先用 \`maintainer-weekly-checklist.md\` 梳理当前 issue、PR、CI 和 release 状态。
2. 有新 PR 时填写 \`pr-review.md\`。
3. 有用户反馈时填写 \`issue-triage.md\`。
4. CI 失败时填写 \`ci-troubleshooting.md\`。
5. 发版前填写 \`release-note.md\`。
6. 对 AI 输出不确定时，用 \`ai-output-evaluation.md\` 做人工验收。

## 安全提醒

不要把密钥、客户信息、内部日志、未公开源码或隐私数据写入这些工作稿。如果必须描述敏感场景，请先改写成可公开的抽象信息。
`;
}

function validateTemplates() {
  const { errors, templateFiles } = getTemplateValidationResult();

  if (errors.length > 0) {
    console.error("Template registry validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Template registry validation passed.");
  console.log(`- ${templates.length} templates registered`);
  console.log(`- ${templateFiles.length} template files checked`);
}

function runPublishCheck() {
  const errors = [];
  const warnings = [];
  const packageJson = JSON.parse(readFileSync(path.resolve(packageRoot, "package.json"), "utf8"));
  const validationResult = getTemplateValidationResult();
  const exampleValidationResult = getExampleValidationResult();
  const requiredFiles = [
    "README.md",
    "CHANGELOG.md",
    "LICENSE",
    "docs",
    "examples",
    "templates",
    "scripts/template-cli.mjs",
  ];
  const requiredScripts = [
    "test",
    "test:cli",
    "lint:md",
    "pack:dry-run",
    "templates:doctor",
    "templates:validate",
    "templates:publish-check",
    "templates:recipes",
    "templates:pilot-invite",
    "templates:adoption",
    "templates:handoff",
    "templates:evidence",
  ];

  if (packageJson.name !== "ai-devtools-cn") {
    errors.push(`package name 应为 ai-devtools-cn，当前为：${packageJson.name ?? "(missing)"}`);
  }
  if (!/^\d+\.\d+\.\d+$/.test(packageJson.version ?? "")) {
    errors.push(`package version 应使用 semver x.y.z，当前为：${packageJson.version ?? "(missing)"}`);
  }
  if (packageJson.license !== "MIT") {
    errors.push(`license 应为 MIT，当前为：${packageJson.license ?? "(missing)"}`);
  }
  if (packageJson.type !== "module") {
    errors.push(`type 应为 module，当前为：${packageJson.type ?? "(missing)"}`);
  }
  if (packageJson.bin?.["ai-devtools-cn"] !== "scripts/template-cli.mjs") {
    errors.push("bin.ai-devtools-cn 应指向 scripts/template-cli.mjs");
  }
  if (!packageJson.engines?.node?.includes(">=18")) {
    errors.push("engines.node 应声明 Node.js >=18");
  }
  if (!packageJson.repository?.url?.includes("ONEISALL7/ai-devtools-cn")) {
    errors.push("repository.url 应指向 GitHub 仓库 ONEISALL7/ai-devtools-cn");
  }
  if (!packageJson.bugs?.url?.includes("ONEISALL7/ai-devtools-cn/issues")) {
    errors.push("bugs.url 应指向 GitHub issues");
  }

  for (const file of requiredFiles) {
    if (!packageJson.files?.includes(file)) {
      errors.push(`package files 缺少：${file}`);
    }
    if (!existsSync(path.resolve(packageRoot, file))) {
      errors.push(`打包路径不存在：${file}`);
    }
  }

  for (const scriptName of requiredScripts) {
    if (!packageJson.scripts?.[scriptName]) {
      errors.push(`package scripts 缺少：${scriptName}`);
    }
  }

  const binPath = path.resolve(packageRoot, "scripts/template-cli.mjs");
  const binContent = existsSync(binPath) ? readFileSync(binPath, "utf8") : "";
  if (!binContent.startsWith("#!/usr/bin/env node")) {
    errors.push("scripts/template-cli.mjs 必须保留 node shebang");
  }
  try {
    accessSync(binPath, constants.X_OK);
  } catch {
    warnings.push("scripts/template-cli.mjs 当前不可执行；发布前建议确认文件权限为 executable。");
  }

  errors.push(...validationResult.errors);
  errors.push(...exampleValidationResult.errors);

  console.log("AI DevTools CN publish check");
  console.log("");
  console.log(`Package: ${packageJson.name}@${packageJson.version}`);
  console.log(`Bin: ${packageJson.bin?.["ai-devtools-cn"] ?? "(missing)"}`);
  console.log(`Files: ${packageJson.files?.length ?? 0} entries`);
  console.log(`Templates: ${templates.length} registered, ${validationResult.templateFiles.length} files checked`);
  console.log(`Examples: ${exampleValidationResult.exampleFiles.length} files checked`);
  console.log("");
  console.log("Required next manual step:");
  console.log("  npm run pack:dry-run");
  console.log("  npm publish --dry-run --access public");
  console.log("  npm publish --access public");

  if (warnings.length > 0) {
    console.log("");
    console.log("Warnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.log("");
    console.log("Publish check failed:");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("");
  console.log("npm publish readiness check passed.");
}

function runDoctor() {
  const errors = [];
  const warnings = [];
  const packageJson = JSON.parse(readFileSync(path.resolve(packageRoot, "package.json"), "utf8"));
  const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
  const validationResult = getTemplateValidationResult();

  if (nodeMajor < 18) {
    errors.push(`Node.js 版本过低：${process.versions.node}。本项目需要 Node.js >= 18。`);
  }

  try {
    accessSync(invocationRoot, constants.W_OK);
  } catch {
    errors.push(`当前目录不可写：${invocationRoot}`);
  }

  if (validationResult.errors.length > 0) {
    errors.push(...validationResult.errors);
  }

  if (packageRoot === invocationRoot) {
    warnings.push("当前在 ai-devtools-cn 仓库内运行。外部项目试用时，建议在你的目标项目目录运行 CLI。");
  }

  console.log("AI DevTools CN doctor");
  console.log("");
  console.log(`Package: ${packageJson.name}@${packageJson.version}`);
  console.log(`Package root: ${packageRoot}`);
  console.log(`Current directory: ${invocationRoot}`);
  console.log(`Node.js: ${process.versions.node}`);
  console.log(`Templates: ${templates.length} registered, ${validationResult.templateFiles.length} files checked`);
  console.log(`Kits: ${kits.length}`);
  console.log(`Examples: ${examples.reduce((total, group) => total + group.items.length, 0)}`);
  console.log("");
  console.log("Recommended trial command:");
  console.log("  npx ai-devtools-cn trial --template pr-review --output work/trial");

  if (warnings.length > 0) {
    console.log("");
    console.log("Warnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.log("");
    console.log("Doctor failed:");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("");
  console.log("Doctor passed.");
}

function getTemplateValidationResult() {
  const errors = [];
  const slugs = new Set();
  const registeredFiles = new Set();

  for (const template of templates) {
    for (const field of ["slug", "title", "file", "useCase", "output"]) {
      if (!template[field] || template[field].trim() === "") {
        errors.push(`${template.slug ?? "(missing slug)"} 缺少字段：${field}`);
      }
    }

    if (slugs.has(template.slug)) {
      errors.push(`重复 slug：${template.slug}`);
    }
    slugs.add(template.slug);

    if (!template.file.startsWith("templates/") || !template.file.endsWith(".md")) {
      errors.push(`${template.slug} 的文件路径必须指向 templates/*.md：${template.file}`);
    }

    if (registeredFiles.has(template.file)) {
      errors.push(`重复注册模板文件：${template.file}`);
    }
    registeredFiles.add(template.file);

    const fullPath = path.resolve(packageRoot, template.file);
    if (!existsSync(fullPath)) {
      errors.push(`${template.slug} 注册的文件不存在：${template.file}`);
      continue;
    }

    const content = readFileSync(fullPath, "utf8");
    if (!content.trim().startsWith("# ")) {
      errors.push(`${template.file} 应该以一级标题开头`);
    }
    if (content.trim().length < 80) {
      errors.push(`${template.file} 内容过短，可能不是可用模板`);
    }
  }

  const templateDir = path.resolve(packageRoot, "templates");
  const templateFiles = readdirSync(templateDir)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map((file) => `templates/${file}`)
    .sort();

  for (const file of templateFiles) {
    if (!registeredFiles.has(file)) {
      errors.push(`模板文件未注册到 CLI：${file}`);
    }
  }

  return { errors, templateFiles };
}

function getExampleValidationResult() {
  const errors = [];
  const exampleFiles = [];

  for (const group of examples) {
    for (const item of group.items) {
      if (!item.slug || !item.title || !item.file || !item.useCase) {
        errors.push(`${item.slug ?? "(missing slug)"} 缺少案例注册字段`);
      }
      if (!item.file.startsWith("examples/") || !item.file.endsWith(".md")) {
        errors.push(`${item.slug} 的案例路径必须指向 examples/*.md：${item.file}`);
      }
      if (item.templateSlug && !findTemplate(item.templateSlug)) {
        errors.push(`${item.slug} 关联了未知模板：${item.templateSlug}`);
      }
      const fullPath = path.resolve(packageRoot, item.file);
      if (!existsSync(fullPath)) {
        errors.push(`${item.slug} 注册的案例文件不存在：${item.file}`);
        continue;
      }
      exampleFiles.push(item.file);
      const content = readFileSync(fullPath, "utf8");
      if (!content.trim().startsWith("# ")) {
        errors.push(`${item.file} 应该以一级标题开头`);
      }
    }
  }

  return { errors, exampleFiles };
}

function getMatchingTemplates(keyword) {
  const normalized = keyword.toLowerCase();
  return templates.filter((template) => {
    return [
      template.slug,
      template.title,
      template.file,
      template.useCase,
      template.output,
    ].some((value) => value.toLowerCase().includes(normalized));
  });
}

function getMatchingExamples(keyword) {
  const normalized = keyword.toLowerCase();
  const matches = [];

  for (const group of examples) {
    for (const item of group.items) {
      const values = [
        group.group,
        item.slug,
        item.title,
        item.file,
        item.useCase,
      ];
      if (values.some((value) => value.toLowerCase().includes(normalized))) {
        matches.push({ group: group.group, item });
      }
    }
  }

  return matches;
}

function readTemplate(template) {
  const fullPath = path.resolve(packageRoot, template.file);
  return readFileSync(fullPath, "utf8");
}

function readPackageManifest() {
  return JSON.parse(readFileSync(path.resolve(packageRoot, "package.json"), "utf8"));
}

function getVersionFromEnvOrCommand(envName, command, commandArgs) {
  const envValue = process.env[envName];
  if (envValue) {
    return { ok: true, value: envValue.trim() };
  }

  try {
    const value = execFileSync(command, commandArgs, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}

function resolveOutputPath(outputPath) {
  if (path.isAbsolute(outputPath)) {
    return outputPath;
  }
  return path.resolve(invocationRoot, outputPath);
}

function formatDisplayPath(filePath) {
  const relativePath = path.relative(invocationRoot, filePath);
  if (relativePath === "") {
    return ".";
  }
  if (relativePath.startsWith("..")) {
    return filePath;
  }
  return relativePath;
}

function formatShellArg(value) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function formatBranchSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function requireTemplate(slug) {
  if (!slug) {
    fail("请提供模板 slug。先运行 npm run templates:list 查看可用模板。");
  }

  const template = findTemplate(slug);
  if (!template) {
    fail(`未知模板 slug：${slug}\n先运行 npm run templates:list 查看可用模板。`);
  }

  return template;
}

function requireKit(slug) {
  if (!slug) {
    fail("请提供工作包 slug。先运行 npm run templates:kit 查看可用工作包。");
  }

  const kit = findKit(slug);
  if (!kit) {
    fail(`未知工作包 slug：${slug}\n先运行 npm run templates:kit 查看可用工作包。`);
  }

  return kit;
}

function requireOutreachChannel(slug) {
  const channel = outreachChannels.find((item) => item.slug === slug);
  if (!channel) {
    fail(`未知邀请渠道：${slug}\n可用渠道：${outreachChannels.map((item) => item.slug).join(", ")}`);
  }
  return channel;
}

function requireRecipe(slug) {
  if (!slug) {
    fail("请提供使用配方 slug。先运行 npm run templates:recipes 查看可用配方。");
  }

  const recipe = findRecipe(slug);
  if (!recipe) {
    fail(`未知使用配方：${slug}\n当前支持：${recipes.map((item) => item.slug).join(", ")}`);
  }

  return recipe;
}

function requireGoodFirstPrBrief(issueNumber) {
  if (!issueNumber) {
    fail("请提供 good first issue 编号，例如：npm run templates:claim -- 45 --output work/claim-45.md");
  }

  const normalized = issueNumber.startsWith("#") ? issueNumber : `#${issueNumber}`;
  const brief = goodFirstPrBriefs.find((item) => item.issue === normalized);
  if (!brief) {
    fail(`不支持的 good first issue：${issueNumber}\n当前支持：${goodFirstPrBriefs.map((item) => item.issue).join(", ")}`);
  }

  return brief;
}

function parseOptions(values) {
  const options = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--output") {
      options.output = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--force") {
      options.force = true;
      continue;
    }
    if (value === "--template") {
      options.template = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--scenario") {
      options.scenario = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--channel") {
      options.channel = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--issue") {
      options.issue = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--pr") {
      options.pr = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--author") {
      options.author = values[index + 1];
      index += 1;
      continue;
    }
    fail(`未知参数：${value}`);
  }
  return options;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

switch (command) {
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  case "list":
    listTemplates();
    break;
  case "examples":
    listExamples();
    break;
  case "recipes":
    if (args.length === 0) {
      listRecipes();
    } else {
      showRecipe(args[0]);
    }
    break;
  case "pilot":
    createPilotPack(args[0], parseOptions(args.slice(1)));
    break;
  case "pilot-invite":
    createPilotInvitePack(parseOptions(args));
    break;
  case "contribute":
    listContributionBriefs();
    break;
  case "launch":
    listLaunchChecklist();
    break;
  case "handoff":
    showHandoffKit(parseOptions(args));
    break;
  case "pr-pack":
    createPrPackDraft(args[0], parseOptions(args.slice(1)));
    break;
  case "review-pr":
    createExternalPrReviewChecklist(parseOptions(args));
    break;
  case "claim":
    createClaimDraft(args[0], parseOptions(args.slice(1)));
    break;
  case "starter":
    createStarterDraft(args[0], parseOptions(args.slice(1)));
    break;
  case "recommend":
    recommend(args[0]);
    break;
  case "search":
    searchTemplates(args[0]);
    break;
  case "show":
    showTemplate(args[0]);
    break;
  case "new":
    createWorkingDraft(args[0], parseOptions(args.slice(1)));
    break;
  case "kit":
    if (args.length === 0) {
      listKits();
    } else {
      createKit(args[0], parseOptions(args.slice(1)));
    }
    break;
  case "trial":
    createTrialPack(parseOptions(args));
    break;
  case "feedback":
    createFeedbackDraft(parseOptions(args));
    break;
  case "outreach":
    createOutreachPack(parseOptions(args));
    break;
  case "adoption":
    createAdoptionSprint(parseOptions(args));
    break;
  case "evidence":
    createEvidenceLedger(parseOptions(args));
    break;
  case "readiness":
    createOpenAICodexReadiness(parseOptions(args));
    break;
  case "publish-status":
    showPublishStatus();
    break;
  case "doctor":
    runDoctor();
    break;
  case "validate":
    validateTemplates();
    break;
  case "publish-check":
    runPublishCheck();
    break;
  default:
    fail(`未知命令：${command}\n运行 npm run templates:help 查看用法。`);
}
