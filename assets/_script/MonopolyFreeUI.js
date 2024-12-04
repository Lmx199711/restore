var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_MonopolyUI = require("MonopolyUI");
var r_MonopolyCfg = require("MonopolyCfg");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var def_MonopolyFreeUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Monopoly, r_UIDef.UIDef.Res.UI.MonopolyFreeUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MonopolyFreeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MonopolyFreeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnGet.onClick(this.onceClickGet, this);
    this.btnSell = this.contentPane.getChild("btnSell").asButton;
    this.btnSell.onClick(this.onClickSell, this);
    this.lab = this.contentPane.getChild("lab");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.lab.text = r_UtilsSystem.UtilsSystem.numFormats(r_MonopolyCfg.MpnppolyFreePrice);
  };
  _ctor.prototype.onceClickGet = function () {
    r_UtilsSystem.UtilsSystem.showTip("恭喜获得一张免广卡");
    r_SoundMgr.SoundMgr.playSound("monopoly/获得道具");
    r_PlayerData.PlayerData.data.newMonpolyData.freeCard++;
    r_PlayerData.PlayerData.saveData();
    r_MonopolyUI.default.instance.propShow();
    this.hide();
  };
  _ctor.prototype.onClickSell = function () {
    r_PlayerData.PlayerData.addCoin("售卖免广卡", r_MonopolyCfg.MpnppolyFreePrice, r_ReportSystem.SystemKey.大富翁);
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_MonopolyFreeUI;