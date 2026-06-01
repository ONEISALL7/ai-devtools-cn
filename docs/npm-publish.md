# npm 发布清单

这个文档记录 `ai-devtools-cn` npm 包的发布流程和验证结果。最新 npm 已发布版本以 `npm view ai-devtools-cn version` 输出为准。

## 当前包名状态

截至 2026-06-01，上一轮发布验证执行：

```bash
npm view ai-devtools-cn version --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false
```

当前返回：

```text
0.17.7
```

npm 包页面：

```text
https://www.npmjs.com/package/ai-devtools-cn
```

## 当前同步状态

当前 GitHub release、`package.json` 和 npm 公开包已经同步到 `ai-devtools-cn@0.17.7`。

最新同步前应确认：

- GitHub 最新 release 是 `v0.17.7`
- `npm run templates:publish-status` 显示 npm、GitHub release 和 `package.json` 对齐
- `npm run test`、`npm run templates:publish-check` 和 `npm run pack:dry-run` 都通过
- `npm publish --dry-run --access public` 输出目标版本为 `ai-devtools-cn@0.17.7`

## npm 与 GitHub main 的版本边界

GitHub `main` 可能包含尚未发布到 npm 的新 CLI 命令。对外邀请用户运行 `npx` 前，必须先执行：

```bash
npm view ai-devtools-cn version
npm run templates:publish-status
```

如果 npm 当前版本落后于 `package.json` 或 GitHub 最新 release，不要把 `main` 上的新命令写成“已发布 npm CLI 能力”。可以选择：

- 在仓库内用 `npm run templates:*` 命令生成材料。
- 等维护者完成下一次 npm 发布后，再发送对应 `npx` 命令。
- 对外说明“GitHub main 已支持，npm 发布待同步”，避免夸大。

如果 npm、GitHub release 和 `package.json` 已对齐，可以直接对外发送对应 `npx ai-devtools-cn@latest ...` 命令。

如果 `npm run templates:publish-status` 显示 `source is ahead of latest release tag`，说明当前 `main` 已经领先最新 GitHub release。此时必须先决定发布边界：

- 发布已验证 release tag 对应的旧版本内容。
- 或者先为当前 `main` 创建新的 GitHub release，再发布这个新版本到 npm。

不要在 source 已领先 release tag 时，把当前 `main` 当成旧 release 直接发布。

## 首次发布结果

截至 2026-06-01，`ai-devtools-cn@0.16.1` 已成功发布到 npm。

发布前完成过真实 npm publish dry-run：

```bash
npm publish --dry-run --access public --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false
```

结果摘要：

- dry-run 输出 `+ ai-devtools-cn@0.16.1`
- tarball 包含 61 个文件
- package size 约 69.2 kB
- unpacked size 约 221.4 kB
- npm 提示真实发布仍需要登录 npm 账号

真实发布命令：

```bash
npm publish --access public --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false
```

发布结果：

```text
+ ai-devtools-cn@0.16.1
```

发布后验证：

```bash
npm view ai-devtools-cn version
npx --yes --cache /private/tmp/ai-devtools-cn-npx-cache --strict-ssl=false ai-devtools-cn doctor
npx --yes --cache /private/tmp/ai-devtools-cn-npx-cache --strict-ssl=false ai-devtools-cn adoption --template pr-review --output work/npm-adoption-check --force
```

验证结果：

- `npm view` 返回 `0.16.1`
- `npx ai-devtools-cn doctor` 通过
- `npx ai-devtools-cn adoption` 成功生成外部试用冲刺包

## v0.17.4 同步结果

截至 2026-06-01，`ai-devtools-cn@0.17.4` 已成功发布到 npm，并完成 `npx` smoke check。

验证摘要：

- `npm whoami --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false` 返回 `one777`
- `npm publish --access public --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false` 输出 `+ ai-devtools-cn@0.17.4`
- `npm view ai-devtools-cn version --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false` 返回 `0.17.4`
- `npm run templates:publish-status` 显示 npm、GitHub release 和 `package.json` 对齐到 `0.17.4`
- `npx ai-devtools-cn@latest doctor` 通过
- `npx ai-devtools-cn@latest contribute` 通过
- `npx ai-devtools-cn@latest pr-pack 45` 通过
- `npx ai-devtools-cn@latest recipes ci-failure` 通过

