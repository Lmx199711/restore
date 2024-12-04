Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShenronSystem = undefined;
var r_DebugSystem = require("DebugSystem");
var r_UtilsSystem = require("UtilsSystem");
var a = function () {
  function e() {
    this.m_maxNum = 10;
    this.m_allNum = [];
  }
  e.prototype.init = function () {
    this.m_allNum = [];
    for (var e = 1; e <= this.m_maxNum; e++) {
      this.m_allNum.push(e);
    }
  };
  e.prototype.getLottery = function () {
    var e = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    return Math.random() <= e.ShenronCfg.numPr;
  };
  e.prototype.getNumAward = function (e) {
    var t = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var o = e ? t.ShenronCfg.numWinAward : t.ShenronCfg.numLoseAward;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(o).award;
  };
  return e;
}();
exports.ShenronSystem = new a();