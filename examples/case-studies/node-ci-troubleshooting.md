# Node.js CI 排错案例：依赖安装失败

## 场景背景

该场景来源于本项目常见的维护动作，适用于 Node.js 项目在 CI 中出现依赖安装/锁文件不一致问题。

假设公开日志片段如下：

```text
Run npm ci
npm ERR! code ELOCKVERIFY
npm ERR! Error: package-lock.json is not in sync with package.json
npm ERR! Try running: npm install
```

项目目标：

- 不关闭 CI。
- 不跳过 npm ci。
- 只给出可复现与可验证的最小修复。

## 可复制输入（给 PR review / AI）

```text
请帮我分析这次 CI 失败：

背景：Node.js 库，使用 npm ci。

失败日志：
npm ERR! code ELOCKVERIFY
npm ERR! Error: package-lock.json is not in sync with package.json

约束：
- 禁止要求开发者关闭 CI。
- 不做“跳过测试”或“改为 npm install 后忽略 lockfile”的建议。
- 只允许最小修复。

请输出：
1. 根因判断
2. 可执行修复步骤
3. 本地验证命令
4. 可直接提交到 PR 的 comment 草稿
```

## 预期输出示例

```text
根因判断：
依赖声明与 package-lock.json 不一致，`npm ci` 要求 lockfile 与 package.json 完全同步。

修复步骤：
1. 在本地仓库运行 `npm install` 重新生成同步 lockfile（保持 Node/npm 版本与 CI 一致）。
2. 检查 diff，确认只涉及依赖树和 lockfile，没有改动业务代码。
3. 提交 lockfile 更新。

验证：
- npm install
- npm ci
- npm run lint:md

PR 评论草稿：
CI 报错来自 `npm ERR! code ELOCKVERIFY`，说明 lockfile 与 package.json 不一致。建议只同步 lockfile 并保留最小 diff，避免改动功能代码。修复后按 npm ci + lint 全部通过再提交。
```

## 维护者验收标准

- 修复是否只涉及 lockfile 与依赖定义。
- 无“跳过 CI”或“关闭检查”的建议。
- PR 说明是否写明为什么需要更新 lockfile。

## 可复用到本项目的用途

- 处理本仓库 release 过程中 npm 依赖同步问题。
- 作为 PR comment 草稿减少重复解释。
- 作为外部试用 `trial` 场景的一部分。

## 不建议做法

- 直接把 `npm ci` 改成 `npm install --no-fund` 作为逃避。
- 只删掉失败 job。
- 在 PR 中混入无关文件变更。

本案例可直接用于 issue triage、CI 修复任务、issue 评论或 release note。
