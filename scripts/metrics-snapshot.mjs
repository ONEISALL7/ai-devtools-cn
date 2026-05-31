#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const repo = "ONEISALL7/ai-devtools-cn";
const packageName = "ai-devtools-cn";
const args = process.argv.slice(2);

const options = parseOptions(args);
const today = new Date().toISOString().slice(0, 10);

const repoInfo = getJson("gh", [
  "repo",
  "view",
  repo,
  "--json",
  "stargazerCount,forkCount,isPrivate,visibility,url,description",
]);

const mergedPrs = getJson("gh", [
  "pr",
  "list",
  "--repo",
  repo,
  "--state",
  "merged",
  "--limit",
  "100",
  "--json",
  "number,title,mergedAt",
]);

const closedIssues = getJson("gh", [
  "issue",
  "list",
  "--repo",
  repo,
  "--state",
  "closed",
  "--limit",
  "100",
  "--json",
  "number,title,closedAt",
]);

const openIssues = getJson("gh", [
  "issue",
  "list",
  "--repo",
  repo,
  "--state",
  "open",
  "--limit",
  "100",
  "--json",
  "number,title",
]);

const releases = getText("gh", ["release", "list", "--repo", repo, "--limit", "20"]);
const npmVersion = getText("npm", ["view", packageName, "version", "--strict-ssl=false"], {
  allowFailure: true,
});

const releaseRows = releases.ok
  ? releases.value.trim().split("\n").filter(Boolean)
  : [];

const markdown = `# 项目指标快照

日期：${today}

## 仓库

| 指标 | 值 |
| --- | --- |
| 仓库 | ${repoInfo.ok ? repoInfo.value.url : `https://github.com/${repo}`} |
| 可见性 | ${repoInfo.ok ? repoInfo.value.visibility : "unknown"} |
| Stars | ${repoInfo.ok ? repoInfo.value.stargazerCount : "unknown"} |
| Forks | ${repoInfo.ok ? repoInfo.value.forkCount : "unknown"} |
| Merged PRs | ${mergedPrs.ok ? mergedPrs.value.length : "unknown"} |
| Closed issues | ${closedIssues.ok ? closedIssues.value.length : "unknown"} |
| Open issues | ${openIssues.ok ? openIssues.value.length : "unknown"} |
| Releases | ${releaseRows.length || "unknown"} |
| npm package | ${npmVersion.ok ? npmVersion.value.trim() : "not published or unavailable"} |

## 最近 merged PR

${formatItems(mergedPrs.ok ? mergedPrs.value.slice(0, 10) : [], "mergedAt")}

## 最近 closed issue

${formatItems(closedIssues.ok ? closedIssues.value.slice(0, 10) : [], "closedAt")}

## Release 列表

${releaseRows.length > 0 ? releaseRows.map((row) => `- ${row}`).join("\n") : "- unavailable"}

## 备注

- 这个快照用于维护者复盘和申请材料准备。
- npm 查询失败不一定代表包名不可用，可能是网络、证书或登录环境问题。
- 不要手动夸大 stars、downloads、forks 或外部贡献数量。
`;

if (options.output) {
  const outputPath = path.resolve(options.output);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, markdown, "utf8");
  console.log(`已写入指标快照：${options.output}`);
} else {
  console.log(markdown);
}

function formatItems(items, dateField) {
  if (items.length === 0) {
    return "- unavailable";
  }

  return items
    .map((item) => {
      const date = item[dateField] ? item[dateField].slice(0, 10) : "unknown";
      return `- #${item.number} ${item.title} (${date})`;
    })
    .join("\n");
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
