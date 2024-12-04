var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_RaceUI = require("RaceUI");
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var exp_RaceResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Fun, r_UIDef.UIDef.Res.UI.RaceResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RaceResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RaceResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGet").asButton.onClick(this.onClickGet, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onClickVideo, this);
    this.contentPane.getChild("btnRestart").asButton.onClick(this.onClickRestart, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data.result) {
      this.contentPane.getController("mode").selectedIndex = 1;
      this.contentPane.getChild("coin").text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(r_jsbi.default.multiply(this.data.coin, r_BigNumSystem.BigNumSystem.getNum(4)));
      r_SoundMgr.SoundMgr.playSound("win");
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
      r_SoundMgr.SoundMgr.playSound("fail");
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOther = function () {
    if (!this.data.result) {
      this.hide();
      r_RaceUI.RaceUI.restartRace();
    }
  };
  _ctor.prototype.onClickRestart = function () {
    this.hide();
    r_RaceUI.RaceUI.restartRace();
  };
  _ctor.prototype.onClickGet = function () {
    r_PlayerData.PlayerData.addCoin("赛马比赛", r_jsbi.default.multiply(this.data.coin, r_BigNumSystem.BigNumSystem.getNum(4)), r_ReportSystem.SystemKey.赛马);
    this.hide();
    r_RaceUI.RaceUI.restartRace();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("赛马视频", function () {
      r_PlayerData.PlayerData.addCoin("赛马比赛", r_jsbi.default.multiply(e.data.coin, r_BigNumSystem.BigNumSystem.getNum(20)), r_ReportSystem.SystemKey.赛马);
      e.hide();
      r_RaceUI.RaceUI.restartRace();
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.RaceResultUI = exp_RaceResultUI;