var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CutOverUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_NoodlesUI = require("NoodlesUI");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var exp_CutOverUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Noodles, r_UIDef.UIDef.Res.UI.CutOverUI) || this;
    t.reward = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CutOverUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CutOverUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
      r_NoodlesUI.NoodlesUI.hide();
    }, this);
    this.contentPane.getChild("btnAgain").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("神奇刀削面", function () {
        t.hide();
        r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.NoodlesUI).initItem();
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = 0;
    for (var o = r_NoodlesUI.NoodlesConfig.level.length - 1; o >= 0; o--) {
      if (this.data.cutCount >= r_NoodlesUI.NoodlesConfig.level[o]) {
        t = o;
        break;
      }
    }
    this.contentPane.getChild("icon").asLoader.url = 0 == t ? "ui://" + r_UIDef.UIDef.Pack.Noodles + "/noodles" : "ui://" + r_UIDef.UIDef.Pack.Noodles + "/noodles" + this.data.type + "_" + t;
    this.contentPane.getChild("type").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Noodles + "/type" + this.data.type;
    this.contentPane.getChild("type2").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Noodles + "/type2_" + this.data.type;
    this.contentPane.getController("c1").selectedIndex = t;
    this.contentPane.getChild("count").asTextField.text = "" + this.data.cutCount;
    this.reward = this.data.cutCount * r_NoodlesUI.NoodlesConfig.reward[this.data.type];
    this.reward > r_NoodlesUI.NoodlesConfig.maxReward && (this.reward = r_NoodlesUI.NoodlesConfig.maxReward);
    this.contentPane.getChild("reward").asTextField.text = this.reward / 1e4 + "";
    r_PlayerData.PlayerData.addCoin("神奇刀削面", this.reward, r_ReportSystem.SystemKey.小游戏);
    r_SoundMgr.SoundMgr.playSound("noodles/结算_01");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.stopSound("noodles/结算_01");
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.CutOverUI = exp_CutOverUI;