var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomoVipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_MomoUI = require("MomoUI");
var exp_MomoVipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.MomoVipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MomoVipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MomoVipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onClickVideo, this);
    this.contentPane.getChild("btnCancel").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (r_PlayerData.PlayerData.data.momoData.vipLevel) {
      this.contentPane.getController("mode").selectedIndex = 1;
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("默默vip", function () {
      r_PlayerData.PlayerData.data.momoData.vipLevel = r_PlayerData.PlayerData.data.momoData.vipLevel + 1;
      r_PlayerData.PlayerData.saveData();
      r_MomoUI.MomoUI.Inst && r_MomoUI.MomoUI.Inst.refreshSelectNum();
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MomoVipUI = exp_MomoVipUI;