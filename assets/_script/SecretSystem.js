Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretSystem = exports._SecretSystem = undefined;
var r_SecretCfg = require("SecretCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__SecretSystem = function () {
  function _ctor() {
    this.secretIdList = [];
    this.secretCfgMap = {};
    this.secretLevelMap = {};
    this.watchMap = {};
    this.limitTime = 43200;
    this.incomInfo = {};
  }
  _ctor.prototype.init = function () {
    for (var e = 0; e < r_SecretCfg.SecretCfg.length; e++) {
      this.secretCfgMap[r_SecretCfg.SecretCfg[e].id] = r_SecretCfg.SecretCfg[e];
      this.secretIdList.push(r_SecretCfg.SecretCfg[e].id);
    }
    for (e = 0; e < r_SecretCfg.SecretLevelCfg.length; e++) {
      this.secretLevelMap[r_SecretCfg.SecretLevelCfg[e].level] = r_SecretCfg.SecretLevelCfg[e];
    }
    var t = cc.sys.localStorage.getItem("secretWatchMap");
    if (t) {
      try {
        this.watchMap = JSON.parse(t);
      } catch (o) {}
    }
  };
  _ctor.prototype.checkInit = function () {
    if (!r_PlayerData.PlayerData.data.secretMap) {
      r_PlayerData.PlayerData.data.secretMap = {};
      r_PlayerData.PlayerData.data.secretMap.secretList = [];
      r_PlayerData.PlayerData.data.secretMap.buyList = [];
      r_PlayerData.PlayerData.data.secretMap.buyTime = 0;
    }
    var e = r_PlayerData.PlayerData.data.secretMap.secretList;
    for (var t = e.length - 1; t >= 0; t--) {
      var o = e[t];
      (o < 1 || o > 10) && e.splice(t, 1);
    }
  };
  _ctor.prototype.checkRefreshBuyList = function () {
    r_PlayerData.PlayerData.data.secretMap.buyTime && !r_TimeSystem.TimeSystem.isNextDay2(r_PlayerData.PlayerData.data.secretMap.buyTime, r_PlayerData.PlayerData.data.time) || this.refreshBuyList();
  };
  _ctor.prototype.refreshBuyList = function () {
    this.watchMap = {};
    this.saveWatchMap();
    r_PlayerData.PlayerData.data.secretMap.buyTime = r_PlayerData.PlayerData.data.time;
    var e = [];
    for (var t = 0; t < r_PlayerData.PlayerData.data.secretMap.secretList.length; t++) {
      e.push(r_PlayerData.PlayerData.data.secretMap.secretList[t].id);
    }
    r_PlayerData.PlayerData.data.secretMap.buyList || (r_PlayerData.PlayerData.data.secretMap.buyList = []);
    for (t = 0; t < r_PlayerData.PlayerData.data.secretMap.buyList.length; t++) {
      e.push(r_PlayerData.PlayerData.data.secretMap.buyList[t]);
    }
    var o = r_UtilsSystem.UtilsSystem.getShuffleFromArrExceptList(this.secretIdList, e);
    r_PlayerData.PlayerData.data.secretMap.buyList = [];
    for (t = 0; t < 3; t++) {
      r_PlayerData.PlayerData.data.secretMap.buyList.push(o[t]);
    }
  };
  _ctor.prototype.getSecretCfgById = function (e) {
    return this.secretCfgMap[e];
  };
  _ctor.prototype.hasSecret = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.secretMap.secretList.length; t++) {
      if (r_PlayerData.PlayerData.data.secretMap.secretList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.addSecret = function (e) {
    if (!this.hasSecret(e.id)) {
      var t = {};
      t.id = e.id;
      t.level = 1;
      t.star = 0;
      t.feel = 0;
      t.addTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.data.secretMap.secretList.push(t);
      r_PlayerData.PlayerData.saveData();
      r_MainHomeUI.default.instance.showSecret();
    }
  };
  _ctor.prototype.watchSecret = function (e) {
    this.watchMap[e] = true;
    this.saveWatchMap();
  };
  _ctor.prototype.saveWatchMap = function () {
    cc.sys.localStorage.setItem("secretWatchMap", JSON.stringify(this.watchMap));
  };
  _ctor.prototype.getCfgByFeel = function (e) {
    var t = r_SecretCfg.SecretLevelCfg[0];
    for (var o = 0; o < r_SecretCfg.SecretLevelCfg.length && e >= r_SecretCfg.SecretLevelCfg[o].need; o++) {
      t = r_SecretCfg.SecretLevelCfg[o];
    }
    return t;
  };
  _ctor.prototype.calIncomeInfo = function (e) {
    var t = r_TimeSystem.TimeSystem.getServerTime();
    var o = 0;
    var i = true;
    var n = r_PlayerData.PlayerData.data.secretMap.secretList[e];
    var r = this.getCfgByFeel(n.feel);
    var c = t - n.addTime;
    if (c > this.limitTime) {
      c = this.limitTime;
    } else {
      i = false;
    }
    o += r.gains * c / 5;
    this.incomInfo.gainNum = Math.floor(o);
    this.incomInfo.isLimit = i;
    return this.incomInfo;
  };
  _ctor.prototype.allGainInfo = function () {
    var e = this;
    var t = 0;
    var o = 0;
    r_PlayerData.PlayerData.data.secretMap.secretList.forEach(function (i, n) {
      t += e.calIncomeInfo(n).gainNum;
      var a = e.getCfgByFeel(i.feel);
      o += a.gains;
    });
    return {
      gainNum: t,
      gains: o
    };
  };
  _ctor.prototype.addIncome = function (e) {
    var t = this.calIncomeInfo(e);
    r_PlayerData.PlayerData.data.secretMap.secretList[e].addTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.addCoin("秘书收益", t.gainNum);
  };
  _ctor.prototype.addAllIncome = function (e, t, o) {
    r_PlayerData.PlayerData.data.secretMap.secretList.forEach(function (e) {
      e.addTime = t;
    });
    r_PlayerData.PlayerData.addCoin("秘书离线收益", o ? 2 * e : e);
  };
  _ctor.prototype.getSecretList = function () {
    return r_PlayerData.PlayerData.data.secretMap.secretList;
  };
  return _ctor;
}();
exports._SecretSystem = exp__SecretSystem;
exports.SecretSystem = new exp__SecretSystem();