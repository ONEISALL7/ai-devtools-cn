import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const cliPath = path.join(repoRoot, "scripts", "template-cli.mjs");
const packageJson = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
const escapedPackageVersion = packageJson.version.replaceAll(".", "\\.");

function run(args, options = {}) {
  return execFileSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

const tempDir = mkdtempSync(path.join(tmpdir(), "ai-devtools-cn-"));

const listOutput = run(["list"]);
assert.match(listOutput, /pr-review/);
assert.match(listOutput, /ci-troubleshooting/);
assert.match(listOutput, /contributor-onboarding/);
assert.match(listOutput, /public-safety-redaction/);

const aliasOutput = run(["templates:list"]);
assert.match(aliasOutput, /release-note/);

const examplesOutput = run(["examples"]);
assert.match(examplesOutput, /基础示例/);
assert.match(examplesOutput, /python-pytest-failure/);
assert.match(examplesOutput, /examples\/trial-packs\/node-ci-failure\/README\.md/);

const examplesAliasOutput = run(["templates:examples"]);
assert.match(examplesAliasOutput, /真实维护案例/);
assert.match(examplesAliasOutput, /template-registry-validation/);

const recipesOutput = run(["recipes"]);
assert.match(recipesOutput, /真实试用配方/);
assert.match(recipesOutput, /pr-review-docs/);
assert.match(recipesOutput, /ci-failure/);
assert.match(recipesOutput, /ai-devtools-cn recipes pr-review-docs/);

const recipeOutput = run(["recipes", "ci-failure"]);
assert.match(recipeOutput, /CI 失败排查/);
assert.match(recipeOutput, /npx ai-devtools-cn trial --template ci-troubleshooting/);
assert.match(recipeOutput, /反馈 issue/);

assert.throws(
  () => run(["recipes", "unknown-recipe"]),
  /未知使用配方/
);

const pilotPath = path.join(tempDir, "external-pilot");
const pilotOutput = run(["pilot", "ci-failure", "--output", pilotPath]);
assert.match(pilotOutput, /已生成 30 分钟外部试用任务包/);
assert.equal(existsSync(path.join(pilotPath, "README.md")), true);
assert.equal(existsSync(path.join(pilotPath, "tester-task.md")), true);
assert.equal(existsSync(path.join(pilotPath, "maintainer-evidence.md")), true);

const pilotReadme = readFileSync(path.join(pilotPath, "README.md"), "utf8");
assert.match(pilotReadme, /30 分钟外部试用任务/);
assert.match(pilotReadme, /debug a failing CI job/);
assert.match(pilotReadme, /external_pilot_feedback\.yml/);

const pilotTesterTask = readFileSync(path.join(pilotPath, "tester-task.md"), "utf8");
assert.match(pilotTesterTask, /外部试用任务/);
assert.match(pilotTesterTask, /npx ai-devtools-cn doctor/);
assert.match(pilotTesterTask, /不要提交 token/);

const pilotEvidence = readFileSync(path.join(pilotPath, "maintainer-evidence.md"), "utf8");
assert.match(pilotEvidence, /维护者证据记录/);
assert.match(pilotEvidence, /external merged PR/);
assert.match(pilotEvidence, /feedback-driven PR/);

assert.throws(
  () => run(["pilot", "ci-failure", "--output", pilotPath]),
  /输出文件已存在/
);

const forcedPilotOutput = run(["pilot", "ci-failure", "--output", pilotPath, "--force"]);
assert.match(forcedPilotOutput, /已生成 30 分钟外部试用任务包/);

const pilotAliasPath = path.join(tempDir, "external-pilot-alias");
const pilotAliasOutput = run(["templates:pilot", "issue-triage", "--output", pilotAliasPath]);
assert.match(pilotAliasOutput, /已生成 30 分钟外部试用任务包/);
assert.equal(existsSync(path.join(pilotAliasPath, "tester-task.md")), true);

const pilotInviteOutput = run(["pilot-invite"]);
assert.match(pilotInviteOutput, /外部试用邀请包/);
assert.match(pilotInviteOutput, /npx ai-devtools-cn pilot ci-failure/);
assert.match(pilotInviteOutput, /external_pilot_feedback\.yml/);
assert.match(pilotInviteOutput, /external-pilot/);

const pilotInvitePath = path.join(tempDir, "pilot-invites.md");
const pilotInviteFileOutput = run(["templates:pilot-invite", "--output", pilotInvitePath]);
assert.match(pilotInviteFileOutput, /已生成外部试用邀请包/);
assert.equal(existsSync(pilotInvitePath), true);
const pilotInviteDraft = readFileSync(pilotInvitePath, "utf8");
assert.match(pilotInviteDraft, /维护者跟进表/);
assert.match(pilotInviteDraft, /pr-review-docs/);
assert.match(pilotInviteDraft, /issue-triage/);

const contributeOutput = run(["contribute"]);
assert.match(contributeOutput, /Good First PR Briefs/);
assert.match(contributeOutput, /#45/);
assert.match(contributeOutput, /#49/);
assert.match(contributeOutput, /npm run lint:md/);
assert.match(contributeOutput, /external merged PR/);
assert.match(contributeOutput, /git clone https:\/\/github\.com\/ONEISALL7\/ai-devtools-cn\.git/);
assert.match(contributeOutput, /npm run templates:handoff -- --issue 45/);
assert.match(contributeOutput, /npm run templates:pr-pack -- 45/);
assert.match(contributeOutput, /npm run templates:claim -- 45/);
assert.match(contributeOutput, /npm run templates:starter -- 45/);

const contributeAliasOutput = run(["templates:contribute"]);
assert.match(contributeAliasOutput, /外部贡献者入口/);
assert.match(contributeAliasOutput, /docs\/good-first-pr-briefs\.md/);

const launchOutput = run(["launch"]);
assert.match(launchOutput, /社区发布入口/);
assert.match(launchOutput, /docs\/community-launch-pack\.md/);
assert.match(launchOutput, /npx ai-devtools-cn doctor/);
assert.match(launchOutput, /template_feedback\.yml/);
assert.match(launchOutput, /Good First PR Briefs/);
assert.match(launchOutput, /external merged PR/);

const launchAliasOutput = run(["templates:launch"]);
assert.match(launchAliasOutput, /#51/);
assert.match(launchAliasOutput, /外部反馈/);

const handoffOutput = run(["handoff"]);
assert.match(handoffOutput, /外部 PR 交接包/);
assert.match(handoffOutput, /docs\/external-pr-handoff-kit\.md/);
assert.match(handoffOutput, /npm run templates:claim -- 45/);
assert.match(handoffOutput, /External merged PRs/);
assert.match(handoffOutput, /不能把维护者自己的 PR/);

const handoffAliasOutput = run(["templates:handoff"]);
assert.match(handoffAliasOutput, /Fork 仓库/);
assert.match(handoffAliasOutput, /Good First PR Briefs/);

const issueHandoffOutput = run(["handoff", "--issue", "45"]);
assert.match(issueHandoffOutput, /针对 #45 的外部 PR 交接包/);
assert.match(issueHandoffOutput, /Node\.js CI 排错示例/);
assert.match(issueHandoffOutput, /Add Node\.js CI troubleshooting case study/);
assert.match(issueHandoffOutput, /add-node-js-ci-troubleshooting-case-study/);
assert.match(issueHandoffOutput, /npm run templates:claim -- 45/);
assert.match(issueHandoffOutput, /npm run templates:starter -- 45/);
assert.match(issueHandoffOutput, /docs\/good-first-pr-briefs\.md#45-nodejs-ci-排错示例/);

const prPackOutput = run(["pr-pack", "45"]);
assert.match(prPackOutput, /外部贡献者 PR 包/);
assert.match(prPackOutput, /#45 Node\.js CI 排错示例/);
assert.match(prPackOutput, /Branch: add-node-js-ci-troubleshooting-case-study/);
assert.match(prPackOutput, /examples\/case-studies\/node-ci-troubleshooting\.md/);
assert.match(prPackOutput, /PR description to copy/);
assert.match(prPackOutput, /npm run templates:claim -- 45/);
assert.match(prPackOutput, /只能由外部贡献者用自己的 GitHub 账号提交/);

const prPackPath = path.join(tempDir, "pr-pack-49.md");
const prPackFileOutput = run(["pr-pack", "49", "--output", prPackPath]);
assert.match(prPackFileOutput, /已生成外部贡献者 PR 包/);
assert.equal(existsSync(prPackPath), true);
const prPackDraft = readFileSync(prPackPath, "utf8");
assert.match(prPackDraft, /#49 前端 README 改进示例/);
assert.match(prPackDraft, /examples\/frontend-readme-improvement-example\.md/);
assert.match(prPackDraft, /Add frontend README improvement example/);

assert.throws(
  () => run(["pr-pack", "999", "--output", path.join(tempDir, "pr-pack-999.md")]),
  /不支持的 good first issue/
);

const reviewPrOutput = run(["review-pr", "--pr", "123", "--author", "octocat", "--issue", "45"]);
assert.match(reviewPrOutput, /外部 PR review 清单/);
assert.match(reviewPrOutput, /PR: 123/);
assert.match(reviewPrOutput, /Author: octocat/);
assert.match(reviewPrOutput, /Related issue: #45/);
assert.match(reviewPrOutput, /npm run test/);
assert.match(reviewPrOutput, /External merged PRs/);
assert.match(reviewPrOutput, /不能把维护者自己的 PR/);

const recommendOutput = run(["recommend", "ci"]);
assert.match(recommendOutput, /Recommended templates/);
assert.match(recommendOutput, /ci-troubleshooting/);
assert.match(recommendOutput, /Recommended examples/);
assert.match(recommendOutput, /node-ci-failure/);
assert.match(recommendOutput, /Recommended trial command/);

const recommendAliasOutput = run(["templates:recommend", "pytest"]);
assert.match(recommendAliasOutput, /python-pytest-failure/);
assert.match(recommendAliasOutput, /ci-troubleshooting/);

const redactionRecommendOutput = run(["recommend", "脱敏"]);
assert.match(redactionRecommendOutput, /public-safety-redaction/);
assert.match(redactionRecommendOutput, /公开安全脱敏模板/);

const validateOutput = run(["validate"]);
assert.match(validateOutput, /Template registry validation passed/);
assert.match(validateOutput, /templates registered/);

const validateAliasOutput = run(["templates:validate"]);
assert.match(validateAliasOutput, /template files checked/);

const publishCheckOutput = run(["publish-check"]);
assert.match(publishCheckOutput, /AI DevTools CN publish check/);
assert.match(publishCheckOutput, /npm publish readiness check passed/);
assert.match(publishCheckOutput, /npm publish --dry-run --access public/);

const publishCheckAliasOutput = run(["templates:publish-check"]);
assert.match(publishCheckAliasOutput, /Package: ai-devtools-cn@/);
assert.match(publishCheckAliasOutput, /Examples: \d+ files checked/);

const publishStatusBehindOutput = run(["publish-status"], {
  env: {
    ...process.env,
    AI_DEVTOOLS_CN_NPM_VERSION: "0.16.1",
    AI_DEVTOOLS_CN_RELEASE_VERSION: "v0.16.2",
    AI_DEVTOOLS_CN_COMMITS_AFTER_RELEASE: "5",
  },
});
assert.match(publishStatusBehindOutput, /AI DevTools CN publish status/);
assert.match(publishStatusBehindOutput, new RegExp(`Local package\\.json: ${escapedPackageVersion}`));
assert.match(publishStatusBehindOutput, /npm package: 0\.16\.1/);
assert.match(publishStatusBehindOutput, /GitHub latest release: v0\.16\.2/);
assert.match(publishStatusBehindOutput, /Commits after latest release: 5/);
assert.match(publishStatusBehindOutput, /Status: npm is behind local package\.json/);
assert.match(publishStatusBehindOutput, /source is ahead of latest release tag/);
assert.match(publishStatusBehindOutput, /npm publish --access public/);

const publishStatusSyncedOutput = run(["templates:publish-status"], {
  env: {
    ...process.env,
    AI_DEVTOOLS_CN_NPM_VERSION: packageJson.version,
    AI_DEVTOOLS_CN_RELEASE_VERSION: `v${packageJson.version}`,
    AI_DEVTOOLS_CN_COMMITS_AFTER_RELEASE: "0",
  },
});
assert.match(publishStatusSyncedOutput, /Status: npm matches local package\.json/);
assert.match(publishStatusSyncedOutput, /Commits after latest release: 0/);
assert.match(publishStatusSyncedOutput, /npx ai-devtools-cn doctor/);

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

const claimPath = path.join(tempDir, "claim-45.md");
const claimOutput = run(["claim", "45", "--output", claimPath]);
assert.match(claimOutput, /已生成认领草稿/);
assert.equal(existsSync(claimPath), true);

const claimDraft = readFileSync(claimPath, "utf8");
assert.match(claimDraft, /Node\.js CI 排错示例/);
assert.match(claimDraft, /Good First Issue #45/);
assert.match(claimDraft, /Add Node\.js CI troubleshooting case study/);
assert.match(claimDraft, /npm run lint:md/);
assert.match(claimDraft, /Closes #45/);
assert.match(claimDraft, /不能把这个草稿计入 external merged PR/);

assert.throws(
  () => run(["claim", "999", "--output", path.join(tempDir, "claim-999.md")]),
  /不支持的 good first issue/
);

const claimAliasPath = path.join(tempDir, "claim-46.md");
const claimAliasOutput = run(["templates:claim", "46", "--output", claimAliasPath]);
assert.match(claimAliasOutput, /已生成认领草稿/);
assert.equal(existsSync(claimAliasPath), true);

const starterPath = path.join(tempDir, "node-ci-starter.md");
const starterOutput = run(["starter", "45", "--output", starterPath]);
assert.match(starterOutput, /已生成贡献起稿/);
assert.equal(existsSync(starterPath), true);

const starterDraft = readFileSync(starterPath, "utf8");
assert.match(starterDraft, /Node\.js CI 排错示例/);
assert.match(starterDraft, /Good First Issue #45/);
assert.match(starterDraft, /CI 排错模板/);
assert.match(starterDraft, /失败日志片段/);
assert.match(starterDraft, /npm run lint:md/);
assert.match(starterDraft, /不是 external merged PR/);

assert.throws(
  () => run(["starter", "999", "--output", path.join(tempDir, "starter-999.md")]),
  /不支持的 good first issue/
);

const starterAliasPath = path.join(tempDir, "dependency-starter.md");
const starterAliasOutput = run(["templates:starter", "46", "--output", starterAliasPath]);
assert.match(starterAliasOutput, /已生成贡献起稿/);
assert.equal(existsSync(starterAliasPath), true);

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

const redactionDraftPath = path.join(tempDir, "public-safety-redaction.md");
const redactionDraftOutput = run(["new", "public-safety-redaction", "--output", redactionDraftPath]);
assert.match(redactionDraftOutput, /已生成工作稿/);
assert.equal(existsSync(redactionDraftPath), true);

const redactionDraft = readFileSync(redactionDraftPath, "utf8");
assert.match(redactionDraft, /公开安全脱敏模板工作稿/);
assert.match(redactionDraft, /<api-token>/);
assert.match(redactionDraft, /发布建议/);

const kitPath = path.join(tempDir, "oss-maintainer-kit");
const kitOutput = run(["kit", "oss-maintainer", "--output", kitPath]);
assert.match(kitOutput, /已生成工作包/);
assert.equal(existsSync(path.join(kitPath, "README.md")), true);
assert.equal(existsSync(path.join(kitPath, "pr-review.md")), true);
assert.equal(existsSync(path.join(kitPath, "issue-triage.md")), true);
assert.equal(existsSync(path.join(kitPath, "ci-troubleshooting.md")), true);
assert.equal(existsSync(path.join(kitPath, "release-note.md")), true);
assert.equal(existsSync(path.join(kitPath, "maintainer-weekly-checklist.md")), true);
assert.equal(existsSync(path.join(kitPath, "contributor-onboarding.md")), true);
assert.equal(existsSync(path.join(kitPath, "public-safety-redaction.md")), true);
assert.equal(existsSync(path.join(kitPath, "ai-output-evaluation.md")), true);

const kitReadme = readFileSync(path.join(kitPath, "README.md"), "utf8");
assert.match(kitReadme, /开源维护者工作包/);
assert.match(kitReadme, /推荐使用顺序/);
assert.match(kitReadme, /contributor-onboarding\.md/);
assert.match(kitReadme, /public-safety-redaction\.md/);

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

const outreachPath = path.join(tempDir, "outreach.md");
const outreachOutput = run([
  "outreach",
  "--template",
  "pr-review",
  "--channel",
  "x",
  "--scenario",
  "review a documentation PR",
  "--output",
  outreachPath,
]);
assert.match(outreachOutput, /已生成外部试用邀请包/);
assert.equal(existsSync(outreachPath), true);

const outreachDraft = readFileSync(outreachPath, "utf8");
assert.match(outreachDraft, /外部试用邀请包/);
assert.match(outreachDraft, /X \/ Twitter/);
assert.match(outreachDraft, /PR Review 模板/);
assert.match(outreachDraft, /review a documentation PR/);
assert.match(outreachDraft, /template_feedback\.yml/);
assert.match(outreachDraft, /不要把维护者自己写的测试 issue/);

assert.throws(
  () => run(["outreach", "--template", "pr-review", "--output", outreachPath]),
  /输出文件已存在/
);

const forcedOutreachOutput = run(["outreach", "--template", "pr-review", "--output", outreachPath, "--force"]);
assert.match(forcedOutreachOutput, /已生成外部试用邀请包/);

const outreachAliasPath = path.join(tempDir, "outreach-alias.md");
const outreachAliasOutput = run(["templates:outreach", "--channel", "wechat", "--output", outreachAliasPath]);
assert.match(outreachAliasOutput, /已生成外部试用邀请包/);
assert.equal(existsSync(outreachAliasPath), true);

const adoptionPath = path.join(tempDir, "adoption-sprint");
const adoptionOutput = run([
  "adoption",
  "--template",
  "ci-troubleshooting",
  "--scenario",
  "debug a real CI failure",
  "--output",
  adoptionPath,
]);
assert.match(adoptionOutput, /已生成外部试用冲刺包/);
assert.equal(existsSync(path.join(adoptionPath, "README.md")), true);
assert.equal(existsSync(path.join(adoptionPath, "outreach.md")), true);
assert.equal(existsSync(path.join(adoptionPath, "feedback-log.md")), true);
assert.equal(existsSync(path.join(adoptionPath, "contributor-invite.md")), true);

const adoptionReadme = readFileSync(path.join(adoptionPath, "README.md"), "utf8");
assert.match(adoptionReadme, /一周外部试用冲刺包/);
assert.match(adoptionReadme, /debug a real CI failure/);
assert.match(adoptionReadme, /不要把维护者自建 issue/);

const adoptionOutreach = readFileSync(path.join(adoptionPath, "outreach.md"), "utf8");
assert.match(adoptionOutreach, /外部试用邀请文案/);
assert.match(adoptionOutreach, /X \/ Twitter/);
assert.match(adoptionOutreach, /template_feedback\.yml/);

const adoptionLog = readFileSync(path.join(adoptionPath, "feedback-log.md"), "utf8");
assert.match(adoptionLog, /外部反馈记录表/);
assert.match(adoptionLog, /external PR/);
assert.match(adoptionLog, /证据台账/);

const contributorInvite = readFileSync(path.join(adoptionPath, "contributor-invite.md"), "utf8");
assert.match(contributorInvite, /外部贡献者邀请/);
assert.match(contributorInvite, /good first issue/);

assert.throws(
  () => run(["adoption", "--template", "ci-troubleshooting", "--output", adoptionPath]),
  /输出文件已存在/
);

const forcedAdoptionOutput = run(["adoption", "--template", "ci-troubleshooting", "--output", adoptionPath, "--force"]);
assert.match(forcedAdoptionOutput, /已生成外部试用冲刺包/);

const adoptionAliasPath = path.join(tempDir, "adoption-sprint-alias");
const adoptionAliasOutput = run(["templates:adoption", "--output", adoptionAliasPath]);
assert.match(adoptionAliasOutput, /已生成外部试用冲刺包/);
assert.equal(existsSync(path.join(adoptionAliasPath, "README.md")), true);

const evidencePath = path.join(tempDir, "external-evidence.md");
const evidenceOutput = run(["evidence", "--output", evidencePath]);
assert.match(evidenceOutput, /已生成外部采用证据台账/);
assert.equal(existsSync(evidencePath), true);

const evidenceLedger = readFileSync(evidencePath, "utf8");
assert.match(evidenceLedger, /外部采用证据台账/);
assert.match(evidenceLedger, /External merged PRs/);
assert.match(evidenceLedger, /external feedback issue/);
assert.match(evidenceLedger, /不应计入外部采用/);
assert.match(evidenceLedger, /claim\/starter/);
assert.match(evidenceLedger, /generated local drafts are not external merged PRs/);

assert.throws(
  () => run(["evidence", "--output", evidencePath]),
  /输出文件已存在/
);

const forcedEvidenceOutput = run(["evidence", "--output", evidencePath, "--force"]);
assert.match(forcedEvidenceOutput, /已生成外部采用证据台账/);

const evidenceAliasPath = path.join(tempDir, "external-evidence-alias.md");
const evidenceAliasOutput = run(["templates:evidence", "--output", evidenceAliasPath]);
assert.match(evidenceAliasOutput, /已生成外部采用证据台账/);
assert.equal(existsSync(evidenceAliasPath), true);

const readinessPath = path.join(tempDir, "openai-readiness.md");
const readinessEnv = {
  AI_DEVTOOLS_CN_REPO_INFO_JSON: JSON.stringify({
    stargazerCount: 123,
    forkCount: 10,
    visibility: "public",
    url: "https://github.com/ONEISALL7/ai-devtools-cn",
  }),
  AI_DEVTOOLS_CN_MERGED_PRS_JSON: JSON.stringify([
    {
      number: 101,
      title: "Add release note template",
      author: {
        login: "maintainer-user",
        is_bot: false,
      },
      mergedAt: "2026-06-01T00:00:00Z",
    },
    {
      number: 102,
      title: "Add external case study",
      author: {
        login: "external-user",
        is_bot: false,
      },
      mergedAt: "2026-06-01T01:00:00Z",
    },
  ]),
  AI_DEVTOOLS_CN_CLOSED_ISSUES_JSON: JSON.stringify([
    {
      number: 201,
      title: "closed issue",
      labels: [{ name: "feedback" }],
      author: {
        login: "external-user",
      },
      closedAt: "2026-05-30T00:00:00Z",
    },
  ]),
  AI_DEVTOOLS_CN_OPEN_ISSUES_JSON: JSON.stringify([
    {
      number: 202,
      title: "open issue",
      labels: [{ name: "feedback" }],
      author: {
        login: "maintainer-user",
      },
      createdAt: "2026-06-01T00:00:00Z",
    },
    {
      number: 203,
      title: "open non-feedback issue",
      labels: [],
      author: {
        login: "another-user",
      },
      createdAt: "2026-06-01T01:00:00Z",
    },
  ]),
  AI_DEVTOOLS_CN_RELEASES_JSON: JSON.stringify([
    {
      tagName: "v0.18.3",
      name: "v0.18.3",
      publishedAt: "2026-06-02T00:00:00Z",
    },
  ]),
  AI_DEVTOOLS_CN_NPM_VERSION: "0.18.3",
  AI_DEVTOOLS_CN_NPM_DOWNLOADS_JSON: JSON.stringify({ downloads: 456 }),
};

const readinessOutput = run(["templates:readiness", "--output", readinessPath], { env: { ...process.env, ...readinessEnv } });
assert.match(readinessOutput, /已生成 OpenAI Codex for Open Source 资格申请材料/);
assert.equal(existsSync(readinessPath), true);

const readinessDraft = readFileSync(readinessPath, "utf8");
assert.match(readinessDraft, /# OpenAI Codex for Open Source 资格申请材料（AI DevTools CN）/);
assert.match(readinessDraft, /项目：`ai-devtools-cn`/);
assert.match(readinessDraft, /Stars \| 123/);
assert.match(readinessDraft, /External merged PRs/);
assert.match(readinessDraft, /Describe your role/);
assert.match(readinessDraft, /How will you use API credits\?/);
assert.match(readinessDraft, /I am the primary maintainer of this public repository ai-devtools-cn/);

assert.throws(
  () => run(["readiness", "--output", readinessPath], { env: { ...process.env, ...readinessEnv } }),
  /输出文件已存在/
);

const forcedReadinessOutput = run(["readiness", "--output", readinessPath, "--force"], {
  env: { ...process.env, ...readinessEnv },
});
assert.match(forcedReadinessOutput, /已生成 OpenAI Codex for Open Source 资格申请材料/);

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

const callerOutreachOutput = run(["outreach", "--output", "work/outreach.md"], {
  cwd: callerDir,
});
assert.match(callerOutreachOutput, /work\/outreach\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "outreach.md")), true);

const callerAdoptionOutput = run(["adoption", "--output", "work/adoption-sprint"], {
  cwd: callerDir,
});
assert.match(callerAdoptionOutput, /work\/adoption-sprint/);
assert.equal(existsSync(path.join(callerDir, "work", "adoption-sprint", "README.md")), true);

const callerHandoffOutput = run(["handoff", "--output", "work/external-pr-handoff.md"], {
  cwd: callerDir,
});
assert.match(callerHandoffOutput, /work\/external-pr-handoff\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "external-pr-handoff.md")), true);

const callerHandoffDraft = readFileSync(path.join(callerDir, "work", "external-pr-handoff.md"), "utf8");
assert.match(callerHandoffDraft, /外部 PR 交接包/);
assert.match(callerHandoffDraft, /External PR/);
assert.match(callerHandoffDraft, /不能把维护者自己/);

const callerIssueHandoffOutput = run(["handoff", "--issue", "48", "--output", "work/python-handoff.md"], {
  cwd: callerDir,
});
assert.match(callerIssueHandoffOutput, /work\/python-handoff\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "python-handoff.md")), true);

const callerIssueHandoffDraft = readFileSync(path.join(callerDir, "work", "python-handoff.md"), "utf8");
assert.match(callerIssueHandoffDraft, /针对 #48 的外部 PR 交接包/);
assert.match(callerIssueHandoffDraft, /Python 项目 PR review 示例/);
assert.match(callerIssueHandoffDraft, /npm run templates:claim -- 48/);

const callerReviewPrOutput = run([
  "review-pr",
  "--pr",
  "https://github.com/ONEISALL7/ai-devtools-cn/pull/321",
  "--author",
  "external-dev",
  "--issue",
  "49",
  "--output",
  "work/review-pr-321.md",
], {
  cwd: callerDir,
});
assert.match(callerReviewPrOutput, /work\/review-pr-321\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "review-pr-321.md")), true);

const callerReviewPrDraft = readFileSync(path.join(callerDir, "work", "review-pr-321.md"), "utf8");
assert.match(callerReviewPrDraft, /外部 PR review 清单/);
assert.match(callerReviewPrDraft, /external-dev/);
assert.match(callerReviewPrDraft, /#49/);
assert.match(callerReviewPrDraft, /evidence ledger/);

const callerEvidenceOutput = run(["evidence", "--output", "work/external-evidence.md"], {
  cwd: callerDir,
});
assert.match(callerEvidenceOutput, /work\/external-evidence\.md/);
assert.equal(existsSync(path.join(callerDir, "work", "external-evidence.md")), true);

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
