import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const cliPath = path.join(repoRoot, "scripts", "template-cli.mjs");

function run(args, options = {}) {
  return execFileSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

const listOutput = run(["list"]);
assert.match(listOutput, /pr-review/);
assert.match(listOutput, /ci-troubleshooting/);

const aliasOutput = run(["templates:list"]);
assert.match(aliasOutput, /release-note/);

const searchOutput = run(["search", "ci"]);
assert.match(searchOutput, /ci-troubleshooting/);
assert.match(searchOutput, /release-checklist/);

const showOutput = run(["show", "pr-review"]);
assert.match(showOutput, /PR Review 模板/);
assert.match(showOutput, /templates\/pr-review-template\.md/);

const tempDir = mkdtempSync(path.join(tmpdir(), "ai-devtools-cn-"));
const draftPath = path.join(tempDir, "ci-debug.md");
const newOutput = run(["new", "ci-troubleshooting", "--output", draftPath]);
assert.match(newOutput, /已生成工作稿/);
assert.equal(existsSync(draftPath), true);

const draft = readFileSync(draftPath, "utf8");
assert.match(draft, /CI 排错模板工作稿/);
assert.match(draft, /项目背景：/);
assert.match(draft, /模板正文/);

assert.throws(
  () => run(["new", "ci-troubleshooting", "--output", draftPath]),
  /输出文件已存在/
);

const forcedOutput = run(["new", "ci-troubleshooting", "--output", draftPath, "--force"]);
assert.match(forcedOutput, /已生成工作稿/);

console.log("template CLI tests passed");
