Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetCommon = undefined;
var r_GameSelfSystem = require("GameSelfSystem");
var r_RankSystem = require("RankSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PetCallAgainUI = require("PetCallAgainUI");
var r_PetCallUI = require("PetCallUI");
var r_PetCfg = require("PetCfg");
var r_PetData = require("PetData");
var r_PetInfoUI = require("PetInfoUI");
var r_PetSkillLogic = require("PetSkillLogic");
var exp_PetCommon = function () {
  function _ctor() {}
  _ctor.showUI = function () {
    this.petEntry();
  };
  _ctor.petEntry = function () {
    var e = r_PetData.PetData.getData("callStatus");
    r_UtilsSystem.UtilsSystem.showLoading(true);
    if ("ok" == e) {
      r_PetInfoUI.PetInfoUI.showUI(null, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
      });
    } else if ("again" == e) {
      r_PetCallAgainUI.PetCallAgainUI.showUI(null, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
      });
    } else {
      r_PetCallUI.PetCallUI.showUI(null, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
      });
    }
  };
  _ctor.expToLevel = function (e) {
    var t = 0;
    for (var o = 0; o < r_PetCfg.PetExp.length; o++) {
      if (e < (t += r_PetCfg.PetExp[o])) {
        return o;
      }
    }
    return r_PetCfg.PetExp.length;
  };
  _ctor.levelToExp = function (e) {
    var t = 0;
    for (var o = 0; o < e && o < r_PetCfg.PetExp.length; o++) {
      t += r_PetCfg.PetExp[o];
    }
    return t;
  };
  _ctor.needAddExp = function (e) {
    if (e < 1) {
      return 0;
    } else if (e > r_PetCfg.PetExp.length) {
      return r_PetCfg.PetExp[r_PetCfg.PetExp.length - 1];
    } else {
      return r_PetCfg.PetExp[e - 1];
    }
  };
  _ctor.addExp = function (t) {
    var o = [];
    var i = r_PetData.PetData.getPetBaseInfo();
    i.exp += t;
    var n = _ctor.levelToExp(r_PetCfg.PetGameCfg.levelMax);
    i.exp > n && (i.exp = n);
    var a = this.expToLevel(i.exp);
    if (a > i.level) {
      o = this.levelUpData(a - i.level, i);
      for (var s = i.level; s < a; s++) {
        var r = r_PetCfg.PetLevelUpPropRewards[s];
        var u = function (e) {
          var t = r[e];
          var i = o.find(function (e) {
            return e.type === t.type;
          });
          if (i) {
            i.val += t.val;
          } else {
            o.push({
              type: t.type,
              val: t.val,
              isProp: true
            });
          }
        };
        for (var h = 0; h < r.length; h++) {
          u(h);
        }
      }
      i.level = a;
    }
    r_PetData.PetData.setPetBaseInfo(i);
    return o;
  };
  _ctor.levelUpData = function (e, t) {
    var o = [];
    var i = function () {
      var e = Math.random();
      var i = 1;
      if (e < .2) {
        i = 3;
      } else {
        e < .6 && (i = 2);
      }
      t.hp += i;
      var n = o.find(function (e) {
        return "hp" == e.type;
      });
      if (n) {
        n.val += i;
      } else {
        o.push({
          type: "hp",
          val: i
        });
      }
    };
    var n = function () {
      var e;
      var i = Math.random();
      t[e = i < .33 ? "speed" : i < .66 ? "dexterity" : "strength"]++;
      var n = o.find(function (t) {
        return t.type == e;
      });
      if (n) {
        n.val += 1;
      } else {
        o.push({
          type: e,
          val: 1
        });
      }
    };
    for (var a = 0; a < e; a++) {
      i();
      n();
    }
    return o;
  };
  _ctor.setTier = function (t) {
    var o = 0;
    var i = r_PetData.PetData.getPetBaseInfo();
    var a = r_PetData.PetData.getData("tierSaveVal", 0);
    if (t) {
      i.tier++;
      a += 20;
      o = 1;
      r_RankSystem.RankSystem.uploadPetRankScore(4, i.tier);
    } else if (a >= 100) {
      a = 0;
    } else {
      i.tier--;
      var s = _ctor.getTierInfo(i.tier);
      s.star == r_PetCfg.PetGameCfg.tier.starNum[s.tier1] - 1 && i.tier--;
      i.tier < 0 && (i.tier = 0);
      a += 20;
      o = -1;
      r_RankSystem.RankSystem.uploadPetRankScore(4, i.tier);
    }
    a > 100 && (a = 100);
    r_PetData.PetData.setData("tierSaveVal", a);
    r_PetData.PetData.setPetBaseInfo(i);
    return o;
  };
  _ctor.getExtraHp = function (e, t) {
    var o = 0;
    for (var i = 0; i < e.length; i++) {
      var n = r_PetSkillLogic.PetSkillLogic.skillLogics[e[i].id];
      n && n.extraHp && (o += n.extraHp(e[i].level, t));
    }
    return Math.ceil(o);
  };
  _ctor.getExtraDexterity = function (e, t) {
    var o = 0;
    for (var i = 0; i < e.length; i++) {
      var n = r_PetSkillLogic.PetSkillLogic.skillLogics[e[i].id];
      n && n.extraDexterity && (o += n.extraDexterity(e[i].level, t));
    }
    return Math.ceil(o);
  };
  _ctor.getExtraStrength = function (e, t) {
    var o = 0;
    for (var i = 0; i < e.length; i++) {
      var n = r_PetSkillLogic.PetSkillLogic.skillLogics[e[i].id];
      n && n.extraStrength && (o += n.extraStrength(e[i].level, t));
    }
    return Math.ceil(o);
  };
  _ctor.getExtraSpeed = function (e, t) {
    var o = 0;
    for (var i = 0; i < e.length; i++) {
      var n = r_PetSkillLogic.PetSkillLogic.skillLogics[e[i].id];
      n && n.extraSpeed && (o += n.extraSpeed(e[i].level, t));
    }
    return Math.ceil(o);
  };
  _ctor.getTierInfo = function (e) {
    e < 0 && (e = 0);
    var t = {
      star: 0,
      tier1: 0,
      tier2: 0
    };
    for (var o = r_PetCfg.PetGameCfg.tier.starNum; e > 0;) {
      if (!(t.tier1 < o.length - 1 && e >= o[t.tier1])) {
        t.star = e;
        break;
      }
      e -= o[t.tier1];
      t.tier2++;
      if (t.tier2 >= 4) {
        t.tier1++;
        t.tier2 = 0;
      }
    }
    return t;
  };
  _ctor.getBattleVal = function (e, t, o) {
    var i = 0;
    var n = e.hp + e.dexterity + e.speed + e.strength;
    n += this.getExtraHp(o, e);
    n += this.getExtraStrength(o, e);
    n += this.getExtraDexterity(o, e);
    n += this.getExtraSpeed(o, e);
    i += 50 * (n - 0);
    var a = function (e) {
      var o = t[e];
      var n = r_PetCfg.PetWeaponCfgs.find(function (e) {
        return e.id == o.id;
      });
      for (var a = 0; a <= o.level; a++) {
        i += n.battleVal[a];
      }
    };
    for (var s = 0; s < t.length; s++) {
      a(s);
    }
    var r = function (e) {
      var t = o[e];
      var n = r_PetCfg.PetSkillCfgs.find(function (e) {
        return e.id == t.id;
      });
      for (var a = 0; a <= t.level; a++) {
        i += n.battleVal[a];
      }
    };
    for (s = 0; s < o.length; s++) {
      r(s);
    }
    return i;
  };
  _ctor.showBattleValTip = function (t) {
    var o = this;
    if (!(t <= 0)) {
      if (!this.battleValObj) {
        this.battleValObj = fgui.UIPackage.createObject("Pet", "battleVal");
        r_GameSelfSystem.GameSelfSystem.uiTopRoot.addChild(this.battleValObj);
        this.battleValObj.touchable = false;
      }
      this.battleValObj.visible = true;
      this.battleValObj.asCom.getChild("num").text = "+" + t;
      this.battleValObj.x = fgui.GRoot.inst.width / 2;
      this.battleValObj.y = fgui.GRoot.inst.height / 2;
      this.battleValObj.scaleX = 0;
      this.battleValObj.scaleY = 0;
      this.battleValObj.alpha = 0;
      cc.Tween.stopAllByTarget(this.battleValObj);
      cc.tween(this.battleValObj).to(.2, {
        scaleX: 2,
        scaleY: 2,
        alpha: 2
      }).delay(2).to(.2, {
        alpha: 0
      }).call(function () {
        o.battleValObj.visible = false;
      }).start();
      var a = r_PetData.PetData.getPetBaseInfo();
      var s = _ctor.getBattleVal(a, r_PetData.PetData.getWeaponsInfo(), r_PetData.PetData.getSkillsInfo());
      r_RankSystem.RankSystem.uploadPetRankScore(5, s);
    }
  };
  _ctor.showGuide = function (e, t) {
    undefined === t && (t = false);
    e.visible = false;
    if (!r_PetData.PetData.getData(e.name)) {
      if (t) {
        r_PetData.PetData.setData(e.name, true);
      } else {
        e.visible = true;
        e.loop = true;
        e.animationName = "step_4";
        e.playing = true;
      }
    }
  };
  _ctor.randomInt = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  };
  _ctor.randomFloat = function (e, t) {
    return Math.random() * (t - e) + e;
  };
  return _ctor;
}();
exports.PetCommon = exp_PetCommon;