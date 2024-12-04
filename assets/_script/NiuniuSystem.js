Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NiuniuSystem = undefined;
var r_NiuniuCfg = require("NiuniuCfg");
var r_DebugSystem = require("DebugSystem");
var r_UtilsSystem = require("UtilsSystem");
var s = function () {
  function e() {
    this.cards = [];
    this.CardResult = ["10点", "牛1", "牛2", "牛3", "牛4", "牛5", "牛6", "牛7", "牛8", "牛9", "牛牛", "银花", "金花", "10小", "炸弹"];
  }
  e.prototype.init = function () {
    this.cards = JSON.parse(JSON.stringify(Object.values(r_NiuniuCfg.LotteryNiuniuCfg)));
  };
  e.prototype.getRandomCards = function (e) {
    var t = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var o = e ? t.NiuniuBankPrCfg : t.NiuniuPlayerPrCfg;
    var s = r_UtilsSystem.UtilsSystem.randomPercentFromArray(o);
    var r = [];
    for (var c = 0; c < this.cards.length; c++) {
      var l = r_NiuniuCfg.LotteryNiuniuCfg[c];
      l.result == s.result && r.push(l);
    }
    var u = r_UtilsSystem.UtilsSystem.getRandomFromArr(r);
    this.cards = this.cards.filter(function (e) {
      return e != u;
    });
    u.cards.sort(function () {
      return Math.random() - .5;
    });
    return u;
  };
  e.prototype.getCardValue = function (e) {
    if (11 == e) {
      return "J";
    } else if (12 == e) {
      return "Q";
    } else if (13 == e) {
      return "K";
    } else if (1 == e) {
      return "A";
    } else {
      return e.toString();
    }
  };
  return e;
}();
exports.NiuniuSystem = new s();