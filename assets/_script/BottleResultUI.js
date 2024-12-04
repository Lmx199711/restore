var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var def_BottleResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bottle, r_UIDef.UIDef.Res.UI.BottleResultUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BottleResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BottleResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("labCoin").text = r_UtilsSystem.UtilsSystem.numFormats(this.data, 0);
    this.contentPane.getChild("btnGet").asButton.onClick(this.onGet, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onBtnVideo, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onGet = function () {
    r_PlayerData.PlayerData.addCoin("滚瓶奖励", this.data, r_ReportSystem.SystemKey.瓶子);
    this.hide();
  };
  _ctor.prototype.onBtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("滚瓶视频奖励", function () {
      r_PlayerData.PlayerData.addCoin("滚瓶视频奖励", 5 * e.data, r_ReportSystem.SystemKey.瓶子);
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BottleResultUI;