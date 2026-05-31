# 发布到 GitHub 的步骤

这份文档用于把本地项目发布成公开 GitHub 仓库。

## 1. 创建仓库

建议仓库名：

```text
ai-devtools-cn
```

仓库描述：

```text
中文 AI 开发者工具实践模板库：PR review、issue triage、测试生成、文档维护、release 和工具评估工作流。
```

创建时请确认：

- 仓库为 public
- 不要自动生成 README、LICENSE 或 .gitignore
- 默认分支使用 `main`

## 2. 替换占位信息

发布前需要修改：

```text
MAINTAINERS.md 中的 @ONEISALL7
.github/ISSUE_TEMPLATE/config.yml 中的 ONEISALL7
package.json 中的项目描述，如需调整
```

## 3. 初始化并推送

```bash
git init
git branch -M main
git add .
git commit -m "Initial project structure"
git remote add origin git@github.com:ONEISALL7/ai-devtools-cn.git
git push -u origin main
```

如果使用 HTTPS remote：

```bash
git remote add origin https://github.com/ONEISALL7/ai-devtools-cn.git
```

## 4. 发布第一个版本

建议创建 `v0.1.0` release，说明：

```text
Initial release with project documentation, contribution guidelines, issue/PR templates, and the first batch of AI engineering workflow templates.
```

## 5. 配置仓库

建议开启：

- Issues
- Discussions
- Pull Requests
- GitHub Actions
- Dependabot alerts
- Branch protection for `main`

建议添加 topics：

```text
ai
developer-tools
prompt-engineering
open-source
documentation
chinese
maintainer-tools
```
