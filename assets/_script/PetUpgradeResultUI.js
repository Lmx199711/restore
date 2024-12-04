var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetUpgradeResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetData = require("PetData");
var r_PetCfg = require("PetCfg");
var r_PetWeaponUI = require("PetWeaponUI");
var r_PetCommon = require("PetCommon");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetUpgradeResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetUpgradeResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetUpgradeResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetUpgradeResultUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
    }, this);
    r_ResSystem.ResSystem.loadBundleRes("game3", "pet/hammer", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.contentPane.visible = true;
      var i = cc.instantiate(o);
      t.contentPane.getChild("center").node.addChild(i);
      t.anim = i.getComponent(sp.Skeleton);
      t.anim.setAnimation(0, "animation", true);
    });
  };
  _ctor.prototype.onShown = function () {
    var t;
    var o = this;
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 2;
    null === (t = this.anim) || undefined === t || t.setAnimation(0, "animation", true);
    r_SoundMgr.SoundMgr.playSound("pet/打铁_01", true);
    r_TimeSystem.TimeSystem.scheduleOnce("showResultDelay", 3, function () {
      o.showResult();
      r_SoundMgr.SoundMgr.stopSound("pet/打铁_01");
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("showResultDelay");
    r_SoundMgr.SoundMgr.stopSound("pet/打铁_01");
  };
  _ctor.prototype.showResult = function () {
    var e = this;
    this.contentPane.getController("c1").selectedIndex = this.data.result;
    if (0 == this.data.result) {
      var t = "weapon" == this.data.type ? r_PetCfg.PetWeaponCfgs.find(function (t) {
        return t.id == e.data.id;
      }) : r_PetCfg.PetSkillCfgs.find(function (t) {
        return t.id == e.data.id;
      });
      var o = ("weapon" == this.data.type ? r_PetData.PetData.getWeaponsInfo() : r_PetData.PetData.getSkillsInfo()).find(function (t) {
        return t.id == e.data.id;
      });
      var i = this.contentPane.getChild("curDesc").asTextField;
      r_PetWeaponUI.PetWeaponUI.setDesc(i, t, o.level);
      r_PetWeaponUI.PetWeaponUI.setIconItem(this.contentPane.getChild("iconItem"), "ui://Pet/" + this.data.type + this.data.id, t.quality, o.level);
      var n = this.contentPane.getChild("star").asCom;
      n.getController("c1").selectedIndex = o.level;
      for (var a = 1; a <= 5; a++) {
        var s = n.getChild(a + "");
        s.scaleX = 1;
        s.scaleY = 1;
        s.alpha = 1;
      }
      var h = n.getChild(o.level + "");
      h.scaleX = 0;
      h.scaleY = 0;
      cc.tween(h).delay(.5).to(.5, {
        scaleX: 3,
        scaleY: 3
      }).to(1, {
        scaleX: 1,
        scaleY: 1
      }).start();
      r_PetCommon.PetCommon.showBattleValTip(t.battleVal[o.level]);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetUpgradeResultUI = exp_PetUpgradeResultUI;