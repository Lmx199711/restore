var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideGiftUI = undefined;
var r_TYIndex = require("TYIndex");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UIDef = require("UIDef");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_MainHomeUI = require("MainHomeUI");
var r_UtilsSystem = require("UtilsSystem");
var r_EffectsCom = require("EffectsCom");
var exp_SideGiftUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SideGift, r_UIDef.UIDef.Res.UI.SideGiftUI) || this;
    t.awards = [1e5, 1e6, 1e7, 1e8];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SideGiftUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SideGiftUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.sortingOrder = 999;
    this.black = this.contentPane.getChild("black").asGraph;
    this.btnGo = this.contentPane.getChild("btnGo").asButton;
    this.btnReward = this.contentPane.getChild("btnReward").asButton;
    this.btnOk = this.contentPane.getChild("btnOk").asButton;
    this.btnClose = this.contentPane.getChild("btnClose").asButton;
    this.labNum = this.contentPane.getChild("num").asTextField;
    this.btnGo.onClick(function () {
      console.log("btnGo click1");
      if (!r_PlatformSystem.PlatformSystem.islaunchFromSide() && r_PlatformSystem.PlatformSystem.canJumpToSide()) {
        console.log("btnGo click2");
        t.hide();
        return void r_PlatformSystem.PlatformSystem.navigateToScene();
      }
      console.log("btnGo click3");
      t.hide();
    }, this);
    this.btnReward.onClick(function () {
      console.log("SideGiftUI onShown 2");
      r_PlayerData.PlayerData.data.getSideGiftTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.addCoin("侧边栏奖励", r_PlayerData.PlayerData.data.sideGiftDayNum >= t.awards.length ? t.awards[t.awards.length - 1] : t.awards[r_PlayerData.PlayerData.data.sideGiftDayNum], r_ReportSystem.SystemKey.None);
      r_PlayerData.PlayerData.data.sideGiftDayNum++;
      r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
      r_MainHomeUI.default.instance && r_MainHomeUI.default.hideGiftBtn();
      t.hide();
    }, this);
    this.btnOk.onClick(function () {
      t.hide();
    }, this);
    this.btnClose.onClick(function () {
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    this.btnGo.visible = false;
    this.btnReward.visible = false;
    this.btnOk.visible = false;
    var e = r_PlayerData.PlayerData.data.sideGiftDayNum >= this.awards.length ? this.awards[this.awards.length - 1] : this.awards[r_PlayerData.PlayerData.data.sideGiftDayNum];
    this.labNum.text = r_UtilsSystem.UtilsSystem.getShowCoin(e, 1);
    if (r_PlatformSystem.PlatformSystem.islaunchFromSide()) {
      console.log("SideGiftUI onShown 2");
      this.btnReward.visible = true;
      this.btnClose.visible = false;
    } else {
      console.log("SideGiftUI onShown 3");
      if (r_PlatformSystem.PlatformSystem.canJumpToSide()) {
        this.btnGo.visible = true;
      } else {
        this.btnOk.visible = true;
      }
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SideGiftUI = exp_SideGiftUI;