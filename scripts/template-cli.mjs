#!/usr/bin/env node

import { constants, existsSync, accessSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const invocationRoot = process.cwd();

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
];

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
      "ai-output-evaluation",
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
  ai-devtools-cn search <keyword>
  ai-devtools-cn show <slug>
  ai-devtools-cn new <slug> --output <path>
  ai-devtools-cn kit <slug> --output <dir>
  ai-devtools-cn trial --output <dir>
  ai-devtools-cn feedback --output <path>
  ai-devtools-cn doctor
  ai-devtools-cn validate

NPM scripts:
  npm run templates:list
  npm run templates:search -- <keyword>
  npm run templates:show -- <slug>
  npm run templates:new -- <slug> --output <path>
  npm run templates:kit -- <slug> --output <dir>
  npm run templates:trial -- --template <slug> --output <dir>
  npm run templates:feedback -- --template <slug> --output <path>
  npm run templates:doctor
  npm run templates:validate

Examples:
  npx ai-devtools-cn list
  npx ai-devtools-cn search ci
  npx ai-devtools-cn show pr-review
  npx ai-devtools-cn new ci-troubleshooting --output work/ci-debug.md
  npx ai-devtools-cn kit oss-maintainer --output work/oss-maintainer-kit
  npx ai-devtools-cn trial --template pr-review --scenario "review a documentation PR" --output work/trial
  npx ai-devtools-cn feedback --template pr-review --output work/feedback.md
  npx ai-devtools-cn doctor
  npx ai-devtools-cn validate

  npm run templates:list
  npm run templates:search -- ci
  npm run templates:show -- pr-review
  npm run templates:new -- ci-troubleshooting --output work/ci-debug.md
  npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
  npm run templates:trial -- --template pr-review --scenario "review a documentation PR" --output work/trial
  npm run templates:feedback -- --template pr-review --output work/feedback.md
  npm run templates:doctor
  npm run templates:validate

Options:
  --output <path>  Output path for the generated working draft or kit directory
  --template <slug> Template slug to prefill feedback context
  --scenario <text> Public-safe usage scenario to prefill feedback context
  --force          Overwrite output file if it already exists
`);
}

function findTemplate(slug) {
  return templates.find((template) => template.slug === slug);
}

function findKit(slug) {
  return kits.find((kit) => kit.slug === slug);
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

  const normalized = keyword.toLowerCase();
  const matches = templates.filter((template) => {
    return [
      template.slug,
      template.title,
      template.file,
      template.useCase,
      template.output,
    ].some((value) => value.toLowerCase().includes(normalized));
  });

  if (matches.length === 0) {
    fail(`没有找到匹配模板：${keyword}`);
  }

  listTemplates(matches);
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

function formatFeedbackDraft(template, options) {
  const templateLine = template
    ? `${template.slug} - ${template.title} (${template.file})`
    : "请填写使用的模板、CLI 命令或案例链接";
  const scenarioLine = options.scenario ?? "请填写公开安全的使用场景";

  return `# Template usage feedback issue draft

> 提交入口：https://github.com/ONEISALL7/ai-devtools-cn/issues/new?template=template_feedback.yml
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

function readTemplate(template) {
  const fullPath = path.resolve(packageRoot, template.file);
  return readFileSync(fullPath, "utf8");
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
  case "doctor":
    runDoctor();
    break;
  case "validate":
    validateTemplates();
    break;
  default:
    fail(`未知命令：${command}\n运行 npm run templates:help 查看用法。`);
}
