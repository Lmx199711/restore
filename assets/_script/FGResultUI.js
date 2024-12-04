var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FGResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_FlirtingGirlUI = require("FlirtingGirlUI");
var r_PlatformSystem = require("PlatformSystem");
var r_EntryUI = require("EntryUI");
var r_PlayerData = require("PlayerData");
var r_ChangeSystem = require("ChangeSystem");
var r_BathUI = require("BathUI");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp_FGResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FlirtingGirl, r_UIDef.UIDef.Res.UI.FGResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FGResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FGResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnEnterBuilding = this.contentPane.getChild("btnEnterBuilding");
    this.btnEnterBuilding.onClick(this.onClickBtnEnterBuilding, this);
    this.btnEmployHer = this.contentPane.getChild("btnEmployHer");
    this.btnEmployHer.onClick(this.onClickBtnEmployHer, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = this.contentPane.getChild("xiaojiejie");
    t.loop = true;
    t.animationName = "jies";
    t.playing = true;
  };
  _ctor.prototype.onClickBtnEnterBuilding = function () {
    this.hide();
    r_FlirtingGirlUI.default.hide();
    r_BathUI.default.showUI();
    r_EntryUI.default.hide();
  };
  _ctor.prototype.onClickBtnEmployHer = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("调戏招聘她", function () {
      r_PlayerData.PlayerData.data.baomuId2 = 0;
      r_PlayerData.PlayerData.data.baomuId = null;
      r_PlayerData.PlayerData.saveData();
      e.hide();
      r_FlirtingGirlUI.default.hide();
      r_EntryUI.default.hide();
      r_ChangeSystem.ChangeSystem.setChangeWinNew(["MainHomeUI", "HouseUI"]);
      r_PlayerData.PlayerData.addCoin("调戏招聘小姐姐", 1e9, r_ReportSystem.SystemKey.打保安, false);
      r_UtilsSystem.UtilsSystem.showTip("招收成功，获得奖励10亿元");
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.FGResultUI = exp_FGResultUI;