#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { formatSnapshotDate } from "./date-utils.mjs";

const repo = "ONEISALL7/ai-devtools-cn";
const repoOwner = "ONEISALL7";
const packageName = "ai-devtools-cn";
const githubListLimit = "1000";
const args = process.argv.slice(2);

const options = parseOptions(args);
const today = formatSnapshotDate();

const repoInfo = getJsonFromEnvOrCommand(
  "AI_DEVTOOLS_CN_REPO_INFO_JSON",
  "gh",
  [
    "repo",
    "view",
    repo,
    "--json",
    "stargazerCount,forkCount,isPrivate,visibility,url,description",
  ],
);

const mergedPrs = getJsonFromEnvOrCommand(
  "AI_DEVTOOLS_CN_MERGED_PRS_JSON",
  "gh",
  [
    "pr",
    "list",
    "--repo",
    repo,
    "--state",
    "merged",
    "--limit",
    githubListLimit,
    "--json",
    "number,title,mergedAt,author",
  ],
);

const closedIssues = getJsonFromEnvOrCommand(
  "AI_DEVTOOLS_CN_CLOSED_ISSUES_JSON",
  "gh",
  [
    "issue",
    "list",
    "--repo",
    repo,
    "--state",
    "closed",
    "--limit",
    githubListLimit,
    "--json",
    "number,title,closedAt,labels,author",
  ],
);

const openIssues = getJsonFromEnvOrCommand(
  "AI_DEVTOOLS_CN_OPEN_ISSUES_JSON",
  "gh",
  [
    "issue",
    "list",
    "--repo",
    repo,
    "--state",
    "open",
    "--limit",
    githubListLimit,
    "--json",
    "number,title,labels,author",
  ],
);

const releases = getJsonFromEnvOrCommand(
  "AI_DEVTOOLS_CN_RELEASE_JSON",
  "gh",
  ["release", "list", "--repo", repo, "--limit", githubListLimit, "--json", "tagName,name,publishedAt"],
  { allowFailure: true },
);
const npmVersion = getText("npm", ["view", packageName, "version", "--strict-ssl=false"], {
  allowFailure: true,
});
const npmDownloads = await getNpmDownloads(packageName);

const releaseRows = releases.ok
  ? releases.value
      .filter((row) => row.tagName)
  : [];
const releaseLinks = releases.ok
  ? releases.value
      .filter((row) => row.tagName)
      .map((row) => {
        const tag = row.tagName;
        const publishedAtRaw = row.publishedAt || "";
        const publishedAt = publishedAtRaw ? publishedAtRaw.slice(0, 10) : "unknown";
        return `- [${tag}](https://github.com/${repo}/releases/tag/${tag}) (${publishedAt})`;
      })
  : [];
const mergedPrItems = mergedPrs.ok ? mergedPrs.value : [];
const closedIssueItems = closedIssues.ok ? closedIssues.value : [];
const openIssueItems = openIssues.ok ? openIssues.value : [];
const feedbackIssues = [...closedIssueItems, ...openIssueItems]
  .filter((issue) => hasLabel(issue, "feedback"));
const externalFeedbackIssues = feedbackIssues
  .filter((issue) => isExternalHumanAuthor(issue.author));
const externalMergedPrs = mergedPrItems
  .filter((pr) => isExternalHumanAuthor(pr.author));

const markdown = `# 项目指标快照

日期：${today}

## 仓库

| 指标 | 值 |
| --- | --- |
| 仓库 | <${repoInfo.ok ? repoInfo.value.url : `https://github.com/${repo}`}> |
| 可见性 | ${repoInfo.ok ? repoInfo.value.visibility : "unknown"} |
| Stars | ${repoInfo.ok ? repoInfo.value.stargazerCount : "unknown"} |
| Forks | ${repoInfo.ok ? repoInfo.value.forkCount : "unknown"} |
| Merged PRs | ${mergedPrs.ok ? mergedPrItems.length : "unknown"} |
| External merged PRs | ${mergedPrs.ok ? externalMergedPrs.length : "unknown"} |
| Closed issues | ${closedIssues.ok ? closedIssueItems.length : "unknown"} |
| Open issues | ${openIssues.ok ? openIssueItems.length : "unknown"} |
| Feedback-labeled issues | ${closedIssues.ok && openIssues.ok ? feedbackIssues.length : "unknown"} |
| External feedback-labeled issues | ${closedIssues.ok && openIssues.ok ? externalFeedbackIssues.length : "unknown"} |
| Releases | ${releaseRows.length || "unknown"} |
| npm package | ${npmVersion.ok ? npmVersion.value.trim() : "not published or unavailable"} |
| npm monthly downloads | ${npmDownloads.ok ? npmDownloads.value.downloads : "unavailable"} |

## 最近 merged PR

${formatPullRequests(mergedPrItems.slice(0, 10))}

## 最近 closed issue

${formatIssues(closedIssueItems.slice(0, 10), "closedAt")}

## 外部采用信号

Feedback-labeled issues:

