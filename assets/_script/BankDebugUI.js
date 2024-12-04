var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankDebugUI = undefined;
var r_UIDef = require("UIDef");
var r_BankSystem = require("BankSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var exp_BankDebugUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bank, r_UIDef.UIDef.Res.UI.BankDebugUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BankDebugUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BankDebugUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.putDay = this.contentPane.getChild("putDay");
    this.putCoin = this.contentPane.getChild("putCoin");
    this.btn0 = this.contentPane.getChild("btn0");
    this.btn1 = this.contentPane.getChild("btn1");
    this.btn2 = this.contentPane.getChild("btn2");
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btn0.onClick(this.onClickBtn.bind(this, "元"), this);
    this.btn1.onClick(this.onClickBtn.bind(this, "万"), this);
    this.btn2.onClick(this.onClickBtn.bind(this, "亿"), this);
    this.btnClose.onClick(this.hide, this);
  };
  _ctor.prototype.onClickBtn = function (e) {
    var t = /^\+?[1-9][0-9]*$/;
    if (t.test(this.putDay.text) && t.test(this.putCoin.text)) {
      r_BankSystem.BankSystem.debugBankCard(parseInt(this.putCoin.text), e, parseInt(this.putDay.text));
      this.hide();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("输入有误");
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BankDebugUI = exp_BankDebugUI;