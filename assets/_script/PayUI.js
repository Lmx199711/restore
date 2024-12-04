var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_BillSystem = require("BillSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_MainHomeUI = require("MainHomeUI");
var r_ReportSystem = require("ReportSystem");
var exp_PayUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Coin, r_UIDef.UIDef.Res.UI.PayUI) || this;
    t.successIndex = 0;
    t.showBillList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PayUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PayUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("touchArea").asButton.onClick(this.onClickOther, this);
    this.contentPane.getChild("btnRestart").asButton.onClick(this.onClickRestart, this);
    this.contentPane.getChild("btnLoan").asButton.onClick(this.onClickLoan, this);
    this.contentPane.getChild("btnConfirm").asButton.onClick(this.onClickOk, this);
    this.list = this.contentPane.getChild("payList").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshAll();
    r_SoundMgr.SoundMgr.playSound("huaqian");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshAll = function () {
    var e = 0;
    this.successIndex = -1;
    this.showBillList = [];
    for (var t = 0; t < r_PlayerData.PlayerData.data.billListNew.length; t++) {
      var o = r_PlayerData.PlayerData.data.billListNew[t];
      if (!r_BillSystem.BillSystem.needPayBill(o)) {
        break;
      }
      this.showBillList.push(o);
      e += o.diyBill.dayCoin;
      r_PlayerData.PlayerData.isCoinEnough(e) && (this.successIndex = t);
    }
    if (r_PlayerData.PlayerData.isCoinEnough(e)) {
      this.hide();
      r_UtilsSystem.UtilsSystem.showAlert("今日欠款已免费还完！", 1, null, this, "还款成功");
      r_BillSystem.BillSystem.payAllDayBill();
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
    }
    this.list.numItems = this.showBillList.length;
    this.refreshLoanBtn();
  };
  _ctor.prototype.refreshLoanBtn = function () {
    this.contentPane.getChild("btnLoan").getChild("num").text = r_PlayerData.PlayerData.data.loanBankTime + "_" + r_BillSystem.BillSystem.loanMaxTime;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.showBillList[e];
    o || console.error("payUI");
    var i = o.diyBill;
    t.getChild("content").text = i.todayPayContent;
  };
  _ctor.prototype.onClickOther = function () {
    this.data && this.data.isWin && this.hide();
  };
  _ctor.prototype.onClickRestart = function () {
    var e = this;
    r_UtilsSystem.UtilsSystem.showAlert("重新开始会\n[清空当前存档]\n是否继续？", 0, function () {
      e.hide();
      r_PlayerData.PlayerData.restart();
      r_MainHomeUI.default.instance.restart();
      r_DaySystem.DaySystem.setPause(false);
    }, this);
  };
  _ctor.prototype.onClickLoan = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("银行还款（免死）", function () {
      var t = 0;
      for (var o = 0; o < r_PlayerData.PlayerData.data.billListNew.length; o++) {
        var i = r_PlayerData.PlayerData.data.billListNew[o];
        if (!r_BillSystem.BillSystem.needPayBill(i)) {
          break;
        }
        t += i.diyBill.dayCoin;
      }
      r_PlayerData.PlayerData.addCoin("银行贷款", t, r_ReportSystem.SystemKey.银行贷款还款);
      e.refreshAll();
      r_DaySystem.DaySystem.setPause(false);
    });
  };
  _ctor.prototype.onClickOk = function () {
    this.hide();
    r_DaySystem.DaySystem.setPause(false);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PayUI = exp_PayUI;