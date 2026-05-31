# npm 发布清单

这个文档用于发布 `ai-devtools-cn` npm 包。当前仓库已经准备好 npm CLI 结构，但发布需要维护者本人登录 npm 账号后执行。

## 当前包名状态

截至 2026-05-31，执行：

```bash
npm view ai-devtools-cn version --cache /private/tmp/ai-devtools-cn-npm-cache --strict-ssl=false
```

返回 404，说明 npm registry 当前没有找到 `ai-devtools-cn` 包。发布前仍建议重新确认一次。

## 发布前检查

```bash
npm install
npm run test
npm run pack:dry-run
```

如果本机 npm cache 有权限或证书问题，可以临时指定 cache：

```bash
npm pack --dry-run --cache /private/tmp/ai-devtools-cn-npm-cache
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

## 登录 npm

```bash
npm login
npm whoami
```

确认登录的是你准备发布包的 npm 账号。

## 发布

首次发布：

```bash
npm publish --access public
```

发布后验证：

```bash
npm view ai-devtools-cn version
npx ai-devtools-cn list
npx ai-devtools-cn new pr-review --output work/pr-review.md
```

## 发布后更新仓库

发布成功后建议做这些维护动作：

1. 在 README 顶部增加 npm 安装方式。
2. 在 GitHub Release `v0.3.0` 中补充 npm 包链接。
3. 创建一个 issue 记录发布结果和后续下载量观察。
4. 过 24 小时检查 npm 下载量。

## 版本更新规则

建议遵循：

- 文档和模板小修：patch，例如 `0.3.1`
- 新模板、新示例、新 CLI 小功能：minor，例如 `0.4.0`
- CLI 参数不兼容或目录结构大改：major，例如 `1.0.0`

## 回滚和风险

npm 包发布后不能真正删除历史版本。遇到问题时优先：

1. 立刻修复并发布 patch 版本。
2. 在 GitHub Release 和 README 标注受影响版本。
3. 如果必须撤回，参考 npm 官方 unpublish/deprecate 规则。

不要把 token、私有日志、客户数据或未公开源码打包进 npm 包。发布前始终使用 `npm pack --dry-run` 检查文件列表。
