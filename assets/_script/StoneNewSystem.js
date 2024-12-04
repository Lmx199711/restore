Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneNewSystem = undefined;
var r_StoneNewCfg = require("StoneNewCfg");
var r_StoneNewDogzUI = require("StoneNewDogzUI");
var r_StoneNewUI = require("StoneNewUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var u = function () {
  function e() {}
  e.prototype.init = function () {
    this.posList = Object.values(r_StoneNewCfg.StoneNewPosCfg);
  };
  Object.defineProperty(e.prototype, "itemsList", {
    get: function () {
      return r_PlayerData.PlayerData.data.stoneNewArr;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.refreshItemsList = function () {
    r_PlayerData.PlayerData.data.refreshStoneNewTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.data.refreshStoneNewDay = r_DaySystem.DaySystem.getShowDay();
    var e = [];
    var t = r_UtilsSystem.UtilsSystem.dropDataRandom(r_StoneNewCfg.StoneNewTypeCfg[1], 3);
    var o = r_UtilsSystem.UtilsSystem.dropDataRandom(r_StoneNewCfg.StoneNewTypeCfg[2], 3);
    var n = r_UtilsSystem.UtilsSystem.dropDataRandom(r_StoneNewCfg.StoneNewTypeCfg[3], 2);
    t.concat(o).concat(n).forEach(function (t) {
      e.push({});
      var o = e.length;
      e[o - 1].id = o;
      var n = r_StoneNewCfg.StoneNewPosCfg[o];
      var a = r_StoneNewCfg.StoneNewUseGoldCfg[n.useGold];
      e[o - 1].price = r_UtilsSystem.UtilsSystem.randomPercentFromArray(a).coin;
      e[o - 1].stoneId = t;
    });
    cc.log("新切石数据", e);
    r_PlayerData.PlayerData.data.stoneNewArr = e;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.getAwardById = function (e) {
    var t = r_StoneNewCfg.StoneNewEarnCfg[e];
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(t);
  };
  e.prototype.checkRefresh = function () {
    0 == r_PlayerData.PlayerData.data.refreshStoneNewDay && this.refreshItemsList();
    r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.refreshNewCutNumTime) && this.refreshCutNum();
  };
  e.prototype.nextDay = function () {
    if (r_DaySystem.DaySystem.getShowDay() - r_PlayerData.PlayerData.data.refreshStoneNewDay >= 5) {
      this.refreshItemsList();
      r_StoneNewUI.default.instance && r_StoneNewUI.default.instance.showItems();
    }
  };
  e.prototype.refreshCutNum = function () {
    r_PlayerData.PlayerData.data.cutStoneNewNum = 0;
    r_PlayerData.PlayerData.data.refreshNewCutNumTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.buyStoneById = function (e) {
    var t = this.itemsList.findIndex(function (t) {
      return t && t.id == e;
    });
    r_PlayerData.PlayerData.data.stoneNewArr[t] = null;
    r_PlayerData.PlayerData.data.cutStoneNewNum = r_PlayerData.PlayerData.data.cutStoneNewNum + 1;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.svaeDogzById = function (e) {
    r_PlayerData.PlayerData.data.stoneNewCaidan[e]++;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.chceckCaidan = function () {
    return r_PlayerData.PlayerData.data.stoneNewCaidan[22] >= 1 && r_PlayerData.PlayerData.data.stoneNewCaidan[23] >= 1 && r_PlayerData.PlayerData.data.stoneNewCaidan[24] >= 1 && r_PlayerData.PlayerData.data.stoneNewCaidan[25] >= 1;
  };
  e.prototype.debugCaidan = function () {
    for (var e in r_PlayerData.PlayerData.data.stoneNewCaidan) r_PlayerData.PlayerData.data.stoneNewCaidan[e] = 1;
    r_PlayerData.PlayerData.saveData();
    r_StoneNewUI.default.instance && r_StoneNewUI.default.instance.restart();
    r_StoneNewDogzUI.default.instance && r_StoneNewDogzUI.default.instance.restart();
  };
  e.prototype.useCaidan = function () {
    for (var e in r_PlayerData.PlayerData.data.stoneNewCaidan) {
      r_PlayerData.PlayerData.data.stoneNewCaidan[e]--;
      r_PlayerData.PlayerData.data.stoneNewCaidan[e] < 0 && (r_PlayerData.PlayerData.data.stoneNewCaidan[e] = 0);
    }
    r_PlayerData.PlayerData.saveData();
    r_StoneNewUI.default.instance && r_StoneNewUI.default.instance.restart();
  };
  return e;
}();
exports.StoneNewSystem = new u();