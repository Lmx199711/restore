Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretUpSystem = undefined;
var r_RoleCfg = require("RoleCfg");
var r_TaskCfg = require("TaskCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_SecretUpUI = require("SecretUpUI");
var r_PlayerData = require("PlayerData");
var r_SecretSystem = require("SecretSystem");
var r_TaskSystem = require("TaskSystem");
var r_UtilsSystem = require("UtilsSystem");
var h = function () {
  function e() {
    this.spList = [19, 20, 21];
  }
  e.prototype.checkInit = function () {
    var e = this;
    if (0 == r_PlayerData.PlayerData.data.secretUpList.length && r_PlayerData.PlayerData.data.secretMap.secretList.length > 0) {
      var t = r_PlayerData.PlayerData.data.secretMap.secretList;
      for (var o = t.length - 1; o >= 0; o--) {
        var i = t[o];
        (i < 1 || i > 10) && t.splice(o, 1);
      }
      r_PlayerData.PlayerData.data.secretUpList = [];
      for (o = 0; o < t.length; o++) {
        var n = t[o];
        var a = {
          id: n.id,
          level: r_SecretSystem.SecretSystem.getCfgByFeel(n.feel).level,
          isBreak: false,
          isBattle: true,
          skinId: 1,
          equipNum: 0
        };
        r_PlayerData.PlayerData.data.secretUpList.push(a);
      }
      r_PlayerData.PlayerData.data.secretMap.secretList = [];
    }
    var s = this;
    r_PlayerData.PlayerData.data.secretUpList.forEach(function (t) {
      null == t.id && (t.id = 1);
      null == t.level && (t.level = 1);
      null == t.isBreak && (t.isBreak = false);
      null == t.isBattle && (t.isBattle = true);
      null == t.skinId && (t.skinId = 1);
      null == t.feel && (t.feel = e.getFeelByLevel(t.id, t.level));
      null == t.equipNum && (t.equipNum = 0);
    });
    r_PlayerData.PlayerData.data.secretUpList.sort(function (e, t) {
      return s.getSecretCfgById(t.id).quality - s.getSecretCfgById(e.id).quality;
    });
  };
  e.prototype.getFeelByLevel = function (e, t) {
    var o = r_RoleCfg.SecretQualityCfg[e].quality;
    return r_RoleCfg.QualityLevel[o][t - 1].need;
  };
  e.prototype.getLevelByFeel = function (e, t) {
    var o = r_RoleCfg.SecretQualityCfg[e].quality;
    var n = r_RoleCfg.QualityLevel[o];
    var a = n[0];
    for (var s = 0; s < n.length && t >= n[s].need; s++) {
      a = n[s];
    }
    return a.level;
  };
  e.prototype.getSecretCfgById = function (e) {
    return r_RoleCfg.SecretQualityCfg[e];
  };
  e.prototype.getSecretList = function () {
    return r_PlayerData.PlayerData.data.secretUpList;
  };
  e.prototype.getSecretBattleList = function () {
    return this.getSecretList().filter(function (e) {
      return e.isBattle;
    });
  };
  e.prototype.getSecretById = function (e) {
    return r_PlayerData.PlayerData.data.secretUpList.find(function (t) {
      return t.id == e;
    });
  };
  e.prototype.getSkinId = function (e) {
    var t = exports.SecretUpSystem.getSecretById(e).skinId;
    if (1 == t && this.getSecretById(e).equipNum >= 2) {
      if (e >= 19) {
        return 5;
      } else {
        return 4;
      }
    } else {
      return t;
    }
  };
  e.prototype.getSecretUpInfo = function (e) {
    if (!this.hasSecret(e)) {
      return null;
    }
    var t = this.getSecretById(e);
    var o = this.getLevelByFeel(e, t.feel);
    return r_RoleCfg.QualityLevel[this.getSecretCfgById(e).quality][o - 1];
  };
  e.prototype.checkMaxLevel = function (e) {
    if (this.hasSecret(e)) {
      return this.getSecretUpInfo(e).isMax;
    } else {
      return null;
    }
  };
  e.prototype.getUpCoin = function (e) {
    if (this.hasSecret(e)) {
      return this.getSecretUpInfo(e).upCoin;
    } else {
      return null;
    }
  };
  e.prototype.hasSecret = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.secretUpList.length; t++) {
      if (r_PlayerData.PlayerData.data.secretUpList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  e.prototype.setBattle = function (e, t) {
    if (this.hasSecret(e)) {
      this.getSecretById(e).isBattle = t;
      r_PlayerData.PlayerData.saveData();
      r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.showSecret();
    }
  };
  e.prototype.addSecret = function (e) {
    if (!this.hasSecret(e.id)) {
      var t = r_PlayerData.PlayerData.data.secretUpList.filter(function (e) {
        return e.isBattle;
      }).length;
      var o = {};
      o.id = e.id;
      o.level = 1;
      o.isBreak = false;
      o.isBattle = t < 10;
      o.skinId = 1;
      o.feel = 0;
      o.equipNum = 0;
      r_PlayerData.PlayerData.data.secretUpList.push(o);
      var i = this;
      r_PlayerData.PlayerData.data.secretUpList.sort(function (e, t) {
        return i.getSecretCfgById(t.id).quality - i.getSecretCfgById(e.id).quality;
      });
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.招募秘书);
      r_PlayerData.PlayerData.saveData();
      r_SecretUpUI.SecretUpUI.Inst && r_SecretUpUI.SecretUpUI.Inst.restart();
      r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.showSecret();
    }
  };
  e.prototype.addSpSecret = function () {
    var e = this;
    var t = this.spList[0];
    if (this.checkHasSpSecret()) {
      var o = this.getSecretList().filter(function (t) {
        return e.spList.includes(t.id);
      }).filter(function (t) {
        return !e.spList.includes(t.id);
      });
      if (o.length <= 0) {
        var i = this.spList[r_UtilsSystem.UtilsSystem.getRandomNum(0, this.spList.length - 1)];
        this.addSecret({
          id: i
        });
        return i;
      }
      this.addSecret({
        id: o[0]
      });
      return o[0];
    }
    t = this.spList[0];
    this.addSecret({
      id: t
    });
    return t;
  };
  e.prototype.addNoneSecret = function (e) {
    var t = this;
    undefined === e && (e = "random");
    var o = Object.keys(r_RoleCfg.SecretQualityCfg).map(function (e) {
      return Number(e);
    });
    var n = this.getSecretList();
    n = n.map(function (e) {
      return e.id;
    });
    var a = o.filter(function (e) {
      return !n.includes(e);
    });
    if (!(a.length <= 0)) {
      var s = a[r_UtilsSystem.UtilsSystem.getRandomNum(0, a.length - 1)];
      if ("random" != e) {
        a.sort(function (o, i) {
          var n = t.getSecretCfgById(o).quality;
          var a = t.getSecretCfgById(i).quality;
          if ("des" == e) {
            return a - n;
          } else {
            return n - a;
          }
        });
        s = a[0];
      }
      this.addSecret({
        id: s
      });
      return s;
    }
  };
  e.prototype.checkHasSpSecret = function () {
    var e = this;
    return -1 != this.spList.findIndex(function (t) {
      return e.hasSecret(t);
    });
  };
  e.prototype.breakSecret = function (e) {
    this.getSecretById(e).isBreak = true;
    this.changeSkin(e, 2);
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.getBreakTouchNum = function (e) {
    return this.getSecretCfgById(e).quality;
  };
  e.prototype.changeSkin = function (e, t) {
    this.hasSecret(e) && (this.getSecretById(e).skinId = t);
  };
  e.prototype.debugAddAllSecret = function () {
    var e = Object.values(r_RoleCfg.SecretQualityCfg).filter(function (e) {
      return e.quality < 4;
    });
    var t = [];
    e.forEach(function (e) {
      var o = {};
      o.id = e.id;
      o.level = 1;
      o.isBreak = false;
      o.isBattle = false;
      o.skinId = 1;
      o.feel = 0;
      o.equipNum = 0;
      t.push(o);
    });
    r_PlayerData.PlayerData.data.secretUpList = t;
    r_SecretUpUI.SecretUpUI.Inst && r_SecretUpUI.SecretUpUI.Inst.restart();
    r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.showSecret();
  };
  e.prototype.debugAllMaxLevel = function () {
    var e = this;
    r_PlayerData.PlayerData.data.secretUpList.forEach(function (t) {
      t.level = 50;
      t.feel = e.getFeelByLevel(t.id, t.level);
    });
    r_PlayerData.PlayerData.saveData();
    r_SecretUpUI.SecretUpUI.Inst && r_SecretUpUI.SecretUpUI.Inst.restart();
    r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.showSecret();
  };
  e.prototype.addEquipNum = function (e) {
    this.getSecretById(e);
    null == this.getSecretById(e).equipNum && (this.getSecretById(e).equipNum = 0);
    this.getSecretById(e).equipNum++;
    r_PlayerData.PlayerData.saveData();
  };
  return e;
}();
exports.SecretUpSystem = new h();