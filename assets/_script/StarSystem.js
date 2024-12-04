Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarSystem = exports._StarSystem = exports.CoinType = undefined;
var i;
var r_jsbi = require("jsbi");
var r_StarCfg = require("StarCfg");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
(function (e) {
  e[e.income = 0] = "income";
  e[e.savings = 1] = "savings";
})(i = exports.CoinType || (exports.CoinType = {}));
var exp__StarSystem = function () {
  function _ctor() {
    this.starCfgMap = null;
  }
  _ctor.prototype.checkInit = function () {
    if (!this.starCfgMap) {
      this.starCfgMap = {};
      for (var e = 0; e < r_StarCfg.starCfg.length; e++) {
        this.starCfgMap[r_StarCfg.starCfg[e].id] = r_StarCfg.starCfg[e];
      }
    }
    r_PlayerData.PlayerData.data.starMap.starList || (r_PlayerData.PlayerData.data.starMap.starList = []);
    r_TimeSystem.TimeSystem.registSecondUpdate("starSystem", this.onSecondUpdate.bind(this));
  };
  _ctor.prototype.onSecondUpdate = function () {
    if (!r_PlayerData.PlayerData.data.starMap.starList) {
      return false;
    }
    for (var e = 0; e < r_PlayerData.PlayerData.data.starMap.starList.length; e++) {
      r_PlayerData.PlayerData.data.starMap.starList[e].addTime || (r_PlayerData.PlayerData.data.starMap.starList[e].addTime = 0);
      r_PlayerData.PlayerData.data.starMap.starList[e].allTime || (r_PlayerData.PlayerData.data.starMap.starList[e].allTime = 0);
      r_PlayerData.PlayerData.data.starMap.starList[e].addTime = r_PlayerData.PlayerData.data.starMap.starList[e].addTime + 1;
      r_PlayerData.PlayerData.data.starMap.starList[e].allTime = r_PlayerData.PlayerData.data.starMap.starList[e].allTime + 1;
    }
  };
  _ctor.prototype.isbuyStar = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.starMap.starList.length; t++) {
      if (r_PlayerData.PlayerData.data.starMap.starList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBuyInfo = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.starMap.starList.length; t++) {
      if (r_PlayerData.PlayerData.data.starMap.starList[t].id == e) {
        return r_PlayerData.PlayerData.data.starMap.starList[t];
      }
    }
    return null;
  };
  _ctor.prototype.getStarCfg = function (e) {
    return this.starCfgMap[e];
  };
  _ctor.prototype.buyStar = function (e) {
    if (!this.isbuyStar(e)) {
      var t = {};
      t.nowtime = r_TimeSystem.TimeSystem.getServerTime();
      t.starttime = r_TimeSystem.TimeSystem.getServerTime();
      t.addTime = 0;
      t.allTime = 0;
      t.id = e;
      r_PlayerData.PlayerData.data.starMap.starList.push(t);
    }
  };
  _ctor.prototype.getCoin = function (e, t) {
    undefined === t && (t = i.income);
    var o = this.getBuyInfo(e.id);
    if (!o) {
      return e.income;
    }
    var a = r_jsbi.default.BigInt(0);
    if (t == i.income) {
      var s = o.addTime;
      s || (s = 0);
      a = r_jsbi.default.multiply(r_jsbi.default.BigInt(s), r_jsbi.default.BigInt(e.income));
    } else {
      var r = o.allTime;
      r || (r = 0);
      a = r_jsbi.default.multiply(r_jsbi.default.BigInt(r), r_jsbi.default.BigInt(e.income));
    }
    return a;
  };
  _ctor.prototype.countAllCoin = function (e, t) {
    undefined === e && (e = i.income);
    undefined === t && (t = false);
    var a = r_jsbi.default.BigInt(0);
    for (var r = 0; r < r_PlayerData.PlayerData.data.starMap.starList.length; r++) {
      var c = r_PlayerData.PlayerData.data.starMap.starList[r];
      var l = exports.StarSystem.getStarCfg(c.id);
      var u = exports.StarSystem.getCoin(l, e);
      a = r_jsbi.default.add(a, u);
      e == i.income && t && (c.addTime = 0);
    }
    return a;
  };
  _ctor.prototype.needShowRedTip = function () {
    if (!r_PlayerData.PlayerData.data.starMap || !r_PlayerData.PlayerData.data.starMap.starList) {
      return false;
    }
    for (var e = 0; e < r_StarCfg.starCfg.length; e++) {
      var t = r_StarCfg.starCfg[e];
      if (!exports.StarSystem.isbuyStar(t.id) && r_PlayerData.PlayerData.isCoinEnough(t.cost)) {
        return true;
      }
    }
    return false;
  };
  return _ctor;
}();
exports._StarSystem = exp__StarSystem;
exports.StarSystem = new exp__StarSystem();