## 发布前检查

```bash
npm install
npm run test
npm run templates:validate
npm run templates:publish-check
npm run templates:publish-status
npm run pack:dry-run
```

再执行一次 publish dry-run：

```bash
npm publish --dry-run --access public
```

dry-run 不会真正发布包，但能提前检查 npm publish 会打包哪些文件，以及当前 publish 流程是否能走通。

`npm run templates:publish-check` 会先做本地静态检查，覆盖 package 元数据、CLI bin 入口、files 白名单、模板注册和案例注册。它不能替代 npm dry-run，因为它不会模拟 npm registry 和打包行为。

如果本机 npm cache 有权限或证书问题，可以临时指定 cache：

```bash
npm pack --dry-run --cache /private/tmp/ai-devtools-cn-npm-cache
npm publish --dry-run --access public --cache /private/tmp/ai-devtools-cn-npm-cache
```

检查 dry run 输出，确认包含这些文件：

- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `docs/`
- `examples/`
- `templates/`
- `scripts/template-cli.mjs`
- `package.json`

当前 CLI 应至少支持：

```bash
npm run templates:list
npm run templates:examples
npm run templates:recipes
npm run templates:recipes -- ci-failure
npm run templates:doctor
npm run templates:launch
npm run templates:contribute
npm run templates:handoff -- --output work/external-pr-handoff.md
npm run templates:handoff -- --issue 45 --output work/handoff-45.md
npm run templates:pr-pack -- 45 --output work/pr-pack-45.md
npm run templates:review-pr -- --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
npm run templates:claim -- 45 --output work/claim-45.md
npm run templates:starter -- 45 --output work/node-ci-starter.md
npm run templates:trial -- --template pr-review --output work/trial
npm run templates:new -- pr-review --output work/pr-review.md
npm run templates:new -- contributor-onboarding --output work/contributor-onboarding.md
npm run templates:kit -- oss-maintainer --output work/oss-maintainer-kit
npm run templates:feedback -- --template pr-review --output work/feedback.md
npm run templates:outreach -- --template pr-review --channel x --output work/outreach.md
npm run templates:adoption -- --template pr-review --output work/adoption-sprint
npm run templates:evidence -- --output work/external-evidence.md
npm run templates:application -- --output work/openai-application.md
npm run templates:publish-status
npm run templates:publish-check
npm run templates:validate
```

## 登录 npm

```bash
npm login
npm whoami
```

确认登录的是你准备发布包的 npm 账号。

发布前不要把 npm token 写入仓库、issue、PR、截图或日志。如果使用 2FA，按 npm 终端提示输入一次性验证码。

如果 `npm login` 报证书、cache 权限或本机 npm 配置问题，先不要发布。可以先用临时 cache 完成 dry-run，并在本机修复 npm 环境后再登录。

## 发布

首次发布：

```bash
npm publish --access public
```

如果你想沿用已验证过的临时 cache，可以执行：

```bash
npm publish --access public --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false
```

发布后验证：

```bash
npm view ai-devtools-cn version
npx ai-devtools-cn list
npx ai-devtools-cn examples
npx ai-devtools-cn recipes
npx ai-devtools-cn recipes ci-failure
npx ai-devtools-cn doctor
npx ai-devtools-cn launch
npx ai-devtools-cn contribute
npx ai-devtools-cn handoff --output work/external-pr-handoff.md
npx ai-devtools-cn handoff --issue 45 --output work/handoff-45.md
npx ai-devtools-cn pr-pack 45 --output work/pr-pack-45.md
npx ai-devtools-cn review-pr --pr 123 --author external-dev --issue 45 --output work/review-pr-123.md
npx ai-devtools-cn claim 45 --output work/claim-45.md
npx ai-devtools-cn starter 45 --output work/node-ci-starter.md
npx ai-devtools-cn trial --template pr-review --output work/trial
npx ai-devtools-cn new pr-review --output work/pr-review.md
npx ai-devtools-cn new contributor-onboarding --output work/contributor-onboarding.md
npx ai-devtools-cn kit oss-maintainer --output work/oss-maintainer-kit
npx ai-devtools-cn feedback --template pr-review --output work/feedback.md
npx ai-devtools-cn outreach --template pr-review --channel x --output work/outreach.md
npx ai-devtools-cn adoption --template pr-review --output work/adoption-sprint
npx ai-devtools-cn evidence --output work/external-evidence.md
npx ai-devtools-cn application --output work/openai-application.md
npx ai-devtools-cn publish-status
npx ai-devtools-cn publish-check
npx ai-devtools-cn validate
```

