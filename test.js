const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { weight: weightTruth, pack: packTruth, fee: feeTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the bag count must be from 1 to 100 with no decimal places",
  "the weight must be from 0.1 to 1000 kg with at most one decimal place",
  "the item count must be from 1 to 100000 with no decimal places",
  "the items a bag must be from 1 to 1000 with no decimal places",
  "the traveler count must be from 1 to 1000 with no decimal places",
  "the bags each must be from 1 to 20 with no decimal places",
  "the fee must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
