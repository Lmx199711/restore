var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_ReportSystem = require("ReportSystem");
var def_GodWealthResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.GodWealth, r_UIDef.UIDef.Res.UI.GodWealthResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GodWealthResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GodWealthResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnVideo = this.contentPane.getChild("btnVideo");
    this.btnVideo.onClick(this.onClickVideo, this);
    this.btnClose.onClick(this.onClickClose, this);
    this.labResult = this.contentPane.getChild("labResult");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.labResult.text = "你很虔诚，财神一共给你" + r_UtilsSystem.UtilsSystem.getShowCoin(this.data) + "元";
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("财神双倍奖励", function () {
      r_PlayerData.PlayerData.addCoin("财神双倍奖励", 2 * e.data, r_ReportSystem.SystemKey.招财猫);
      e.hide();
    });
  };
  _ctor.prototype.onClickClose = function () {
    r_PlayerData.PlayerData.addCoin("财神奖励", this.data, r_ReportSystem.SystemKey.招财猫);
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_GodWealthResultUI;