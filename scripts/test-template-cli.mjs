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

const examplesOutput = run(["examples"]);
assert.match(examplesOutput, /基础示例/);
assert.match(examplesOutput, /python-pytest-failure/);
assert.match(examplesOutput, /examples\/trial-packs\/node-ci-failure\/README\.md/);

const examplesAliasOutput = run(["templates:examples"]);
assert.match(examplesAliasOutput, /真实维护案例/);
assert.match(examplesAliasOutput, /template-registry-validation/);

const validateOutput = run(["validate"]);
assert.match(validateOutput, /Template registry validation passed/);
assert.match(validateOutput, /templates registered/);

const validateAliasOutput = run(["templates:validate"]);
assert.match(validateAliasOutput, /template files checked/);

const doctorOutput = run(["doctor"]);
assert.match(doctorOutput, /AI DevTools CN doctor/);
assert.match(doctorOutput, /Doctor passed/);
assert.match(doctorOutput, /Templates: \d+ registered/);
assert.match(doctorOutput, /Examples: \d+/);
assert.match(doctorOutput, /Recommended trial command/);

const doctorAliasOutput = run(["templates:doctor"]);
assert.match(doctorAliasOutput, /Package: ai-devtools-cn@/);
assert.match(doctorAliasOutput, /Node\.js:/);

const kitListOutput = run(["kit"]);
assert.match(kitListOutput, /oss-maintainer/);
assert.match(kitListOutput, /pr-review/);

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

const kitPath = path.join(tempDir, "oss-maintainer-kit");
const kitOutput = run(["kit", "oss-maintainer", "--output", kitPath]);
assert.match(kitOutput, /已生成工作包/);
assert.equal(existsSync(path.join(kitPath, "README.md")), true);
assert.equal(existsSync(path.join(kitPath, "pr-review.md")), true);
assert.equal(existsSync(path.join(kitPath, "issue-triage.md")), true);
assert.equal(existsSync(path.join(kitPath, "ci-troubleshooting.md")), true);
assert.equal(existsSync(path.join(kitPath, "release-note.md")), true);
assert.equal(existsSync(path.join(kitPath, "maintainer-weekly-checklist.md")), true);
assert.equal(existsSync(path.join(kitPath, "ai-output-evaluation.md")), true);

const kitReadme = readFileSync(path.join(kitPath, "README.md"), "utf8");
assert.match(kitReadme, /开源维护者工作包/);
assert.match(kitReadme, /推荐使用顺序/);

assert.throws(
  () => run(["kit", "oss-maintainer", "--output", kitPath]),
  /输出文件已存在/
);

const forcedKitOutput = run(["kit", "oss-maintainer", "--output", kitPath, "--force"]);
assert.match(forcedKitOutput, /已生成工作包/);

const feedbackPath = path.join(tempDir, "feedback.md");
const feedbackOutput = run([
  "feedback",
  "--template",
  "pr-review",
  "--scenario",
  "review a documentation PR",
  "--output",
  feedbackPath,
]);
assert.match(feedbackOutput, /已生成反馈 issue 草稿/);
assert.equal(existsSync(feedbackPath), true);

const feedbackDraft = readFileSync(feedbackPath, "utf8");
assert.match(feedbackDraft, /PR Review 模板/);
assert.match(feedbackDraft, /review a documentation PR/);
assert.match(feedbackDraft, /没有包含 API key/);
assert.match(feedbackDraft, /template_feedback\.yml/);

assert.throws(
  () => run(["feedback", "--template", "pr-review", "--output", feedbackPath]),
  /输出文件已存在/
);

const forcedFeedbackOutput = run(["feedback", "--template", "pr-review", "--output", feedbackPath, "--force"]);
assert.match(forcedFeedbackOutput, /已生成反馈 issue 草稿/);

const feedbackAliasPath = path.join(tempDir, "feedback-alias.md");
const feedbackAliasOutput = run(["templates:feedback", "--output", feedbackAliasPath]);
assert.match(feedbackAliasOutput, /已生成反馈 issue 草稿/);
assert.equal(existsSync(feedbackAliasPath), true);

const callerDir = mkdtempSync(path.join(tmpdir(), "ai-devtools-cn-caller-"));
const callerDraftOutput = run(["new", "pr-review", "--output", "work/pr-review.md"], {
  cwd: callerDir,
});
assert.match(callerDraftOutput, /work\/pr-review\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "pr-review.md")), true);

const callerKitOutput = run(["kit", "oss-maintainer", "--output", "work/maintainer-kit"], {
  cwd: callerDir,
});
assert.match(callerKitOutput, /work\/maintainer-kit/);
assert.equal(existsSync(path.join(callerDir, "work", "maintainer-kit", "README.md")), true);

const callerFeedbackOutput = run(["feedback", "--output", "work/feedback.md"], {
  cwd: callerDir,
});
assert.match(callerFeedbackOutput, /work\/feedback\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "feedback.md")), true);

const trialPath = path.join(tempDir, "trial-pack");
const trialOutput = run([
  "trial",
  "--template",
  "ci-troubleshooting",
  "--scenario",
  "debug a Node.js CI failure",
  "--output",
  trialPath,
]);
assert.match(trialOutput, /已生成试用包/);
assert.equal(existsSync(path.join(trialPath, "README.md")), true);
assert.equal(existsSync(path.join(trialPath, "ci-troubleshooting.md")), true);
assert.equal(existsSync(path.join(trialPath, "feedback.md")), true);

const trialReadme = readFileSync(path.join(trialPath, "README.md"), "utf8");
assert.match(trialReadme, /15 分钟试用包/);
assert.match(trialReadme, /debug a Node.js CI failure/);
assert.match(trialReadme, /公开安全提醒/);

const trialFeedback = readFileSync(path.join(trialPath, "feedback.md"), "utf8");
assert.match(trialFeedback, /CI 排错模板/);
assert.match(trialFeedback, /template_feedback\.yml/);

assert.throws(
  () => run(["trial", "--template", "ci-troubleshooting", "--output", trialPath]),
  /输出文件已存在/
);

const forcedTrialOutput = run(["trial", "--template", "ci-troubleshooting", "--output", trialPath, "--force"]);
assert.match(forcedTrialOutput, /已生成试用包/);

const callerTrialOutput = run(["trial", "--output", "work/trial"], {
  cwd: callerDir,
});
assert.match(callerTrialOutput, /work\/trial/);
assert.equal(existsSync(path.join(callerDir, "work", "trial", "README.md")), true);

const callerDoctorOutput = run(["doctor"], {
  cwd: callerDir,
});
assert.match(callerDoctorOutput, new RegExp(path.basename(callerDir)));
assert.doesNotMatch(callerDoctorOutput, /当前在 ai-devtools-cn 仓库内运行/);

console.log("template CLI tests passed");
