var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankTipUI = undefined;
var r_UIDef = require("UIDef");
var r_BankSystem = require("BankSystem");
var r_PlayerData = require("PlayerData");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var exp_BankTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bank, r_UIDef.UIDef.Res.UI.BankTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BankTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BankTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.labDesc = this.contentPane.getChild("labDesc");
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_BankSystem.BankSystem.checkBankCard() || this.hide();
    var t = r_PlayerData.PlayerData.data.bankInfo.coin + r_PlayerData.PlayerData.data.bankInfo.unit;
    this.labDesc.text = "你将在" + r_BankSystem.BankSystem.getRemainDays() + "天后收到未来的存款，共计" + t;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.stopSound("timao");
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BankTipUI = exp_BankTipUI;