## 维护者交接清单

真正发布时，维护者按这个顺序执行并把结果记录到当前 npm 发布同步 issue，例如 [#223](https://github.com/ONEISALL7/ai-devtools-cn/issues/223)：

1. 确认当前分支是 `main`，并且 `git status --short --branch` 干净。
2. 运行 `npm run templates:publish-status`，确认 npm、GitHub release、`package.json` 和 source/release 边界。
3. 如果 source 领先最新 release tag，先创建新的 GitHub release 或切回已验证 release tag。
4. 确认 `package.json` 版本与准备发布的 GitHub Release 版本一致。
5. 运行 `npm view ai-devtools-cn version`，确认包名仍未被他人发布；如果返回版本号，先停下来确认所有权。
6. 运行 `npm login` 和 `npm whoami`，确认 npm 账号无误。
7. 运行 `npm publish --access public`。
8. 运行 `npm view ai-devtools-cn version`，确认版本可见。
9. 运行 `npx ai-devtools-cn publish-status`、`npx ai-devtools-cn doctor`、`npx ai-devtools-cn recipes ci-failure` 和 `npx ai-devtools-cn adoption --template pr-review --output work/adoption-sprint`。
10. 在 npm 发布同步 issue 记录 npm 包链接、发布版本、发布时间和验证命令结果。
11. 在 GitHub Release 中补充 npm 包链接。
12. 过 24 小时后检查 npm 下载量，并同步到外部采用证据台账。

## 发布后更新仓库

发布成功后建议做这些维护动作：

1. 在 README 顶部增加 npm 安装方式。
2. 在对应 GitHub Release 中补充 npm 包链接。
3. 在 release issue 记录发布结果和后续下载量观察。
4. 过 24 小时检查 npm 下载量。

## 版本更新规则

建议遵循：

- 文档和模板小修：patch，例如 `0.3.1`
- 新模板、新示例、新 CLI 小功能：minor，例如 `0.5.0`
- CLI 参数不兼容或目录结构大改：major，例如 `1.0.0`

## 回滚和风险

npm 包发布后不能真正删除历史版本。遇到问题时优先：

1. 立刻修复并发布 patch 版本。
2. 在 GitHub Release 和 README 标注受影响版本。
3. 如果必须撤回，参考 npm 官方 unpublish/deprecate 规则。

不要把 token、私有日志、客户数据或未公开源码打包进 npm 包。发布前始终使用 `npm pack --dry-run` 检查文件列表。

## 常见问题

### npm view 返回 404

这通常表示包名还没有发布，适合首次发布。发布前仍应确认拼写、账号和组织归属。

### 默认 npm cache 报权限错误

不要把 npm token 写进仓库，也不要在仓库里提交本地 npm 配置。可以临时使用：

```bash
npm pack --dry-run --cache /private/tmp/ai-devtools-cn-npm-cache
npm publish --dry-run --access public --cache /private/tmp/ai-devtools-cn-npm-cache
```

如果要永久修复本机 npm cache，按 npm 输出的本机提示处理即可，这属于本地环境维护，不需要提交到仓库。

### publish dry-run 提示需要登录

这是正常提醒。dry-run 可以在未登录时检查打包内容，但真正发布仍需要维护者本人登录 npm 账号。
