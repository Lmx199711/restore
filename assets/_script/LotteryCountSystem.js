Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LotteryCountSystem = undefined;
var r_DebugSystem = require("DebugSystem");
var r_UtilsSystem = require("UtilsSystem");
var a = function () {
  function e() {}
  e.prototype.getIsWin = function (e) {
    return r_DebugSystem.DebugSystem.getLotteryTicketCfg()[e].numPr > Math.random();
  };
  e.prototype.getNumAward = function (e, t) {
    var o = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var a = t ? o[e].numWinAward : o[e].numLoseAward;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(a).award;
  };
  e.prototype.getCaidanCoin = function (e) {
    return r_DebugSystem.DebugSystem.getLotteryTicketCfg()[e].caidanCoin;
  };
  return e;
}();
exports.LotteryCountSystem = new a();