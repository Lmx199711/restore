var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoanUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_BillSystem = require("BillSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_ReportSystem = require("ReportSystem");
var exp_LoanUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Coin, r_UIDef.UIDef.Res.UI.LoanUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LoanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LoanUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("touchArea").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnRestart").asButton.onClick(this.onClickRestart, this);
    this.contentPane.getChild("btnLoan").asButton.onClick(this.onClickLoan, this);
    this.contentPane.getChild("btnOk").asButton.onClick(this.onClickOk, this);
    var t = r_BillSystem.BillSystem.getBillCfgById(r_BillSystem.BillSystem.loanBankId);
    this.contentPane.getChild("n32").text = t.billContent;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshAll();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshAll = function () {
    if (this.data.mode) {
      this.contentPane.getController("mode").selectedIndex = 1;
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
    }
    this.contentPane.getChild("leftNum").text = "剩余贷款次数: " + r_PlayerData.PlayerData.data.loanBankTime + "/3次";
  };
  _ctor.prototype.onClickOk = function () {
    this.hide();
  };
  _ctor.prototype.onClickRestart = function () {
    this.hide();
    r_PlayerData.PlayerData.restart();
  };
  _ctor.prototype.onClickLoan = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.loanBankTime >= r_BillSystem.BillSystem.loanMaxTime) {
      r_UtilsSystem.UtilsSystem.showTip("没有贷款次数了");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("银行贷款", function () {
        var t = r_BillSystem.BillSystem.getBillCfgById(r_BillSystem.BillSystem.loanBankId);
        r_PlayerData.PlayerData.data.loanBankTime = r_PlayerData.PlayerData.data.loanBankTime + 1;
        r_PlayerData.PlayerData.addCoin("银行贷款", t.billCoin, r_ReportSystem.SystemKey.银行贷款还款);
        r_BillSystem.BillSystem.addBill(r_BillSystem.BillSystem.loanBankId);
        e.data.mode = 1;
        e.refreshAll();
      });
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LoanUI = exp_LoanUI;