${formatIssues(feedbackIssues.slice(0, 10), "closedAt", "- none yet")}

External feedback-labeled issues:

${formatIssues(externalFeedbackIssues.slice(0, 10), "closedAt", "- none yet")}

External merged PRs:

${formatPullRequests(externalMergedPrs.slice(0, 10), "- none yet")}

## Release 列表

${releaseLinks.length > 0 ? releaseLinks.join("\n") : "- unavailable"}

## 备注

- 这个快照用于维护者复盘和公开证据追踪。
- npm 查询失败不一定代表包名不可用，可能是网络、证书或登录环境问题。
- npm monthly downloads 来自 npm downloads API 的 last-month point 查询；网络失败时会显示 unavailable。
- 不要手动夸大 stars、downloads、forks 或外部贡献数量。
- GitHub PR/issue 列表当前最多抓取最近 ${githubListLimit} 条，用于避免早期快照在超过 100 条维护记录后低估指标。
- 不要把维护者自己创建的 issue 包装成外部用户反馈；外部采用信号需要结合作者、上下文和来源人工判断。
`;

if (options.output) {
  const outputPath = path.resolve(options.output);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, markdown, "utf8");
  console.log(`已写入指标快照：${options.output}`);
} else {
  console.log(markdown);
}

function formatPullRequests(items, emptyText = "- unavailable") {
  if (items.length === 0) {
    return emptyText;
  }

  return items
    .map((item) => {
      const date = item.mergedAt ? item.mergedAt.slice(0, 10) : "unknown";
      const author = item.author?.login ? ` by @${item.author.login}` : "";
      return `- #${item.number} ${item.title}${author} (${date})`;
    })
    .join("\n");
}

function formatIssues(items, dateField, emptyText = "- unavailable") {
  if (items.length === 0) {
    return emptyText;
  }

  return items
    .map((item) => {
      const date = item[dateField] ? item[dateField].slice(0, 10) : "open";
      const author = item.author?.login ? ` by @${item.author.login}` : "";
      const labels = Array.isArray(item.labels) && item.labels.length > 0
        ? ` [${item.labels.map((label) => label.name).join(", ")}]`
        : "";
      return `- #${item.number} ${item.title}${author}${labels} (${date})`;
    })
    .join("\n");
}

function hasLabel(item, labelName) {
  return Array.isArray(item.labels)
    && item.labels.some((label) => label.name === labelName);
}

function isExternalHumanAuthor(author) {
  return Boolean(author?.login)
    && author.login !== repoOwner
    && author.is_bot !== true;
}

function getJson(command, commandArgs) {
  const result = getText(command, commandArgs, { allowFailure: true });
  if (!result.ok) {
    return result;
  }

  try {
    return { ok: true, value: JSON.parse(result.value) };
  } catch (error) {
    return { ok: false, error };
  }
}

function getJsonFromEnvOrCommand(envName, command, commandArgs) {
  const envValue = process.env[envName];
  if (envValue) {
    try {
      const value = JSON.parse(envValue);
      return { ok: true, value: Array.isArray(value) ? value : (value ? [value] : []) };
    } catch {
      return { ok: false, error: new Error(`Invalid JSON in ${envName}`) };
    }
  }

  return getJson(command, commandArgs);
}

function getTextFromEnvOrCommand(envName, command, commandArgs, options = {}) {
  const envValue = process.env[envName];
  if (envValue) {
    return { ok: true, value: envValue };
  }
  return getText(command, commandArgs, options);
}

function getText(command, commandArgs, { allowFailure = false } = {}) {
  try {
    return {
      ok: true,
      value: execFileSync(command, commandArgs, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }),
    };
  } catch (error) {
    if (!allowFailure) {
      throw error;
    }
    return { ok: false, error };
  }
}

async function getNpmDownloads(name) {
  const override = process.env.AI_DEVTOOLS_CN_NPM_DOWNLOADS_JSON;
  if (override) {
    return parseNpmDownloadsJson(override);
  }

  try {
    const value = execFileSync("curl", [
      "-L",
      "--max-time",
      "8",
      `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(name)}`,
    ], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (!value) {
      return { ok: false, error: new Error("npm downloads API returned empty body") };
    }
    return parseNpmDownloadsJson(value);
  } catch (error) {
    return { ok: false, error };
  }
}

function parseNpmDownloadsJson(value) {
  try {
    const parsed = JSON.parse(value);
    if (Number.isFinite(parsed.downloads)) {
      return { ok: true, value: parsed };
    }
    return { ok: false, error: new Error("npm downloads response missing downloads") };
  } catch (error) {
    return { ok: false, error };
  }
}

function parseOptions(values) {
  const parsed = {};

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--output") {
      parsed.output = values[index + 1];
      index += 1;
      continue;
    }
    if (value === "--help" || value === "-h") {
      console.log(`Usage:
  npm run metrics:snapshot
  npm run metrics:snapshot -- --output work/metrics.md`);
      process.exit(0);
    }
    console.error(`未知参数：${value}`);
    process.exit(1);
  }

  return parsed;
}
