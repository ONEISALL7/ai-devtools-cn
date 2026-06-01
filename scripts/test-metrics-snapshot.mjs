import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const tempDir = mkdtempSync(join(tmpdir(), "ai-devtools-cn-metrics-"));

try {
  writeFileSync(join(tempDir, "gh"), fakeGhScript(), "utf8");
  writeFileSync(join(tempDir, "npm"), fakeNpmScript(), "utf8");
  chmodSync(join(tempDir, "gh"), 0o755);
  chmodSync(join(tempDir, "npm"), 0o755);

  const output = execFileSync("node", ["scripts/metrics-snapshot.mjs"], {
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: `${tempDir}:${process.env.PATH}`,
    },
  });

  assert.match(output, /\| Merged PRs \| 101 \|/);
  assert.match(output, /\| Closed issues \| 101 \|/);
} finally {
  rmSync(tempDir, { force: true, recursive: true });
}

console.log("metrics snapshot tests passed");

function fakeGhScript() {
  return `#!/usr/bin/env node
const args = process.argv.slice(2);

if (args[0] === "repo" && args[1] === "view") {
  console.log(JSON.stringify({
    description: "test repo",
    forkCount: 1,
    isPrivate: false,
    stargazerCount: 3,
    url: "https://github.com/ONEISALL7/ai-devtools-cn",
    visibility: "PUBLIC"
  }));
  process.exit(0);
}

if (args[0] === "release" && args[1] === "list") {
  console.log("v0.16.2\\\\tLatest\\\\tv0.16.2\\\\t2026-06-01T02:19:10Z");
  process.exit(0);
}

if (args[0] === "pr" && args[1] === "list") {
  const limit = Number(args[args.indexOf("--limit") + 1]);
  console.log(JSON.stringify(makeItems(Math.min(limit, 101), "mergedAt")));
  process.exit(0);
}

if (args[0] === "issue" && args[1] === "list") {
  const limit = Number(args[args.indexOf("--limit") + 1]);
  const state = args[args.indexOf("--state") + 1];
  const count = state === "closed" ? Math.min(limit, 101) : 6;
  console.log(JSON.stringify(makeItems(count, state === "closed" ? "closedAt" : null)));
  process.exit(0);
}

console.error("Unexpected gh args: " + args.join(" "));
process.exit(1);

function makeItems(count, dateField) {
  return Array.from({ length: count }, (_, index) => {
    const item = {
      author: { is_bot: false, login: "ONEISALL7" },
      labels: [],
      number: count - index,
      title: "Item " + (count - index)
    };
    if (dateField) {
      item[dateField] = "2026-06-01T00:00:00Z";
    }
    return item;
  });
}
`;
}

function fakeNpmScript() {
  return `#!/usr/bin/env node
const args = process.argv.slice(2);
if (args[0] === "view") {
  console.log("0.16.2");
  process.exit(0);
}
console.error("Unexpected npm args: " + args.join(" "));
process.exit(1);
`;
}
