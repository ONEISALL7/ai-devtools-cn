# Python Bug Fix PR Review 示例

## PR 背景

贡献者提交了一个 Python 项目 Bug Fix PR，修复了用户反馈的日期解析问题。PR 涉及 `src/utils/date_parser.py` 文件中的边界情况处理。

## Review 输出

```text
Summary:
这个 PR 修复了日期解析器在遇到闰年边界情况时的崩溃问题，对项目稳定性有实际价值。

Blocking issues:
- 当前实现在处理 `02-29` 日期时未检查年份是否为闰年，会导致 `ValueError` 异常。用户反馈场景：某些银行系统使用非闰年的 2 月 29 日作为账期截止日，传入时直接崩溃。
- 缺少对 `datetime.strptime` 抛出异常的捕获逻辑，一旦解析失败整个程序会中断。

Non-blocking suggestions:
- 可以增加一个单元测试覆盖 `02-29` 闰年边界情况。
- 建议在 `DateParseError` 中加入原始输入字符串，方便日志排查。
- 可考虑增加一个配置项控制是否严格模式（默认关闭以保持向后兼容）。

Tests:
- 需要验证：`parse_date("2024-02-29")` 正常返回，`parse_date("2023-02-29")` 抛出 `ValueError` 并附带友好提示。

Maintainer decision:
Request changes.
```

## 假设的 Diff 摘要

```diff
diff --git a/src/utils/date_parser.py b/src/utils/date_parser.py
--- a/src/utils/date_parser.py
+++ b/src/utils/date_parser.py
@@ -1,6 +1,7 @@
 """Date parsing utilities."""
 from datetime import datetime
+import calendar

 class DateParseError(Exception):
     """Raised when date parsing fails."""
     pass

@@ -12,9 +13,19 @@ def parse_date(date_str: str) -> datetime:
     Args:
         date_str: Date string in YYYY-MM-DD format.

     Returns:
         Parsed datetime object.

     Raises:
         DateParseError: If date string is invalid.
     """
-    return datetime.strptime(date_str, "%Y-%m-%d")
+    try:
+        dt = datetime.strptime(date_str, "%Y-%m-%d")
+        # Check leap year for Feb 29
+        if dt.month == 2 and dt.day == 29:
+            if not calendar.isleap(dt.year):
+                raise ValueError(f"{date_str} is not a valid date (not a leap year)")
+        return dt
+    except ValueError as e:
+        raise DateParseError(f"Invalid date '{date_str}': {e}") from e

 class DateRange:
     """Represents a date range."""
```

## 可复用经验

- 日期解析类函数必须处理边界情况，尤其是闰年、时区、夏令时切换等。
- 对外暴露的解析函数应该捕获底层异常并转换为业务异常，方便调用方统一处理。
- Bug fix PR 应包含至少一个能复现问题的测试用例。
- 非功能需求（配置项、向后兼容）可以作为后续迭代建议，不阻塞当前合并。

## 验收标准

修复前先确认：

- 原始 Bug 可以在本地复现（`parse_date("2023-02-29")` 抛出未处理异常）
- 异常信息对用户友好，不暴露技术细节

修复后确认：

- `pytest tests/test_date_parser.py -v` 通过
- `parse_date("2024-02-29")` 返回正确 datetime 对象
- `parse_date("2023-02-29")` 抛出 `DateParseError` 而非原生 `ValueError`
- PR diff 不包含无关改动

## 常见错误

不要这样处理：

```text
# 错误 1：直接忽略异常
def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except:  # 太宽泛，隐藏真实问题
        return None

# 错误 2：只修表面不修根因
def parse_date(date_str):
    # 检查格式但跳过闰年验证
    if re.match(r"\d{4}-\d{2}-\d{2}", date_str):
        return datetime.strptime(date_str, "%Y-%m-%d")
```

这些做法会引入新的隐患。正确做法是：捕获异常、增强信息、验证边界。
