Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WuGangSystem = undefined;
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var n = function () {
  function e() {}
  e.prototype.getItemAwardInfo = function () {
    var e = null;
    var t = 1e3 * Math.random();
    var o = 0;
    var n = 0;
    var a = r_LotteryTicketCfg.LotteryTicketCfg.WuGangCfg;
    for (var s = 0; s < a.length; s++) {
      var r = a[s];
      n += 10 * r.showPr;
      if (t - o >= 0 && n - t > 0) {
        e = r;
        break;
      }
      o += 10 * r.showPr;
    }
    return e;
  };
  e.prototype.getIsWin = function (e) {
    var t = false;
    1e3 * Math.random() <= 10 * e && (t = true);
    return t;
  };
  return e;
}();
exports.WuGangSystem = new n();