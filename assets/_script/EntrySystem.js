Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntrySystem = undefined;
var r_EntryCfg = require("EntryCfg");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var s = function () {
  function e() {}
  e.prototype.resetData = function () {
    if (r_PlayerData.PlayerData.data.entryInfo.lastDay != new Date().toLocaleDateString()) {
      r_PlayerData.PlayerData.data.entryInfo.num = 0;
      r_PlayerData.PlayerData.data.entryInfo.maxNum = 20;
      r_PlayerData.PlayerData.data.entryInfo.lastDay = new Date().toLocaleDateString();
    }
  };
  e.prototype.getNum = function () {
    return r_PlayerData.PlayerData.data.entryInfo.num;
  };
  e.prototype.getMaxNum = function () {
    return r_PlayerData.PlayerData.data.entryInfo.maxNum;
  };
  e.prototype.getAllEarn = function () {
    var e = r_PlayerData.PlayerData.data.entryInfo.num;
    var t = r_EntryCfg.EntryCfg;
    var o = 0;
    for (var a = 0; a < t.length; a++) {
      var s = t[a];
      var r = s.maxNum;
      if (e < r && e > r - 20) {
        o += e % 20 * s.oncePrice;
      } else {
        e >= r && (o += 20 * s.oncePrice);
      }
    }
    var c = t[t.length - 1].maxNum;
    var l = t[t.length - 1].oncePrice;
    e > c && (o += (e - c) * l);
    return o;
  };
  e.prototype.checkFight = function () {
    return r_PlayerData.PlayerData.data.entryInfo.num < r_PlayerData.PlayerData.data.entryInfo.maxNum;
  };
  e.prototype.fight = function () {
    if (this.checkFight()) {
      r_PlayerData.PlayerData.addCoin("打保安奖励", this.getOncePrice(), r_ReportSystem.SystemKey.打保安, false, false);
      r_PlayerData.PlayerData.data.entryInfo.num++;
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.getOncePrice = function () {
    var e = r_EntryCfg.EntryCfg.find(function (e) {
      return e.maxNum == r_PlayerData.PlayerData.data.entryInfo.maxNum;
    });
    if (e) {
      return e.oncePrice;
    } else {
      return r_EntryCfg.EntryCfg[r_EntryCfg.EntryCfg.length - 1].oncePrice;
    }
  };
  e.prototype.addNum = function () {
    r_PlayerData.PlayerData.data.entryInfo.maxNum += 20;
    r_PlayerData.PlayerData.saveData();
  };
  return e;
}();
exports.EntrySystem = new s();