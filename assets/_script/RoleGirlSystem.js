Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGirlSystem = exports._RoleGirlSystem = undefined;
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_jsbi = require("jsbi");
var r_RoleGirlCfg = require("RoleGirlCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_SoundMgr = require("SoundMgr");
var r_BigNumSystem = require("BigNumSystem");
var r_ChatSystem = require("ChatSystem");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__RoleGirlSystem = function () {
  function _ctor() {
    this.roleCfgMap = null;
    this.roleIdList = null;
    this.roleRoot = null;
    this.roleLevelCfgMap = null;
    this.rolePrefabMap = {};
    this.isPlayAnim = false;
    this.newRoleId = null;
    this.unlockHouseNum = 4;
    this.unlockBusinessNum = 6;
    this.unlockCityNum = 8;
    this.unlockStarNum = 10;
  }
  _ctor.prototype.checkInit = function () {
    if (!this.roleCfgMap) {
      this.roleCfgMap = {};
      this.roleIdList = [];
      this.roleLevelCfgMap = {};
      for (var e = 0; e < r_RoleGirlCfg.RoleGirlCfg.length; e++) {
        this.roleIdList.push(r_RoleGirlCfg.RoleGirlCfg[e].id);
        this.roleCfgMap[r_RoleGirlCfg.RoleGirlCfg[e].id] = r_RoleGirlCfg.RoleGirlCfg[e];
      }
      var t = r_GroupSystem.GroupSystem.getRoleGirlLevelCfg();
      for (var o in t) {
        var i = t[o];
        this.roleLevelCfgMap[o] = {};
        this.roleLevelCfgMap[o].list = i;
        this.roleLevelCfgMap[o].map = {};
        for (var n = 0; n < i.length; n++) {
          this.roleLevelCfgMap[o].map[i[n].level] = i[n];
        }
      }
    }
    r_PlayerData.PlayerData.data.roleGirlMap.roleList || (r_PlayerData.PlayerData.data.roleGirlMap.roleList = []);
    r_PlayerData.PlayerData.data.roleGirlMap.roleList.forEach(function (e) {
      var t = r_RoleGirlCfg.RoleGirlLevelCfg[e.id].length - 1;
      e.level > t && (e.level = t);
    });
  };
  _ctor.prototype.initRole = function () {
    this.checkInit();
    this.isPlayAnim = false;
    for (var e in this.rolePrefabMap) {
      var t = this.rolePrefabMap[e];
      cc.Tween.stopAllByTarget(t);
    }
    this.rolePrefabMap = {};
    if (this.roleRoot) {
      this.roleRoot.destroyAllChildren();
    } else {
      this.roleRoot = new cc.Node("roleRoot");
    }
    r_TimeSystem.TimeSystem.scheduleClear("playRoleAnim");
    for (var o = 0; o < r_PlayerData.PlayerData.data.roleGirlMap.roleList.length; o++) {
      var i = r_PlayerData.PlayerData.data.roleGirlMap.roleList[o];
      this.getRoleCfg(i.id);
      r_RoleGirlCfg.RoleGirlPosCfg[o];
    }
  };
  _ctor.prototype.getSecretById = function (e) {
    return r_PlayerData.PlayerData.data.roleGirlMap.roleList.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.checkHasRoleGirl = function (e) {
    return null != this.getSecretById(e);
  };
  _ctor.prototype.checkSigninGet = function (e) {
    return this.getRoleCfg[e].signin;
  };
  _ctor.prototype.getSkinId = function (e) {
    var t = this.getSecretById(e).skinId;
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
  _ctor.prototype.addRole = function (e, t) {
    var o = this;
    r_ResSystem.ResSystem.loadBundleRes("bundle1", "role/" + e.prefab, cc.Prefab, function (i, n) {
      var a = cc.instantiate(n);
      o.roleRoot.addChild(a);
      a.x = t.x;
      a.y = t.y;
      a.scale = t.scale;
      a.roleCfg = e;
      a.posInfo = t;
      if (999 == a.roleCfg.id) {
        a.zIndex = 999;
      } else {
        a.zIndex = a.roleCfg.id;
      }
      a.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
      o.rolePrefabMap[e.id] = a;
    });
  };
  _ctor.prototype.getRoleCfg = function (e) {
    return this.roleCfgMap[e];
  };
  _ctor.prototype.canUnlock = function (e) {
    var t = this.roleIdList.indexOf(e);
    if (t <= 0) {
      return true;
    }
    var o = this.getRoleCfg(e);
    var i = this.roleIdList[t - 1];
    return this.getRoleLevel(i) >= o.unlock;
  };
  _ctor.prototype.getRoleLevelCfg = function (e, t) {
    return this.roleLevelCfgMap[e].map[t];
  };
  _ctor.prototype.getRoleLevel = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.roleGirlMap.roleList.length; t++) {
      if (r_PlayerData.PlayerData.data.roleGirlMap.roleList[t].id == e) {
        return r_PlayerData.PlayerData.data.roleGirlMap.roleList[t].level;
      }
    }
    return 0;
  };
  _ctor.prototype.isBuyRole = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.roleGirlMap.roleList.length; t++) {
      if (r_PlayerData.PlayerData.data.roleGirlMap.roleList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBuyInfo = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.roleGirlMap.roleList.length; t++) {
      if (r_PlayerData.PlayerData.data.roleGirlMap.roleList[t].id == e) {
        return r_PlayerData.PlayerData.data.roleGirlMap.roleList[t];
      }
    }
    return null;
  };
  _ctor.prototype.buyRole = function (e) {
    r_SoundMgr.SoundMgr.playSound("升级成功音效");
    var t = false;
    for (var o = 0; o < r_PlayerData.PlayerData.data.roleGirlMap.roleList.length; o++) {
      if (r_PlayerData.PlayerData.data.roleGirlMap.roleList[o].id == e) {
        var n = r_RoleGirlCfg.RoleGirlLevelCfg[e].length - 1;
        r_PlayerData.PlayerData.data.roleGirlMap.roleList[o].level < n && (r_PlayerData.PlayerData.data.roleGirlMap.roleList[o].level = r_PlayerData.PlayerData.data.roleGirlMap.roleList[o].level + 1);
        t = true;
      }
    }
    if (t) {
      if (r_PlayerData.PlayerData.data.roleGirlMap.roleList.length == this.roleIdList.length) {
        for (o = 0; o < r_PlayerData.PlayerData.data.roleGirlMap.roleList.length && !(r_PlayerData.PlayerData.data.roleGirlMap.roleList[o].level < 100); o++) {
          ;
        }
      }
      r_ChatSystem.ChatSystem.checkTriggerTask();
    } else {
      var c = {};
      c.id = e;
      c.level = 1;
      r_PlayerData.PlayerData.data.roleGirlMap.roleList.push(c);
      this.getRoleCfg(e);
      r_RoleGirlCfg.RoleGirlPosCfg[r_PlayerData.PlayerData.data.roleGirlMap.roleList.length - 1];
      this.newRoleId = e;
      r_PlayerData.PlayerData.data.roleGirlMap.roleList.length;
      this.roleIdList.length;
      console.log("PlayerData.data.roleGirlMap.roleList.length: ", r_PlayerData.PlayerData.data.roleGirlMap.roleList.length);
      r_PlayerData.PlayerData.data.roleGirlMap.roleList.length >= 11 && r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith("inextTip");
      r_MainHomeUI.default.Inst && r_MainHomeUI.default.Inst.showSecret();
      r_ChatSystem.ChatSystem.checkTriggerTask();
    }
  };
  _ctor.prototype.getSellCoin = function (e) {
    var t = this.getBuyInfo(e.id);
    if (t) {
      return (r_TimeSystem.TimeSystem.getServerTime() - t.time) * e.increase + e.buy;
    } else {
      return e.buy;
    }
  };
  _ctor.prototype.sellRole = function (e) {
    var t = this.getSellCoin(e);
    r_PlayerData.PlayerData.addCoin("卖出角色", t, r_ReportSystem.SystemKey.雇佣系统);
    for (var o = r_PlayerData.PlayerData.data.roleGirlMap.roleList.length - 1; o >= 0; o--) {
      r_PlayerData.PlayerData.data.roleGirlMap.roleList[o].id == e.id && r_PlayerData.PlayerData.data.roleGirlMap.roleList.splice(o, 1);
    }
  };
  _ctor.prototype.onTouchMainLayer = function (e) {
    if (!this.isPlayAnim) {
      for (var t in this.rolePrefabMap) {
        var o = this.rolePrefabMap[t];
        if (r_UtilsSystem.UtilsSystem.touchInNode(o, e)) {
          return void this.playRoleAnim(t);
        }
      }
    }
  };
  _ctor.prototype.checkPlayNewRoleAnim = function () {
    if (this.newRoleId) {
      this.playRoleAnim(this.newRoleId);
      this.newRoleId = null;
    }
  };
  _ctor.prototype.playRoleAnim = function () {};
  _ctor.prototype.getSecondCoin = function () {
    var e = r_jsbi.default.BigInt(0);
    for (var t = r_PlayerData.PlayerData.data.roleGirlMap.roleList.length - 1; t >= 0; t--) {
      var o = r_PlayerData.PlayerData.data.roleGirlMap.roleList[t];
      var i = this.getRoleLevelCfg(o.id, o.level);
      e = r_jsbi.default.ADD(e, r_jsbi.default.BigInt(i.earn));
    }
    return r_jsbi.default.multiply(e, r_BigNumSystem.BigNumSystem.getNum(r_RoleGirlCfg.RoleGirlTranCfg[r_PlayerData.PlayerData.data.roleGirlTranLevel].earn));
  };
  _ctor.prototype.needShowRedTip = function () {
    for (var e = 0; e < this.roleIdList.length; e++) {
      var t = this.roleIdList[e];
      this.roleIdList[e + 1];
      var o = this.getRoleLevel(t);
      var i = this.getRoleLevelCfg(t, o);
      if (i && this.canUnlock(t) && r_PlayerData.PlayerData.isCoinEnough(i.coin)) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBoughtRoleCount = function () {
    return r_PlayerData.PlayerData.data.roleGirlMap.roleList.length;
  };
  _ctor.prototype.getSecretList = function () {
    return r_PlayerData.PlayerData.data.roleGirlMap.roleList;
  };
  _ctor.prototype.getLevel = function (e) {
    return this.getSecretById(e).level;
  };
  return _ctor;
}();
exports._RoleGirlSystem = exp__RoleGirlSystem;
exports.RoleGirlSystem = new exp__RoleGirlSystem();