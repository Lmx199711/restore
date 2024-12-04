var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBattleMatchUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetData = require("PetData");
var r_PetBattleRule = require("PetBattleRule");
var r_PetCfg = require("PetCfg");
var r_PetBaseInfo = require("PetBaseInfo");
var r_PetCommon = require("PetCommon");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_PetMatchInfoUI = require("PetMatchInfoUI");
var r_PetBuyVitalityUI = require("PetBuyVitalityUI");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetBattleMatchUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetBattleMatchUI) || this;
    t.matchTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetBattleMatchUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetBattleMatchUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnTip").onClick(function () {
      r_PetBattleRule.PetBattleRule.showUI();
    }, this);
    this.btnMatch = this.contentPane.getChild("btnMatch").asButton;
    this.btnMatch.onClick(function () {
      if (r_PetData.PetData.getPetBaseInfo().vitality < r_PetCfg.PetGameCfg.costVitality) {
        r_PetBuyVitalityUI.PetBuyVitalityUI.showUI();
      } else {
        r_PetData.PetData.addVitality(-r_PetCfg.PetGameCfg.costVitality);
        t.match();
        r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideMatch"), true);
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 0;
    this.btnMatch.enabled = true;
    this.btnMatch.getChild("icon").visible = true;
    this.contentPane.getChild("matching").visible = false;
    this.matchTime = 0;
    var o = r_PetData.PetData.getPetBaseInfo();
    var i = r_PetCommon.PetCommon.getTierInfo(o.tier);
    var n = this.contentPane.getChild("tier").asCom;
    n.visible = true;
    n.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Pet + "/tier" + i.tier1;
    n.getChild("name").text = r_PetCfg.PetGameCfg.tier.name[i.tier1];
    var a = n.getChild("star").asCom;
    if (i.tier1 < 6) {
      n.getChild("name").text += 4 - i.tier2;
      a.getController("c1").selectedIndex = i.star;
      a.getController("c2").selectedIndex = r_PetCfg.PetGameCfg.tier.starNum[i.tier1] - 4;
    } else {
      a.getController("c1").selectedIndex = 1;
      a.getController("c2").selectedIndex = 3;
      a.getChild("num").text = "x" + i.star;
    }
    var c = r_PetData.PetData.getData("tierSaveVal", 0);
    var u = this.contentPane.getChild("tierSaveVal").asCom;
    u.getChild("num").text = c;
    u.getController("c1").selectedIndex = Math.floor(c / 20);
    u.getChild("addNum").visible = false;
    u.getChild("full").visible = c >= 100;
    this.contentPane.getChild("battleVal").asCom.getChild("num").text = r_PetCommon.PetCommon.getBattleVal(o, r_PetData.PetData.getWeaponsInfo(), r_PetData.PetData.getSkillsInfo()) + "";
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
    r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideMatch"));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.offAllCaller(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("petMatch");
  };
  _ctor.prototype.match = function () {
    var e = this;
    var t = r_PetData.PetData.getPetBaseInfo();
    var o = new r_PetBaseInfo.PetBaseInfo();
    var i = [];
    var n = [];
    var a = r_PetCfg.PetCfgs[r_PetCommon.PetCommon.randomInt(0, r_PetCfg.PetCfgs.length - 1)];
    o.id = a.id;
    o.type = a.type;
    o.name = a.name;
    o.prefab = a.prefab;
    o.nickName = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_PetCfg.PetRoleRandomName);
    o.head = r_PetCommon.PetCommon.randomInt(1, 8);
    o.tier = Math.max(0, t.tier + r_PetCommon.PetCommon.randomInt(-5, 5));
    var s = Math.min(r_PetData.PetData.getData("successCount", 0), r_PetCfg.PetGameCfg.mathInfo.npcLevelInfos.length - 1);
    var p = r_PetCfg.PetGameCfg.mathInfo.npcLevelInfos[s];
    o.level = cc.misc.clampf(t.level + r_PetCommon.PetCommon.randomInt(p.level[0], p.level[1]), 1, r_PetCfg.PetGameCfg.levelMax);
    r_PetCommon.PetCommon.levelUpData(o.level - 1, o);
    var y = r_PetCfg.PetGameCfg.initAttr;
    var g = r_PetData.PetData.getData("battleCount", 0);
    if (g < r_PetCfg.PetGameCfg.mathInfo.initAttrs.length) {
      o.hp = 0;
      o.speed = 0;
      o.dexterity = 0;
      o.strength = 0;
      y = r_PetCfg.PetGameCfg.mathInfo.initAttrs[g];
    }
    o.hp += y.hp;
    o.speed += y.speed;
    o.dexterity += y.dexterity;
    o.strength += y.strength;
    for (var v = 0; v < y.randomAttr; v++) {
      if ((x = Math.random()) < 1 / 3) {
        o.speed++;
      } else if (x < 2 / 3) {
        o.dexterity++;
      } else {
        o.strength++;
      }
    }
    var C = r_PetData.PetData.getWeaponsInfo().length + r_PetData.PetData.getSkillsInfo().length;
    C = cc.misc.clampf(C + p.weaponNum, 0, C);
    var S = r_PetData.PetData.getWeaponsInfo().reduce(function (e, t) {
      return e + t.level;
    }, 0) + r_PetData.PetData.getSkillsInfo().reduce(function (e, t) {
      return e + t.level;
    }, 0);
    S = cc.misc.clampf(S + p.weaponLevel, 0, 5 * C);
    for (var I = Array.from({
      length: C
    }).fill(0); S > 0;) {
      S--;
      var b = I.map(function (e, t) {
        if (e < 5) {
          return t;
        } else {
          return -1;
        }
      }).filter(function (e) {
        return e >= 0;
      });
      I[b[Math.floor(Math.random() * b.length)]]++;
    }
    for (; C > 0;) {
      C--;
      var x;
      var P = r_PetCfg.PetWeaponCfgs.filter(function (e) {
        return i.every(function (t) {
          return t.id != e.id;
        });
      });
      var _ = r_PetCfg.PetSkillCfgs.filter(function (e) {
        return n.every(function (t) {
          return t.id != e.id;
        });
      });
      if (((x = Math.random()) < .5 || 0 == _.length || 0 == i.length) && P.length > 0) {
        var T = P[r_PetCommon.PetCommon.randomInt(0, P.length - 1)];
        i.push({
          id: T.id,
          level: I[C]
        });
      } else if (_.length > 0) {
        var U = _[r_PetCommon.PetCommon.randomInt(0, _.length - 1)];
        n.push({
          id: U.id,
          level: I[C]
        });
      }
    }
    this.btnMatch.enabled = false;
    this.btnMatch.getChild("icon").visible = false;
    this.contentPane.getChild("matching").visible = true;
    this.contentPane.getChild("matching").text = "匹配中.";
    r_TimeSystem.TimeSystem.registSecondUpdate("petMatch", function () {
      e.matchTime++;
      e.contentPane.getChild("matching").text += ".";
      if (e.matchTime >= 3) {
        r_PetMatchInfoUI.PetMatchInfoUI.showUI({
          enemyData: {
            baseInfo: o,
            weapons: i,
            skills: n
          }
        });
        r_PetBattleRule.PetBattleRule.hide();
        e.hide();
        r_TimeSystem.TimeSystem.unregistSecondUpdate("petMatch");
      }
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetBattleMatchUI = exp_PetBattleMatchUI;