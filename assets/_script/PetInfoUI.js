var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetInfoUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_PetData = require("PetData");
var r_PetCommon = require("PetCommon");
var r_TimeSystem = require("TimeSystem");
var r_PetWeaponUI = require("PetWeaponUI");
var r_PetShopUI = require("PetShopUI");
var r_PetBattleMatchUI = require("PetBattleMatchUI");
var r_PlatformSystem = require("PlatformSystem");
var r_PetCfg = require("PetCfg");
var r_VitalityComponent = require("VitalityComponent");
var r_PetRankUI = require("PetRankUI");
var r_RankSystem = require("RankSystem");
var r_PetCardUI = require("PetCardUI");
var r_PetTierRewardUI = require("PetTierRewardUI");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetInfoUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetInfoUI) || this;
    fairygui.UIObjectFactory.setExtension("ui://Pet/VitalityCom", r_VitalityComponent.VitalityComponent);
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetInfoUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetInfoUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.attrTip = this.contentPane.getChild("attrTip").asCom;
    this.levelInfo = this.contentPane.getChild("levelInfo").asCom;
    var o = this.contentPane.getChild("hp");
    o.onClick(function () {
      var e = r_PetData.PetData.getPetBaseInfo();
      var i = r_PetData.PetData.getSkillsInfo();
      t.showTip("生命", o, e.hp, r_PetCommon.PetCommon.getExtraHp(i, e));
    });
    var i = this.contentPane.getChild("strength");
    i.onClick(function () {
      var e = r_PetData.PetData.getPetBaseInfo();
      var o = r_PetData.PetData.getSkillsInfo();
      t.showTip("力量", i, e.strength, r_PetCommon.PetCommon.getExtraStrength(o, e));
    });
    var n = this.contentPane.getChild("dexterity");
    n.onClick(function () {
      var e = r_PetData.PetData.getPetBaseInfo();
      var o = r_PetData.PetData.getSkillsInfo();
      t.showTip("闪避", n, e.dexterity, r_PetCommon.PetCommon.getExtraDexterity(o, e));
    });
    var a = this.contentPane.getChild("speed");
    a.onClick(function () {
      var e = r_PetData.PetData.getPetBaseInfo();
      var o = r_PetData.PetData.getSkillsInfo();
      t.showTip("速度", a, e.speed, r_PetCommon.PetCommon.getExtraSpeed(o, e));
    });
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnWeapon").onClick(function () {
      r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideUpgrade"), true);
      r_PetWeaponUI.PetWeaponUI.showUI();
    }, this);
    this.contentPane.getChild("btnShop").onClick(function () {
      r_PetShopUI.PetShopUI.showUI();
    }, this);
    this.contentPane.getChild("btnBattle").onClick(function () {
      r_PetBattleMatchUI.PetBattleMatchUI.showUI();
      r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideBattle"), true);
    }, this);
    this.contentPane.getChild("btnCard").onClick(function () {
      r_PetCardUI.PetCardUI.showUI();
      r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideCard"), true);
    }, this);
    this.contentPane.getChild("btnRank").onClick(function () {
      r_PetRankUI.PetRankUI.showUI();
    }, this);
    this.contentPane.getChild("btnTier").onClick(function () {
      r_PetTierRewardUI.PetTierRewardUI.showUI();
      r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideTier"), true);
    }, this);
    r_PlatformSystem.PlatformSystem.jjs && "0" == r_PlatformSystem.PlatformSystem.jjs && (this.contentPane.getChild("btnRank").visible = false);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    var o = r_PetData.PetData.getPetBaseInfo();
    this.petNode && this.petNode.name == o.prefab || r_ResSystem.ResSystem.loadBundleRes("game3", "pet/" + o.prefab, cc.Prefab, function (e, o) {
      var i;
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      null === (i = t.petNode) || undefined === i || i.destroy();
      var n = cc.instantiate(o);
      t.contentPane.getChild("pet").node.addChild(n);
      t.petNode = n;
      var a = n.getComponent(sp.Skeleton);
      a.setSkin("default");
      a.setAnimation(0, "daiji", true);
    });
    this.showInfo();
    r_PlatformSystem.PlatformSystem.report("pet_entry", {
      stage: "进入宠物"
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.showGuide = function () {
    r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideBattle"));
    if (r_PetData.PetData.getData("guideBattle")) {
      r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideCard"));
    } else {
      this.contentPane.getChild("guideCard").visible = false;
    }
    if (r_PetData.PetData.getData("guideOpen5")) {
      r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideUpgrade"));
    } else {
      this.contentPane.getChild("guideUpgrade").visible = false;
    }
    if (r_PetData.PetData.getData("guideUpgrade")) {
      r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideTier"));
    } else {
      this.contentPane.getChild("guideTier").visible = false;
    }
  };
  _ctor.prototype.showTip = function (e, t, o, i) {
    var n = this;
    this.attrTip.visible = true;
    this.attrTip.x = t.x - (this.attrTip.width - t.width) / 2;
    this.attrTip.y = t.y - 90;
    this.attrTip.getChild("num").text = e + "：" + o + "[color=#00ff00]+" + i + "[/color]";
    r_TimeSystem.TimeSystem.scheduleClear("attrTip");
    r_TimeSystem.TimeSystem.scheduleOnce("attrTip", 3, function () {
      n.attrTip.visible = false;
    });
  };
  _ctor.prototype.showInfo = function () {
    var e = r_PetData.PetData.getPetBaseInfo();
    var t = r_PetData.PetData.getSkillsInfo();
    this.contentPane.getChild("hp").asCom.getChild("num").text = e.hp + r_PetCommon.PetCommon.getExtraHp(t, e) + "";
    this.contentPane.getChild("speed").asCom.getChild("num").text = e.speed + r_PetCommon.PetCommon.getExtraSpeed(t, e) + "";
    this.contentPane.getChild("dexterity").asCom.getChild("num").text = e.dexterity + r_PetCommon.PetCommon.getExtraDexterity(t, e) + "";
    this.contentPane.getChild("strength").asCom.getChild("num").text = e.strength + r_PetCommon.PetCommon.getExtraStrength(t, e) + "";
    this.levelInfo.getChild("level").text = e.level.toString();
    var o = r_PlatformSystem.PlatformSystem.getNickName() || "我";
    this.levelInfo.getChild("name").text = o + "的" + e.name;
    var i = this.levelInfo.getChild("expPro").asProgress;
    if (e.level >= r_PetCfg.PetGameCfg.levelMax) {
      i.max = 0;
      i.value = 0;
    } else {
      i.max = r_PetCommon.PetCommon.needAddExp(e.level + 1);
      i.value = e.exp - r_PetCommon.PetCommon.levelToExp(e.level);
    }
    this.attrTip.visible = false;
    var n = r_PetCommon.PetCommon.getBattleVal(e, r_PetData.PetData.getWeaponsInfo(), t);
    this.contentPane.getChild("battleVal").asCom.getChild("num").text = n + "";
    r_RankSystem.RankSystem.uploadPetRankScore(5, n);
    this.showGuide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetInfoUI = exp_PetInfoUI;