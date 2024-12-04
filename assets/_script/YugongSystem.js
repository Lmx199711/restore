Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YugongSystem = undefined;
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
  e.prototype.getHeadAward = function () {
    var e = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(e.YugongCfg.headerAward).award;
  };
  e.prototype.getLottery = function () {
    var e = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    return Math.random() <= e.YugongCfg.numPr;
  };
  e.prototype.getRandNum = function (e) {
    var t = [r_UtilsSystem.UtilsSystem.getRandomNum(1, 10)];
    if (e) {
      t.push(t[0]);
    } else {
      var o = this.m_allNum.filter(function (e) {
        return !t.includes(e);
      });
      t.push(o[r_UtilsSystem.UtilsSystem.getRandomNum(0, o.length - 1)]);
    }
    return t;
  };
  e.prototype.getNumAward = function (e) {
    var t = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var o = e ? t.YugongCfg.numWinAward : t.YugongCfg.numLoseAward;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(o).award;
  };
  return e;
}();
exports.YugongSystem = new a();