Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HouseEarnSystem = exports._HouseEarnSystem = undefined;
var r_jsbi = require("jsbi");
var r_HouseEarnCfg = require("HouseEarnCfg");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var exp__HouseEarnSystem = function () {
  function _ctor() {
    this.houseCfgMap = null;
  }
  _ctor.prototype.checkInit = function () {
    if (!this.houseCfgMap) {
      this.houseCfgMap = {};
      for (var e = 0; e < r_HouseEarnCfg.HouseEarnCfg.length; e++) {
        this.houseCfgMap[r_HouseEarnCfg.HouseEarnCfg[e].id] = r_HouseEarnCfg.HouseEarnCfg[e];
      }
    }
    r_PlayerData.PlayerData.data.houseMap.houseList || (r_PlayerData.PlayerData.data.houseMap.houseList = []);
    r_TimeSystem.TimeSystem.registSecondUpdate("HouseEarnSystem", this.onSecondUpdate.bind(this));
  };
  _ctor.prototype.getHouseCfg = function (e) {
    return this.houseCfgMap[e];
  };
  _ctor.prototype.onSecondUpdate = function () {
    if (!r_PlayerData.PlayerData.data.houseMap.houseList) {
      return false;
    }
    for (var e = 0; e < r_PlayerData.PlayerData.data.houseMap.houseList.length; e++) {
      r_PlayerData.PlayerData.data.houseMap.houseList[e].addTime || (r_PlayerData.PlayerData.data.houseMap.houseList[e].addTime = 0);
      r_PlayerData.PlayerData.data.houseMap.houseList[e].addTime = r_PlayerData.PlayerData.data.houseMap.houseList[e].addTime + 1;
    }
  };
  _ctor.prototype.isBuyHouse = function (e) {
    if (!r_PlayerData.PlayerData.data.houseMap.houseList) {
      return false;
    }
    for (var t = 0; t < r_PlayerData.PlayerData.data.houseMap.houseList.length; t++) {
      if (r_PlayerData.PlayerData.data.houseMap.houseList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBuyInfo = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.houseMap.houseList.length; t++) {
      if (r_PlayerData.PlayerData.data.houseMap.houseList[t].id == e) {
        return r_PlayerData.PlayerData.data.houseMap.houseList[t];
      }
    }
    return null;
  };
  _ctor.prototype.buyHouse = function (e) {
    if (!this.isBuyHouse(e)) {
      var t = {};
      t.time = r_TimeSystem.TimeSystem.getServerTime();
      t.id = e;
      t.addTime = 0;
      r_PlayerData.PlayerData.data.houseMap.houseList.push(t);
    }
  };
  _ctor.prototype.getSellCoin = function (e) {
    var t = this.getBuyInfo(e.id);
    if (!t) {
      return r_jsbi.default.BigInt(e.buy);
    }
    var o = t.addTime;
    o || (o = 0);
    var n = r_jsbi.default.multiply(r_jsbi.default.BigInt(o), r_jsbi.default.BigInt(e.increase));
    return r_jsbi.default.add(n, r_jsbi.default.BigInt(e.buy));
  };
  _ctor.prototype.sellHouse = function (e) {
    var t = this.getSellCoin(e);
    r_PlayerData.PlayerData.addCoin("卖出房产", t, r_ReportSystem.SystemKey.房产系统, true, true, true);
    for (var o = r_PlayerData.PlayerData.data.houseMap.houseList.length - 1; o >= 0; o--) {
      r_PlayerData.PlayerData.data.houseMap.houseList[o].id == e.id && r_PlayerData.PlayerData.data.houseMap.houseList.splice(o, 1);
    }
  };
  _ctor.prototype.sellAllHouse = function () {
    var e = r_jsbi.default.BigInt(0);
    for (var t = r_PlayerData.PlayerData.data.houseMap.houseList.length - 1; t >= 0; t--) {
      var n = r_PlayerData.PlayerData.data.houseMap.houseList[t];
      var c = exports.HouseEarnSystem.getHouseCfg(n.id);
      var l = exports.HouseEarnSystem.getSellCoin(c);
      e = r_jsbi.default.add(e, l);
      r_PlayerData.PlayerData.data.houseMap.houseList.splice(t, 1);
    }
    if (r_jsbi.default.GE(e, 0)) {
      r_PlayerData.PlayerData.addCoin("卖出所有房产", e, r_ReportSystem.SystemKey.房产系统, true, true, true);
    } else {
      r_SoundMgr.SoundMgr.playSound("click");
    }
  };
  _ctor.prototype.needShowRedTip = function () {
    if (!r_PlayerData.PlayerData.data.houseMap || !r_PlayerData.PlayerData.data.houseMap.houseList) {
      return false;
    }
    for (var e = 0; e < r_HouseEarnCfg.HouseEarnCfg.length; e++) {
      var t = r_HouseEarnCfg.HouseEarnCfg[e];
      if (!this.isBuyHouse(t.id) && r_PlayerData.PlayerData.isCoinEnough(t.buy)) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBoughtHouseCount = function () {
    if (r_PlayerData.PlayerData.data.houseMap.houseList) {
      return r_PlayerData.PlayerData.data.houseMap.houseList.length;
    } else {
      return 0;
    }
  };
  return _ctor;
}();
exports._HouseEarnSystem = exp__HouseEarnSystem;
exports.HouseEarnSystem = new exp__HouseEarnSystem();