Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CitySystem = exports._CitySystem = undefined;
var r_jsbi = require("jsbi");
var r_CityCfg = require("CityCfg");
var r_PlayerData = require("PlayerData");
var exp__CitySystem = function () {
  function _ctor() {
    this.cityCfgMap = null;
    this.cityLevelCfgMap = null;
  }
  _ctor.prototype.checkInit = function () {
    if (!this.cityCfgMap) {
      this.cityCfgMap = {};
      this.cityLevelCfgMap = {};
      for (var e = 0; e < r_CityCfg.cityCfg.length; e++) {
        this.cityCfgMap[r_CityCfg.cityCfg[e].id] = r_CityCfg.cityCfg[e];
      }
      for (var t in r_CityCfg.CityLevelCfg) {
        var o = r_CityCfg.CityLevelCfg[t];
        this.cityLevelCfgMap[t] = {};
        this.cityLevelCfgMap[t].list = o;
        this.cityLevelCfgMap[t].map = {};
        for (var i = 0; i < o.length; i++) {
          this.cityLevelCfgMap[t].map[o[i].level] = o[i];
        }
      }
    }
    if (!r_PlayerData.PlayerData.data.cityMap.cityList) {
      console.log("cityList已初始化");
      r_PlayerData.PlayerData.data.cityMap.cityList = [];
    }
  };
  _ctor.prototype.getCityLevelCfg = function (e, t) {
    return this.cityLevelCfgMap[e].map[t];
  };
  _ctor.prototype.countSecondAllIncome = function () {
    var e = r_jsbi.default.BigInt(0);
    for (var t in r_PlayerData.PlayerData.data.cityMap.cityList) {
      var n = r_PlayerData.PlayerData.data.cityMap.cityList[t];
      var s = exports.CitySystem.getCityLevelCfg(n.id, n.lv);
      e = r_jsbi.default.ADD(e, r_jsbi.default.BigInt(s.earn));
    }
    return e;
  };
  _ctor.prototype.getCityCfg = function (e) {
    return this.cityCfgMap[e];
  };
  _ctor.prototype.isupgradeCity = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.cityMap.cityList.length; t++) {
      if (r_PlayerData.PlayerData.data.cityMap.cityList[t].id == e) {
        return r_PlayerData.PlayerData.data.cityMap.cityList[t];
      }
    }
    return false;
  };
  _ctor.prototype.getCityLevel = function (e) {
    var t = this.isupgradeCity(e);
    if (t) {
      return t.lv;
    } else {
      return 0;
    }
  };
  _ctor.prototype.upgradeCity = function (e) {
    var t = this.isupgradeCity(e.id);
    if (t) {
      t.lv = t.lv + 1;
      console.log(e.name + "升级：" + t.lv);
      if (r_PlayerData.PlayerData.data.cityMap.cityList.length == r_CityCfg.cityCfg.length) {
        for (var o = 0; o < r_PlayerData.PlayerData.data.cityMap.cityList.length && !(r_PlayerData.PlayerData.data.cityMap.cityList[o].lv < 50); o++) {
          ;
        }
      }
    } else {
      console.log(e.name + "首次升级");
      var i = {};
      i.id = e.id;
      i.lv = 1;
      r_PlayerData.PlayerData.data.cityMap.cityList.push(i);
    }
  };
  _ctor.prototype.needShowRedTip = function () {
    if (!r_PlayerData.PlayerData.data.cityMap || !r_PlayerData.PlayerData.data.cityMap.cityList) {
      return false;
    }
    for (var e = 0; e < r_CityCfg.cityCfg.length; e++) {
      var t = r_CityCfg.cityCfg[e];
      var i = exports.CitySystem.getCityLevel(t.id);
      var s = exports.CitySystem.getCityLevelCfg(t.id, i);
      if (s && r_PlayerData.PlayerData.isCoinEnough(s.coin)) {
        return true;
      }
    }
    return false;
  };
  return _ctor;
}();
exports._CitySystem = exp__CitySystem;
exports.CitySystem = new exp__CitySystem();