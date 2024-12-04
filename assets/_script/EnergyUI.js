var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnergyUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var exp_EnergyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Energy, r_UIDef.UIDef.Res.UI.EnergyUI) || this;
    t.isLimitMode = false;
    t.limitMaxTime = 3;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EnergyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EnergyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.rootNode = this.contentPane.getChild("root");
    this.rootNode.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnVideo = this.rootNode.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
    this.lbLimit = this.btnVideo.getChild("limitNum");
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {};
  _ctor.prototype.updateLimitNum = function () {
    if (this.isLimitMode) {
      this.btnVideo.getController("mode").selectedIndex = 1;
      this.lbLimit.text = r_PlayerData.PlayerData.data.limitWatchTime + "_" + this.limitMaxTime;
    } else {
      this.btnVideo.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshUI();
  };
  _ctor.prototype.refreshUI = function () {
    if (this.data.isNoLimit) {
      this.isLimitMode = true;
      this.rootNode.getController("state").selectedIndex = 1;
    } else {
      this.isLimitMode = false;
      if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.firstVideoTime)) {
        this.rootNode.getController("state").selectedIndex = 2;
      } else {
        this.rootNode.getController("state").selectedIndex = 0;
      }
    }
    this.updateLimitNum();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.EnergyUI = exp_EnergyUI;