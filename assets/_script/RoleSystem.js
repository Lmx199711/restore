Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpType = exports.RoleSystem = undefined;
var i;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_jsbi = require("jsbi");
var r_RoleCfg = require("RoleCfg");
var r_TaskCfg = require("TaskCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_GroupSystem = require("GroupSystem");
var r_GuideSystem = require("GuideSystem");
var r_PlayerData = require("PlayerData");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TaskSystem = require("TaskSystem");
var r_UtilsSystem = require("UtilsSystem");
var m = function () {
  function e() {
    this.m_earnRuleMap = null;
    this.isPause = false;
    this.passTime = 0;
    this.m_exp = 0;
  }
  Object.defineProperty(e.prototype, "earnRuleMap", {
    get: function () {
      var e = this;
      if (this.m_earnRuleMap) {
        return this.m_earnRuleMap;
      } else {
        this.m_earnRuleMap = {};
        r_GroupSystem.GroupSystem.getTouchLevelCfg().forEach(function (t) {
          e.m_earnRuleMap[t.level] = t;
        });
        return this.m_earnRuleMap;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "exp", {
    get: function () {
      return this.m_exp;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.resetData = function () {
    this.m_exp = 0;
    null == r_PlayerData.PlayerData.data.mainHome && this.initData();
    this.checkData();
  };
  e.prototype.checkData = function () {
    r_PlayerData.PlayerData.data.mainHome || (r_PlayerData.PlayerData.data.mainHome = {});
    r_PlayerData.PlayerData.data.mainHome.level || (r_PlayerData.PlayerData.data.mainHome.level = 1);
    r_PlayerData.PlayerData.data.mainHome.autoLevel || (r_PlayerData.PlayerData.data.mainHome.autoLevel = 0);
    r_PlayerData.PlayerData.data.mainHome.earnCoeff || (r_PlayerData.PlayerData.data.mainHome.earnCoeff = 1);
    r_PlayerData.PlayerData.data.mainHome.earnTime || (r_PlayerData.PlayerData.data.mainHome.earnTime = 0);
    r_PlayerData.PlayerData.data.mainHome.touchLevel || (r_PlayerData.PlayerData.data.mainHome.touchLevel = 1);
    r_PlayerData.PlayerData.data.mainHome.earnNum || (r_PlayerData.PlayerData.data.mainHome.earnNum = 0);
  };
  e.prototype.initData = function () {
    this.m_exp = 0;
    r_PlayerData.PlayerData.data.mainHome = {};
    r_PlayerData.PlayerData.data.mainHome.level = 1;
    r_PlayerData.PlayerData.data.mainHome.autoLevel = 0;
    r_PlayerData.PlayerData.data.mainHome.earnCoeff = 1;
    r_PlayerData.PlayerData.data.mainHome.earnTime = 0;
    r_PlayerData.PlayerData.data.mainHome.touchLevel = 1;
    r_PlayerData.PlayerData.data.mainHome.earnNum = 0;
  };
  e.prototype.getEarnInfo = function () {
    this.checkData();
    return r_RoleCfg.EarnCoeffCfg[r_PlayerData.PlayerData.data.mainHome.earnNum] || r_RoleCfg.EarnCoeffCfg[3];
  };
  e.prototype.getTitleByLevel = function (e) {
    return r_RoleCfg.RoletitileCfg[e];
  };
  e.prototype.getCurRoleLevelInfo = function () {
    this.checkData();
    return r_GroupSystem.GroupSystem.getRoleCfg()[r_PlayerData.PlayerData.data.battleLevel];
  };
  e.prototype.getRoleLevel = function () {
    this.checkData();
    return r_PlayerData.PlayerData.data.battleLevel;
  };
  e.prototype.getLevel = function () {
    return r_PlayerData.PlayerData.data.level;
  };
  e.prototype.getRoleByLevel = function (e) {
    return r_GroupSystem.GroupSystem.getRoleCfg()[e];
  };
  e.prototype.getRoleLevelList = function () {
    var e = this.getRoleLevelDataList();
    return e.filter(function (t, o) {
      return o < e.length - 1;
    });
  };
  e.prototype.getRoleLevelDataList = function () {
    this.checkData();
    var e = r_GroupSystem.GroupSystem.getRoleCfg();
    var t = Object.values(e);
    t.sort(function (e, t) {
      return e.level - t.level;
    });
    return t;
  };
  e.prototype.setExp = function (e, t) {
    undefined === t && (t = 4);
    var o = this.getCurRoleLevelInfo();
    var i = this.m_exp;
    this.m_exp = e;
    var r = o.onceExp;
    var c = Math.floor(i / r);
    var l = Math.floor(e / r);
    if (l > c) {
      var u = l - c;
      this.addDimond(t, u * o.exhcangeDiamond);
      r_jsbi.default.toNumber(r_PlayerData.PlayerData.bigDiamond) > 0 && "guidePhone" != r_GuideSystem.GuideSystem.guideType && r_GuideSystem.GuideSystem.hideFingerStep();
    }
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.expChange);
  };
  e.prototype.getProShow = function () {
    var e = this.getCurRoleLevelInfo();
    return this.m_exp + "/" + e.onceExp;
  };
  e.prototype.getProValue = function () {
    var e = this.getCurRoleLevelInfo();
    return this.m_exp % e.onceExp;
  };
  e.prototype.getOnceExp = function () {
    return this.getCurRoleLevelInfo().onceExp;
  };
  e.prototype.getAutoExpNum = function () {
    this.checkData();
    return r_RoleCfg.AutoTouchLevelCfg[r_PlayerData.PlayerData.data.mainHome.autoLevel].expNum;
  };
  e.prototype.getAutoInfoByLevel = function (e) {
    return r_RoleCfg.AutoTouchLevelCfg[e];
  };
  e.prototype.addExp = function (e, t) {
    undefined === t && (t = 0);
    if (!this.isPause) {
      switch (e) {
        case i.点击:
          this.setExp(this.m_exp + this.getExpNum(e), e);
          break;
        case i.自动:
          if (this.getAutoExpNum() <= 0 && e == i.自动) {
            return;
          }
          this.setExp(this.m_exp + this.getExpNum(e), e);
          break;
        case i.秘书:
          if (0 == t) {
            return;
          }
          var o = this.getSecretLevelExpById(t);
          this.setExp(this.m_exp + o * this.getEarnInfo().coeff, e);
      }
    }
  };
  e.prototype.addPendantExp = function () {
    this.hasPendant() && this.setExp(this.m_exp + this.getPendantExpOnce() * this.getEarnInfo().coeff, i.秘书);
  };
  e.prototype.getPendantExpOnce = function () {
    if (!this.hasPendant()) {
      return 0;
    }
    var e = this.getPendantId();
    var t = r_RoleCfg.PendantCfg[e];
    if (t) {
      return t.exp;
    } else {
      return 0;
    }
  };
  e.prototype.getQualityInfoById = function (e) {
    return r_RoleCfg.SecretQualityCfg[e].quality;
  };
  e.prototype.getSecretLevelInfoById = function (e) {
    var t = r_SecretUpSystem.SecretUpSystem.getSecretById(e);
    var o = r_SecretUpSystem.SecretUpSystem.getLevelByFeel(t.id, t.feel);
    return r_RoleCfg.QualityLevel[r_RoleCfg.SecretQualityCfg[e].quality].find(function (e) {
      return e.level == o;
    });
  };
  e.prototype.getSecretLevelExpById = function (e) {
    if (r_SecretUpSystem.SecretUpSystem.getSecretById(e).isBreak) {
      return r_RoleCfg.BreakValue[r_SecretUpSystem.SecretUpSystem.getBreakTouchNum(e)];
    } else {
      return this.getSecretLevelInfoById(e).autoTouch;
    }
  };
  e.prototype.getExpNum = function (e) {
    switch (e) {
      case i.点击:
        return this.getCurTouchInfo().num * this.getEarnInfo().coeff;
      case i.自动:
        if (this.getAutoExpNum() <= 0) {
          return 0;
        } else {
          return this.getAutoExpNum() * this.getEarnInfo().coeff;
        }
    }
  };
  e.prototype.addDimond = function (e, t) {
    r_PlayerData.PlayerData.addDiamond(e, t);
  };
  e.prototype.upLevel = function () {
    this.checkData();
    var e = this.getCurRoleLevelInfo();
    if (e) {
      e.price;
      r_PlayerData.PlayerData.data.battleLevel++;
      r_PlayerData.PlayerData.saveData();
      r_MainHomeUI.default.instance.restart();
    }
  };
  e.prototype.setLevel = function (e) {
    this.checkData();
    var t = this.getRoleByLevel(e);
    r_PlayerData.PlayerData.data.battleLevel = e;
    r_PlayerData.PlayerData.data.maxDiamondStr = t.upDiamond;
    r_PlayerData.PlayerData.maxDiamond = r_jsbi.default.BigInt(r_PlayerData.PlayerData.data.maxDiamondStr);
    r_PlayerData.PlayerData.saveData();
    r_MainHomeUI.default.instance.restart();
  };
  e.prototype.battleSucc = function () {
    r_PlayerData.PlayerData.data.newGuideBattle = true;
    r_PlayerData.PlayerData.data.newGuideType = 1;
    r_PlayerData.PlayerData.saveData();
    r_MainHomeUI.default.instance.restart();
  };
  e.prototype.upAutoTouch = function () {
    this.checkData();
    if (r_RoleCfg.AutoTouchLevelCfg[r_PlayerData.PlayerData.data.mainHome.autoLevel].isMax) {
      r_UtilsSystem.UtilsSystem.showTip("已经是最高等级了");
    } else {
      r_PlayerData.PlayerData.data.mainHome.autoLevel++;
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.upTouchLevel = function () {
    this.checkData();
    r_PlayerData.PlayerData.data.mainHome.touchLevel++;
    r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.点击升级);
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.getCurTouchInfo = function () {
    this.checkData();
    return this.earnRuleMap[r_PlayerData.PlayerData.data.level];
  };
  e.prototype.getTouchInfoByLevel = function (e) {
    return this.earnRuleMap[e];
  };
  e.prototype.addEarnNum = function () {
    this.checkData();
    r_PlayerData.PlayerData.data.mainHome.earnNum++;
    r_PlayerData.PlayerData.data.mainHome.earnTime += this.getEarnInfo().time;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.getCurDiamondNum = function () {
    this.checkData();
    var e = this.getCurRoleLevelInfo();
    var t = r_jsbi.default.subtract(r_jsbi.default.BigInt(e.upDiamond), r_PlayerData.PlayerData.maxDiamond);
    var o = parseInt(t.toString());
    if (o <= 0) {
      return 0;
    } else {
      return o;
    }
  };
  e.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data) {
      this.checkData();
      this.passTime = this.passTime + e;
      if (this.passTime > 1) {
        this.passTime = 0;
        r_PlayerData.PlayerData.data.mainHome.earnTime > 0 && r_PlayerData.PlayerData.data.mainHome.earnTime--;
        if (r_PlayerData.PlayerData.data.mainHome.earnTime < 1) {
          r_PlayerData.PlayerData.data.mainHome.earnTime = 0;
          r_PlayerData.PlayerData.data.mainHome.earnNum = 0;
        }
        r_PlayerData.PlayerData.data.newGuideTime > 0 && r_PlayerData.PlayerData.data.newGuideTime--;
        r_PlayerData.PlayerData.data.newGuideTime < 0 && -1 != r_PlayerData.PlayerData.data.newGuideTime && (r_PlayerData.PlayerData.data.newGuideTime = -1);
        r_PlayerData.PlayerData.data.newGuideTime2 > 0 && r_PlayerData.PlayerData.data.newGuideTime2--;
        r_PlayerData.PlayerData.data.newGuideTime2 < 0 && -1 != r_PlayerData.PlayerData.data.newGuideTime && (r_PlayerData.PlayerData.data.newGuideTime2 = -1);
      }
    }
  };
  e.prototype.getEarnTime = function () {
    this.checkData();
    var e = r_PlayerData.PlayerData.data.mainHome.earnTime;
    if (e <= 0) {
      return "";
    }
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  e.prototype.getNewGuideTime = function () {
    this.checkData();
    var e = r_PlayerData.PlayerData.data.newGuideTime;
    if (e <= 0) {
      return "00:00";
    }
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  e.prototype.getNewGuideTime2 = function () {
    this.checkData();
    var e = r_PlayerData.PlayerData.data.newGuideTime2;
    if (e <= 0) {
      return "00:00";
    }
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  e.prototype.checkNewGuideTime = function () {
    return r_PlayerData.PlayerData.data.newGuideTime > 0;
  };
  e.prototype.checkNewGuideTime2 = function () {
    return r_PlayerData.PlayerData.data.newGuideTime2 > 0;
  };
  e.prototype.addPendant = function (e) {
    if (r_PlayerData.PlayerData.data.pendantId != e) {
      r_PlayerData.PlayerData.data.pendantId = e;
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.getPendantId = function () {
    return r_PlayerData.PlayerData.data.pendantId;
  };
  e.prototype.hasPendant = function () {
    return r_PlayerData.PlayerData.data.pendantId > 0;
  };
  e.prototype.getSecondCoin = function () {
    var e = r_jsbi.default.BigInt(0);
    for (var t = r_PlayerData.PlayerData.data.secretUpList.length - 1; t >= 0; t--) {
      var o = r_PlayerData.PlayerData.data.secretUpList[t];
      var i = this.getSecretLevelExpById(o.id);
      e = r_jsbi.default.ADD(e, r_jsbi.default.BigInt(i));
    }
    return e;
  };
  return e;
}();
exports.RoleSystem = new m();
(function (e) {
  e[e["点击"] = 1] = "点击";
  e[e["自动"] = 2] = "自动";
  e[e["秘书"] = 3] = "秘书";
  e[e["其它"] = 4] = "其它";
  e[e["兵器"] = 5] = "兵器";
  e[e["天工神兵"] = 6] = "天工神兵";
  e[e["仙界神树"] = 7] = "仙界神树";
  e[e["爬塔"] = 8] = "爬塔";
  e[e["小游戏"] = 9] = "小游戏";
  e[e["乡村神秘商店"] = 10] = "乡村神秘商店";
})(i = exports.ExpType || (exports.ExpType = {}));