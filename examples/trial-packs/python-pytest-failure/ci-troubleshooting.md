# CI 排错模板工作稿

> 来源模板：`templates/ci-troubleshooting-template.md`  
> 使用场景：debug a failing Python pytest job  
> 建议沉淀位置：PR description、issue comment 或 maintainer note

## 使用前填写

````text
仓库背景：

- 项目类型：Python 数据处理工具
- 主要语言/框架：Python 3.11、pytest
- 包管理器：pip + requirements.txt
- CI 平台：GitHub Actions
- 本地是否能复现：本地 Python 3.11 可以复现，Python 3.10 未复现

失败位置：

- workflow 文件：.github/workflows/test.yml
- job 名称：test
- step 名称：Run pytest
- 最近相关改动：升级 pandas，并新增 CSV 日期解析测试

失败日志：

```log
FAILED tests/test_parser.py::test_parse_empty_date
E   AssertionError: assert NaT is None

tests/test_parser.py:28: AssertionError
=========================== short test summary info ===========================
FAILED tests/test_parser.py::test_parse_empty_date - AssertionError: assert NaT is None
Error: Process completed with exit code 1.
```

需要你输出：

1. 失败摘要：用 3 句话以内说明失败发生在哪里。
2. 最可能原因：按概率从高到低列出 3 个原因。
3. 需要确认的信息：列出还缺哪些上下文。
4. 修复方案：给出最小改动优先的修复步骤。
5. 验证方式：说明如何在本地和 CI 中验证。
6. 风险提示：说明哪些改动可能影响生产或 release。

限制：

- 不要编造不存在的文件。
- 不要建议跳过测试作为最终修复。
- 如果日志不足，请明确说“不足以判断”。
- 涉及依赖升级时，必须说明回滚方式。
````

## 模板正文

你是一个 CI 排错助手。请根据我提供的仓库背景、CI 配置片段和失败日志，判断最可能的失败原因，并给出可验证的修复步骤。

请按以下结构输出：

1. 失败摘要
2. 最可能原因
3. 需要确认的信息
4. 修复方案
5. 验证方式
6. 风险提示

## 示例期望输出

```text
1. 失败摘要

pytest 在 tests/test_parser.py::test_parse_empty_date 失败。断言期望空日期解析结果是 None，但实际结果是 pandas 的 NaT。

2. 最可能原因

- pandas 升级后空日期解析结果从 None 变成 NaT，测试假设没有同步更新。
- 解析函数在不同 Python 或 pandas 版本下返回值不一致。
- 新增测试没有明确项目应当把空日期标准化成 None 还是保留 NaT。

3. 需要确认的信息

- 当前支持的 pandas 版本范围。
- 项目公开 API 对空日期的约定。
- requirements.txt 或 lock file 是否固定了 pandas 版本。
- 本地 Python 3.10 和 3.11 使用的 pandas 版本是否一致。

4. 修复方案

- 优先确认项目约定：空日期应该返回 None 还是 pandas.NaT。
- 如果公开 API 要求返回 None，在解析函数里把 pandas.NaT 标准化为 None，并补测试。
- 如果公开 API 允许 NaT，更新测试断言并在文档中说明。
- 如果是依赖升级引入的兼容性变化，先固定 pandas 版本范围，再单独开依赖升级 PR。

5. 验证方式

- 本地运行 python -m pytest tests/test_parser.py::test_parse_empty_date。
- 本地运行完整测试套件。
- 在 GitHub Actions 的 Python 3.10 和 3.11 matrix 中确认全部通过。

6. 风险提示

不要只修改测试来迎合当前失败结果。日期空值是用户可见行为，修改前需要确认 API 约定，并为依赖升级准备回滚方式。
```
