// Luggage Math engine: the weight of your bags against your own figure, the bags your items take, and the fees. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _BG = "the bag count must be from 1 to 100 with no decimal places";
var _KG = "the weight must be from 0.1 to 1000 kg with at most one decimal place";
var _IT = "the item count must be from 1 to 100000 with no decimal places";
var _PB = "the items a bag must be from 1 to 1000 with no decimal places";
var _TV = "the traveler count must be from 1 to 1000 with no decimal places";
var _BE = "the bags each must be from 1 to 20 with no decimal places";
var _FEE = "the fee must be from 0.01 to 10000 dollars with at most two decimal places";
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function weightTruth(bags, each, figure) {
  var b = _i(bags, _BG, 3, 1, 100), w = _p(each, _KG, 3, 1, 1, 10000), a = _p(figure, _KG, 4, 1, 1, 10000);
  var t = b * w, d = a - t;
  var tail = d > 0 ? _dec(d, 1) + " kg left" : d < 0 ? _dec(-d, 1) + " kg more" : "the same";
  return "The " + _pl(b, " bag", " bags") + " at " + _dec(w, 1) + " kg each weigh " + _dec(t, 1) + " kg, and against " + _dec(a, 1) + " kg that is " + tail + ".";
}
function packTruth(items, per) {
  var n = _i(items, _IT, 6, 1, 100000), p = _i(per, _PB, 4, 1, 1000);
  var k = Math.floor((n + p - 1) / p), left = k * p - n;
  return "The " + _pl(n, " item", " items") + " at " + p + " a bag take " + _pl(k, " bag", " bags") + ", leaving " + _pl(left, " empty space", " empty spaces") + ".";
}
function feeTruth(travelers, each, fee) {
  var t = _i(travelers, _TV, 4, 1, 1000), e = _i(each, _BE, 2, 1, 20), f = _p(fee, _FEE, 5, 2, 1, 1000000);
  var n = t * e;
  return "The " + _pl(t, " traveler", " travelers") + " with " + _pl(e, " bag", " bags") + " each make " + _pl(n, " bag", " bags") + " at $" + _money(f) + " a bag, $" + _money(n * f) + ".";
}
