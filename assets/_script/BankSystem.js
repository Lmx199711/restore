Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankSystem = undefined;
var r_BankCfg = require("BankCfg");
var r_MainUI = require("MainUI");
var r_BankUI = require("BankUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var u = function () {
  function e() {}
  e.prototype.checkBankCard = function () {
    return null != r_PlayerData.PlayerData.data.bankInfo.coin;
  };
  e.prototype.createBankCard = function () {
    if (!(this.checkBankCard() || r_PlayerData.PlayerData.data.bankEndDay >= r_DaySystem.DaySystem.getShowDay())) {
      var e = this.getDayBank();
      var t = [];
      e.forEach(function (e) {
        t.push(r_BankCfg.BankCfg[e].pr);
      });
      var o = e[r_UtilsSystem.UtilsSystem.getWeight(t)];
      var n = r_BankCfg.BankCfg[o].coin;
      var c = r_UtilsSystem.UtilsSystem.getRandomNum(n[0], n[1]);
      r_PlayerData.PlayerData.data.bankInfo.coin = c;
      r_PlayerData.PlayerData.data.bankInfo.unit = r_BankCfg.BankCfg[o].unit;
      r_PlayerData.PlayerData.data.bankInfo.day = r_DaySystem.DaySystem.getShowDay();
      r_PlayerData.PlayerData.data.bankInfo.id = o;
      r_PlayerData.PlayerData.data.bankInfo.endDay = r_BankCfg.BankCfg[o].day;
      r_PlayerData.PlayerData.data.bankEndDay = r_BankCfg.BankCfg[o].day + r_DaySystem.DaySystem.getShowDay();
      r_PlayerData.PlayerData.saveData();
      r_BankUI.BankUI.showUI(0);
    }
  };
  e.prototype.debugBankCard = function (e, t, o) {
    r_PlayerData.PlayerData.data.bankInfo.coin = e;
    r_PlayerData.PlayerData.data.bankInfo.unit = t;
    r_PlayerData.PlayerData.data.bankInfo.day = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.data.bankInfo.id = 999;
    r_PlayerData.PlayerData.data.bankInfo.endDay = o;
    r_PlayerData.PlayerData.data.bankEndDay = o + r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.data.bankOpen = 0;
    r_PlayerData.PlayerData.saveData();
    r_BankUI.BankUI.showUI(0);
  };
  e.prototype.triggerNext = function () {
    r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.isOnce && (r_MainUI.MainUI.Inst.isOnce = false);
  };
  e.prototype.getDayBank = function () {
    var e = r_DaySystem.DaySystem.getShowDay();
    var t = r_BankCfg.BankDayCfg;
    for (var o = 0; o < t.length; o++) {
      if (t[o].days[0] <= e && t[o].days[1] >= e) {
        return t[o].ids;
      }
    }
  };
  e.prototype.getRemainDays = function () {
    if (this.checkBankCard()) {
      return r_PlayerData.PlayerData.data.bankInfo.day + r_PlayerData.PlayerData.data.bankInfo.endDay - r_DaySystem.DaySystem.getShowDay();
    } else {
      return -1;
    }
  };
  e.prototype.checkCanGet = function () {
    return !!this.checkBankCard() && r_PlayerData.PlayerData.data.bankInfo.day + r_PlayerData.PlayerData.data.bankInfo.endDay <= r_DaySystem.DaySystem.getShowDay();
  };
  e.prototype.getCoin = function (e) {
    var t = "元" == r_PlayerData.PlayerData.data.bankInfo.unit ? "" : "万" == r_PlayerData.PlayerData.data.bankInfo.unit ? "0000" : "00000000";
    var o = (e ? 2 * r_PlayerData.PlayerData.data.bankInfo.coin : r_PlayerData.PlayerData.data.bankInfo.coin) + t;
    r_PlayerData.PlayerData.addCoin("领取未来银行金额", o, r_ReportSystem.SystemKey.未来银行卡);
    r_PlayerData.PlayerData.data.bankInfo = {};
    r_PlayerData.PlayerData.data.bankEndDay = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.forgetCoint = function () {
    r_PlayerData.PlayerData.data.bankInfo = {};
    r_PlayerData.PlayerData.data.bankEndDay = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.saveData();
  };
  return e;
}();
exports.BankSystem = new u();