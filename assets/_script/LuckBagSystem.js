Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LuckBagSystem = undefined;
var r_LuckBagCfg = require("LuckBagCfg");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r = function () {
  function e() {
    this.luckBagMap = {};
    this.luckBagRewardInfo = {};
    this._triggerCaidan = "";
  }
  e.prototype.init = function () {
    this.checkInit();
    for (var e in r_LuckBagCfg.LuckBagInfoCfg) r_LuckBagCfg.LuckBagInfoCfg.hasOwnProperty(e) && (this.luckBagMap[r_LuckBagCfg.LuckBagInfoCfg[e].id] = r_LuckBagCfg.LuckBagInfoCfg[e]);
    for (var e in r_LuckBagCfg.LuckBagAwardGoodsCfg) r_LuckBagCfg.LuckBagAwardGoodsCfg.hasOwnProperty(e) && (this.luckBagRewardInfo[r_LuckBagCfg.LuckBagAwardGoodsCfg[e].id] = r_LuckBagCfg.LuckBagAwardGoodsCfg[e]);
  };
  Object.defineProperty(e.prototype, "itemsList", {
    get: function () {
      return r_PlayerData.PlayerData.data.luckBagMap.luckBagList;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "triggerCaidan", {
    get: function () {
      return this._triggerCaidan;
    },
    set: function (e) {
      this._triggerCaidan = e;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.getLuckBagInfoById = function (e) {
    return this.luckBagMap[e];
  };
  e.prototype.getLuckBagRewardInfoById = function (e) {
    return this.luckBagRewardInfo[e];
  };
  e.prototype.checkInit = function () {
    if (!r_PlayerData.PlayerData.data.luckBagMap) {
      r_PlayerData.PlayerData.data.luckBagMap = {};
      r_PlayerData.PlayerData.data.luckBagMap.luckBagList = [];
      r_PlayerData.PlayerData.data.luckBagMap.caidanList = [0, 0];
      r_PlayerData.PlayerData.data.luckBagMap.openCount = 0;
      r_PlayerData.PlayerData.data.luckBagMap.animalSignList = [];
      r_PlayerData.PlayerData.data.luckBagMap.refreshTime = r_TimeSystem.TimeSystem.getServerTime();
      this.refreshItemsList();
    }
  };
  e.prototype.resetData = function () {
    this._triggerCaidan = "";
    r_PlayerData.PlayerData.data.luckBagMap = {};
    r_PlayerData.PlayerData.data.luckBagMap.luckBagList = [];
    r_PlayerData.PlayerData.data.luckBagMap.caidanList = [0, 0];
    r_PlayerData.PlayerData.data.luckBagMap.openCount = 0;
    r_PlayerData.PlayerData.data.luckBagMap.animalSignList = [];
    r_PlayerData.PlayerData.data.luckBagMap.refreshTime = r_TimeSystem.TimeSystem.getServerTime();
    this.refreshItemsList();
  };
  e.prototype.refreshItemsList = function () {
    r_PlayerData.PlayerData.data.refreshTime = r_TimeSystem.TimeSystem.getServerTime();
    var e = [];
    var t = r_UtilsSystem.UtilsSystem.dropDataRandom(r_LuckBagCfg.LuckBagTypeCfg[1], 3);
    var o = r_UtilsSystem.UtilsSystem.dropDataRandom(r_LuckBagCfg.LuckBagTypeCfg[2], 3);
    var r = r_UtilsSystem.UtilsSystem.dropDataRandom(r_LuckBagCfg.LuckBagTypeCfg[3], 2);
    t.concat(o).concat(r).forEach(function (t) {
      e.push({});
      var o = e.length;
      e[o - 1].id = t;
    });
    cc.log("新福袋数据", e);
    r_PlayerData.PlayerData.data.luckBagMap.luckBagList = e;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.getAwardById = function (e, t) {
    var o = r_LuckBagCfg.LuckBagRewadCfg[e];
    return this.randomPercentFromArray(o, t);
  };
  e.prototype.getAwardDebugById = function (e, t) {
    var o = r_LuckBagCfg.LuckBagRewadDebugCfg[e];
    return this.randomPercentFromArray(o, t);
  };
  e.prototype.randomPercentFromArray = function (e, t) {
    var o = 0;
    var i = "pr";
    1 != t && (i = "pr2");
    e.forEach(function (e) {
      return o += parseFloat(e[i]);
    });
    var n = Math.random() * o;
    var a = 0;
    for (var r = 0; r < e.length; r++) {
      if (n <= (a += parseFloat(e[r][i]))) {
        return e[r];
      }
    }
    return r_UtilsSystem.UtilsSystem.getRandomFromArr(e);
  };
  e.prototype.tiggerCaidan1 = function (e) {
    var t = this.getLuckBagInfoById(e);
    if (-1 == r_LuckBagCfg.LuckBagCaidan1Cfg.indexOf(t.name)) {
      return this.getAwardById(e);
    }
    var o = r_LuckBagCfg.LuckBagRewadCfg[e];
    return o[o.length - 1];
  };
  e.prototype.tiggerCaidan2 = function (e) {
    var t = r_LuckBagCfg.LuckBagRewadCfg[e];
    return t[t.length - 1];
  };
  e.prototype.checkRefresh = function () {
    if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.luckBagMap.refreshTime)) {
      this.refreshItemsList();
      this.refreshCutNum();
    }
  };
  e.prototype.refreshCutNum = function () {
    r_PlayerData.PlayerData.data.luckBagMap.openCount = 0;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.buyStoneById = function (e) {
    var t = r_PlayerData.PlayerData.data.luckBagMap.luckBagList.findIndex(function (t) {
      return t && t.id == e;
    });
    r_PlayerData.PlayerData.data.luckBagMap.luckBagList[t] = null;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.addAnimalSign = function (e) {
    this.checkInit();
    for (var t = 0; t < r_PlayerData.PlayerData.data.luckBagMap.animalSignList.length; t++) {
      if (e == r_PlayerData.PlayerData.data.luckBagMap.animalSignList[t].id) {
        return void (r_PlayerData.PlayerData.data.luckBagMap.animalSignList[t].num += 1);
      }
    }
    var o = {
      id: e,
      num: 1
    };
    r_PlayerData.PlayerData.data.luckBagMap.animalSignList.push(o);
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.deleteAnimalSgin = function () {
    for (var e = 0; e < r_PlayerData.PlayerData.data.luckBagMap.animalSignList.length; e++) {
      if (r_PlayerData.PlayerData.data.luckBagMap.animalSignList[e].num > 0) {
        r_PlayerData.PlayerData.data.luckBagMap.animalSignList[e].num -= 1;
        if (r_PlayerData.PlayerData.data.luckBagMap.animalSignList[e].num <= 0) {
          r_PlayerData.PlayerData.data.luckBagMap.animalSignList.splice(e, 1);
          e--;
        }
      }
    }
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.addASuitOfAnimalSign = function () {
    for (var e in this.luckBagRewardInfo) this.luckBagRewardInfo.hasOwnProperty(e) && 2 == this.luckBagRewardInfo[e].type && this.addAnimalSign(this.luckBagRewardInfo[e].id);
  };
  e.prototype.IsExistAnimalSign = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.luckBagMap.animalSignList.length; t++) {
      if (e == r_PlayerData.PlayerData.data.luckBagMap.animalSignList[t].id) {
        return true;
      }
    }
    return false;
  };
  e.prototype.resetCaidan = function () {
    r_PlayerData.PlayerData.data.luckBagMap.caidanList[0] = 0;
    r_PlayerData.PlayerData.data.luckBagMap.caidanList[1] = 0;
  };
  return e;
}();
exports.LuckBagSystem = new r();