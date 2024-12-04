var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LampResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_LampUI = require("LampUI");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_LampCfg = require("LampCfg");
var r_ReportSystem = require("ReportSystem");
var exp_LampResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.LampResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LampResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LampResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.onClickClose, this);
    this.btnAgian = this.contentPane.getChild("btnAgian");
    this.btnAgian.onClick(this.onClickClose, this);
    this.btnShare = this.contentPane.getChild("btnShare");
    this.btnShare.onClick(this.onClickShare, this);
    this.labNum = this.contentPane.getChild("labNum");
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = this.data;
    if (1 == this.data) {
      r_PlayerData.PlayerData.data.lampFailNum++;
      this.labNum.text = "当前累计失败次数：" + r_PlayerData.PlayerData.data.lampFailNum;
    }
    r_PlatformSystem.PlatformSystem.stopRecorder(function () {
      t.contentPane.getController("c2").selectedIndex = 1;
    });
  };
  _ctor.prototype.onClickShare = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.shareAppVideoMessage(function () {
      r_UtilsSystem.UtilsSystem.showTip("分享成功");
      r_PlayerData.PlayerData.addCoin("梯子小游戏分享", r_LampCfg.LampShareNum, r_ReportSystem.SystemKey.小游戏);
      e.hide();
      r_LampUI.LampUI.instace.restart();
      r_LampUI.LampUI.instace.hide();
    }, function () {});
  };
  _ctor.prototype.onClickClose = function () {
    r_LampUI.LampUI.instace.restart();
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LampResultUI = exp_LampResultUI;