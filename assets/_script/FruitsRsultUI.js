var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_FruitsGameUI = require("FruitsGameUI");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var def_FruitsRsultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Fruits, r_UIDef.UIDef.Res.UI.FruitsRsultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FruitsRsultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FruitsRsultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGet").asButton.onClick(this.onClickGet, this);
    this.contentPane.getChild("btnDouble").asButton.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data.result >= this.data.price || 5 == this.data.id) {
      this.contentPane.getController("c1").setSelectedIndex(0);
      r_SoundMgr.SoundMgr.playSound("win");
    } else {
      this.contentPane.getController("c1").setSelectedIndex(1);
      r_SoundMgr.SoundMgr.playSound("fail");
    }
    this.contentPane.getChild("labPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.result);
  };
  _ctor.prototype.onClickGet = function () {
    r_PlayerData.PlayerData.addCoin("切榴莲获得", this.data.result, r_ReportSystem.SystemKey.榴莲);
    this.hide();
    r_FruitsGameUI.FruitsGameUI.hide();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("榴莲双倍奖励", function () {
      r_PlayerData.PlayerData.addCoin("榴莲双倍奖励", 2 * e.data.result, r_ReportSystem.SystemKey.榴莲);
      e.hide();
      r_FruitsGameUI.FruitsGameUI.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_FruitsRsultUI;