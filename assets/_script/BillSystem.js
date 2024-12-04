Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BillSystem = exports._BillSystem = exports.DiyBill = undefined;
var r_BillCfg = require("BillCfg");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
exports.DiyBill = function (e) {
  this.id = 3;
  this.billCoin = 1e5;
  this.dayCoin = 5e3;
  this.name = "房贷";
  this.billTile = "房贷还款";
  this.billContent = "房贷欠款[color=#FF0000]100000[/color],日利息[color=#FF0000]0%[/color],限期[color=#FF0000]20日[/color]还清,每日还款[color=#FF0000]5000[/color]";
  this.todayPayContent = "房贷还款:5000";
  if (e) {
    this.id = e.id;
    this.billCoin = e.billCoin;
    this.rate = e.rate;
    this.day = e.day;
    this.dayCoin = e.dayCoin;
    this.name = e.name;
  }
  this.billTile = this.name + "还款";
  this.billContent = this.name + "欠款[color=#FF0000]" + r_UtilsSystem.UtilsSystem.getShowCoin(this.billCoin) + "[/color],日利息[color=#FF0000]" + this.rate + "%[/color],限期[color=#FF0000]" + this.day + "日[/color]还清,每日还款[color=#FF0000]" + r_UtilsSystem.UtilsSystem.getShowCoin(this.dayCoin) + "[/color]";
  this.todayPayContent = this.name + "还款:" + r_UtilsSystem.UtilsSystem.getShowCoin(this.dayCoin);
};
var exp__BillSystem = function () {
  function _ctor() {
    this.loanBankId = 1;
    this.loanMaxTime = 3;
    this.billCfgMap = {};
  }
  _ctor.prototype.init = function () {
    for (var e = 0; e < r_BillCfg.BillCfg.length; e++) {
      this.billCfgMap[r_BillCfg.BillCfg[e].id] = r_BillCfg.BillCfg[e];
    }
  };
  _ctor.prototype.getBillCfgById = function (e) {
    return this.billCfgMap[e];
  };
  _ctor.prototype.refresh = function () {};
  _ctor.prototype.update = function () {
    r_PlayerData.PlayerData && r_PlayerData.PlayerData.data;
  };
  _ctor.prototype.addBill = function (e) {
    var t = {};
    t.id = e;
    t.day = 0;
    t.time = r_PlayerData.PlayerData.data.time;
    t.diyBill = exports.BillSystem.getBillCfgById(t.id);
    r_PlayerData.PlayerData.addBill(t);
  };
  _ctor.prototype.resetData = function () {
    r_PlayerData.PlayerData.data.billList.length > 0 && 0 == r_PlayerData.PlayerData.data.billListNew.length && r_PlayerData.PlayerData.data.billList.forEach(function (e) {
      e.diyBill = exports.BillSystem.getBillCfgById(e.id);
      r_PlayerData.PlayerData.data.billListNew.push(e);
    });
    r_PlayerData.PlayerData.data.billListNew = r_PlayerData.PlayerData.data.billListNew.filter(function (e) {
      return 2 == e.id;
    });
    r_PlayerData.PlayerData.data.billList = [];
    r_PlayerData.PlayerData.data.billListNew = r_PlayerData.PlayerData.data.billListNew.filter(function (e) {
      return 2 != e.id;
    });
  };
  _ctor.prototype.addDiyBill = function (e) {
    var t = {};
    t.id = e.id;
    t.diyBill = e;
    t.day = 0;
    t.time = r_PlayerData.PlayerData.data.time;
    r_PlayerData.PlayerData.addBill(t);
  };
  _ctor.prototype.isPayEnough = function () {
    var e = 0;
    for (var t = 0; t < r_PlayerData.PlayerData.data.billListNew.length; t++) {
      var i = r_PlayerData.PlayerData.data.billListNew[t];
      if (!exports.BillSystem.needPayBill(i)) {
        break;
      }
      e += i.diyBill.dayCoin;
    }
    if (r_PlayerData.PlayerData.isCoinEnough(e)) {
      return true;
    }
  };
  _ctor.prototype.payAllDayBill = function () {
    var e = 0;
    for (var t = r_PlayerData.PlayerData.data.billListNew.length - 1; t >= 0; t--) {
      var i = r_PlayerData.PlayerData.data.billListNew[t];
      if (exports.BillSystem.needPayBill(i)) {
        var s = i.diyBill;
        e += s.dayCoin;
        i.day = i.day + 1;
        i.day >= s.day && r_PlayerData.PlayerData.data.billListNew.splice(t, 1);
      }
    }
    if (r_PlayerData.PlayerData.isCoinEnough(e)) {
      r_PlayerData.PlayerData.deleteCoin("还账单", e, r_ReportSystem.SystemKey.银行贷款还款, true);
      r_UtilsSystem.UtilsSystem.showTip("银行还款" + r_UtilsSystem.UtilsSystem.getShowCoin(e));
    } else {
      r_PlayerData.PlayerData.deleteCoin("还账单", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.银行贷款还款, true);
      r_UtilsSystem.UtilsSystem.showTip("银行还款" + r_UtilsSystem.UtilsSystem.getShowCoin(e));
    }
  };
  _ctor.prototype.needPayBill = function (e) {
    return Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond) > Math.floor(e.time / r_TimeSystem.TimeSystem.oneDaySecond);
  };
  _ctor.prototype.needShowRedTip = function () {
    return r_PlayerData.PlayerData.data.billListNew.length > 0;
  };
  return _ctor;
}();
exports._BillSystem = exp__BillSystem;
exports.BillSystem = new exp__BillSystem();