var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TheSimsResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_TheSimsUI = require("TheSimsUI");
var r_ReportSystem = require("ReportSystem");
var exp_TheSimsResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.TheSims, r_UIDef.UIDef.Res.UI.TheSimsResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TheSimsResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TheSimsResultUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.getReward(1);
    }, this);
    this.contentPane.getChild("btnAD").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("模拟人生双倍领取", function () {
        t.getReward(2);
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("reward").asTextField.text = "" + this.data.reward;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.getReward = function (e) {
    var t = this.data.reward * e;
    r_PlayerData.PlayerData.addCoin("模拟人生", t, r_ReportSystem.SystemKey.小游戏);
    this.hide();
    r_TheSimsUI.TheSimsUI.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.TheSimsResultUI = exp_TheSimsResultUI;