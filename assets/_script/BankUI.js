var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankUI = undefined;
var r_UIDef = require("UIDef");
var r_BankSystem = require("BankSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BankDebugUI = require("BankDebugUI");
var r_BankTipUI = require("BankTipUI");
var exp_BankUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bank, r_UIDef.UIDef.Res.UI.BankUI) || this;
    t.labNums = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BankUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BankUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.labDay = this.contentPane.getChild("labDay");
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.onClickClose, this);
    this.btnChange = this.contentPane.getChild("btnChange");
    this.btnChange.onClick(this.onClickChnage, this);
    this.btnDebug = this.contentPane.getChild("btnDebug");
    this.btnDebug.onClick(this.onClickDebug, this);
    for (var o = 0; o < 5; o++) {
      var i = this.contentPane.getChild("num" + o);
      this.labNums.push(i);
    }
    r_ResSystem.ResSystem.loadBundleRes("game2", "bank/bank", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.prefab = cc.instantiate(o);
      t.prefab.active = false;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      1 == t.contentPane.getController("c1").selectedIndex && t.setView();
    });
  };
  _ctor.prototype.cleanSuccess = function () {};
  _ctor.prototype.cleanAllSuccess = function () {};
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    r_PlayerData.PlayerData.data.bankOpen = 1;
    this.contentPane.getController("c1").selectedIndex = this.data;
    1 == this.data && this.setView();
    this.prefab && (this.prefab.active = false);
  };
  _ctor.prototype.onClickChnage = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.setView();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    r_SoundMgr.SoundMgr.stopSound("timao");
  };
  _ctor.prototype.setView = function () {
    if (r_BankSystem.BankSystem.checkBankCard()) {
      this.prefab.active = true;
      this.labDay.text = r_PlayerData.PlayerData.data.bankInfo.endDay + "";
      var e = r_PlayerData.PlayerData.data.bankInfo.coin + r_PlayerData.PlayerData.data.bankInfo.unit;
      var t = 0;
      for (var o = this.labNums.length - 1; o >= 0; o--) {
        this.labNums[o].text = e[e.length - 1 - t] || "0";
        t++;
      }
      this.eraseCom && this.eraseCom.startClean();
    }
  };
  _ctor.prototype.onClickClose = function () {
    r_BankTipUI.BankTipUI.showUI();
    this.hide();
  };
  _ctor.prototype.onClickDebug = function () {
    r_TYIndex.Platform.isDarenPlatform() && r_BankDebugUI.BankDebugUI.showUI();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BankUI = exp_BankUI;