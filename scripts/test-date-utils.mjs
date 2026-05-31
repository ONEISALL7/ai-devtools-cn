import assert from "node:assert/strict";

import { formatSnapshotDate } from "./date-utils.mjs";

const beijingAfterMidnight = new Date("2026-05-31T16:07:53.000Z");

assert.equal(formatSnapshotDate(beijingAfterMidnight, "Asia/Shanghai"), "2026-06-01");
assert.equal(formatSnapshotDate(beijingAfterMidnight, "UTC"), "2026-05-31");
assert.equal(formatSnapshotDate(new Date("2026-01-02T03:04:05.000Z"), "UTC"), "2026-01-02");

console.log("date utils tests passed");
