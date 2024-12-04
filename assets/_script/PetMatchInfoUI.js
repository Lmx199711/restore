var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetMatchInfoUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetBattleUI = require("PetBattleUI");
var r_PetData = require("PetData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_PetCommon = require("PetCommon");
var exp_PetMatchInfoUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetMatchInfoUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetMatchInfoUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetMatchInfoUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    var o = r_PetData.PetData.getPetBaseInfo();
    var i = this.contentPane.getChild("infoItemL").asCom;
    var n = this.contentPane.getChild("infoItemR").asCom;
    var a = (r_PlatformSystem.PlatformSystem.getNickName() || "我") + "的" + o.name;
    var s = this.data.enemyData.baseInfo.nickName + "的" + this.data.enemyData.baseInfo.name;
    this.setRoleInfo(i, a, o.level, r_PlayerData.PlayerData.data.curHead, r_PetCommon.PetCommon.getBattleVal(o, r_PetData.PetData.getWeaponsInfo(), r_PetData.PetData.getSkillsInfo()));
    this.setRoleInfo(n, s, this.data.enemyData.baseInfo.level, this.data.enemyData.baseInfo.head, r_PetCommon.PetCommon.getBattleVal(this.data.enemyData.baseInfo, this.data.enemyData.weapons, this.data.enemyData.skills));
    r_TimeSystem.TimeSystem.scheduleOnce("PetBattle", 3, function () {
      r_PetBattleUI.PetBattleUI.showUI(t.data);
      t.hide();
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("PetBattle");
  };
  _ctor.prototype.setRoleInfo = function (e, t, o, i, n) {
    r_ResSystem.ResSystem.loadHeadImg(e.getChild("icon"), i);
    e.getChild("name").text = t;
    e.getChild("level").text = o;
    e.getChild("battleVal").asCom.getChild("num").text = n + "";
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetMatchInfoUI = exp_PetMatchInfoUI;